import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import WorkHoursCalculator from "@/components/calculators/WorkHoursCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Clock, Timer, CheckCircle2, AlertTriangle, Moon, Wallet, FileText, Coins, ShieldCheck, HelpCircle, Calculator
} from "lucide-react";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Horas Simples 2026 (Grátis) | Entrada e Saída";
  const description = "Precisa converter horas para decimal ou somar minutos trabalhados? Faça cálculos de horas de forma simples e rápida com nossa calculadora grátis!";

  return {
    title,
    description,
    keywords: ["calculadora de horas simples", "entrada e saída calculo", "somar jornada de trabalho", "horas líquidas"],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/horas-simples" },
    openGraph: {
      title,
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
      images: ["/opengraph-image"],
    }
  };
}

const faqList = [
  { 
    q: "Qual a diferença entre a Calculadora de Horas Simples e a Completa?", 
    a: "A calculadora simples é ideal para quando você sabe apenas a quantidade total acumulada de minutos do seu almoço (ex: 1 hora de almoço direta). A calculadora completa de cartão de ponto exige os horários exatos individuais de saída e retorno do intervalo de almoço." 
  },
  { 
    q: "Como funciona a tolerância de atraso de 10 minutos na CLT?", 
    a: "Conforme o Artigo 58 da CLT, variações diárias no registro de ponto que não excedam o limite máximo absoluto de 10 minutos diários (respeitando até 5 minutos por marcação) não são computadas como horas extras e nem passíveis de descontos salariais." 
  },
  { 
    q: "Como converter minutos de trabalho em horas decimais?", 
    a: "Basta dividir a quantidade de minutos por 60 e somar às horas inteiras correspondentes. Por exemplo, uma jornada de 7h30 representa 30 dividido por 60 (0,5), totalizando exatamente 7,5 horas decimais." 
  },
  {
    q: "A jornada diária padrão permitida pela CLT é de quantas horas?",
    a: "A jornada máxima regular estabelecida pela Constituição e pela CLT é de até 8 horas por dia e limite máximo de 44 horas semanais, excetuando regimes específicos previstos em acordo coletivo."
  },
  {
    q: "Como calcular o valor a receber com base nas horas simples trabalhadas?",
    a: "Converta a sua jornada final líquida para o formato decimal e multiplique o resultado direto pelo seu valor de salário-hora bruto contratual."
  },
  {
    q: "O tempo de intervalo de almoço conta como tempo de trabalho na jornada?",
    a: "Não. O período destinado a refeição e repouso (intervalo intrajornada) não constitui tempo de serviço efetivo à disposição do empregador, sendo obrigatoriamente excluído e descontado da soma de horas trabalhadas."
  },
  {
    q: "Qual o intervalo de descanso obrigatório para quem trabalha menos de 6 horas?",
    a: "Para jornadas diárias de trabalho que possuam duração entre 4 e 6 horas corridas, a CLT determina a concessão obrigatória de um intervalo mínimo de repouso de 15 minutos."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Horas Simples",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Calculadora online rápida para calcular horas trabalhadas com entrada, saída e intervalo simples."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Horas Trabalhadas Simples",
      "description": "Aprenda a somar a sua jornada laboral rapidamente definindo entrada, saída e intervalo total.",
      "totalTime": "PT15S",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Defina o Horário de Entrada",
          "text": "Digite o horário em que você começou a trabalhar (ex: 08:00).",
          "url": "https://mestredascontas.com.br/trabalhista/horas-simples#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Defina o Horário de Saída",
          "text": "Digite o horário em que você encerrou o expediente (ex: 17:00).",
          "url": "https://mestredascontas.com.br/trabalhista/horas-simples#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Informe o Intervalo",
          "text": "Digite o tempo total de descanso em minutos ou horas (ex: 01:00 para 1 hora de almoço). O total líquido aparecerá em tempo real.",
          "url": "https://mestredascontas.com.br/trabalhista/horas-simples#ferramenta"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    }
  ]
};

export default async function HorasSimplesPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Horas Simples"
          description="Cálculo rápido de jornada de trabalho. Informando apenas a entrada, saída e o tempo total de intervalo."
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
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 flex gap-3 items-start text-left max-w-3xl mx-auto w-full shadow-sm">
          <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide">Fique Atento</p>
            <p className="text-sm text-amber-800/90 dark:text-amber-300 leading-relaxed">
              Esta calculadora usa o tempo total de intervalo (ex: 1 hora) em vez dos horários exatos de saída e retorno do almoço. Para um cálculo mais detalhado de ponto diário completo, use a nossa <Link href="/trabalhista/horas-trabalhadas" className="underline font-bold hover:text-amber-950 dark:text-amber-400">Calculadora de Ponto Completa</Link>.
            </p>
          </div>
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-cyan-100 dark:border-slate-800 shadow-xl shadow-cyan-100/50 dark:shadow-none p-1 md:p-2">
                  <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                    <WorkHoursCalculator />
                  </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2 mb-4 flex items-center gap-2 border-l-4 border-cyan-500 pl-4">
                Como Usar a Calculadora de Horas Simples (Passo a Passo)
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
               Descubra sua jornada líquida em menos de 10 segundos: Nós criamos essa ferramenta para simplificar a sua rotina!
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 font-bold flex items-center justify-center shrink-0">1</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Entrada</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Preencha a hora em que você iniciou sua atividade (ex: <code>08:00</code>).</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 font-bold flex items-center justify-center shrink-0">2</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Saída</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Preencha a hora em que você encerrou o expediente ou atividade (ex: <code>17:00</code>).</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 font-bold flex items-center justify-center shrink-0">3</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Intervalo total</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Insira a duração total do seu intervalo (ex: <code>01:00</code> para uma hora de almoço) para ver o total líquido calculado instantaneamente.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-cyan-500 pl-4">
               Cálculo de Jornada Simplificada
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
               Muitas vezes, a única coisa que você quer saber ao fim do dia é o saldo final líquido de horas cumpridas, sem precisar digitar os minutos exatos de quando bateu o ponto de ida e volta do almoço. A verdade é que o dia a dia corrido pede soluções práticas.
            </p>
            <p>
               Para isso, a nossa **Calculadora de Horas Simples** é perfeita. Você insere a Entrada Geral, a Saída Geral e o valor estático do intervalo contratual. O <GlossaryTerm slug="sistema-sexagesimal-soma-horas">sistema sexagesimal</GlossaryTerm> de tempo calcula os minutos e horas com perfeição absoluta, subtraindo o intervalo e exibindo as horas líquidas no formato tradicional e também decimal.
            </p>

            {/* TABELA DE COMPARAÇÃO DE MINUTOS E HORAS DECIMAIS (HTML PURO RESPONSIVO) */}
            <div className="not-prose my-10 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-bold text-slate-750 dark:text-slate-250 uppercase tracking-wide flex items-center gap-2">
                        <Calculator size={16} /> Conversão Rápida de Minutos em Horas Decimais
                    </h4>
                </div>
                
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-sm text-left border-collapse min-w-[500px]">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Minutos Regulares</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Fórmula de Conversão</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Horas Decimais Resultantes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-sans font-bold">5 Minutos</td>
                                <td className="px-6 py-4">5 / 60</td>
                                <td className="px-6 py-4 text-center font-bold text-cyan-600">0,08h</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-sans font-bold">15 Minutos</td>
                                <td className="px-6 py-4">15 / 60</td>
                                <td className="px-6 py-4 text-center font-bold text-cyan-600">0,25h</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-sans font-bold">30 Minutos</td>
                                <td className="px-6 py-4">30 / 60</td>
                                <td className="px-6 py-4 text-center font-bold text-cyan-600">0,50h</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-sans font-bold">45 Minutos</td>
                                <td className="px-6 py-4">45 / 60</td>
                                <td className="px-6 py-4 text-center font-bold text-cyan-600">0,75h</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-sans font-bold">60 Minutos</td>
                                <td className="px-6 py-4">60 / 60</td>
                                <td className="px-6 py-4 text-center font-bold text-cyan-600">1,00h</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
                <Clock className="text-cyan-600 dark:text-cyan-400" /> A Importância do Cálculo Correto de Intervalo
            </h3>
            <p>
               Segundo a CLT (Consolidação das Leis do Trabalho), jornadas acima de 6 horas exigem obrigatoriamente um intervalo para refeição e descanso de no mínimo 1 hora e no máximo 2 horas. Esse tempo não entra no cálculo das horas trabalhadas, sendo descontado da jornada diária bruta de maneira automática. O melhor de tudo? Nós descomplicamos essa matemática para você!
            </p>

            {/* FAQ ACCORDION */}
            <div className="mt-16 not-prose">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <HelpCircle className="text-cyan-600 dark:text-cyan-400" /> Dúvidas Frequentes
              </h3>
              
              <div className="space-y-4">
                {faqList.map((item, idx) => (
                    <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-cyan-100 dark:open:ring-cyan-900/30 transition-all">
                        <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            <div className="flex items-start gap-3">
                                <span className="text-cyan-500 dark:text-cyan-400 font-bold text-xs mt-1">#</span>
                                <span className="leading-snug">{item.q}</span>
                            </div>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm animate-in fade-in">
                            {item.a}
                        </p>
                    </details>
                ))}
              </div>
            </div>
            
            <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </div>

        <SmartGlossaryLinker currentHref="/trabalhista/horas-simples" />
        {/* NAVEGAÇÃO FINAL */}
        <SmartCrossLinker currentHref="/trabalhista/horas-simples" category="trabalhista" />

      </div>
    </article>
  );
}
