import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BudgetCreator, { type BudgetData } from "@/components/tools/BudgetCreator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import { budgetCases } from "@/data/budget-pseo-list";
import { ArrowLeft, Star, Briefcase, BookOpen, PenTool, CheckCircle2, ShieldCheck } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>
}

// --- GERAR ROTAS ESTÁTICAS (SSG) ---
export async function generateStaticParams() {
    return budgetCases.map((customCase) => ({
        slug: customCase.slug }));
}

// --- METADATA DINÂMICA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const customCase = budgetCases.find(c => c.slug === slug);

    if (!customCase) return {};

    const title = `${customCase.title} | Grátis em PDF`;
    const description = customCase.description;

    return {
        title,
        description,
        keywords: [
            ...customCase.keywords,
            "criador de orçamento online", 
            "modelo de orçamento editavel",
            "fazer orçamento profissional"
        ],
        alternates: { canonical: `https://mestredascontas.com.br/ferramentas/criador-orcamentos/${slug}` },
        openGraph: {
            title,
            description,
            url: `https://mestredascontas.com.br/ferramentas/criador-orcamentos/${slug}`,
            type: "article" }
    };
}

export default async function BudgetPseoPage({ params }: Props) {
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
                "description": customCase.longDescription },
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
                    }
                ]
            }
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
                        { label: "Criar Orçamento", href: "/ferramentas/criador-orcamentos" },
                        { label: customCase.title }
                    ]}
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

                {/* REVISÃO PROFISSIONAL (E-E-A-T) */}
                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
                  <ShieldCheck size={18} className="text-blue-600 shrink-0" />
                  <span>Estrutura de orçamento profissional auditada para máxima conversão e clareza comercial em 2026.</span>
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
                    <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                        <BudgetCreator initialValues={customCase.initialValues} />
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
                        Criando um {customCase.title} de Sucesso
                    </h2>
                    <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
                        Um orçamento bem feito é o primeiro passo para fechar negócio. Veja como tornar seu documento irresistível para o cliente.
                    </p>

                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
                        Como Usar o Criador de Orçamentos (Passo a Passo)
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                       Monte um orçamento altamente profissional com sua logo em PDF seguindo estes 4 passos fáceis:
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">1</div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">Insira Seus Dados & Logo</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Insira as informações do Emissor. Você pode carregar um logotipo clicando em <strong>"Adicionar Logotipo"</strong> para personalizar o topo do PDF.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">2</div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">Insira o Cliente</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Preencha os dados do cliente (Nome, CPF/CNPJ, Contato, Endereço) para quem este documento de orçamento é destinado.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">3</div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">Adicione os Itens & Serviços</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Clique em <strong>"+ Adicionar Item"</strong>. Digite o nome, quantidade e preço unitário. O total e o subtotal calculam dinamicamente em tempo real.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">4</div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">Imprima ou Salve o PDF</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Clique em <strong>"Gerar PDF"</strong> para baixar o orçamento em folha de papel limpa timbrada, pronto para enviar por WhatsApp ou E-mail.</p>
                        </div>
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
                </div>

                <SmartCrossLinker currentHref={`/ferramentas/criador-orcamentos/${slug}`} category="ferramentas" />
            </div>
        </article>
    );
}
