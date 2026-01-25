import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Heart, Activity, Scale, Flame, 
  Baby, Droplet, Stethoscope, Dna, 
  Brain, Apple, ArrowRight, ShieldPlus,
  CheckCircle2, Coins, Wallet, TrendingUp, PieChart, GlassWater
} from "lucide-react";

// --- METADATA (SEO SAÚDE 2026) ---
export const metadata: Metadata = {
  title: "Calculadoras de Saúde e Bem-Estar 2026 | IMC, Calorias e Gestação",
  description: "Monitore sua saúde com precisão. Ferramentas gratuitas atualizadas para calcular IMC, Gasto Calórico Diário (TMB), Idade Gestacional e Ingestão de Água.",
  keywords: [
    "calculadoras de saúde", 
    "calcular imc online", 
    "calculadora de calorias", 
    "data provavel do parto", 
    "calculadora de agua", 
    "saude e bem estar 2026"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/saude",
  },
  openGraph: {
    title: "Portal de Saúde 2026 - Mestre das Contas",
    description: "Biomatemática a favor da sua vida. Cálculos precisos para dieta, treino e gestação.",
    url: "https://mestredascontas.com.br/saude",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Cálculos de Saúde" }],
  },
};

// --- SCHEMA (COLLECTION) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Ferramentas de Saúde",
  "description": "Coleção de calculadoras para monitoramento de saúde e bem-estar.",
  "url": "https://mestredascontas.com.br/saude",
  "hasPart": [
    { "@type": "SoftwareApplication", "name": "Calculadora de IMC", "url": "https://mestredascontas.com.br/saude/imc" },
    { "@type": "SoftwareApplication", "name": "Calculadora de Calorias", "url": "https://mestredascontas.com.br/saude/calorias-diarias" },
    { "@type": "SoftwareApplication", "name": "Calculadora Gestacional", "url": "https://mestredascontas.com.br/saude/gestacional" },
    { "@type": "SoftwareApplication", "name": "Calculadora de Água", "url": "https://mestredascontas.com.br/saude/agua" }
  ]
};

export default function SaudeHubPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER (Health Variant - Laranja/Rosa) --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadoras de Saúde"
          description="Seu corpo é uma máquina biológica complexa, mas previsível. Use a matemática para atingir seu peso ideal e viver com mais energia."
          category="Saúde & Bem-Estar"
          icon={<Heart size={32} strokeWidth={2} />}
          variant="health" 
          categoryColor="rose"
          badge="Ferramentas Gratuitas"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Saúde" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">

        {/* ANÚNCIO TOPO */}
        {/* ANÚNCIO TOPO */}
        <div className="w-full flex justify-center mb-10">
           <LazyAdUnit slot="saude_hub_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
        </div>

        {/* --- GRID DE FERRAMENTAS --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card IMC */}
          <Link href="/saude/imc" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Scale size={100} className="text-blue-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-blue-100">
                <Activity size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Calculadora de IMC</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                O ponto de partida. Verifique se seu peso está adequado para sua altura segundo a tabela oficial da OMS.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-blue-600 px-4 py-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                  Calcular IMC <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* Card Calorias */}
          <Link href="/saude/calorias-diarias" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Flame size={100} className="text-orange-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-orange-100">
                <Apple size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Calorias Diárias (TMB)</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                Quer emagrecer ou ganhar massa? Descubra seu Gasto Energético Basal e monte a estratégia perfeita.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-orange-600 px-4 py-2 rounded-lg group-hover:bg-orange-700 transition-colors">
                  Ver Gasto Calórico <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* Card Gestacional */}
          <Link href="/saude/gestacional" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Baby size={100} className="text-pink-500" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-pink-100">
                <Baby size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Calculadora Gestacional</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                Calcule a Data Provável do Parto (DPP) e acompanhe o desenvolvimento do bebê semana a semana.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-pink-500 px-4 py-2 rounded-lg group-hover:bg-pink-600 transition-colors">
                  Acompanhar Gravidez <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* Card Água */}
          <Link href="/saude/agua" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Droplet size={100} className="text-cyan-500" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-cyan-100">
                <GlassWater size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Ingestão de Água</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                Hidratação personalizada. Calcule a quantidade ideal de água para o seu peso e nível de atividade.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-cyan-500 px-4 py-2 rounded-lg group-hover:bg-cyan-600 transition-colors">
                  Calcular Meta <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

        </section>


        {/* --- CONTEÚDO RICO (SEO) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm mt-10">
          
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
            <Activity className="text-rose-600" size={32} /> Monitoramento Inteligente: Sua Saúde em Números
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg">
            A saúde moderna vai além do check-up anual. Monitorar indicadores vitais como IMC, taxa metabólica e hidratação no dia a dia é a chave para a longevidade e prevenção de doenças crônicas.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden group hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:scale-110 transition-transform">
                     <Brain size={120} className="text-blue-600 dark:text-blue-400"/>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 relative z-10">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        <Dna size={24}/>
                      </div>
                      Metabolismo e Energia
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed relative z-10">
                      Entender sua Taxa Metabólica Basal (TMB) é fundamental. Não existe dieta universal; existe o balanço energético calculado para o <strong>seu</strong> corpo.
                  </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden group hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors">
                   <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:scale-110 transition-transform">
                     <Droplet size={120} className="text-cyan-600 dark:text-cyan-400"/>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 relative z-10">
                       <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg text-cyan-600 dark:text-cyan-400">
                        <GlassWater size={24}/>
                      </div>
                      Hidratação Eficiente
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed relative z-10">
                      Beber água não é apenas matar a sede. A hidratação correta melhora a cognição, a pele e a performance física. Calcule sua meta diária.
                  </p>
              </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">Perguntas Frequentes</h3>
          <div className="not-prose space-y-4">
            <details className="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl cursor-pointer open:ring-1 open:ring-rose-500/20">
              <summary className="font-semibold text-slate-800 dark:text-slate-200 flex justify-between items-center select-none">
                O IMC é uma medida confiável?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                O IMC é um excelente indicador populacional e de triagem inicial. Porém, ele não distingue massa muscular de gordura. Para atletas muito musculosos, o IMC pode dar "sobrepeso" incorretamente.
              </p>
            </details>
            <details className="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl cursor-pointer open:ring-1 open:ring-rose-500/20">
              <summary className="font-semibold text-slate-800 dark:text-slate-200 flex justify-between items-center select-none">
                Quantas calorias devo comer para emagrecer?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Geralmente recomenda-se um déficit calórico moderado (entre 300 a 500 kcal abaixo do seu gasto total diário). Isso promove uma perda de peso sustentável sem sacrificar massa magra.
              </p>
            </details>
          </div>

        </div>
        {/* ANÚNCIO RODAPÉ */}
        <div className="w-full max-w-4xl mx-auto flex justify-center mt-4 print:hidden">
          <LazyAdUnit slot="saude_hub_bottom" format="auto" />
        </div>

        {/* RODAPÉ IMPRESSÃO */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </div>
  );
}