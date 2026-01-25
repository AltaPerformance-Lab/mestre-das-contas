import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox"; 
import PageHeader from "@/components/layout/PageHeader";
import { 
  Flame, HelpCircle, BookOpen, Activity, 
  Scale, Utensils, Zap, 
  CheckCircle2, TrendingUp, Apple, Briefcase,
  Dna, AlertTriangle, ArrowRight
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import RelatedTools from "@/components/layout/RelatedTools";

// --- 1. METADATA OTIMIZADA (SEO 2026) ---
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
    type: "article",
    images: [{ 
      url: "https://mestredascontas.com.br/opengraph-image", 
      width: 1200, 
      height: 630, 
      alt: "Calculadora de Calorias e Metabolismo" 
    }],
  },
  robots: { index: true, follow: true },
};

// --- LISTA FAQ (DRY Content) ---
const faqList = [
    { q: "O que é Taxa Metabólica Basal (TMB)?", a: "É a quantidade mínima de energia que seu corpo precisa para sobreviver em repouso absoluto (respirar, bombear sangue, função cerebral). Representa cerca de 70% do gasto calórico diário." },
    { q: "Quantas calorias devo cortar para emagrecer?", a: "Um déficit seguro é de 300 a 500 calorias por dia abaixo do seu Gasto Total (TDEE). Isso promove uma perda de peso sustentável de cerca de 0,5kg por semana, preservando a massa muscular." },
    { q: "Comer à noite engorda mais?", a: "Não necessariamente. O que engorda é o saldo total de calorias no final do dia. Porém, comer muito antes de dormir pode atrapalhar o sono e a digestão." },
    { q: "Qual a melhor fórmula de cálculo?", a: "Atualmente, a equação de Mifflin-St Jeor é considerada a mais precisa para a população moderna, superando a antiga Harris-Benedict." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Calorias Diárias",
      "url": "https://mestredascontas.com.br/saude/calorias-diarias",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta gratuita para cálculo de TMB e necessidade calórica diária baseada na equação de Mifflin-St Jeor.",
      "featureList": "Cálculo de TMB, Cálculo de TDEE, Planejamento para Perda de Peso, Planejamento para Ganho de Massa",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
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
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-01-15",
      "dateModified": new Date().toISOString(),
      "image": "https://mestredascontas.com.br/opengraph-image"
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

export default async function CaloriasPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-orange-50/30 p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center animate-pulse text-orange-400">Carregando Calculadora...</div>}>
                    <CalorieCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-orange-200 pt-3">
                    <Link href="https://mestredascontas.com.br/saude/calorias-diarias" target="_blank" className="text-[10px] text-orange-500 hover:text-orange-700 uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-1">
                       <Zap size={10} /> Powered by Mestre das Contas
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
          title="Calculadora de Calorias Diárias"
          description="Descubra sua Taxa Metabólica Basal (TMB) e monte seu plano para emagrecer ou ganhar massa muscular com precisão científica."
          icon={<Flame size={32} strokeWidth={2} />}
          category="Saúde & Performance"
          variant="health" // Laranja/Rosa
          categoryColor="orange"
          badge="Método Mifflin-St Jeor"
          rating={4.9}
          reviews={1458}
          breadcrumbs={[
            { label: "Saúde", href: "/saude" },
            { label: "Calorias Diárias" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-orange-50/30 dark:bg-slate-900/50 rounded-lg border border-dashed border-orange-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="calorias_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-orange-100 dark:border-slate-800 shadow-xl shadow-orange-100/50 dark:shadow-none p-1 md:p-2">
              <Suspense fallback={
                <div className="h-96 w-full bg-orange-50 dark:bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center text-orange-300 dark:text-slate-600 border border-orange-100 dark:border-slate-800">
                    <div className="flex flex-col items-center gap-2">
                        <Flame className="animate-bounce" size={32}/>
                        <span>Carregando ferramenta...</span>
                    </div>
                </div>
              }>
                  <PrivacyBadge />
                  <CalorieCalculator />
              </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox /> 
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-4 print:hidden">
            <LazyAdUnit slot="calorias_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="flex items-center gap-3 text-slate-900 dark:text-slate-100 border-l-4 border-orange-500 pl-4 mb-6">
              A Matemática do Corpo Humano
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 font-medium text-lg">
            Emagrecer não é sorte, é <strong>termodinâmica</strong>. Seu corpo é uma máquina biológica que consome energia (calorias) para funcionar, e o segredo está no equilíbrio entre o que entra e o que sai.
          </p>
          
          <p>
            Para controlar seu peso sem "achismos", você precisa dominar dois números fundamentais: a sua <strong>TMB</strong> e o seu <strong>Gasto Total (TDEE)</strong>.
          </p>

          {/* CARDS TMB vs TDEE */}
          <div className="grid md:grid-cols-2 gap-6 not-prose my-10">
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-2 text-lg">
                      <Activity className="text-blue-600 dark:text-blue-400" /> TMB (Basal)
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      É quanto seu corpo gasta <strong>em repouso absoluto</strong> (respiração, cérebro, coração). Representa cerca de 70% do gasto total.
                  </p>
                  <div className="bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500 dark:text-slate-400 shadow-sm">
                      Ex: Dormir 24h = ~1500 kcal
                  </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-200 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
                  <h3 className="font-bold text-orange-900 dark:text-orange-300 flex items-center gap-2 mb-2 text-lg">
                      <Zap className="text-orange-600 fill-orange-600 dark:text-orange-500 dark:fill-orange-500" /> TDEE (Total)
                  </h3>
                  <p className="text-sm text-orange-900/80 dark:text-orange-300/80 leading-relaxed mb-3">
                      É a soma da TMB + suas atividades (trabalho, andar, academia). É <strong>este número</strong> que define sua dieta.
                  </p>
                  <div className="bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-800 text-xs font-bold text-orange-700 dark:text-orange-400 shadow-sm">
                      Ex: Vida Real = ~2200 kcal
                  </div>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
             <Dna className="text-purple-500" /> Por que usamos Mifflin-St Jeor?
          </h3>
            <p className="text-slate-700 dark:text-slate-300">
            Nossa calculadora utiliza a equação de <strong>Mifflin-St Jeor</strong> (1990). Estudos clínicos apontam que ela é a mais precisa para a população moderna, superando fórmulas antigas como Harris-Benedict, tanto para pessoas com peso normal quanto para pessoas com obesidade.
          </p>

          {/* TABELA DE FATOR DE ATIVIDADE (HTML PURO) */}
          <div className="not-prose my-10 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Fator de Atividade (Multiplicador)</h4>
              </div>
              
              {/* DESKTOP TABLE */}
              <div className="hidden md:block">
                  <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs">
                          <tr>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Nível</th>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Descrição</th>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Fator</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-3 font-medium text-slate-900 dark:text-slate-100">Sedentário</td>
                              <td className="px-6 py-3 text-slate-600 dark:text-slate-400">Trabalho de escritório, pouco ou nenhum exercício.</td>
                              <td className="px-6 py-3 font-bold text-orange-600 dark:text-orange-400">x 1.2</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-3 font-medium text-slate-900 dark:text-slate-100">Leve</td>
                              <td className="px-6 py-3 text-slate-600 dark:text-slate-400">Exercício leve 1-3 dias/semana.</td>
                              <td className="px-6 py-3 font-bold text-orange-600 dark:text-orange-400">x 1.375</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-3 font-medium text-slate-900 dark:text-slate-100">Moderado</td>
                              <td className="px-6 py-3 text-slate-600 dark:text-slate-400">Exercício moderado 3-5 dias/semana.</td>
                              <td className="px-6 py-3 font-bold text-orange-600 dark:text-orange-400">x 1.55</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-3 font-medium text-slate-900 dark:text-slate-100">Intenso</td>
                              <td className="px-6 py-3 text-slate-600 dark:text-slate-400">Exercício pesado 6-7 dias/semana.</td>
                              <td className="px-6 py-3 font-bold text-orange-600 dark:text-orange-400">x 1.725</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              {/* MOBILE CARDS */}
              <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                        { nivel: "Sedentário", desc: "Escritório / Sem treino", fator: "x 1.2" },
                        { nivel: "Leve", desc: "Treino 1-3x semana", fator: "x 1.375" },
                        { nivel: "Moderado", desc: "Treino 3-5x semana", fator: "x 1.55" },
                        { nivel: "Intenso", desc: "Treino 6-7x semana", fator: "x 1.725" },
                  ].map((item, idx) => (
                      <div key={idx} className="p-4 flex justify-between items-center bg-white dark:bg-slate-900">
                          <div>
                              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block">{item.nivel}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">{item.desc}</span>
                          </div>
                          <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 font-bold px-3 py-1 rounded-lg text-sm">
                              {item.fator}
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* BOX CURIOSIDADE (EFEITO TÉRMICO) */}
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

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
             <Briefcase className="text-blue-500" /> Estratégias para seu Objetivo
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 not-prose mb-10">
              <div className="flex gap-4 items-start bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-2.5 rounded-xl text-blue-600 dark:text-blue-400 shrink-0 mt-1 shadow-sm"><Scale size={20}/></div>
                  <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">Cutting (Perder Peso)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-snug">Crie um déficit de 300 a 500 kcal. Mais que isso pode desacelerar o metabolismo.</p>
                  </div>
              </div>
              <div className="flex gap-4 items-start bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="bg-orange-100 dark:bg-orange-900/20 p-2.5 rounded-xl text-orange-600 dark:text-orange-400 shrink-0 mt-1 shadow-sm"><TrendingUp size={20}/></div>
                  <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">Bulking (Ganhar Massa)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-snug">Gere um superávit leve de 200 a 300 kcal para maximizar músculo e minimizar gordura.</p>
                  </div>
              </div>
          </div>

          {/* FAQ ACORDION */}
          <div className="mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <HelpCircle className="text-orange-600 dark:text-orange-500" /> Perguntas Frequentes
            </h3>
            <div className="space-y-3">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                    <summary className="font-semibold text-slate-800 dark:text-slate-100 flex justify-between items-center text-sm select-none">
                      {item.q} <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 animate-in fade-in">
                      {item.a}
                    </p>
                  </details>
              ))}
            </div>
          </div>

          {/* CROSS-LINKING FINAL */}
          </div>

          <RelatedTools currentTool="calorias-diarias" />

        {/* Footer Impressão */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}