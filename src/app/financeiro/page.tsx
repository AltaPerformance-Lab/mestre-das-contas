import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { 
  TrendingUp, Calculator, Wallet, Percent, 
  Landmark, ArrowRight, PiggyBank, Coins,
  LineChart, DollarSign, ShieldCheck, Briefcase, Calendar, Car, BarChart3, HelpCircle
} from "lucide-react";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

export const metadata: Metadata = {
  title: "Calculadoras Financeiras 2026 | Juros, Financiamento e Investimentos",
  description: "Tome decisões financeiras inteligentes. Simule financiamentos de veículos, compare reajustes de aluguel e calcule o salário líquido com precisão grátis!",
  keywords: [
    "calculadoras financeiras", 
    "simulador investimentos", 
    "calcular financiamento", 
    "juros compostos online", 
    "matemática financeira facil"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/financeiro" },
  openGraph: {
    title: "Portal Financeiro 2026 | Mestre das Contas",
    url: "https://mestredascontas.com.br/financeiro",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [
      { 
        url: "/opengraph-image", 
        width: 1200, 
        height: 630, 
        alt: "Portal Financeiro Mestre das Contas", 
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seu dinheiro sob controle em 2026",
    images: ["/opengraph-image"],
  } };

// --- SCHEMA (COLLECTION) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Ferramentas Financeiras e Simuladores 2026",
      "description": "Coleção completa de calculadoras para planejamento financeiro, juros compostos, financiamentos e investimentos.",
      "url": "https://mestredascontas.com.br/financeiro",
      "hasPart": [
        { "@type": "SoftwareApplication", "name": "Juros Compostos", "url": "https://mestredascontas.com.br/financeiro/juros-compostos" },
        { "@type": "SoftwareApplication", "name": "Financiamento Price/SAC", "url": "https://mestredascontas.com.br/financeiro/financiamento" },
        { "@type": "SoftwareApplication", "name": "Calculadora de Porcentagem", "url": "https://mestredascontas.com.br/financeiro/porcentagem" },
        { "@type": "SoftwareApplication", "name": "Salário Líquido", "url": "https://mestredascontas.com.br/financeiro/salario-liquido" },
        { "@type": "SoftwareApplication", "name": "Calculadora MEI", "url": "https://mestredascontas.com.br/financeiro/calculadora-mei" },
        { "@type": "SoftwareApplication", "name": "Dias Úteis", "url": "https://mestredascontas.com.br/financeiro/calculadora-dias-uteis" },
        { "@type": "SoftwareApplication", "name": "Reforma Tributária", "url": "https://mestredascontas.com.br/financeiro/reforma-tributaria" }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" },
        { "@type": "ListItem", "position": 2, "name": "Financeiro", "item": "https://mestredascontas.com.br/financeiro" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "1. Qual é a diferença entre juros simples e juros compostos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nos juros simples, a taxa incide apenas sobre o valor principal inicial. Nos juros compostos (os chamados 'juros sobre juros'), a taxa incide sobre o capital inicial acrescido dos juros acumulados nos períodos anteriores."
          }
        },
        {
          "@type": "Question",
          "name": "2. Como funciona a amortização pela Tabela Price e SAC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Na Tabela Price, as parcelas mensais são fixas e constantes, mas a amortização é crescente. No Sistema de Amortização Constante (SAC), a amortização é constante, fazendo as parcelas começarem mais caras e diminuírem ao longo do tempo."
          }
        },
        {
          "@type": "Question",
          "name": "3. O que é o Custo Efetivo Total (CET) de um financiamento?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Custo Efetivo Total (CET) é a taxa real que resume todas as despesas de um financiamento ou empréstimo, incluindo juros, impostos (IOF), seguros obrigatórios e taxas administrativas bancárias."
          }
        },
        {
          "@type": "Question",
          "name": "4. Vale a pena antecipar parcelas de um financiamento?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, altamente recomendável. Ao antecipar o pagamento do saldo devedor (amortização extraordinária), o banco é obrigado a conceder desconto proporcional de 100% dos juros futuros que incidiriam sobre aquela parcela."
          }
        },
        {
          "@type": "Question",
          "name": "5. Como calcular a porcentagem de desconto de um produto?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Basta multiplicar o preço original do produto pela taxa de desconto decimal (ex: 20% é 0,20) para encontrar o valor do desconto em reais. Subtraia esse resultado do valor original para saber o preço final."
          }
        },
        {
          "@type": "Question",
          "name": "6. Qual a carga tributária simplificada cobrada de um MEI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O MEI paga mensalmente uma guia única de imposto (DAS-MEI) que varia conforme a atividade (comércio, indústria ou serviço). O valor varia de aproximadamente R$ 70 a R$ 85, englobando o INSS, ICMS e ISS."
          }
        },
        {
          "@type": "Question",
          "name": "7. Como a inflação afeta o reajuste do aluguel anual?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Os contratos de locação são reajustados por índices inflacionários como o IGP-M ou o IPCA. No mês de aniversário do contrato, aplica-se o acumulado desses índices nos últimos 12 meses sobre o valor do aluguel."
          }
        }
      ]
    }
  ]
};

export default function FinanceiroHubPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden pb-12">
      
      {/* INJEÇÃO DE SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER (Finance Variant - Verde) --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Ferramentas Financeiras"
          description="Deixe a matemática conosco. Ferramentas precisas para você investir melhor, quitar dívidas e entender cada centavo dos seus juros."
          category="Gestão Patrimonial"
          icon={<Landmark size={32} strokeWidth={2} />}
          variant="finance" 
          categoryColor="green"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Financeiro" }
          ]}
        />
      </div>{/* --- CONTEUDO --- */}
      <div className="px-4 flex flex-col gap-8 max-w-7xl mx-auto w-full">
          
          {/* ANÚNCIO TOPO */}
          <div className="w-full flex justify-center mb-10">
             <LazyAdUnit slot="fin_hub_top" format="horizontal" variant="software" className="min-h-[100px] w-full" />
          </div>

          {/* --- GRID DE FERRAMENTAS --- */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card Juros Compostos */}
            <Link href="/financeiro/juros-compostos" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={100} className="text-green-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <TrendingUp size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Juros Compostos</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                  O segredo dos investidores. Simule aportes mensais e veja o efeito "bola de neve" no seu patrimônio a longo prazo.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-lg group-hover:bg-green-100 transition-colors">
                  Simular Investimento <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Financiamento */}
            <Link href="/financeiro/financiamento" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Landmark size={100} className="text-indigo-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Calculator size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Financiamento (Price/SAC)</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                  Vai comprar casa ou carro? Compare as tabelas, descubra o valor da primeira parcela e o custo total dos juros (CET).
                </p>
                <span className="inline-flex items-center text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  Calcular Parcelas <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Financiamento Veículos */}
            <Link href="/financeiro/financiamento-veiculos" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Car size={100} className="text-blue-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Car size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Financiamento de Veículos</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                  Sonhando com o carro novo? Simule as parcelas, descubra a taxa real de juros e evite armadilhas no seu financiamento.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  Simular Carro <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Porcentagem */}
            <Link href="/financeiro/porcentagem" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Percent size={100} className="text-purple-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Percent size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Calculadora de Porcentagem</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                  Ferramenta 4 em 1. Calcule descontos, aumentos, variação entre dois valores e quanto X representa de Y.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-purple-600 bg-purple-50 px-4 py-2 rounded-lg group-hover:bg-purple-100 transition-colors">
                  Calcular % <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Salário Líquido (Cross-link) */}
            <Link href="/financeiro/salario-liquido" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wallet size={100} className="text-blue-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <DollarSign size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Salário Líquido</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                  Planejamento começa sabendo quanto você ganha. Desconte INSS e IRRF e veja seu poder de compra real.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  Ver Líquido <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

          </section>
          

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            
            {/* Comparador de Renda (NOVO) */}
            <Link href="/financeiro/comparador-salario" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                 <BarChart3 size={100} className="text-indigo-600" />
               </div>
               <div className="p-8 h-full flex flex-col items-start bg-indigo-50/50 dark:bg-indigo-900/10">
                 <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                   <BarChart3 size={28} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Comparador de Renda</h2>
                 <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-1">
                   Você é rico ou pobre? Descubra sua posição na pirâmide salarial do Brasil comparando com dados estatísticos reais.
                 </p>
                 <span className="inline-flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                   Comparar Agora <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </span>
               </div>
            </Link>

             {/* Calculadora MEI */}
            <Link href="/financeiro/calculadora-mei" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Briefcase size={100} className="text-emerald-600" />
               </div>
               <div className="p-8 h-full flex flex-col items-start bg-emerald-50/50 dark:bg-emerald-900/10">
                 <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                   <Briefcase size={28} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Calculadora MEI 2026</h2>
                 <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-1">
                   Guia completo para Microempreendedores. Calcule DAS, limite de faturamento anual e proporcional.
                 </p>
                 <span className="inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-lg group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                   Acessar MEI <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </span>
               </div>
            </Link>

            {/* Dias Úteis */}
            <Link href="/financeiro/calculadora-dias-uteis" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Calendar size={100} className="text-blue-600" />
               </div>
               <div className="p-8 h-full flex flex-col items-start bg-blue-50/50 dark:bg-blue-900/10">
                 <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                   <Calendar size={28} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Dias Úteis</h2>
                 <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-1">
                   Some dias a uma data ou calcule prazos excluindo feriados e fins de semana. Essencial para boletos e prazos.
                 </p>
                 <span className="inline-flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                   Contar Dias <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </span>
               </div>
            </Link>

             {/* Reforma Tributária */}
            <Link href="/financeiro/reforma-tributaria" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Landmark size={100} className="text-amber-600" />
               </div>
               <div className="p-8 h-full flex flex-col items-start bg-amber-50/50 dark:bg-amber-900/10">
                 <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                   <Landmark size={28} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Reforma Tributária</h2>
                 <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-1">
                   Entenda o novo IVA (IBS + CBS) e como ele afeta serviços e produtos. Simulador de impacto tributário.
                 </p>
                 <span className="inline-flex items-center text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-lg group-hover:bg-amber-200 dark:group-hover:bg-amber-800 transition-colors">
                   Ver Reforma <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </span>
               </div>
            </Link>
          </section>

          {/* --- CONTEÚDO RICO --- */}
          <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm mt-10">
            
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
              <ShieldCheck className="text-green-600" size={32} /> Planejamento Financeiro e Decisões Inteligentes
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-lg mb-6">
              Nós sabemos perfeitamente que lidar com taxas de juros, parcelamentos e tributação no Brasil pode parecer um desafio intimidador. A verdade é que a falta de informação clara faz milhares de pessoas pagarem juros abusivos sem perceberem a bola de neve que estão criando.
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
              No <strong>Mestre das Contas</strong>, nossa missão é entregar simuladores matemáticos de alta precisão de forma gratuita e transparente. Queremos ajudar você a entender exatamente para onde vai seu dinheiro, seja simulando um financiamento pela tabela SAC, calculando juros compostos de investimentos ou comparando salários CLT vs PJ.
            </p>

            {/* TABELA COMPARATIVA DE CÁLCULO FINANCEIRO */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-6">
              Comparativo de Regimes de Juros e Amortização
            </h3>
            <div className="overflow-x-auto w-full rounded-2xl border border-slate-200 dark:border-slate-800 mb-8">
              <table className="min-w-[600px] w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Regime / Sistema</th>
                    <th className="p-4">Lógica Principal</th>
                    <th className="p-4">Aplicação Comum</th>
                    <th className="p-4">Impacto a Longo Prazo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Juros Simples</td>
                    <td className="p-4">Taxa incide apenas sobre o capital inicial</td>
                    <td className="p-4">Atrasos de contas de consumo, empréstimos informais</td>
                    <td className="p-4">Crescimento linear e previsível da dívida</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Juros Compostos</td>
                    <td className="p-4">Taxa incide sobre o saldo acumulado (juros sobre juros)</td>
                    <td className="p-4">Investimentos de renda fixa/variável, faturamento do cartão</td>
                    <td className="p-4">Crescimento exponencial da meta ou da dívida</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Tabela SAC</td>
                    <td className="p-4">Amortização constante; parcelas decrescentes</td>
                    <td className="p-4">Financiamento imobiliário de longo prazo</td>
                    <td className="p-4">Menor custo total de juros acumulados no fim</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Tabela Price</td>
                    <td className="p-4">Amortização crescente; parcelas fixas e iguais</td>
                    <td className="p-4">Financiamento de veículos, empréstimos pessoais</td>
                    <td className="p-4">Maior custo total de juros, mas parcelas iniciais menores</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SEÇÃO DE FAQ (7 PERGUNTAS) */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6 flex items-center gap-2">
              Perguntas Frequentes sobre Finanças e Cálculos
            </h3>
            <div className="space-y-4">
              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  1. Qual é a diferença entre juros simples e juros compostos?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  Nos juros simples, a taxa incide apenas sobre o valor principal inicial. Nos juros compostos (os chamados 'juros sobre juros'), a taxa incide sobre o capital inicial acrescido dos juros acumulados nos períodos anteriores.
                </div>
              </details>

              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  2. Como funciona a amortização pela Tabela Price e SAC?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  Na Tabela Price, as parcelas mensais são fixas e constantes, mas a amortização é crescente. No Sistema de Amortização Constante (SAC), a amortização é constante, fazendo as parcelas começarem mais caras e diminuírem ao longo do tempo.
                </div>
              </details>

              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  3. O que é o Custo Efetivo Total (CET) de um financiamento?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  O Custo Efetivo Total (CET) é a taxa real que resume todas as despesas de um financiamento ou empréstimo, incluindo juros, impostos (IOF), seguros obrigatórios e taxas administrativas bancárias.
                </div>
              </details>

              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  4. Vale a pena antecipar parcelas de um financiamento?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  Sim, altamente recomendável. Ao antecipar o pagamento do saldo devedor (amortização extraordinária), o banco é obrigado a conceder desconto proporcional de 100% dos juros futuros que incidiriam sobre aquela parcela.
                </div>
              </details>

              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  5. Como calcular a porcentagem de desconto de um produto?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  Basta multiplicar o preço original do produto pela taxa de desconto decimal (ex: 20% é 0,20) para encontrar o valor do desconto em reais. Subtraia esse resultado do valor original para saber o preço final.
                </div>
              </details>

              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  6. Qual a carga tributária simplificada cobrada de um MEI?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  O MEI paga mensalmente uma guia única de imposto (DAS-MEI) que varia conforme a atividade (comércio, indústria ou serviço). O valor varia de aproximadamente R$ 70 a R$ 85, englobando o INSS, ICMS e ISS.
                </div>
              </details>

              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  7. Como a inflação afeta o reajuste do aluguel anual?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  Os contratos de locação são reajustados por índices inflacionários como o IGP-M ou o IPCA. No mês de aniversário do contrato, aplica-se o acumulado desses índices nos últimos 12 meses sobre o valor do aluguel.
                </div>
              </details>
            </div>
          </div>

          <SmartCrossLinker currentHref="/financeiro" category="trabalhista" />
          
          {/* ANÚNCIO RODAPÉ */}
          <div className="w-full flex justify-center mt-8">
            <LazyAdUnit slot="fin_hub_bottom" format="auto" />
          </div>

      </div>
    </div>
  );
}