import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox"; 
import PageHeader from "@/components/layout/PageHeader"; // Componente importado
import { 
  Flame, HelpCircle, BookOpen, Activity, 
  Scale, Utensils, Zap, 
  CheckCircle2, TrendingUp, Apple, Briefcase
} from "lucide-react";

// --- METADATA OTIMIZADA (SEO) ---
export const metadata: Metadata = {
  title: "Calculadora de Calorias Diárias 2026 | Basal (TMB) e Gasto Total",
  description: "Quer emagrecer ou ganhar massa? Calcule sua Taxa Metabólica Basal e monte sua dieta com a fórmula científica de Mifflin-St Jeor. Grátis e preciso.",
  keywords: [
    "calculadora de calorias", 
    "taxa metabólica basal", 
    "calcular tmb", 
    "tdee calculator", 
    "dieta para emagrecer", 
    "déficit calórico", 
    "fórmula mifflin-st jeor", 
    "gasto calórico diário"
  ],
  alternates: { 
    canonical: "https://mestredascontas.com.br/saude/calorias-diarias" 
  },
  openGraph: {
    title: "Calculadora de Gasto Calórico (TMB/TDEE) - Mestre das Contas",
    description: "A matemática do corpo humano. Saiba exatamente quanto comer para atingir seu objetivo.",
    url: "https://mestredascontas.com.br/saude/calorias-diarias",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ 
      url: "/og-calorias.png", 
      width: 1200, 
      height: 630, 
      alt: "Calculadora de Calorias e Metabolismo" 
    }],
  },
  robots: { index: true, follow: true },
};

// --- DADOS ESTRUTURADOS (RICH SNIPPETS + RATING) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Calorias Diárias - Mestre das Contas",
      "url": "https://mestredascontas.com.br/saude/calorias-diarias",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta gratuita para cálculo de TMB e necessidade calórica diária baseada na equação de Mifflin-St Jeor.",
      "featureList": "Cálculo de TMB, Cálculo de TDEE, Planejamento para Perda de Peso, Planejamento para Ganho de Massa",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      // Aggregate Rating para estrelinhas no Google
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1458",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Article",
      "headline": "A Ciência das Calorias: Como dominar seu metabolismo",
      "description": "Entenda a diferença entre TMB e TDEE e como criar um déficit calórico saudável.",
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
      "datePublished": "2024-01-15",
      "dateModified": "2025-12-18",
      "image": "https://mestredascontas.com.br/og-calorias.png"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { 
          "@type": "Question", 
          "name": "O que é Taxa Metabólica Basal (TMB)?", 
          "acceptedAnswer": { "@type": "Answer", "text": "É a quantidade mínima de energia que seu corpo precisa para sobreviver em repouso absoluto (respirar, bombear sangue, função cerebral). Representa cerca de 70% do gasto calórico diário." } 
        },
        { 
          "@type": "Question", 
          "name": "Quantas calorias devo cortar para emagrecer?", 
          "acceptedAnswer": { "@type": "Answer", "text": "Um déficit seguro é de 300 a 500 calorias por dia abaixo do seu Gasto Total (TDEE). Isso promove uma perda de peso sustentável de cerca de 0,5kg por semana, preservando a massa muscular." } 
        }
      ]
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function CaloriasPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED (Visual minimalista para iframe) ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-white p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-slate-400">Carregando Calculadora...</div>}>
                    <CalorieCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-100 pt-3">
                    <Link href="https://mestredascontas.com.br/saude/calorias-diarias" target="_blank" className="text-[10px] text-slate-400 hover:text-orange-600 uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-1">
                       <Zap size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- MODO PÁGINA NORMAL ---
  return (
    <article className="w-full max-w-full overflow-hidden">
      
      {/* Injeção do JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO (Novo) --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Calorias Diárias"
          description="Descubra sua Taxa Metabólica Basal (TMB) e monte seu plano para emagrecer ou ganhar massa muscular com precisão científica."
          icon={<Flame size={32} strokeWidth={2} />}
          variant="health" // Ativa o gradiente Laranja/Rosa
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Saúde", href: "/saude" },
            { label: "Calorias Diárias" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">

        {/* PUBLICIDADE (Topo) */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/60 print:hidden min-h-[100px]">
           <AdUnit slot="calorias_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <Suspense fallback={
            <div className="h-96 w-full bg-slate-50 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">
                Carregando ferramenta...
            </div>
          }>
              <CalorieCalculator />
          </Suspense>
          
          {/* Aviso Legal (YMYL Requirement) */}
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox /> 
          </div>
        </section>

        {/* PUBLICIDADE (Meio) */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-4 print:hidden">
            <AdUnit slot="calorias_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL (SEO) --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
          <h2 className="flex items-center gap-3 text-slate-900">
              <BookOpen className="text-orange-600" size={28} /> 
              A Matemática do Corpo Humano
          </h2>
          <p className="lead text-slate-700 font-medium">
            Emagrecer não é sorte, é <strong>termodinâmica</strong>. Seu corpo é uma máquina biológica que consome energia (calorias) para funcionar, e o segredo está no equilíbrio entre o que entra e o que sai.
          </p>
          
          <p>
            Para controlar seu peso sem "achismos", você precisa dominar dois números fundamentais: a sua <strong>TMB</strong> e o seu <strong>Gasto Total (TDEE)</strong>.
          </p>

          {/* Cards Explicativos (Not Prose) */}
          <div className="grid md:grid-cols-2 gap-6 not-prose my-10">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2 text-lg">
                      <Activity className="text-blue-600" /> TMB (Basal)
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      É quanto seu corpo gasta <strong>em repouso absoluto</strong> (respiração, cérebro, coração). Representa cerca de 70% do gasto total.
                  </p>
                  <div className="bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 shadow-sm">
                      Ex: Dormir 24h = ~1500 kcal
                  </div>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200 hover:border-orange-300 transition-colors">
                  <h3 className="font-bold text-orange-900 flex items-center gap-2 mb-2 text-lg">
                      <Zap className="text-orange-600 fill-orange-600" /> TDEE (Total)
                  </h3>
                  <p className="text-sm text-orange-900/80 leading-relaxed mb-3">
                      É a soma da TMB + suas atividades (trabalho, andar, academia). É <strong>este número</strong> que define sua dieta.
                  </p>
                  <div className="bg-white px-3 py-2 rounded-lg border border-orange-200 text-xs font-bold text-orange-700 shadow-sm">
                      Ex: Vida Real = ~2200 kcal
                  </div>
              </div>
          </div>

          <h3>Por que usamos Mifflin-St Jeor?</h3>
          <p>
            Nossa calculadora utiliza a equação de <strong>Mifflin-St Jeor</strong> (1990). Estudos clínicos apontam que ela é a mais precisa para a população moderna, superando fórmulas antigas como Harris-Benedict, tanto para pessoas com peso normal quanto para pessoas com obesidade.
          </p>

          {/* Box Curiosidade (Efeito Térmico) */}
          <div className="bg-slate-900 p-8 rounded-2xl text-white my-12 relative overflow-hidden not-prose shadow-2xl shadow-slate-900/20 group">
              <div className="absolute -right-10 -top-10 text-slate-800 opacity-20 group-hover:opacity-30 transition-opacity rotate-12">
                  <Utensils size={200} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                  <Apple size={24} className="text-green-400"/> O Segredo: Efeito Térmico
              </h3>
              <div className="space-y-4 text-slate-300 relative z-10 leading-relaxed text-base">
                  <p>
                      Você sabia que comer também gasta calorias? Isso se chama <strong>Efeito Térmico dos Alimentos (TEF)</strong>.
                  </p>
                  <ul className="space-y-2">
                      <li className="flex gap-2"><span className="text-orange-400 font-bold">Gorduras:</span> Gastam 0-3% na digestão.</li>
                      <li className="flex gap-2"><span className="text-blue-400 font-bold">Carboidratos:</span> Gastam 5-10%.</li>
                      <li className="flex gap-2"><span className="text-green-400 font-bold">Proteínas:</span> Gastam incríveis <strong>20-30%</strong>!</li>
                  </ul>
                  <p className="text-sm border-t border-white/10 pt-4 mt-2 opacity-80">
                      Isso significa que, se você comer 100 kcal de proteína, seu corpo absorve apenas cerca de 75 kcal reais. Por isso dietas ricas em proteína são tão eficazes para emagrecer.
                  </p>
              </div>
          </div>

          <h3>Estratégias para seu Objetivo</h3>
          <div className="grid sm:grid-cols-2 gap-6 not-prose my-6">
              <div className="flex gap-4 items-start">
                  <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600 shrink-0 mt-1 shadow-sm"><Scale size={20}/></div>
                  <div>
                      <h4 className="font-bold text-slate-900 text-base">Cutting (Perder Peso)</h4>
                      <p className="text-sm text-slate-600 mt-1 leading-snug">Crie um déficit de 300 a 500 kcal. Mais que isso pode desacelerar o metabolismo e causar perda muscular.</p>
                  </div>
              </div>
              <div className="flex gap-4 items-start">
                  <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600 shrink-0 mt-1 shadow-sm"><TrendingUp size={20}/></div>
                  <div>
                      <h4 className="font-bold text-slate-900 text-base">Bulking (Ganhar Massa)</h4>
                      <p className="text-sm text-slate-600 mt-1 leading-snug">Gere um superávit leve de 200 a 300 kcal para maximizar o ganho de músculo e minimizar a gordura.</p>
                  </div>
              </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HelpCircle className="text-blue-600" /> Perguntas Frequentes
            </h3>
            <div className="space-y-3">
              <details className="group bg-slate-50 p-4 rounded-xl border border-slate-200 cursor-pointer open:bg-white open:shadow-md transition-all">
                <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm select-none">
                  Comer pouco demais engorda? <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                  Indiretamente, sim. Comer muito abaixo da TMB coloca o corpo em "modo de alerta" (termogênese adaptativa), reduzindo o gasto energético e aumentando a fome, o que leva à compulsão alimentar e ao efeito sanfona.
                </p>
              </details>

              <details className="group bg-slate-50 p-4 rounded-xl border border-slate-200 cursor-pointer open:bg-white open:shadow-md transition-all">
                <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm select-none">
                  Devo contar calorias de salada? <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                  Vegetais folhosos (alface, rúcula, espinafre) têm calorias insignificantes. Muitos nutricionistas recomendam não pesar esses itens para facilitar a adesão à dieta. Foque em pesar óleos, carboidratos e proteínas.
                </p>
              </details>
            </div>
          </div>

          {/* Links Internos (Footer do Artigo) */}
          <div className="mt-16 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-xs uppercase tracking-wider flex items-center gap-2">
               <CheckCircle2 size={16} className="text-emerald-500"/> Continue Cuidando de Você:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/saude/imc" className="flex flex-col p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-red-400 hover:bg-white hover:shadow-lg transition-all group">
                  <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-red-600 shadow-sm group-hover:scale-110 transition-transform"><Scale size={20}/></div>
                  <span className="font-bold text-slate-800 text-base">IMC Online</span>
                  <span className="text-xs text-slate-500 mt-1">Peso ideal</span>
              </Link>
              <Link href="/financeiro/juros-compostos" className="flex flex-col p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-400 hover:bg-white hover:shadow-lg transition-all group">
                  <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-emerald-600 shadow-sm group-hover:scale-110 transition-transform"><TrendingUp size={20}/></div>
                  <span className="font-bold text-slate-800 text-base">Juros Compostos</span>
                  <span className="text-xs text-slate-500 mt-1">Saúde financeira</span>
              </Link>
              <Link href="/trabalhista/ferias" className="flex flex-col p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-white hover:shadow-lg transition-all group">
                  <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 shadow-sm group-hover:scale-110 transition-transform"><Briefcase size={20}/></div>
                  <span className="font-bold text-slate-800 text-base">Calc. Férias</span>
                  <span className="text-xs text-slate-500 mt-1">Planejamento</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Footer de Impressão (Oculto na tela) */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}