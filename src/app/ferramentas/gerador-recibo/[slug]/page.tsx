import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ReceiptGenerator from "@/components/tools/ReceiptGenerator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { 
  FileText, Zap, ShieldCheck, Printer, 
  PenTool, CheckCircle2, HelpCircle,
  QrCode, ArrowRight, LayoutTemplate
} from "lucide-react";
import { receiptCases } from "@/data/receipt-cases";

// --- GERAÇÃO ESTÁTICA ---
export async function generateStaticParams() {
  return receiptCases.map((item) => ({
    slug: item.slug }));
}

type Props = { params: Promise<{ slug: string }> };

// --- METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = receiptCases.find((d) => d.slug === slug);

  if (!data) return {};

  return {
    title: `${data.title} Online Grátis | Modelo para Imprimir (PDF)`,
    description: `Crie um ${data.title} profissional em segundos. Preenchimento automático, valor por extenso e opção de 2 vias. Grátis e sem cadastro.`,
    keywords: [data.title.toLowerCase(), "gerador de recibo", "modelo de recibo", "recibo pdf"],
    alternates: { canonical: `https://mestredascontas.com.br/ferramentas/gerador-recibo/${slug}` },
    openGraph: {
      title: `${data.title} - Gerador Online`,
      description: data.desc,
      url: `https://mestredascontas.com.br/ferramentas/gerador-recibo/${slug}`,
      siteName: "Mestre das Contas",
      type: "website" } };
}

export default async function ReceiptCasePage({ params }: Props) {
  const { slug } = await params;
  const data = receiptCases.find((d) => d.slug === slug);

  if (!data) return notFound();

  // JSON-LD Dinâmico (Dual: App + HowTo)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": data.title,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": data.desc },
      {
        "@type": "HowTo",
        "name": `Como preencher e imprimir ${data.title}`,
        "description": `Passo a passo simples para gerar seu ${data.title} em PDF pronto para assinatura.`,
        "totalTime": "PT0M45S",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Preencha o valor",
            "text": "Digite o valor numérico. O sistema preenche o valor por extenso automaticamente.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-recibo/${slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Informe os dados das partes",
            "text": "Preencha o nome de quem pagou (Cliente) e de quem recebeu (Emissor). Opcionalmente adicione CPF/CNPJ.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-recibo/${slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Imprima",
            "text": "Clique no botão 'Imprimir' para gerar o PDF ou enviar direto para a impressora. O modelo já sai duplicado (2 vias).",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-recibo/${slug}#ferramenta`
          }
        ]
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={data.title}
          description={data.desc}
          category="Modelos de Recibo"
          icon={<LayoutTemplate size={32} strokeWidth={2} />}
          variant="tools"
          categoryColor="slate"
          badge="Pronto 2026"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Gerador de Recibo", href: "/ferramentas/gerador-recibo" },
            { label: data.title }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="recibo_case_top" format="horizontal" variant="agency" />
        </div>

        {/* REVISÃO PROFISSIONAL (E-E-A-T) */}
        <div className="bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Modelo de documento revisado conforme as normas vigentes de comprovantes de pagamento e quitação.</span>
        </div>

        {/* FERRAMENTA JÁ PREENCHIDA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <PrivacyBadge />
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <ReceiptGenerator initialValues={data.prefill} />
           </Suspense>
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="recibo_case_mid" format="auto" />
        </div>

        {/* --- ARTIGO --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Guia Completo: {data.title}
            </h2>
            <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
                Emitir um <strong>{data.title}</strong> corretamente é a melhor forma de proteger seu negócio e garantir a confiança do seu cliente.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
                Seja você um autônomo, empresa ou pessoa física, o recibo é o documento que comprova legalmente que um pagamento foi realizado. Sem ele, você pode ser cobrado duas vezes pela mesma dívida.
            </p>

            <div className="my-8 grid gap-6 md:grid-cols-3 not-prose">
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">01</span>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Preencha</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Informe o valor e os dados das partes.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">02</span>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Imprima</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Gere o PDF com 2 vias automáticas.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">03</span>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Assine</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Assine a via do cliente e arquive a sua.</p>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">O que não pode faltar?</h3>
            <p className="text-slate-600 dark:text-slate-400">
                Para que seu <strong>{data.title}</strong> tenha validade jurídica, verifique se estes 5 itens estão presentes (nosso gerador cuida disso para você):
            </p>
            <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                <li><strong className="text-slate-800 dark:text-slate-200">1. Valor Numérico e Extenso:</strong> Evita adulterações no valor (ex: adicionar um zero a mais).</li>
                <li><strong className="text-slate-800 dark:text-slate-200">2. Identificação das Partes:</strong> Nome completo ou Razão Social de quem paga e de quem recebe.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">3. CPF ou CNPJ:</strong> Essencial para declaração de Imposto de Renda.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">4. Referência:</strong> "Referente a..." (ex: Serviço de Pintura, Aluguel de Março).</li>
                <li><strong className="text-slate-800 dark:text-slate-200">5. Data e Local:</strong> Define quando e onde o pagamento ocorreu.</li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 my-8 not-prose shadow-sm">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
                    <PenTool size={22} className="text-blue-600 dark:text-blue-400"/> Dica de Ouro: Assinatura
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300/80 leading-relaxed">
                    O recibo só tem validade se estiver <strong>assinado por quem recebeu o dinheiro</strong> (o emissor). A assinatura de quem pagou é opcional e serve apenas para confirmar que ele aceitou o recibo.
                </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-6 flex items-center gap-2">
                <HelpCircle className="text-slate-500 dark:text-slate-400"/> Dúvidas Frequentes
            </h3>
            
            <div className="space-y-4">
                <details className="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer transition-all hover:border-blue-200 dark:hover:border-blue-800">
                    <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none">
                        Preciso reconhecer firma no cartório?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Geralmente, não. Para a maioria das transações comerciais e de serviços, a assinatura simples basta. O reconhecimento de firma só é exigido em contratos de alto valor ou quando a lei especifica.
                    </p>
                </details>

                <details className="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer transition-all hover:border-blue-200 dark:hover:border-blue-800">
                    <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none">
                        Este recibo serve para Imposto de Renda?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Sim! Desde que contenha o CPF/CNPJ de quem prestou o serviço (emissor) e de quem pagou (pagador), ele serve como comprovante de despesa dedutível (como médicos, aluguéis, etc).
                    </p>
                </details>

                <details className="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer transition-all hover:border-blue-200 dark:hover:border-blue-800">
                    <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none">
                        Posso usar o recibo digitalmente?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Pode enviar o PDF por WhatsApp ou E-mail. Porém, para ter validade jurídica 100% digital, o ideal é usar uma Assinatura Digital (ICP-Brasil ou Gov.br). Se for apenas para controle simples, o PDF resolve.
                    </p>
                </details>
            </div>

        </div>

        <SmartCrossLinker currentHref={`/ferramentas/gerador-recibo/${slug}`} category="ferramentas" />

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px] print:hidden">
            <LazyAdUnit slot="recibo_case_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}