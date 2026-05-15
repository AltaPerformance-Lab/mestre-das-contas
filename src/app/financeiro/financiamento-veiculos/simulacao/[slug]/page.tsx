import { Suspense } from 'react';
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import { Car, CheckCircle2, TrendingUp, AlertCircle, Fuel, Wrench, ArrowLeft, ShieldCheck } from "lucide-react";
import { financingCases } from "@/data/financing-pseo";
import veiculosData from "@/data/veiculos.json";

// Wrapper da Calculadora
import VehicleFinancingCalculator from "@/components/calculators/FinancingCalculator"; 
import { calculateFinancing } from "@/lib/calculators/financing";

// Helper para resolver o caso (Estático ou Dinâmico Numérico)
function getFinancingCase(slug: string) {
    // 1. Tenta encontrar no pSEO (conteúdo rico)
    const predefined = financingCases.find(c => c.slug === slug);
    if (predefined) return predefined;

    // 2. Tenta encontrar no JSON de Veículos (dados semi-estruturados)
    const veiculoJson = (veiculosData as any[]).find(v => v.slug === slug);
    
    // 3. Tenta interpretar como valor numérico (ex: /50000)
    const cleanSlug = slug.replace(/\D/g, ""); 
    const valor = veiculoJson ? veiculoJson.valor : parseInt(cleanSlug);

    if (veiculoJson || (!isNaN(valor) && valor > 1000)) { 
        const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
        
        // Cálculos dinâmicos para SEO
        const entradaIdeal = valor * 0.3;
        const valorFinanciado = valor - entradaIdeal;
        const i = 0.0159; // 1.59%
        const n = 48; // 48x
        const parcelaEstimada = (valorFinanciado * i) / (1 - Math.pow(1 + i, -n));
        const totalPago = entradaIdeal + (parcelaEstimada * n);
        
        const fmtEntrada = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(entradaIdeal);
        const fmtFinanciado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valorFinanciado);
        const fmtParcela = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(parcelaEstimada);
        const fmtTotal = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalPago);

        return {
            slug: slug,
            tipo: veiculoJson?.tipo || "Veículo",
            valor: valor,
            title: veiculoJson?.title || `Financiamento: ${formatado}`,
            description: veiculoJson?.desc || `Calcule as parcelas para financiar um veículo de ${formatado}. Veja taxas, valores de entrada ideais e custos totais.`,
            keywords: ["simulador financiamento", `financiamento ${valor}`, "calcular parcelas carro", `parcelas de ${formatado}`],
            articleContent: {
                intro: `Você está simulando o financiamento de um veículo no valor de <strong>${formatado}</strong>. Nossas estimativas consideram as taxas de juros médias praticadas no mercado atual.`,
                analysis: `
                    <p>Para aprovar um montante de <strong>${formatado}</strong>, as instituições financeiras geralmente exigem uma entrada. Dando 30% de entrada (${fmtEntrada}), o valor efetivamente financiado cai para ${fmtFinanciado}.</p>
                    <p>Considerando uma taxa média de 1.59% ao mês num prazo de 48 meses, a parcela ficaria em torno de <strong>${fmtParcela} mensais</strong>. Ao final do contrato, o veículo custará no total ${fmtTotal}.</p>
                `,
                taxaMedia: "1.59% a.m.",
                tips: [
                    `Sua renda familiar recomendada para aprovar a parcela de ${fmtParcela} deve ser de aproximadamente ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(parcelaEstimada * 3.3)}.`,
                    "A entrada mínima recomendada é de 20%, mas 30% garante taxas muito melhores.",
                    "Considere os custos de transferência e IPVA no seu orçamento anual."
                ],
                faq: [
                    { question: `Quanto fica a parcela de um carro de ${formatado}?`, answer: `Depende da sua entrada e prazo. Dando ${fmtEntrada} de entrada e parcelando o resto em 48x (com taxa de 1.59% a.m.), a parcela estimada é de ${fmtParcela}.` },
                    { question: `Qual a renda para financiar ${formatado}?`, answer: `Os bancos exigem que a parcela não comprometa mais de 30% da sua renda bruta. Logo, a renda familiar exigida seria de pelo menos ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(parcelaEstimada * 3.3)}.` }
                ],
                closing: "Use a calculadora acima para alterar o valor da entrada e ver como os juros diminuem."
            }
        };
    }

    return null;
}

export async function generateStaticParams() {
  const predefinedSlugs = financingCases.map((customCase) => ({
    slug: customCase.slug }));

  const jsonSlugs = veiculosData.map((v) => ({
    slug: v.slug }));

  return [...predefinedSlugs, ...jsonSlugs];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const customCase = getFinancingCase(slug);

  if (!customCase) return {};

  return {
    title: customCase.title,
    description: customCase.description,
    keywords: customCase.keywords,
    alternates: {
        canonical: `https://mestredascontas.com.br/financeiro/financiamento-veiculos/simulacao/${slug}`
    },
    openGraph: {
        title: customCase.title,
        description: customCase.description,
        url: `https://mestredascontas.com.br/financeiro/financiamento-veiculos/simulacao/${slug}`,
        type: "article" }
  };
}

export default async function VeiculoPorSlugPage({ params }: Props) {
  const { slug } = await params;
  const customCase = getFinancingCase(slug);

  if (!customCase) return notFound();

  const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(customCase.valor);

  // --- DADOS ESTRUTURADOS FULL SEO ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `Simulador: ${customCase.title}`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" } },
      {
        "@type": "FAQPage",
        "mainEntity": customCase.articleContent.faq?.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        })) || []
      },
      {
          "@type": "HowTo",
          "name": `Como calcular financiamento de ${customCase.tipo}`,
          "description": `Passo a passo para simular as melhores taxas para ${customCase.tipo}.`,
          "totalTime": "PT2M",
          "step": [
              {
                  "@type": "HowToStep",
                  "name": "Defina o Valor do Veículo",
                  "text": `O simulador já inicia preenchido com o valor médio de ${formatado}. Ajuste se necessário.`,
                  "url": `https://mestredascontas.com.br/financeiro/financiamento-veiculos/simulacao/${slug}`
              },
              {
                  "@type": "HowToStep",
                  "name": "Simule a Entrada",
                  "text": "Bancos exigem entre 10% a 30% de entrada dependendo do ano do carro.",
                  "url": `https://mestredascontas.com.br/financeiro/financiamento-veiculos/simulacao/${slug}`
              },
              {
                  "@type": "HowToStep",
                  "name": "Veja a Parcela Real",
                  "text": "O resultado mostra a parcela fixa (Price) e o custo total com juros.",
                  "url": `https://mestredascontas.com.br/financeiro/financiamento-veiculos/simulacao/${slug}`
              }
          ]
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={customCase.title}
          description={customCase.description}
          category="Simulador Automotivo"
          icon={<Car size={32} strokeWidth={2} />}
          variant="finance"
          categoryColor="blue"
          badge="Simulação 2026"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Financiamento Veículos", href: "/financeiro/financiamento-veiculos" },
            { label: customCase.tipo }
          ]}
          />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        
        {/* BACK LINK */}
        <div className="print:hidden">
            <Link href="/financeiro/financiamento-veiculos" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <ArrowLeft size={16} className="mr-1"/> Voltar para Simulador Geral
            </Link>
        </div>

        {/* ANUNCIO TOP */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center min-h-[100px] bg-slate-50/50 dark:bg-slate-900/50 rounded-lg p-2 border border-dashed border-slate-200/50 dark:border-slate-800">
           <LazyAdUnit slot="veiculo_top" format="horizontal" variant="agency" />
        </div>

        {/* REVISÃO FINANCEIRA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Simulação baseada nas taxas médias do BACEN para aquisição de veículos, revisada para o cenário econômico de 2026.</span>
        </div>

        {/* FERRAMENTA */}
        <section className="scroll-mt-28 w-full max-w-full relative z-10" id="calculadora">
             
             <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl mb-6 flex items-start gap-3 print:hidden shadow-sm transition-colors">
                <Car className="text-blue-600 dark:text-blue-400 mt-1 shrink-0" size={20}/>
                <div>
                    <p className="font-bold text-blue-900 dark:text-blue-100 text-sm">Cenário: {customCase.tipo}</p>
                    <p className="text-blue-800 dark:text-blue-200 text-xs mt-1">
                        Valor referência: <strong>{formatado}</strong>. Taxa média aplicada pelo mercado: <strong>{customCase.articleContent.taxaMedia || "1.5% a.m."}</strong>.
                    </p>
                </div>
            </div>

             <PrivacyBadge />
             <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-4 md:p-8">
                <Suspense fallback={<div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"/>}>
                    <VehicleFinancingCalculator 
                        initialValue={customCase.valor} 
                        initialEntrada={customCase.valor * 0.3}
                        initialTaxa={1.59}
                        initialPrazo={48}
                        initialResult={calculateFinancing(customCase.valor, customCase.valor * 0.3, 1.59, 48, "price")}
                    />
                </Suspense>
                <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                    <DisclaimerBox />
                </div>
             </div>
        </section>

        {/* ANÚNCIO MID */}
        <div className="w-full flex justify-center my-4 print:hidden">
            <LazyAdUnit slot="veiculo_mid" format="auto" />
        </div>

        {/* ANÁLISE PROFUNDA (Content Injection) */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-blue-600 pl-4 flex items-center gap-3">
            <TrendingUp className="text-blue-600 dark:text-blue-400"/> Análise de Crédito
          </h2>

          <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
              <p dangerouslySetInnerHTML={{ __html: customCase.articleContent.intro }} />
              
              <div dangerouslySetInnerHTML={{ __html: customCase.articleContent.analysis }} className="space-y-4"/>

               {/* BOX DESTAQUE */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-6 rounded-r-xl my-8 not-prose">
                 <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={24}/> Dicas de Aprovação
                 </h3>
                 <div className="grid sm:grid-cols-2 gap-4 mt-4">
                     <div className="bg-white/60 dark:bg-black/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
                        <span className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">Entrada Ideal (30%)</span>
                        <span className="text-xl font-black text-slate-800 dark:text-white">
                            {(customCase.valor * 0.3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                     </div>
                     <div className="bg-white/60 dark:bg-black/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
                        <span className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">Renda Familiar REC.</span>
                        <span className="text-xl font-black text-slate-800 dark:text-white">
                            {(customCase.valor * 0.035 * 3.5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                     </div>
                 </div>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Checklist para comprar {customCase.tipo}</h3>
          <ul className="space-y-2 not-prose">
              {customCase.articleContent.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                      <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{tip}</span>
                  </li>
              ))}
          </ul>

          <div className="my-8 p-6 bg-slate-900 dark:bg-black text-white rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-lg not-prose border border-slate-800 dark:border-slate-800">
              <div className="bg-white/10 p-4 rounded-full">
                  <Fuel size={32} className="text-yellow-400" />
              </div>
              <div>
                  <h4 className="text-lg font-bold text-white mb-2">Simule também o Combustível</h4>
                  <p className="text-slate-300 text-sm leading-relaxed mb-0">
                      Não esqueça que além da parcela, você terá gastos com IPVA (4%), Seguro e Manutenção. 
                      O custo mensal real deste veículo será aproximadamente <strong>R$ {((customCase.valor * 0.03) + (customCase.valor * 0.015)).toFixed(0)}</strong>.
                  </p>
              </div>
          </div>

          {customCase.articleContent.faq && customCase.articleContent.faq.length > 0 && (
            <>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Perguntas Frequentes</h3>
                <div className="space-y-4 not-prose">
                    {customCase.articleContent.faq.map((f, i) => (
                        <details key={i} className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-bold border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <h4 className="text-sm m-0">{f.question}</h4>
                                <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300 px-4 text-sm pb-4">
                                {f.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </>
          )}

           {customCase.articleContent.closing && (
               <p className="mt-8 text-slate-600 dark:text-slate-400 italic text-sm border-t border-slate-200 dark:border-slate-800 pt-6" dangerouslySetInnerHTML={{ __html: customCase.articleContent.closing }} />
           )}
        </div>

        <SmartCrossLinker currentHref={`/financeiro/financiamento-veiculos/simulacao/${slug}`} category="financeiro" />

        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="veiculo_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}
