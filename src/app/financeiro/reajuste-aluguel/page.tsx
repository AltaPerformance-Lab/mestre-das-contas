import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import RentCalculator from "@/components/calculators/RentCalculator";
import { 
  Home, TrendingUp, AlertTriangle, HelpCircle, 
  BarChart3, Scale, Calculator 
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

export const metadata: Metadata = {
  title: "Calculadora de Reajuste de Aluguel 2026 (IGP-M e IPCA)",
  description: "Descubra o novo valor do aluguel. Tabela oficial acumulada de 2025/2026. Compare IGP-M vs IPCA e saiba como negociar com o proprietário.",
  keywords: ["calculadora reajuste aluguel", "indice igpm 2026", "calcular aumento aluguel", "ipca acumulado aluguel", "reajuste anual aluguel"],
  alternates: { canonical: "https://mestredascontas.com.br/financeiro/reajuste-aluguel" },
  openGraph: {
    title: "Reajuste de Aluguel 2026 - Calculadora Oficial",
    description: "Sua conta vai aumentar? Calcule agora o valor exato do reajuste e prepare o bolso.",
    url: "https://mestredascontas.com.br/financeiro/reajuste-aluguel",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Calculadora de Reajuste de Aluguel",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "description": "Calcula o reajuste anual de aluguel baseado nos índices IGP-M ou IPCA acumulados.",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "850", "bestRating": "5", "worstRating": "1" }
};

export default function RentPage() {
  return (
    <div className="w-full max-w-full overflow-hidden font-sans pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Reajuste de Aluguel"
          description="Chegou o aniversário do contrato? Não aceite qualquer valor. Calcule o reajuste oficial (IGP-M ou IPCA) e tenha argumentos para negociar."
          category="Habitação & Economia"
          icon={<Home size={32} strokeWidth={2} />}
          variant="default" // Azul (Blue) combina com confiança/imóveis
          categoryColor="blue"
          badge="Tabela 2025/2026"
          rating={4.8}
          reviews={850}
          breadcrumbs={[{ label: "Financeiro", href: "/financeiro" }, { label: "Reajuste Aluguel" }]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        
        {/* PUBLICIDADE TOPO */}
        <div className="w-full flex justify-center">
           <LazyAdUnit slot="rent_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="w-full relative z-10">
           <div className="mb-8">
               <PrivacyBadge />
           </div>
           <RentCalculator />
        </section>

        {/* PUBLICIDADE MEIO */}
        <div className="w-full flex justify-center my-4">
           <LazyAdUnit slot="rent_mid" format="auto" className="min-h-[100px] w-full max-w-4xl" />
        </div>

        {/* ARTIGO PROFUNDO (SEO + EDUCACIONAL) */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden mt-8">
            
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-l-4 border-blue-600 pl-4 flex items-center gap-3">
               <TrendingUp className="text-blue-600 dark:text-blue-500"/> O Fantasma do Reajuste
            </h2>

            <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
                Todo ano é a mesma história: chega o mês de aniversário do contrato e o coração do inquilino dispara. "Quanto vai aumentar desta vez?"
            </p>
            <p>
                Nos últimos anos, vimos o IGP-M (o famoso "Índice do Aluguel") explodir, chegando a acumular mais de 30% em 12 meses. Isso fez com que muitos aluguéis dobrassem de preço em pouco tempo.
            </p>
            <p>
                Mas a verdade é que você <strong>não é obrigado a aceitar o primeiro número</strong> que a imobiliária te envia.
            </p>
            <p>
                O segredo para não perder dinheiro (ou a casa) é a <strong>informação</strong>. Saber exatamente qual foi o índice acumulado e, principalmente, saber que o IPCA existe e pode ser seu melhor amigo.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-4">IGP-M vs IPCA: A Batalha dos Índices</h3>
            <p>
                Historicamente, os contratos de aluguel no Brasil eram atrelados ao <strong>IGP-M</strong> (Índice Geral de Preços - Mercado), calculado pela FGV. O problema? O IGP-M é muito sensível ao Dólar. Se o Dólar sobe, o IGP-M dispara, mesmo que a inflação no mercado "da esquina" esteja baixa.
            </p>
            <p>
                Já o <strong>IPCA</strong> (Índice Nacional de Preços ao Consumidor Amplo), calculado pelo IBGE, mede a "inflação oficial" do país (comida, transporte, saúde). Ele tende a ser muito mais estável e justo para o inquilino.
            </p>
            <p>
                Muitos proprietários aceitam trocar o índice do contrato para o IPCA para não perder um bom inquilino. Mas para propor isso, você precisa mostrar os números. E é aí que nossa tabela entra.
            </p>

            {/* TABELA COMPARATIVA */}
            <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <table className="w-full text-sm text-left min-w-[600px]">
                    <thead className="bg-slate-900 text-white">
                        <tr>
                            <th className="px-6 py-4 font-bold uppercase tracking-wider w-1/4">Característica</th>
                            <th className="px-6 py-4 font-bold uppercase tracking-wider w-1/3 bg-amber-600">IGP-M (O Vilão?)</th>
                            <th className="px-6 py-4 font-bold uppercase tracking-wider w-1/3 bg-blue-600">IPCA (O Oficial)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Quem calcula</td>
                            <td className="px-6 py-4 text-amber-800 dark:text-amber-400">FGV (Privado)</td>
                            <td className="px-6 py-4 text-blue-800 dark:text-blue-400">IBGE (Governo)</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">O que afeta mais</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Dólar e Commodities (Soja, Ferro)</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Comida, Gasolina e Serviços</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Volatilidade</td>
                            <td className="px-6 py-4 text-red-600 dark:text-red-400 font-bold">Altíssima (Picos de 30%)</td>
                            <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">Estável (Média de 4-10%)</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Recomendado para</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Investidores Imobiliários</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Famílias e Comércio</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 border-l-4 border-slate-900 dark:border-slate-500 p-6 rounded-r-xl not-prose my-8">
                 <h4 className="text-slate-900 dark:text-slate-100 font-bold flex items-center gap-2 text-lg m-0 mb-2">
                     <Scale size={20}/> É Lei: O aumento não é automático!
                 </h4>
                 <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed m-0">
                     Muitas pessoas acham que o reajuste é obrigatório. Não é. O índice serve como um "teto máximo". Proprietário e inquilino podem (e devem) negociar livremente um valor abaixo do índice, ou até mesmo manter o valor congelado, dependendo da situação do mercado.
                 </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-4">Como Negociar com o Proprietário</h3>
            <p>
                Informação é poder. Se o cálculo mostrou um aumento abusivo, siga este roteiro:
            </p>
            <ol className="list-decimal pl-5 space-y-3 marker:text-blue-600 dark:marker:text-blue-400 font-medium text-slate-700 dark:text-slate-300">
                <li><strong>Imprima o Cálculo:</strong> Use nossa ferramenta para gerar o valor exato.</li>
                <li><strong>Verifique os Imóveis Vizinhos:</strong> Se há apartamentos vazios no seu prédio, o proprietário sabe que perder você é um prejuízo de meses de aluguel + condomínio + pintura.</li>
                <li><strong>Proponha o IPCA:</strong> Mostre que o IPCA reflete a inflação real do seu salário, diferente do IGP-M que segue o dólar.</li>
                <li><strong>Peça Benfeitorias:</strong> Se aceitar o aumento, negocie uma pintura nova ou conserto daquele vazamento antigo.</li>
            </ol>

            {/* FAQ */}
            <div className="mt-12 not-prose">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                    <HelpCircle className="text-blue-600 dark:text-blue-500" /> Dúvidas Comuns
                </h2>
                <div className="space-y-4">
                    
                    <details className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-200 list-none flex justify-between items-center select-none">
                            Quando o aluguel pode aumentar?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/50 pt-3 text-sm">
                            Apenas uma vez a cada 12 meses, na data de aniversário do contrato. O proprietário não pode aumentar o aluguel no meio do ano, exceto se houver uma "revisão contratual" de comum acordo ou benfeitorias.
                        </p>
                    </details>

                    <details className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-200 list-none flex justify-between items-center select-none">
                            O índice deu negativo. O aluguel abaixa?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/50 pt-3 text-sm">
                            Tecnicamente, sim! Se o contrato diz "reajuste pelo IGP-M" e o IGP-M for negativo (deflação), o valor deveria cair. Porém, muitos contratos novos possuem cláusulas dizendo que "em caso de índice negativo, o reajuste será zero". Verifique seu contrato!
                        </p>
                    </details>

                    <details className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-200 list-none flex justify-between items-center select-none">
                            Qual mês devo usar no cálculo?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/50 pt-3 text-sm">
                            Você deve usar o índice acumulado dos 12 meses ANTERIORES ao mês do reajuste. Se o aniversário é em Janeiro, você usa a inflação acumulada de Janeiro a Dezembro do ano anterior.
                        </p>
                    </details>

                    <details className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-200 list-none flex justify-between items-center select-none">
                            Posso trocar o IGP-M pelo IPCA?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/50 pt-3 text-sm">
                            Sim, através de um aditivo contratual. Basta conversar com o proprietário ou imobiliária. Se você é um bom pagador, eles geralmente preferem manter você (com IPCA) do que arriscar ficar com o imóvel vazio.
                        </p>
                    </details>

                </div>
            </div>

        </div>

        {/* PUBLICIDADE BOTTOM */}
        <div className="w-full flex justify-center mt-8">
           <LazyAdUnit slot="rent_bottom" format="horizontal" variant="auto" className="min-h-[100px] w-full" />
        </div>

      </div>
    </div>
  );
}
