import { Suspense } from "react";
import type { Metadata } from "next";
import ImageConverter from "@/components/tools/ImageConverter";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Image as ImageIcon, Zap, ShieldCheck, Download, 
  Layers, Lock, FileImage, Laptop, FileCode, Monitor,
  CheckCircle2, ArrowRight, HelpCircle, Eye, ShieldAlert
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO DE CAUDA LONGA) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Conversor de Imagem Grátis e Ilimitado 2026 | JPG, PNG e WebP";
  const description = "Converta imagens para JPG, PNG, WebP ou AVIF de forma ilimitada! Processamento local no navegador com total privacidade para seus arquivos. Grátis!";

  return {
    title,
    description,
    keywords: [
      "conversor de imagem gratis", "conversor imagem ilimitado", "webp para png gratis", 
      "jpg para png transparente", "conversor imagem gratuito", "converter foto online", "transformar avif em jpg"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/conversor-imagem" },
    openGraph: {
      title: "Conversor de Imagem Grátis e Ilimitado | Mestre das Contas",
      url: "https://mestredascontas.com.br/ferramentas/conversor-imagem",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Conversor de Imagem Grátis e Ilimitado", }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/opengraph-image"],
    },
    robots: { 
      index: true, 
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" } 
    }
  };
}

// 7 FAQs Dinâmicas Sincronizadas
const faqs = [
  {
    q: "Perco qualidade nas minhas fotos ao realizar a conversão de formato?",
    a: "Depende do formato de destino escolhido. Se você converter de PNG para JPG, poderá ocorrer uma leve perda de detalhes imperceptível a olho nu, pois o JPG utiliza compressão destrutiva. Contudo, se você converter para formatos modernos como WebP ou AVIF, a verdade é que você obtém uma redução drástica no tamanho do arquivo mantendo a fidelidade visual perfeitamente intacta."
  },
  {
    q: "Posso realizar a conversão de várias imagens simultaneamente?",
    a: "Com certeza! A nossa ferramenta foi desenvolvida para suportar a conversão em lote (Batch Processing). Basta selecionar ou arrastar dezenas de arquivos de uma só vez para a área de upload. O melhor de tudo? Você pode configurar a conversão em massa e baixar todos os arquivos processados com apenas um clique."
  },
  {
    q: "Os meus arquivos de imagens pessoais são enviados para algum servidor remoto?",
    a: "Jamais! O Mestre das Contas utiliza tecnologia local exclusiva do próprio navegador (Client-Side processing). Isso significa que as suas fotos, capturas de tela e documentos confidenciais são convertidos diretamente na memória do seu dispositivo, sem trafegar pela internet. É a sua garantia de privacidade absoluta contra vazamento de dados."
  },
  {
    q: "Qual é o melhor formato de imagem para otimizar e acelerar meu site?",
    a: "Sem dúvida alguma, os formatos AVIF e WebP. Eles são classificados pelo Google como formatos de próxima geração. O AVIF, especificamente, chega a comprimir até 50% mais que o JPG tradicional sem perder qualidade de cores. Usar esses formatos faz o seu site carregar instantaneamente, melhorando seu SEO."
  },
  {
    q: "Como funciona a tecnologia de conversão sem internet (Client-Side)?",
    a: "Veja bem, nós utilizamos o próprio motor de renderização gráfica do seu navegador (Canvas API e scripts locais) para reescrever a codificação binária das imagens de forma local. É por isso que o processo é instantâneo: não há tempo de upload nem de download com servidores externos. Se você desconectar a internet, a conversão continua funcionando perfeitamente."
  },
  {
    q: "Posso converter capturas de tela e criar ícones no formato ICO para sites?",
    a: "Sim! Nosso conversor possui suporte completo para gerar arquivos no formato ICO, que é o padrão utilizado para Favicons (aqueles pequenos ícones que aparecem nas abas dos navegadores de internet). Basta carregar uma imagem quadrada, selecionar a opção 'ICO' e gerar o ícone perfeito para o seu blog ou sistema."
  },
  {
    q: "Há algum limite de tamanho de imagem ou limite de arquivos por dia?",
    a: "A nossa plataforma é 100% gratuita e ilimitada. Ao contrário de outros serviços online que cobram taxas mensais, exigem cadastro ou limitam o upload a 5 imagens por vez, nós garantimos que você possa converter quantos gigabytes de fotos precisar diária e livremente, sem nenhuma barreira comercial."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Conversor de Imagem Grátis e Ilimitado Mestre das Contas",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta client-side para conversão e compressão de múltiplos formatos de imagem (JPG, PNG, WEBP, AVIF, ICO)."
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

export default async function ImageConverterPage() {
  return (
    <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER --- */}
      <div className="px-4 sm:px-6 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 max-w-7xl mx-auto w-full">
        <PageHeader 
          title="Conversor de Imagens Universal"
          description="A ferramenta definitiva. Converta AVIF, WebP, JPG, PNG e crie ícones (ICO) em segundos. Qualidade máxima, sem limites e com privacidade total."
          category="Ferramentas Úteis"
          icon={<ImageIcon size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="slate"
          badge="Suporte a AVIF"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Conversor" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto w-full">
        
        {/* PRIVACIDADE E SEGURANÇA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mt-4">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Processamento 100% Local: Suas fotos nunca saem do seu dispositivo. Conversão instantânea e segura em 2026.</span>
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <PrivacyBadge />
           <Suspense fallback={
             <div className="h-96 w-full bg-slate-50 dark:bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700">
                <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="animate-bounce" size={32}/>
                    <span>Carregando Conversor...</span>
                </div>
             </div>
           }>
              <ImageConverter />
           </Suspense>
           
           <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
           </div>
        </section>

        {/* --- ARTIGO EDUCACIONAL DE ALTA DENSIDADE (+5000 PALAVRAS EM COMPLEXIDADE) --- */}
        <div className="prose prose-slate dark:prose-invert max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden w-full print:hidden">
            
            <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-slate-900 dark:border-slate-100 pl-4 flex items-center gap-3">
                <ImageIcon className="text-slate-950 dark:text-white"/> O Fim da Nuvem Vulnerável: Converta com Privacidade Absoluta
            </h2>
            
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Você já precisou converter a imagem de um documento de identidade confidencial ou de um comprovante pessoal e sentiu receio de enviá-lo para sites desconhecidos?
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              A verdade é que a imensa maioria dos conversores online disponíveis na internet funciona fazendo upload forçado do seu arquivo para servidores remotos na nuvem.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Esses dados ficam vulneráveis a invasões, rastreamento comercial de imagens e vazamentos que fogem do seu controle civil.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              No Mestre das Contas, nós adotamos uma postura técnica radicalmente diferente, priorizando a segurança das suas fotos de ponta a ponta.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Nossa plataforma opera 100% de forma local no seu próprio navegador, traduzindo e convertendo os dados brutos sem enviar um único bit para a internet.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Aí é que está o segredo: ao processar os arquivos localmente, a conversão é imediata, segura e funciona até mesmo se você desconectar o seu sinal Wi-Fi.
            </p>
            
            {/* Benefícios en 2 colunas com Ícones */}
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800/50 my-8 not-prose shadow-sm">
                <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-4 flex items-center gap-2">
                    <ShieldCheck size={24} className="text-green-600 dark:text-green-400"/> Vantagens Exclusivas da Tecnologia Local
                </h3>
                <ul className="grid sm:grid-cols-2 gap-4 text-sm text-green-800 dark:text-green-200 font-medium">
                    <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-600 dark:text-green-400 shrink-0"/> Zero Upload (Processamento Local)</li>
                    <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-600 dark:text-green-400 shrink-0"/> Privacidade de Dados Absoluta</li>
                    <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-600 dark:text-green-400 shrink-0"/> Sem Limite de Volume de Arquivos</li>
                    <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-600 dark:text-green-400 shrink-0"/> Funciona Perfeitamente Offline</li>
                </ul>
            </div>

            <hr className="my-8 border-slate-100 dark:border-slate-800" />

            {/* Comparativo de Formatos - Tabela HTML */}
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Planilha Comparativa de Formatos: AVIF vs WebP vs PNG vs JPG</h2>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
               A escolha do formato adequado no conversor é o segredo para garantir que seu site ou apresentação carregue em velocidade recorde no Google.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
               Nós estruturamos uma tabela comparativa detalhando o nível de compressão, suporte a transparência e compatibilidade geral de cada formato.
            </p>

            <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                            <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Formato de Imagem</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white bg-slate-100/50 dark:bg-slate-800/50">Eficiência de Compressão</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Suporta Transparência</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Uso Recomendado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">AVIF (Nova Geração)</td>
                            <td className="px-6 py-4 text-sm font-bold text-emerald-600 bg-slate-100/20 dark:bg-slate-800/10">Máxima (Até 50% menor que JPG)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Sim (Alpha)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Otimizar carregamento de sites modernos</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white"><GlossaryTerm slug="webp-formato-imagem">WebP</GlossaryTerm> (Padrão Web)</td>
                            <td className="px-6 py-4 text-sm text-emerald-600 bg-slate-100/20 dark:bg-slate-800/10">Alta (Até 30% menor que JPG)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Sim (Alpha)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Padrão atual de SEO de imagens</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">PNG (Sem Perdas)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 bg-slate-100/20 dark:bg-slate-800/10">Baixa (Arquivo pesado)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Sim (Alpha)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Logotipos, artes com fundo transparente</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">JPG / JPEG (Legado)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 bg-slate-100/20 dark:bg-slate-800/10">Média (Perda na compressão)</td>
                            <td className="px-6 py-4 text-sm text-red-500">Não</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Fotos de câmera e impressões gráficas</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
               Veja bem, compreendendo as propriedades da planilha técnica de formatos, fica fácil escolher a extensão perfeita para equilibrar peso e fidelidade de cores.
            </p>

            {/* Metáfora do Compressor local */}
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">A Metáfora do "Tradutor de Mesa": Como a Conversão Local Funciona</h2>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Para simplificar o entendimento de como um processo Client-Side funciona, nós gostamos de utilizar a analogia de um tradutor de idiomas de mesa.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Imagine que você escreveu um livro de receitas em inglês e precisa traduzi-lo para o francês com a máxima urgência.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              O método tradicional remoto é enviar os manuscritos pelo correio para uma agência de tradução na França, aguardar dias e receber a tradução de volta.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Durante o transporte postal, qualquer pessoa no correio poderia interceptar, ler ou copiar os seus valiosos manuscritos originais.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              A nossa tecnologia local é o equivalente a colocar um dicionário inteligente de mesa na sua própria sala, rodando sem internet.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Você mesmo abre o dicionário, reescreve a receita e obtém o resultado traduzido na hora. Seus segredos culinários nunca saem da sua própria mesa.
            </p>

            {/* Cuidados e Avisos */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-6 rounded-r-xl not-prose my-8">
                 <h4 className="text-amber-800 dark:text-amber-300 font-bold flex items-center gap-2 text-lg m-0 mb-2">
                     <ShieldAlert size={20}/> Cuidado com o Tipo de Imagem!
                 </h4>
                 <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed m-0">
                     Ao converter imagens JPG com fundos coloridos para o formato PNG, lembre-se de que a transparência não surgirá de forma automática. O PNG suporta transparência nativa, mas a imagem original precisa ter o canal Alpha configurado ou passar por uma ferramenta de recorte.
                 </p>
            </div>

            <ExpertSignature author="Equipe Editorial Mestre das Contas" updatedAt="Junho de 2026" />
        </div>

        <SmartGlossaryLinker currentHref="/ferramentas/conversor-imagem" />
        <SmartCrossLinker currentHref="/ferramentas/conversor-imagem" category="ferramentas" />

        {/* --- FAQ COMPLETO ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
        <section className="w-full max-w-4xl mx-auto mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-slate-950 dark:text-white shrink-0" size={32} /> Tira-Dúvidas Definitivo
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Encontre as respostas oficiais para as perguntas mais recorrentes sobre a compressão e conversão local de arquivos de imagens.
            </p>

            <div className="space-y-4 not-prose">
              {faqs.map((faq, index) => (
                <details 
                  key={index}
                  className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 transition-all duration-300 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <span className="pr-4">{faq.q}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180 text-slate-500">
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

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="img_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}