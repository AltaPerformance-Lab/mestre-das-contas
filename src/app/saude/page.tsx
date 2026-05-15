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
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

// --- METADATA (SEO SAÚDE 2026) ---
export const metadata: Metadata = {
  title: "Calculadoras de Saúde e Bem-Estar 2026 | IMC, Calorias e Gestação",
  description: "Monitore sua saúde com precisão em 2026. Ferramentas gratuitas para calcular IMC, Gasto Calórico Diário (TMB), Idade Gestacional e Ingestão de Água.",
  keywords: [
    "calculadoras de saúde", 
    "calcular imc online", 
    "calcular calorias diárias", 
    "idade gestacional calculadora",
    "saúde e bem-estar 2026",
    "biomatemática"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/saude" },
  openGraph: {
    title: "Portal de Saúde 2026 - Mestre das Contas",
    description: "Biomatemática a favor da sua vida. Cálculos precisos para dieta, treino e gestação.",
    url: "https://mestredascontas.com.br/saude",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website" } };

// --- SCHEMA.ORG (COLLECTION) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Calculadoras de Saúde",
  "description": "Ferramentas para monitoramento de indicadores de saúde e bem-estar.",
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

      {/* --- HERO SECTION --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Saúde & Bem-Estar"
          description="Cálculos científicos para ajudar você a manter uma vida equilibrada. De dietas a acompanhamento gestacional, tudo em um só lugar."
          category="Biomatemática"
          icon={<Heart size={32} strokeWidth={2} />}
          variant="health"
          categoryColor="rose" 
          badge="Saúde 2026"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Saúde" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">

        {/* ANÚNCIO TOPO */}
        <div className="w-full flex justify-center mb-10">
           <LazyAdUnit slot="saude_hub_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
        </div>

        {/* --- GRID DE FERRAMENTAS --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* 1. IMC */}
          <Link href="/saude/imc" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.07] group-hover:opacity-10 transition-opacity">
              <Scale size={140} />
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col relative z-10">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8 group-hover:scale-110 transition-transform shadow-inner ring-1 ring-blue-100 dark:ring-blue-800">
                <Scale size={32} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Calculadora de IMC</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                Descubra se você está no peso ideal segundo a OMS. Resultados detalhados para adultos e idosos com classificação completa.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-blue-600 px-6 py-3 rounded-xl group-hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none">
                  Calcular Agora <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 2. Calorias Diárias */}
          <Link href="/saude/calorias-diarias" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.07] group-hover:opacity-10 transition-opacity">
              <Flame size={140} />
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col relative z-10">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-8 group-hover:scale-110 transition-transform shadow-inner ring-1 ring-orange-100 dark:ring-orange-800">
                <Flame size={32} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Gasto Calórico (TMB)</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                Saiba quantas calorias seu corpo queima por dia. Ideal para planejar dietas de emagrecimento ou ganho de massa muscular.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-orange-600 px-6 py-3 rounded-xl group-hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200 dark:shadow-none">
                  Calcular TMB <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 3. Gestacional */}
          <Link href="/saude/gestacional" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.07] group-hover:opacity-10 transition-opacity">
              <Baby size={140} />
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col relative z-10">
              <div className="w-16 h-16 bg-pink-50 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-pink-600 dark:text-pink-400 mb-8 group-hover:scale-110 transition-transform shadow-inner ring-1 ring-pink-100 dark:ring-pink-800">
                <Baby size={32} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Calculadora Gestacional</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                Calcule a Data Provável do Parto (DPP) e acompanhe o desenvolvimento do bebê semana a semana.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-pink-500 px-4 py-2 rounded-lg group-hover:bg-pink-600 transition-colors">
                  Ver Minha Gravidez <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 4. Água */}
          <Link href="/saude/agua" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.07] group-hover:opacity-10 transition-opacity">
              <Droplet size={140} />
            </div>
            <div className="p-8 md:p-10 flex-1 flex flex-col relative z-10">
              <div className="w-16 h-16 bg-sky-50 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center text-sky-600 dark:text-sky-400 mb-8 group-hover:scale-110 transition-transform shadow-inner ring-1 ring-sky-100 dark:ring-sky-800">
                <Droplet size={32} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">Calculadora de Água</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                A regra dos 2 litros é mito? Descubra a quantidade ideal de água que você deve beber por dia baseada no seu peso.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-sky-500 px-4 py-2 rounded-lg group-hover:bg-sky-600 transition-colors">
                  Calcular Água <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

        </section>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-lg max-w-none bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm mt-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3">
             <Activity className="text-rose-500" /> Biomatemática: A Ciência do Bem-Estar
          </h2>
          <p className="lead text-xl text-slate-700 dark:text-slate-300">
             Saúde não é apenas a ausência de doença, mas um estado de equilíbrio. No <strong>Mestre das Contas</strong>, utilizamos fórmulas validadas pela comunidade científica internacional para ajudar você a monitorar seus principais indicadores corporais.
          </p>

          <div className="grid md:grid-cols-3 gap-8 my-12 not-prose">
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-rose-500 mb-4 shadow-sm">
                      <Stethoscope size={24}/>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Base Científica</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Usamos algoritmos baseados em estudos da OMS e protocolos médicos atualizados.</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-blue-500 mb-4 shadow-sm">
                      <ShieldPlus size={24}/>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Privacidade</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Seus dados de saúde são privados. O processamento é local e nada é salvo em nossos servidores.</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-emerald-500 mb-4 shadow-sm">
                      <CheckCircle2 size={24}/>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Fácil Entendimento</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Interpretamos os números para você, entregando dicas práticas de saúde.</p>
              </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Dna size={180} />
              </div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                  <Brain className="text-blue-400"/> Por que acompanhar seus índices?
              </h3>
              <p className="text-slate-300 mb-6 relative z-10 text-lg leading-relaxed">
                  Pequenas mudanças diárias geram grandes resultados a longo prazo. Saber seu IMC ou seu gasto calórico basal permite que você tome decisões mais inteligentes sobre sua alimentação e rotina de exercícios, evitando o "efeito sanfona" e prevenindo doenças crônicas.
              </p>
              <div className="flex flex-wrap gap-4 relative z-10">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/10 flex items-center gap-2">
                     <TrendingUp size={16} className="text-emerald-400"/> Metas Realistas
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/10 flex items-center gap-2">
                     <PieChart size={16} className="text-blue-400"/> Nutrição Precisa
                  </div>
              </div>
          </div>
        </div>
        <SmartCrossLinker currentHref="/saude" category="saude" />

        {/* ANÚNCIO RODAPÉ */}
        <div className="w-full max-w-4xl mx-auto flex justify-center mt-4 print:hidden">
          <LazyAdUnit slot="saude_hub_bottom" format="auto" />
        </div>

      </div>
    </div>
  );
}