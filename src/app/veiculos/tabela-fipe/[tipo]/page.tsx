import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMarcas, createSlugWithId } from "@/lib/fipeApi";
import PageHeader from "@/components/layout/PageHeader";
import { Search, ShieldCheck, HelpCircle, FileText, ArrowRight } from "lucide-react";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export async function generateStaticParams() {
  return [
    { tipo: "carros" },
    { tipo: "motos" },
    { tipo: "caminhoes" },
  ];
}

interface PageProps {
  params: Promise<{ tipo: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { tipo } = resolvedParams;
  if (!['carros', 'motos', 'caminhoes'].includes(tipo)) return {};

  const tipoName = tipo.charAt(0).toUpperCase() + tipo.slice(1);

  return {
    title: `Tabela FIPE de ${tipoName} 2026 | Todas as Marcas e Montadoras`,
    description: `Consulte os valores oficiais da Tabela FIPE para ${tipo} no Brasil. Veja a lista completa de montadoras nacionais e importadoras para avaliação de preço.`,
    alternates: {
      canonical: `https://mestredascontas.com.br/veiculos/tabela-fipe/${tipo}`,
    },
  };
}

export default async function FipeMarcasPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { tipo } = resolvedParams;
  
  if (!['carros', 'motos', 'caminhoes'].includes(tipo)) {
    notFound();
  }

  const tipoName = tipo.charAt(0).toUpperCase() + tipo.slice(1);
  const marcas = await getMarcas(tipo as 'carros' | 'motos' | 'caminhoes');

  // Sort alphabetically by name
  marcas.sort((a, b) => a.nome.localeCompare(b.nome));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": `Tabela FIPE de Marcas de ${tipoName}`,
        "description": `Selecione a marca de ${tipo} para prosseguir com a cotação oficial da FIPE.`,
        "url": `https://mestredascontas.com.br/veiculos/tabela-fipe/${tipo}`,
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Como funciona a desvalorização entre diferentes marcas de ${tipo}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Marcas com maior volume de vendas e ampla rede de concessionárias (como Fiat, Chevrolet, Volkswagen e Toyota) costumam apresentar maior liquidez e menor desvalorização anual no mercado de seminovos."
            }
          }
        ]
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader 
        title={`Marcas de ${tipoName}`}
        description={`Selecione a montadora abaixo para visualizar a lista de modelos de ${tipo} disponíveis na Tabela FIPE e acompanhar a evolução dos preços.`}
        category="veiculos"
        variant="finance"
        breadcrumbs={[
          { label: "Veículos", href: "/veiculos" },
          { label: "Tabela FIPE", href: "/veiculos/tabela-fipe" },
          { label: tipoName }
        ]}
      />

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-5xl mx-auto -mt-8 relative z-10">
        
        {/* AD SLOT 1: TOP */}
        <div className="w-full flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg print:hidden min-h-[100px]">
          <LazyAdUnit slot="fipe_brands_top" format="horizontal" variant="agency" />
        </div>

        {/* BRANDS CONTAINER */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Search className="text-blue-600 dark:text-blue-400" />
              2. Escolha a Marca do Veículo:
            </h2>
            <div className="text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-full shrink-0">
              {marcas.length} montadoras cadastradas
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {marcas.map((marca) => {
              const slug = createSlugWithId(marca.codigo, marca.nome);
              return (
                <Link
                  key={marca.codigo}
                  href={`/veiculos/tabela-fipe/${tipo}/${slug}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600 transition-colors group shadow-sm text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  <span className="group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors truncate">
                    {marca.nome}
                  </span>
                  <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-blue-500 transition-all shrink-0 ml-1" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* AD SLOT 2: MIDDLE */}
        <div className="w-full flex justify-center print:hidden min-h-[250px] my-2">
          <LazyAdUnit slot="fipe_brands_mid" format="auto" />
        </div>

        {/* DEEP SEO CONTENT */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden w-full">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-blue-600 pl-4">
            Como a Marca Influencia na Desvalorização de {tipoName}
          </h2>
          
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Ao navegar pelas marcas de <strong>{tipo}</strong> acima, é importante compreender que a montadora é o fator número um que dita a liquidez e a curva de depreciação do seu bem. Marcas consolidadas com extensas redes de concessionárias e facilidade de reposição de peças originais tendem a manter seus preços muito mais estáveis no índice FIPE do que montadoras de menor penetração ou que saíram recentemente de linha de produção nacional.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <ShieldCheck className="text-emerald-500" /> Marcas com Alta Liquidez
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Montadoras como Chevrolet, Volkswagen, Fiat e Toyota são consideradas as queridinhas do mercado de seminovos. A enorme demanda por seus modelos garante que o preço negociado na concessionária ou de forma particular fique extremamente próximo ao valor referencial estipulado na Tabela FIPE atualizada.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FileText className="text-blue-500" /> Marcas de Luxo ou Importadas
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Modelos de marcas premium ou marcas importadas de menor volume podem apresentar uma depreciação mais acentuada nos primeiros anos. Os custos de manutenção preventiva mais elevados e peças importadas fazem com que os compradores demandem descontos adicionais em relação ao preço referencial médio nacional.
              </p>
            </div>
          </div>
        </div>

        {/* ACCORDION FAQ */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <HelpCircle className="text-blue-500" /> Perguntas e Respostas sobre Montadoras FIPE
          </h3>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="brand-faq-1">
              <AccordionTrigger className="text-left font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600">
                O que acontece se uma montadora encerra operações no Brasil?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Quando uma montadora deixa de fabricar localmente e passa a atuar apenas como importadora (ou encerra atividades totalmente), seus veículos costumam sofrer uma desvalorização abrupta na Tabela FIPE nos meses seguintes. O mercado reage com medo da escassez de peças de reposição e da desativação das redes autorizadas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="brand-faq-2">
              <AccordionTrigger className="text-left font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600">
                Quais marcas de motocicletas seguram melhor o preço?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                No segmento de duas rodas, montadoras como Honda e Yamaha detêm mais de 80% de participação do mercado. Essa altíssima circulação garante uma liquidez imbatível, fazendo com que suas motocicletas mantenham valores de revenda consistentes no índice FIPE por muitos anos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* EXPERT SIGNATURE */}
        <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />

        <SmartCrossLinker currentHref={`/veiculos/tabela-fipe/${tipo}`} category="destaques" maxItems={3} />

        {/* AD SLOT 3: BOTTOM */}
        <div className="w-full flex justify-center print:hidden min-h-[250px] my-2">
          <LazyAdUnit slot="fipe_brands_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
