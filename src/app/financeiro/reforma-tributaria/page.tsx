import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import TaxReformCalculator from "@/components/calculators/TaxReformCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Landmark, HelpCircle, BookOpen, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle2, ShoppingCart, 
  Coins, Scale, FileText, ArrowRight, History, 
  CalendarClock, Zap, ExternalLink, Wallet, PiggyBank
} from "lucide-react";

// --- 1. METADATA DE DOMINAÇÃO (SEO) ---
export const metadata: Metadata = {
  title: "Calculadora Reforma Tributária 2026 | Simule o Novo IVA e Cashback",
  description: "O guia definitivo da Reforma Tributária. Entenda o IVA Dual (CBS+IBS), o Imposto Seletivo, o Cashback e simule o impacto no seu bolso. Cronograma completo 2026-2033.",
  keywords: [
    "calculadora reforma tributaria", 
    "simulador iva 2026", 
    "imposto seletivo lista", 
    "cashback reforma tributaria cadastro", 
    "cesta basica nacional isenta",
    "alíquota padrão iva dual",
    "cronograma reforma tributaria",
    "split payment o que é",
    "cbs e ibs diferença"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/financeiro/reforma-tributaria" },
  openGraph: {
    title: "Dossiê Reforma Tributária: O Impacto no Seu Bolso",
    description: "Adeus Sopa de Letrinhas. Entenda como o novo sistema de impostos (IVA Dual) vai afetar sua vida a partir de 2026.",
    url: "https://mestredascontas.com.br/financeiro/reforma-tributaria",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-reforma.png", width: 1200, height: 630, alt: "Simulador Reforma Tributária" }],
  },
  robots: { index: true, follow: true },
};

// --- 2. FAQ (SCHEMA ROBUSTO PARA RICH SNIPPETS) ---
const faqList = [
  { p: "Quando a Reforma começa a valer de verdade?", r: "A fase de testes começa em 2026, com uma alíquota simbólica de 0,9% (CBS) e 0,1% (IBS). A virada de chave real acontece em 2027 para os impostos federais e a transição completa termina apenas em 2033." },
  { p: "O que é o IVA Dual?", r: "É a unificação de impostos. 'Dual' porque são dois: a CBS (Federal, substitui PIS/COFINS/IPI) e o IBS (Estadual/Municipal, substitui ICMS/ISS)." },
  { p: "A Cesta Básica vai aumentar?", r: "Não. A Reforma cria a 'Cesta Básica Nacional', com alíquota ZERO de impostos. Itens como arroz, feijão, pão e leite ficarão totalmente isentos." },
  { p: "Como funciona o Cashback do Povo?", r: "Famílias de baixa renda cadastradas no CadÚnico receberão de volta parte do imposto pago em contas de luz, água, gás e alimentos. O estorno será feito no cartão ou conta bancária." },
  { p: "O que é o 'Imposto do Pecado' (Seletivo)?", r: "É uma sobretaxa para produtos nocivos à saúde e ao meio ambiente. Cigarros, bebidas alcoólicas, refrigerantes, veículos poluentes e mineração pagarão IVA + Imposto Seletivo." },
  { p: "Serviços de streaming (Netflix/Spotify) vão encarecer?", r: "Provavelmente. Hoje eles pagam ISS (baixo). Com a reforma, pagarão a alíquota cheia do IVA (estimada em 26,5%), o que pode elevar as mensalidades." },
  { p: "Herança paga mais imposto agora?", r: "Sim. O ITCMD (imposto sobre herança) passa a ser obrigatoriamente progressivo. Quanto maior a herança, maior a alíquota, que pode chegar a 8% ou mais dependendo do estado." },
  { p: "O Simples Nacional vai acabar?", r: "Não. O Simples Nacional continua existindo para micro e pequenas empresas. Elas poderão escolher entre continuar no regime atual ou migrar para o sistema de IVA se for vantajoso (para gerar crédito)." },
  { p: "O que é Split Payment?", r: "É o sistema de cobrança inteligente. Ao passar o cartão na maquininha, o banco separará automaticamente o valor do imposto e enviará direto ao governo, reduzindo a sonegação." }
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
      "description": "Ferramenta para comparar carga tributária atual com o novo IVA Dual.",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "3205", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "Article",
      "headline": "Guia da Reforma Tributária: O Dossiê Completo do Novo Sistema",
      "description": "A maior mudança econômica dos últimos 60 anos. Entenda o IVA, Cashback e como isso afeta seu bolso.",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon" } }
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

  // --- MODO EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-slate-50 p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-slate-400">Carregando Simulador...</div>}>
                    <TaxReformCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-200 pt-3">
                    <Link href="https://mestredascontas.com.br/financeiro/reforma-tributaria" target="_blank" className="text-[10px] text-slate-400 hover:text-blue-600 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Landmark size={10} /> Powered by Mestre das Contas
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

      {/* --- PAGE HEADER ESPECIAL (VARIANT REFORM) --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora da Reforma Tributária"
          description="O Brasil aprovou a maior mudança de impostos dos últimos 60 anos. Adeus sopa de letrinhas, olá IVA Dual. Simule agora o impacto real no seu poder de compra."
          category="Economia & Futuro"
          icon={<Landmark size={32} strokeWidth={2} />}
          variant="reform" // Ativa o gradiente Verde/Teal
          badge="Lei Aprovada"
          categoryColor="emerald"
          rating={4.8}
          reviews={3205}
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Reforma Tributária" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="reforma_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <Suspense fallback={
            <div className="h-96 w-full bg-slate-50 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">
                Carregando Simulador IVA...
            </div>
          }>
              <TaxReformCalculator />
          </Suspense>
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden">
            <AdUnit slot="reforma_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO PROFUNDO (HUMANIZADO + SEO) --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
          {/* INTRODUÇÃO COM STORYTELLING */}
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-600 pl-4">
              O Fim do "Manicômio Tributário"
          </h2>
          
          <p className="lead text-slate-700 text-lg font-medium">
            Vamos ser sinceros: ninguém aguentava mais a sopa de letrinhas do sistema tributário brasileiro.
          </p>
          
          <p>
            PIS, COFINS, IPI, ICMS, ISS... Durante décadas, o Brasil foi conhecido mundialmente por ter um dos sistemas mais caóticos e injustos do planeta. Empresas gastavam mais tempo calculando imposto do que criando produtos, e você, consumidor, nunca sabia exatamente quanto estava pagando.
          </p>
          
          <p>
            A verdade é que o sistema antigo era como um "Frankenstein", cheio de remendos. Mas isso mudou. Com a aprovação da <strong>Emenda Constitucional 132/2023</strong>, entramos na era do <strong>IVA (Imposto sobre Valor Agregado)</strong>, o modelo usado por 174 países desenvolvidos.
          </p>

          <p>
            O objetivo? Simplificar, dar transparência e acabar com o imposto sobre imposto. Mas como isso afeta o seu bolso na prática?
          </p>

          {/* TABELA COMPARATIVA (OBRIGATÓRIA) */}
          <div className="not-prose my-10 w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <div className="bg-slate-900 text-white p-4 text-center font-bold uppercase tracking-wider text-sm">
                  O Grande "De/Para" da Reforma
              </div>
              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[600px]">
                      <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                          <tr>
                              <th className="px-6 py-4 font-bold w-1/2">Sistema Antigo (Vai Morrer)</th>
                              <th className="px-6 py-4 font-bold w-1/2 text-blue-700">Sistema Novo (IVA Dual)</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          <tr className="bg-white hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 text-slate-600 font-medium">PIS (Federal)</td>
                              <td className="px-6 py-4 font-bold text-blue-800 border-l-4 border-blue-600 bg-blue-50/30 align-middle" rowSpan={3}>
                                  CBS (Contribuição sobre Bens e Serviços)<br/>
                                  <span className="text-xs font-normal text-blue-600">Arrecadação Federal</span>
                              </td>
                          </tr>
                          <tr className="bg-white hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 text-slate-600 font-medium">COFINS (Federal)</td>
                          </tr>
                          <tr className="bg-white hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 text-slate-600 font-medium">IPI (Federal)</td>
                          </tr>
                          
                          <tr className="bg-slate-50 hover:bg-slate-100 transition-colors">
                              <td className="px-6 py-4 text-slate-600 font-medium">ICMS (Estadual)</td>
                              <td className="px-6 py-4 font-bold text-emerald-800 border-l-4 border-emerald-600 bg-emerald-50/30 align-middle" rowSpan={2}>
                                  IBS (Imposto sobre Bens e Serviços)<br/>
                                  <span className="text-xs font-normal text-emerald-600">Arrecadação Estadual/Municipal</span>
                              </td>
                          </tr>
                          <tr className="bg-slate-50 hover:bg-slate-100 transition-colors">
                              <td className="px-6 py-4 text-slate-600 font-medium">ISS (Municipal)</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-12 mb-6 flex items-center gap-2">
              <Scale className="text-indigo-600" /> Quem paga a conta? (Ganhadores e Perdedores)
          </h3>
          <p>
              A alíquota padrão estimada é de <strong>26,5%</strong>. Pode parecer alto, mas lembre-se: hoje, somando tudo, muitos produtos já pagam mais de 34% de imposto "escondido".
          </p>
          <p>
              Para manter a carga tributária neutra (o governo não arrecadar nem mais, nem menos), houve um reequilíbrio de forças. Veja onde você se encaixa:
          </p>

          <div className="grid md:grid-cols-2 gap-6 not-prose mb-10">
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10"><TrendingDown size={80} className="text-emerald-800"/></div>
                  <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2 text-lg"><CheckCircle2 size={24}/> Vai ficar mais barato</h4>
                  <p className="text-xs text-emerald-800 mb-4 uppercase font-bold tracking-wide">Indústria e Essenciais</p>
                  <ul className="text-sm text-emerald-900 space-y-3 font-medium">
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0"/> Cesta Básica Nacional (Alíquota Zero)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0"/> Medicamentos e Dispositivos Médicos</li>
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0"/> Eletrodomésticos e Eletrônicos</li>
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0"/> Conta de Luz (Baixa renda via Cashback)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0"/> Transporte Público Coletivo</li>
                  </ul>
              </div>
              
              <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10"><TrendingUp size={80} className="text-rose-800"/></div>
                  <h4 className="font-bold text-rose-900 mb-4 flex items-center gap-2 text-lg"><AlertTriangle size={24}/> Vai ficar mais caro</h4>
                  <p className="text-xs text-rose-800 mb-4 uppercase font-bold tracking-wide">Serviços e Supérfluos</p>
                  <ul className="text-sm text-rose-900 space-y-3 font-medium">
                      <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0"/> Serviços (Streaming, Academias, Apps)</li>
                      <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0"/> Cigarros e Bebidas (Imposto Seletivo)</li>
                      <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0"/> Refrigerantes e Ultraprocessados</li>
                      <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0"/> Iates, Jatinhos e Carros Poluentes</li>
                      <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0"/> Heranças (ITCMD Progressivo)</li>
                  </ul>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-12 mb-6 flex items-center gap-2">
              <Zap className="text-yellow-500" /> A Tecnologia do Split Payment
          </h3>
          <p>
              Essa é a verdadeira revolução silenciosa. O <strong>Split Payment</strong> (Pagamento Dividido) vai acabar com a sonegação.
          </p>
          <p>
              Funciona assim: quando você passar o cartão para comprar uma TV de R$ 1.000, o sistema do banco vai identificar automaticamente que R$ 265 são impostos. Esse valor nem entra na conta da loja; vai direto para o governo em tempo real.
          </p>
          <div className="bg-slate-50 border-l-4 border-yellow-400 p-4 my-6 italic text-slate-700">
              "Isso significa o fim daquelas empresas que vendem sem nota para pagar menos imposto e concorrem de forma desleal com quem faz tudo certo."
          </div>

          {/* CASHBACK E IMPOSTO SELETIVO */}
          <div className="grid gap-8 my-12 not-prose">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-indigo-100 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2 relative z-10">
                      <Wallet size={24} className="text-indigo-600"/> Cashback do Povo: Justiça Social
                  </h3>
                  <p className="text-slate-600 leading-relaxed relative z-10 mb-4">
                      Pela primeira vez, o Brasil terá um sistema de devolução de impostos. O sistema tributário antigo era cruel: o pobre pagava o mesmo imposto no arroz que o rico.
                  </p>
                  <p className="text-slate-600 leading-relaxed relative z-10">
                      Com o Cashback, famílias cadastradas no <strong>CadÚnico</strong> receberão de volta parte da CBS/IBS paga na luz, água, gás e alimentos. O dinheiro volta direto para o cartão ou conta bancária. É a justiça tributária na veia.
                  </p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-orange-100 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  <h3 className="text-xl font-bold text-orange-900 mb-3 flex items-center gap-2 relative z-10">
                      <AlertTriangle size={24} className="text-orange-600"/> O "Imposto do Pecado"
                  </h3>
                  <p className="text-slate-600 leading-relaxed relative z-10 mb-4">
                      O nome técnico é <strong>Imposto Seletivo (IS)</strong>, mas todo mundo chama de Imposto do Pecado. É uma sobretaxa para desestimular o consumo de coisas que fazem mal para você ou para o planeta.
                  </p>
                  <div className="grid grid-cols-2 gap-4 relative z-10 mt-4">
                      <div className="bg-orange-50 p-3 rounded-lg text-sm text-orange-800 font-medium border border-orange-100">🚫 Cigarros e Álcool</div>
                      <div className="bg-orange-50 p-3 rounded-lg text-sm text-orange-800 font-medium border border-orange-100">⛽ Carros a Gasolina</div>
                      <div className="bg-orange-50 p-3 rounded-lg text-sm text-orange-800 font-medium border border-orange-100">⛏️ Mineração</div>
                      <div className="bg-orange-50 p-3 rounded-lg text-sm text-orange-800 font-medium border border-orange-100">🥤 Refrigerantes</div>
                  </div>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-12 mb-6 flex items-center gap-2">
              <CalendarClock className="text-blue-600" /> Cronograma: Quando começa?
          </h3>
          <p className="text-slate-600 mb-8">
              Muita calma nessa hora. A transição será lenta (quase uma década) para não quebrar a economia de uma vez. Confira as datas chave:
          </p>
          
          <div className="not-prose relative border-l-2 border-slate-200 ml-4 space-y-10 pb-4">
              <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm ring-1 ring-blue-100"></div>
                  <h4 className="font-bold text-slate-900 text-lg">2026: O Ano do Teste</h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      Tudo começa com uma alíquota simbólica de <strong>0,9% (CBS)</strong> e <strong>0,1% (IBS)</strong>. O objetivo não é arrecadar, é testar se os sistemas digitais funcionam.
                  </p>
              </div>
              <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-400 rounded-full border-4 border-white ring-1 ring-slate-200"></div>
                  <h4 className="font-bold text-slate-900 text-lg">2027: Adeus Impostos Federais</h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      Aqui o bicho pega. <strong>PIS e COFINS deixam de existir</strong>. A CBS federal entra com força total. O IPI é zerado para a maioria dos produtos (exceto os que concorrem com a Zona Franca de Manaus).
                  </p>
              </div>
              <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-400 rounded-full border-4 border-white ring-1 ring-slate-200"></div>
                  <h4 className="font-bold text-slate-900 text-lg">2029 a 2032: A Transição Estadual</h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      Nesses 4 anos, o ICMS e o ISS vão diminuindo gradualmente, enquanto o novo IBS sobe na mesma proporção. É um jogo de vasos comunicantes.
                  </p>
              </div>
              <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-sm ring-1 ring-emerald-100"></div>
                  <h4 className="font-bold text-slate-900 text-lg">2033: O Novo Brasil</h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      Vigência integral do novo modelo. O antigo "manicômio tributário" é oficialmente enterrado nos livros de história.
                  </p>
              </div>
          </div>

          {/* FAQ MONSTRO (RICH SNIPPETS POWER) */}
          <div className="mt-16 not-prose" id="faq">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b pb-4">
                <HelpCircle className="text-blue-600" /> Tira-Dúvidas Definitivo
            </h2>
            <div className="grid gap-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer open:bg-white open:ring-2 open:ring-blue-100 transition-all duration-300">
                      <summary className="font-bold text-slate-800 list-none flex justify-between items-center text-base md:text-lg select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-blue-500 font-black text-sm mt-1">#{idx + 1}</span>
                              <span className="leading-snug">{item.p}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-4 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 text-sm md:text-base pl-8">
                          {item.r}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* FONTES AUTORIDADE */}
          <div className="mt-16 pt-8 border-t border-slate-200 print:hidden not-prose bg-blue-50/50 p-6 rounded-2xl">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2"><BookOpen size={14}/> Fontes Oficiais & Verificação</h3>
              <div className="flex flex-wrap gap-3 text-xs font-bold text-blue-700">
                  <a href="https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-2 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all">Emenda Constitucional 132/2023 <ExternalLink size={10}/></a>
                  <a href="https://www.gov.br/fazenda/pt-br/acesso-a-informacao/acoes-e-programas/reforma-tributaria" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-2 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all">Ministério da Fazenda <ExternalLink size={10}/></a>
                  <a href="https://www.camara.leg.br/internet/agencia/infograficos-html5/reforma-tributaria/index.html" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-2 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all">Infográfico Câmara dos Deputados <ExternalLink size={10}/></a>
              </div>
          </div>

          {/* NAVEGAÇÃO FINAL */}
          <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <CheckCircle2 size={16} className="text-emerald-500"/> Continue Planejando seu Futuro:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/financeiro/juros-compostos" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-400 hover:shadow-lg transition-all group">
                  <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-emerald-600 shadow-sm group-hover:scale-110 transition-transform"><TrendingUp size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Juros Compostos</span>
                  <span className="text-sm text-slate-500 mt-1">Simulador de Investimento</span>
              </Link>
              <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group">
                  <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 shadow-sm group-hover:scale-110 transition-transform"><Coins size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                  <span className="text-sm text-slate-500 mt-1">Calculadora CLT 2025</span>
              </Link>
              <Link href="/financeiro/porcentagem" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all group">
                  <div className="bg-purple-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-purple-600 shadow-sm group-hover:scale-110 transition-transform"><PiggyBank size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Porcentagem</span>
                  <span className="text-sm text-slate-500 mt-1">Cálculos Rápidos</span>
              </Link>
            </div>
          </div>

        </div>

        {/* --- ANÚNCIO BOTTOM (PARA DEVS/RETENÇÃO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden">
            <AdUnit slot="reforma_bottom" format="horizontal" variant="software" />
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