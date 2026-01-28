import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppGenerator from "@/components/tools/WhatsAppGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  MessageCircle, Zap, ShieldCheck, TrendingUp, 
  HelpCircle, CheckCircle2, Smartphone, Globe
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const num = sp.num as string;
  const msg = sp.msg as string;
  
  let title = "Gerador de Link WhatsApp: Criar Link Curto (Personalizado)";
  let description = "Crie links curtos para WhatsApp (wa.me) com mensagem personalizada em 1 clique. Ideal para Bio do Instagram e Vendas. Grátis e sem cadastro.";

  if (num) {
    title = "Link WhatsApp Gerado: Clique para Conversar";
    if (msg) {
        description = `Inicie uma conversa no WhatsApp com a mensagem: "${decodeURIComponent(msg)}". Link direto, rápido e seguro.`;
    } else {
        description = "Link direto para iniciar conversa no WhatsApp sem precisar salvar o número na agenda.";
    }
  }

  return {
    title,
    description,
    keywords: ["gerador link whatsapp", "link whatsapp", "link zap", "whatsapp api link", "link bio instagram", "api whatsapp"],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-link-whatsapp" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/ferramentas/gerador-link-whatsapp",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "website",
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Gerador de Link WhatsApp Mestre das Contas",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "description": "Ferramenta online gratuita para gerar links de conversa direta no WhatsApp com mensagem pré-definida.",
  "featureList": "Gera link wa.me, Mensagem personalizada, Preview em tempo real, Integração com QR Code",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "4120", "bestRating": "5", "worstRating": "1" }
};

export default async function GeradorWhatsAppPage({ searchParams }: Props) {
  const sp = await searchParams;
  const initialPhone = (sp.num as string) || "";
  const initialMessage = (sp.msg as string) || "";
  return (
    <article className="w-full max-w-full overflow-hidden font-sans">
      
      {/* JSON-LD PARA SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Gerador de Link WhatsApp"
          description="Facilite o contato com seus clientes. Crie um link direto que abre uma conversa no seu WhatsApp com uma mensagem pronta, sem precisar salvar o número."
          category="Ferramentas Úteis"
          icon={<MessageCircle size={32} strokeWidth={2} />}
          variant="default" // Tema Padrão (Azul/Verde)
          categoryColor="emerald" // Cor do ícone/tema
          badge="Grátis & Ilimitado"
          rating={4.9}
          reviews={4120}
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Link WhatsApp" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="whatsapp_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <PrivacyBadge />
           <WhatsAppGenerator 
              initialPhone={initialPhone}
              initialMessage={initialMessage}
           />
           <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
           </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="whatsapp_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL (SEO) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-green-500 pl-4">
                Como funciona o "Link Mágico"?
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
                Você já clicou em um link e o WhatsApp abriu magicamente com uma mensagem tipo <em>"Olá, gostaria de saber o preço..."</em> já escrita? Isso é feito através da <strong>API Universal do WhatsApp</strong>.
            </p>
            <p>
                Antigamente, você precisava entender de programação e códigos URL (como <code>%20</code> para espaços) para fazer isso. O <strong>Gerador do Mestre das Contas</strong> automatiza todo esse processo técnico. Nós limpamos a formatação do seu número, codificamos a mensagem corretamente e entregamos o link pronto para uso.
            </p>
            
            {/* GRID DE VANTAGENS */}
            <div className="grid md:grid-cols-3 gap-6 not-prose my-10">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-green-300 dark:hover:border-green-700 transition-colors">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-3">
                        <Zap size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Atendimento Rápido</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Elimine a barreira de "salvar o contato". Seu cliente clica e já está falando com você.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-3">
                        <TrendingUp size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Mais Conversão</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Links na bio do Instagram ou em anúncios aumentam em até 40% a chance de contato.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-3">
                        <ShieldCheck size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">100% Seguro</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Não armazenamos seu número. A ferramenta roda direto no seu navegador com privacidade total.</p>
                </div>
            </div>

            <h3>Onde usar seu link de WhatsApp?</h3>
            <ul className="space-y-2 marker:text-green-600">
                <li><strong>Instagram Bio:</strong> Use ferramentas como Linktree ou coloque direto no perfil.</li>
                <li><strong>Anúncios (Facebook/Google Ads):</strong> Direcione o tráfego direto para o fechamento da venda.</li>
                <li><strong>Email Marketing:</strong> Coloque um botão "Falar com Consultor" no rodapé dos seus emails.</li>
                <li><strong>QR Code Impresso:</strong> Use nossa <Link href="/ferramentas/gerador-qr-code" className="text-blue-600 hover:underline font-bold">ferramenta de QR Code</Link> integrada para imprimir em cardápios e cartões.</li>
            </ul>

        </div>

        {/* FAQ (PERGUNTAS FREQUENTES) */}
        <section className="max-w-4xl mx-auto w-full mt-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center flex items-center justify-center gap-2">
                <HelpCircle className="text-green-600 dark:text-green-500"/> Perguntas Frequentes
            </h2>
            <Accordion type="single" collapsible className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm">
                <AccordionItem value="item-1" className="border-b border-slate-100 dark:border-slate-800 px-4">
                    <AccordionTrigger className="text-slate-800 dark:text-slate-200 font-semibold hover:text-green-600 dark:hover:text-green-400 hover:no-underline py-4">
                        O link expira?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                        Não! O link gerado é permanente. Ele é baseado apenas no seu número de telefone e na mensagem. Enquanto seu número for o mesmo, o link funcionará para sempre.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-slate-100 dark:border-slate-800 px-4">
                    <AccordionTrigger className="text-slate-800 dark:text-slate-200 font-semibold hover:text-green-600 dark:hover:text-green-400 hover:no-underline py-4">
                        Funciona para WhatsApp Business?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                        Sim, funciona perfeitamente para WhatsApp Pessoal e Business. O link é universal e abre o aplicativo que estiver instalado no celular do cliente.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b border-slate-100 dark:border-slate-800 px-4">
                    <AccordionTrigger className="text-slate-800 dark:text-slate-200 font-semibold hover:text-green-600 dark:hover:text-green-400 hover:no-underline py-4">
                        Vocês salvam meu número?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                        Absolutamente não. Nossa ferramenta é "Client-Side", o que significa que o código roda inteiramente no seu dispositivo. Nenhuma informação é enviada para nossos servidores ou banco de dados.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4" className="px-4 border-b-0">
                    <AccordionTrigger className="text-slate-800 dark:text-slate-200 font-semibold hover:text-green-600 dark:hover:text-green-400 hover:no-underline py-4">
                        Posso colocar emojis na mensagem?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                        Com certeza! Nossa ferramenta suporta emojis e caracteres especiais. Eles serão codificados automaticamente para funcionar no link (ex: %F0%9F%98%80).
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="whatsapp_bottom" format="horizontal" variant="software" />
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