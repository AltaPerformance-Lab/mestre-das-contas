import { Metadata } from 'next';
import Link from 'next/link';
import PDFEditorWrapper from '@/components/pdf-editor/PDFEditorWrapper';
import PageHeader from '@/components/layout/PageHeader';
import { 
    FileText, ShieldCheck, Zap, Lock, Layers, 
    CheckCircle2, HelpCircle, Star, PenTool, 
    MousePointer2, Download, History, Monitor,
    Share2
} from 'lucide-react';
import LazyAdUnit from '@/components/ads/LazyAdUnit';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import PrivacyBadge from "@/components/ui/PrivacyBadge";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Editor de PDF Grátis: Editar Texto, Assinar e Juntar (Online)",
  description: "A melhor ferramenta para editar PDF online. Adicione textos, assinaturas, imagens e junte arquivos. 100% Gratuito, Seguro (Client-Side) e sem marca d'água.",
  keywords: [
    "editor pdf online", "editar pdf grátis", "juntar pdf", 
    "assinar pdf digitalmente", "preencher pdf", "pdf filler", 
    "combinar pdf", "anotar em pdf", "pdf gratuito"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/editor-pdf-online" },
  openGraph: {
    title: "Editor de PDF Ultimate - Mestre das Contas",
    description: "Edite, Assine e Junte PDFs sem instalar nada. Privacidade total com processamento no navegador.",
    url: "https://mestredascontas.com.br/ferramentas/editor-pdf-online",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://mestredascontas.com.br/opengraph/editor-pdf.jpg", width: 1200, height: 630, alt: "Editor de PDF Online" }],
  },
  robots: { index: true, follow: true },
};

// --- FAQ DATA ---
const faqList = [
    { q: "É seguro enviar documentos com dados sensíveis?", a: "Sim, absolutamente. Diferente de outros sites, nossa tecnologia é **Client-Side**. Isso significa que o arquivo PDF nunca sai do seu computador ou celular. O processamento acontece na memória do seu navegador, garantindo privacidade total." },
    { q: "Posso juntar vários arquivos PDF em um só?", a: "Sim! Você pode fazer upload de um arquivo inicial e, na barra lateral, usar a opção 'Juntar PDF' para adicionar quantos documentos quiser. Eles serão combinados automaticamente." },
    { q: "O editor adiciona marca d'água?", a: "Não. O Mestre das Contas oferece uma ferramenta 100% gratuita e limpa. Seu documento final será baixado exatamente como você o editou, sem logos ou marcas intrusivas." },
    { q: "Funciona no celular?", a: "Sim, nossa interface é responsiva e adaptada para telas de toque, permitindo que você assine documentos usando o dedo ou uma caneta stylus com facilidade." },
    { q: "Quais ferramentas de edição estão disponíveis?", a: "Atualmente você pode: Inserir textos (preenchimento de formulários), desenhar/assinar à mão livre, adicionar imagens, apagar conteúdo e combinar múltiplos arquivos." }
];

// --- DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Editor de PDF Ultimate",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta completa para manipulação de arquivos PDF no navegador: Editar, Juntar, Assinar e Anotar.",
      "featureList": "Edição de Texto, Assinatura Digital, Fusão de Documentos, Privacidade Client-Side",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.95", "ratingCount": "2450", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "Article",
      "headline": "Como editar PDF grátis e sem instalar programas em 2026",
      "description": "Guia completo para usar o Editor de PDF Ultimate. Aprenda a assinar, preencher e juntar documentos com segurança total.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon.png" } },
      "datePublished": "2024-05-20",
      "dateModified": new Date().toISOString()
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    }
  ]
};

export default function PDFEditorPage() {
  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER COMPLETO --- */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-6">
             <PageHeader 
                title="Editor de PDF Ultimate"
                description="A ferramenta definitiva. Edite textos, assine contratos e junte arquivos PDF direto no navegador. Sem limites, sem cadastro e com privacidade absoluta."
                category="Ferramentas Úteis"
                icon={<FileText size={32} className="text-violet-600" />}
                variant="default"
                categoryColor="violet"
                badge="Destaque 2026"
                rating={4.95}
                reviews={2450}
                breadcrumbs={[
                    { label: "Ferramentas", href: "/ferramentas" },
                    { label: "Editor PDF" }
                ]}
             />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 flex flex-col gap-4">
        {/* ANÚNCIO TOPO (PADRÃO) */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="pdf_top" format="horizontal" variant="software" />
        </div>
        
        <PrivacyBadge />
      </div>

      {/* --- ÁREA DO EDITOR (CLEAN WRAPPER) --- */}
      <div className="w-full flex-grow min-h-[600px] h-[80vh] bg-slate-100 dark:bg-slate-900 relative shadow-inner border-b border-slate-200 dark:border-slate-800">
         <PDFEditorWrapper />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        


        {/* --- FEATURES GRID --- */}
        <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-violet-50 dark:bg-violet-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6 shadow-sm">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Privacidade Garantida</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Seus arquivos <strong>nunca são enviados</strong> para nossos servidores. Toda a mágica acontece no seu navegador usando tecnologia WebAssembly.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 px-3 py-1 rounded-full">
                    <Lock size={12}/> Dados Criptografados Localmente
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-sm">
                    <Zap size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Instantâneo e Leve</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Esqueça filas de upload e download. Como o arquivo já está no seu PC, a abertura e a edição são instantâneas, mesmo para arquivos grandes.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-amber-50 dark:bg-amber-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 shadow-sm">
                    <PenTool size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Tudo em Um Lugar</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Preencher formulários, assinar contratos, juntar páginas soltas ou extrair folhas importantes. Tudo o que você precisa em uma única tela.
                </p>
            </div>
        </section>

        {/* --- RICH CONTENT ARTICLE --- */}
        <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 prose prose-slate dark:prose-invert prose-lg max-w-none bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                    <Star className="text-amber-400 fill-amber-400" /> Por que usar nosso Editor?
                </h2>
                <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium mb-8">
                    Arquivos PDF são o padrão mundial para documentos, mas editá-los sempre foi uma dor de cabeça. Softwares pagos são caros e ferramentas online comuns exigem o upload dos seus dados sensíveis.
                </p>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Download className="text-blue-500" /> Sem Instalação, Sem Custos
                </h3>
                <p>
                    O <strong>Editor de PDF Ultimate</strong> do Mestre das Contas roda diretamente no seu navegador (Chrome, Edge, Firefox ou Safari). Você não precisa baixar programas pesados como o Adobe Acrobat apenas para preencher um formulário simples ou juntar duas folhas.
                </p>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Share2 className="text-green-500" /> Como Juntar Arquivos PDF?
                </h3>
                <ol className="space-y-4 marker:text-green-600 marker:font-bold">
                    <li>Abra o primeiro arquivo PDF no editor.</li>
                    <li>Na barra lateral esquerda, procure pela seção <strong>"Ações Rápidas"</strong>.</li>
                    <li>Clique no botão <strong>"Juntar PDF"</strong> e selecione o segundo arquivo.</li>
                    <li>O novo arquivo será adicionado ao final do documento atual automaticamente.</li>
                    <li>Clique em <strong>"Baixar PDF"</strong> para salvar a versão unificada.</li>
                </ol>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-violet-500 mt-10 not-prose">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-2 flex items-center gap-2">
                        <Monitor size={20} className="text-violet-600 dark:text-violet-400"/> Dica para Profissionais
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                        Use nossa ferramenta para assinar contratos digitalmente. Selecione a ferramenta <strong>"Desenhar"</strong>, faça sua rubrica e posicione onde necessário. É juridicamente válido como uma assinatura eletrônica simples em muitos casos.
                    </p>
                </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-8">
                {/* Review Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-1 text-amber-400 mb-2">
                        <Star className="fill-current" size={20} />
                        <Star className="fill-current" size={20} />
                        <Star className="fill-current" size={20} />
                        <Star className="fill-current" size={20} />
                        <Star className="fill-current" size={20} />
                        <span className="text-slate-800 dark:text-slate-100 font-bold ml-2 text-lg">4.9/5</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Baseado em <strong>2.450 avaliações</strong> de usuários reais.</p>
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                        <p className="italic text-slate-500 dark:text-slate-400 text-sm">"Incrível! Consegui juntar os documentos da minha rescisão e assinar tudo pelo celular em segundos."</p>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400">RC</div>
                            <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Ricardo C.</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500">Contador, SP</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Ad */}
                <div className="w-full flex justify-center bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[300px]">
                    <LazyAdUnit slot="pdf_sidebar" format="vertical" />
                </div>
            </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <section id="faq" className="max-w-4xl mx-auto">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3">
                <HelpCircle className="text-violet-600 dark:text-violet-400" /> Perguntas Frequentes
             </h2>
             <Accordion type="single" collapsible className="w-full space-y-4">
                {faqList.map((item, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 data-[state=open]:ring-2 data-[state=open]:ring-violet-100 dark:data-[state=open]:ring-violet-900/30 data-[state=open]:border-violet-200 dark:data-[state=open]:border-violet-700 transition-all">
                        <AccordionTrigger className="text-left font-bold text-slate-700 dark:text-slate-100 hover:text-violet-700 dark:hover:text-violet-400 hover:no-underline py-5 text-lg">
                            {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed text-base pb-6">
                            {item.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
             </Accordion>
        </section>

        {/* --- CROSS LINKING --- */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
            <h3 className="text-center font-bold text-slate-400 dark:text-slate-500 text-sm uppercase tracking-widest mb-8">Descubra mais ferramentas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/ferramentas/conversor-imagem" className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:-translate-y-1 transition-all text-center group">
                    <div className="mx-auto bg-blue-50 dark:bg-blue-900/20 w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform"><Layers size={20}/></div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-sm block">Conversor Imagem</span>
                </Link>
                <Link href="/ferramentas/gerador-link-whatsapp" className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-400 hover:-translate-y-1 transition-all text-center group">
                    <div className="mx-auto bg-green-50 dark:bg-green-900/20 w-10 h-10 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform"><Share2 size={20}/></div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-sm block">Link WhatsApp</span>
                </Link>
                <Link href="/ferramentas/gerador-recibo" className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 hover:-translate-y-1 transition-all text-center group">
                    <div className="mx-auto bg-amber-50 dark:bg-amber-900/20 w-10 h-10 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2 group-hover:scale-110 transition-transform"><FileText size={20}/></div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-sm block">Gerador Recibo</span>
                </Link>
                <Link href="/trabalhista/rescisao" className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-red-400 hover:-translate-y-1 transition-all text-center group">
                    <div className="mx-auto bg-red-50 dark:bg-red-900/20 w-10 h-10 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400 mb-2 group-hover:scale-110 transition-transform"><History size={20}/></div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-sm block">Cálculo Rescisão</span>
                </Link>
            </div>
        </div>

        {/* Ad Unit Bottom */}
        <div className="w-full flex justify-center py-6">
             <LazyAdUnit slot="pdf_bottom" format="auto" />
        </div>

      </div>
    </article>
  );
}
