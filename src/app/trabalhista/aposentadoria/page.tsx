import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import InssRetirementCalculator from "@/components/calculators/InssRetirementCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Landmark, Clock, AlertTriangle, ShieldCheck, HelpCircle, 
  TrendingUp, Award, Calculator, Info, CheckCircle2, ExternalLink
} from "lucide-react";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Simulador e Calculadora de Aposentadoria INSS 2026 (Completo)";
  const description = "Simule sua aposentadoria com base nas 5 regras de transição da Reforma da Previdência. Calcule pontos, idade mínima e o valor estimado do benefício.";

  return {
    title,
    description,
    keywords: ["calculadora de aposentadoria", "simulador de aposentadoria inss", "regras de transicao inss 2026", "tempo de contribuicao aposentadoria", "reforma da previdencia"],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/aposentadoria" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/trabalhista/aposentadoria",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Simulador de Aposentadoria Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    }
  };
}

// --- DADOS ESTRUTURADOS & FAQ ---
const faqList = [
  { q: "Quais são as regras de transição da Reforma da Previdência para 2026?", a: "Para 2026, vigoram 5 regras de transição principais: 1) Transição por Pontos (93F / 103M), 2) Idade Mínima Progressiva (59,5F / 64,5M), 3) Pedágio de 50% (exclusivo para quem faltava menos de 2 anos em 2019), 4) Pedágio de 100% (com idade mínima de 57F / 60M) e 5) Aposentadoria por Idade (62F / 65M)." },
  { q: "Como funciona a regra do pedágio de 100%?", a: "Na regra do pedágio de 100%, o trabalhador deve completar a idade mínima exigida (57 anos para mulheres e 60 anos para homens) e trabalhar o dobro do tempo que faltava para se aposentar na data da Reforma (13/11/2019)." },
  { q: "Como é calculado o valor da aposentadoria após a Reforma?", a: "O valor padrão do benefício é 60% da média de todos os seus salários de contribuição desde julho de 1994, acrescido de 2% para cada ano que exceder 20 anos de contribuição (para homens) ou 15 anos de contribuição (para mulheres), limitado ao teto do INSS." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Simulador de Aposentadoria INSS",
      "applicationCategory": "FinancialApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta gratuita para simular regras de transição da Previdência Social e calcular o valor do benefício."
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

export default async function AposentadoriaPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Simulador de Aposentadoria INSS"
          description="Descubra quando você poderá se aposentar e faça a estimativa exata do valor do seu benefício com base nas regras de transição da Reforma da Previdência em 2026."
          category="Previdência & Trabalho"
          icon={<Landmark size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="blue"
          badge="Completo & Atualizado"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Aposentadoria" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO LEGAL (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2 print:hidden">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Informações legais e cálculos rigorosamente atualizados com a Emenda Constitucional nº 103 (Reforma da Previdência) e o teto do INSS vigente para 2026.</span>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="aposentadoria_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-xl p-1 md:p-2">
            <Suspense fallback={<div className="h-[600px] w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <InssRetirementCalculator />
            </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
            <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="aposentadoria_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-blue-500 pl-4">
               Entenda as 5 Regras de Transição da Aposentadoria em 2026
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
               A Reforma da Previdência (EC 103/2019) extinguiu a antiga aposentadoria por tempo de contribuição, criando regras de transição para quem já contribuía para a Previdência Social.
            </p>
            
            <div className="space-y-6 my-8">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-800 dark:text-white text-base flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-blue-500" /> 1. Regra de Transição por Pontos
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Soma-se a idade e o tempo de contribuição. Em 2026, os homens necessitam de **103 pontos** e as mulheres de **93 pontos**. O tempo mínimo de contribuição de 35 anos (homens) ou 30 anos (mulheres) é obrigatório.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-800 dark:text-white text-base flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-blue-500" /> 2. Idade Mínima Progressiva
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Exige idade mínima e tempo mínimo de contribuição. Em 2026, a idade mínima é de **64,5 anos para homens** e **59,5 anos para mulheres**. O tempo mínimo de contribuição é de 35 anos para homens e 30 anos para mulheres.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-800 dark:text-white text-base flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-blue-500" /> 3. Regra do Pedágio de 50%
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Destinada a quem estava a menos de 2 anos da aposentadoria em 13/11/2019 (tinha no mínimo 33 anos de contribuição se homem, ou 28 anos se mulher). Exige o cumprimento do tempo restante mais um pedágio de 50% desse período. Incide o fator previdenciário.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-800 dark:text-white text-base flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-blue-500" /> 4. Regra do Pedágio de 100%
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Exige idade mínima de **60 anos para homens** e **57 anos para mulheres**, além de cumprir um pedágio equivalente a 100% (o dobro) do tempo que faltava para atingir os 35/30 anos de contribuição em 2019. O valor do benefício é de 100% da média salarial.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-800 dark:text-white text-base flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-blue-500" /> 5. Aposentadoria por Idade (Regra de Transição)
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Exige idade de **65 anos para homens** e **62 anos para mulheres**, com tempo mínimo de contribuição de **15 anos** para ambos os sexos.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
                <Award className="text-blue-600 dark:text-blue-400" /> Como é calculado o valor da aposentadoria?
            </h3>
            <p>
               Desde a Reforma, a regra geral de cálculo de benefício considera 60% da média de todas as contribuições desde 1994, com acréscimo de 2% para cada ano trabalhado acima de 20 anos de contribuição para homens e 15 anos para mulheres.
            </p>
            <p>
               Na regra do pedágio de 100%, o benefício é integral (100% da média de contribuição), sem a redução da regra geral. Por isso, simular todas as opções é crucial para garantir a melhor remuneração mensal.
            </p>

            {/* FAQ ACCORDION */}
            <div className="mt-16 not-prose">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <HelpCircle className="text-blue-600 dark:text-blue-400" /> Perguntas Frequentes
              </h3>
              
              <div className="space-y-4">
                {faqList.map((item, idx) => (
                    <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                        <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            <div className="flex items-start gap-3">
                                <span className="text-blue-500 dark:text-blue-400 font-bold text-xs mt-1">#</span>
                                <span className="leading-snug">{item.q}</span>
                            </div>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm animate-in fade-in">
                            {item.a}
                        </p>
                    </details>
                ))}
              </div>
            </div>

            {/* REFERÊNCIAS OFICIAIS */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Landmark size={16} /> Base Legal
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Consulte a legislação original para mais detalhes:</p>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                    <a href="https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc103.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                        Emenda Constitucional nº 103/2019 (Reforma da Previdência) <ExternalLink size={10}/>
                    </a>
                    <a href="https://www.planalto.gov.br/ccivil_03/decreto/d3048.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                        Regulamento da Previdência Social (Decreto nº 3.048/99) <ExternalLink size={10}/>
                    </a>
                </div>
            </div>
            
            <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </div>

        {/* NAVEGAÇÃO FINAL */}
        <SmartCrossLinker currentHref="/trabalhista/aposentadoria" category="trabalhista" />

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="aposentadoria_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}
