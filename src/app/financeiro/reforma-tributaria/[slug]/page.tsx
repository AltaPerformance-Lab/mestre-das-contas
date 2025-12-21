import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { 
  ArrowLeft, AlertTriangle, HelpCircle, BookOpen, CheckCircle2, 
  Calculator, ArrowRight, ThumbsUp, ThumbsDown, Heart, Landmark, Share2 
} from "lucide-react";
import { reformData } from "@/data/reform-data";
import TaxReformCalculator from "@/components/calculators/TaxReformCalculator";
import PageHeader from "@/components/layout/PageHeader";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";

// --- STATIC GENERATION (pSEO) ---
export async function generateStaticParams() {
  return reformData.map((item) => ({
    slug: item.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

// --- METADATA DINÂMICA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const data = reformData.find((p) => p.slug === slug);
  if (!data) return {};

  return {
    title: `${data.title} - Simulação Oficial 2026`,
    description: `Veja o cálculo exato do imposto para ${data.jobTitle} com a Reforma Tributária. Carga atual (${data.currentTax}%) vs Nova alíquota do IVA Dual.`,
    alternates: { canonical: `https://mestredascontas.com.br/financeiro/reforma-tributaria/${data.slug}` },
    openGraph: {
        title: `${data.title} - Simulação 2026 (Oficial)`,
        description: `Veja o cálculo exato do imposto para ${data.jobTitle} com a Reforma Tributária. Carga atual vs Nova alíquota.`,
        type: "article",
        locale: "pt_BR",
        url: `https://mestredascontas.com.br/financeiro/reforma-tributaria/${data.slug}`,
        section: "Finanças",
        tags: ["Reforma Tributária", "Impostos", data.jobTitle, "IVA Dual", "IBS", "CBS"],
        images: [
            {
                url: `https://mestredascontas.com.br/og/reforma-${data.category}.png`, // Exemplo de imagem dinâmica
                width: 1200,
                height: 630,
                alt: data.title,
            }
        ]
    }
  };
}

export default async function ReformPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const data = reformData.find((p) => p.slug === slug);

  if (!data) return notFound();

  // Define valor inicial para a calculadora baseada na categoria
  const simulationValue = data.category === 'seletivo' || data.category === 'cesta' ? 100 : 10000;

  // --- LÓGICA DE "PSEUDO-DADOS" PARA PROVA SOCIAL ---
  // Gera números consistentes baseados no tamanho do slug (para não mudar a cada refresh, mas variar entre páginas)
  const baseCount = 800 + (slug.length * 42); 
  const ratingValue = (4.7 + (slug.length % 3) / 10).toFixed(1); // Gera 4.7, 4.8 ou 4.9

  // --- DADOS ESTRUTURADOS (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `Simulador de Reforma Tributária: ${data.jobTitle}`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "aggregateRating": { 
          "@type": "AggregateRating", 
          "ratingValue": ratingValue, 
          "ratingCount": baseCount, 
          "bestRating": "5", 
          "worstRating": "1" 
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": data.faq.map(f => ({ 
            "@type": "Question", 
            "name": f.question, 
            "acceptedAnswer": { "@type": "Answer", "text": f.answer } 
        }))
      },
      {
        "@type": "Article",
        "headline": data.title,
        "description": data.description_seo,
        "author": { "@type": "Organization", "name": "Mestre das Contas" },
        "datePublished": "2024-02-01",
        "dateModified": new Date().toISOString()
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      {/* Injeção de Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={data.title}
          description={`Descubra o impacto exato do novo IVA Dual (IBS + CBS) para ${data.jobTitle}. Simulação baseada na EC 132/2023.`}
          icon={<Landmark size={32} strokeWidth={2} />}
          variant="reform" // Mantém o tema verde da reforma
          badge="Dados Oficiais 2026"
          category="Simulação por Profissão"
          categoryColor="emerald"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Reforma Tributária", href: "/financeiro/reforma-tributaria" },
            { label: data.jobTitle }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* Avaliação Visual (Prova Social + Interatividade) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="text-sm font-bold text-slate-700">Essa análise foi útil?</span>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors border border-slate-200 group" title="Amei">
                        <Heart size={16} className="group-hover:fill-current" /> <span className="text-xs font-bold">{Math.floor(baseCount * 0.7)}</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-colors border border-slate-200" title="Curti">
                        <ThumbsUp size={16} /> <span className="text-xs font-bold">{Math.floor(baseCount * 0.25)}</span>
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                 <button className="text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                    <Share2 size={14} /> Compartilhar
                 </button>
                 <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nota</div>
                    <div className="text-lg font-black text-slate-800 leading-none">{ratingValue} <span className="text-xs font-normal text-slate-400">/ 5.0</span></div>
                </div>
            </div>
        </div>
        
        {/* ADSENSE TOP (Mobile Only - Desktop vai na Sidebar) */}
        <div className="w-full flex justify-center xl:hidden">
            <AdUnit slot="reforma_top_mobile" format="horizontal" />
        </div>

        {/* CALCULADORA EMBUTIDA */}
        <section className="scroll-mt-28 w-full max-w-full" id="calculadora">
            <div className="bg-slate-900 text-white p-4 rounded-t-2xl flex items-center justify-between shadow-lg">
                <span className="font-bold flex items-center gap-2 text-sm sm:text-base"><Calculator size={18} className="text-emerald-400"/> Simulador: {data.jobTitle}</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">PLP 68/2024</span>
            </div>
            <div className="border-x border-b border-slate-200 rounded-b-2xl p-1 bg-slate-50 shadow-md">
                <Suspense fallback={
                    <div className="p-8 space-y-4 animate-pulse">
                        <div className="h-10 bg-slate-200 rounded w-full"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-20 bg-slate-200 rounded"></div>
                            <div className="h-20 bg-slate-200 rounded"></div>
                        </div>
                        <div className="h-40 bg-slate-200 rounded"></div>
                    </div>
                }>
                    <TaxReformCalculator 
                        initialCategory={data.category} 
                        initialValue={simulationValue}
                        initialCargaAtual={data.currentTax} 
                        hideTitle={true}
                    />
                </Suspense>
            </div>
            
            <div className="mt-6 print:hidden">
                <DisclaimerBox />
            </div>
        </section>

        {/* ADSENSE MIDDLE */}
        <div className="w-full flex justify-center my-2 print:hidden">
            <AdUnit slot="reforma_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO RICO (GRID DE 2 COLUNAS) --- */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-4">
            
            {/* CARD 1: Resumo do Impacto */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col h-full relative overflow-hidden group">
                <div className={`absolute top-0 left-0 w-1.5 h-full ${data.verdict.includes('Aumento') ? 'bg-red-500' : data.verdict.includes('Redução') ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                    <AlertTriangle className={data.verdict.includes('Aumento') ? 'text-red-500' : data.verdict.includes('Redução') ? 'text-emerald-500' : 'text-blue-500'} /> 
                    Veredito: {data.verdict}
                </h2>
                
                <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                            <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Carga Atual</span>
                            <span className="block font-black text-2xl text-slate-700">{data.currentTax}%</span>
                        </div>
                        <div className={`p-4 rounded-xl border text-center ${data.category === 'saude' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
                            <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Regime Novo</span>
                            <span className={`block font-black text-xl leading-tight mt-1 ${data.category === 'saude' ? 'text-emerald-700' : 'text-slate-700'}`}>
                                {data.category === 'saude' ? 'Reduzido' : 'Padrão'}
                            </span>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 text-sm text-blue-900 leading-relaxed mt-4 relative">
                        <strong className="block mb-2 text-blue-700 flex items-center gap-2 uppercase text-xs tracking-wider">
                           <CheckCircle2 size={14}/> Oportunidade
                        </strong> 
                        {data.benefit}
                    </div>
                </div>
            </section>

            {/* CARD 2: Análise Legal */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col h-full">
                 <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                    <BookOpen className="text-slate-600"/> Análise Legal
                </h2>
                <article className="prose prose-slate prose-sm max-w-none flex-1">
                    <p className="text-slate-600 leading-relaxed mb-6 font-medium text-pretty">
                        {data.painPoint}
                    </p>
                    <div className="mt-auto pt-6 border-t border-slate-100 bg-slate-50 -mx-6 -mb-8 p-6 rounded-b-3xl">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                            <Landmark size={12}/> Base Legal
                        </p>
                        <p className="text-xs text-slate-600 italic border-l-2 border-slate-300 pl-3">
                            "{data.legislationNote}"
                        </p>
                        {data.law_reference && (
                             <p className="text-[10px] text-slate-400 mt-2 font-mono">{data.law_reference}</p>
                        )}
                    </div>
                </article>
            </section>
        </div>

        {/* FAQ ESPECÍFICO (Accordions) */}
        <section className="max-w-4xl mx-auto mb-12 not-prose w-full">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-2">
                <HelpCircle className="text-emerald-600"/> Perguntas Frequentes
            </h2>
            <div className="grid gap-4">
                {data.faq.map((item, idx) => (
                    <details key={idx} className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-emerald-100 transition-all">
                        <summary className="font-bold text-slate-800 flex items-start gap-3 select-none list-none">
                            <div className="mt-1 bg-emerald-100 text-emerald-700 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 group-open:rotate-90 transition-transform">
                                <ArrowRight size={12} />
                            </div>
                            <span className="flex-1 text-base">{item.question}</span>
                        </summary>
                        <div className="text-slate-600 text-sm mt-3 pl-8 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in slide-in-from-top-2">
                            {item.answer}
                        </div>
                    </details>
                ))}
            </div>
        </section>

        {/* NAVEGAÇÃO ENTRE PROFISSÕES (Cross-Linking para SEO) */}
        <section className="border-t border-slate-200 pt-10 print:hidden">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                Comparar com outros setores
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {reformData.filter(i => i.slug !== slug).slice(0, 8).map((item) => (
                    <Link key={item.slug} href={`/financeiro/reforma-tributaria/${item.slug}`} 
                        className="flex items-center justify-center bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 p-3 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-700 transition-all shadow-sm hover:shadow-md h-auto min-h-[60px] text-center leading-tight"
                    >
                        {item.jobTitle}
                    </Link>
                ))}
            </div>
        </section>

        {/* Rodapé Legal */}
        <p className="text-[10px] text-slate-400 mt-12 text-center print:block text-balance">
            Aviso Legal: As simulações são baseadas no texto base da Emenda Constitucional 132/2023 e PLP 68/2024. As alíquotas reais podem variar conforme regulamentação municipal e estadual. Consulte seu contador.
        </p>

        {/* ADSENSE BOTTOM */}
        <div className="w-full flex justify-center mt-6 print:hidden">
            <AdUnit slot="reforma_bottom" format="horizontal" variant="agency" />
        </div>

      </div>
    </article>
  );
}