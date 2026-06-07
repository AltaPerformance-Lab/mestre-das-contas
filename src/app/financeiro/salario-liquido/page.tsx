import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";
import { calculateSalary } from "@/lib/calculators/salary";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Calculator, HelpCircle, History, BookOpen, 
  TrendingUp, AlertTriangle, CheckCircle2, 
  Coins, Briefcase, Wallet, FileText, Landmark, Scale, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Salário Líquido 2026: Simule o Holerite CLT";
  const description = "Descubra o valor real do seu salário após descontos de INSS e IRRF em 2026. Simulação gratuita, rápida e atualizada com a nova tabela de impostos.";

  return {
    title,
    description,
    keywords: [
      "calculadora salário líquido", 
      "calcular desconto inss 2026", 
      "tabela irrf 2026", 
      "descontos folha de pagamento", 
      "salário liquido vs bruto", 
      "simulador clt 2026",
      "calcular holerite online"
    ],
    alternates: {
      canonical: "https://mestredascontas.com.br/financeiro/salario-liquido" 
    },
    openGraph: {
      title: "Calculadora de Salário Líquido 2026 | CLT e Descontos",
      description: "Saiba exatamente quanto você vai receber no final do mês após descontos de INSS e IRRF. Grátis e atualizado com a tabela 2026.",
      url: "https://mestredascontas.com.br/financeiro/salario-liquido",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Salário Líquido Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Quanto sobra do seu salário?",
      description: "Calcule seu salário líquido em segundos com os novos descontos de 2026.",
      images: ["/opengraph-image"],
    }
  };
}

// --- LISTA FAQ (Exatamente 7 Dúvidas Reais de Trabalhadores) ---
const faqList = [
  { 
    q: "Qual a diferença real entre Salário Bruto e Salário Líquido?", 
    a: "O salário bruto é o valor registrado em carteira de trabalho ou contrato de prestação de serviços, sem qualquer dedução legal. O salário líquido é o montante remanescente que de fato cai na sua conta bancária após os descontos obrigatórios de INSS, IRRF e eventuais benefícios." 
  },
  { 
    q: "Por que a tabela do INSS é chamada de progressiva?", 
    a: "A tabela progressiva do INSS incide de forma fatiada sobre o salário. O trabalhador não multiplica todo o salário por uma alíquota única. Em vez disso, paga taxas menores nas primeiras faixas salariais e alíquotas maiores nas faixas superiores, garantindo justiça tributária." 
  },
  { 
    q: "O desconto de 6% do Vale-Transporte é obrigatório?", 
    a: "Se o trabalhador optar por receber o vale-transporte para o deslocamento diário, a CLT autoriza o desconto de até 6% do salário básico do profissional. Caso o gasto real em passagens seja inferior a essa margem de 6%, desconta-se apenas o menor valor." 
  },
  { 
    q: "Dependentes ajudam a diminuir o Imposto de Renda?", 
    a: "Sim. A cada dependente legal declarado na folha de pagamento (como filhos menores, cônjuge sem renda, pais idosos), é deduzido o valor fixado pela Receita Federal (R$ 189,59 mensais por dependente) na base de cálculo tributária do IRRF." 
  },
  { 
    q: "Quais são as verbas de desconto mais comuns além dos impostos?", 
    a: "As despesas facultativas comuns englobam a coparticipação em plano de saúde ou odontológico, mensalidade sindical de associado, parcelas mensais de empréstimos consignados contratados e o adiantamento salarial concedido no meio do mês." 
  },
  { 
    q: "Eu posso recusar o desconto obrigatório do INSS no holerite?", 
    a: "Não. A contribuição previdenciária destinada ao INSS é compulsória por força de lei federal para todos os profissionais sob regime da CLT. O recolhimento serve para financiar o sistema público de previdência, aposentadorias e auxílios de saúde." 
  },
  { 
    q: "Fazer horas extras eleva o percentual dos meus impostos retidos?", 
    a: "Sim. Como as horas extraordinárias têm caráter de rendimento salarial tributável, elas somam-se ao salário bruto do mês. Isso eleva a base de incidência e pode deslocar o trabalhador para uma faixa de alíquota superior na tabela progressiva do IRRF." 
  }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO COM 7 FAQ) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Salário Líquido 2026",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para cálculo de salário líquido CLT com tabelas INSS e IRRF 2026."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular o Salário Líquido 2026",
      "description": "Aprenda a simular seus rendimentos CLT reais após todos os descontos de impostos.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        { 
          "@type": "HowToStep", 
          "name": "Insira o Salário Bruto", 
          "text": "Informe a remuneração nominal registrada na sua carteira de trabalho." 
        },
        { 
          "@type": "HowToStep", 
          "name": "Informe Dependentes", 
          "text": "Escreva a quantidade de dependentes diretos para abater na base de cálculo de IRRF." 
        },
        { 
          "@type": "HowToStep", 
          "name": "Adicione Descontos Adicionais", 
          "text": "Preencha custos com vale-transporte, convênios ou coparticipações se aplicável." 
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Guia do Salário Líquido CLT: Entenda a Tabela de INSS e IRRF e Evite Surpresas",
      "description": "Aprenda a decifrar a folha de pagamento analisando os descontos em cascata, alíquotas progressivas e deduções permitidas por lei.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-03-10",
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

export default async function SalarioLiquidoPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-4 sm:px-6 pt-4 md:pt-6 max-w-7xl mx-auto w-full">
        <PageHeader 
          title="Calculadora de Salário Líquido"
          description="Você sabe para onde vai o seu dinheiro? Descubra o valor real que cai na conta após os descontos do Leão (IRRF) e da Previdência (INSS) com as tabelas vigentes de 2026."
          category="Finanças Pessoais"
          icon={<Wallet size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="blue"
          badge="Tabela 2026"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Salário Líquido" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Conteúdo verificado com base em fórmulas de matemática financeira e de direito previdenciário vigentes em 2026.</span>
        </div>

        <div className="w-full mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="salario_top" format="horizontal" variant="agency" />
        </div>

        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
           <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-4 md:p-8">
              <PrivacyBadge />
              <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                <SalaryCalculator />
              </Suspense>
              <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                <DisclaimerBox />
              </div>
          </div>
        </section>

        <div className="w-full mx-auto flex justify-center my-6 print:hidden rounded-3xl overflow-hidden">
            <LazyAdUnit slot="salario_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DE ALTA PERFORMANCE (ADSENSE & AI GROUNDING) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden print:hidden">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
                O Mistério do Holerite: Desvendando a Diferença do Seu Salário
            </h2>
            
            <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
                Você já experimentou a frustrante e incômoda sensação de receber a proposta de um novo emprego com uma ótima faixa de rendimentos, para depois ver o saldo de contratação encolher de forma considerável?
            </p>

            <p>
                A verdade é que as deduções em folha no Brasil costumam assustar até os trabalhadores de nível pleno ou sênior mais experientes no mercado corporativo.
            </p>

            <p>
                Veja bem, o seu salário bruto funciona como o tanque de combustível cheio de um veículo preparado para realizar uma longa e produtiva viagem de trabalho.
            </p>

            <p>
                Nós colocamos o motor para rodar e gastamos tempo na rodovia da rotina corporativa; na hora do abastecimento do salário, o governo retira os impostos obrigatórios direto da bomba.
            </p>

            <p>
                Parece um processo burocrático e confuso, né? Mas entender a destinação e a progressividade de cada desconto no holerite dá a você total soberania sobre o seu planejamento financeiro pessoal.
            </p>

            <p>
                O melhor de tudo? Nós desenvolvemos uma análise profunda e intuitiva das diretrizes CLT vigentes em 2026 para que você faça contas precisas sem perder a paz!
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10 mb-4 border-l-4 border-blue-600 pl-4">
                Deduções do Salário CLT: Guia Geral de Descontos
            </h3>

            <p>
                Para além das deduções federais e previdenciárias clássicas da Previdência Social, a legislação faculta ao empregador realizar abatimentos específicos do salário base.
            </p>

            {/* TABELA DE DESCONTOS (MANDATORY RULE 4) */}
            <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm not-prose">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs md:text-sm">
                    <th className="p-4 border-b border-slate-200 font-bold">Categoria de Desconto</th>
                    <th className="p-4 border-b border-slate-200 font-bold">Natureza e Exigibilidade</th>
                    <th className="p-4 border-b border-slate-200 font-bold">Limite Legal de Abatimento</th>
                    <th className="p-4 border-b border-slate-200 font-bold">Impacto Prático</th>
                  </tr>
                </thead>
                <tbody className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                  <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 font-bold text-red-600">Previdência Social (<GlossaryTerm slug="inss-previdencia-social">INSS</GlossaryTerm>)</td>
                    <td className="p-4">Obrigatória (Regime Progressivo)</td>
                    <td className="p-4 font-mono">Teto Anual da Previdência</td>
                    <td className="p-4 text-xs">Desconto feito em fatias. Garante aposentadoria e auxílios de saúde.</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 font-bold text-red-600">Imposto de Renda (<GlossaryTerm slug="irrf-imposto-de-renda">IRRF</GlossaryTerm>)</td>
                    <td className="p-4">Obrigatória (Tabela Receita Federal)</td>
                    <td className="p-4 font-mono">Até 27,50%</td>
                    <td className="p-4 text-xs">Pode ser abatido por dependentes legais e despesas médicas dedutíveis.</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 font-bold text-amber-600">Vale-Transporte (VT)</td>
                    <td className="p-4">Opcional (Adesão do Funcionário)</td>
                    <td className="p-4 font-mono">Até 6,00% do Salário Base</td>
                    <td className="p-4 text-xs">Se o gasto real for inferior a 6%, o abatimento é limitado ao valor das passagens.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 font-bold text-emerald-600">Vale-Refeição / Alimentação</td>
                    <td className="p-4">Opcional (Regime PAT)</td>
                    <td className="p-4 font-mono">Até 20,00% do Custo do Benefício</td>
                    <td className="p-4 text-xs">Participação simbólica autorizada pelo Programa de Alimentação do Trabalhador.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 mt-10 mb-4">
                A Revolução da Cobrança em Fatias Progressivas do INSS
            </h3>

            <p>
              Muitos trabalhadores tentam replicar fórmulas antigas usando percentuais de desconto fixos sobre a totalidade do holerite.
            </p>

            <p>
              A verdade é que, após a aprovação da Reforma da Previdência, o <GlossaryTerm slug="inss-previdencia-social">INSS</GlossaryTerm> é calculado sob o regime de alíquotas progressivas fatiadas.
            </p>

            <p>
              Isso impede que uma pequena variação de salário promova um salto brusco e desproporcional nas contribuições tributárias globais.
            </p>

            <p>
              Dessa forma, o cálculo rateia a sua remuneração bruta em faixas isoladas de incidência, tornando as deduções mensais muito mais justas para os salários de base comercial.
            </p>

            <p>
              Para conferir essa complexa engrenagem previdenciária sem precisar de equações cansativas, conte sempre com a nossa calculadora oficial calibrada para 2026.
            </p>

            <ExpertSignature updatedAt="Junho de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
        </div>

        <SmartGlossaryLinker currentHref="/financeiro/salario-liquido" category="financeiro" />
        <SmartCrossLinker currentHref="/financeiro/salario-liquido" category="financeiro" />

        {/* FAQ */}
        <div className="max-w-4xl mx-auto w-full print:hidden" id="faq">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-500" /> Perguntas Frequentes sobre Salário Líquido (CLT)
            </h2>
            
            <div className="space-y-4">
            {faqList.map((item, idx) => (
                <details key={idx} className="group bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                    <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                        <div className="flex items-start gap-3">
                            <span className="text-blue-500 dark:text-blue-400 font-bold text-xs mt-1">#</span>
                            <span className="leading-snug text-slate-800 dark:text-slate-200 font-semibold">{item.q}</span>
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
        </div>

        <div className="w-full flex justify-center my-8 print:hidden">
            <LazyAdUnit slot="salario_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}