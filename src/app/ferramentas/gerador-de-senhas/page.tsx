import { Suspense } from "react";
import type { Metadata } from "next";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import { 
  Lock, HelpCircle, CheckCircle2, Unlock, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

// --- 1. METADATA DINÂMICA (SEO DE CAUDA LONGA) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Gerador de Senhas Fortes | Criar Senha Segura Grátis";
  const description = "Proteja suas contas em 2026. Gere senhas aleatórias de alta entropia, personalizadas e 100% seguras (processamento local) em segundos.";

  return {
    title,
    description,
    keywords: [
      "gerador de senhas", "senha forte", "criar senha segura", "password generator", 
      "segurança online", "gerador aleatorio", "teste de força de senha"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-de-senhas" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/ferramentas/gerador-de-senhas",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article" } };
}

export default async function GeradorSenhasPage() {

  const faqList = [
    { q: "Por que não posso usar a mesma senha em tudo?", a: "Se um site sofrer vazamento de dados, os hackers testarão sua senha em todos os outros serviços. Se a senha for única, o dano é contido." },
    { q: "O que é entropia de senha?", a: "É a medida de imprevisibilidade. Uma senha como '123456' tem baixa entropia. Uma senha como 'Xk9#mP2$vL' tem alta entropia, tornando quase impossível adivinhar." },
    { q: "Comprimento ou complexidade?", a: "Comprimento vence. Uma senha de 20 caracteres é frequentemente mais forte que uma de 8 com símbolos. O ideal é unir os dois: longa E complexa." }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Gerador de Senhas Fortes",
        "applicationCategory": "SecurityApplication",
        "operatingSystem": "Web Browser",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": "Ferramenta online para gerar senhas aleatórias criptograficamente seguras." },
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

  return (
    <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Gerador de Senhas Fortes"
          description="Proteja suas contas contra invasões. Gere senhas aleatórias, longas e com criptografia militar instantaneamente. Seus dados nunca saem do seu dispositivo."
          category="Segurança & Privacidade"
          icon={<Lock size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="slate"
          badge="Criptografia Client-Side"
          breadcrumbs={[{ label: "Ferramentas", href: "/ferramentas" }, { label: "Gerador de Senhas" }]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="pass_top" format="horizontal" variant="agency" />
        </div>

        {/* PRIVACIDADE E SEGURANÇA (E-E-A-T) */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300 mb-2">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Criptografia de Nível Militar: As senhas são geradas localmente em 2026 e nunca são enviadas ou armazenadas por nós.</span>
        </div>

        {/* FERRAMENTA PRINCIPAL */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <PrivacyBadge />
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <PasswordGenerator />
           </Suspense>
           <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
           </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="pass_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO PROFUNDO --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-slate-900 dark:border-slate-100 pl-4">
                Segurança Digital em 2026: Comprimento é Rei
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
                Um hacker leva exatos 0,000001 segundos para quebrar a senha "123456". A matemática da entropia é sua única defesa real.
            </p>
            <p>
                Nossa ferramenta utiliza a API `crypto` do navegador para garantir aleatoriedade total, sem nunca enviar sua senha para a nuvem.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <Unlock size={20} className="text-blue-500" /> Use um Gerenciador de Senhas
            </h3>
            <p>
                Não tente decorar senhas complexas. Use Bitwarden, 1Password ou o gerenciador nativo do seu celular. Você só precisa lembrar da "Senha Mestra".
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-5 rounded-r-xl not-prose my-8">
                <h4 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Privacidade Total</h4>
                <p className="text-blue-700 dark:text-blue-200 text-sm m-0">
                    A geração acontece no seu processador. Se você desconectar o cabo de rede, a ferramenta continuará funcionando. Privacidade matemática absoluta.
                </p>
            </div>
        </div>

        <SmartCrossLinker currentHref="/ferramentas/gerador-de-senhas" category="ferramentas" />

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="pass_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}