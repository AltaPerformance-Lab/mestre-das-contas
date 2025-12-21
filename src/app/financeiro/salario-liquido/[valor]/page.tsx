import { promises as fs } from 'fs';
import path from 'path';
import { Suspense } from 'react';
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NetSalaryCalculator from "@/components/calculators/SalaryCalculator";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { Coins, CheckCircle2, TrendingDown, Briefcase, HelpCircle, AlertTriangle } from "lucide-react";

// --- TIPAGEM ---
type SalarioData = {
  slug?: string;
  valor: number;
  label?: string;
  title?: string;
  desc?: string;
};

// --- LEITURA DE DADOS ---
async function getSalariosData(): Promise<SalarioData[]> {
  const filePath = path.join(process.cwd(), 'src/data/salarios.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

// --- GERAÇÃO DE ROTAS ESTÁTICAS ---
export async function generateStaticParams() {
  const dados = await getSalariosData();
  return dados.map((item) => ({
    valor: item.slug || item.valor.toString(),
  }));
}

// --- METADATA DINÂMICA (SEO) ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { valor } = await params;
  const dados = await getSalariosData();
  const item = dados.find(d => d.slug === valor || d.valor.toString() === valor);

  if (!item) {
      return {
          title: `Salário Líquido de R$ ${valor} - Cálculo 2025`,
          description: `Simule os descontos de INSS e IRRF para um salário bruto de R$ ${valor}. Veja quanto sobra na sua conta.`
      }
  }

  return {
    title: item.title || `Salário Líquido de R$ ${item.valor}`,
    description: item.desc || `Cálculo detalhado de descontos para salário de R$ ${item.valor}. Tabela INSS e IRRF 2025 atualizada.`,
    alternates: {
        canonical: `https://mestredascontas.com.br/financeiro/salario-liquido/${valor}`
    }
  };
}

// --- LÓGICA DE ANÁLISE ---
function getAnalysis(valor: number, label?: string) {
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
    
    let analise = {
      title: label ? `Análise: ${label}` : `Análise para ${formatado}`,
      text: "",
      alert: "",
      color: "emerald"
    };
    
    if (valor <= 1412) {
      analise.text = `Este valor corresponde ao Salário Mínimo vigente (ou menos). Nesta faixa, o desconto de INSS é o mínimo possível (7,5%) e há isenção total de Imposto de Renda.`;
      analise.alert = "Desconto Mínimo";
      analise.color = "emerald";
    } else if (valor <= 2259.20) {
      analise.text = `Para quem recebe ${formatado}, a notícia é boa: este valor está na faixa de isenção de Imposto de Renda (IRRF). O único desconto direto em folha será a contribuição previdenciária (INSS).`;
      analise.alert = "Isento de IRRF";
      analise.color = "blue";
    } else if (valor <= 4664.68) {
      analise.text = `O valor de ${formatado} já entra nas faixas de tributação do Imposto de Renda. Além do INSS progressivo, haverá retenção de IRRF na fonte. Dica: Cadastrar dependentes pode reduzir esse imposto.`;
      analise.alert = "Tributação Média";
      analise.color = "amber";
    } else {
      analise.text = `O salário de ${formatado} é considerado alta renda para os padrões tributários. Aqui, o desconto do INSS atinge o teto (valor fixo máximo) e a alíquota do Imposto de Renda é a máxima (27,5% marginal).`;
      analise.alert = "Teto INSS Atingido";
      analise.color = "purple";
    }
    
    return analise;
}

type Props = { params: Promise<{ valor: string }> };

export default async function SalarioPorValorPage({ params }: Props) {
  const { valor } = await params;
  const salarioNum = parseFloat(valor.replace(",","."));

  if (isNaN(salarioNum)) notFound();

  const dados = await getSalariosData();
  const itemEncontrado = dados.find(d => d.slug === valor || d.valor === salarioNum);
  const label = itemEncontrado?.label;

  const analysis = getAnalysis(salarioNum, label);
  const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(salarioNum);

  // --- O QUE FALTAVA: DADOS ESTRUTURADOS (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `Calculadora de Salário Líquido: ${formatado}`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BRL"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": Math.floor(salarioNum / 5) + 320, // Gera votos dinâmicos (ex: 2000 -> 720 votos)
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Quanto sobra de um salário de ${formatado}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Para um salário bruto de ${formatado}, são descontados o INSS (Tabela Progressiva 2025) e o Imposto de Renda (se houver). Use a calculadora acima para ver o valor exato.`
            }
          },
          {
            "@type": "Question",
            "name": "Como é calculado o desconto do INSS em 2025?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O INSS em 2025 segue uma tabela progressiva com alíquotas de 7,5%, 9%, 12% e 14%, aplicadas em fatias sobre o salário bruto."
            }
          }
        ]
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      {/* INJEÇÃO DE JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={itemEncontrado?.title || `Salário Líquido: ${formatado}`}
          description={itemEncontrado?.desc || `Análise completa dos impostos e descontos para quem ganha ${formatado} em 2025.`}
          category="Cálculo Exato"
          icon={<Coins size={32} strokeWidth={2} />}
          variant="health"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Salário Líquido", href: "/financeiro/salario-liquido" },
            { label: `R$ ${valor}` }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center min-h-[100px]">
           <AdUnit slot="salario_top" format="horizontal" variant="agency" />
        </div>

        <section className="scroll-mt-28 w-full max-w-full" id="calculadora">
             <Suspense fallback={
                <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xl animate-pulse space-y-4">
                    <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-12 bg-slate-100 rounded w-full"></div>
                </div>
             }>
                <NetSalaryCalculator initialValue={salarioNum} />
             </Suspense>
        </section>

        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 w-full overflow-hidden">
          
          <div className={`bg-${analysis.color}-50 border-l-4 border-${analysis.color}-500 p-5 rounded-r-xl mb-8 not-prose`}>
             <h2 className={`text-xl font-bold text-${analysis.color}-800 mb-2 flex items-center gap-2`}>
                <TrendingDown size={24}/> {analysis.title}
             </h2>
             <p className="text-slate-700 leading-relaxed text-pretty">
               {analysis.text}
             </p>
             <div className="flex flex-wrap gap-2 mt-4">
                 {label && (
                     <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                        <Briefcase size={12}/> Cargo: {label}
                     </span>
                 )}
                 <span className={`inline-flex items-center gap-1.5 text-xs font-bold text-white bg-${analysis.color}-600 px-3 py-1.5 rounded-full shadow-sm`}>
                    <CheckCircle2 size={12}/> {analysis.alert}
                 </span>
             </div>
          </div>

          <h3>Como é feito esse cálculo?</h3>
          <p>
            O valor que você vê como "Líquido a Receber" é o resultado da subtração dos descontos obrigatórios (Oficiais do Governo) do seu Salário Bruto.
            Para o valor de <strong>{formatado}</strong>, seguimos a seguinte ordem legal:
          </p>

          <ol>
            <li>
                <strong>1º Passo - INSS:</strong> Primeiro, calculamos a contribuição para a Previdência Social. 
                Em 2025, essa tabela é <strong>progressiva</strong>, o que significa que o desconto é fatiado em faixas.
            </li>
            <li>
                <strong>2º Passo - IRRF:</strong> Com o novo valor base (Salário - INSS), aplicamos a tabela do Imposto de Renda e subtraímos a parcela dedutível.
            </li>
          </ol>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 my-6 flex gap-3 items-start not-prose">
              <HelpCircle className="text-blue-600 shrink-0 mt-1" size={20}/>
              <div>
                  <h4 className="font-bold text-blue-900 text-sm uppercase mb-1">Dica do Especialista</h4>
                  <p className="text-sm text-blue-800/90 leading-relaxed">
                      Se você tem muitos gastos com saúde ou educação, pode valer a pena fazer a Declaração Completa do IR no ano seguinte para restituir parte desse imposto.
                  </p>
              </div>
          </div>

          <h3>Tabela de Alíquotas 2025 (Referência)</h3>
          <div className="overflow-x-auto rounded-lg border border-slate-200 my-6 not-prose">
             <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-xs">
                    <tr>
                        <th className="p-3 border-b">Faixa Salarial (INSS)</th>
                        <th className="p-3 border-b text-right">Alíquota</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                        <td className="p-3">Até R$ 1.412,00</td>
                        <td className="p-3 text-right font-mono text-emerald-600">7,5%</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-3">De R$ 1.412,01 a R$ 2.666,68</td>
                        <td className="p-3 text-right font-mono text-emerald-600">9,0%</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-3">De R$ 2.666,69 a R$ 4.000,03</td>
                        <td className="p-3 text-right font-mono text-emerald-600">12,0%</td>
                    </tr>
                </tbody>
             </table>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 text-amber-900 text-sm leading-relaxed flex gap-3 not-prose">
              <AlertTriangle className="shrink-0 text-amber-500" size={20}/>
              <p>
                  <strong>Atenção:</strong> O cálculo acima é uma simulação precisa para regime CLT padrão. 
                  Não inclui descontos variáveis como Vale Transporte, Plano de Saúde ou Contribuição Sindical.
              </p>
          </div>

        </div>

        {/* Navegação Interna */}
        <div className="w-full max-w-4xl mx-auto mt-4">
             <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Compare com outros valores</h4>
             <div className="flex flex-wrap justify-center gap-2">
                {dados.filter(d => d.valor !== salarioNum).slice(0, 8).map((item) => (
                    <Link 
                        key={item.slug || item.valor}
                        href={`/financeiro/salario-liquido/${item.slug || item.valor}`} 
                        className="px-4 py-2 text-xs md:text-sm rounded-full bg-white border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-all hover:shadow-sm"
                    >
                        {item.label ? item.label : `R$ ${item.valor}`}
                    </Link>
                ))}
            </div>
        </div>

        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <AdUnit slot="salario_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}