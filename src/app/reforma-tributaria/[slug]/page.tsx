import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, AlertTriangle, HelpCircle, BookOpen, CheckCircle2, Calculator, ArrowRight } from "lucide-react";
import { reformData } from "@/data/reform-data";
import TaxReformCalculator from "@/components/calculators/TaxReformCalculator";

export async function generateStaticParams() {
  return reformData.map((item) => ({
    slug: item.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const data = reformData.find((p) => p.slug === slug);
  if (!data) return {};

  return {
    title: `${data.title} - Simulação 2026 (Oficial)`,
    description: `Veja o cálculo exato do imposto para ${data.jobTitle} com a Reforma Tributária. Carga atual vs Nova alíquota.`,
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

  const simulationValue = data.category === 'seletivo' || data.category === 'cesta' ? 100 : 10000;

  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": data.faq.map(f => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } }))
  };

  const articleJsonLd = {
      "@context": "https://schema.org", "@type": "Article",
      "headline": data.title,
      "datePublished": "2024-01-15",
      "dateModified": new Date().toISOString(),
      "author": [{ "@type": "Organization", "name": "Mestre das Contas", "url": "https://mestredascontas.com.br" }]
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="max-w-6xl mx-auto">
        
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
                Descubra o impacto exato do novo IVA Dual (IBS + CBS) para <strong>{data.jobTitle}</strong>.
            </p>
        </div>

        {/* CALCULADORA */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden mb-12 ring-1 ring-slate-900/5">
            <div className="bg-blue-600 p-4 flex items-center justify-center gap-2 text-white text-sm font-bold uppercase tracking-widest">
                <Calculator size={18} /> Simulação: {data.jobTitle}
            </div>
            <div className="p-2 md:p-8 bg-slate-50/50">
                <Suspense fallback={<div className="p-10 text-center text-slate-500">Carregando simulador...</div>}>
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
        <div className="grid md:grid-cols-2 gap-8 mb-16">
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-yellow-500"/> Resumo do Impacto
                </h2>
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <span className="text-slate-700 text-sm"><strong>Carga Atual:</strong> ~{data.currentTax}%</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-slate-700 text-sm"><strong>Regime Novo:</strong> {data.category === 'saude' ? 'Alíquota Reduzida (60% OFF)' : 'Regime Geral IVA'}.</span>
                    </li>
                    <li className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                        <strong>Oportunidade:</strong> {data.benefit}
                    </li>
                </ul>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
                 <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <BookOpen className="text-blue-600"/> O que diz a Lei?
                </h2>
                <article className="prose prose-slate max-w-none">
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {data.painPoint}
                    </p>
                    <p className="text-slate-500 text-xs border-t pt-3">
                        Nota Legal: {data.legislationNote}
                    </p>
                </article>
            </section>
        </div>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Perguntas Frequentes</h2>
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

        {/* NAVEGAÇÃO CORRIGIDA - BOTÕES NUNCA MAIS CORTAM */}
        <section className="border-t border-slate-200 pt-10">
            <h3 className="font-bold text-lg mb-6 text-slate-900 flex items-center gap-2">
                Comparar com outras profissões <ArrowRight size={16} className="text-blue-500"/>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {reformData.filter(i => i.slug !== slug).map((item) => (
                    <Link key={item.slug} href={`/reforma-tributaria/${item.slug}`} 
                        className="flex items-center justify-center bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 p-3 rounded-lg text-sm text-slate-600 hover:text-blue-700 transition-all shadow-sm hover:shadow-md h-auto min-h-[60px] whitespace-normal text-center leading-tight break-words">
                        {item.title.replace("Reforma Tributária para ", "").replace("Reforma ", "")}
                    </Link>
                ))}
            </div>
        </section>

        <p className="text-xs text-slate-400 mt-10 text-center">
            Aviso Legal: Simulações baseadas na EC 132/2023. Consulte seu contador.
        </p>

      </div>
    </div>
  );
}