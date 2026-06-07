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
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Rescisão CLT 2026: Calcule seu Acerto Online";
  const description = "Vai sair da empresa e quer simular o valor exato do seu acerto? Calcule sua rescisão CLT em segundos com FGTS, férias, 13º e aviso prévio. Grátis e online!";

  return {
    title,
    description,
    keywords: [
      "calculadora rescisao gratis", 
      "simulador rescisao ilimitado", 
      "calcular acerto trabalhista", 
      "cálculo demissão sem justa causa", 
      "multa 40 fgts valor", 
      "aviso prévio indenizado",
      "direitos trabalhistas demissão"
    ],
    alternates: {
      canonical: "https://mestredascontas.com.br/trabalhista/rescisao" 
    },
    openGraph: {
      title,
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
      images: ["/opengraph-image"],
    },
    robots: { 
      index: true, 
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" } 
    }
  };
}

// --- LISTA FAQ (Exatamente 7 Dúvidas Reais de Usuários) ---
const faqList = [
  { 
    q: "Qual o prazo exato para a empresa pagar o meu acerto?", 
    a: "De acordo com o artigo 477 da CLT, a empresa tem o prazo máximo de até 10 dias corridos a contar do término do contrato de trabalho para efetuar o pagamento integral das verbas rescisórias. Atrasos geram multa equivalente a um salário mensal." 
  },
  { 
    q: "A multa de 40% do FGTS é calculada sobre o saldo atual ou total?", 
    a: "A multa de 40% incide sobre o saldo histórico total depositado pelo empregador durante a vigência do contrato, corrigido monetariamente. Mesmo se você tiver realizado saques como o saque-aniversário, a base de cálculo permanece inalterada." 
  },
  { 
    q: "Quem pede demissão tem direito de sacar o FGTS e a multa?", 
    a: "Não. Ao solicitar voluntariamente a dispensa, o trabalhador abre mão do direito ao saque imediato das contas do FGTS e da multa rescisória de 40%, além de não ser elegível à habilitação no programa de Seguro-Desemprego." 
  },
  { 
    q: "Como funciona na prática o Aviso Prévio?", 
    a: "O aviso prévio é a comunicação formal do desligamento. Se indenizado, o trabalhador é liberado imediatamente e recebe o salário do mês. Se trabalhado, o profissional cumpre a jornada habitual, tendo redução de 2h diárias ou folga de 7 dias." 
  },
  { 
    q: "Se eu fiz acordo com o patrão (demissão consensual), o que eu perco?", 
    a: "No modelo de acordo comum estabelecido pela Reforma Trabalhista, o aviso prévio indenizado e a multa rescisória caem pela metade (20% de multa). O saque do FGTS é limitado a 80% do saldo, e o trabalhador não recebe o seguro-desemprego." 
  },
  { 
    q: "Tenho férias vencidas. Elas entram no cálculo com algum acréscimo?", 
    a: "Sim. Quaisquer períodos de férias vencidas ou proporcionais devem ser integralmente pagos no termo de rescisão de contrato, acrescidos obrigatoriamente do bônus constitucional de 1/3 sobre o valor de cada período apurado." 
  },
  { 
    q: "Fui demitido por justa causa, saio com uma mão na frente e outra atrás?", 
    a: "Na demissão por justa causa, penalidade máxima da CLT, você perde o aviso prévio, 13º proporcional, férias proporcionais, o saque do FGTS, a multa rescisória e o seguro-desemprego. Recebe-se apenas saldo de salário e férias vencidas." 
  }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO COM 7 FAQ) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Rescisão CLT",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online gratuita para cálculo de rescisão de contrato de trabalho (CLT), incluindo multa do FGTS e aviso prévio."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Rescisão de Contrato CLT",
      "description": "Veja o passo a passo para simular seu acerto trabalhista de forma gratuita.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        { 
          "@type": "HowToStep", 
          "name": "Insira Dados Básicos", 
          "text": "Preencha o valor do seu salário bruto recente e o número de dependentes declarados." 
        },
        { 
          "@type": "HowToStep", 
          "name": "Indique as Datas", 
          "text": "Informe a data oficial de admissão e a data de encerramento das atividades na empresa." 
        },
        { 
          "@type": "HowToStep", 
          "name": "Escolha a Modalidade de Saída", 
          "text": "Selecione a causa do desligamento (sem justa causa, pedido de demissão, acordo consensual)." 
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

export default async function RescisaoPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
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
        
        {/* REVISÃO LEGAL (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Informações baseadas na Consolidação das Leis do Trabalho (CLT) e atualizações vigentes em 2026.</span>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="rescisao_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
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

        {/* ANÚNCIO MEIO */}
        <div className="w-full mx-auto flex justify-center my-6 print:hidden rounded-3xl overflow-hidden">
            <LazyAdUnit slot="rescisao_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DE ALTA PERFORMANCE (ADSENSE & AI GROUNDING) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              O Acerto de Contas: Desvendando a Rescisão Trabalhista
          </h2>
          
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Você já teve a incômoda e angustiante sensação de estar totalmente desamparado ao ler as dezenas de siglas complicadas contidas no seu termo de rescisão de contrato?
          </p>

          <p>
            A verdade é que colocar um ponto final em um vínculo profissional representa um momento de intensa transição emocional e, sobretudo, financeira.
          </p>

          <p>
            Veja bem, a rescisão trabalhista funciona como a devolução amigável de equipamentos ao fim de uma longa expedição pelas montanhas.
          </p>

          <p>
            Nós investimos nossa energia e acumulamos conquistas; na hora do retorno, precisamos catalogar cada suprimento e garantir que o acerto seja distribuído de forma justa.
          </p>

          <p>
            Parece uma conta simples de resolver, né? Mas quando começamos a misturar aviso prévio trabalhado com aviso indenizado e a multa rescisória, o cálculo pode dar um verdadeiro nó na cabeça.
          </p>

          <p>
            O melhor de tudo? Nós estruturamos um roteiro completo de direitos para você compreender a destinação de cada centavo sem deixar margem para erros!
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-10 mb-4 border-l-4 border-blue-600 pl-4">
              Rescisão Comparada: Direitos em Cada Modalidade de Desligamento
          </h3>

          <p>
            O maior fator que determina a quantidade de verbas depositadas na conta do trabalhador é a causa jurídica do fim da relação de trabalho.
          </p>

          <p>
            Para dar a você total segurança e clareza sobre onde seu caso se enquadra, elaboramos uma tabela comparativa direta e em HTML puro das principais modalidades de rescisão.
          </p>

          <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm not-prose">
            <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs md:text-sm">
                  <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold">Verba Rescisória</th>
                  <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-center">Sem Justa Causa</th>
                  <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-center">Pedido de Demissão</th>
                  <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-center">Acordo Consensual</th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Saldo de Salário (Dias)</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400 font-bold">Pago 100%</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400 font-bold">Pago 100%</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400 font-bold">Pago 100%</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Férias Vencidas e Proporcionais</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400 font-bold">Pagas + 1/3</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400 font-bold">Pagas + 1/3</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400 font-bold">Pagas + 1/3</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Aviso Prévio Indenizado</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400 font-bold">Pago 100%</td>
                  <td className="p-4 text-center text-amber-500 font-bold">Paga/Desconta 100%</td>
                  <td className="p-4 text-center text-amber-500 font-bold">Pago 50% (Metade)</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Multa Compensatória FGTS</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400 font-bold">40% do Total</td>
                  <td className="p-4 text-center text-red-500 font-bold">Perde o direito</td>
                  <td className="p-4 text-center text-amber-500 font-bold">20% (Metade)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Saque e Seguro Desemprego</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400 font-bold">Sacável e Habilitado</td>
                  <td className="p-4 text-center text-red-500 font-bold">FGTS retido / Sem seguro</td>
                  <td className="p-4 text-center text-amber-500 font-bold">Saca 80% / Sem seguro</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-10 mb-4">
              O Impacto das Férias e Décimo Terceiro Proporcionais
          </h3>

          <p>
            Muitos profissionais desconhecem como é apurado o saldo do 13º salário e das férias acumuladas quando o ano civil ainda está em curso.
          </p>

          <p>
            A verdade é que a contagem é feita em frações chamadas "avos". Para cada período de 30 dias de trabalho, você adquire 1/12 (um doze avos) do seu direito integral.
          </p>

          <p>
            No entanto, lembre-se do gatilho legal: se você trabalhou 15 dias ou mais dentro de um respectivo mês, aquele período conta como um avo cheio. Se trabalhou 14 dias ou menos, o mês é sumariamente ignorado.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-10 mb-4">
              A Regra dos 10 Dias e a Multa por Atraso da Rescisão
          </h3>

          <p>
            A contagem dos prazos de acerto rescisório costuma gerar grandes desentendimentos nas tratativas diretas com o departamento de Recursos Humanos.
          </p>

          <p>
            O melhor de tudo? A CLT estabelece que, independentemente do tipo de <GlossaryTerm slug="aviso-previo-trabalhista">aviso prévio</GlossaryTerm>(trabalhado ou indenizado), o depósito integral deve ser compensado em **até 10 dias corridos** após o desligamento.
          </p>

          <p>
            Se a sua empresa extrapolar esse prazo limite, o artigo 477 da CLT garante uma multa severa em seu favor, correspondente ao valor de um salário bruto adicional.
          </p>

          <SmartGlossaryLinker currentHref="/trabalhista/rescisao" />
          <SmartCrossLinker currentHref="/trabalhista/rescisao" category="trabalhista" />

          {/* SEÇÃO FAQ COM 7 ITENS */}
          <div className="mt-16 not-prose" id="faq">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <HelpCircle className="text-blue-600 dark:text-blue-500" /> Perguntas Frequentes sobre Rescisão
            </h2>
            <div className="space-y-3">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                    <summary className="font-semibold text-slate-800 dark:text-slate-200 flex justify-between items-center text-sm md:text-base select-none">
                      <div className="flex items-start gap-3">
                        <span className="text-blue-500 dark:text-blue-400 font-bold text-xs mt-1">#</span>
                        <span className="leading-snug text-slate-800 dark:text-slate-200">{item.q}</span>
                      </div>
                      <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                    </summary>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 animate-in fade-in">
                      {item.a}
                    </p>
                  </details>
              ))}
            </div>
          </div>
        </div>

        <ExpertSignature updatedAt="Junho de 2026" author="Rodrigo Costa (Analista de Sistemas)" />

        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="rescisao_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}