import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { 
  QrCode, Zap, Lock, FileJson, Image as ImageIcon, 
  Wrench, ArrowRight, MousePointer2, Smartphone, 
  CheckCircle2, Box, MessageCircle, FileText, ShieldCheck,
  Cpu
} from "lucide-react";

// --- METADATA (SEO 2026) ---
export const metadata: Metadata = {
  title: "Ferramentas e Utilitários Online Grátis | Mestre das Contas",
  description: "Aumente sua produtividade. Gere QR Codes, Links de WhatsApp, Recibos em PDF e converta Imagens. Tudo gratuito, ilimitado e seguro (sem upload).",
  keywords: [
    "ferramentas online gratis", 
    "gerador de qr code", 
    "gerador link whatsapp",
    "conversor de imagem",
    "gerador de recibo pdf",
    "utilitários web", 
    "produtividade online"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/ferramentas",
  },
  openGraph: {
    title: "Ferramentas Digitais - Mestre das Contas",
    description: "Utilitários gratuitos para facilitar seu dia a dia. Acesse agora.",
    url: "https://mestredascontas.com.br/ferramentas",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    // images: fallen back to root
  },
};

// --- SCHEMA.ORG (COLLECTION) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Ferramentas e Utilitários",
  "description": "Coleção de ferramentas digitais gratuitas para produtividade.",
  "url": "https://mestredascontas.com.br/ferramentas",
  "hasPart": [
    { "@type": "SoftwareApplication", "name": "Editor de PDF Online", "url": "https://mestredascontas.com.br/ferramentas/editor-pdf-online" },
    { "@type": "SoftwareApplication", "name": "Gerador de QR Code", "url": "https://mestredascontas.com.br/ferramentas/gerador-qr-code" },
    { "@type": "SoftwareApplication", "name": "Gerador de Link WhatsApp", "url": "https://mestredascontas.com.br/ferramentas/gerador-link-whatsapp" },
    { "@type": "SoftwareApplication", "name": "Conversor de Imagens", "url": "https://mestredascontas.com.br/ferramentas/conversor-imagem" },
    { "@type": "SoftwareApplication", "name": "Gerador de Senhas", "url": "https://mestredascontas.com.br/ferramentas/gerador-de-senhas" },
    { "@type": "SoftwareApplication", "name": "Gerador de Recibo", "url": "https://mestredascontas.com.br/ferramentas/gerador-recibo" }
  ]
};

export default function FerramentasHubPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Ferramentas & Utilitários"
          description="Simplifique tarefas do dia a dia com nossa suíte de ferramentas digitais. Tudo gratuito, sem cadastro e direto no navegador."
          category="Produtividade"
          icon={<Wrench size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="indigo" // Cor temática para ferramentas
          badge="Novidades 2026"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Ferramentas" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">

        {/* ANÚNCIO TOPO */}
        <div className="w-full flex justify-center">
           <LazyAdUnit slot="tools_hub_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
        </div>

        {/* --- GRID DE FERRAMENTAS --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 0. Editor de PDF (DESTAQUE) */}
          <Link href="/ferramentas/editor-pdf-online" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText size={80} className="text-violet-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-violet-100">
                <FileText size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors">Editor de PDF Ultimate</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Edite, Junte, Assine e Anote em seus PDFs. Ferramenta completa com processamento 100% no navegador (privacidade total).
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-violet-600 px-4 py-2 rounded-lg group-hover:bg-violet-700 transition-colors">
                  Editar PDF Agora <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 1. Gerador de QR Code */}
          <Link href="/ferramentas/gerador-qr-code" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <QrCode size={80} className="text-indigo-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-indigo-100">
                <QrCode size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Gerador de QR Code</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Crie códigos para Pix, Wi-Fi, Links e Contatos. Personalize cores, adicione logo e imprima em alta resolução.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                  Criar QR Code <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 2. Gerador Link WhatsApp */}
          <Link href="/ferramentas/gerador-link-whatsapp" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <MessageCircle size={80} className="text-green-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-green-100">
                <MessageCircle size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">Link WhatsApp</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Crie links curtos com mensagem personalizada. Ideal para bio do Instagram e vendas. Com preview em tempo real.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-green-600 px-4 py-2 rounded-lg group-hover:bg-green-700 transition-colors">
                  Gerar Link <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 3. Conversor de Imagem */}
          <Link href="/ferramentas/conversor-imagem" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <ImageIcon size={80} className="text-blue-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-blue-100">
                <ImageIcon size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Conversor de Imagens</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Transforme WEBP em PNG, JPG em WEBP, AVIF e muito mais. <strong>Ilimitado</strong> e sem enviar arquivos para o servidor.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-blue-600 px-4 py-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                  Converter Agora <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 4. Gerador de Recibo */}
          <Link href="/ferramentas/gerador-recibo" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText size={80} className="text-amber-500" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-amber-100">
                <FileText size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">Gerador de Recibo</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Emita recibos profissionais em PDF prontos para imprimir. Preenchimento automático por extenso e opção de 2 vias.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-amber-500 px-4 py-2 rounded-lg group-hover:bg-amber-600 transition-colors">
                  Criar Recibo <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 5. Gerador de Senhas */}
          <Link href="/ferramentas/gerador-de-senhas" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Lock size={80} className="text-slate-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-slate-200">
                <Lock size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">Gerador de Senhas</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Crie senhas criptograficamente seguras, longas e complexas. Proteja suas contas contra invasões e força bruta.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-slate-800 px-4 py-2 rounded-lg group-hover:bg-slate-900 transition-colors">
                  Gerar Senha <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 6. EM BREVE: Formatador JSON */}
          <div className="group relative overflow-hidden bg-slate-50 rounded-3xl border border-slate-200 opacity-80 h-full flex flex-col cursor-not-allowed">
            <div className="absolute top-4 right-4">
                <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border border-slate-300">Em Breve</span>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col grayscale opacity-60">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 mb-6 shadow-sm">
                <FileJson size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-700 mb-3">Formatador JSON</h2>
              <p className="text-slate-500 mb-6 leading-relaxed flex-1 text-sm">
                Ferramenta para desenvolvedores: valide, formate e minifique seus arquivos JSON com segurança.
              </p>
            </div>
          </div>

        </section>

        {/* --- CONTEÚDO SEO (ARTIGO) --- */}
        <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-sm mt-10">
          
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Zap className="text-amber-500" size={32} /> Produtividade na Ponta dos Dedos
          </h2>
          <p className="lead text-slate-700 text-lg">
            No <strong>Mestre das Contas</strong>, acreditamos que ferramentas úteis não precisam ser complicadas ou pagas. Nossa missão é criar utilitários web que rodam direto no seu navegador, sem necessidade de instalar programas pesados ou criar contas.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-indigo-200 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <MousePointer2 className="text-indigo-600"/> 100% Online e Gratuito
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                      Esqueça downloads suspeitos. Nossas ferramentas utilizam a tecnologia <strong>Client-Side</strong>. Isso significa que o processamento (conversão de imagem, geração de senha) acontece no seu dispositivo.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full w-fit">
                      <ShieldCheck size={14}/> Dados não saem do seu PC
                  </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-200 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Smartphone className="text-blue-600"/> Responsivo e Rápido
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                      Seja no celular, tablet ou computador, nossas interfaces são projetadas para carregar em milissegundos e funcionar perfeitamente em qualquer tela. Sem pop-ups chatos.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full w-fit">
                      <Zap size={14}/> Otimizado para 4G/5G
                  </div>
              </div>
          </div>

          {/* ROADMAP */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-slate-900/20">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Box size={150} className="text-white"/>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                  <Cpu size={24} className="text-amber-400"/> O que vem por aí?
              </h3>
              <p className="text-slate-300 mb-6 relative z-10">
                  Estamos constantemente desenvolvendo novas soluções. Em nosso roadmap de 2026, já estamos trabalhando em:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 relative z-10 text-sm font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400"/> Teste de Velocidade de Digitação</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400"/> Contador de Caracteres e Palavras</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400"/> Formatador de Código (JSON/XML)</li>
              </ul>
          </div>

        </div>

        {/* ANÚNCIO RODAPÉ */}
        <div className="w-full flex justify-center mt-4">
          <LazyAdUnit slot="tools_hub_bottom" format="auto" />
        </div>

      </div>
    </div>
  );
}