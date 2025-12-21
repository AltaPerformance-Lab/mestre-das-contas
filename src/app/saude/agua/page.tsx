import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import WaterCalculator from "@/components/calculators/WaterCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Droplet, Activity, HelpCircle, 
  CheckCircle2, BookOpen, Calculator,
  GlassWater, Zap, Brain, AlertOctagon, HeartPulse,
  Landmark, ExternalLink, Scale, Apple, Dna, AlertTriangle
} from "lucide-react";

// --- 1. METADATA DE ALTA PERFORMANCE (SEO) ---
export const metadata: Metadata = {
  title: "Calculadora de Água Diária 2026 | Meta por Peso (ml/kg)",
  description: "A regra dos 2 litros é mito. Descubra exatamente quantos litros de água beber por dia baseado no seu peso e atividade física. Tabela oficial de hidratação.",
  keywords: [
    "calculadora ingestão de agua", 
    "quantos litros de agua beber por dia", 
    "tabela agua por peso", 
    "calculo 35ml por kg", 
    "importancia hidratação", 
    "beber agua emagrece"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/saude/agua" },
  openGraph: {
    title: "Calculadora de Hidratação Personalizada - Mestre das Contas",
    description: "Você bebe água suficiente? Faça o cálculo agora e evite problemas renais.",
    url: "https://mestredascontas.com.br/saude/agua",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "https://mestredascontas.com.br/og-agua.png", width: 1200, height: 630, alt: "Calculadora de Água" }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// --- LISTA FAQ (DRY Content) ---
const faqList = [
    { q: "A regra dos 2 litros vale para todos?", a: "Não. Essa é uma média antiga. Uma pessoa de 50kg tem necessidades muito diferentes de uma de 100kg. O cálculo ideal é baseado no peso corporal (entre 35ml e 50ml por kg)." },
    { q: "Café, chá e suco contam como água?", a: "Parcialmente. Eles ajudam na ingestão de líquidos, mas não substituem a água pura. Bebidas com cafeína (café/chá) podem ter efeito diurético, e sucos/refrigerantes contêm açúcar e calorias extras." },
    { q: "Beber água demais faz mal?", a: "Sim, existe a hiponatremia (intoxicação por água), que ocorre quando se bebe uma quantidade exagerada em curto período, diluindo o sódio no sangue. Mas é raro acontecer com o consumo distribuído ao longo do dia." },
    { q: "Água ajuda a emagrecer?", a: "Sim! Beber água aumenta temporariamente o metabolismo e, se bebida antes das refeições, promove saciedade, ajudando a comer menos." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Ingestão de Água",
      "applicationCategory": "HealthApplication", // Categoria específica para saúde
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para calcular a meta diária de água baseada no peso e atividade física.",
      "aggregateRating": { 
        "@type": "AggregateRating", 
        "ratingValue": "4.8", 
        "ratingCount": "6210", 
        "bestRating": "5", 
        "worstRating": "1" 
      }
    },
    {
      "@type": "Article",
      "headline": "Hidratação Inteligente: Por que 35ml/kg é a regra de ouro?",
      "description": "Entenda a ciência da hidratação, os benefícios para o cérebro e rins, e como calcular sua meta.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-02-10",
      "dateModified": new Date().toISOString()
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

export default async function AguaPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-cyan-50/30 p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center animate-pulse text-cyan-400">Carregando Calculadora...</div>}>
                    <WaterCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-cyan-200 pt-3">
                    <Link href="https://mestredascontas.com.br/saude/agua" target="_blank" className="text-[10px] text-cyan-500 hover:text-cyan-700 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Droplet size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- PÁGINA COMPLETA ---
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Água Diária"
          description="Você bebe água suficiente? Use a regra dos 35ml/kg e descubra sua meta diária personalizada de hidratação para ter mais energia e saúde."
          category="Saúde & Bem-Estar"
          icon={<GlassWater size={32} strokeWidth={2} />}
          variant="health" // Define o tema visual (Rose/Cyan)
          categoryColor="cyan"
          badge="Cálculo Nutricional"
          rating={4.8}
          reviews={6210}
          breadcrumbs={[
            { label: "Saúde", href: "/saude" },
            { label: "Hidratação" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO (FIX CLS) */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-cyan-50/30 rounded-lg border border-dashed border-cyan-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="agua_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA PRINCIPAL */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white rounded-3xl border border-cyan-100 shadow-xl shadow-cyan-100/50 p-1 md:p-2">
              <Suspense fallback={
                <div className="h-96 w-full bg-cyan-50 rounded-2xl animate-pulse flex items-center justify-center text-cyan-300 border border-cyan-100">
                    <div className="flex flex-col items-center gap-2">
                        <Droplet className="animate-bounce" size={32}/>
                        <span>Carregando Calculadora...</span>
                    </div>
                </div>
              }>
                  <WaterCalculator />
              </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <AdUnit slot="agua_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-cyan-500 pl-4">
              A Água: O Combustível do Seu Corpo
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            Você não é feito de aço, é feito de água. Cerca de <strong>60% a 70%</strong> do seu corpo é líquido. Cada célula, tecido e órgão precisa de água para funcionar corretamente.
          </p>
          <p>
            A desidratação leve (apenas 1% ou 2% de perda de fluido corporal) já pode causar fadiga, perda de concentração e dores de cabeça. Mas como saber a medida certa?
          </p>

          {/* DESTAQUE VISUAL (MITO 2 LITROS) */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white my-10 relative overflow-hidden shadow-lg not-prose">
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
                      A ciência moderna utiliza a fórmula de <strong>35ml por kg de peso</strong>. Uma pessoa de 50kg precisa de muito menos água do que uma de 100kg. Personalização é a chave para a saúde.
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-12 mb-6 flex items-center gap-2">
              <Zap className="text-orange-500" /> Atividade Física e Clima
          </h3>
          <p>
              A regra de 35ml/kg é para um dia normal. Se você se exercita ou mora em um lugar muito quente, a necessidade aumenta:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-cyan-500 text-sm md:text-base">
              <li><strong>Leve (Caminhada):</strong> Aumente para 40ml/kg.</li>
              <li><strong>Moderado (Academia):</strong> Aumente para 45ml/kg.</li>
              <li><strong>Intenso (Crossfit/Corrida):</strong> Aumente para 50ml/kg.</li>
          </ul>

          {/* TABELA HTML PURA (RESPONSIVA) */}
          <div className="not-prose my-10 border rounded-xl overflow-hidden border-slate-200 shadow-sm bg-white">
              <div className="bg-slate-100 p-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Tabela de Referência (Sedentário)</h4>
                  <span className="text-xs text-slate-500 font-medium">Base: 35ml/kg</span>
              </div>
              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse min-w-[300px]">
                      <thead className="bg-slate-50 text-slate-600 text-xs">
                          <tr>
                              <th className="px-6 py-3 font-bold border-b border-slate-200">Peso</th>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 text-center">Meta (Litros)</th>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 text-center hidden sm:table-cell">Copos (250ml)</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3 font-medium text-slate-900">50 kg</td>
                              <td className="px-6 py-3 text-center font-bold text-cyan-600">1,75 L</td>
                              <td className="px-6 py-3 text-center text-slate-500 hidden sm:table-cell">~ 7</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3 font-medium text-slate-900">60 kg</td>
                              <td className="px-6 py-3 text-center font-bold text-cyan-600">2,10 L</td>
                              <td className="px-6 py-3 text-center text-slate-500 hidden sm:table-cell">~ 8</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3 font-medium text-slate-900">70 kg</td>
                              <td className="px-6 py-3 text-center font-bold text-cyan-600">2,45 L</td>
                              <td className="px-6 py-3 text-center text-slate-500 hidden sm:table-cell">~ 10</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3 font-medium text-slate-900">80 kg</td>
                              <td className="px-6 py-3 text-center font-bold text-cyan-600">2,80 L</td>
                              <td className="px-6 py-3 text-center text-slate-500 hidden sm:table-cell">~ 11</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3 font-medium text-slate-900">90 kg</td>
                              <td className="px-6 py-3 text-center font-bold text-cyan-600">3,15 L</td>
                              <td className="px-6 py-3 text-center text-slate-500 hidden sm:table-cell">~ 13</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3 font-medium text-slate-900">100 kg</td>
                              <td className="px-6 py-3 text-center font-bold text-cyan-600">3,50 L</td>
                              <td className="px-6 py-3 text-center text-slate-500 hidden sm:table-cell">~ 14</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <Activity className="text-blue-600" /> Sinais que seu corpo pede água
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 not-prose mb-10">
              <div className="bg-red-50 p-5 rounded-xl border border-red-100 shadow-sm">
                  <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2"><AlertTriangle size={20}/> Você já está desidratado se:</h4>
                  <ul className="text-sm text-red-700 space-y-2">
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"/> Sente sede (a sede é um sinal tardio).</li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"/> Sua urina está amarela escura.</li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"/> Tem boca seca ou lábios rachados.</li>
                  </ul>
              </div>
              
              <div className="bg-cyan-50 p-5 rounded-xl border border-cyan-100 shadow-sm">
                  <h4 className="font-bold text-cyan-800 mb-3 flex items-center gap-2"><CheckCircle2 size={20}/> Benefícios da Meta Batida:</h4>
                  <ul className="text-sm text-cyan-700 space-y-2">
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0"/> Pele mais elástica e jovem.</li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0"/> Intestino funcionando bem.</li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0"/> Menos inchaço e retenção.</li>
                  </ul>
              </div>
          </div>

          {/* FAQ ACORDION */}
          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b pb-4">
                <HelpCircle className="text-cyan-600" /> Dúvidas Frequentes
            </h3>
            
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-cyan-100 transition-all">
                      <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-cyan-500 font-bold text-xs mt-1">#</span>
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

          {/* REFERÊNCIAS OFICIAIS */}
          <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose bg-slate-50 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Fontes de Saúde
              </h3>
              <p className="text-xs text-slate-500 mb-3">Conteúdo baseado em diretrizes internacionais:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600">
                  <a href="https://www.sbn.org.br/publico/dicas-de-saude-renal/" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                      Sociedade Brasileira de Nefrologia <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                      Mayo Clinic (Nutrition) <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          {/* NAVEGAÇÃO FINAL */}
          <div className="mt-16 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <CheckCircle2 size={16} className="text-emerald-500"/> Cuide da sua saúde:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/saude/imc" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-rose-400 hover:shadow-lg transition-all group">
                  <div className="bg-rose-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-rose-600 shadow-sm group-hover:scale-110 transition-transform"><Scale size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">IMC Online</span>
                  <span className="text-sm text-slate-500 mt-1">Peso ideal</span>
              </Link>
              <Link href="/saude/calorias-diarias" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-orange-400 hover:shadow-lg transition-all group">
                  <div className="bg-orange-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-orange-600 shadow-sm group-hover:scale-110 transition-transform"><Apple size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Calorias (TMB)</span>
                  <span className="text-sm text-slate-500 mt-1">Meta para dieta</span>
              </Link>
              <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all group">
                  <div className="bg-green-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600 shadow-sm group-hover:scale-110 transition-transform"><Calculator size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                  <span className="text-sm text-slate-500 mt-1">Planejamento</span>
              </Link>
            </div>
          </div>

        </div>

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <AdUnit slot="agua_bottom" format="horizontal" variant="software" />
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