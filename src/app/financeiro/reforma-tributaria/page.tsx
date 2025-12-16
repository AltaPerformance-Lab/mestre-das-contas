import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import TaxReformCalculator from "@/components/calculators/TaxReformCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  Landmark, HelpCircle, BookOpen, TrendingUp, 
  AlertTriangle, CheckCircle2, ShoppingCart, 
  Coins, Scale, FileText, ArrowRight, History, 
  CalendarClock, Zap, ExternalLink, Wallet
} from "lucide-react";

// --- 1. METADATA (SEO DE DOMINAÇÃO) ---
export const metadata: Metadata = {
  title: "Calculadora Reforma Tributária 2025 | Novo IVA, Cashback e IS",
  description: "O guia definitivo da Reforma Tributária. Entenda o IVA Dual (CBS+IBS), o Imposto Seletivo, o Cashback e simule o impacto no seu bolso. Cronograma completo 2026-2033.",
  keywords: [
    "calculadora reforma tributaria", 
    "simulador iva 2025", 
    "imposto do pecado lista produtos", 
    "cashback reforma tributaria cadastro", 
    "cesta basica nacional isenta",
    "alíquota padrão iva dual",
    "cronograma reforma tributaria",
    "split payment o que é"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/financeiro/reforma-tributaria" },
  openGraph: {
    title: "Dossiê Reforma Tributária - Mestre das Contas",
    description: "Adeus Sopa de Letrinhas. Entenda como o novo sistema de impostos vai afetar sua vida a partir de 2026.",
    url: "https://mestredascontas.com.br/financeiro/reforma-tributaria",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-reforma.png", width: 1200, height: 630, alt: "Simulador Reforma Tributária" }],
  },
};

// --- 2. FAQ (SCHEMA ROBUSTO) ---
const faqList = [
  { p: "Quando a Reforma começa a valer de verdade?", r: "A fase de testes começa em 2026, com uma alíquota simbólica de 0,9% (CBS) e 0,1% (IBS). A virada de chave real acontece em 2027 para os impostos federais e a transição completa termina apenas em 2033." },
  { p: "O que é o IVA Dual?", r: "É a unificação de impostos. 'Dual' porque são dois: a CBS (Federal, substitui PIS/COFINS/IPI) e o IBS (Estadual/Municipal, substitui ICMS/ISS)." },
  { p: "A Cesta Básica vai aumentar?", r: "Não. A Reforma cria a 'Cesta Básica Nacional', com alíquota ZERO de impostos. Itens como arroz, feijão, pão e leite ficarão totalmente isentos." },
  { p: "Como funciona o Cashback do Povo?", r: "Famílias de baixa renda cadastradas no CadÚnico receberão de volta parte do imposto pago em contas de luz, água, gás e alimentos. O estorno será feito no cartão ou conta bancária." },
  { p: "O que é o 'Imposto do Pecado' (Seletivo)?", r: "É uma sobretaxa para produtos nocivos à saúde e ao meio ambiente. Cigarros, bebidas alcoólicas, refrigerantes, veículos poluentes e mineração pagarão IVA + Imposto Seletivo." },
  { p: "Serviços de streaming (Netflix/Spotify) vão encarecer?", r: "Provavelmente. Hoje eles pagam ISS (baixo). Com a reforma, pagarão a alíquota cheia do IVA (estimada em 26,5%), o que pode elevar as mensalidades." },
  { p: "Herança paga mais imposto agora?", r: "Sim. O ITCMD (imposto sobre herança) passa a ser obrigatoriamente progressivo. Quanto maior a herança, maior a alíquota, que pode chegar a 8% ou mais dependendo do estado." },
  { p: "Tenho que pagar IPVA de lancha e jatinho?", r: "Sim. Antes, o IPVA era só para veículos terrestres. A reforma incluiu veículos aquáticos e aéreos na cobrança, exceto os de uso comercial (pesca, transporte de passageiros)." },
  { p: "O Simples Nacional vai acabar?", r: "Não. O Simples Nacional continua existindo para micro e pequenas empresas. Elas poderão escolher entre continuar no regime atual ou migrar para o sistema de IVA se for vantajoso (para gerar crédito)." },
  { p: "Remédios ficarão mais caros?", r: "Não. Medicamentos registrados na Anvisa terão redução de 60% na alíquota padrão. Remédios para doenças graves (como câncer) e absorventes terão alíquota zero." },
  { p: "O que é Split Payment?", r: "É o sistema de cobrança inteligente. Ao passar o cartão na maquininha, o banco separará automaticamente o valor do imposto e enviará direto ao governo, reduzindo a sonegação." },
  { p: "Profissionais liberais (médicos, advogados) pagam quanto?", r: "Profissões regulamentadas terão um desconto de 30% na alíquota cheia do IVA. Se a alíquota for 26,5%, eles pagarão cerca de 18,5%." },
  { p: "A Zona Franca de Manaus acaba?", r: "Não. A Reforma manteve os benefícios fiscais da Zona Franca de Manaus para garantir sua competitividade até 2073." },
  { p: "Combustível vai aumentar?", r: "Combustíveis terão um regime específico com alíquota uniforme em todo o país (ad rem), cobrada uma única vez. A tendência é simplificar, não necessariamente aumentar." },
  { p: "Comprar imóvel fica mais caro?", r: "O setor imobiliário terá um redutor de alíquota (provavelmente 40% ou 60% de desconto) e regras específicas para não travar o mercado de construção civil." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Simulador Reforma Tributária",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para comparar carga tributária atual com o novo IVA Dual."
    },
    {
      "@type": "Article",
      "headline": "Guia da Reforma Tributária: O Dossiê Completo do Novo Sistema",
      "description": "A maior mudança econômica dos últimos 60 anos. Entenda o IVA, Cashback e como isso afeta seu bolso.",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.p,
        "acceptedAnswer": { "@type": "Answer", "text": item.r }
      }))
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function ReformaPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-slate-50 p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
                    <TaxReformCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredascontas.com.br/financeiro/reforma-tributaria" target="_blank" className="text-[10px] text-slate-400 hover:text-blue-600 uppercase font-bold tracking-wider">
                        Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- CORREÇÃO LAYOUT MOBILE (w-full, px-3, max-w-full) ---
  return (
    <article className="flex flex-col gap-6 md:gap-8 w-full max-w-full overflow-x-hidden px-3 md:px-6 py-4 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="space-y-4 text-center md:text-left print:hidden max-w-4xl mx-auto md:mx-0">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-slate-100 text-slate-800 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-slate-200">
          <Landmark size={14} /> Economia & Futuro
        </span>
        <h1 className="text-2xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
          Calculadora da <span className="text-blue-600">Reforma Tributária</span>
        </h1>
        <p className="text-sm md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          O Brasil aprovou a maior mudança de impostos dos últimos 60 anos. Adeus sopa de letrinhas, olá <strong>IVA Dual</strong>. Simule agora o impacto real no seu poder de compra.
        </p>
      </header>

      <div className="w-full flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 my-2 md:my-4 print:hidden">
         <AdUnit slot="reforma_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Carregando Simulador...</div>}>
           <TaxReformCalculator />
        </Suspense>
        <div className="mt-6 md:mt-8 print:hidden"><DisclaimerBox /></div>
      </section>

      <div className="w-full flex justify-center my-4 md:my-6 print:hidden"><AdUnit slot="reforma_mid" format="auto" /></div>

      {/* --- CONTEÚDO ARTIGO (CORREÇÃO DE LARGURA E PADDING MOBILE) --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-4 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        {/* INTRODUÇÃO HISTÓRICA */}
        <h2 className="text-xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
            O Fim do "Manicômio Tributário"
        </h2>
        <p className="lead text-slate-700 text-base md:text-lg">
          Durante décadas, o Brasil foi conhecido mundialmente por ter um dos sistemas de impostos mais caóticos do planeta. PIS, COFINS, IPI, ICMS, ISS... Uma verdadeira "sopa de letrinhas" que encarecia produtos, gerava processos judiciais e afastava investimentos.
        </p>
        <p>
          Mas isso mudou. Com a aprovação da <strong>Emenda Constitucional 132/2023</strong>, entramos na era do <strong>IVA (Imposto sobre Valor Agregado)</strong>, o modelo usado por 174 países desenvolvidos. O objetivo? Simplificar, dar transparência e acabar com a cumulatividade (imposto sobre imposto).
        </p>

        {/* TABELA COMPARATIVA DE/PARA (SCROLL HORIZONTAL NO MOBILE) */}
        <div className="not-prose my-8 md:my-10 w-full">
            <div className="overflow-x-auto border rounded-xl border-slate-200 shadow-sm w-full">
                <table className="w-full text-xs md:text-sm text-left min-w-[600px]">
                    <thead className="bg-slate-900 text-white uppercase">
                        <tr>
                            <th className="px-4 py-3 font-bold w-1/2">Sistema Antigo (Vai Morrer)</th>
                            <th className="px-4 py-3 font-bold w-1/2 bg-blue-600">Sistema Novo (IVA Dual)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="bg-white"><td className="px-4 py-3 text-slate-600">PIS (Federal)</td><td className="px-4 py-3 font-bold text-blue-800 border-l-4 border-blue-600" rowSpan={3}>CBS (Contribuição sobre Bens e Serviços) - Federal</td></tr>
                        <tr className="bg-white"><td className="px-4 py-3 text-slate-600">COFINS (Federal)</td></tr>
                        <tr className="bg-white"><td className="px-4 py-3 text-slate-600">IPI (Federal)</td></tr>
                        
                        <tr className="bg-slate-50"><td className="px-4 py-3 text-slate-600">ICMS (Estadual)</td><td className="px-4 py-3 font-bold text-indigo-800 border-l-4 border-indigo-600" rowSpan={2}>IBS (Imposto sobre Bens e Serviços) - Estadual/Municipal</td></tr>
                        <tr className="bg-slate-50"><td className="px-4 py-3 text-slate-600">ISS (Municipal)</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-8 md:mt-10 mb-4 md:mb-6 flex items-center gap-2">
            <Scale className="text-indigo-600" /> Quem paga a conta?
        </h3>
        <p>
            A alíquota padrão estimada é de <strong>26,5%</strong>. Para manter a carga tributária neutra (o governo não arrecadar nem mais, nem menos), houve um reequilíbrio de forças:
        </p>

        <div className="grid gap-4 md:gap-6 not-prose mb-10">
            <div className="bg-green-50 p-4 md:p-5 rounded-xl border border-green-200 shadow-sm">
                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2"><CheckCircle2 size={20}/> Vai ficar mais barato</h4>
                <p className="text-xs text-green-700 mb-3">Setores que hoje pagam impostos em cascata ou são essenciais:</p>
                <ul className="text-sm text-green-800 space-y-2 font-medium">
                    <li>• Cesta Básica Nacional (Alíquota Zero)</li>
                    <li>• Medicamentos e Dispositivos Médicos</li>
                    <li>• Indústria e Eletrônicos</li>
                    <li>• Conta de Luz (Baixa renda via Cashback)</li>
                    <li>• Transporte Público Coletivo</li>
                </ul>
            </div>
            
            <div className="bg-red-50 p-4 md:p-5 rounded-xl border border-red-200 shadow-sm">
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2"><AlertTriangle size={20}/> Vai ficar mais caro</h4>
                <p className="text-xs text-red-700 mb-3">Setores que pagavam pouco ou são nocivos:</p>
                <ul className="text-sm text-red-800 space-y-2 font-medium">
                    <li>• Serviços (Streaming, Academias, Apps)</li>
                    <li>• Cigarros e Bebidas (Imposto Seletivo)</li>
                    <li>• Bebidas Açucaradas / Ultraprocessados</li>
                    <li>• Veículos poluentes, iates e jatinhos</li>
                    <li>• Heranças (ITCMD Progressivo)</li>
                </ul>
            </div>
        </div>

        {/* CASHBACK E IMPOSTO SELETIVO */}
        <div className="grid gap-6 md:gap-8 my-8 md:my-12 not-prose">
            <div className="bg-white p-5 md:p-6 rounded-2xl border-l-4 border-indigo-500 shadow-sm">
                <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <Wallet size={20}/> Cashback do Povo
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    Pela primeira vez, o Brasil terá um sistema de devolução de impostos. Famílias cadastradas no CadÚnico receberão de volta parte da CBS/IBS paga na luz, água e gás. É a justiça tributária na veia: quem ganha menos, paga menos.
                </p>
            </div>
            <div className="bg-white p-5 md:p-6 rounded-2xl border-l-4 border-orange-500 shadow-sm">
                <h3 className="text-lg font-bold text-orange-900 mb-2 flex items-center gap-2">
                    <AlertTriangle size={20}/> Imposto do Pecado
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    O <strong>Imposto Seletivo (IS)</strong> é uma sobretaxa para desestimular o consumo de produtos que fazem mal à saúde ou ao planeta. Cigarros, álcool e mineração de ferro pagarão mais caro para compensar os danos sociais.
                </p>
            </div>
        </div>

        {/* CRONOGRAMA (VITAL PARA SEO) */}
        <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-8 md:mt-10 mb-4 md:mb-6 flex items-center gap-2">
            <CalendarClock className="text-blue-600" /> Cronograma: Quando começa?
        </h3>
        <p className="text-slate-600 mb-6">A transição será lenta para não quebrar a economia. Confira as datas chave:</p>
        
        <div className="not-prose relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4">
            <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>
                <h4 className="font-bold text-slate-900 text-lg">2026: O Teste</h4>
                <p className="text-sm text-slate-600 mt-1">Início da cobrança com alíquota simbólica de 0,9% (CBS) e 0,1% (IBS) apenas para testar os sistemas.</p>
            </div>
            <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-300 rounded-full border-4 border-white"></div>
                <h4 className="font-bold text-slate-900 text-lg">2027: Adeus Federais</h4>
                <p className="text-sm text-slate-600 mt-1">Extinção total do PIS e COFINS. A CBS entra em vigor integralmente. O IPI é zerado (exceto para produtos da Zona Franca).</p>
            </div>
            <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-300 rounded-full border-4 border-white"></div>
                <h4 className="font-bold text-slate-900 text-lg">2029 a 2032: Transição Estadual</h4>
                <p className="text-sm text-slate-600 mt-1">Redução gradual do ICMS e ISS, enquanto o IBS sobe proporcionalmente.</p>
            </div>
            <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
                <h4 className="font-bold text-slate-900 text-lg">2033: Sistema Novo</h4>
                <p className="text-sm text-slate-600 mt-1">Vigência integral do novo modelo. O antigo "manicômio tributário" deixa de existir oficialmente.</p>
            </div>
        </div>

        {/* FAQ MONSTRO (15 PERGUNTAS) */}
        <div className="mt-12 md:mt-16 not-prose" id="faq">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-2 border-b pb-4">
              <HelpCircle className="text-blue-600" /> Tira-Dúvidas da Reforma (FAQ Completo)
          </h2>
          <div className="grid gap-3 md:gap-4">
            {faqList.map((item, idx) => (
                <details key={idx} className="group bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
                    <summary className="font-semibold text-slate-800 list-none flex justify-between items-center text-sm md:text-base">
                        <div className="flex items-center gap-3">
                            <span className="text-blue-400 font-bold text-xs md:text-sm">#{idx + 1}</span>
                            <span className="leading-snug">{item.p}</span>
                        </div>
                        <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2">▼</span>
                    </summary>
                    <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm md:text-base">
                        {item.r}
                    </p>
                </details>
            ))}
          </div>
        </div>

        {/* FONTES AUTORIDADE */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose bg-slate-50 p-4 md:p-6 rounded-xl">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Fontes Oficiais</h3>
            <div className="flex flex-wrap gap-3 md:gap-4 text-xs font-medium text-blue-600">
                <a href="https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border">Emenda Constitucional 132/2023 (Planalto) <ExternalLink size={10}/></a>
                <a href="https://www.gov.br/fazenda/pt-br/acesso-a-informacao/acoes-e-programas/reforma-tributaria" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border">Ministério da Fazenda <ExternalLink size={10}/></a>
                <a href="https://www.camara.leg.br/internet/agencia/infograficos-html5/reforma-tributaria/index.html" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border">Câmara dos Deputados <ExternalLink size={10}/></a>
            </div>
        </div>

        {/* NAVEGAÇÃO FINAL */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
          <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
             <CheckCircle2 size={16} className="text-green-500"/> Outras Ferramentas Úteis:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/financeiro/juros-compostos" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group">
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600"><TrendingUp size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Juros Compostos</span>
                <span className="text-sm text-slate-500 mt-1">Investimentos</span>
            </Link>
            <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600"><Coins size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                <span className="text-sm text-slate-500 mt-1">Descontos mensais</span>
            </Link>
            <Link href="/financeiro/porcentagem" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-purple-400 hover:shadow-md transition-all group">
                <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-purple-600"><FileText size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Porcentagem</span>
                <span className="text-sm text-slate-500 mt-1">Cálculo rápido</span>
            </Link>
          </div>
        </div>

      </div>

      <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
          <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
          <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
      </div>

    </article>
  );
}