import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import OvertimeCalculator from "@/components/calculators/OvertimeCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  Clock, HelpCircle, History, BookOpen, 
  TriangleAlert, CheckCircle2, Coins, Calculator, 
  Wallet, FileText, Sun, Moon, CalendarDays
} from "lucide-react";

// --- 1. METADATA (SEO DE ALTA CONVERSÃO) ---
export const metadata: Metadata = {
  title: "Calculadora de Horas Extras 2025 | Com Reflexo no DSR (50% e 100%)",
  description: "Trabalhou a mais? Calcule o valor exato das suas horas extras (50% e 100%) e o reflexo no Descanso Semanal Remunerado (DSR). Simulador atualizado CLT.",
  keywords: [
    "calculadora horas extras", 
    "calcular hora extra 50 e 100", 
    "reflexo dsr horas extras", 
    "valor hora de trabalho", 
    "cálculo hora extra sábado", 
    "hora extra noturna",
    "divisor 220 ou 180"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/trabalhista/horas-extras" },
  openGraph: {
    title: "Calculadora de Horas Extras + DSR - Mestre das Contas",
    description: "Não deixe dinheiro na mesa. Descubra quanto vale o seu tempo extra trabalhado.",
    url: "https://mestredascontas.com.br/trabalhista/horas-extras",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-horas-extras.png", width: 1200, height: 630, alt: "Simulador de Horas Extras" }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Horas Extras",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para cálculo de horas suplementares com adicional de 50%, 100% e reflexo no repouso remunerado."
    },
    {
      "@type": "Article",
      "headline": "Guia Completo das Horas Extras: Direitos e Cálculos",
      "description": "Entenda como funciona o adicional de horas extras, a diferença entre dias úteis e feriados e o impacto no DSR.",
      "datePublished": "2024-03-05",
      "dateModified": "2025-01-20",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/logo.png" } }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Quanto vale a hora extra de sábado?", "acceptedAnswer": { "@type": "Answer", "text": "Se o sábado for considerado dia útil na sua empresa (compensado), vale 50%. Se for feriado ou descanso trabalhado sem folga, vale 100%." } },
        { "@type": "Question", "name": "O que é DSR sobre horas extras?", "acceptedAnswer": { "@type": "Answer", "text": "É o Descanso Semanal Remunerado. Como você trabalhou a mais, tem direito a receber também um valor proporcional referente ao seu dia de folga." } },
        { "@type": "Question", "name": "Qual o limite de horas extras por dia?", "acceptedAnswer": { "@type": "Answer", "text": "Pela CLT, o limite máximo é de 2 horas extras por dia." } }
      ]
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function HorasExtrasPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-white p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
                    <OvertimeCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredascontas.com.br/trabalhista/horas-extras" target="_blank" className="text-[10px] text-slate-400 hover:text-purple-600 uppercase font-bold tracking-wider">
                        Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  return (
    <article className="flex flex-col gap-8 w-full max-w-full overflow-hidden px-4 sm:px-6 py-6 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <header className="space-y-4 text-center md:text-left print:hidden max-w-4xl mx-auto md:mx-0">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-purple-100 text-purple-800 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-purple-200">
          <Clock size={14} /> Jornada de Trabalho
        </span>
        
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
          Calculadora de <span className="text-purple-600">Horas Extras</span>
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          Você sabe quanto vale o seu tempo? Simule o valor das horas normais (50%), feriados (100%) e não esqueça do <strong>Reflexo no DSR</strong>, o "bônus" que muitos esquecem.
        </p>
      </header>

      {/* ANÚNCIO TOPO */}
      <div className="w-full max-w-full overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 my-4 print:hidden">
         <AdUnit slot="horas_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      {/* FERRAMENTA */}
      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Carregando Calculadora...</div>}>
           <OvertimeCalculator />
        </Suspense>
        <div className="mt-8 print:hidden">
            <DisclaimerBox />
        </div>
      </section>

      {/* ANÚNCIO MEIO */}
      <div className="w-full flex justify-center my-6 print:hidden">
        <AdUnit slot="horas_mid" format="auto" />
      </div>

      {/* --- CONTEÚDO EDUCACIONAL --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-purple-600 pl-4">
            Como calcular o valor da sua hora?
        </h2>
        <p className="lead text-slate-700 text-lg">
          Para saber quanto vale uma hora extra, primeiro precisamos descobrir quanto vale sua <strong>hora normal</strong>. 
          A maioria dos trabalhadores brasileiros tem uma jornada mensal de <strong>220 horas</strong> (44h semanais).
        </p>
        <p>
          A matemática básica é: <code>Salário ÷ 220 = Valor da Hora Normal</code>. A partir daí, aplicamos os adicionais previstos na Constituição.
        </p>

        {/* CARDS VISUAIS DE ADICIONAIS */}
        <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10"><Sun size={80} className="text-orange-600"/></div>
                <h3 className="font-bold text-orange-800 mb-2 text-lg relative z-10 flex items-center gap-2"><Sun size={20}/> Adicional de 50%</h3>
                <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                    Aplicado para horas trabalhadas além da jornada em <strong>dias úteis</strong> (segunda a sábado, geralmente).<br/>
                    <strong>Cálculo:</strong> Hora Normal × 1,5.
                </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10"><CalendarDays size={80} className="text-indigo-600"/></div>
                <h3 className="font-bold text-indigo-800 mb-2 text-lg relative z-10 flex items-center gap-2"><CalendarDays size={20}/> Adicional de 100%</h3>
                <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                    Aplicado para horas trabalhadas em <strong>domingos e feriados</strong> (quando não há folga compensatória).<br/>
                    <strong>Cálculo:</strong> Hora Normal × 2.
                </p>
            </div>
        </div>

        {/* O VILÃO ESQUECIDO: DSR */}
        <div className="bg-blue-50/60 p-6 md:p-8 rounded-2xl border border-blue-100 my-10 not-prose relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Coins size={140} className="text-blue-900"/>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2 relative z-10">
                <Wallet size={24} className="text-blue-600"/> O "Bônus Oculto": Reflexo no DSR
            </h3>
            <div className="space-y-4 text-slate-700 relative z-10 text-sm md:text-base leading-relaxed">
                <p>
                    Muita gente esquece, mas as horas extras geram um "filho": o reflexo no <strong>Descanso Semanal Remunerado (DSR)</strong>.
                </p>
                <p>
                    A lógica é justa: se você trabalhou mais durante a semana, seu dia de descanso (que é remunerado) deve valer mais também.
                </p>
                <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm mt-4">
                    <p className="font-mono text-xs md:text-sm text-blue-800 text-center font-bold">
                        (Total Horas Extras R$ ÷ Dias Úteis) × Domingos/Feriados
                    </p>
                </div>
                <p>
                    Por exemplo: Em um mês com 25 dias úteis e 5 domingos, o DSR acrescenta cerca de <strong>20%</strong> a mais no valor total das suas horas extras. Nossa calculadora faz essa conta automaticamente.
                </p>
            </div>
        </div>

        {/* CURIOSIDADE HISTÓRICA */}
        <div className="mt-12 mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <History className="text-slate-500" /> A Conquista de 1988
            </h3>
            <p className="text-slate-600">
                Antes da Constituição de 1988, a jornada de trabalho padrão no Brasil era de <strong>48 horas semanais</strong>, e o adicional de hora extra era de apenas <strong>20%</strong>.
            </p>
            <p className="text-slate-600">
                A Constituição Cidadã foi um marco: reduziu a jornada para 44h e aumentou o adicional mínimo para <strong>50%</strong>, encarecendo o trabalho extraordinário para desestimular a exaustão do trabalhador e incentivar novas contratações.
            </p>
        </div>

        {/* NOTA DE ALERTA: BANCO DE HORAS */}
        <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400 not-prose flex gap-3 mb-10">
            <TriangleAlert className="text-amber-500 shrink-0" size={20}/>
            <div>
                <h4 className="font-bold text-amber-900 text-sm">Atenção: Banco de Horas</h4>
                <p className="text-sm text-amber-800/80 mt-1">
                    Se sua empresa possui acordo de Banco de Horas, ela não é obrigada a pagar as horas extras em dinheiro no mês. Elas podem ser acumuladas para serem trocadas por folgas futuras. Verifique seu contrato!
                </p>
            </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" /> Dúvidas Frequentes
          </h3>
          <div className="space-y-4">
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Hora extra entra no cálculo de férias e 13º?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                <strong>Sim!</strong> As horas extras habituais integram a sua remuneração para todos os efeitos: férias, 13º salário, aviso prévio e depósito do FGTS. É o que chamamos de "média de horas extras".
              </p>
            </details>
            
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Quantas horas extras posso fazer por dia?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Pela CLT (Art. 59), o limite máximo é de <strong>2 horas suplementares por dia</strong>. Exceções só em casos de necessidade imperiosa ou força maior.
              </p>
            </details>

            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                O que é hora noturna reduzida?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Quem trabalha entre 22h e 5h tem a hora computada como <strong>52 minutos e 30 segundos</strong> (não 60 minutos). Além disso, recebe um adicional noturno de no mínimo 20%. Isso faz com que a hora extra noturna seja a mais cara de todas.
              </p>
            </details>
          </div>
        </div>

        {/* NAVEGAÇÃO FINAL */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
          <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
             <CheckCircle2 size={16} className="text-green-500"/> Calcule outros direitos:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group">
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600"><Coins size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                <span className="text-sm text-slate-500 mt-1">Veja os descontos</span>
            </Link>
            <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600"><Wallet size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Rescisão CLT</span>
                <span className="text-sm text-slate-500 mt-1">Cálculo de saída</span>
            </Link>
            <Link href="/trabalhista/decimo-terceiro" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-purple-400 hover:shadow-md transition-all group">
                <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-purple-600"><FileText size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">13º Salário</span>
                <span className="text-sm text-slate-500 mt-1">1ª e 2ª parcelas</span>
            </Link>
          </div>
        </div>

      </div>

      {/* RODAPÉ IMPRESSÃO */}
      <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
          <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
          <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
      </div>

    </article>
  );
}