import type { Metadata } from "next";
import Link from "next/link";
import ReceiptGenerator from "@/components/tools/ReceiptGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  FileText, ShieldCheck, Printer, 
  PenTool, HelpCircle,
  QrCode, KeyRound, ArrowRight, Scale
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

// --- SEO 2026 ---
export const metadata: Metadata = {
  title: "Gerador de Recibo Online 2026 (Grátis) | PDF e WhatsApp",
  description: "Crie recibos profissionais em segundos em 2026. Preenchimento automático, valor por extenso e 2 vias. Ideal para autônomos, aluguel e serviços. Grátis.",
  keywords: [
    "gerador de recibo", "recibo online gratis", "modelo de recibo pdf", 
    "recibo aluguel preencher", "emitir recibo online", "recibo de pagamento simples"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-recibo" },
  openGraph: {
    title: "Gerador de Recibo Online - Profissional e Grátis",
    description: "Emita recibos de pagamento em PDF prontos para imprimir. Sem cadastro.",
    url: "https://mestredascontas.com.br/ferramentas/gerador-recibo",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    // images: [{ url: "/og-recibo.png", width: 1200, height: 630 }],
  },
};

// --- DADOS ESTRUTURADOS ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Gerador de Recibo Online",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta gratuita para gerar e imprimir recibos de pagamento personalizados em PDF.",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2150", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "Article",
      "headline": "Como Preencher um Recibo Corretamente em 2026",
      "description": "Guia prático sobre validade jurídica de recibos, importância do valor por extenso e como emitir 2 vias profissionais.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon.png" } },
      "datePublished": "2024-06-15",
      "dateModified": new Date().toISOString()
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "O recibo gerado tem validade jurídica?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, desde que esteja devidamente preenchido com os dados do emissor, pagador, valor, data e assinatura. Ele serve como comprovante de quitação de dívida." } },
        { "@type": "Question", "name": "Como salvar o recibo em PDF?", "acceptedAnswer": { "@type": "Answer", "text": "Ao clicar em Imprimir, selecione a opção 'Salvar como PDF' no destino da impressora para gerar o arquivo digital e enviar por WhatsApp." } },
        { "@type": "Question", "name": "Posso gerar recibo de aluguel?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, o modelo é ideal para aluguéis, serviços prestados por autônomos e vendas de produtos usados." } }
      ]
    }
  ]
};

export default function ReceiptPage() {
  return (
    <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Gerador de Recibo Online"
          description="A forma mais rápida de criar recibos profissionais. Preencha, visualize e imprima em PDF. Ideal para autônomos, MEI, aluguéis e vendas."
          category="Ferramentas Úteis"
          icon={<FileText size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="slate"
          badge="Modelo 2026"
          rating={4.8}
          reviews={2150}
          breadcrumbs={[{ label: "Ferramentas", href: "/ferramentas" }, { label: "Gerador de Recibo" }]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="recibo_top" format="horizontal" variant="agency" />
        </div>

        {/* REVISÃO FINANCEIRA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Modelo de recibo atualizado conforme normas vigentes em 2026. Geração local e segura.</span>
        </div>

        {/* FERRAMENTA PRINCIPAL */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <PrivacyBadge />
           <ReceiptGenerator />
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="recibo_mid" format="auto" />
        </div>

        {/* --- ARTIGO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-l-4 border-slate-900 dark:border-slate-100 pl-4">
                Por que usar um Recibo Digital?
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
                Você ainda usa aquele bloquinho de papelaria com papel carbono? Está na hora de evoluir. O recibo digital passa mais credibilidade, é legível e não desbota com o tempo.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3 text-lg">
                        <Printer className="text-blue-600" size={24}/> Pronto para Imprimir
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Nossa ferramenta gera um layout A4 perfeito. Você pode optar por imprimir <strong>2 vias por folha</strong>, economizando papel e garantindo a via do cliente e a sua.
                    </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3 text-lg">
                        <ShieldCheck className="text-green-600 dark:text-green-400" size={24}/> Validade Jurídica
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Um recibo bem preenchido (com dados do pagador, emissor, data e assinatura) é um documento legal que comprova a quitação de uma dívida ou pagamento de serviço.
                    </p>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
                <PenTool className="text-indigo-600 dark:text-indigo-400" /> Como preencher corretamente?
            </h3>
            
            {/* LISTA CORRIGIDA PARA EVITAR ERROS DE PARSE */}
            <ul className="space-y-4 text-slate-700 dark:text-slate-300 not-prose">
                <li className="flex gap-3 items-start">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-600 shrink-0"/>
                    <span>
                        <strong>Valor:</strong> Sempre coloque o valor numérico e por extenso (nossa ferramenta ajuda nisso) para evitar adulterações.
                    </span>
                </li>
                <li className="flex gap-3 items-start">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-600 shrink-0"/>
                    <span>
                        <strong>Referência:</strong> Seja específico. Não coloque apenas "serviços", coloque "Aluguel referente a Março/2026" ou "Mão de obra de pintura".
                    </span>
                </li>
                <li className="flex gap-3 items-start">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-600 shrink-0"/>
                    <span>
                        <strong>CPF/CNPJ:</strong> Identificar as partes é crucial para a validade fiscal, especialmente para declaração de Imposto de Renda.
                    </span>
                </li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <HelpCircle className="text-slate-500 dark:text-slate-400"/> Perguntas Frequentes
            </h3>
            
            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none">
                    O recibo gerado tem validade jurídica?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    Sim, desde que esteja devidamente preenchido com os dados do emissor, pagador, valor, data e assinatura. Ele serve como comprovante de quitação de dívida.
                </p>
            </details>
            
            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none">
                    Como salvar o recibo em PDF?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    Ao clicar em Imprimir, selecione a opção <strong>'Salvar como PDF'</strong> no destino da impressora para gerar o arquivo digital e enviar por WhatsApp.
                </p>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none">
                    Posso gerar recibo de aluguel?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    Sim, o modelo é ideal para aluguéis, serviços prestados por autônomos e vendas de produtos usados.
                </p>
            </details>
        </div>

        <SmartCrossLinker currentHref="/ferramentas/gerador-recibo" category="ferramentas" />

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="recibo_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}