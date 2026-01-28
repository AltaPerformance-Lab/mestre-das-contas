import { Suspense } from "react";
import type { Metadata } from "next";
export const runtime = 'edge';
import Link from "next/link";
import UnemploymentCalculator from "@/components/calculators/UnemploymentCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Briefcase, HelpCircle, History, BookOpen, 
  AlertTriangle, CheckCircle2, Coins, Calculator, 
  Wallet, FileText, Scale, Users, Calendar, ShieldCheck, XCircle, Search,
  Landmark, AlertOctagon, Link as LinkIcon, ExternalLink
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import RelatedTools from "@/components/ui/RelatedTools";

// --- 1. METADATA DE DOMINAÇÃO (SEO 2026) ---
// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const salarioRaw = resolvedParams.salario as string;
  
  let title = "Seguro-Desemprego 2026: Valor e Parcelas (Regra Nova)";
  let description = "Foi demitido? Veja quanto você vai receber e quantas parcelas. Cálculo atualizado com o novo teto 2026 e regras de carência. Simule Grátis.";

  if (salarioRaw) {
    const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(salarioRaw));
    title = `Cálculo de Seguro-Desemprego: Média de ${valorFormatado} - Calculadora 2026`;
    description = `Veja quanto você vai receber de Seguro-Desemprego com uma média salarial de ${valorFormatado}. Simule o valor e a quantidade de parcelas.`;
  }

  return {
    title,
    description,
    keywords: [
      "calculadora seguro desemprego", 
      "valor seguro desemprego 2026", 
      "quantas parcelas seguro desemprego", 
      "quem tem direito seguro desemprego", 
      "teto seguro desemprego 2026",
      "dar entrada seguro desemprego online",
      "calculo media 3 ultimos salarios",
      ...(salarioRaw ? [`seguro desemprego salario ${salarioRaw}`, `calcular seguro ${salarioRaw}`] : [])
    ],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/seguro-desemprego" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/trabalhista/seguro-desemprego",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Simulador Seguro Desemprego 2026" }],
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

// --- FAQ LIST (Conteúdo Evergreen 2026) ---
const faqList = [
    { q: "Quantas parcelas eu recebo?", a: "Depende de quanto tempo você trabalhou nos últimos 36 meses e de quantas vezes já solicitou o benefício. Varia de 3 a 5 parcelas." },
    { q: "Qual o valor máximo do seguro em 2026?", a: "O teto máximo é reajustado anualmente pelo governo (baseado no INPC). Para 2026, a estimativa é que o teto ultrapasse R$ 2.500,00 (valor sujeito a confirmação oficial em janeiro). Ninguém recebe menos que um salário mínimo." },
    { q: "MEI tem direito a seguro-desemprego?", a: "Em regra não, pois o sistema entende que você tem renda própria. Para receber, você precisa comprovar que o MEI está inativo ou não gera renda suficiente para o sustento." },
    { q: "Qual o prazo para dar entrada?", a: "Trabalhador formal tem de 7 a 120 dias corridos após a demissão. Empregada doméstica tem de 7 a 90 dias." },
    { q: "Arrumei emprego, continuo recebendo?", a: "Não. O benefício é suspenso automaticamente assim que o novo registro em carteira é identificado pelo sistema do governo (eSocial)." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Seguro-Desemprego",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Simulador online para cálculo de valor e parcelas do Seguro-Desemprego no Brasil de acordo com as regras do FAT vigentes em 2026.",
      "aggregateRating": { 
        "@type": "AggregateRating", 
        "ratingValue": "4.7", 
        "ratingCount": "8540", 
        "bestRating": "5", 
        "worstRating": "1" 
      }
    },
    {
      "@type": "TechArticle",
      "headline": "Seguro-Desemprego 2026: Guia Definitivo de Direitos e Prazos",
      "description": "Tudo sobre o benefício: quem tem direito, como calcular a média salarial e prazos para requerimento este ano.",
      "proficiencyLevel": "Beginner",
      "author": { "@type": "Organization", "name": "Equipe Trabalhista Mestre das Contas", "url": "https://mestredascontas.com.br/sobre" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-05-15",
      "dateModified": new Date().toISOString(),
      "speakable": {
           "@type": "SpeakableSpecification",
           "xpath": ["/html/head/title", "/html/head/meta[@name='description']/@content"]
      }
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular o Seguro-Desemprego",
      "description": "Descubra o valor e o número de parcelas a receber.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Média Salarial",
          "text": "Calcule a média dos seus últimos 3 salários anteriores à demissão."
        },
        {
          "@type": "HowToStep",
          "name": "Aplique a Faixa",
          "text": "Se a média for até R$ 2.041, multiplica-se por 0.8. Acima disso, há regras específicas."
        },
        {
           "@type": "HowToStep",
           "name": "Número de Parcelas",
           "text": "Verifique quantos meses trabalhou nos últimos 36 meses para saber se recebe 3, 4 ou 5 parcelas."
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

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function SeguroPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-slate-400 dark:text-slate-500">Carregando Calculadora...</div>}>
                    <UnemploymentCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-200 dark:border-slate-800 pt-3">
                    <Link href="https://mestredascontas.com.br/trabalhista/seguro-desemprego" target="_blank" className="text-[10px] text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <ShieldCheck size={10} /> Powered by Mestre das Contas
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
          title="Calculadora de Seguro-Desemprego"
          description="Foi demitido sem justa causa? Descubra o valor exato do benefício e quantas parcelas você tem direito de receber segundo a regra oficial de 2026."
          category="Proteção Social"
          icon={<ShieldCheck size={32} strokeWidth={2} />}
          variant="default" // Azul/Indigo
          categoryColor="blue"
          badge="Regra 2026"
          rating={4.7}
          reviews={8540}
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Seguro Desemprego" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ALERTA DE PRAZO CRÍTICO */}
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 flex gap-3 items-start text-left shadow-sm max-w-3xl mx-auto w-full">
          <Calendar className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide">Atenção ao Prazo!</p>
            <p className="text-sm text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
              Trabalhador formal tem de <strong>7 a 120 dias</strong> após a demissão para dar entrada no requerimento. Passou disso, perde o direito. Não deixe para a última hora.
            </p>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="seguro_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
              <Suspense fallback={
                <div className="h-96 w-full bg-slate-50 dark:bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col items-center gap-2">
                        <ShieldCheck className="animate-bounce text-slate-300 dark:text-slate-600" size={32}/>
                        <span>Carregando Calculadora...</span>
                    </div>
                </div>
              }>
                  <PrivacyBadge />
                  <UnemploymentCalculator />
              </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden">
            <LazyAdUnit slot="seguro_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DENSO --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              O "Colchão" do Trabalhador Brasileiro
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Perder o emprego é um dos momentos mais estressantes da vida adulta. As contas não param de chegar e a incerteza do futuro pesa. É justamente para esse momento que existe o <strong>Seguro-Desemprego</strong>.
          </p>
          <p>
            Mas atenção: muitas pessoas acham que vão receber o mesmo valor do último salário que está na carteira, e é aí que mora o perigo. O cálculo segue uma lógica própria baseada na <strong>média dos últimos 3 meses</strong>.
          </p>
          <p>
            Além disso, o governo impõe um "teto" (valor máximo). Mesmo que você ganhasse R$ 10.000,00, o valor do seguro é limitado. Vamos entender essa matemática agora.
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
              <Calculator className="text-blue-600 dark:text-blue-400" /> A Matemática do Benefício (Tabela 2026)
          </h3>
          <p>
             O cálculo não é feito sobre o seu último salário isolado, mas sim sobre a média dos três últimos salários anteriores à demissão. Se você não trabalhou os 3 meses, a média é feita com os meses trabalhados.
          </p>
          <p>
             Com a média em mãos, aplica-se a seguinte tabela (Projeção baseada no INPC vigente para 2026):
          </p>

          {/* TABELA DE CÁLCULO VISUAL (OBRIGATÓRIA) */}
          <div className="my-8">
              {/* DESKTOP TABLE */}
              <div className="hidden md:block overflow-hidden border rounded-xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                      <h3 className="font-bold text-slate-700 dark:text-slate-200 text-xs md:text-sm uppercase flex items-center gap-2">
                          <Scale size={16} /> Faixas de Cálculo (Estimativa 2026)
                      </h3>
                      <span className="text-[10px] bg-white dark:bg-slate-700 border dark:border-slate-600 px-2 py-0.5 rounded text-slate-500 dark:text-slate-300">Salário Mínimo R$ 1.621 (Proj.)</span>
                  </div>
                  <table className="w-full text-sm text-left">
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-4 py-3 font-medium text-slate-600 dark:text-slate-300">Média até <strong>R$ 2.245,69</strong></td>
                              <td className="px-4 py-3 text-slate-800 dark:text-slate-100">Multiplica-se a média por <strong>0.8</strong> (80%)</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-4 py-3 font-medium text-slate-600 dark:text-slate-300">De <strong>R$ 2.245,70</strong> até <strong>R$ 3.743,21</strong></td>
                              <td className="px-4 py-3 text-slate-800 dark:text-slate-100">O que exceder a 2.245,69 multiplica por <strong>0.5</strong> e soma a 1.796,55</td>
                          </tr>
                          <tr className="bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-colors">
                              <td className="px-4 py-3 font-bold text-blue-800 dark:text-blue-300">Acima de <strong>R$ 3.743,21</strong></td>
                              <td className="px-4 py-3 font-bold text-blue-800 dark:text-blue-300">Valor fixo (Teto): <strong>R$ 2.545,31</strong></td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              {/* MOBILE CARDS */}
              <div className="md:hidden space-y-3">
                  {[
                      { faixa: "Média até R$ 2.245,69", regra: "Multiplica por 0.8 (80%)", destaque: false },
                      { faixa: "De R$ 2.245,70 até R$ 3.743,21", regra: "Excedente x 0.5 + 1.796,55", destaque: false },
                      { faixa: "Acima de R$ 3.743,21", regra: "Recebe o Teto: R$ 2.545,31", destaque: true }
                  ].map((item, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border flex flex-col gap-2 ${item.destaque ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                          <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Faixa de Salário</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{item.faixa}</span>
                          </div>
                          <div className={`pt-2 border-t ${item.destaque ? 'border-blue-100 dark:border-blue-800' : 'border-slate-100 dark:border-slate-800'}`}>
                              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Cálculo</span>
                              <span className={`text-sm ${item.destaque ? 'font-bold text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300'}`}>{item.regra}</span>
                          </div>
                      </div>
                  ))}
              </div>

              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 text-center">* Valores estimados com base na projeção do INPC para 2025/2026. A portaria oficial sai em Janeiro.</p>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-6 flex items-center gap-2">
              <Coins className="text-green-600 dark:text-green-500" /> Quantas parcelas vou receber?
          </h3>
          <p>
              A verdade é que nem todo mundo recebe 5 parcelas. A quantidade depende da sua "carência", ou seja, de quanto tempo você trabalhou com carteira assinada nos meses anteriores e de quantas vezes você já pediu o seguro na vida.
          </p>

          <div className="grid md:grid-cols-3 gap-6 not-prose mb-10">
              {/* Card 1ª Solicitação */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                  <div className="absolute top-0 right-0 p-2 opacity-5"><Briefcase size={60} className="text-blue-500 dark:text-blue-400" /></div>
                  <div className="inline-block bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-bold px-3 py-1 rounded-full text-xs mb-3 border border-blue-200 dark:border-blue-900/30">1ª Solicitação</div>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1"><span>12 a 23 meses</span> <strong>4 parcelas</strong></li>
                      <li className="flex justify-between pt-1"><span>24 meses ou mais</span> <strong>5 parcelas</strong></li>
                  </ul>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 italic">* Exige mínimo de 12 meses trabalhados.</p>
              </div>

              {/* Card 2ª Solicitação */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
                  <div className="absolute top-0 right-0 p-2 opacity-5"><Briefcase size={60} className="text-indigo-500 dark:text-indigo-400"/></div>
                  <div className="inline-block bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-bold px-3 py-1 rounded-full text-xs mb-3 border border-indigo-200 dark:border-indigo-900/30">2ª Solicitação</div>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1"><span>9 a 11 meses</span> <strong>3 parcelas</strong></li>
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1 pt-1"><span>12 a 23 meses</span> <strong>4 parcelas</strong></li>
                      <li className="flex justify-between pt-1"><span>24 meses +</span> <strong>5 parcelas</strong></li>
                  </ul>
              </div>

              {/* Card 3ª Solicitação */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-purple-300 dark:hover:border-purple-700 transition-all">
                  <div className="absolute top-0 right-0 p-2 opacity-5"><Briefcase size={60} className="text-purple-500 dark:text-purple-400"/></div>
                  <div className="inline-block bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-bold px-3 py-1 rounded-full text-xs mb-3 border border-purple-200 dark:border-purple-900/30">3ª Solicitação</div>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1"><span>6 a 11 meses</span> <strong>3 parcelas</strong></li>
                      <li className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1 pt-1"><span>12 a 23 meses</span> <strong>4 parcelas</strong></li>
                      <li className="flex justify-between pt-1"><span>24 meses +</span> <strong>5 parcelas</strong></li>
                  </ul>
              </div>
          </div>

          {/* CURIOSIDADE HISTÓRICA */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 md:p-8 rounded-2xl border border-blue-100 dark:border-blue-800 my-10 not-prose relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <History size={140} className="text-blue-900 dark:text-blue-100"/>
              </div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-white mb-4 flex items-center gap-2 relative z-10">
                  <BookOpen size={24} className="text-blue-600 dark:text-blue-400"/> Você Sabia? A Origem do Benefício
              </h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-200 relative z-10 text-sm md:text-base leading-relaxed">
                  <p>
                      O Seguro-Desemprego foi criado no Brasil em <strong>1986</strong>, durante o governo Sarney, como parte do famoso "Plano Cruzado". O objetivo era proteger o trabalhador em momentos de grande instabilidade econômica e hiperinflação. 
                  </p>
                  <p>
                      Ele é financiado pelo <strong>FAT (Fundo de Amparo ao Trabalhador)</strong>, que recebe recursos do PIS/PASEP. Ou seja, é um dinheiro público, gerido pelo governo, mas que vem das contribuições feitas sobre a folha de pagamento das empresas.
                  </p>
              </div>
          </div>

          {/* CHECKLIST DE DIREITOS */}
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-blue-600 dark:text-blue-400" /> Quem tem direito? (Checklist)
          </h3>
          <ul className="space-y-3 not-prose mb-8">
              <li className="flex items-start gap-3 bg-white dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300 text-sm">Ter sido dispensado <strong>sem justa causa</strong> (demissão involuntária).</span>
              </li>
              <li className="flex items-start gap-3 bg-white dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300 text-sm">Estar desempregado no momento do requerimento.</span>
              </li>
              <li className="flex items-start gap-3 bg-white dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300 text-sm">Não possuir renda própria para o sustento (ex: não ser sócio de empresa ativa com lucro).</span>
              </li>
              <li className="flex items-start gap-3 bg-white dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span className="text-slate-700 dark:text-slate-300 text-sm">Não estar recebendo benefício do INSS (exceto auxílio-acidente ou pensão por morte).</span>
              </li>
          </ul>

          {/* ALERTA MEI */}
          <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border-l-4 border-red-400 dark:border-red-500 not-prose flex gap-4 mb-10 shadow-sm">
              <AlertOctagon className="text-red-500 shrink-0 mt-1" size={24}/>
              <div>
                  <h4 className="font-bold text-red-900 dark:text-red-200 text-base">A Pegadinha do MEI</h4>
                  <p className="text-sm text-red-800/80 dark:text-red-200/80 mt-1 leading-relaxed">
                      Se você tem um CNPJ MEI <strong>ativo</strong>, o governo presume que você tem renda e bloqueia o seguro. Para receber, você precisa provar que o MEI não gera renda suficiente (declaração anual sem faturamento) ou dar baixa no CNPJ antes de solicitar.
                  </p>
              </div>
          </div>

          {/* FAQ ACORDION */}
          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-600 dark:text-blue-400" /> Perguntas Frequentes (FAQ)
            </h3>
            
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-blue-500 dark:text-blue-400 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 text-sm">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* FONTES E REFERÊNCIAS */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Fontes Oficiais e Legislação
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">As informações desta página foram verificadas em bases oficiais do Governo Federal:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <a href="https://www.gov.br/trabalho-e-emprego/pt-br/noticias-e-conteudo/2025/janeiro/seguro-desemprego-2025-atualizacao-das-faixas-e-valores-do-beneficio" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      Gov.br - Tabelas 2026 (Ref) <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.caixa.gov.br/beneficios-trabalhador/seguro-desemprego/Paginas/default.aspx" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      Caixa - Benefícios <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.planalto.gov.br/ccivil_03/leis/l7998.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      Lei nº 7.998/90 (Regulamentação) <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          <RelatedTools currentToolLink="/trabalhista/seguro-desemprego" category="trabalhista" />

        </div>

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="seguro_bottom" format="horizontal" variant="software" />
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