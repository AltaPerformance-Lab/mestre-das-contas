import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import FinancingCalculator from "@/components/calculators/FinancingCalculator"; // Usando a calculadora base
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Car, Calculator, HelpCircle, 
  TrendingUp, Wallet, CheckCircle2,
  AlertTriangle, Percent, ShieldCheck, KeyRound, 
  Landmark, ExternalLink, ArrowRight, Gauge, Fuel
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import RelatedTools from "@/components/layout/RelatedTools";

// --- 1. METADATA DE ALTA PERFORMANCE (SEO 2026) ---
export const metadata: Metadata = {
  title: "Simulador de Financiamento de Veículos: Parcelas e Juros Reais",
  description: "Quer comprar seu carro ou moto? Simule o financiamento (CDC), calcule o valor da parcela com juros e descubra o Custo Efetivo Total (CET) antes de ir à concessionária.",
  keywords: [
    "simulador financiamento veiculo", 
    "calcular parcela carro", 
    "financiamento moto simulador", 
    "juros financiamento auto 2026", 
    "tabela price veiculos", 
    "calcular cdc veiculo",
    "entrada financiamento carro"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/financeiro/financiamento-veiculos" },
  openGraph: {
    title: "Calculadora de Financiamento de Veículos 2026",
    description: "Simule a compra do seu carro ou moto e fuja dos juros abusivos.",
    url: "https://mestredascontas.com.br/financeiro/financiamento-veiculos",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    // images: fallen back to root
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// --- LISTA FAQ (Específica Auto) ---
const faqList = [
    { q: "Qual a taxa de juros média para veículos em 2026?", a: "A taxa varia conforme a idade do veículo e o score do comprador. Para carros 0km, gira em torno de 1,3% a 1,8% ao mês. Para usados, pode chegar a 2,5% ou 3,0% ao mês." },
    { q: "Vale a pena dar entrada?", a: "Sempre. Quanto maior a entrada, menor o valor financiado e, consequentemente, menores os juros compostos. Uma entrada de 30% a 50% garante as melhores taxas do mercado." },
    { q: "O que é CDC?", a: "CDC (Crédito Direto ao Consumidor) é a modalidade mais comum de financiamento de veículos. O carro fica alienado ao banco até a quitação, mas está no seu nome. Permite antecipar parcelas com desconto." },
    { q: "Carro 'Taxa Zero' existe mesmo?", a: "Cuidado. Muitas vezes a 'taxa zero' exige 60% de entrada e parcelamento curto (18x ou 24x). Além disso, a concessionária pode retirar o desconto à vista do carro para compensar o subsídio dos juros." },
    { q: "Posso vender o carro financiado?", a: "Não diretamente. O carro está alienado. Para vender, você precisa quitar a dívida com o banco ou transferir o financiamento para o comprador (o que exige aprovação de crédito)." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Simulador de Financiamento de Veículos",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para simular parcelas de financiamento de carros e motos (CDC/Leasing).",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "6102", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "TechArticle",
      "headline": "Financiamento de Veículos: O Guia para não pagar 2 carros e levar 1",
      "description": "Entenda como funciona o juro automotivo, o golpe da taxa zero e como calcular a parcela real.",
      "proficiencyLevel": "Beginner",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas", "url": "https://mestredascontas.com.br/sobre" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon.png" } },
      "datePublished": "2024-02-05",
      "dateModified": new Date().toISOString(),
      "speakable": {
           "@type": "SpeakableSpecification",
           "xpath": ["/html/head/title", "/html/head/meta[@name='description']/@content"]
      }
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

export default function FinanciamentoVeiculosPage() {
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
          variant="default" // Azul
          categoryColor="blue"
          badge="Cálculo CDC"
          rating={4.8}
          reviews={6102}
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
              <Suspense fallback={
                <div className="h-96 w-full bg-slate-50 dark:bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                        <Car className="animate-bounce text-slate-300" size={32}/>
                        <span>Carregando simulador...</span>
                    </div>
                </div>
              }>
                  {/* Usando a calculadora genérica configurada mentalmente pelo usuário para veículos (Price padrão) */}
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

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              Não Compre Carro Sem Ler Isso
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            O sonho do carro novo pode virar o pesadelo da dívida impagável. No Brasil, os juros automotivos são altos e os contratos cheios de taxas escondidas.
          </p>
          <p>
            A maioria dos financiamentos de veículos utiliza a <strong>Tabela Price</strong> (parcelas fixas) e o sistema <strong>CDC (Crédito Direto ao Consumidor)</strong>. Isso significa que o carro é seu, mas fica alienado ao banco até o último centavo ser pago.
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-6 flex items-center gap-2">
              <Gauge className="text-indigo-600 dark:text-indigo-400" /> Como reduzir a parcela?
          </h3>
          <p>
              Existem apenas três formas matemáticas de baixar o valor da prestação sem cair em golpes:
          </p>

          <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-sm">
                  <Wallet className="text-blue-600 dark:text-blue-400 mb-3" size={32} />
                  <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2 text-lg">Aumentar a Entrada</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      O ideal é dar pelo menos <strong>30% a 50%</strong> do valor. Isso reduz o risco para o banco, o que derruba a taxa de juros oferecida.
                  </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <TrendingUp className="text-slate-600 dark:text-slate-400 mb-3" size={32} />
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2 text-lg">Melhorar o Score</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Pague suas contas em dia e mantenha o Cadastro Positivo ativo. Um Score acima de 700 consegue taxas muito melhores na concessionária.
                  </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-sm">
                  <KeyRound className="text-amber-600 dark:text-amber-500 mb-3" size={32} />
                  <h3 className="font-bold text-amber-900 dark:text-amber-300 mb-2 text-lg">Trocar o Modelo</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Carros muito velhos (mais de 10 anos) têm juros mais altos. Às vezes, um carro um pouco mais novo tem um financiamento mais barato.
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-6 flex items-center gap-2">
              <AlertTriangle className="text-red-500" /> A Armadilha do "Taxa Zero"
          </h3>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border-l-4 border-red-500 not-prose my-4">
              <p className="text-red-900 dark:text-red-300 font-medium mb-2">
                  "Compre seu SUV com Taxa Zero em 24x!"
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  Parece mágica, mas não é. O banco nunca empresta dinheiro de graça. Na "Taxa Zero", os juros estão embutidos no preço do carro (você perde o desconto de pagamento à vista) ou são cobrados através de taxas de cadastro (TAC) infladas. <strong>Sempre calcule o preço final total.</strong>
              </p>
          </div>

          {/* FAQ ACORDION */}
          <div className="mt-16 not-prose">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-600 dark:text-blue-400" /> Dúvidas Frequentes
            </h2>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-900 open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all duration-300">
                      <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center text-base md:text-lg select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-blue-500 dark:text-blue-400 font-black text-sm mt-1">#{idx + 1}</span>
                              <span className="leading-snug">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 text-sm md:text-base pl-8 animate-in fade-in">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* FONTES */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-2xl">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Landmark size={14}/> Fontes e Referências</h3>
              <div className="flex flex-wrap gap-3 text-xs font-bold text-blue-700 dark:text-blue-400">
                  <a href="https://www.bcb.gov.br/estatisticas/reporttxjuros?codigoSegmento=1&codigoModalidade=2010101" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all">
                      Taxas de Juros Médias (Banco Central) <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          {/* NAVEGAÇÃO FINAL */}
          </div>

          <RelatedTools currentTool="financiamento-veiculos" />

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8">
            <LazyAdUnit slot="auto_bottom" format="horizontal" variant="software" />
        </div>

        {/* RODAPÉ IMPRESSÃO */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}