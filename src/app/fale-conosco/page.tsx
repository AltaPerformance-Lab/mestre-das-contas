import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Clock, MapPin, ExternalLink, HelpCircle } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

// --- 1. METADATA DE CONFIANÇA (SEO) ---
export const metadata: Metadata = {
  title: "Fale Conosco | Suporte Mestre das Contas",
  description: "Precisa de ajuda? Entre em contato com a equipe do Mestre das Contas. Canal oficial para suporte, dúvidas, sugestões e parcerias comerciais.",
  keywords: ["fale conosco", "suporte mestre das contas", "contato", "atendimento"],
  alternates: {
    canonical: "https://mestredascontas.com.br/fale-conosco",
  },
  openGraph: {
    title: "Fale Conosco - Mestre das Contas",
    description: "Estamos prontos para te ouvir. Envie sua mensagem.",
    url: "https://mestredascontas.com.br/fale-conosco",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
  },
  // IMPORTANTE: Deixe indexar para provar legitimidade ao Google (E-E-A-T)
  robots: { index: true, follow: true },
};

// --- 2. DADOS ESTRUTURADOS (SCHEMA.ORG) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Fale Conosco - Mestre das Contas",
  "description": "Página de contato oficial e suporte ao usuário.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Mestre das Contas",
    "url": "https://mestredascontas.com.br",
    "logo": "https://mestredascontas.com.br/opengraph-image",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contato@contarapida.app.br",
      "contactType": "customer support",
      "availableLanguage": "Portuguese"
    }
  }
};

export default function ContatoPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HEADER SIMPLIFICADO --- */}
      <div className="bg-slate-50 border-b border-slate-200 py-12 md:py-16 text-center px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-6 text-blue-600 ring-1 ring-slate-100">
           <Mail size={32} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Como podemos ajudar?
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Tem alguma dúvida sobre os cálculos, encontrou um bug ou quer sugerir uma nova ferramenta? Estamos aqui para ouvir você.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        
        {/* CARD DE CONTATO PRINCIPAL */}
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"></div>
           
           <div className="flex flex-col items-center gap-4">
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">Canal Oficial</span>
              
              <a 
                href="mailto:contato@contarapida.app.br" 
                className="text-2xl md:text-4xl font-bold text-slate-900 hover:text-blue-600 transition-colors break-all"
                aria-label="Enviar e-mail para contato@mestredascontas.com.br"
              >
                contato@mestredascontas.com.br
              </a>

              <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                 <Clock size={16} />
                 <span>Tempo médio de resposta: <strong>24 a 48 horas úteis</strong></span>
              </div>
           </div>
        </div>

        {/* INFORMAÇÕES ADICIONAIS E FAQ */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
            
            {/* Bloco 1: Parcerias */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
               <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <MessageSquare size={20} className="text-indigo-600"/> Parcerias & Publicidade
               </h3>
               <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Interessado em anunciar para milhares de usuários qualificados ou propor uma parceria de conteúdo?
               </p>
               <p className="text-sm font-medium text-indigo-700">
                  Utilize o mesmo e-mail com o assunto: <br/>
                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-indigo-100 mt-1 inline-block text-slate-700 select-all">Parceria Comercial - [Sua Empresa]</span>
               </p>
            </div>

            {/* Bloco 2: FAQ Rápido (Evita e-mails repetidos) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
               <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <HelpCircle size={20} className="text-emerald-600"/> Antes de enviar...
               </h3>
               <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                     <span><strong>Os cálculos são oficiais?</strong> Sim, usamos as tabelas vigentes (INSS, IRRF) e diretrizes da CLT/Governo.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                     <span><strong>Preciso pagar?</strong> Não, todas as ferramentas do site são 100% gratuitas e sem cadastro.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                     <span><strong>Encontrou um erro?</strong> Por favor, envie um print ou os valores usados para simularmos.</span>
                  </li>
               </ul>
            </div>

        </div>

      </div>
    </article>
  );
}