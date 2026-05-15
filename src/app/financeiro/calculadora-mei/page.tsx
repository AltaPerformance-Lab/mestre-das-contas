import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import MEICalculator from "@/components/tools/MEICalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import { meiActivities } from "@/data/mei-activities";
import { 
  Calculator, HelpCircle, BookOpen, TrendingUp, AlertTriangle, 
  CheckCircle2, Briefcase, Wallet, FileText, Lightbulb, User, ShieldCheck, PieChart
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Simulador MEI 2026 Grátis | Calcular DAS e Faturamento Ilimitado";
  const description = "Controle seu CNPJ MEI 100% grátis. Calcule seu DAS 2026 e veja se você ainda se enquadra no limite de R$ 81 mil. Simulação rápida e ilimitada.";

  return {
    title,
    description,
    keywords: [
      "calculadora mei gratis", 
      "simulador mei ilimitado", 
      "calcular das mei gratis", 
      "limite faturamento mei 2026", 
      "estourou limite mei o que fazer", 
      "valor das mei 2026"
    ],
    alternates: {
      canonical: "https://mestredascontas.com.br/financeiro/calculadora-mei" },
    openGraph: {
      title: "Simulador MEI 2026 Grátis | Calcule seu DAS e Limite",
      description: "Controle seu CNPJ MEI sem pagar nada. Calcule o valor do DAS 2026 e veja se você está dentro do limite de faturamento.",
      url: "https://mestredascontas.com.br/financeiro/calculadora-mei",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Simulador MEI Grátis Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cálculo MEI Grátis e Ilimitado",
      description: "Planeje o faturamento do seu micronegócio sem sustos com nossa ferramenta gratuita.",
      images: ["/opengraph-image"],
    },
    robots: { 
      index: true, 
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" } 
    }
  };
}

// --- 2. DADOS ESTRUTURADOS (SCHEMA.ORG) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Simulador MEI Grátis e Ilimitado",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Calculadora gratuita para microempreendedores individuais simularem faturamento e guia DAS em 2026."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular o Limite do MEI 2026",
      "description": "Passo a passo para controlar o faturamento do seu micro-negócio usando nossa calculadora.",
      "step": [
        { "@type": "HowToStep", "name": "Tipo de Atividade", "text": "Selecione se sua atividade é Serviços, Comércio, Ambos ou Caminhoneiro para definir o valor correto do DAS." },
        { "@type": "HowToStep", "name": "Faturamento Mensal", "text": "Informe a média que você recebe ou pretende receber por mês em seu CNPJ." },
        { "@type": "HowToStep", "name": "Meses Ativos", "text": "Ajuste o seletor para o número de meses que sua empresa ficará aberta no ano para calcular o limite proporcional." }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { 
          "@type": "Question", 
          "name": "O que acontece se eu estourar o limite de R$ 81 mil?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Depende do valor. Se estourar em até 20% (até R$ 97.200,00), você paga uma guia complementar e vira Microempresa (ME) apenas no ano seguinte. Se estourar mais de 20%, o desenquadramento é retroativo a janeiro, e você pagará impostos altos sobre tudo o que faturou no ano, com juros e multa." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "MEI tem direito a PIS e Seguro-Desemprego?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Não diretamente. O MEI em si é um empresário, não um empregado. Porém, se você trabalha de carteira assinada (CLT) e tem um MEI como renda extra, você mantém o direito ao PIS e Seguro-Desemprego, desde que a renda do MEI não seja suficiente para seu sustento." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "Como me aposento pelo MEI?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Pagando o DAS em dia, você tem direito à Aposentadoria por Idade (62 anos mulher, 65 homem) e auxílio-doença. O valor da aposentadoria será de 1 salário mínimo. Se quiser se aposentar por Tempo de Contribuição ou com valor maior, você deve pagar uma guia complementar (GPS Código 1910) de 15% sobre o salário mínimo todo mês." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "Preciso de contador?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Por lei, o MEI dispensa contador para abertura e obrigações mensais. Você mesmo pode fazer tudo no Portal do Empreendedor. Porém, contratar um contador é recomendado se você tem funcionários ou faturamento próximo do limite, para evitar erros na declaração anual." 
          } 
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" },
        { "@type": "ListItem", "position": 2, "name": "Financeiro", "item": "https://mestredascontas.com.br/financeiro" },
        { "@type": "ListItem", "position": 3, "name": "Calculadora MEI", "item": "https://mestredascontas.com.br/financeiro/calculadora-mei" }
      ]
    }
  ]
};




export default async function MEIPage() {


  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />


      {/* --- HEADER --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora MEI 2026"
          description="Controle seu CNPJ. Calcule o valor atualizado do DAS e descubra se você está dentro do limite de faturamento para não ser pego pelo Leão."
          category="Empreendedorismo"
          icon={<Briefcase size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="green"
          badge="Salário Mínimo 2026"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Calculadora MEI" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO FINANCEIRA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Conteúdo verificado com base em fórmulas de matemática financeira e indicadores econômicos vigentes em 2026.</span>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="mei_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-4 md:p-8">
              <PrivacyBadge />
              <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                  <MEICalculator />
              </Suspense>
          </div>
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>


        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden">
            <LazyAdUnit slot="mei_mid" format="auto" />
        </div>

        {/* --- ARTIGO --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-emerald-600 pl-4">
              Guia Definitivo do MEI 2026
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            O <strong>Microempreendedor Individual (MEI)</strong> é a maior política de inclusão econômica do mundo. Criado para tirar milhões de brasileiros da informalidade, ele oferece CNPJ, aposentadoria e benefícios por um custo baixíssimo. Mas as regras mudaram em 2026.
          </p>

          {/* HISTÓRIA E CONTEXTO */}
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <BookOpen className="text-emerald-600 dark:text-emerald-500"/> Como tudo começou: A História do MEI
          </h3>
          <p>
            O MEI foi instituído pela <strong>Lei Complementar nº 128/2008</strong>, sancionada em 19 de dezembro de 2008. O objetivo era simples: formalizar trabalhadores como pipoqueiros, cabeleireiros, pintores e vendedores que trabalhavam sem amparo legal.
          </p>
          <p>
            Entrando em vigor efetivamente em <strong>1º de julho de 2009</strong>, o programa explodiu em popularidade. De zero a mais de 15 milhões de CNPJs ativos, o MEI transformou a economia brasileira, permitindo que pequenos negócios emitissem nota fiscal, abrissem contas bancárias empresariais e acessassem crédito barato.
          </p>

          {/* CHECKLIST: QUEM PODE SER MEI */}
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 my-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-600 dark:text-emerald-400"/> Quem pode ser MEI em 2026?
              </h3>
              <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                      <div className="mt-1 min-w-[20px]"><CheckCircle2 size={16} className="text-emerald-500"/></div>
                      <span><strong>Faturamento:</strong> Até <strong>R$ 81.000,00</strong> por ano (ou R$ 6.750,00 por mês de atividade).</span>
                  </li>
                  <li className="flex items-start gap-3">
                      <div className="mt-1 min-w-[20px]"><CheckCircle2 size={16} className="text-emerald-500"/></div>
                      <span><strong>Sociedade:</strong> Não pode ser sócio, administrador ou titular de outra empresa.</span>
                  </li>
                  <li className="flex items-start gap-3">
                      <div className="mt-1 min-w-[20px]"><CheckCircle2 size={16} className="text-emerald-500"/></div>
                      <span><strong>Funcionários:</strong> Pode contratar no máximo <strong>1 empregado</strong> que receba o piso da categoria ou salário mínimo.</span>
                  </li>
                  <li className="flex items-start gap-3">
                      <div className="mt-1 min-w-[20px]"><CheckCircle2 size={16} className="text-emerald-500"/></div>
                      <span><strong>Atividade:</strong> Exercer uma das mais de 470 ocupações permitidas (CNAE).</span>
                  </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm italic text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-amber-600 dark:text-amber-500">Atenção:</span> Servidores públicos federais em atividade não podem ser MEI. Pensionistas e beneficiários do BPC/LOAS podem perder o benefício ao abrir o CNPJ.
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <Wallet className="text-emerald-600 dark:text-emerald-500"/> Quanto custa ser MEI em 2026?
          </h3>
          <p>
            O custo é fixo e mensal, através do DAS (Documento de Arrecadação do Simples Nacional). Em 2026, com o salário mínimo de <strong>R$ 1.621,00</strong>, os valores são:
          </p>
          
          <div className="my-6">
             {/* DESKTOP TABLE */}
             <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Atividade</th>
                            <th className="px-4 py-3">INSS (5%)</th>
                            <th className="px-4 py-3">Impostos</th>
                            <th className="px-4 py-3 font-bold text-blue-700 dark:text-blue-400">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr className="dark:text-slate-300"><td className="px-4 py-3">Comércio/Indústria</td><td className="px-4 py-3">R$ 81,05</td><td className="px-4 py-3">R$ 1,00 (ICMS)</td><td className="px-4 py-3 font-bold">R$ 82,05</td></tr>
                        <tr className="dark:text-slate-300"><td className="px-4 py-3">Serviços</td><td className="px-4 py-3">R$ 81,05</td><td className="px-4 py-3">R$ 5,00 (ISS)</td><td className="px-4 py-3 font-bold">R$ 86,05</td></tr>
                        <tr className="dark:text-slate-300"><td className="px-4 py-3">Comércio e Serviços</td><td className="px-4 py-3">R$ 81,05</td><td className="px-4 py-3">R$ 6,00</td><td className="px-4 py-3 font-bold">R$ 87,05</td></tr>
                    </tbody>
                </table>
             </div>

             {/* MOBILE CARDS */}
             <div className="md:hidden space-y-3">
                 {[
                      { atv: "Comércio/Indústria", imp: "ICMS R$ 1,00", total: "R$ 82,05" },
                      { atv: "Serviços", imp: "ISS R$ 5,00", total: "R$ 86,05" },
                      { atv: "Comércio + Serviços", imp: "ICMS + ISS R$ 6,00", total: "R$ 87,05" },
                 ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                        <div>
                             <span className="font-bold text-slate-800 dark:text-slate-200 text-sm block">{item.atv}</span>
                             <span className="text-xs text-slate-500 dark:text-slate-400">INSS R$ 81,05 + {item.imp}</span>
                        </div>
                        <div className="text-right">
                             <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total</span>
                             <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{item.total}</span>
                        </div>
                    </div>
                 ))}
             </div>
          </div>

          {/* DICAS DE OURO E ALERTAS */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl mt-12 not-prose relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-6 opacity-10"><ShieldCheck size={120}/></div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10"><Lightbulb className="text-yellow-400"/> Alertas Importantes para 2026</h3>
              <ul className="space-y-4 relative z-10 text-slate-300 text-sm">
                  <li className="flex gap-3">
                      <div className="bg-white/10 p-2 rounded-full h-fit"><AlertTriangle size={16} className="text-amber-400"/></div>
                      <div>
                        <strong>Cruzamento de Dados:</strong> A Receita Federal cruza o faturamento do seu CNPJ com seus gastos no cartão de crédito e PIX. Se você vender R$ 100 mil no cartão mas declarar apenas R$ 81 mil, será pego na malha fina por <em>omissão de receita</em>.
                      </div>
                  </li>
                  <li className="flex gap-3">
                      <div className="bg-white/10 p-2 rounded-full h-fit"><AlertTriangle size={16} className="text-amber-400"/></div>
                      <div>
                        <strong>Nota Fiscal Obrigatória:</strong> A partir de decisões recentes, o MEI deve emitir nota fiscal de serviço eletrônica (NFS-e) no padrão nacional para todas as vendas para Pessoa Jurídica.
                      </div>
                  </li>
              </ul>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-12 mb-6 flex items-center gap-2">
              <User className="text-blue-600 dark:text-blue-500"/> Análise por Profissão (CNAE)
          </h3>
          <p>Selecione sua atividade para ver regras específicas de aposentadoria e tributação:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 not-prose mb-8">
              {meiActivities.map((activity) => (
                  <Link key={activity.slug} href={`/financeiro/calculadora-mei/${activity.slug}`} className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-slate-400"/> {activity.jobTitle}
                  </Link>
              ))}
          </div>

          {/* FAQ COMPLETO */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <HelpCircle className="text-purple-600 dark:text-purple-400"/> Perguntas Frequentes (FAQ)
              </h3>
              
              <div className="space-y-4">
                <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                  <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                    O que acontece se eu estourar o limite de R$ 81 mil?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 text-sm">
                    Depende do valor. Se estourar em até 20% (até R$ 97.200,00), você paga uma guia complementar e vira Microempresa (ME) apenas no ano seguinte. Se estourar <strong>mais de 20%</strong>, o desenquadramento é <strong>retroativo</strong> a janeiro, e você pagará impostos altos sobre tudo o que faturou no ano, com juros e multa.
                  </p>
                </details>
                
                <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                  <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                    MEI tem direito a PIS e Seguro-Desemprego?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 text-sm">
                    <strong>Não diretamente.</strong> O MEI em si é um empresário, não um empregado. Porém, se você trabalha de carteira assinada (CLT) e tem um MEI como renda extra, você <em>mantém</em> o direito ao PIS e Seguro-Desemprego, desde que a renda do MEI não seja suficiente para seu sustento (o governo cruza esses dados).
                  </p>
                </details>

                <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                  <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                    Como me aposento pelo MEI?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 text-sm">
                    Pagando o DAS em dia, você tem direito à <strong>Aposentadoria por Idade</strong> (62 anos mulher, 65 homem) e auxílio-doença. O valor da aposentadoria será de 1 salário mínimo. Se quiser se aposentar por <em>Tempo de Contribuição</em> ou com valor maior, você deve pagar uma guia complementar (GPS Código 1910) de 15% sobre o salário mínimo todo mês.
                  </p>
                </details>

                <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                  <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                    Preciso de contador?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 text-sm">
                    Por lei, o MEI dispensa contador para abertura e obrigações mensais. Você mesmo pode fazer tudo no Portal do Empreendedor. Porém, contratar um contador é recomendado se você tem funcionários ou faturamento próximo do limite, para evitar erros na declaração anual.
                  </p>
                </details>
              </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-300 flex flex-col gap-2">
            <span className="font-bold flex items-center gap-2"><BookOpen size={16}/> Fontes Oficiais:</span>
            <a href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
              • Portal do Empreendedor (Gov.br)
            </a>
            <a href="http://www.planalto.gov.br/ccivil_03/leis/lcp/lcp128.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
              • Lei Complementar nº 128/2008 (Legislação)
            </a>
          </div>

        </div>

        <SmartCrossLinker currentHref="/financeiro/calculadora-mei" category="financeiro" />

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="mei_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
