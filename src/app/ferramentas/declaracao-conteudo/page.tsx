import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ContentDeclarationGenerator from "@/components/tools/ContentDeclarationGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { 
  FileText, ShieldCheck, Truck, Scale, AlertTriangle, 
  HelpCircle, Printer, Package, CheckCircle2,
  Briefcase
} from "lucide-react";
import DisclaimerBox from "@/components/ui/DisclaimerBox";

// --- 1. SEO 2026 DINÂMICO ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Declaração de Conteúdo Correios (PDF Editável) | 2026 Grátis";
  const description = "Gerador online da Declaração de Conteúdo oficial dos Correios. Modelo 2026 pdf editável, rápido e pronto para imprimir. Obrigatório para envios sem nota.";

  return {
    title,
    description,
    keywords: [
      "declaração de conteúdo correios pdf", 
      "declaração de conteúdo correios pdf editável", 
      "declaração de conteúdo para imprimir", 
      "enviar encomenda sem nota fiscal", 
      "formulario correios pdf",
      "declaração de conteúdo correios online"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/declaracao-conteudo" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/ferramentas/declaracao-conteudo",
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
      "name": "Gerador de Declaração de Conteúdo",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para gerar formulário de Declaração de Conteúdo exigido pelos Correios para envios não comerciais."
    },
    {
      "@type": "HowTo",
      "name": "Como Gerar uma Declaração de Conteúdo para os Correios",
      "description": "Passo a passo simples para preencher e emitir o formulário oficial de declaração de conteúdo exigido pelos Correios e transportadoras.",
      "totalTime": "PT60S",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Preencha o Remetente",
          "text": "Insira o nome, CPF/CNPJ e endereço completo da pessoa ou empresa que está enviando a encomenda.",
          "url": "https://mestredascontas.com.br/ferramentas/declaracao-conteudo#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Preencha o Destinatário",
          "text": "Digite os dados de quem vai receber o pacote, incluindo nome completo, CPF/CNPJ e o endereço de entrega.",
          "url": "https://mestredascontas.com.br/ferramentas/declaracao-conteudo#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Liste os Itens e Imprima",
          "text": "Descreva cada produto enviado (quantidade e valor aproximado). Clique em 'Gerar Declaração' para abrir o PDF editável oficial e imprima em A4.",
          "url": "https://mestredascontas.com.br/ferramentas/declaracao-conteudo#ferramenta"
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Guia da Declaração de Conteúdo Correios: O que é e Como Usar",
      "description": "Entenda quando usar a declaração de conteúdo em vez da nota fiscal, as regras dos Correios e como preencher o documento corretamente.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon.png" } },
      "datePublished": "2024-02-10",
      "dateModified": new Date().toISOString()
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Posso preencher a mão?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, você pode pegar o formulário em branco na agência e preencher com caneta. Mas nosso gerador é mais legível, evita erros e você já chega na agência pronto, pulando a etapa de ficar procurando caneta no balcão." } },
        { "@type": "Question", "name": "Serve para transportadoras (Jadlog, Azul, etc)?", "acceptedAnswer": { "@type": "Answer", "text": "Sim! A Declaração de Conteúdo é um documento fiscal padrão aceito por todas as transportadoras terrestres e aéreas para transporte entre não contribuintes. O modelo gerado aqui é 100% compatível." } },
        { "@type": "Question", "name": "Preciso colocar o CPF do destinatário?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, é obrigatório. Sem o CPF/CNPJ do destinatário, o sistema dos Correios trava e não permite a postagem. Peça esse dado ao seu cliente antes de sair de casa." } }
      ]
    }
  ]
};

export default async function ContentDeclarationPage() {

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 font-sans bg-slate-50 dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Declaração de Conteúdo Correios"
          description="Gere o documento obrigatório para enviar encomendas sem Nota Fiscal. Preencha abaixo e imprima o modelo oficial aceito em todas as agências."
          category="Logística & Correios"
          icon={<FileText size={32} strokeWidth={2} />}
          variant="tools"
          categoryColor="amber"
          badge="Oficial 2026"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Declaração de Conteúdo" }
          ]}
          />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="declaracao_top" format="horizontal" variant="agency" />
        </div>

        {/* REVISÃO LEGAL (E-E-A-T) */}
        <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-amber-700 dark:text-amber-300 mb-2">
          <ShieldCheck size={18} className="text-amber-600 shrink-0" />
          <span>Documento obrigatório conforme o Protocolo ICMS 32/01 e a Lei Postal, revisado para os padrões de fiscalização de 2026.</span>
        </div>

        {/* FERRAMENTA */}
        <section className="w-full max-w-full relative z-10 print:m-0">
           <div className="mb-6 print:hidden">
              <PrivacyBadge />
           </div>
           
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <ContentDeclarationGenerator />
           </Suspense>
           
           {/* COMBO LOGÍSTICO (Cross-selling baseado em Analytics) */}
           <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 print:hidden max-w-5xl mx-auto">
              <Link href="/ferramentas/gerador-recibo" className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-amber-500 transition-all group shadow-sm">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Package size={20} className="text-amber-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Gerador de Recibo</h4>
                  <p className="text-[10px] text-slate-500">Emita o recibo da venda</p>
                </div>
              </Link>
              <Link href="/ferramentas/criador-pedidos" className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-amber-500 transition-all group shadow-sm">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Briefcase size={20} className="text-amber-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Criador de Pedidos</h4>
                  <p className="text-[10px] text-slate-500">Organize suas vendas</p>
                </div>
              </Link>
              <Link href="/ferramentas/editor-pdf-online" className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-amber-500 transition-all group shadow-sm">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <FileText size={20} className="text-amber-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Editor de PDF</h4>
                  <p className="text-[10px] text-slate-500">Assine documentos online</p>
                </div>
              </Link>
           </div>
           
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="declaracao_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO PROFUNDO (DEEP CONTENT) --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden dark:prose-invert">
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2 mb-4 flex items-center gap-2 border-l-4 border-amber-500 pl-4">
                Como Usar o Gerador de Declaração de Conteúdo (Passo a Passo)
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
               Gere seu formulário oficial dos Correios 100% preenchido e pronto para postar em 3 passos:
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center shrink-0">1</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Remetente & Destinatário</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Preencha os dados completos de quem está enviando a mercadoria e de quem vai recebê-la (Nome, CPF/CNPJ e Endereço).</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center shrink-0">2</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Lista de Produtos</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Descreva os itens do pacote de forma clara (Ex: <code>"Camiseta de Algodão"</code>), informando a quantidade e o valor estimado de cada um.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center shrink-0">3</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Imprima & Assine</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Clique em <strong>"Gerar Declaração"</strong> para baixar o PDF editável no padrão oficial dos Correios. Imprima e assine antes de postar.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-amber-500 pl-4">
               O Guia Definitivo da Declaração de Conteúdo
            </h2>
            
            <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
               Você preparou o pacote com todo carinho, foi até a agência dos Correios, enfrentou a fila e, na hora de postar, o atendente soltou aquela frase clássica: <em>"Cadê a nota fiscal ou a declaração de conteúdo?"</em>.
            </p>
            <p>
               Se isso já aconteceu com você, respire fundo. Você não está sozinho. Desde 2018, uma regra federal mudou o jogo das postagens no Brasil, pegando muito e-commerce e vendedor informal de surpresa.
            </p>
            <p>
               A verdade é que <strong>nenhuma encomenda viaja no Brasil sem documento fiscal</strong>. Mas calma! Se você não tem Nota Fiscal (porque é pessoa física ou MEI vendendo produto usado/artesanato), a "Declaração de Conteúdo" é o seu salvo-conduto.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 p-6 rounded-2xl my-8 not-prose shadow-sm">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-3 flex items-center gap-2">
                    <ShieldCheck size={20}/> Regra de Ouro
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-0">
                    A Declaração de Conteúdo substitui a Nota Fiscal <strong>APENAS</strong> para envios não comerciais ou transporte de bens entre não contribuintes de ICMS. Se você tem empresa e vende habitualmente, a Nota Fiscal é obrigatória. Usar a declaração indevidamente é crime de sonegação fiscal.
                </p>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <Truck className="text-blue-600"/> Por que os Correios exigem isso?
            </h3>
            <p>
                Não é burocracia dos Correios, é lei. A exigência vem do protocolo ICMS 32/01 e da Lei Postal. O objetivo é duplo: saber o que está circulando para evitar sonegação de impostos e garantir que itens perigosos não sejam transportados.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <Scale className="text-emerald-600"/> Nota Fiscal vs. Declaração
            </h3>
            <p>
                A Declaração de Conteúdo é para pessoas físicas ou MEIs em transações não comerciais. Para lojas virtuais formais com faturamento recorrente, a Nota Fiscal é sempre o documento correto.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-500"/> Cuidados ao Preencher
            </h3>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Descrição:</strong> Evite termos genéricos. Seja específico sobre o que está no pacote.</li>
                <li><strong>Valor:</strong> Declare o valor real para garantir a cobertura do seguro.</li>
                <li><strong>Assinatura:</strong> O documento só tem validade se estiver assinado pelo remetente.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <Package className="text-purple-600"/> Como fixar na embalagem
            </h3>
            <p>
                A declaração deve ser fixada na parte externa da caixa, preferencialmente dentro de um saquinho plástico transparente (canguru), permitindo a leitura sem abrir o pacote.
            </p>

            {/* FAQ */}
            <div className="mt-16 not-prose">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <HelpCircle className="text-blue-600 dark:text-blue-400" /> Perguntas Frequentes
                </h2>
                <div className="grid gap-4">
                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Posso preencher a mão?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            Sim, mas o gerador digital evita erros de leitura e agiliza sua postagem na agência.
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Serve para transportadoras?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            Sim! A Declaração de Conteúdo é aceita pela Jadlog, Azul Cargo e diversas outras transportadoras.
                        </p>
                    </details>
                </div>
            </div>

        </div>

        <SmartCrossLinker currentHref="/ferramentas/declaracao-conteudo" category="glossario" />
        <SmartCrossLinker currentHref="/ferramentas/declaracao-conteudo" category="destaques" />
        
        {/* ANÚNCIO FINAL */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="declaracao_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
