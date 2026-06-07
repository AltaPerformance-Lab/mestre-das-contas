import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMarcas, getModelos, createSlugWithId, extractIdFromSlug } from "@/lib/fipeApi";
import PageHeader from "@/components/layout/PageHeader";
import { Search, ChevronRight, BookOpen, HelpCircle, FileText, Sparkles, TrendingDown } from "lucide-react";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PageProps {
  params: Promise<{ tipo: string; marcaSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { tipo, marcaSlug } = resolvedParams;
  if (!['carros', 'motos', 'caminhoes'].includes(tipo)) return {};

  const marcaId = extractIdFromSlug(marcaSlug);
  const marcas = await getMarcas(tipo as 'carros' | 'motos' | 'caminhoes').catch(() => []);
  const marca = marcas.find(m => m.codigo === marcaId);

  if (!marca) return {};

  const tipoName = tipo.charAt(0).toUpperCase() + tipo.slice(1);

  return {
    title: `Modelos de ${tipoName} ${marca.nome} | Tabela FIPE 2026`,
    description: `Consulte a Tabela FIPE de todos os modelos de ${tipo} da ${marca.nome}. Selecione o veículo para ver o histórico e cotação atualizada.`,
    alternates: {
      canonical: `https://mestredascontas.com.br/veiculos/tabela-fipe/${tipo}/${marcaSlug}`,
    },
  };
}

export default async function FipeModelosPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { tipo, marcaSlug } = resolvedParams;
  
  if (!['carros', 'motos', 'caminhoes'].includes(tipo)) {
    notFound();
  }

  const marcaId = extractIdFromSlug(marcaSlug);
  
  const [marcas, dataModelos] = await Promise.all([
    getMarcas(tipo as 'carros' | 'motos' | 'caminhoes').catch(() => []),
    getModelos(tipo as 'carros' | 'motos' | 'caminhoes', marcaId).catch(() => null)
  ]);

  if (!dataModelos) {
    notFound();
  }

  const marca = marcas.find(m => m.codigo === marcaId);
  if (!marca) {
    notFound();
  }

  const tipoName = tipo.charAt(0).toUpperCase() + tipo.slice(1);
  const modelos = dataModelos.modelos;

  // Sort alphabetically by name
  modelos.sort((a, b) => a.nome.localeCompare(b.nome));

  const faqList = [
    {
      q: "Como as versões de um mesmo modelo afetam a cotação FIPE?",
      a: "Diferentes versões possuem motorizações e transmissões distintas (como manual vs automática). Versões com câmbio automático e motores turbo retêm muito mais valor de mercado no índice FIPE."
    },
    {
      q: "Por que a desvalorização varia tanto entre hatchbackbacks, sedans e SUVs?",
      a: "Os SUVs possuem atualmente a maior preferência de compra do público de seminovos, o que faz com que retenham mais valor e desvalorizem mais lentamente do que sedans e hatches equivalentes."
    },
    {
      q: "O ano-modelo é mais importante que o ano de fabricação para a FIPE?",
      a: "Sim, absolutamente. A Tabela FIPE e as companhias de seguros consideram estritamente o ano-modelo como o indexador para cálculo referencial de preço do veículo."
    },
    {
      q: "Modelos com motores turbo desvalorizam mais do que motores aspirados?",
      a: "Não necessariamente. Embora tenham manutenção ligeiramente mais cara, motores turbo modernos entregam excelente desempenho e economia de combustível, sustentando excelente aceitação no mercado secundário."
    },
    {
      q: "Como os pacotes de opcionais são precificados na Tabela FIPE?",
      a: "A Tabela FIPE não precifica opcionais individuais adicionados na concessionária de forma separada. Ela expressa a média de anúncios de versões prontas, de modo que opcionais extras agregam margem física de negociação."
    },
    {
      q: "Qual a influência do tipo de transmissão (manual vs automática) na revenda?",
      a: "Câmbios automáticos dominam o mercado moderno. Veículos manuais de segmentos médios ou superiores sofrem desvalorização severa e deságio acentuado em relação à média FIPE por falta de demanda de usados."
    },
    {
      q: "Modelos que saíram de linha sofrem desvalorização instantânea?",
      a: "Sim, geralmente há uma depreciação extra imediata de 10% a 15% quando um veículo é descontinuado pela fabricante, motivada pelo medo de escassez futura de peças de reposição específicas."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": `Modelos de ${tipoName} da ${marca.nome} - Tabela FIPE`,
        "description": `Selecione o modelo da ${marca.nome} para consultar os valores da Tabela FIPE.`,
        "url": `https://mestredascontas.com.br/veiculos/tabela-fipe/${tipo}/${marcaSlug}`,
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
        title={`Modelos da ${marca.nome}`}
        description={`Escolha o modelo de ${tipo} da montadora ${marca.nome} abaixo. Listamos todas as versões oficiais com histórico de mercado da FIPE.`}
        category="veiculos"
        variant="finance"
        breadcrumbs={[
          { label: "Veículos", href: "/veiculos" },
          { label: "Tabela FIPE", href: "/veiculos/tabela-fipe" },
          { label: tipoName, href: `/veiculos/tabela-fipe/${tipo}` },
          { label: marca.nome }
        ]}
      />

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-5xl mx-auto -mt-8 relative z-10">
        
        {/* AD SLOT 1: TOP */}
        <div className="w-full flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg print:hidden min-h-[100px]">
          <LazyAdUnit slot="fipe_models_top" format="horizontal" variant="agency" />
        </div>

        {/* MODELS CONTAINER */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Search className="text-blue-600 dark:text-blue-400" />
              3. Escolha o Modelo do Veículo:
            </h2>
            <div className="text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-full shrink-0">
              {modelos.length} modelos localizados
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {modelos.map((modelo) => {
              const slug = createSlugWithId(modelo.codigo, modelo.nome);
              return (
                <Link
                  key={modelo.codigo}
                  href={`/veiculos/tabela-fipe/${tipo}/${marcaSlug}/${slug}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600 transition-colors group shadow-sm hover:shadow-md"
                >
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors truncate pr-2">
                    {modelo.nome}
                  </span>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* AD SLOT 2: MIDDLE */}
        <div className="w-full flex justify-center print:hidden min-h-[250px] my-2">
          <LazyAdUnit slot="fipe_models_mid" format="auto" />
        </div>

        {/* DEEP SEO CONTENT */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden w-full">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-blue-600 pl-4 flex items-center gap-2">
            <BookOpen className="text-blue-500" /> Tabela FIPE: Entenda as Versões e Configurações da {marca.nome}
          </h2>
          
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            A montadora <strong>{marca.nome}</strong> possui uma vasta gama de modelos de <strong>{tipo}</strong> cadastrados na Tabela FIPE. Cada modelo pode se desmembrar em dezenas de versões específicas dependendo da motorização (Ex: 1.0, 1.6, 2.0 Turbo), do tipo de combustível (Flex, Diesel, Híbrido, Elétrico), do tipo de transmissão (Manual, Automático, CVT) e do nível de acabamento de fábrica.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Sparkles className="text-emerald-500" /> O Peso dos Opcionais na Revenda
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Veículos equipados com câmbio automático, teto solar, centrais multimídia modernas e sistemas avançados de assistência ao condutor (ADAS) têm excelente liquidez no mercado brasileiro de seminovos. Esses itens ajudam a sustentar o preço real de fechamento da transação bem próximo ou até acima da Tabela FIPE.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FileText className="text-blue-500" /> Versões de Entrada vs Top de Linha
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                As versões top de linha costumam desvalorizar de forma nominalmente mais acentuada nos primeiros anos de uso se comparadas às versões de entrada (básicas). Isso ocorre porque o mercado de usados valoriza mais o preço de aquisição absoluto, de modo que o valor da FIPE reflete essa acomodação econômica.
              </p>
            </div>
          </div>

          {/* TABELA DE COMPARAÇÃO DE MODELOS (HTML PURO RESPONSIVO) */}
          <div className="not-prose my-10 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-750 dark:text-slate-250 uppercase tracking-wide flex items-center gap-2">
                      <TrendingDown size={16} /> Depreciação de Modelos por Categoria
                  </h4>
              </div>
              
              <div className="overflow-x-auto w-full">
                  <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">
                          <tr>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Segmento do Veículo</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Depreciação (1º Ano)</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Depreciação (3º Ano)</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Depreciação (5º Ano)</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-850 dark:text-slate-100 font-sans">Hatches Compactos</td>
                              <td className="px-6 py-4 text-center font-bold text-rose-500">~ 10%</td>
                              <td className="px-6 py-4 text-center">~ 22%</td>
                              <td className="px-6 py-4 text-center">~ 35%</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-850 dark:text-slate-100 font-sans">SUVs / Sedans Médios</td>
                              <td className="px-6 py-4 text-center font-bold text-rose-500">~ 13%</td>
                              <td className="px-6 py-4 text-center">~ 28%</td>
                              <td className="px-6 py-4 text-center">~ 42%</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-850 dark:text-slate-100 font-sans">Executivos / Importados</td>
                              <td className="px-6 py-4 text-center font-bold text-rose-600">~ 16%</td>
                              <td className="px-6 py-4 text-center">~ 35%</td>
                              <td className="px-6 py-4 text-center">~ 50%</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
        </div>

        {/* ACCORDION FAQ */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <HelpCircle className="text-blue-500" /> Perguntas sobre os Modelos da {marca.nome}
          </h3>
          
          <Accordion type="single" collapsible className="w-full">
            {faqList.map((item, idx) => (
              <AccordionItem key={idx} value={`model-faq-${idx}`}>
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

        <SmartCrossLinker currentHref={`/veiculos/tabela-fipe/${tipo}/${marcaSlug}`} category="destaques" maxItems={3} />

        {/* AD SLOT 3: BOTTOM */}
        <div className="w-full flex justify-center print:hidden min-h-[250px] my-2">
          <LazyAdUnit slot="fipe_models_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
