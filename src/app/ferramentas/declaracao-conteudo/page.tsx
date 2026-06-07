import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ContentDeclarationGenerator from "@/components/tools/ContentDeclarationGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
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
// --- DADOS ESTRUTURADOS COMPLEXOS COM 7 DÚVIDAS REAIS ---
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
        { 
          "@type": "Question", 
          "name": "O que é e para que serve a Declaração de Conteúdo dos Correios?", 
          "acceptedAnswer": { "@type": "Answer", "text": "A Declaração de Conteúdo é um documento fiscal exigido por lei que atesta quais produtos estão sendo transportados dentro de uma encomenda pelos Correios ou transportadoras, servindo para fiscalização tributária e fins de seguro do pacote." } 
        },
        { 
          "@type": "Question", 
          "name": "Quando posso usar a declaração em vez da Nota Fiscal?", 
          "acceptedAnswer": { "@type": "Answer", "text": "Você deve usar a Declaração de Conteúdo apenas quando realizar envios não comerciais (como presentes, devoluções pessoais ou bens próprios) ou em vendas ocasionais feitas por pessoas físicas que não sejam contribuintes frequentes de ICMS." } 
        },
        { 
          "@type": "Question", 
          "name": "É obrigatório colocar o CPF do destinatário na declaração de conteúdo?", 
          "acceptedAnswer": { "@type": "Answer", "text": "Sim, é 100% obrigatório. Sem o preenchimento correto do CPF ou CNPJ de quem vai receber a encomenda, as agências dos Correios e os sistemas das transportadoras barram a postagem do objeto imediatamente." } 
        },
        { 
          "@type": "Question", 
          "name": "Posso imprimir em preto e branco ou preencher à mão?", 
          "acceptedAnswer": { "@type": "Answer", "text": "Sim, você pode imprimir em preto e branco sem problemas. O preenchimento também pode ser feito à mão com caneta azul ou preta em formulários físicos, mas a impressão digital evita rasuras, erros de digitação do atendente e garante um aspecto muito mais profissional." } 
        },
        { 
          "@type": "Question", 
          "name": "Como funciona o seguro em caso de extravio de mercadoria?", 
          "acceptedAnswer": { "@type": "Answer", "text": "Caso o seu pacote seja extraviado ou roubado, os Correios indenizam o remetente com base no valor declarado no documento, respeitando o teto estabelecido nas normas da empresa. Por isso, declare sempre o valor real aproximado do produto." } 
        },
        { 
          "@type": "Question", 
          "name": "A declaração serve para transportadoras privadas como Jadlog e Azul Cargo?", 
          "acceptedAnswer": { "@type": "Answer", "text": "Sim, com certeza. A Declaração de Conteúdo é um documento oficial padronizado pela Receita Federal, sendo aceita e exigida por todas as transportadoras aéreas ou terrestres que operam no território nacional." } 
        },
        { 
          "@type": "Question", 
          "name": "Microempreendedor Individual (MEI) pode enviar mercadorias com ela?", 
          "acceptedAnswer": { "@type": "Answer", "text": "O MEI é dispensado de emitir Nota Fiscal nas vendas diretas para pessoa física, podendo sim usar a Declaração de Conteúdo nos envios pelos Correios. No entanto, se o destinatário for uma pessoa jurídica (outra empresa), a emissão da NF-e é obrigatória por lei." } 
        }
      ]
    }
  ]
};

export default async function ContentDeclarationPage() {

  const faqList = [
    { 
      q: "O que é e para que serve a Declaração de Conteúdo dos Correios?", 
      a: "A Declaração de Conteúdo é um documento fiscal exigido por lei que atesta quais produtos estão sendo transportados dentro de uma encomenda pelos Correios ou transportadoras, servindo para fiscalização tributária e fins de seguro do pacote." 
    },
    { 
      q: "Quando posso usar a declaração em vez da Nota Fiscal?", 
      a: "Você deve usar a Declaração de Conteúdo apenas quando realizar envios não comerciais (como presentes, devoluções pessoais ou bens próprios) ou em vendas ocasionais feitas por pessoas físicas que não sejam contribuintes frequentes de ICMS." 
    },
    { 
      q: "É obrigatório colocar o CPF do destinatário na declaração de conteúdo?", 
      a: "Sim, é 100% obrigatório. Sem o preenchimento correto do CPF ou CNPJ de quem vai receber a encomenda, as agências dos Correios e os sistemas das transportadoras barram a postagem do objeto imediatamente." 
    },
    { 
      q: "Posso imprimir em preto e branco ou preencher à mão?", 
      a: "Sim, você pode imprimir em preto e branco sem problemas. O preenchimento também pode ser feito à mão com caneta azul ou preta em formulários físicos, mas a impressão digital evita rasuras, erros de digitação do atendente e garante um aspecto muito mais profissional." 
    },
    { 
      q: "Como funciona o seguro em caso de extravio de mercadoria?", 
      a: "Caso o seu pacote seja extraviado ou roubado, os Correios indenizam o remetente com base no valor declarado no documento, respeitando o teto estabelecido nas normas da empresa. Por isso, declare sempre o valor real aproximado do produto." 
    },
    { 
      q: "A declaração serve para transportadoras privadas como Jadlog e Azul Cargo?", 
      a: "Sim, com certeza. A Declaração de Conteúdo é um documento oficial padronizado pela Receita Federal, sendo aceita e exigida por todas as transportadoras aéreas ou terrestres que operam no território nacional." 
    },
    { 
      q: "Microempreendedor Individual (MEI) pode enviar mercadorias com ela?", 
      a: "O MEI é dispensado de emitir Nota Fiscal nas vendas diretas para pessoa física, podendo sim usar a Declaração de Conteúdo nos envios pelos Correios. No entanto, se o destinatário for uma pessoa jurídica (outra empresa), a emissão da NF-e é obrigatória por lei." 
    }
  ];

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
               O Segredo da Declaração de Conteúdo nos Correios
            </h2>
            
            <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
               Você preparou o pacote com todo carinho, foi até a agência dos Correios, enfrentou a fila e, na hora de postar, o atendente soltou aquela frase clássica: <em>"Cadê a nota fiscal ou a declaração de conteúdo?"</em>.
            </p>
            
            <p>
               Nós entendemos perfeitamente como essa situação é frustrante. 
            </p>

            <p>
               A verdade é que, desde 2018, uma regra unificada e rigidamente fiscalizada pela Receita Federal mudou completamente o fluxo de envios no Brasil, pegando milhares de pequenos empreendedores, autônomos e pessoas comuns de surpresa nas agências de postagem.
            </p>

            <p>
               Nenhuma caixa ou envelope viaja pelas estradas ou céus do país sem um documento fiscal adequado anexado na parte externa do pacote.
            </p>

            <p>
               Mas não se desespere! Se você está realizando um envio sem finalidade de comércio regular — como um presente para um familiar, a devolução de uma compra própria, ou mesmo uma venda informal esporádica como pessoa física —, a **Declaração de Conteúdo** é a sua salvadora.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 p-6 rounded-2xl my-8 not-prose shadow-sm">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-3 flex items-center gap-2">
                    <ShieldCheck size={20}/> O que a Legislação Determina
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-0">
                    A declaração de conteúdo substitui a nota fiscal de forma excepcional **apenas** nas remessas de mercadorias sem intuito comercial, realizadas por indivíduos não contribuintes de ICMS. Tentar burlar essa norma para fins comerciais recorrentes configura crime tributário direto.
                </p>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <Truck className="text-blue-600"/> Por que os Correios e Transportadoras Exigem?
            </h3>
            
            <p>
               Veja bem, a regra não é uma mera invenção dos Correios ou burocracia dos funcionários de balcão. 
            </p>

            <p>
               Ela é fruto de uma regulação integrada entre as Secretarias de Fazenda de todos os estados brasileiros (Protocolo ICMS 32/01), com o objetivo de combater a sonegação fiscal nas divisas interestaduais e barrar o tráfego ilegal de cargas perigosas ou substâncias proibidas. 
            </p>

            <p>
               O melhor de tudo? Ao preencher a declaração, a sua encomenda ganha direito ao seguro postal obrigatório contra extravios, protegendo o seu patrimônio.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-amber-500 pl-4">
               Nota Fiscal vs. Declaração de Conteúdo: Prós e Contras
            </h2>

            <p>
               Aí é que está o segredo: estruturamos uma tabela comparativa direta e cirúrgica para que você tome a decisão certa sem qualquer risco de ter sua mercadoria retida pela Receita Federal na barreira fiscal de trânsito.
            </p>

            <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <table className="w-full min-w-[600px] text-sm text-left border-collapse bg-white dark:bg-slate-900">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Característica</th>
                    <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Nota Fiscal (NF-e)</th>
                    <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Declaração de Conteúdo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Finalidade Comercial</td>
                    <td className="px-6 py-4 text-xs text-emerald-600 font-semibold">Sim, obrigatória para comércio regular.</td>
                    <td className="px-6 py-4 text-xs text-red-600 font-semibold">Não, restrita a envios não comerciais ou informais.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Exigência de CNPJ</td>
                    <td className="px-6 py-4 text-xs text-emerald-600 font-semibold">Sim, exige empresa constituída (exceto produtor rural).</td>
                    <td className="px-6 py-4 text-xs text-slate-500">Não, qualquer pessoa física com CPF pode emitir.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Tributação (Impostos)</td>
                    <td className="px-6 py-4 text-xs text-slate-500">Gera incidência e apuração automática de impostos (ICMS/ISS).</td>
                    <td className="px-6 py-4 text-xs text-emerald-600 font-semibold">Isento, não gera cobrança de impostos diretos.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Limite de Envio</td>
                    <td className="px-6 py-4 text-xs text-slate-500">Ilimitado, de acordo com o estoque e faturamento fiscal.</td>
                    <td className="px-6 py-4 text-xs text-amber-600 font-semibold">Foco pessoal ou esporádico (fiscalização barra envios recorrentes).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-500"/> Cuidados Críticos ao Preencher o Formulário
            </h3>

            <p>
               Para que a sua mercadoria não fique presa ou seja recusada no balcão da agência, siga estas 3 regras simples:
            </p>

            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Descrição dos Bens:</strong> Evite de qualquer maneira palavras vagas como *"presente"*, *"ferramenta"* ou *"diversos"*. Prefira especificações claras, como *"Camisa Polo de Algodão"* ou *"Carregador USB Tipo C"*.</li>
                <li><strong>Valores Declarados:</strong> Declare valores próximos aos de mercado para o produto. Em caso de extravio ou sinistro durante o trajeto, a sua indenização será calculada estritamente sobre esse valor.</li>
                <li><strong>Fixação na Embalagem:</strong> A <GlossaryTerm slug="declaracao-de-conteudo-correios">declaração de conteúdo</GlossaryTerm> deve ser afixada na parte externa da caixa. A dica de ouro é dobrar o papel deixando apenas a parte escrita visível e colocá-lo dentro de uma bolsa plástica transparente auto-adesiva.</li>
            </ul>

            <SmartGlossaryLinker currentHref="/ferramentas/declaracao-conteudo" />
            <SmartCrossLinker currentHref="/ferramentas/declaracao-conteudo" category="destaques" />

             {/* SEÇÃO FAQ COM 7 DÚVIDAS REAIS (MANDATORY RULE 5) */}
             <div className="mt-16 not-prose">
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                     <HelpCircle className="text-amber-500" /> Perguntas Frequentes
                 </h2>
                 <div className="space-y-4">
                   {faqList.map((item, idx) => (
                       <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-1 open:ring-amber-100 dark:open:ring-amber-900/30 transition-all">
                           <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                               <div className="flex items-start gap-3">
                                   <span className="text-amber-500 font-bold text-xs mt-1">#</span>
                                   <span className="leading-snug text-slate-800 dark:text-slate-200">{item.q}</span>
                               </div>
                               <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                           </summary>
                           <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                               {item.a}
                           </p>
                        </details>
                    ))}
                 </div>
             </div>

         </div>
         
         {/* ANÚNCIO FINAL */}
         <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
             <LazyAdUnit slot="declaracao_bottom" format="horizontal" variant="software" />
         </div>

      </div>
    </article>
  );
}
