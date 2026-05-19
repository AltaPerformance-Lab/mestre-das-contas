import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMarcas, getModelos, getValor, extractIdFromSlug } from "@/lib/fipeApi";
import PageHeader from "@/components/layout/PageHeader";
import { Car, Info, Calendar, DollarSign, Fingerprint, Fuel, HelpCircle, ShieldAlert, CheckCircle2 } from "lucide-react";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import ExpertSignature from "@/components/ui/ExpertSignature";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import FipeActions from "@/components/layout/FipeActions";
import IpvaCalculator from "@/components/layout/IpvaCalculator";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import Link from "next/link";

interface PageProps {
  params: Promise<{ tipo: string; marcaSlug: string; modeloSlug: string; anoId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { tipo, marcaSlug, modeloSlug, anoId } = resolvedParams;
  if (!['carros', 'motos', 'caminhoes'].includes(tipo)) return {};

  const marcaId = extractIdFromSlug(marcaSlug);
  const modeloId = extractIdFromSlug(modeloSlug);
  
  const [fipeResult] = await Promise.all([
    getValor(tipo as 'carros' | 'motos' | 'caminhoes', marcaId, modeloId, anoId).catch(() => null)
  ]);

  if (!fipeResult) return {};

  return {
    title: `Tabela FIPE ${fipeResult.Marca} ${fipeResult.Modelo} ${fipeResult.AnoModelo === 32000 ? 'Zero KM' : fipeResult.AnoModelo} - ${fipeResult.Valor}`,
    description: `Preço atualizado da Tabela FIPE para o ${fipeResult.Marca} ${fipeResult.Modelo} ano ${fipeResult.AnoModelo === 32000 ? 'Zero KM' : fipeResult.AnoModelo}. Mês de Referência: ${fipeResult.MesReferencia}. Veja detalhes e desvalorização.`,
    alternates: {
      canonical: `https://mestredascontas.com.br/veiculos/tabela-fipe/${tipo}/${marcaSlug}/${modeloSlug}/${anoId}`,
    },
  };
}

export default async function FipeValorPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { tipo, marcaSlug, modeloSlug, anoId } = resolvedParams;
  
  if (!['carros', 'motos', 'caminhoes'].includes(tipo)) {
    notFound();
  }

  const marcaId = extractIdFromSlug(marcaSlug);
  const modeloId = extractIdFromSlug(modeloSlug);
  
  const [fipeResult] = await Promise.all([
    getValor(tipo as 'carros' | 'motos' | 'caminhoes', marcaId, modeloId, anoId).catch(() => null)
  ]);

  if (!fipeResult) {
    notFound();
  }

  const tipoName = tipo.charAt(0).toUpperCase() + tipo.slice(1);
  const anoFormatado = fipeResult.AnoModelo === 32000 ? "Zero KM" : fipeResult.AnoModelo;
  const priceNumeric = fipeResult.Valor.replace(/[^\d,]/g, '').replace(',', '.');

  // JSON-LD Completo com Vehicle (Offer) + FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Car", 
        "name": `${fipeResult.Marca} ${fipeResult.Modelo} ${anoFormatado}`,
        "brand": { "@type": "Brand", "name": fipeResult.Marca },
        "model": fipeResult.Modelo,
        "vehicleModelDate": fipeResult.AnoModelo === 32000 ? new Date().getFullYear() : fipeResult.AnoModelo,
        "fuelType": fipeResult.Combustivel,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "BRL",
          "price": priceNumeric,
          "itemCondition": fipeResult.AnoModelo === 32000 ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
          "availability": "https://schema.org/InStock",
          "url": `https://mestredascontas.com.br/veiculos/tabela-fipe/${tipo}/${marcaSlug}/${modeloSlug}/${anoId}`
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Qual o valor da FIPE do ${fipeResult.Marca} ${fipeResult.Modelo} ${anoFormatado}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Segundo a Tabela FIPE atualizada para ${fipeResult.MesReferencia}, o valor oficial do ${fipeResult.Marca} ${fipeResult.Modelo} ano ${anoFormatado} é de ${fipeResult.Valor}.`
            }
          },
          {
            "@type": "Question",
            "name": "O que significa o código FIPE?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O código FIPE é o identificador único oficial utilizado pela Fundação Instituto de Pesquisas Econômicas para rastrear a variação histórica de preço de um veículo específico."
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
        title={`${fipeResult.Marca} ${fipeResult.Modelo}`}
        description={`Cotação oficial da Tabela FIPE para o ano ${anoFormatado}. Base de dados espelhada em tempo real e atualizada no mês de ${fipeResult.MesReferencia}.`}
        category="veiculos"
        variant="finance"
        breadcrumbs={[
          { label: "Veículos", href: "/veiculos" },
          { label: "Tabela FIPE", href: "/veiculos/tabela-fipe" },
          { label: tipoName, href: `/veiculos/tabela-fipe/${tipo}` },
          { label: fipeResult.Marca, href: `/veiculos/tabela-fipe/${tipo}/${marcaSlug}` },
          { label: fipeResult.Modelo, href: `/veiculos/tabela-fipe/${tipo}/${marcaSlug}/${modeloSlug}` },
          { label: `${anoFormatado}` }
        ]}
      />

      <div className="flex flex-col gap-10 px-4 sm:px-6 max-w-4xl mx-auto mt-8">
        
        {/* Top Ad Unit */}
        <div className="w-full overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200/60 dark:border-slate-800/60 print:hidden min-h-[100px]">
          <LazyAdUnit slot="fipe_valuation_top" format="horizontal" variant="agency" />
        </div>

        {/* Reassuring Privacy Badge */}
        <PrivacyBadge />

        {/* BIG PRICE CARD */}
        <div id="ferramenta" className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-2xl shadow-blue-500/10 dark:shadow-none border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
          
          <span className="inline-block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Valor Oficial da Tabela FIPE</span>
          
          <h2 className="text-xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 px-4 leading-snug">
            {fipeResult.Marca} {fipeResult.Modelo} ({anoFormatado})
          </h2>

          <div className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            {fipeResult.Valor}
          </div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mb-8">
            Referência: {fipeResult.MesReferencia}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-left border-t border-slate-100 dark:border-slate-800 pt-8 mt-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Car size={14} /> Marca
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{fipeResult.Marca}</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Calendar size={14} /> Ano Modelo
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{anoFormatado}</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Fuel size={14} /> Combustível
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{fipeResult.Combustivel}</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Fingerprint size={14} /> Cód. FIPE
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">{fipeResult.CodigoFipe}</span>
            </div>
          </div>

          {/* Premium Actions Bar: Print, Save PDF, Share */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-8 flex flex-col gap-4">
            <FipeActions
              marca={fipeResult.Marca}
              modelo={fipeResult.Modelo}
              ano={anoFormatado.toString()}
              valor={fipeResult.Valor}
              codigoFipe={fipeResult.CodigoFipe}
              mesReferencia={fipeResult.MesReferencia}
            />
            
            {/* Feedback / Bug Report Link inside the Card for maximum layout neatness */}
            <div className="flex justify-center sm:justify-start pt-2">
              <a 
                href={`mailto:contato@mestredascontas.com.br?subject=Correção FIPE: ${fipeResult.Marca} ${fipeResult.Modelo}`}
                className="text-xs font-medium text-slate-400 hover:text-rose-500 flex items-center gap-1.5 transition-colors print:hidden"
              >
                <ShieldAlert size={13} /> Encontrou alguma inconsistência de valores? Reporte aqui.
              </a>
            </div>
          </div>
        </div>

        {/* Ipva Calculator Widget */}
        <div className="print:hidden">
          <IpvaCalculator valorFipe={fipeResult.Valor} tipo={tipo as any} />
        </div>

        {/* General Disclaimer */}
        <div className="print:hidden">
          <DisclaimerBox />
        </div>

        {/* Middle Ad Unit between Tools and Educational Content */}
        <div className="w-full overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200/60 dark:border-slate-800/60 print:hidden min-h-[250px] my-6">
          <LazyAdUnit slot="fipe_valuation_mid" format="auto" />
        </div>

        {/* SEO DEEP CONTENT (HIGH DENSITY ARTICLE) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden w-full print:hidden">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                Análise Completa de Preço: {fipeResult.Marca} {fipeResult.Modelo} ({anoFormatado})
            </h2>
            
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-6 text-sm md:text-base leading-relaxed">
                <p>
                    A cotação oficial de <strong>{fipeResult.Valor}</strong> reflete o valor médio nacional para o modelo <strong>{fipeResult.Modelo}</strong>, fabricado no ano <strong>{anoFormatado}</strong> pela <strong>{fipeResult.Marca}</strong>. Esta avaliação é baseada em dados estatísticos fornecidos diretamente pela Fundação Instituto de Pesquisas Econômicas (FIPE) e atualizada no mês de <strong>{fipeResult.MesReferencia}</strong>.
                </p>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4">
                    O que é a Tabela FIPE e como ela é calculada?
                </h3>
                <p>
                    Criada em 1973, a Fundação Instituto de Pesquisas Econômicas (FIPE) calcula a variação média de preços de carros, motos e caminhões novos, seminovos e usados no mercado brasileiro. Os pesquisadores da FIPE descartam preços excessivamente altos ou excessivamente baixos (ruídos estatísticos decorrentes de veículos com blindagem, customizações extremas ou sinistros graves) e obtêm uma média ponderada dos preços de anúncios reais do país.
                </p>
                <p>
                    Por isso, a Tabela FIPE serve como o principal norteador em transações comerciais de veículos automotivos no Brasil, garantindo que compradores e vendedores iniciem suas negociações em uma base sólida e neutra.
                </p>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4">
                    Fatores de Depreciação: Por que o preço real pode variar da FIPE?
                </h3>
                <p>
                    Embora o valor de <strong>{fipeResult.Valor}</strong> seja a referência de mercado, o valor final em uma negociação de compra ou venda do <strong>{fipeResult.Marca} {fipeResult.Modelo} ({anoFormatado})</strong> depende de variáveis práticas. Os fatores mais determinantes para alteração de valor são:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-2">1. Quilometragem e Desgaste</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Veículos com quilometragem muito acima da média anual brasileira (cerca de 10.000 a 15.000 km por ano) sofrem depreciação extra devido ao desgaste mecânico acumulado.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-2">2. Histórico de Manutenção</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Carros com revisões registradas no manual do proprietário e peças originais retêm significativamente mais valor, atraindo ofertas mais próximas ou até acima da FIPE.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-2">3. Opcionais de Fábrica e Cor</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Transmissão automática, central multimídia integrada, bancos em couro e teto solar elevam o preço real. Cores neutras (branco, prata, preto) possuem maior liquidez e melhor preço.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-2">4. Laudo Cautelar e Histórico</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Passagem por leilão, histórico de sinistros (colisões moderadas/graves), recuperação por furto ou enchentes desvalorizam o carro de 20% a 40% em relação ao índice oficial.</p>
                    </div>
                </div>


                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4">
                    Como calcular o IPVA e o Seguro do {fipeResult.Modelo}
                </h3>
                <p>
                    A importância da cotação FIPE vai além da compra e venda. Duas das principais despesas anuais do seu carro são calculadas diretamente sobre este índice:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>
                        <strong>Imposto sobre a Propriedade de Veículos Automotores (IPVA):</strong> A Secretaria da Fazenda de cada estado utiliza o valor FIPE do veículo em setembro ou outubro do ano anterior para gerar a cobrança. Em São Paulo, Rio de Janeiro e Minas Gerais, a alíquota padrão para veículos de passeio é de <strong>4%</strong> (gerando um imposto estimado em {typeof fipeResult.Valor === 'string' ? `R$ ${(parseFloat(fipeResult.Valor.replace(/[^\d]/g, '')) / 2500).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '4% do valor'}). Em outros estados, as alíquotas variam de 1% a 3%. Você pode simular o valor exato para o seu estado e aplicar alíquotas personalizadas no nosso <strong>Simulador de IPVA interativo</strong> logo acima!
                    </li>
                    <li>
                        <strong>Cotação de Seguro Automotivo:</strong> Ao fechar ou renovar uma apólice de seguro contra furto, roubo ou colisões, o contrato padrão de cobertura de casco garante **100% da Tabela FIPE** (ou percentual acordado) no momento da liquidação do sinistro.
                    </li>
                </ul>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4">
                    Checklist de Segurança para Comprar ou Vender com Segurança
                </h3>
                <p>
                    Para realizar uma transação sem dores de cabeça ou prejuízos financeiros ao negociar seu <strong>{fipeResult.Marca}</strong>, siga este guia rápido de prevenção:
                </p>
                
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-6 rounded-r-2xl my-6">
                    <h4 className="text-emerald-800 dark:text-emerald-400 font-bold flex items-center gap-2 m-0 text-base">
                        🛡️ Passos para Negociações Livres de Golpes
                    </h4>
                    <ol className="list-decimal pl-5 space-y-3 mt-3 mb-0 text-sm text-emerald-900/90 dark:text-emerald-200/90">
                        <li><strong>Exija sempre o Laudo Cautelar:</strong> Evite comprar carros com histórico de adulteração de chassi ou reparos estruturais profundos nas colunas e longarinas.</li>
                        <li><strong>Verifique Débitos e Restrições:</strong> Consulte o Renavam no site do Detran estatual para verificar multas, IPVAs atrasados e restrições judiciais ativas.</li>
                        <li><strong>Exame Mecânico Completo:</strong> Nunca finalize o negócio sem levar o carro a um mecânico de confiança para inspecionar motor, caixa de marcha, suspensão e sistemas eletrônicos (scanner OBD).</li>
                        <li><strong>Cuidado com o Golpe do Sinal:</strong> Nunca efetue transferências Pix de "sinal" ou "reserva" antes de ver o veículo pessoalmente e validar os documentos da pessoa que se diz proprietária.</li>
                    </ol>
                </div>
            </div>

            {/* DÚVIDAS FREQUENTES (FAQ) - Embutido no Artigo para distanciar os anúncios 2 e 3 */}
            <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-800/60 not-prose">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                    <HelpCircle className="text-emerald-500 shrink-0" size={28} />
                    Dúvidas Frequentes sobre a FIPE do {fipeResult.Modelo}
                </h3>
                
                <div className="space-y-4">
                    <details className="group bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900/30 transition-all duration-200">
                        <summary className="font-bold text-slate-850 dark:text-slate-105 list-none flex justify-between items-center select-none">
                            <div className="flex items-start gap-3">
                                <span className="text-emerald-500 font-bold text-xs mt-1">#</span>
                                <span className="leading-snug text-slate-800 dark:text-slate-200 font-semibold">O IPVA é calculado sobre o valor da FIPE?</span>
                            </div>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm animate-in fade-in">
                            Sim, na maioria dos estados brasileiros a Secretaria da Fazenda utiliza exatamente o valor da Tabela FIPE (de Setembro ou Outubro do ano anterior) como base de cálculo para a cobrança do IPVA do ano corrente. A alíquota do imposto geralmente varia entre 1% e 4% deste valor dependendo da UF.
                        </p>
                    </details>

                    <details className="group bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900/30 transition-all duration-200">
                        <summary className="font-bold text-slate-850 dark:text-slate-105 list-none flex justify-between items-center select-none">
                            <div className="flex items-start gap-3">
                                <span className="text-emerald-500 font-bold text-xs mt-1">#</span>
                                <span className="leading-snug text-slate-800 dark:text-slate-200 font-semibold">Por que as concessionárias pagam abaixo da Tabela FIPE?</span>
                            </div>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm animate-in fade-in">
                            Concessionárias e revendedoras são empresas com fins lucrativos. Quando adquirem um veículo, consideram uma "margem de repasse". Eles descontarão do valor FIPE os custos de vitrine, documentação, revisão mecânica, margem de negociação e lucro líquido, pagando geralmente de 10% a 25% abaixo do estipulado no índice.
                        </p>
                    </details>
                </div>
            </div>
        </div>

        {/* DISCLAIMER / INFO CARD */}
        <section className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-6 border border-amber-200 dark:border-amber-800/30 flex gap-4">
          <Info className="text-amber-500 shrink-0 mt-0.5" size={24} />
          <div className="space-y-2">
            <h3 className="font-bold text-amber-900 dark:text-amber-500">Aviso Legal Importante</h3>
            <p className="text-sm text-amber-800/80 dark:text-amber-400/80 leading-relaxed">
              A Tabela FIPE expressa preços médios de veículos no mercado nacional, servindo estritamente como um parâmetro para negociações. Os preços efetivamente praticados variam significativamente de acordo com a região, estado de conservação do motor, lataria, cor, quilometragem, acessórios extras instalados e qualquer outro fator inerente ao comércio de veículos. O código {fipeResult.CodigoFipe} é rastreado automaticamente.
            </p>
          </div>
        </section>


        {/* EXPERT SIGNATURE */}
        <ExpertSignature 
            author="Equipe Editorial"
            updatedAt="Maio de 2026"
        />

        <SmartCrossLinker 
            currentHref={`/veiculos/tabela-fipe/${tipo}/${marcaSlug}/${modeloSlug}/${anoId}`} 
            category="destaques"
            maxItems={3} 
        />

        {/* Ad Unit bottom wrapped in a premium breathing-room container at the absolute bottom of the layout, below everything */}
        <div className="w-full overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200/60 dark:border-slate-800/60 print:hidden min-h-[100px] my-6">
          <LazyAdUnit slot="fipe_valuation_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
