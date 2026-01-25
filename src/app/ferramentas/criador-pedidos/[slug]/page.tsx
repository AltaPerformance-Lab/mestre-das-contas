import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import OrderCreator from "@/components/tools/OrderCreator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { orderCases } from "@/data/order-pseo-list";
import { ShoppingBag, ArrowLeft, Star, Briefcase, BookOpen, PenTool } from "lucide-react";

// --- GERAR ROTAS ESTÁTICAS (SSG) ---
export async function generateStaticParams() {
    return orderCases.map((customCase) => ({
        slug: customCase.slug,
    }));
}

// --- METADATA DINÂMICA ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const customCase = orderCases.find(c => c.slug === slug);

    if (!customCase) return {};

    return {
        title: `${customCase.title} | Grátis em PDF`,
        description: customCase.description,
        keywords: [
            ...customCase.keywords,
            "talão de pedido online", 
            "bloco de pedido pdf",
            "fazer pedido venda profissional"
        ],
        alternates: { canonical: `https://mestredascontas.com.br/ferramentas/criador-pedidos/${slug}` },
        openGraph: {
            title: customCase.title,
            description: customCase.description,
            url: `https://mestredascontas.com.br/ferramentas/criador-pedidos/${slug}`,
            type: "article",
        }
    };
}

export default async function OrderPseoPage({ params }: { params: Promise<{ slug: string }> }) {
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
                "description": `Passo a passo para gerar um pedido ou orçamento profissional de ${customCase.title}.`,
                "totalTime": "PT2M",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Preencha o Cabeçalho",
                        "text": "Insira os dados da sua empresa e do cliente para formalizar o documento.",
                        "url": `https://mestredascontas.com.br/ferramentas/criador-pedidos/${slug}#ferramenta`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Adicione os Produtos",
                        "text": "Liste os itens com quantidade e valor unitário. O sistema calcula o total automaticamente.",
                        "url": `https://mestredascontas.com.br/ferramentas/criador-pedidos/${slug}#ferramenta`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Defina Entrega e Termos",
                        "text": "Configure taxa de entrega, prazo e regras de troca ou garantia.",
                        "url": `https://mestredascontas.com.br/ferramentas/criador-pedidos/${slug}#ferramenta`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Gere o PDF",
                        "text": "Clique em Imprimir para salvar o pedido em PDF ou enviar via WhatsApp.",
                        "url": `https://mestredascontas.com.br/ferramentas/criador-pedidos/${slug}#ferramenta`
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
                        { label: "Criar Pedido", href: "/ferramentas/criador-pedidos" },
                        { label: customCase.title }
                    ]}
                    rating={customCase.rating}
                    reviews={customCase.reviewsCount}
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
                    <OrderCreator initialValues={customCase.initialValues} />
                    
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

                    <div className="my-8 grid gap-4 sm:grid-cols-2 not-prose">
                        <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <ShoppingBag className="text-emerald-500" size={18}/> Pedido ou Orçamento?
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Este modelo serve para ambos. Se o cliente ainda não fechou, marque como orçamento. Se já fechou, é um Pedido de Venda.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <Star className="text-amber-500" size={18}/> Fidelização
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Envie o PDF pelo WhatsApp. É muito mais profissional do que mandar os preços soltos em mensagens de texto.</p>
                        </div>
                    </div>

                    {customCase.articleContent && (
                        <div className="mb-8">
                             <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-xs mb-4">
                                <BookOpen size={16} /> Guia do Setor
                            </div>
                            {customCase.articleContent}
                        </div>
                    )}

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Perguntas Frequentes</h3>
                    <div className="space-y-4 mt-4">
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-medium">
                                <h4 className="text-sm font-bold m-0">Posso colocar minha logo?</h4>
                                <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm">
                                Sim! Basta clicar no botão "Enviar Logo" no topo do formulário. A logo sairá no topo do PDF gerado.
                            </p>
                        </details>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-medium">
                                <h4 className="text-sm font-bold m-0">É gratuito mesmo?</h4>
                                <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm">
                                Sim, 100% grátis. Você pode gerar quantos pedidos quiser. Mantemos o site com anúncios.
                            </p>
                        </details>
                    </div>

                    {/* CHAMADA DE AÇÃO / FINALIZAÇÃO */}
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mt-8 not-prose">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <PenTool size={18} className="text-emerald-600 dark:text-emerald-400"/> Comece a vender agora!
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                            Use este talão digital gratuito. Seus clientes vão amar a organização.
                        </p>
                        <Link href="#ferramenta" className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors text-sm shadow-lg shadow-emerald-500/20">
                            Preencher Pedido
                        </Link>
                    </div>
                </div>

                {/* OUTROS MODELOS (LINKS INTERNOS) */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <Briefcase size={20} className="text-slate-500 dark:text-slate-400"/> Outros Ramos de Atuação
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {orderCases.filter(c => c.slug !== slug).map((c) => (
                            <Link 
                                key={c.slug} 
                                href={`/ferramentas/criador-pedidos/${c.slug}`}
                                className="flex flex-col p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-md transition-all group"
                            >
                                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Modelo</span>
                                <span className="font-bold text-slate-800 dark:text-emerald-100 text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2">{c.title.replace("Pedido ", "")}</span>
                            </Link>
                        ))}
                         <Link 
                            href="/ferramentas/criador-pedidos"
                            className="flex flex-col p-3 bg-slate-800 dark:bg-slate-800 border border-slate-800 dark:border-slate-700 rounded-xl hover:bg-slate-900 dark:hover:bg-slate-950 hover:shadow-md transition-all group"
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
