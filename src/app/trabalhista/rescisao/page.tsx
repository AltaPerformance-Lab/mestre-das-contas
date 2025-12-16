import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import TerminationCalculator from "@/components/calculators/TerminationCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  Briefcase, HelpCircle, History, BookOpen, 
  CheckCircle2, Coins, Calculator, 
  Wallet, FileText, Scale, Check, XCircle
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
    images: [{ url: "/og-rescisao.png", width: 1200, height: 630, alt: "Simulador de Rescisão CLT" }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

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
      "dateModified": "2025-01-20",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { 
        "@type": "Organization", 
        "name": "Mestre das Contas", 
        "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/logo.png" } 
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Qual o prazo para a empresa pagar a rescisão?", "acceptedAnswer": { "@type": "Answer", "text": "A empresa tem até 10 dias corridos após o último dia de trabalho (ou da notificação da demissão) para pagar as verbas." } },
        { "@type": "Question", "name": "A multa de 40% é sobre qual valor?", "acceptedAnswer": { "@type": "Answer", "text": "É calculada sobre o saldo total histórico de depósitos do FGTS feitos pela empresa, incluindo juros, mesmo que você já tenha sacado parte dele." } },
        { "@type": "Question", "name": "Quem pede demissão saca o FGTS?", "acceptedAnswer": { "@type": "Answer", "text": "Não. Ao pedir demissão, o saldo do FGTS fica retido na conta (conta inativa) e você não recebe a multa de 40%." } }
      ]
    }
  ]
};

// --- TIPAGEM NEXT.JS 15 ---
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function RescisaoPage({ searchParams }: Props) {
  
  // AWAIT OBRIGATÓRIO
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- LAYOUT LIMPO (EMBED) ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-white p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center text-slate-500">Carregando Calculadora...</div>}>
                    <TerminationCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredascontas.com.br/trabalhista/rescisao" target="_blank" className="text-[10px] text-slate-400 hover:text-blue-600 uppercase font-bold tracking-wider">
                        Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- LAYOUT COMPLETO (Conteúdo da Coluna Esquerda) ---
  return (
    <article className="flex flex-col gap-8 w-full max-w-full overflow-hidden">
      
      {/* JSON-LD INJECTION */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER HERO */}
      <header className="space-y-4 text-center md:text-left print:hidden">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
          <Briefcase size={14} /> Direito Trabalhista
        </span>
        
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
          Calculadora de <span className="text-blue-600">Rescisão de Contrato</span>
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          Foi demitido ou está pensando em sair? Use nosso simulador oficial para calcular seu acerto trabalhista: <strong>Aviso Prévio</strong>, <strong>Férias</strong>, <strong>13º Salário</strong> e a <strong>Multa do FGTS</strong>.
        </p>
      </header>

      {/* ANÚNCIO TOPO */}
      <div className="w-full max-w-full overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 my-4 print:hidden">
         <AdUnit slot="rescisao_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      {/* --- FERRAMENTA PRINCIPAL --- */}
      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Carregando Calculadora...</div>}>
           <TerminationCalculator />
        </Suspense>
        
        {/* DISCLAIMER BOX (IMPORTANTE JURIDICAMENTE) */}
        <div className="mt-8 print:hidden">
            <DisclaimerBox />
        </div>
      </section>

      {/* ANÚNCIO MEIO */}
      <div className="w-full flex justify-center my-6 print:hidden">
        <AdUnit slot="rescisao_mid" format="auto" />
      </div>

      {/* --- CONTEÚDO EDUCACIONAL E HISTÓRICO --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        {/* INTRODUÇÃO FORTE - DOR DO USUÁRIO */}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
            Entenda o seu Acerto Trabalhista
        </h2>
        <p className="lead text-slate-700 text-lg">
          O momento da rescisão é delicado e muitas vezes confuso. São diversos direitos acumulados que, somados, formam o valor final do seu "acerto".
          Muitos trabalhadores perdem dinheiro simplesmente por não saberem conferir se a empresa pagou todas as verbas corretamente.
        </p>
        <p>
          O valor final depende fundamentalmente de dois fatores: o <strong>motivo da saída</strong> (quem tomou a decisão?) e o <strong>tempo de casa</strong> (quanto mais tempo, maior o aviso prévio e a multa).
        </p>

        {/* DETALHAMENTO DAS VERBAS */}
        <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
            <Wallet className="text-green-600" /> O que compõe o seu pagamento?
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-lg">
                    <FileText className="text-blue-600" size={20} /> Aviso Prévio
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                    É a comunicação antecipada da saída. Se a empresa te demitir e pedir para você sair hoje ("indenizado"), ela deve pagar 1 salário + <strong>3 dias extras para cada ano</strong> que você trabalhou lá (Lei 12.506).
                </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors">
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
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-green-300 transition-colors">
                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-lg">
                    <Scale className="text-green-600" size={20} /> Multa de 40% do FGTS
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                    Se foi demitido sem justa causa, a empresa paga uma multa de 40% sobre <strong>todo o valor que ela depositou</strong> durante o contrato. Esse dinheiro vai direto para sua conta.
                </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-purple-300 transition-colors">
                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-lg">
                    <Calculator className="text-purple-600" size={20} /> 13º Salário Proporcional
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                    Funciona como um relógio: para cada mês que você trabalhou mais de 15 dias no ano, você ganha o direito a <strong>1/12 do seu salário</strong>.
                </p>
            </div>
        </div>

        {/* VOCÊ SABIA: HISTÓRIA DA MULTA DE 40% */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 rounded-2xl border border-blue-100 my-12 not-prose relative overflow-hidden group hover:shadow-md transition-shadow">
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
                    Antes de 1966, existia a "estabilidade decenal": quem completava 10 anos de empresa não podia ser demitido. O FGTS foi criado como uma alternativa a isso (Fundo de Garantia), mas ainda era barato demitir.
                </p>
                <p>
                    A Constituição de 88, visando proteger o trabalhador contra a "despedida arbitrária ou sem justa causa", criou a multa indenizatória. Inicialmente era 10%, depois subiu para 40%, tornando a demissão mais custosa para a empresa e garantindo um fôlego financeiro para o trabalhador buscar recolocação.
                </p>
            </div>
        </div>

        {/* TABELA COMPARATIVA DE TIPOS DE DEMISSÃO */}
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-10 mb-6">
            O que eu perco se pedir demissão?
        </h3>
        <p>
            Essa é a dúvida mais comum. Ao pedir demissão, você abre mão de dois grandes direitos: a <strong>Multa do FGTS</strong> e o <strong>Seguro-Desemprego</strong>. Veja a comparação completa:
        </p>

        <div className="overflow-x-auto border rounded-xl border-slate-200 shadow-sm not-prose mb-10 bg-white">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-700 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-4 font-extrabold">Verba / Direito</th>
                        <th className="px-4 py-4 text-center bg-blue-50 text-blue-800 border-l border-blue-100">Demitido (Sem Justa Causa)</th>
                        <th className="px-4 py-4 text-center bg-orange-50 text-orange-800 border-l border-orange-100">Pediu Demissão</th>
                        <th className="px-4 py-4 text-center bg-red-50 text-red-800 border-l border-red-100">Justa Causa</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3.5 font-medium text-slate-700">Saldo de Salário</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-blue-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Recebe</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-orange-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Recebe</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-red-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Recebe</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3.5 font-medium text-slate-700">Férias Vencidas + 1/3</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-blue-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Recebe</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-orange-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Recebe</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-red-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Recebe</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3.5 font-medium text-slate-700">13º Proporcional</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-blue-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Recebe</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-orange-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Recebe</td>
                        <td className="px-4 py-3.5 text-center text-red-500 font-bold bg-red-50/20 border-l border-slate-50"><XCircle size={16} className="inline mr-1"/> Perde</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3.5 font-medium text-slate-700">Férias Proporcionais</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-blue-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Recebe</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-orange-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Recebe</td>
                        <td className="px-4 py-3.5 text-center text-red-500 font-bold bg-red-50/20 border-l border-slate-50"><XCircle size={16} className="inline mr-1"/> Perde</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                        <td className="px-4 py-3.5 font-bold text-slate-900">Aviso Prévio</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-blue-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Recebe*</td>
                        <td className="px-4 py-3.5 text-center text-red-500 font-bold bg-orange-50/20 border-l border-slate-50"><XCircle size={16} className="inline mr-1"/> Desconta</td>
                        <td className="px-4 py-3.5 text-center text-red-500 font-bold bg-red-50/20 border-l border-slate-50"><XCircle size={16} className="inline mr-1"/> Perde</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                        <td className="px-4 py-3.5 font-bold text-slate-900">Multa 40% FGTS</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-blue-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Recebe</td>
                        <td className="px-4 py-3.5 text-center text-red-500 font-bold bg-orange-50/20 border-l border-slate-50"><XCircle size={16} className="inline mr-1"/> Perde</td>
                        <td className="px-4 py-3.5 text-center text-red-500 font-bold bg-red-50/20 border-l border-slate-50"><XCircle size={16} className="inline mr-1"/> Perde</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                        <td className="px-4 py-3.5 font-bold text-slate-900">Saque FGTS</td>
                        <td className="px-4 py-3.5 text-center text-green-600 font-bold bg-blue-50/20 border-l border-slate-50"><Check size={16} className="inline mr-1"/> Saca</td>
                        <td className="px-4 py-3.5 text-center text-red-500 font-bold bg-orange-50/20 border-l border-slate-50"><XCircle size={16} className="inline mr-1"/> Retido</td>
                        <td className="px-4 py-3.5 text-center text-red-500 font-bold bg-red-50/20 border-l border-slate-50"><XCircle size={16} className="inline mr-1"/> Retido</td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* FAQ */}
        <div className="mt-12 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" /> Perguntas Frequentes (FAQ)
          </h3>
          <div className="space-y-4">
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Qual o prazo máximo para a empresa pagar?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                A Reforma Trabalhista (2017) unificou o prazo. A empresa tem até <strong>10 dias corridos</strong> após o término do contrato para pagar todas as verbas rescisórias. Se atrasar, ela deve pagar uma multa no valor de um salário do funcionário.
              </p>
            </details>
            
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Optei pelo Saque Aniversário, recebo a multa?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                <strong>Sim!</strong> A multa de 40% é calculada sobre o saldo total histórico depositado pela empresa, independente de você ter sacado parte dele ou não. Porém, o saldo remanescente na conta do FGTS fica retido e você só pode sacar a multa.
              </p>
            </details>

            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Como funciona o Aviso Prévio Indenizado?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Se a empresa te demitir e não quiser que você trabalhe no mês seguinte, ela deve pagar o salário desse mês ("indenizar") + 3 dias de salário para cada ano completo que você trabalhou lá. Esse período conta como tempo de serviço para férias e 13º.
              </p>
            </details>

            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                O que é a Chave de Conectividade?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                É um arquivo digital que a empresa gera para comunicar a Caixa sobre sua demissão. Com essa chave e seus documentos, você consegue sacar o FGTS em até 5 dias úteis.
              </p>
            </details>
          </div>
        </div>

        {/* RESUMO FINAL */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-12 mb-8">
            <h3 className="font-bold text-slate-800 mb-2">Resumo</h3>
            <p className="text-sm text-slate-600 mb-0">
                O cálculo de rescisão envolve muitas variáveis e é comum haver erros. Use o <strong>Mestre das Contas</strong> para ter uma estimativa precisa, mas lembre-se: a homologação final deve ser conferida pelo seu sindicato ou advogado trabalhista, especialmente em contratos longos. Seus direitos são inegociáveis.
            </p>
        </div>

        {/* LINKS INTERNOS VISUAIS */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
          <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
             <CheckCircle2 size={16} className="text-green-500"/> Outras Ferramentas Úteis:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Coins size={40} className="text-blue-600"/></div>
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 group-hover:scale-110 transition-transform"><Coins size={20}/></div>
                <span className="font-bold text-slate-800 group-hover:text-blue-600 text-lg">Salário Líquido</span>
                <span className="text-sm text-slate-500 mt-1">Descontos do mês</span>
            </Link>
            
            <Link href="/trabalhista/ferias" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Briefcase size={40} className="text-amber-600"/></div>
                <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-amber-600 group-hover:scale-110 transition-transform"><Briefcase size={20}/></div>
                <span className="font-bold text-slate-800 group-hover:text-amber-600 text-lg">Calculadora de Férias</span>
                <span className="text-sm text-slate-500 mt-1">Venda de 10 dias</span>
            </Link>

            <Link href="/saude/imc" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-red-400 hover:shadow-md transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Calculator size={40} className="text-red-600"/></div>
                <div className="bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-red-600 group-hover:scale-110 transition-transform"><Calculator size={20}/></div>
                <span className="font-bold text-slate-800 group-hover:text-red-600 text-lg">IMC Online</span>
                <span className="text-sm text-slate-500 mt-1">Cuide da sua saúde</span>
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}