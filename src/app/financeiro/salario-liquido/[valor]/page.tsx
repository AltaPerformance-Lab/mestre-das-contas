import { promises as fs } from 'fs';
import path from 'path';
import { Suspense } from 'react'; // <--- 1. IMPORTAR ISSO
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NetSalaryCalculator from "@/components/calculators/SalaryCalculator"; // Confirme se o nome do arquivo é esse mesmo
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { Coins, CheckCircle2, TrendingDown, Briefcase } from "lucide-react";

// ... (Mantenha as funções getSalariosData, getAnalysis e generateStaticParams iguais) ...
// ... (Mantenha o generateMetadata igual) ...

type SalarioData = {
  valor: number;
  label?: string;
};

async function getSalariosData(): Promise<SalarioData[]> {
  const filePath = path.join(process.cwd(), 'src/data/salarios.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export async function generateStaticParams() {
  const dados = await getSalariosData();
  return dados.map((item) => ({
    valor: item.valor.toString(),
  }));
}

function getAnalysis(valor: number, label?: string) {
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
    const tituloContexto = label ? `${label} (${formatado})` : `Salário de ${formatado}`;
  
    let analise = {
      title: `Quanto sobra do ${tituloContexto}?`,
      text: "",
      alert: ""
    };
    
    if (valor <= 2259.20) {
      analise.text = `Para quem recebe ${formatado}, a notícia é boa: este valor está isento de Imposto de Renda (IRRF). O único desconto direto em folha será a contribuição previdenciária (INSS).`;
      analise.alert = "Isento de IRRF";
    } else if (valor <= 4664.68) {
      analise.text = `O valor de ${formatado} entra nas faixas de tributação do Imposto de Renda. Além do INSS, haverá uma retenção de IRRF, mas você pode abater esse valor declarando dependentes na calculadora acima.`;
      analise.alert = "Tributação Média";
    } else {
      analise.text = `O salário de ${formatado} é considerado alta renda para os padrões tributários. Aqui, o desconto do INSS atinge o teto (valor fixo) e a alíquota do Imposto de Renda é a máxima (27,5% marginal).`;
      analise.alert = "Teto INSS Atingido";
    }
  
    return analise;
}

// --- 3. COMPONENTE DA PÁGINA (CORRIGIDO) ---
type Props = { params: Promise<{ valor: string }> };

export default async function SalarioPorValorPage({ params }: Props) {
  const { valor } = await params;
  const salarioNum = parseInt(valor);

  if (isNaN(salarioNum)) notFound();

  const dados = await getSalariosData();
  const itemEncontrado = dados.find(d => d.valor === salarioNum);
  const label = itemEncontrado?.label;

  const analysis = getAnalysis(salarioNum, label);
  const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(salarioNum);

  return (
    <article className="w-full max-w-full overflow-hidden">
      
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={label ? `Cálculo: ${label}` : `Salário Líquido: ${formatado}`}
          description={`Análise detalhada de descontos (INSS e IRRF) para o salário bruto de ${formatado}.`}
          category="Cálculo Personalizado"
          icon={<Coins size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="emerald"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Salário Líquido", href: "/financeiro/salario-liquido" },
            { label: label || `R$ ${valor}` }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">

        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-emerald-50/30 rounded-lg border border-dashed border-emerald-200/50 min-h-[100px]">
           <AdUnit slot="salario_top" format="horizontal" variant="agency" />
        </div>

        {/* --- AQUI ESTÁ A CORREÇÃO DO ERRO --- */}
        <section className="scroll-mt-28 w-full max-w-full">
            <Suspense fallback={<div className="h-96 w-full bg-slate-100 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">Carregando Calculadora...</div>}>
                <NetSalaryCalculator initialValue={salarioNum} />
            </Suspense>
        </section>
        {/* ----------------------------------- */}

        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 w-full">
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
             <TrendingDown className="text-emerald-600" /> {analysis.title}
          </h2>
          
          <div className="bg-slate-50 border-l-4 border-emerald-500 p-4 rounded-r-lg mb-6 not-prose">
             <p className="text-slate-700 leading-relaxed">
               {analysis.text}
             </p>
             {label && (
                 <p className="mt-2 text-sm font-bold text-slate-500 flex items-center gap-2">
                    <Briefcase size={14}/> Cargo Ref: {label}
                 </p>
             )}
             <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">
               <CheckCircle2 size={12}/> Status: {analysis.alert}
             </span>
          </div>

          <h3>Entendendo o Desconto</h3>
          <p>
            O cálculo realizado acima utiliza a Tabela Progressiva oficial de 2025. O valor final pode variar centavos dependendo do número de dias úteis do mês (para cálculo de vale-transporte) ou descontos sindicais.
          </p>

          <div className="not-prose mt-8 pt-8 border-t border-slate-100">
            <p className="text-sm font-bold text-slate-500 mb-3">Outras faixas salariais comuns:</p>
            <div className="flex flex-wrap gap-2">
                {dados.slice(0, 6).map((item) => (
                    <Link 
                        key={item.valor}
                        href={`/financeiro/salario-liquido/${item.valor}`} 
                        className={`px-3 py-1 text-xs rounded-full transition-colors font-medium border ${item.valor === salarioNum ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 border-slate-200'}`}
                    >
                        {item.label ? item.label : `R$ ${item.valor}`}
                    </Link>
                ))}
            </div>
          </div>

        </div>

        <div className="w-full flex justify-center my-8 min-h-[250px]">
            <AdUnit slot="salario_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}