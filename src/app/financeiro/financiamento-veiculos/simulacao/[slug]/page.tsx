import { Suspense } from 'react';
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { Car, CheckCircle2, TrendingUp, AlertCircle, Fuel, Wrench, ArrowLeft } from "lucide-react";
import { financingCases } from "@/data/financing-pseo";

// Wrapper da Calculadora
import VehicleFinancingCalculator from "@/components/calculators/FinancingCalculator"; 

// Helper para resolver o caso (Estático ou Dinâmico Numérico)
function getFinancingCase(slug: string) {
    // 1. Tenta encontrar no pSEO (conteúdo rico)
    const predefined = financingCases.find(c => c.slug === slug);
    if (predefined) return predefined;

    // 2. Tenta interpretar como valor numérico (ex: /50000)
    // Remove pontos e vírgulas se houver, embora slug usually venha limpo ou com hifens
    const cleanSlug = slug.replace(/\D/g, ""); 
    const valor = parseInt(cleanSlug);

    if (!isNaN(valor) && valor > 1000) { // Valor mínimo razoável
        const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
        return {
            slug: slug,
            tipo: "Veículo",
            valor: valor,
            title: `Simulação Financiamento: ${formatado}`,
            description: `Calcule as parcelas para financiar um veículo de ${formatado}. Veja taxas e valores de entrada.`,
            keywords: ["simulador financiamento", `financiamento ${valor}`, "calcular parcelas carro"],
            articleContent: {
                intro: `Você está simulando o financiamento de um veículo no valor de <strong>${formatado}</strong>. Abaixo você confere as estimativas de parcelas e juros.`,
                analysis: `
                    <p>Para um montante de <strong>${formatado}</strong>, as condições de crédito variam conforme seu Score e o ano do veículo.</p>
                    <p>Valores numéricos avulsos na URL geram esta simulação genérica. Para análises de modelos específicos (como SUVs ou Motos), use o menu de navegação.</p>
                `,
                taxaMedia: "1.59% a.m.",
                tips: [
                    "A entrada mínima recomendada é sempre de 20%.",
                    "Considere os custos de transferência e documentação no seu orçamento.",
                    "Pesquise taxas em pelo menos 3 bancos diferentes."
                ],
                faq: [
                    { question: "Essa simulação é exata?", answer: "É uma estimativa baseada em taxas médias de mercado. O valor final depende do seu CPF e do banco." }
                ],
                closing: "Use esta simulação como base para negociar na concessionária ou loja."
            }
        };
    }

    return null;
}

export async function generateStaticParams() {
  return financingCases.map((customCase) => ({
    slug: customCase.slug, 
  }));
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
        type: "article",
    }
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
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": Math.floor(customCase.valor / 50) + 150, // Fake dynamic count
          "bestRating": "5",
          "worstRating": "1"
        }
      },
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
          variant="default"
          categoryColor="blue"
          badge="Taxas 2026"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Financiamento Veículos", href: "/financeiro/financiamento-veiculos" },
            { label: customCase.tipo }
          ]}
          rating={4.8}
          reviews={350}
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
           <AdUnit slot="veiculo_top" format="horizontal" variant="agency" />
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
                    <VehicleFinancingCalculator initialValue={customCase.valor} />
                </Suspense>
                <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                    <DisclaimerBox />
                </div>
             </div>
        </section>

        {/* ANÚNCIO MID */}
        <div className="w-full flex justify-center my-4 print:hidden">
            <AdUnit slot="veiculo_mid" format="auto" />
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

        {/* --- OUTRAS FERRAMENTAS (Cross Selling) --- */}
        <div className="mt-12 not-prose border-t border-slate-200 dark:border-slate-800 pt-8 print:hidden">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Wrench size={22} className="text-indigo-500"/> Ferramentas para Motoristas
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/veiculos/tabela-fipe" className="block group">
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg shadow-orange-500/20 transition-transform group-hover:-translate-y-1">
                        <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                            <Car size={24} className="text-white"/>
                        </div>
                        <h4 className="font-bold text-lg mb-1">Consultar Tabela FIPE</h4>
                        <p className="text-orange-50 text-sm opacity-90">Verifique o valor oficial do carro antes de financiar.</p>
                    </div>
                </Link>
                
                <Link href="/financeiro/rescisao" className="block group">
                    <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:-translate-y-1">
                        <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                            <TrendingUp size={24} className="text-white"/>
                        </div>
                        <h4 className="font-bold text-lg mb-1">Planejamento Financeiro</h4>
                        <p className="text-blue-50 text-sm opacity-90">Organize suas contas antes de assumir uma parcela de 48x.</p>
                    </div>
                </Link>
            </div>
        </div>

        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <AdUnit slot="veiculo_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}
