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
  title: "Calculadoras Financeiras 2025 | Juros, Financiamento e Investimentos",
  description: "Central de cálculos financeiros gratuitos. Simule Juros Compostos, Financiamento (Price/SAC), Descontos e planeje sua independência financeira.",
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
    images: [{ url: "/og-financeiro.png", width: 1200, height: 630, alt: "Cálculos Financeiros" }],
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
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <header className="text-center py-10 md:py-14 bg-gradient-to-b from-green-50/50 to-white rounded-3xl border border-green-50">
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-6 border border-green-200 shadow-sm">
          <Landmark size={14} /> Gestão Patrimonial
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 px-4">
          Domine seu <span className="text-green-600">Dinheiro</span>
        </h1>
        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto px-4 leading-relaxed">
          Deixe a matemática conosco. Ferramentas precisas para você investir melhor, quitar dívidas e entender cada centavo dos seus juros.
        </p>
      </header>

      {/* ANÚNCIO TOPO */}
      <div className="w-full flex justify-center">
         <AdUnit slot="fin_hub_top" format="horizontal" variant="software" className="min-h-[100px] w-full" />
      </div>

      {/* --- GRID DE FERRAMENTAS --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card Juros Compostos */}
        <Link href="/financeiro/juros-compostos" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={80} className="text-green-600" />
          </div>
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">Juros Compostos</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              O segredo dos investidores. Simule aportes mensais e veja o efeito "bola de neve" no seu patrimônio a longo prazo.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-green-600 group-hover:translate-x-2 transition-transform">
              Simular Investimento <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </Link>

        {/* Card Financiamento */}
        <Link href="/financeiro/financiamento" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Landmark size={80} className="text-indigo-600" />
          </div>
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
              <Calculator size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Financiamento (Price/SAC)</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Vai comprar casa ou carro? Compare as tabelas, descubra o valor da primeira parcela e o custo total dos juros.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-indigo-600 group-hover:translate-x-2 transition-transform">
              Calcular Parcelas <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </Link>

        {/* Card Porcentagem */}
        <Link href="/financeiro/porcentagem" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Percent size={80} className="text-purple-600" />
          </div>
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
              <Percent size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">Calculadora de Porcentagem</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Ferramenta 4 em 1. Calcule descontos, aumentos, variação entre dois valores e quanto X representa de Y.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-purple-600 group-hover:translate-x-2 transition-transform">
              Calcular % <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </Link>

        {/* Card Salário Líquido (Cross-link Trabalhista/Financeiro) */}
        <Link href="/financeiro/salario-liquido" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet size={80} className="text-blue-600" />
          </div>
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
              <DollarSign size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Salário Líquido</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Planejamento começa sabendo quanto você ganha. Desconte INSS e IRRF e veja seu poder de compra real.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-2 transition-transform">
              Ver Líquido <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </Link>

      </section>

      {/* --- CONTEÚDO RICO --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-sm mt-8">
        
        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <ShieldCheck className="text-green-600" /> Educação Financeira é Liberdade
        </h2>
        <p className="lead text-slate-700 text-lg">
          No Brasil, a falta de educação financeira faz milhões de pessoas pagarem juros abusivos sem saber. Nossa missão é entregar as ferramentas para você inverter esse jogo: parar de pagar juros e começar a recebê-los.
        </p>

        {/* BLOCO DE DICAS */}
        <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><PiggyBank size={120} className="text-white"/></div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                    <LineChart size={24} className="text-green-400"/> Para Investidores
                </h3>
                <ul className="space-y-3 text-slate-300 relative z-10 text-sm">
                    <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"/> O tempo é seu maior aliado nos Juros Compostos.</li>
                    <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"/> Aporte mensal constante vence o "timing" de mercado.</li>
                    <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"/> Use a calculadora para traçar metas de aposentadoria.</li>
                </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><Coins size={120} className="text-slate-900"/></div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 relative z-10">
                    <Calculator size={24} className="text-indigo-600"/> Para Quem Vai Financiar
                </h3>
                <ul className="space-y-3 text-slate-600 relative z-10 text-sm">
                    <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"/> Nunca olhe apenas se a parcela cabe no bolso.</li>
                    <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"/> Calcule o Custo Efetivo Total (CET).</li>
                    <li className="flex gap-2"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"/> Compare Price (fixa) vs SAC (decrescente) sempre.</li>
                </ul>
            </div>
        </div>

      </div>

      {/* ANÚNCIO RODAPÉ */}
      <div className="w-full flex justify-center mt-4">
        <AdUnit slot="fin_hub_bottom" format="auto" />
      </div>

    </div>
  );
}