import { Metadata } from "next";
import Link from "next/link";
import { Car, Wrench, ShieldCheck, TrendingUp, Search } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

export const metadata: Metadata = {
  title: "Veículos e Tabela FIPE | Mestre das Contas",
  description: "Consulte a Tabela FIPE atualizada e descubra outras calculadoras e ferramentas gratuitas para compra, venda e financiamento de veículos no Brasil.",
  alternates: {
    canonical: "https://mestredascontas.com.br/veiculos",
  },
};

export default function VeiculosHubPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <PageHeader 
        title="Automotivo & Veículos"
        description="Ferramentas financeiras, cotações oficiais e simuladores essenciais para compra, venda e manutenção de carros, motos e caminhões."
        category="veiculos"
        variant="finance"
        breadcrumbs={[
          { label: "Veículos" }
        ]}
      />

      <div className="flex flex-col gap-6 px-4 sm:px-6 max-w-7xl mx-auto -mt-8 relative z-10">
        
        {/* TOP AD */}
        <LazyAdUnit slot="veiculos_hub_top" format="horizontal" variant="agency" />

        {/* MAIN HUB GRIDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Link href="/veiculos/tabela-fipe" className="group">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all h-full hover:border-emerald-500 dark:hover:border-emerald-500 flex flex-col">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
                <Car size={28} className="text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Tabela FIPE Oficial
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                Consulta gratuita do valor de mercado de Carros, Motos e Caminhões. Histórico de depreciação e base para IPVA atualizada.
              </p>
              <div className="flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
                Acessar Consulta <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/financeiro/financiamento-veiculos" className="group">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all h-full hover:border-blue-500 dark:hover:border-blue-500 flex flex-col">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <TrendingUp size={28} className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Financiamento
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                Calcule o valor real das parcelas do seu financiamento. Descubra quanto você pagará de juros e fuja de taxas ocultas abusivas.
              </p>
              <div className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400">
                Simular Financiamento <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/ferramentas/gerador-recibo" className="group">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all h-full hover:border-violet-500 dark:hover:border-violet-500 flex flex-col">
              <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-violet-500 transition-colors">
                <ShieldCheck size={28} className="text-violet-600 dark:text-violet-400 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                Recibo de Compra e Venda
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                Gerador de recibo automático (PDF) para formalizar a compra ou venda do seu veículo usado, garantindo segurança jurídica na transação.
              </p>
              <div className="flex items-center text-sm font-bold text-violet-600 dark:text-violet-400">
                Gerar Recibo Grátis <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
          
        </div>

        {/* MID AD */}
        <LazyAdUnit slot="veiculos_hub_mid" format="horizontal" variant="agency" />

        {/* SEO TEXT BLOCK */}
        <section className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 mt-4 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <Wrench className="text-slate-500" /> Utilitários Automotivos
          </h3>
          <div className="text-slate-600 dark:text-slate-400 space-y-4 text-base leading-relaxed">
            <p>
              Bem-vindo ao portal veicular do Mestre das Contas. Projetamos esta seção especificamente para ajudar você em qualquer transação financeira envolvendo veículos automotores no Brasil.
            </p>
            <p>
              Seja para cotar o valor oficial de um bem usando a Tabela FIPE, simular as taxas ocultas de um consórcio ou financiamento CDC, ou emitir recibos de sinal de compra, você encontrará todas as ferramentas necessárias aqui, de forma 100% online e gratuita.
            </p>
          </div>
        </section>

        <SmartCrossLinker currentHref="/veiculos" category="destaques" maxItems={4} />

      </div>
    </article>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
