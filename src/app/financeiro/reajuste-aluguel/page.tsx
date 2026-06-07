import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";
import RentCalculator from "@/components/calculators/RentCalculator";
import { Suspense } from "react";

import { 
  Home, TrendingUp, AlertTriangle, HelpCircle, 
  BarChart3, Scale, Calculator, ShieldCheck, BookOpen, ExternalLink, Landmark
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Reajuste de Aluguel 2026 (Grátis) | IGP-M e IPCA";
  const description = "Descubra o novo valor do seu aluguel em segundos. Tabela de índice oficial acumulada 2026. Compare IGP-M vs IPCA e aprenda a negociar. Ferramenta grátis.";

  return {
    title,
    description,
    keywords: ["calculadora reajuste aluguel", "tabela de indice de reajuste abril de 2026", "calculado para reajuste de aluguel 2026", "ipca acumulado aluguel", "reajuste anual aluguel"],
    alternates: { canonical: "https://mestredascontas.com.br/financeiro/reajuste-aluguel" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/financeiro/reajuste-aluguel",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article"
    },
    robots: { index: true, follow: true } };
}

// --- LISTA FAQ (Exatamente 7 Dúvidas Reais de Inquilinos e Locadores) ---
const faqList = [
  {
    q: "Como é calculado o reajuste anual do aluguel na prática?",
    a: "O reajuste é calculado aplicando o índice de inflação acumulado nos últimos 12 meses (geralmente IGP-M ou IPCA) sobre o valor atual do aluguel. A conta consiste em multiplicar o valor mensal pela taxa de reajuste em formato percentual."
  },
  {
    q: "Qual a diferença real entre reajustar pelo IGP-M ou pelo IPCA?",
    a: "O IGP-M (calculado pela FGV) sofre grande impacto do dólar e de commodities industriais, sendo mais volátil e sujeito a picos elevados. O IPCA (calculado pelo IBGE) mede a inflação oficial das famílias, sendo mais estável."
  },
  {
    q: "É legalmente obrigatório utilizar o IGP-M como índice no contrato?",
    a: "Não. A Lei do Inquilinato (Lei 8.245/91) veda apenas a indexação em moeda estrangeira ou ao salário mínimo. As partes são totalmente livres para adotar outros índices oficiais de inflação, como o IPCA ou o INPC."
  },
  {
    q: "O proprietário pode reajustar o aluguel acima do índice estipulado?",
    a: "Durante o aniversário anual do contrato, o índice fixado em contrato serve como o teto máximo permitido por lei. O proprietário só pode cobrar valores acima desse índice se houver um acordo consensual mútuo entre as partes."
  },
  {
    q: "Como inquilino e proprietário podem fazer uma negociação de reajuste amigável?",
    a: "Ambos devem analisar o mercado local de imóveis vazios na região. O inquilino pode apresentar propostas baseadas em índices de inflação oficiais mais estáveis, como o IPCA, para demonstrar o equilíbrio financeiro do contrato."
  },
  {
    q: "O que diz a Lei do Inquilinato (Lei 8.245/91) sobre o prazo e periodicidade de reajuste?",
    a: "A legislação brasileira estabelece que a periodicidade mínima obrigatória aplicável para qualquer reajuste de valor de aluguel residencial no país é de 1 ano comercial (12 meses de vigência do contrato)."
  },
  {
    q: "O que fazer se a imobiliária ou o proprietário se recusarem a negociar o reajuste?",
    a: "Caso não haja acordo consensual para reajuste, o inquilino deve quitar o boleto com o índice estipulado em contrato para evitar inadimplência, ou, se o contrato já estiver por prazo indeterminado, planejar a desocupação formal."
  }
];

export default async function RentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculadora de Reajuste de Aluguel - Mestre das Contas",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": "Ferramenta oficial para calcular o reajuste anual de aluguel baseado nos índices IGP-M ou IPCA acumulados."
      },
      {
        "@type": "Article",
        "headline": "Reajuste de Aluguel 2026: Guia de Índices, Direitos e Negociação",
        "description": "Entenda como funciona o reajuste anual de aluguel, a diferença jurídica entre IGP-M e IPCA e como propor acordos justos.",
        "author": { "@type": "Organization", "name": "Mestre das Contas" },
        "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
        "datePublished": "2024-02-10",
        "dateModified": new Date().toISOString()
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
    <div className="w-full max-w-full overflow-hidden font-sans pb-12 bg-slate-50 dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Reajuste de Aluguel"
          description="Chegou o aniversário do contrato? Não aceite qualquer valor de aumento. Calcule o reajuste oficial baseado no IGP-M ou IPCA acumulado e tenha argumentos sólidos para negociar."
          category="Habitação & Economia"
          icon={<Home size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="blue"
          badge="Tabela 2025/2026"
          breadcrumbs={[{ label: "Financeiro", href: "/financeiro" }, { label: "Reajuste Aluguel" }]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        
        {/* REVISÃO FINANCEIRA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Conteúdo verificado com base nos índices oficiais (FGV/IBGE) e indicadores econômicos vigentes em 2026.</span>
        </div>
        
        {/* PUBLICIDADE TOPO */}
        <div className="w-full flex justify-center">
           <LazyAdUnit slot="rent_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="w-full relative z-10">
           <div className="mb-8">
               <PrivacyBadge />
           </div>
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
               <RentCalculator />
           </Suspense>
        </section>

        {/* PUBLICIDADE MEIO */}
        <div className="w-full flex justify-center my-4">
           <LazyAdUnit slot="rent_mid" format="auto" className="min-h-[100px] w-full max-w-4xl" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DE ALTA PERFORMANCE (ADSENSE & AI GROUNDING) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden mt-8">
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-l-4 border-blue-600 pl-4 flex items-center gap-3">
               O Fantasma do Reajuste do Aluguel
            </h2>

            <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
                Você já passou pela desconfortável e estressante situação de receber aquela clássica cartinha ou e-mail da imobiliária anunciando o aniversário de 12 meses do seu contrato de locação?
            </p>

            <p>
                A verdade é que a chegada do mês de aniversário do aluguel costuma fazer com que muitos inquilinos percam o sono pelo temor de um reajuste abusivo.
            </p>

            <p>
                Veja bem, o valor do aluguel mensal funciona como o principal alicerce do orçamento de milhões de famílias e comércios no Brasil.
            </p>

            <p>
                Se esse alicerce sofre um abalo repentino e desproporcional sem que seu salário acompanhe a mesma taxa de crescimento, todo o equilíbrio financeiro do lar é colocado em risco.
            </p>

            <p>
                Parece um cenário injusto e sem saída, né? Contudo, a legislação e a dinâmica real do mercado imobiliário reservam ferramentas fundamentais de proteção para os inquilinos.
            </p>

            <p>
                O melhor de tudo? Nós preparamos este guia completo e exclusivo para dar a você os argumentos matemáticos e legais necessários na hora de negociar seu reajuste!
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-4 border-l-4 border-blue-600 pl-4">
                IGP-M vs IPCA: A Batalha dos Índices de Reajuste
            </h3>

            <p>
                Durante décadas, o mercado imobiliário brasileiro adotou de forma automática o <GlossaryTerm slug="igpm-indice-geral-de-precos-do-mercado">IGP-M</GlossaryTerm> (Índice Geral de Preços - Mercado) como o reajuste padrão nos contratos de locação.
            </p>

            <p>
                No entanto, o IGP-M, calculado pela Fundação Getulio Vargas (FGV), possui uma mecânica de apuração extremamente exposta ao comportamento do dólar e das commodities internacionais.
            </p>

            <p>
                Isso gerou um enorme problema para os inquilinos, provocando explosões de valor que chegaram a acumular mais de 30% em períodos curtos.
            </p>

            {/* TABELA COMPARATIVA DE ÍNDICES (MANDATORY RULE 4) */}
            <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider">Característica</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider bg-amber-600">IGP-M (FGV)</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider bg-blue-600">IPCA (IBGE)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-655 dark:text-slate-350">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Órgão Responsável</td>
                    <td className="px-6 py-4">FGV (Instituição privada corporativa)</td>
                    <td className="px-6 py-4">IBGE (Órgão oficial de estatísticas federais)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Fator de Maior Influência</td>
                    <td className="px-6 py-4 text-xs">Cotação do Dólar, Soja, Ferro e Atacado industrial.</td>
                    <td className="px-6 py-4 text-xs">Preço de Alimentos, Combustível, Saúde e Educação.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Nível de Estabilidade</td>
                    <td className="px-6 py-4 font-bold text-red-655">Volatilidade extrema com picos acentuados.</td>
                    <td className="px-6 py-4 font-bold text-emerald-655">Curva estável condizente com a inflação de consumo.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
                Histórico de Índices Acumulados de Inflação
            </h3>
            
            <p className="mb-6">
              Para fundamentar sua argumentação em negociações reais com proprietários, reunimos as taxas anuais históricas consolidadas dos principais índices nacionais de inflação.
            </p>
            
            {/* TABELA DE HISTÓRICO (MANDATORY RULE 4) */}
            <div className="overflow-x-auto mb-10 not-prose rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <table className="w-full text-sm text-left text-slate-650 dark:text-slate-350">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  <tr>
                    <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">Ano de Referência</th>
                    <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">IGP-M FGV Acumulado</th>
                    <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">IPCA IBGE Acumulado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-slate-900 dark:text-slate-100">2026 (Estimativa do Focus)</td>
                    <td className="p-4">4,50%</td>
                    <td className="p-4 text-emerald-600 font-semibold">4,10%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-slate-900 dark:text-slate-100">2025 (Dado Consolidado)</td>
                    <td className="p-4">5,25%</td>
                    <td className="p-4 text-emerald-600 font-semibold">4,62%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-slate-900 dark:text-slate-100">2024</td>
                    <td className="p-4 text-red-650 font-bold">-0,47% (Deflação)</td>
                    <td className="p-4">4,42%</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-[10px] text-slate-400 text-center italic p-2 bg-slate-50 dark:bg-slate-800">* Dados históricos extraídos das bases oficiais da FGV, IBGE e do Banco Central do Brasil.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 border-l-4 border-slate-900 dark:border-slate-500 p-6 rounded-r-xl not-prose my-8">
                 <h4 className="text-slate-900 dark:text-slate-100 font-bold flex items-center gap-2 text-lg m-0 mb-2">
                     <Scale size={20}/> O Segredo da Lei: O reajuste automático não é absoluto!
                 </h4>
                 <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed m-0">
                     A Lei do Inquilinato (Lei nº 8.245/91) estipula o índice acordado em contrato como o patamar de teto máximo de aumento permitido no período de aniversário de 12 meses. Nada impede inquilino e locador de pactuarem, em comum acordo, um percentual menor ou até mesmo o congelamento do valor mensal.
                 </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-4">
                Como Elaborar Uma Negociação de Sucesso de Reajuste
            </h3>
            <p>
                Informação sólida é o seu melhor escudo protetor. Siga este passo a passo antes de assinar novos termos:
            </p>
            <ol className="list-decimal pl-5 space-y-3 marker:text-blue-600 dark:marker:text-blue-400 font-medium text-slate-700 dark:text-slate-300 text-sm">
                <li><strong>Gere o Cálculo Exato:</strong> Utilize nossa calculadora para extrair o valor oficial indexado.</li>
                <li><strong>Pesquise Preços da Região:</strong> Verifique se há apartamentos desocupados no mesmo prédio ou vizinhança. O proprietário prefere negociar a perder você e arcar com meses de imóvel desocupado.</li>
                <li><strong>Proponha a Troca de Índice:</strong> Ofereça o <GlossaryTerm slug="ipca-indice-nacional-de-precos-ao-consumidor-amplo">IPCA</GlossaryTerm> como a alternativa oficial que acompanha a variação salarial real.</li>
            </ol>
              
            <ExpertSignature updatedAt="Junho de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
        </div>

        <SmartGlossaryLinker currentHref="/financeiro/reajuste-aluguel" category="financeiro" />
        <SmartCrossLinker currentHref="/financeiro/reajuste-aluguel" category="financeiro" />

        {/* FAQ */}
        <div className="max-w-4xl mx-auto w-full print:hidden">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-150 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-600" /> Perguntas Frequentes sobre Reajuste de Aluguel
            </h2>
            <div className="space-y-4">
                {faqList.map((item, idx) => (
                    <details key={idx} className="group bg-slate-50 dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-900 open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all duration-300">
                        <summary className="font-semibold text-slate-850 dark:text-slate-105 list-none flex justify-between items-center select-none">
                            <div className="flex items-start gap-3">
                                <span className="text-blue-500 dark:text-blue-400 font-bold text-xs mt-1">#</span>
                                <span className="leading-snug text-slate-800 dark:text-slate-200 font-semibold">{item.q}</span>
                            </div>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-650 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-855 pt-3 text-sm animate-in fade-in">
                            {item.a}
                        </p>
                    </details>
                ))}
            </div>
          </div>
        </div>

        {/* PUBLICIDADE BOTTOM */}
        <div className="w-full flex justify-center mt-8">
           <LazyAdUnit slot="rent_bottom" format="horizontal" variant="auto" className="min-h-[100px] w-full" />
        </div>

      </div>
    </div>
  );
}
