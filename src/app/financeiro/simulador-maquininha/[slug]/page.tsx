import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CardMachineSimulator from "@/components/calculators/CardMachineSimulator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import ExpertSignature from "@/components/ui/ExpertSignature";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import { cardMachineCases } from "@/data/card-machine-pseo";
import { CreditCard, ArrowLeft, Star, ShoppingCart, TrendingDown, ShieldCheck, Wallet } from "lucide-react";

// --- SSG ---
export async function generateStaticParams() {
    return cardMachineCases.map((customCase) => ({
        slug: customCase.slug }));
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
            type: "article" }
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
                "description": customCase.description },
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
                        "text": `Se for parcelado, escolha em quantas vezes. O simulador já aplica a taxa da ${customCase.name}.`,
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
                    variant="finance"
                    categoryColor={customCase.brandColor}
                    badge="Taxas 2026"
                    breadcrumbs={[
                        { label: "Financeiro", href: "/financeiro" },
                        { label: "Maquininha", href: "/financeiro/simulador-maquininha" },
                        { label: customCase.name }
                    ]}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
                {/* REVISÃO COMERCIAL (E-E-A-T) */}
                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
                  <ShieldCheck size={18} className="text-blue-600 shrink-0" />
                  <span>Cálculo auditado conforme os planos vigentes de 2026 para taxas de MDR e antecipação bancária.</span>
                </div>
                
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
                    <div className={`
                        p-5 rounded-2xl mb-8 flex items-start gap-4 print:hidden shadow-sm border transition-all
                        ${customCase.brandColor === 'emerald' ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : ''}
                        ${customCase.brandColor === 'blue' ? 'bg-blue-50 border-blue-100 text-blue-900' : ''}
                        ${customCase.brandColor === 'slate' ? 'bg-slate-100 border-slate-200 text-slate-900' : ''}
                        ${customCase.brandColor === 'yellow' ? 'bg-yellow-50 border-yellow-200 text-yellow-900' : ''}
                        ${customCase.brandColor === 'cyan' ? 'bg-cyan-50 border-cyan-100 text-cyan-900' : ''}
                        ${customCase.brandColor === 'green' ? 'bg-green-50 border-green-100 text-green-900' : ''}
                        dark:bg-slate-900/50 dark:border-slate-800
                    `}>
                        <div className={`
                            p-2.5 rounded-xl shrink-0
                            ${customCase.brandColor === 'emerald' ? 'bg-emerald-100 text-emerald-600' : ''}
                            ${customCase.brandColor === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                            ${customCase.brandColor === 'slate' ? 'bg-slate-200 text-slate-600' : ''}
                            ${customCase.brandColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' : ''}
                            ${customCase.brandColor === 'cyan' ? 'bg-cyan-100 text-cyan-600' : ''}
                            ${customCase.brandColor === 'green' ? 'bg-green-100 text-green-600' : ''}
                            dark:bg-slate-800 dark:text-slate-400
                        `}>
                            <CreditCard size={24} strokeWidth={2.5}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="font-black text-slate-900 dark:text-white text-base md:text-lg leading-tight">
                                Simulação: {customCase.name}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                                Taxas oficiais 2026: MDR <span className="text-slate-900 dark:text-slate-200 font-bold">{customCase.mdr}%</span> e Antecipação <span className="text-slate-900 dark:text-slate-200 font-bold">{customCase.anticipation}%</span>.
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
                            referralUrl={customCase.referralUrl}
                            extraFees={customCase.extraFees}
                        />

                        {/* PagBank Specific Combo CTA */}
                        {slug === "pagseguro-moderninha-pro" && (
                            <div className="mt-8 space-y-4">
                                {/* Maquininha CTA */}
                                <div className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-2xl border border-yellow-200 dark:border-yellow-900/50 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                                    <div className="flex-grow space-y-3 text-center md:text-left">
                                        <h4 className="text-xl font-black text-yellow-900 dark:text-yellow-100 flex items-center justify-center md:justify-start gap-2">
                                            🚀 Maquininha PagBank com Cashback
                                        </h4>
                                        <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                                            <li className="flex items-center gap-2 justify-center md:justify-start font-medium">✅ Cashback do valor da maquininha!</li>
                                            <li className="flex items-center gap-2 justify-center md:justify-start font-medium">✅ Bateria de longa duração e 5 anos de garantia.</li>
                                            <li className="flex items-center gap-2 justify-center md:justify-start font-medium">✅ Sem burocracia, pronta pra usar!</li>
                                        </ul>
                                    </div>
                                    <Link 
                                        href="https://pagbank.vc/indica-maquininhas-ad67c77f3" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-black px-8 py-4 rounded-xl transition-all shadow-lg shadow-yellow-200 dark:shadow-none text-center"
                                    >
                                        PEDIR COM DESCONTO
                                    </Link>
                                </div>

                                {/* Conta Digital CTA */}
                                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-yellow-500 p-2 rounded-lg text-white">
                                            <Wallet size={20}/>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm">Quer apenas a conta?</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Abra sua conta digital grátis em 3 minutos.</p>
                                        </div>
                                    </div>
                                    <Link 
                                        href="https://pagbank.vc/indica-conta-a702ca65c" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-yellow-600 dark:text-yellow-500 font-bold text-sm hover:underline"
                                    >
                                        ABRIR CONTA GRÁTIS →
                                    </Link>
                                </div>
                            </div>
                        )}

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
                     
                     <h2 className={`text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-l-4 border-indigo-500 pl-4 flex items-center gap-3`}>
                        <TrendingDown className="text-indigo-500"/> Análise: {customCase.name}
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
                            <div className={`
                                p-6 rounded-2xl border my-6 not-prose
                                ${customCase.brandColor === 'emerald' ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900' : ''}
                                ${customCase.brandColor === 'blue' ? 'bg-blue-50 border-blue-100 dark:bg-blue-950/30 dark:border-blue-900' : ''}
                                ${customCase.brandColor === 'slate' ? 'bg-slate-100 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700' : ''}
                                ${customCase.brandColor === 'yellow' ? 'bg-yellow-50 border-yellow-100 dark:bg-yellow-950/30 dark:border-yellow-900' : ''}
                                ${customCase.brandColor === 'cyan' ? 'bg-cyan-50 border-cyan-100 dark:bg-cyan-950/30 dark:border-cyan-900' : ''}
                                ${customCase.brandColor === 'green' ? 'bg-green-50 border-green-100 dark:bg-green-950/30 dark:border-green-900' : ''}
                            `}>
                                <h4 className={`
                                    font-bold mb-3 flex items-center gap-2
                                    ${customCase.brandColor === 'emerald' ? 'text-emerald-900 dark:text-emerald-400' : ''}
                                    ${customCase.brandColor === 'blue' ? 'text-blue-900 dark:text-blue-400' : ''}
                                    ${customCase.brandColor === 'slate' ? 'text-slate-900 dark:text-slate-300' : ''}
                                    ${customCase.brandColor === 'yellow' ? 'text-yellow-900 dark:text-yellow-400' : ''}
                                    ${customCase.brandColor === 'cyan' ? 'text-cyan-900 dark:text-cyan-400' : ''}
                                    ${customCase.brandColor === 'green' ? 'text-green-900 dark:text-green-400' : ''}
                                `}>
                                   {customCase.articleContent.highlightsTitle}
                                </h4>
                                <ul className={`
                                    list-disc pl-5 space-y-1 text-sm
                                    ${customCase.brandColor === 'emerald' ? 'text-emerald-800 dark:text-emerald-200' : ''}
                                    ${customCase.brandColor === 'blue' ? 'text-blue-800 dark:text-blue-200' : ''}
                                    ${customCase.brandColor === 'slate' ? 'text-slate-700 dark:text-slate-400' : ''}
                                    ${customCase.brandColor === 'yellow' ? 'text-yellow-800 dark:text-yellow-200' : ''}
                                    ${customCase.brandColor === 'cyan' ? 'text-cyan-800 dark:text-cyan-200' : ''}
                                    ${customCase.brandColor === 'green' ? 'text-green-800 dark:text-green-200' : ''}
                                `}>
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

                <ExpertSignature updatedAt="Maio de 2026" />
                <SmartCrossLinker currentHref={"/financeiro/simulador-maquininha/" + slug} category="financeiro" />

                {/* ANÚNCIO BOTTOM */}
                <div className="w-full flex justify-center mt-8">
                   <LazyAdUnit slot="card_bottom" format="horizontal" variant="auto" className="min-h-[100px] w-full" />
                </div>

            </div>
        </article>
    );
}
