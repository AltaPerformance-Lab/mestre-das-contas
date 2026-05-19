import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import IrpfCalculator from "@/components/calculators/IrpfCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Landmark, Info, ShieldCheck, HelpCircle, 
  TrendingUp, Award, Calculator, CheckCircle2, ExternalLink
} from "lucide-react";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora e Simulador de Imposto de Renda (IRPF) 2025-2026";
  const description = "Simule sua declaração de IRPF (Exercício 2026, Ano-Calendário 2025). Compare o modelo Completo (Deduções Legais) com o Simplificado e saiba se tem imposto a restituir ou pagar.";

  return {
    title,
    description,
    keywords: [
      "calculadora de imposto de renda", 
      "simulador irpf 2026", 
      "restituicao imposto de renda", 
      "irpf simplificado vs completo", 
      "tabela imposto de renda 2025", 
      "deducoes imposto de renda"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/financeiro/imposto-de-renda" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/financeiro/imposto-de-renda",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Simulador de Imposto de Renda Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    }
  };
}

// --- DADOS ESTRUTURADOS & FAQ ---
const faqList = [
  {
    q: "Quem é obrigado a declarar o Imposto de Renda em 2026 (Ano-Calendário 2025)?",
    a: "Ficam obrigados a declarar todos os contribuintes que receberam rendimentos tributáveis (como salários, pró-labore, aposentadoria, aluguéis) cuja soma anual superou a faixa de isenção de R$ 28.467,20, ou que receberam rendimentos isentos, não tributáveis ou tributados exclusivamente na fonte acima de R$ 200.000,00 no ano."
  },
  {
    q: "Qual a diferença entre a Declaração por Deduções Legais (Completa) e Desconto Simplificado?",
    a: "O modelo Simplificado aplica um desconto fixo de 20% sobre os rendimentos tributáveis, limitado ao teto legal de R$ 16.754,34, substituindo qualquer outra dedução. O modelo Completo permite somar todas as suas despesas dedutíveis reais (dependentes, educação, saúde, previdência), sendo mais vantajoso caso suas despesas totais superem os 20% de desconto simplificado."
  },
  {
    q: "Como funciona a restituição do Imposto de Renda?",
    a: "Ao preencher a declaração anual, a Receita Federal calcula o imposto devido real. Se o valor que você já pagou ao longo do ano retido na fonte (IRRF) for maior do que o imposto devido calculado, você recebe a diferença de volta (restituição). Se o imposto devido for maior que o IRRF pago, você precisará pagar o saldo restante."
  },
  {
    q: "Quais despesas com saúde são dedutíveis no modelo completo?",
    a: "Despesas médicas, exames, internações, consultas particulares, planos de saúde, psicólogos e dentistas são totalmente dedutíveis no modelo completo, sem limite máximo global estabelecido por lei, contanto que devidamente comprovados com notas fiscais ou recibos que contenham o CPF/CNPJ do prestador de serviço."
  },
  {
    q: "Esta calculadora salva meus dados financeiros?",
    a: "Não! No Mestre das Contas, respeitamos integralmente sua privacidade e a LGPD. Todas as informações inseridas na calculadora de Imposto de Renda são processadas de forma 100% local diretamente no seu navegador, sem armazenamento externo ou tráfego de dados confidenciais."
  }
];

export default function IrpfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://mestredascontas.com.br/financeiro/imposto-de-renda#calculator",
        "name": "Simulador e Calculadora de Imposto de Renda (IRPF) Mestre das Contas",
        "url": "https://mestredascontas.com.br/financeiro/imposto-de-renda",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "BRL"
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://mestredascontas.com.br/financeiro/imposto-de-renda#howto",
        "name": "Como Calcular a Restituição do Imposto de Renda (IRPF)",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Preencher Rendimentos",
            "text": "Insira o valor bruto de seus rendimentos tributáveis (como salário e pró-labore) e outros rendimentos anuais combinados."
          },
          {
            "@type": "HowToStep",
            "name": "Adicionar Deduções Reais",
            "text": "Adicione suas despesas médicas, despesas de educação, dependentes e contribuições ao INSS ou previdência PGBL."
          },
          {
            "@type": "HowToStep",
            "name": "Inserir IRRF Pago",
            "text": "Informe a soma do imposto de renda retido na fonte que você já pagou no ano."
          },
          {
            "@type": "HowToStep",
            "name": "Comparar e Restituir",
            "text": "Compare as opções de Deduções Legais e Desconto Simplificado fornecidas pelo simulador para extrair a melhor restituição possível."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://mestredascontas.com.br/financeiro/imposto-de-renda#faq",
        "mainEntity": faqList.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      }
    ]
  };

  return (
    <article className="min-h-screen bg-slate-50/30 dark:bg-slate-950/20 py-8 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER DO PORTAL */}
      <PageHeader 
        title="Simulador de Imposto de Renda (IRPF) 2025/2026"
        description="Calcule se você tem imposto a pagar ou a restituir. Compare de forma simples e imediata o modelo de Deduções Legais com a Declaração Simplificada de acordo com as faixas vigentes da Receita Federal."
        category="financeiro"
        variant="finance"
        breadcrumbs={[
          { label: "Financeiro", href: "/financeiro" },
          { label: "Imposto de Renda" }
        ]}
      />

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO LEGAL E-E-A-T */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2 print:hidden">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Informações e cálculos rigorosamente atualizados de acordo com a Medida Provisória da Receita Federal nº 1.294/2025 e faixas do IRPF para o Exercício 2026.</span>
        </div>

        {/* ANÚNCIO TOP */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="irpf_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA PRINCIPAL */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-xl p-1 md:p-2">
            <Suspense fallback={<div className="h-[600px] w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <IrpfCalculator />
            </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
            <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MID */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="irpf_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL / SEO --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-blue-500 pl-4">
               Como Declarar Imposto de Renda: Completo ou Simplificado?
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
               Um dos maiores dilemas dos contribuintes brasileiros na época da entrega da declaração de ajuste anual do IRPF é escolher a modalidade de tributação mais econômica.
            </p>

            <div className="space-y-6 my-8">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-800 dark:text-white text-base flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500" /> Declaração por Deduções Legais (Modelo Completo)
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Permite abater despesas reais detalhadamente. É altamente recomendável para quem possui muitos dependentes cadastrados, contribuições robustas para planos de previdência PGBL, despesas altas com escolas/faculdades privadas ou despesas médicas elevadas acumuladas.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-800 dark:text-white text-base flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500" /> Declaração pelo Desconto Simplificado (Modelo Simplificado)
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Substitui a soma de todas as deduções legais por um abatimento fixo de 20% do valor dos rendimentos tributáveis da receita bruta. O limite absoluto desse abatimento anual é fixado em <strong>R$ 16.754,34</strong>. Ideal para quem tem poucas despesas dedutíveis.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
                <TrendingUp className="text-blue-600 dark:text-blue-400" /> Limites e Regras Vigentes para Dedução
            </h3>
            <p>
               Para simular corretamente no modelo completo, é essencial estar atento aos limites previstos pela Receita Federal:
            </p>
            <ul>
              <li><strong>Dependentes:</strong> Abatimento fixado em R$ 2.275,08 por dependente legal ao ano.</li>
              <li><strong>Educação/Instrução:</strong> Limite máximo anual de R$ 3.561,50 por dependente ou contribuinte (exclusivo para ensino básico, técnico ou superior; cursos livres ou de idiomas não entram).</li>
              <li><strong>Previdência Privada PGBL:</strong> Limite de dedução correspondente a no máximo 12% dos seus rendimentos tributáveis declarados.</li>
              <li><strong>Despesas de Saúde:</strong> Não há teto legal de limite máximo. Toda despesa médica ou odontológica comprovada pode ser abatida integralmente.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4">
               Tabela Anual do Imposto de Renda (Exercício 2026, Calendário 2025)
            </h3>
            <p>
               A tabela progressiva anual aplicada sobre os rendimentos líquidos do ano é dividida conforme as faixas abaixo:
            </p>

            <table className="w-full text-sm border-collapse my-6">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b">
                  <th className="p-3 text-left">Base de Cálculo Anual</th>
                  <th className="p-3 text-center">Alíquota</th>
                  <th className="p-3 text-right">Parcela a Deduzir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-3">Até R$ 28.467,20</td>
                  <td className="p-3 text-center">Isento</td>
                  <td className="p-3 text-right">R$ 0,00</td>
                </tr>
                <tr>
                  <td className="p-3">De R$ 28.467,21 até R$ 33.919,80</td>
                  <td className="p-3 text-center">7,5%</td>
                  <td className="p-3 text-right">R$ 2.135,04</td>
                </tr>
                <tr>
                  <td className="p-3">De R$ 33.919,81 até R$ 45.012,60</td>
                  <td className="p-3 text-center">15,0%</td>
                  <td className="p-3 text-right">R$ 4.679,03</td>
                </tr>
                <tr>
                  <td className="p-3">De R$ 45.012,61 até R$ 55.976,16</td>
                  <td className="p-3 text-center">22,5%</td>
                  <td className="p-3 text-right">R$ 8.054,97</td>
                </tr>
                <tr>
                  <td className="p-3">Acima de R$ 55.976,16</td>
                  <td className="p-3 text-center">27,5%</td>
                  <td className="p-3 text-right">R$ 10.853,78</td>
                </tr>
              </tbody>
            </table>

            {/* FAQ ACCORDION */}
            <div className="mt-16 not-prose">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <HelpCircle className="text-blue-600 dark:text-blue-400" /> Perguntas Frequentes
              </h3>
              
              <div className="space-y-4">
                {faqList.map((item, idx) => (
                    <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                        <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            <div className="flex items-start gap-3">
                                <span className="text-blue-500 dark:text-blue-400 font-bold text-xs mt-1">#</span>
                                <span className="leading-snug">{item.q}</span>
                            </div>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm animate-in fade-in">
                            {item.a}
                        </p>
                    </details>
                ))}
              </div>
            </div>

            {/* REFERÊNCIAS OFICIAIS */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Landmark size={16} /> Base Legal & Referências
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Consulte os canais governamentais oficiais da Receita Federal:</p>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                    <a href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                        Meu Imposto de Renda — Portal Receita Federal <ExternalLink size={10}/>
                    </a>
                    <a href="https://www.planalto.gov.br/ccivil_03/_Ato2023-2026/2024/Lei/L14848.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                        Lei nº 14.848/2024 (Tabela do IRPF) <ExternalLink size={10}/>
                    </a>
                </div>
            </div>
            
            <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </div>

        {/* CROSS LINKER NAVEGAÇÃO */}
        <SmartCrossLinker currentHref="/financeiro/imposto-de-renda" category="financeiro" />

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="irpf_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
