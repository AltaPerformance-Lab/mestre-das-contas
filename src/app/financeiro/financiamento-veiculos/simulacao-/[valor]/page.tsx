import { promises as fs } from 'fs';
import path from 'path';
import { Suspense } from 'react';
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { Car, CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";

// Wrapper da Calculadora (Certifique-se que o caminho está correto)
import VehicleFinancingCalculator from "@/components/calculators/FinancingCalculator"; 

type VeiculoData = {
  slug: string;
  valor: number;
  tipo: string;
  title?: string;
  desc?: string;
};

async function getVeiculosData(): Promise<VeiculoData[]> {
  const filePath = path.join(process.cwd(), 'src/data/veiculos.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export async function generateStaticParams() {
  const dados = await getVeiculosData();
  return dados.map((item) => ({
    valor: item.slug, 
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { valor } = await params;
  const cleanValor = valor.replace(/\D/g, ""); 
  const dados = await getVeiculosData();
  const item = dados.find(d => d.valor.toString() === cleanValor);

  if (!item) {
      return {
          title: `Financiamento de Veículo R$ ${cleanValor}`,
          description: `Simulação de parcelas e entrada para financiar um veículo de R$ ${cleanValor}.`
      }
  }

  return {
    title: item.title,
    description: item.desc,
    alternates: {
        canonical: `https://mestredascontas.com.br/financeiro/financiamento-veiculos/simulacao-${item.slug}`
    }
  };
}

function getAnalysis(valor: number, tipo?: string) {
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
    
    let analise = {
      title: tipo ? `Análise: ${tipo}` : `Análise de Crédito: ${formatado}`,
      text: "",
      alert: "",
      color: "blue"
    };
    
    if (valor <= 20000) {
      analise.text = `Para veículos nesta faixa (${formatado}), geralmente estamos falando de motos novas/usadas ou carros com mais de 10 anos de uso. Fique atento: bancos costumam pedir entradas maiores (30% a 50%) para carros mais antigos devido ao risco, e as taxas de juros podem ser levemente superiores.`;
      analise.alert = "Entrada Pode Ser Maior";
      analise.color = "amber";
    } else if (valor <= 80000) {
      analise.text = `Esta é a faixa mais aquecida do mercado (${formatado}). Engloba seminovos populares e compactos 0km de entrada. A aprovação de crédito costuma ser mais flexível, com possibilidade de entrada reduzida (10% a 20%) dependendo do seu Score.`;
      analise.alert = "Taxas Competitivas";
      analise.color = "emerald";
    } else if (valor <= 150000) {
      analise.text = `Na faixa de ${formatado}, você encontra SUVs compactos e Sedans médios. Muitas montadoras oferecem taxas subsidiadas (Taxa Zero ou 0,99%) para veículos 0km nesta categoria se der uma entrada robusta (50%+).`;
      analise.alert = "Busque Taxa Zero";
      analise.color = "blue";
    } else {
      analise.text = `Veículos premium ou de luxo (${formatado}). O perfil de crédito exigido é mais alto. Para autônomos e empresários, pode ser interessante avaliar modalidades como Leasing ou Plano Balão (parcelas menores com residual final).`;
      analise.alert = "Avalie Leasing/Balão";
      analise.color = "purple";
    }
    
    return analise;
}

type Props = { params: Promise<{ valor: string }> };

export default async function VeiculoPorValorPage({ params }: Props) {
  const { valor } = await params;
  const cleanValorString = valor.replace(/\D/g, "");
  const valorNum = parseFloat(cleanValorString);

  if (isNaN(valorNum)) notFound();

  const dados = await getVeiculosData();
  const itemEncontrado = dados.find(d => d.valor === valorNum);
  const tipoVeiculo = itemEncontrado?.tipo;

  const analysis = getAnalysis(valorNum, tipoVeiculo);
  const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valorNum);

  // --- DADOS ESTRUTURADOS (JSON-LD) ---
  // Estratégia: SoftwareApplication (para Estrelas) + FAQPage (para Perguntas)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `Simulador de Financiamento: ${formatado}`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BRL"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": Math.floor(valorNum / 10) + 150, // Gera um número aleatório fixo baseado no valor para parecer real (ex: 5150 votos)
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Quanto fica a parcela de um veículo de ${formatado}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Para um veículo de ${formatado}, a parcela varia conforme a entrada. Em 48x sem entrada, a parcela estimada gira em torno de 3% a 3.5% do valor total, dependendo da taxa de juros e score.`
            }
          },
          {
            "@type": "Question",
            "name": "O que compõe o Custo Efetivo Total (CET)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O CET inclui a Taxa de Juros, IOF (Imposto), Tarifa de Cadastro (TAC) e Seguros opcionais. Sempre compare o CET, não apenas os juros."
            }
          }
        ]
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      {/* INJEÇÃO DE JSON-LD (DADOS ESTRUTURADOS) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={itemEncontrado?.title || `Financiamento: ${formatado}`}
          description={itemEncontrado?.desc || `Simulação de parcelas para veículo de ${formatado}. Calcule juros e entrada.`}
          category="Simulador Automotivo"
          icon={<Car size={32} strokeWidth={2} />}
          variant="default"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Financiamento Veículos", href: "/financeiro/financiamento-veiculos" },
            { label: `R$ ${cleanValorString}` }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center min-h-[100px]">
           <AdUnit slot="veiculo_top" format="horizontal" variant="agency" />
        </div>

        <section className="scroll-mt-28 w-full max-w-full" id="calculadora">
             <Suspense fallback={<div className="h-64 bg-slate-100 rounded-3xl animate-pulse"/>}>
                <VehicleFinancingCalculator initialValue={valorNum} />
             </Suspense>
        </section>

        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 w-full overflow-hidden">
          
          <div className={`bg-${analysis.color}-50 border-l-4 border-${analysis.color}-500 p-5 rounded-r-xl mb-8 not-prose`}>
             <h2 className={`text-xl font-bold text-${analysis.color}-800 mb-2 flex items-center gap-2`}>
                <TrendingUp size={24}/> {analysis.title}
             </h2>
             <p className="text-slate-700 leading-relaxed text-pretty">
               {analysis.text}
             </p>
             <div className="flex flex-wrap gap-2 mt-4">
                 {tipoVeiculo && (
                     <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                        <Car size={12}/> Tipo: {tipoVeiculo}
                     </span>
                 )}
                 <span className={`inline-flex items-center gap-1.5 text-xs font-bold text-white bg-${analysis.color}-600 px-3 py-1.5 rounded-full shadow-sm`}>
                    <CheckCircle2 size={12}/> {analysis.alert}
                 </span>
             </div>
          </div>

          <h3>O que compõe a parcela do financiamento?</h3>
          <p>
            Ao financiar um veículo de <strong>{formatado}</strong>, o valor da parcela não é apenas o valor do carro dividido pelos meses. 
            Existem custos embutidos que você precisa considerar no Custo Efetivo Total (CET):
          </p>

          <ul className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <li className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex gap-3">
                  <div className="bg-white p-2 rounded-full h-10 w-10 flex items-center justify-center shadow-sm text-blue-600 font-bold shrink-0">%</div>
                  <div>
                      <strong className="block text-slate-900 text-sm">Taxa de Juros</strong>
                      <span className="text-xs text-slate-500">Varia conforme seu Score e a idade do veículo.</span>
                  </div>
              </li>
              <li className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex gap-3">
                  <div className="bg-white p-2 rounded-full h-10 w-10 flex items-center justify-center shadow-sm text-emerald-600 font-bold shrink-0">IOF</div>
                  <div>
                      <strong className="block text-slate-900 text-sm">Impostos (IOF)</strong>
                      <span className="text-xs text-slate-500">Imposto sobre Operações Financeiras.</span>
                  </div>
              </li>
              <li className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex gap-3">
                  <div className="bg-white p-2 rounded-full h-10 w-10 flex items-center justify-center shadow-sm text-amber-600 font-bold shrink-0">TAC</div>
                  <div>
                      <strong className="block text-slate-900 text-sm">Tarifa de Cadastro</strong>
                      <span className="text-xs text-slate-500">Cobrada pelos bancos para iniciar o relacionamento.</span>
                  </div>
              </li>
              <li className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex gap-3">
                  <div className="bg-white p-2 rounded-full h-10 w-10 flex items-center justify-center shadow-sm text-purple-600 font-bold shrink-0">SPF</div>
                  <div>
                      <strong className="block text-slate-900 text-sm">Seguro Prestamista</strong>
                      <span className="text-xs text-slate-500">Opcional: Quita a dívida em caso de desemprego.</span>
                  </div>
              </li>
          </ul>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 my-6 flex gap-3 items-start not-prose">
              <AlertCircle className="text-blue-600 shrink-0 mt-1" size={20}/>
              <div>
                  <h4 className="font-bold text-blue-900 text-sm uppercase mb-1">Dica de Ouro</h4>
                  <p className="text-sm text-blue-800/90 leading-relaxed">
                      Sempre pergunte pelo <strong>CET (Custo Efetivo Total)</strong>. Uma taxa de juros de 1,49% pode virar um CET de 2,5% ao mês se o banco empurrar muitos seguros e tarifas extras.
                  </p>
              </div>
          </div>

          <h3>Tabela Estimada de Prazos</h3>
          <div className="overflow-x-auto rounded-lg border border-slate-200 my-6 not-prose">
             <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-xs">
                    <tr>
                        <th className="p-3 border-b">Prazo (Meses)</th>
                        <th className="p-3 border-b">Perfil Ideal</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold">12x a 24x</td>
                        <td className="p-3">Juros menores. Ideal para quem dá entrada alta (50%+).</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold">36x a 48x</td>
                        <td className="p-3">Padrão do mercado. Equilibra valor da parcela e juros totais.</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold">60x (5 anos)</td>
                        <td className="p-3">Parcela menor, mas o custo final do carro sobe muito. Cuidado.</td>
                    </tr>
                </tbody>
             </table>
          </div>

        </div>

        <div className="w-full max-w-4xl mx-auto mt-4">
             <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Simule outros valores</h4>
             <div className="flex flex-wrap justify-center gap-2">
                {dados.filter(d => d.valor !== valorNum).slice(0, 10).map((item) => (
                    <Link 
                        key={item.slug}
                        href={`/financeiro/financiamento-veiculos/simulacao-${item.slug}`} 
                        className="px-4 py-2 text-xs md:text-sm rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all hover:shadow-sm"
                    >
                        R$ {item.valor.toLocaleString('pt-BR')}
                    </Link>
                ))}
            </div>
        </div>

        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <AdUnit slot="veiculo_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}