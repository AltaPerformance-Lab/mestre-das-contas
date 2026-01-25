import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BudgetCreator from "@/components/tools/BudgetCreator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { budgetCases, BudgetPSeoCase } from "@/data/budget-pseo-list";
import { Calculator, ArrowLeft, Star, Briefcase, BookOpen, PenTool, CheckCircle2 } from "lucide-react";

// --- GERAR ROTAS ESTÁTICAS (SSG) ---
export async function generateStaticParams() {
    return budgetCases.map((customCase) => ({
        slug: customCase.slug,
    }));
}

// --- METADATA DINÂMICA ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const customCase = budgetCases.find(c => c.slug === slug);

    if (!customCase) return {};

    return {
        title: `${customCase.title} | Grátis em PDF`,
        description: customCase.description,
        keywords: [
            ...customCase.keywords,
            "criador de orçamento online", 
            "modelo de orçamento editavel",
            "fazer orçamento profissional"
        ],
        alternates: { canonical: `https://mestredascontas.com.br/ferramentas/criador-orcamentos/${slug}` },
        openGraph: {
            title: customCase.title,
            description: customCase.description,
            url: `https://mestredascontas.com.br/ferramentas/criador-orcamentos/${slug}`,
            type: "article",
        }
    };
}

export default async function BudgetPseoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const customCase = budgetCases.find(c => c.slug === slug);

    if (!customCase) {
        notFound();
    }

    // JSON-LD Dinâmico (Dual: App + HowTo)
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": customCase.title,
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web Browser",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
                "description": customCase.longDescription,
                "aggregateRating": { 
                     "@type": "AggregateRating", 
                     "ratingValue": customCase.rating.toFixed(1), 
                     "ratingCount": customCase.reviewsCount.toString(),
                     "bestRating": "5", 
                     "worstRating": "1" 
                }
            },
            {
                "@type": "HowTo",
                "name": `Como fazer um ${customCase.title}`,
                "description": `Passo a passo para gerar um orçamento profissional de ${customCase.title} em PDF.`,
                "totalTime": "PT2M",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Preencha seus dados",
                        "text": "Informe os dados da sua empresa (Emissor) e adicione sua logo para passar credibilidade.",
                        "url": `https://mestredascontas.com.br/ferramentas/criador-orcamentos/${slug}#ferramenta`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Adicione o cliente",
                        "text": "Preencha os dados do cliente para quem o orçamento é destinado.",
                        "url": `https://mestredascontas.com.br/ferramentas/criador-orcamentos/${slug}#ferramenta`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Liste os itens",
                        "text": "Adicione os serviços ou produtos, quantidades e valores unitários. O cálculo é automático.",
                        "url": `https://mestredascontas.com.br/ferramentas/criador-orcamentos/${slug}#ferramenta`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Finalize",
                        "text": "Configure descontos, termos de pagamento e clique em Imprimir para baixar o PDF.",
                        "url": `https://mestredascontas.com.br/ferramentas/criador-orcamentos/${slug}#ferramenta`
                    }
                ]
            }
        ]
    };

    return (
        <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
             <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HEADER */}
            <div className="px-4 pt-4 md:pt-6">
                <PageHeader 
                    title={customCase.title}
                    description={customCase.longDescription}
                    category="Modelos Prontos"
                    icon={<Briefcase size={32} strokeWidth={2} />}
                    variant="default"
                    categoryColor="indigo"
                    badge="Template 2026"
                    breadcrumbs={[
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Criar Orçamento", href: "/ferramentas/criador-orcamentos" },
                        { label: customCase.title }
                    ]}
                    rating={customCase.rating}
                    reviews={customCase.reviewsCount}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
                {/* BACK LINK */}
                <div className="print:hidden">
                    <Link href="/ferramentas/criador-orcamentos" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <ArrowLeft size={16} className="mr-1"/> Voltar para Versão Padrão
                    </Link>
                </div>

                {/* ANÚNCIO */}
                <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
                    <LazyAdUnit slot="orcamento_top" format="horizontal" variant="agency" />
                </div>

                {/* FERRAMENTA PRE-FILLED */}
                <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 p-4 rounded-xl mb-6 flex items-start gap-3 print:hidden transition-all hover:shadow-md">
                        <Star className="text-indigo-600 dark:text-indigo-400 mt-1 shrink-0" size={20} fill="currentColor"/>
                        <div>
                            <p className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">Template: {customCase.title}</p>
                            <p className="text-indigo-700 dark:text-indigo-300/80 text-xs mt-1">
                                Dados preenchidos automaticamente com preços médios de mercado. Edite conforme sua necessidade.
                            </p>
                        </div>
                    </div>

                    <PrivacyBadge />
                    <BudgetCreator initialValues={customCase.initialValues} />
                    
                    <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
                </section>

                {/* ANÚNCIO */}
                <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
                    <LazyAdUnit slot="orcamento_mid" format="auto" />
                </div>

                {/* --- ARTIGO EDUCACIONAL ESPECÍFICO (pSEO) --- */}
                <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
                    
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                        Criando um {customCase.title} de Sucesso
                    </h2>
                    
                    <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
                        Um orçamento bem feito é o primeiro passo para fechar negócio. Veja como tornar seu documento irresistível para o cliente.
                    </p>

                    <div className="my-8 grid gap-4 sm:grid-cols-2 not-prose">
                        <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={18}/> Clareza
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Descreva os itens detalhadamente. Evite termos técnicos confusos.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <CheckCircle2 className="text-indigo-500" size={18}/> Transparência
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Separe mão de obra de materiais quando possível. Isso gera confiança.</p>
                        </div>
                    </div>

                    {customCase.articleContent && (
                        <div className="mb-8">
                             <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-xs mb-4">
                                <BookOpen size={16} /> Guia da Profissão
                            </div>
                            {customCase.articleContent}
                        </div>
                    )}

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">O que não pode faltar?</h3>
                    <ul className="text-slate-600 dark:text-slate-400">
                        <li><strong>Dados de Contato:</strong> Facilite para que o cliente te encontre.</li>
                        <li><strong>Validade:</strong> Defina por quanto tempo os preços são garantidos (ex: 15 dias).</li>
                        <li><strong>Formas de Pagamento:</strong> Pix, parcelamento, entrada? Deixe claro.</li>
                    </ul>

                    {/* CHAMADA DE AÇÃO / FINALIZAÇÃO */}
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mt-8 not-prose">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <PenTool size={18} className="text-blue-600 dark:text-blue-400"/> Pronto para fechar negócio?
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                            Use este modelo gratuito quantas vezes quiser. Não cobramos nada e não salvamos seus dados.
                        </p>
                        <Link href="#ferramenta" className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-lg shadow-blue-500/20">
                            Preencher Orçamento Agora
                        </Link>
                    </div>
                </div>

                {/* OUTROS MODELOS (LINKS INTERNOS) */}
                <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Briefcase size={20} className="text-slate-500"/> Outras Profissões
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {budgetCases.filter(c => c.slug !== slug).map((c) => (
                            <Link 
                                key={c.slug} 
                                href={`/ferramentas/criador-orcamentos/${c.slug}`}
                                className="flex flex-col p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-md transition-all group"
                            >
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Modelo</span>
                                <span className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 line-clamp-2">{c.title.replace("Modelo de Orçamento ", "").replace("para ", "")}</span>
                            </Link>
                        ))}
                         <Link 
                            href="/ferramentas/criador-orcamentos"
                            className="flex flex-col p-3 bg-slate-800 border border-slate-800 rounded-xl hover:bg-slate-900 hover:shadow-md transition-all group"
                        >
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Versão Completa</span>
                            <span className="font-bold text-white text-sm">Criar em Branco</span>
                        </Link>
                    </div>
                </div>

            </div>
        </article>
    );
}
