import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import FinancingCalculator from "@/components/calculators/FinancingCalculator";
import { calculateFinancing } from "@/lib/calculators/financing";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Car, Calculator, HelpCircle, BookOpen,
  TrendingUp, Wallet, CheckCircle2,
  AlertTriangle, Percent, ShieldCheck, KeyRound, 
  Landmark, ExternalLink, ArrowRight, Gauge, Fuel
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Simulador de Financiamento de Veículos 2026: Calcule as Parcelas";
  const description = "Quer comprar seu carro ou moto? Simule o financiamento (CDC), calcule o valor da parcela com juros e descobri o Custo Efetivo Total (CET) antes de ir à concessionária.";

  return {
    title,
    description,
    keywords: [
      "simulador financiamento veiculo", "calcular parcela carro", "financiamento moto simulador", 
      "juros financiamento auto 2026", "tabela price veiculos", "calcular cdc veiculo",
      "entrada financiamento carro", "cet financiamento veiculo"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/financeiro/financiamento-veiculos" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/financeiro/financiamento-veiculos",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article"
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } } };
}

// --- LISTA FAQ (Exatamente 7 Dúvidas Reais de Compradores) ---
const faqList = [
  { 
    q: "Qual é a taxa de juros média para financiamento de veículos em 2026?", 
    a: "As taxas de juros médias oscilam substancialmente com base no perfil de score de crédito do comprador e ano do veículo. Para carros novos de concessionária, as taxas giram entre 1,2% e 1,8% ao mês. Para carros usados de repasse, os juros chegam a 2,5% ou mais." 
  },
  { 
    q: "Vale a pena dar uma entrada maior no financiamento do carro ou moto?", 
    a: "Sempre. Uma entrada de 30% a 50% diminui a dependência de capital financiado de terceiros e mitiga os riscos de crédito da financeira. Com isso, os bancos reduzem de forma agressiva as taxas de juros compostos cobradas." 
  },
  { 
    q: "O que é o sistema CDC (Crédito Direto ao Consumidor)?", 
    a: "O CDC é a modalidade mais popular de crédito automotivo no Brasil. O veículo é registrado no nome do comprador com gravame eletrônico de alienação fiduciária ao banco. O motorista detém a posse direta para uso, mas não pode vender o veículo até quitar." 
  },
  { 
    q: "A famosa propaganda de 'Carro com Taxa Zero' é real ou armadilha?", 
    a: "Em quase 100% dos casos, é uma jogada mercadológica de atração. Os juros que seriam cobrados da financeira são embutidos de forma oculta no preço base do automóvel (retirando o desconto de pagamento à vista) ou compensados com taxas cadastrais infladas." 
  },
  { 
    q: "Posso realizar a venda de um veículo que ainda está financiado?", 
    a: "Sim. Há duas opções regulares: quitar a dívida total acumulada junto ao banco para liberação do gravame e posterior transferência, ou realizar a cessão da dívida formal para o comprador por meio de aprovação prévia de crédito bancário." 
  },
  { 
    q: "Como funciona a amortização antecipada de parcelas do financiamento?", 
    a: "Ao amortizar parcelas de trás para frente no carnê CDC, você reduz a base de saldo devedor principal antes do vencimento legal. O banco é obrigado pelo Código de Defesa do Consumidor a conceder o desconto proporcional dos juros futuros." 
  },
  { 
    q: "Quais são as principais taxas embutidas no Custo Efetivo Total (CET)?", 
    a: "O CET representa a taxa anual global e transparente cobrada do consumidor. Ele engloba a taxa de juros nominal da instituição, o Imposto sobre Operações Financeiras (IOF) recolhido pela União, taxas cadastrais (TAC), seguros e avaliações do bem." 
  }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO COM 7 FAQ) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Simulador de Financiamento de Veículos",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para simular parcelas de financiamento de carros e motos (CDC/Leasing)."
    },
    {
      "@type": "HowTo",
      "name": "Como Simular Financiamento de Veículos",
      "description": "Aprenda a calcular as parcelas reais e juros da compra de um automóvel passo a passo.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Valor do Veículo",
          "text": "Preencha o preço total negociado do carro ou da moto que deseja adquirir."
        },
        {
          "@type": "HowToStep",
          "name": "Defina o Saldo de Entrada",
          "text": "Informe a quantia que você dará como sinal inicial em dinheiro vivo."
        },
        {
          "@type": "HowToStep",
          "name": "Defina as Parcelas",
          "text": "Selecione o prazo de reembolso desejado (ex: 24, 36, 48 ou 60 meses)."
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Guia de Financiamento de Carros e Motos: Como Evitar a Armadilha da Prestação Infinita",
      "description": "Um guia completo explicando as taxas embutidas (CET), amortizações CDC de trás para frente e o mito da taxa zero.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-02-05",
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

export default async function FinanciamentoVeiculosPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HEADER --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Simulador de Financiamento de Veículos"
          description="Vai trocar de carro ou comprar sua moto? Simule o valor da parcela, descubra os juros embutidos e compare as melhores condições antes de fechar negócio."
          category="Automotivo"
          icon={<Car size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="blue"
          badge="Cálculo CDC"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Financiamento Veículos" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="auto_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="mb-8">
               <PrivacyBadge />
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
            <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <FinancingCalculator />
            </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden">
            <LazyAdUnit slot="auto_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DE ALTA PERFORMANCE (ADSENSE & AI GROUNDING) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              O Perigo da Ilusão do Carro Próprio Financiado
          </h2>
          
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Você já teve a incômoda e frustrante experiência de ver o valor acumulado das parcelas do seu financiamento somar o equivalente a dois carros novos inteiros?
          </p>

          <p>
            A verdade é que a compra de um carro ou moto representa o segundo passo mais dispendioso do patrimônio das famílias no Brasil.
          </p>

          <p>
            Veja bem, o financiamento de veículos funciona como a contratação de uma carona de alto padrão para cruzar o país.
          </p>

          <p>
            Nós usufruímos da conveniência e do conforto imediatos de dirigir o bem pelas ruas desde o primeiro dia de assinatura do contrato CDC.
          </p>

          <p>
            No entanto, se a nossa bagagem financeira inicial for pequena, o dono da carona (o banco) cobrará taxas de juros altíssimas pelo risco da viagem.
          </p>

          <p>
            Parece um labirinto matemático insolúvel, não é mesmo? Mas a verdade é que entender o <GlossaryTerm slug="cet-custo-efetivo-total">Custo Efetivo Total (CET)</GlossaryTerm> dá a você total poder de escolha!
          </p>

          <p>
            O melhor de tudo? Nós organizamos um guia direto de negociação para você blindar seu bolso contra as garras das taxas abusivas das concessionárias!
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              Três Alavancas Reais para Derrubar o Custo do Financiamento
          </h3>

          <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-sm text-slate-700 dark:text-slate-300">
                  <Wallet className="text-blue-600 dark:text-blue-400 mb-3" size={32} />
                  <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2 text-lg">Aumentar a Entrada</h3>
                  <p className="text-xs leading-relaxed">
                      Sempre dedique de **30% a 50%** de sinal. Isso mitiga o valor sob risco para o banco e derruba os <GlossaryTerm slug="juros-compostos">juros compostos</GlossaryTerm> cobrados.
                  </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-750 shadow-sm text-slate-700 dark:text-slate-300">
                  <TrendingUp className="text-slate-600 dark:text-slate-400 mb-3" size={32} />
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2 text-lg">Policiar o Score</h3>
                  <p className="text-xs leading-relaxed">
                      Pontuações cadastrais elevadas provam que você é um bom pagador, habilitando as taxas preferenciais na mesa de negociação.
                  </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm text-slate-700 dark:text-slate-300">
                  <KeyRound className="text-amber-600 dark:text-amber-500 mb-3" size={32} />
                  <h3 className="font-bold text-amber-900 dark:text-amber-300 mb-2 text-lg">Equilíbrio da Idade</h3>
                  <p className="text-xs leading-relaxed">
                      Carros antigos (com mais de 10 anos de fabricação) sofrem taxas de juros severas. Muitas vezes, um seminovo recente custa menos na parcela final.
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <BookOpen className="text-blue-600 dark:text-blue-400" /> Tabela Prática de Referência de Juros Automotivos
          </h3>
          <p className="mb-6">As taxas nominais e o Custo Efetivo Total variam de forma agressiva conforme o score e conservação do bem. Confira a média de mercado:</p>
          
          {/* TABELA DE JUROS (MANDATORY RULE 4) */}
          <div className="overflow-x-auto mb-10 not-prose rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <table className="w-full text-sm text-left text-slate-600 dark:text-slate-300">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                      <tr>
                          <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">Estado do Carro & Score</th>
                          <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">Média de Taxa Mensal</th>
                          <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">CET Anual Médio</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 font-bold text-slate-900 dark:text-slate-100">Score de Elite (800+) / Carro Zero Km</td>
                          <td className="p-4 text-emerald-600 font-bold">1,15% a 1,45% ao mês</td>
                          <td className="p-4">16% a 21% ao ano</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 font-bold text-slate-900 dark:text-slate-100">Score Intermediário / Carro Zero Km</td>
                          <td className="p-4">1,50% a 1,90% ao mês</td>
                          <td className="p-4">22% a 28% ao ano</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 font-bold text-slate-900 dark:text-slate-100">Carros Seminovos (até 5 anos de uso)</td>
                          <td className="p-4">1,85% a 2,40% ao mês</td>
                          <td className="p-4">27% a 38% ao ano</td>
                      </tr>
                      <tr className="bg-amber-50/30 dark:bg-amber-900/20 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors">
                          <td className="p-4 font-bold text-amber-900 dark:text-amber-300">Carros Usados Antigos (10 anos ou mais)</td>
                          <td className="p-4 text-red-600 font-bold">2,50% a 3,80% ao mês</td>
                          <td className="p-4 font-semibold text-red-600">40% a 65% ao ano</td>
                      </tr>
                  </tbody>
              </table>
              <p className="mt-2 text-[10px] text-slate-400 text-center italic p-2 bg-slate-50 dark:bg-slate-800">As simulações reais do CET de cada banco mudam diariamente conforme relatórios de crédito internos.</p>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-6 flex items-center gap-2">
              <AlertTriangle className="text-red-500" /> O Desafio dos Juros Embutidos do Carro "Taxa Zero"
          </h3>
          
          <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border-l-4 border-red-500 not-prose my-4">
              <p className="text-red-900 dark:text-red-300 font-bold mb-2">
                  Por que Juros Grátis não Existem no Mercado de Capitais?
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  As campanhas publicitárias de concessionária anunciando taxa zero em SUV exigem sinais colossais de entrada (60% ou 70% do preço de tabela) e prazos curtíssimos (24 meses). Adicionalmente, as financeiras compensam os ganhos diluindo a diferença no preço de venda do automóvel ou inflando despesas cadastrais.
              </p>
          </div>

          {/* FONTES */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-2xl">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Landmark size={14}/> Fontes e Referências</h3>
              <div className="flex flex-wrap gap-3 text-xs font-bold text-blue-700 dark:text-blue-400">
                  <a href="https://www.bcb.gov.br" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-950 shadow-sm">
                      Taxas de Juros Médias (Banco Central) <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          <ExpertSignature updatedAt="Junho de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
        </div>

        <SmartGlossaryLinker currentHref="/financeiro/financiamento-veiculos" category="financeiro" />
        <SmartCrossLinker currentHref="/financeiro/financiamento-veiculos" category="financeiro" />

        {/* FAQ ACORDION */}
        <div className="max-w-4xl mx-auto w-full print:hidden">
          <div className="mt-8 not-prose bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-150 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-600" /> Perguntas Frequentes sobre Financiamento
            </h2>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-900 open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all duration-300">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-blue-500 dark:text-blue-400 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug text-slate-800 dark:text-slate-200 font-semibold">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm animate-in fade-in">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>
        </div>

        {/* RODAPÉ IMPRESSÃO */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8">
            <LazyAdUnit slot="auto_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}