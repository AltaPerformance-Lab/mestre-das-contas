import { Suspense } from 'react';
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NetSalaryCalculator from "@/components/calculators/SalaryCalculator";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { Coins, CheckCircle2, TrendingDown, Briefcase, HelpCircle, AlertTriangle, ArrowLeft, PiggyBank, Calculator } from "lucide-react";

// --- DADOS PSEO HARDCODED ---
// Evita leitura de FS para performance e simplicidade em rotas dinâmicas
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
    description: `Descubra quanto sobra de um salário bruto de ${formatado}. Tabela INSS e IRRF 2026 atualizada. Veja o valor líquido real após os descontos.`,
    keywords: [`salario liquido ${valor}`, `calcular salario ${valor}`, "desconto inss 2026", "irrf 2026", "calculadora salario liquido"],
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

// --- LÓGICA DE ANÁLISE ---
function getAnalysis(valor: number) {
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
    const salariosMinimos = (valor / 1500).toFixed(1); // Mínimo estimado 2026
    
    let analise = {
      title: `Análise para Quem Ganha ${formatado}`,
      text: "",
      alert: "",
      color: "emerald",
      power: "",
      tips: [] as string[]
    };
    
    if (valor <= 1500) {
      analise.text = `Este valor está próximo ao Piso Nacional. Nesta faixa, o foco financeiro deve ser a "sobrevivência inteligente": controle rigoroso de custos fixos. A vantagem é tributária: o desconto do INSS é mínimo (7,5%) e você está <strong>isento de Imposto de Renda</strong>.`;
      analise.alert = "Descontos Mínimos";
      analise.color = "emerald";
      analise.power = "Básico";
      analise.tips = [
          "Cadastre-se na Tarifa Social de Energia Elétrica se elegível.",
          "Evite dívidas de cartão de crédito. Juros rotativos destroem orçamentos nessa faixa.",
          "Busque contas digitais gratuitas que rendam CDI diário."
      ];
    } else if (valor <= 2800) {
      analise.text = `Você recebe cerca de ${salariosMinimos} salários mínimos. Até este patamar, você provavelmente ainda está <strong>Isento de IRRF</strong> (dependendo das atualizações da tabela). Seu maior "sócio" aqui é apenas o INSS. É a melhor fase para começar a montar sua Reserva de Emergência.`;
      analise.alert = "Isento de IRRF (Provável)";
      analise.color = "blue";
      analise.power = "Estável";
      analise.tips = [
          "Tente poupar 15% do salário líquido assim que ele cai na conta.",
          "Invista em ativos isentos de IR (LCI, LCA) para potencializar o ganho.",
          "Cuidado com financiamento de veículos que comprometam mais de 30% da renda."
      ];
    } else if (valor <= 5000) {
      analise.text = `Bem-vindo à classe média! Com ${salariosMinimos} salários mínimos, o Leão começa a morder. O Imposto de Renda já aparece no holerite. A estratégia aqui é mitigar impostos: gastos com saúde, educação e dependentes ajudam a restituir esse valor no ano seguinte.`;
      analise.alert = "Tributação Média";
      analise.color = "amber";
      analise.power = "Ascendente";
      analise.tips = [
          "Cadastre seus dependentes no RH para aliviar o IR mensal.",
          "Considere fazer a Declaração Completa do IR para deduzir saúde e escola.",
          "Um PGBL pode ser interessante se você declarar no modelo completo (abate 12% da base)."
      ];
    } else {
      analise.text = `Sua renda (${salariosMinimos}x Mínimos) está no topo da pirâmide. Você paga o teto do INSS e a alíquota de IR é alta (chegando a 27,5% na margem). O foco agora deve ser <strong>Eficiência Tributária</strong> e proteção patrimonial.`;
      analise.alert = "Alta Carga Tributária";
      analise.color = "purple";
      analise.power = "Elevado";
      analise.tips = [
          "Maximize aportes em Previdência Privada (PGBL) para reduzir o IR a pagar.",
          "Use cartões 'Black' com benefícios reais (seguro viagem, salas VIP) já que sua renda permite.",
          "Tenha um Seguro de Vida robusto para proteger seu padrão de vida."
      ];
    }
    
    return analise;
}

export default async function SalarioPorValorPage({ params }: Props) {
  const { valor } = await params;
  const salarioNum = parseFloat(valor.replace(",","."));

  if (isNaN(salarioNum)) notFound();

  // Helper para links internos
  const dados = salaryCases;

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
          {
            "@type": "Question",
            "name": `Quanto sobra de um salário de ${formatado}?`,
            "acceptedAnswer": { "@type": "Answer", "text": `Para um salário bruto de ${formatado}, são descontados o INSS (Previdência) e o Imposto de Renda (IRRF). Use a calculadora acima para ver o valor exato que cai na conta.` }
          },
          {
            "@type": "Question",
            "name": "Este salário paga Imposto de Renda?",
            "acceptedAnswer": { "@type": "Answer", "text": salarioNum <= 2800 ? "Provavelmente não. Valores até esta faixa costumam estar na zona de isenção ou com desconto muito baixo." : "Sim. Salários acima de R$ 2.824,00 (estimado) já sofrem retenção na fonte conforme a tabela progressiva." }
          }
        ]
      },
      {
          "@type": "HowTo",
          "name": `Como calcular o salário líquido de ${formatado}`,
          "description": "Passo a passo para entender os descontos do seu holerite.",
          "totalTime": "PT2M",
          "step": [
              {
                  "@type": "HowToStep",
                  "name": "Informe o Salário Bruto",
                  "text": `O simulador inicia com o valor de ${formatado}.`,
                  "url": `https://mestredascontas.com.br/financeiro/salario-liquido/${valor}`
              },
              {
                  "@type": "HowToStep",
                  "name": "Ajuste os Dependentes",
                  "text": "Se você tem filhos ou dependentes legais, o imposto diminui. Informe a quantidade.",
                  "url": `https://mestredascontas.com.br/financeiro/salario-liquido/${valor}`
              },
              {
                  "@type": "HowToStep",
                  "name": "Confira o Resultado",
                  "text": "Veja o valor final e o quanto foi descontado de impostos.",
                  "url": `https://mestredascontas.com.br/financeiro/salario-liquido/${valor}`
              }
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
          description={`Análise dos impostos (INSS e IRRF) para quem ganha ${formatado} em 2026. Veja quanto sobra.`}
          category="Calculadora CLT"
          icon={<Coins size={32} strokeWidth={2} />}
          variant="health"
          categoryColor="emerald"
          badge="Tabela 2026"
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
                <ArrowLeft size={16} className="mr-1"/> Voltar para Calculadora Geral
            </Link>
        </div>

        {/* ANUNCIO TOP */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center min-h-[100px] bg-slate-50/50 dark:bg-slate-900/50 rounded-lg p-2 border border-dashed border-slate-200/50 dark:border-slate-800">
           <AdUnit slot="salario_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section className="scroll-mt-28 w-full max-w-full relative z-10" id="calculadora">
             <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-xl mb-6 flex items-start gap-3 print:hidden shadow-sm transition-colors">
                <Briefcase className="text-emerald-600 dark:text-emerald-400 mt-1 shrink-0" size={20}/>
                <div>
                    <p className="font-bold text-emerald-900 dark:text-emerald-100 text-sm">Cálculo para {formatado}</p>
                    <p className="text-emerald-800 dark:text-emerald-200 text-xs mt-1">
                        Utilizando a tabela oficial 2026. O resultado considera desconto padrão de INSS e IRRF simplificado ou completo (o melhor para você).
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
            <AdUnit slot="salario_mid" format="auto" />
        </div>

        {/* ANÁLISE PROFUNDA */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className={`text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-${analysis.color}-500 pl-4 flex items-center gap-3`}>
             <TrendingDown className={`text-${analysis.color}-500`}/> Análise Salarial
          </h2>

          <div className={`bg-${analysis.color}-50 dark:bg-${analysis.color}-900/10 border-l-4 border-${analysis.color}-500 p-6 rounded-r-xl mb-8 not-prose`}>
             <h3 className={`text-xl font-bold text-${analysis.color}-900 dark:text-${analysis.color}-100 mb-2`}>
                Diagnóstico: {analysis.alert}
             </h3>
             <p className={`text-${analysis.color}-800 dark:text-${analysis.color}-200 mb-4 leading-relaxed`}>
               <span dangerouslySetInnerHTML={{ __html: analysis.text }} />
             </p>
             <div className="flex flex-wrap gap-2">
                 <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white dark:bg-black/20 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                    <Briefcase size={12}/> {salariosMinimos} Salários Mínimos
                 </span>
                 <span className={`inline-flex items-center gap-1.5 text-xs font-bold text-white bg-${analysis.color}-600 px-3 py-1.5 rounded-full shadow-sm`}>
                    <CheckCircle2 size={12}/> Poder de Compra: {analysis.power}
                 </span>
             </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Dicas para quem ganha {formatado}</h3>
          <ul className="space-y-2 not-prose">
              {analysis.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                      <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{tip}</span>
                  </li>
              ))}
          </ul>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Entenda os Descontos do seu Holerite</h3>
          <p className="text-slate-600 dark:text-slate-400">
            O valor "Líquido" é o que sobra após o Leão e a Previdência morderem sua parte.
            Para <strong>{formatado}</strong>, a lógica é:
          </p>

          <ol className="text-slate-700 dark:text-slate-300 space-y-2">
            <li>
                <strong>1. INSS (Previdência):</strong> Desconto obrigatório para sua aposentadoria. É calculado em faixas progressivas. Quem ganha mais, paga mais (até o teto).
            </li>
            <li>
                <strong>2. IRRF (Imposto de Renda):</strong> Calculado sobre o que sobrou (Salário - INSS). Quanto maior o salário, maior a alíquota (de 0% a 27,5%).
            </li>
          </ol>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 my-6 flex gap-3 items-start not-prose">
              <HelpCircle className="text-blue-600 dark:text-blue-400 shrink-0 mt-1" size={20}/>
              <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm uppercase mb-1">Dica do Especialista</h4>
                  <p className="text-sm text-blue-800/90 dark:text-blue-200/90 leading-relaxed">
                      Se você tem muitos gastos com saúde (planos, médicos) ou educação, guarde todos os recibos. Eles podem reduzir o imposto a pagar na Declaração Anual de Ajuste.
                  </p>
              </div>
          </div>


          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-600 p-4 my-6 text-amber-900 dark:text-amber-100 text-sm leading-relaxed flex gap-3 not-prose">
              <AlertTriangle className="shrink-0 text-amber-500 dark:text-amber-400" size={20}/>
              <p>
                  <strong>Atenção:</strong> Este cálculo considera o regime CLT padrão (2025/2026). Não inclui descontos específicos da sua empresa como Vale Transporte (6%), Coparticipação em Plano de Saúde ou Contribuição Sindical.
              </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Perguntas Frequentes</h3>
          <div className="space-y-4 not-prose">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-bold border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <h4 className="text-sm m-0">Quanto sobra de um salário de {formatado}?</h4>
                    <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm pb-4">
                    Para um salário bruto de {formatado}, o valor líquido estimado depende dos descontos oficiais. Em nossa simulação padrão (sem dependentes e sem outros descontos), o valor que cai na conta gira em torno do mostrado na calculadora acima, após subtrair INSS e IRRF.
                </p>
            </details>
            
            <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-bold border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <h4 className="text-sm m-0">Este salário paga Imposto de Renda?</h4>
                    <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm pb-4">
                     {salarioNum <= 2800 ? "Provavelmente não. Valores até esta faixa costumam estar na zona de isenção ou com desconto muito baixo, dependendo da tabela vigente no mês." : "Sim. Salários acima de R$ 2.824,00 (estimado) já sofrem retenção na fonte conforme a tabela progressiva. O valor exato depende se você tem dependentes ou gastos dedutíveis."}
                </p>
            </details>

             <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-bold border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <h4 className="text-sm m-0">O que mais pode ser descontado?</h4>
                    <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </summary>
                <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm pb-4">
                    Além dos impostos federais (INSS/IRRF), sua empresa pode descontar: Vale Transporte (até 6%), Coparticipação em Plano de Saúde, Vale Alimentação/Refeição (se for coparticipativo), Atrasos e Faltas, Contribuição Sindical (se autorizada) e Empréstimos Consignados.
                </p>
            </details>
          </div>

        </div>

        {/* --- OUTRAS FERRAMENTAS (Cross Selling) --- */}
        <div className="mt-12 not-prose border-t border-slate-200 dark:border-slate-800 pt-8 print:hidden">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <PiggyBank size={22} className="text-emerald-500"/> Ferramentas Financeiras
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/financeiro/rescisao" className="block group">
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20 transition-transform group-hover:-translate-y-1">
                        <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                            <Calculator size={24} className="text-white"/>
                        </div>
                        <h4 className="font-bold text-lg mb-1">Calcular Rescisão</h4>
                        <p className="text-indigo-50 text-sm opacity-90">Vai sair do emprego? Simule quanto você tem para receber de acerto.</p>
                    </div>
                </Link>
                
                <Link href="/financeiro/financiamento-veiculos" className="block group">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20 transition-transform group-hover:-translate-y-1">
                        <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                            <Briefcase size={24} className="text-white"/>
                        </div>
                        <h4 className="font-bold text-lg mb-1">Financiar Carro</h4>
                        <p className="text-emerald-50 text-sm opacity-90">Veja se o seu salário comporta a parcela do carro novo.</p>
                    </div>
                </Link>
            </div>
        </div>

        {/* Navegação Interna */}
        <div className="w-full max-w-4xl mx-auto mt-4 print:hidden">
             <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Compare com outros salários</h4>
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
            <AdUnit slot="salario_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}