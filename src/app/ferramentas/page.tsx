import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { 
  QrCode, Zap, Lock, FileJson, Image as ImageIcon, 
  Wrench, ArrowRight, MousePointer2, Smartphone, 
  CheckCircle2, Box, MessageCircle, FileText, ShieldCheck,
  Cpu, Calculator, Briefcase, ShoppingBag, MoonStar, HelpCircle
} from "lucide-react";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

export const metadata: Metadata = {
  title: "Ferramentas e Utilitários Online Grátis 2026 | Mestre das Contas",
  description: "Precisa de utilitários rápidos? Acesse nossa suíte gratuita de ferramentas para gerar Pix, criar PDFs, QR Codes e encurtar links de WhatsApp em 1 clique!",
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
    canonical: "https://mestredascontas.com.br/ferramentas" },
  openGraph: {
    title: "Ferramentas Digitais 2026 | Mestre das Contas",
    url: "https://mestredascontas.com.br/ferramentas",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [
      { 
        url: "/opengraph-image", 
        width: 1200, 
        height: 630, 
        alt: "Ferramentas e Utilitários Mestre das Contas", 
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mais produtividade para o seu dia a dia!",
    images: ["/opengraph-image"],
  } };

// --- SCHEMA.ORG (COLLECTION) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Ferramentas Digitais e Utilitários Online 2026",
      "description": "Suíte completa de ferramentas gratuitas para produtividade: QR Codes, Pix, PDF, Imagens e muito mais.",
      "url": "https://mestredascontas.com.br/ferramentas",
      "hasPart": [
        { "@type": "SoftwareApplication", "name": "Gerador de Pix", "url": "https://mestredascontas.com.br/ferramentas/gerador-pix" },
        { "@type": "SoftwareApplication", "name": "Conversor de Imagem", "url": "https://mestredascontas.com.br/ferramentas/conversor-imagem" },
        { "@type": "SoftwareApplication", "name": "Gerador de QR Code", "url": "https://mestredascontas.com.br/ferramentas/gerador-qr-code" },
        { "@type": "SoftwareApplication", "name": "Gerador de Link WhatsApp", "url": "https://mestredascontas.com.br/ferramentas/link-whatsapp" },
        { "@type": "SoftwareApplication", "name": "Recibo Online PDF", "url": "https://mestredascontas.com.br/ferramentas/gerador-recibo" }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" },
        { "@type": "ListItem", "position": 2, "name": "Ferramentas", "item": "https://mestredascontas.com.br/ferramentas" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "1. Os geradores de recibo e orçamentos funcionam offline?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Uma vez que a página é totalmente carregada no seu navegador, todo o mecanismo e renderização em PDF funcionam de forma local. Você pode preencher e exportar documentos mesmo sem conexão com a internet."
          }
        },
        {
          "@type": "Question",
          "name": "2. Meus arquivos de PDF são enviados para a nuvem ao editar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não, de forma alguma. Nosso Editor de PDF funciona 100% no lado do cliente (Client-Side). Seus documentos são processados diretamente na memória do seu computador ou celular, garantindo sigilo absoluto dos dados."
          }
        },
        {
          "@type": "Question",
          "name": "3. Como funciona a privacidade dos geradores de senhas e QR Code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As senhas e imagens de QR Code são computadas instantaneamente utilizando APIs locais do navegador. Nenhuma informação de links, senhas ou dados digitados é armazenada ou enviada a servidores externos."
          }
        },
        {
          "@type": "Question",
          "name": "4. O QR Code gerado pelo portal possui prazo de validade?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não. Nossos QR Codes são estáticos e vitalícios. As informações são gravadas em definitivo nos pixels da imagem, funcionando por tempo indeterminado e sem qualquer cobrança de taxas."
          }
        },
        {
          "@type": "Question",
          "name": "5. Posso inserir a logomarca da minha empresa nos recibos gerados?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Nossas ferramentas de recibos e orçamentos possuem o campo de upload de imagem para que você incorpore o logotipo da sua marca e emita propostas altamente profissionais em formato A4."
          }
        },
        {
          "@type": "Question",
          "name": "6. As imagens enviadas para conversão de formato estão seguras?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, totalmente. A conversão de formatos de imagem (como converter PNG para WebP ou JPG) é processada de maneira local pelo motor do seu próprio navegador. Seus arquivos de foto nunca tocam a nuvem."
          }
        },
        {
          "@type": "Question",
          "name": "7. Como criar um link personalizado para contato de WhatsApp?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Basta usar nosso Gerador de Link do WhatsApp: insira o número de telefone com o DDD e escreva a mensagem personalizada desejada. A ferramenta gera um link encurtado pronto para ser compartilhado em 1 clique."
          }
        }
      ]
    }
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
          variant="tools" 
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
          <Link href="/ferramentas/editor-pdf-online" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText size={80} className="text-violet-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-violet-100">
                <FileText size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Editor de PDF Ultimate</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
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
          <Link href="/ferramentas/gerador-qr-code" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <QrCode size={80} className="text-indigo-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-indigo-100">
                <QrCode size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Gerador de QR Code</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
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
          <Link href="/ferramentas/gerador-link-whatsapp" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <MessageCircle size={80} className="text-green-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-green-100">
                <MessageCircle size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Link WhatsApp</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Crie links curtos com mensagem personalizada. Ideal para bio do Instagram e vendas. Com preview em tempo real.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-green-600 px-4 py-2 rounded-lg group-hover:bg-green-700 transition-colors">
                  Gerar Link <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>


          {/* 0.5. Criador de Orçamento (NOVO) */}
          <Link href="/ferramentas/criador-orcamentos" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Calculator size={80} className="text-blue-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-blue-100">
                <Calculator size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Criador de Orçamento</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Crie orçamentos profissionais em PDF com sua logo, cálculo de descontos e termos personalizados.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-blue-600 px-4 py-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                  Criar Orçamento <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 0.55. Criador de Pedidos (NOVO) */}
          <Link href="/ferramentas/criador-pedidos" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShoppingBag size={80} className="text-indigo-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-indigo-100">
                <ShoppingBag size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Criador de Pedidos</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Gere pedidos de venda com cálculo de frete, previsão de entrega e sua logo.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                  Criar Pedido <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 0.6. Calculadora MEI (NOVO) */}
          <Link href="/financeiro/calculadora-mei" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Briefcase size={80} className="text-emerald-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-emerald-100">
                <Briefcase size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Calculadora MEI 2026</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Calcule o DAS mensal, limite de faturamento anual e proporcional. Tudo atualizado para 2026.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-emerald-600 px-4 py-2 rounded-lg group-hover:bg-emerald-700 transition-colors">
                  Calcular MEI <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 3. Conversor de Imagem */}
          <Link href="/ferramentas/conversor-imagem" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <ImageIcon size={80} className="text-blue-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-blue-100">
                <ImageIcon size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Conversor de Imagens</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
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
          <Link href="/ferramentas/gerador-recibo" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText size={80} className="text-amber-500" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-amber-100">
                <FileText size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Gerador de Recibo</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
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
          <Link href="/ferramentas/gerador-de-senhas" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Lock size={80} className="text-slate-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-slate-200">
                <Lock size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-400 transition-colors">Gerador de Senhas</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Crie senhas criptograficamente seguras, longas e complexas. Proteja suas contas contra invasões e força bruta.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-slate-800 px-4 py-2 rounded-lg group-hover:bg-slate-900 transition-colors">
                  Gerar Senha <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 6. Formatador JSON (ATIVO) */}
          <Link href="/ferramentas/formatador-json" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileJson size={80} className="text-slate-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-slate-200">
                <FileJson size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-400 transition-colors">Formatador JSON</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Ferramenta para desenvolvedores: valide, formate (beautify) e minifique seus arquivos JSON com segurança.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-slate-800 px-4 py-2 rounded-lg group-hover:bg-slate-900 transition-colors">
                  Formatar JSON <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 7. Declaração de Conteúdo */}
          <Link href="/ferramentas/declaracao-conteudo" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText size={80} className="text-amber-500" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-amber-100">
                <FileText size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Declaração de Conteúdo</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Vai enviar pelos Correios sem Nota Fiscal? Gere o formulário oficial obrigatório em PDF pronto para imprimir.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-amber-500 px-4 py-2 rounded-lg group-hover:bg-amber-600 transition-colors">
                  Gerar Declaração <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 8. Gerador de Privacidade (NOVO) */}
          <Link href="/ferramentas/gerador-privacidade" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck size={80} className="text-emerald-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-emerald-100">
                <ShieldCheck size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Gerador de Privacidade</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Essencial para sites e blogs. Crie políticas LGPD e Termos de Uso compatíveis com Google AdSense.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-emerald-600 px-4 py-2 rounded-lg group-hover:bg-emerald-700 transition-colors">
                  Criar Política <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
          
          {/* 9. Calendário Lunar 2026 (NOVO) */}
          <Link href="/ferramentas/fases-da-lua" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <MoonStar size={80} className="text-indigo-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-indigo-100">
                <MoonStar size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Calendário Lunar 2026</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Confira as fases da lua hoje, eclipses e influências nas marés e agricultura. Guia completo e preciso.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                  Ver Calendário <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* --- CONTEÚDO SEO (ARTIGO) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm mt-10">
          
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
            <Zap className="text-indigo-600" size={32} /> Produtividade e Segurança Sem Complicações
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg mb-6">
            Nós entendemos perfeitamente que no dia a dia digital, o que você mais precisa é de agilidade para resolver pequenas tarefas como gerar um recibo, assinar um contrato ou criar um QR Code. A verdade é que ninguém quer perder tempo fazendo cadastros demorados ou instalando softwares pesados e suspeitos no computador.
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
            Aqui no <strong>Mestre das Contas</strong>, estruturamos uma suíte completa de utilitários rápidos que rodam direto no seu navegador. Nossas ferramentas operam sob a arquitetura Client-Side (lado do cliente), o que significa que o processamento acontece de forma local, mantendo seus dados e arquivos 100% seguros e privados.
          </p>

          {/* TABELA COMPARATIVA DE FORMATOS DE FERRAMENTAS */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-6">
            Comparativo de Formatos de Utilidades
          </h3>
          <div className="overflow-x-auto w-full rounded-2xl border border-slate-200 dark:border-slate-800 mb-8">
            <table className="min-w-[600px] w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Aspecto</th>
                  <th className="p-4">Utilitários Mestre das Contas</th>
                  <th className="p-4">Softwares Instaláveis</th>
                  <th className="p-4">Soluções Manuais</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Velocidade</td>
                  <td className="p-4">Instantânea (sem downloads, roda no navegador)</td>
                  <td className="p-4">Lenta (exige download, instalação e atualizações)</td>
                  <td className="p-4">Muito lenta (preenchimento físico à mão)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Privacidade dos Dados</td>
                  <td className="p-4">Máxima (processamento 100% local no cliente)</td>
                  <td className="p-4">Variável (risco de coleta por telemetria)</td>
                  <td className="p-4">Física (risco de perda ou extravio do papel)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Custo de Licença</td>
                  <td className="p-4">Totalmente gratuito e sem anúncios invasivos</td>
                  <td className="p-4">Pago (assinaturas mensais ou licenças caras)</td>
                  <td className="p-4">Baixo (custo apenas de papel e caneta)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Mobilidade / Multiplataforma</td>
                  <td className="p-4">Total (acessível de qualquer PC, celular ou tablet)</td>
                  <td className="p-4">Limitada (depende do sistema operacional compatível)</td>
                  <td className="p-4">Nula (exige carregar blocos físicos de papel)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PERGUNTAS FREQUENTES (FAQ) */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6 flex items-center gap-2">
            Perguntas Frequentes sobre Nossos Utilitários
          </h3>
          <div className="space-y-4">
            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                1. Os geradores de recibo e orçamentos funcionam offline?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Sim. Uma vez que a página é totalmente carregada no seu navegador, todo o mecanismo e renderização em PDF funcionam de forma local. Você pode preencher e exportar documentos mesmo sem conexão com a internet.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                2. Meus arquivos de PDF são enviados para a nuvem ao editar?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Não, de forma alguma. Nosso Editor de PDF funciona 100% no lado do cliente (Client-Side). Seus documentos são processados diretamente na memória do seu computador ou celular, garantindo sigilo absoluto dos dados.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                3. Como funciona a privacidade dos geradores de senhas e QR Code?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                As senhas e imagens de QR Code são computadas instantaneamente utilizando APIs locais do navegador. Nenhuma informação de links, senhas ou dados digitados é armazenada ou enviada a servidores externos.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                4. O QR Code gerado pelo portal possui prazo de validade?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Não. Nossos QR Codes são estáticos e vitalícios. As informações são gravadas em definitivo nos pixels da imagem, funcionando por tempo indeterminado e sem qualquer cobrança de taxas.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                5. Posso inserir a logomarca da minha empresa nos recibos gerados?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Sim. Nossas ferramentas de recibos e orçamentos possuem o campo de upload de imagem para que você incorpore o logotipo da sua marca e emita propostas altamente profissionais em formato A4.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                6. As imagens enviadas para conversão de formato estão seguras?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Sim, totalmente. A conversão de formatos de imagem (como converter PNG para WebP ou JPG) é processada de maneira local pelo motor do seu próprio navegador. Seus arquivos de foto nunca tocam a nuvem.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                7. Como criar um link personalizado para contato de WhatsApp?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Basta usar nosso Gerador de Link do WhatsApp: insira o número de telefone com o DDD e escreva a mensagem personalizada desejada. A ferramenta gera um link encurtado pronto para ser compartilhado em 1 clique.
              </div>
            </details>
          </div>
        </div>

        </div>

        <SmartCrossLinker currentHref="/ferramentas" category="financeiro" />
        
        {/* ANÚNCIO RODAPÉ */}
        <div className="w-full flex justify-center mt-4">
          <LazyAdUnit slot="tools_hub_bottom" format="auto" />
        </div>

      </div>
  );
}