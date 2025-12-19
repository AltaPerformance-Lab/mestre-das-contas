import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CompoundInterestCalculator from "@/components/calculators/CompoundInterestCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";

import { 
  TrendingUp, HelpCircle, BookOpen, Calculator,
  Coins, Briefcase, FileText, 
  CheckCircle2, ArrowRight, BarChart3
} from "lucide-react";

// --- 1. METADATA OTIMIZADA ---
export const metadata: Metadata = {
  title: "Calculadora de Juros Compostos Online | Simular Investimentos 2026",
  description: "Simule seus investimentos com juros compostos. Veja o poder dos juros sobre juros, calcule a rentabilidade mensal e descubra quanto seu dinheiro vai render no futuro.",
  keywords: [
    "calculadora juros compostos", 
    "simulador de investimentos", 
    "calcular rentabilidade", 
    "juros sobre juros", 
    "calculadora financeira", 
    "aposentadoria"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/financeiro/juros-compostos",
  },
  openGraph: {
    title: "Calculadora de Juros Compostos - Mestre das Contas",
    description: "Faça o dinheiro trabalhar para você. Simule o efeito bola de neve nos seus investimentos.",
    url: "https://mestredascontas.com.br/financeiro/juros-compostos",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ 
      url: "/og-juros.png", 
      width: 1200, 
      height: 630, 
      alt: "Simulador Juros Compostos" 
    }],
  },
  robots: { index: true, follow: true },
};

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Juros Compostos",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para cálculo de juros compostos com aportes mensais e taxa de juros personalizada.",
      "featureList": "Cálculo de montante final, juros acumulados e comparação com investimento inicial.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "aggregateRating": { 
        "@type": "AggregateRating", 
        "ratingValue": "4.9", 
        "ratingCount": "6540", 
        "bestRating": "5", 
        "worstRating": "1" 
      }
    },
    {
      "@type": "Article",
      "headline": "O Poder dos Juros Compostos: Como Ficar Rico no Longo Prazo",
      "description": "Uma aula completa sobre como funciona a matemática dos investimentos e o efeito bola de neve.",
      "author": { 
        "@type": "Organization", 
        "name": "Equipe Mestre das Contas",
        "url": "https://mestredascontas.com.br" 
      },
      "publisher": { 
        "@type": "Organization", 
        "name": "Mestre das Contas", 
        "logo": { 
          "@type": "ImageObject", 
          "url": "https://mestredascontas.com.br/icon",
          "width": 512,
          "height": 512
        } 
      },
      "datePublished": "2024-02-15",
      "dateModified": "2025-12-19", // Data atualizada
      "image": "https://mestredascontas.com.br/og-juros.png"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { 
          "@type": "Question", 
          "name": "O que são juros compostos?", 
          "acceptedAnswer": { "@type": "Answer", "text": "São juros calculados sobre o valor inicial mais os juros acumulados dos períodos anteriores. É o famoso 'juros sobre juros', que faz o dinheiro crescer exponencialmente." } 
        },
        { 
          "@type": "Question", 
          "name": "Qual a diferença para juros simples?", 
          "acceptedAnswer": { "@type": "Answer", "text": "Nos juros simples, o rendimento é calculado apenas sobre o valor principal inicial (crescimento linear). Nos compostos, o lucro é reinvestido e gera mais lucro (crescimento exponencial)." } 
        }
      ]
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function JurosCompostosPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- LAYOUT EMBED (Visual Iframe) ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-white p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-slate-400">Carregando Calculadora...</div>}>
                    <CompoundInterestCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-100 pt-3">
                    <Link href="https://mestredascontas.com.br/financeiro/juros-compostos" target="_blank" className="text-[10px] text-slate-400 hover:text-green-600 uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-1">
                        <TrendingUp size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- LAYOUT COMPLETO DA PÁGINA ---
  return (
    <article className="w-full max-w-full overflow-hidden">
      
      {/* JSON-LD Injected */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Juros Compostos"
          description="Albert Einstein chamou os juros compostos de 'a oitava maravilha do mundo'. Simule como pequenos aportes mensais podem se transformar em uma grande fortuna."
          category="Planejamento Financeiro"
          icon={<TrendingUp size={32} strokeWidth={2} />}
          variant="default" // Azul/Indigo para Finanças
          categoryColor="blue"
          badge="Atualizado 2026"
          rating={4.9}
          reviews={6540}
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Juros Compostos" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="juros_top" format="horizontal" variant="software" />
        </div>

        {/* --- FERRAMENTA --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <Suspense fallback={
            <div className="h-96 w-full bg-slate-50 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">
                Carregando ferramenta...
            </div>
          }>
              <CompoundInterestCalculator />
          </Suspense>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-4 print:hidden">
            <AdUnit slot="juros_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <TrendingUp className="text-emerald-600" size={28} />
              A Mágica do Juros sobre Juros
          </h2>
          <p className="lead text-slate-700 font-medium">
            Imagine uma bola de neve no topo de uma montanha. Quando você a empurra, ela é pequena. Mas, conforme ela rola, ela pega mais neve e cresce.
          </p>
          <p>
            Os juros compostos funcionam assim: no começo, o crescimento parece lento. Mas depois de um tempo, o dinheiro começa a gerar dinheiro por conta própria (o rendimento rende), criando um efeito exponencial.
          </p>

          {/* CARDS VISUAIS: SIMPLES VS COMPOSTO */}
          <div className="grid md:grid-cols-2 gap-6 not-prose my-10">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="font-bold text-slate-600 flex items-center gap-2 mb-3 text-lg">
                      <ArrowRight className="text-slate-400" size={20} /> Juros Simples
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      O rendimento é calculado apenas sobre o valor que você investiu inicialmente. O crescimento é uma linha reta constante.
                  </p>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 w-1/2"></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 text-right">Crescimento Linear</p>
              </div>
              
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 shadow-sm">
                  <h3 className="font-bold text-emerald-800 flex items-center gap-2 mb-3 text-lg">
                      <TrendingUp className="text-emerald-600" size={20} /> Juros Compostos
                  </h3>
                  <p className="text-sm text-emerald-800/80 leading-relaxed mb-4">
                      O rendimento é calculado sobre o valor inicial <strong>+ os juros que você já ganhou</strong>. Seu dinheiro rende sobre o lucro do mês anterior.
                  </p>
                  <div className="h-2 w-full bg-emerald-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-3/4"></div>
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 text-right font-bold">Crescimento Exponencial</p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <FileText className="text-blue-500" /> A Fórmula Matemática (Simplificada)
          </h3>
          <p>
              Para os curiosos, a fórmula básica usada pelo mercado financeiro é esta:
          </p>
          
          <div className="bg-slate-900 text-white p-6 rounded-xl my-6 font-mono text-center text-lg md:text-2xl shadow-lg not-prose tracking-wider">
              M = C × (1 + i)ᵗ
          </div>

          <ul className="space-y-3 not-prose mb-8 text-sm md:text-base bg-slate-50 p-6 rounded-xl border border-slate-100">
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 shadow-sm">M</div> <span className="text-slate-700"><strong>Montante Final</strong> (O resultado acumulado)</span></li>
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 shadow-sm">C</div> <span className="text-slate-700"><strong>Capital Inicial</strong> (O valor que você investiu)</span></li>
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 shadow-sm">i</div> <span className="text-slate-700"><strong>Taxa de Juros</strong> (ex: 0.01 para 1%)</span></li>
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 shadow-sm">t</div> <span className="text-slate-700"><strong>Tempo</strong> (Período que o dinheiro ficou rendendo)</span></li>
          </ul>

          {/* VOCÊ SABIA: TEMPO VS DINHEIRO */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100 my-12 not-prose relative overflow-hidden group shadow-lg shadow-emerald-100/50">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BarChart3 size={160} className="text-emerald-900"/>
              </div>
              
              <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2 relative z-10">
                  <BookOpen size={24} className="text-emerald-600"/> O Segredo: Comece Cedo!
              </h3>
              
              <div className="space-y-4 text-emerald-950/80 relative z-10 text-sm md:text-base leading-relaxed">
                  <p>
                      Nos juros compostos, o <strong>Tempo</strong> é muito mais poderoso que a <strong>Taxa</strong> ou o <strong>Aporte</strong>.
                  </p>
                  <p>
                      <strong>Exemplo real:</strong> Se você investir R$ 300 por mês dos 20 aos 30 anos e depois parar de investir (apenas deixando o dinheiro render), você provavelmente terá <strong>mais dinheiro</strong> na aposentadoria do que alguém que começou aos 30 e investiu R$ 300 por mês até os 60 anos!
                  </p>
                  <div className="bg-white/60 p-4 rounded-xl border border-emerald-200/50 text-xs font-medium text-emerald-800">
                      Isso acontece porque os primeiros 10 anos de juros trabalhando sozinhos criam uma base gigantesca para o futuro.
                  </div>
              </div>
          </div>

          {/* FAQ */}
          <div className="mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HelpCircle className="text-blue-600" /> Dúvidas Frequentes
            </h3>
            <div className="space-y-4">
              <details className="group bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:bg-white open:ring-1 open:ring-blue-100 transition-all">
                <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                  A poupança paga juros compostos?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                  Sim! A caderneta de poupança usa juros compostos mensais. Porém, a taxa de rendimento dela costuma ser muito baixa (frequentemente perde para a inflação), o que diminui o efeito "bola de neve" real do seu ganho.
                </p>
              </details>
              
              <details className="group bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:bg-white open:ring-1 open:ring-blue-100 transition-all">
                <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                  O que é taxa real vs taxa nominal?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                  <strong>Taxa Nominal</strong> é o número que o investimento promete (ex: 10% ao ano). <strong>Taxa Real</strong> é quanto você ganhou de verdade descontando a inflação. Se seu investimento rendeu 10% e a inflação foi 5%, seu ganho real foi de aprox. 5%.
                </p>
              </details>

              <details className="group bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:bg-white open:ring-1 open:ring-blue-100 transition-all">
                <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                  Como converter taxa mensal para anual?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                  Nos juros compostos, você não pode apenas multiplicar por 12. A fórmula é <code>(1 + taxa mensal)^12 - 1</code>. Por exemplo, 1% ao mês não é 12% ao ano, é <strong>12,68% ao ano</strong> devido ao efeito composto.
                </p>
              </details>
            </div>
          </div>

          {/* NAVEGAÇÃO FINAL (Footer do Artigo) */}
          <div className="mt-16 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-xs uppercase tracking-wider flex items-center gap-2">
               <CheckCircle2 size={16} className="text-emerald-500"/> Outras Ferramentas Úteis:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-400 hover:shadow-lg transition-all group">
                  <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-emerald-600 shadow-sm group-hover:scale-110 transition-transform"><Coins size={20}/></div>
                  <span className="font-bold text-slate-800 text-base">Salário Líquido</span>
                  <span className="text-xs text-slate-500 mt-1">Descontos do mês</span>
              </Link>
              
              <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group">
                  <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 shadow-sm group-hover:scale-110 transition-transform"><Briefcase size={20}/></div>
                  <span className="font-bold text-slate-800 text-base">Rescisão CLT</span>
                  <span className="text-xs text-slate-500 mt-1">Cálculo demissão</span>
              </Link>

              <Link href="/saude/imc" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-red-400 hover:shadow-lg transition-all group">
                  <div className="bg-red-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-red-600 shadow-sm group-hover:scale-110 transition-transform"><Calculator size={20}/></div>
                  <span className="font-bold text-slate-800 text-base">IMC Online</span>
                  <span className="text-xs text-slate-500 mt-1">Cuide da sua saúde</span>
              </Link>
            </div>
          </div>

        </div>

        {/* RODAPÉ IMPRESSÃO (Oculto na tela) */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}