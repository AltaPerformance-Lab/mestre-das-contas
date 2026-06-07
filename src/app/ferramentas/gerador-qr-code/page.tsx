import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
// O Wrapper garante que o componente pesado só carregue no cliente (sem erro 500)
import QRCodeWrapper from "@/components/calculators/QRCodeWrapper";
import { 
  QrCode, Zap, ShieldCheck, Ban, 
  Smartphone, Wifi, CheckCircle2, Globe, 
  AlertTriangle, MousePointerClick, Printer, Star, Sparkles, HelpCircle, Eye
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. SEO TÉCNICO (METADATA) ---
export const metadata: Metadata = {
  title: "Gerador de QR Code Grátis 2026 | Criar com Logo e Vitalício",
  description: "Crie QR Codes estáticos personalizados com cores e logotipo grátis. Códigos vitalícios em alta resolução prontos para imprimir e divulgar seu negócio!",
  keywords: [
    "gerador de qr code", "criar qr code gratis", "qr code com logo", 
    "qr code wifi", "qr code estatico", "qr code pix", "como fazer qr code"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-qr-code" },
  openGraph: {
    title: "Gerador de QR Code Grátis e Vitalício | Mestre das Contas",
    url: "https://mestredascontas.com.br/ferramentas/gerador-qr-code",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://mestredascontas.com.br/opengraph/gerador-qrcode.jpg", width: 1200, height: 630, alt: "Gerador de QR Code" }]
  },
  robots: { index: true, follow: true }
};

// 7 FAQs Dinâmicas Sincronizadas
const faqs = [
  {
    q: "O QR Code gerado nesta ferramenta possui alguma data de validade ou expira depois de um tempo?",
    a: "Não! O QR Code gerado em nosso portal é do tipo estático e vitalício. Isso significa que as informações estão codificadas e estruturadas fisicamente nos pixels do código. Ele nunca expira, nunca exibirá telas de propaganda intermediárias e funcionará por tempo indeterminado e de forma 100% gratuita."
  },
  {
    q: "Qual é a diferença real entre um QR Code Estático e um QR Code Dinâmico?",
    a: "Veja bem, o QR Code Estático converte seus dados diretamente em pontos pretos e brancos gravados em definitivo. Ele não exige intermediários e funciona para sempre de graça. Já o QR Code Dinâmico armazena apenas um link curto redirecionador que pertence a um servidor de terceiros. Se a plataforma de terceiros sair do ar ou exigir cobranças e você não pagar, o código deixa de funcionar na hora."
  },
  {
    q: "Posso personalizar as cores e inserir a logomarca da minha empresa no centro do QR Code?",
    a: "Sim, perfeitamente! A nossa ferramenta disponibiliza opções avançadas de personalização. Você pode configurar cores exclusivas para os blocos frontais e para o fundo do código, além de fazer upload da sua logomarca institucional. A imagem é incorporada respeitando as margens técnicas de segurança visual."
  },
  {
    q: "O Mestre das Contas armazena ou tem acesso aos links, senhas ou dados bancários inseridos?",
    a: "Absolutamente não! A segurança do usuário é nossa prioridade absoluta. Todo o processamento de compilação da imagem do QR Code funciona localmente no seu computador ou celular (Client-Side). Nenhuma informação de chaves Pix, senhas de redes Wi-Fi locais ou dados comerciais é transmitida para nossos servidores."
  },
  {
    q: "Qual formato de arquivo devo baixar para redes sociais e qual usar para impressões gráficas?",
    a: "Para publicações digitais comuns, envio por aplicativos de mensagens e posts nas redes sociais, o formato PNG é ideal e de carregamento leve. Caso pretenda imprimir o código em banners gigantes, cardápios físicos de restaurantes, displays ou cartazes, selecione o formato SVG (vetor), pois ele permite escalabilidade infinita de tamanho sem perda de definição."
  },
  {
    q: "O que é o nível de correção de erro de um QR Code e como ele afeta a leitura pela câmera?",
    a: "A verdade é que a correção de erros é uma tecnologia matemática (Reed-Solomon) integrada ao QR Code. Ela cria redundância de dados nos pixels, permitindo que a imagem seja lida mesmo se até 30% da sua superfície física sofra arranhões, esteja amassada no papel impresso ou seja bloqueada pela inserção de um logotipo corporativo central."
  },
  {
    q: "Por que algumas câmeras de celulares encontram dificuldades para ler o código?",
    a: "Geralmente, isso ocorre devido à falta de contraste cromático adequado (como imprimir um código cinza-claro sobre papel branco). Para leituras limpas e instantâneas, utilize sempre cores escuras para os blocos da frente e fundo claro de alta luminosidade (de preferência o padrão clássico preto no branco), além de garantir uma iluminação física local ideal no momento do escaneamento."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Gerador de QR Code Mestre das Contas",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta profissional para criação de códigos QR estáticos de alta resolução sem custo com total privacidade."
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

export default function QRCodePage() {
  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HEADER --- */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-6 w-full">
          <PageHeader 
            title="Gerador de QR Code Grátis"
            description="Crie, personalize e baixe de forma vitalícia. Gere códigos QR para Pix, redes de Wi-Fi e links da internet que nunca expiram. Sem taxas ocultas."
            category="Ferramentas Úteis"
            icon={<QrCode size={32} className="text-violet-600" />}
            variant="default" 
            categoryColor="violet"
            badge="Vitalício & 100% Estático"
            breadcrumbs={[
              { label: "Ferramentas", href: "/ferramentas" },
              { label: "Gerador QR Code" }
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 flex flex-col gap-4 w-full">
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="qrcode_top" format="horizontal" variant="software" />
        </div>

        {/* PRIVACIDADE E SEGURANÇA (E-E-A-T) */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300 mb-2">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Segurança Tecnológica: A geração dos pixels é feita diretamente pelo seu processador de forma isolada e local.</span>
        </div>

        <PrivacyBadge />
      </div>

      {/* --- FERRAMENTA PRINCIPAL --- */}
      <div className="max-w-5xl mx-auto px-4 pb-12 w-full">
        <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
          <QRCodeWrapper />
        </Suspense>
        <div className="mt-8 print:hidden max-w-5xl mx-auto">
          <DisclaimerBox />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 w-full">
        
        {/* --- FEATURES GRID --- */}
        <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-violet-50 dark:bg-violet-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6 shadow-sm">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Segurança Militar</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    As informações bancárias e de redes são codificadas sob isolamento de dados no lado do cliente.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 px-3 py-1 rounded-full">
                    <Ban size={12}/> Nunca Expira
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-blue-50 dark:bg-blue-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
                    <Printer size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Vetorial SVG</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Exporte em vetores escaláveis perfeitos para impressões em grandes dimensões de comunicação visual.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-amber-50 dark:bg-amber-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 shadow-sm">
                    <Sparkles size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Estilos Avançados</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Adicione a sua logomarca corporativa, selecione paletas de cores harmônicas e aumente a conversão visual.
                </p>
            </div>
        </section>

        {/* --- ARTIGO EDUCACIONAL DE ALTA DENSIDADE --- */}
        <div className="max-w-4xl mx-auto w-full space-y-8">
            
            {/* Review Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-violet-100 dark:bg-violet-900/30 p-3 rounded-xl text-violet-600 dark:text-violet-400 shrink-0">
                    <ShieldCheck size={28} />
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Conformidade e Sigilo</p>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Tecnologia Criptográfica</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic mt-1">
                        "O uso do Mestre das Contas assegura que nenhuma informação bancária ou comercial saia do navegador. O processamento criptográfico ocorre localmente por WebAssembly, mantendo total privacidade do seu negócio."
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm w-full">
                <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-violet-500 pl-4 flex items-center gap-3">
                    <Star className="text-violet-500 fill-violet-500 animate-pulse" /> A Revolução dos Quadradinhos: O Guia de Uso Estratégico
                </h2>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Imagine que você mandou imprimir 500 folhetos institucionais premium para divulgar o menu digital da sua pizzaria.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Entretanto, uma semana após a distribuição física, você descobre com pavor que o QR Code gratuito expirou e exibe um erro de cobrança.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  A verdade é que essa armadilha do <GlossaryTerm slug="qr-code-estatico-dinamico">código dinâmico</GlossaryTerm> prejudica diariamente dezenas de pequenos comerciantes e profissionais autônomos.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Grandes plataformas prometem acessos sem taxas e de forma velada transformam o link em um redirecionamento pago oculto.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Nós compreendemos que para as rotinas corporativas diárias, a robustez técnica do código estático é inegociável.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Aí é que está o segredo: ao codificar a informação diretamente na matriz de pontos, você ganha independência absoluta de servidores com o <GlossaryTerm slug="qr-code-estatico-dinamico">código estático</GlossaryTerm>.
                </p>

                {/* Tabela Comparativa de QR Code - Tabela HTML */}
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mt-10 mb-4">Planilha Técnica: QR Code Estático vs Dinâmico vs Código de Barras</h3>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                   Analise os formatos de códigos bidimensionais para planejar a sua comunicação corporativa física ou online de forma correta.
                </p>

                <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                    <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Característica Técnica</th>
                                <th className="px-6 py-4 text-sm font-bold text-violet-600 dark:text-violet-400 bg-violet-50/10 dark:bg-violet-950/10">QR Code Estático (Nosso)</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">QR Code Dinâmico Padrão</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Código de Barras Clássico</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Expiração de Link</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-violet-50/10 dark:bg-violet-950/10">Nunca expira (Vitalício e Estável)</td>
                                <td className="px-6 py-4 text-sm text-red-500">Expira se não pagar mensalidade</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold">Nunca expira (Apenas numérico)</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Permite Logotipo Central</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-violet-50/10 dark:bg-violet-950/10">Sim (Até 30% de cobertura)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Sim (Sob licenças premium)</td>
                                <td className="px-6 py-4 text-sm text-red-500">Não suportado</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Edição Pós-Impressão</td>
                                <td className="px-6 py-4 text-sm text-red-500 bg-violet-50/10 dark:bg-violet-950/10">Não permite (Fixo nos pixels)</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold">Sim (Edição do link de destino)</td>
                                <td className="px-6 py-4 text-sm text-red-500">Não aplicável</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Capacidade de Caracteres</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-violet-50/10 dark:bg-violet-950/10">Altíssima (Até 4.296 alfanuméricos)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Baixa (URL encurtada)</td>
                                <td className="px-6 py-4 text-sm text-red-500">Baixíssima (Apenas sequências numéricas)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                   O melhor de tudo? Como você pode constatar na nossa planilha de engenharia de dados, o código estático oferece segurança irrestrita contra exclusões arbitrárias de domínio.
                </p>

                {/* Metáfora da Tatuagem na Pedra */}
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Eye className="text-violet-500" /> A Metáfora da "Tatuagem na Pedra": Estabilidade de Rastreamento
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Para explicar aos nossos visitantes por que optamos pela segurança estática, adoramos evocar a metáfora das tatuagens esculpidas na pedra.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  O QR Code Estático funciona como uma escritura esculpida a cinzel nos muros de uma fortaleza. O link ou dados estão cravados na imagem.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Qualquer pessoa que passar na rua (leitor de celular) conseguirá ler a mensagem diretamente nos relevos da pedra, sem precisar de internet ou autorização de terceiros.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  O dinâmico, por sua vez, funciona como contratar um porteiro temporário para ficar em frente à muralha entregando bilhetes de papel com endereços atualizados.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Se você esquecer de pagar o salário desse porteiro no final do mês, ele simplesmente cruza os braços e impede os visitantes de conhecerem o seu produto.
                </p>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-violet-500" /> Três Aplicações Práticas que Elevam os Faturamentos das Empresas
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Utilizar quadradinhos bidimensionais de forma assertiva otimiza a conversão de canais offline para o online com agilidade:
                </p>
                <ol className="space-y-4 marker:text-violet-600 marker:font-bold">
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Conexão Instantânea de Wi-Fi:</strong> Configure a aba correspondente da nossa ferramenta com o nome e a senha do roteador do seu consultório ou loja comercial. O cliente escaneia e conecta instantaneamente, sem preenchimento manual de senhas exóticas.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Pix Exclusivo de Cobrança:</strong> Gere códigos de pagamentos com a sua chave Pix registrada e o valor exato da compra já embutido. Reduz o risco operacional de digitação errada no caixa.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>vCard e Cartão de Visitas Digital:</strong> Registre todos os seus dados comerciais de contato (Telefone, Cargo, E-mail e Site) em um único código. Ao escanear, o celular do cliente salva seu contato na agenda de forma automática.
                    </li>
                </ol>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-violet-500 mt-10 not-prose">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-violet-600 dark:text-violet-400"/> Requisito de Contraste Visual
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Sensores de câmeras móveis exigem forte contraste de luminosidade para reconhecer as margens do QR Code. Evite cores pastéis claras para a frente do código e fundos escuros. O clássico preto no branco garante leitura instantânea em qualquer aparelho antigo.
                    </p>
                </div>
            </div>

            {/* Horizontal Ad */}
            <div className="w-full flex justify-center bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[100px] overflow-hidden py-4">
                <LazyAdUnit slot="qrcode_sidebar" format="horizontal" />
            </div>
        </div>

        <ExpertSignature author="Equipe de Tecnologia e Design Mestre das Contas" updatedAt="Junho de 2026" />
        <SmartGlossaryLinker currentHref="/ferramentas/gerador-qr-code" />
        <SmartCrossLinker currentHref="/ferramentas/gerador-qr-code" category="ferramentas" />

        {/* --- FAQ SECTION ACCORDION --- */}
        <section id="faq" className="max-w-4xl mx-auto w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-violet-600 dark:text-violet-400 shrink-0" size={32} /> Tira-Dúvidas Definitivo
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Encontre respostas para as perguntas mais recorrentes sobre a geração de códigos QR.
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

        {/* Ad Unit Bottom */}
        <div className="w-full flex justify-center py-6">
             <LazyAdUnit slot="qrcode_bottom" format="auto" />
        </div>

      </div>
    </article>
  );
}