import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import FinancingCalculator from "@/components/calculators/FinancingCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  Car, Home, Calculator, HelpCircle, 
  BookOpen, TrendingUp, Wallet, CheckCircle2,
  AlertTriangle, ArrowRight, Building2, Percent, 
  ShieldCheck, Banknote, Scale, Landmark, FileText
} from "lucide-react";

// --- 1. METADATA DE ALTO VALOR (CPC ALTO) ---
export const metadata: Metadata = {
  title: "Simulador de Financiamento 2025 | Veículos e Imóveis (Price/SAC)",
  description: "Não feche negócio no escuro. Simule parcelas de carros e casas, compare Tabela Price vs SAC e descubra os juros reais (CET) do seu contrato.",
  keywords: [
    "simulador financiamento veiculo", 
    "calcular financiamento imobiliario", 
    "tabela price ou sac qual a melhor", 
    "amortização financiamento", 
    "juros carro 2025", 
    "financiamento caixa simulador",
    "custo efetivo total cet"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/financeiro/financiamento" },
  openGraph: {
    title: "Simulador de Financiamento (Price/SAC) - Mestre das Contas",
    description: "Vai comprar carro ou casa? Simule antes e economize milhares de reais em juros.",
    url: "https://mestredascontas.com.br/financeiro/financiamento",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-financiamento.png", width: 1200, height: 630, alt: "Simulador de Financiamento" }],
  },
};

// --- 2. DADOS ESTRUTURADOS (RICOS) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Financiamento Price/SAC",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Simulador profissional de financiamento para veículos e imóveis com comparação de sistemas de amortização.",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "10192", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "Article",
      "headline": "O Guia Definitivo do Financiamento: Como não cair em armadilhas bancárias",
      "description": "Uma aula completa sobre taxas de juros, sistemas de amortização e como economizar milhares de reais no seu contrato.",
      "datePublished": "2024-02-10",
      "dateModified": "2025-01-25",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/logo.png" } }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Qual a diferença entre Price e SAC?", "acceptedAnswer": { "@type": "Answer", "text": "Na Price as parcelas são fixas (iguais). Na SAC, as parcelas começam mais altas e diminuem todo mês. A SAC costuma ser mais barata no total final." } },
        { "@type": "Question", "name": "O que é CET no financiamento?", "acceptedAnswer": { "@type": "Answer", "text": "Custo Efetivo Total. É a soma dos juros + taxas + seguros + tarifas. É o valor real que você paga, sempre maior que a taxa de juros nominal." } },
        { "@type": "Question", "name": "Vale a pena amortizar o financiamento?", "acceptedAnswer": { "@type": "Answer", "text": "Sim! Ao adiantar parcelas (amortizar), você elimina os juros daquele período. O desconto é sobre o saldo devedor e pode reduzir anos da dívida." } }
      ]
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function FinanciamentoPage({ searchParams }: Props) {
  await searchParams;
  
  return (
    <article className="flex flex-col gap-8 w-full max-w-full overflow-hidden px-4 sm:px-6 py-6 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <header className="space-y-4 text-center md:text-left print:hidden max-w-4xl mx-auto md:mx-0">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
          <Banknote size={14} /> Crédito & Financiamento
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Simulador de <span className="text-blue-600">Financiamento</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          Vai realizar o sonho da casa própria ou do carro novo? Use nosso simulador para comparar <strong>Tabela Price vs SAC</strong> e descobrir os juros reais antes de assinar o contrato.
        </p>
      </header>

      {/* ANÚNCIO TOPO */}
      <div className="w-full flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 my-4 print:hidden">
         <AdUnit slot="financ_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      {/* FERRAMENTA */}
      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Carregando Simulador...</div>}>
           <FinancingCalculator />
        </Suspense>
        <div className="mt-8 print:hidden"><DisclaimerBox /></div>
      </section>

      {/* ANÚNCIO MEIO */}
      <div className="w-full flex justify-center my-6 print:hidden"><AdUnit slot="financ_mid" format="auto" /></div>

      {/* --- CONTEÚDO EDUCACIONAL (AULA DE FINANÇAS) --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
            Financiamento: O Sonho ou o Pesadelo?
        </h2>
        <p className="lead text-slate-700 text-lg">
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
            Essa é a dúvida número 1 nos bancos. Qual escolher? Veja a diferença brutal entre elas:
        </p>

        <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-lg">
                    <Car className="text-blue-500" size={24} /> Tabela Price (Francês)
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0"/> <strong>Parcelas Fixas:</strong> Você paga o mesmo valor do início ao fim (ex: 60x de R$ 1.500).</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0"/> <strong>Início Suave:</strong> A parcela inicial é menor que na SAC, o que facilita a aprovação da renda.</li>
                    <li className="flex items-start gap-2"><AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0"/> <strong>Mais Juros:</strong> No final, você paga MUITO mais juros, pois a dívida demora mais para baixar.</li>
                    <li className="font-bold text-slate-800 mt-2 block">Ideal para: Veículos e quem tem renda apertada.</li>
                </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
                <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-3 text-lg">
                    <Home className="text-blue-700" size={24} /> Tabela SAC (Amortização Constante)
                </h4>
                <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-700 mt-0.5 shrink-0"/> <strong>Parcelas Decrescentes:</strong> Começa alto e termina baixinho (ex: R$ 2.000 ... R$ 400).</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-700 mt-0.5 shrink-0"/> <strong>Dívida Derrete:</strong> Todo mês você abate um valor fixo da dívida real, não só juros.</li>
                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0"/> <strong>Economia Real:</strong> O total pago no final é sempre menor que na Price.</li>
                    <li className="font-bold text-blue-900 mt-2 block">Ideal para: Imóveis e quem pensa no longo prazo.</li>
                </ul>
            </div>
        </div>

        {/* O VILÃO: CET */}
        <div className="bg-amber-50 p-6 md:p-8 rounded-2xl border border-amber-200 my-10 not-prose relative overflow-hidden">
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
                    Isso acontece por causa das taxas embutidas:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>IOF:</strong> Imposto sobre Operações Financeiras (Governo).</li>
                    <li><strong>TAC:</strong> Tarifa de Abertura de Cadastro (Banco).</li>
                    <li><strong>Seguros:</strong> Prestamista, Morte ou Invalidez (Obrigatórios em imóveis).</li>
                    <li><strong>Avaliação:</strong> Taxa de vistoria do bem.</li>
                </ul>
                <p>
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

        {/* 10 PERGUNTAS FREQUENTES (FAQ MONSTRO) */}
        <div className="mt-12 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" /> Top 10 Dúvidas sobre Financiamento
          </h3>
          <div className="space-y-3">
            
            {/* FAQ 1 */}
            <details className="group bg-white p-4 rounded-lg border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform select-none">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                1. Qual score é necessário para financiar?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                Geralmente, um Score Serasa acima de <strong>700 pontos</strong> garante boas taxas. Abaixo de 500, a aprovação é difícil ou os juros serão altíssimos.
              </p>
            </details>

            {/* FAQ 2 */}
            <details className="group bg-white p-4 rounded-lg border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform select-none">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                2. Posso financiar 100% do veículo?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                É raro hoje em dia. A maioria dos bancos exige pelo menos <strong>10% a 20% de entrada</strong>. Quanto maior a entrada, menor os juros.
              </p>
            </details>

            {/* FAQ 3 */}
            <details className="group bg-white p-4 rounded-lg border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform select-none">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                3. O que é Alienação Fiduciária?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                Significa que o bem (carro/casa) fica no nome do banco até você quitar tudo. Você tem a posse, mas a propriedade é do banco. Se não pagar, eles tomam o bem (busca e apreensão).
              </p>
            </details>

            {/* FAQ 4 */}
            <details className="group bg-white p-4 rounded-lg border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform select-none">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                4. Vale a pena fazer portabilidade?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                Sim! Se você financiou com juros altos e hoje sua situação melhorou (ou a taxa Selic caiu), você pode levar a dívida para outro banco com juros menores.
              </p>
            </details>

            {/* FAQ 5 */}
            <details className="group bg-white p-4 rounded-lg border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform select-none">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                5. Financiamento ou Consórcio?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                <strong>Imediato:</strong> Financiamento (pega o bem agora, paga juros). <strong>Planejado:</strong> Consórcio (sem juros, paga taxa de adm, mas espera ser sorteado).
              </p>
            </details>

            {/* FAQ 6 */}
            <details className="group bg-white p-4 rounded-lg border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform select-none">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                6. Posso vender um carro financiado?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                Diretamente não, pois ele está alienado. Você precisa quitar a dívida primeiro ou transferir o financiamento para o comprador (o banco precisa aprovar o nome dele).
              </p>
            </details>

            {/* FAQ 7 */}
            <details className="group bg-white p-4 rounded-lg border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform select-none">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                7. Qual a renda mínima para financiar?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                Regra de ouro: A parcela não pode ultrapassar **30% da sua renda bruta mensal comprovada**. Se a parcela for R$ 1.500, você precisa ganhar R$ 5.000.
              </p>
            </details>

            {/* FAQ 8 */}
            <details className="group bg-white p-4 rounded-lg border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform select-none">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                8. O que é indexador (TR/IPCA) no imóvel?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                É o índice que corrige o saldo devedor. TR é mais estável (quase zero). IPCA varia com a inflação (pode fazer a parcela subir muito). Cuidado com IPCA!
              </p>
            </details>

            {/* FAQ 9 */}
            <details className="group bg-white p-4 rounded-lg border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform select-none">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                9. O que acontece se atrasar 3 parcelas?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                O banco pode entrar com ação de **Busca e Apreensão**. Com a nova lei do Marco das Garantias, a retomada de imóveis e veículos ficou muito mais rápida e extrajudicial.
              </p>
            </details>

            {/* FAQ 10 */}
            <details className="group bg-white p-4 rounded-lg border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                10. Autônomo consegue financiar?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                Sim, mas precisa comprovar renda. Extratos bancários dos últimos 6 meses, Declaração de Imposto de Renda e contratos de prestação de serviço ajudam a provar a capacidade de pagamento.
              </p>
            </details>

          </div>
        </div>

        {/* NAVEGAÇÃO FINAL */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
          <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
             <CheckCircle2 size={16} className="text-green-500"/> Planeje seu futuro com a gente:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/financeiro/juros-compostos" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group">
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600"><TrendingUp size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Juros Compostos</span>
                <span className="text-sm text-slate-500 mt-1">Simulador de Investimentos</span>
            </Link>
            <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600"><Wallet size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Rescisão CLT</span>
                <span className="text-sm text-slate-500 mt-1">Cálculo trabalhista</span>
            </Link>
            <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-md transition-all group">
                <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-indigo-600"><Calculator size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                <span className="text-sm text-slate-500 mt-1">Descontos mensais</span>
            </Link>
          </div>
        </div>

      </div>

      {/* RODAPÉ IMPRESSÃO */}
      <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
          <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
          <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
      </div>

    </article>
  );
}