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
  CheckCircle2, AlertTriangle, Moon, Coins
} from "lucide-react";

// --- 1. METADATA DE ALTA PERFORMANCE (SEO) ---
export const metadata: Metadata = {
  title: "Calculadora de Horas Trabalhadas Online | Somar Ponto e Banco de Horas",
  description: "Some suas horas trabalhadas no dia. Ferramenta gratuita para calcular entrada, saída, almoço e saldo de banco de horas (horas extras ou atrasos).",
  keywords: [
    "calculadora de horas trabalhadas", 
    "somar horas e minutos", 
    "calculo de ponto online", 
    "calcular banco de horas excel", 
    "diferença de horas", 
    "controle de ponto gratis"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/trabalhista/horas-trabalhadas" },
  openGraph: {
    title: "Calculadora de Horas Trabalhadas - Mestre das Contas",
    description: "Controle seu ponto diário. Saiba se você fez horas extras ou ficou devendo.",
    url: "https://mestredascontas.com.br/trabalhista/horas-trabalhadas",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Calculadora de Ponto" }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

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
      "description": "Ferramenta para somar horas de trabalho, calcular intervalos e saldo de banco de horas.",
      "aggregateRating": { 
        "@type": "AggregateRating", 
        "ratingValue": "4.8", 
        "ratingCount": "7890", 
        "bestRating": "5", 
        "worstRating": "1" 
      }
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

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function HorasPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-indigo-50/30 p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-indigo-400">Carregando Calculadora...</div>}>
                    <TimeCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-indigo-200 pt-3">
                    <Link href="https://mestredascontas.com.br/trabalhista/horas-trabalhadas" target="_blank" className="text-[10px] text-indigo-500 hover:text-indigo-700 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Clock size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

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
          rating={4.8}
          reviews={7890}
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Horas Trabalhadas" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ALERTA DE TOLERÂNCIA */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start text-left max-w-3xl mx-auto w-full shadow-sm">
          <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 uppercase tracking-wide">Regra dos 10 Minutos</p>
            <p className="text-sm text-amber-800/90 leading-relaxed">
              Pela CLT, atrasos ou horas extras de até <strong>10 minutos diários</strong> (5 na entrada, 5 na saída) não são contabilizados. Passou disso, conta tudo!
            </p>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-indigo-50/30 rounded-lg border border-dashed border-indigo-200/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="ponto_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/50 p-1 md:p-2">
              <Suspense fallback={
                <div className="h-96 w-full bg-indigo-50 rounded-2xl animate-pulse flex items-center justify-center text-indigo-300 border border-indigo-100">
                    <div className="flex flex-col items-center gap-2">
                        <Timer className="animate-bounce" size={32}/>
                        <span>Carregando Calculadora...</span>
                    </div>
                </div>
              }>
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
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
              Como controlar o Banco de Horas?
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            Somar horas não é como somar dinheiro. O sistema de tempo é sexagesimal (base 60), o que confunde muita gente. Se você somar 8,50 + 8,50 na calculadora comum, dá 17,00. Mas em horas, 8h50 + 8h50 são 17h40!
          </p>
          <p>
            Essa confusão gera erros graves no apontamento do cartão de ponto, resultando em descontos indevidos no salário ou horas extras não pagas.
          </p>

          <div className="my-10 bg-purple-50 p-6 rounded-xl border border-purple-100 not-prose">
              <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <Moon className="text-purple-600" /> A Hora Noturna é Diferente
              </h3>
              <p className="text-purple-800 text-sm mb-4">
                  Quem trabalha entre <strong>22h e 5h</strong> tem um "superpoder" legal: a hora passa mais rápido.
              </p>
              <ul className="space-y-3 text-sm text-purple-900 bg-white p-4 rounded-lg border border-purple-200 shadow-sm">
                  <li className="flex gap-2 font-bold"><Clock size={18}/> 1 hora relógio = 60 minutos</li>
                  <li className="flex gap-2 font-bold"><Moon size={18}/> 1 hora noturna = 52 minutos e 30 segundos</li>
              </ul>
              <p className="mt-4 text-xs text-purple-700 font-medium">
                  Isso significa que 7 horas de relógio trabalhadas à noite equivalem a 8 horas de pagamento + Adicional Noturno (mínimo 20%).
              </p>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2">
              <Scale className="text-blue-600" /> Direitos Básicos do Ponto
          </h3>
          <ul className="space-y-3 not-prose mb-8">
              <li className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700 text-sm"><strong>Intervalo Intrajornada:</strong> Quem trabalha mais de 6h tem direito a no mínimo 1h de almoço.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700 text-sm"><strong>Intervalo Interjornada:</strong> Entre um dia de trabalho e outro, deve haver um descanso mínimo de 11 horas.</span>
              </li>
              <li className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700 text-sm"><strong>Limite de Extras:</strong> Máximo de 2 horas extras por dia (salvo regime 12x36 ou força maior).</span>
              </li>
          </ul>

          {/* FAQ ACORDION */}
          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b pb-4">
                <HelpCircle className="text-indigo-600" /> Dúvidas Frequentes
            </h3>
            
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-indigo-100 transition-all">
                      <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-indigo-500 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm animate-in fade-in">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* REFERÊNCIAS OFICIAIS */}
          <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose bg-slate-50 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Base Legal (CLT)
              </h3>
              <p className="text-xs text-slate-500 mb-3">Saiba onde estão seus direitos:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600">
                  <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                      CLT - Artigo 58 (Jornada) <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                      CLT - Artigo 71 (Intervalos) <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          {/* NAVEGAÇÃO FINAL */}
          <div className="mt-16 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <CheckCircle2 size={16} className="text-emerald-500"/> Converta seu tempo em dinheiro:
            </p>
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