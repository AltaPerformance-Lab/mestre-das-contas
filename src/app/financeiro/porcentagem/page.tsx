import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PercentageCalculator from "@/components/calculators/PercentageCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Percent, HelpCircle, Calculator, 
  TrendingUp, CheckCircle2, ArrowRight,
  ShoppingCart, PieChart, GraduationCap, Wallet,
  Brain, Lightbulb, Landmark, ExternalLink, Divide
} from "lucide-react";

// --- 1. METADATA DE ALTO PERFORMANCE (SEO 2026) ---
export const metadata: Metadata = {
  title: "Calculadora de Porcentagem 2026 | Simples, Descontos e Aumentos",
  description: "Resolva qualquer conta de % em segundos. Calcule descontos, aumentos de salário e variação percentual. Ferramenta 4 em 1 com truques de cálculo mental.",
  keywords: [
    "calculadora porcentagem", 
    "como calcular porcentagem", 
    "quanto é 30% de", 
    "calcular desconto", 
    "calcular aumento percentual", 
    "regra de tres porcentagem",
    "formula porcentagem excel"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/financeiro/porcentagem" },
  openGraph: {
    title: "Calculadora de Porcentagem 4 em 1 - Mestre das Contas",
    description: "Resolva qualquer conta de % em segundos. Aumentos, descontos e regra de três.",
    url: "https://mestredascontas.com.br/financeiro/porcentagem",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Calculadora de Porcentagem" }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// --- FAQ LIST (DRY Content) ---
const faqList = [
    { q: "Como calcular porcentagem na calculadora comum?", a: "Digite o valor principal, aperte o sinal de multiplicação (x), digite a porcentagem e aperte a tecla (%). Depois aperte igual (=). Ex: 500 x 10 % = 50." },
    { q: "O que é variação percentual?", a: "É a diferença entre um valor antigo e um novo, expressa em porcentagem. É muito usada para medir inflação ou crescimento de lucros. Fórmula: ((Valor Novo - Valor Antigo) ÷ Valor Antigo) × 100." },
    { q: "Como calcular aumento de salário?", a: "Multiplique o salário atual pela porcentagem de aumento (em decimal, ex: 10% = 0.10) e some ao valor original. Ou multiplique direto por 1.10." },
    { q: "Como tirar a porcentagem de um valor?", a: "Para descontar (ex: 20% off), multiplique o valor original pelo fator de desconto (0.80). Ex: R$ 100 x 0.80 = R$ 80." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Porcentagem",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta utilitária para realizar 4 tipos de cálculos percentuais: parte de um todo, proporção, aumento e desconto.",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "12500",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Article",
      "headline": "Matemática Financeira Descomplicada: Tudo sobre Porcentagem",
      "description": "Aprenda a calcular descontos, aumentos e variações percentuais com fórmulas simples e truques mentais.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-03-10",
      "dateModified": new Date().toISOString()
    },
    {
      "@type": "HowTo",
      "name": "Como fazer conta de porcentagem de cabeça",
      "step": [
        { "@type": "HowToStep", "text": "Para 10%, basta voltar a vírgula uma casa para a esquerda." },
        { "@type": "HowToStep", "text": "Para 1%, volte a vírgula duas casas." },
        { "@type": "HowToStep", "text": "Para 50%, divida o valor por 2." }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function PorcentagemPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-slate-50 p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-slate-400">Carregando Calculadora...</div>}>
                    <PercentageCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-200 pt-3">
                    <Link href="https://mestredascontas.com.br/financeiro/porcentagem" target="_blank" className="text-[10px] text-slate-400 hover:text-indigo-600 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Percent size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- PÁGINA COMPLETA ---
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      {/* INJEÇÃO DE SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Porcentagem"
          description="Resolva qualquer dúvida matemática em segundos. Calcule descontos de lojas, aumentos de salário, variação de preços e muito mais com nossa ferramenta 4 em 1."
          category="Matemática Financeira"
          icon={<Percent size={32} strokeWidth={2} />}
          variant="default" // Azul/Indigo
          categoryColor="indigo"
          badge="Ferramenta Gratuita"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Porcentagem" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="percent_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 p-1 md:p-2">
              <Suspense fallback={
                <div className="h-96 w-full bg-slate-50 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                        <Calculator className="animate-bounce text-slate-300" size={32}/>
                        <span>Carregando Calculadora...</span>
                    </div>
                </div>
              }>
                  <PercentageCalculator />
              </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <AdUnit slot="percent_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-indigo-600 pl-4">
              A Matemática do Dinheiro
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            A porcentagem é a base de toda a economia moderna. O símbolo "%" significa literalmente "por cento", ou seja, "dividido por 100". Entender isso é a chave para não ser enganado em promoções, empréstimos ou negociações salariais.
          </p>
          <p>
            Você já se sentiu perdido tentando calcular uma gorjeta ou saber quanto realmente economizou na Black Friday? Não se preocupe, é mais comum do que parece. O segredo está em entender que a porcentagem é apenas uma fração disfarçada.
          </p>

          {/* TRUQUES MENTAIS (FEATURE BOX) */}
          <div className="bg-indigo-50 p-6 md:p-8 rounded-2xl border border-indigo-200 my-10 not-prose relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Brain size={120} className="text-indigo-900"/></div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2 relative z-10">
                  <Lightbulb size={24} className="text-amber-500"/> Truques de Cálculo Mental
              </h3>
              <p className="text-indigo-800 mb-4 text-sm relative z-10">Impressione amigos e negocie rápido calculando sem celular:</p>
              
              <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                  <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
                      <p className="font-bold text-indigo-700 text-sm mb-1 flex items-center gap-2"><Divide size={14}/> A Regra dos 10%</p>
                      <p className="text-xs text-slate-600 leading-relaxed">Para achar 10% de qualquer número, apenas <strong>volte a vírgula uma casa</strong> para a esquerda.</p>
                      <p className="text-xs text-slate-500 mt-2 font-mono bg-slate-50 px-2 py-1 rounded inline-block">10% de 250 = 25,0</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
                      <p className="font-bold text-indigo-700 text-sm mb-1 flex items-center gap-2"><Divide size={14}/> A Regra dos 50%</p>
                      <p className="text-xs text-slate-600 leading-relaxed">50% é a <strong>metade exata</strong>. Basta dividir o valor por 2.</p>
                      <p className="text-xs text-slate-500 mt-2 font-mono bg-slate-50 px-2 py-1 rounded inline-block">50% de 80 = 40</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
                      <p className="font-bold text-indigo-700 text-sm mb-1 flex items-center gap-2"><Divide size={14}/> A Regra dos 1%</p>
                      <p className="text-xs text-slate-600 leading-relaxed">Para achar 1%, volte a vírgula <strong>duas casas</strong> para a esquerda.</p>
                      <p className="text-xs text-slate-500 mt-2 font-mono bg-slate-50 px-2 py-1 rounded inline-block">1% de 500 = 5,00</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
                      <p className="font-bold text-indigo-700 text-sm mb-1 flex items-center gap-2"><ArrowRight size={14}/> O Truque da Inversão</p>
                      <p className="text-xs text-slate-600 leading-relaxed"><strong>x% de y é igual a y% de x</strong>. Se a conta for difícil, inverta!</p>
                      <p className="text-xs text-slate-500 mt-2 font-mono bg-slate-50 px-2 py-1 rounded inline-block">8% de 50 = 50% de 8 (4)</p>
                  </div>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <GraduationCap className="text-indigo-600" /> Tabela de Conversão Rápida
          </h3>
          <p>
              Muitas vezes, converter a porcentagem em fração ou decimal torna a conta muito mais fácil. Use esta tabela como referência:
          </p>

          {/* TABELA RESPONSIVA */}
          <div className="not-prose my-8 overflow-hidden border rounded-xl border-slate-200 shadow-sm bg-white">
              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse min-w-[500px]">
                      <thead className="bg-slate-100 text-slate-600 text-xs uppercase">
                          <tr>
                              <th className="px-6 py-3 font-bold border-b border-slate-200">Porcentagem</th>
                              <th className="px-6 py-3 font-bold border-b border-slate-200">Fração</th>
                              <th className="px-6 py-3 font-bold border-b border-slate-200">Decimal (Multiplicador)</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3 font-bold text-indigo-600">5%</td>
                              <td className="px-6 py-3">1/20</td>
                              <td className="px-6 py-3 font-mono text-slate-500">0.05</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3 font-bold text-indigo-600">10%</td>
                              <td className="px-6 py-3">1/10</td>
                              <td className="px-6 py-3 font-mono text-slate-500">0.10</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3 font-bold text-indigo-600">20%</td>
                              <td className="px-6 py-3">1/5</td>
                              <td className="px-6 py-3 font-mono text-slate-500">0.20</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3 font-bold text-indigo-600">25%</td>
                              <td className="px-6 py-3">1/4</td>
                              <td className="px-6 py-3 font-mono text-slate-500">0.25</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3 font-bold text-indigo-600">50%</td>
                              <td className="px-6 py-3">1/2 (Metade)</td>
                              <td className="px-6 py-3 font-mono text-slate-500">0.50</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3 font-bold text-indigo-600">75%</td>
                              <td className="px-6 py-3">3/4</td>
                              <td className="px-6 py-3 font-mono text-slate-500">0.75</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2">
              <ShoppingCart className="text-green-600" /> Exemplos no Dia a Dia
          </h3>
          
          <ul className="space-y-4 not-prose mb-10">
              <li className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="bg-green-100 p-2.5 rounded-lg text-green-600 shrink-0 mt-1"><TrendingUp size={20}/></div>
                  <div>
                      <strong className="text-slate-900 block text-sm mb-1">Aumento de Salário</strong>
                      <span className="text-slate-600 text-xs md:text-sm leading-relaxed">Se você ganha R$ 2.000 e recebe 10% de aumento, a conta é: 2000 × 1.10 = <strong>R$ 2.200</strong>.</span>
                  </div>
              </li>
              <li className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="bg-red-100 p-2.5 rounded-lg text-red-600 shrink-0 mt-1"><Percent size={20}/></div>
                  <div>
                      <strong className="text-slate-900 block text-sm mb-1">Desconto em Loja</strong>
                      <span className="text-slate-600 text-xs md:text-sm leading-relaxed">Uma camisa de R$ 100 com 30% de desconto sai por: 100 × 0.70 = <strong>R$ 70</strong>.</span>
                  </div>
              </li>
              <li className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600 shrink-0 mt-1"><PieChart size={20}/></div>
                  <div>
                      <strong className="text-slate-900 block text-sm mb-1">Inflação (IPCA)</strong>
                      <span className="text-slate-600 text-xs md:text-sm leading-relaxed">Se a inflação foi de 5%, um produto que custava R$ 10,00 passa a custar, em média, R$ 10,50.</span>
                  </div>
              </li>
          </ul>

          {/* FAQ ACORDION */}
          <div className="mt-12 not-prose">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <HelpCircle className="text-indigo-600" /> Dúvidas Frequentes
            </h2>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:bg-white open:ring-1 open:ring-indigo-100 transition-all">
                      <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-indigo-400 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm animate-in fade-in">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* FONTES */}
          <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose bg-slate-50 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Aprenda Mais (Fontes)
              </h3>
              <p className="text-xs text-slate-500 mb-3">Dados matemáticos e financeiros baseados em:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600">
                  <a href="https://www.ibge.gov.br/explica/inflacao.php" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                      IBGE - Inflação Oficial <ExternalLink size={10}/>
                  </a>
                  <a href="https://portaldamatematica.obmep.org.br/" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                      OBMEP - Portal da Matemática <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          {/* CROSS-LINKING */}
          <div className="mt-16 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <CheckCircle2 size={16} className="text-emerald-500"/> Aplique o conhecimento:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/financeiro/juros-compostos" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-400 hover:shadow-lg transition-all group">
                  <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-emerald-600 shadow-sm group-hover:scale-110 transition-transform"><TrendingUp size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Juros Compostos</span>
                  <span className="text-sm text-slate-500 mt-1">Investimentos</span>
              </Link>
              <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group">
                  <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 shadow-sm group-hover:scale-110 transition-transform"><Wallet size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                  <span className="text-sm text-slate-500 mt-1">Descontos mensais</span>
              </Link>
              <Link href="/financeiro/financiamento" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition-all group">
                  <div className="bg-indigo-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-indigo-600 shadow-sm group-hover:scale-110 transition-transform"><Calculator size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Financiamento</span>
                  <span className="text-sm text-slate-500 mt-1">Simular parcelas</span>
              </Link>
            </div>
          </div>

        </div>

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <AdUnit slot="percent_bottom" format="horizontal" variant="software" />
        </div>

        {/* RODAPÉ IMPRESSÃO */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}