import type { Metadata } from "next";
export const runtime = 'edge';
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import CardMachineSimulator from "@/components/calculators/CardMachineSimulator";
import { 
  CreditCard, TrendingDown, ShieldAlert, BadgePercent, 
  HelpCircle, AlertTriangle 
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import RelatedTools from "@/components/layout/RelatedTools";

export const metadata: Metadata = {
  title: "Calculadora de Taxas Maquininha: Quanto Cai na Conta? (Todas)",
  description: "Quanto você realmente recebe? Calcule as taxas MDR e Antecipação de Recebíveis. Descubra o custo real de vender parcelado e receber na hora.",
  keywords: ["simulador taxas maquininha", "calculadora antecipação recebiveis", "mdr cartão credito", "calcular juros maquininha", "taxa sumup moderninha mercado pago"],
  alternates: { canonical: "https://mestredascontas.com.br/financeiro/simulador-maquininha" },
  openGraph: {
    title: "Simulador de Maquininha - Mestre das Contas",
    description: "Venda parcelada, receba à vista? Veja o quanto isso custa do seu lucro agora.",
    url: "https://mestredascontas.com.br/financeiro/simulador-maquininha",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Simulador de Taxas de Cartão",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "description": "Calcula o valor líquido de vendas no cartão de crédito descontando taxas MDR e antecipação.",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "980", "bestRating": "5", "worstRating": "1" }
};

export default function CardSimulatorPage() {
  return (
    <div className="w-full max-w-full overflow-hidden font-sans pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Simulador de Taxas da Maquininha"
          description="A venda foi feita, mas quanto sobra no bolso? Calcule o desconto do MDR e o custo da Antecipação de Recebíveis (RAV)."
          category="Gestão Empresarial"
          icon={<CreditCard size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="violet"
          badge="Cálculo Líquido"
          rating={4.7}
          reviews={980}
          breadcrumbs={[{ label: "Financeiro", href: "/financeiro" }, { label: "Maquininha" }]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        
        {/* PUBLICIDADE TOPO */}
        <div className="w-full flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 min-h-[100px]">
           <LazyAdUnit slot="card_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="w-full relative z-10">
           <div className="mb-8">
               <PrivacyBadge />
           </div>
           <CardMachineSimulator />
        </section>

        {/* PUBLICIDADE MEIO */}
        <div className="w-full flex justify-center my-4">
           <LazyAdUnit slot="card_mid" format="auto" className="min-h-[100px] w-full max-w-4xl" />
        </div>

        {/* ARTIGO PROFUNDO (EDUCAÇÃO FINANCEIRA) */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden mt-8">
            
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-indigo-600 pl-4 flex items-center gap-3">
               <TrendingDown className="text-indigo-600"/> O Sócio Oculto da sua Loja
            </h2>

            <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
                Você vendeu R$ 1.000,00 em 10x "sem juros" para o cliente. Parabéns pela venda! Mas quando você abre o extrato da maquininha no dia seguinte, o valor que caiu lá não foi R$ 1.000,00. Foi R$ 850,00. Ou menos.
            </p>
            <p>
                Para onde foram esses R$ 150,00? Bem-vindo ao mundo das taxas de antecipação.
            </p>
            <p>
                Muitos empresários quebram não por falta de vendas, mas porque <strong>calculam o preço errado</strong>. Eles esquecem que a maquininha é um sócio que cobra caro, especialmente se você tiver pressa para receber.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">Entendendo a Sopa de Letrinhas: MDR e RAV</h3>
            <p>
                Para usar nossa calculadora, você precisa entender dois conceitos simples que mudam tudo:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                        <BadgePercent className="text-blue-500 dark:text-blue-400"/> 1. Taxa MDR
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        <em>Merchant Discount Rate</em>. É a taxa do pedágio. Você paga essa taxa só por ter passado o cartão. Geralmente varia entre 3% a 5% no crédito parcelado. É descontada uma única vez sobre o valor total.
                    </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                        <TrendingDown className="text-red-500 dark:text-red-400"/> 2. Taxa de Antecipação
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Se você vendeu em 10x, você deveria receber em 10 meses. Se você quer receber tudo AMANHÃ, o banco te "empresta" esse dinheiro e cobra juros por isso. É aqui que o custo explode. Geralmente é 2% a 3% <strong>ao mês</strong>.
                    </p>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">A Armadilha do "Parcelado Sem Juros"</h3>
            <p>
                Quando você oferece "10x sem juros" para o cliente, quem paga os juros é VOCÊ.
            </p>
            <p>
                Se a sua margem de lucro no produto é de 20% e as taxas da maquininha somam 18% (algo comum em antecipações longas), você está, na prática, trocando dinheiro. Está trabalhando de graça para a operadora do cartão.
            </p>
            <p>
                <strong>Dica de Ouro:</strong> Use nossa calculadora para descobrir o "Custo Efetivo" da venda. Se for alto demais, considere oferecer um desconto agressivo no Pix (que custa zero se usar nosso <Link href="/ferramentas/gerador-pix" className="text-indigo-600 font-bold hover:underline">Gerador de Pix</Link>).
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-xl not-prose my-8">
                 <h4 className="text-red-900 dark:text-red-300 font-bold flex items-center gap-2 text-lg m-0 mb-2">
                     <ShieldAlert size={20}/> Atenção nas vendas acima de 6x
                 </h4>
                 <p className="text-red-800 dark:text-red-200 text-sm leading-relaxed m-0">
                     A taxa de antecipação é <strong>Juros Compostos</strong>. Quanto mais parcelas, mais caro fica "trazer o dinheiro do futuro". Uma venda em 12x antecipada pode ter um desconto total de quase 20% a 25% dependendo da sua maquininha. Nunca parcele longo prazo sem recalcular seu preço.
                 </p>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">Como economizar nas taxas?</h3>
            <div className="not-prose grid gap-4 mb-8">
                 <div className="flex items-start gap-3">
                    <span className="bg-emerald-100 text-emerald-800 font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <p className="text-slate-700 dark:text-slate-300"><strong>Negocie:</strong> Se você fatura mais de R$ 10mil/mês, ligue para a operadora. Eles sempre têm uma "tabela balcão" (cara) e uma "tabela negociada" (barata).</p>
                 </div>
                 <div className="flex items-start gap-3">
                    <span className="bg-emerald-100 text-emerald-800 font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <p className="text-slate-700 dark:text-slate-300"><strong>Repasse Juros:</strong> Muitas maquininhas têm a opção "Parcelado Comprador". O cliente paga os juros, e você recebe o valor cheio. É o modelo do Mercado Livre.</p>
                 </div>
                 <div className="flex items-start gap-3">
                    <span className="bg-emerald-100 text-emerald-800 font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <p className="text-slate-700 dark:text-slate-300"><strong>Receba no Fluxo:</strong> Se você tem caixa, configure para receber em 30/60/90 dias. A taxa cai de ~15% para ~3%.</p>
                 </div>
            </div>

            {/* FAQ */}
            <div className="mt-12 not-prose">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                    <HelpCircle className="text-indigo-600 dark:text-indigo-500" /> Perguntas Frequentes
                </h2>
                <div className="space-y-4">
                    
                    <details className="group bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer open:ring-2 open:ring-indigo-100 dark:open:ring-indigo-900/30 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            O que é melhor: Receber parcelado ou antecipar?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-700 pt-3 text-sm">
                            Financeiramente, receber parcelado ("no fluxo") é sempre melhor, pois você não paga a taxa de antecipação. Só antecipe se você tiver <strong>falta de capital de giro</strong> (dinheiro para repor estoque). Antecipar por capricho é jogar lucro fora.
                        </p>
                    </details>

                    <details className="group bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer open:ring-2 open:ring-indigo-100 dark:open:ring-indigo-900/30 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            Como repassar a taxa para o cliente?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-700 pt-3 text-sm">
                            Você não pode cobrar uma taxa "extra" no checkout surpresa, mas pode ter preços diferenciados para "À Vista" e "A Prazo". Use nossa calculadora para descobrir quanto de taxa você vai pagar e embuta isso no preço final do produto parcelado.
                        </p>
                    </details>

                    <details className="group bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer open:ring-2 open:ring-indigo-100 dark:open:ring-indigo-900/30 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            Minha taxa é "10% tudo incluso". Como simulo?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-700 pt-3 text-sm">
                            Algumas maquininhas (como a InfinitePay ou Ton em certos planos) cobram uma taxa única fechada. Nesse caso, coloque "0" na taxa de antecipação e coloque o valor total (ex: 10%) no campo MDR aqui no simulador. O resultado será o mesmo.
                        </p>
                    </details>

                </div>
            </div>

        </div>

        <RelatedTools currentTool="simulador-maquininha" /> 

        {/* PUBLICIDADE BOTTOM */}
        <div className="w-full flex justify-center mt-8">
           <LazyAdUnit slot="card_bottom" format="horizontal" variant="auto" className="min-h-[100px] w-full" />
        </div>

      </div>
    </div>
  );
}
