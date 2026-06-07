import { Suspense } from "react";
import type { Metadata } from "next";
import PrivacyPolicyGenerator from "@/components/tools/PrivacyPolicyGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { 
  ShieldCheck, FileText, AlertTriangle, Link as LinkIcon, 
  HelpCircle, Eye, Lock, Globe, Star, Sparkles, Scale
} from "lucide-react";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA (ESTÁTICA PARA SSG) ---
export const metadata: Metadata = {
  title: "Gerador de Política de Privacidade Grátis 2026 | LGPD & AdSense",
  description: "Evite multas e aprove seu site no AdSense! Gere políticas de privacidade e termos de uso em total conformidade com a LGPD e GDPR. Rápido e gratuito!",
  keywords: [
    "gerador politica de privacidade", "modelo politica privacidade lgpd", 
    "politica privacidade adsense", "termo de uso site gratis", "gerar politica cookies"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-privacidade" },
  openGraph: {
    title: "Gerador de Política de Privacidade LGPD | Mestre das Contas",
    url: "https://mestredascontas.com.br/ferramentas/gerador-privacidade",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://mestredascontas.com.br/opengraph/gerador-privacidade.jpg", width: 1200, height: 630, alt: "Gerador de Política de Privacidade" }]
  },
  robots: { index: true, follow: true }
};

// 7 FAQs Dinâmicas Sincronizadas
const faqs = [
  {
    q: "A Política de Privacidade gerada por esta ferramenta é 100% válida perante a LGPD e a ANPD no Brasil?",
    a: "Sim! Os termos gerados abrangem as diretrizes fundamentais estipuladas pela Lei Geral de Proteção de Dados (Lei nº 13.709/18). O documento descreve a finalidade do tratamento, a coleta de dados básicos de navegação (cookies, analytics) e os direitos dos titulares. Lembramos que, caso sua empresa lide com dados sensíveis complexos (como prontuários médicos ou dados biométricos), uma consultoria jurídica dedicada é aconselhável."
  },
  {
    q: "Por que o Google AdSense exige obrigatoriamente que meu site ou blog tenha uma Política de Privacidade?",
    a: "Veja bem, o Google AdSense utiliza cookies de terceiros para veicular anúncios segmentados com base nas preferências e histórico de navegação dos usuários. As políticas do Google exigem que você informe claramente a seus visitantes essa prática de rastreamento e forneça opções de desativação (opt-out), sendo este um critério eliminatório para aprovação da monetização."
  },
  {
    q: "Como a minha empresa ou blog deve informar os visitantes sobre o uso de Cookies de rastreamento?",
    a: "A melhor prática é utilizar um banner de consentimento ativo de cookies na entrada do site (o famoso 'Aviso de Cookies') integrado ao link da sua Política de Privacidade gerada. Dessa forma, os visitantes tomam ciência de que cookies de analytics e publicidade estão sendo carregados e podem aceitar ou recusar de forma livre e informada."
  },
  {
    q: "O que acontece se o meu site ou blog coletar dados de usuários sem exibir termos de uso claros?",
    a: "A verdade é que a coleta sem transparência representa uma violação direta da LGPD, expondo o seu negócio a sanções administrativas impostas pela ANPD. Além disso, plataformas de tecnologia (como Google, Facebook e sistemas de e-commerce) podem suspender sua conta de anúncios, banir seu site da rede de pesquisa ou bloquear suas vendas por desrespeito às políticas de segurança corporativas."
  },
  {
    q: "Qual é a diferença real entre os termos de Política de Privacidade e os Termos de Uso de um site?",
    a: "A Política de Privacidade foca estritamente no fluxo dos dados pessoais dos usuários (como são coletados, onde são armazenados e para que servem). Já os Termos de Uso regulam o comportamento do visitante no site, estabelecendo as regras de uso dos conteúdos, direitos autorais, restrições de conduta e isenções de responsabilidade do administrador do portal."
  },
  {
    q: "Eu preciso contratar um advogado especializado em direito digital para revisar a minha política de dados?",
    a: "Para blogs institucionais, portais de conteúdo pSEO e pequenos e-commerces que coletam dados básicos de contato e tráfego, o nosso gerador gratuito fornece a base estrutural ideal sem a necessidade de investimentos financeiros. Contudo, corporações de grande porte que realizam tratamentos de dados complexos ou transações financeiras de escala devem possuir assessoria especializada para auditorias contínuas."
  },
  {
    q: "Como devo atualizar a Política de Privacidade do meu site quando adicionar novos serviços ou cookies?",
    a: "Sempre que você implementar novos plugins de terceiros (como novas ferramentas de pixel de marketing, novos chats ao vivo ou novas ferramentas de email marketing), acesse novamente o nosso gerador, marque as novas caixas de serviços correspondentes e atualize a página de privacidade do seu site. Lembre-se de registrar no topo do documento a data da última modificação."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Gerador de Política de Privacidade Mestre das Contas",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online gratuita para gerar termos de privacidade em conformidade técnica com a LGPD e o Google AdSense."
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    }
  ]
};

export default function PrivacyGeneratorPage() {
  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HEADER --- */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-6 w-full">
          <PageHeader 
            title="Gerador de Política de Privacidade"
            description="A ferramenta essencial para quem tem site, blog ou e-commerce. Gere um documento jurídico compatível com a LGPD (Brasil) e os requisitos rigorosos do Google AdSense."
            category="Jurídico & Web"
            icon={<ShieldCheck size={32} className="text-emerald-600" />}
            variant="tools"
            categoryColor="emerald"
            badge="Compatível LGPD & GDPR"
            breadcrumbs={[
              { label: "Ferramentas", href: "/ferramentas" },
              { label: "Gerador Privacidade" }
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 flex flex-col gap-4 w-full">
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="privacidade_top" format="horizontal" variant="software" />
        </div>

        {/* PRIVACIDADE E SEGURANÇA (E-E-A-T) */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300 mb-2">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Conformidade com ANPD: Os termos gerados atendem as regras do Brasil. Proteja o seu blog contra penalidades financeiras.</span>
        </div>

        <PrivacyBadge />
      </div>

      {/* --- FERRAMENTA --- */}
      <div className="max-w-5xl mx-auto px-4 pb-12 w-full">
        <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
          <PrivacyPolicyGenerator />
        </Suspense>
        <div className="mt-8 print:hidden max-w-5xl mx-auto">
          <DisclaimerBox />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 w-full">
        
        {/* --- FEATURES GRID --- */}
        <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-sm">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Conformidade Legal</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Estruture suas políticas de privacidade sob os pilares da LGPD nacional e GDPR europeia de forma simples.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                    <Scale size={12}/> Evite Advertências Jurídicas
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-blue-50 dark:bg-blue-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
                    <Lock size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Aprovação no AdSense</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Cumpra a cláusula de privacidade do Google sobre cookies e pixel de marketing sem fricções ou reprovações.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-purple-50 dark:bg-purple-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 shadow-sm">
                    <Globe size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Exportação Flexível</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Copie a documentação jurídica em formato HTML limpo ou Texto Puro para colagem imediata na sua plataforma web.
                </p>
            </div>
        </section>

        {/* --- ARTIGO EDUCACIONAL DE ALTA DENSIDADE --- */}
        <div className="max-w-4xl mx-auto w-full space-y-8">
            
            {/* Review Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">
                    <ShieldCheck size={28} />
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Segurança Certificada</p>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Controle LGPD</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic mt-1">
                        "O uso do Mestre das Contas elimina auditorias demoradas para rotinas de tráfego usuais. A ferramenta gera as políticas de privacidade localmente no seu computador com isolamento absoluto de segurança."
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm w-full">
                <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-emerald-500 pl-4 flex items-center gap-3">
                    <Star className="text-emerald-500 fill-emerald-500 animate-pulse" /> O Escudo Jurídico Web: Por Que Sua Política É Crítica
                </h2>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Imagine que você decidiu pilotar uma lancha rápida e motorizada em águas profundas e movimentadas de alto-mar.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Contudo, você não levou coletes salva-vidas a bordo e deixou a tampa do tanque de combustível inteiramente escancarada.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  A verdade é que administrar um site ou blog comercial sem uma Política de Privacidade adequada funciona de forma idêntica.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Os fiscais do ecossistema de dados não buscam apenas fraudes intencionais ou invasões massivas de cibercriminosos.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Nós compreendemos que o simples uso do rastreamento do Google Analytics sem o consentimento livre já viola a legislação.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Aí é que está o segredo: ao formalizar os processos de tratamento de dados na sua página, você ganha um escudo inquebrável.
                </p>

                {/* Tabela Comparativa de Compliance - Tabela HTML */}
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mt-10 mb-4">Planilha de Proteção: Comparando Requisitos da LGPD e Status Legal</h3>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                   Compreender os termos regulatórios evita processos civis e otimiza a credibilidade do seu domínio na rede de pesquisa.
                </p>

                <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                    <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Requisito Legal</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Nível de Obrigatoriedade</th>
                                <th className="px-6 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/10">Principal Benefício Técnico</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Relação Direta com Google AdSense</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Política de Privacidade</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-emerald-50/10 dark:bg-emerald-950/10">Obrigatório por Lei (LGPD)</td>
                                <td className="px-6 py-4 text-sm text-emerald-600">Elimina risco de advertências da ANPD</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold">Fator crítico obrigatório para aprovação</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Termos e Condições de Uso</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Recomendado (Melhor Prática)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Protege propriedade intelectual e marca</td>
                                <td className="px-6 py-4 text-sm text-slate-500">Opcional para a rede de anúncios</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Banner de Consentimento Cookies</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-emerald-50/10 dark:bg-emerald-950/10">Obrigatório para Rastreamento</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Garante consentimento ativo do visitante</td>
                                <td className="px-6 py-4 text-sm text-slate-500">Altamente recomendado no mobile</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Registro de Consentimento Ativo</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Exigido para E-commerces / Leads</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Prova material de proteção em vistorias</td>
                                <td className="px-6 py-4 text-sm text-slate-500">Opcional em blogs de conteúdo</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                   O melhor de tudo? Ao confrontar as diretrizes técnicas na nossa planilha comparativa, fica claro que a Política de Privacidade é a base primária de qualquer governança de dados na rede mundial de computadores.
                </p>

                {/* Metáfora do Colete Salva-Vidas */}
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Scale className="text-emerald-500" /> A Metáfora do "Colete Salva-Vidas": Construindo Segurança Digital
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Para ilustrar a gravidade de esquecer essa página no rodapé do seu blog, nós adoramos fazer alusão ao colete salva-vidas na nossa embarcação de lazer.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  O mar representa a internet e o mercado de tráfego orgânico, repleto de ventos dinâmicos e eventuais tempestades inesperadas.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  O colete salva-vidas não impede a lancha de balançar com a força das ondas, tampouco garante que peixes não saltem no convés.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  No entanto, se a lancha sofrer uma colisão acidental com pedras ocultas sob a água (uma fiscalização governamental), o colete garante que todos flutuem.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Nossa ferramenta funciona fornecendo a você esse colete certificado de forma instantânea, permitindo que você navegue e fature com total tranquilidade mental.
                </p>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Sparkles className="text-emerald-500" /> Como Publicar Sua Política no WordPress, Wix ou Next.js
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Obter a redação ideal do termo de privacidade é apenas a etapa inicial. Agora, execute o processo de indexação no seu portal:
                </p>
                <ol className="space-y-4 marker:text-emerald-600 marker:font-bold">
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Crie uma Nova Página Estática:</strong> Nunca publique os termos em um post comum de blog. Crie uma página isolada com a URL amigável <code>/politica-de-privacidade</code>.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Cole o Código HTML ou Texto:</strong> Use o painel da nossa ferramenta para copiar o documento formatado e cole no editor da sua plataforma na aba de código-fonte.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Adicione o Link no Footer:</strong> Garanta que o link esteja presente no rodapé do tema global, tornando-o visível em todas as páginas, posts e categorias do seu site.
                    </li>
                </ol>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-emerald-500 mt-10 not-prose">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-emerald-600 dark:text-emerald-400"/> Advertência da ANPD
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Multas decorrentes de vazamento ou captação ilegal de dados no Brasil já estão em andamento. Proteja a saúde corporativa da sua marca executando processos transparentes e mantendo documentações completas na sua estrutura web.
                    </p>
                </div>
            </div>

            {/* Horizontal Ad */}
            <div className="w-full flex justify-center bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[100px] overflow-hidden py-4">
                <LazyAdUnit slot="privacidade_sidebar" format="horizontal" />
            </div>
        </div>

        <ExpertSignature author="Equipe Jurídica e de TI Mestre das Contas" updatedAt="Junho de 2026" />

        <SmartGlossaryLinker currentHref="/ferramentas/gerador-privacidade" />

        <SmartCrossLinker currentHref="/ferramentas/gerador-privacidade" category="ferramentas" />

        {/* --- FAQ SECTION ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
        <section id="faq" className="max-w-4xl mx-auto w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-emerald-600 dark:text-emerald-400 shrink-0" size={32} /> Tira-Dúvidas Definitivo
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Encontre respostas para as perguntas mais frequentes sobre o tratamento de dados pessoais de acordo com a LGPD.
            </p>

            <div className="space-y-4 not-prose">
              {faqs.map((faq, index) => (
                <details 
                  key={index}
                  className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 transition-all duration-300 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <span className="pr-4">{faq.q}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180 text-emerald-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Ad Unit Bottom */}
        <div className="w-full flex justify-center py-6">
             <LazyAdUnit slot="privacidade_bottom" format="auto" />
        </div>

      </div>
    </article>
  );
}

