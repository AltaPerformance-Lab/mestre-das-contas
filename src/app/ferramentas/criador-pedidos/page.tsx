import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import OrderCreator from "@/components/tools/OrderCreator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { orderCases } from "@/data/order-pseo-list";
import { 
  ShoppingBag, Star, TrendingUp, HelpCircle, Briefcase, 
  Truck, Calculator, PenTool
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";


// --- 1. SEO 2026 DINÂMICO ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Gerador de Talão de Pedido de Venda Grátis | Criar PDF";
  const description = "Faça pedidos de venda, orçamentos e ordens de serviço em PDF. Adicione frete, cálculos automáticos e sua logo. Ferramenta online gratuita para lojistas.";

  return {
    title,
    description,
    keywords: [
      "talão de pedido grátis", "bloco de pedido pdf", "gerador de talão de venda",
      "gerar pedido venda online", "o que é um talão de venda", "fazer pedido com logo"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/criador-pedidos" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/ferramentas/criador-pedidos",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "website" } };
}

// --- DADOS ESTRUTURADOS ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Criador de Pedidos de Venda Online",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para emissão de pedidos de venda, orçamentos e ordens de serviço com cálculo de frete e layout profissional.",
      "featureList": "Gerar PDF, Adicionar Logo, Calcular Frete, Termos de Garantia, Impressão A4" }
  ]
};

export default async function OrderPage() {

  return (
    <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Criador de Pedidos de Venda"
          description="Aposente o bloco de papel. Crie pedidos digitais completos com cálculo de frete, previsão de entrega e sua marca. Profissionalize suas vendas."
          category="Ferramentas para Vendas"
          icon={<ShoppingBag size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="emerald"
          badge="Novo 2026"
          breadcrumbs={[{ label: "Ferramentas", href: "/ferramentas" }, { label: "Criar Pedido" }]}
          />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="orcamento_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA PRINCIPAL */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <PrivacyBadge />
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <OrderCreator />
           </Suspense>
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="orcamento_mid" format="auto" />
        </div>

        {/* --- MODELOS DE PEDIDOS --- */}
        <div className="print:hidden not-prose mb-12">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-slate-500 dark:text-slate-400"/> Modelos Prontos por Ramo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {orderCases.map((c) => (
                    <Link 
                        key={c.slug} 
                        href={`/ferramentas/criador-pedidos/${c.slug}`}
                        className="flex flex-col p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group"
                    >
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Template</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base group-hover:text-emerald-700 dark:group-hover:text-emerald-400 leading-tight">
                            {c.title}
                        </span>
                    </Link>
                ))}
            </div>
        </div>

        {/* --- ARTIGO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-xs mb-2">
                <TrendingUp size={16} /> Vendas Profissionais
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                Pedido de Venda x Orçamento: Qual a diferença?
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-xl font-medium mb-8">
                Muitos empreendedores confundem, mas a diferença jurídica é enorme. O orçamento é uma proposta, enquanto o pedido é um contrato fechado.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6 flex items-center gap-3">
                <Truck className="text-slate-800 dark:text-slate-200" /> Por que documentar seus pedidos?
            </h3>
            <p>
                Documentar cada venda protege você e seu cliente. Com um pedido formal, você evita mal-entendidos sobre prazos de entrega, valores de frete e especificações de produtos.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6 flex items-center gap-3">
                <Calculator className="text-emerald-600 dark:text-emerald-400" /> Cálculo Automático e Transparência
            </h3>
            <p>
                Nossa ferramenta calcula automaticamente subtotais, descontos e o valor total com frete. Isso transmite confiança ao cliente, que vê exatamente pelo que está pagando.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-12 mb-4 flex items-center gap-2">
                <HelpCircle className="text-slate-500 dark:text-slate-400"/> Perguntas Frequentes
            </h3>
            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                    Esse pedido tem validade jurídica?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2">
                    Sim, funciona como um contrato entre as partes. Se assinado, comprova o acordo comercial, embora não substitua a Nota Fiscal.
                </div>
            </details>
        </div>

        <SmartCrossLinker currentHref="/ferramentas/criador-pedidos" category="ferramentas" />

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="orcamento_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}
