import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react"; // <--- IMPORTANTE: Importe o Suspense
import { ArrowLeft, AlertTriangle, HelpCircle, BookOpen, CheckCircle2, Calculator } from "lucide-react";
import { reformData } from "@/data/reform-data";
import TaxReformCalculator from "@/components/calculators/TaxReformCalculator";

// 1. Gera as rotas estáticas no build
export async function generateStaticParams() {
  return reformData.map((item) => ({
    slug: item.slug,
  }));
}

// DEFINIÇÃO DO TIPO PARA NEXT.JS 15
type Props = {
  params: Promise<{ slug: string }>;
};

// 2. Metadata Otimizado
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const data = reformData.find((p) => p.slug === slug);
  if (!data) return {};

  const title = `${data.title} - Simulação 2026 (Oficial)`;
  const description = `Veja o cálculo exato do imposto para ${data.jobTitle} com a Reforma Tributária (EC 132). Carga atual vs Nova alíquota IVA Dual.`;

  return {
    title,
    description,
    alternates: {
        canonical: `https://mestredascontas.com.br/reforma-tributaria/${data.slug}`
    },
    openGraph: {
        title,
        description,
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

  // Valor padrão inteligente para a simulação
  const simulationValue = data.category === 'seletivo' || data.category === 'cesta' ? 100 : 10000;

  // Schema Markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faq.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "datePublished": "2024-01-15",
      "dateModified": new Date().toISOString(),
      "author": [{
          "@type": "Organization",
          "name": "Mestre das Contas",
          "url": "https://mestredascontas.com.br"
      }]
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">
      {/* INJEÇÃO DO SCHEMA NO HEAD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/financeiro/reforma-tributaria" className="hover:text-blue-600 transition-colors">Calculadora</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium truncate">{data.jobTitle}</span>
        </nav>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                <CheckCircle2 size={14} /> Dados Oficiais EC 132/2023
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                {data.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Descubra o impacto exato do novo IVA Dual (IBS + CBS) para <strong>{data.jobTitle}</strong> e veja como preparar seu planejamento tributário para 2026.
            </p>
        </div>

        {/* CALCULADORA (COM SUSPENSE) */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden mb-12 ring-1 ring-slate-900/5">
            <div className="bg-blue-600 p-4 flex items-center justify-center gap-2 text-white text-sm font-bold uppercase tracking-widest">
                <Calculator size={18} />
                Simulação: {data.jobTitle}
            </div>
            <div className="p-2 md:p-8 bg-slate-50/50">
                {/* --- AQUI ESTÁ A CORREÇÃO: SUSPENSE --- */}
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-500 text-sm">Carregando simulador...</p>
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
        </div>

        {/* CONTEÚDO RICO */}
        <div className="grid md:grid-cols-12 gap-10">
            
            <div className="md:col-span-8 space-y-8">
                
                {/* RESUMO RÁPIDO */}
                <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Resumo para {data.jobTitle}:</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="bg-slate-100 p-1 rounded mt-0.5"><AlertTriangle size={16} className="text-slate-600"/></div>
                            <span className="text-slate-700 text-sm md:text-base"><strong>Carga Atual Estimada:</strong> ~{data.currentTax}% (Varia conforme regime).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="bg-blue-100 p-1 rounded mt-0.5"><CheckCircle2 size={16} className="text-blue-600"/></div>
                            <span className="text-slate-700 text-sm md:text-base"><strong>Regime na Reforma:</strong> {data.category === 'saude' ? 'Alíquota Reduzida (60% desconto)' : 'Regime Geral do IVA'}.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="bg-green-100 p-1 rounded mt-0.5"><BookOpen size={16} className="text-green-600"/></div>
                            <span className="text-slate-700 text-sm md:text-base"><strong>Impacto Principal:</strong> {data.painPoint.split('.')[0]}.</span>
                        </li>
                    </ul>
                </section>

                {/* ANÁLISE DETALHADA */}
                <article className="prose prose-slate max-w-none">
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                        Análise de Impacto: {data.jobTitle}
                    </h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        {data.painPoint}
                    </p>
                    
                    <div className="my-6 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
                        <h3 className="text-blue-900 font-bold text-lg mb-2 mt-0">Oportunidade Oculta</h3>
                        <p className="text-blue-800 m-0">{data.benefit}</p>
                    </div>

                    <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mt-8">
                        O que diz a Lei (EC 132)?
                    </h2>
                    <p className="text-slate-700">
                        {data.legislationNote} A transição começa oficialmente em 2026 com uma alíquota de teste de 0.9% (CBS) e 0.1% (IBS), sendo totalmente implementada até 2033.
                    </p>
                </article>

                {/* FAQ */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Perguntas Frequentes</h2>
                    <div className="space-y-4">
                        {data.faq.map((item, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-900 flex items-start gap-2 mb-2">
                                    <HelpCircle size={18} className="text-blue-500 mt-0.5 shrink-0"/> {item.question}
                                </h3>
                                <p className="text-slate-600 text-sm pl-7 leading-relaxed">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <p className="text-xs text-slate-400 mt-8 border-t pt-4">
                    <strong>Aviso Legal:</strong> As simulações apresentadas são baseadas nas diretrizes da Emenda Constitucional 132/2023. Consulte seu contador.
                </p>

            </div>

            {/* SIDEBAR */}
            <aside className="md:col-span-4 space-y-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl sticky top-24">
                    <h3 className="font-bold text-lg mb-4 text-blue-100">Comparar Profissões</h3>
                    <ul className="space-y-3">
                        {reformData
                            .filter(i => i.slug !== slug) 
                            .slice(0, 8) 
                            .map((item) => (
                            <li key={item.slug}>
                                <Link href={`/reforma-tributaria/${item.slug}`} className="block text-sm text-slate-300 hover:text-white hover:bg-white/10 px-2 py-1.5 rounded transition-all">
                                    {item.title.replace("Reforma Tributária para ", "")}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <p className="text-xs text-slate-400 mb-3 text-center">Precisa de ajuda profissional?</p>
                        <Link href="/contato" className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg hover:shadow-blue-500/25">
                            Falar com Contador
                        </Link>
                    </div>
                </div>
            </aside>

        </div>
      </div>
    </div>
  );
}