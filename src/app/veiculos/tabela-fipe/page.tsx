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
  }
];

export default function TabelaFipeHubPage() {
  const tipos = [
    { id: "carros", title: "Carros e Utilitários", icon: Car, desc: "Veículos de passeio, SUVs, picapes e vans leves." },
    { id: "motos", title: "Motos e Quadriciclos", icon: Bike, desc: "Motocicletas, scooters, ciclomotores e triciclos." },
    { id: "caminhoes", title: "Caminhões e Micro-ônibus", icon: Truck, desc: "Veículos pesados de carga, ônibus e micro-ônibus." },
  ];

  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <PageHeader 
        title="Tabela FIPE Oficial"
        description="Acesse o maior banco de dados de precificação automotiva do Brasil. Consulte o valor médio de mercado de qualquer veículo nacional ou importado."
        category="veiculos"
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
            Consultar a Tabela FIPE é um passo indispensável no planejamento financeiro de qualquer transação automotiva no Brasil. Quer você esteja comprando um hatch econômico seminovo, vendendo sua motocicleta usada ou buscando o valor referencial para fechar a cotação do seu seguro auto, as informações oficiais fornecem a base justa de partida.
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
        <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />

        <SmartCrossLinker currentHref="/veiculos/tabela-fipe" category="destaques" maxItems={3} />

        {/* AD SLOT 3: BOTTOM */}
        <div className="w-full flex justify-center print:hidden min-h-[250px] my-2">
          <LazyAdUnit slot="fipe_hub_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
