import { Suspense } from "react";
import type { Metadata } from "next";
import WeeklyTimeCardCalculator from "@/components/calculators/WeeklyTimeCardCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { Clock, HelpCircle, History, BookOpen, AlertTriangle, ShieldCheck } from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Cartão de Ponto (Somar Horas) | 2026 Grátis";
  const description = "Some as horas do seu cartão de ponto (Entrada, Almoço e Saída). Ferramenta gratuita para calcular horas extras semanais e saldo de banco de horas.";

  return {
    title,
    description,
    keywords: ["somar cartão de ponto", "calculadora de horas trabalhadas", "calcular entrada e saida do trabalho", "somar bater ponto horario de entrada almoco e saida", "calculadora de horas extras semanais"],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/cartao-de-ponto" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/trabalhista/cartao-de-ponto",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Cartão de Ponto - Mestre das Contas", 
        }
      ],
    },
    robots: { index: true, follow: true } };
}

const faqList = [
    { q: "Como calcular horas extras do cartão de ponto?", a: "Para calcular, você deve somar todas as horas efetivamente trabalhadas no dia (descontando o almoço) e subtrair a sua jornada contratual (ex: 8h por dia). O que sobrar é hora extra. Nossa calculadora faz isso automaticamente para a semana toda." },
    { q: "Qual a tolerância de atraso na batida de ponto?", a: "De acordo com o Art. 58 da CLT, não serão descontadas nem computadas como jornada extraordinária as variações de horário no registro de ponto não excedentes de cinco minutos, observado o limite máximo de dez minutos diários." },
    { q: "Posso bater o ponto do almoço?", a: "Sim, e é obrigatório para empresas com mais de 20 funcionários. O intervalo de almoço (intrajornada) não conta como tempo trabalhado, por isso você deve bater a saída e a volta." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Somador de Cartão de Ponto Semanal",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Aplicativo para somar horas do cartão de ponto, calculando entradas, saídas e almoço de segunda a domingo." },
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

export default async function CartaoDePontoPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12 font-sans bg-slate-50 dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Soma de Cartão de Ponto"
          description="Preencha os horários de entrada, almoço e saída para calcular automaticamente suas horas trabalhadas na semana e o saldo de horas extras."
          category="Direitos Trabalhistas"
          icon={<History size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="indigo"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Cartão de Ponto" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 mt-8 print:hidden min-h-[100px]">
           <LazyAdUnit slot="cartao_top" format="horizontal" variant="agency" />
        </div>

        <section className="w-full max-w-5xl mx-auto relative z-10">
           <div className="mb-6 print:hidden">
              <PrivacyBadge />
           </div>
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <WeeklyTimeCardCalculator />
           </Suspense>
           
           <div className="mt-8 print:hidden">
              <DisclaimerBox />
           </div>
        </section>

        {/* FAQ */}
        <section className="w-full max-w-4xl mx-auto space-y-6 mt-8 print:hidden">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle size={24} className="text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dúvidas Comuns (Ponto Eletrônico)</h2>
          </div>
          
          <div className="grid gap-4">
            {faqList.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">{faq.q}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Article */}
        <section className="w-full max-w-4xl mx-auto mt-12 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="text-indigo-600" /> Como somar cartão de ponto corretamente?
          </h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              Saber <strong>como somar as horas do cartão de ponto</strong> é essencial para garantir que seu contracheque venha correto e que nenhuma hora extra seja perdida. Antigamente, fazer essa conta no papel era confuso porque o relógio funciona em base 60, e não base 10 (decimal).
            </p>
            <h3>Passo a passo do cálculo manual</h3>
            <p>Se você fosse fazer a conta no papel, a fórmula é:</p>
            <ul>
              <li><strong>Passo 1:</strong> Diminuir a Hora de Saída para o Almoço da Hora de Entrada (ex: 12:00 - 08:00 = 4 horas).</li>
              <li><strong>Passo 2:</strong> Diminuir a Hora de Saída Final da Hora de Volta do Almoço (ex: 18:00 - 13:00 = 5 horas).</li>
              <li><strong>Passo 3:</strong> Somar os dois resultados (4h + 5h = 9 horas trabalhadas no dia).</li>
            </ul>
            <p>
              Usando nossa <strong>Calculadora de Cartão de Ponto</strong>, você não precisa fazer nenhuma dessas contas de conversão. Basta preencher os 4 horários da jornada que o sistema já desconta o tempo de descanso e apresenta as horas efetivamente trabalhadas, inclusive somando tudo ao final da semana.
            </p>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900 my-8">
              <h4 className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-300 mt-0">
                <ShieldCheck size={20} /> O que a empresa pode descontar?
              </h4>
              <p className="text-indigo-800 dark:text-indigo-200 text-sm mb-0">
                Atrasos superiores a 10 minutos diários podem ser descontados. No entanto, se você tem banco de horas positivo, muitas empresas compensam os atrasos com as horas extras acumuladas. Fique sempre atento ao extrato mensal do seu ponto.
              </p>
            </div>
          </div>
          
          <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </section>

        <SmartCrossLinker 
          currentHref="/trabalhista/cartao-de-ponto" 
          category="trabalhista"
        />

        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center mt-12 print:hidden min-h-[250px]">
           <LazyAdUnit slot="cartao_bottom" format="square" variant="in-article" />
        </div>
      </div>
    </article>
  );
}
