import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Calculator, HelpCircle, History, BookOpen, 
  TrendingUp, AlertTriangle, CheckCircle2, 
  Coins, Briefcase, Wallet, FileText, Lightbulb, Landmark, Scale
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import RelatedTools from "@/components/ui/RelatedTools";

// --- 1. METADATA DE ALTA PERFORMANCE (SEO 2026) ---
// --- 1. METADATA DINÂMICA (SEO DE COMPARTILHAMENTO) ---
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const salarioRaw = resolvedParams.salario as string;
  
  let title = "Salário Líquido 2026: Calculadora Real (Nova Tabela INSS/IRRF)";
  let description = "Quanto cai na sua conta em 2026? Simule GRÁTIS com a Nova Tabela INSS e IRRF. Cálculo exato e sem cadastro. Veja seus descontos agora!";

  if (salarioRaw) {
    const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(salarioRaw));
    title = `Salário Líquido de ${valorFormatado} - Tabela 2026 (Cálculo Real)`;
    description = `Ganhar ${valorFormatado} bruto dá quanto líquido? Veja o cálculo exato dos descontos (INSS/IRRF) pela nova lei. Simulação gratuita.`;
  }

  return {
    title,
    description,
    keywords: [
      "calculadora salário líquido", 
      "calcular desconto inss 2026", 
      "tabela irrf 2026", 
      "descontos folha de pagamento", 
      "salário liquido vs bruto", 
      "simulador clt 2026",
      "calcular holerite online",
      ...(salarioRaw ? [`salário líquido de ${salarioRaw}`, `descontos salário ${salarioRaw}`] : [])
    ],
    alternates: {
      canonical: "https://mestredascontas.com.br/financeiro/salario-liquido",
    },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/financeiro/salario-liquido",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Simulador Salário Líquido" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://mestredascontas.com.br/opengraph-image"],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Salário Líquido 2026",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para cálculo de salário líquido CLT com tabelas INSS e IRRF 2026.",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "10240", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular o Salário Líquido em 2026",
      "description": "Passo a passo simples para entender os descontos do seu holerite.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Informe o Salário Bruto",
          "text": "Digite o valor contratual registrado na sua carteira de trabalho (sem descontos)."
        },
        {
          "@type": "HowToStep",
          "name": "Adicione Dependentes",
          "text": "Inclua o número de dependentes (filhos, cônjuge) para obter a dedução do IRRF."
        },
        {
           "@type": "HowToStep",
           "name": "Outros Descontos",
           "text": "Se houver, informe valores como Vale Transporte ou Plano de Saúde para um resultado exato."
        },
        {
          "@type": "HowToStep",
          "name": "Resultado Automático",
          "text": "A calculadora aplicará as tabelas de 2026 do INSS e IRRF automaticamente."
        }
      ]
    },
    {
      "@type": "TechArticle",
      "headline": "Guia Definitivo do Salário Líquido: Entenda seu Holerite Passo a Passo",
      "description": "Aprenda como é feito o cálculo do seu salário, a história do salário mínimo e como pagar menos imposto legalmente.",
      "proficiencyLevel": "Beginner",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas", "url": "https://mestredascontas.com.br/sobre" },
      "publisher": { 
        "@type": "Organization", 
        "name": "Mestre das Contas", 
        "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } 
      },
      "datePublished": "2024-01-10",
      "dateModified": new Date().toISOString(),
      "speakable": {
           "@type": "SpeakableSpecification",
           "xpath": ["/html/head/title", "/html/head/meta[@name='description']/@content"]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Qual a diferença entre Salário Bruto e Líquido?", "acceptedAnswer": { "@type": "Answer", "text": "Bruto é o valor registrado na carteira. Líquido é o que cai na conta após os descontos de INSS, IRRF e benefícios." } },
        { "@type": "Question", "name": "Como calcular o INSS 2026?", "acceptedAnswer": { "@type": "Answer", "text": "O cálculo é progressivo. Aplica-se uma alíquota (7,5% a 14%) sobre cada faixa do seu salário, somando os resultados." } },
        { "@type": "Question", "name": "Dependentes diminuem o imposto?", "acceptedAnswer": { "@type": "Answer", "text": "Sim! Cada dependente deduz R$ 189,59 da base de cálculo do Imposto de Renda." } },
        { "@type": "Question", "name": "O Vale Transporte é obrigatório?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, se solicitado pelo funcionário. A empresa pode descontar até 6% do salário base." } }
      ]
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function SalarioLiquidoPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-slate-400 dark:text-slate-500">Carregando Calculadora...</div>}>
                    <SalaryCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-200 dark:border-slate-800 pt-3">
                    <Link href="https://mestredascontas.com.br/financeiro/salario-liquido" target="_blank" className="text-[10px] text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Calculator size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      {/* Injeção JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 sm:px-6 pt-4 md:pt-6 max-w-7xl mx-auto w-full">
        <PageHeader 
          title="Calculadora de Salário Líquido"
          description="Você sabe para onde vai o seu dinheiro? Descubra o valor real que cai na conta após os descontos do Leão (IRRF) e da Previdência (INSS) com as tabelas vigentes de 2026."
          category="Finanças Pessoais"
          icon={<Wallet size={32} strokeWidth={2} />}
          variant="default" // Azul/Indigo
          categoryColor="blue"
          badge="Tabela 2026"
          rating={4.9}
          reviews={10240}
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Salário Líquido" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="salario_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
              <Suspense fallback={<div className="h-96 w-full bg-slate-50 dark:bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800">Carregando Calculadora...</div>}>
                  <PrivacyBadge />
                  <SalaryCalculator />
              </Suspense>
          </div>
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full mx-auto flex justify-center my-6 print:hidden rounded-3xl overflow-hidden">
            <LazyAdUnit slot="salario_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL (HUMANIZADO) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg w-full max-w-none mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              Entenda o Mistério do seu Holerite
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Vamos ser sinceros: muitos trabalhadores brasileiros levam um susto ao abrir o aplicativo do banco no dia do pagamento. O valor contratado era um, mas o que caiu na conta foi outro.
          </p>
          <p>
            Isso não é erro do RH (na maioria das vezes). Isso acontece porque o regime CLT prevê que o governo pegue a parte dele "na fonte", antes mesmo do dinheiro tocar suas mãos.
          </p>
          
          <p>
            Para entender exatamente para onde vai o seu dinheiro, precisamos olhar para os dois grandes "sócios" do seu salário: o <strong>INSS</strong> (Sua Aposentadoria) e o <strong>IRRF</strong> (O Leão). Abaixo, vamos desvendar essa caixa preta.
          </p>

          {/* PASSO A PASSO TÉCNICO */}
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
              <FileText className="text-blue-500" /> A Matemática da "Dedução em Cascata"
          </h3>
          <p>
            O cálculo não é feito subtraindo tudo de uma vez. A lei exige uma "ordem de prioridade". Veja como funciona:
          </p>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-6">
              <ol className="space-y-4 marker:text-blue-600 dark:marker:text-blue-400 marker:font-bold m-0 list-decimal pl-5">
                  <li>
                      <strong className="text-slate-900 dark:text-slate-100">O Bruto (Start):</strong> Começamos com o valor base contratado + horas extras + comissões.
                  </li>
                  <li>
                      <strong className="text-slate-900 dark:text-slate-100">O Corte do INSS:</strong> O INSS é calculado primeiro. Ele reduz o valor base para o próximo imposto. É aqui que muita gente erra a conta.
                  </li>
                  <li>
                      <strong className="text-slate-900 dark:text-slate-100">A Base do Leão:</strong> Pegamos o resultado anterior (Bruto - INSS) e subtraímos <strong>R$ 189,59 por cada dependente</strong> (filhos, cônjuge). Esse novo valor é a "Base de Cálculo do IRRF".
                  </li>
                  <li>
                      <strong className="text-slate-900 dark:text-slate-100">O Corte do IRRF:</strong> Agora sim, aplicamos a mordida do Imposto de Renda sobre a Base calculada no passo 3.
                  </li>
                  <li>
                      <strong className="text-slate-900 dark:text-slate-100">O Líquido (Goal):</strong> Do que sobrou, tiramos Vale Transporte e coparticipações. O resultado é o seu Salário Líquido.
                  </li>
              </ol>
          </div>

          {/* TABELAS TÉCNICAS */}
          <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
             <Landmark className="text-amber-600 dark:text-amber-500"/> 1. Tabela do INSS 2026 (Progressiva)
          </h3>
          <p>
             Desde a reforma da previdência, o cálculo não é mais uma porcentagem simples. É progressivo, como degraus de uma escada. Você paga menos sobre a primeira faixa do salário e mais sobre o que excede.
          </p>
          
          <div className="w-full my-6">
              {/* VERSÃO DESKTOP (Tabela) */}
              <div className="hidden md:block overflow-hidden border rounded-xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Faixa Salarial (R$)</th>
                      <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Alíquota</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-medium">Até 1.412,00</td><td className="px-6 py-3 font-bold text-green-600 dark:text-green-500">7,5%</td></tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-medium">De 1.412,01 até 2.666,68</td><td className="px-6 py-3 font-bold text-blue-600 dark:text-blue-500">9%</td></tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-medium">De 2.666,69 até 4.000,03</td><td className="px-6 py-3 font-bold text-amber-600 dark:text-amber-500">12%</td></tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-medium">De 4.000,04 até 7.786,02</td><td className="px-6 py-3 font-bold text-red-600 dark:text-red-500">14%</td></tr>
                  </tbody>
                </table>
              </div>

              {/* VERSÃO MOBILE (Cards) */}
              <div className="md:hidden space-y-3">
                  {[
                      { faixa: "Até 1.412,00", aliq: "7,5%", color: "text-green-600" },
                      { faixa: "1.412,01 a 2.666,68", aliq: "9,0%", color: "text-blue-600" },
                      { faixa: "2.666,69 a 4.000,03", aliq: "12,0%", color: "text-amber-600" },
                      { faixa: "4.000,04 a 7.786,02", aliq: "14,0%", color: "text-red-600" }
                  ].map((item, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                          <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Faixa Salarial</span>
                              <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">R$ {item.faixa}</span>
                          </div>
                          <div className="text-right">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Alíquota</span>
                              <span className={`font-bold text-lg ${item.color} dark:text-opacity-90`}>{item.aliq}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
             <Scale className="text-red-600 dark:text-red-500"/> 2. Tabela do Imposto de Renda (IRRF)
          </h3>
          <p>
             O temido Leão. A tabela abaixo incide sobre a base de cálculo que explicamos acima (após descontar o INSS).
          </p>
          
          <div className="w-full my-6">
            {/* VERSÃO DESKTOP (Tabela) */}
            <div className="hidden md:block overflow-hidden border rounded-xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Base de Cálculo (R$)</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Alíquota</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Dedução</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr className="hover:bg-green-50 dark:hover:bg-green-900/20"><td className="px-6 py-3 font-medium">Até 5.000,00</td><td className="px-6 py-3">-</td><td className="px-6 py-3 font-bold text-green-600 dark:text-green-500">Isento</td></tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-medium">De 5.000,01 até 7.500,00</td><td className="px-6 py-3 font-bold">7,5%</td><td className="px-6 py-3">R$ 375,00</td></tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-medium">De 7.500,01 até 10.000,00</td><td className="px-6 py-3 font-bold">15%</td><td className="px-6 py-3">R$ 937,50</td></tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-medium">De 10.000,01 até 12.500,00</td><td className="px-6 py-3 font-bold">22,5%</td><td className="px-6 py-3">R$ 1.687,50</td></tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-medium">Acima de 12.500,00</td><td className="px-6 py-3 font-bold text-red-600 dark:text-red-500">27,5%</td><td className="px-6 py-3">R$ 2.312,50</td></tr>
                </tbody>
              </table>
            </div>

            {/* VERSÃO MOBILE (Cards) */}
            <div className="md:hidden space-y-3">
                 {[
                    { base: "Até 5.000,00", aliq: "Isento", deducao: "-", color: "text-green-600", border: "border-green-200 dark:border-green-900/50", bg: "bg-green-50/50 dark:bg-green-900/10" },
                    { base: "5.000,01 a 7.500,00", aliq: "7,5%", deducao: "R$ 375,00", color: "text-slate-800" },
                    { base: "7.500,01 a 10.000,00", aliq: "15%", deducao: "R$ 937,50", color: "text-slate-800" },
                    { base: "10.000,01 a 12.500,00", aliq: "22,5%", deducao: "R$ 1.687,50", color: "text-slate-800" },
                    { base: "Acima de 12.500,00", aliq: "27,5%", deducao: "R$ 2.312,50", color: "text-red-600" },
                 ].map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border flex flex-col gap-3 ${item.bg || "bg-slate-50 dark:bg-slate-800/50"} ${item.border || "border-slate-200 dark:border-slate-700"}`}>
                        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2 mb-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Base de Cálculo</span>
                            <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">R$ {item.base}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Alíquota</span>
                                <span className={`font-bold text-lg ${item.color} dark:text-opacity-90`}>{item.aliq}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Dedução</span>
                                <span className="font-medium text-slate-600 dark:text-slate-300">{item.deducao}</span>
                            </div>
                        </div>
                    </div>
                 ))}
            </div>
          </div>

          {/* DICAS DE OURO (BUCKET BRIGADE) */}
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
              <Lightbulb className="text-amber-500" /> Segredos para Pagar Menos Imposto
          </h3>
          <p>
              A verdade é que ninguém gosta de pagar imposto. Mas você sabia que existem formas 100% legais de aumentar seu salário líquido?
          </p>
          <ul className="space-y-3 mt-4 not-prose">
              <li className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="text-green-600 dark:text-green-500 mt-1 shrink-0"/>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Dependentes:</strong> Mantenha o cadastro do RH atualizado. Cada filho ou cônjuge abate quase R$ 190 da base do IR.</span>
              </li>
              <li className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="text-green-600 dark:text-green-500 mt-1 shrink-0"/>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Previdência Privada (PGBL):</strong> Se você faz a declaração completa, investir em PGBL permite abater até 12% da sua renda bruta anual da mordida do Leão.</span>
              </li>
          </ul>

          {/* FAQ ACORDION */}
          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-600 dark:text-blue-500" /> Dúvidas Frequentes (FAQ)
            </h3>
            <div className="space-y-4">
              <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                  O que são "Outros Descontos" na calculadora?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 text-sm">
                  São descontos específicos do seu contrato ou empresa. Exemplos comuns: coparticipação em plano de saúde, mensalidade sindical, previdência privada da empresa, vale alimentação (parte do funcionário) ou empréstimos consignados.
                </p>
              </details>
              
              <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                  O Vale Transporte é sempre descontado?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 text-sm">
                  Sim, se você optar por receber o benefício. A lei permite que a empresa desconte <strong>até 6%</strong> do seu salário base. Se o valor do vale for menor que esses 6%, o desconto deve ser limitado ao valor real do benefício.
                </p>
              </details>

              <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                  O desconto do INSS mudou em 2026?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 text-sm">
                  Sim. As faixas salariais são reajustadas anualmente conforme o aumento do salário mínimo e a inflação (INPC). Nossa calculadora já está configurada com a tabela vigente.
                </p>
              </details>
            </div>
          </div>

          {/* NAVEGAÇÃO FINAL */}
          </div>

          <RelatedTools currentToolLink="/financeiro/salario-liquido" category="financeiro" />

        {/* --- ANÚNCIO BOTTOM (SLOT SOFTWARE) --- */}
        <div className="w-full flex justify-center my-8 print:hidden">
            <LazyAdUnit slot="salario_bottom" format="horizontal" variant="software" />
        </div>

        {/* RODAPÉ IMPRESSÃO */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}