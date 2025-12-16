import type { Metadata } from "next";
import Link from "next/link";
import AdUnit from "@/components/ads/AdUnit";
import { 
  Heart, Activity, Scale, Flame, 
  Baby, Droplet, Stethoscope, Dna, 
  Brain, Apple, ArrowRight, ShieldPlus
} from "lucide-react";

// --- METADATA (SEO SAÚDE) ---
export const metadata: Metadata = {
  title: "Calculadoras de Saúde e Bem-Estar | IMC, Calorias e Gestação",
  description: "Monitore sua saúde com precisão. Ferramentas gratuitas para calcular IMC, Gasto Calórico Diário (TMB), Idade Gestacional e Ingestão de Água.",
  keywords: [
    "calculadoras de saúde", 
    "calcular imc online", 
    "calculadora de calorias", 
    "data provavel do parto", 
    "calculadora de agua", 
    "saude e bem estar"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/saude",
  },
  openGraph: {
    title: "Portal de Saúde - Mestre das Contas",
    description: "Biomatemática a favor da sua vida. Cálculos precisos para dieta, treino e gestação.",
    url: "https://mestredascontas.com.br/saude",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-saude.png", width: 1200, height: 630, alt: "Cálculos de Saúde" }],
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
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <header className="text-center py-10 md:py-14 bg-gradient-to-b from-teal-50/50 to-white rounded-3xl border border-teal-50">
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6 border border-teal-200 shadow-sm">
          <Heart size={14} /> Cuide de Você
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 px-4">
          Números que Geram <span className="text-teal-600">Saúde</span>
        </h1>
        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto px-4 leading-relaxed">
          Seu corpo é uma máquina biológica complexa, mas previsível. Use a matemática para atingir seu peso ideal, monitorar sua gestação e viver com mais energia.
        </p>
      </header>

      {/* ANÚNCIO TOPO */}
      <div className="w-full flex justify-center">
         <AdUnit slot="saude_hub_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      {/* --- GRID DE FERRAMENTAS --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card IMC */}
        <Link href="/saude/imc" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Scale size={80} className="text-blue-600" />
          </div>
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Calculadora de IMC</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              O ponto de partida. Verifique se seu peso está adequado para sua altura segundo a tabela oficial da OMS (Organização Mundial da Saúde).
            </p>
            <span className="inline-flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-2 transition-transform">
              Calcular IMC <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </Link>

        {/* Card Calorias */}
        <Link href="/saude/calorias-diarias" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Flame size={80} className="text-orange-600" />
          </div>
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
              <Apple size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">Calorias Diárias (TMB)</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Quer emagrecer ou ganhar massa? Descubra seu Gasto Energético Total e monte a estratégia perfeita para sua dieta.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-orange-600 group-hover:translate-x-2 transition-transform">
              Ver Gasto Calórico <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </Link>

        {/* Card Gestacional */}
        <Link href="/saude/gestacional" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Baby size={80} className="text-pink-500" />
          </div>
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500 mb-4 group-hover:scale-110 transition-transform">
              <Baby size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-pink-500 transition-colors">Idade Gestacional</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Está grávida? Calcule a Data Provável do Parto (DPP), descubra de quantas semanas você está e acompanhe o desenvolvimento do bebê.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-pink-500 group-hover:translate-x-2 transition-transform">
              Acompanhar Gravidez <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </Link>

        {/* Card Água */}
        <Link href="/saude/agua" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Droplet size={80} className="text-cyan-500" />
          </div>
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-4 group-hover:scale-110 transition-transform">
              <Droplet size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">Ingestão de Água</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Hidratação não é "2 litros para todos". Calcule a quantidade ideal de água para o seu peso e nível de atividade física.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-cyan-600 group-hover:translate-x-2 transition-transform">
              Calcular Litros <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </Link>

      </section>

      {/* --- CONTEÚDO RICO --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-sm mt-8">
        
        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Dna className="text-teal-600" /> Biomatemática: O Segredo da Longevidade
        </h2>
        <p className="lead text-slate-700 text-lg">
          Muitas pessoas tentam melhorar a saúde na base da intuição ("acho que estou comendo demais", "acho que bebi pouca água"). O segredo dos atletas e das pessoas longevas é transformar "achismos" em <strong>dados</strong>.
        </p>

        {/* BLOCO DE DICAS */}
        <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Brain size={120} className="text-white"/></div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                    <Stethoscope size={24} className="text-teal-400"/> Prevenção é Cálculo
                </h3>
                <ul className="space-y-3 text-slate-300 relative z-10 text-sm">
                    <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0"/> Manter o IMC na faixa normal reduz risco cardíaco em 40%.</li>
                    <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0"/> Beber a água correta melhora a função renal e a pele.</li>
                    <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0"/> O controle calórico é a única forma comprovada de gerir peso.</li>
                </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldPlus size={120} className="text-slate-900"/></div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 relative z-10">
                    <Activity size={24} className="text-pink-600"/> Saúde da Mulher
                </h3>
                <ul className="space-y-3 text-slate-600 relative z-10 text-sm">
                    <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-600 shrink-0"/> Acompanhar a Idade Gestacional é vital para o pré-natal.</li>
                    <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-600 shrink-0"/> O metabolismo basal feminino varia conforme o ciclo hormonal.</li>
                    <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-600 shrink-0"/> Nossas ferramentas consideram as diferenças biológicas de gênero.</li>
                </ul>
            </div>
        </div>

      </div>

      {/* ANÚNCIO RODAPÉ */}
      <div className="w-full flex justify-center mt-4">
        <AdUnit slot="saude_hub_bottom" format="auto" />
      </div>

    </div>
  );
}