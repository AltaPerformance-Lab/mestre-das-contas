import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CardMachineSimulator from "@/components/calculators/CardMachineSimulator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { cardMachineCases } from "@/data/card-machine-pseo";
import { CreditCard, ArrowLeft, Star, ShoppingCart, TrendingDown } from "lucide-react";

// --- SSG ---
export async function generateStaticParams() {
    return cardMachineCases.map((customCase) => ({
        slug: customCase.slug,
    }));
}

// --- METADATA ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const customCase = cardMachineCases.find(c => c.slug === slug);

    if (!customCase) return {};

    return {
        title: `${customCase.title} | Mestre das Contas`,
        description: customCase.description,
        keywords: customCase.keywords,
        alternates: { canonical: `https://mestredascontas.com.br/financeiro/simulador-maquininha/${slug}` },
        openGraph: {
            title: customCase.title,
            description: customCase.description,
            url: `https://mestredascontas.com.br/financeiro/simulador-maquininha/${slug}`,
            type: "article",
        }
    };
}

export default async function CardMachinePSeoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const customCase = cardMachineCases.find(c => c.slug === slug);

    if (!customCase) {
        notFound();
    }

    // JSON-LD Dinâmico (Dual: App + FAQPage + HowTo)
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": customCase.title,
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web Browser",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
                "description": customCase.description,
                "aggregateRating": { 
                     "@type": "AggregateRating", 
                     "ratingValue": customCase.rating.toFixed(1), 
                     "ratingCount": customCase.reviewsCount.toString(),
                     "bestRating": "5", 
                     "worstRating": "1" 
                }
            },
            {
                "@type": "FAQPage",
                "mainEntity": customCase.articleContent.faq?.map(f => ({
                    "@type": "Question",
                    "name": f.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.answer
                    }
                })) || []
            },
            {
                "@type": "HowTo",
                "name": `Como calcular taxas da ${customCase.name}`,
                "description": `Passo a passo para usar o simulador de taxas ${customCase.name} e descobrir seu lucro real.`,
                "totalTime": "PT2M",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Digite o Valor da Venda",
                        "text": "Insira o valor total que você vai cobrar do cliente na maquininha.",
                        "url": `https://mestredascontas.com.br/financeiro/simulador-maquininha/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Escolha a Modalidade",
                        "text": "Selecione Débito, Crédito à Vista ou Parcelado.",
                        "url": `https://mestredascontas.com.br/financeiro/simulador-maquininha/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Defina as Parcelas",
                        "text": "Se for parcelado, escolha em quantas vezes. O simulador já aplica a taxa da ${customCase.name}.",
                        "url": `https://mestredascontas.com.br/financeiro/simulador-maquininha/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Resultado",
                        "text": "Veja exatamente quanto cai na sua conta e quanto você paga de taxa.",
                        "url": `https://mestredascontas.com.br/financeiro/simulador-maquininha/${slug}`
                    }
                ]
            }
        ]
    };

    return (
        <article className="w-full max-w-full overflow-hidden font-sans pb-12 bg-slate-50 dark:bg-slate-950">
             <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HEADER */}
            <div className="px-4 pt-4 md:pt-6">
                <PageHeader 
                    title={customCase.title}
                    description={customCase.description}
                    category="Simulador de Taxas"
                    icon={<CreditCard size={32} strokeWidth={2} />}
                    variant="default"
                    categoryColor={customCase.brandColor}
                    badge="Atualizado 2026"
                    breadcrumbs={[
                        { label: "Financeiro", href: "/financeiro" },
                        { label: "Maquininha", href: "/financeiro/simulador-maquininha" },
                        { label: customCase.name }
                    ]}
                    rating={customCase.rating}
                    reviews={customCase.reviewsCount}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
                
                {/* BACK LINK */}
                <div className="print:hidden">
                    <Link href="/financeiro/simulador-maquininha" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <ArrowLeft size={16} className="mr-1"/> Voltar para Simulador Geral
                    </Link>
                </div>

                {/* ANÚNCIO TOP */}
                <div className="w-full flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg p-2 print:hidden border border-dashed border-slate-200/50 dark:border-slate-800">
                    <LazyAdUnit slot="card_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
                </div>

                {/* FERRAMENTA PRE-FILLED */}
                <section id="ferramenta" className="w-full relative z-10">
                    <div className={`bg-${customCase.brandColor}-50 dark:bg-${customCase.brandColor}-950/20 border border-${customCase.brandColor}-100 dark:border-${customCase.brandColor}-900/40 p-4 rounded-xl mb-6 flex items-start gap-3 print:hidden shadow-sm transition-colors`}>
                        <CreditCard className={`text-${customCase.brandColor}-600 dark:text-${customCase.brandColor}-400 mt-1 shrink-0`} size={20}/>
                        <div>
                            <p className={`font-bold text-${customCase.brandColor}-900 dark:text-${customCase.brandColor}-100 text-sm`}>Simulação: {customCase.name}</p>
                            <p className={`text-${customCase.brandColor}-800 dark:text-${customCase.brandColor}-200 text-xs mt-1`}>
                                Taxas pré-carregadas: MDR <strong>{customCase.mdr}%</strong> e Antecipação <strong>{customCase.anticipation}%</strong>.
                            </p>
                        </div>
                    </div>

                    <PrivacyBadge />
                    
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-4 md:p-8">
                        <CardMachineSimulator 
                            initialMdr={customCase.mdr}
                            initialAnticipation={customCase.anticipation}
                            initialInstallments={customCase.initialInstallments}
                            brandName={customCase.name}
                        />
                         <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <DisclaimerBox />
                        </div>
                    </div>
                </section>

                {/* ANÚNCIO MID */}
                <div className="w-full flex justify-center my-4 print:hidden">
                   <LazyAdUnit slot="card_mid" format="auto" className="min-h-[100px] w-full max-w-4xl" />
                </div>

                {/* ARTIGO ESPECÍFICO */}
                <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden mt-8">
                     
                     <h2 className={`text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-l-4 border-${customCase.brandColor}-500 pl-4 flex items-center gap-3`}>
                        <TrendingDown className={`text-${customCase.brandColor}-500`}/> Análise: {customCase.name}
                     </h2>
                     
                     <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                        
                        {customCase.articleContent.introTitle && (
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                {customCase.articleContent.introTitle}
                            </h3>
                        )}
                        
                        <p dangerouslySetInnerHTML={{ __html: customCase.articleContent.introText }} />

                        {customCase.articleContent.analysis && (
                            <div className="my-6">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Por que escolher esta máquina?</h3>
                                <div dangerouslySetInnerHTML={{ __html: customCase.articleContent.analysis }} className="space-y-4"/>
                            </div>
                        )}

                        {customCase.articleContent.highlights && customCase.articleContent.highlights.length > 0 && (
                            <div className={`bg-${customCase.brandColor}-50 dark:bg-${customCase.brandColor}-950/30 p-6 rounded-2xl border border-${customCase.brandColor}-100 dark:border-${customCase.brandColor}-900 my-6 not-prose`}>
                                <h4 className={`font-bold text-${customCase.brandColor}-900 dark:text-${customCase.brandColor}-100 mb-3 flex items-center gap-2`}>
                                   {customCase.articleContent.highlightsTitle}
                                </h4>
                                <ul className={`list-disc pl-5 space-y-1 text-sm text-${customCase.brandColor}-800 dark:text-${customCase.brandColor}-200`}>
                                    {customCase.articleContent.highlights.map((item, idx) => (
                                        <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>
                        )}

                        {customCase.articleContent.closingText && (
                             <p dangerouslySetInnerHTML={{ __html: customCase.articleContent.closingText }} />
                        )}
                     </div>

                    {customCase.articleContent.faq && customCase.articleContent.faq.length > 0 && (
                        <>
                            <hr className="border-slate-200 dark:border-slate-800 my-8"/>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Perguntas Frequentes</h3>
                            <div className="space-y-4 mt-4 not-prose">
                                {customCase.articleContent.faq.map((f, i) => (
                                    <details key={i} className="group [&_summary::-webkit-details-marker]:hidden">
                                        <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-medium">
                                            <h4 className="text-sm font-bold m-0 text-slate-900 dark:text-white">{f.question}</h4>
                                            <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </summary>
                                        <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm">
                                            {f.answer}
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </>
                    )}

                     <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mt-8 not-prose">
                         <h4 className="font-bold text-slate-900 dark:text-white mb-2">Compare com outras marcas</h4>
                         <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                             Simuladores específicos para as principais bandeiras do mercado.
                         </p>
                         <div className="flex flex-wrap gap-2">
                              {cardMachineCases.filter(c => c.slug !== slug).map(c => (
                                  <Link key={c.slug} href={`/financeiro/simulador-maquininha/${c.slug}`} className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                      {c.name}
                                  </Link>
                              ))}
                         </div>
                     </div>
                </div>

                {/* --- FERRAMENTAS DO ECOSSISTEMA --- */}
                <div className="mt-12 not-prose border-t border-slate-200 dark:border-slate-800 pt-8 print:hidden">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <ShoppingCart size={22} className="text-emerald-500"/> Ferramentas para seu Negócio
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Link href="/financeiro/calculadora-mei" className="block group">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:-translate-y-1">
                                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                                    <Star size={24} className="text-white"/>
                                </div>
                                <h4 className="font-bold text-lg mb-1">Precisa de CNPJ?</h4>
                                <p className="text-blue-50 text-sm opacity-90">Abra seu MEI gratuitamente e pague taxas menores na maquininha.</p>
                            </div>
                        </Link>
                        
                        <Link href="/ferramentas/criador-pedidos" className="block group">
                            <div className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg shadow-purple-600/20 transition-transform group-hover:-translate-y-1">
                                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                                    <ShoppingCart size={24} className="text-white"/>
                                </div>
                                <h4 className="font-bold text-lg mb-1">Talão de Pedidos Digital</h4>
                                <p className="text-purple-50 text-sm opacity-90">Organize as vendas que você passa na maquininha sem usar papel.</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* ANÚNCIO BOTTOM */}
                <div className="w-full flex justify-center mt-8">
                   <LazyAdUnit slot="card_bottom" format="horizontal" variant="auto" className="min-h-[100px] w-full" />
                </div>

            </div>
        </article>
    );
}
