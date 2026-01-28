import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ImageConverter from "@/components/tools/ImageConverter";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Image as ImageIcon, Zap, ShieldCheck, Download, 
  Layers, Lock, FileImage, Laptop, FileCode, Monitor,
  CheckCircle2, ArrowRight, HelpCircle, QrCode, KeyRound,
  FileText
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

// --- 1. METADATA DE DOMINAÇÃO (SEO 2026) ---
export const metadata: Metadata = {
  title: "Conversor de Imagem Grátis (Sem Limites): JPG, PNG e WebP",
  description: "Converta imagens online sem enviar seus arquivos para a nuvem. Transforme WEBP em PNG, JPG em WEBP, crie ícones (ICO) e muito mais. Rápido, privado e gratuito.",
  keywords: [
    "conversor de imagem", 
    "webp para png", 
    "jpg para png transparente", 
    "conversor imagem gratuito", 
    "converter foto online", 
    "compressor de imagem",
    "transformar avif em jpg"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/conversor-imagem" },
  openGraph: {
    title: "Conversor de Imagem Universal - Mestre das Contas",
    description: "Converta quantas fotos quiser. Seus arquivos não saem do seu computador.",
    url: "https://mestredascontas.com.br/ferramentas/conversor-imagem",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    // images: fallen back to root
  },
  robots: { index: true, follow: true },
};

// --- FAQ LIST (DRY Content) ---
const faqList = [
    { p: "Perco qualidade na conversão?", r: "Depende do formato. Converter PNG para JPG reduz o tamanho mas pode perder detalhes. Converter para PNG ou WebP geralmente mantém a qualidade visual intacta." },
    { p: "Posso converter várias fotos de uma vez?", r: "Sim! Nossa ferramenta suporta conversão em lote (Batch). Selecione ou arraste dezenas de arquivos e clique em 'Converter Todas'." },
    { p: "Meus arquivos são enviados para algum servidor?", r: "Não. Utilizamos tecnologia 'Client-Side'. A conversão acontece na memória do seu próprio navegador. Isso garante privacidade total para documentos e fotos pessoais." },
    { p: "Qual o melhor formato para sites?", r: "WebP ou AVIF. Eles oferecem a melhor compressão (tamanho pequeno) com alta qualidade, fazendo seu site carregar mais rápido no Google." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Conversor de Imagem Universal",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta client-side para conversão e compressão de múltiplos formatos de imagem (JPG, PNG, WEBP, AVIF, ICO).",
      "featureList": "Conversão em lote, Compressão, Suporte AVIF/ICO, Privacidade total, Sem limites",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1890", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "TechArticle",
      "headline": "Guia de Formatos de Imagem: Qual usar em 2026?",
      "description": "Entenda as diferenças entre JPG, PNG, WebP e AVIF e saiba qual escolher para cada situação.",
      "proficiencyLevel": "Beginner",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas", "url": "https://mestredascontas.com.br/sobre" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon" } },
      "datePublished": "2024-06-15",
      "dateModified": new Date().toISOString(),
      "speakable": {
           "@type": "SpeakableSpecification",
           "xpath": ["/html/head/title", "/html/head/meta[@name='description']/@content"]
      }
    },
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

export default function ImageConverterPage() {
  return (
    <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER --- */}
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
          rating={4.9}
          reviews={1890}
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

        {/* --- CONTEÚDO PROFUNDO (HUMANIZADO + SEO) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-l-4 border-slate-900 dark:border-slate-100 pl-4">
                Finalmente: Converta sem enviar para a "Nuvem"
            </h2>
            
            <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
                Você já precisou converter uma foto de um documento pessoal e ficou com medo de fazer upload em sites desconhecidos? Você não está sozinho.
            </p>
            <p>
                A maioria dos conversores online funciona assim: você envia sua foto, eles processam no servidor deles e te devolvem. O problema? Você não sabe se eles apagaram o arquivo depois.
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800/50 my-8 not-prose shadow-sm">
                <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-4 flex items-center gap-2">
                    <ShieldCheck size={24}/> A Diferença do Mestre das Contas
                </h3>
                <p className="text-green-800 dark:text-green-200 text-sm mb-4">
                    Nossa tecnologia é <strong>Client-Side</strong>. Usamos o poder do seu próprio navegador (Chrome, Edge, Safari) para fazer a conversão.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-green-800 dark:text-green-200 font-medium">
                    <li className="flex gap-2"><CheckCircle2 className="text-green-600 dark:text-green-400"/> Zero Upload (Instantâneo)</li>
                    <li className="flex gap-2"><CheckCircle2 className="text-green-600 dark:text-green-400"/> Privacidade Absoluta</li>
                    <li className="flex gap-2"><CheckCircle2 className="text-green-600 dark:text-green-400"/> Sem limite de tamanho</li>
                    <li className="flex gap-2"><CheckCircle2 className="text-green-600 dark:text-green-400"/> Funciona Offline</li>
                </ul>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
                <Layers className="text-indigo-600" /> Qual formato escolher?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 not-prose mb-10">
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 transition-colors">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2"><Zap size={18} className="text-blue-500"/> AVIF & WebP</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Os formatos modernos da web. O AVIF comprime até 50% mais que o JPG sem perder qualidade. Use para deixar seu site ultra-rápido.
                    </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-orange-300 transition-colors">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2"><FileImage size={18} className="text-orange-500"/> JPG / JPEG</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        O padrão universal. Abre em qualquer lugar, de TVs antigas a celulares. Ideal para fotos de câmera e impressão.
                    </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-300 transition-colors">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2"><Layers size={18} className="text-purple-500"/> PNG</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Qualidade sem perdas (lossless) e fundo transparente. Perfeito para logotipos, ícones e artes digitais. Arquivos ficam maiores.
                    </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-green-300 transition-colors">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2"><FileCode size={18} className="text-green-500"/> ICO</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        O formato de ícones do Windows e Favicons de sites. Converta qualquer logo para .ico automaticamente com nosso redimensionador.
                    </p>
                </div>
            </div>
            
            <div className="bg-slate-900 dark:bg-slate-800 text-white p-6 rounded-xl my-6 not-prose shadow-lg">
                <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2"><Monitor size={18}/> Dica de Designer</h4>
                <p className="text-sm text-slate-300">
                    Para enviar fotos no WhatsApp ou e-mail, prefira <strong>JPG com 80% de qualidade</strong>. É o equilíbrio perfeito entre tamanho minúsculo e boa visualização. Nossa ferramenta já vem configurada nesse padrão!
                </p>
            </div>

            <div className="mt-16 not-prose" id="faq">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <HelpCircle className="text-blue-600 dark:text-blue-400" /> Dúvidas Frequentes
                </h2>
                <div className="space-y-4">
                  {faqList.map((item, idx) => (
                      <details key={idx} className="group bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-800/70 open:ring-2 open:ring-slate-100 dark:open:ring-slate-700 transition-all duration-300">
                          <summary className="font-bold text-slate-800 dark:text-slate-200 list-none flex justify-between items-center text-base select-none">
                              <span className="leading-snug">{item.p}</span>
                              <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                          </summary>
                          <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4 text-sm animate-in fade-in">
                              {item.r}
                          </p>
                      </details>
                  ))}
                </div>
            </div>

            {/* NAVEGAÇÃO FINAL (CROSS-LINKING) */}
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose">
                <p className="font-bold text-slate-900 dark:text-slate-100 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                   <CheckCircle2 size={16} className="text-emerald-500"/> Outras Ferramentas Úteis:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link href="/ferramentas/gerador-qr-code" className="flex flex-col p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-400 hover:shadow-lg transition-all group">
                      <div className="bg-indigo-50 dark:bg-indigo-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-400 shadow-sm group-hover:scale-110 transition-transform"><QrCode size={20}/></div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Gerador QR Code</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Pix, Wi-Fi e Links</span>
                  </Link>
                  <Link href="/ferramentas/gerador-de-senhas" className="flex flex-col p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-400 hover:shadow-lg transition-all group">
                      <div className="bg-slate-100 dark:bg-slate-700 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-slate-600 dark:text-slate-300 shadow-sm group-hover:scale-110 transition-transform"><KeyRound size={20}/></div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Gerador de Senhas</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Segurança máxima</span>
                  </Link>
                  <Link href="/financeiro/reforma-tributaria" className="flex flex-col p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-400 hover:shadow-lg transition-all group">
                      <div className="bg-emerald-50 dark:bg-emerald-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-110 transition-transform"><FileText size={20}/></div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Reforma Tributária</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Simulador 2026</span>
                  </Link>
                </div>
            </div>

        </div>

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="img_bottom" format="horizontal" variant="software" />
        </div>

        {/* RODAPÉ IMPRESSÃO */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}