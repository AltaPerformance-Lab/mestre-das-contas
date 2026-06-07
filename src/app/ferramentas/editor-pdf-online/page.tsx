import type { Metadata } from 'next';
import Link from 'next/link';
import PDFEditorWrapper from '@/components/pdf-editor/PDFEditorWrapper';
import PageHeader from '@/components/layout/PageHeader';
import SmartCrossLinker from '@/components/layout/SmartCrossLinker';
import SmartGlossaryLinker from '@/components/layout/SmartGlossaryLinker';
import GlossaryTerm from '@/components/ui/GlossaryTerm';
import { 
    FileText, ShieldCheck, Zap, Lock, Layers, 
    CheckCircle2, HelpCircle, Star, PenTool, 
    MousePointer2, Download, History, Monitor,
    Share2, Scale, Info
} from 'lucide-react';
import LazyAdUnit from '@/components/ads/LazyAdUnit';
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Editor de PDF Grátis 2026: Editar, Assinar e Juntar Online",
  description: "Adicione textos, assinaturas e imagens em seus arquivos PDF direto no navegador. Processamento client-side 100% seguro que protege seus dados pessoais!",
  keywords: [
    "editor pdf online", "editar pdf grátis", "juntar pdf", 
    "assinar pdf digitalmente", "preencher pdf", "pdf filler", 
    "combinar pdf", "anotar em pdf", "pdf gratuito"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/editor-pdf-online" },
  openGraph: {
    title: "Editor de PDF Ultimate - Mestre das Contas",
    url: "https://mestredascontas.com.br/ferramentas/editor-pdf-online",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://mestredascontas.com.br/opengraph/editor-pdf.jpg", width: 1200, height: 630, alt: "Editor de PDF Online" }]
  },
  robots: { index: true, follow: true }
};

// 7 FAQs Dinâmicas Sincronizadas
const faqs = [
  {
    q: "É realmente seguro fazer upload de documentos confidenciais neste editor?",
    a: "Sim, é 100% seguro! Diferente de outros sites na internet, a nossa tecnologia funciona sob a arquitetura Client-Side. Isso significa que o arquivo PDF nunca é transmitido para servidores remotos e nem armazenado em bancos de dados. Todo o processamento e a criptografia ocorrem de forma local na memória do seu próprio navegador, garantindo conformidade absoluta com a LGPD."
  },
  {
    q: "Como posso juntar ou combinar vários arquivos PDF em um único documento?",
    a: "O procedimento é extremamente prático. Carregue o primeiro arquivo PDF na área principal do editor. Em seguida, na barra lateral esquerda, procure pela funcionalidade 'Juntar PDF' e selecione os demais arquivos. Nosso algoritmo os organizará em sequência e fará a unificação local instantaneamente. Depois, basta baixar o arquivo PDF combinado."
  },
  {
    q: "O editor de PDF adiciona alguma marca d'água ou logotipo comercial?",
    a: "Não, de forma alguma. O Mestre das Contas acredita em fornecer ferramentas limpas de nível profissional de forma gratuita. O documento editado será exportado em sua resolução original, sem nenhum acréscimo de logotipos comerciais, restrições ocultas ou marcas d'água intrusivas nas páginas."
  },
  {
    q: "Posso assinar contratos ou documentos digitais usando a tela de toque ou o mouse?",
    a: "Com certeza. O nosso editor oferece suporte completo para assinaturas e rubricas manuscritas. Se você estiver acessando por celular ou tablet, pode desenhar sua assinatura diretamente na tela de toque com o dedo ou caneta stylus. Caso esteja no computador, use o mouse. O resultado atua juridicamente como uma assinatura eletrônica simples."
  },
  {
    q: "É possível preencher campos de texto e formulários oficiais no PDF?",
    a: "Sim! Ao carregar formulários ou cadastros, selecione a ferramenta de caixa de texto no nosso painel de edição, clique exatamente sobre o campo que deseja preencher e digite os dados correspondentes. É a solução perfeita para regularizar cadastros governamentais ou preencher contracheques sem a necessidade de imprimir folhas."
  },
  {
    q: "Existe alguma limitação em relação ao tamanho dos arquivos PDF para edição?",
    a: "Não impomos nenhuma limitação de tamanho ou cotas de arquivos. Visto que o processamento do PDF roda integralmente de forma local no seu próprio computador ou smartphone (sem tráfego de dados), o único limitador real é o poder de processamento do seu próprio dispositivo. Isso permite que arquivos gigantes de centenas de páginas carreguem na hora."
  },
  {
    q: "Esta ferramenta de edição de PDF funciona em celulares Android ou iOS (iPhone)?",
    a: "Sim, perfeitamente! Toda a interface gráfica foi otimizada com responsividade mobile de ponta. Você pode carregar seus PDFs, assinar com o dedo, preencher dados contratuais, combinar várias páginas e baixar o arquivo final diretamente no navegador do seu smartphone ou tablet, com a mesma rapidez de um computador."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Editor de PDF Ultimate Mestre das Contas",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta completa para manipulação de arquivos PDF no navegador: Editar, Juntar, Assinar e Anotar.",
      "featureList": "Edição de Texto, Assinatura Digital, Fusão de Documentos, Privacidade Client-Side"
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

export default function PDFEditorPage() {
  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER COMPLETO --- */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-6 w-full">
             <PageHeader 
                title="Editor de PDF Ultimate"
                description="A ferramenta definitiva. Edite textos, assine contratos e junte arquivos PDF direto no navegador. Sem limites, sem cadastro e com privacidade absoluta."
                category="Ferramentas Úteis"
                icon={<FileText size={32} className="text-violet-600" />}
                variant="default"
                categoryColor="violet"
                badge="Destaque 2026"
                breadcrumbs={[
                    { label: "Ferramentas", href: "/ferramentas" },
                    { label: "Editor PDF" }
                ]}
             />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 flex flex-col gap-4 w-full">
        {/* ANÚNCIO TOPO (PADRÃO) */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="pdf_top" format="horizontal" variant="software" />
        </div>

        {/* PRIVACIDADE E SEGURANÇA (E-E-A-T) */}
        <div className="bg-violet-50/50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-violet-700 dark:text-violet-300 mb-2">
          <ShieldCheck size={18} className="text-violet-600 shrink-0" />
          <span>Editor de PDF com Privacidade Total: Seus documentos não saem do seu navegador. Processamento 100% local em 2026.</span>
        </div>
        
        <PrivacyBadge />
      </div>

      {/* --- ÁREA DO EDITOR (CLEAN WRAPPER) --- */}
      <div className="w-full flex-grow min-h-[600px] h-[80vh] bg-slate-100 dark:bg-slate-900 relative shadow-inner border-b border-slate-200 dark:border-slate-800">
         <PDFEditorWrapper />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 w-full">
        
        {/* --- FEATURES GRID --- */}
        <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-violet-50 dark:bg-violet-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6 shadow-sm">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Privacidade Garantida</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Seus arquivos <strong>nunca são enviados</strong> para nossos servidores. Toda a mágica acontece no seu navegador usando tecnologia WebAssembly.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 px-3 py-1 rounded-full">
                    <Lock size={12}/> Dados Criptografados Localmente
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-sm">
                    <Zap size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Instantâneo e Leve</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Esqueça filas de upload e download. Como o arquivo já está no seu PC, a abertura e a edição são instantâneas, mesmo para arquivos grandes.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-amber-50 dark:bg-amber-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 shadow-sm">
                    <PenTool size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Assinatura Real</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Assine documentos digitalmente com facilidade. Suporte para mouse, tela de toque ou caneta stylus para rubricas precisas.
                </p>
            </div>
    </section>

    {/* --- ARTIGO EDUCACIONAL DE ALTA DENSIDADE --- */}
    <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* Review Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                    <ShieldCheck size={28} />
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Conformidade e LGPD</p>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Tecnologia e Segurança</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic mt-1">
                        "Esta ferramenta utiliza a biblioteca pdf-lib com processamento local em WebAssembly. Nenhuma informação pessoal ou conteúdo de documentos é transmitido para nossos servidores, garantindo conformidade total com a LGPD e privacidade bancária."
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm w-full">
                <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-violet-500 pl-4 flex items-center gap-3">
                    <Star className="text-violet-500 fill-violet-500" /> A Nova Era Digital: Por Que Editar PDFs de Forma 100% Local?
                </h2>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Imagine que você recebeu um contrato importante em formato PDF para assinar, contendo dados sensíveis do seu faturamento comercial anual.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  A verdade é que a imensa maioria dos conversores e editores comuns de PDF faz o upload forçado das suas informações para servidores distantes na nuvem.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Durante esse processo de envio pela rede mundial de computadores, seus arquivos podem ser interceptados ou armazenados permanentemente por terceiros sem a sua aprovação.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Nós compreendemos perfeitamente o valor crucial do sigilo de dados in rotinas administrativas e comerciais modernas.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  É justamente por isso que estruturamos o **Editor de PDF Ultimate** com tecnologia local baseada em WebAssembly diretamente no seu navegador.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Aí é que está o segredo: ao processar os arquivos inteiramente na memória RAM do seu aparelho, você edita com velocidade recorde e com privacidade absoluta.
                </p>

                {/* Tabela Comparativa de Documentação PDF - Tabela HTML */}
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mt-10 mb-4">Planilha Técnica: Editor PDF Local vs Editor PDF Nuvem vs Leitor PDF Comum</h3>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                   Compreender os bastidores de manipulação de documentos ajuda você a evitar perdas de arquivos e garante a proteção da LGPD.
                </p>

                <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                    <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Característica Técnica</th>
                                <th className="px-6 py-4 text-sm font-bold text-violet-600 dark:text-violet-400 bg-violet-50/10 dark:bg-violet-950/10">Editor PDF Local (Nosso)</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Editor PDF Clássico (Nuvem)</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Leitor PDF Padrão (Navegador)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Vazamento de Arquivos</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-violet-50/10 dark:bg-violet-950/10">Impossível (Zero tráfego à web)</td>
                                <td className="px-6 py-4 text-sm text-red-500">Possível (Upload para servidor)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Impossível (Apenas leitura)</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Assinatura à Mão Livre</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-violet-50/10 dark:bg-violet-950/10">Sim (Dedo, caneta ou mouse)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Sim (Limitado por planos pagos)</td>
                                <td className="px-6 py-4 text-sm text-red-500">Não suportado</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Marca d'Água no Download</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-violet-50/10 dark:bg-violet-950/10">Não possui (100% Limpo)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Sim (Exige assinatura premium)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Nula (Não salva alterações)</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Tempo de Processamento</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-violet-50/10 dark:bg-violet-950/10">Instantâneo (Sem filas de rede)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Lento (Depende do upload da rede)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Instantâneo (Apenas leitura)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                   O melhor de tudo? Como você pode ver na planilha técnica, o processamento local anula vulnerabilidades e traz total conformidade de segurança para o seu dia a dia.
                </p>

                {/* Metáfora do Envelope de Cera */}
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Lock className="text-violet-500" /> A Metáfora do "Lacre de Cera": Como o PDF Protege Seus Dados
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Para ilustrar a relevância de assinar e editar PDFs de forma segura, nós adoramos usar a analogia das cartas medievais com lacre de cera real.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  O PDF é como um documento impresso e lacrado com cera quente. A leitura dele é livre, mas a edição exige quebrar o lacre e refazê-lo.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Se você mandar seu envelope para uma agência de selos no exterior refazer o lacre, os segredos contratuais podem ser copiados.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Nosso editor funciona fornecendo a você o seu próprio sinete metálico e cera quente local, direto na sua mesa de trabalho.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Você mesmo quebra o lacre, anota as informações necessárias, desenha sua <GlossaryTerm slug="assinatura-digital-documentos">assinatura</GlossaryTerm> de rubrica e sela o envelope na mesma hora, sem que ele saia da sua vista.
                </p>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Share2 className="text-emerald-500" /> Como Combinar Vários PDFs em Menos de 1 Minuto
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Juntar relatórios de vendas ou anexar comprovantes em um mesmo arquivo A4 é extremamente simples com a nossa plataforma:
                </p>
                <ol className="space-y-4 marker:text-violet-600 marker:font-bold">
                    <li className="text-slate-700 dark:text-slate-300 text-sm">Abra a sua primeira página ou arquivo PDF de referência na nossa área do editor.</li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">Na aba de controle de visualização rápida, clique na funcionalidade <strong>"Juntar PDF"</strong>.</li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">Selecione o segundo arquivo no seu computador ou dispositivo móvel.</li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">O sistema anexa as novas páginas ao final do documento automaticamente, em tempo real.</li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">Clique em <strong>"Baixar PDF"</strong> para exportar e salvar o documento unificado limpo no seu dispositivo.</li>
                </ol>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-violet-500 mt-10 not-prose">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 flex items-center gap-2">
                        <Monitor size={20} className="text-violet-600 dark:text-violet-400"/> Dica de Validade Jurídica
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        A rubrica à mão livre e a inserção de assinaturas eletrônicas simples por meio de ferramentas gráficas locais possuem validade plena sob o amparo da Medida Provisória nº 2.200-2/01, servindo para a imensa maioria dos contratos comerciais B2B diários.
                    </p>
                </div>
            </div>

            {/* Horizontal Ad */}
            <div className="w-full flex justify-center bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[100px] overflow-hidden py-4">
                <LazyAdUnit slot="pdf_sidebar" format="horizontal" />
            </div>

        </div>

        <SmartGlossaryLinker currentHref="/ferramentas/editor-pdf-online" />
        <SmartCrossLinker currentHref="/ferramentas/editor-pdf-online" category="ferramentas" />

        {/* --- FAQ SECTION ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
        <section id="faq" className="max-w-4xl mx-auto w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-violet-600 dark:text-violet-400 shrink-0" size={32} /> Tira-Dúvidas Definitivo
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Encontre suporte técnico e respostas diretas para as dúvidas mais recorrentes sobre a edição de PDF no navegador.
            </p>

            <div className="space-y-4 not-prose">
              {faqs.map((faq, index) => (
                <details 
                  key={index}
                  className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 transition-all duration-300 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <span className="pr-4">{faq.q}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180 text-violet-500">
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

        <ExpertSignature author="Equipe de Tecnologia Mestre das Contas" updatedAt="Junho de 2026" />
        {/* Ad Unit Bottom */}
        <div className="w-full flex justify-center py-6">
             <LazyAdUnit slot="pdf_bottom" format="auto" />
        </div>

      </div>
    </article>
  );
}
