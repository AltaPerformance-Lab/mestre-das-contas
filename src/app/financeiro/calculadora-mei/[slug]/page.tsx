import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { meiActivities } from "@/data/mei-activities";
import MEICalculator from "@/components/tools/MEICalculator";
import PageHeader from "@/components/layout/PageHeader";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { Briefcase, ArrowLeft, CheckCircle2, AlertTriangle, Search, Star, BookOpen } from "lucide-react";

// --- SSG ---
export async function generateStaticParams() {
    return meiActivities.map((act) => ({
        slug: act.slug,
    }));
}

// --- METADATA DINÂMICA ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const activity = meiActivities.find((a) => a.slug === slug);
    if (!activity) return {};

    return {
        title: `Calculadora MEI ${activity.jobTitle} 2026 | Valor DAS e Limite`,
        description: `Sou ${activity.jobTitle} e quero ser MEI. Veja o valor do DAS mensal, código CNAE corretos e limite de faturamento para sua profissão.`,
        keywords: [...activity.keywords, "calculadora mei", "limite mei 2026", "cnae mei"],
        alternates: {
            canonical: `https://mestredascontas.com.br/financeiro/calculadora-mei/${slug}`,
        },
    };
}

export default async function MEIPSeoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const activity = meiActivities.find((a) => a.slug === slug);

    if (!activity) return notFound();

    // JSON-LD Dinâmico (Dual: App + HowTo)
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": `Calculadora MEI para ${activity.jobTitle}`,
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web Browser",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
                "description": `Calculadora de impostos (DAS) e limite de faturamento para MEI ${activity.jobTitle} em 2026.`,
            },
            {
                "@type": "HowTo",
                "name": `Como calcular imposto MEI para ${activity.jobTitle}`,
                "description": `Passo a passo para saber o valor do DAS e se você se enquadra como Microempreendedor Individual sendo ${activity.jobTitle}.`,
                "totalTime": "PT1M",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Verifique a Atividade",
                        "text": `Confirme se sua atuação se encaixa no CNAE ${activity.cnae}.`,
                        "url": `https://mestredascontas.com.br/financeiro/calculadora-mei/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Selecione o Tipo",
                        "text": `Na calculadora, escolha a categoria "${activity.category}" para ver o valor exato do DAS.`,
                        "url": `https://mestredascontas.com.br/financeiro/calculadora-mei/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Confira o Resultado",
                        "text": "Veja o valor mensal a pagar e o limite anual de R$ 81.000,00.",
                        "url": `https://mestredascontas.com.br/financeiro/calculadora-mei/${slug}`
                    }
                ]
            }
        ]
    };

    return (
        <article className="w-full max-w-full overflow-hidden pb-12 font-sans bg-slate-50 dark:bg-slate-950">
             <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

             {/* --- HEADER --- */}
            <div className="px-4 pt-4 md:pt-6">
                <PageHeader 
                title={`MEI para ${activity.jobTitle}`}
                description={`Tudo o que um ${activity.jobTitle} precisa saber sobre o MEI em 2026. Calcule seus impostos e regularize sua atuação.`}
                category="Guia de Profissões"
                icon={<Briefcase size={32} strokeWidth={2} />}
                variant="default" 
                categoryColor="blue"
                badge={`CNAE: ${activity.cnae}`}
                breadcrumbs={[
                    { label: "Financeiro", href: "/financeiro" },
                    { label: "Calculadora MEI", href: "/financeiro/calculadora-mei" },
                    { label: activity.jobTitle }
                ]}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
                {/* ANÚNCIO TOPO */}
                <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
                    <LazyAdUnit slot="mei_pseo_top" format="horizontal" variant="agency" />
                </div>

                {/* FERRAMENTA */}
                <section className="w-full max-w-full">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-4 md:p-8 transition-colors">
                        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50 flex items-start gap-3">
                            <Search className="text-blue-600 dark:text-blue-400 shrink-0 mt-1"/>
                            <div>
                                <h3 className="font-bold text-blue-900 dark:text-blue-100">Simulação para sua área</h3>
                                <p className="text-sm text-blue-800 dark:text-blue-200/80">
                                    Para <strong className="text-blue-900 dark:text-white">{activity.jobTitle}</strong>, o tipo de atividade é <strong className="text-blue-900 dark:text-white">{activity.category}</strong>. 
                                    Selecione essa opção na calculadora abaixo.
                                </p>
                            </div>
                        </div>
                        <PrivacyBadge />
                        <MEICalculator />
                        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <DisclaimerBox />
                        </div>
                    </div>
                </section>

                {/* ANÚNCIO MID */}
                <div className="w-full max-w-4xl mx-auto flex justify-center my-2 print:hidden min-h-[250px]">
                    <LazyAdUnit slot="mei_pseo_mid" format="auto" />
                </div>

                {/* CONTEÚDO ESPECÍFICO */}
                <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                        Análise de MEI: {activity.jobTitle}
                    </h2>
                    
                    <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
                        A profissão de <strong>{activity.jobTitle}</strong> é uma das mais procuradas para formalização. 
                        Ao se tornar MEI, você deixa de trabalhar na informalidade e passa a ter CNPJ, o que abre portas para fechar contratos com empresas, bancos e fornecedores.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Dados Técnicos</h4>
                            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li><strong className="text-slate-900 dark:text-white">Atividade:</strong> {activity.description}</li>
                                <li><strong className="text-slate-900 dark:text-white">CNAE Principal:</strong> {activity.cnae}</li>
                                <li><strong className="text-slate-900 dark:text-white">Categoria:</strong> {activity.category}</li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Obrigações</h4>
                            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400"/> Pagar DAS Mensal</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400"/> Declaração Anual (Maio)</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400"/> Nota Fiscal (para PJ)</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Vantagens de Formalizar</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                        Muitos profissionais autônomos têm receio de pagar impostos, mas o MEI é o regime mais barato do Brasil. Veja o que você ganha:
                    </p>
                    <ul className="text-slate-700 dark:text-slate-300 list-disc pl-5 space-y-2">
                        <li><strong>Aposentadoria:</strong> Contagem de tempo para se aposentar por idade.</li>
                        <li><strong>Auxílio Doença:</strong> Se você se machucar e não puder trabalhar, o INSS cobre.</li>
                        <li><strong>Salário Maternidade:</strong> Para as mulheres, auxílio no período pós-parto.</li>
                        <li><strong>Crédito Bancário:</strong> Acesso a empréstimos com juros menores para CNPJ.</li>
                    </ul>

                    <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border-l-4 border-amber-500 my-8 not-prose">
                        <h4 className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-100 mb-2">
                            <AlertTriangle size={20}/> Atenção ao Limite de Compras
                        </h4>
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                            O MEI pode comprar até 80% do valor que fatura. Se você declarar que faturou R$ 5.000,00 no mês, não pode ter comprado R$ 6.000,00 em mercadorias com Nota Fiscal. A Receita Federal cruza esses dados!
                        </p>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Perguntas Frequentes</h3>
                    <div className="space-y-4 mt-4">
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-medium">
                                <h4 className="text-sm font-bold m-0 text-slate-900 dark:text-white">Preciso de contador?</h4>
                                <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm">
                                O MEI não é obrigado a ter contador para abrir a empresa ou fazer a declaração anual. Porém, se você tiver funcionários, é altamente recomendado.
                            </p>
                        </details>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-medium">
                                <h4 className="text-sm font-bold m-0 text-slate-900 dark:text-white">Quanto custa abrir o MEI?</h4>
                                <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm">
                                A abertura é <strong>100% gratuita</strong> no Portal do Empreendedor (.gov.br). Cuidado com sites que cobram taxas para isso.
                            </p>
                        </details>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-medium">
                                <h4 className="text-sm font-bold m-0 text-slate-900 dark:text-white">Qual o limite de faturamento?</h4>
                                <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm">
                                Atualmente, o limite é de <strong>R$ 81.000,00 por ano</strong> (média de R$ 6.750,00 por mês).
                            </p>
                        </details>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-medium">
                                <h4 className="text-sm font-bold m-0 text-slate-900 dark:text-white">Vale a pena pagar o INSS atrasado?</h4>
                                <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm">
                                Sim, para contar tempo de aposentadoria é necessário quitar as guias DAS em atraso. Você pode parcelar a dívida no portal do Simples Nacional.
                            </p>
                        </details>
                    </div>

                </div>

                {/* --- OUTRAS ATIVIDADES --- */}
                <div className="mt-12 not-prose border-t border-slate-200 dark:border-slate-800 pt-12">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <Briefcase size={22} className="text-slate-500 dark:text-slate-400"/> Outras Profissões MEI
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {meiActivities.filter(a => a.slug !== slug).slice(0, 8).map((act) => (
                            <Link 
                                key={act.slug} 
                                href={`/financeiro/calculadora-mei/${act.slug}`}
                                className="flex flex-col p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group"
                            >
                                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">CNAE {act.cnae.split('/')[0]}</span>
                                <span className="font-bold text-slate-700 dark:text-slate-200 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                                    {act.jobTitle}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* --- FERRAMENTAS ÚTEIS --- */}
                <div className="mt-8 not-prose">
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <Star size={22} className="text-amber-500"/> Ferramentas Gratuitas para MEI
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="/ferramentas/recibo-online" className="block group">
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20 transition-transform group-hover:-translate-y-1">
                                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                                    <CheckCircle2 size={24} className="text-white"/>
                                </div>
                                <h4 className="font-bold text-lg mb-1">Gerador de Recibos</h4>
                                <p className="text-emerald-50 text-sm opacity-90">Emita recibos simples e profissionais para seus clientes em PDF.</p>
                            </div>
                        </Link>
                        
                        <Link href="/ferramentas/criador-orcamentos" className="block group">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:-translate-y-1">
                                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                                    <Briefcase size={24} className="text-white"/>
                                </div>
                                <h4 className="font-bold text-lg mb-1">Criador de Orçamentos</h4>
                                <p className="text-blue-50 text-sm opacity-90">Modelo de proposta comercial completa para fechar mais serviços.</p>
                            </div>
                        </Link>

                        <Link href="/ferramentas/criador-pedidos" className="block group">
                            <div className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg shadow-purple-600/20 transition-transform group-hover:-translate-y-1">
                                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                                    <BookOpen size={24} className="text-white"/>
                                </div>
                                <h4 className="font-bold text-lg mb-1">Talão de Pedidos</h4>
                                <p className="text-purple-50 text-sm opacity-90">Organize suas encomendas e vendas com um talão digital.</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
                    <LazyAdUnit slot="mei_pseo_bottom" format="horizontal" variant="software" />
                </div>

            </div>
        </article>
    );
}
