import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
// O Wrapper garante que o componente pesado só carregue no cliente (sem erro 500)
import QRCodeWrapper from "@/components/calculators/QRCodeWrapper";
import { 
  QrCode, Zap, ShieldCheck, Ban, 
  Smartphone, Wifi, CheckCircle2, Globe, 
  AlertTriangle, MousePointerClick, Printer,
  MessageCircle, Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import ReviewStars from "@/components/ui/ReviewStars";

// --- 1. SEO TÉCNICO (METADATA) ---
// --- 1. SEO TÉCNICO (METADATA DINÂMICA) ---
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const initialType = (sp.type as string);
  
  let title = "QR Code Generator: Criar Grátis e Vitalício (Com Logo)";
  let description = "O melhor Gerador de QR Code Gratuito. Crie códigos personalizados com Cores e Logo. Vitalício, ilimitado e em alta resolução (PNG/SVG).";

  if (initialType === "pix") {
      title = "Gerador de QR Code Pix Grátis (Com Chave e Valor)";
      description = "Crie seu QR Code Pix personalizado com chave e valor fixo agora. Ideal para imprimir e colocar no balcão.";
  } else if (initialType === "wifi") {
      title = "Gerador de QR Code Wi-Fi (Conexão Automática)";
      description = "Crie um QR Code para seu Wi-Fi. Seus clientes escaneiam e conectam sem precisar digitar senha.";
  } else if (initialType === "whatsapp") {
      title = "Gerador de QR Code WhatsApp (Mensagem Pronta)";
      description = "Crie um QR Code que abre seu WhatsApp direto. Ideal para cartão de visita e instagram.";
  }

  return {
    title,
    description,
    keywords: [
      "gerador de qr code", "criar qr code gratis", "qr code com logo", 
      "qr code wifi", "qr code estatico", "qr code pix", "como fazer qr code"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-qr-code" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/ferramentas/gerador-qr-code",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "website",
      images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Gerador de QR Code" }],
    },
  };
}

// --- 2. RICH SNIPPETS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
      {
          "@type": "SoftwareApplication",
          "name": "Gerador de QR Code Mestre das Contas",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "3102" },
          "description": "Ferramenta profissional para criação de códigos QR estáticos de alta resolução.",
          "featureList": "Pix, Wi-Fi, vCard, WhatsApp, Download SVG/PNG"
      },
      {
          "@type": "HowTo",
          "name": "Como Criar um QR Code Grátis",
          "step": [
              { "@type": "HowToStep", "name": "Escolha o Tipo", "text": "Selecione se deseja criar um QR Code para Link, Pix, Wi-Fi ou WhatsApp." },
              { "@type": "HowToStep", "name": "Preencha os Dados", "text": "Digite as informações necessárias (Ex: Chave Pix ou Senha do Wi-Fi)." },
              { "@type": "HowToStep", "name": "Baixe a Imagem", "text": "Clique em Download PNG para usar na web ou SVG para impressão profissional." }
          ]
      },
      {
          "@type": "FAQPage",
          "mainEntity": [
              {
                  "@type": "Question",
                  "name": "O QR Code expira?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Nunca. Nossos códigos são estáticos e não dependem de redirecionamento. Eles funcionarão para sempre." }
              },
              {
                  "@type": "Question",
                  "name": "É 100% gratuito?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Sim. Não cobramos mensalidade e não limitamos o número de leituras." }
              }
          ]
      }
  ]
};

// Tipagem para receber parâmetros via URL (Integração entre ferramentas)
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function QRCodePage({ searchParams }: Props) {
  
  // Lê os parâmetros da URL para preencher a ferramenta automaticamente
  // Ex: ?type=whatsapp&num=5511999...&msg=Ola
  const sp = await searchParams;
  const initialType = (sp.type as string) || "link";
  
  const initialValues = {
    // WhatsApp
    whatsNum: sp.num as string,
    whatsMsg: sp.msg as string,
    // Pix
    pixKey: sp.key as string,
    pixName: sp.name as string,
    pixAmount: sp.amount as string,
    // Link genérico
    url: sp.url as string,
    // Wi-Fi
    wifiSsid: sp.ssid as string,
    wifiType: sp.encryption as string,
    wifiPass: sp.pass as string
  };

  return (
    <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Gerador de QR Code Grátis"
          description="Crie, personalize e imprima. Gere códigos QR para Pix, Wi-Fi e Links que nunca expiram. Sem cadastro, sem pegadinhas."
          category="Ferramentas Úteis"
          icon={<QrCode size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="slate"
          badge="Vitalício & Ilimitado"
          rating={5.0}
          reviews={3102}
          breadcrumbs={[{ label: "Ferramentas", href: "/ferramentas" }, { label: "Gerador QR Code" }]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="qrcode_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA PRINCIPAL (Com Props Dinâmicas) */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           {/* O Wrapper cuida do Loading State e do 'ssr: false' */}
           <PrivacyBadge />
           <QRCodeWrapper 
              initialType={initialType}
              initialValues={initialValues}
           />
           
           <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
           </div>
        </section>

        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="qrcode_mid" format="auto" />
        </div>

        {/* --- ARTIGO DENSO (E-E-A-T & STORYTELLING) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6 border-l-4 border-slate-900 dark:border-slate-100 pl-4">
              A revolução silenciosa dos quadradinhos pretos
          </h2>
          
          <p className="lead text-xl font-bold text-slate-800 dark:text-slate-200">
            Você já parou para pensar que estamos vivendo o fim do cartão de visitas de papel? É verdade. Aquele pedaço de papel que a gente guardava no bolso (e perdia na máquina de lavar) foi substituído por algo muito mais poderoso: o <strong>QR Code</strong>.
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            Mas aqui está o problema: nem todo QR Code é igual.
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            Talvez você tenha chegado até aqui frustrado. Talvez você tenha usado um gerador "gratuito" na semana passada, imprimiu 500 panfletos e, hoje, descobriu que o código parou de funcionar. Apareceu uma mensagem pedindo cartão de crédito, certo?
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            Isso é o que chamamos de "Armadilha do Código Dinâmico". E nós vamos te explicar exatamente como fugir dela agora.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 my-8 not-prose">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-green-600 dark:text-green-500"/> A Promessa do Mestre das Contas
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4 font-medium">
                  Ao contrário da maioria, nossa ferramenta gera <strong>QR Codes Estáticos</strong>. Isso significa que:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-2 rounded-full"><Zap size={18}/></div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Nunca Expira</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 p-2 rounded-full"><Ban size={18}/></div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Sem Mensalidade</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 p-2 rounded-full"><MousePointerClick size={18}/></div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Scans Ilimitados</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 p-2 rounded-full"><Printer size={18}/></div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Alta Resolução</span>
                  </div>
              </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">A Ciência por trás: Estático vs. Dinâmico</h2>
          <p className="text-slate-700 dark:text-slate-300">
            Para entender por que nossa ferramenta é segura, precisamos usar uma analogia simples. Imagine que o QR Code é um envelope.
          </p>
          <ul className="text-slate-700 dark:text-slate-300">
              <li><strong className="text-slate-900 dark:text-white">No QR Code Estático (O Nosso):</strong> Nós escrevemos a carta, colocamos dentro do envelope e lacramos. O conteúdo está lá fisicamente. Se o nosso site desaparecer amanhã, o envelope continua existindo com a carta dentro. O link está "tatuado" nos pixels.</li>
              <li><strong className="text-slate-900 dark:text-white">No QR Code Dinâmico (Os Outros):</strong> O envelope contém apenas um bilhete dizendo "Vá até a portaria do prédio X". Quando você chega lá, o porteiro te entrega a carta real. O problema? Se você parar de pagar o aluguel do prédio, o porteiro para de entregar a carta.</li>
          </ul>

          {/* TABELA CORRIGIDA */}
          {/* TABELA RESPONSIVA (Mobile: Cards, Desktop: Table) */}
          <div className="not-prose my-10 relative">
              
              {/* VIEW DESKTOP */}
              <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-slate-900 dark:bg-slate-950 text-white">
                          <tr>
                              <th className="px-6 py-4 font-bold uppercase tracking-wider w-1/3">Critério</th>
                              <th className="px-6 py-4 font-bold uppercase tracking-wider w-1/3 bg-emerald-600 dark:bg-emerald-700">Mestre das Contas</th>
                              <th className="px-6 py-4 font-bold uppercase tracking-wider w-1/3 bg-slate-800 dark:bg-slate-900 text-slate-400">Concorrência (Pago)</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Tipo de Tecnologia</td>
                              <td className="px-6 py-4 text-emerald-700 dark:text-emerald-400 font-bold">Estática (Direta)</td>
                              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Dinâmica (Redirecionamento)</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Validade do Código</td>
                              <td className="px-6 py-4 text-emerald-700 dark:text-emerald-400 font-bold">Vitalícia (Eterna)</td>
                              <td className="px-6 py-4 text-red-600 dark:text-red-400 font-bold">Expira em 14 dias</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Privacidade</td>
                              <td className="px-6 py-4 text-emerald-700 dark:text-emerald-400 font-bold">Total (Seu navegador)</td>
                              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Rastreiam seus clientes</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Dependência</td>
                              <td className="px-6 py-4 text-emerald-700 dark:text-emerald-400 font-bold">Nenhuma</td>
                              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Alta (Se o site cair, já era)</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              {/* VIEW MOBILE (Cards) */}
              <div className="md:hidden space-y-4">
                  {[
                      { 
                          title: "Tecnologia", 
                          myVal: "Estática (Direta)", 
                          otherVal: "Dinâmica (Redirecionamento)" 
                      },
                      { 
                          title: "Validade", 
                          myVal: "Vitalícia (Eterna)", 
                          otherVal: "Expira em 14 dias",
                          bad: true 
                      },
                      { 
                          title: "Privacidade", 
                          myVal: "Total (Local)", 
                          otherVal: "Rastreiam você" 
                      },
                      { 
                          title: "Dependência", 
                          myVal: "Nenhuma", 
                          otherVal: "Alta (Risco de cair)" 
                      }
                  ].map((item, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-sm">
                          <div className="bg-slate-100 dark:bg-slate-950 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase text-xs">{item.title}</span>
                              {item.title === "Validade" && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Vantagem</span>}
                          </div>
                          <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800">
                              <div className="p-3 text-center bg-emerald-50/30 dark:bg-emerald-900/10">
                                   <div className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-500 mb-1">Mestre das Contas</div>
                                   <div className="font-bold text-slate-800 dark:text-white leading-tight">{item.myVal}</div>
                              </div>
                              <div className="p-3 text-center">
                                   <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Outros</div>
                                   <div className={`font-medium leading-tight ${item.bad ? 'text-red-500 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>{item.otherVal}</div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">3 Maneiras Inteligentes de usar</h2>
          
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xl">1. O "Wi-Fi Mágico"</h3>
          <p className="text-slate-700 dark:text-slate-300">
            Você tem um restaurante ou escritório? Ninguém merece digitar senhas longas. 
            Use a aba <strong>Wi-Fi</strong> da nossa ferramenta. Ela gera um código especial que, ao ser lido pelo celular, conecta automaticamente à rede.
          </p>

          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xl">2. O Pix que não erra</h3>
          <p className="text-slate-700 dark:text-slate-300">
            Errar um dígito na chave Pix é comum. Com nosso gerador, você cria um código que já contém sua chave e o valor exato. Imprima e cole no balcão. O cliente só aponta e confirma.
          </p>

          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xl">3. O Cartão de Visita Infinito (vCard)</h3>
          <p className="text-slate-700 dark:text-slate-300">
            Imprima um adesivo e cole atrás do seu celular. Quando alguém pedir seu contato, mostre o adesivo. O código <strong>vCard</strong> salva automaticamente seu Nome, Email, Site e Telefone na agenda da pessoa.
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-5 rounded-r-xl not-prose my-8">
              <h3 className="text-yellow-800 dark:text-yellow-200 font-bold flex items-center gap-2 text-lg m-0 mb-2">
                  <AlertTriangle size={20}/> Cuidado na hora de imprimir!
              </h3>
              <p className="text-yellow-800 dark:text-yellow-200/90 text-sm leading-relaxed m-0">
                  QR Codes precisam de <strong>Contraste</strong>. Nunca imprima um código amarelo em fundo branco ou preto em fundo azul escuro. A câmera precisa ver a diferença. Na dúvida? Preto no Branco é infalível.
              </p>
          </div>

          {/* LINK PARA GERADOR DE LINK WHATSAPP */}
          <div className="not-prose my-8">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                  <div>
                      <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                          <MessageCircle size={22}/> Quer criar um link de WhatsApp antes?
                      </h3>
                      <p className="text-sm text-green-700 dark:text-green-400">
                          Use nossa ferramenta dedicada para criar links curtos com mensagem personalizada e depois volte aqui para gerar o QR Code.
                      </p>
                  </div>
                  <Link href="/ferramentas/gerador-link-whatsapp" className="shrink-0">
                      <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 dark:shadow-none">
                          Ir para Gerador de Link <LinkIcon size={16} className="ml-2"/>
                      </Button>
                  </Link>
              </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Perguntas Frequentes (FAQ)</h2>
          
          <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Posso colocar minha logo no meio?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                  Sim! Use a opção "Inserir Logo". O QR Code possui "Correção de Erro" que permite que até 30% do código seja coberto e ainda funcione.
              </p>
          </details>

          <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Qual formato devo baixar?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                  Para redes sociais e documentos, use <strong>PNG</strong>. Para impressão em banners grandes ou materiais gráficos, use <strong>SVG</strong> (vetor), pois nunca perde qualidade.
              </p>
          </details>

          <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Vocês salvam meus dados?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                  Não. Toda a geração do código acontece no seu navegador (Client-Side). Nenhuma informação sobre seu Wi-Fi, Pix ou links é enviada para nossos servidores.
              </p>
          </details>

        </div>

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="qrcode_bottom" format="horizontal" variant="software" />
        </div>

        {/* RODAPÉ */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}