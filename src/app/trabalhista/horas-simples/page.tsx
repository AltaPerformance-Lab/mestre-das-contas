import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import WorkHoursCalculator from "@/components/calculators/WorkHoursCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Clock, Timer, CheckCircle2, AlertTriangle, Moon, Wallet, FileText, Coins
} from "lucide-react";

export const metadata: Metadata = {
  title: "Calculadora de Horas Trabalhadas Simples | Entrada, Saída e Intervalo",
  description: "Calcule suas horas trabalhadas informando apenas entrada, saída e tempo de intervalo. Simples, rápido e gratuito.",
};

export default function HorasSimplesPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Horas Simples"
          description="Cálculo rápido de jornada de trabalho. Informe a entrada, saída e o tempo total de intervalo."
          category="Produtividade & Trabalho"
          icon={<Timer size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="cyan"
          badge="Nova Ferramenta"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Horas Simples" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ALERTA DE TOLERÂNCIA */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start text-left max-w-3xl mx-auto w-full shadow-sm">
          <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 uppercase tracking-wide">Fique Atento</p>
            <p className="text-sm text-amber-800/90 leading-relaxed">
              Esta calculadora usa o tempo total de intervalo (ex: 1 hora) em vez dos horários exatos de saída e retorno do almoço. Para um cálculo mais detalhado, use a <Link href="/trabalhista/horas-trabalhadas" className="underline font-bold hover:text-amber-950">Calculadora de Ponto Completa</Link>.
            </p>
          </div>
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white rounded-3xl border border-cyan-100 shadow-xl shadow-cyan-100/50 p-1 md:p-2">
              <Suspense fallback={
                <div className="h-96 w-full bg-cyan-50 rounded-2xl animate-pulse flex items-center justify-center text-cyan-300 border border-cyan-100">
                    <div className="flex flex-col items-center gap-2">
                        <Timer className="animate-bounce" size={32}/>
                        <span>Carregando Calculadora...</span>
                    </div>
                </div>
              }>
                  <WorkHoursCalculator />
              </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* NAVEGAÇÃO FINAL */}
        <div className="mt-8 pt-8 border-t border-slate-200 print:hidden not-prose">
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/trabalhista/horas-extras" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all group">
                  <div className="bg-purple-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-purple-600 shadow-sm group-hover:scale-110 transition-transform"><Coins size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Horas Extras</span>
                  <span className="text-sm text-slate-500 mt-1">Quanto valem?</span>
              </Link>
              <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all group">
                  <div className="bg-green-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600 shadow-sm group-hover:scale-110 transition-transform"><Wallet size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                  <span className="text-sm text-slate-500 mt-1">Holerite completo</span>
              </Link>
              <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group">
                  <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 shadow-sm group-hover:scale-110 transition-transform"><FileText size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Rescisão CLT</span>
                  <span className="text-sm text-slate-500 mt-1">Cálculo demissão</span>
              </Link>
            </div>
        </div>

      </div>
    </article>
  );
}
