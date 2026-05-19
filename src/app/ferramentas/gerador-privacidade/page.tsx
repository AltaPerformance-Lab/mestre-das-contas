import { Suspense } from "react";
import type { Metadata } from "next";
import PrivacyPolicyGenerator from "@/components/tools/PrivacyPolicyGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { 
  ShieldCheck, FileText, AlertTriangle, Link as LinkIcon, 
  HelpCircle, Eye, Lock, Globe
} from "lucide-react";
import DisclaimerBox from "@/components/ui/DisclaimerBox";

// --- 1. METADATA (ESTÁTICA PARA SSG) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Gerador de Política de Privacidade: Sites e AdSense (LGPD)";
  const description = "Crie uma Política de Privacidade profissional para seu site ou blog. Compatível com LGPD, Google AdSense e GDPR. Gerador gratuito e instantâneo.";

  return {
    title,
    description,
    keywords: [
      "gerador politica de privacidade", 
      "modelo politica privacidade lgpd", 
      "politica privacidade adsense", 
      "termo de uso site gratis", 
      "gerar politica cookies"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-privacidade" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/ferramentas/gerador-privacidade",
      siteName: "Mestre das Contas",
      type: "website" }
  };
}

// --- DADOS ESTRUTURADOS ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Gerador de Política de Privacidade",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para criação de termos de privacidade compatíveis com LGPD e AdSense."
    },
    {
      "@type": "HowTo",
      "name": "Como Gerar uma Política de Privacidade e Termos de Uso",
      "description": "Passo a passo simples para criar políticas de privacidade e termos de uso adequados à LGPD para o seu site.",
      "totalTime": "PT30S",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Insira os Dados do Site",
          "text": "Informe o nome do seu site, a URL principal (link) e o e-mail de contato do responsável pelos dados.",
          "url": "https://mestredascontas.com.br/ferramentas/gerador-privacidade#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Escolha os Serviços Utilizados",
          "text": "Marque se o seu site exibe anúncios (Google AdSense), se usa rastreamento (Google Analytics) e se utiliza cookies de terceiros.",
          "url": "https://mestredascontas.com.br/ferramentas/gerador-privacidade#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Gere e Publique",
          "text": "Clique em 'Gerar Documento'. Copie o texto em HTML ou texto puro e publique em uma página dedicada no rodapé do seu site.",
          "url": "https://mestredascontas.com.br/ferramentas/gerador-privacidade#ferramenta"
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "O Guia da LGPD para Pequenos Sites e Blogs",
      "description": "Entenda por que a Política de Privacidade é obrigatória para quem usa Google AdSense e como evitar multas da ANPD.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon.png" } },
      "datePublished": "2024-04-15",
      "dateModified": new Date().toISOString()
    }
  ]
};

export default async function PrivacyGeneratorPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12 font-sans bg-slate-50 dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Gerador de Política de Privacidade"
          description="A ferramenta essencial para quem tem site, blog ou e-commerce. Gere um documento jurídico compatível com a LGPD (Brasil) e requisitos do Google AdSense."
          category="Jurídico & Web"
          icon={<ShieldCheck size={32} strokeWidth={2} />}
          variant="tools"
          categoryColor="emerald"
          badge="Compatível LGPD"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Gerador Privacidade" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="privacidade_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section className="w-full max-w-full relative z-10">
           <div className="mb-6 print:hidden">
              <PrivacyBadge />
           </div>
           
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <PrivacyPolicyGenerator />
           </Suspense>
           
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="privacidade_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO PROFUNDO (DEEP CONTENT) --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden dark:prose-invert">
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2 mb-4 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                Como Usar o Gerador de Política de Privacidade (Passo a Passo)
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
               Gere os termos de uso e política de privacidade do seu site em conformidade com a LGPD em 3 etapas:
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">1</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Dados do Site</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Insira o nome do seu site, o endereço eletrônico principal (URL completa) e informe se você utiliza cookies ou exibe anúncios.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">2</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Gere as Políticas</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Clique em <strong>"Gerar Documento"</strong> para rodar a criação instantânea. Nosso algoritmo criará o termo completo adequado à LGPD e GDPR.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">3</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Copie & Publique</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Copie o código em <strong>HTML</strong> ou o <strong>Texto Puro</strong> gerado, crie uma nova página no seu site e linke-a de forma clara no rodapé.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
               O seu site está ilegal? (A verdade sobre a LGPD)
            </h2>
            
            <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
               Você criou seu site, caprichou no design, escreveu ótimos artigos... mas esqueceu de uma página que quase ninguém lê, mas que todo advogado procura: a <strong>Política de Privacidade</strong>.
            </p>
            <p>
               Muitos donos de pequenos sites acham que a Lei Geral de Proteção de Dados (LGPD) só vale para gigantes como Facebook ou Google. Esse é um erro perigoso.
            </p>
            <p>
               Se o seu site tem um formulário de contato, usa Google Analytics ou exibe anúncios do AdSense, você está coletando dados. E se você coleta dados, você precisa dizer ao usuário <strong>o que</strong> você faz com eles.
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 p-6 rounded-2xl my-8 not-prose shadow-sm">
                <h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-3 flex items-center gap-2">
                    <AlertTriangle size={20}/> O Risco da Multa
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-0">
                    A ANPD (Autoridade Nacional de Proteção de Dados) já começou a aplicar multas no Brasil. Para pequenas empresas, a sanção pode começar com uma advertência, mas pode escalar para multa de até 2% do faturamento. O Google AdSense bane impiedosamente sites sem política clara.
                </p>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <FileText className="text-blue-600"/> O que deve ter numa Política de Privacidade?
            </h3>
            <p>
                Não basta copiar e colar um texto qualquer da internet. A política precisa refletir a realidade do SEU site. Os pilares fundamentais são:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
               <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2"><Eye size={18} className="text-blue-500"/> Coleta</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Quais dados você pega? Nome? IP? Cookies? Histórico de navegação?</p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2"><Lock size={18} className="text-emerald-500"/> Finalidade</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Por que você quer esses dados? Marketing? Segurança? Melhoria do site?</p>
               </div>
            </div>

            {/* FAQ */}
            <div className="mt-16 not-prose">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <HelpCircle className="text-emerald-600 dark:text-emerald-500" /> Perguntas Frequentes
                </h2>
                <div className="grid gap-4">
                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Onde devo colocar o link da política?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            O padrão da indústria é no <strong>Rodapé (Footer)</strong> do site, visível em todas as páginas.
                        </p>
                    </details>
                </div>
            </div>

        </div>

        {/* ANÚNCIO FINAL */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="privacidade_bottom" format="horizontal" variant="software" />
        </div>

        <SmartCrossLinker currentHref="/ferramentas/gerador-privacidade" category="ferramentas" />

      </div>
    </article>
  );
}
