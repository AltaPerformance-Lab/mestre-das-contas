import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import RentCalculator from "@/components/calculators/RentCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { rentPSeoCases } from "@/data/rent-pseo";
import { Home, ArrowLeft, CalendarDays, TrendingUp, Briefcase } from "lucide-react";

// --- SSG ---
export async function generateStaticParams() {
    return rentPSeoCases.map((customCase) => ({
        slug: customCase.slug,
    }));
}

// --- METADATA ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const customCase = rentPSeoCases.find(c => c.slug === slug);

    if (!customCase) return {};

    return {
        title: `${customCase.description.split('.')[0]} | Mestre das Contas`,
        description: customCase.description,
        keywords: customCase.keywords,
        alternates: { canonical: `https://mestredascontas.com.br/financeiro/reajuste-aluguel/${slug}` },
        openGraph: {
            title: `Reajuste Aluguel ${customCase.monthYear}`,
            description: customCase.description,
            url: `https://mestredascontas.com.br/financeiro/reajuste-aluguel/${slug}`,
            type: "article",
        }
    };
}

export default async function RentPSeoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const customCase = rentPSeoCases.find(c => c.slug === slug);

    if (!customCase) {
        notFound();
    }

    // JSON-LD Dinâmico (Dual: App + HowTo)
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": `Calculadora de Aluguel ${customCase.monthYear}`,
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web Browser",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
                "description": customCase.description,
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "850", "bestRating": "5", "worstRating": "1" }
            },
            {
                "@type": "HowTo",
                "name": `Como calcular reajuste de aluguel (${customCase.monthYear})`,
                "description": "Passo a passo para atualizar o valor do seu aluguel usando os índices oficiais IGP-M ou IPCA.",
                "totalTime": "PT2M",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Verifique o Contrato",
                        "text": "Confirme qual índice (IGP-M ou IPCA) está definido na cláusula de reajuste do seu contrato.",
                        "url": `https://mestredascontas.com.br/financeiro/reajuste-aluguel/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Insira o Valor Atual",
                        "text": "Digite o valor do aluguel vigente antes do aumento.",
                        "url": `https://mestredascontas.com.br/financeiro/reajuste-aluguel/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Selecione o Índice",
                        "text": "A calculadora aplicará automaticamente o percentual acumulado de 12 meses.",
                        "url": `https://mestredascontas.com.br/financeiro/reajuste-aluguel/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Resultado",
                        "text": "Veja o novo valor do aluguel a ser pago a partir deste mês.",
                        "url": `https://mestredascontas.com.br/financeiro/reajuste-aluguel/${slug}`
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
                    title={`Reajuste Aluguel: ${customCase.monthYear}`}
                    description={customCase.description}
                    category="Tabela Oficial"
                    icon={<CalendarDays size={32} strokeWidth={2} />}
                    variant="default"
                    categoryColor="blue"
                    badge="Acumulado 12 Meses"
                    breadcrumbs={[
                        { label: "Financeiro", href: "/financeiro" },
                        { label: "Aluguel", href: "/financeiro/reajuste-aluguel" },
                        { label: customCase.monthYear }
                    ]}
                    rating={4.8}
                    reviews={850}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
                
                {/* BACK LINK */}
                <div className="print:hidden">
                    <Link href="/financeiro/reajuste-aluguel" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <ArrowLeft size={16} className="mr-1"/> Voltar para Tabela Completa
                    </Link>
                </div>

                {/* ANÚNCIO TOP */}
                <div className="w-full flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg p-2 print:hidden border border-dashed border-slate-200/50 dark:border-slate-800">
                    <LazyAdUnit slot="rent_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
                </div>

                {/* FERRAMENTA PRE-FILLED */}
                <section id="ferramenta" className="w-full relative z-10">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl mb-6 flex items-start gap-3 print:hidden shadow-sm transition-colors">
                        <CalendarDays className="text-blue-600 dark:text-blue-400 mt-1 shrink-0" size={20}/>
                        <div>
                            <p className="font-bold text-blue-900 dark:text-blue-100 text-sm">Período: {customCase.monthYear}</p>
                            <p className="text-blue-800 dark:text-blue-200 text-xs mt-1">
                                Índices Oficiais: <strong className="text-blue-900 dark:text-white">IGP-M {customCase.igpm}%</strong> e <strong className="text-blue-900 dark:text-white">IPCA {customCase.ipca}%</strong>.
                            </p>
                        </div>
                    </div>

                    <PrivacyBadge />
                    
                    {/* Passamos os valores fixos do pSEO */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-4 md:p-8">
                        <RentCalculator 
                            initialIgpm={customCase.igpm}
                            initialIpca={customCase.ipca}
                            periodLabel={customCase.monthYear}
                        />
                         <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <DisclaimerBox />
                        </div>
                    </div>
                </section>

                {/* ANÚNCIO MID */}
                <div className="w-full flex justify-center my-4 print:hidden">
                   <LazyAdUnit slot="rent_mid" format="auto" className="min-h-[100px] w-full max-w-4xl" />
                </div>

                {/* ARTIGO ESPECÍFICO */}
                <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden mt-8">
                     
                     <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-blue-600 pl-4 flex items-center gap-3">
                        <TrendingUp className="text-blue-600 dark:text-blue-400"/> Análise: {customCase.monthYear}
                     </h2>
                     
                     {/* Renderização do Conteúdo Adaptado */}
                     <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                        <p dangerouslySetInnerHTML={{ __html: customCase.articleContent.intro }} />
                        
                        {customCase.articleContent.analysis && (
                            <div className="my-6">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Análise Econômica</h3>
                                <div dangerouslySetInnerHTML={{ __html: customCase.articleContent.analysis }} className="space-y-4"/>
                            </div>
                        )}

                        {customCase.articleContent.extraBox && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/50 my-6 not-prose">
                                <p className="font-bold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                                    📊 {customCase.articleContent.extraBox.title}
                                </p>
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    {customCase.articleContent.extraBox.text}
                                </p>
                            </div>
                        )}

                        {customCase.articleContent.lawText && (
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-slate-500 my-8">
                                <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-3 text-lg">
                                    <span className="text-2xl">⚖️</span> O que diz a Lei do Inquilinato?
                                </h4>
                                <div className="text-slate-700 dark:text-slate-300 italic" dangerouslySetInnerHTML={{ __html: customCase.articleContent.lawText }} />
                            </div>
                        )}

                        {customCase.articleContent.closing && (
                             <p dangerouslySetInnerHTML={{ __html: customCase.articleContent.closing }} />
                        )}
                     </div>

                    <hr className="border-slate-200 dark:border-slate-800 my-8"/>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Dúvidas Comuns</h3>
                    <div className="space-y-4 mt-4 not-prose">
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-medium">
                                <h4 className="text-sm font-bold m-0 text-slate-900 dark:text-white">Qual índice devo usar: IGP-M ou IPCA?</h4>
                                <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm">
                                Isso deve estar escrito no seu contrato de locação. Historicamente o IGP-M foi mais utilizado, mas devido à alta volatilidade recente, muitos novos contratos migraram para o IPCA. Verifique a cláusula "Do Reajuste".
                            </p>
                        </details>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-medium">
                                <h4 className="text-sm font-bold m-0 text-slate-900 dark:text-white">Quando o reajuste é aplicado?</h4>
                                <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm">
                                O reajuste ocorre anualmente, no mês de "aniversário" do contrato. Se você assinou em {customCase.month}, o aumento será aplicado no aluguel que vence em diante, usando o índice acumulado dos 12 meses anteriores.
                            </p>
                        </details>
                    </div>

                     <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mt-8 not-prose">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                             <TrendingUp size={18} className="text-blue-500"/> Outros Meses
                        </h4>
                        <div className="flex flex-wrap gap-2">
                             {rentPSeoCases.filter(c => c.slug !== slug).map(c => (
                                 <Link key={c.slug} href={`/financeiro/reajuste-aluguel/${c.slug}`} className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                     {c.monthYear}
                                 </Link>
                             ))}
                        </div>
                     </div>
                </div>

                {/* --- OUTRAS FERRAMENTAS --- */}
                <div className="mt-12 not-prose border-t border-slate-200 dark:border-slate-800 pt-8 print:hidden">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <Home size={22} className="text-blue-500"/> Soluções para Imóveis
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Link href="/ferramentas/recibo-online" className="block group">
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20 transition-transform group-hover:-translate-y-1">
                                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                                    <Home size={24} className="text-white"/>
                                </div>
                                <h4 className="font-bold text-lg mb-1">Recibo de Aluguel</h4>
                                <p className="text-emerald-50 text-sm opacity-90">Emita comprovantes de pagamento de aluguel profissionais e organizados.</p>
                            </div>
                        </Link>
                        
                        <Link href="/financeiro/calculadora-mei" className="block group">
                            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20 transition-transform group-hover:-translate-y-1">
                                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                                    <Briefcase size={24} className="text-white"/>
                                </div>
                                <h4 className="font-bold text-lg mb-1">É Corretor Autônomo?</h4>
                                <p className="text-indigo-50 text-sm opacity-90">Veja como formalizar seus serviços no MEI e emitir nota fiscal.</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* ANÚNCIO BOTTOM */}
                <div className="w-full flex justify-center mt-8">
                   <LazyAdUnit slot="rent_bottom" format="horizontal" variant="auto" className="min-h-[100px] w-full" />
                </div>

            </div>
        </article>
    );
}
