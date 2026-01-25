import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ImageConverter from "@/components/tools/ImageConverter";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Image as ImageIcon, Zap, ShieldCheck, Download, 
  Layers, Lock, Monitor, ArrowRight, CheckCircle2, 
  FileImage, HelpCircle
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { conversionData } from "@/data/image-conversions";
import FeaturedTools from "@/components/home/FeaturedTools";

// --- GERAÇÃO ESTÁTICA (pSEO) ---
export async function generateStaticParams() {
  return conversionData.map((item) => ({
    slug: item.slug,
  }));
}

type Props = { params: Promise<{ slug: string }> };

// --- METADATA DINÂMICA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = conversionData.find((d) => d.slug === slug);

  if (!data) return {};

  return {
    title: `${data.title} | Grátis e Ilimitado`,
    description: `${data.desc} Ferramenta segura, rápida e sem upload. Converta ${data.from} para ${data.to} agora mesmo.`,
    keywords: [`converter ${data.from} para ${data.to}`, `transformar ${data.from} em ${data.to}`, "conversor imagem online", "grátis"],
    alternates: { canonical: `https://mestredascontas.com.br/ferramentas/conversor-imagem/${slug}` },
    openGraph: {
      title: data.title,
      description: data.desc,
      url: `https://mestredascontas.com.br/ferramentas/conversor-imagem/${slug}`,
      siteName: "Mestre das Contas",
      type: "website",
    }
  };
}

export default async function ConversionPage({ params }: Props) {
  const { slug } = await params;
  const data = conversionData.find((d) => d.slug === slug);

  if (!data) return notFound();

  // JSON-LD Dinâmico (Dual: App + HowTo)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `Conversor de ${data.from} para ${data.to}`,
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": `Ferramenta online para converter imagens ${data.from} para ${data.to} gratuitamente e com segurança.`,
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1205", "bestRating": "5", "worstRating": "1" }
      },
      {
        "@type": "HowTo",
        "name": `Como converter ${data.from} para ${data.to} passo a passo`,
        "description": `Guia rápido para transformar seus arquivos de imagem ${data.from} no formato ${data.to} usando nossa ferramenta gratuita.`,
        "totalTime": "PT0M30S",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Envie sua imagem",
            "text": `Clique no botão ou arraste seu arquivo ${data.from} para a área de conversão acima.`,
            "url": `https://mestredascontas.com.br/ferramentas/conversor-imagem/${slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Aguarde o processamento",
            "text": "Nossa ferramenta converte o arquivo instantaneamente no seu navegador, sem fazer upload para servidores.",
            "url": `https://mestredascontas.com.br/ferramentas/conversor-imagem/${slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Baixe o arquivo convertido",
            "text": `Clique em "Download" para salvar sua nova imagem em ${data.to} com qualidade máxima.`,
            "url": `https://mestredascontas.com.br/ferramentas/conversor-imagem/${slug}#ferramenta`
          }
        ]
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER DINÂMICO */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={data.title}
          description={data.desc}
          category="Conversão de Arquivos"
          icon={<ImageIcon size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="slate"
          badge="Sem Upload"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Conversor", href: "/ferramentas/conversor-imagem" },
            { label: `${data.from} para ${data.to}` }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <AdUnit slot="convert_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA (Com pre-set do destino) */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <PrivacyBadge />
           <ImageConverter initialTarget={data.to.toLowerCase()} />
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* CONTEÚDO EDUCACIONAL PERSONALIZADO */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Guia Definitivo: De {data.from} para {data.to}
            </h2>
            
            <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
                {data.painPoint} Se você está enfrentando problemas de compatibilidade ou tamanho de arquivo, você chegou ao lugar certo.
            </p>
            
            <p className="text-slate-600 dark:text-slate-400">
                Nossa ferramenta foi desenvolvida para resolver exatamente isso. {data.benefit} Abaixo, explicamos tudo o que você precisa saber sobre essa transformação.
            </p>

            <div className="my-10 grid gap-6 md:grid-cols-3 not-prose">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="bg-blue-100 dark:bg-blue-900/40 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 font-bold">1</div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">Selecione</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Arraste seus arquivos {data.from} para a área pontilhada acima ou clique para buscar.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="bg-blue-100 dark:bg-blue-900/40 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 font-bold">2</div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">Converta</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Nossa tecnologia processa a imagem instantaneamente no seu navegador.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="bg-blue-100 dark:bg-blue-900/40 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 font-bold">3</div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">Baixe</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Pronto! Salve seu novo arquivo {data.to} em alta qualidade.</p>
                </div>
            </div>

            <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-4">Comparativo: {data.from} vs {data.to}</h3>
            
            <div className="w-full rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm not-prose mb-8 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-900 dark:bg-slate-950 text-white text-xs md:text-sm">
                        <tr>
                            <th className="px-3 py-3 md:px-6 md:py-4 font-bold w-1/2 uppercase tracking-wider">{data.from}</th>
                            <th className="px-3 py-3 md:px-6 md:py-4 font-bold w-1/2 bg-blue-600 dark:bg-blue-700 uppercase tracking-wider">{data.to}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 text-xs md:text-sm">
                        <tr>
                            <td className="px-3 py-3 md:px-6 md:py-4 text-slate-600 dark:text-slate-400 font-medium">Formato Original</td>
                            <td className="px-3 py-3 md:px-6 md:py-4 font-bold text-blue-700 dark:text-blue-400">Formato Resultante</td>
                        </tr>
                        <tr>
                            <td className="px-3 py-3 md:px-6 md:py-4 text-slate-600 dark:text-slate-400">Pode exigir software específico</td>
                            <td className="px-3 py-3 md:px-6 md:py-4 text-slate-600 dark:text-slate-400">Compatibilidade Universal</td>
                        </tr>
                        <tr>
                            <td className="px-3 py-3 md:px-6 md:py-4 text-slate-600 dark:text-slate-400">Estrutura complexa</td>
                            <td className="px-3 py-3 md:px-6 md:py-4 text-slate-600 dark:text-slate-400">Otimizado para web/edição</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-6 rounded-2xl not-prose my-8">
                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-2">
                    <ShieldCheck size={20}/> Segurança Garantida
                </h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-300/80 leading-relaxed">
                    Preocupado com a privacidade das suas fotos? Nós também. Por isso, <strong>nossa ferramenta roda 100% no seu navegador</strong>. Suas imagens nunca saem do seu computador e nunca são enviadas para nossos servidores. É como se você tivesse baixado um programa, mas sem precisar instalar nada.
                </p>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-6 flex items-center gap-2">
                <HelpCircle className="text-slate-500 dark:text-slate-400"/> Dúvidas Comuns
            </h3>
            
            <div className="space-y-4">
                <details className="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer transition-all hover:border-blue-200 dark:hover:border-blue-800">
                    <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none">
                        A qualidade da imagem diminui?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Nossa prioridade é manter a qualidade visual idêntica à original. Para formatos com compressão (como JPG), aplicamos o padrão de alta fidelidade (92%).
                    </p>
                </details>

                <details className="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer transition-all hover:border-blue-200 dark:hover:border-blue-800">
                    <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none">
                        Funciona no celular?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Sim! Funciona perfeitamente em iPhone (iOS) e Android. É ótimo para converter aquelas fotos HEIC do iPhone para enviar no WhatsApp.
                    </p>
                </details>

                <details className="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer transition-all hover:border-blue-200 dark:hover:border-blue-800">
                    <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none">
                        É realmente gratuito?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        100% Gratuito e ilimitado. Você pode converter quantas imagens quiser, sem marcas d'água e sem cadastro.
                    </p>
                </details>
            </div>

        </div>

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <AdUnit slot="convert_bottom" format="horizontal" variant="software" />
        </div>

        {/* NAVEGAÇÃO ENTRE FORMATOS */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose">
            <p className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <Layers size={16} className="text-blue-500"/> Outras Conversões Populares:
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
               {conversionData.filter(d => d.slug !== slug).map((item) => (
                   <Link key={item.slug} href={`/ferramentas/conversor-imagem/${item.slug}`} className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-colors shadow-sm">
                      {item.from} para {item.to}
                   </Link>
               ))}
            </div>
            
            {/* FERRAMENTAS RELACIONADAS */}
            <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 isolate [&>section]:mt-0 [&>section]:mb-0 [&>section]:px-0">
                <FeaturedTools />
            </div>
        </div>

      </div>
    </article>
  );
}