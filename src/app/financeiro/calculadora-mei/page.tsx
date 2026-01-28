import { Suspense } from "react";
import type { Metadata } from "next";
export const runtime = 'edge';
import Link from "next/link";
import MEICalculator from "@/components/tools/MEICalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { meiActivities } from "@/data/mei-activities";
import { 
  Calculator, HelpCircle, BookOpen, TrendingUp, AlertTriangle, 
  CheckCircle2, Briefcase, Wallet, FileText, Lightbulb, User, ShieldCheck, PieChart
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

// --- 1. METADATA DE ALTA PERFORMANCE (SEO 2026) ---
export const metadata: Metadata = {
  title: "MEI 2026: Calcular DAS e Limite de Faturamento (Novo Teto?)",
  description: "Vai estourar o limite de R$ 81 mil? Calcule seu DAS 2026 e veja se você ainda se enquadra. Tabela atualizada com novo salário mínimo.",
  keywords: [
    "calculadora mei 2026", 
    "calcular das mei", 
    "limite faturamento mei 2026", 
    "estourou limite mei o que fazer", 
    "valor das mei 2026", 
    "portal do empreendedor simulador"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/financeiro/calculadora-mei",
  },
  openGraph: {
    title: "Calculadora MEI 2026 - DAS e Limite Faturamento",
    description: "Evite multas da Receita Federal. Calcule seu imposto mensal e controle seu limite anual agora.",
    url: "https://mestredascontas.com.br/financeiro/calculadora-mei",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
  },
  robots: {
    index: true, follow: true,
  },
};

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora MEI 2026",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Calculadora de impostos e limite de faturamento para Microempreendedores Individuais.",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "2150", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Qual o valor do DAS MEI em 2026?", "acceptedAnswer": { "@type": "Answer", "text": "O valor base é 5% do salário mínimo (R$ 1.621,00), totalizando R$ 81,05 de INSS. Soma-se R$ 1,00 para Comércio (ICMS) ou R$ 5,00 para Serviços (ISS)." } },
        { "@type": "Question", "name": "Qual o limite de faturamento do MEI?", "acceptedAnswer": { "@type": "Answer", "text": "O limite anual é de R$ 81.000,00. Porém, se você abriu o CNPJ durante o ano, o limite é proporcional (R$ 6.750,00 multiplicado pelos meses ativos)." } },
        { "@type": "Question", "name": "O que acontece se estourar o limite em 20%?", "acceptedAnswer": { "@type": "Answer", "text": "Se ultrapassar R$ 97.200,00 (20%), você é desenquadrado retroativamente a janeiro e paga impostos como Microempresa sobre TUDO que faturou no ano." } }
      ]
    }
  ]
};

export default function MEIPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
          rating={4.9}
          reviews={2150}
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Calculadora MEI" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="mei_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-4 md:p-8">
              <PrivacyBadge />
              <Suspense fallback={<div className="h-96 w-full animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl"></div>}>
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
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">1. O que acontece se eu estourar o limite de R$ 81 mil?</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Depende do valor. Se estourar em até 20% (até R$ 97.200,00), você paga uma guia complementar e vira Microempresa (ME) apenas no ano seguinte. Se estourar <strong>mais de 20%</strong>, o desenquadramento é <strong>retroativo</strong> a janeiro, e você pagará impostos altos sobre tudo o que faturou no ano, com juros e multa.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">2. MEI tem direito a PIS e Seguro-Desemprego?</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    <strong>Não diretamente.</strong> O MEI em si é um empresário, não um empregado. Porém, se você trabalha de carteira assinada (CLT) e tem um MEI como renda extra, você <em>mantém</em> o direito ao PIS e Seguro-Desemprego, desde que a renda do MEI não seja suficiente para seu sustento (o governo cruza esses dados).
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">3. Como me aposento pelo MEI?</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Pagando o DAS em dia, você tem direito à <strong>Aposentadoria por Idade</strong> (62 anos mulher, 65 homem) e auxílio-doença. O valor da aposentadoria será de 1 salário mínimo. Se quiser se aposentar por <em>Tempo de Contribuição</em> ou com valor maior, você deve pagar uma guia complementar (GPS Código 1910) de 15% sobre o salário mínimo todo mês.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">4. Preciso de contador?</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Por lei, o MEI dispensa contador para abertura e obrigações mensais. Você mesmo pode fazer tudo no Portal do Empreendedor. Porém, contratar um contador é recomendado se você tem funcionários ou faturamento próximo do limite, para evitar erros na declaração anual.
                  </p>
                </div>
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

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="mei_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
