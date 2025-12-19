import type { Metadata } from "next";
import Link from "next/link";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Heart, Activity, Scale, Flame, 
  Baby, Droplet, Stethoscope, Dna, 
  Brain, Apple, ArrowRight, ShieldPlus,
  CheckCircle2, Coins, Wallet, TrendingUp
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
    { "@type": "SoftwareApplication", "name": "Calculadora de Calorias", "url": "https://mestredascontas.com.br/saude/calorias-diarias" }
  ]
};

export default function SaudeHubPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden">
      
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

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="saude_hub_top" format="horizontal" variant="agency" />
        </div>

        {/* --- GRID DE FERRAMENTAS --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card IMC */}
          <Link href="/saude/imc" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Scale size={100} className="text-blue-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-blue-100">
                <Activity size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Calculadora de IMC</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1">
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
          <Link href="/saude/calorias-diarias" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Flame size={100} className="text-orange-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-orange-100">
                <Apple size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">Calorias Diárias (TMB)</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                Quer emagrecer ou ganhar massa? Descubra seu Gasto Energético Basal e monte a estratégia perfeita.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-orange-600 px-4 py-2 rounded-lg group-hover:bg-orange-700 transition-colors">
                  Ver Gasto Calórico <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* Card Gestacional (Em Breve) */}
          <div className="group relative overflow-hidden bg-slate-50 rounded-3xl border border-slate-200 opacity-70 cursor-not-allowed h-full flex flex-col hover:opacity-100 transition-opacity">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Baby size={100} className="text-slate-400" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 mb-6 shadow-sm">
                <Baby size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-500 mb-3 flex items-center gap-2">Idade Gestacional <span className="text-[10px] bg-slate-200 text-slate-500 px-2 py-1 rounded uppercase tracking-wide">Em Breve</span></h2>
              <p className="text-slate-500 mb-6 leading-relaxed flex-1">
                Calcule a Data Provável do Parto (DPP) e acompanhe o desenvolvimento do bebê semana a semana.
              </p>
            </div>
          </div>

          {/* Card Água (Em Breve) */}
          <div className="group relative overflow-hidden bg-slate-50 rounded-3xl border border-slate-200 opacity-70 cursor-not-allowed h-full flex flex-col hover:opacity-100 transition-opacity">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Droplet size={100} className="text-slate-400" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 mb-6 shadow-sm">
                <Droplet size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-500 mb-3 flex items-center gap-2">Ingestão de Água <span className="text-[10px] bg-slate-200 text-slate-500 px-2 py-1 rounded uppercase tracking-wide">Em Breve</span></h2>
              <p className="text-slate-500 mb-6 leading-relaxed flex-1">
                Hidratação personalizada. Calcule a quantidade ideal de água para o seu peso e nível de atividade.
              </p>
            </div>
          </div>

        </section>

        {/* --- CONTEÚDO RICO --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden mt-8">
          
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Dna className="text-rose-600" size={32} /> Biomatemática: O Segredo da Longevidade
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            Muitas pessoas tentam melhorar a saúde na base da intuição. O segredo dos atletas e das pessoas longevas é transformar "achismos" em <strong>dados</strong>.
          </p>

          {/* BLOCO DE DICAS */}
          <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
              <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Brain size={120} className="text-white"/></div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                      <Stethoscope size={24} className="text-teal-400"/> Prevenção é Cálculo
                  </h3>
                  <ul className="space-y-4 text-slate-300 relative z-10 text-sm font-medium">
                      <li className="flex gap-3"><CheckCircle2 className="text-teal-400 shrink-0" size={18}/> Manter o IMC na faixa normal reduz risco cardíaco em 40%.</li>
                      <li className="flex gap-3"><CheckCircle2 className="text-teal-400 shrink-0" size={18}/> Beber a água correta melhora a função renal e a pele.</li>
                      <li className="flex gap-3"><CheckCircle2 className="text-teal-400 shrink-0" size={18}/> O controle calórico é a única forma comprovada de gerir peso.</li>
                  </ul>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldPlus size={120} className="text-slate-900"/></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
                      <Activity size={24} className="text-rose-600"/> Saúde da Mulher
                  </h3>
                  <ul className="space-y-4 text-slate-600 relative z-10 text-sm font-medium">
                      <li className="flex gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0"/> Acompanhar a Idade Gestacional é vital para o pré-natal.</li>
                      <li className="flex gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0"/> O metabolismo basal feminino varia conforme o ciclo hormonal.</li>
                      <li className="flex gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0"/> Nossas ferramentas consideram as diferenças biológicas.</li>
                  </ul>
              </div>
          </div>

        </div>

        {/* --- NAVEGAÇÃO CRUZADA (CROSS-LINKING) --- */}
        <div className="mt-8 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-xs uppercase tracking-wider flex items-center gap-2">
               <CheckCircle2 size={16} className="text-emerald-500"/> Cuide também do seu bolso:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/financeiro/juros-compostos" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-400 hover:shadow-lg transition-all group">
                  <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-emerald-600 shadow-sm group-hover:scale-110 transition-transform"><TrendingUp size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Juros Compostos</span>
                  <span className="text-sm text-slate-500 mt-1">Investimentos</span>
              </Link>
              <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group">
                  <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 shadow-sm group-hover:scale-110 transition-transform"><Wallet size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Rescisão CLT</span>
                  <span className="text-sm text-slate-500 mt-1">Trabalhista</span>
              </Link>
              <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition-all group">
                  <div className="bg-indigo-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-indigo-600 shadow-sm group-hover:scale-110 transition-transform"><Coins size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                  <span className="text-sm text-slate-500 mt-1">Financeiro</span>
              </Link>
            </div>
        </div>

        {/* ANÚNCIO RODAPÉ */}
        <div className="w-full max-w-4xl mx-auto flex justify-center mt-4 print:hidden">
          <AdUnit slot="saude_hub_bottom" format="auto" />
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