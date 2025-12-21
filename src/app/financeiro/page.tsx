import type { Metadata } from "next";
import Link from "next/link";
import AdUnit from "@/components/ads/AdUnit";
import { 
  TrendingUp, Calculator, Wallet, Percent, 
  Landmark, ArrowRight, PiggyBank, Coins,
  LineChart, DollarSign, ShieldCheck
} from "lucide-react";

// --- METADATA (SEO DE CATEGORIA) ---
export const metadata: Metadata = {
  title: "Calculadoras Financeiras 2026 | Juros, Financiamento e Investimentos",
  description: "Central de cálculos financeiros gratuitos. Simule Juros Compostos, Financiamento (Price/SAC), Descontos e planeje sua independência financeira em 2026.",
  keywords: [
    "calculadoras financeiras", 
    "simulador investimentos", 
    "calcular financiamento", 
    "juros compostos online", 
    "matemática financeira facil"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/financeiro",
  },
  openGraph: {
    title: "Portal Financeiro - Mestre das Contas",
    description: "Ferramentas profissionais para você cuidar do seu dinheiro e multiplicar seu patrimônio.",
    url: "https://mestredascontas.com.br/financeiro",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Cálculos Financeiros" }],
  },
};

// --- SCHEMA (COLLECTION) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Ferramentas Financeiras",
  "description": "Coleção de calculadoras para planejamento financeiro e investimentos.",
  "url": "https://mestredascontas.com.br/financeiro",
  "hasPart": [
    { "@type": "SoftwareApplication", "name": "Juros Compostos", "url": "https://mestredascontas.com.br/financeiro/juros-compostos" },
    { "@type": "SoftwareApplication", "name": "Financiamento Price/SAC", "url": "https://mestredascontas.com.br/financeiro/financiamento" },
    { "@type": "SoftwareApplication", "name": "Calculadora de Porcentagem", "url": "https://mestredascontas.com.br/financeiro/porcentagem" },
    { "@type": "SoftwareApplication", "name": "Salário Líquido", "url": "https://mestredascontas.com.br/financeiro/salario-liquido" }
  ]
};

export default function FinanceiroHubPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden pb-12">
      
      {/* INJEÇÃO DE SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <header className="text-center py-12 md:py-16 bg-gradient-to-b from-green-50/50 via-white to-white border-b border-slate-100">
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-6 border border-green-200 shadow-sm animate-in fade-in zoom-in duration-500">
          <Landmark size={14} /> Gestão Patrimonial
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Domine seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Dinheiro</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 text-balance">
          Deixe a matemática conosco. Ferramentas precisas para você investir melhor, quitar dívidas e entender cada centavo dos seus juros.
        </p>
      </header>

      <div className="px-4 max-w-7xl mx-auto w-full">
          
          {/* ANÚNCIO TOPO */}
          <div className="w-full flex justify-center mb-10">
             <AdUnit slot="fin_hub_top" format="horizontal" variant="software" className="min-h-[100px] w-full" />
          </div>

          {/* --- GRID DE FERRAMENTAS --- */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card Juros Compostos */}
            <Link href="/financeiro/juros-compostos" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={100} className="text-green-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <TrendingUp size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">Juros Compostos</h2>
                <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                  O segredo dos investidores. Simule aportes mensais e veja o efeito "bola de neve" no seu patrimônio a longo prazo.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-lg group-hover:bg-green-100 transition-colors">
                  Simular Investimento <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Financiamento */}
            <Link href="/financeiro/financiamento" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Landmark size={100} className="text-indigo-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Calculator size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Financiamento (Price/SAC)</h2>
                <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                  Vai comprar casa ou carro? Compare as tabelas, descubra o valor da primeira parcela e o custo total dos juros (CET).
                </p>
                <span className="inline-flex items-center text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  Calcular Parcelas <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Porcentagem */}
            <Link href="/financeiro/porcentagem" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Percent size={100} className="text-purple-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Percent size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">Calculadora de Porcentagem</h2>
                <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                  Ferramenta 4 em 1. Calcule descontos, aumentos, variação entre dois valores e quanto X representa de Y.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-purple-600 bg-purple-50 px-4 py-2 rounded-lg group-hover:bg-purple-100 transition-colors">
                  Calcular % <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Salário Líquido (Cross-link) */}
            <Link href="/financeiro/salario-liquido" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wallet size={100} className="text-blue-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <DollarSign size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Salário Líquido</h2>
                <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                  Planejamento começa sabendo quanto você ganha. Desconte INSS e IRRF e veja seu poder de compra real.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  Ver Líquido <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

          </section>

          {/* --- CONTEÚDO RICO --- */}
          <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-sm mt-10">
            
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <ShieldCheck className="text-green-600" size={32} /> Educação Financeira é Liberdade
            </h2>
            <p className="lead text-slate-700 text-lg">
              No Brasil, a falta de educação financeira faz milhões de pessoas pagarem juros abusivos sem saber. Nossa missão é entregar as ferramentas para você inverter esse jogo: parar de pagar juros e começar a recebê-los.
            </p>

            {/* BLOCO DE DICAS VISUAL */}
            <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white relative overflow-hidden shadow-lg">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><PiggyBank size={140} className="text-white"/></div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                        <LineChart size={24} className="text-green-400"/> Para Investidores
                    </h3>
                    <ul className="space-y-4 text-slate-300 relative z-10 text-sm">
                        <li className="flex gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"/> <span>O tempo é seu maior aliado nos <strong>Juros Compostos</strong>. Comece hoje.</span></li>
                        <li className="flex gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"/> <span>Aporte mensal constante vence o "timing" de mercado a longo prazo.</span></li>
                        <li className="flex gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"/> <span>Use a calculadora para traçar metas reais de aposentadoria.</span></li>
                    </ul>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Coins size={140} className="text-slate-900"/></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 relative z-10">
                        <Calculator size={24} className="text-indigo-600"/> Para Quem Vai Financiar
                    </h3>
                    <ul className="space-y-4 text-slate-600 relative z-10 text-sm">
                        <li className="flex gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"/> <span>Nunca olhe apenas se a "parcela cabe no bolso". Olhe o total pago.</span></li>
                        <li className="flex gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"/> <span>Exija o <strong>CET (Custo Efetivo Total)</strong> antes de assinar qualquer contrato.</span></li>
                        <li className="flex gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"/> <span>Compare Price (fixa) vs SAC (decrescente). A SAC costuma ser mais barata.</span></li>
                    </ul>
                </div>
            </div>

          </div>

          {/* ANÚNCIO RODAPÉ */}
          <div className="w-full flex justify-center mt-8">
            <AdUnit slot="fin_hub_bottom" format="auto" />
          </div>

      </div>
    </div>
  );
}