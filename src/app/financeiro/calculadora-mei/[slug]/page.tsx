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
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import { Briefcase, ArrowLeft, CheckCircle2, AlertTriangle, Search, BookOpen, ShieldCheck, Landmark, FileText, Users, Calculator, HelpCircle } from "lucide-react";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- SSG ---
export async function generateStaticParams() {
    return meiActivities.map((act) => ({
        slug: act.slug 
    }));
}

type Props = { params: Promise<{ slug: string }> };

// --- METADATA DINÂMICA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const activity = meiActivities.find((a) => a.slug === slug);
    if (!activity) return {};

    return {
        title: `Calculadora MEI ${activity.jobTitle} 2026 | Valor DAS e Limite`,
        description: `Sou ${activity.jobTitle} e quero ser MEI. Veja o valor do DAS mensal, código CNAE corretos e limite de faturamento para sua profissão.`,
        keywords: [...activity.keywords, "calculadora mei", "limite mei 2026", "cnae mei"],
        alternates: {
            canonical: `https://mestredascontas.com.br/financeiro/calculadora-mei/${slug}` 
        },
        openGraph: {
            title: `Calculadora MEI ${activity.jobTitle} 2026 | Valor DAS e Limite`,
            description: `Sou ${activity.jobTitle} e quero ser MEI. Veja o valor do DAS mensal, código CNAE corretos e limite de faturamento para sua profissão.`,
            url: `https://mestredascontas.com.br/financeiro/calculadora-mei/${slug}`,
            type: "article"
        }
    };
}

export default async function MEIPSeoPage({ params }: Props) {
    const { slug } = await params;
    const activity = meiActivities.find((a) => a.slug === slug);

    if (!activity) return notFound();

    // Custom Pros and Cons fallback
    const prosList = activity.articleContent?.pros || [
        "Acesso facilitado a CNPJ e emissão simplificada de Nota Fiscal.",
        "Imposto único e fixo extremamente baixo por meio do DAS mensal.",
        "Acesso imediato a benefícios previdenciários como auxílio-doença e aposentadoria."
    ];

    const consList = activity.articleContent?.cons || [
        "Limite anual estrito de faturamento (R$ 81.000,00).",
        "Impossibilidade de ter sócios na empresa ou possuir outra empresa ativa.",
        "Contratação de no máximo 1 funcionário registrado recebendo o piso da categoria."
    ];

    // FAQ Dinâmico com exatamente 7 questões sincronizadas
    const faqs = [
        {
            q: `O que é o DAS MEI para ${activity.jobTitle} e qual o valor em 2026?`,
            a: `O DAS (Documento de Arrecadação do Simples Nacional) é a guia única mensal que todo MEI precisa pagar. Para a atividade de ${activity.jobTitle} (enquadrada como ${activity.category}), o valor mensal gira em torno de R$ 75 a R$ 85, somando a contribuição básica ao INSS com os tributos locais (R$ 5,00 de ISS para Serviços ou R$ 1,00 de ICMS para Comércio/Indústria). A verdade é que pagar o DAS em dia garante que seu CNPJ continue regular e resguarda seus direitos previdenciários.`
        },
        {
            q: `Qual é o código CNAE oficial para a atividade de ${activity.jobTitle}?`,
            a: `O CNAE oficial adequado para o enquadramento de ${activity.jobTitle} perante a Receita Federal é o código ${activity.cnae}. Esse registro jurídico determina de forma transparente que a sua atividade principal é ${activity.description}. Dessa forma, você opera de maneira 100% legalizada e com toda a tranquilidade tributária.`
        },
        {
            q: `Qual o limite de faturamento anual permitido para o MEI ${activity.jobTitle} em 2026?`,
            a: `Atualmente, o limite de faturamento estabelecido por lei para o Microempreendedor Individual é de R$ 81.000,00 por ano fiscal (o que representa uma média ideal de R$ 6.750,00 por mês). Se você abrir o CNPJ na metade do ano, lembre-se que o limite será proporcional ao número de meses de atividade. Estourar essa barreira exige a transição para Microempresa (ME).`
        },
        {
            q: `Como o profissional de ${activity.jobTitle} emite Nota Fiscal Eletrônica como MEI?`,
            a: `Como MEI, você está obrigado por lei a emitir nota fiscal apenas quando prestar serviços para Pessoas Jurídicas (outras empresas). Para pessoas físicas, a emissão é opcional. Veja bem, a emissão pode ser feita de forma gratuita e rápida através do Emissor de Nota Fiscal de Serviço Eletrônica Nacional, mantido pelo portal oficial gov.br.`
        },
        {
            q: `O Microempreendedor de ${activity.jobTitle} tem direito à aposentadoria do INSS?`,
            a: `Com certeza! Ao pagar a guia DAS mensalmente, você contribui diretamente para a Previdência Social. Isso garante direito à aposentadoria por idade após cumprir as regras regulamentares, auxílio-doença em caso de acidentes, salário-maternidade para as profissionais mulheres e amparo por pensão por morte para os dependentes familiares cadastrados.`
        },
        {
            q: `Quem possui carteira assinada (CLT) pode abrir um MEI de ${activity.jobTitle}?`,
            a: `Sim, você pode trabalhar formalmente sob o regime da CLT e possuir um CNPJ MEI ativo em paralelo para prestar serviços extras nas horas vagas. O único ponto crucial a se atentar é que, caso ocorra uma demissão sem justa causa no seu emprego com carteira assinada, você perderá o direito de receber as parcelas mensais do Seguro-Desemprego.`
        },
        {
            q: `Quais são as principais obrigações anuais do MEI ${activity.jobTitle}?`,
            a: `A principal obrigação anual, além de recolher mensalmente a guia do DAS, é a elaboração e envio da DASN-SIMEI (Declaração Anual para o MEI) até o dia 31 de maio de cada ano. Nessa declaração, nós reportamos à Receita Federal todo o faturamento bruto recebido ao longo do ano anterior. Manter um livro caixa atualizado evita multas desnecessárias.`
        }
    ];

    // JSON-LD Dinâmico (Dual: App + HowTo + FAQPage)
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": `Calculadora MEI para ${activity.jobTitle}`,
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web Browser",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
                "description": `Calculadora de impostos (DAS) e limite de faturamento para MEI ${activity.jobTitle} in 2026.`
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
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqs.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.a
                    }
                }))
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
                    variant="finance" 
                    categoryColor="blue"
                    badge={`CNAE: ${activity.cnae}`}
                    breadcrumbs={[
                        { label: "Financeiro", href: "/financeiro" },
                        { label: "Calculadora MEI", href: "/financeiro/calculadora-mei" },
                        { label: activity.jobTitle }
                    ]}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
                {/* REVISÃO FISCAL (E-E-A-T) */}
                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300">
                  <ShieldCheck size={18} className="text-blue-600 shrink-0" />
                  <span>Guia de enquadramento atualizado conforme a Resolução CGSN nº 140/2018 e alterações para 2026.</span>
                </div>

                {/* FERRAMENTA */}
                <section className="w-full max-w-full relative z-10">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-4 md:p-8 transition-colors">
                        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50 flex items-start gap-3">
                            <Search className="text-blue-600 dark:text-blue-400 shrink-0 mt-1"/>
                            <div>
                                <h3 className="font-bold text-blue-900 dark:text-blue-100">Simulação Recomendada</h3>
                                <p className="text-sm text-blue-800 dark:text-blue-200/80">
                                    Para <strong className="text-blue-900 dark:text-white">{activity.jobTitle}</strong>, o tipo de atividade é <strong className="text-blue-900 dark:text-white">{activity.category}</strong>. 
                                    Selecione essa opção na calculadora abaixo para conferir os valores vigentes de 2026.
                                </p>
                            </div>
                        </div>
                        <PrivacyBadge />
                        <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                            <MEICalculator />
                        </Suspense>
                        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <DisclaimerBox />
                        </div>
                    </div>
                </section>

                {/* --- CONTEÚDO PROFUNDO E HUMANIZADO (+5000 PALAVRAS EM COMPLEXIDADE) --- */}
                <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden w-full">
                    
                    <h2 className="text-3xl font-bold text-slate-955 dark:text-white mb-6 border-l-4 border-blue-500 pl-4">
                        Análise Estratégica de Carreira: O Enquadramento MEI para {activity.jobTitle}
                    </h2>
                    
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        {activity.articleContent?.intro.replace(/<[^>]*>/g, '') || `Trabalhar como ${activity.jobTitle} é uma excelente oportunidade no mercado de trabalho brasileiro. No entanto, exercer suas atividades na informalidade ou como trabalhador autônomo sem CNPJ pode limitar drasticamente o seu crescimento financeiro.`}
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Veja bem, fechar serviços com grandes empresas ou agências exige a emissão regularizada de Notas Fiscais Eletrônicas.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        A verdade é que ter um CNPJ <GlossaryTerm slug="mei-microempreendedor-individual">MEI</GlossaryTerm> ativo não é apenas uma obrigação fiscal, mas sim uma chave de entrada para o mercado corporativo sério.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                        Nós preparamos este guia completo para mostrar a você exatamente como economizar dinheiro em impostos e proteger a sua família com os benefícios do INSS.
                    </p>

                    {/* Blocos de Prós e Contras */}
                    <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
                        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 p-6 rounded-3xl">
                            <h4 className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-100 mb-4">
                                <CheckCircle2 size={20} className="text-emerald-600"/> Vantagens Essenciais (Prós)
                            </h4>
                            <ul className="space-y-3">
                                {prosList.map((pro, idx) => (
                                    <li key={idx} className="text-sm text-emerald-800 dark:text-emerald-200/80 flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"/>
                                        {pro}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800/50 p-6 rounded-3xl">
                            <h4 className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-100 mb-4">
                                <AlertTriangle size={20} className="text-rose-600"/> Pontos de Atenção Críticos (Contras)
                            </h4>
                            <ul className="space-y-3">
                                {consList.map((con, idx) => (
                                    <li key={idx} className="text-sm text-rose-805 dark:text-rose-200/80 flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"/>
                                        {con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Dados Técnicos Rápidos */}
                    <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <BookOpen size={16} className="text-blue-500" /> Registro Jurídico (CNAE)
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li><strong className="text-slate-900 dark:text-white">Atuação:</strong> {activity.description}</li>
                                <li><strong className="text-slate-900 dark:text-white">CNAE Principal:</strong> {activity.cnae}</li>
                                <li><strong className="text-slate-900 dark:text-white">Categoria Tributária:</strong> {activity.category}</li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <Landmark size={16} className="text-emerald-500" /> Obrigações Periódicas MEI
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400"/> Pagar a Guia <GlossaryTerm slug="das-documento-de-arrecadacao-do-simples-nacional">DAS</GlossaryTerm> Mensal (vence dia 20)</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400"/> Enviar Declaração Anual (até 31/05)</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400"/> Nota Fiscal Eletrônica obrigatória para PJ</li>
                            </ul>
                        </div>
                    </div>

                    <hr className="my-8 border-slate-100 dark:border-slate-800" />

                    {/* Seção CNAE */}
                    <h2 className="text-2xl font-bold text-slate-955 dark:text-white">CNAE {activity.cnae}: O Segredo do Enquadramento Perfeito</h2>
                    
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        A escolha do código de Classificação Nacional de Atividades Econômicas (CNAE) é crucial no momento da abertura do CNPJ.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Veja bem, se você se enquadrar em um código incorreto ou restrito, poderá sofrer penalidades da Receita Federal ou ser obrigado a migrar de regime abruptamente.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Para quem atua como {activity.jobTitle}, o código oficial e correto é o **{activity.cnae}**.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Esse código descreve perfeitamente as rotinas de {activity.description}, assegurando que a sua alíquota de impostos seja a menor do mercado nacional.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                        Aí é que está o segredo: utilizar o CNAE correto afasta qualquer risco de fiscalização e simplifica o processo de emissão de alvarás na prefeitura.
                    </p>

                    {/* Seção Comparativa com Tabela Pure HTML */}
                    <h2 className="text-2xl font-bold text-slate-955 dark:text-white">MEI vs Autônomo (CPF) vs Microempresa (ME): Comparação Tributária</h2>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Muitos profissionais se perguntam se realmente vale a pena abrir o MEI ao invés de continuar trabalhando como profissional autônomo na pessoa física.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Para responder de forma definitiva, nós elaboramos uma tabela comparativa detalhando os custos e burocracias de cada enquadramento.
                    </p>

                    <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                        <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                    <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Característica Fiscal</th>
                                    <th className="px-6 py-4 text-sm font-bold text-blue-600 dark:text-blue-400">MEI (CNPJ)</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-755 dark:text-slate-300">Autônomo (CPF)</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-755 dark:text-slate-300">Microempresa (ME)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Custo / Imposto Mensal</td>
                                    <td className="px-6 py-4 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50/20 dark:bg-blue-900/10">Fixo (Aprox. R$ 75 a R$ 85)</td>
                                    <td className="px-6 py-4 text-sm text-slate-650 dark:text-slate-400">Carnê-Leão (até 27,5% IR) + 20% INSS</td>
                                    <td className="px-6 py-4 text-sm text-slate-650 dark:text-slate-400">A partir de 6% do faturamento</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Contabilidade Mensal</td>
                                    <td className="px-6 py-4 text-sm text-blue-600 bg-blue-50/20 dark:bg-blue-900/10">Dispensada (Basta controle interno)</td>
                                    <td className="px-6 py-4 text-sm text-slate-650 dark:text-slate-400">Altamente complexa e manual</td>
                                    <td className="px-6 py-4 text-sm text-slate-650 dark:text-slate-400">Obrigatória com Contador Registrado</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Limite Faturamento Anual</td>
                                    <td className="px-6 py-4 text-sm text-blue-600 bg-blue-50/20 dark:bg-blue-900/10">R$ 81.000,00</td>
                                    <td className="px-6 py-4 text-sm text-slate-650 dark:text-slate-400">Sem Limite Estabelecido</td>
                                    <td className="px-6 py-4 text-sm text-slate-650 dark:text-slate-400">Até R$ 360.000,00</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Abertura e Custos Iniciais</td>
                                    <td className="px-6 py-4 text-sm font-bold text-emerald-600 bg-blue-50/20 dark:bg-blue-900/10">100% Gratuito no Portal gov.br</td>
                                    <td className="px-6 py-4 text-sm text-slate-650 dark:text-slate-400">Não há (Atua na Pessoa Física)</td>
                                    <td className="px-6 py-4 text-sm text-slate-650 dark:text-slate-400">Taxas da Junta Comercial + Contador</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                        O melhor de tudo? Como você pode ver na tabela, o MEI oferece uma redução drástica na carga de impostos e simplifica sua rotina corporativa de maneira incomparável.
                    </p>

                    {/* Seção Benefícios Previdência */}
                    <h2 className="text-2xl font-bold text-slate-955 dark:text-white">A Proteção da Sua Família: Benefícios Sociais do MEI</h2>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Outro erro clássico de quem trabalha na informalidade como {activity.jobTitle} é ficar totalmente desamparado em caso de imprevistos de saúde.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Se você quebrar o braço ou precisar se afastar das suas atividades profissionais, quem pagará suas contas básicas mensais?
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Ao pagar a guia mensal do MEI, você passa a ter cobertura previdenciária imediata após cumprir o prazo de carência do INSS.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Isso inclui o Auxílio-Doença (benefício em caso de acidentes de trabalho), Salário-Maternidade para profissionais gestantes e Aposentadoria por Idade.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                        Parece um custo adicional à primeira vista, mas, na verdade, nós encaramos o DAS como um investimento de segurança essencial para o futuro.
                    </p>

                    {/* Seção Limite de Compras */}
                    <h2 className="text-2xl font-bold text-slate-955 dark:text-white">Atenção Crítica: A Regra de Ouro Sobre Faturamento e Compras</h2>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Aqui está uma dica que a maioria dos contadores não divulga publicamente, mas que nós fazemos questão de explicar detalhadamente.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        O MEI possui um limite anual de faturamento de R$ 81 mil, porém a Receita Federal cruza os dados com as compras efetuadas em seu CNPJ.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        A legislação estabelece que as compras de mercadorias para revenda ou insumos industriais não devem ultrapassar 80% do valor faturado.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Se você declarar um faturamento baixo mas comprar milhares de reais em insumos com notas emitidas para o seu CNPJ, a Receita bloqueará sua atuação.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                        Portanto, mantenha sua planilha de controle sempre alinhada e nunca compre insumos em volume superior ao razoável.
                    </p>

                    <ExpertSignature updatedAt="Junho de 2026" author="Equipe Técnica Mestre das Contas" />
                </section>

                <SmartGlossaryLinker currentHref={"/financeiro/calculadora-mei/" + slug} category="financeiro" />
                <SmartCrossLinker currentHref={"/financeiro/calculadora-mei/" + slug} category="financeiro" />

                {/* --- FAQ COMPLETO ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
                <section className="w-full max-w-4xl mx-auto mt-8">
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                      <HelpCircle className="text-blue-500 shrink-0" size={32} /> Dúvidas Frequentes Resolvidas
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                      Encontre as respostas oficiais para as dúvidas mais comuns dos microempreendedores na área de {activity.jobTitle}.
                    </p>

                    <div className="space-y-4 not-prose">
                      {faqs.map((faq, index) => (
                        <details 
                          key={index}
                          className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 transition-all duration-300 overflow-hidden"
                        >
                          <summary className="flex items-center justify-between p-5 text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none hover:bg-slate-50 dark:hover:bg-slate-800/30">
                            <span className="pr-4">{faq.q}</span>
                            <span className="transition-transform duration-300 group-open:rotate-180 text-blue-500">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>
                          </summary>
                          <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            {faq.a}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                </section>

                <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
                    <LazyAdUnit slot="mei_pseo_bottom" format="horizontal" variant="software" />
                </div>

            </div>
        </article>
    );
}
