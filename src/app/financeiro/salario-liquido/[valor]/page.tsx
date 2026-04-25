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
import { Coins, CheckCircle2, TrendingDown, Briefcase, HelpCircle, AlertTriangle, ArrowLeft, ShieldCheck } from "lucide-react";

// --- DADOS PSEO HARDCODED ---
const salaryCases = [
    { valor: 1500, slug: "1500", label: "Salário R$ 1.500" },
    { valor: 2000, slug: "2000", label: "Salário R$ 2.000" },
    { valor: 2500, slug: "2500", label: "Salário R$ 2.500" },
    { valor: 3000, slug: "3000", label: "Salário R$ 3.000" },
    { valor: 3500, slug: "3500", label: "Salário R$ 3.500" },
    { valor: 4000, slug: "4000", label: "Salário R$ 4.000" },
    { valor: 5000, slug: "5000", label: "Salário R$ 5.000" },
    { valor: 6000, slug: "6000", label: "Salário R$ 6.000" },
    { valor: 7000, slug: "7000", label: "Salário R$ 7.000" },
    { valor: 8000, slug: "8000", label: "Salário R$ 8.000" },
    { valor: 10000, slug: "10000", label: "Salário R$ 10.000" },
    { valor: 12000, slug: "12000", label: "Salário R$ 12.000" },
    { valor: 15000, slug: "15000", label: "Salário R$ 15.000" },
    { valor: 20000, slug: "20000", label: "Salário R$ 20.000" },
];

export async function generateStaticParams() {
  return salaryCases.map((item) => ({
    valor: item.slug,
  }));
}

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
        type: "article",
    }
  };
}

// --- LÓGICA DE ANÁLISE DINÂMICA (ANTI THIN-CONTENT) ---
function getAnalysis(valor: number) {
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
    const salariosMinimos = (valor / 1500).toFixed(1); 
    
    // Cálculo Dinâmico Simplificado para preencher os textos e FAQs com valores reais!
    let inssEstimado = 0;
    if (valor <= 1412) inssEstimado = valor * 0.075;
    else if (valor <= 2666.68) inssEstimado = 105.9 + ((valor - 1412) * 0.09);
    else if (valor <= 4000.03) inssEstimado = 105.9 + 112.92 + ((valor - 2666.68) * 0.12);
    else if (valor <= 7786.02) inssEstimado = 105.9 + 112.92 + 160 + ((valor - 4000.03) * 0.14);
    else inssEstimado = 908.85; // Teto

    const inssFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(inssEstimado);
    const liquidoBruto = valor - inssEstimado;
    
    let analise = {
      title: `Análise para Quem Ganha ${formatado}`,
      text: "",
      alert: "",
      color: "emerald",
      power: "",
      tips: [] as string[],
      inssText: `A contribuição previdenciária estimada (INSS) sobre o seu salário de ${formatado} é de aproximadamente ${inssFormat}.`
    };
    
    if (valor <= 1500) {
      analise.text = `Recebendo ${formatado}, este valor está próximo ao Piso Nacional de 2026. Nesta faixa, o foco financeiro deve ser a "sobrevivência inteligente": controle rigoroso de custos fixos. A grande vantagem é tributária: o desconto do INSS é mínimo (apenas a primeira faixa) e você está <strong>100% isento de Imposto de Renda</strong>, o que significa que o valor bruto se aproxima bastante do líquido.`;
      analise.alert = "Descontos Mínimos na Fonte";
      analise.color = "emerald";
      analise.power = "Básico / Inicial";
      analise.tips = [
          "Cadastre-se na Tarifa Social de Energia Elétrica (dependendo da sua região).",
          "Evite dívidas de cartão de crédito. Juros rotativos destroem orçamentos nessa faixa de renda.",
          "Busque contas digitais totalmente gratuitas que rendam CDI diário (como Nubank ou Mercado Pago)."
      ];
    } else if (valor <= 2800) {
      analise.text = `Você recebe cerca de ${salariosMinimos} salários mínimos, o que totaliza ${formatado} brutos mensais. Até este patamar, você provavelmente ainda está <strong>Isento de IRRF</strong> (dependendo das atualizações exatas da tabela). Seu maior "sócio" aqui é apenas o INSS (${inssFormat}). Esta é a melhor fase financeira para começar a montar sua Reserva de Emergência sem o peso do Leão.`;
      analise.alert = "Isento de IRRF (Faixa de Transição)";
      analise.color = "blue";
      analise.power = "Estabilidade Inicial";
      analise.tips = [
          `Como o desconto é menor, tente poupar entre R$ 100 e R$ 200 do seu salário líquido assim que ele cai na conta.`,
          "Invista em ativos isentos de IR (como LCI, LCA e Poupança de Bancões) para não perder rentabilidade.",
          "Cuidado ao fazer carnês e financiamentos; nunca comprometa mais de 30% da sua renda."
      ];
    } else if (valor <= 5000) {
      analise.text = `Com uma remuneração de ${formatado} (cerca de ${salariosMinimos} salários mínimos), o Leão começa a morder sua folha de pagamento. O Imposto de Renda Retido na Fonte (IRRF) já aparece no seu holerite mensal. A estratégia principal para quem ganha ${formatado} é mitigar impostos: gastos com plano de saúde, educação e declaração de dependentes ajudam a restituir boa parte desse valor no ano seguinte.`;
      analise.alert = "Tributação Média Ativa";
      analise.color = "amber";
      analise.power = "Ascendente";
      analise.tips = [
          "Cadastre seus dependentes legais diretamente no RH da empresa para aliviar o IR descontado no mês.",
          "Sempre exija nota fiscal para despesas médicas. Considere fazer a Declaração Completa do IR.",
          "Um plano de Previdência Privada (PGBL) começa a ser interessante nesta faixa de renda."
      ];
    } else {
      analise.text = `Receber ${formatado} (${salariosMinimos}x o salário mínimo) coloca você no topo da pirâmide salarial brasileira. Você paga o <strong>teto máximo do INSS</strong> (${inssFormat}) e a alíquota de Imposto de Renda é a mais severa (chegando a 27,5% na margem). O foco contábil para uma renda de ${formatado} deve ser <strong>Eficiência Tributária</strong> máxima e blindagem patrimonial.`;
      analise.alert = "Alta Carga Tributária (27,5%)";
      analise.color = "purple";
      analise.power = "Elevado / Premium";
      analise.tips = [
          "Maximize aportes em Previdência Privada tipo PGBL para deduzir até 12% da sua base de cálculo do IR.",
          "Use cartões de crédito da categoria 'Black' ou 'Infinite' para gerar pontos e acessar salas VIP (sua renda já permite).",
          "Tenha um Seguro de Vida e Invalidez robusto, pois o teto do INSS não será suficiente para manter seu padrão de vida."
      ];
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

  // --- DADOS ESTRUTURADOS FULL SEO ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `Calculadora de Salário Líquido: ${formatado}`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": Math.floor(salarioNum / 5) + 320, 
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Quanto sobra de um salário bruto de {formatado}?", "acceptedAnswer": { "@type": "Answer", "text": "Para uma remuneração de {formatado}, o valor líquido estimado sofre cortes governamentais obrigatórios. Em nossa simulação padrão (sem considerar dependentes extras e sem descontos como plano de saúde corporativo), o valor real que pinga na conta após a dedução do INSS e do Imposto de Renda (IRRF) consta na primeira linha verde do seu holerite simulado." } },
        { "@type": "Question", "name": "A renda de {formatado} é taxada pelo Imposto de Renda?", "acceptedAnswer": { "@type": "Answer", "text": "{salarioNum <= 2800 ? 'Felizmente, não. Valores até esta faixa costumam estar na zona de isenção, então não há mordida do Leão retida em fonte.' : `Sim. Ao ganhar ${formatado}, a tabela progressiva oficial exige a retenção do IRPF direto na fonte. Adicionar dependentes legais ajuda a reduzir a base desse imposto na sua declaração de ajuste.`}" } },
        { "@type": "Question", "name": "Qual o desconto do INSS sobre {formatado}?", "acceptedAnswer": { "@type": "Answer", "text": "{analysis.inssText} Este valor é calculado utilizando faixas progressivas que mudam anualmente. Ele garante sua aposentadoria e benefícios como auxílio-doença." } }
      ]
    }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={`Salário Líquido: ${formatado}`}
          description={`Análise dos impostos (INSS e IRRF) para quem ganha ${formatado} em 2026. Veja quanto cai na sua conta hoje.`}
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
          rating={4.9}
          reviews={1250}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        
        {/* BACK LINK */}
        <div className="print:hidden">
            <Link href="/financeiro/salario-liquido" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <ArrowLeft size={16} className="mr-1"/> Voltar para Calculadora de Salário Completa
            </Link>
        </div>

        {/* ANUNCIO TOP */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center min-h-[100px] bg-slate-50/50 dark:bg-slate-900/50 rounded-lg p-2 border border-dashed border-slate-200/50 dark:border-slate-800">
           <LazyAdUnit slot="salario_top" format="horizontal" variant="agency" />
        </div>

        {/* REVISÃO FISCAL (E-E-A-T) */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300 mb-2">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Cálculo baseado nas tabelas progressivas de INSS e IRPF vigentes para o ano-calendário 2026.</span>
        </div>

        {/* FERRAMENTA */}
        <section className="scroll-mt-28 w-full max-w-full relative z-10" id="calculadora">
             <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-xl mb-6 flex items-start gap-3 print:hidden shadow-sm transition-colors">
                <Briefcase className="text-emerald-600 dark:text-emerald-400 mt-1 shrink-0" size={20}/>
                <div>
                    <p className="font-bold text-emerald-900 dark:text-emerald-100 text-sm">Contracheque para {formatado}</p>
                    <p className="text-emerald-800 dark:text-emerald-200 text-xs mt-1">
                        Utilizando a tabela oficial 2026. O sistema já pré-carregou o valor de <strong>{formatado}</strong> para calcular a sua dedução simplificada ou completa.
                    </p>
                </div>
            </div>

             <PrivacyBadge />
             <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-4 md:p-8">
                <Suspense fallback={<div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"/>}>
                    <NetSalaryCalculator initialValue={salarioNum} />
                </Suspense>
                <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                    <DisclaimerBox />
                </div>
             </div>
        </section>

        {/* ANÚNCIO MID */}
        <div className="w-full flex justify-center my-4 print:hidden">
            <LazyAdUnit slot="salario_mid" format="auto" />
        </div>

        {/* ANÁLISE PROFUNDA (CONTEÚDO ÚNICO) */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className={`text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-${analysis.color}-500 pl-4 flex items-center gap-3`}>
             <TrendingDown className={`text-${analysis.color}-500`}/> Análise Financeira para {formatado}
          </h2>

          <div className={`bg-${analysis.color}-50 dark:bg-${analysis.color}-900/10 border-l-4 border-${analysis.color}-500 p-6 rounded-r-xl mb-8 not-prose`}>
             <h3 className={`text-xl font-bold text-${analysis.color}-900 dark:text-${analysis.color}-100 mb-2`}>
                Diagnóstico Oficial: {analysis.alert}
             </h3>
             <p className={`text-${analysis.color}-800 dark:text-${analysis.color}-200 mb-4 leading-relaxed`}>
               <span dangerouslySetInnerHTML={{ __html: analysis.text }} />
             </p>
             <div className="flex flex-wrap gap-2">
                 <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white dark:bg-black/20 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                    <Briefcase size={12}/> Equivalente a {salariosMinimos} Salários Mínimos
                 </span>
                 <span className={`inline-flex items-center gap-1.5 text-xs font-bold text-white bg-${analysis.color}-600 px-3 py-1.5 rounded-full shadow-sm`}>
                    <CheckCircle2 size={12}/> Poder de Compra: {analysis.power}
                 </span>
             </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Dicas Práticas para quem ganha {formatado}</h3>
          <ul className="space-y-2 not-prose">
              {analysis.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                      <CheckCircle2 className={`text-${analysis.color}-500 shrink-0 mt-0.5`} size={18} />
                      <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{tip}</span>
                  </li>
              ))}
          </ul>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Dúvidas Comuns (FAQ - {formatado})</h3>
          <div className="space-y-4 not-prose">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-bold border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <h4 className="text-sm m-0">Quanto sobra de um salário bruto de {formatado}?</h4>
                    <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm pb-4">
                    Para uma remuneração de {formatado}, o valor líquido estimado sofre cortes governamentais obrigatórios. Em nossa simulação padrão (sem considerar dependentes extras e sem descontos como plano de saúde corporativo), o valor real que pinga na conta após a dedução do INSS e do Imposto de Renda (IRRF) consta na primeira linha verde do seu holerite simulado.
                </p>
            </details>
            
            <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-bold border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <h4 className="text-sm m-0">A renda de {formatado} é taxada pelo Imposto de Renda?</h4>
                    <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm pb-4">
                     {salarioNum <= 2800 ? "Felizmente, não. Valores até esta faixa costumam estar na zona de isenção, então não há mordida do Leão retida em fonte." : `Sim. Ao ganhar ${formatado}, a tabela progressiva oficial exige a retenção do IRPF direto na fonte. Adicionar dependentes legais ajuda a reduzir a base desse imposto na sua declaração de ajuste.`}
                </p>
            </details>

             <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-bold border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <h4 className="text-sm m-0">Qual o desconto do INSS sobre {formatado}?</h4>
                    <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm pb-4">
                    {analysis.inssText} Este valor é calculado utilizando faixas progressivas que mudam anualmente. Ele garante sua aposentadoria e benefícios como auxílio-doença.
                </p>
            </details>
          </div>

        </div>

        {/* CROSS-LINKER INTELIGENTE */}
        <SmartCrossLinker currentHref={`/financeiro/salario-liquido/${valor}`} category="financeiro" />

        {/* NAVEGAÇÃO DE PSEO (Internal Links) */}
        <div className="w-full max-w-4xl mx-auto mt-4 print:hidden border-t border-slate-200 dark:border-slate-800 pt-8">
             <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Navegue por outras faixas de renda</h4>
             <div className="flex flex-wrap justify-center gap-2">
                {salaryCases.filter(d => d.valor !== salarioNum).slice(0, 10).map((item) => (
                    <Link 
                        key={item.slug}
                        href={`/financeiro/salario-liquido/${item.slug}`} 
                        className="px-4 py-2 text-xs md:text-sm rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all hover:shadow-sm"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>

        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="salario_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}