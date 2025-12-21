import type { Metadata } from "next";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
// IMPORTANTE: Importamos o Wrapper, não o gerador direto.
// Isso resolve o erro de "ssr: false" e garante performance.
import QRCodeWrapper from "@/components/calculators/QRCodeWrapper";
import { 
  QrCode, Zap, ShieldCheck, Ban, 
  Smartphone, Wifi, CheckCircle2, Globe, 
  AlertTriangle, MousePointerClick, Printer, MoveRight
} from "lucide-react";

// --- 1. SEO TÉCNICO (METADATA) ---
export const metadata: Metadata = {
  title: "Gerador de QR Code Grátis e Vitalício | Pix, Wi-Fi e Links",
  description: "A única ferramenta que você precisa. Crie QR Codes personalizados (com Logo e Cor) que nunca expiram. Ideal para Pix, Wi-Fi e Impressão. 100% Gratuito.",
  keywords: [
    "gerador de qr code", "criar qr code gratis", "qr code com logo", 
    "qr code wifi", "qr code estatico", "qr code pix", "como fazer qr code"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-qr-code" },
  openGraph: {
    title: "Crie QR Codes Infinitos e Grátis - Mestre das Contas",
    description: "Esqueça mensalidades. Crie códigos para Pix, Wi-Fi e Links que funcionam para sempre.",
    url: "https://mestredascontas.com.br/ferramentas/gerador-qr-code",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Gerador de QR Code" }],
  },
};

// --- 2. RICH SNIPPETS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Gerador de QR Code Mestre das Contas",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "3102" },
  "description": "Ferramenta profissional para criação de códigos QR estáticos de alta resolução.",
  "featureList": "Pix, Wi-Fi, vCard, WhatsApp, Download SVG/PNG"
};

export default function QRCodePage() {
  return (
    <article className="w-full max-w-full overflow-hidden font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
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
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="qrcode_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA PRINCIPAL (Usando o Wrapper para não quebrar) */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           {/* O Wrapper cuida do Loading State e do 'ssr: false' */}
           <QRCodeWrapper />
           
           <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
           </div>
        </section>

        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <AdUnit slot="qrcode_mid" format="auto" />
        </div>

        {/* --- ARTIGO DENSO (E-E-A-T & STORYTELLING) --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
          <h2 className="text-3xl font-bold text-slate-900 mb-6 border-l-4 border-slate-900 pl-4">
              A revolução silenciosa dos quadradinhos pretos
          </h2>
          
          <p className="lead text-lg font-medium text-slate-700">
            Você já parou para pensar que estamos vivendo o fim do cartão de visitas de papel? É verdade. Aquele pedaço de papel que a gente guardava no bolso (e perdia na máquina de lavar) foi substituído por algo muito mais poderoso: o <strong>QR Code</strong>.
          </p>
          <p>
            Mas aqui está o problema: nem todo QR Code é igual.
          </p>
          <p>
            Talvez você tenha chegado até aqui frustrado. Talvez você tenha usado um gerador "gratuito" na semana passada, imprimiu 500 panfletos e, hoje, descobriu que o código parou de funcionar. Apareceu uma mensagem pedindo cartão de crédito, certo?
          </p>
          <p>
            Isso é o que chamamos de "Armadilha do Código Dinâmico". E nós vamos te explicar exatamente como fugir dela agora.
          </p>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 my-8 not-prose">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-green-600"/> A Promessa do Mestre das Contas
              </h3>
              <p className="text-slate-600 mb-4">
                  Ao contrário da maioria, nossa ferramenta gera <strong>QR Codes Estáticos</strong>. Isso significa que:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                      <div className="bg-green-100 text-green-700 p-2 rounded-full"><Zap size={18}/></div>
                      <span className="font-bold text-slate-700">Nunca Expira</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-full"><Ban size={18}/></div>
                      <span className="font-bold text-slate-700">Sem Mensalidade</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                      <div className="bg-purple-100 text-purple-700 p-2 rounded-full"><MousePointerClick size={18}/></div>
                      <span className="font-bold text-slate-700">Scans Ilimitados</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                      <div className="bg-orange-100 text-orange-700 p-2 rounded-full"><Printer size={18}/></div>
                      <span className="font-bold text-slate-700">Alta Resolução</span>
                  </div>
              </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">A Ciência por trás: Estático vs. Dinâmico</h2>
          <p>
            Para entender por que nossa ferramenta é segura, precisamos usar uma analogia simples.
          </p>
          <p>
            Imagine que o QR Code é um envelope.
          </p>
          <ul>
              <li><strong>No QR Code Estático (O Nosso):</strong> Nós escrevemos a carta, colocamos dentro do envelope e lacramos. O conteúdo está lá fisicamente. Se o nosso site desaparecer amanhã, o envelope continua existindo com a carta dentro. O link está "tatuado" nos pixels.</li>
              <li><strong>No QR Code Dinâmico (Os Outros):</strong> O envelope contém apenas um bilhete dizendo "Vá até a portaria do prédio X". Quando você chega lá, o porteiro te entrega a carta real. O problema? Se você parar de pagar o aluguel do prédio, o porteiro para de entregar a carta.</li>
          </ul>
{/* TABELA CORRIGIDA (SEM ESPAÇOS EM BRANCO PROIBIDOS) */}
          <div className="not-prose my-10 relative">
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                  <table className="w-full text-sm text-left min-w-[600px]"><thead className="bg-slate-900 text-white"><tr><th className="px-6 py-4 font-bold uppercase tracking-wider w-1/3">Critério</th><th className="px-6 py-4 font-bold uppercase tracking-wider w-1/3 bg-emerald-600">Mestre das Contas</th><th className="px-6 py-4 font-bold uppercase tracking-wider w-1/3 bg-slate-800 text-slate-400">Concorrência (Pago)</th></tr></thead><tbody className="divide-y divide-slate-200 bg-white"><tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-medium text-slate-900">Tipo de Tecnologia</td><td className="px-6 py-4 text-emerald-700 font-bold">Estática (Direta)</td><td className="px-6 py-4 text-slate-600">Dinâmica (Redirecionamento)</td></tr><tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-medium text-slate-900">Validade do Código</td><td className="px-6 py-4 text-emerald-700 font-bold">Vitalícia (Eterna)</td><td className="px-6 py-4 text-red-600 font-bold">Expira em 14 dias</td></tr><tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-medium text-slate-900">Privacidade</td><td className="px-6 py-4 text-emerald-700 font-bold">Total (Seu navegador)</td><td className="px-6 py-4 text-slate-600">Rastreiam seus clientes</td></tr><tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-medium text-slate-900">Dependência</td><td className="px-6 py-4 text-emerald-700 font-bold">Nenhuma</td><td className="px-6 py-4 text-slate-600">Alta (Se o site cair, já era)</td></tr></tbody></table>
              </div>
              <p className="md:hidden text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                  <MoveRight size={12}/> Deslize para ver a comparação
              </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3 Maneiras Inteligentes de usar (Que você não pensou)</h2>
          
          <h3>1. O "Wi-Fi Mágico"</h3>
          <p>
            Você tem um restaurante ou escritório? Ninguém merece digitar <code>SenhaDificil@123</code>. 
            Use a aba <strong>Wi-Fi</strong> da nossa ferramenta. Ela gera um código especial que, ao ser lido pelo celular (iPhone ou Android), pergunta: "Deseja conectar à rede?". Um clique e pronto. Mágica.
          </p>

          <h3>2. O Pix que não erra</h3>
          <p>
            Errar um dígito na chave Pix ou no valor é comum. Com nosso gerador, você cria um código que já contém sua chave e o valor exato. Imprima e cole no balcão. O cliente só aponta e confirma. Zero erro, dinheiro na conta na hora.
          </p>

          <h3>3. O Cartão de Visita Infinito (vCard)</h3>
          <p>
            Ao invés de gastar com cartões de papel que vão para o lixo, imprima apenas um adesivo e cole atrás do seu celular. Quando alguém pedir seu contato, mostre o adesivo. O código <strong>vCard</strong> salva automaticamente seu Nome, Email, Site e Telefone na agenda da pessoa.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-xl not-prose my-8">
              <h3 className="text-yellow-800 font-bold flex items-center gap-2 text-lg m-0 mb-2">
                  <AlertTriangle size={20}/> Cuidado na hora de imprimir!
              </h3>
              <p className="text-yellow-800 text-sm leading-relaxed m-0">
                  QR Codes são robustos, mas não fazem milagre. Eles precisam de <strong>Contraste</strong>. Nunca imprima um código amarelo em fundo branco ou preto em fundo azul escuro. A câmera do celular precisa ver a diferença clara entre o claro e o escuro. Na dúvida? Preto no Branco é clássico e infalível.
              </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3 Maneiras Inteligentes de usar (Que você não pensou)</h2>
          
          <h3>1. O "Wi-Fi Mágico"</h3>
          <p>
            Você tem um restaurante ou escritório? Ninguém merece digitar <code>SenhaDificil@123</code>. 
            Use a aba <strong>Wi-Fi</strong> da nossa ferramenta. Ela gera um código especial que, ao ser lido pelo celular (iPhone ou Android), pergunta: "Deseja conectar à rede?". Um clique e pronto. Mágica.
          </p>

          <h3>2. O Pix que não erra</h3>
          <p>
            Errar um dígito na chave Pix ou no valor é comum. Com nosso gerador, você cria um código que já contém sua chave e o valor exato. Imprima e cole no balcão. O cliente só aponta e confirma. Zero erro, dinheiro na conta na hora.
          </p>

          <h3>3. O Cartão de Visita Infinito (vCard)</h3>
          <p>
            Ao invés de gastar com cartões de papel que vão para o lixo, imprima apenas um adesivo e cole atrás do seu celular. Quando alguém pedir seu contato, mostre o adesivo. O código <strong>vCard</strong> salva automaticamente seu Nome, Email, Site e Telefone na agenda da pessoa.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-xl not-prose my-8">
              <h3 className="text-yellow-800 font-bold flex items-center gap-2 text-lg m-0 mb-2">
                  <AlertTriangle size={20}/> Cuidado na hora de imprimir!
              </h3>
              <p className="text-yellow-800 text-sm leading-relaxed m-0">
                  QR Codes são robustos, mas não fazem milagre. Eles precisam de <strong>Contraste</strong>. Nunca imprima um código amarelo em fundo branco ou preto em fundo azul escuro. A câmera do celular precisa ver a diferença clara entre o claro e o escuro. Na dúvida? Preto no Branco é clássico e infalível.
              </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Perguntas Frequentes (FAQ)</h2>
          
          <details className="group border-b border-slate-200 pb-4 mb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 flex justify-between items-center list-none">
                  Posso colocar minha logo no meio?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600">
                  Sim! Nossa ferramenta permite inserir a URL da sua logo. O QR Code possui uma tecnologia chamada "Correção de Erro" (Reed-Solomon), que permite que até 30% do código seja "coberto" ou danificado, e ainda assim funcione.
              </p>
          </details>

          <details className="group border-b border-slate-200 pb-4 mb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 flex justify-between items-center list-none">
                  Qual formato devo baixar: PNG ou SVG?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600">
                  Depende. Se for usar no Instagram, WhatsApp ou Word, baixe <strong>PNG</strong>. Se for enviar para uma gráfica imprimir um banner gigante ou cartão de visita, baixe <strong>SVG</strong> (Vetor), pois ele nunca perde a qualidade, não importa o tamanho.
              </p>
          </details>

          <details className="group border-b border-slate-200 pb-4 mb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 flex justify-between items-center list-none">
                  Vocês salvam meus dados?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600">
                  Absolutamente não. Toda a geração do código acontece no seu navegador (Client-Side). Nenhuma informação sobre seu Wi-Fi, Pix ou links é enviada para nossos servidores. Privacidade total.
              </p>
          </details>

        </div>

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <AdUnit slot="qrcode_bottom" format="horizontal" variant="software" />
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