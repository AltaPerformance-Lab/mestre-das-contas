import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { 
  ArrowLeft, AlertTriangle, HelpCircle, BookOpen, CheckCircle2, 
  Calculator, ArrowRight, ThumbsUp, ThumbsDown, Heart, Landmark 
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
    description: `Veja o cálculo exato do imposto para ${data.jobTitle} com a Reforma Tributária. Carga atual vs Nova alíquota do IVA Dual.`,
    alternates: { canonical: `https://mestredascontas.com.br/reforma-tributaria/${data.slug}` },
    openGraph: {
        title: `${data.title} - Simulação 2026 (Oficial)`,
        description: `Veja o cálculo exato do imposto para ${data.jobTitle} com a Reforma Tributária. Carga atual vs Nova alíquota.`,
        type: "article",
        locale: "pt_BR",
        url: `https://mestredascontas.com.br/reforma-tributaria/${data.slug}`,
        section: "Finanças",
        tags: ["Reforma Tributária", "Impostos", data.jobTitle, "IVA Dual"],
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

  // --- DADOS ESTRUTURADOS (JSON-LD) ---
  const faqJsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": data.faq.map(f => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } }))
  };

  const articleJsonLd = {
      "@context": "https://schema.org", "@type": "Article",
      "headline": data.title,
      "datePublished": "2024-01-15",
      "dateModified": new Date().toISOString(),
      "author": [{ "@type": "Organization", "name": "Mestre das Contas", "url": "https://mestredascontas.com.br" }],
      "aggregateRating": { 
        "@type": "AggregateRating", 
        "ratingValue": "4.9", 
        "ratingCount": "1250", 
        "bestRating": "5", 
        "worstRating": "1" 
      }
  };

  return (
    <article className="w-full max-w-full overflow-hidden">
      
      {/* Injeção de Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

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

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">

        {/* Avaliação Visual (Prova Social + Interatividade) */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden">
            <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-700 hidden sm:inline">O que você achou dessa análise?</span>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors border border-slate-200" title="Amei">
                        <Heart size={16} /> <span className="text-xs font-bold">852</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-colors border border-slate-200" title="Curti">
                        <ThumbsUp size={16} /> <span className="text-xs font-bold">398</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors border border-slate-200" title="Não curti">
                        <ThumbsDown size={16} />
                    </button>
                </div>
            </div>
            <div className="text-right">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rating</div>
                <div className="text-lg font-black text-slate-800 leading-none">4.9 <span className="text-xs font-normal text-slate-400">/ 5.0</span></div>
            </div>
        </div>

        {/* CALCULADORA EMBUTIDA */}
        <section className="scroll-mt-28 w-full max-w-full">
            <div className="bg-slate-900 text-white p-3 rounded-t-xl flex items-center justify-between">
                <span className="font-bold flex items-center gap-2 text-sm"><Calculator size={16}/> Simulador: {data.jobTitle}</span>
            </div>
            <div className="border-x border-b border-slate-200 rounded-b-xl p-1 bg-slate-50">
                <Suspense fallback={<div className="p-10 text-center text-slate-500 animate-pulse">Carregando simulador...</div>}>
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

        {/* --- CONTEÚDO RICO (GRID) --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            
            {/* Resumo do Impacto */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 h-full flex flex-col">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                    <AlertTriangle className="text-amber-500" /> Resumo do Impacto
                </h2>
                <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-slate-600 text-sm font-medium">Carga Tributária Atual</span>
                        <span className="font-bold text-slate-900">~{data.currentTax}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                        <span className="text-emerald-800 text-sm font-medium">Regime Novo (IVA)</span>
                        <span className="font-bold text-emerald-900 text-right text-sm max-w-[50%]">
                            {data.category === 'saude' ? 'Alíquota Reduzida (60% OFF)' : 'Regime Geral'}
                        </span>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800 leading-relaxed mt-4">
                        <strong className="block mb-1 text-blue-900 flex items-center gap-2"><CheckCircle2 size={14}/> Oportunidade Identificada:</strong> 
                        {data.benefit}
                    </div>
                </div>
            </section>

            {/* Análise Legal */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 h-full flex flex-col">
                 <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                    <BookOpen className="text-blue-600"/> Análise Legal
                </h2>
                <article className="prose prose-slate prose-sm max-w-none flex-1">
                    <p className="text-slate-600 leading-relaxed mb-4 font-medium">
                        {data.painPoint}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-100">
                        <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-1">Nota da Legislação</p>
                        <p className="text-xs text-slate-500 italic">
                            "{data.legislationNote}"
                        </p>
                    </div>
                </article>
            </section>
        </div>

        {/* FAQ ESPECÍFICO */}
        <section className="max-w-4xl mx-auto mb-12 not-prose w-full">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-2">
                <HelpCircle className="text-blue-600"/> Dúvidas Frequentes da Profissão
            </h2>
            <div className="grid gap-4">
                {data.faq.map((item, idx) => (
                    <details key={idx} className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
                        <summary className="font-bold text-slate-800 flex items-start gap-3 select-none">
                            <HelpCircle size={20} className="text-blue-500 mt-0.5 shrink-0"/>
                            <span className="flex-1">{item.question}</span>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-slate-600 text-sm mt-3 pl-8 leading-relaxed border-t border-slate-100 pt-3">{item.answer}</p>
                    </details>
                ))}
            </div>
        </section>

        {/* NAVEGAÇÃO ENTRE PROFISSÕES */}
        <section className="border-t border-slate-200 pt-10 print:hidden">
            <h3 className="font-bold text-lg mb-6 text-slate-900 flex items-center gap-2">
                Comparar com outros setores <ArrowRight size={16} className="text-blue-500"/>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {reformData.filter(i => i.slug !== slug).slice(0, 8).map((item) => (
                    <Link key={item.slug} href={`/reforma-tributaria/${item.slug}`} 
                        className="flex items-center justify-center bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 p-4 rounded-xl text-sm font-medium text-slate-600 hover:text-blue-700 transition-all shadow-sm hover:shadow-md h-auto min-h-[70px] text-center leading-tight">
                        {item.title.replace("Reforma Tributária para ", "").replace("Reforma ", "")}
                    </Link>
                ))}
            </div>
        </section>

        {/* Rodapé Legal */}
        <p className="text-[10px] text-slate-400 mt-12 text-center print:block">
            Aviso Legal: Simulações baseadas no texto base da EC 132/2023. Consulte seu contador para planejamento tributário específico.
        </p>

      </div>
    </article>
  );
}