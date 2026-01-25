import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { 
  TrendingUp, Calculator, Wallet, Percent, 
  Landmark, ArrowRight, PiggyBank, Coins,
  LineChart, DollarSign, ShieldCheck, Briefcase, Calendar, Car, BarChart3
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
    { "@type": "SoftwareApplication", "name": "Salário Líquido", "url": "https://mestredascontas.com.br/financeiro/salario-liquido" },
    { "@type": "SoftwareApplication", "name": "Calculadora MEI", "url": "https://mestredascontas.com.br/financeiro/calculadora-mei" },
    { "@type": "SoftwareApplication", "name": "Dias Úteis", "url": "https://mestredascontas.com.br/financeiro/calculadora-dias-uteis" },
    { "@type": "SoftwareApplication", "name": "Reforma Tributária", "url": "https://mestredascontas.com.br/financeiro/reforma-tributaria" }
  ]
};

export default function FinanceiroHubPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden pb-12">
      
      {/* INJEÇÃO DE SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER (Finance Variant - Verde) --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Ferramentas Financeiras"
          description="Deixe a matemática conosco. Ferramentas precisas para você investir melhor, quitar dívidas e entender cada centavo dos seus juros."
          category="Gestão Patrimonial"
          icon={<Landmark size={32} strokeWidth={2} />}
          variant="finance" 
          categoryColor="green"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Financeiro" }
          ]}
        />
      </div>{/* --- CONTEUDO --- */}
      <div className="px-4 flex flex-col gap-8 max-w-7xl mx-auto w-full">
          
          {/* ANÚNCIO TOPO */}
          <div className="w-full flex justify-center mb-10">
             <LazyAdUnit slot="fin_hub_top" format="horizontal" variant="software" className="min-h-[100px] w-full" />
          </div>

          {/* --- GRID DE FERRAMENTAS --- */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card Juros Compostos */}
            <Link href="/financeiro/juros-compostos" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={100} className="text-green-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <TrendingUp size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Juros Compostos</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                  O segredo dos investidores. Simule aportes mensais e veja o efeito "bola de neve" no seu patrimônio a longo prazo.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-lg group-hover:bg-green-100 transition-colors">
                  Simular Investimento <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Financiamento */}
            <Link href="/financeiro/financiamento" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Landmark size={100} className="text-indigo-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Calculator size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Financiamento (Price/SAC)</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                  Vai comprar casa ou carro? Compare as tabelas, descubra o valor da primeira parcela e o custo total dos juros (CET).
                </p>
                <span className="inline-flex items-center text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  Calcular Parcelas <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Financiamento Veículos */}
            <Link href="/financeiro/financiamento-veiculos" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Car size={100} className="text-blue-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Car size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Financiamento de Veículos</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                  Sonhando com o carro novo? Simule as parcelas, descubra a taxa real de juros e evite armadilhas no seu financiamento.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  Simular Carro <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Porcentagem */}
            <Link href="/financeiro/porcentagem" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Percent size={100} className="text-purple-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Percent size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Calculadora de Porcentagem</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                  Ferramenta 4 em 1. Calcule descontos, aumentos, variação entre dois valores e quanto X representa de Y.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-purple-600 bg-purple-50 px-4 py-2 rounded-lg group-hover:bg-purple-100 transition-colors">
                  Calcular % <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Salário Líquido (Cross-link) */}
            <Link href="/financeiro/salario-liquido" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wallet size={100} className="text-blue-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <DollarSign size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Salário Líquido</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1">
                  Planejamento começa sabendo quanto você ganha. Desconte INSS e IRRF e veja seu poder de compra real.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  Ver Líquido <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

          </section>
          

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            
            {/* Comparador de Renda (NOVO) */}
            <Link href="/financeiro/comparador-salario" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                 <BarChart3 size={100} className="text-indigo-600" />
               </div>
               <div className="p-8 h-full flex flex-col items-start bg-indigo-50/50 dark:bg-indigo-900/10">
                 <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                   <BarChart3 size={28} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Comparador de Renda</h2>
                 <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-1">
                   Você é rico ou pobre? Descubra sua posição na pirâmide salarial do Brasil comparando com dados estatísticos reais.
                 </p>
                 <span className="inline-flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                   Comparar Agora <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </span>
               </div>
            </Link>

             {/* Calculadora MEI */}
            <Link href="/financeiro/calculadora-mei" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Briefcase size={100} className="text-emerald-600" />
               </div>
               <div className="p-8 h-full flex flex-col items-start bg-emerald-50/50 dark:bg-emerald-900/10">
                 <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                   <Briefcase size={28} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Calculadora MEI 2026</h2>
                 <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-1">
                   Guia completo para Microempreendedores. Calcule DAS, limite de faturamento anual e proporcional.
                 </p>
                 <span className="inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-lg group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                   Acessar MEI <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </span>
               </div>
            </Link>

            {/* Dias Úteis */}
            <Link href="/financeiro/calculadora-dias-uteis" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Calendar size={100} className="text-blue-600" />
               </div>
               <div className="p-8 h-full flex flex-col items-start bg-blue-50/50 dark:bg-blue-900/10">
                 <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                   <Calendar size={28} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Dias Úteis</h2>
                 <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-1">
                   Some dias a uma data ou calcule prazos excluindo feriados e fins de semana. Essencial para boletos e prazos.
                 </p>
                 <span className="inline-flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                   Contar Dias <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </span>
               </div>
            </Link>

             {/* Reforma Tributária */}
            <Link href="/financeiro/reforma-tributaria" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Landmark size={100} className="text-amber-600" />
               </div>
               <div className="p-8 h-full flex flex-col items-start bg-amber-50/50 dark:bg-amber-900/10">
                 <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                   <Landmark size={28} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Reforma Tributária</h2>
                 <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-1">
                   Entenda o novo IVA (IBS + CBS) e como ele afeta serviços e produtos. Simulador de impacto tributário.
                 </p>
                 <span className="inline-flex items-center text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-lg group-hover:bg-amber-200 dark:group-hover:bg-amber-800 transition-colors">
                   Ver Reforma <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </span>
               </div>
            </Link>
          </section>

          {/* --- CONTEÚDO RICO --- */}
          <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm mt-10">
            
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
              <ShieldCheck className="text-green-600" size={32} /> Educação Financeira é Liberdade
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-lg">
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

                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Coins size={140} className="text-slate-900"/></div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 relative z-10">
                        <Calculator size={24} className="text-indigo-600"/> Para Quem Vai Financiar
                    </h3>
                    <ul className="space-y-4 text-slate-600 dark:text-slate-400 relative z-10 text-sm">
                        <li className="flex gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"/> <span>Nunca olhe apenas se a "parcela cabe no bolso". Olhe o total pago.</span></li>
                        <li className="flex gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"/> <span>Exija o <strong>CET (Custo Efetivo Total)</strong> antes de assinar qualquer contrato.</span></li>
                        <li className="flex gap-3"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"/> <span>Compare Price (fixa) vs SAC (decrescente). A SAC costuma ser mais barata.</span></li>
                    </ul>
                </div>
            </div>

          </div>

          {/* ANÚNCIO RODAPÉ */}
          <div className="w-full flex justify-center mt-8">
            <LazyAdUnit slot="fin_hub_bottom" format="auto" />
          </div>

      </div>
    </div>
  );
}