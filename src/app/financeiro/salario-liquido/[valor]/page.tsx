import { Suspense } from 'react';
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NetSalaryCalculator from "@/components/calculators/SalaryCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import { Coins, CheckCircle2, TrendingDown, Briefcase, HelpCircle, ArrowLeft, ShieldCheck } from "lucide-react";

// --- DADOS PSEO DINÂMICOS ---
export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/salarios.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const salarios = JSON.parse(fileContent);
    return salarios.map((item: any) => ({
      valor: String(item.valor || item.slug)
    }));
  } catch (error) {
    return [{ valor: "1500" }, { valor: "2000" }, { valor: "3000" }];
  }
}

import fs from 'fs';
import path from 'path';

type Props = { params: Promise<{ valor: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { valor } = await params;
  const salarioNum = parseFloat(valor.replace(",","."));
  
  if (isNaN(salarioNum)) return {};

  const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(salarioNum);

  return {
    title: `Salário Líquido de ${formatado} (2026) - Cálculo Exato`,
    description: `Descubra quanto sobra de um salário bruto de ${formatado}. Tabela INSS e IRRF 2026 atualizada. Veja o valor líquido real após os descontos na sua conta corrente.`,
    keywords: [`salario liquido ${valor}`, `calcular salario ${valor}`, "desconto inss 2026", "irrf 2026", "calculadora salario liquido", `liquido de ${valor}`],
    alternates: {
        canonical: `https://mestredascontas.com.br/financeiro/salario-liquido/${valor}`
    },
    openGraph: {
        title: `Salário Líquido de ${formatado} (2026)`,
        description: `Simulação detalhada: Veja quanto cai na conta de quem ganha ${formatado}.`,
        url: `https://mestredascontas.com.br/financeiro/salario-liquido/${valor}`,
        type: "article" }
  };
}

function getAnalysis(valor: number) {
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
    const salariosMinimos = (valor / 1500).toFixed(1); 
    
    let inssEstimado = 0;
    if (valor <= 1412) inssEstimado = valor * 0.075;
    else if (valor <= 2666.68) inssEstimado = 105.9 + ((valor - 1412) * 0.09);
    else if (valor <= 4000.03) inssEstimado = 105.9 + 112.92 + ((valor - 2666.68) * 0.12);
    else if (valor <= 7786.02) inssEstimado = 105.9 + 112.92 + 160 + ((valor - 4000.03) * 0.14);
    else inssEstimado = 908.85;

    const inssFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(inssEstimado);
    
    let analise = {
      text: "",
      alert: "",
      color: "emerald",
      power: "",
      tips: [] as string[],
      inssText: `A contribuição previdenciária estimada (INSS) sobre o seu salário de ${formatado} é de aproximadamente ${inssFormat}.`
    };
    
    if (valor <= 1500) {
      analise.text = `Recebendo ${formatado}, este valor está próximo ao Piso Nacional de 2026. A vantagem é que o desconto do INSS é mínimo e você está <strong>100% isento de IR</strong>.`;
      analise.alert = "Descontos Mínimos";
      analise.color = "emerald";
      analise.power = "Básico";
      analise.tips = ["Evite dívidas de cartão.", "Busque contas digitais gratuitas."];
    } else if (valor <= 2800) {
      analise.text = `Você recebe cerca de ${salariosMinimos} salários mínimos. Até este patamar, você provavelmente ainda está <strong>Isento de IRRF</strong>.`;
      analise.alert = "Isento de IRRF";
      analise.color = "blue";
      analise.power = "Estabilidade";
      analise.tips = ["Comece sua reserva de emergência.", "Poupe R$ 100 por mês."];
    } else {
      analise.text = `Com ${formatado}, o Imposto de Renda Retido na Fonte (IRRF) já aparece no seu holerite mensal.`;
      analise.alert = "Tributação Ativa";
      analise.color = "amber";
      analise.power = "Ascendente";
      analise.tips = ["Declare dependentes no RH.", "Guarde notas fiscais médicas."];
    }
    
    return analise;
}

export default async function SalarioPorValorPage({ params }: Props) {
  const { valor } = await params;
  const salarioNum = parseFloat(valor.replace(",","."));
  if (isNaN(salarioNum)) notFound();

  const analysis = getAnalysis(salarioNum);
  const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(salarioNum);
  const salariosMinimos = (salarioNum / 1500).toFixed(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `Calculadora de Salário Líquido: ${formatado}`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" } },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": `Quanto sobra de um salário bruto de ${formatado}?`, "acceptedAnswer": { "@type": "Answer", "text": `Para uma remuneração de ${formatado}, o valor líquido é calculado após dedução do INSS e IRRF.` } }
        ]
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={`Salário Líquido: ${formatado}`}
          description={`Análise dos impostos para quem ganha ${formatado} em 2026.`}
          category="Calculadora CLT"
          icon={<Coins size={32} strokeWidth={2} />}
          variant="finance"
          categoryColor="emerald"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Salário Líquido", href: "/financeiro/salario-liquido" },
            { label: `R$ ${valor}` }
          ]}
          />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="print:hidden">
            <Link href="/financeiro/salario-liquido" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors">
                <ArrowLeft size={16} className="mr-1"/> Voltar para Calculadora Completa
            </Link>
        </div>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Cálculo baseado nas tabelas progressivas de 2026.</span>
        </div>

        <section id="ferramenta" className="w-full relative z-10">
          <PrivacyBadge />
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-4 md:p-8">
              <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                <NetSalaryCalculator initialValue={salarioNum} />
              </Suspense>
              <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                  <DisclaimerBox />
              </div>
          </div>
        </section>

        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden w-full">
          <h2 className={`text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-${analysis.color}-500 pl-4 flex items-center gap-3`}>
             <TrendingDown className={`text-${analysis.color}-500`}/> Análise Financeira: {formatado}
          </h2>

          <div className={`bg-${analysis.color}-50 dark:bg-${analysis.color}-900/10 border-l-4 border-${analysis.color}-500 p-6 rounded-r-xl mb-8 not-prose`}>
             <h3 className={`text-xl font-bold text-${analysis.color}-900 dark:text-${analysis.color}-100 mb-2`}>Diagnóstico: {analysis.alert}</h3>
             <p className={`text-${analysis.color}-800 dark:text-${analysis.color}-200 mb-4`} dangerouslySetInnerHTML={{ __html: analysis.text }} />
             <div className="flex flex-wrap gap-2">
                 <span className="text-xs font-bold bg-white dark:bg-black/20 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200">
                    Equivalente a {salariosMinimos} Salários Mínimos
                 </span>
                 <span className={`text-xs font-bold text-white bg-${analysis.color}-600 px-3 py-1.5 rounded-full`}>
                    Poder de Compra: {analysis.power}
                 </span>
             </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Dicas Práticas</h3>
          <ul className="space-y-2 not-prose">
              {analysis.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <CheckCircle2 className={`text-${analysis.color}-500 shrink-0 mt-0.5`} size={18} />
                      <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{tip}</span>
                  </li>
              ))}
          </ul>
        </div>

        <SmartCrossLinker currentHref={`/financeiro/salario-liquido/${valor}`} category="financeiro" />

        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="salario_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}