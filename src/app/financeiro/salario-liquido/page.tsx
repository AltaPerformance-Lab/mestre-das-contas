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
  Coins, Briefcase, Wallet, FileText, Lightbulb, Landmark, Scale, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";


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
      canonical: "https://mestredascontas.com.br/financeiro/salario-liquido" },
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

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Salário Líquido 2026",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para cálculo de salário líquido CLT com tabelas INSS e IRRF 2026." },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "O que são 'Outros Descontos' na calculadora?", "acceptedAnswer": { "@type": "Answer", "text": "São descontos específicos do seu contrato ou empresa. Exemplos comuns: coparticipação em plano de saúde, mensalidade sindical, previdência privada da empresa, vale alimentação (parte do funcionário) ou empréstimos consignados." } },
        { "@type": "Question", "name": "O Vale Transporte é sempre descontado?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, se você optar por receber o benefício. A lei permite que a empresa desconte até 6% do seu salário base. Se o valor do vale for menor que esses 6%, o desconto deve ser limitado ao valor real do benefício." } },
        { "@type": "Question", "name": "O desconto do INSS mudou em 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. As faixas salariais são reajustadas anualmente conforme o aumento do salário mínimo e a inflação (INPC). Nossa calculadora já está configurada com a tabela vigente." } }
      ]
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular o Salário Líquido 2026",
      "description": "Descubra o passo a passo para calcular seu holerite completo.",
      "step": [
        { "@type": "HowToStep", "name": "Salário Bruto", "text": "Informe o valor do seu salário registrado em carteira (sem descontos)." },
        { "@type": "HowToStep", "name": "Dependentes", "text": "Coloque o número de filhos ou dependentes legais para dedução do Imposto de Renda." },
        { "@type": "HowToStep", "name": "Outros Descontos", "text": "Inclua valores de plano de saúde, pensão alimentícia ou empréstimos." },
        { "@type": "HowToStep", "name": "Resultado", "text": "Veja o valor final já com as deduções de INSS e IRRF aplicadas." }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" },
        { "@type": "ListItem", "position": 2, "name": "Financeiro", "item": "https://mestredascontas.com.br/financeiro" },
        { "@type": "ListItem", "position": 3, "name": "Salário Líquido", "item": "https://mestredascontas.com.br/financeiro/salario-liquido" }
      ]
    }
  ]
};

export default async function SalarioLiquidoPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
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

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Conteúdo verificado com base em fórmulas de matemática financeira e indicadores econômicos vigentes em 2026.</span>
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

        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg w-full max-w-none mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden print:hidden">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
                Entenda o Mistério do seu Holerite
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
                Vamos ser sinceros: muitos trabalhadores brasileiros levam um susto ao abrir o aplicativo do banco no dia do pagamento. O valor contratado era um, mas o que caiu na conta foi outro.
            </p>
            <p>
                Isso não é erro do RH (na maioria das vezes). Isso acontece porque o regime CLT prevê que o governo pegue a parte dele "na fonte", antes mesmo do dinheiro tocar suas mãos.
            </p>
            <p>
                Para entender exatamente para onde vai o seu dinheiro, precisamos olhar para os dois grandes "sócios" do seu salário: o <strong>INSS</strong> (Sua Aposentadoria) e o <strong>IRRF</strong> (O Leão). Abaixo, vamos desvendar essa caixa preta.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <FileText className="text-blue-500" /> A Matemática da "Dedução em Cascata"
            </h3>
            <p>
                O cálculo não é feito subtraindo tudo de uma vez. A lei exige uma "ordem de prioridade". Veja como funciona:
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
                <ol className="space-y-4 marker:text-blue-600 dark:marker:text-blue-400 marker:font-bold m-0 list-decimal pl-5">
                    <li><strong className="text-slate-900 dark:text-slate-100">O Bruto (Start):</strong> Começamos com o valor base contratado + horas extras + comissões.</li>
                    <li><strong className="text-slate-900 dark:text-slate-100">O Corte do INSS:</strong> O INSS é calculado primeiro. Ele reduz o valor base para o próximo imposto.</li>
                    <li><strong className="text-slate-900 dark:text-slate-100">A Base do Leão:</strong> Pegamos o resultado anterior (Bruto - INSS) e subtraímos <strong>R$ 189,59 por cada dependente</strong>.</li>
                    <li><strong className="text-slate-900 dark:text-slate-100">O Corte do IRRF:</strong> Agora sim, aplicamos a mordida do Imposto de Renda.</li>
                    <li><strong className="text-slate-900 dark:text-slate-100">O Líquido (Goal):</strong> Tiramos Vale Transporte e outros. O resultado é o seu Salário Líquido.</li>
                </ol>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-3">
                <BookOpen className="text-blue-600 dark:text-blue-500" /> Tabela INSS 2026
            </h3>
            <p className="mb-4">Confira as faixas salariais e alíquotas oficiais vigentes para o ano de 2026:</p>
            <div className="overflow-x-auto mb-8 not-prose">
                <table className="w-full text-sm text-left border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <tr>
                            <th className="p-3">Faixa Salarial (INSS)</th>
                            <th className="p-3">Alíquota</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-600 dark:text-slate-300">
                        <tr><td className="p-3">Até R$ 1.621,00</td><td className="p-3">11%</td></tr>
                        <tr><td className="p-3">De R$ 1.621,01 a R$ 4.174,58</td><td className="p-3">12%</td></tr>
                        <tr><td className="p-3">De R$ 4.174,59 a R$ 8.475,55</td><td className="p-3">14%</td></tr>
                        <tr><td className="p-3">Acima de R$ 8.475,55</td><td className="p-3">16%</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-600 dark:text-blue-500" /> Dúvidas Frequentes (FAQ)
            </h3>
            <div className="space-y-4">
                <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer transition-all">
                    <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                        O que são "Outros Descontos" na calculadora?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700 pt-3 text-sm">
                        São descontos específicos do seu contrato ou empresa. Exemplos comuns: coparticipação em plano de saúde, mensalidade sindical, previdência privada da empresa, vale alimentação (parte do funcionário) ou empréstimos consignados.
                    </p>
                </details>

                <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer transition-all">
                    <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                        O Vale Transporte é sempre descontado?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700 pt-3 text-sm">
                        Sim, se você optar por receber o benefício. A lei permite que a empresa desconte até 6% do seu salário base. Se o valor do vale for menor que esses 6%, o desconto deve ser limitado ao valor real do benefício.
                    </p>
                </details>

                <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer transition-all">
                    <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                        O desconto do INSS mudou em 2026?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700 pt-3 text-sm">
                        Sim. As faixas salariais são reajustadas anualmente conforme o aumento do salário mínimo e a inflação (INPC). Nossa calculadora já está configurada com a tabela vigente.
                    </p>
                </details>
            </div>
        </div>

        <ExpertSignature updatedAt="Maio de 2026" />
        <SmartCrossLinker currentHref="/financeiro/salario-liquido" category="financeiro" />

        <div className="w-full flex justify-center my-8 print:hidden">
            <LazyAdUnit slot="salario_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}