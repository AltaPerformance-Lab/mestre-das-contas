import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ReceiptGenerator from "@/components/tools/ReceiptGenerator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  FileText, Zap, ShieldCheck, Printer, 
  PenTool, CheckCircle2, HelpCircle,
  QrCode, ArrowRight, LayoutTemplate
} from "lucide-react";
import { receiptCases } from "@/data/receipt-cases";

// --- GERAÇÃO ESTÁTICA ---
export async function generateStaticParams() {
  return receiptCases.map((item) => ({
    slug: item.slug,
  }));
}

type Props = { params: Promise<{ slug: string }> };

// --- METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = receiptCases.find((d) => d.slug === slug);

  if (!data) return {};

  return {
    title: `${data.title} Online Grátis | Modelo para Imprimir (PDF)`,
    description: `Crie um ${data.title} profissional em segundos. Preenchimento automático, valor por extenso e opção de 2 vias. Grátis e sem cadastro.`,
    keywords: [data.title.toLowerCase(), "gerador de recibo", "modelo de recibo", "recibo pdf"],
    alternates: { canonical: `https://mestredascontas.com.br/ferramentas/gerador-recibo/${slug}` },
    openGraph: {
      title: `${data.title} - Gerador Online`,
      description: data.desc,
      url: `https://mestredascontas.com.br/ferramentas/gerador-recibo/${slug}`,
      siteName: "Mestre das Contas",
      type: "website",
    },
  };
}

export default async function ReceiptCasePage({ params }: Props) {
  const { slug } = await params;
  const data = receiptCases.find((d) => d.slug === slug);

  if (!data) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": data.title,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
    "description": data.desc,
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "850", "bestRating": "5", "worstRating": "1" }
  };

  return (
    <article className="w-full max-w-full overflow-hidden font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={data.title}
          description={data.desc}
          category="Modelos de Recibo"
          icon={<LayoutTemplate size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="slate"
          badge="Modelo Pronto"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Gerador de Recibo", href: "/ferramentas/gerador-recibo" },
            { label: data.title }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="recibo_case_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA JÁ PREENCHIDA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <ReceiptGenerator initialValues={data.prefill} />
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <AdUnit slot="recibo_case_mid" format="auto" />
        </div>

        {/* --- ARTIGO --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-slate-900 pl-4">
                Como preencher um {data.title}?
            </h2>
            <p className="lead text-slate-700 text-lg font-medium">
                Emitir um <strong>{data.title}</strong> correto é essencial para evitar problemas futuros e garantir o profissionalismo do seu negócio.
            </p>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 my-8 not-prose shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <PenTool size={24} className="text-blue-600"/> Dicas para este modelo
                </h3>
                <ul className="space-y-3 text-slate-700">
                    {data.tips.map((tip, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                            <CheckCircle2 className="text-green-600 mt-1 shrink-0" size={18}/>
                            <span>{tip}</span>
                        </li>
                    ))}
                    <li className="flex gap-3 items-start">
                        <CheckCircle2 className="text-green-600 mt-1 shrink-0" size={18}/>
                        <span><strong>Assinatura:</strong> O documento só tem validade legal após assinado pelo emissor (quem recebe o dinheiro).</span>
                    </li>
                </ul>
            </div>

            <h3>Por que usar nosso gerador?</h3>
            <ul>
                <li><strong>Automático:</strong> O valor por extenso é preenchido sozinho. Adeus erros de português.</li>
                <li><strong>2 Vias:</strong> Gere a via do cliente e a sua na mesma folha, economizando papel.</li>
                <li><strong>Profissional:</strong> Um PDF limpo e organizado passa muito mais credibilidade que um recibo de papelaria preenchido à mão.</li>
            </ul>

        </div>

        {/* NAVEGAÇÃO ENTRE MODELOS */}
        <div className="w-full max-w-4xl mx-auto mt-4 print:hidden">
             <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Outros Modelos de Recibo</h4>
             <div className="flex flex-wrap justify-center gap-2">
                {receiptCases.filter(d => d.slug !== slug).map((item) => (
                    <Link 
                        key={item.slug}
                        href={`/ferramentas/gerador-recibo/${item.slug}`} 
                        className="px-4 py-2 text-xs md:text-sm rounded-full bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900 transition-all hover:shadow-sm"
                    >
                        {item.title.replace("Recibo de ", "")}
                    </Link>
                ))}
            </div>
        </div>

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px] print:hidden">
            <AdUnit slot="recibo_case_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}