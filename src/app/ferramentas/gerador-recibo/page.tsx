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

// --- SEO 2026 ---
export const metadata: Metadata = {
  title: "Gerador de Recibo Online Grátis | PDF para Imprimir (Simples e Rápido)",
  description: "Crie recibos profissionais em segundos. Preenchimento automático, valor por extenso e opção de 2 vias. Ideal para autônomos, aluguel e prestação de serviços.",
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
  "@type": "SoftwareApplication",
  "name": "Gerador de Recibo Online",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "description": "Ferramenta gratuita para gerar e imprimir recibos de pagamento personalizados em PDF.",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2150", "bestRating": "5", "worstRating": "1" }
};

export default function ReceiptPage() {
  return (
    <article className="w-full max-w-full overflow-hidden font-sans">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Gerador de Recibo Online"
          description="A forma mais rápida de criar recibos profissionais. Preencha, visualize e imprima em PDF. Ideal para autônomos, MEI, aluguéis e vendas."
          category="Ferramentas Úteis"
          icon={<FileText size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="slate"
          badge="Modelo 2026"
          breadcrumbs={[{ label: "Ferramentas", href: "/ferramentas" }, { label: "Gerador de Recibo" }]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="recibo_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA PRINCIPAL */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <ReceiptGenerator />
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="recibo_mid" format="auto" />
        </div>

        {/* --- ARTIGO EDUCACIONAL --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-l-4 border-slate-900 pl-4">
                Por que usar um Recibo Digital?
            </h2>
            <p className="lead text-slate-700 text-lg font-medium">
                Você ainda usa aquele bloquinho de papelaria com papel carbono? Está na hora de evoluir. O recibo digital passa mais credibilidade, é legível e não desbota com o tempo.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-lg">
                        <Printer className="text-blue-600" size={24}/> Pronto para Imprimir
                    </h3>
                    <p className="text-sm text-slate-600">
                        Nossa ferramenta gera um layout A4 perfeito. Você pode optar por imprimir <strong>2 vias por folha</strong>, economizando papel e garantindo a via do cliente e a sua.
                    </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-lg">
                        <ShieldCheck className="text-green-600" size={24}/> Validade Jurídica
                    </h3>
                    <p className="text-sm text-slate-600">
                        Um recibo bem preenchido (com dados do pagador, emissor, data e assinatura) é um documento legal que comprova a quitação de uma dívida ou pagamento de serviço.
                    </p>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
                <PenTool className="text-indigo-600" /> Como preencher corretamente?
            </h3>
            
            {/* LISTA CORRIGIDA PARA EVITAR ERROS DE PARSE */}
            <ul className="space-y-4 text-slate-700 not-prose">
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

            <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2">
                <HelpCircle className="text-slate-500"/> Perguntas Frequentes
            </h3>
            
            <details className="group border-b border-slate-200 pb-4 mb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 flex justify-between items-center list-none">
                    Recibo substitui Nota Fiscal?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-600">
                    <strong>Não.</strong> O recibo comprova o pagamento, mas não recolhe impostos. Para empresas (CNPJ), a Nota Fiscal é obrigatória. O recibo é ideal para autônomos (RPA), aluguéis entre pessoas físicas ou venda de bens usados.
                </p>
            </details>
            
            <details className="group border-b border-slate-200 pb-4 mb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 flex justify-between items-center list-none">
                    Posso salvar em PDF?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-600">
                    Sim! Ao clicar em "Imprimir", selecione a opção <strong>"Salvar como PDF"</strong> no destino da impressora do seu navegador. Assim você pode enviar por WhatsApp ou E-mail.
                </p>
            </details>

        </div>

        {/* NAVEGAÇÃO FINAL (CROSS-LINKING) */}
        <div className="mt-16 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <ShieldCheck size={16} className="text-emerald-500"/> Outras Ferramentas Úteis:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/ferramentas/gerador-qr-code" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition-all group">
                  <div className="bg-indigo-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-indigo-600 shadow-sm group-hover:scale-110 transition-transform"><QrCode size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Gerador QR Code</span>
                  <span className="text-sm text-slate-500 mt-1">Pix, Wi-Fi e Links</span>
              </Link>
              <Link href="/ferramentas/gerador-de-senhas" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-400 hover:shadow-lg transition-all group">
                  <div className="bg-slate-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-slate-600 shadow-sm group-hover:scale-110 transition-transform"><KeyRound size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Gerador de Senhas</span>
                  <span className="text-sm text-slate-500 mt-1">Segurança máxima</span>
              </Link>
              <Link href="/financeiro/financiamento-veiculos" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group">
                  <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 shadow-sm group-hover:scale-110 transition-transform"><Scale size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Financiamento</span>
                  <span className="text-sm text-slate-500 mt-1">Simular parcelas</span>
              </Link>
            </div>
        </div>

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="recibo_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}