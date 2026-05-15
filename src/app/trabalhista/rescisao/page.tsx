import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import TerminationCalculator from "@/components/calculators/TerminationCalculator";
import { calculateTermination } from "@/lib/calculators/termination";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Briefcase, HelpCircle, History, BookOpen, 
  CheckCircle2, Coins, Calculator, 
  Wallet, FileText, Scale, Check, XCircle, 
  AlertTriangle, Clock, CalendarDays, ShieldCheck,
  TrendingDown, TrendingUp, RefreshCw
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";


// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Rescisão Trabalhista Grátis e Ilimitada 2026";
  const description = "Simulador 100% grátis e ilimitado de rescisão CLT 2026. Calcule sua multa do FGTS, férias e aviso prévio. Saiba quanto vai receber no seu acerto sem pagar nada.";

  return {
    title,
    description,
    keywords: [
      "calculadora rescisao gratis", 
      "simulador rescisao ilimitado", 
      "calcular acerto trabalhista", 
      "cálculo demissão sem justa causa", 
      "multa 40% fgts valor", 
      "aviso prévio indenizado",
      "direitos trabalhistas demissão"
    ],
    alternates: {
      canonical: "https://mestredascontas.com.br/trabalhista/rescisao" },
    openGraph: {
      title: "Calculadora de Rescisão Trabalhista Grátis e Ilimitada",
      description: "Saiba quanto vai receber no seu acerto trabalhista sem limites de uso. Simulação 100% gratuita de multa, aviso e férias.",
      url: "https://mestredascontas.com.br/trabalhista/rescisao",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Simulador de Rescisão Grátis e Ilimitado", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cálculo de Rescisão Grátis e Ilimitado",
      description: "Saiba seus direitos agora mesmo com nossa calculadora gratuita.",
      images: ["/opengraph-image"],
    },
    robots: { 
      index: true, 
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" } 
    }
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
      "name": "Calculadora de Rescisão Grátis e Ilimitada",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online gratuita para cálculo de rescisão de contrato de trabalho (CLT), incluindo multa do FGTS e aviso prévio." },
    {
      "@type": "HowTo",
      "name": "Como Calcular Rescisão de Contrato CLT",
      "description": "Veja o passo a passo para simular seu acerto trabalhista.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        { "@type": "HowToStep", "name": "Dados Básicos", "text": "Informe seu último salário bruto e as datas de admissão e afastamento." },
        { "@type": "HowToStep", "name": "Motivo da Saída", "text": "Selecione se foi Demissão sem Justa Causa, Pedido de Demissão ou Acordo. Isso muda tudo." },
        { "@type": "HowToStep", "name": "Aviso Prévio", "text": "Indique se o aviso foi Trabalhado ou Indenizado para o cálculo correto." },
        { "@type": "HowToStep", "name": "FGTS e Férias", "text": "Se houver multa de 40% ou férias vencidas, preencha os campos adicionais para somar ao total." }
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

export default async function RescisaoPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-4 sm:px-6 pt-4 md:pt-6 max-w-7xl mx-auto w-full">
        <PageHeader 
          title="Calculadora de Rescisão"
          description="Foi demitido ou está pensando em pedir demissão? Use nosso simulador oficial para calcular seu acerto trabalhista: Aviso Prévio, Férias, 13º Salário e a Multa do FGTS."
          category="Direito Trabalhista"
          icon={<Briefcase size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="blue"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Rescisão CLT" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Informações baseadas na Consolidação das Leis do Trabalho (CLT) e atualizações vigentes em 2026.</span>
        </div>

        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="rescisao_top" format="horizontal" variant="agency" />
        </div>

        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
              <PrivacyBadge />
              <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                <TerminationCalculator />
              </Suspense>
          </div>
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        <div className="w-full mx-auto flex justify-center my-6 print:hidden rounded-3xl overflow-hidden">
            <LazyAdUnit slot="rescisao_mid" format="auto" />
        </div>

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

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
              <Wallet className="text-green-600" /> O que compõe o seu pagamento?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
              <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3 text-lg">
                      <FileText className="text-blue-600 dark:text-blue-400" size={20} /> Aviso Prévio
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      É a comunicação antecipada da saída. Se a empresa te demitir e pedir para você sair hoje ("indenizado"), ela deve pagar 1 salário + <strong>3 dias extras para cada ano</strong> que você trabalhou lá.
                  </p>
              </div>
              <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
                  <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3 text-lg">
                      <Coins className="text-amber-600 dark:text-amber-500" size={20} /> Férias + 1/3
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Você recebe férias vencidas e proporcionais. Sobre tudo isso, incide o adicional de <strong>um terço (33,33%)</strong>.
                  </p>
              </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-10 mb-6">
              O que eu perco se pedir demissão?
          </h3>
          <p>
              Ao pedir demissão, você abre mão de dois grandes direitos: a <strong>Multa do FGTS</strong> e o <strong>Seguro-Desemprego</strong>.
          </p>

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
        </div>

        <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        <SmartCrossLinker currentHref="/trabalhista/rescisao" category="glossario" />
        <SmartCrossLinker currentHref="/trabalhista/rescisao" category="trabalhista" />

        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="rescisao_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}