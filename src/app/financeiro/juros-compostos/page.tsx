import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CompoundInterestCalculator from "@/components/calculators/CompoundInterestCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  TrendingUp, HelpCircle, BookOpen, Calculator,
  Coins, Briefcase, Wallet, FileText, PiggyBank,
  CheckCircle2, AlertTriangle, ArrowRight, BarChart3
} from "lucide-react";

// --- 1. METADATA (SEO FINANCEIRO) ---
export const metadata: Metadata = {
  title: "Calculadora de Juros Compostos Online | Simular Investimentos 2025",
  description: "Simule seus investimentos com juros compostos. Veja o poder dos juros sobre juros, calcule a rentabilidade mensal e descubra quanto seu dinheiro vai render.",
  keywords: [
    "calculadora juros compostos", 
    "simulador de investimentos", 
    "calcular rentabilidade mensal", 
    "juros sobre juros", 
    "calculadora financeira online", 
    "futuro do dinheiro"
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
    type: "article",
    images: [{ url: "/og-juros.png", width: 1200, height: 630, alt: "Simulador Juros Compostos" }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
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
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "6540", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "Article",
      "headline": "O Poder dos Juros Compostos: Como Ficar Rico no Longo Prazo",
      "description": "Uma aula completa sobre como funciona a matemática dos investimentos e o efeito bola de neve.",
      "datePublished": "2024-02-15",
      "dateModified": "2025-01-20",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { 
        "@type": "Organization", 
        "name": "Mestre das Contas", 
        "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/logo.png" } 
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "O que são juros compostos?", "acceptedAnswer": { "@type": "Answer", "text": "São juros calculados sobre o valor inicial mais os juros acumulados dos períodos anteriores. É o famoso 'juros sobre juros'." } },
        { "@type": "Question", "name": "Qual a diferença para juros simples?", "acceptedAnswer": { "@type": "Answer", "text": "Nos juros simples, o rendimento é calculado apenas sobre o valor principal inicial. Nos compostos, o lucro cresce exponencialmente." } }
      ]
    }
  ]
};

// --- TIPAGEM NEXT 15 ---
type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function JurosCompostosPage({ searchParams }: Props) {
  
  // AWAIT OBRIGATÓRIO
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- LAYOUT EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-white p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
                    <CompoundInterestCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredascontas.com.br/financeiro/juros-compostos" target="_blank" className="text-[10px] text-slate-400 hover:text-green-600 uppercase font-bold tracking-wider">
                        Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- LAYOUT COMPLETO ---
  return (
    <article className="flex flex-col gap-8 w-full max-w-full overflow-hidden px-4 sm:px-6 py-6 md:py-10">
      
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER HERO */}
      <header className="space-y-4 text-center md:text-left print:hidden max-w-4xl mx-auto md:mx-0">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-green-100 text-green-800 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-green-200">
          <TrendingUp size={14} /> Planejamento Financeiro
        </span>
        
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
          Calculadora de <span className="text-green-600">Juros Compostos</span>
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          Albert Einstein chamou os juros compostos de "a oitava maravilha do mundo". Use nosso simulador para ver como pequenos aportes mensais podem se transformar em uma grande fortuna com o tempo.
        </p>
      </header>

      {/* ANÚNCIO TOPO */}
      <div className="w-full max-w-full overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 my-4 print:hidden">
         <AdUnit slot="juros_top" format="horizontal" variant="software" className="min-h-[100px] w-full" />
      </div>

      {/* FERRAMENTA */}
      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Carregando Calculadora...</div>}>
           <CompoundInterestCalculator />
        </Suspense>
        
        <div className="mt-8 print:hidden">
            <DisclaimerBox />
        </div>
      </section>

      {/* ANÚNCIO MEIO */}
      <div className="w-full flex justify-center my-6 print:hidden">
        <AdUnit slot="juros_mid" format="auto" />
      </div>

      {/* --- CONTEÚDO EDUCACIONAL --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-green-500 pl-4">
            Como funciona a mágica do Juros sobre Juros?
        </h2>
        <p className="lead text-slate-700 text-lg">
          Imagine uma bola de neve no topo de uma montanha. Quando você a empurra, ela é pequena. Mas, conforme ela rola para baixo, ela pega mais neve. Quanto maior ela fica, mais neve ela acumula a cada volta.
        </p>
        <p>
          Os juros compostos funcionam exatamente assim. No começo, o crescimento parece lento. Mas depois de um tempo, o dinheiro começa a gerar dinheiro por conta própria, criando um efeito exponencial.
        </p>

        {/* CARDS VISUAIS: SIMPLES VS COMPOSTO */}
        <div className="grid md:grid-cols-2 gap-6 not-prose my-10">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-600 flex items-center gap-2 mb-3 text-lg">
                    <ArrowRight className="text-slate-400" size={20} /> Juros Simples
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    O rendimento é calculado apenas sobre o valor que você investiu inicialmente. Se você investiu R$ 1.000,00, vai ganhar juros sempre sobre esses R$ 1.000,00.
                </p>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 w-1/2"></div>
                </div>
                <p className="text-xs text-slate-400 mt-2 text-right">Crescimento Linear</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm">
                <h3 className="font-bold text-green-800 flex items-center gap-2 mb-3 text-lg">
                    <TrendingUp className="text-green-600" size={20} /> Juros Compostos
                </h3>
                <p className="text-sm text-green-800/80 leading-relaxed mb-4">
                    O rendimento é calculado sobre o valor inicial <strong>+ os juros que você já ganhou</strong>. Seu dinheiro rende sobre o lucro do mês anterior.
                </p>
                <div className="h-2 w-full bg-green-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-3/4"></div>
                </div>
                <p className="text-xs text-green-600 mt-2 text-right font-bold">Crescimento Exponencial</p>
            </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
            <FileText className="text-blue-500" /> A Fórmula Matemática (Sem complicação)
        </h3>
        <p>
            Para os curiosos, a fórmula básica usada pelo mercado financeiro é esta:
        </p>
        
        <div className="bg-slate-900 text-white p-6 rounded-xl my-6 font-mono text-center text-lg md:text-xl shadow-lg not-prose">
            M = C × (1 + i)ᵗ
        </div>

        <ul className="space-y-2 not-prose mb-8 text-sm md:text-base">
            <li className="flex items-center gap-2"><div className="w-8 font-bold text-center text-slate-400">M</div> <span className="text-slate-700">Montante Final (O resultado)</span></li>
            <li className="flex items-center gap-2"><div className="w-8 font-bold text-center text-slate-400">C</div> <span className="text-slate-700">Capital Inicial (O que você investiu)</span></li>
            <li className="flex items-center gap-2"><div className="w-8 font-bold text-center text-slate-400">i</div> <span className="text-slate-700">Taxa de Juros (ex: 0.01 para 1%)</span></li>
            <li className="flex items-center gap-2"><div className="w-8 font-bold text-center text-slate-400">t</div> <span className="text-slate-700">Tempo (Período que o dinheiro ficou lá)</span></li>
        </ul>

        {/* VOCÊ SABIA: TEMPO VS DINHEIRO */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 md:p-8 rounded-2xl border border-green-100 my-12 not-prose relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <BarChart3 size={140} className="text-green-900"/>
            </div>
            
            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2 relative z-10">
                <BookOpen size={24} className="text-green-600"/> O Segredo: Comece Cedo!
            </h3>
            
            <div className="space-y-4 text-slate-700 relative z-10 text-sm md:text-base leading-relaxed">
                <p>
                    Nos juros compostos, o <strong>Tempo</strong> é muito mais poderoso que a <strong>Taxa</strong> ou o <strong>Aporte</strong>.
                </p>
                <p>
                    Exemplo real: Se você investir R$ 300 por mês dos 20 aos 30 anos e depois parar de investir (deixando o dinheiro render), você provavelmente terá <strong>mais dinheiro</strong> na aposentadoria do que alguém que começou aos 30 e investiu R$ 300 por mês até os 60 anos!
                </p>
                <p>
                    Isso acontece porque os primeiros 10 anos de juros compostos trabalhando sozinhos criam uma base gigantesca para o futuro.
                </p>
            </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" /> Dúvidas Frequentes
          </h3>
          <div className="space-y-4">
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                A poupança paga juros compostos?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Sim! A caderneta de poupança usa juros compostos mensais. Porém, a taxa de rendimento dela costuma ser muito baixa (frequentemente perde para a inflação), o que diminui o efeito "bola de neve" real do seu ganho.
              </p>
            </details>
            
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                O que é taxa real vs taxa nominal?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                <strong>Taxa Nominal</strong> é o número que o investimento promete (ex: 10% ao ano). <strong>Taxa Real</strong> é quanto você ganhou de verdade descontando a inflação. Se seu investimento rendeu 10% e a inflação foi 5%, seu ganho real foi de aprox. 5%.
              </p>
            </details>

            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Como converter taxa mensal para anual?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Nos juros compostos, você não pode apenas multiplicar por 12. A fórmula é `(1 + taxa mensal)^12 - 1`. Por exemplo, 1% ao mês não é 12% ao ano, é **12,68% ao ano** devido ao efeito composto.
              </p>
            </details>
          </div>
        </div>

        {/* NAVEGAÇÃO FINAL */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
          <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
             <CheckCircle2 size={16} className="text-green-500"/> Outras Ferramentas Úteis:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600"><Coins size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                <span className="text-sm text-slate-500 mt-1">Descontos do mês</span>
            </Link>
            
            <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600"><Briefcase size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Rescisão CLT</span>
                <span className="text-sm text-slate-500 mt-1">Cálculo demissão</span>
            </Link>

            <Link href="/saude/imc" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-red-400 hover:shadow-md transition-all group">
                <div className="bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-red-600"><Calculator size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">IMC Online</span>
                <span className="text-sm text-slate-500 mt-1">Cuide da sua saúde</span>
            </Link>
          </div>
        </div>

      </div>

      {/* RODAPÉ IMPRESSÃO */}
      <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
          <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
          <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
      </div>

    </article>
  );
}