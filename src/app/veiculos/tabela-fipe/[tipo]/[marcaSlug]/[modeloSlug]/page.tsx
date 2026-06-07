import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMarcas, getModelos, getAnos, createSlugWithId, extractIdFromSlug } from "@/lib/fipeApi";
import PageHeader from "@/components/layout/PageHeader";
import { Calendar, ChevronRight, Activity, HelpCircle, FileText, TrendingDown, BookOpen } from "lucide-react";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PageProps {
  params: Promise<{ tipo: string; marcaSlug: string; modeloSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { tipo, marcaSlug, modeloSlug } = resolvedParams;
  if (!['carros', 'motos', 'caminhoes'].includes(tipo)) return {};

  const marcaId = extractIdFromSlug(marcaSlug);
  const modeloId = extractIdFromSlug(modeloSlug);

  const [marcas, dataModelos] = await Promise.all([
    getMarcas(tipo as 'carros' | 'motos' | 'caminhoes').catch(() => []),
    getModelos(tipo as 'carros' | 'motos' | 'caminhoes', marcaId).catch(() => null)
  ]);

  if (!marcas || !dataModelos) return {};

  const marca = marcas.find(m => m.codigo === marcaId);
  const modelo = dataModelos.modelos.find(m => m.codigo.toString() === modeloId);

  if (!marca || !modelo) return {};

  const tipoName = tipo.charAt(0).toUpperCase() + tipo.slice(1);

  return {
    title: `Anos e Versões do ${marca.nome} ${modelo.nome} | Tabela FIPE 2026`,
    description: `Consulte a Tabela FIPE por ano de fabricação para o ${marca.nome} ${modelo.nome}. Veja a lista de anos disponíveis para simular a cotação oficial.`,
    alternates: {
      canonical: `https://mestredascontas.com.br/veiculos/tabela-fipe/${tipo}/${marcaSlug}/${modeloSlug}`,
    },
  };
}

export default async function FipeAnosPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { tipo, marcaSlug, modeloSlug } = resolvedParams;
  
  if (!['carros', 'motos', 'caminhoes'].includes(tipo)) {
    notFound();
  }

  const marcaId = extractIdFromSlug(marcaSlug);
  const modeloId = extractIdFromSlug(modeloSlug);
  
  const [marcas, dataModelos, anos] = await Promise.all([
    getMarcas(tipo as 'carros' | 'motos' | 'caminhoes').catch(() => []),
    getModelos(tipo as 'carros' | 'motos' | 'caminhoes', marcaId).catch(() => null),
    getAnos(tipo as 'carros' | 'motos' | 'caminhoes', marcaId, modeloId).catch(() => [])
  ]);

  if (!dataModelos || anos.length === 0) {
    notFound();
  }

  const marca = marcas.find(m => m.codigo === marcaId);
  const modelo = dataModelos.modelos.find(m => m.codigo.toString() === modeloId);

  if (!marca || !modelo) {
    notFound();
  }

  const tipoName = tipo.charAt(0).toUpperCase() + tipo.slice(1);

  const faqList = [
    {
      q: `Como funciona a desvalorização por ano do ${marca.nome} ${modelo.nome}?`,
      a: "A desvalorização tende a ser mais acentuada nos primeiros 3 anos de vida útil do veículo, acumulando de 12% a 18% ao ano. Passada essa fase de maior impacto cambial e comercial, a depreciação anual se estabiliza em torno de 8% a 10% dependendo diretamente de fatores como o estado de conservação do motor e lataria."
    },
    {
      q: "Por que carros de anos diferentes podem ter o mesmo preço de tabela FIPE?",
      a: "Isso ocorre raramente quando há transições bruscas de pacotes de opcionais ou motores na linha de montagem, ou em casos de flutuações atípicas no mercado de usados, mas o normal é que cada ano de fabricação ou ano-modelo possua cotações distintas no índice."
    },
    {
      q: "O que significa um veículo classificado como 'Zero KM' ou com código '32000'?",
      a: "Os registros que trazem a identificação 'Zero KM' ou o código interno de ano '32000' na base de dados expressam o preço médio nacional de varejo sugerido pelas montadoras e concessionárias autorizadas para veículos novos sem licenciamento prévio."
    },
    {
      q: "Veículos importados desvalorizam mais rápido a cada ano do que os nacionais?",
      a: "Sim, geralmente veículos importados sofrem uma curva de depreciação anual ligeiramente mais inclinada. Isso ocorre devido ao custo elevado de importação de autopeças de reposição e redes autorizadas mais restritas geograficamente."
    },
    {
      q: "Como a quilometragem e o estado físico alteram o valor real frente à FIPE?",
      a: "A Tabela FIPE aponta estritamente um valor médio nacional. Na prática de mercado, veículos extremamente rodados ou com avarias na funilaria sofrem um desconto físico que varia de 10% a 25% na cotação real de fechamento."
    },
    {
      q: "Qual a diferença real entre o ano de fabricação e o ano-modelo?",
      a: "O ano de fabricação denota o ano civil em que o chassi do carro foi fisicamente construído e montado. O ano-modelo representa a especificação e o design mercadológico definido pelo fabricante para as vendas. A Tabela FIPE considera exclusivamente o ano-modelo."
    },
    {
      q: "Veículos descontinuados ou fora de linha sofrem maior desvalorização?",
      a: "Sim, a descontinuação oficial de um modelo acarreta costumeiramente uma depreciação extra imediata de 10% a 15% na tabela FIPE, alimentada pelo receio dos consumidores em relação à futura escassez de componentes de reposição originais."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": `Histórico por Ano do ${marca.nome} ${modelo.nome}`,
        "description": `Selecione o ano do modelo ${modelo.nome} da ${marca.nome} para obter a cotação oficial FIPE.`,
        "url": `https://mestredascontas.com.br/veiculos/tabela-fipe/${tipo}/${marcaSlug}/${modeloSlug}`,
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
        title={`Anos de ${modelo.nome}`}
        description={`Selecione o ano de fabricação do seu ${marca.nome} ${modelo.nome} para obter a precificação oficial e acompanhar o histórico de desvalorização.`}
        category="veiculos"
        variant="finance"
        breadcrumbs={[
          { label: "Veículos", href: "/veiculos" },
          { label: "Tabela FIPE", href: "/veiculos/tabela-fipe" },
          { label: tipoName, href: `/veiculos/tabela-fipe/${tipo}` },
          { label: marca.nome, href: `/veiculos/tabela-fipe/${tipo}/${marcaSlug}` },
          { label: modelo.nome }
        ]}
      />

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-5xl mx-auto -mt-8 relative z-10">
        
        {/* AD SLOT 1: TOP */}
        <div className="w-full flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg print:hidden min-h-[100px]">
          <LazyAdUnit slot="fipe_years_top" format="horizontal" variant="agency" />
        </div>

        {/* YEARS CONTAINER */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="text-blue-600 dark:text-blue-400" />
              4. Selecione o Ano de Fabricação / Modelo:
            </h2>
            <div className="text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-full shrink-0">
              {anos.length} anos registrados na FIPE
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {anos.map((ano) => {
              return (
                <Link
                  key={ano.codigo}
                  href={`/veiculos/tabela-fipe/${tipo}/${marcaSlug}/${modeloSlug}/${ano.codigo}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600 transition-colors group shadow-sm hover:shadow-md"
                >
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    {ano.nome.replace('32000', 'Zero KM')}
                  </span>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* AD SLOT 2: MIDDLE */}
        <div className="w-full flex justify-center print:hidden min-h-[250px] my-2">
          <LazyAdUnit slot="fipe_years_mid" format="auto" />
        </div>

        {/* DEEP SEO CONTENT */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden w-full">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-blue-600 pl-4 flex items-center gap-2">
            <Activity className="text-emerald-500" /> Tabela FIPE por Ano de Fabricação: {marca.nome} {modelo.nome}
          </h2>
          
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            A desvalorização de um veículo está diretamente ligada ao seu ano de fabricação e modelo. Nesta página, listamos o histórico completo de anos disponíveis para o modelo <strong>{modelo.nome}</strong> da <strong>{marca.nome}</strong>. Nós nos empenhamos para trazer os dados mais atualizados do mercado para que você faça a melhor escolha financeira.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <TrendingDown className="text-blue-500" /> A Curva de Depreciação no Tempo
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Entender a diferença de preços entre diferentes anos do mesmo veículo é uma excelente tática de economia financeira. Ao comprar um seminovo de 2 ou 3 anos de uso, você deixa que o proprietário original absorva a depreciação mais pesada (a perda inicial de retirar o carro zero KM da concessionária).
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FileText className="text-emerald-500" /> Modelos "Zero KM" vs Próximos Anos
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Os modelos FIPE classificados como "32000" ou "Zero KM" representam o valor sugerido de venda nas redes autorizadas no presente mês. A partir do momento em que o veículo é licenciado e emplacado, ele passa a seguir a cotação do seu ano/modelo correspondente, sofrendo o deságio do mercado secundário.
              </p>
            </div>
          </div>

          {/* TABELA DE COMPARAÇÃO DE DESVALORIZAÇÃO ANUAL (HTML PURO RESPONSIVO) */}
          <div className="not-prose my-10 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-750 dark:text-slate-250 uppercase tracking-wide flex items-center gap-2">
                      <TrendingDown size={16} /> Depreciação Média por Idade do Veículo
                  </h4>
              </div>
              
              <div className="overflow-x-auto w-full">
                  <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">
                          <tr>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Segmento de Veículo</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Desvalorização Anual (1-3 Anos)</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Desvalorização Anual (3-5 Anos)</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Depreciação (5+ Anos)</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Liquidez Média</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono text-center">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100 text-left font-sans">Hatches Compactos</td>
                              <td className="px-6 py-4 text-rose-500 font-bold">~ 10%</td>
                              <td className="px-6 py-4 text-slate-500">~ 8%</td>
                              <td className="px-6 py-4 text-slate-500">~ 6%</td>
                              <td className="px-6 py-4 font-sans"><span className="bg-green-100/80 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded text-xs font-bold">Muito Alta</span></td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100 text-left font-sans">Sedans / SUVs Médios</td>
                              <td className="px-6 py-4 text-rose-500 font-bold">~ 12%</td>
                              <td className="px-6 py-4 text-slate-500">~ 9%</td>
                              <td className="px-6 py-4 text-slate-500">~ 7%</td>
                              <td className="px-6 py-4 font-sans"><span className="bg-green-100/80 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded text-xs font-bold">Alta</span></td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100 text-left font-sans">Importados de Luxo</td>
                              <td className="px-6 py-4 text-rose-600 font-bold">~ 18%</td>
                              <td className="px-6 py-4 text-slate-600 font-semibold">~ 14%</td>
                              <td className="px-6 py-4 text-slate-500">~ 10%</td>
                              <td className="px-6 py-4 font-sans"><span className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded text-xs font-bold">Baixa a Média</span></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
        </div>

        {/* ACCORDION FAQ */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <HelpCircle className="text-blue-500" /> Perguntas e Respostas sobre Ano FIPE
          </h3>
          
          <Accordion type="single" collapsible className="w-full">
            {faqList.map((item, idx) => (
              <AccordionItem key={idx} value={`year-faq-${idx}`}>
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
        <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />

        <SmartCrossLinker currentHref={`/veiculos/tabela-fipe/${tipo}/${marcaSlug}/${modeloSlug}`} category="destaques" maxItems={3} />

        {/* AD SLOT 3: BOTTOM */}
        <div className="w-full flex justify-center print:hidden min-h-[250px] my-2">
          <LazyAdUnit slot="fipe_years_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
