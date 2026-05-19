import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import FinancingCalculator from "@/components/calculators/FinancingCalculator";
import { calculateFinancing } from "@/lib/calculators/financing";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Calculator, HelpCircle, 
  TrendingUp, CheckCircle2,
  AlertTriangle, Percent, ShieldCheck, Banknote, Scale, 
  Landmark, ExternalLink
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DE ALTO VALOR (SEO 2026) ---
export const metadata: Metadata = {
  title: "Simulador de Financiamento 2026 | Price vs SAC",
  description: "Não feche negócio no escuro. Simule parcelas de carros e casas, compare Tabela Price vs SAC e economize milhares de reais em juros em 2026.",
  keywords: [
    "simulador financiamento veiculo", 
    "calcular financiamento imobiliario", 
    "tabela price ou sac qual a melhor", 
    "amortização financiamento", 
    "juros carro 2026", 
    "financiamento caixa simulador",
    "custo efetivo total cet"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/financeiro/financiamento" },
  openGraph: {
    title: "Calculadora de Financiamento 2026 (Price/SAC)",
    description: "Vai comprar carro ou casa? Simule antes e economize milhares de reais em juros.",
    url: "https://mestredascontas.com.br/financeiro/financiamento",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Simulador de Financiamento" }] },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } } };

// --- LISTA FAQ (Conteúdo Rico) ---
const faqList = [
    { q: "Qual a diferença entre Price e SAC?", a: "Na Tabela Price, as parcelas são fixas (iguais) do início ao fim, mas o total de juros pagos é maior. Na SAC (Sistema de Amortização Constante), as parcelas começam mais altas e vão diminuindo todo mês, resultando em um montante final mais barato." },
    { q: "O que é CET no financiamento?", a: "CET significa Custo Efetivo Total. É a soma da taxa de juros + taxas administrativas (TAC) + seguros + tarifas. É o valor real que você paga, e é sempre maior que a taxa de juros nominal anunciada pelo banco." },
    { q: "Vale a pena amortizar o financiamento?", a: "Sim! Ao adiantar parcelas (amortização extraordinária), você elimina 100% dos juros futuros daquele período. O desconto incide sobre o saldo devedor e pode reduzir anos da sua dívida." },
    { q: "Posso financiar 100% do veículo?", a: "É muito raro em 2026. A maioria dos bancos exige uma entrada mínima de 10% a 20% para aprovar o crédito, pois isso reduz o risco da operação e melhora a taxa de juros." },
    { q: "Qual o score ideal para financiar?", a: "Geralmente, um Score acima de 700 pontos garante taxas melhores. Abaixo de 500 pontos, a aprovação é difícil ou os juros serão muito elevados devido ao risco de inadimplência." }
];

export default async function FinanciamentoPage() {

  // --- DADOS ESTRUTURADOS (JSON-LD) "POWER COMBO" ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculadora de Financiamento Price/SAC",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": "Simulador profissional de financiamento para veículos e imóveis com comparação de sistemas de amortização." },
      {
        "@type": "Article",
        "headline": "Financiamento: O Guia Definitivo para Economizar Juros",
        "description": "Uma aula completa sobre taxas de juros, sistemas de amortização Price vs SAC e como economizar milhares de reais no seu contrato.",
        "author": { "@type": "Organization", "name": "Mestre das Contas" },
        "datePublished": "2024-01-20",
        "dateModified": new Date().toISOString(), // Mantém data atualizada
        "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqList.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
      }
    ]
  };


  // --- MODO PÁGINA COMPLETA ---
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      {/* INJEÇÃO DE SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Simulador de Financiamento"
          description="Vai realizar o sonho da casa própria ou do carro novo? Use nosso simulador para comparar Tabela Price vs SAC e descobrir os juros reais antes de assinar."
          category="Crédito & Financiamento"
          icon={<Banknote size={32} strokeWidth={2} />}
          variant="default" // Azul Institucional
          categoryColor="blue"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Financiamento" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        
        {/* REVISÃO FINANCEIRA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Conteúdo verificado com base em fórmulas de matemática financeira e indicadores econômicos vigentes em 2026.</span>
        </div>

        {/* ANÚNCIO TOPO (FIX CLS: Altura mínima reservada) */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="financ_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
                  <PrivacyBadge />
                  <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                    <FinancingCalculator />
                  </Suspense>
          </div>
          
          <div className="mt-6 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-4 print:hidden min-h-[250px]">
            <LazyAdUnit slot="financ_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL (SEO CONTENT) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              Financiamento: O Sonho ou o Pesadelo?
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            Financiar é basicamente "alugar dinheiro". O banco compra o bem (carro ou casa) para você à vista, e você paga o banco de volta em parcelas mensais, com um "aluguel" embutido chamado <strong>Juros</strong>.
          </p>
          <p>
            O problema é que, no Brasil, esse aluguel é caro. Um financiamento mal planejado pode fazer você pagar <strong>dois ou até três carros</strong> pelo preço de um. Por isso, entender a matemática por trás (Price x SAC) é a única defesa do seu bolso.
          </p>

          {/* COMPARATIVO PRICE VS SAC */}
          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <Scale className="text-indigo-600" /> A Batalha: Tabela Price vs SAC
          </h3>
          <p>
              Essa é a dúvida número 1 nos bancos. Qual escolher? Veja o comparativo técnico:
          </p>

          {/* TABELA RESPONSIVA (CORRIGIDO) */}
          <div className="not-prose my-8 overflow-hidden border rounded-xl border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-2">
                      <TrendingUp size={16}/> Comparativo de Sistemas
                  </h4>
              </div>
              
              {/* DESKTOP TABLE */}
              <div className="hidden md:block">
                  <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs">
                          <tr>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-800">Característica</th>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-800 text-blue-700 dark:text-blue-400">Tabela Price (Francês)</th>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-800 text-green-700 dark:text-green-400">Tabela SAC</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Parcelas</td>
                              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Fixas (Iguais do início ao fim)</td>
                              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Decrescentes (Começa alto, termina baixo)</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-900">Amortização</td>
                              <td className="px-6 py-4 text-slate-600">Lenta (Paga mais juros no início)</td>
                              <td className="px-6 py-4 text-slate-600">Constante (Abate a dívida mais rápido)</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-900">Juros Totais</td>
                              <td className="px-6 py-4 text-red-600 font-bold">Mais Caro</td>
                              <td className="px-6 py-4 text-green-600 font-bold">Mais Barato</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-900">Indicado para</td>
                              <td className="px-6 py-4 text-slate-600">Veículos ou renda mensal fixa</td>
                              <td className="px-6 py-4 text-slate-600">Imóveis e longo prazo</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              {/* MOBILE CARDS (TABBED STYLE VISUALIZATION) */}
              <div className="md:hidden p-4 space-y-6">
                 {/* PRICE */}
                 <div className="border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 bg-blue-50/30 dark:bg-blue-900/10">
                    <h5 className="font-bold text-blue-800 dark:text-blue-400 mb-3 border-b border-blue-100 dark:border-blue-800/50 pb-2">Tabela PRICE (Francês)</h5>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex gap-2"><span className="font-bold text-slate-700 dark:text-slate-300 w-24">Parcelas:</span> Fixas (Iguais sempre)</li>
                        <li className="flex gap-2"><span className="font-bold text-slate-700 dark:text-slate-300 w-24">Amortização:</span> Lenta (Paga juros primeiro)</li>
                        <li className="flex gap-2"><span className="font-bold text-slate-700 dark:text-slate-300 w-24">Custo Total:</span> <span className="text-red-500 font-bold">Mais Caro</span></li>
                        <li className="flex gap-2"><span className="font-bold text-slate-700 dark:text-slate-300 w-24">Onde usar:</span> Veículos / Renda Fixa</li>
                    </ul>
                 </div>

                 {/* SAC */}
                 <div className="border border-green-100 dark:border-green-900/30 rounded-xl p-4 bg-green-50/30 dark:bg-green-900/10">
                    <h5 className="font-bold text-green-800 dark:text-green-400 mb-3 border-b border-green-100 dark:border-green-800/50 pb-2">Tabela SAC</h5>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                         <li className="flex gap-2"><span className="font-bold text-slate-700 dark:text-slate-300 w-24">Parcelas:</span> Decrescentes (Caem todo mês)</li>
                         <li className="flex gap-2"><span className="font-bold text-slate-700 dark:text-slate-300 w-24">Amortização:</span> Constante (Rápida)</li>
                         <li className="flex gap-2"><span className="font-bold text-slate-700 dark:text-slate-300 w-24">Custo Total:</span> <span className="text-green-600 font-bold">Mais Barato</span></li>
                         <li className="flex gap-2"><span className="font-bold text-slate-700 dark:text-slate-300 w-24">Onde usar:</span> Imóveis / Longo Prazo</li>
                    </ul>
                 </div>
              </div>
          </div>

          {/* O VILÃO: CET */}
          <div className="bg-amber-50 dark:bg-amber-950/20 p-6 md:p-8 rounded-2xl border border-amber-200 dark:border-amber-900/50 my-10 not-prose relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Percent size={140} className="text-amber-900"/>
              </div>
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-400 mb-4 flex items-center gap-2 relative z-10">
                  <AlertTriangle size={24} className="text-amber-600 dark:text-amber-500"/> Cuidado com o CET (Custo Efetivo Total)
              </h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 relative z-10 text-sm md:text-base leading-relaxed">
                  <p>
                      O gerente do banco te diz: <em>"A taxa é só 1,29% ao mês!"</em>. Parece ótimo, né? Mas quando você assina, a taxa real sobe para 1,90% ou 2,00%. Por que?
                  </p>
                  <p>
                      Isso acontece por causa das taxas embutidas no CET:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2 pl-0 list-none">
                      <li className="bg-white/60 p-2 rounded border border-amber-100 flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> <strong>IOF:</strong> Imposto do Governo.</li>
                      <li className="bg-white/60 p-2 rounded border border-amber-100 flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> <strong>TAC:</strong> Tarifa de Cadastro.</li>
                      <li className="bg-white/60 p-2 rounded border border-amber-100 flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> <strong>Seguros:</strong> Prestamista (Morte/Invalidez).</li>
                      <li className="bg-white/60 p-2 rounded border border-amber-100 flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> <strong>Avaliação:</strong> Vistoria do bem.</li>
                  </ul>
                  <p className="font-medium mt-2 bg-white p-3 rounded-lg border border-amber-200 text-amber-800 shadow-sm">
                      <strong>Dica de Ouro:</strong> Nunca compare a "taxa de juros". Compare sempre o <strong>CET</strong>. É ele que define quanto vai sair do seu bolso.
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <ShieldCheck className="text-green-600" /> O Superpoder da Amortização
          </h3>
          <p>
              Você sabia que pode "voltar no tempo" e apagar juros? Isso se chama <strong>Amortização Extraordinária</strong>.
          </p>
          <p>
              Quando você paga a parcela do mês, grande parte daquele dinheiro é só para pagar os juros. A dívida real quase não baixa.
              Porém, se você tiver R$ 1.000 sobrando e adiantar as <strong>últimas parcelas</strong> (de trás pra frente), o banco é obrigado a retirar 100% dos juros daquele período.
          </p>

          {/* FAQ ACORDION (Schema Linkado) */}
          <div className="mt-16 not-prose">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <HelpCircle className="text-blue-600" /> Dúvidas Frequentes
            </h2>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:bg-white open:ring-1 open:ring-blue-100 transition-all">
                      <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <div className="mt-1 bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 font-bold">?</div>
                              <span className="leading-snug">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <div className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm animate-in fade-in slide-in-from-top-1">
                          {item.a}
                      </div>
                  </details>
              ))}
            </div>
          </div>

          {/* FONTES */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Fontes Oficiais
              </h3>
              <p className="text-xs text-slate-500 mb-3">Dados baseados na legislação vigente:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600">
                  <a href="https://www.bcb.gov.br/acessibilidade/calculadora" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                      Calculadora do Cidadão (BCB) <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.planalto.gov.br/ccivil_03/leis/l8078.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                      Código de Defesa do Consumidor <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </div>

        <SmartCrossLinker currentHref="/financeiro/financiamento" category="financeiro" />

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="financ_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}