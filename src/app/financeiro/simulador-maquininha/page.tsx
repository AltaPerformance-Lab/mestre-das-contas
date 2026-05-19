import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import CardMachineSimulator from "@/components/calculators/CardMachineSimulator";
import { calculateCardMachine } from "@/lib/calculators/card-machine";
import { 
  CreditCard, TrendingDown, ShieldAlert, BadgePercent, 
  HelpCircle, AlertTriangle, ShieldCheck, ArrowLeft
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
    const title = "Simulador de Taxas de Maquininha Grátis | Compare Ilimitado 2026";
    const description = "Quanto você realmente recebe? Calcule as taxas de todas as maquininhas 100% grátis e ilimitado. Descubra o custo real de vender parcelado e economize agora.";

    return {
        title,
        description,
        keywords: [
            "simulador taxas maquininha gratis", 
            "calculadora maquininha ilimitada", 
            "comparar taxas cartao gratis", 
            "calcular juros maquininha", 
            "taxa sumup moderninha mercado pago"
        ],
        alternates: { canonical: "https://mestredascontas.com.br/financeiro/simulador-maquininha" },
        openGraph: {
            title: "Simulador de Taxas de Maquininha Grátis | Compare e Economize",
            description: "Descubra quanto você realmente recebe após as taxas da maquininha. Simulações ilimitadas e 100% gratuitas.",
            url: "https://mestredascontas.com.br/financeiro/simulador-maquininha",
            siteName: "Mestre das Contas",
            locale: "pt_BR",
            type: "website",
            images: [
                { 
                    url: "/opengraph-image", 
                    width: 1200, 
                    height: 630, 
                    alt: "Simulador de Maquininha Grátis Mestre das Contas", 
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Pare de perder dinheiro para as taxas!",
            description: "Compare taxas de todas as maquininhas grátis e ilimitado no Mestre das Contas.",
            images: ["/opengraph-image"],
        },
        robots: { 
            index: true, 
            follow: true,
            googleBot: { index: true, follow: true, "max-image-preview": "large" } 
        }
    };
}

const faqList = [
    {
        q: "O que é melhor: Receber parcelado ou antecipar?",
        a: "Financeiramente, receber parcelado (\"no fluxo\") é sempre melhor, pois você não paga a taxa de antecipação. Só antecipe se você tiver falta de capital de giro (dinheiro para repor estoque). Antecipar por capricho é jogar lucro fora."
    },
    {
        q: "Como repassar a taxa para o cliente?",
        a: "Você não pode cobrar uma taxa \"extra\" no checkout surpresa, mas pode ter preços diferenciados para \"À Vista\" e \"A Prazo\". Use nossa calculadora para descobrir quanto de taxa você vai pagar e embuta isso no preço final do produto parcelado."
    },
    {
        q: "Minha taxa é \"10% tudo incluso\". Como simulo?",
        a: "Algumas maquininhas (como a InfinitePay ou Ton em certos planos) cobram uma taxa única fechada. Nesse caso, coloque \"0\" na taxa de antecipação e coloque o valor total (ex: 10%) no campo MDR aqui no simulador. O resultado será o mesmo."
    }
];

export default async function CardSimulatorPage() {
// --- 2. DADOS ESTRUTURADOS (SCHEMA.ORG) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Simulador de Maquininha Grátis e Ilimitado",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Calcula o valor líquido de vendas no cartão de crédito descontando taxas MDR e antecipação."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Taxas de Maquininha",
      "description": "Passo a passo para descobrir quanto você realmente recebe nas suas vendas.",
      "step": [
        { "@type": "HowToStep", "name": "Valor da Venda", "text": "Informe o valor total que será passado no cartão." },
        { "@type": "HowToStep", "name": "Taxa MDR", "text": "Coloque a taxa fixa da sua maquininha (ex: 2% no débito ou 4% no crédito)." },
        { "@type": "HowToStep", "name": "Parcelamento", "text": "Se a venda for parcelada, informe o número de parcelas e a taxa de antecipação." }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" },
        { "@type": "ListItem", "position": 2, "name": "Financeiro", "item": "https://mestredascontas.com.br/financeiro" },
        { "@type": "ListItem", "position": 3, "name": "Simulador Maquininha", "item": "https://mestredascontas.com.br/financeiro/simulador-maquininha" }
      ]
    }
  ]
};
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
          breadcrumbs={[{ label: "Financeiro", href: "/financeiro" }, { label: "Maquininha" }]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        
        {/* REVISÃO FINANCEIRA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Conteúdo verificado com base em taxas padrão de mercado e indicadores financeiros vigentes em 2026.</span>
        </div>
        
        {/* PUBLICIDADE TOPO */}
        <div className="w-full flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 min-h-[100px]">
           <LazyAdUnit slot="card_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="w-full relative z-10">
           <div className="mb-8">
               <PrivacyBadge />
           </div>
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
               <CardMachineSimulator />
           </Suspense>
        </section>

        {/* BRANDS LIST */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
                { name: "InfinitePay", slug: "infinitepay-smart", color: "slate", rate: "8.90%" },
                { name: "Ton T3", slug: "ton-t3-promo", color: "emerald", rate: "0.99%*" },
                { name: "Mercado Pago", slug: "mercadopago-point-pro", color: "blue", rate: "3.03%" },
                { name: "PagSeguro", slug: "pagseguro-moderninha-pro", color: "yellow", rate: "3.79%" }
            ].map(brand => (
                <Link key={brand.slug} href={`/financeiro/simulador-maquininha/${brand.slug}`} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all group">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Simular Taxas</p>
                    <h4 className="font-bold text-slate-900 dark:text-white">{brand.name}</h4>
                    <div className="mt-3 flex items-center justify-between">
                        <span className={`text-[10px] px-2 py-0.5 rounded bg-${brand.color}-50 dark:bg-${brand.color}-900/20 text-${brand.color}-700 dark:text-${brand.color}-300 font-bold`}>{brand.rate}</span>
                        <ArrowLeft size={14} className="rotate-180 text-slate-300 group-hover:text-indigo-500 transition-colors"/>
                    </div>
                </Link>
            ))}
        </div>

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
                    
                    {faqList.map((faq, idx) => (
                        <details key={idx} id={`faq-${idx}`} className="group bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer open:ring-2 open:ring-indigo-100 dark:open:ring-indigo-900/30 transition-all">
                            <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                                {faq.q}
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-700 pt-3 text-sm">
                                {faq.a}
                            </p>
                        </details>
                    ))}

                </div>
              
            <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
          </div>

        </div>

        <SmartCrossLinker currentHref="/financeiro/simulador-maquininha" category="financeiro" /> 

        {/* PUBLICIDADE BOTTOM */}
        <div className="w-full flex justify-center mt-8">
           <LazyAdUnit slot="card_bottom" format="horizontal" variant="auto" className="min-h-[100px] w-full" />
        </div>

      </div>
    </div>
  );
}
