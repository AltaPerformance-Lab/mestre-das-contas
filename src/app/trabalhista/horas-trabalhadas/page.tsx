import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import TimeCalculator from "@/components/calculators/TimeCalculator";

import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Clock, HelpCircle, History, BookOpen, Calculator,
  Wallet, FileText, Scale, Landmark, ExternalLink, Timer, 
  CheckCircle2, AlertTriangle, Moon, Coins, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Horas Trabalhadas 2026 (Grátis) | Somar Ponto Online";
  const description = "Some suas horas trabalhadas no dia em segundos. Ferramenta gratuita para calcular entrada, saída, almoço e saldo de banco de horas. Simples e Online.";

  return {
    title,
    description,
    keywords: ["calculadora de horas trabalhadas", "somar horas e minutos", "calculo de ponto online", "diferença de horas", "controle de ponto gratis"],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/horas-trabalhadas" },
    openGraph: {
      title: "Calculadora de Horas Trabalhadas 2026 | Somar Ponto Online",
      description: "Some suas horas trabalhadas no dia em segundos. Ferramenta gratuita para calcular entrada, saída, almoço e saldo de banco de horas. Simples e preciso.",
      url: "https://mestredascontas.com.br/trabalhista/horas-trabalhadas",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Horas Trabalhadas Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Não erre mais na soma das suas horas!",
      description: "Calcule seu saldo de banco de horas e evite descontos indevidos no salário.",
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true } };
}

// --- LISTA FAQ (DRY Content) ---
const faqList = [
    { q: "Qual a tolerância de atraso no ponto?", a: "Pela CLT (Art. 58), existe uma tolerância de 5 a 10 minutos diários (para mais ou para menos) que não são descontados nem pagos como extra. Acima disso, conta-se tudo." },
    { q: "Como calcular horas noturnas?", a: "A hora noturna (22h às 5h) é reduzida. Cada 52 minutos e 30 segundos trabalhados contam como 1 hora cheia. Nossa calculadora foca na soma simples, mas lembre-se desse fator." },
    { q: "O intervalo de almoço conta como hora trabalhada?", a: "Não. O intervalo intrajornada (almoço) não é remunerado e não conta na soma das horas trabalhadas, apenas o tempo efetivo de serviço." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Horas Trabalhadas",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para somar horas de trabalho, calcular intervalos e saldo de banco de horas."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Horas Trabalhadas e Ponto Online",
      "description": "Aprenda a somar suas horas diárias e controlar seu banco de horas com nossa calculadora de ponto.",
      "totalTime": "PT30S",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Insira os Horários de Entrada e Saída",
          "text": "Digite o horário de início (Entrada 1) e o horário de fim da primeira jornada (Saída 1/Almoço).",
          "url": "https://mestredascontas.com.br/trabalhista/horas-trabalhadas#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Informe o Período da Tarde/Retorno",
          "text": "Digite o horário de volta do intervalo (Entrada 2) e a saída no fim do expediente (Saída 2).",
          "url": "https://mestredascontas.com.br/trabalhista/horas-trabalhadas#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Adicione Turnos ou Defina a Jornada",
          "text": "Se tiver turnos extras, clique em '+ Adicionar Turno'. Digite sua jornada contratual para ver o saldo diário de horas extras ou negativas.",
          "url": "https://mestredascontas.com.br/trabalhista/horas-trabalhadas#ferramenta"
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Como controlar seu Banco de Horas e evitar descontos",
      "description": "Guia prático sobre controle de jornada, tolerância de atrasos e cálculo de horas extras.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-03-10",
      "dateModified": new Date().toISOString()
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


export default async function HorasPage() {
  // --- MODO PÁGINA NORMAL ---
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Horas Trabalhadas"
          description="Controle seu ponto sem complicação. Some os horários de entrada e saída, desconte o almoço e descubra seu saldo diário de Banco de Horas."
          category="Produtividade & Trabalho"
          icon={<Timer size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="indigo"
          badge="Ferramenta Gratuita"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Horas Trabalhadas" }
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
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex gap-3 items-start text-left max-w-3xl mx-auto w-full shadow-sm">
          <AlertTriangle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide">Regra dos 10 Minutos</p>
            <p className="text-sm text-amber-800/90 dark:text-amber-300 leading-relaxed">
              Pela CLT, atrasos ou horas extras de até <strong>10 minutos diários</strong> (5 na entrada, 5 na saída) não são contabilizados. Passou disso, conta tudo!
            </p>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-indigo-50/30 dark:bg-slate-900/50 rounded-lg border border-dashed border-indigo-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="ponto_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-indigo-100 dark:border-slate-800 shadow-xl shadow-indigo-100/50 dark:shadow-none p-1 md:p-2">
                  <PrivacyBadge />
                  <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                    <TimeCalculator />
                  </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="ponto_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2 mb-4 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
                Como Usar a Calculadora de Horas Trabalhadas (Passo a Passo)
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
               Some suas horas diárias e saiba seu saldo de banco de horas em 3 passos:
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">1</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Entrada e Almoço</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Informe o horário de entrada (Entrada 1) e o horário em que saiu para o almoço (Saída 1).</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">2</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Retorno e Fim do Dia</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Informe o horário em que voltou do almoço (Entrada 2) e o encerramento do seu dia (Saída 2).</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">3</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Jornada e Saldo</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Defina sua jornada de trabalho regular (ex: 8h) para ver o saldo diário de horas positivas ou negativas.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
               Como controlar o Banco de Horas?
            </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Somar horas não é como somar dinheiro. O sistema de tempo é sexagesimal (base 60), o que confunde muita gente. Se você somar 8,50 + 8,50 na calculadora comum, dá 17,00. Mas em horas, 8h50 + 8h50 são 17h40!
          </p>
          <p>
            Essa confusão gera erros graves no apontamento do cartão de ponto, resultando em descontos indevidos no salário ou horas extras não pagas.
          </p>

          <div className="my-10 bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-800 not-prose">
              <h3 className="text-xl font-bold text-purple-900 dark:text-purple-300 mb-4 flex items-center gap-2">
                  <Moon className="text-purple-600 dark:text-purple-400" /> A Hora Noturna é Diferente
              </h3>
              <p className="text-purple-800 dark:text-purple-300 text-sm mb-4">
                  Quem trabalha entre <strong>22h e 5h</strong> tem um "superpoder" legal: a hora passa mais rápido.
              </p>
              <ul className="space-y-3 text-sm text-purple-900 dark:text-purple-300 bg-white dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800/50 shadow-sm">
                  <li className="flex gap-2 font-bold"><Clock size={18}/> 1 hora relógio = 60 minutos</li>
                  <li className="flex gap-2 font-bold"><Moon size={18}/> 1 hora noturna = 52 minutos e 30 segundos</li>
              </ul>
              <p className="mt-4 text-xs text-purple-700 dark:text-purple-400 font-medium">
                  Isso significa que 7 horas de relógio trabalhadas à noite equivalem a 8 horas de pagamento + Adicional Noturno (mínimo 20%).
              </p>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <Scale className="text-blue-600 dark:text-blue-400" /> Direitos Básicos do Ponto
          </h3>
          <ul className="space-y-3 not-prose mb-8">
              <li className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm hover:border-indigo-100 dark:hover:border-indigo-900 transition-colors">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300 text-sm"><strong>Intervalo Intrajornada:</strong> Quem trabalha mais de 6h tem direito a no mínimo 1h de almoço.</span>
              </li>
              <li className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm hover:border-indigo-100 dark:hover:border-indigo-900 transition-colors">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300 text-sm"><strong>Intervalo Interjornada:</strong> Entre um dia de trabalho e outro, deve haver um descanso mínimo de 11 horas.</span>
              </li>
              <li className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm hover:border-indigo-100 dark:hover:border-indigo-900 transition-colors">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300 text-sm"><strong>Limite de Extras:</strong> Máximo de 2 horas extras por dia (salvo regime 12x36 ou força maior).</span>
              </li>
          </ul>

          {/* FAQ ACORDION */}
          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-indigo-600 dark:text-indigo-400" /> Dúvidas Frequentes
            </h3>
            
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-indigo-100 dark:open:ring-indigo-900/30 transition-all">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-indigo-500 dark:text-indigo-400 font-bold text-xs mt-1">#</span>
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

          {/* REFERÊNCIAS OFICIAIS */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Base Legal (CLT)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Saiba onde estão seus direitos:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      CLT - Artigo 58 (Jornada) <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      CLT - Artigo 71 (Intervalos) <ExternalLink size={10}/>
                  </a>
              </div>
          </div>
          
          <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </div>

        <SmartCrossLinker currentHref="/trabalhista/horas-trabalhadas" category="trabalhista" />

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="ponto_bottom" format="horizontal" variant="software" />
        </div>

        {/* RODAPÉ IMPRESSÃO */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}