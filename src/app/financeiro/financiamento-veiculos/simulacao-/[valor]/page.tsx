import { promises as fs } from 'fs';
import path from 'path';
import { Suspense } from 'react'; // <--- IMPORTANTE: Necessário para componentes com useSearchParams
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FinancingCalculator from "@/components/calculators/FinancingCalculator";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { Car, Wallet, TrendingUp, AlertTriangle, Loader2 } from "lucide-react";

type VeiculoData = { valor: number; tipo: string; };

async function getVeiculosData(): Promise<VeiculoData[]> {
  const filePath = path.join(process.cwd(), 'src/data/veiculos.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

// GERAÇÃO ESTÁTICA (SSG)
export async function generateStaticParams() {
  const dados = await getVeiculosData();
  return dados.map((item) => ({ valor: item.valor.toString() }));
}

// Lógica de Conteúdo Variável (Anti-Spam / Conteúdo Único)
function getAnalysis(valor: number, tipo: string) {
  const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
  const entradaIdeal = valor * 0.30; // 30%
  const entradaMinima = valor * 0.10; // 10%
  
  let texto = "";
  if (valor <= 20000) {
    texto = `Para financiar um veículo de ${formatado} (geralmente ${tipo}), as financeiras costumam ser mais exigentes com o ano de fabricação. Se for muito antigo (mais de 10 anos), a taxa de juros sobe consideravelmente. Tente dar pelo menos ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(entradaIdeal)} de entrada para facilitar a aprovação.`;
  } else if (valor <= 80000) {
    texto = `Nesta faixa de ${formatado}, você encontra a grande maioria dos carros populares e seminovos do mercado. É o segmento preferido dos bancos, onde as taxas são mais competitivas. Uma entrada de ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(entradaMinima)} já costuma aprovar o crédito, mas fique atento ao Custo Efetivo Total (CET) que inclui taxas de abertura e seguros.`;
  } else {
    texto = `Ao buscar financiar ${formatado}, você entra na categoria premium ou utilitários. Aqui, muitas montadoras oferecem condições especiais como "Taxa Zero" se você der 50% ou 60% de entrada. Fique atento: financiar 100% desse valor vai gerar parcelas muito pesadas e exigir uma renda mensal comprovada superior a R$ ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor * 0.10)}.`;
  }

  return {
    titulo: `Simulação: Veículo de ${formatado}`,
    texto: texto,
    entradaSugerida: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(entradaIdeal)
  };
}

type Props = { params: Promise<{ valor: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { valor } = await params;
  const valorNum = parseInt(valor);
  const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valorNum);
  
  return {
    title: `Simulação Financiamento ${formatado} (2025) | Valor da Parcela`,
    description: `Quer financiar um carro ou moto de ${formatado}? Calcule o valor exato da parcela, juros e entrada ideal agora. Simulação online gratuita.`,
    alternates: { canonical: `https://mestredascontas.com.br/financeiro/financiamento-veiculos/simulacao-${valor}` },
  };
}

export default async function FinanciamentoPorValorPage({ params }: Props) {
  const { valor } = await params;
  const valorNum = parseInt(valor);

  // Proteção contra URLs inválidas
  if (isNaN(valorNum)) notFound();

  // Busca dados do JSON para contexto (Tipo do veículo)
  const dados = await getVeiculosData();
  const veiculo = dados.find(d => d.valor === valorNum) || { tipo: "Veículo" };
  
  const analysis = getAnalysis(valorNum, veiculo.tipo);

  return (
    <article className="w-full max-w-full overflow-hidden">
      
      {/* HEADER DA PÁGINA */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={analysis.titulo}
          description={`Planejamento financeiro completo para compra de ${veiculo.tipo}.`}
          category="Simulador Automotivo"
          icon={<Car size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="blue"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Financiamento", href: "/financeiro/financiamento-veiculos" },
            { label: `R$ ${valor}` }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO (Anti-CLS) */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-blue-50/30 rounded-lg border border-dashed border-blue-200/50 min-h-[100px]">
           <AdUnit slot="finan_top" format="horizontal" variant="agency" />
        </div>

        {/* --- CALCULADORA BLINDADA COM SUSPENSE --- */}
        <section className="scroll-mt-28 w-full max-w-full">
            <Suspense fallback={
                // Skeleton UI: Evita que a página "pule" enquanto a calculadora carrega
                <div className="h-[600px] w-full bg-slate-50 rounded-2xl border border-slate-200 animate-pulse flex flex-col items-center justify-center gap-3">
                    <Loader2 size={40} className="text-blue-300 animate-spin"/>
                    <span className="text-slate-400 font-medium">Carregando Simulador...</span>
                </div>
            }>
                <FinancingCalculator initialValue={valorNum} />
            </Suspense>
        </section>
        {/* ----------------------------------------- */}

        {/* CONTEÚDO RICO (SEO) */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl w-full">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
             <Wallet className="text-blue-600" /> Análise de Crédito
          </h2>
          <p className="leading-relaxed text-slate-600">{analysis.texto}</p>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-6 not-prose flex gap-3">
             <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" />
             <div className="text-sm text-amber-800">
                <strong>Dica de Especialista:</strong> Para aumentar suas chances de aprovação em um crédito de <strong>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valorNum)}</strong>, certifique-se de que o valor da parcela não ultrapasse 30% da sua renda mensal líquida comprovada.
             </div>
          </div>

          {/* CROSS LINKING (Malha Interna) */}
          <div className="not-prose mt-8 pt-8 border-t border-slate-100">
            <p className="text-sm font-bold text-slate-500 mb-3">Simular outros valores próximos:</p>
            <div className="flex flex-wrap gap-2">
                {/* Mostra apenas valores próximos (+- 20k) para relevância */}
                {dados.filter(d => Math.abs(d.valor - valorNum) <= 30000 && d.valor !== valorNum).slice(0, 8).map((item) => (
                    <Link 
                        key={item.valor} 
                        href={`/financeiro/financiamento-veiculos/simulacao-${item.valor}`} 
                        className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 hover:border-blue-200 text-xs rounded-lg transition-all font-medium"
                    >
                        R$ {item.valor}
                    </Link>
                ))}
            </div>
          </div>
        </div>

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center my-8 min-h-[250px]">
            <AdUnit slot="finan_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}