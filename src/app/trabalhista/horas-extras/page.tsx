import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import OvertimeCalculator from "@/components/calculators/OvertimeCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Clock, HelpCircle, History, 
  TriangleAlert, CheckCircle2, Coins, 
  Wallet, FileText, Sun, Moon, CalendarDays,
  TrendingUp, Calculator, Landmark, ExternalLink, Scale
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import RelatedTools from "@/components/ui/RelatedTools";

// --- 1. METADATA (SEO 2026) ---
// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const salarioRaw = resolvedParams.salario as string;
  
  let title = "Calculadora de Horas Extras 2026 | 50%, 100% e DSR (Cálculo Exato)";
  let description = "Não perca dinheiro. Calcule o valor exato das suas horas extras (50% e 100%) e o reflexo no Descanso Semanal Remunerado (DSR). Simulador CLT atualizado.";

  if (salarioRaw) {
    const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(salarioRaw));
    title = `Cálculo de Horas Extras: Salário de ${valorFormatado} - Calculadora 2026`;
    description = `Veja quanto vale a hora extra para um salário de ${valorFormatado}. Cálculo com adicional de 50%, 100% e DSR.`;
  }

  return {
    title,
    description,
    keywords: [
      "calculadora horas extras", 
      "calcular hora extra 50 e 100", 
      "reflexo dsr horas extras", 
      "valor hora de trabalho", 
      "cálculo hora extra sábado", 
      "hora extra noturna",
      "divisor 220 ou 180",
      ...(salarioRaw ? [`hora extra salário ${salarioRaw}`, `calcular HE ${salarioRaw}`] : [])
    ],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/horas-extras" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/trabalhista/horas-extras",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Simulador de Horas Extras" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://mestredascontas.com.br/opengraph-image"],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

// --- FAQ LIST (DRY Content) ---
const faqList = [
    { q: "Quanto vale a hora extra de sábado?", a: "Depende do acordo da empresa. Se o sábado for dia útil compensado (você trabalha 44h de seg a sex), a hora extra no sábado geralmente vale 50% ou mais, dependendo da convenção coletiva. Se for feriado, é 100%." },
    { q: "O que é DSR sobre horas extras?", a: "É o Descanso Semanal Remunerado. Como a hora extra é um salário adicional habitual, ela deve refletir também no pagamento do seu dia de folga. O valor varia conforme os dias úteis e domingos do mês." },
    { q: "Qual o limite de horas extras por dia?", a: "Pela CLT (Art. 59), o limite máximo é de 2 horas extras por dia. Exceções ocorrem apenas em casos de necessidade imperiosa ou força maior." },
    { q: "Hora extra noturna vale mais?", a: "Sim! Além do adicional de hora extra (mínimo 50%), deve-se aplicar o adicional noturno (mínimo 20%). E a hora noturna é reduzida (52min 30s), o que aumenta o valor final." },
    { q: "O que acontece se a empresa não pagar?", a: "Você pode cobrar os valores retroativos dos últimos 5 anos na Justiça do Trabalho. Mantenha seu registro de ponto ou anotações pessoais como prova." }
];

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
      "description": "Ferramenta para cálculo de horas suplementares com adicional de 50%, 100% e reflexo no repouso remunerado.",
      "aggregateRating": { 
        "@type": "AggregateRating", 
        "ratingValue": "4.8", 
        "ratingCount": "5320", 
        "bestRating": "5", 
        "worstRating": "1" 
      }
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Horas Extras",
      "description": "Aprenda a calcular o valor da sua hora extra passo a passo.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Valor da Hora Normal",
          "text": "Divida seu salário mensal por 220 (jornada padrão de 44h) para achar o valor da hora normal."
        },
        {
          "@type": "HowToStep",
          "name": "Acrescente o Adicional",
          "text": "Se for dia útil, multiplique por 1.5 (50%). Se for domingo/feriado, multiplique por 2 (100%)."
        },
        {
           "@type": "HowToStep",
           "name": "Reflexo no DSR",
           "text": "Some todas as horas extras, divida pelos dias úteis do mês e multiplique pelos domingos/feriados."
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Guia Completo das Horas Extras: Direitos, DSR e Cálculos",
      "description": "Entenda como funciona o adicional de horas extras, a diferença entre dias úteis e feriados e o impacto no DSR.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-03-01",
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

export default async function HorasExtrasPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-slate-50 p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-slate-400">Carregando Calculadora...</div>}>
                    <OvertimeCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-200 pt-3">
                    <Link href="https://mestredascontas.com.br/trabalhista/horas-extras" target="_blank" className="text-[10px] text-slate-400 hover:text-purple-600 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
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
          title="Calculadora de Horas Extras"
          description="Você sabe quanto vale o seu tempo? Simule o valor das horas normais (50%), feriados (100%) e o Reflexo no DSR, o bônus que muitos esquecem."
          category="Direitos Trabalhistas (CLT)"
          icon={<Clock size={32} strokeWidth={2} />}
          variant="default" // Azul/Roxo
          categoryColor="purple"
          badge="Atualizado 2026"
          rating={4.8}
          reviews={5320}
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Horas Extras" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ALERTA BANCO DE HORAS */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start text-left max-w-3xl mx-auto w-full shadow-sm">
          <TriangleAlert className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 uppercase tracking-wide">Atenção ao Banco de Horas</p>
            <p className="text-sm text-amber-800/90 leading-relaxed">
              Se sua empresa tem acordo de Banco de Horas, ela pode não pagar as extras em dinheiro no mês, mas sim conceder folgas futuras. Verifique seu contrato!
            </p>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="horas_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
              <Suspense fallback={
                <div className="h-96 w-full bg-slate-50 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 border border-slate-200">
                    <div className="flex flex-col items-center gap-2">
                        <Clock className="animate-bounce" size={32}/>
                        <span>Carregando Calculadora...</span>
                    </div>
                </div>
              }>
                  <PrivacyBadge />
                  <OvertimeCalculator />
              </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="horas_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DENSO --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-purple-600 pl-4">
              A Matemática da Hora Extra
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            Para saber quanto vale uma hora extra, primeiro precisamos descobrir quanto vale sua <strong>hora normal</strong>. A maioria dos trabalhadores brasileiros tem uma jornada mensal padrão de <strong>220 horas</strong> (44h semanais).
          </p>
          <p>
            A conta básica é: <code>Salário ÷ 220 = Valor da Hora Normal</code>. A partir daí, aplicamos os adicionais previstos na Constituição Federal de 1988.
          </p>

          {/* TABELA DE ADICIONAIS (HTML PURO) */}
          <div className="not-prose my-8 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Tabela de Adicionais</h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Base CLT</span>
              </div>
              
              {/* DESKTOP TABLE */}
              <div className="hidden md:block">
                  <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs">
                          <tr>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Tipo de Dia</th>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Adicional Mínimo</th>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Fórmula</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Dias Úteis (Seg a Sáb)</td>
                              <td className="px-6 py-4 font-bold text-orange-600 dark:text-orange-400">50%</td>
                              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Hora Normal × 1,5</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Domingos e Feriados</td>
                              <td className="px-6 py-4 font-bold text-purple-600 dark:text-purple-400">100%</td>
                              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Hora Normal × 2</td>
                          </tr>
                          <tr className="bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Hora Noturna (22h-5h)</td>
                              <td className="px-6 py-4 font-bold text-indigo-600 dark:text-indigo-400">50% + 20% (Adc. Noturno)</td>
                              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Hora Normal × 1,5 × 1,2</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              {/* MOBILE CARDS */}
              <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                        { tipo: "Dias Úteis", add: "50%", form: "Hora × 1,5", color: "text-orange-600" },
                        { tipo: "Domingos/Feriados", add: "100%", form: "Hora × 2", color: "text-purple-600" },
                        { tipo: "Hora Noturna", add: "+50% e +20%", form: "Hora × 1,5 × 1,2", color: "text-indigo-600" }
                  ].map((item, idx) => (
                      <div key={idx} className="p-4 flex justify-between items-center bg-white dark:bg-slate-900">
                          <div>
                              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">{item.tipo}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Fórmula: {item.form}</span>
                          </div>
                          <div className={`text-lg font-bold ${item.color} dark:text-opacity-80`}>
                              {item.add}
                          </div>
                      </div>
                  ))}
              </div>

              <p className="text-[10px] text-slate-400 dark:text-slate-500 p-2 bg-slate-50 dark:bg-slate-800 text-center border-t border-slate-100 dark:border-slate-700">* Convenções coletivas podem estipular percentuais maiores (ex: 60%, 110%).</p>
          </div>

          {/* O VILÃO ESQUECIDO: DSR */}
          <div className="bg-blue-50/60 dark:bg-blue-900/20 p-6 md:p-8 rounded-2xl border border-blue-100 dark:border-blue-900 my-10 not-prose relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Coins size={140} className="text-blue-900 dark:text-blue-300"/>
              </div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-2 relative z-10">
                  <Wallet size={24} className="text-blue-600 dark:text-blue-400"/> O "Bônus Oculto": Reflexo no DSR
              </h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 relative z-10 text-sm md:text-base leading-relaxed">
                  <p>
                      Muita gente esquece, mas as horas extras geram um "filho": o reflexo no <strong>Descanso Semanal Remunerado (DSR)</strong>.
                  </p>
                  <p>
                      A lógica é justa: se você trabalhou mais durante a semana, seu dia de descanso (que é remunerado) deve valer mais também.
                  </p>
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm mt-4 text-center">
                      <p className="font-mono text-xs md:text-sm text-blue-800 dark:text-blue-300 font-bold">
                          (Total Horas Extras R$ ÷ Dias Úteis) × Domingos/Feriados
                      </p>
                  </div>
                  <p>
                      Por exemplo: Em um mês com 25 dias úteis e 5 domingos, o DSR acrescenta cerca de <strong>20%</strong> a mais no valor total das suas horas extras. Nossa calculadora faz essa conta automaticamente.
                  </p>
              </div>
          </div>

          <div className="mt-12 mb-8">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <History className="text-slate-500 dark:text-slate-400" /> A Conquista de 1988
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                  Antes da Constituição de 1988, a jornada de trabalho padrão no Brasil era de 48 horas semanais, e o adicional de hora extra era de apenas 20%. A Constituição Cidadã reduziu a jornada para 44h e aumentou o adicional mínimo para <strong>50%</strong>, visando a saúde do trabalhador e o convívio familiar.
              </p>
          </div>
          
          {/* FAQ ACORDION */}
          <div className="mt-16 not-prose">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-600 dark:text-blue-400" /> Dúvidas Frequentes
            </h2>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-900/50 open:ring-1 open:ring-purple-100 dark:open:ring-purple-900/30 transition-all">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-purple-500 dark:text-purple-400 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* REFERÊNCIAS OFICIAIS */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Base Legal
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Consulte a legislação original para mais detalhes:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      CLT - Artigo 59 <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      CF/88 - Artigo 7º <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          <RelatedTools currentToolLink="/trabalhista/horas-extras" category="trabalhista" />

        </div>
        
        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="horas_bottom" format="horizontal" variant="software" />
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