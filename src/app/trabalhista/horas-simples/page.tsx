import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import WorkHoursCalculator from "@/components/calculators/WorkHoursCalculator";


import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Clock, Timer, CheckCircle2, AlertTriangle, Moon, Wallet, FileText, Coins, ShieldCheck
} from "lucide-react";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

// --- 1. METADATA DINÂMICA ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Horas Simples 2026 (Grátis) | Entrada e Saída";
  const description = "Calcule suas horas trabalhadas informando apenas entrada, saída e intervalo em 10 segundos. Simples, rápido e gratuito para 2026.";

  return {
    title,
    description,
    keywords: ["calculadora de horas simples", "entrada e saída calculo", "somar jornada de trabalho", "horas líquidas"],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/horas-simples" },
    openGraph: {
      title: "Calculadora de Horas Simples 2026 | Entrada e Saída",
      description: "Calcule suas horas trabalhadas informando apenas entrada, saída e intervalo em segundos. Simples, rápido e gratuito.",
      url: "https://mestredascontas.com.br/trabalhista/horas-simples",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Horas Simples Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cálculo rápido de jornada de trabalho",
      description: "Informe a entrada e saída e saiba quanto tempo você trabalhou hoje.",
      images: ["/opengraph-image"],
    }
  };
}


export default async function HorasSimplesPage() {

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
        
        {/* REVISÃO LEGAL (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Informações baseadas na Consolidação das Leis do Trabalho (CLT) e atualizações vigentes em 2026.</span>
        </div>

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
                  <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                    <WorkHoursCalculator />
                  </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* NAVEGAÇÃO FINAL */}
        <SmartCrossLinker currentHref="/trabalhista/horas-simples" category="trabalhista" />

      </div>
    </article>
  );
}
