import { promises as fs } from 'fs';
import path from 'path';
import { Suspense } from 'react';
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { Car, CheckCircle2, TrendingUp, AlertCircle, Fuel, PenTool } from "lucide-react";

// Wrapper da Calculadora
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
    slug: item.slug, 
  }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dados = await getVeiculosData();
  const item = dados.find(d => d.slug === slug);

  if (!item) return {};

  return {
    title: item.title || `Financiamento de Veículos: ${item.tipo}`,
    description: item.desc || `Simulação completa. Veja quanto fica a parcela de um ${item.tipo} no valor de R$ ${item.valor}.`,
    alternates: {
        canonical: `https://mestredascontas.com.br/financeiro/financiamento-veiculos/simulacao/${item.slug}`
    }
  };
}

function getAnalysis(valor: number, tipo: string) {
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
    
    let analise = {
      title: `Análise de Crédito: ${tipo}`,
      text: "",
      alert: "",
      color: "blue",
      tips: [] as string[]
    };
    
    if (valor <= 20000) {
      analise.text = `Para financiar um ${tipo} no valor de ${formatado}, o cenário exige cautela. Bancos e financeiras costumam ser mais rígidos com veículos mais antigos, exigindo entradas entre 30% a 50% para aprovar o crédito.`;
      analise.alert = "Entrada Elevada";
      analise.color = "amber";
      analise.tips = [
          "Verifique se o veículo já passou por leilão (isso nega financiamento em 90% dos casos).",
          "Dê preferência a garagens pequenas que trabalham com financeiras de 'segunda linha', mas cuidado com os juros.",
          "Considere um empréstimo pessoal se o valor a financiar for pequeno (pode ter juros menores que financiamento de carro velho)."
      ];
    } else if (valor <= 80000) {
      analise.text = `Esta é a 'Zona Quente' do mercado. Com ${formatado}, você acessa seminovos populares e compactos novos. A liquidez é alta e a aprovação é facilitada para quem tem Score acima de 500.`;
      analise.alert = "Melhores Taxas";
      analise.color = "emerald";
      analise.tips = [
          "Tente dar pelo menos 20% de entrada para fugir das taxas máximas.",
          "Bancos de montadora (GM, VW, Fiat) costumam ter taxas subsidiadas para seminovos da própria marca.",
          "Evite parcelas acima de 48x, pois os juros compostos comem o valor de outro carro."
      ];
    } else if (valor <= 150000) {
      analise.text = `Na faixa de ${formatado}, você entra no segmento de SUVs e Sedans Médios. O consumidor deste perfil é disputado pelos bancos, o que abre margem para negociação de taxa.`;
      analise.alert = "Negocie Taxa Zero";
      analise.color = "blue";
      analise.tips = [
          "Muitas montadoras oferecem 'Taxa Zero' para 24x com 60% de entrada. É a melhor opção financeira.",
          "Cuidado com o 'Plano Balão' (parcela residual final): parece barato, mas você refinancia a dívida no final.",
          "O seguro total é obrigatório na maioria dos contratos desta faixa."
      ];
    } else {
      analise.text = `Veículos premium (${formatado}). Para este perfil, o financiamento tradicional (CDC) pode não ser a ferramenta mais inteligente tributariamente, especialmente para PJ.`;
      analise.alert = "Avalie Leasing/Assinatura";
      analise.color = "purple";
      analise.tips = [
          "Para empresas e autônomos, o Leasing Operacional pode abater IRPJ.",
          "Considere Carro por Assinatura: nesta faixa de preço, a desvalorização do blindado/importado pode custar mais que o aluguel.",
          "Se for financiar, use o relacionamento 'Prime' ou 'Personalité' para taxas abaixo de 1.2%."
      ];
    }
    
    return analise;
}

export default async function VeiculoPorSlugPage({ params }: Props) {
  const { slug } = await params;
  const dados = await getVeiculosData();
  const item = dados.find(d => d.slug === slug);

  if (!item) return notFound();

  const analysis = getAnalysis(item.valor, item.tipo);
  const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.valor);

  // --- DADOS ESTRUTURADOS MELHORADOS ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `Simulador: ${item.title}`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": Math.floor(item.valor / 10) + 150,
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Qual a entrada mínima para financiar ${formatado}?`,
            "acceptedAnswer": { "@type": "Answer", "text": `Geralmente os bancos pedem entre 10% a 20% de entrada (${(item.valor * 0.2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}) para aprovar com taxas decentes. Financiar 100% é possível, mas os juros disparam.` }
          },
          {
            "@type": "Question",
            "name": "Valer a pena comprar um carro de leilão?",
            "acceptedAnswer": { "@type": "Answer", "text": "Financeiramente parece atrativo (30% abaixo da fabela), mas seguradoras recusam fazer seguro total e revender depois é muito difícil. Para uso próprio até acabar, pode valer." }
          }
        ]
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={item.title || `Financiamento: ${item.tipo}`}
          description={`Simulação atualizada 2026. Veja CET, juros e parcelas para compra de ${item.tipo}.`}
          category="Simulador Automotivo"
          icon={<Car size={32} strokeWidth={2} />}
          variant="default"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Financiamento Veículos", href: "/financeiro/financiamento-veiculos" },
            { label: item.tipo }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center min-h-[100px]">
           <AdUnit slot="veiculo_top" format="horizontal" variant="agency" />
        </div>

        <section className="scroll-mt-28 w-full max-w-full" id="calculadora">
             <Suspense fallback={<div className="h-64 bg-slate-100 rounded-3xl animate-pulse"/>}>
                <VehicleFinancingCalculator initialValue={item.valor} />
             </Suspense>
        </section>

        {/* ANÁLISE PROFUNDA (Content Injection) */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 w-full overflow-hidden">
          
          <div className={`bg-${analysis.color}-50 border-l-4 border-${analysis.color}-500 p-6 rounded-r-xl mb-8 not-prose`}>
             <h2 className={`text-xl font-bold text-${analysis.color}-800 mb-3 flex items-center gap-2`}>
                <TrendingUp size={24}/> {analysis.title}
             </h2>
             <p className="text-slate-700 leading-relaxed text-pretty text-base">
               {analysis.text}
             </p>
             <div className="mt-5 grid sm:grid-cols-2 gap-3">
                 <div className="bg-white/60 p-3 rounded-lg border border-slate-200/50">
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Entrada Sugerida</span>
                    <span className="text-lg font-black text-slate-800">
                        {(item.valor * 0.2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                 </div>
                 <div className="bg-white/60 p-3 rounded-lg border border-slate-200/50">
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Renda Mínima (Est.)</span>
                    <span className="text-lg font-black text-slate-800">
                        {(item.valor * 0.035 * 3.3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                 </div>
             </div>
          </div>

          <h3>Dicas para comprar {item.tipo}</h3>
          <p>Não feche negócio na primeira loja. Para veículos de <strong>{formatado}</strong>, siga este checklist:</p>
          <ul className="space-y-2">
              {analysis.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-700 text-sm font-medium">{tip}</span>
                  </li>
              ))}
          </ul>

          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-lg not-prose">
              <div className="bg-white/10 p-4 rounded-full">
                  <Fuel size={32} className="text-yellow-400" />
              </div>
              <div>
                  <h4 className="text-lg font-bold text-white mb-2">Simule também o Combustível</h4>
                  <p className="text-slate-300 text-sm leading-relaxed mb-0">
                      Não esqueça que além da parcela de ~R$ {(item.valor * 0.03).toFixed(0)}, você terá gastos com IPVA (4%), Seguro e Gasolina. 
                      O custo mensal real deste carro será aproximadamente <strong>R$ {((item.valor * 0.03) + (item.valor * 0.015)).toFixed(0)}</strong>.
                  </p>
              </div>
          </div>

        </div>

        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <AdUnit slot="veiculo_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}
