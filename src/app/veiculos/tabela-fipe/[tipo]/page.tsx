import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMarcas, createSlugWithId } from "@/lib/fipeApi";
import PageHeader from "@/components/layout/PageHeader";
import { Search, ShieldCheck, HelpCircle, FileText, ArrowRight, TrendingUp } from "lucide-react";
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

  const faqList = [
    {
      q: "Como as marcas influenciam no valor de revenda da FIPE?",
      a: "Marcas consolidadas com alto volume de vendas (como Fiat, Chevrolet e Volkswagen) possuem ampla rede de concessionárias e peças baratas, o que garante excelente liquidez de mercado e menor desvalorização na FIPE."
    },
    {
      q: "Marcas importadas possuem maior depreciação do que as nacionais?",
      a: "Sim, via de regra marcas importadas de menor volume de circulação sofrem depreciação nominal e real mais acentuada nos primeiros anos, devido a custos de manutenção preventiva mais elevados e peças importadas exclusivas."
    },
    {
      q: "O que acontece com a cotação FIPE se uma marca deixa de fabricar no Brasil?",
      a: "Quando uma montadora encerra suas linhas de produção nacionais, o mercado reage com receio de escassez de peças e desativação das redes autorizadas, causando depreciação acentuada e abrupta nos valores da Tabela FIPE."
    },
    {
      q: "Quais são as montadoras mais vendidas e com maior liquidez?",
      a: "No Brasil, montadoras tradicionais como Chevrolet, Volkswagen, Fiat e Toyota são consideradas as 'queridinhas' de revenda, sustentando excelente retenção de valor no mercado de seminovos e usados."
    },
    {
      q: "Como a rede de concessionárias afeta a estabilidade dos preços?",
      a: "Uma marca com dezenas de autorizadas ativas em todo o território garante facilidade de diagnóstico, mão de obra treinada e facilidade de repasse, o que atua como barreira natural contra a desvalorização excessiva."
    },
    {
      q: "Carros de marcas premium sofrem maior desvalorização nominal?",
      a: "Sim, carros de luxo (como BMW, Audi e Mercedes-Benz) desvalorizam nominalmente de forma bem mais rápida nos primeiros anos, porque o público de usados prioriza economia absoluta de aquisição e manutenção."
    },
    {
      q: "Como a reputação da marca afeta a Tabela FIPE?",
      a: "Marcas conhecidas por robustez mecânica (como Toyota e Honda) têm valorização histórica muito forte no índice, sendo comercializadas frequentemente muito próximas ou até acima do valor médio nacional FIPE."
    }
  ];

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
        "mainEntity": faqList.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-blue-600 pl-4 flex items-center gap-2">
            <TrendingUp className="text-blue-500" /> Como a Marca Influencia na Desvalorização de {tipoName}
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

          {/* TABELA DE COMPARAÇÃO DE BRANDS (HTML PURO RESPONSIVO) */}
          <div className="not-prose my-10 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-750 dark:text-slate-250 uppercase tracking-wide flex items-center gap-2">
                      <TrendingUp size={16} /> Índice Geral de Depreciação de Marcas Seminovo
                  </h4>
              </div>
              
              <div className="overflow-x-auto w-full">
                  <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">
                          <tr>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Grupo de Marcas</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Depreciação Típica</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Principais Exemplos</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Custo de Manutenção</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Volume Geral</td>
                              <td className="px-6 py-4 font-mono font-bold text-rose-500">9% a 12% ao ano</td>
                              <td className="px-6 py-4">Fiat, Chevrolet, Volkswagen, Hyundai</td>
                              <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">Baixo</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Retenção Premium</td>
                              <td className="px-6 py-4 font-mono font-bold text-green-600 dark:text-green-400">6% a 8% ao ano</td>
                              <td className="px-6 py-4">Toyota, Honda</td>
                              <td className="px-6 py-4 text-yellow-600 dark:text-yellow-500 font-bold">Médio</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Luxo Importado</td>
                              <td className="px-6 py-4 font-mono font-bold text-rose-600">14% a 18% ao ano</td>
                              <td className="px-6 py-4">BMW, Mercedes-Benz, Audi, Volvo</td>
                              <td className="px-6 py-4 text-red-500 dark:text-red-400 font-bold">Alto</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
        </div>

        {/* ACCORDION FAQ */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <HelpCircle className="text-blue-500" /> Perguntas e Respostas sobre Montadoras FIPE
          </h3>
          
          <Accordion type="single" collapsible className="w-full">
            {faqList.map((item, idx) => (
              <AccordionItem key={idx} value={`brand-faq-${idx}`}>
                <AccordionTrigger className="text-left font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* EXPERT SIGNATURE */}
        <ExpertSignature updatedAt="Junho de 2026" author="Equipe Editorial" />

        <SmartCrossLinker currentHref={`/veiculos/tabela-fipe/${tipo}`} category="destaques" maxItems={3} />

        {/* AD SLOT 3: BOTTOM */}
        <div className="w-full flex justify-center print:hidden min-h-[250px] my-2">
          <LazyAdUnit slot="fipe_brands_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
