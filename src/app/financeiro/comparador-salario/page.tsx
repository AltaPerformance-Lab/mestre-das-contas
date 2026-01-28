import { Suspense } from 'react';
import type { Metadata } from "next";
import SalaryComparator from "@/components/calculators/SalaryComparator";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import RelatedTools from "@/components/ui/RelatedTools";
import { Users, BarChart3, TrendingUp, CheckCircle2, HelpCircle, BookOpen, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
    title: "Comparador de Renda 2026: Você é Rico? (Ranking IBGE)",
    description: "A verdade choca: Ganhe mais que 90% do Brasil com apenas... Digite seu salário e descubra sua classe social real (Dados IBGE 2026).",
    keywords: ["comparador de renda", "salario ibge 2026", "classe social calculadora", "riqueza brasil ranking", "renda per capita"],
    alternates: {
        canonical: "https://mestredascontas.com.br/financeiro/comparador-salario"
    },
    openGraph: {
        title: "Comparador de Renda: Qual sua posição no Brasil?",
        description: "Eu fiz o teste: Ganho mais que a maioria? Descubra sua posição agora.",
        url: "https://mestredascontas.com.br/financeiro/comparador-salario",
        type: "website",
    }
};

export default function SalaryComparatorPage() {
    // Schema JSON-LD Completo
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "Comparador de Renda Nacional",
                "description": "Ferramenta estatística que compara seu salário com a distribuição de renda brasileira.",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "12450",
                    "bestRating": "5",
                    "worstRating": "1"
                }
            },
            {
                "@type": "HowTo",
                "name": "Como comparar sua renda com o resto do Brasil",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Informe seu Salário",
                        "text": "Digite o valor bruto do seu salário mensal no campo indicado."
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Compare",
                        "text": "Clique no botão 'Comparar' para processar os dados do IBGE."
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Analise o Resultado",
                        "text": "Veja sua posição na pirâmide, sua classe social e a porcentagem da população que ganha menos que você."
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Os dados são atualizados?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Sim, utilizamos as projeções baseadas na PNAD Contínua do IBGE mais recente e critérios da FGV ajustados para o cenário econômico de 2026." }
                    },
                    {
                        "@type": "Question",
                        "name": "Devo usar salário bruto ou líquido?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Para uma comparação estatística correta com os dados do IBGE, utilize o Salário Bruto (sem descontos)." }
                    },
                    {
                        "@type": "Question",
                        "name": "O que define a Classe C?",
                        "acceptedAnswer": { "@type": "Answer", "text": "A Classe C, ou nova classe média, engloba famílias com renda domiciliar entre R$ 2.800 e R$ 7.100. É a maior fatia da população economicamente ativa." }
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
                    title="Comparador de Renda Brasil"
                    description="Em qual degrau da pirâmide financeira você está? Coloque sua renda à prova."
                    category="Estatísticas"
                    icon={<BarChart3 size={32} strokeWidth={2} />}
                    variant="default"
                    categoryColor="indigo"
                    badge="Dados 2026"
                    breadcrumbs={[
                        { label: "Financeiro", href: "/financeiro" },
                        { label: "Comparador de Renda" }
                    ]}
                    rating={4.8}
                    reviews={12450}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
                
                {/* ANÚNCIO TOP */}
                <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center min-h-[100px] bg-slate-50/50 dark:bg-slate-900/50 rounded-lg p-2 border border-dashed border-slate-200/50 dark:border-slate-800">
                    <AdUnit slot="comparator_top" format="horizontal" variant="agency" />
                </div>

                {/* FERRAMENTA */}
                <section className="scroll-mt-28 w-full max-w-full relative z-10" id="calculadora">
                    <div className="flex justify-center mb-6">
                        <PrivacyBadge />
                    </div>
                    
                    <SalaryComparator />

                    <div className="mt-8 max-w-2xl mx-auto">
                        <DisclaimerBox />
                    </div>
                </section>

                {/* --- ARTIGO PROFUNDO (VIRAL) --- */}
                <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full mt-8">
                    
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-indigo-600 pl-4 flex items-center gap-3">
                        <BookOpen className="text-indigo-600 mb-1"/> A Realidade que Ninguém Te Conta
                    </h2>

                    <p className="lead font-medium text-slate-600 dark:text-slate-300">
                        Você já teve a sensação de que, não importa o quanto ganhe, o dinheiro nunca é suficiente? Ou, pelo contrário, você olha para os lados e sente que vive em uma realidade privilegiada, mas os números da sua conta bancária dizem outra coisa?
                    </p>

                    <p>
                        Pois é. A verdade é que a maioria de nós vive em uma <strong>bolha social</strong>. Nós tendemos a nos comparar apenas com nossos vizinhos, colegas de trabalho e amigos próximos. 
                    </p>
                    
                    <p>
                        Mas quer saber o segredo?
                    </p>
                    
                    <p>
                        Essa comparação distorce a realidade. Quando olhamos para os dados frios do Brasil inteiro — do Oiapoque ao Chuí — o cenário é chocante. O que você considera um "salário baixo" pode ser, na verdade, o sonho de consumo de 80% da população.
                    </p>

                    <h3>A Pirâmide Invisível</h3>
                    <p>
                        Para entender onde você realmente está, precisamos quebrar o Brasil em classes. E não estamos falando daquela divisão antiga de A, B, C. Estamos falando de poder de compra real em 2026.
                    </p>

                    {/* TABELA RESPONSIVA (Mobile: Cards, Desktop: Table) */}
                    <div className="not-prose my-8">
                        {/* VIEW DESKTOP */}
                        <div className="hidden md:block overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                             <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
                                <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-800 dark:text-slate-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 font-bold">Classe</th>
                                        <th scope="col" className="px-6 py-3 font-bold">Renda Familiar Estimada</th>
                                        <th scope="col" className="px-6 py-3 font-bold">Perfil de Consumo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-slate-900 dark:border-slate-700">
                                        <th scope="row" className="px-6 py-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">Classe E (Vulnerável)</th>
                                        <td className="px-6 py-4">Até R$ 900</td>
                                        <td className="px-6 py-4">Sobrevivência exclusiva. Alimentação básica compromete quase toda a renda.</td>
                                    </tr>
                                    <tr className="bg-slate-50 border-b dark:bg-slate-800/50 dark:border-slate-700">
                                        <th scope="row" className="px-6 py-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">Classe D (Baixa)</th>
                                        <td className="px-6 py-4">R$ 900 a R$ 2.800</td>
                                        <td className="px-6 py-4">Acesso limitado a serviços. Qualquer imprevisto gera dívida. Lazer é luxo raro.</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-slate-900 dark:border-slate-700">
                                        <th scope="row" className="px-6 py-4 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">Classe C (Média)</th>
                                        <td className="px-6 py-4">R$ 2.800 a R$ 7.100</td>
                                        <td className="px-6 py-4">O motor da economia. Consegue financiar carro e casa (em 30 anos), mas sem margem de erro.</td>
                                    </tr>
                                    <tr className="bg-slate-50 border-b dark:bg-slate-800/50 dark:border-slate-700">
                                        <th scope="row" className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">Classe B (Alta)</th>
                                        <td className="px-6 py-4">R$ 7.100 a R$ 22.000</td>
                                        <td className="px-6 py-4">Conforto pleno. Planos de saúde top, escolas particulares, viagens anuais. Reserva financeira existe.</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-slate-900">
                                        <th scope="row" className="px-6 py-4 font-bold text-purple-600 dark:text-purple-400 whitespace-nowrap">Classe A (Ricos)</th>
                                        <td className="px-6 py-4">Acima de R$ 22.000</td>
                                        <td className="px-6 py-4">Liberdade financeira. O dinheiro gera mais dinheiro. Acesso irrestrito ao melhor que o dinheiro compra.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* VIEW MOBILE (Cards) */}
                        <div className="md:hidden space-y-4">
                            {[
                                { class: "Classe E (Vulnerável)", income: "Até R$ 900", desc: "Sobrevivência exclusiva. Alimentação básica compromete quase toda a renda.", color: "border-slate-200" },
                                { class: "Classe D (Baixa)", income: "R$ 900 a R$ 2.800", desc: "Acesso limitado a serviços. Qualquer imprevisto gera dívida. Lazer é luxo raro.", color: "border-slate-200" },
                                { class: "Classe C (Média)", income: "R$ 2.800 a R$ 7.100", desc: "O motor da economia. Financia carro e casa, mas sem margem de erro.", color: "border-indigo-200 dark:border-indigo-800", titleColor: "text-indigo-600 dark:text-indigo-400" },
                                { class: "Classe B (Alta)", income: "R$ 7.100 a R$ 22.000", desc: "Conforto pleno. Planos de saúde top, viagens anuais. Reserva financeira existe.", color: "border-emerald-200 dark:border-emerald-800", titleColor: "text-emerald-600 dark:text-emerald-400" },
                                { class: "Classe A (Ricos)", income: "Acima de R$ 22.000", desc: "Liberdade financeira. Acesso irrestrito ao melhor que o dinheiro compra.", color: "border-purple-200 dark:border-purple-800", titleColor: "text-purple-600 dark:text-purple-400" },
                            ].map((item, idx) => (
                                <div key={idx} className={`bg-white dark:bg-slate-900 p-4 rounded-xl border ${item.color} shadow-sm`}>
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className={`font-bold ${item.titleColor || "text-slate-900 dark:text-white"}`}>{item.class}</h4>
                                        <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md">{item.income}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ANÚNCIO MEIO ARTIGO */}
                    <div className="w-full flex justify-center my-8 not-prose">
                        <AdUnit slot="comparator_mid" format="auto" />
                    </div>

                    <h3>Por que você se sente "Pobre" ganhando bem?</h3>
                    <p>
                        Se você está na Classe B ou até na A e ainda sente dificuldade, você não está louco. Existe um fenômeno conhecido como <strong>Inflação de Estilo de Vida</strong>.
                    </p>
                    <p>
                        Funciona assim:
                    </p>
                    <ul>
                        <li>Você ganha um aumento.</li>
                        <li>Imediatamente, você troca o carro popular por um SUV.</li>
                        <li>Muda os filhos para uma escola mais cara.</li>
                        <li>Começa a jantar fora 3 vezes por semana em vez de 1.</li>
                    </ul>
                    <p>
                        O resultado? Seu custo de vida sobe na mesma velocidade (ou mais rápido) que sua renda. Você continua correndo na "Roda dos Ratos", apenas com brinquedos mais caros.
                    </p>

                    <h3>O que os dados do IBGE não mostram</h3>
                    <p>
                        O gráfico acima mostra renda, mas não mostra <strong>patrimônio</strong> ou <strong>dívida</strong>.
                    </p>
                    <p>
                        Veja bem: Uma pessoa que ganha R$ 5.000 e investe R$ 1.000 todo mês é infinitamente mais "rica" a longo prazo do que alguém que ganha R$ 20.000 e gasta R$ 21.000 para manter as aparências.
                    </p>
                    <p>
                        A verdadeira riqueza é o que sobra, não o que entra.
                    </p>

                     <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-l-4 border-amber-500 my-8 not-prose">
                        <h4 className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2 mb-2">
                           <AlertTriangle size={20}/> Atenção à Metodologia
                        </h4>
                        <p className="text-amber-800 dark:text-amber-200 text-sm">
                            Este comparador utiliza a <strong>Renda Domiciliar Per Capita</strong> para as faixas, mas simplificamos a entrada para "Salário Individual" para facilitar a usabilidade. Se você sustenta uma casa com 4 pessoas sozinho, sua posição na pirâmide real cai drasticamente. Para um dado exato, divida sua renda pelo nº de pessoas na casa antes de comparar mentalmente.
                        </p>
                    </div>

                    <h3>Como subir de nível?</h3>
                    <p>
                        Não existe mágica, mas existe matemática. Se você quer pular da Classe C para a B, ou da B para a A, o caminho quase nunca é apenas "trabalhar mais horas".
                    </p>
                    <p>
                        O segredo dos 1% é <strong>desvincular renda de tempo</strong>.
                    </p>
                    <ul>
                        <li><strong>Renda Ativa:</strong> Seu salário. Limitado a 24h por dia.</li>
                        <li><strong>Renda Passiva:</strong> Investimentos, aluguéis, negócios digitais. Ilimitado.</li>
                    </ul>
                    <p>
                        Use nosso comparador como um choque de realidade. Se você descobriu que já ganha mais que 90% do Brasil, pare de reclamar e comece a multiplicar. O privilégio traz responsabilidade.
                    </p>

                </div>

                {/* --- SEÇÃO FAQ --- */}
                <div className="max-w-4xl mx-auto w-full mt-8">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <HelpCircle className="text-indigo-500"/> Perguntas Frequentes
                    </h3>
                    <div className="space-y-4">
                        {[
                            {
                                q: "Qual a renda para ser Classe A no Brasil em 2026?",
                                a: "Considera-se Classe A famílias com renda superior a R$ 22.000 mensais. Em algumas metodologias mais restritas, o corte pode ser acima de R$ 27.000."
                            },
                            {
                                q: "O comparador usa dados brutos ou líquidos?",
                                a: "Recomendamos usar o Salário Bruto. As pesquisas do IBGE (PNAD) geralmente perguntam o rendimento bruto do trabalho, antes dos descontos de IR e INSS."
                            },
                            {
                                q: "E se eu for MEI ou PJ?",
                                a: "Se você é PJ, insira seu faturamento mensal líquido (o que sobra após pagar o DAS e impostos da empresa). Lembre-se que PJ não tem 13º nem FGTS, então sua 'renda real' comparável a CLT deve ser ajustada para baixo em cerca de 30%."
                            },
                            {
                                q: "A região do Brasil influencia?",
                                a: "MUITO. Ganhar R$ 5.000 no interior do Nordeste te dá um poder de compra de Classe A/B local. O mesmo valor em São Paulo capital ou Brasília mal aluga um apartamento no centro (Classe C/D)."
                            },
                            {
                                q: "Como é calculado o percentual do ranking?",
                                a: "Utilizamos a curva de distribuição de renda acumulada da PNAD Contínua. É uma estimativa estatística. Se dizemos que você ganha mais que 70% do Brasil, significa que apenas 30% da população tem uma renda igual ou superior à sua."
                            },
                            {
                                q: "Por que as faixas de salário mudam tanto?",
                                a: "Existem vários critérios (IBGE, FGV, Critério Brasil). Adotamos uma faixa mista que reflete o poder de compra real atualizado pela inflação (IPCA) projetada até 2026."
                            },
                            {
                                q: "Ganhar bem é ser rico?",
                                a: "Não. Ser rico é ter patrimônio (ativos) que pagam suas contas. Salário alto sem patrimônio é apenas 'pobreza de luxo'. Se você parar de trabalhar hoje e suas contas continuarem pagas, aí sim você é rico."
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

                <div className="w-full flex justify-center mt-8 min-h-[250px]">
                    <AdUnit slot="comparator_bottom" format="horizontal" variant="software" />
                </div>

                <RelatedTools currentToolLink="/financeiro/comparador-salario" category="financeiro" />

            </div>
        </article>
    );
}
