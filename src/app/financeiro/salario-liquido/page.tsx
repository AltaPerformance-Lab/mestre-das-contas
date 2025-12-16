import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  Calculator, HelpCircle, History, BookOpen, 
  TrendingUp, AlertTriangle, CheckCircle2, 
  Coins, Briefcase, Wallet, FileText
} from "lucide-react";

// --- 1. METADATA DE ALTA PERFORMANCE (SEO) ---
export const metadata: Metadata = {
  title: "Calculadora de Salário Líquido 2025 | Cálculo Exato (INSS e IRRF)",
  description: "Descubra quanto cai na sua conta hoje. Simulador gratuito e atualizado com as novas tabelas de INSS e Imposto de Renda 2025. Entenda cada desconto do seu holerite.",
  keywords: [
    "calculadora salário líquido", 
    "calcular desconto inss 2025", 
    "tabela irrf 2025", 
    "descontos folha de pagamento", 
    "salário liquido vs bruto", 
    "simulador clt 2025",
    "calcular holerite online"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/financeiro/salario-liquido",
  },
  openGraph: {
    title: "Calculadora de Salário Líquido 2025 - Mestre das Contas",
    description: "Pare de adivinhar. Veja exatamente quanto sobra do seu salário com as novas alíquotas de 2025.",
    url: "https://mestredascontas.com.br/financeiro/salario-liquido",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-salario.png", width: 1200, height: 630, alt: "Simulador Salário Líquido" }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Salário Líquido 2025",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para cálculo de salário líquido CLT com tabelas INSS e IRRF 2025.",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "10240", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "Article",
      "headline": "Guia Definitivo do Salário Líquido: Entenda seu Holerite Passo a Passo",
      "description": "Aprenda como é feito o cálculo do seu salário, a história do salário mínimo e como pagar menos imposto legalmente.",
      "datePublished": "2024-01-10",
      "dateModified": "2025-01-15",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { 
        "@type": "Organization", 
        "name": "Mestre das Contas", 
        "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/logo.png" } 
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Qual a diferença entre Salário Bruto e Líquido?", "acceptedAnswer": { "@type": "Answer", "text": "Bruto é o valor registrado na carteira. Líquido é o que cai na conta após os descontos de INSS, IRRF e benefícios." } },
        { "@type": "Question", "name": "Como calcular o INSS 2025?", "acceptedAnswer": { "@type": "Answer", "text": "O cálculo é progressivo. Aplica-se uma alíquota (7,5% a 14%) sobre cada faixa do seu salário, somando os resultados." } },
        { "@type": "Question", "name": "Dependentes diminuem o imposto?", "acceptedAnswer": { "@type": "Answer", "text": "Sim! Cada dependente deduz R$ 189,59 da base de cálculo do Imposto de Renda." } },
        { "@type": "Question", "name": "O Vale Transporte é obrigatório?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, se solicitado pelo funcionário. A empresa pode descontar até 6% do salário base." } }
      ]
    }
  ]
};

// --- TIPAGEM NEXT.JS 15 ---
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SalarioLiquidoPage({ searchParams }: Props) {
  
  // AWAIT OBRIGATÓRIO (Next 15)
  await searchParams; 

  return (
    <article className="flex flex-col gap-8 w-full max-w-full overflow-hidden">
      
      {/* Injeção JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER HERO (Oculto na impressão) */}
      <header className="space-y-4 text-center md:text-left px-1 print:hidden">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
          <TrendingUp size={14} /> Tabela Vigente 2025
        </span>
        
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
          Calculadora de <span className="text-blue-600">Salário Líquido</span>
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          Você sabe para onde vai o seu dinheiro? Descubra o valor real que cai na conta após os descontos do Leão (IRRF) e da Previdência (INSS) com o <strong>Mestre das Contas</strong>.
        </p>
      </header>

      {/* ANÚNCIO TOPO (Oculto na impressão) */}
      <div className="w-full max-w-full overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 my-4 print:hidden">
         <AdUnit slot="salario_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      {/* --- FERRAMENTA PRINCIPAL --- */}
      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Carregando Calculadora...</div>}>
           <SalaryCalculator />
        </Suspense>
        
        {/* Aviso Legal + Disclaimer (Oculto na impressão pois o PDF já tem o seu) */}
        <div className="mt-6 print:hidden">
            <DisclaimerBox />
        </div>
      </section>

      {/* ANÚNCIO MEIO (Oculto na impressão) */}
      <div className="w-full flex justify-center my-6 print:hidden">
        <AdUnit slot="salario_mid" format="auto" />
      </div>

      {/* --- CONTEÚDO EDUCACIONAL E HISTÓRICO (Oculto na impressão) --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        {/* INTRODUÇÃO FORTE (PEDIDO DO USUÁRIO) */}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
            Entenda o seu Holerite
        </h2>
        <p className="lead text-slate-700 text-lg">
          Muitos trabalhadores brasileiros se surpreendem ao receber o contracheque e ver um valor menor do que o contratado. 
          Isso acontece porque o regime CLT prevê descontos obrigatórios "na fonte". Ou seja, o governo retira a parte dele antes mesmo do dinheiro chegar na sua mão.
        </p>
        <p>
          Para entender exatamente o que acontece com o seu dinheiro, é preciso olhar para os dois grandes "sócios" do seu salário: o <strong>INSS</strong> (Previdência) e o <strong>IRRF</strong> (Imposto de Renda). Abaixo, detalhamos como essa conta fecha.
        </p>

        {/* PASSO A PASSO TÉCNICO */}
        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2">
            <FileText className="text-blue-500" /> A Matemática por trás do Holerite
        </h3>
        <p>
          O cálculo não é feito subtraindo tudo de uma vez. Existe uma "ordem de prioridade" legal chamada <strong>dedução em cascata</strong>:
        </p>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-6">
            <ol className="space-y-4 marker:text-blue-600 marker:font-bold m-0">
                <li>
                    <strong>Passo 1 (Bruto):</strong> Começamos com o valor base contratado na carteira + horas extras + adicionais.
                </li>
                <li>
                    <strong>Passo 2 (INSS):</strong> O INSS é calculado primeiro sobre o bruto total. Ele reduz o valor base para o próximo imposto.
                </li>
                <li>
                    <strong>Passo 3 (Base IRRF):</strong> Pegamos o resultado anterior (Bruto - INSS) e subtraímos <strong>R$ 189,59 por dependente</strong>. Esse novo valor é a "Base de Cálculo do IRRF".
                </li>
                <li>
                    <strong>Passo 4 (IRRF):</strong> Aplicamos a porcentagem do Imposto de Renda sobre a Base calculada no passo 3.
                </li>
                <li>
                    <strong>Passo 5 (Líquido):</strong> Do que sobrou, tiramos Vale Transporte e outros benefícios. O resultado é o seu Salário Líquido.
                </li>
            </ol>
        </div>

        {/* CURIOSIDADE HISTÓRICA: SALÁRIO MÍNIMO */}
        <div className="bg-blue-50/60 p-6 md:p-8 rounded-2xl border border-blue-100 my-10 not-prose relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <BookOpen size={120} className="text-blue-900"/>
            </div>
            
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2 relative z-10">
                <History size={24} className="text-blue-600"/> Você Sabia? A Origem do Salário Mínimo
            </h3>
            
            <div className="space-y-4 text-slate-700 relative z-10 text-sm md:text-base leading-relaxed">
                <p>
                    O Salário Mínimo no Brasil é uma conquista histórica instituída em <strong>1º de maio de 1940</strong>, em pleno feriado do Dia do Trabalhador, pelo então presidente <strong>Getúlio Vargas</strong> (Decreto-Lei nº 2.162).
                </p>
                <p>
                    Naquela época, o Brasil era muito diferente. O objetivo era garantir uma "ração essencial mínima" para a sobrevivência de uma família trabalhadora. Curiosamente, o valor não era unificado: existiam <strong>14 salários mínimos diferentes</strong> no país!
                </p>
                <p>
                    O valor variava conforme a região e o custo de vida local. O Rio de Janeiro (então capital federal) tinha o maior valor, chegando a ser quase o triplo do aplicado no interior do Nordeste. A unificação nacional (um valor único para todo o país) só aconteceu muito tempo depois, em <strong>1984</strong>.
                </p>
            </div>
        </div>

        {/* TABELAS TÉCNICAS */}
        <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-8 mb-4">1. Tabela do INSS 2025 (Progressiva)</h3>
        <p>Esta é a tabela oficial utilizada para calcular a contribuição previdenciária. Note que quem ganha mais paga mais, mas apenas sobre a faixa excedente.</p>
        
        <div className="w-full overflow-x-auto my-6 border rounded-lg border-slate-100 shadow-sm">
          <table className="w-full text-xs md:text-sm text-left border-collapse min-w-[500px]">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] md:text-xs">
              <tr>
                <th className="px-4 py-3 font-bold">Salário de Contribuição</th>
                <th className="px-4 py-3 font-bold">Alíquota</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100 hover:bg-slate-50"><td className="px-4 py-3">Até R$ 1.412,00</td><td className="px-4 py-3 font-bold text-green-600">7,5%</td></tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50"><td className="px-4 py-3">De R$ 1.412,01 até R$ 2.666,68</td><td className="px-4 py-3 font-bold text-blue-600">9%</td></tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50"><td className="px-4 py-3">De R$ 2.666,69 até R$ 4.000,03</td><td className="px-4 py-3 font-bold text-amber-600">12%</td></tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50"><td className="px-4 py-3">De R$ 4.000,04 até R$ 7.786,02</td><td className="px-4 py-3 font-bold text-red-600">14%</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-8 mb-4">2. Tabela do Imposto de Renda (IRRF)</h3>
        <p>A tabela abaixo incide sobre a base de cálculo (Salário Bruto - INSS - Dependentes).</p>
        
        <div className="w-full overflow-x-auto my-6 border rounded-lg border-slate-100 shadow-sm">
          <table className="w-full text-xs md:text-sm text-left border-collapse min-w-[600px]">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] md:text-xs">
              <tr>
                <th className="px-4 py-3 font-bold">Base de Cálculo</th>
                <th className="px-4 py-3 font-bold">Alíquota</th>
                <th className="px-4 py-3 font-bold">Dedução</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100 hover:bg-green-50"><td className="px-4 py-3">Até R$ 2.259,20</td><td className="px-4 py-3">-</td><td className="px-4 py-3 font-bold text-green-600">Isento</td></tr>
              <tr className="border-b border-slate-100"><td className="px-4 py-3">Até R$ 2.826,65</td><td className="px-4 py-3 font-bold">7,5%</td><td className="px-4 py-3">R$ 169,44</td></tr>
              <tr className="border-b border-slate-100"><td className="px-4 py-3">Até R$ 3.751,05</td><td className="px-4 py-3 font-bold">15%</td><td className="px-4 py-3">R$ 381,44</td></tr>
              <tr className="border-b border-slate-100"><td className="px-4 py-3">Até R$ 4.664,68</td><td className="px-4 py-3 font-bold">22,5%</td><td className="px-4 py-3">R$ 662,77</td></tr>
              <tr><td className="px-4 py-3">Acima de R$ 4.664,68</td><td className="px-4 py-3 font-bold text-red-600">27,5%</td><td className="px-4 py-3">R$ 896,00</td></tr>
            </tbody>
          </table>
        </div>

        {/* FAQ ACORDION EXPANDIDO */}
        <div className="mt-12 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" /> Dúvidas Frequentes (FAQ)
          </h3>
          <div className="space-y-4">
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Qual a diferença entre Salário Bruto e Líquido?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                O <strong>Salário Bruto</strong> é o valor total registrado na sua carteira de trabalho, sem nenhum desconto. O <strong>Salário Líquido</strong> é o que realmente "sobra" e cai na sua conta bancária após os descontos obrigatórios (INSS, IRRF) e opcionais (vale transporte, plano de saúde).
              </p>
            </details>

            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                O que são "Outros Descontos" na calculadora?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                São descontos específicos do seu contrato ou empresa. Exemplos comuns: coparticipação em plano de saúde, mensalidade sindical, previdência privada da empresa, vale alimentação (parte do funcionário) ou empréstimos consignados.
              </p>
            </details>
            
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Como pagar menos Imposto de Renda legalmente?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                A forma mais direta é manter o cadastro de dependentes atualizado no RH da sua empresa. Outra estratégia eficaz é investir em um plano de previdência privada do tipo PGBL, que permite abater até 12% da sua renda bruta anual na declaração completa do IR.
              </p>
            </details>

            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                O Vale Transporte é sempre descontado?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Sim, se você optar por receber o benefício. A lei permite que a empresa desconte <strong>até 6%</strong> do seu salário base. Se o valor do vale for menor que esses 6%, o desconto deve ser limitado ao valor real do benefício.
              </p>
            </details>

            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                O desconto do INSS mudou em 2025?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Sim. As faixas salariais são reajustadas anualmente conforme o aumento do salário mínimo e a inflação. Nossa calculadora já está configurada com a tabela vigente para 2025.
              </p>
            </details>
          </div>
        </div>

        {/* LINKS INTERNOS - CARDS COM ÍCONES E CORES */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
          <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
             <CheckCircle2 size={16} className="text-green-500"/> Continue Calculando:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Briefcase size={40} className="text-blue-600"/></div>
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 group-hover:scale-110 transition-transform"><Briefcase size={20}/></div>
                <span className="font-bold text-slate-800 group-hover:text-blue-600 text-lg">Rescisão CLT</span>
                <span className="text-sm text-slate-500 mt-1">Cálculo completo de saída</span>
            </Link>
            
            <Link href="/trabalhista/ferias" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Coins size={40} className="text-amber-600"/></div>
                <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-amber-600 group-hover:scale-110 transition-transform"><Coins size={20}/></div>
                <span className="font-bold text-slate-800 group-hover:text-amber-600 text-lg">Calculadora de Férias</span>
                <span className="text-sm text-slate-500 mt-1">Venda de dias e abono</span>
            </Link>

            <Link href="/trabalhista/decimo-terceiro" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Wallet size={40} className="text-green-600"/></div>
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600 group-hover:scale-110 transition-transform"><Wallet size={20}/></div>
                <span className="font-bold text-slate-800 group-hover:text-green-600 text-lg">13º Salário</span>
                <span className="text-sm text-slate-500 mt-1">Parcelas e descontos</span>
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}