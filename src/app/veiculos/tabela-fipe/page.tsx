import { Metadata } from "next";
import Link from "next/link";
import { Car, Bike, Truck, TrendingUp, Search, Info, HelpCircle, FileText, Landmark } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Tabela FIPE Oficial 2026 | Consulta de Veículos Atualizada",
  description: "Consulte grátis o preço médio de carros, motos, utilitários e caminhões na Tabela FIPE. Dados oficiais atualizados mensalmente para todo o Brasil em 2026.",
  keywords: [
    "tabela fipe 2026", 
    "fipe carros", 
    "fipe motos", 
    "fipe caminhões", 
    "preço de veículos usados", 
    "consulta fipe oficial",
    "valor de referencia fipe"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/veiculos/tabela-fipe",
  },
};

const faqList = [
  {
    q: "O que é e para que serve a Tabela FIPE?",
    a: "A Tabela FIPE expressa a média de preços pela qual os veículos são anunciados no mercado nacional. Desenvolvida pela Fundação Instituto de Pesquisas Econômicas, ela serve como o principal indexador para negociações de compra/venda, cálculo de indenização de seguros e base para impostos como o IPVA."
  },
  {
    q: "Com qual frequência a Tabela FIPE é atualizada?",
    a: "A tabela é atualizada rigorosamente todos os meses, geralmente no primeiro dia útil. Nosso sistema espelha os bancos de dados da FIPE em tempo real para garantir que você sempre consulte a cotação oficial mais recente."
  },
  {
    q: "Por que o valor real de mercado pode diferir da FIPE?",
    a: "A FIPE expressa uma média nacional de anúncios de veículos em bom estado. Variáveis específicas como quilometragem rodada, histórico de colisões, cor do veículo, opcionais instalados e a demanda específica da sua região geográfica farão com que o preço de transação real divirja do valor de tabela."
  },
  {
    q: "Como é feito o levantamento dos preços pela FIPE?",
    a: "Os pesquisadores da FIPE coletam preços de anúncios de veículos em todo o país. Após descartar os extremos (valores muito altos ou baixos causados por blindagens, anomalias ou sinistros), eles calculam uma média estatística ponderada."
  },
  {
    q: "A Tabela FIPE serve como base para quais impostos estaduais?",
    a: "A Tabela FIPE é a base de cálculo oficial para o IPVA (Imposto sobre a Propriedade de Veículos Automotores) na maioria das unidades federativas do Brasil. A alíquota do imposto estadual é aplicada sobre o valor do veículo na tabela FIPE do ano anterior."
  },
  {
    q: "Como o tipo de combustível afeta a cotação do veículo?",
    a: "Veículos a diesel costumam reter melhor o valor em picapes e pesados, enquanto carros flex oferecem excelente liquidez em modelos compactos de entrada. Motores híbridos e elétricos estão apresentando novos perfis de depreciação à medida que a infraestrutura nacional amadurece."
  },
  {
    q: "Veículos sinistrados ou com passagem por leilão seguem a Tabela FIPE?",
    a: "Não. Veículos recuperados de sinistros graves, com laudo de leilão ou histórico de enchente sofrem um deságio de mercado acentuado, sendo negociados normalmente de 20% a 40% abaixo do valor oficial estipulado na Tabela FIPE."
  }
];

export default function TabelaFipeHubPage() {
  const tipos = [
    { id: "carros", title: "Carros e Utilitários", icon: Car, desc: "Veículos de passeio, SUVs, picapes e vans leves." },
    { id: "motos", title: "Motos e Quadriciclos", icon: Bike, desc: "Motocicletas, scooters, ciclomotores e triciclos." },
    { id: "caminhoes", title: "Caminhões e Micro-ônibus", icon: Truck, desc: "Veículos pesados de carga, ônibus e micro-ônibus." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
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
        title="Tabela FIPE Oficial"
        description="Acesse o maior banco de dados de precificação automotiva do Brasil. Consulte o valor médio de mercado de qualquer veículo nacional ou importado."
        category="veiculos"
        icon={<Car size={32} className="text-blue-600" />}
        variant="finance"
        breadcrumbs={[
          { label: "Veículos", href: "/veiculos" },
          { label: "Tabela FIPE" }
        ]}
      />

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-5xl mx-auto -mt-8 relative z-10">
        
        {/* AD SLOT 1: TOP */}
        <div className="w-full flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg print:hidden min-h-[100px]">
          <LazyAdUnit slot="fipe_hub_top" format="horizontal" variant="agency" />
        </div>

        {/* MAIN SELECTOR */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
            <Search className="text-blue-600 dark:text-blue-400" />
            1. Escolha a Categoria do Veículo:
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {tipos.map((tipo) => {
              const Icon = tipo.icon;
              return (
                <Link 
                  key={tipo.id} 
                  href={`/veiculos/tabela-fipe/${tipo.id}`}
                  className="group flex flex-col p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600 transition-all text-center items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 transition-colors">{tipo.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{tipo.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* AD SLOT 2: MIDDLE */}
        <div className="w-full flex justify-center print:hidden min-h-[250px] my-2">
          <LazyAdUnit slot="fipe_hub_mid" format="auto" />
        </div>

        {/* SEO DEEP CONTENT PANEL */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden w-full">
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-emerald-500 pl-4">
            Guia Completo da Tabela FIPE 2026
          </h2>
          
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Consultar a Tabela FIPE é um passo indispensável no planejamento financeiro de qualquer transação automotiva no Brasil. Quer nós estejamos comprando um hatch econômico seminovo, vendendo uma motocicleta usada ou buscando o valor referencial para fechar a cotação do seu seguro auto, as informações oficiais fornecem a base justa de partida.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FileText className="text-blue-500" /> Utilidades Práticas do Índice
              </h3>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 pl-4 list-disc">
                <li><strong>Compra e Venda:</strong> Evita pagar ágio abusivo ou vender seu automóvel por valores muito inferiores à média nacional.</li>
                <li><strong>Impostos Estaduais (IPVA):</strong> A base tributária que define o imposto anual é baseada no valor FIPE do veículo.</li>
                <li><strong>Apólice de Seguro:</strong> As indenizações integrais (sinistro por perda total ou roubo) cobrem usualmente 100% da tabela FIPE.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <TrendingUp className="text-emerald-500" /> Principais Fatores de Variação
              </h3>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 pl-4 list-disc">
                <li><strong>Estado Geral:</strong> Arranhões na pintura, desgaste nos pneus ou problemas no motor reduzem o preço final.</li>
                <li><strong>Acessórios Extra:</strong> Central multimídia de ponta, teto solar ou bancos de couro podem agregar valor além do referencial.</li>
                <li><strong>Demanda Regional:</strong> Modelos muito cobiçados em certas capitais podem valer acima da média oficial FIPE.</li>
              </ul>
            </div>
          </div>

          {/* TABELA DE COMPARAÇÃO DE DEPRECIAÇÃO (HTML PURO RESPONSIVO) */}
          <div className="not-prose my-10 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-750 dark:text-slate-250 uppercase tracking-wide flex items-center gap-2">
                      <TrendingUp size={16} /> Perfil de Depreciação Automotiva por Categoria
                  </h4>
              </div>
              
              <div className="overflow-x-auto w-full">
                  <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">
                          <tr>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Categoria do Veículo</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Depreciação (1º Ano)</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Depreciação Média Anual</th>
                              <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Liquidez de Mercado</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Carros e Utilitários</td>
                              <td className="px-6 py-4 text-center font-mono font-semibold text-rose-500">15% a 20%</td>
                              <td className="px-6 py-4 text-center font-mono text-slate-500">8% a 12%</td>
                              <td className="px-6 py-4"><span className="bg-green-100/80 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-bold">Alta a Muito Alta</span></td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Motos e Quadriciclos</td>
                              <td className="px-6 py-4 text-center font-mono font-semibold text-rose-500">12% a 18%</td>
                              <td className="px-6 py-4 text-center font-mono text-slate-500">10% a 14%</td>
                              <td className="px-6 py-4"><span className="bg-green-100/80 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-bold">Alta (Honda/Yamaha)</span></td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Caminhões e Pesados</td>
                              <td className="px-6 py-4 text-center font-mono font-semibold text-rose-500">15% a 22%</td>
                              <td className="px-6 py-4 text-center font-mono text-slate-500">6% a 10%</td>
                              <td className="px-6 py-4"><span className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 px-2.5 py-1 rounded-full text-xs font-bold">Média a Alta</span></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">
            Como Calcular a Depreciação Anual
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            A desvalorização média de um carro zero quilômetro no Brasil gira em torno de 15% a 20% no primeiro ano de uso. Nos anos subsequentes, a taxa costuma estabilizar entre 8% e 12% anuais. Acompanhar a Tabela FIPE histórica é o método mais seguro para planejar a troca programada do seu carro sem sofrer grandes perdas financeiras.
          </p>
        </div>

        {/* ACCORDION FAQ */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <HelpCircle className="text-blue-500" /> Dúvidas Frequentes sobre a FIPE
          </h3>
          
          <Accordion type="single" collapsible className="w-full">
            {faqList.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
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

        <SmartCrossLinker currentHref="/veiculos/tabela-fipe" category="destaques" maxItems={3} />

        {/* AD SLOT 3: BOTTOM */}
        <div className="w-full flex justify-center print:hidden min-h-[250px] my-2">
          <LazyAdUnit slot="fipe_hub_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
