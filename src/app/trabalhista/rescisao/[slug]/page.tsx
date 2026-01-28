import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import TerminationCalculator from "@/components/calculators/TerminationCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { terminationCases } from "@/data/termination-pseo";
import { Calculator, ArrowLeft, Star, Briefcase, FileText } from "lucide-react";

// --- SSG ---
export async function generateStaticParams() {
    return terminationCases.map((customCase) => ({
        slug: customCase.slug,
    }));
}

// --- METADATA ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const customCase = terminationCases.find(c => c.slug === slug);

    if (!customCase) return {};

    // Título Magnético (CTR Booster)
    const year = new Date().getFullYear();
    const title = `${customCase.title}: Simulador e Cálculo Exato (${year})`;
    
    // Descrição Focada em Dor/Solução
    const description = `Vai sair da empresa? Calcule agora sua ${customCase.title}. Veja o valor da multa, férias, 13º e saldo de salário. Simulação gratuita e atualizada pela CLT.`;

    return {
        title,
        description,
        keywords: customCase.keywords,
        alternates: { canonical: `https://mestredascontas.com.br/trabalhista/rescisao/${slug}` },
        openGraph: {
            title,
            description,
            url: `https://mestredascontas.com.br/trabalhista/rescisao/${slug}`,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        }
    };
}

export default async function TerminationPSeoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const customCase = terminationCases.find(c => c.slug === slug);

    if (!customCase) {
        notFound();
    }

    // JSON-LD Dinâmico (Dual: App + FAQPage)
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
                "name": `Como calcular ${customCase.title}`,
                "description": `Passo a passo para simular os valores da sua ${customCase.title} de forma exata e atualizada.`,
                "totalTime": "PT3M",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Informe os Dados do Contrato",
                        "text": "Preencha seu salário bruto, data de admissão e data de afastamento.",
                        "url": `https://mestredascontas.com.br/trabalhista/rescisao/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Verifique o Motivo",
                        "text": `O motivo "${customCase.reasonLabel}" já está selecionado. Confirme se é este o seu caso.`,
                        "url": `https://mestredascontas.com.br/trabalhista/rescisao/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Detalhes Adicionais",
                        "text": "Informe se possui férias vencidas ou dependentes (salário família).",
                        "url": `https://mestredascontas.com.br/trabalhista/rescisao/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Confira o Resultado",
                        "text": "Veja o resumo detalhado das verbas rescisórias e descontos oficiais.",
                        "url": `https://mestredascontas.com.br/trabalhista/rescisao/${slug}`
                    }
                ]
            }
        ]
    };

    
    let initialReasonValue = "sem_justa_causa";
    if (slug === "pedido-de-demissao") initialReasonValue = "pedido_demissao";
    
    return (
        <article className="w-full max-w-full overflow-hidden font-sans pb-12 bg-slate-50 dark:bg-slate-950">
             <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HEADER */}
            <div className="px-4 pt-4 md:pt-6">
                <PageHeader 
                    title={customCase.title}
                    description={customCase.description}
                    category="Direitos Trabalhistas"
                    icon={<Briefcase size={32} strokeWidth={2} />}
                    variant="default"
                    categoryColor="indigo"
                    badge="Cálculo Exato"
                    breadcrumbs={[
                        { label: "Trabalhista", href: "/trabalhista" },
                        { label: "Rescisão", href: "/trabalhista/rescisao" },
                        { label: customCase.reasonLabel }
                    ]}
                    rating={customCase.rating}
                    reviews={customCase.reviewsCount}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
                
                {/* BACK LINK */}
                <div className="print:hidden">
                    <Link href="/trabalhista/rescisao" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <ArrowLeft size={16} className="mr-1"/> Voltar para Calculadora Geral
                    </Link>
                </div>

                {/* ANÚNCIO TOP */}
                <div className="w-full flex justify-center">
                    <LazyAdUnit slot="termination_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
                </div>

                {/* FERRAMENTA PRE-FILLED */}
                <section id="ferramenta" className="w-full relative z-10">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30 p-4 rounded-xl mb-6 flex items-start gap-3 print:hidden shadow-sm transition-colors">
                        <Briefcase className="text-indigo-600 dark:text-indigo-400 mt-1 shrink-0" size={20}/>
                        <div>
                            <p className="font-bold text-indigo-900 dark:text-indigo-100 text-sm">Simulação de {customCase.reasonLabel}</p>
                            <p className="text-indigo-800 dark:text-indigo-200 text-xs mt-1">
                                O formulário abaixo já está configurado para o motivo selecionado.
                            </p>
                        </div>
                    </div>

                    <PrivacyBadge />
                    
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-4 md:p-8">
                        <TerminationCalculator 
                            initialReason={initialReasonValue}
                        />
                        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <DisclaimerBox />
                        </div>
                    </div>
                </section>

                {/* ANÚNCIO MID */}
                <div className="w-full flex justify-center my-4 print:hidden">
                   <LazyAdUnit slot="termination_mid" format="auto" className="min-h-[100px] w-full max-w-4xl" />
                </div>

                {/* ARTIGO ESPECÍFICO */}
                <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden mt-8">
                     
                     <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-indigo-600 pl-4 flex items-center gap-3">
                        <FileText className="text-indigo-600 dark:text-indigo-400"/> Entenda seus Direitos
                     </h2>
                     
                     <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                        <p dangerouslySetInnerHTML={{ __html: customCase.articleContent.intro }} />
                        
                        {customCase.articleContent.analysis && (
                            <div className="my-6">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Análise Detalhada</h3>
                                <div dangerouslySetInnerHTML={{ __html: customCase.articleContent.analysis }} className="space-y-4"/>
                            </div>
                        )}

                        {customCase.articleContent.rightsList && (
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800 my-6 not-prose">
                                <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3 text-lg">
                                    {customCase.articleContent.rightsList.title}
                                </h4>
                                <ul className="space-y-2">
                                    {customCase.articleContent.rightsList.items.map((item, idx) => (
                                        <li key={idx} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2 text-sm">
                                            {item.label && (
                                                <span className="font-bold text-indigo-800 dark:text-indigo-300 min-w-fit">{item.label}</span>
                                            )}
                                            <span dangerouslySetInnerHTML={{ __html: item.desc }} className="text-indigo-700 dark:text-indigo-200/80"/>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {customCase.articleContent.warningBox && (
                            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border-l-4 border-amber-500 my-8 not-prose">
                                <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
                                    ⚠️ {customCase.articleContent.warningBox.title}
                                </h4>
                                <p className="text-amber-800 dark:text-amber-200/90 text-sm">
                                    {customCase.articleContent.warningBox.text}
                                </p>
                            </div>
                        )}

                        {customCase.articleContent.lawText && (
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-slate-500 my-8">
                                <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-3 text-lg">
                                    <span className="text-2xl">⚖️</span> O que diz a Lei (CLT)?
                                </h4>
                                <div className="text-slate-700 dark:text-slate-300 italic" dangerouslySetInnerHTML={{ __html: customCase.articleContent.lawText }} />
                            </div>
                        )}

                        {customCase.articleContent.closing && (
                             <p dangerouslySetInnerHTML={{ __html: customCase.articleContent.closing }} />
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
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Briefcase size={18} className="text-indigo-500"/> Outros Tipos de Rescisão
                        </h4>
                        <div className="flex flex-wrap gap-2">
                             {terminationCases.filter(c => c.slug !== slug).map(c => (
                                 <Link key={c.slug} href={`/trabalhista/rescisao/${c.slug}`} className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                     {c.reasonLabel}
                                 </Link>
                             ))}
                        </div>
                     </div>
                </div>

                {/* --- CROSS SELLING (FERRAMENTAS ÚTEIS) --- */}
                <div className="mt-8 not-prose border-t border-slate-200 dark:border-slate-800 pt-8 print:hidden">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <Star size={22} className="text-amber-500"/> Ferramentas Recomendadas
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Link href="/trabalhista/seguro-desemprego" className="block group">
                            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:-translate-y-1">
                                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                                    <FileText size={24} className="text-white"/>
                                </div>
                                <h4 className="font-bold text-lg mb-1">Seguro Desemprego</h4>
                                <p className="text-blue-50 text-sm opacity-90">Veja se você tem direito e calcule quantas parcelas irá receber.</p>
                            </div>
                        </Link>
                        
                        <Link href="/financeiro/salario-liquido" className="block group">
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20 transition-transform group-hover:-translate-y-1">
                                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                                    <Briefcase size={24} className="text-white"/>
                                </div>
                                <h4 className="font-bold text-lg mb-1">Novo Salário Líquido</h4>
                                <p className="text-emerald-50 text-sm opacity-90">Vai mudar de emprego? Simule quanto cairá na conta com a nova proposta.</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* ANÚNCIO BOTTOM */}
                <div className="w-full flex justify-center mt-8">
                   <LazyAdUnit slot="termination_bottom" format="horizontal" variant="auto" className="min-h-[100px] w-full" />
                </div>

            </div>
        </article>
    );
}
