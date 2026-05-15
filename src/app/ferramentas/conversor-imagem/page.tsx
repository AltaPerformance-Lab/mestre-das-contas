import { Suspense } from "react";
import type { Metadata } from "next";
import ImageConverter from "@/components/tools/ImageConverter";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Image as ImageIcon, Zap, ShieldCheck, Download, 
  Layers, Lock, FileImage, Laptop, FileCode, Monitor,
  CheckCircle2, ArrowRight, HelpCircle
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

// --- 1. METADATA DINÂMICA (SEO DE CAUDA LONGA) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Conversor de Imagem Grátis 2026 (Sem Limites) | JPG, PNG e WebP";
  const description = "Converta imagens online em 2026 sem enviar arquivos para a nuvem. Transforme WEBP em PNG, JPG em WEBP, crie ícones (ICO) e mais. Rápido, privado e gratuito.";

  return {
    title,
    description,
    keywords: [
      "conversor de imagem", "webp para png", "jpg para png transparente", 
      "conversor imagem gratuito", "converter foto online", "transformar avif em jpg"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/conversor-imagem" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/ferramentas/conversor-imagem",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "website" },
    robots: { index: true, follow: true } };
}

export default async function ImageConverterPage() {

  const faqList = [
    { p: "Perco qualidade na conversão?", r: "Depende do formato. Converter PNG para JPG reduz o tamanho mas pode perder detalhes. Converter para PNG ou WebP geralmente mantém a qualidade visual intacta." },
    { p: "Posso converter várias fotos de uma vez?", r: "Sim! Nossa ferramenta suporta conversão em lote (Batch). Selecione ou arraste dezenas de arquivos e clique em 'Converter Todas'." },
    { p: "Meus arquivos são enviados para algum servidor?", r: "Não. Utilizamos tecnologia 'Client-Side'. A conversão acontece na memória do seu próprio navegador. Isso garante privacidade total para documentos e fotos pessoais." },
    { p: "Qual o melhor formato para sites?", r: "WebP ou AVIF. Eles oferecem a melhor compressão (tamanho pequeno) com alta qualidade, fazendo seu site carregar mais rápido no Google." }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Conversor de Imagem Universal",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": "Ferramenta client-side para conversão e compressão de múltiplos formatos de imagem (JPG, PNG, WEBP, AVIF, ICO)." },
      {
        "@type": "FAQPage",
        "mainEntity": faqList.map(item => ({
          "@type": "Question",
          "name": item.p,
          "acceptedAnswer": { "@type": "Answer", "text": item.r }
        }))
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER --- */}
      <div className="px-4 sm:px-6 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 max-w-7xl mx-auto w-full">
        <PageHeader 
          title="Conversor de Imagens Universal"
          description="A ferramenta definitiva. Converta AVIF, WebP, JPG, PNG e crie ícones (ICO) em segundos. Qualidade máxima, sem limites e com privacidade total."
          category="Ferramentas Úteis"
          icon={<ImageIcon size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="slate"
          badge="Suporte a AVIF"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Conversor" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="img_top" format="horizontal" variant="agency" />
        </div>

        {/* PRIVACIDADE E SEGURANÇA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Processamento 100% Local: Suas fotos nunca saem do seu dispositivo. Conversão instantânea e segura em 2026.</span>
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <PrivacyBadge />
           <Suspense fallback={
             <div className="h-96 w-full bg-slate-50 dark:bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700">
                <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="animate-bounce" size={32}/>
                    <span>Carregando Conversor...</span>
                </div>
             </div>
           }>
              <ImageConverter />
           </Suspense>
           
           <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
           </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="img_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO PROFUNDO --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-l-4 border-slate-900 dark:border-slate-100 pl-4">
                Finalmente: Converta sem enviar para a "Nuvem"
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
                Você já precisou converter uma foto de um documento pessoal e ficou com medo de fazer upload em sites desconhecidos? Você não está sozinho.
            </p>
            <p>
                A maioria dos conversores online funciona enviando sua foto para um servidor remoto. No Mestre das Contas, sua privacidade é nossa prioridade técnica.
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800/50 my-8 not-prose shadow-sm">
                <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-4 flex items-center gap-2">
                    <ShieldCheck size={24}/> A Diferença do Mestre das Contas
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-green-800 dark:text-green-200 font-medium">
                    <li className="flex gap-2"><CheckCircle2 className="text-green-600 dark:text-green-400"/> Zero Upload (Instantâneo)</li>
                    <li className="flex gap-2"><CheckCircle2 className="text-green-600 dark:text-green-400"/> Privacidade Absoluta</li>
                    <li className="flex gap-2"><CheckCircle2 className="text-green-600 dark:text-green-400"/> Sem limite de tamanho</li>
                    <li className="flex gap-2"><CheckCircle2 className="text-green-600 dark:text-green-400"/> Funciona Offline</li>
                </ul>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6">Qual formato de imagem escolher?</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose mb-10">
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2"><Zap size={18} className="text-blue-500"/> AVIF & WebP</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Os formatos modernos. O AVIF comprime até 50% mais que o JPG. Use para deixar seu site ultra-rápido.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2"><FileImage size={18} className="text-orange-500"/> JPG / JPEG</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">O padrão universal. Abre em qualquer lugar. Ideal para fotos de câmera e impressão.</p>
                </div>
            </div>

            <div className="mt-16 not-prose" id="faq">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <HelpCircle className="text-blue-600 dark:text-blue-400" /> Dúvidas Frequentes
                </h2>
                <div className="space-y-4">
                  {faqList.map((item, idx) => (
                      <details key={idx} className="group bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-800/70 transition-all">
                          <summary className="font-bold text-slate-800 dark:text-slate-200 list-none flex justify-between items-center text-base select-none">
                              <span>{item.p}</span>
                              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                          </summary>
                          <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4 text-sm">
                              {item.r}
                          </p>
                      </details>
                  ))}
                </div>
            </div>

            <SmartCrossLinker currentHref="/ferramentas/conversor-imagem" category="ferramentas" />
        </div>

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="img_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}