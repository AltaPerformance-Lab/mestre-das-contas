
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { glossaryData, GlossaryEntry } from '@/data/glossary';
import PageHeader from '@/components/layout/PageHeader';
import SmartCrossLinker from '@/components/layout/SmartCrossLinker';
import { Book, ShieldCheck, ChevronRight, Share2, Info, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import LazyAdUnit from '@/components/ads/LazyAdUnit';
import ExpertSignature from '@/components/ui/ExpertSignature';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return glossaryData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = glossaryData.find((i) => i.slug === slug);
  if (!item) return { title: "Termo não encontrado" };

  return {
    title: `${item.term} | O que é e Como funciona em 2026`,
    description: item.definition,
    alternates: {
      canonical: `https://mestredascontas.com.br/glossario/${item.slug}`
    },
    openGraph: {
      title: `${item.term} | Significado Completo`,
      description: item.definition,
      url: `https://mestredascontas.com.br/glossario/${item.slug}`,
      type: 'article',
    },
  };
}

export default async function GlossaryEntryPage({ params }: Props) {
  const { slug } = await params;
  const item: GlossaryEntry | undefined = glossaryData.find((i) => i.slug === slug);

  if (!item) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "name": item.term,
      "description": item.definition,
      "inDefinedTermSet": "https://mestredascontas.com.br/glossario"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": (item.keyPoints || []).map(point => {
        const hasColon = point.includes(':');
        const question = hasColon 
          ? `O que é ${point.split(':')[0]}?` 
          : `Como funciona o ${item.term} (${point.substring(0, 30)}...)?`;
        
        return {
          "@type": "Question",
          "name": question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": point
          }
        };
      })
    }
  ];

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title={item.term}
          description="Definição atualizada e impacto prático na sua vida financeira em 2026."
          category="Definição de Termos"
          icon={<Info size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="slate"
          badge={item.category.toUpperCase()}
          breadcrumbs={[
            { label: "Glossário", href: "/glossario" },
            { label: item.term.substring(0, 15) + "..." }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 py-12 max-w-4xl mx-auto overflow-hidden">
        
        <div className="w-full flex justify-center mb-4 px-2">
           <LazyAdUnit slot="glossary_top" format="horizontal" variant="agency" />
        </div>
        
        {/* MAIN CONTENT */}
        <div className="bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden">
          
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6">
            <ShieldCheck size={16} className="shrink-0" /> Verificado por Especialistas 2026
          </div>

          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
            <p className="text-lg md:text-2xl font-medium text-slate-900 dark:text-white border-l-4 border-indigo-600 pl-4 md:pl-6 mb-10 leading-relaxed italic break-words">
              &quot;{item.definition}&quot;
            </p>

            <h2 className="text-xl md:text-2xl font-bold mb-4 break-words">Entenda em detalhes</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8 break-words text-sm md:text-base">
              {item.detailedContent}
            </p>

            {/* KEY POINTS */}
            {item.keyPoints && item.keyPoints.length > 0 && (
              <div className="my-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <ShieldCheck className="text-indigo-600" size={24} /> Pontos Cruciais para 2026
                </h3>
                <ul className="grid gap-4 list-none p-0">
                  {item.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                      <span className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed break-words">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* PRACTICAL EXAMPLE */}
            {item.practicalExample && (
              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 md:p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 my-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Book size={100} />
                </div>
                <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-400 mb-4 flex items-center gap-2 relative z-10">
                   <Info size={20} className="text-indigo-600" /> Exemplo Prático
                </h3>
                <p className="text-indigo-800 dark:text-indigo-300 text-base md:text-lg leading-relaxed italic relative z-10 break-words">
                   {item.practicalExample}
                </p>
              </div>
            )}

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 mb-10">
               <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Termos Relacionados</h4>
               <div className="flex flex-wrap gap-2">
                  {item.relatedTerms.map((term) => (
                    <Link 
                      key={term} 
                      href={`/glossario/${term}`}
                      className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition-all"
                    >
                      {term.replace(/-/g, ' ')}
                    </Link>
                  ))}
               </div>
            </div>
          </div>

          {/* SHARE & ACTION */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
             <Link href="/para-empresas" className="flex-1 bg-indigo-600 text-white text-center py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                Preciso de assessoria neste tema
             </Link>
             <button className="flex items-center justify-center gap-2 px-8 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <Share2 size={18} /> Compartilhar
             </button>
          </div>
        </div>
        
        {/* FAQ VISUAL (Para SEO de Conteúdo) */}
        {item.keyPoints && item.keyPoints.length > 0 && (
          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <HelpCircle className="text-indigo-600" size={24} /> Dúvidas Comuns sobre {item.term}
             </h3>
             <div className="space-y-4">
                {item.keyPoints.slice(0, 3).map((point, idx) => {
                  const hasColon = point.includes(':');
                  const question = hasColon 
                    ? point.split(':')[0] 
                    : `Detalhe importante sobre ${item.term}`;
                    
                  return (
                    <details key={idx} className="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer transition-all open:bg-white dark:open:bg-slate-950 open:shadow-md">
                      <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none select-none break-words text-sm md:text-base pr-2">
                        {question} <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-2">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 break-words">
                        {point}
                      </p>
                    </details>
                  );
                })}
             </div>
          </div>
        )}

        <div className="w-full flex justify-center my-4">
           <LazyAdUnit slot="glossary_bottom" format="auto" />
        </div>

        <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />

        {/* NAVIGATION */}
        <div className="flex justify-between items-center mt-8">
           <Link href="/glossario" className="text-slate-500 font-bold flex items-center hover:text-indigo-600 transition-colors">
              <ChevronRight className="rotate-180 mr-2" /> Voltar ao Glossário
           </Link>
        </div>

        <SmartCrossLinker currentHref={`/glossario/${item.slug}`} category={item.category === 'trabalhista' ? 'trabalhista' : 'financeiro'} />

      </div>
    </article>
  );
}
