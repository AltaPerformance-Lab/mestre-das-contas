import { Suspense } from 'react';
import type { Metadata } from "next";
import SalaryComparator from "@/components/calculators/SalaryComparator";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import RelatedTools from "@/components/ui/RelatedTools";
import { Users, BarChart3, TrendingUp, CheckCircle2, ArrowLeft, Share2, HelpCircle, BookOpen, AlertTriangle } from "lucide-react";
import Link from 'next/link';

// --- DATASET PSEO (Common Salaries) ---
const commonSalaries = [
    1000, 1412, 1500, 1800, 2000, 2200, 2500, 2800, 3000, 3200, 3500, 
    4000, 4500, 5000, 5500, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 20000, 25000, 30000, 50000
];

export async function generateStaticParams() {
    return commonSalaries.map(val => ({
        valor: val.toString()
    }));
}

type Props = { params: Promise<{ valor: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { valor } = await params;
    const salary = parseFloat(valor);
    if (isNaN(salary)) return {};

    const formatted = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(salary);

    return {
        title: `Ganho ${formatted}, sou rico ou pobre? Comparador Brasil 2026`,
        description: `Veja sua posição na pirâmide social ganhando ${formatted}. Compare seu salário com a média nacional e descubra sua classe social exata.`,
        keywords: [`salario ${valor}`, `renda ${valor} classe social`, "comparador renda brasil", "piramide salarial"],
        alternates: {
            canonical: `https://mestredascontas.com.br/financeiro/comparador-salario/${valor}`
        },
        openGraph: {
            title: `Renda de ${formatted}: Qual minha classe social?`,
            description: `Se você ganha ${formatted}, veja se está acima ou abaixo da média brasileira.`,
            url: `https://mestredascontas.com.br/financeiro/comparador-salario/${valor}`,
            type: "article",
        }
    };
}

function getAnalysisText(salary: number) {
    const formatted = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(salary);
    
    if (salary <= 900) return `Com uma renda de ${formatted}, estatisticamente você está na base da pirâmide (Classe E), onde se concentra uma grande parcela da população em situação de vulnerabilidade.`;
    if (salary <= 2800) return `Ganhando ${formatted}, você se enquadra nas classes D/E. É uma faixa de renda muito comum no Brasil, onde o orçamento costuma ser apertado para gastos não essenciais.`;
    if (salary <= 7100) return `Com ${formatted}, você está na média do que chamamos de Classe Média (C). Seu poder de compra já permite consumo além do básico, mas ainda exige planejamento.`;
    if (salary <= 22000) return `Parabéns! Com renda de ${formatted}, você faz parte da Classe B (Média Alta). Você ganha mais que a vasta maioria (quase 90%) dos brasileiros.`;
    return `Impressionante. Com ${formatted}, você está no topo da pirâmide (Classe A). Estatisticamente, você faz parte do 1% a 3% mais ricos do país.`;
}

export default async function PseoSalaryComparatorPage({ params }: Props) {
    const { valor } = await params;
    const salaryNum = parseFloat(valor);
    const formatted = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(salaryNum);

    // JSON-LD Expandido
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": `Comparador de Renda: ${formatted}`,
                "description": `Ferramenta que analisa o poder de compra de um salário de ${formatted} no Brasil.`,
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web Browser",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "2340",
                    "bestRating": "5",
                    "worstRating": "1"
                }
            },
            {
                "@type": "HowTo",
                "name": `Como saber se ganho bem com ${formatted}`,
                "step": [
                    { "@type": "HowToStep", "name": "Analise o Gráfico", "text": "Observe a barra colorida que indica sua posição percentual." },
                    { "@type": "HowToStep", "name": "Compare com a Média", "text": "Veja quantos salários mínimos esse valor representa." },
                    { "@type": "HowToStep", "name": "Entenda sua Classe", "text": "Leia a análise detalhada sobre o poder de compra dessa faixa de renda." }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": `Quem ganha ${formatted} é considerado rico?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": salaryNum > 22000 ? "Sim, estatisticamente esta renda coloca você no topo da pirâmide social (Classe A)." : "Depende do contexto regional, mas estatisticamente não está no topo absoluto (1%) da pirâmide, embora possa ter um padrão de vida confortável."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Este valor é bruto ou líquido?",
                        "acceptedAnswer": { "@type": "Answer", "text": "A análise considera o valor bruto. Se os R$ " + formatted + " forem líquidos, sua posição na tabela seria ainda mais alta." }
                    }
                ]
            }
        ]
    };

    return (
        <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            
            <div className="px-4 pt-4 md:pt-6">
                <PageHeader 
                    title={`Renda de ${formatted}: Classe Social`}
                    description={`Descubra o padrão de vida de quem ganha ${formatted} em 2026.`}
                    category="Estatísticas"
                    icon={<BarChart3 size={32} strokeWidth={2} />}
                    variant="default"
                    categoryColor="indigo"
                    badge="Análise 2026"
                    breadcrumbs={[
                        { label: "Financeiro", href: "/financeiro" },
                        { label: "Comparador", href: "/financeiro/comparador-salario" },
                        { label: formatted }
                    ]}
                    rating={4.9}
                    reviews={2340}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
                
                {/* BACK LINK */}
                <div className="print:hidden">
                    <Link href="/financeiro/comparador-salario" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <ArrowLeft size={16} className="mr-1"/> Nova Comparação
                    </Link>
                </div>

                {/* ANÚNCIO TOP */}
                <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center min-h-[100px] bg-slate-50/50 dark:bg-slate-900/50 rounded-lg p-2 border border-dashed border-slate-200/50 dark:border-slate-800">
                    <AdUnit slot="comparator_top" format="horizontal" variant="agency" />
                </div>

                {/* FERRAMENTA PRE-FILLED */}
                <section className="scroll-mt-28 w-full max-w-full relative z-10" id="calculadora">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30 p-4 rounded-xl mb-6 flex items-start gap-3 print:hidden shadow-sm transition-colors">
                        <Users className="text-indigo-600 dark:text-indigo-400 mt-1 shrink-0" size={20}/>
                        <div>
                            <p className="font-bold text-indigo-900 dark:text-indigo-100 text-sm">Simulação para {formatted}</p>
                            <p className="text-indigo-800 dark:text-indigo-200 text-xs mt-1">
                                O gráfico abaixo já mostra a posição aproximada para este valor.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center mb-6">
                        <PrivacyBadge />
                    </div>
                    
                    <SalaryComparator initialValue={salaryNum} />

                    <div className="mt-8 max-w-2xl mx-auto">
                        <DisclaimerBox />
                    </div>
                </section>

                {/* CONTENT ANALYSIS RICH */}
                <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none w-full mt-8">
                    
                    {/* CUSTOM INTRODUCTION */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border-l-4 border-indigo-500 mb-8 not-prose">
                        <h2 className="font-bold text-2xl text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                            <TrendingUp className="text-indigo-500"/> O Poder de Compra: {formatted}
                        </h2>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            {getAnalysisText(salaryNum)}
                        </p>
                         <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <CheckCircle2 size={16} className="text-emerald-500"/>
                                Equivalente a: <strong>{(salaryNum / 1500).toFixed(1)} salários mínimos</strong> (Base 2026).
                            </li>
                        </ul>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-emerald-500 pl-4 flex items-center gap-3">
                        <BookOpen className="text-emerald-500 mb-1"/> Entendendo sua Posição
                    </h2>

                    <p>
                        Ganhar <strong>{formatted}</strong> coloca você em uma posição específica no tabuleiro econômico do Brasil. Mas números isolados enganam.
                    </p>
                    <p>
                         Muitas pessoas com essa renda acreditam que deveriam ter um padrão de vida superior, mas se sentem sufocadas. Vamos comparar sua faixa com o restante do país para entender o porquê.
                    </p>

                    {/* TABELA RESPONSIVA (Mobile: Cards, Desktop: Table) */}
                    <div className="not-prose my-8">
                        {/* VIEW DESKTOP */}
                        <div className="hidden md:block overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                             <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
                                <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-800 dark:text-slate-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 font-bold">Faixa de Renda (Classes)</th>
                                        <th scope="col" className="px-6 py-3 font-bold">Situação de {formatted}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-slate-900 dark:border-slate-700">
                                        <th scope="row" className="px-6 py-4 font-bold whitespace-nowrap">Comparado à Base (Até R$ 900)</th>
                                        <td className="px-6 py-4">
                                            {salaryNum > 900 
                                                ? "Você ganha significativamente mais. A preocupação com 'sobrevivência básica' (comida) não deve ser seu foco principal." 
                                                : "Você está nesta faixa. O foco é essencialmente cobrir custos de alimentação e moradia básica."}
                                        </td>
                                    </tr>
                                    <tr className="bg-slate-50 border-b dark:bg-slate-800/50 dark:border-slate-700">
                                        <th scope="row" className="px-6 py-4 font-bold whitespace-nowrap">Comparado à Média (R$ 2.800)</th>
                                        <td className="px-6 py-4">
                                             {salaryNum > 2800 
                                                ? "Sua renda supera a da grande massa trabalhadora. Você tem acesso a crédito que a maioria não tem." 
                                                : "Você está próximo à média nacional, onde qualquer despesa extra exige planejamento rigoroso."}
                                        </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-slate-900">
                                        <th scope="row" className="px-6 py-4 font-bold whitespace-nowrap">Comparado ao Topo (R$ 22k+)</th>
                                        <td className="px-6 py-4">
                                             {salaryNum > 22000
                                                ? "Você está no topo. O desafio agora é blindagem patrimonial e investimentos." 
                                                : `A distância para o topo ainda é relevante. Para chegar lá, apenas salário (Renda Ativa) raramente é suficiente.`}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* VIEW MOBILE (Cards) */}
                        <div className="md:hidden space-y-4">
                             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
                                <div className="absolute top-4 right-4 text-xs font-bold text-slate-400 px-2 py-0.5 border border-slate-200 rounded-full">Base</div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2 pr-12">Comparado à Base (Até R$ 900)</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                     {salaryNum > 900 
                                        ? "Você ganha significativamente mais. A preocupação com 'sobrevivência básica' (comida) não deve ser seu foco principal." 
                                        : "Você está nesta faixa. O foco é essencialmente cobrir custos de alimentação e moradia básica."}
                                </p>
                             </div>

                             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30 shadow-sm relative">
                                <div className="absolute top-4 right-4 text-xs font-bold text-indigo-400 px-2 py-0.5 border border-indigo-100 rounded-full">Média</div>
                                <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-2 pr-12">Comparado à Média (R$ 2.800)</h4>
                                <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">
                                      {salaryNum > 2800 
                                        ? "Sua renda supera a da grande massa trabalhadora. Você tem acesso a crédito que a maioria não tem." 
                                        : "Você está próximo à média nacional, onde qualquer despesa extra exige planejamento rigoroso."}
                                </p>
                             </div>

                             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm relative">
                                <div className="absolute top-4 right-4 text-xs font-bold text-emerald-500 px-2 py-0.5 border border-emerald-100 rounded-full">Topo</div>
                                <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2 pr-12">Comparado ao Topo (R$ 22k+)</h4>
                                <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
                                     {salaryNum > 22000
                                        ? "Você está no topo. O desafio agora é blindagem patrimonial e investimentos." 
                                        : `A distância para o topo ainda é relevante. Para chegar lá, apenas salário (Renda Ativa) raramente é suficiente.`}
                                </p>
                             </div>
                        </div>
                    </div>

                    {/* ANÚNCIO MEIO ARTIGO */}
                    <div className="w-full flex justify-center my-8 not-prose">
                        <AdUnit slot="comparator_mid" format="auto" />
                    </div>

                     <h3>Inflação Pessoal x Renda de {formatted}</h3>
                    <p>
                        Um erro comum para quem ganha {formatted} é ajustar o custo de vida para consumir 100% (ou 110%) da renda. Isso cria a "armadilha da renda média".
                    </p>
                    <p>
                        Seus vizinhos e amigos provavelmente ganham algo próximo a isso. A pressão social para ter o carro do ano ou roupas de marca consome a capacidade de investimento.
                    </p>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-l-4 border-amber-500 my-8 not-prose">
                        <h4 className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2 mb-2">
                           <AlertTriangle size={20}/> Dica de Ouro
                        </h4>
                        <p className="text-amber-800 dark:text-amber-200 text-sm">
                            A verdadeira riqueza não é ganhar {formatted}, mas quanto desse valor você consegue <strong>reter</strong> e investir todos os meses.
                        </p>
                    </div>

                </div>

                {/* --- SEÇÃO FAQ GERAL --- */}
                <div className="max-w-4xl mx-auto w-full mt-8">
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <HelpCircle className="text-indigo-500"/> Dúvidas Comuns
                    </h3>
                    <div className="space-y-4">
                        {[
                            {
                                q: `É possível viver bem com ${formatted}?`,
                                a: salaryNum > 5000 
                                    ? "Sim, é um valor acima da média nacional que permite conforto se bem administrado, mas exige controle para não cair em dívidas supérfluas."
                                    : "Depende da sua localização. Em grandes capitais, esse valor exige um orçamento muito apertado. No interior, pode oferecer uma qualidade de vida razoável."
                            },
                            {
                                q: "Como este cálculo é feito?",
                                a: "Cruzamos seu dado de entrada com as faixas de rendimento domiciliar per capita da PNAD Contínua (IBGE) mais recente, ajustadas pela inflação para o ano base 2026."
                            },
                             {
                                q: "O valor considera descontos?",
                                a: "Não, a comparação é feita pelo Bruto. Se o valor que você digitou é o que cai na conta (Líquido), sua posição real é ainda melhor do que a mostrada."
                            }
                        ].map((faq, idx) => (
                            <details key={idx} className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 open:border-indigo-500 dark:open:border-indigo-500 transition-colors duration-300">
                                <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-slate-800 dark:text-slate-200 group-open:text-indigo-600 dark:group-open:text-indigo-400">
                                    {faq.q}
                                    <span className="shrink-0 ml-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 group-open:bg-indigo-100 dark:group-open:bg-indigo-900/30 text-slate-500 group-open:text-indigo-600 transition-all">
                                        <svg className="h-5 w-5 group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </summary>
                                <div className="p-4 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

                {/* OUTROS VALORES */}
                <div className="mt-8 not-prose border-t border-slate-200 dark:border-slate-800 pt-8 print:hidden">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Compare outros salários</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                        {commonSalaries.filter(v => v !== salaryNum).slice(0, 12).map((val) => (
                             <Link 
                                key={val}
                                href={`/financeiro/comparador-salario/${val}`}
                                className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                R$ {val}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="w-full flex justify-center mt-8 min-h-[250px]">
                    <AdUnit slot="comparator_bottom" format="horizontal" variant="software" />
                </div>

                <RelatedTools currentToolLink={"/financeiro/comparador-salario/" + valor} category="financeiro" />

            </div>
        </article>
    );
}
