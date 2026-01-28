
import { Metadata } from "next";
export const runtime = 'edge';
import PrivacyPolicyGenerator from "@/components/tools/PrivacyPolicyGenerator";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { 
  ShieldCheck, FileText, AlertTriangle, Link as LinkIcon, 
  HelpCircle, Eye, Lock, Globe
} from "lucide-react";
import DisclaimerBox from "@/components/ui/DisclaimerBox";

export const metadata: Metadata = {
  title: "Gerador de Política de Privacidade: Sites e AdSense (LGPD)",
  description: "Crie uma Política de Privacidade profissional para seu site ou blog. Compatível com LGPD, Google AdSense e GDPR. Gerador gratuito e instantâneo.",
  keywords: [
    "gerador politica de privacidade", 
    "modelo politica privacidade lgpd", 
    "politica privacidade adsense", 
    "termo de uso site gratis", 
    "gerar politica cookies"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-privacidade" },
  openGraph: {
    title: "Gerador de Política de Privacidade LGPD - Mestre das Contas",
    description: "Cumpra a lei e seja aprovado no AdSense. Gere sua política de privacidade em segundos.",
    url: "https://mestredascontas.com.br/ferramentas/gerador-privacidade",
    siteName: "Mestre das Contas",
    type: "website",
  }
};

export default function PrivacyGeneratorPage() {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Gerador de Política de Privacidade",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
    "description": "Ferramenta para criação de termos de privacidade compatíveis com LGPD e AdSense.",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "2150" }
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Gerador de Política de Privacidade"
          description="A ferramenta essencial para quem tem site, blog ou e-commerce. Gere um documento jurídico compatível com a LGPD (Brasil) e requisitos do Google AdSense."
          category="Jurídico & Web"
          icon={<ShieldCheck size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="emerald"
          badge="Compatível LGPD"
          rating={4.9}
          reviews={2150}
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Gerador Privacidade" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <AdUnit slot="privacidade_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section className="w-full max-w-full relative z-10">
           <div className="mb-6 print:hidden">
              <PrivacyBadge />
           </div>
           
           <PrivacyPolicyGenerator />
           
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <AdUnit slot="privacidade_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO PROFUNDO (DEEP CONTENT) --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden dark:prose-invert">
            
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
            <p>
               Neste guia, vamos te explicar tudo sobre essa obrigação legal e como nosso gerador gratuito (acima) resolve esse problema em menos de 2 minutos.
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 p-6 rounded-2xl my-8 not-prose shadow-sm">
                <h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-3 flex items-center gap-2">
                    <AlertTriangle size={20}/> O Risco da Multa
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-0">
                    A ANPD (Autoridade Nacional de Proteção de Dados) já começou a aplicar multas no Brasil. Para pequenas empresas, a sanção pode começar com uma advertência, mas pode escalar para multa de até 2% do faturamento. Mas o risco mais imediato é o <strong>bloqueio de contas de anúncios</strong>. O Google AdSense bane impiedosamente sites sem política clara.
                </p>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <FileText className="text-blue-600"/> O que deve ter numa Política de Privacidade?
            </h3>
            <p>
                Não basta copiar e colar um texto qualquer da internet. A política precisa refletir a realidade do SEU site. Os pilares fundamentais são:
            </p>
            
            {/* BOXES */}
            <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
               <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2"><Eye size={18} className="text-blue-500"/> Coleta</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Quais dados você pega? Nome? IP? Cookies? Histórico de navegação?</p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2"><Lock size={18} className="text-emerald-500"/> Finalidade</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Por que você quer esses dados? Marketing? Segurança? Melhoria do site?</p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2"><Globe size={18} className="text-purple-500"/> Compartilhamento</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Você envia esses dados para quem? Google? Facebook? Parceiros?</p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2"><ShieldCheck size={18} className="text-rose-500"/> Direitos</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Explique como o usuário pode pedir para você apagar tudo sobre ele.</p>
               </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <LinkIcon className="text-amber-500"/> AdSense e Cookies: A Regra do Jogo
            </h3>
            <p>
                Se você monetiza seu site com o Google AdSense, as regras são ainda mais rígidas. O Google é obrigado por leis da Califórnia (CCPA) e Europa (GDPR) a exigir transparência de seus parceiros.
            </p>
            <p>
                Sua política **PRECISA** mencionar explicitamente:
            </p>
            <ul className="marker:text-amber-500">
                <li>Que terceiros (como o Google) usam cookies para exibir anúncios com base nas visitas anteriores do usuário.</li>
                <li>Como o usuário pode desativar esses cookies (geralmente nas Configurações de Anúncios do Google).</li>
            </ul>
            <p>
                Nosso gerador acima já inclui esse parágrafo "mágico" automaticamente se você marcar a opção "Usa AdSense".
            </p>

            {/* TABELA LGPD vs GDPR */}
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">
               LGPD (Brasil) vs GDPR (Europa)
            </h3>
            <div className="not-prose overflow-hidden border rounded-xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 mb-8">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-900 dark:bg-slate-950 text-white">
                        <tr>
                            <th className="px-6 py-4 font-bold w-1/3">Característica</th>
                            <th className="px-6 py-4 font-bold w-1/3 bg-emerald-600">LGPD (Brasil)</th>
                            <th className="px-6 py-4 font-bold w-1/3 bg-blue-600">GDPR (Europa)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-medium">Abrangência</td><td>Dados tratados no Brasil</td><td>Dados de cidadãos da UE</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-medium">Multa Máxima</td><td>R$ 50 mi por infração</td><td>€ 20 mi ou 4% global</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-medium">DPO (Encarregado)</td><td>Obrigatório (mas flexível)</td><td>Obrigatório para grandes</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-medium">Bases Legais</td><td>10 bases legais</td><td>6 bases legais</td></tr>
                    </tbody>
                </table>
            </div>

            {/* FAQ */}
            <div className="mt-16 not-prose">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <HelpCircle className="text-emerald-600 dark:text-emerald-500" /> Perguntas Frequentes
                </h2>
                <div className="grid gap-4">
                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900/50 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Onde devo colocar o link da política?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            O padrão da indústria é no <strong>Rodapé (Footer)</strong> do site, visível em todas as páginas. Se você tiver um formulário de cadastro ou newsletter, é boa prática colocar um checkbox "Li e aceito a Política de Privacidade" logo abaixo.
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900/50 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Esse gerador substitui um advogado?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            Para blogs, sites institucionais pequenos e portfólios, sim, é suficiente. Porém, se você lida com dados sensíveis (saúde, financeiro, menores de idade) ou tem um e-commerce grande, recomendamos fortemente a consultoria de um advogado especializado em Direito Digital.
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900/50 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Preciso atualizar a política?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            Sim, sempre que você mudar a forma como coleta dados (ex: instalou um novo pixel do Facebook, começou a enviar newsletter). Mantenha a data de "Última atualização" sempre visível.
                        </p>
                    </details>
                </div>
            </div>

        </div>

        {/* ANÚNCIO FINAL */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <AdUnit slot="privacidade_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
