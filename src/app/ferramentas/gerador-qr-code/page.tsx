import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import QRCodeGenerator from "@/components/calculators/QRCodeGenerator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  QrCode, Zap, ShieldCheck, Download, Ban, 
  Smartphone, Wifi, CheckCircle2, Globe
} from "lucide-react";

// --- METADATA (SEO) ---
export const metadata: Metadata = {
  title: "Gerador de QR Code Grátis e Infinito (Sem Validade)",
  description: "Crie QR Codes personalizados com logo e cores. Totalmente gratuito, sem cadastro e sem data de validade (Estático). Baixe em alta qualidade agora.",
  keywords: [
    "gerador de qr code", 
    "criar qr code gratis", 
    "qr code com logo", 
    "qr code wifi", 
    "qr code estatico", 
    "qr code que não expira"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-qr-code" },
  openGraph: {
    title: "Gerador de QR Code Grátis - Mestre das Contas",
    description: "Crie códigos QR ilimitados, com cores e logo. Nunca expira.",
    url: "https://mestredascontas.com.br/ferramentas/gerador-qr-code",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-qrcode.png", width: 1200, height: 630, alt: "Criar QR Code" }],
  },
};

export default function QRCodePage() {
  return (
    <article className="w-full max-w-full overflow-hidden">
      
      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Gerador de QR Code Grátis"
          description="Crie códigos QR personalizados para links, textos ou Wi-Fi. Diferente de outros sites, nossos códigos são estáticos: eles nunca expiram e são 100% gratuitos."
          category="Ferramentas Úteis"
          icon={<QrCode size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="slate"
          badge="Vitalício & Ilimitado"
          rating={5.0}
          reviews={2340}
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Gerador QR Code" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="qrcode_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <Suspense fallback={<div className="h-96 w-full bg-slate-100 rounded-2xl animate-pulse"></div>}>
              <QRCodeGenerator />
          </Suspense>
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <AdUnit slot="qrcode_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EXPLICATIVO --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-slate-900 pl-4">
              Por que usar este gerador?
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            Muitos sites oferecem QR Codes "gratuitos" que param de funcionar depois de 15 dias ou mostram propagandas antes de abrir o seu link. Isso acontece porque eles criam <strong>QR Codes Dinâmicos</strong>.
          </p>
          <p>
            Nós fazemos diferente. O Mestre das Contas gera <strong>QR Codes Estáticos</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2"><CheckCircle2 size={20}/> O Nosso (Estático)</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex gap-2">✓ O link fica gravado direto na imagem.</li>
                      <li className="flex gap-2">✓ Funciona para sempre (Vitalício).</li>
                      <li className="flex gap-2">✓ Sem limite de scans.</li>
                      <li className="flex gap-2">✓ Privacidade total (não rastreamos).</li>
                  </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                  <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2"><Ban size={20}/> Outros Sites (Dinâmico)</h3>
                  <ul className="space-y-2 text-sm text-red-800">
                      <li className="flex gap-2">✖ O link passa por um servidor deles.</li>
                      <li className="flex gap-2">✖ Expira se você não pagar.</li>
                      <li className="flex gap-2">✖ Limite de leituras mensal.</li>
                      <li className="flex gap-2">✖ Rastreiam quem clicou.</li>
                  </ul>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <Zap className="text-yellow-500" /> O que você pode criar?
          </h3>
          <ul className="space-y-4 not-prose mb-8">
              <li className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600 shrink-0 mt-1"><Globe size={20}/></div>
                  <div>
                      <strong className="text-slate-900 block text-sm mb-1">Links de Sites ou Cardápio</strong>
                      <span className="text-slate-600 text-sm">Ideal para restaurantes, cartões de visita ou levar o cliente para seu Instagram/WhatsApp.</span>
                  </div>
              </li>
              <li className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="bg-purple-100 p-2.5 rounded-lg text-purple-600 shrink-0 mt-1"><Wifi size={20}/></div>
                  <div>
                      <strong className="text-slate-900 block text-sm mb-1">Acesso ao Wi-Fi</strong>
                      <span className="text-slate-600 text-sm">Crie um código para que seus clientes conectem na rede sem precisar digitar a senha.</span>
                  </div>
              </li>
              <li className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="bg-orange-100 p-2.5 rounded-lg text-orange-600 shrink-0 mt-1"><Smartphone size={20}/></div>
                  <div>
                      <strong className="text-slate-900 block text-sm mb-1">Texto ou Chave Pix</strong>
                      <span className="text-slate-600 text-sm">Compartilhe uma mensagem simples ou sua chave Pix para pagamentos rápidos.</span>
                  </div>
              </li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Dicas para um QR Code Perfeito</h3>
          <ul className="list-disc pl-5 space-y-2 marker:text-slate-400 text-slate-600">
              <li><strong>Contraste é tudo:</strong> Mantenha o fundo claro e o código escuro. Leitores antigos sofrem com cores invertidas.</li>
              <li><strong>Não exagere no tamanho:</strong> Se for imprimir pequeno, use URLs curtas (encurtadores) para deixar o desenho do código mais simples.</li>
              <li><strong>Teste antes de imprimir:</strong> Aponte a câmera do seu celular e teste na tela antes de mandar para a gráfica.</li>
          </ul>

        </div>

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <AdUnit slot="qrcode_bottom" format="horizontal" variant="software" />
        </div>

        {/* RODAPÉ */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}