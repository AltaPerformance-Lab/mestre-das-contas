"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Rocket, 
  ShieldCheck, 
  Zap, 
  Target, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare,
  TrendingUp,
  Building2,
  Scale,
  Calculator,
  LayoutDashboard,
  Send
} from "lucide-react";
import Link from "next/link";

// --- VARIANTES DE ANIMAÇÃO ---
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function BusinessLandingPage() {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    ideia: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- RASTREAMENTO ANALYTICS IMPECÁVEL ---
  const trackConversion = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead_b2b", {
        event_category: "Conversion",
        event_label: "WhatsApp B2B",
        value: 1,
        company_name: formData.empresa,
        lead_name: formData.nome
      });
    }
  };

  const generateWhatsappUrl = () => {
    const baseUrl = "https://wa.me/5564992514471";
    const text = `Olá! Vi a página B2B do Mestre das Contas e gostaria de um orçamento para uma ferramenta.

Meu nome: ${formData.nome || "---"}
Minha Empresa (Nicho): ${formData.empresa || "---"}
Ideia da Ferramenta: ${formData.ideia || "---"}`;

    return `${baseUrl}?text=${encodeURIComponent(text)}`;
  };

  const isFormValid = formData.nome.length >= 3 && formData.empresa.length >= 2;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://alta-performance-web-site.vercel.app/#organization",
        "name": "Alta Performance Web",
        "url": "https://alta-performance-web-site.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mestredascontas.com.br/logo.png"
        },
        "description": "Agência de desenvolvimento digital especializada em alta performance, Programmatic SEO (pSEO) e ferramentas web construídas em Next.js e Node.js.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BR",
          "addressRegion": "Goiás"
        }
      },
      {
        "@type": "Service",
        "@id": "https://mestredascontas.com.br/para-empresas/#service",
        "serviceType": "Desenvolvimento de Calculadoras Web e Software B2B",
        "provider": {
          "@id": "https://alta-performance-web-site.vercel.app/#organization"
        },
        "areaServed": "BR",
        "description": "Criação de calculadoras personalizadas, simuladores de financiamento e plataformas web em React/Next.js focadas em captação de leads e tráfego orgânico.",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Soluções de Angariação de Leads B2B",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Desenvolvimento de Calculadoras Trabalhistas e Financeiras"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Arquitetura e Implementação de Programmatic SEO (pSEO)"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Aplicações de Alta Performance (SSR)"
              }
            }
          ]
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://mestredascontas.com.br/para-empresas/#webpage",
        "url": "https://mestredascontas.com.br/para-empresas",
        "name": "Crie a sua Própria Calculadora Web | Alta Performance Web",
        "description": "Transforme o seu site numa máquina de captação de leads. Desenvolvemos calculadoras e ferramentas B2B de alta performance para o seu nicho.",
        "isPartOf": {
          "@id": "https://mestredascontas.com.br/#website"
        },
        "about": {
          "@id": "https://mestredascontas.com.br/para-empresas/#service"
        }
      }
    ]
  };

  return (
    <div className="bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- SEÇÃO 1: HERO --- */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
              <Rocket size={14} className="animate-pulse" /> Alta Performance Web + Mestre das Contas
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-balance">
              O seu site atual é só um <span className="text-blue-500">"panfleto digital"</span>?
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-slate-400 font-medium mb-12 text-pretty">
              Desenvolvemos Calculadoras e Ferramentas White Label de alta performance para o seu negócio atrair e converter clientes automaticamente.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link href="#orcamento" className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-blue-600/30 active:scale-95">
                Orçar Minha Ferramenta Exclusiva
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SEÇÃO 2: PROBLEMA vs SOLUÇÃO (Resumida para foco no form) --- */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[2rem] bg-rose-500/5 border border-rose-500/20">
              <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 mb-6"><Target size={24} /></div>
              <h3 className="text-2xl font-bold mb-4">Site Comum</h3>
              <p className="text-slate-400">Texto longo que ninguém lê, zero interação e custo por clique caríssimo.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-6"><Zap size={24} /></div>
              <h3 className="text-2xl font-bold mb-4">Site com Ferramentas</h3>
              <p className="text-slate-400">O usuário interage, sente autoridade e deixa o contato de bom grado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 3: CASE & SEGMENTOS --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
             <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold">Nós somos a tecnologia por trás do Mestre das Contas.</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="text-blue-500 shrink-0" />
                    <p className="text-slate-300"><strong>pSEO Avançado:</strong> Domine milhares de buscas automaticamente.</p>
                  </div>
                  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="text-blue-500 shrink-0" />
                    <p className="text-slate-300"><strong>SSR Performance:</strong> Carregamento instantâneo para não perder leads.</p>
                  </div>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-slate-900 border border-white/5"><Scale className="text-blue-400 mb-4" /> <h4 className="font-bold">Advogados</h4></div>
                <div className="p-6 rounded-3xl bg-slate-900 border border-white/5"><Calculator className="text-indigo-400 mb-4" /> <h4 className="font-bold">Contadores</h4></div>
                <div className="p-6 rounded-3xl bg-slate-900 border border-white/5"><Building2 className="text-emerald-400 mb-4" /> <h4 className="font-bold">Imobiliárias</h4></div>
                <div className="p-6 rounded-3xl bg-slate-900 border border-white/5"><Users className="text-amber-400 mb-4" /> <h4 className="font-bold">Consultores</h4></div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 5: CTA FINAL COM FORMULÁRIO DE QUALIFICAÇÃO --- */}
      <section id="orcamento" className="py-24 relative overflow-hidden bg-blue-600/5">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl mb-8 shadow-2xl shadow-blue-600/40 rotate-12">
              <MessageSquare size={40} className="-rotate-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Pronto para dominar o seu nicho?</h2>
            <p className="text-lg text-slate-400">Preencha os dados abaixo para liberar o contato direto via WhatsApp.</p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-[2.5rem] shadow-2xl">
             <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Seu Nome</label>
                   <input 
                      type="text" 
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="Ex: João Silva"
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Empresa ou Nicho</label>
                   <input 
                      type="text" 
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      placeholder="Ex: Imobiliária em SP"
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700"
                   />
                </div>
             </div>
             
             <div className="space-y-2 mb-8">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">O que você imagina para o seu site?</label>
                <textarea 
                   name="ideia"
                   value={formData.ideia}
                   onChange={handleInputChange}
                   placeholder="Ex: Quero uma calculadora de financiamento personalizada..."
                   rows={3}
                   className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700 resize-none"
                />
             </div>

             <a 
               href={isFormValid ? generateWhatsappUrl() : "#"}
               target={isFormValid ? "_blank" : undefined}
               rel="noopener noreferrer"
               onClick={() => { if(isFormValid) trackConversion(); }}
               className={`flex items-center justify-center gap-4 px-10 py-6 rounded-2xl font-black text-xl md:text-2xl transition-all shadow-2xl w-full ${
                 isFormValid 
                 ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20 active:scale-[0.98]" 
                 : "bg-slate-800 text-slate-600 cursor-not-allowed"
               }`}
             >
               {isFormValid ? "Quero Atrair Mais Clientes" : "Complete os Campos"}
               <ArrowRight size={24} />
             </a>
             
             {!isFormValid && (
               <p className="text-center text-[10px] text-slate-600 mt-4 font-bold uppercase tracking-widest">
                 Preencha nome e empresa para liberar o orçamento
               </p>
             )}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-600 border-t border-white/5">
         <p className="text-sm font-bold uppercase tracking-widest mb-2">Agência Alta Performance Web</p>
         <p className="text-xs">© 2026 Mestre das Contas - Tecnologia para Negócios de Elite</p>
      </footer>
    </div>
  );
}
