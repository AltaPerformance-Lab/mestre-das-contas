import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppGenerator from "@/components/tools/WhatsAppGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import { 
  MessageCircle, Zap, ShieldCheck, TrendingUp, 
  HelpCircle, CheckCircle2, Smartphone, Globe, Star, Sparkles, AlertTriangle
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export const metadata: Metadata = {
  title: "Gerador de Link WhatsApp Grátis 2026 | Criar Link Curto wa.me",
  description: "Crie links curtos para WhatsApp (wa.me) com mensagem personalizada em 1 clique. Ideal para Bio do Instagram e Vendas em 2026. Grátis e sem cadastro.",
  keywords: [
    "gerador link whatsapp", "link whatsapp", "link zap", "whatsapp api link", 
    "link bio instagram", "api whatsapp", "gerar link whatsapp gratis"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-link-whatsapp" },
  openGraph: {
    title: "Gerador de Link WhatsApp | Mestre das Contas",
    description: "Crie um link direto para o seu WhatsApp com mensagem pré-definida e impulsione as suas conversas em segundos.",
    url: "https://mestredascontas.com.br/ferramentas/gerador-link-whatsapp",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://mestredascontas.com.br/opengraph/whatsapp-link.jpg", width: 1200, height: 630, alt: "Gerador de Link WhatsApp" }]
  },
  robots: { index: true, follow: true }
};

// 7 FAQs Dinâmicas Sincronizadas
const faqs = [
  {
    q: "O link gerado para o WhatsApp possui alguma data de validade ou expira depois de um tempo?",
    a: "Não! O link direto gerado por nossa ferramenta é permanente e nunca expira. Ele é construído utilizando o protocolo oficial da API do WhatsApp. Portanto, enquanto você mantiver o mesmo número de telefone ativo e cadastrado na operadora, o seu link continuará funcionando por tempo indeterminado e sem qualquer custo adicional."
  },
  {
    q: "Esta ferramenta funciona perfeitamente para contas do WhatsApp Business (Comercial)?",
    a: "Sim, funciona com perfeição em ambas as versões. A API do WhatsApp identifica automaticamente o tipo de conta vinculado ao seu número de celular. Dessa forma, quando um cliente clica no link, a conversa é aberta perfeitamente no WhatsApp Business ou no aplicativo pessoal, dependendo de qual deles estiver instalado no dispositivo."
  },
  {
    q: "O Mestre das Contas armazena ou coleta o meu número de telefone ou as minhas mensagens digitadas?",
    a: "Absolutamente não! A nossa ferramenta adota uma filosofia rígida de privacidade sob a arquitetura Client-Side. Todos os dados digitados são formatados localmente na memória do seu navegador. Não salvamos registros de contatos, números ou mensagens comerciais em nenhum servidor nosso, garantindo conformidade total com a LGPD."
  },
  {
    q: "Como posso adicionar emojis e quebras de linha na mensagem personalizada do meu link?",
    a: "Você pode digitar a sua mensagem normalmente na ferramenta, incluindo emojis e pressionando a tecla Enter para pular linhas. Nosso algoritmo decodifica esses caracteres automaticamente no formato percent-encoding exigido pelo WhatsApp (como converter espaços em %20 e quebras de linha em %0A), mantendo o design do seu texto intacto."
  },
  {
    q: "Qual é a real diferença entre o link 'wa.me' oficial e outros encurtadores de links comerciais?",
    a: "A verdade é que o link 'wa.me' é o formato oficial e seguro do próprio WhatsApp. Encurtadores genéricos de terceiros frequentemente causam atrasos de redirecionamento, exibem telas intermediárias de publicidade intrusiva ou podem ser bloqueados pelas redes sociais. O nosso link vai direto ao ponto, eliminando fricção na navegação do cliente."
  },
  {
    q: "Como colocar o link do WhatsApp na minha biografia do Instagram de forma profissional?",
    a: "Para colocar o link na bio do Instagram, abra o aplicativo móvel, vá até o seu perfil, clique em 'Editar perfil' e insira a URL gerada (o link wa.me) no campo 'Links' ou 'Site'. Recomendamos usar uma chamada atraente para ação no seu perfil (como 'Fale conosco no WhatsApp pelo link abaixo') para maximizar os cliques diários."
  },
  {
    q: "Existe algum limite diário de links que eu posso gerar gratuitamente nesta plataforma?",
    a: "Não há absolutamente nenhum limite! Você pode usar a ferramenta quantas vezes desejar para criar links comerciais para diferentes campanhas, números de atendentes, vendedores ou mensagens promocionais variadas. O serviço é 100% gratuito e ilimitado para apoiar o empreendedorismo nacional em 2026."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Gerador de Link WhatsApp Mestre das Contas",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online gratuita para gerar links de conversa direta no WhatsApp com mensagem pré-definida de forma segura."
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

export default function GeradorWhatsAppPage() {
  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HEADER --- */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-6 w-full">
          <PageHeader 
            title="Gerador de Link WhatsApp"
            description="Facilite o contato comercial imediatamente. Crie um link curto wa.me direto que abre conversas instantâneas com mensagens pré-definidas para acelerar suas vendas."
            category="Ferramentas Úteis"
            icon={<MessageCircle size={32} className="text-emerald-600" />}
            variant="default"
            categoryColor="emerald"
            badge="Grátis & Ilimitado"
            breadcrumbs={[
              { label: "Ferramentas", href: "/ferramentas" },
              { label: "Link WhatsApp" }
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 flex flex-col gap-4 w-full">
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="whatsapp_top" format="horizontal" variant="software" />
        </div>

        {/* PRIVACIDADE E SEGURANÇA (E-E-A-T) */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300 mb-2">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Segurança em Vendas: A geração do link wa.me utiliza a API oficial. Nós nunca armazenamos ou coletamos seus números de telefone.</span>
        </div>

        <PrivacyBadge />
      </div>

      {/* --- FERRAMENTA PRINCIPAL --- */}
      <div className="max-w-5xl mx-auto px-4 pb-12 w-full">
        <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
          <WhatsAppGenerator />
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
                    <Zap size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Redirecionamento Rápido</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Elimine etapas irritantes e faça seu cliente entrar em contato direto em menos de um piscar de olhos.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                    <Smartphone size={12}/> Link Curto wa.me Oficial
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-blue-50 dark:bg-blue-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
                    <TrendingUp size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Escalada de Vendas</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Links persas e mensuráveis para perfis no Instagram e anúncios que aumentam a conversão digital instantaneamente.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-purple-50 dark:bg-purple-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 shadow-sm">
                    <Globe size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Independência de Rede</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Use o link universal em panfletos físicos, propostas em PDF, emails, blogs ou mensagens diretas.
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
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Conformidade e LGPD</p>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Segurança Digital</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic mt-1">
                        "O Mestre das Contas utiliza a API nativa local. Isso assegura que nenhum número telefônico de cliente seja guardado ou traficado para disparo indesejado de spam, mantendo a reputação da sua marca intocável."
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm w-full">
                <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-emerald-500 pl-4 flex items-center gap-3">
                    <Star className="text-emerald-500 fill-emerald-500 animate-pulse" /> A Rodovia da Conversão Digital: O Segredo de Gerar Links
                </h2>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Imagine que o seu potencial cliente acabou de ver um story atraente sobre os seus serviços de consultoria comercial.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Se você exige que essa pessoa pegue uma caneta, anote seu telefone, adicione nos contatos do celular e só então digite uma saudação...
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  A verdade é que você está forçando esse cliente a atravessar um labirinto cheio de trânsito lento e semáforos fechados.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  No dinâmico mercado digital, cada etapa extra de fricção elimina cerca de 40% das suas chances diárias de fechamento de novos negócios.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Nós compreendemos que o sucesso comercial moderno é um jogo de milissegundos e conexões diretas.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Aí é que está o segredo: ao converter seu telefone em um <GlossaryTerm slug="api-whatsapp-links-diretos">link wa.me</GlossaryTerm> direto, você constrói uma ponte aérea limpa e instantânea.
                </p>

                {/* Tabela Comparativa de Métodos - Tabela HTML */}
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mt-10 mb-4">Tabela Comparativa: Diferentes Formas de Iniciar um Chat no WhatsApp</h3>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                   Compreenda as vantagens e desvantagens de cada método de integração para escolher a estratégia ideal para a sua empresa.
                </p>

                <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                    <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Forma de Contato</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Ações Exigidas do Cliente</th>
                                <th className="px-6 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/10">Fricção de Contato</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Impacto Médio na Conversão</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Link wa.me Oficial (Nosso)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-mono">1 único clique na tela</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-emerald-50/10 dark:bg-emerald-950/10">Nula (Excelente)</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold">Aumento de até 40% nas conversões</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Número de Telefone Puro</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Digitar, salvar contato, atualizar lista e escrever</td>
                                <td className="px-6 py-4 text-sm text-red-500 font-bold">Altíssima (Inadequado)</td>
                                <td className="px-6 py-4 text-sm text-red-500">Queda massiva nas tentativas de contato</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Encurtadores Pagos</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Ver anúncio intermediário e esperar 5s</td>
                                <td className="px-6 py-4 text-sm text-amber-500 font-bold">Média (Gera desconfiança)</td>
                                <td className="px-6 py-4 text-sm text-amber-500">Desistência devido ao tempo de espera</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Formulários Tradicionais</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Preencher 5 ou 6 campos de dados</td>
                                <td className="px-6 py-4 text-sm text-amber-500 font-bold">Alta (Barreira clássica)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Conversão lenta em longo prazo</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                   O melhor de tudo? Ao analisar nossa tabela técnica comparativa, fica explícito que a simplicidade operacional do protocolo wa.me ganha em disparada de qualquer outro canal.
                </p>

                {/* Metáfora da Rodovia Expressa */}
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Sparkles className="text-emerald-500" /> A Metáfora da "Rodovia Expressa": O Poder dos Links Diretos
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Para explicar de forma simples por que a nossa ferramenta é a queridinha dos assessores de marketing em 2026, gostamos de usar a analogia das estradas de pedágio automático.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Pedir para alguém salvar seu número e mandar mensagem é como forçar um motorista a parar no guichê manual, procurar moedas trocadas, pagar e aguardar a cancela levantar.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  O link do WhatsApp Mestre das Contas funciona como uma tag de pedágio expresso instalada no para-brisa.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  O veículo (seu cliente) passa pela cancela a 80 km/h sem parar, iniciando o bate-papo de vendas imediatamente com a mensagem pronta de saudação na tela do smartphone.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Isso evita a dispersão, impede que ele mude de ideia no caminho e reduz a fadiga de decisão do comprador.
                </p>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500" /> Estratégias Avançadas de Marketing no WhatsApp para 2026
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Ter o link é apenas o primeiro passo estratégico. Veja como os grandes profissionais usam essa tecnologia para explodir seus faturamentos:
                </p>
                <ol className="space-y-4 marker:text-emerald-600 marker:font-bold">
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Mensagens de Origem Específica:</strong> Crie um link diferente para cada campanha. Se o cliente veio da Bio, use "Olá, vim pelo Instagram!". Se veio do Blog, use "Vim pelo artigo do Mestre das Contas!". Isso ajuda você a mapear o canal de vendas mais rentável.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Integração com <GlossaryTerm slug="qr-code-estatico-dinamico">QR Code</GlossaryTerm>:</strong> Converta seu link curto wa.me em um código visual. Imprima-o em cartões de visitas, embalagens de delivery ou cardápios de restaurantes para facilitar o contato físico.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Bandeiras de Campanhas no Google Ads:</strong> Insira o link direto como extensão de chamada ou em anúncios gráficos mobile para acelerar o processo comercial.
                    </li>
                </ol>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-emerald-500 mt-10 not-prose">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-emerald-600 dark:text-emerald-400"/> Aviso aos Empreendedores
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Fazer com que o seu cliente execute tarefas manuais desnecessárias mata a conversão digital. Agilize o atendimento da sua empresa e lidere o mercado B2B ou varejista implementando acessos expressos e mensagens curtas otimizadas.
                    </p>
                </div>
            </div>

            {/* Horizontal Ad */}
            <div className="w-full flex justify-center bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[100px] overflow-hidden py-4">
                <LazyAdUnit slot="whatsapp_sidebar" format="horizontal" />
            </div>
        </div>

        <ExpertSignature author="Equipe de Marketing e Tecnologia Mestre das Contas" updatedAt="Junho de 2026" />
        <SmartGlossaryLinker currentHref="/ferramentas/gerador-link-whatsapp" />
        <SmartCrossLinker currentHref="/ferramentas/gerador-link-whatsapp" category="ferramentas" />

        {/* --- FAQ SECTION ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
        <section id="faq" className="max-w-4xl mx-auto w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-emerald-600 dark:text-emerald-400 shrink-0" size={32} /> Tira-Dúvidas Definitivo
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Encontre respostas para as perguntas mais recorrentes sobre a geração de links curtos do WhatsApp.
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
             <LazyAdUnit slot="whatsapp_bottom" format="auto" />
        </div>

      </div>
    </article>
  );
}