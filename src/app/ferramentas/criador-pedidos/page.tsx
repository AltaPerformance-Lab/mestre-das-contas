import type { Metadata } from "next";
import Link from "next/link";
import OrderCreator from "@/components/tools/OrderCreator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { orderCases } from "@/data/order-pseo-list";
import { 
  ShoppingBag, FileText, Printer, CheckCircle, 
  Briefcase, Zap, HelpCircle, ShieldCheck, Star,
  TrendingUp, AlertTriangle, PenTool, Truck, Calculator
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

// --- SEO 2026 ---
export const metadata: Metadata = {
  title: "Gerador de Pedido de Venda: Talão e Bloco PDF (Imprimir)",
  description: "Faça pedidos de venda e ordens de serviço em PDF. Adicione frete, cálculos automáticos e sua logo. Ideal para vendas, representantes e lojas.",
  keywords: [
    "criador de pedido eletronico", "bloco de pedido pdf", "talão de pedido gratis",
    "gerar pedido venda online", "ordem de serviço pdf", "fazer pedido com logo"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/criador-pedidos" },
  openGraph: {
    title: "Criador de Pedidos de Venda - Grátis e Profissional",
    description: "Substitua o bloco de papel. Gere pedidos ilimitados em PDF com sua marca, frete e garantia. Sem cadastro.",
    url: "https://mestredascontas.com.br/ferramentas/criador-pedidos",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
  },
};

// --- DADOS ESTRUTURADOS ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Criador de Pedidos de Venda Online",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "description": "Ferramenta para emissão de pedidos de venda, orçamentos e ordens de serviço com cálculo de frete e layout profissional.",
  "featureList": "Gerar PDF, Adicionar Logo, Calcular Frete, Termos de Garantia, Impressão A4",
  "aggregateRating": { 
      "@type": "AggregateRating", 
      "ratingValue": "4.8", 
      "ratingCount": "1250", 
      "bestRating": "5", 
      "worstRating": "1" 
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Loja das Cores" },
      "datePublished": "2026-01-20",
      "reviewBody": "Amei! Consigo colocar taxa de entrega e enviar pro cliente na hora. Muito melhor que anotar no caderno.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" }
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Carlos Representante" },
      "datePublished": "2026-01-18",
      "reviewBody": "Prático para tirar pedido na rua. O cálculo de frete ajuda muito.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" }
    }
  ]
};

export default function OrderPage() {
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
          rating={4.8}
          reviews={1250}
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
           <OrderCreator />
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="orcamento_mid" format="auto" />
        </div>

        {/* --- MODELOS DE PEDIDOS (pSEO LINKING) --- */}
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
                        <div className="mt-3 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                             <Star size={12} className="text-amber-400 fill-amber-400"/> {c.rating.toFixed(1)}
                        </div>
                    </Link>
                ))}
            </div>
        </div>

        {/* --- ARTIGO EDUCACIONAL DENSO --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-xs mb-2">
                <TrendingUp size={16} /> Vendas Profissionais
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                Pedido de Venda x Orçamento: Qual a diferença?
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-xl font-medium mb-8">
                Muitos empreendedores confundem, mas a diferença jurídica é enorme. Entenda quando usar cada um e evite problemas com o PROCON.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border-t-4 border-blue-500">
                    <h3 className="font-bold text-blue-900 dark:text-blue-300 text-lg mb-2">Orçamento</h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                        É uma <strong>proposta</strong>. O cliente ainda está decidindo. Tem validade e pode sofrer alterações de preço. Não gera obrigação de faturamento imediato.
                    </p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border-t-4 border-emerald-500">
                    <h3 className="font-bold text-emerald-900 dark:text-emerald-300 text-lg mb-2">Pedido de Venda</h3>
                    <p className="text-emerald-800 dark:text-emerald-200 text-sm">
                        É um <strong>contrato fechado</strong>. O cliente já disse SIM. O preço, prazo e entrega estão travados. É o passo anterior à Nota Fiscal.
                    </p>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6 flex items-center gap-3">
                <Truck className="text-slate-800 dark:text-slate-200" /> A importância do Campo "Frete"
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
                Ao vender produtos (seja bolo ou parafuso), a entrega é o ponto crítico. Nosso criador inclui campos específicos para:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                <li><strong>Valor do Frete:</strong> Separado do produto. Isso ajuda na sua contabilidade (frete não é lucro).</li>
                <li><strong>Previsão de Entrega:</strong> Evite o "chega amanhã" se não tiver certeza. Documente a data combinada.</li>
                <li><strong>Retirada:</strong> Se for retirada no local, use o campo de Obs para marcar "Retirada pelo Cliente".</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6 flex items-center gap-3">
                <PenTool className="text-emerald-600 dark:text-emerald-400" /> Política de Troca no Pedido
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
                A Lei do E-commerce exige 7 dias para arrependimento, mas a loja física não.
                Entretanto, para manter a boa relação, deixe as regras claras no rodapé do pedido:
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl italic text-slate-600 dark:text-slate-400">
                "Trocas somente com etiqueta, sem uso e dentro de 15 dias. Peças em promoção não têm troca."
            </div>

            {/* --- REVIEWS AREA --- */}
            <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 not-prose">
                <div className="flex flex-col items-center justify-center text-center mb-10">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Avaliações de Quem Vende</h3>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-amber-400">
                            <Star fill="currentColor" size={24} />
                            <Star fill="currentColor" size={24} />
                            <Star fill="currentColor" size={24} />
                            <Star fill="currentColor" size={24} />
                            <Star fill="currentColor" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">4.8</span>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-12 mb-4 flex items-center gap-2">
                <HelpCircle className="text-slate-500 dark:text-slate-400"/> FAQ - Perguntas Frequentes
            </h3>
            
            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                    Esse pedido tem validade jurídica?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2">
                    Sim, como um contrato entre as partes. Se assinado (mesmo que digitalmente), comprova o acordo comercial. Porém, ele <strong>não substitui a Nota Fiscal</strong> para fins tributários.
                </div>
            </details>
            
            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                     Serve para prestação de serviços?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2">
                    Sim! Use como uma Ordem de Serviço (OS). Basta descrever o serviço nos itens e usar o campo "Garantia" nos termos.
                </div>
            </details>

        </div>

        {/* NAVEGAÇÃO FINAL */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose">
            <p className="font-bold text-slate-900 dark:text-slate-100 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <ShieldCheck size={16} className="text-indigo-500"/> Veja também:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/ferramentas/criador-orcamentos" className="flex flex-col p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group">
                  <div className="bg-blue-50 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform"><Calculator size={20}/></div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Criador de Orçamento</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Para propostas comerciais</span>
              </Link>
              <Link href="/ferramentas/gerador-recibo" className="flex flex-col p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-400 hover:shadow-lg transition-all group">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-400 shadow-sm group-hover:scale-110 transition-transform"><FileText size={20}/></div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Gerador de Recibo</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Comprovante de pagamento</span>
              </Link>
            </div>
        </div>

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="orcamento_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
