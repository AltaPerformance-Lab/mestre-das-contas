import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import OrderCreator, { type OrderData } from "@/components/tools/OrderCreator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import { orderCases } from "@/data/order-pseo-list";
import { ShoppingBag, ArrowLeft, Star, Briefcase, BookOpen, PenTool, ShieldCheck } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>
}

// --- GERAR ROTAS ESTÁTICAS (SSG) ---
export async function generateStaticParams() {
    return orderCases.map((customCase) => ({
        slug: customCase.slug }));
}

// --- METADATA DINÂMICA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const customCase = orderCases.find(c => c.slug === slug);

    if (!customCase) return {};

    const title = `${customCase.title} | Grátis em PDF`;
    const description = customCase.description;

    return {
        title,
        description,
        keywords: [
            ...customCase.keywords,
            "talão de pedido online", 
            "bloco de pedido pdf",
            "fazer pedido venda profissional"
        ],
        alternates: { canonical: `https://mestredascontas.com.br/ferramentas/criador-pedidos/${slug}` },
        openGraph: {
            title,
            description,
            url: `https://mestredascontas.com.br/ferramentas/criador-pedidos/${slug}`,
            type: "article" }
    };
}

export default async function OrderPseoPage({ params }: Props) {
    const { slug } = await params;
    const customCase = orderCases.find(c => c.slug === slug);

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
                "description": customCase.longDescription }
        ]
    };

    return (
        <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
             <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HEADER */}
            <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <PageHeader 
                    title={customCase.title}
                    description={customCase.longDescription}
                    category="Modelos Prontos"
                    icon={<Briefcase size={32} strokeWidth={2} />}
                    variant="tools"
                    categoryColor="indigo"
                    badge="Atualizado 2026"
                    breadcrumbs={[
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Criar Pedido", href: "/ferramentas/criador-pedidos" },
                        { label: customCase.title }
                    ]}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
                {/* BACK LINK */}
                <div className="print:hidden">
                    <Link href="/ferramentas/criador-pedidos" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        <ArrowLeft size={16} className="mr-1"/> Voltar para Versão Padrão
                    </Link>
                </div>

                {/* ANÚNCIO */}
                <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
                    <LazyAdUnit slot="orcamento_top" format="horizontal" variant="agency" />
                </div>

                {/* REVISÃO COMERCIAL (E-E-A-T) */}
                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300 mb-2">
                  <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                  <span>Documento padronizado para formalização de vendas e prestação de serviços conforme o Código de Defesa do Consumidor.</span>
                </div>

                {/* FERRAMENTA PRE-FILLED */}
                <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 p-4 rounded-xl mb-6 flex items-start gap-3 print:hidden transition-all hover:shadow-md">
                        <Star className="text-indigo-600 dark:text-indigo-400 mt-1 shrink-0" size={20} fill="currentColor"/>
                        <div>
                            <p className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">Template: {customCase.title}</p>
                            <p className="text-indigo-700 dark:text-indigo-300/80 text-xs mt-1">
                                Pedido pré-configurado para seu ramo. Edite os campos conforme sua necessidade.
                            </p>
                        </div>
                    </div>

                    <PrivacyBadge />
                    <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                        <OrderCreator initialValues={customCase.initialValues} />
                    </Suspense>
                    
                    <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
                </section>

                {/* ANÚNCIO */}
                <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
                    <LazyAdUnit slot="orcamento_mid" format="auto" />
                </div>

                {/* --- ARTIGO EDUCACIONAL ESPECÍFICO (pSEO) --- */}
                <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                        Guia Completo: {customCase.title}
                    </h2>
                    <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
                        Organização é a chave para vender mais. Um pedido claro transmite profissionalismo e evita dores de cabeça com trocas e devoluções.
                    </p>

                    {customCase.articleContent && (
                        <div className="mb-8">
                             <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-xs mb-4">
                                <BookOpen size={16} /> Guia do Setor
                            </div>
                            {customCase.articleContent}
                        </div>
                    )}
                </div>

                <SmartCrossLinker currentHref={`/ferramentas/criador-pedidos/${slug}`} category="ferramentas" />
            </div>
        </article>
    );
}
