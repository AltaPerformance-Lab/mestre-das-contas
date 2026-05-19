import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CompoundInterestCalculator from "@/components/calculators/CompoundInterestCalculator";
import { calculateCompoundInterest } from "@/lib/calculators/compound-interest";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";

import { 
  TrendingUp, HelpCircle, BookOpen, Calculator, Landmark,
  Coins, Briefcase, FileText, 
  CheckCircle2, ArrowRight, BarChart3,
  PieChart, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DE ALTO VALOR (SEO 2026) ---
// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Juros Compostos | Simulador de Investimentos Grátis";
  const description = "Descubra o poder dos juros sobre juros. Simule seus investimentos mensais, rendimentos e planeje sua liberdade financeira em segundos. 100% Grátis.";

  return {
    title,
    description,
    keywords: ["calculadora juros compostos", "simulador de investimentos", "calcular rentabilidade", "juros sobre juros", "calculadora financeira", "aposentadoria"],
    alternates: { canonical: "https://mestredascontas.com.br/financeiro/juros-compostos" },
    openGraph: {
      title: "Calculadora de Juros Compostos 2026 | Simule seus Investimentos",
      description: "Descubra o poder dos juros sobre juros. Veja quanto seu dinheiro pode render com aportes mensais e planeje sua liberdade financeira.",
      url: "https://mestredascontas.com.br/financeiro/juros-compostos",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Juros Compostos Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Quer ver seu dinheiro trabalhar por você?",
      description: "Simule agora o efeito bola de neve dos juros compostos em seus investimentos.",
      images: ["/opengraph-image"],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } } };
}

// --- FAQ LIST (DRY Content) ---
const faqList = [
    { q: "O que são juros compostos?", a: "São juros calculados sobre o valor inicial mais os juros acumulados dos períodos anteriores. É o famoso 'juros sobre juros', que faz o dinheiro crescer exponencialmente ao longo do tempo." },
    { q: "A poupança paga juros compostos?", a: "Sim! A caderneta de poupança usa juros compostos mensais. Porém, a taxa de rendimento dela costuma ser baixa (frequentemente perde para a inflação), diminuindo o ganho real." },
    { q: "Qual a diferença para juros simples?", a: "Nos juros simples, o rendimento é calculado apenas sobre o valor principal inicial (crescimento linear). Nos compostos, o lucro é reinvestido e gera mais lucro (crescimento exponencial)." },
    { q: "Como converter taxa mensal para anual?", a: "Nos juros compostos, não basta multiplicar por 12. A fórmula é (1 + taxa)^12 - 1. Exemplo: 1% ao mês equivale a 12,68% ao ano." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Juros Compostos",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para cálculo de juros compostos com aportes mensais e taxa de juros personalizada.",
      "featureList": "Cálculo de montante final, juros acumulados e comparação com investimento inicial.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" } },
    {
      "@type": "TechArticle",
      "headline": "O Poder dos Juros Compostos: Como Ficar Rico no Longo Prazo",
      "description": "Uma aula completa sobre como funciona a matemática dos investimentos e o efeito bola de neve.",
      "proficiencyLevel": "Beginner",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas", "url": "https://mestredascontas.com.br/sobre" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-02-15",
      "dateModified": new Date().toISOString(),
      "image": "https://mestredascontas.com.br/opengraph-image",
      "speakable": {
           "@type": "SpeakableSpecification",
           "xpath": ["/html/head/title", "/html/head/meta[@name='description']/@content"]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Juros Compostos",
      "description": "Passo a passo para simular o crescimento do seu dinheiro com juros sobre juros.",
      "step": [
        { "@type": "HowToStep", "name": "Valor Inicial", "text": "Informe quanto você já tem guardado hoje." },
        { "@type": "HowToStep", "name": "Aporte Mensal", "text": "Defina quanto você pretende investir todos os meses." },
        { "@type": "HowToStep", "name": "Taxa de Juros", "text": "Coloque a rentabilidade esperada (ex: 1% ao mês ou 12% ao ano)." },
        { "@type": "HowToStep", "name": "Tempo", "text": "Escolha por quanto tempo (meses ou anos) você deixará o dinheiro render." }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" },
        { "@type": "ListItem", "position": 2, "name": "Financeiro", "item": "https://mestredascontas.com.br/financeiro" },
        { "@type": "ListItem", "position": 3, "name": "Juros Compostos", "item": "https://mestredascontas.com.br/financeiro/juros-compostos" }
      ]
    }
  ]
};



export default async function JurosCompostosPage() {


  // --- LAYOUT COMPLETO DA PÁGINA ---
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      {/* JSON-LD Injected */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Juros Compostos"
          description="Albert Einstein chamou os juros compostos de 'a oitava maravilha do mundo'. Simule como pequenos aportes mensais podem se transformar em uma grande fortuna."
          category="Planejamento Financeiro"
          icon={<TrendingUp size={32} strokeWidth={2} />}
          variant="default" // Azul/Indigo para Finanças
          categoryColor="blue"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Juros Compostos" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO FINANCEIRA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Conteúdo verificado com base em fórmulas de matemática financeira e indicadores econômicos vigentes em 2026.</span>
        </div>

        {/* ANÚNCIO TOPO (FIX CLS) */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="juros_top" format="horizontal" variant="software" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
                  <PrivacyBadge />
                  <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                      <CompoundInterestCalculator />
                  </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-4 print:hidden min-h-[250px]">
            <LazyAdUnit slot="juros_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3 border-l-4 border-emerald-500 pl-4">
              <TrendingUp className="text-emerald-600" size={28} />
              A Mágica do Juros sobre Juros
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 font-medium text-lg">
            Imagine uma bola de neve no topo de uma montanha. Quando você a empurra, ela é pequena. Mas, conforme ela rola, ela pega mais neve e cresce.
          </p>
          <p>
            Os juros compostos funcionam assim: no começo, o crescimento parece lento. Mas depois de um tempo, o dinheiro começa a gerar dinheiro por conta própria (o rendimento rende), criando um efeito exponencial.
          </p>

          {/* CARDS VISUAIS: SIMPLES VS COMPOSTO */}
          <div className="grid md:grid-cols-2 gap-6 not-prose my-10">
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2 mb-3 text-lg">
                      <ArrowRight className="text-slate-400" size={20} /> Juros Simples
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      O rendimento é calculado apenas sobre o valor que você investiu inicialmente. O crescimento é uma linha reta constante.
                  </p>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 dark:bg-slate-500 w-1/2"></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 text-right">Crescimento Linear</p>
              </div>
              
              <div className="bg-emerald-50 dark:bg-emerald-950/20 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm">
                  <h3 className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-2 mb-3 text-lg">
                      <TrendingUp className="text-emerald-600" size={20} /> Juros Compostos
                  </h3>
                  <p className="text-sm text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed mb-4">
                      O rendimento é calculado sobre o valor inicial <strong>+ os juros que você já ganhou</strong>. Seu dinheiro rende sobre o lucro do mês anterior.
                  </p>
                  <div className="h-2 w-full bg-emerald-200 dark:bg-emerald-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-3/4"></div>
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 text-right font-bold">Crescimento Exponencial</p>
              </div>
          </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-4 flex items-center gap-3">
                <Landmark className="text-blue-600 dark:text-blue-500" /> Onde investir para ganhar Juros Compostos?
            </h3>
            <p className="mb-6">Nem todo investimento é igual. Veja a rentabilidade média (histórica) dos principais ativos do mercado brasileiro:</p>
            
            <div className="overflow-x-auto mb-10 not-prose">
                <table className="w-full text-sm text-left border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                        <tr>
                            <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">Ativo / Investimento</th>
                            <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">Rentabilidade (Estimada)</th>
                            <th className="p-4 font-bold border-b border-slate-200 dark:border-slate-700">Liquidez</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                            <td className="p-4 font-bold">Poupança</td>
                            <td className="p-4 text-red-600 dark:text-red-400">0,5% + TR ao mês</td>
                            <td className="p-4">D+0 (Imediata)</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors bg-blue-50/20 dark:bg-blue-900/10">
                            <td className="p-4 font-bold">CDB 100% CDI</td>
                            <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">~0,85% ao mês</td>
                            <td className="p-4">D+0 ou D+1</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                            <td className="p-4 font-bold">Tesouro Selic</td>
                            <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">~0,86% ao mês</td>
                            <td className="p-4">D+1</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                            <td className="p-4 font-bold">Ações / FIIs (Médio Prazo)</td>
                            <td className="p-4 font-black">1% a 2% ao mês (Variável)</td>
                            <td className="p-4">D+2</td>
                        </tr>
                    </tbody>
                </table>
                <p className="mt-2 text-[10px] text-slate-400 text-center italic">* Valores baseados na taxa Selic de 2024/2025. Investimentos em renda variável possuem risco.</p>
            </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
              <FileText className="text-blue-500" /> A Fórmula Matemática (Simplificada)
          </h3>
          <p>
              Para os curiosos, a fórmula básica usada pelo mercado financeiro é esta:
          </p>
          
          <div className="bg-slate-900 text-white p-6 rounded-xl my-6 font-mono text-center text-lg md:text-2xl shadow-lg not-prose tracking-wider">
              M = C × (1 + i)ᵗ
          </div>

          <ul className="space-y-3 not-prose mb-8 text-sm md:text-base bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold text-slate-600 dark:text-slate-200 shadow-sm shrink-0">M</div> <span className="text-slate-700 dark:text-slate-300"><strong>Montante Final</strong> (O resultado acumulado)</span></li>
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold text-slate-600 dark:text-slate-200 shadow-sm shrink-0">C</div> <span className="text-slate-700 dark:text-slate-300"><strong>Capital Inicial</strong> (O valor que você investiu)</span></li>
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold text-slate-600 dark:text-slate-200 shadow-sm shrink-0">i</div> <span className="text-slate-700 dark:text-slate-300"><strong>Taxa de Juros</strong> (ex: 0.01 para 1%)</span></li>
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold text-slate-600 dark:text-slate-200 shadow-sm shrink-0">t</div> <span className="text-slate-700 dark:text-slate-300"><strong>Tempo</strong> (Período que o dinheiro ficou rendendo)</span></li>
          </ul>

          {/* VOCÊ SABIA: TEMPO VS DINHEIRO */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 my-12 not-prose relative overflow-hidden group shadow-lg shadow-emerald-100/50 dark:shadow-none">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BarChart3 size={160} className="text-emerald-900 dark:text-emerald-800"/>
              </div>
              
              <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-300 mb-4 flex items-center gap-2 relative z-10">
                  <BookOpen size={24} className="text-emerald-600"/> O Segredo: Comece Cedo!
              </h3>
              
              <div className="space-y-4 text-emerald-950/80 dark:text-emerald-200/80 relative z-10 text-sm md:text-base leading-relaxed">
                  <p>
                      Nos juros compostos, o <strong>Tempo</strong> é muito mais poderoso que a <strong>Taxa</strong> ou o <strong>Aporte</strong>.
                  </p>
                  <p>
                      <strong>Exemplo real:</strong> Se você investir R$ 300 por mês dos 20 aos 30 anos e depois parar de investir (apenas deixando o dinheiro render), você provavelmente terá <strong>mais dinheiro</strong> na aposentadoria do que alguém que começou aos 30 e investiu R$ 300 por mês até os 60 anos!
                  </p>
                  <div className="bg-white/60 dark:bg-black/20 p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                      Isso acontece porque os primeiros 10 anos de juros trabalhando sozinhos criam uma base gigantesca para o futuro.
                  </div>
              </div>
          </div>

          {/* FAQ ACORDION (Schema Linkado) */}
          <div className="mt-12 not-prose">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <HelpCircle className="text-blue-600" /> Dúvidas Frequentes
            </h3>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-800 open:ring-1 open:ring-blue-100 dark:open:ring-slate-600 transition-all">
                      <summary className="font-semibold text-slate-800 dark:text-slate-200 list-none flex justify-between items-center select-none">
                          <span className="flex-1">{item.q}</span>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 text-sm animate-in fade-in">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
            
            <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
          </div>

        </div>

        <SmartCrossLinker currentHref="/financeiro/juros-compostos" category="financeiro" />

        {/* RODAPÉ IMPRESSÃO */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}