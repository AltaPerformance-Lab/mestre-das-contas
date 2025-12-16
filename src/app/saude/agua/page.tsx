import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import WaterCalculator from "@/components/calculators/WaterCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  Droplet, CheckCircle2, AlertTriangle, Zap, 
  HelpCircle, BookOpen, Activity, Dna, GlassWater, ExternalLink, 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Calculadora de Água Diária 2025 | Quantos litros beber?",
  description: "A regra dos 2 litros é mito. Calcule a quantidade exata de água que seu corpo precisa baseada no seu peso e nível de atividade física.",
  keywords: ["calculadora de agua", "quantos litros de agua por dia", "beber agua emagrece", "meta de hidratação", "calculo agua peso", "tabela ingestão agua"],
  alternates: { canonical: "https://mestredascontas.com.br/saude/agua" },
  openGraph: {
    title: "Calculadora de Hidratação Personalizada",
    description: "Descubra sua meta diária de água. Melhore sua pele, rim e metabolismo.",
    url: "https://mestredascontas.com.br/saude/agua",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-agua.png", width: 1200, height: 630, alt: "Calculadora de Água" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Ingestão de Água",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para cálculo de necessidade hídrica diária baseada em peso e atividade."
    },
    {
      "@type": "Article",
      "headline": "O Poder da Água: Por que você está bebendo errado",
      "description": "Entenda a ciência da hidratação, os sinais de sede e como a água afeta sua performance cognitiva.",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Café e chá contam como água?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, mas com ressalvas. Bebidas com cafeína têm efeito diurético leve. O ideal é que a maior parte da ingestão venha da água pura." } },
        { "@type": "Question", "name": "Beber água emagrece?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. A água aumenta o metabolismo temporariamente (termogênese) e, se bebido antes das refeições, aumenta a saciedade." } }
      ]
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function AguaPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-cyan-50/30 p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center text-cyan-400">Carregando...</div>}>
                    <WaterCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredascontas.com.br/saude/agua" target="_blank" className="text-[10px] text-cyan-400 hover:text-cyan-600 uppercase font-bold tracking-wider">
                        Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  return (
    <article className="flex flex-col gap-8 w-full max-w-full overflow-hidden px-4 sm:px-6 py-6 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="space-y-4 text-center md:text-left print:hidden max-w-4xl mx-auto md:mx-0">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-cyan-100 text-cyan-800 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-cyan-200">
          <Droplet size={14} /> Hidratação Inteligente
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
          Calculadora de <span className="text-cyan-600">Água Diária</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          A regra dos "2 litros" é um mito ultrapassado. A quantidade ideal depende do seu peso e rotina. Calcule agora sua meta personalizada e sinta a diferença na pele e na energia.
        </p>
      </header>

      <div className="w-full flex justify-center bg-cyan-50/30 rounded-lg border border-dashed border-cyan-200/50 my-4 print:hidden">
         <AdUnit slot="agua_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-cyan-50 rounded-xl animate-pulse flex items-center justify-center text-cyan-300">Carregando Calculadora...</div>}>
           <WaterCalculator />
        </Suspense>
        <div className="mt-8 print:hidden"><DisclaimerBox /></div>
      </section>

      <div className="w-full flex justify-center my-6 print:hidden"><AdUnit slot="agua_mid" format="auto" /></div>

      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-cyan-400 pl-4">
            A Água: O Combustível do Seu Corpo
        </h2>
        <p className="lead text-slate-700 text-lg">
          Você não é feito de aço, é feito de água. Cerca de <strong>60% a 70%</strong> do seu corpo é líquido. Cada célula, tecido e órgão precisa de água para funcionar corretamente.
        </p>
        <p>
          A desidratação leve (apenas 1% ou 2% de perda de fluido corporal) já pode causar fadiga, perda de concentração e dores de cabeça.
        </p>

        {/* CURIOSIDADE */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white my-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
                <Dna size={150} className="text-white"/>
            </div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                <GlassWater size={24} className="text-cyan-400"/> O Mito dos 2 Litros
            </h3>
            <div className="space-y-4 text-slate-300 relative z-10 leading-relaxed text-base md:text-lg">
                <p>
                    Você provavelmente cresceu ouvindo que deve beber 8 copos (2 litros) de água por dia. Essa recomendação surgiu em 1945 e desconsiderava o peso e a alimentação.
                </p>
                <p>
                    A ciência moderna utiliza a fórmula de <strong>35ml por kg de peso</strong>. Uma pessoa de 50kg precisa de muito menos água do que uma de 100kg. Personalização é a chave.
                </p>
            </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
            <Activity className="text-blue-600" /> Sinais que seu corpo pede água
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 not-prose mb-10">
            <div className="bg-red-50 p-5 rounded-xl border border-red-100 shadow-sm">
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2"><AlertTriangle size={20}/> Você já está desidratado se:</h4>
                <ul className="text-sm text-red-700 space-y-2">
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"/> Sente sede (a sede é um sinal tardio de alerta).</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"/> Sua urina está amarela escura e com cheiro forte.</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"/> Tem boca seca ou lábios rachados.</li>
                </ul>
            </div>
            
            <div className="bg-cyan-50 p-5 rounded-xl border border-cyan-100 shadow-sm">
                <h4 className="font-bold text-cyan-800 mb-3 flex items-center gap-2"><CheckCircle2 size={20}/> Benefícios da Meta Batida:</h4>
                <ul className="text-sm text-cyan-700 space-y-2">
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5"/> Pele mais elástica, brilhante e jovem.</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5"/> Intestino funcionando como um relógio.</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5"/> Menos inchaço e retenção de líquidos.</li>
                </ul>
            </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="text-cyan-600" /> Perguntas Frequentes
          </h3>
          <div className="space-y-4">
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-cyan-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Beber água demais faz mal?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Sim, existe a <strong>hiponatremia</strong> (intoxicação por água), que ocorre quando se bebe uma quantidade exagerada em curto tempo, diluindo o sódio do sangue. Mas é raro em pessoas saudáveis; geralmente ocorre em maratonistas que bebem litros sem repor eletrólitos.
              </p>
            </details>
            
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-cyan-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Água com gás conta?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Sim! A água com gás hidrata tanto quanto a natural. A única ressalva é para quem tem gastrite ou problemas estomacais, pois o gás pode causar desconforto. Evite as versões com sabor artificial e açúcar.
              </p>
            </details>
          </div>
        </div>

      </div>
    </article>
  );
}