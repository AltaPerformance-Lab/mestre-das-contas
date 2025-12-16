import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PercentageCalculator from "@/components/calculators/PercentageCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  Percent, HelpCircle, BookOpen, Calculator, 
  TrendingUp, CheckCircle2, ArrowRight,
  ShoppingCart, PieChart, GraduationCap, Wallet
} from "lucide-react";

export const metadata: Metadata = {
  title: "Calculadora de Porcentagem Online | Simples e Rápida",
  description: "Calcule porcentagem de um valor, aumento, desconto e variação percentual. Ferramenta gratuita para cálculos financeiros e matemáticos do dia a dia.",
  keywords: ["calculadora porcentagem", "como calcular porcentagem", "quanto é 30% de", "calcular desconto", "calcular aumento percentual", "regra de tres porcentagem"],
  alternates: { canonical: "https://mestredascontas.com.br/financeiro/porcentagem" },
  openGraph: {
    title: "Calculadora de Porcentagem 4 em 1 - Mestre das Contas",
    description: "Resolva qualquer conta de % em segundos. Aumentos, descontos e regra de três.",
    url: "https://mestredascontas.com.br/financeiro/porcentagem",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-porcentagem.png", width: 1200, height: 630, alt: "Calculadora de Porcentagem" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Porcentagem",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta utilitária para realizar 4 tipos de cálculos percentuais: parte de um todo, proporção, aumento e desconto."
    },
    {
      "@type": "HowTo",
      "name": "Como calcular porcentagem na calculadora",
      "step": [
        { "@type": "HowToStep", "text": "Para saber X% de Y, multiplique Y por X e divida por 100." },
        { "@type": "HowToStep", "text": "Para saber quantos % X representa de Y, divida X por Y e multiplique por 100." }
      ]
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function PorcentagemPage({ searchParams }: Props) {
  await searchParams;
  
  return (
    <article className="flex flex-col gap-8 w-full max-w-full overflow-hidden px-4 sm:px-6 py-6 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="space-y-4 text-center md:text-left print:hidden max-w-4xl mx-auto md:mx-0">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-200">
          <Calculator size={14} /> Matemática Financeira
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Calculadora de <span className="text-indigo-600">Porcentagem</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          Resolva qualquer dúvida matemática em segundos. Calcule descontos de lojas, aumentos de salário, variação de preços e muito mais com nossa ferramenta 4 em 1.
        </p>
      </header>

      <div className="w-full flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 my-4 print:hidden">
         <AdUnit slot="percent_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Carregando Calculadora...</div>}>
           <PercentageCalculator />
        </Suspense>
        <div className="mt-8 print:hidden"><DisclaimerBox /></div>
      </section>

      <div className="w-full flex justify-center my-6 print:hidden"><AdUnit slot="percent_mid" format="auto" /></div>

      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-indigo-600 pl-4">
            Como funciona a Porcentagem?
        </h2>
        <p className="lead text-slate-700 text-lg">
          A porcentagem é uma forma de expressar um número como uma fração de 100. O símbolo "%" significa literalmente "por cento", ou seja, "dividido por 100".
        </p>
        <p>
          Ela é a base de toda a matemática financeira moderna, usada para definir juros, descontos, impostos e estatísticas.
        </p>

        {/* CARDS COM FÓRMULAS */}
        <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
            <GraduationCap className="text-indigo-600" /> Fórmulas Práticas
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 not-prose mb-10">
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200 shadow-sm">
                <h4 className="font-bold text-indigo-900 mb-2 text-lg">1. Quanto é X% de Y?</h4>
                <p className="text-sm text-slate-600 mb-4">
                    Para descobrir uma parte de um total. Ex: Quanto é 20% de R$ 500?
                </p>
                <div className="bg-white p-3 rounded font-mono text-center text-indigo-600 border border-indigo-100 font-bold">
                    (Valor ÷ 100) × Porcentagem
                </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2 text-lg">2. X é quantos % de Y?</h4>
                <p className="text-sm text-slate-600 mb-4">
                    Para descobrir o peso de um valor sobre o total. Ex: 50 é quantos % de 200?
                </p>
                <div className="bg-white p-3 rounded font-mono text-center text-slate-700 border border-slate-200 font-bold">
                    (Parte ÷ Total) × 100
                </div>
            </div>
        </div>

        {/* EXEMPLOS DO DIA A DIA */}
        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2">
            <ShoppingCart className="text-green-600" /> Exemplos no Dia a Dia
        </h3>
        
        <ul className="space-y-4 not-prose mb-10">
            <li className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1"><TrendingUp size={20}/></div>
                <div>
                    <strong className="text-slate-900 block">Aumento de Salário</strong>
                    <span className="text-slate-600 text-sm">Se você ganha R$ 2.000 e recebe 10% de aumento, a conta é: 2000 + (2000 × 0.10) = R$ 2.200.</span>
                </div>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                <div className="bg-red-100 p-2 rounded-full text-red-600 mt-1"><Percent size={20}/></div>
                <div>
                    <strong className="text-slate-900 block">Desconto em Loja</strong>
                    <span className="text-slate-600 text-sm">Uma camisa de R$ 100 com 30% de desconto sai por: 100 - (100 × 0.30) = R$ 70.</span>
                </div>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1"><PieChart size={20}/></div>
                <div>
                    <strong className="text-slate-900 block">Gorjeta do Garçom (10%)</strong>
                    <span className="text-slate-600 text-sm">Se a conta deu R$ 150, os 10% são R$ 15. Total a pagar: R$ 165.</span>
                </div>
            </li>
        </ul>

        {/* FAQ */}
        <div className="mt-12 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" /> Dúvidas Frequentes
          </h3>
          <div className="space-y-4">
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Como calcular porcentagem na calculadora comum?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Digite o valor principal, aperte o sinal de multiplicação (x), digite a porcentagem e aperte a tecla (%). Depois aperte igual (=). Ex: 500 x 10 % = 50.
              </p>
            </details>
            
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                O que é variação percentual?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                É a diferença entre um valor antigo e um novo, expressa em porcentagem. Fórmula: ((Valor Novo - Valor Antigo) ÷ Valor Antigo) × 100.
              </p>
            </details>
          </div>
        </div>

        {/* NAVEGAÇÃO FINAL */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
          <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
             <CheckCircle2 size={16} className="text-green-500"/> Outras Ferramentas:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/financeiro/juros-compostos" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group">
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600"><TrendingUp size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Juros Compostos</span>
                <span className="text-sm text-slate-500 mt-1">Investimentos</span>
            </Link>
            <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600"><Wallet size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                <span className="text-sm text-slate-500 mt-1">Descontos mensais</span>
            </Link>
            <Link href="/financeiro/financiamento" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-md transition-all group">
                <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-indigo-600"><Calculator size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Financiamento</span>
                <span className="text-sm text-slate-500 mt-1">Simular parcelas</span>
            </Link>
          </div>
        </div>

      </div>

      <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
          <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
          <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
      </div>

    </article>
  );
}