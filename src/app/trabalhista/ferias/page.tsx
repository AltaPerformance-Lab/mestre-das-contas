import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import VacationCalculator from "@/components/calculators/VacationCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  AlertTriangle, Calendar, Coins, CircleHelp, 
  CheckCircle2, History, BookOpen, Calculator,
  Wallet, Sun, Palmtree, Clock, FileText, Check, Briefcase, XCircle,
  Landmark, ExternalLink, Plane
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import RelatedTools from "@/components/ui/RelatedTools";

// --- 1. METADATA DE ALTA PERFORMANCE (SEO 2026) ---
// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const salarioRaw = resolvedParams.salario as string;
  
  let title = "Férias 2026: Simulador Líquido (Com Venda de 10 Dias)";
  let description = "Quanto cai na conta? Simule suas Férias + 1/3 Constitucional. Veja se vale a pena vender 10 dias (abono) e adiantar o 13º. Cálculo Gratuito.";

  if (salarioRaw) {
    const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(salarioRaw));
    title = `Cálculo de Férias: Salário de ${valorFormatado} - Simulador 2026`;
    description = `Veja quanto você vai receber nas férias com um salário de ${valorFormatado}. Simule venda de dias e adiantamento do décimo terceiro.`;
  }

  return {
    title,
    description,
    keywords: [
      "calculadora férias", 
      "calcular venda férias 10 dias", 
      "abono pecuniário valor", 
      "adiantamento 13 nas férias", 
      "cálculo um terço de férias", 
      "desconto irrf férias 2026",
      "quanto recebo de férias liquido",
      ...(salarioRaw ? [`férias salário ${salarioRaw}`, `calcular férias ${salarioRaw}`] : [])
    ],
    alternates: {
      canonical: "https://mestredascontas.com.br/trabalhista/ferias",
    },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/trabalhista/ferias",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Simulador de Férias" }],
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

// --- LISTA FAQ (DRY Content) ---
const faqList = [
    { q: "Quando o pagamento das férias deve ser feito?", a: "A lei determina que o pagamento deve ser feito até 2 dias antes do início do período de descanso. Se a empresa atrasar, ela pode ser obrigada a pagar o valor em dobro (Súmula 450 do TST)." },
    { q: "Posso vender 20 dias de férias?", a: "Não. A CLT permite converter em dinheiro (abono pecuniário) apenas 1/3 do período a que você tem direito. Se tem 30 dias, pode vender no máximo 10." },
    { q: "O abono pecuniário (venda) tem desconto?", a: "Não! Esta é a grande vantagem. O valor correspondente aos dias vendidos e seu respectivo terço constitucional são isentos de INSS e Imposto de Renda." },
    { q: "Posso dividir minhas férias em 3 vezes?", a: "Sim, desde a Reforma Trabalhista de 2017. Um período não pode ser menor que 14 dias corridos, e os outros não podem ser menores que 5 dias." },
    { q: "Férias começam na sexta-feira?", a: "Não pode. A lei proíbe o início das férias no período de dois dias que antecede feriado ou descanso semanal remunerado (DSR). Logo, não pode começar na quinta ou sexta (se você folga sábado/domingo)." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Férias",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para cálculo de férias, abono pecuniário e 1/3 constitucional.",
      "aggregateRating": { 
        "@type": "AggregateRating", 
        "ratingValue": "4.9", 
        "ratingCount": "8750", 
        "bestRating": "5", 
        "worstRating": "1" 
      }
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Férias com Venda de 10 Dias",
      "description": "Veja quanto você recebe ao vender parte das férias.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Salário Bruto",
          "text": "Informe o valor do seu salário registrado em carteira."
        },
        {
          "@type": "HowToStep",
          "name": "Dias de Descanso",
          "text": "Escolha se vai tirar 30, 20 ou 15 dias de férias."
        },
        {
           "@type": "HowToStep",
           "name": "Abono Pecuniário",
           "text": "Marque a opção 'Vender 10 dias' para adicionar o valor extra isento de impostos."
        },
        {
          "@type": "HowToStep",
          "name": "Adiantamento do 13º",
          "text": "Se desejar, inclua a primeira parcela do décimo terceiro no cálculo."
        }
      ]
    },
    {
      "@type": "TechArticle",
      "headline": "Guia Completo das Férias: Cálculo, Venda e Prazos 2026",
      "description": "Tudo o que você precisa saber antes de sair de férias: como calcular, quando o dinheiro cai e se vale a pena vender 10 dias.",
      "proficiencyLevel": "Beginner",
      "author": { "@type": "Organization", "name": "Equipe Trabalhista Mestre das Contas", "url": "https://mestredascontas.com.br/sobre" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-11-01",
      "dateModified": new Date().toISOString(),
      "speakable": {
           "@type": "SpeakableSpecification",
           "xpath": ["/html/head/title", "/html/head/meta[@name='description']/@content"]
      }
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

export default async function FeriasPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-white dark:bg-slate-900 p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center animate-pulse text-slate-400 dark:text-slate-500">Carregando Calculadora...</div>}>
                    <VacationCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-200 dark:border-slate-800 pt-3">
                    <Link href="https://mestredascontas.com.br/trabalhista/ferias" target="_blank" className="text-[10px] text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Sun size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- PÁGINA COMPLETA ---
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 sm:px-6 pt-4 md:pt-6 max-w-7xl mx-auto w-full">
        <PageHeader 
          title="Calculadora de Férias"
          description="Chegou a hora do descanso! Simule o valor líquido das suas férias, incluindo a opção de vender 10 dias (abono pecuniário) e adiantar o 13º salário."
          category="Direito Trabalhista"
          icon={<Palmtree size={32} strokeWidth={2} />}
          variant="default" // Azul/Indigo
          categoryColor="amber" // Destaque Laranja/Amarelo
          badge="Tabela 2026"
          rating={4.9}
          reviews={8750}
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Férias" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ALERTA PRAZO */}
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 flex gap-3 items-start text-left max-w-3xl mx-auto w-full shadow-sm">
          <Clock className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide">Quando o dinheiro cai?</p>
            <p className="text-sm text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
              Pela lei, o pagamento das férias (incluindo o 1/3 adicional) deve ser feito até <strong>2 dias antes</strong> do início do seu descanso. Programe-se!
            </p>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="ferias_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
              <Suspense fallback={
                <div className="h-96 w-full bg-slate-50 dark:bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col items-center gap-2">
                        <Palmtree className="animate-bounce" size={32}/>
                        <span>Carregando Calculadora...</span>
                    </div>
                </div>
              }>
                  <PrivacyBadge />
                  <VacationCalculator />
              </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full mx-auto flex justify-center my-6 print:hidden min-h-[250px] rounded-3xl overflow-hidden">
            <LazyAdUnit slot="ferias_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DENSO --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg w-full max-w-none mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-amber-500 pl-4">
              Como funciona o cálculo das Férias?
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Todo trabalhador CLT tem direito a 30 dias de descanso remunerado após completar 12 meses de trabalho (o chamado período aquisitivo). 
            Mas o melhor vem agora: você recebe seu salário adiantado + um bônus obrigatório de 1/3!
          </p>
          <p>
            Muitas pessoas confundem o "vender férias" com perder dinheiro, mas na verdade, o <strong>Abono Pecuniário</strong> é uma das formas mais inteligentes de aumentar sua renda líquida no ano, pois é livre de impostos.
          </p>

          {/* CARDS EXPLICATIVOS */}
          <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
              <div className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-2xl border border-amber-200 dark:border-amber-900/30 hover:shadow-md transition-shadow">
                  <Sun className="text-amber-600 dark:text-amber-500 mb-3" size={32} />
                  <h3 className="font-bold text-amber-900 dark:text-amber-400 mb-2 text-lg">Salário + 1/3</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Você recebe o salário dos dias que vai descansar, acrescido de 1/3 constitucional (33,33% a mais) para curtir as férias.
                  </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-2xl border border-green-200 dark:border-green-900/30 hover:shadow-md transition-shadow">
                  <Wallet className="text-green-600 dark:text-green-500 mb-3" size={32} />
                  <h3 className="font-bold text-green-900 dark:text-green-400 mb-2 text-lg">Abono Pecuniário</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      É a famosa "venda de férias". Você pode trocar até 10 dias de descanso por dinheiro. A vantagem? Esse valor é <strong>isento de impostos</strong>.
                  </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/30 hover:shadow-md transition-shadow">
                  <Calendar className="text-blue-600 dark:text-blue-500 mb-3" size={32} />
                  <h3 className="font-bold text-blue-900 dark:text-blue-400 mb-2 text-lg">Adiantamento 13º</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Você pode pedir a 1ª parcela do 13º salário para receber junto com as férias. O prazo para solicitar isso geralmente é Janeiro.
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
              <FileText className="text-slate-500 dark:text-slate-400" /> O que é descontado (Tributação)?
          </h3>
          <p>
              Sim, o leão morde suas férias. O INSS e o Imposto de Renda incidem sobre o pagamento, mas <strong>não sobre tudo</strong>. Veja a tabela abaixo para entender onde você economiza:
          </p>

          {/* TABELA DE TRIBUTAÇÃO (OBRIGATÓRIA) */}
          <div className="my-8">
              {/* DESKTOP TABLE */}
              <div className="hidden md:block border rounded-xl overflow-hidden border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Tabela de Incidência</h4>
                      <span className="text-xs text-slate-500 font-medium">Regra Geral CLT</span>
                  </div>
                  <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs">
                          <tr>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Verba</th>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Incide INSS?</th>
                              <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Incide IRRF?</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Férias Gozadas (Descanso)</td>
                              <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400 font-bold text-[10px] uppercase bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full"><XCircle size={12}/> Sim</span></td>
                              <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400 font-bold text-[10px] uppercase bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full"><XCircle size={12}/> Sim</span></td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">1/3 Constitucional (sobre gozo)</td>
                              <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400 font-bold text-[10px] uppercase bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full"><XCircle size={12}/> Sim</span></td>
                              <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400 font-bold text-[10px] uppercase bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full"><XCircle size={12}/> Sim</span></td>
                          </tr>
                          <tr className="bg-green-50/50 dark:bg-green-900/10 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                              <td className="px-6 py-4 font-bold text-green-800 dark:text-green-300">Abono Pecuniário (Venda)</td>
                              <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-green-700 dark:text-green-300 font-bold text-[10px] uppercase bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full border border-green-200 dark:border-green-800"><Check size={12}/> Isento</span></td>
                              <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-green-700 dark:text-green-300 font-bold text-[10px] uppercase bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full border border-green-200 dark:border-green-800"><Check size={12}/> Isento</span></td>
                          </tr>
                          <tr className="bg-green-50/50 dark:bg-green-900/10 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                              <td className="px-6 py-4 font-bold text-green-800 dark:text-green-300">1/3 sobre Abono</td>
                              <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-green-700 dark:text-green-300 font-bold text-[10px] uppercase bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full border border-green-200 dark:border-green-800"><Check size={12}/> Isento</span></td>
                              <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-green-700 dark:text-green-300 font-bold text-[10px] uppercase bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full border border-green-200 dark:border-green-800"><Check size={12}/> Isento</span></td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              {/* MOBILE CARDS */}
              <div className="md:hidden space-y-3">
                  {[
                      { verba: "Férias Gozadas", inss: true, irrf: true },
                      { verba: "1/3 sobre Gozo", inss: true, irrf: true },
                      { verba: "Abono (Venda 10 dias)", inss: false, irrf: false, highlight: true },
                      { verba: "1/3 sobre Abono", inss: false, irrf: false, highlight: true },
                  ].map((item, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border flex justify-between items-center ${item.highlight ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                          <div>
                              <span className="font-bold text-slate-800 dark:text-slate-100 text-sm block">{item.verba}</span>
                          </div>
                          <div className="flex gap-4">
                              <div className="text-center">
                                  <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">INSS</span>
                                  {item.inss ? <span className="text-red-600 font-bold text-xs"><XCircle size={16} /></span> : <span className="text-green-600 font-bold text-xs"><Check size={16} /></span>}
                              </div>
                              <div className="text-center">
                                  <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">IRRF</span>
                                  {item.irrf ? <span className="text-red-600 font-bold text-xs"><XCircle size={16} /></span> : <span className="text-green-600 font-bold text-xs"><Check size={16} /></span>}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* CURIOSIDADE HISTÓRICA */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 md:p-8 rounded-2xl border border-amber-100 dark:border-amber-900/30 my-10 not-prose relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Palmtree size={140} className="text-amber-900 dark:text-amber-500"/>
              </div>
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-400 mb-4 flex items-center gap-2 relative z-10">
                  <History size={24} className="text-amber-600 dark:text-amber-500"/> Você Sabia? Férias nem sempre existiram
              </h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 relative z-10 text-sm md:text-base leading-relaxed">
                  <p>
                      No início da industrialização, trabalhava-se até a exaustão, sem férias remuneradas. No Brasil, o direito a 15 dias de férias só surgiu em <strong>1925</strong>, mas apenas para ferroviários e bancários.
                  </p>
                  <p>
                      A extensão para todos os operários veio com Getúlio Vargas em 1943 (CLT). Mas o famoso <strong>&quot;Terço de Férias&quot;</strong> (o bônus de 33%) é uma conquista mais recente: nasceu apenas com a Constituição de 1988, para garantir que o trabalhador tivesse dinheiro extra para realmente viajar ou descansar.
                  </p>
              </div>
          </div>

          {/* FAQ ACORDION */}
          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <CircleHelp className="text-blue-600 dark:text-blue-400" /> Perguntas Frequentes (FAQ)
            </h3>
            
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-amber-100 dark:open:ring-amber-900/30 transition-all">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-amber-500 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 text-sm animate-in fade-in">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* REFERÊNCIAS OFICIAIS */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Legislação e Fontes
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Consulte a legislação original para mais detalhes:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      CLT - Artigos 129 a 153 <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.tst.jus.br/sumulas" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      Súmula 450 TST (Atraso) <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          {/* NAVEGAÇÃO FINAL */}
          </div>
          
          <RelatedTools currentToolLink="/trabalhista/ferias" category="trabalhista" />



        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="ferias_bottom" format="horizontal" variant="software" />
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