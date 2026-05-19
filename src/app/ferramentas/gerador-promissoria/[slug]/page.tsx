import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { promissoryCases } from "@/data/promissory-cases";
import PromissoryGenerator from "@/components/tools/PromissoryGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { Suspense } from "react";
import { 
  FileText, ShieldCheck, 
  CheckCircle2, AlertTriangle, Scale
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return promissoryCases.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = promissoryCases.find((c) => c.slug === slug);
  
  if (!note) {
    return { title: "Promissória não encontrada" };
  }

  const title = `${note.name} (Grátis em PDF) | Modelo 2026`;
  const description = `Gere sua ${note.name} online e de graça. Modelo de título de crédito pronto para impressão, garantindo a cobrança legal da sua dívida.`;

  return {
    title,
    description,
    keywords: [...note.keywords, "gerador de nota promissoria gratis", "promissoria em pdf", "modelo de nota promissoria para imprimir"],
    alternates: { canonical: `https://mestredascontas.com.br/ferramentas/gerador-promissoria/${note.slug}` },
    openGraph: {
      title,
      description,
      url: `https://mestredascontas.com.br/ferramentas/gerador-promissoria/${note.slug}`,
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.name} (Grátis)`,
      description: "Gerador automático de notas promissórias em PDF. Proteja seu dinheiro.",
    },
    robots: { index: true, follow: true }
  };
}

export default async function PromissoryCasePage({ params }: PageProps) {
  const { slug } = await params;
  const note = promissoryCases.find((c) => c.slug === slug);

  if (!note) {
    notFound();
  }

  // JSON-LD Dinâmico (Dual: App + HowTo)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": note.name,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": note.description
      },
      {
        "@type": "HowTo",
        "name": `Como preencher e imprimir ${note.name}`,
        "description": `Passo a passo simples para emitir sua ${note.name} grátis em PDF com valor por extenso automático.`,
        "totalTime": "PT1M",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Digite o Valor",
            "text": "Informe o valor em reais da promissória. A ferramenta calcula o valor por extenso automaticamente por segurança.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-promissoria/${note.slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Preencha Devedor e Credor",
            "text": "Preencha os dados do devedor (quem vai pagar) e do credor (quem vai receber), incluindo CPF/CNPJ.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-promissoria/${note.slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Insira Datas e Vencimento",
            "text": "Defina o dia do vencimento e o local e data de emissão do título de crédito.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-promissoria/${note.slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Imprima em PDF e Assine",
            "text": "Clique no botão de impressão. O devedor precisa assinar a próprio punho para ter validade jurídica.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-promissoria/${note.slug}#ferramenta`
          }
        ]
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 font-sans bg-slate-50 dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title={note.name}
          description={note.description}
          category="Cobrança e Garantia"
          icon={<FileText size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="amber"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Nota Promissória", href: "/ferramentas/gerador-promissoria" },
            { label: note.shortName }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* AD TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200 mt-8 print:hidden min-h-[100px]">
           <LazyAdUnit slot="promissory_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section className="w-full max-w-5xl mx-auto relative z-10">
           <div className="mb-6 print:hidden">
              <PrivacyBadge />
           </div>
           
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <PromissoryGenerator />
           </Suspense>
           
           <div className="mt-8 print:hidden">
              <DisclaimerBox />
           </div>
        </section>

        {/* INSTRUÇÕES E SEO */}
        <section className="w-full max-w-4xl mx-auto mt-12 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
          
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-l-4 border-amber-500 pl-4">
              Como Usar o Gerador de Notas Promissórias (Passo a Passo)
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
             Crie seu título de crédito legalizado em PDF em segundos de forma totalmente gratuita:
          </p>

          <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center shrink-0">1</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Valor Monetário</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Insira o valor em reais. O sistema converterá por extenso automaticamente no corpo da promissória e do canhoto.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center shrink-0">2</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Dados das Partes</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Preencha o nome completo e o documento (CPF ou CNPJ) do Emitente/Devedor (quem deve pagar) e do Beneficiário/Credor (quem recebe).</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center shrink-0">3</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Vencimento e Local</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Insira a data do vencimento do pagamento e o local onde o título foi emitido (Cidade/Estado) para delimitar o foro jurídico.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center shrink-0">4</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Imprima e Assine</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Gere e salve o PDF. É indispensável colher a **assinatura do punho próprio do emitente** para garantir o valor executivo legal.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 mt-12 flex items-center gap-2">
            <Scale className="text-amber-600" /> Como garantir que esta Promissória tenha validade?
          </h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              Você gerou uma <strong>{note.name}</strong>, que é uma promessa de pagamento. Para que ela seja um título executivo extrajudicial forte (permitindo que você execute a dívida direto na justiça se não for paga), siga as regras de ouro abaixo:
            </p>
            <ul className="space-y-3 mt-4">
              <li className="flex gap-2">
                 <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" /> 
                 <span><strong>Valor por extenso obrigatoriamente correto:</strong> Nossa ferramenta já escreve o valor por extenso automaticamente. Mas confira se bate exatamente com o valor numérico. Em caso de divergência na justiça, o valor por extenso é o que vale.</span>
              </li>
              <li className="flex gap-2">
                 <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" /> 
                 <span><strong>Assinatura do próprio punho:</strong> O devedor (Emitente) deve assinar o documento preferencialmente com caneta azul ou preta, de forma legível e igual ao documento de identidade.</span>
              </li>
              <li className="flex gap-2">
                 <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" /> 
                 <span><strong>Não rasure:</strong> Nunca use corretivo (branquinho) ou risque informações em uma nota promissória. Se errar ao imprimir ou assinar, gere e imprima uma nova.</span>
              </li>
            </ul>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900 mt-8">
              <h4 className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-400 mt-0">
                <ShieldCheck size={20} /> Prescrição da Dívida
              </h4>
              <p className="text-blue-800 dark:text-blue-200 text-sm mb-0">
                Fique atento ao prazo! Uma nota promissória <strong>prescreve em 3 (três) anos</strong> contados a partir da data de vencimento. Após esse prazo, ela perde a força executiva, tornando a cobrança judicial muito mais difícil e demorada.
              </p>
            </div>
          </div>
        </section>

        <SmartCrossLinker 
          currentHref={`/ferramentas/gerador-promissoria/${note.slug}`} 
          category="ferramentas"
        />

        {/* AD BOTTOM */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center mt-12 print:hidden min-h-[250px]">
           <LazyAdUnit slot="promissory_bottom" format="square" variant="in-article" />
        </div>
      </div>
    </article>
  );
}
