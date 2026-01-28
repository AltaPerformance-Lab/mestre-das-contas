import { Suspense } from "react";
import type { Metadata } from "next";
export const runtime = 'edge';
import Link from "next/link";
import TerminationCalculator from "@/components/calculators/TerminationCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Briefcase, HelpCircle, History, BookOpen, 
  CheckCircle2, Coins, Calculator, 
  Wallet, FileText, Scale, Check, XCircle, 
  AlertTriangle, Clock, CalendarDays
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import RelatedTools from "@/components/ui/RelatedTools";

// --- 1. METADATA (SEO MAXIMIZADO) ---
// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const salarioRaw = resolvedParams.salario as string;
  
  let title = "Rescisão CLT 2026: Calcule Agora (Com Multa de 40% e Férias)";
  let description = "Vai sair da empresa? Evite prejuízo. Simulador Grátis de Rescisão com cálculo exato de Multa FGTS, Aviso Prévio e Férias. Verifique seus direitos!";

  if (salarioRaw) {
    const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(salarioRaw));
    title = `Simulação de Rescisão: Salário de ${valorFormatado} - Calculadora 2026`;
    description = `Veja quanto você vai receber de rescisão com um salário de ${valorFormatado}. Cálculo completo com FGTS, Férias e Decimo Terceiro.`;
  }

  return {
    title,
    description,
    keywords: [
      "calculadora rescisão", 
      "calcular acerto trabalhista", 
      "simulador rescisão contrato", 
      "cálculo demissão sem justa causa", 
      "multa 40% fgts valor", 
      "aviso prévio indenizado",
      "direitos trabalhistas demissão",
      ...(salarioRaw ? [`rescisão salário ${salarioRaw}`, `calcular acerto ${salarioRaw}`] : [])
    ],
    alternates: {
      canonical: "https://mestredascontas.com.br/trabalhista/rescisao",
    },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/trabalhista/rescisao",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Simulador de Rescisão CLT" }],
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
    { q: "Qual o prazo para a empresa pagar a rescisão?", a: "A empresa tem até 10 dias corridos após o último dia de trabalho (ou da notificação da demissão) para pagar as verbas. Se atrasar, paga multa de um salário." },
    { q: "A multa de 40% é sobre qual valor?", a: "É calculada sobre o saldo total histórico de depósitos do FGTS feitos pela empresa durante todo o contrato, incluindo juros, mesmo que você já tenha sacado parte dele (como no Saque-Aniversário)." },
    { q: "Quem pede demissão saca o FGTS?", a: "Não. Ao pedir demissão, o saldo do FGTS fica retido na conta (conta inativa) e você não recebe a multa de 40%, nem tem direito ao Seguro-Desemprego." },
    { q: "Como funciona o aviso prévio?", a: "Se a empresa te demitir, ela deve te avisar 30 dias antes (trabalhado) ou te pagar esse mês sem você trabalhar (indenizado). A cada ano de casa, você ganha 3 dias a mais de aviso indenizado." }
];

// --- 2. DADOS ESTRUTURADOS (Article + FAQ) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Rescisão CLT",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online gratuita para cálculo de rescisão de contrato de trabalho (CLT), incluindo multa do FGTS e aviso prévio.",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "15420", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Rescisão de Contrato CLT",
      "description": "Veja o passo a passo para simular seu acerto trabalhista.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Dados Básicos",
          "text": "Informe seu último salário bruto e as datas de admissão e afastamento."
        },
        {
          "@type": "HowToStep",
          "name": "Motivo da Saída",
          "text": "Selecione se foi Demissão sem Justa Causa, Pedido de Demissão ou Acordo. Isso muda tudo."
        },
        {
           "@type": "HowToStep",
           "name": "Aviso Prévio",
           "text": "Indique se o aviso foi Trabalhado ou Indenizado para o cálculo correto."
        },
        {
          "@type": "HowToStep",
          "name": "FGTS e Férias",
          "text": "Se houver multa de 40% ou férias vencidas, preencha os campos adicionais para somar ao total."
        }
      ]
    },
    {
      "@type": "TechArticle",
      "headline": "Guia Definitivo da Rescisão: Seus Direitos na Ponta do Lápis",
      "description": "Aprenda a calcular seu acerto, entenda a multa do FGTS e os prazos de pagamento segundo a CLT.",
      "proficiencyLevel": "Beginner",
      "datePublished": "2024-01-15",
      "dateModified": new Date().toISOString(),
      "author": { "@type": "Organization", "name": "Equipe Jurídica Mestre das Contas", "url": "https://mestredascontas.com.br/sobre" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
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

export default async function RescisaoPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-slate-400 dark:text-slate-500">Carregando Calculadora...</div>}>
                    <TerminationCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-200 dark:border-slate-800 pt-3">
                    <Link href="https://mestredascontas.com.br/trabalhista/rescisao" target="_blank" className="text-[10px] text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Briefcase size={10} /> Powered by Mestre das Contas
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
      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 sm:px-6 pt-4 md:pt-6 max-w-7xl mx-auto w-full">
        <PageHeader 
          title="Calculadora de Rescisão"
          description="Foi demitido ou está pensando em pedir demissão? Use nosso simulador oficial para calcular seu acerto trabalhista: Aviso Prévio, Férias, 13º Salário e a Multa do FGTS."
          category="Direito Trabalhista"
          icon={<Briefcase size={32} strokeWidth={2} />}
          variant="default" // Azul/Indigo
          categoryColor="blue"
          badge="Atualizado 2026"
          rating={4.9}
          reviews={15420}
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Rescisão CLT" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="rescisao_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
              <Suspense fallback={
                <div className="h-96 w-full bg-slate-50 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                        <Briefcase className="animate-bounce text-slate-300" size={32}/>
                        <span>Carregando Calculadora...</span>
                    </div>
                </div>
              }>
                  <PrivacyBadge />
                  <TerminationCalculator />
              </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full mx-auto flex justify-center my-6 print:hidden rounded-3xl overflow-hidden">
            <LazyAdUnit slot="rescisao_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DENSO --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg w-full max-w-none mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              Entenda o seu Acerto Trabalhista
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            O momento da rescisão é delicado e, muitas vezes, confuso. São diversos direitos acumulados que, somados, formam o valor final do seu "acerto".
          </p>
          <p>
            Infelizmente, muitos trabalhadores perdem dinheiro simplesmente por não saberem conferir se a empresa pagou todas as verbas corretamente. A verdade é que o cálculo depende de dois fatores: quem tomou a decisão de encerrar o contrato e quanto tempo você ficou na empresa.
          </p>

          {/* CARDS VISUAIS DAS VERBAS */}
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
              <Wallet className="text-green-600" /> O que compõe o seu pagamento?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
              <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3 text-lg">
                      <FileText className="text-blue-600 dark:text-blue-400" size={20} /> Aviso Prévio
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      É a comunicação antecipada da saída. Se a empresa te demitir e pedir para você sair hoje ("indenizado"), ela deve pagar 1 salário + <strong>3 dias extras para cada ano</strong> que você trabalhou lá (Lei 12.506).
                  </p>
              </div>
              <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                  <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3 text-lg">
                      <Coins className="text-amber-600 dark:text-amber-500" size={20} /> Férias + 1/3
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Você recebe: 
                      1) Férias vencidas (que não tirou); 
                      2) Férias proporcionais (meses trabalhados no ano atual). 
                      Sobre tudo isso, incide o adicional de <strong>um terço (33,33%)</strong>.
                  </p>
              </div>
              <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-green-300 dark:hover:border-green-700 transition-colors">
                  <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3 text-lg">
                      <Scale className="text-green-600 dark:text-green-500" size={20} /> Multa de 40% do FGTS
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Se foi demitido sem justa causa, a empresa paga uma multa de 40% sobre <strong>todo o valor que ela depositou</strong> durante o contrato. Esse dinheiro vai direto para sua conta.
                  </p>
              </div>
              <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                  <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3 text-lg">
                      <Calculator className="text-purple-600 dark:text-purple-500" size={20} /> 13º Salário Proporcional
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Funciona como um relógio: para cada mês que você trabalhou mais de 15 dias no ano, você ganha o direito a <strong>1/12 do seu salário</strong>.
                  </p>
              </div>
          </div>

          {/* HISTÓRIA DA MULTA (CURIOSIDADE) */}
          <div className="bg-blue-50/60 dark:bg-blue-900/40 p-6 md:p-8 rounded-2xl border border-blue-100 dark:border-blue-900/50 my-12 not-prose relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <History size={140} className="text-blue-900 dark:text-blue-200"/>
              </div>
              
              <h3 className="text-xl font-bold text-blue-900 dark:text-white mb-4 flex items-center gap-2 relative z-10">
                  <BookOpen size={24} className="text-blue-600 dark:text-blue-400"/> Você Sabia? A História da Multa de 40%
              </h3>
              
              <div className="space-y-4 text-slate-700 dark:text-slate-200 relative z-10 text-sm md:text-base leading-relaxed">
                  <p>
                      A famosa multa de 40% do FGTS nem sempre existiu. Ela nasceu com a <strong>Constituição de 1988</strong>.
                  </p>
                  <p>
                      Antes de 1966, existia a "estabilidade decenal": quem completava 10 anos de empresa não podia ser demitido. O FGTS foi criado como uma alternativa a isso, mas ainda era barato demitir.
                  </p>
                  <p>
                      A Constituição de 88, visando proteger o trabalhador contra a "despedida arbitrária", criou a multa indenizatória. Inicialmente era 10%, depois subiu para 40%, tornando a demissão mais custosa para a empresa.
                  </p>
              </div>
          </div>

          {/* TABELA COMPARATIVA (PEDIDO DEMISSÃO vs DEMITIDO) */}
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-10 mb-6">
              O que eu perco se pedir demissão?
          </h3>
          <p>
              Essa é a dúvida mais comum. Ao pedir demissão, você abre mão de dois grandes direitos: a <strong>Multa do FGTS</strong> e o <strong>Seguro-Desemprego</strong>. Veja a comparação completa:
          </p>

          <div className="my-8">
              {/* DESKTOP TABLE */}
              <div className="hidden md:block overflow-hidden border rounded-xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                  <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white uppercase text-xs">
                          <tr>
                              <th className="px-6 py-4 font-extrabold border-b border-slate-200 dark:border-slate-700">Verba / Direito</th>
                              <th className="px-6 py-4 text-center bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-100 border-l border-b border-blue-100 dark:border-blue-800">Demitido (Sem Justa Causa)</th>
                              <th className="px-6 py-4 text-center bg-orange-50 dark:bg-orange-900/40 text-orange-800 dark:text-orange-100 border-l border-b border-orange-100 dark:border-orange-800">Pediu Demissão</th>
                              <th className="px-6 py-4 text-center bg-red-50 dark:bg-red-900/40 text-red-800 dark:text-red-100 border-l border-b border-red-100 dark:border-red-800">Justa Causa</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="px-6 py-4 font-medium">Saldo de Salário</td>
                              <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold border-l border-slate-100 dark:border-slate-800"><Check size={16} className="inline mr-1"/> Recebe</td>
                              <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold border-l border-slate-100 dark:border-slate-800"><Check size={16} className="inline mr-1"/> Recebe</td>
                              <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold border-l border-slate-100 dark:border-slate-800"><Check size={16} className="inline mr-1"/> Recebe</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="px-6 py-4 font-medium">Férias Vencidas + 1/3</td>
                              <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold border-l border-slate-100 dark:border-slate-800"><Check size={16} className="inline mr-1"/> Recebe</td>
                              <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold border-l border-slate-100 dark:border-slate-800"><Check size={16} className="inline mr-1"/> Recebe</td>
                              <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold border-l border-slate-100 dark:border-slate-800"><Check size={16} className="inline mr-1"/> Recebe</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="px-6 py-4 font-medium">13º Proporcional</td>
                              <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold border-l border-slate-100 dark:border-slate-800"><Check size={16} className="inline mr-1"/> Recebe</td>
                              <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold border-l border-slate-100 dark:border-slate-800"><Check size={16} className="inline mr-1"/> Recebe</td>
                              <td className="px-6 py-4 text-center text-red-500 dark:text-red-400 font-bold border-l border-slate-100 dark:border-slate-800"><XCircle size={16} className="inline mr-1"/> Perde</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
                              <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Aviso Prévio</td>
                              <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold border-l border-slate-100 dark:border-slate-800"><Check size={16} className="inline mr-1"/> Recebe</td>
                              <td className="px-6 py-4 text-center text-red-500 dark:text-red-400 font-bold border-l border-slate-100 dark:border-slate-800"><XCircle size={16} className="inline mr-1"/> Desconta</td>
                              <td className="px-6 py-4 text-center text-red-500 dark:text-red-400 font-bold border-l border-slate-100 dark:border-slate-800"><XCircle size={16} className="inline mr-1"/> Perde</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
                              <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Multa 40% FGTS</td>
                              <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold border-l border-slate-100 dark:border-slate-800"><Check size={16} className="inline mr-1"/> Recebe</td>
                              <td className="px-6 py-4 text-center text-red-500 dark:text-red-400 font-bold border-l border-slate-100 dark:border-slate-800"><XCircle size={16} className="inline mr-1"/> Perde</td>
                              <td className="px-6 py-4 text-center text-red-500 dark:text-red-400 font-bold border-l border-slate-100 dark:border-slate-800"><XCircle size={16} className="inline mr-1"/> Perde</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
                              <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Saque FGTS</td>
                              <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold border-l border-slate-100 dark:border-slate-800"><Check size={16} className="inline mr-1"/> Saca</td>
                              <td className="px-6 py-4 text-center text-red-500 dark:text-red-400 font-bold border-l border-slate-100 dark:border-slate-800"><XCircle size={16} className="inline mr-1"/> Retido</td>
                              <td className="px-6 py-4 text-center text-red-500 dark:text-red-400 font-bold border-l border-slate-100 dark:border-slate-800"><XCircle size={16} className="inline mr-1"/> Retido</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              {/* MOBILE CARDS (COMPARATIVO SIMPLIFICADO) */}
              <div className="md:hidden space-y-4">
                 {[
                    { title: "Saldo de Salário", demitido: true, pediu: true, justa: true },
                    { title: "Férias Vencidas + 1/3", demitido: true, pediu: true, justa: true },
                    { title: "13º Proporcional", demitido: true, pediu: true, justa: false },
                    { title: "Aviso Prévio", demitido: true, pediu: "desconta", justa: false, highlight: true },
                    { title: "Multa 40% FGTS", demitido: true, pediu: false, justa: false, highlight: true },
                    { title: "Saque FGTS", demitido: true, pediu: false, justa: false, highlight: true },
                 ].map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border flex flex-col gap-3 ${item.highlight ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
                        <div className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-700 pb-2 mb-1">
                            {item.title}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                             <div className="flex flex-col gap-1 items-center">
                                 <span className="text-blue-600 dark:text-blue-400 font-bold uppercase text-[9px]">Demitido</span>
                                 {item.demitido === true ? <CheckCircle2 className="text-green-500" size={20}/> : <XCircle className="text-red-500" size={20}/>}
                             </div>
                             <div className="flex flex-col gap-1 items-center">
                                 <span className="text-orange-600 dark:text-orange-400 font-bold uppercase text-[9px]">Pediu</span>
                                 {item.pediu === true ? <CheckCircle2 className="text-green-500" size={20}/> : item.pediu === "desconta" ? <span className="text-red-500 font-bold text-[10px]">Paga</span> : <XCircle className="text-red-500" size={20}/>}
                             </div>
                             <div className="flex flex-col gap-1 items-center">
                                 <span className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[9px]">J. Causa</span>
                                 {item.justa === true ? <CheckCircle2 className="text-green-500" size={20}/> : <XCircle className="text-red-500" size={20}/>}
                             </div>
                        </div>
                    </div>
                 ))}
              </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 not-prose" id="faq">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <HelpCircle className="text-blue-600 dark:text-blue-500" /> Perguntas Frequentes
            </h3>
            <div className="space-y-3">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                    <summary className="font-semibold text-slate-800 dark:text-slate-200 flex justify-between items-center text-sm select-none">
                      {item.q} <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 animate-in fade-in">
                      {item.a}
                    </p>
                  </details>
              ))}
            </div>
          </div>

          {/* RESUMO FINAL */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mt-12 mb-8">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                  <AlertTriangle className="text-amber-500" size={20}/> Importante: A Homologação
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-0 leading-relaxed">
                  O cálculo de rescisão envolve muitas variáveis e é comum haver erros. Use o <strong>Mestre das Contas</strong> para ter uma estimativa precisa, mas lembre-se: a homologação final deve ser conferida pelo seu sindicato ou advogado trabalhista, especialmente em contratos longos. Seus direitos são inegociáveis.
              </p>
          </div>

          {/* CROSS-LINKING */}
          </div>
          
          <RelatedTools currentToolLink="/trabalhista/rescisao" category="trabalhista" />



        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="rescisao_bottom" format="horizontal" variant="software" />
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