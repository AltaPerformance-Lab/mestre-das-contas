import type { Metadata } from "next";
import Link from "next/link";
import { Car, Wrench, ShieldCheck, TrendingUp, ArrowRight, HelpCircle, Landmark, FileText } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

export const metadata: Metadata = {
  title: "Cálculos e Ferramentas de Veículos | Tabela FIPE e Financiamento",
  description: "Consulte o valor oficial da Tabela FIPE para carros, motos e caminhões. Simule o financiamento CDC, calcule taxas reais e emita recibos de compra e venda online.",
  keywords: [
    "tabela fipe oficial",
    "simulador financiamento veiculos",
    "calcular juros carro",
    "recibo compra e venda veiculo",
    "depreciação automotiva 2026"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/veiculos",
  },
  openGraph: {
    title: "Portal Automotivo 2026 | Mestre das Contas",
    url: "https://mestredascontas.com.br/veiculos",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Portal Veículos Mestre das Contas",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tudo sobre cálculos automotivos em 2026",
    images: ["/opengraph-image"],
  }
};

// --- SCHEMA (COLLECTION & FAQ) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Ferramentas Automotivas e Tabela FIPE 2026",
      "description": "Suíte de calculadoras de financiamento veicular, consulta da Tabela FIPE oficial e emissão de recibos de compra e venda de veículos.",
      "url": "https://mestredascontas.com.br/veiculos",
      "hasPart": [
        { "@type": "SoftwareApplication", "name": "Tabela FIPE Oficial", "url": "https://mestredascontas.com.br/veiculos/tabela-fipe" },
        { "@type": "SoftwareApplication", "name": "Financiamento de Veículos", "url": "https://mestredascontas.com.br/financeiro/financiamento-veiculos" },
        { "@type": "SoftwareApplication", "name": "Recibo de Compra e Venda", "url": "https://mestredascontas.com.br/ferramentas/gerador-recibo" }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" },
        { "@type": "ListItem", "position": 2, "name": "Veículos", "item": "https://mestredascontas.com.br/veiculos" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "1. Qual é a utilidade prática da Tabela FIPE?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Tabela FIPE serve como o principal parâmetro nacional para avaliar o preço médio de carros, motos e caminhões. Ela reflete a média dos preços praticados no mercado brasileiro, servindo de referência para negociações de compra e venda, além de ser a base de cálculo para o IPVA e indenizações de seguros."
          }
        },
        {
          "@type": "Question",
          "name": "2. A Tabela FIPE mostra o valor exato pelo qual devo vender meu carro?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não. A FIPE serve apenas como um ponto de partida ou referência de mercado. O valor real de fechamento pode variar conforme o estado de conservação do veículo, a quilometragem rodada, a cor, a presença de opcionais de fábrica e a oferta e demanda da sua região específica."
          }
        },
        {
          "@type": "Question",
          "name": "3. Como funciona a desvalorização ou depreciação de um veículo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A depreciação ocorre de forma mais acentuada nos primeiros anos após a saída da concessionária (geralmente entre 10% e 20% no primeiro ano). Fatores como quilometragem, histórico de revisões na concessionária, sinistros anteriores (batidas) e número de proprietários anteriores influenciam diretamente na perda de valor do bem."
          }
        },
        {
          "@type": "Question",
          "name": "4. Qual a diferença entre financiamento CDC e Leasing de veículos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No CDC (Crédito Direto ao Consumidor), o veículo é registrado no nome do comprador com alienação fiduciária ao banco. No Leasing (arrendamento mercantil), o veículo permanece em nome da instituição financeira e você paga pelo direito de uso, tendo a opção de compra ao final do contrato. O CDC é o modelo mais popular e permite amortizações com desconto."
          }
        },
        {
          "@type": "Question",
          "name": "5. O que é o Custo Efetivo Total (CET) no financiamento automotivo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O CET representa a soma real de todas as despesas cobradas in um financiamento. Ele engloba a taxa de juros nominal, o IOF (Imposto sobre Operações Financeiras), taxas de cadastro, seguros obrigatórios contratados e custos cartorários. Sempre compare o CET entre instituições, e não apenas a taxa de juros nominal."
          }
        },
        {
          "@type": "Question",
          "name": "6. Posso transferir um financiamento de veículo em andamento?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, é possível. Para isso, o novo comprador deve passar por uma análise de crédito rigorosa no mesmo banco credor. Caso aprovado, o contrato é transferido para o nome dele. Nunca entregue o veículo a terceiros sem formalizar a transferência da dívida no banco para não responder legalmente por débitos ou multas."
          }
        },
        {
          "@type": "Question",
          "name": "7. Quais documentos são obrigatórios para vender um veículo no Brasil?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Atualmente, a transação exige a emissão e assinatura do ATPV-e (Autorização para Transferência de Propriedade do Veículo Digital) ou o preenchimento do CRV físico (antigo DUT), com reconhecimento de firma por autenticidade. Também é essencial emitir um recibo de sinal de compra para formalizar as condições comerciais antes da transferência definitiva."
          }
        }
      ]
    }
  ]
};

export default function VeiculosHubPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden pb-12">
      
      {/* INJEÇÃO DE SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER (Finance Variant - Verde) --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Automotivo & Veículos"
          description="Consulte a Tabela FIPE atualizada, simule parcelas de financiamento CDC e emita recibos de compra e venda sem complicações."
          category="Mercado Automotivo"
          icon={<Car size={32} strokeWidth={2} />}
          variant="finance" 
          categoryColor="green"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Veículos" }
          ]}
        />
      </div>

      {/* --- CONTEUDO --- */}
      <div className="px-4 flex flex-col gap-8 max-w-7xl mx-auto w-full">
          
          {/* ANÚNCIO TOPO */}
          <div className="w-full flex justify-center mb-10">
             <LazyAdUnit slot="veiculos_hub_top" format="horizontal" variant="software" className="min-h-[100px] w-full" />
          </div>

          {/* --- GRID DE FERRAMENTAS --- */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card FIPE */}
            <Link href="/veiculos/tabela-fipe" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Car size={100} className="text-green-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Car size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Tabela FIPE Oficial</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                  Consulte a média oficial de preços de carros, motos e caminhões nacionais e importados de forma totalmente grátis.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-lg group-hover:bg-green-100 transition-colors">
                  Consultar FIPE <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Financiamento */}
            <Link href="/financeiro/financiamento-veiculos" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Landmark size={100} className="text-indigo-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <TrendingUp size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Financiamento Veículos</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                  Simule as parcelas do financiamento CDC do seu carro ou moto, compare taxas reais e analise o Custo Efetivo Total.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  Simular Financiamento <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Card Recibo */}
            <Link href="/ferramentas/gerador-recibo" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col md:col-span-2 lg:col-span-1">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileText size={100} className="text-blue-600" />
              </div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <FileText size={28} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Recibo Compra e Venda</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                  Gere instantaneamente um recibo oficial de sinal ou compra e venda de veículos em PDF pronto para assinatura.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                  Gerar Recibo PDF <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

          </section>
          
          {/* --- CONTEÚDO RICO --- */}
          <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm mt-10">
            
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
              <ShieldCheck className="text-green-600" size={32} /> Decisões Automotivas Seguras e Sem Taxas Abusivas
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-lg mb-6">
              Nós sabemos perfeitamente que adquirir, simular e transacionar veículos no Brasil envolve altos valores e burocracia de trânsito. A verdade é que a falta de simulações transparentes faz com que muitos compradores caiam em taxas ocultas ou paguem valores distantes da realidade de mercado.
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
              No <strong>Mestre das Contas</strong>, oferecemos um ecossistema rápido e descomplicado para você verificar a valorização oficial de carros, simular financiamentos de automóveis e emitir os documentos essenciais de sinal de compra. Tudo gerado de forma local, preservando seus dados pessoais.
            </p>

            {/* TABELA COMPARATIVA DE RECURSOS AUTOMOTIVOS */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-6">
              Principais Ferramentas e Consultas de Veículos
            </h3>
            <div className="overflow-x-auto w-full rounded-2xl border border-slate-200 dark:border-slate-800 mb-8">
              <table className="min-w-[600px] w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Serviço / Ferramenta</th>
                    <th className="p-4">Finalidade Principal</th>
                    <th className="p-4">Quando Utilizar</th>
                    <th className="p-4">Benefício de Acessar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Tabela FIPE</td>
                    <td className="p-4">Consultar o preço de referência oficial de carros, motos e caminhões</td>
                    <td className="p-4">Antes de comprar, vender ou anunciar um veículo usado</td>
                    <td className="p-4">Saber a base de mercado e evitar pagar caro ou vender barato</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Financiamento CDC</td>
                    <td className="p-4">Simular parcelas, taxas de juros nominais e o Custo Efetivo Total (CET)</td>
                    <td className="p-4">Ao planejar a compra parcelada de um veículo em bancos ou agências</td>
                    <td className="p-4">Visualizar o custo real da dívida e negociar taxas melhores</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Recibo de Compra/Venda</td>
                    <td className="p-4">Gerar a autorização de sinal ou termo de quitação em PDF</td>
                    <td className="p-4">Durante o fechamento do negócio, para formalizar o pagamento inicial</td>
                    <td className="p-4">Resguardo jurídico básico até a transferência definitiva do documento</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SEÇÃO DE FAQ (7 PERGUNTAS) */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6 flex items-center gap-2">
              <HelpCircle className="text-slate-500" size={26} /> Perguntas Frequentes sobre Veículos
            </h3>
            <div className="space-y-4">
              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  1. Qual é a utilidade prática da Tabela FIPE?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  A Tabela FIPE serve como o principal parâmetro nacional para avaliar o preço médio de carros, motos e caminhões. Ela reflete a média dos preços praticados no mercado brasileiro, servindo de referência para negociações de compra e venda, além de ser a base de cálculo para o IPVA e indenizações de seguros.
                </div>
              </details>

              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  2. A Tabela FIPE mostra o valor exato pelo qual devo vender meu carro?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  Não. A FIPE serve apenas como um ponto de partida ou referência de mercado. O valor real de fechamento pode variar conforme o estado de conservação do veículo, a quilometragem rodada, a cor, a presença de opcionais de fábrica e a oferta e demanda da sua região específica.
                </div>
              </details>

              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  3. Como funciona a desvalorização ou depreciação de um veículo?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  A depreciação ocorre de forma mais acentuada nos primeiros anos após a saída da concessionária (geralmente entre 10% e 20% no primeiro ano). Fatores como quilometragem, histórico de revisões na concessionária, sinistros anteriores (batidas) e número de proprietários anteriores influenciam diretamente na perda de valor do bem.
                </div>
              </details>

              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  4. Qual a diferença entre financiamento CDC e Leasing de veículos?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  No CDC (Crédito Direto ao Consumidor), o veículo é registrado no nome do comprador com alienação fiduciária ao banco. No Leasing (arrendamento mercantil), o veículo permanece em nome da instituição financeira e você paga pelo direito de uso, tendo a opção de compra ao final do contrato. O CDC é o modelo mais popular e permite amortizações com desconto.
                </div>
              </details>

              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  5. O que é o Custo Efetivo Total (CET) no financiamento automotivo?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  O CET representa a soma real de todas as despesas cobradas em um financiamento. Ele engloba a taxa de juros nominal, o IOF (Imposto sobre Operações Financeiras), taxas de cadastro, seguros obrigatórios contratados e custos cartorários. Sempre compare o CET entre instituições, e não apenas a taxa de juros nominal.
                </div>
              </details>

              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  6. Posso transferir um financiamento de veículo em andamento?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  Sim, é possível. Para isso, o novo comprador deve passar por uma análise de crédito rigorosa no mesmo banco credor. Caso aprovado, o contrato é transferido para o nome dele. Nunca entregue o veículo a terceiros sem formalizar a transferência da dívida no banco para não responder legalmente por débitos ou multas.
                </div>
              </details>

              <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                  7. Quais documentos são obrigatórios para vender um veículo no Brasil?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                  Atualmente, a transação exige a emissão e assinatura do ATPV-e (Autorização para Transferência de Propriedade do Veículo Digital) ou o preenchimento do CRV físico (antigo DUT), com reconhecimento de firma por autenticidade. Também é essencial registrar um recibo de sinal de compra para formalizar as condições comerciais antes da transferência definitiva.
                </div>
              </details>
            </div>
          </div>

          <SmartCrossLinker currentHref="/veiculos" category="financeiro" />
          
          {/* ANÚNCIO RODAPÉ */}
          <div className="w-full flex justify-center mt-8">
            <LazyAdUnit slot="veiculos_hub_bottom" format="auto" />
          </div>

      </div>
    </div>
  );
}
