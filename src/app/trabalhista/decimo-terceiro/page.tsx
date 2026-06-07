import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ThirteenthCalculator from "@/components/calculators/ThirteenthCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  AlertTriangle, Calendar, Coins, HelpCircle, 
  CheckCircle2, History, BookOpen, Calculator,
  Wallet, FileText, Scale, Briefcase, XCircle, Check, Gift,
  Landmark, TrendingUp, ShieldCheck, ExternalLink
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de 13º Salário 2026 | Simule Agora Grátis";
  const description = "Quer planejar o fim do ano com antecedência? Simule o valor exato das duas parcelas do seu 13º salário com descontos de INSS e IRRF. Grátis e online!";

  return {
    title,
    description,
    keywords: [
      "calculadora decimo terceiro", "calcular 13o salario", "primeira parcela 13", 
      "data pagamento decimo terceiro", "descontos 13o salario", "gratificação natalina",
      "decimo terceiro proporcional", "decimo terceiro maternidade", "calculo media horas extras 13"
    ],
    alternates: {
      canonical: "https://mestredascontas.com.br/trabalhista/decimo-terceiro" 
    },
    openGraph: {
      title,
      url: "https://mestredascontas.com.br/trabalhista/decimo-terceiro",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de 13º Salário Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Já sabe quanto vai receber de 13º?",
      images: ["/opengraph-image"],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } } };
}

// --- LISTA FAQ (Exatamente 7 Dúvidas Reais de Usuários) ---
const faqList = [
  { 
    q: "Quando deve ser paga a primeira parcela do 13º salário?", 
    a: "Por lei, o adiantamento da primeira parcela do 13º salário deve ser quitado entre o dia 1º de fevereiro e o dia 30 de novembro de cada ano. O empregador não é obrigado a pagar a todos os funcionários no mesmo mês." 
  },
  { 
    q: "Quando é feito o pagamento da segunda parcela do 13º?", 
    a: "O pagamento da segunda parcela do décimo terceiro salário deve ser depositado impreterivelmente até o dia 20 de dezembro de cada ano. Caso essa data caia em um fim de semana, a empresa é obrigada a antecipar o pagamento para o último dia útil anterior." 
  },
  { 
    q: "A primeira parcela do 13º salário tem descontos de impostos?", 
    a: "Não. A primeira parcela do 13º corresponde a exatamente 50% do salário bruto do trabalhador no mês anterior e entra na conta sem qualquer retenção de imposto. Todos os descontos previdenciários e fiscais são aplicados na segunda parcela." 
  },
  { 
    q: "Como funciona o cálculo do 13º proporcional para quem tem menos de um ano de empresa?", 
    a: "O trabalhador recebe 1/12 (um doze avos) do salário por cada mês trabalhado. Para que o mês seja computado no cálculo, é obrigatório ter trabalhado pelo menos 15 dias dentro daquele respectivo mês." 
  },
  { 
    q: "As horas extras e comissões integram o cálculo do décimo terceiro?", 
    a: "Sim. As horas extraordinárias, comissões, adicionais noturnos, de periculosidade ou insalubridade integram a base de cálculo. O departamento pessoal realiza uma média ponderada dos valores adicionais recebidos pelo trabalhador ao longo do ano comercial." 
  },
  { 
    q: "A trabalhadora em licença-maternidade tem direito a receber o 13º salário?", 
    a: "Sim. A trabalhadora sob licença-maternidade recebe o décimo terceiro de forma integral. Embora a empresa seja responsável por realizar o repasse do pagamento, ela abate esse montante final dos recolhimentos previdenciários devidos ao INSS." 
  },
  { 
    q: "Quem é demitido por justa causa perde o direito de receber o 13º proporcional?", 
    a: "Sim. De acordo com as leis do regime CLT, a rescisão de contrato por justa causa é a única hipótese em que o trabalhador perde completamente o direito de receber os avos proporcionais acumulados do 13º salário na quitação final." 
  }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO COM 7 FAQ) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de 13º Salário",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para cálculo de Décimo Terceiro salário com parcelas e descontos de INSS/IRRF."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular o 13º Salário",
      "description": "Veja como simular o valor das duas parcelas.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Salário Bruto",
          "text": "Digite o valor atual do seu salário na carteira de trabalho."
        },
        {
          "@type": "HowToStep",
          "name": "Meses Trabalhados",
          "text": "Informe a quantidade de meses inteiros de expediente no ano corrente."
        },
        {
          "@type": "HowToStep",
          "name": "Dependentes",
          "text": "Digite o número de dependentes legais para apuração da base tributária de IRRF."
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Guia Completo da Gratificação Natalina: Prazos, Divisões e Acertos do 13º",
      "description": "Entenda as regras das duas parcelas do décimo terceiro, as alíquotas de tributação e as médias de verbas extras.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-10-15",
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

export default function DecimoTerceiroPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de 13º Salário"
          description="Quanto vai cair na sua conta no fim do ano? Calcule o valor exato da 1ª parcela (adiantamento) e da 2ª parcela (quitação) com os devidos descontos."
          category="Direito Trabalhista"
          icon={<Gift size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="blue"
          badge="Tabela 2026"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "13º Salário" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO LEGAL (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Informações baseadas na Consolidação das Leis do Trabalho (CLT) e atualizações vigentes em 2026.</span>
        </div>

        {/* ALERTA DE PRAZOS */}
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 flex gap-3 items-start text-left shadow-sm max-w-3xl mx-auto w-full">
          <AlertTriangle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide">Fique Atento aos Prazos 2026</p>
            <p className="text-sm text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
              As empresas devem pagar a <strong>1ª parcela</strong> até <strong>30 de Novembro</strong> e a <strong>2ª parcela</strong> até <strong>20 de Dezembro</strong>. Atrasos geram multa administrativa.
            </p>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="13_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
            <PrivacyBadge />
            <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <ThirteenthCalculator />
            </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
            <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden">
            <LazyAdUnit slot="13_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DE ALTA PERFORMANCE (ADSENSE & AI GROUNDING) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              A Fascinante Realidade do Décimo Terceiro Salário
          </h2>
          
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Você já parou para pensar na incrível diferença que a chegada do <GlossaryTerm slug="decimo-terceiro-proporcional">décimo terceiro salário</GlossaryTerm> faz no planejamento das suas finanças e nas compras de final de ano?
          </p>

          <p>
            A verdade é que esse benefício trabalhista, conhecido oficialmente na legislação brasileira como Gratificação Natalina, funciona como um respiro e um combustível essencial para as famílias.
          </p>

          <p>
            Veja bem, o <GlossaryTerm slug="decimo-terceiro-proporcional">décimo terceiro salário</GlossaryTerm> representa o fechamento de um ciclo completo. Nós dedicamos 12 meses de suor e foco absoluto no crescimento das empresas.
          </p>

          <p>
            No final da jornada anual, é mais do que justo contar com uma fatia adicional de remuneração para comemorar com quem mais amamos ou colocar as pendências financeiras em dia.
          </p>

          <p>
            Parece uma conta simples, né? Mas quando começam a incidir os descontos do <GlossaryTerm slug="inss-previdencia-social">INSS</GlossaryTerm> e do <GlossaryTerm slug="irrf-imposto-de-renda">Imposto de Renda</GlossaryTerm> na segunda parcela, a empolgação pode dar lugar a muitas dúvidas.
          </p>

          <p>
            O melhor de tudo? Nós organizamos uma análise completa para você compreender o porquê de cada cobrança e simular o saldo exato que vai entrar na sua conta corrente!
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              Comparação Definitiva: 1ª Parcela vs 2ª Parcela
          </h3>

          <p>
            A maior surpresa para quem está ingressando no mercado de trabalho formal é notar a diferença gritante de valores entre o primeiro adiantamento e o acerto de quitação.
          </p>

          <p>
            Para esclarecer de vez essa diferença e evitar frustrações, estruturamos uma tabela comparativa direta detalhando os direitos e descontos de cada parcela do seu 13º.
          </p>

          <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full min-w-[600px] text-sm text-left border-collapse bg-white dark:bg-slate-900">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Critério</th>
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">1ª Parcela (Adiantamento)</th>
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">2ª Parcela (Quitação final)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-650 dark:text-slate-350">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Prazo de Recebimento</td>
                  <td className="px-6 py-4 text-xs">De 1º de fevereiro até 30 de novembro.</td>
                  <td className="px-6 py-4 text-xs font-semibold text-blue-600">Impreterivelmente até o dia 20 de dezembro.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Base de Cálculo</td>
                  <td className="px-6 py-4 text-xs">Exatamente 50% do salário bruto do mês anterior.</td>
                  <td className="px-6 py-4 text-xs">100% do salário, subtraindo os tributos e a 1ª parcela.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Descontos (INSS/IRRF)</td>
                  <td className="px-6 py-4 text-xs text-emerald-600 font-bold">Nenhum desconto (Você recebe o valor limpo).</td>
                  <td className="px-6 py-4 text-xs text-red-600 font-bold">Desconto integral de INSS e IRRF sobre o valor total.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
              <Calendar className="text-blue-600 dark:text-blue-400" /> Datas Críticas de Pagamento do 13º Salário
          </h3>
          
          <p>
            Diferente da remuneração diária normal, as parcelas da gratificação natalina possuem prazos de desembolso federais inalteráveis.
          </p>

          <div className="overflow-x-auto mb-10 not-prose rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <table className="w-full min-w-[600px] text-sm text-left border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-250">
                <tr>
                  <th className="p-4 font-bold border-b border-slate-200">Tipo de Pagamento</th>
                  <th className="p-4 font-bold border-b border-slate-200">Data Limite CLT</th>
                  <th className="p-4 font-bold border-b border-slate-200">Como Funciona</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-650 dark:text-slate-350">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Adiantamento Parcial</td>
                  <td className="p-4">30 de Novembro</td>
                  <td className="p-4 text-xs">Pode ser solicitado junto com as férias ou pago em lote pela empresa.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Quitação de Acerto</td>
                  <td className="p-4 text-red-600 font-bold">20 de Dezembro</td>
                  <td className="p-4 text-xs">Nessa fase também incide a média anual de comissões e horas extras.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-12 mb-6 flex items-center gap-2">
              <Landmark className="text-amber-600" /> A Fascinante História da Gratificação Natalina
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border-l-4 border-amber-400 dark:border-amber-500 my-6 not-prose shadow-sm text-slate-750 dark:text-slate-300">
            <p className="text-sm md:text-base leading-relaxed">
              Você sabia que o 13º salário foi conquistado sob intensa resistência no ano de 1962? A proposta gerou fortes campanhas nos principais veículos de imprensa da época, alegando que o adiantamento provocaria inflação generalizada e fecharia indústrias inteiras no país.
            </p>
            <p className="text-sm md:text-base leading-relaxed mt-4">
              Hoje, o benefício é a engrenagem mais importante para aquecer o varejo brasileiro no encerramento de cada ano, demonstrando que a valorização dos trabalhadores traz impactos sociais e econômicos positivos para todos.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
              <Calculator className="text-purple-600 dark:text-purple-400" /> A Regra dos 15 Dias e a Proporcionalidade
          </h3>
          <p>
            Muitas dúvidas surgem para quem está empregado há poucos meses: "Será que eu vou receber o décimo terceiro proporcional de forma correta?".
          </p>
          <p>
            A resposta é sim! O cálculo oficial consiste em fatiar o seu ordenado bruto por 12 meses e multiplicar a fração pelo tempo em serviço.
          </p>
          <p>
            Mas atenção ao grande segredo: a chamada **Regra dos 15 Dias** estabelece que se você trabalhou menos de 15 dias em um determinado mês, esse período é totalmente descartado da contagem proporcional do ano comercial.
          </p>

          {/* SEÇÃO FAQ COM 7 ITENS */}
          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-500" /> Perguntas Frequentes sobre 13º Salário
            </h3>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                      <summary className="font-semibold text-slate-850 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-blue-500 dark:text-blue-400 font-bold text-xs mt-1">#</span>
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
                  <a href="https://www.planalto.gov.br/ccivil_03/leis/l4090.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      Lei 4.090/1962 (Criação do 13º) <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      CLT (Direitos Adicionais e Médias) <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          <ExpertSignature updatedAt="Junho de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
        </div>

        <SmartGlossaryLinker currentHref="/trabalhista/decimo-terceiro" category="trabalhista" />
        <SmartCrossLinker currentHref="/trabalhista/decimo-terceiro" category="trabalhista" />

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="13_bottom" format="horizontal" variant="software" />
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