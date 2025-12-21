import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import TerminationCalculator from "@/components/calculators/TerminationCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Briefcase, HelpCircle, History, BookOpen, 
  CheckCircle2, Coins, Calculator, 
  Wallet, FileText, Scale, Check, XCircle, 
  AlertTriangle, Clock, CalendarDays
} from "lucide-react";

// --- 1. METADATA (SEO MAXIMIZADO) ---
export const metadata: Metadata = {
  title: "Calculadora de Rescisão CLT 2025 | Cálculo Exato (Com Multa FGTS)",
  description: "Foi demitido ou pediu demissão? Simule seu acerto trabalhista agora. Cálculo exato de Aviso Prévio, Férias, 13º Salário e Multa de 40% do FGTS. Atualizado 2025.",
  keywords: [
    "calculadora rescisão", 
    "calcular acerto trabalhista", 
    "simulador rescisão contrato", 
    "cálculo demissão sem justa causa", 
    "multa 40% fgts valor", 
    "aviso prévio indenizado",
    "direitos trabalhistas demissão"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/trabalhista/rescisao",
  },
  openGraph: {
    title: "Calculadora de Rescisão de Contrato 2025 - Mestre das Contas",
    description: "Não assine nada sem conferir. Simule seu acerto trabalhista completo em segundos.",
    url: "https://mestredascontas.com.br/trabalhista/rescisao",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "https://mestredascontas.com.br/og-rescisao.png", width: 1200, height: 630, alt: "Simulador de Rescisão CLT" }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

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
      "@type": "Article",
      "headline": "Guia Definitivo da Rescisão: Seus Direitos na Ponta do Lápis",
      "description": "Aprenda a calcular seu acerto, entenda a multa do FGTS e os prazos de pagamento segundo a CLT.",
      "datePublished": "2024-01-15",
      "dateModified": new Date().toISOString(),
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } }
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
        <main className="w-full min-h-screen bg-slate-50 p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-slate-400">Carregando Calculadora...</div>}>
                    <TerminationCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-200 pt-3">
                    <Link href="https://mestredascontas.com.br/trabalhista/rescisao" target="_blank" className="text-[10px] text-slate-400 hover:text-blue-600 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
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
      <div className="px-4 pt-4 md:pt-6">
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
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="rescisao_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 p-1 md:p-2">
              <Suspense fallback={
                <div className="h-96 w-full bg-slate-50 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                        <Briefcase className="animate-bounce text-slate-300" size={32}/>
                        <span>Carregando Calculadora...</span>
                    </div>
                </div>
              }>
                  <TerminationCalculator />
              </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden">
            <AdUnit slot="rescisao_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DENSO --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              Entenda o seu Acerto Trabalhista
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            O momento da rescisão é delicado e, muitas vezes, confuso. São diversos direitos acumulados que, somados, formam o valor final do seu "acerto".
          </p>
          <p>
            Infelizmente, muitos trabalhadores perdem dinheiro simplesmente por não saberem conferir se a empresa pagou todas as verbas corretamente. A verdade é que o cálculo depende de dois fatores: quem tomou a decisão de encerrar o contrato e quanto tempo você ficou na empresa.
          </p>

          {/* CARDS VISUAIS DAS VERBAS */}
          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <Wallet className="text-green-600" /> O que compõe o seu pagamento?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-lg">
                      <FileText className="text-blue-600" size={20} /> Aviso Prévio
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                      É a comunicação antecipada da saída. Se a empresa te demitir e pedir para você sair hoje ("indenizado"), ela deve pagar 1 salário + <strong>3 dias extras para cada ano</strong> que você trabalhou lá (Lei 12.506).
                  </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-300 transition-colors">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-lg">
                      <Coins className="text-amber-600" size={20} /> Férias + 1/3
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                      Você recebe: 
                      1) Férias vencidas (que não tirou); 
                      2) Férias proporcionais (meses trabalhados no ano atual). 
                      Sobre tudo isso, incide o adicional de <strong>um terço (33,33%)</strong>.
                  </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-colors">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-lg">
                      <Scale className="text-green-600" size={20} /> Multa de 40% do FGTS
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                      Se foi demitido sem justa causa, a empresa paga uma multa de 40% sobre <strong>todo o valor que ela depositou</strong> durante o contrato. Esse dinheiro vai direto para sua conta.
                  </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-300 transition-colors">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-lg">
                      <Calculator className="text-purple-600" size={20} /> 13º Salário Proporcional
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                      Funciona como um relógio: para cada mês que você trabalhou mais de 15 dias no ano, você ganha o direito a <strong>1/12 do seu salário</strong>.
                  </p>
              </div>
          </div>

          {/* HISTÓRIA DA MULTA (CURIOSIDADE) */}
          <div className="bg-blue-50/60 p-6 md:p-8 rounded-2xl border border-blue-100 my-12 not-prose relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <History size={140} className="text-blue-900"/>
              </div>
              
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2 relative z-10">
                  <BookOpen size={24} className="text-blue-600"/> Você Sabia? A História da Multa de 40%
              </h3>
              
              <div className="space-y-4 text-slate-700 relative z-10 text-sm md:text-base leading-relaxed">
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
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-10 mb-6">
              O que eu perco se pedir demissão?
          </h3>
          <p>
              Essa é a dúvida mais comum. Ao pedir demissão, você abre mão de dois grandes direitos: a <strong>Multa do FGTS</strong> e o <strong>Seguro-Desemprego</strong>. Veja a comparação completa:
          </p>

          <div className="overflow-x-auto border rounded-xl border-slate-200 shadow-sm not-prose mb-10 bg-white">
              <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-xs">
                      <tr>
                          <th className="px-6 py-4 font-extrabold border-b border-slate-200">Verba / Direito</th>
                          <th className="px-6 py-4 text-center bg-blue-50 text-blue-800 border-l border-blue-100 border-b border-blue-100">Demitido (Sem Justa Causa)</th>
                          <th className="px-6 py-4 text-center bg-orange-50 text-orange-800 border-l border-orange-100 border-b border-orange-100">Pediu Demissão</th>
                          <th className="px-6 py-4 text-center bg-red-50 text-red-800 border-l border-red-100 border-b border-red-100">Justa Causa</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-700">Saldo de Salário</td>
                          <td className="px-6 py-4 text-center text-green-600 font-bold border-l border-slate-100"><Check size={16} className="inline mr-1"/> Recebe</td>
                          <td className="px-6 py-4 text-center text-green-600 font-bold border-l border-slate-100"><Check size={16} className="inline mr-1"/> Recebe</td>
                          <td className="px-6 py-4 text-center text-green-600 font-bold border-l border-slate-100"><Check size={16} className="inline mr-1"/> Recebe</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-700">Férias Vencidas + 1/3</td>
                          <td className="px-6 py-4 text-center text-green-600 font-bold border-l border-slate-100"><Check size={16} className="inline mr-1"/> Recebe</td>
                          <td className="px-6 py-4 text-center text-green-600 font-bold border-l border-slate-100"><Check size={16} className="inline mr-1"/> Recebe</td>
                          <td className="px-6 py-4 text-center text-green-600 font-bold border-l border-slate-100"><Check size={16} className="inline mr-1"/> Recebe</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-700">13º Proporcional</td>
                          <td className="px-6 py-4 text-center text-green-600 font-bold border-l border-slate-100"><Check size={16} className="inline mr-1"/> Recebe</td>
                          <td className="px-6 py-4 text-center text-green-600 font-bold border-l border-slate-100"><Check size={16} className="inline mr-1"/> Recebe</td>
                          <td className="px-6 py-4 text-center text-red-500 font-bold border-l border-slate-100"><XCircle size={16} className="inline mr-1"/> Perde</td>
                      </tr>
                      <tr className="hover:bg-slate-50 bg-slate-50/50">
                          <td className="px-6 py-4 font-bold text-slate-900">Aviso Prévio</td>
                          <td className="px-6 py-4 text-center text-green-600 font-bold border-l border-slate-100"><Check size={16} className="inline mr-1"/> Recebe</td>
                          <td className="px-6 py-4 text-center text-red-500 font-bold border-l border-slate-100"><XCircle size={16} className="inline mr-1"/> Desconta</td>
                          <td className="px-6 py-4 text-center text-red-500 font-bold border-l border-slate-100"><XCircle size={16} className="inline mr-1"/> Perde</td>
                      </tr>
                      <tr className="hover:bg-slate-50 bg-slate-50/50">
                          <td className="px-6 py-4 font-bold text-slate-900">Multa 40% FGTS</td>
                          <td className="px-6 py-4 text-center text-green-600 font-bold border-l border-slate-100"><Check size={16} className="inline mr-1"/> Recebe</td>
                          <td className="px-6 py-4 text-center text-red-500 font-bold border-l border-slate-100"><XCircle size={16} className="inline mr-1"/> Perde</td>
                          <td className="px-6 py-4 text-center text-red-500 font-bold border-l border-slate-100"><XCircle size={16} className="inline mr-1"/> Perde</td>
                      </tr>
                      <tr className="hover:bg-slate-50 bg-slate-50/50">
                          <td className="px-6 py-4 font-bold text-slate-900">Saque FGTS</td>
                          <td className="px-6 py-4 text-center text-green-600 font-bold border-l border-slate-100"><Check size={16} className="inline mr-1"/> Saca</td>
                          <td className="px-6 py-4 text-center text-red-500 font-bold border-l border-slate-100"><XCircle size={16} className="inline mr-1"/> Retido</td>
                          <td className="px-6 py-4 text-center text-red-500 font-bold border-l border-slate-100"><XCircle size={16} className="inline mr-1"/> Retido</td>
                      </tr>
                  </tbody>
              </table>
          </div>

          {/* FAQ */}
          <div className="mt-16 not-prose" id="faq">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                <HelpCircle className="text-blue-600" /> Perguntas Frequentes
            </h3>
            <div className="space-y-3">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 p-4 rounded-xl border border-slate-200 cursor-pointer open:bg-white open:shadow-md transition-all">
                    <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm select-none">
                      {item.q} <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                      {item.a}
                    </p>
                  </details>
              ))}
            </div>
          </div>

          {/* RESUMO FINAL */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-12 mb-8">
              <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="text-amber-500" size={20}/> Importante: A Homologação
              </h3>
              <p className="text-sm text-slate-600 mb-0 leading-relaxed">
                  O cálculo de rescisão envolve muitas variáveis e é comum haver erros. Use o <strong>Mestre das Contas</strong> para ter uma estimativa precisa, mas lembre-se: a homologação final deve ser conferida pelo seu sindicato ou advogado trabalhista, especialmente em contratos longos. Seus direitos são inegociáveis.
              </p>
          </div>

          {/* CROSS-LINKING */}
          <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <CheckCircle2 size={16} className="text-green-500"/> Outras Ferramentas Úteis:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Coins size={40} className="text-blue-600"/></div>
                  <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 group-hover:scale-110 transition-transform"><Coins size={20}/></div>
                  <span className="font-bold text-slate-800 group-hover:text-blue-600 text-lg">Salário Líquido</span>
                  <span className="text-sm text-slate-500 mt-1">Descontos do mês</span>
              </Link>
              
              <Link href="/trabalhista/ferias" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-lg transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Briefcase size={40} className="text-amber-600"/></div>
                  <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-amber-600 group-hover:scale-110 transition-transform"><Briefcase size={20}/></div>
                  <span className="font-bold text-slate-800 group-hover:text-amber-600 text-lg">Calculadora de Férias</span>
                  <span className="text-sm text-slate-500 mt-1">Venda de 10 dias</span>
              </Link>

              <Link href="/saude/imc" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-red-400 hover:shadow-lg transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Calculator size={40} className="text-red-600"/></div>
                  <div className="bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-red-600 group-hover:scale-110 transition-transform"><Calculator size={20}/></div>
                  <span className="font-bold text-slate-800 group-hover:text-red-600 text-lg">IMC Online</span>
                  <span className="text-sm text-slate-500 mt-1">Cuide da sua saúde</span>
              </Link>
            </div>
          </div>

        </div>

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <AdUnit slot="rescisao_bottom" format="horizontal" variant="software" />
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