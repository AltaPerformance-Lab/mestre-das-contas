import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import VacationCalculator from "@/components/calculators/VacationCalculator";
import { calculateVacation } from "@/lib/calculators/vacation";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  AlertTriangle, Calendar, Coins, HelpCircle, 
  CheckCircle2, History, BookOpen, Calculator,
  Wallet, Sun, Palmtree, Clock, FileText, Check, Briefcase, XCircle,
  Landmark, ExternalLink, Plane, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Férias 2026 | Simule seu Valor Líquido";
  const description = "Vai tirar férias e quer simular o seu ganho real? Calcule o valor das suas férias com o terço constitucional, abono pecuniário e descontos. Grátis e rápido!";

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
      "quanto recebo de férias liquido"
    ],
    alternates: {
      canonical: "https://mestredascontas.com.br/trabalhista/ferias" 
    },
    openGraph: {
      title,
      url: "https://mestredascontas.com.br/trabalhista/ferias",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Férias Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Hora de descansar? Saiba quanto vai receber!",
      images: ["/opengraph-image"],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } } };
}

// --- LISTA FAQ (Exatamente 7 Dúvidas Reais de Usuários) ---
const faqList = [
  { 
    q: "O que é o período aquisitivo e o período concessivo de férias?", 
    a: "O período aquisitivo corresponde aos 12 meses de trabalho que você precisa completar na empresa para adquirir o direito a tirar férias. Já o período concessivo refere-se aos 12 meses subsequentes, período no qual a empresa é obrigada por lei a conceder os seus dias de descanso." 
  },
  { 
    q: "Quando o pagamento das férias deve ser feito por lei?", 
    a: "O pagamento das férias, incluindo o acréscimo constitucional de 1/3, deve ser depositado integralmente na conta do trabalhador até 2 dias antes do início do descanso. Caso a empresa atrase, ela é obrigada por lei a pagar o valor total das férias em dobro." 
  },
  { 
    q: "Posso vender quantos dias das minhas férias?", 
    a: "De acordo com as regras da CLT, o trabalhador pode converter em dinheiro (<GlossaryTerm slug=\"abono-pecuniario-venda-ferias\">abono pecuniário</GlossaryTerm>) até 1/3 do total de dias de férias a que tem direito. Portanto, para quem tem direito a 30 dias de férias no ano, o limite máximo permitido para venda é de 10 dias." 
  },
  { 
    q: "O abono pecuniário (venda de férias) sofre descontos de impostos?", 
    a: "Não. Essa é uma das principais vantagens financeiras de vender parte das férias. O valor recebido pela venda dos 10 dias e o seu respectivo terço constitucional de férias são totalmente isentos de descontos de INSS e Imposto de Renda (IRRF)." 
  },
  { 
    q: "Como funciona o fracionamento das férias em até três vezes?", 
    a: "A legislação permite dividir as férias em até três períodos, desde que haja concordância do trabalhador. Dentre esses períodos, um deles não pode ser inferior a 14 dias corridos, e nenhum dos outros períodos restantes pode ser menor do que 5 dias corridos cada." 
  },
  { 
    q: "As férias podem começar em qualquer dia da semana?", 
    a: "Não. A CLT proíbe expressamente o início das férias nos dois dias que antecedem um feriado ou o dia de Descanso Semanal Remunerado (DSR). Portanto, para quem folga aos sábados e domingos, as férias não podem ter início em uma quinta ou sexta-feira." 
  },
  { 
    q: "O que acontece se a empresa não conceder as férias no prazo correto?", 
    a: "Se o empregador não conceder as férias ao trabalhador dentro do limite do período concessivo (12 meses após a aquisição do direito), a empresa será penalizada e obrigada a pagar a remuneração das férias vencidas em dobro, além de estar sujeita a autuações administrativas." 
  }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO COM 7 FAQ) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Férias",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para cálculo de férias, abono pecuniário e 1/3 constitucional."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Férias com Venda de 10 Dias",
      "description": "Aprenda a simular seu valor de férias líquidas e abono pecuniário passo a passo.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Informe o Salário Bruto",
          "text": "Digite o seu salário contratual em carteira de trabalho para iniciar os cálculos."
        },
        {
          "@type": "HowToStep",
          "name": "Escolha os Dias de Gozo",
          "text": "Selecione se pretende descansar 30, 20 ou 15 dias no ano."
        },
        {
          "@type": "HowToStep",
          "name": "Configure a Venda (Abono)",
          "text": "Ative a venda de 10 dias se preferir receber o abono pecuniário de férias."
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Guia Completo de Férias CLT: Períodos, Venda e Remuneração Líquida",
      "description": "Aprenda a planejar suas férias entendendo o período aquisitivo e concessivo, regras de faltas e impostos retidos.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-11-01",
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

export default async function FeriasPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 sm:px-6 pt-4 md:pt-6 max-w-7xl mx-auto w-full">
        <PageHeader 
          title="Calculadora de Férias"
          description="Chegou a hora do descanso! Simule o valor líquido das suas férias, incluindo a opção de vender 10 dias (abono pecuniário) e adiantar o 13º salário."
          category="Direito Trabalhista"
          icon={<Palmtree size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="amber" 
          badge="Tabela 2026"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Férias" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO LEGAL (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Informações baseadas na Consolidação das Leis do Trabalho (CLT) e atualizações vigentes em 2026.</span>
        </div>

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
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="ferias_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
            <PrivacyBadge />
            <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
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

        {/* --- CONTEÚDO EDUCACIONAL DENSO (ADSENSE & AI GROUNDING RICH) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-amber-500 pl-4">
              O Segredo Oculto no Cálculo das Férias Trabalhistas
          </h2>
          
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Você já sentiu aquela incrível sensação de alívio ao ver a data das suas férias se aproximando, para logo depois se deparar com a clássica confusão de como calcular o valor líquido a receber?
          </p>

          <p>
            A verdade é que planejar o merecido descanso é maravilhoso, mas a matemática que envolve as férias no regime CLT pode parecer um verdadeiro labirinto cheio de regras.
          </p>

          <p>
            Veja bem, as férias funcionam como um saldo de bateria recarregável. Nós passamos um ano inteiro desgastando nossas energias e investindo dedicação no trabalho.
          </p>

          <p>
            Quando o ciclo se fecha, a legislação nos concede a chance de desconectar sem que nosso bolso sofra com a perda de rendimentos.
          </p>

          <p>
            O melhor de tudo? Além do adiantamento integral do seu salário normal, você ainda conta com o reforço financeiro do famoso 1/3 Constitucional de férias!
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2 border-l-4 border-amber-500 pl-4">
              Período Aquisitivo vs Período Concessivo: Evite Mal-Entendidos
          </h3>

          <p>
            Um dos maiores equívocos cometidos no dia a dia das empresas diz respeito aos prazos e conceitos de aquisição e concessão dos dias de folga.
          </p>

          <p>
            Para que você nunca mais seja pego de surpresa, estruturamos uma comparação clara e direta sobre a diferença fundamental entre essas duas etapas previstas em lei.
          </p>

          <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full min-w-[600px] text-sm text-left border-collapse bg-white dark:bg-slate-900">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Conceito</th>
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Período Aquisitivo</th>
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Período Concessivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-650 dark:text-slate-350">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">O que significa?</td>
                  <td className="px-6 py-4 text-xs">Os primeiros 12 meses em que você trabalha na empresa para ganhar o direito.</td>
                  <td className="px-6 py-4 text-xs">Os 12 meses seguintes nos quais o patrão deve obrigar você a descansar.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Quem decide a data?</td>
                  <td className="px-6 py-4 text-xs">Fase de contagem automática de dias prestados e faltas injustificadas.</td>
                  <td className="px-6 py-4 text-xs font-semibold text-amber-600">A decisão final da data cabe exclusivamente ao empregador.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Consequência de Atrasos</td>
                  <td className="px-6 py-4 text-xs">Caso seja demitido antes de tirar, recebe férias proporcionais.</td>
                  <td className="px-6 py-4 text-xs font-semibold text-red-600">Se passar do prazo final, o patrão deve pagar tudo em dobro!</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
              <BookOpen className="text-amber-600 dark:text-amber-500" /> Tabela de Faltas e Seus Reflexos nas Férias
          </h3>
          
          <p className="mb-6">
            Fique extremamente atento: suas ausências sem justificativa legal ao longo do ano interferem diretamente no tempo de descanso regulamentado. 
          </p>
          
          <div className="overflow-x-auto mb-10 not-prose rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full min-w-[600px] text-sm text-left border-collapse bg-white dark:bg-slate-900">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                <tr>
                  <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">Faltas Injustificadas no Ano</th>
                  <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Dias de Férias Restantes</th>
                  <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">Impacto Legal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-650 dark:text-slate-350">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">Até <strong>5 faltas</strong></td>
                  <td className="p-4 text-center font-bold text-emerald-600">30 dias</td>
                  <td className="p-4 text-xs">Sem penalidades aplicadas.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">De <strong>6 a 14 faltas</strong></td>
                  <td className="p-4 text-center font-bold text-slate-800 dark:text-slate-100">24 dias</td>
                  <td className="p-4 text-xs">Perda de 6 dias de repouso.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">De <strong>15 a 23 faltas</strong></td>
                  <td className="p-4 text-center font-bold text-slate-800 dark:text-slate-100">18 dias</td>
                  <td className="p-4 text-xs">Perda de 12 dias de repouso.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">De <strong>24 a 32 faltas</strong></td>
                  <td className="p-4 text-center font-bold text-slate-800 dark:text-slate-100">12 dias</td>
                  <td className="p-4 text-xs">Perda de 18 dias de repouso.</td>
                </tr>
                <tr className="bg-red-50/50 dark:bg-red-900/20 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                  <td className="p-4 font-bold text-red-900 dark:text-red-400">Acima de 32 faltas</td>
                  <td className="p-4 text-center font-black text-red-600">0 dias</td>
                  <td className="p-4 font-bold text-red-800 dark:text-red-450 text-xs">Perda total do direito ao descanso anual.</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-2 text-[10px] text-slate-400 text-center italic p-2 bg-slate-50 dark:bg-slate-800">* Apenas ausências não justificadas reduzem o prazo. Atestados médicos legais mantêm seu saldo intocado.</p>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
              <FileText className="text-slate-500 dark:text-slate-400" /> A Anatomia das Verbas do Seu Holerite de Férias
          </h3>

          <p>
            Muitas pessoas consideram o desconto do INSS e do Imposto de Renda (IRRF) nas férias um mistério absoluto. 
          </p>

          <p>
            A verdade é que os tributos incidem sobre a maior parte do salário que você recebe antecipadamente e seu respectivo terço de férias.
          </p>

          <p>
            Apenas uma saída legal muito atraente! Se você decidir realizar a venda das férias (<GlossaryTerm slug="abono-pecuniario-venda-ferias">abono pecuniário</GlossaryTerm>), esse saldo extra entra direto na sua conta, 100% livre de qualquer tributação.
          </p>

          <div className="my-8 not-prose border rounded-xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Incidência de Impostos nas Férias</h4>
              <span className="text-xs text-slate-500 font-medium">Instrução Normativa RFB</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs">
                <tr>
                  <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Verba / Parcela Recebida</th>
                  <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Desconto de INSS</th>
                  <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Desconto de IRRF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Férias Gozadas (Descanso Normal)</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400 font-bold text-[10px] uppercase bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full"><XCircle size={12}/> Sim</span></td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400 font-bold text-[10px] uppercase bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full"><XCircle size={12}/> Sim</span></td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">1/3 Constitucional sobre os Dias de Descanso</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400 font-bold text-[10px] uppercase bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full"><XCircle size={12}/> Sim</span></td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400 font-bold text-[10px] uppercase bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full"><XCircle size={12}/> Sim</span></td>
                </tr>
                <tr className="bg-green-50/50 dark:bg-green-900/10 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                  <td className="px-6 py-4 font-bold text-green-800 dark:text-green-300">Abono Pecuniário (Venda dos 10 Dias)</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-green-700 dark:text-green-300 font-bold text-[10px] uppercase bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full border border-green-200"><Check size={12}/> Isento</span></td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-green-700 dark:text-green-300 font-bold text-[10px] uppercase bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full border border-green-200"><Check size={12}/> Isento</span></td>
                </tr>
                <tr className="bg-green-50/50 dark:bg-green-900/10 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                  <td className="px-6 py-4 font-bold text-green-800 dark:text-green-300">1/3 Constitucional sobre o Abono</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-green-700 dark:text-green-300 font-bold text-[10px] uppercase bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full border border-green-200"><Check size={12}/> Isento</span></td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-green-700 dark:text-green-300 font-bold text-[10px] uppercase bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full border border-green-200"><Check size={12}/> Isento</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">
              Dica Pro: Maximize Sua Renda unindo Férias e Décimo Terceiro
          </h3>

          <p>
            Você sabia que é possível unir forças com a primeira parcela do seu 13º salário e programá-la para cair no mesmo depósito de férias?
          </p>

          <p>
            Isso cria uma volumosa injeção de liquidez na sua conta corrente logo antes de embarcar em sua viagem.
          </p>

          <p>
            No entanto, fique muito atento aos prazos burocráticos! O requerimento para receber a antecipação deve ser realizado por escrito ao departamento de recursos humanos até o dia 31 de janeiro de cada ano.
          </p>

          {/* FAQ ACORDION COM 7 ITENS */}
          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-amber-500" /> Dúvidas Frequentes sobre Férias (CLT)
            </h3>
            
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-amber-100 dark:open:ring-amber-900/30 transition-all">
                      <summary className="font-semibold text-slate-850 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-amber-500 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug text-slate-850 dark:text-slate-200">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-650 dark:text-slate-350 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm animate-in fade-in">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* REFERÊNCIAS OFICIAIS */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Legislação e Fontes Oficiais
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Consulte diretamente a legislação original:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      CLT - Artigos 129 a 153 (Férias) <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.tst.jus.br/sumulas" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      Súmula 450 TST (Pagamento no Prazo) <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          <ExpertSignature updatedAt="Junho de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
        </div>

        <SmartGlossaryLinker currentHref="/trabalhista/ferias" />
        <SmartCrossLinker currentHref="/trabalhista/ferias" category="trabalhista" />

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