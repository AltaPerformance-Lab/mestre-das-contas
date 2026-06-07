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
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

export const metadata: Metadata = {
  title: "Simulador de Financiamento 2026 | Price vs SAC",
  description: "Vai comprar carro ou imóvel? Compare a tabela Price vs SAC e descubra quanto você realmente irá pagar de juros. Simulação gratuita de parcelas!",
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
    url: "https://mestredascontas.com.br/financeiro/financiamento",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Simulador de Financiamento" }] },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } } };

const faqList = [
  { 
    q: "Qual a diferença prática entre os sistemas Price e SAC?", 
    a: "Na Tabela Price, todas as parcelas mensais possuem valores fixos e iguais do início ao fim do contrato. Na SAC (Sistema de Amortização Constante), as parcelas começam mais caras e vão decrescendo a cada mês, resultando em um custo final de juros totais significativamente menor." 
  },
  { 
    q: "O que é o Custo Efetivo Total (CET) no financiamento?", 
    a: "O CET é a soma integral de todos os encargos cobrados no financiamento, incluindo a taxa de juros nominal, impostos federais (IOF), seguros obrigatórios e taxas de cadastro administrativas (TAC). É o indicador real de custo que você deve comparar entre bancos." 
  },
  { 
    q: "Vale a pena amortizar parcelas do financiamento antes do prazo?", 
    a: "Sim, absolutamente! Ao realizar amortizações extraordinárias de trás para frente (abater do saldo devedor), o banco retira 100% dos juros futuros sobre a cota quitada, encurtando o prazo final do contrato ou reduzindo a parcela." 
  },
  { 
    q: "É possível financiar 100% do valor de um veículo ou imóvel?", 
    a: "Geralmente os bancos e operadoras exigem uma entrada mínima regulamentar que varia de 10% a 20% para mitigar riscos de inadimplência. Financiar 100% do valor é extremamente raro em 2026 e costuma acarretar taxas de juros exorbitantes." 
  },
  { 
    q: "Qual a pontuação de Score recomendada para conseguir aprovação?", 
    a: "A pontuação recomendável de Score nos birôs de crédito (Serasa/SPC) é de pelo menos 700 pontos para garantir acesso às melhores taxas do mercado. Scores abaixo de 500 enfrentam restrições profundas de aprovação." 
  },
  {
    q: "O que acontece se eu atrasar o pagamento das parcelas do financiamento?",
    a: "Haverá cobrança de juros de mora diários e multa fixa contratual de 2%. Além disso, o atraso reiterado (geralmente acima de 3 parcelas) autoriza o banco a acionar a busca e apreensão do veículo ou leilão do imóvel fiduciário."
  },
  {
    q: "Como funciona a portabilidade de financiamento de um banco para outro?",
    a: "Você pode solicitar uma proposta de portabilidade para outro banco que ofereça taxas de juros menores. O novo banco quita a sua dívida original e abre um novo financiamento com taxas reduzidas sob as novas condições fiscais."
  }
];

export default async function FinanciamentoPage() {
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
        "dateModified": new Date().toISOString(),
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

  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Simulador de Financiamento"
          description="Vai realizar o sonho da casa própria ou do carro novo? Use nosso simulador para comparar Tabela Price vs SAC e descobrir os juros reais antes de assinar."
          category="Crédito & Financiamento"
          icon={<Banknote size={32} strokeWidth={2} />}
          variant="default" 
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

        {/* ANÚNCIO TOPO */}
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
            Financiar é basicamente 'alugar dinheiro'. O banco compra o bem (carro ou casa) para você à vista, e você paga o banco de volta em parcelas mensais, com um 'aluguel' embutido chamado <strong>Juros</strong>. Nós sabemos que esse processo pode parecer complexo, mas entender cada linha é vital.
          </p>
          <p>
            O problema é que, no Brasil, esse aluguel é caro. Um financiamento mal planejado pode fazer você pagar <strong>dois ou até três carros</strong> pelo preço de um. Por isso, entender a matemática por trás (Price x SAC) é a única defesa do seu bolso. A verdade é que simular antes de assinar evita arrependimentos profundos.
          </p>

          {/* COMPARATIVO PRICE VS SAC */}
          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <Scale className="text-indigo-600" /> A Batalha: Tabela Price vs SAC
          </h3>
          <p>
              Essa é a dúvida número 1 nos bancos. Qual escolher? Veja o comparativo técnico em nossa tabela responsiva oficial:
          </p>

          {/* TABELA RESPONSIVA (PURE HTML) */}
          <div className="not-prose my-10 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-2">
                      <TrendingUp size={16} /> Comparativo de Tabela Price vs SAC
                  </h4>
              </div>
              
              <div className="overflow-x-auto w-full">
                  <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">
                          <tr>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Característica</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-blue-700 dark:text-blue-400">Tabela Price (Francês)</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-green-700 dark:text-green-400">Tabela SAC</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Parcelas Mensais</td>
                              <td className="px-6 py-4">Fixas (Iguais do início ao fim do prazo)</td>
                              <td className="px-6 py-4">Decrescentes (Começam altas e caem a cada mês)</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Amortização da Dívida</td>
                              <td className="px-6 py-4 text-rose-500 font-semibold">Lenta (Mais juros no início do contrato)</td>
                              <td className="px-6 py-4 text-emerald-600 font-semibold">Constante (Quitação rápida do principal)</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Custo Geral de Juros</td>
                              <td className="px-6 py-4 text-rose-600 font-bold">Mais Elevado</td>
                              <td className="px-6 py-4 text-emerald-600 font-bold">Mais Econômico</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Uso Mais Recomendável</td>
                              <td className="px-6 py-4">Financiamento de veículos, parcelas fixas</td>
                              <td className="px-6 py-4">Financiamento imobiliário de longo prazo</td>
                          </tr>
                      </tbody>
                  </table>
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
                      O gerente do banco te diz: <em>"A nossa taxa nominal é de apenas 1,29% ao mês!"</em>. Parece fantástico, né? O melhor de tudo é que você pode confrontar essa informação exigindo a planilha oficial. Mas quando você lê o contrato, a taxa real passa de 1,90%. Por que?
                  </p>
                  <p>
                      Isso acontece por causa das taxas administrativas e impostos embutidos no CET:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2 pl-0 list-none">
                      <li className="bg-white/60 p-2 rounded border border-amber-100 flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> <strong>IOF:</strong> Imposto Federal sobre Operações Financeiras.</li>
                      <li className="bg-white/60 p-2 rounded border border-amber-100 flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> <strong>TAC:</strong> Tarifa de Abertura de Cadastro administrativa.</li>
                      <li className="bg-white/60 p-2 rounded border border-amber-100 flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> <strong>Seguros:</strong> Seguro obrigatório de morte ou invalidez.</li>
                      <li className="bg-white/60 p-2 rounded border border-amber-100 flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> <strong>Avaliação:</strong> Vistoria física do bem financiado.</li>
                  </ul>
                  <p className="font-medium mt-2 bg-white p-3 rounded-lg border border-amber-200 text-amber-800 shadow-sm">
                      <strong>Dica de Ouro:</strong> Nunca compare apenas a taxa de juros nominal anunciada. Compare sempre o <GlossaryTerm slug="cet-custo-efetivo-total">CET (Custo Efetivo Total)</GlossaryTerm>. Ele é o único indicador confiável de economia real.
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <ShieldCheck className="text-green-600" /> O Superpoder da Amortização
          </h3>
          <p>
              Você sabia que pode "voltar no tempo" e apagar juros abusivos contratados? Isso se chama <GlossaryTerm slug="amortizacao-price-sac">Amortização Extraordinária de Dívida</GlossaryTerm>.
          </p>
          <p>
              Quando você paga a parcela padrão do mês, a maior parte do dinheiro cobre apenas os juros mensais. A sua dívida real quase não baixa. No entanto, se você tiver R$ 1.000 sobrando de décimo terceiro ou férias e aplicar na <GlossaryTerm slug="amortizacao-price-sac">amortização</GlossaryTerm> de trás para frente, o banco retirará 100% dos juros daquele período.
          </p>

           {/* FONTES */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Fontes Oficiais
              </h3>
              <p className="text-xs text-slate-500 mb-3">Dados baseados na legislação vigente do Banco Central e economia brasileira:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600">
                  <a href="https://www.bcb.gov.br/acessibilidade/calculadora" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                      Calculadora do Cidadão (BCB) <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.planalto.gov.br/ccivil_03/leis/l8078.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                      Código de Defesa do Consumidor <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          <ExpertSignature updatedAt="Maio de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
        </div>

        <SmartGlossaryLinker currentHref="/financeiro/financiamento" category="financeiro" />
        <SmartCrossLinker currentHref="/financeiro/financiamento" category="financeiro" />

        {/* FAQ ACCORDION */}
        <div className="max-w-4xl mx-auto w-full print:hidden">
          <div className="mt-8 not-prose bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-600" /> Perguntas e Respostas sobre Financiamento
            </h2>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-900 open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all duration-200">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <div className="mt-1 bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 font-bold">?</div>
                              <span className="leading-snug text-slate-800 dark:text-slate-200 font-semibold">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <div className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm animate-in fade-in">
                          {item.a}
                      </div>
                  </details>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="financ_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}