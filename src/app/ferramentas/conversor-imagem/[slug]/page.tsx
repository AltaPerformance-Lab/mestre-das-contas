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
import { conversionData } from "@/data/image-conversions";

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

  // JSON-LD Dinâmico
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Conversor de ${data.from} para ${data.to}`,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
    "description": `Ferramenta online para converter imagens ${data.from} para ${data.to} gratuitamente.`,
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1205", "bestRating": "5", "worstRating": "1" }
  };

  return (
    <article className="w-full max-w-full overflow-hidden font-sans">
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
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="convert_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA (Com pre-set do destino) */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <ImageConverter initialTarget={data.to.toLowerCase()} />
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* CONTEÚDO EDUCACIONAL PERSONALIZADO */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-slate-900 pl-4">
                Como converter {data.from} para {data.to}?
            </h2>
            <p className="lead text-slate-700 text-lg font-medium">
                {data.painPoint}
            </p>
            <p>
                Nossa ferramenta resolve isso em segundos. {data.benefit}
            </p>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 my-8 not-prose shadow-sm">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Zap size={24} className="text-yellow-500"/> Por que usar nossa ferramenta?
                </h3>
                <ul className="space-y-3 text-blue-900/80">
                    <li className="flex gap-2 items-start"><CheckCircle2 size={18} className="mt-0.5 text-blue-600"/> <strong>Sem Instalação:</strong> Nada de baixar programas pesados ou apps com vírus.</li>
                    <li className="flex gap-2 items-start"><CheckCircle2 size={18} className="mt-0.5 text-blue-600"/> <strong>Privacidade Total:</strong> Diferente de outros sites, seus arquivos {data.from} não são enviados para nenhum servidor. Tudo acontece no seu computador.</li>
                    <li className="flex gap-2 items-start"><CheckCircle2 size={18} className="mt-0.5 text-blue-600"/> <strong>Alta Qualidade:</strong> O formato {data.to} gerado mantém a fidelidade visual do original.</li>
                </ul>
            </div>

            <h3>Diferenças: {data.from} vs {data.to}</h3>
            
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm not-prose mb-8">
                <table className="w-full text-sm text-left min-w-[500px]">
                    <thead className="bg-slate-900 text-white">
                        <tr>
                            <th className="px-6 py-3 font-bold w-1/2">{data.from}</th>
                            <th className="px-6 py-3 font-bold w-1/2 bg-blue-600">{data.to}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        <tr>
                            <td className="px-6 py-4 text-slate-600">Formato de Origem</td>
                            <td className="px-6 py-4 font-bold text-blue-700">Formato de Destino</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-slate-600">Pode apresentar incompatibilidade</td>
                            <td className="px-6 py-4 text-slate-600">Alta compatibilidade e uso geral</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2">
                <HelpCircle className="text-slate-500"/> Perguntas Frequentes
            </h3>
            <details className="group border-b border-slate-200 pb-4 mb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 flex justify-between items-center list-none">
                    Perco qualidade na conversão?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-600">
                    Nossa ferramenta busca manter a máxima qualidade possível. Se você converter para JPG, pode ajustar o nível de qualidade no slider para reduzir o tamanho do arquivo se preferir.
                </p>
            </details>
            <details className="group border-b border-slate-200 pb-4 mb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 flex justify-between items-center list-none">
                    Posso converter várias fotos de uma vez?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-600">
                    Sim! Selecione ou arraste múltiplos arquivos {data.from} e clique em "Converter Todas".
                </p>
            </details>

        </div>

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <AdUnit slot="convert_bottom" format="horizontal" variant="software" />
        </div>

        {/* NAVEGAÇÃO ENTRE FORMATOS */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <Layers size={16} className="text-blue-500"/> Outras Conversões Populares:
            </p>
            <div className="flex flex-wrap gap-3">
               {conversionData.filter(d => d.slug !== slug).map((item) => (
                   <Link key={item.slug} href={`/ferramentas/conversor-imagem/${item.slug}`} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors shadow-sm">
                      {item.from} para {item.to}
                   </Link>
               ))}
            </div>
        </div>

      </div>
    </article>
  );
}