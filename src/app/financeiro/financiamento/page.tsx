import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import FinancingCalculator from "@/components/calculators/FinancingCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Car, Home, Calculator, HelpCircle, 
  TrendingUp, Wallet, CheckCircle2,
  AlertTriangle, Percent, ShieldCheck, Banknote, Scale, 
  Landmark, ExternalLink, ArrowRight, BookOpen
} from "lucide-react";

// --- 1. METADATA DE ALTO VALOR (SEO 2026) ---
export const metadata: Metadata = {
  title: "Simulador de Financiamento 2026 | Veículos e Imóveis (Price/SAC)",
  description: "Não feche negócio no escuro. Simule parcelas de carros e casas, compare Tabela Price vs SAC e descubra os juros reais (CET) do seu contrato.",
  keywords: [
    "simulador financiamento veiculo", 
    "calcular financiamento imobiliario", 
    "tabela price ou sac qual a melhor", 
    "amortização financiamento", 
    "juros carro 2026", 
    "financiamento caixa simulador",
    "custo efetivo total cet"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/financeiro/financiamento" },
  openGraph: {
    title: "Calculadora de Financiamento (Price/SAC) - Mestre das Contas",
    description: "Vai comprar carro ou casa? Simule antes e economize milhares de reais em juros.",
    url: "https://mestredascontas.com.br/financeiro/financiamento",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-financiamento.png", width: 1200, height: 630, alt: "Simulador de Financiamento" }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// --- LISTA FAQ (DRY) ---
const faqList = [
    { q: "Qual a diferença entre Price e SAC?", a: "Na Tabela Price, as parcelas são fixas (iguais) do início ao fim, mas o total de juros pagos é maior. Na SAC, as parcelas começam mais altas e vão diminuindo todo mês, resultando em um montante final mais barato." },
    { q: "O que é CET no financiamento?", a: "CET significa Custo Efetivo Total. É a soma da taxa de juros + taxas administrativas + seguros + tarifas. É o valor real que você paga, e é sempre maior que a taxa de juros nominal anunciada pelo banco." },
    { q: "Vale a pena amortizar o financiamento?", a: "Sim! Ao adiantar parcelas (amortização extraordinária), você elimina 100% dos juros daquele período. O desconto incide sobre o saldo devedor e pode reduzir anos da sua dívida." },
    { q: "Posso financiar 100% do veículo?", a: "É muito raro hoje em dia. A maioria dos bancos exige uma entrada mínima de 10% a 20% para aprovar o crédito, pois isso reduz o risco da operação." },
    { q: "Qual o score ideal para financiar?", a: "Geralmente, um Score acima de 700 pontos garante taxas melhores. Abaixo de 500 pontos, a aprovação é difícil ou os juros serão muito elevados devido ao risco de inadimplência." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Financiamento Price/SAC",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Simulador profissional de financiamento para veículos e imóveis com comparação de sistemas de amortização."
    },
    {
      "@type": "Article",
      "headline": "O Guia Definitivo do Financiamento: Como não cair em armadilhas bancárias",
      "description": "Uma aula completa sobre taxas de juros, sistemas de amortização e como economizar milhares de reais no seu contrato.",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon" } }
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function FinanciamentoPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-slate-50 p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-slate-400">Carregando Simulador...</div>}>
                    <FinancingCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-200 pt-3">
                    <Link href="https://mestredascontas.com.br/financeiro/financiamento" target="_blank" className="text-[10px] text-slate-400 hover:text-blue-600 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Banknote size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- MODO PÁGINA NORMAL ---
  return (
    <article className="w-full max-w-full overflow-hidden">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Simulador de Financiamento"
          description="Vai realizar o sonho da casa própria ou do carro novo? Use nosso simulador para comparar Tabela Price vs SAC e descobrir os juros reais antes de assinar."
          category="Crédito & Financiamento"
          icon={<Banknote size={32} strokeWidth={2} />}
          variant="default" // Azul Institucional
          categoryColor="blue"
          badge="Atualizado 2026"
          rating={4.9}
          reviews={10192}
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Financiamento" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO (FIX CLS) */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="financ_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <Suspense fallback={
            <div className="h-96 w-full bg-slate-50 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 border border-slate-200">
                Carregando simulador...
            </div>
          }>
              <FinancingCalculator />
          </Suspense>
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO (FIX CLS) */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <AdUnit slot="financ_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL (AULA DE FINANÇAS) --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              Financiamento: O Sonho ou o Pesadelo?
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            Financiar é basicamente "alugar dinheiro". O banco compra o bem (carro ou casa) para você à vista, e você paga o banco de volta em parcelas mensais, com um "aluguel" embutido chamado <strong>Juros</strong>.
          </p>
          <p>
            O problema é que, no Brasil, esse aluguel é caro. Um financiamento mal planejado pode fazer você pagar <strong>dois ou até três carros</strong> pelo preço de um. Por isso, entender a matemática por trás (Price x SAC) é a única defesa do seu bolso.
          </p>

          {/* COMPARATIVO PRICE VS SAC */}
          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <Scale className="text-indigo-600" /> A Batalha: Tabela Price vs SAC
          </h3>
          <p>
              Essa é a dúvida número 1 nos bancos. Qual escolher? Veja o comparativo técnico abaixo:
          </p>

          {/* TABELA OBRIGATÓRIA (HTML PURO) */}
          <div className="not-prose my-8 overflow-hidden border rounded-xl border-slate-200 shadow-sm bg-white">
              <div className="bg-slate-100 p-3 border-b border-slate-200">
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Comparativo de Sistemas</h4>
              </div>
              <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-600 text-xs">
                      <tr>
                          <th className="px-6 py-3 font-bold border-b border-slate-200">Característica</th>
                          <th className="px-6 py-3 font-bold border-b border-slate-200 text-blue-700">Tabela Price (Francês)</th>
                          <th className="px-6 py-3 font-bold border-b border-slate-200 text-green-700">Tabela SAC</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">Parcelas</td>
                          <td className="px-6 py-4 text-slate-600">Fixas (Iguais do início ao fim)</td>
                          <td className="px-6 py-4 text-slate-600">Decrescentes (Começa alto, termina baixo)</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">Amortização</td>
                          <td className="px-6 py-4 text-slate-600">Lenta (Paga mais juros no início)</td>
                          <td className="px-6 py-4 text-slate-600">Constante (Abate a dívida mais rápido)</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">Juros Totais</td>
                          <td className="px-6 py-4 text-red-600 font-bold">Mais Caro</td>
                          <td className="px-6 py-4 text-green-600 font-bold">Mais Barato</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">Indicado para</td>
                          <td className="px-6 py-4 text-slate-600">Veículos ou renda inicial apertada</td>
                          <td className="px-6 py-4 text-slate-600">Imóveis e planejamento de longo prazo</td>
                      </tr>
                  </tbody>
              </table>
          </div>

          {/* O VILÃO: CET */}
          <div className="bg-amber-50 p-6 md:p-8 rounded-2xl border border-amber-200 my-10 not-prose relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Percent size={140} className="text-amber-900"/>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2 relative z-10">
                  <AlertTriangle size={24} className="text-amber-600"/> Cuidado com o CET (Custo Efetivo Total)
              </h3>
              <div className="space-y-4 text-slate-700 relative z-10 text-sm md:text-base leading-relaxed">
                  <p>
                      O gerente do banco te diz: <em>"A taxa é só 1,29% ao mês!"</em>. Parece ótimo, né? Mas quando você assina, a taxa real sobe para 1,90% ou 2,00%. Por que?
                  </p>
                  <p>
                      Isso acontece por causa das taxas embutidas no CET:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 marker:text-amber-600">
                      <li><strong>IOF:</strong> Imposto sobre Operações Financeiras (Governo).</li>
                      <li><strong>TAC:</strong> Tarifa de Abertura de Cadastro (Banco).</li>
                      <li><strong>Seguros:</strong> Prestamista, Morte ou Invalidez (Obrigatórios em imóveis).</li>
                      <li><strong>Avaliação:</strong> Taxa de vistoria do bem.</li>
                  </ul>
                  <p className="font-medium mt-2 bg-white/50 p-3 rounded-lg border border-amber-100">
                      <strong>Dica de Ouro:</strong> Nunca compare a "taxa de juros". Compare sempre o <strong>CET</strong>. É ele que define quanto vai sair do seu bolso.
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <ShieldCheck className="text-green-600" /> O Superpoder da Amortização
          </h3>
          <p>
              Você sabia que pode "voltar no tempo" e apagar juros? Isso se chama <strong>Amortização Extraordinária</strong>.
          </p>
          <p>
              Quando você paga a parcela do mês, grande parte daquele dinheiro é só para pagar os juros daquele mês. A dívida real quase não baixa.
          </p>
          <p>
              Porém, se você tiver R$ 1.000 sobrando e adiantar as <strong>últimas parcelas</strong> (lá do final do contrato), o banco é obrigado a retirar 100% dos juros daquele período. Com R$ 1.000, muitas vezes você consegue quitar R$ 3.000 ou R$ 4.000 de dívida futura. É o melhor investimento que existe para quem está endividado.
          </p>

          {/* FAQ ACORDION */}
          <div className="mt-16 not-prose">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b pb-4">
                <HelpCircle className="text-blue-600" /> Dúvidas Frequentes
            </h2>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:bg-white open:ring-1 open:ring-blue-100 transition-all">
                      <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-blue-500 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* FONTES E REFERÊNCIAS OFICIAIS */}
          <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose bg-slate-50 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Fontes Oficiais
              </h3>
              <p className="text-xs text-slate-500 mb-3">Dados baseados na legislação vigente:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600">
                  <a href="https://www.bcb.gov.br/acessibilidade/calculadora" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                      Calculadora do Cidadão (BCB) <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.planalto.gov.br/ccivil_03/leis/l8078.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                      Código de Defesa do Consumidor <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          {/* NAVEGAÇÃO FINAL */}
          <div className="mt-16 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <CheckCircle2 size={16} className="text-green-500"/> Planeje seu futuro com a gente:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/financeiro/juros-compostos" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all group">
                  <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600 shadow-sm group-hover:scale-110 transition-transform"><TrendingUp size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Juros Compostos</span>
                  <span className="text-sm text-slate-500 mt-1">Simulador de Investimentos</span>
              </Link>
              <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group">
                  <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 shadow-sm group-hover:scale-110 transition-transform"><Wallet size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Rescisão CLT</span>
                  <span className="text-sm text-slate-500 mt-1">Cálculo trabalhista</span>
              </Link>
              <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition-all group">
                  <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-indigo-600 shadow-sm group-hover:scale-110 transition-transform"><Calculator size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                  <span className="text-sm text-slate-500 mt-1">Descontos mensais</span>
              </Link>
            </div>
          </div>

        </div>

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <AdUnit slot="financ_bottom" format="horizontal" variant="software" />
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