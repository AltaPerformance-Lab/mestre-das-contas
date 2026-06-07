import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import TerminationCalculator from "@/components/calculators/TerminationCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";
import { terminationCases } from "@/data/termination-pseo";
import { Calculator, ArrowLeft, Star, Briefcase, FileText, ShieldCheck, HelpCircle } from "lucide-react";

// --- SSG ---
export async function generateStaticParams() {
    return terminationCases.map((customCase) => ({
        slug: customCase.slug }));
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
            type: "article" },
        twitter: {
            card: "summary_large_image",
            title,
            description }
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
                    variant="labor" 
                    categoryColor="indigo"
                    badge="Atualizado 2026"
                    breadcrumbs={[
                        { label: "Trabalhista", href: "/trabalhista" },
                        { label: "Rescisão", href: "/trabalhista/rescisao" },
                        { label: customCase.reasonLabel }
                    ]}
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

                {/* REVISÃO TRABALHISTA (E-E-A-T) */}
                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
                  <ShieldCheck size={18} className="text-blue-600 shrink-0" />
                  <span>Cálculo auditado para 2026 conforme Reforma Trabalhista e tabelas oficiais do Governo Federal.</span>
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
                        <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                            <TerminationCalculator 
                                initialReason={initialReasonValue}
                            />
                        </Suspense>
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
                                    <span className="text-2xl">⚖️</span> O que diz a Lei (<GlossaryTerm slug="inss-previdencia-social">CLT</GlossaryTerm>)?
                                </h4>
                                <div className="text-slate-700 dark:text-slate-300 italic" dangerouslySetInnerHTML={{ __html: customCase.articleContent.lawText }} />
                            </div>
                        )}

                        {customCase.articleContent.closing && (
                            <p dangerouslySetInnerHTML={{ __html: customCase.articleContent.closing }} />
                        )}
                        <p className="text-xs text-slate-500 mt-6">
                            Dica: Conheça também os termos técnicos como <GlossaryTerm slug="aviso-previo-trabalhista">Aviso Prévio</GlossaryTerm>, <GlossaryTerm slug="saldo-de-salario-rescisao">Saldo de Salário</GlossaryTerm> e <GlossaryTerm slug="dsr-descanso-semanal-remunerado">DSR</GlossaryTerm> no nosso glossário.
                        </p>
                        <ExpertSignature updatedAt="Junho de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
                     </div>
                     </div>

                <SmartGlossaryLinker currentHref={`/trabalhista/rescisao/${slug}`} category="trabalhista" />

                {/* --- CROSS SELLING (FERRAMENTAS ÚTEIS) --- */}
                <div className="mt-8 not-prose border-t border-slate-200 dark:border-slate-800 pt-8 print:hidden">
                    <SmartCrossLinker currentHref={`/trabalhista/rescisao/${slug}`} category="trabalhista" />
                </div>

                {customCase.articleContent.faq && customCase.articleContent.faq.length > 0 && (
                    <div className="mt-8 not-prose max-w-4xl mx-auto w-full print:hidden">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                            <HelpCircle className="text-indigo-500"/> Perguntas Frequentes
                        </h3>
                        <div className="space-y-4">
                            {customCase.articleContent.faq.map((f, i) => (
                                <details key={i} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-1 open:ring-indigo-100 dark:open:ring-indigo-900/30 transition-all">
                                    <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                                        <div className="flex items-start gap-3">
                                            <span className="text-indigo-500 dark:text-indigo-400 font-bold text-xs mt-1">#</span>
                                            <span className="leading-snug text-slate-800 dark:text-slate-200">{f.question}</span>
                                        </div>
                                        <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                                    </summary>
                                    <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm">
                                        {f.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mt-8 not-prose max-w-4xl mx-auto w-full print:hidden">
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

                {/* ANÚNCIO BOTTOM */}
                <div className="w-full flex justify-center mt-8">
                   <LazyAdUnit slot="termination_bottom" format="horizontal" variant="auto" className="min-h-[100px] w-full" />
                </div>

            </div>
        </article>
    );
}
