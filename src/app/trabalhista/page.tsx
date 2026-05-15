import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Briefcase, History, BookOpen, 
  CheckCircle2, Coins, Calculator, 
  Wallet, FileText, Scale, ArrowRight,
  TrendingUp, Clock, CalendarDays, Zap, ShieldCheck
} from "lucide-react";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

// --- METADATA (SEO 2026) ---
export const metadata: Metadata = {
  title: "Cálculos Trabalhistas CLT 2026 | Rescisão, Férias e 13º Salário",
  description: "Confira seus direitos trabalhistas em 2026. Simuladores gratuitos de rescisão CLT, férias, 13º salário, seguro-desemprego e horas extras. Tudo atualizado.",
  keywords: [
    "cálculos trabalhistas", 
    "rescisão clt", 
    "férias proporcionais", 
    "décimo terceiro salário",
    "seguro desemprego 2026",
    "direitos do trabalhador"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/trabalhista" },
  openGraph: {
    title: "Portal de Cálculos Trabalhistas - Mestre das Contas",
    description: "Todas as ferramentas para você conferir seus direitos. Não deixe dinheiro na mesa.",
    url: "https://mestredascontas.com.br/trabalhista",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website" } };

// --- SCHEMA.ORG (COLLECTION) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Cálculos Trabalhistas",
  "description": "Ferramentas para cálculo de benefícios e verbas rescisórias CLT.",
  "url": "https://mestredascontas.com.br/trabalhista",
  "hasPart": [
    { "@type": "SoftwareApplication", "name": "Cálculo de Rescisão", "url": "https://mestredascontas.com.br/trabalhista/rescisao" },
    { "@type": "SoftwareApplication", "name": "Cálculo de Férias", "url": "https://mestredascontas.com.br/trabalhista/ferias" },
    { "@type": "SoftwareApplication", "name": "Cálculo de 13º Salário", "url": "https://mestredascontas.com.br/trabalhista/decimo-terceiro" },
    { "@type": "SoftwareApplication", "name": "Seguro-Desemprego", "url": "https://mestredascontas.com.br/trabalhista/seguro-desemprego" },
    { "@type": "SoftwareApplication", "name": "Horas Extras", "url": "https://mestredascontas.com.br/trabalhista/horas-extras" }
  ]
};

export default function TrabalhistaHubPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Direitos Trabalhistas"
          description="Acesse simuladores precisos e atualizados com a legislação vigente. Proteja seu bolso e entenda cada centavo do seu holerite."
          category="CLT 2026"
          icon={<Briefcase size={32} strokeWidth={2} />}
          variant="labor" 
          categoryColor="blue"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Trabalhista" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">

        {/* ANÚNCIO TOPO */}
        <div className="w-full flex justify-center">
           <LazyAdUnit slot="hub_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
        </div>

        {/* --- GRID DE FERRAMENTAS (6 ITENS) --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Rescisão */}
          <Link href="/trabalhista/rescisao" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText size={80} className="text-blue-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-blue-100">
                <FileText size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Cálculo de Rescisão</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Simule seu acerto trabalhista completo: saldo de salário, aviso prévio, férias e multa de 40% do FGTS.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-blue-600 px-4 py-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                  Simular Acerto <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 2. Férias */}
          <Link href="/trabalhista/ferias" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <CalendarDays size={80} className="text-indigo-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-indigo-100">
                <CalendarDays size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Cálculo de Férias</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Saiba quanto vai receber de férias líquidas com 1/3 constitucional, abono pecuniário e descontos.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                  Calcular Férias <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 3. 13º Salário */}
          <Link href="/trabalhista/decimo-terceiro" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Coins size={80} className="text-emerald-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-emerald-100">
                <Coins size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">13º Salário</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Calcule o valor exato da primeira e segunda parcela do seu décimo terceiro com descontos de 2026.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-emerald-600 px-4 py-2 rounded-lg group-hover:bg-emerald-700 transition-colors">
                  Calcular 13º <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 4. Seguro-Desemprego */}
          <Link href="/trabalhista/seguro-desemprego" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wallet size={80} className="text-amber-500" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-amber-100">
                <Wallet size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Seguro-Desemprego</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Veja o valor das parcelas e quantas você tem direito a receber baseado no seu histórico.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-amber-500 px-4 py-2 rounded-lg group-hover:bg-amber-600 transition-colors">
                  Simular Seguro <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 5. Horas Extras */}
          <Link href="/trabalhista/horas-extras" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock size={80} className="text-orange-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-orange-100">
                <Clock size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Horas Extras</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Calcule o valor da sua hora extra com 50%, 100% e DSR. Saiba exatamente quanto deve vir no holerite.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-orange-600 px-4 py-2 rounded-lg group-hover:bg-orange-700 transition-colors">
                  Calcular Horas <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 6. FGTS */}
          <div className="group relative overflow-hidden bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm opacity-60 cursor-not-allowed h-full flex flex-col">
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 mb-6 shadow-sm">
                <TrendingUp size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-500 dark:text-slate-400 mb-3">Saldo FGTS</h2>
              <p className="text-slate-400 dark:text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Simule a evolução do seu saldo do FGTS com juros e correções. (Em breve).
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-slate-400 bg-slate-200 dark:bg-slate-800 px-4 py-2 rounded-lg">
                  Em breve
                </span>
              </div>
            </div>
          </div>

        </section>

        {/* --- CONTEÚDO SEO (ARTIGO) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm mt-10">
          
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
            <Scale className="text-blue-600" size={32} /> Seus Direitos Protegidos pela Tecnologia
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg">
            No <strong>Mestre das Contas</strong>, nossa missão é traduzir a complexidade da legislação trabalhista brasileira em ferramentas simples e poderosas. Seja em uma demissão sem justa causa ou no planejamento das férias, você merece saber os valores exatos.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors group">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                      <Zap className="text-amber-500" size={24}/> Cálculos Instantâneos
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Nossas calculadoras processam milhares de regras tributárias e trabalhistas em milissegundos. Você informa os dados e o resultado aparece na hora, com memória de cálculo detalhada.
                  </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors group">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                      <ShieldCheck className="text-emerald-500" size={24}/> 100% Auditado
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Todas as ferramentas são baseadas na <strong>CLT (Consolidação das Leis do Trabalho)</strong> e nas tabelas oficiais da Receita Federal e Previdência Social atualizadas para 2026.
                  </p>
              </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/20">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                  <BookOpen size={150} className="text-white"/>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                  Educação Financeira
              </h3>
              <p className="text-slate-300 mb-6 relative z-10">
                  Mais do que apenas números, oferecemos guias completos em cada ferramenta para que você entenda conceitos como Aviso Prévio Indenizado, Proporcionalidade de Férias e Alíquotas Progressivas do INSS.
              </p>
              <div className="flex gap-4 relative z-10">
                  <div className="flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full">
                      <CheckCircle2 size={14} className="text-emerald-400"/> Tabela INSS 2026
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full">
                      <CheckCircle2 size={14} className="text-emerald-400"/> IRRF Atualizado
                  </div>
              </div>
          </div>

        </div>

        <SmartCrossLinker currentHref="/trabalhista" category="financeiro" />
        
        {/* ANÚNCIO RODAPÉ */}
        <div className="w-full flex justify-center mt-4">
          <LazyAdUnit slot="hub_bottom" format="auto" />
        </div>

      </div>
    </div>
  );
}