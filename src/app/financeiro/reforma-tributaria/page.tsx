import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import TaxReformCalculator from "@/components/calculators/TaxReformCalculator";
import { calculateTaxReform } from "@/lib/calculators/tax-reform";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { reformData } from "@/data/reform-data";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Landmark, HelpCircle, BookOpen, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle2, ShoppingCart, 
  Coins, Scale, FileText, ArrowRight, History, 
  CalendarClock, Zap, Receipt, LineChart, Globe, ShieldCheck,
  Wallet,
  ExternalLink
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Simulador da Reforma Tributária 2026 | Calcule o Impacto no seu Bolso";
  const description = "Entenda como a nova reforma tributária afeta o preço dos produtos e seu poder de compra em 2026. Simulação gratuita do IVA Dual, Cashback e Imposto Seletivo.";

  return {
    title,
    description,
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
      title,
      description,
      url: "https://mestredascontas.com.br/financeiro/reforma-tributaria",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article" },
    robots: { index: true, follow: true } };
}

// --- FAQ LIST (SCHEMA ROBUSTO PARA RICH SNIPPETS) ---
const faqList = [
    { p: "Quando a Reforma começa a valer de verdade?", r: "A fase de testes começa em 2026, com uma alíquota simbólica de 0,9% (CBS) e 0,1% (IBS). A virada de chave real acontece em 2027 para os impostos federais e a transição completa termina apenas em 2033." },
    { p: "O que é o IVA Dual?", r: "É a unificação de impostos. 'Dual' porque são dois: a CBS (Federal, substitui PIS/COFINS/IPI) e o IBS (Estadual/Municipal, substitui ICMS/ISS)." },
    { p: "A Cesta Básica vai aumentar?", r: "Não. A Reforma cria a 'Cesta Básica Nacional', com alíquota ZERO de impostos. Itens como arroz, feijão, pão e leite ficarão totalmente isentos." },
    { p: "Como funciona o Cashback do Povo?", r: "Famílias de baixa renda cadastradas no CadÚnico receberão de volta parte do imposto pago em contas de luz, água, gás e alimentos. O estorno será feito no cartão ou conta bancária." },
    { p: "O que é o 'Imposto do Pecado' (Seletivo)?", r: "É uma sobretaxa para produtos nocivos à saúde e ao meio ambiente. Cigarros, bebidas alcoólicas, refrigerantes, veículos poluentes e mineração pagarão IVA + Imposto Seletivo." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Simulador Reforma Tributária",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para comparar carga tributária atual com o novo IVA Dual." },
    {
      "@type": "TechArticle",
      "headline": "Guia da Reforma Tributária 2026: O Dossiê Completo",
      "description": "A maior mudança econômica dos últimos 60 anos. Entenda o IVA, Cashback e como isso afeta seu bolso.",
      "proficiencyLevel": "Beginner",
      "author": { "@type": "Organization", "name": "Equipe Jurídica Mestre das Contas", "url": "https://mestredascontas.com.br/sobre" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-03-20",
      "dateModified": new Date().toISOString(),
      "speakable": {
           "@type": "SpeakableSpecification",
           "xpath": ["/html/head/title", "/html/head/meta[@name='description']/@content"]
      }
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

export default async function ReformaPage() {


  // --- MODO PÁGINA NORMAL ---
  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER ESPECIAL (VARIANT REFORM) --- */}
      <div className="px-4 sm:px-6 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 max-w-7xl mx-auto w-full">
        <PageHeader 
          title="Calculadora da Reforma Tributária"
          description="O Brasil aprovou a maior mudança de impostos dos últimos 60 anos. Adeus sopa de letrinhas, olá IVA Dual. Simule agora o impacto real no seu poder de compra."
          category="Economia & Futuro"
          icon={<Landmark size={32} strokeWidth={2} />}
          variant="reform" // Ativa o gradiente Verde/Teal
          badge="Lei Aprovada"
          categoryColor="emerald"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Reforma Tributária" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO FISCAL (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Informações baseadas no texto da Emenda Constitucional 132/2023 e regulamentações vigentes para o período de transição 2026.</span>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="reforma_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
                  <PrivacyBadge />
                  <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                    <TaxReformCalculator />
                  </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full mx-auto flex justify-center my-6 print:hidden min-h-[250px] rounded-3xl overflow-hidden">
            <LazyAdUnit slot="reforma_mid" format="auto" variant="agency" />
        </div>

        {/* --- CONTEÚDO PROFUNDO (HUMANIZADO + SEO) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg w-full max-w-none mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden print:hidden">
          
          {/* INTRODUÇÃO COM STORYTELLING */}
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-emerald-600 pl-4">
              O Fim do "Manicômio Tributário"
          </h2>
          
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
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
          <div className="not-prose my-10 w-full">
              {/* DESKTOP TABLE */}
              <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="bg-slate-900 dark:bg-slate-950 text-white p-4 text-center font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                    <History size={16}/> O Grande "De/Para" da Reforma
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 font-bold w-1/2">Sistema Antigo (Vai Morrer)</th>
                                <th className="px-6 py-4 font-bold w-1/2 text-blue-700 dark:text-blue-300">Sistema Novo (IVA Dual)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">PIS (Federal)</td>
                                <td className="px-6 py-4 font-bold text-blue-800 dark:text-blue-300 border-l-4 border-blue-600 bg-blue-50/30 dark:bg-blue-900/10 align-middle" rowSpan={3}>
                                    CBS (Contribuição sobre Bens e Serviços)<br/>
                                    <span className="text-xs font-normal text-blue-600 dark:text-blue-400">Arrecadação Federal</span>
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">COFINS (Federal)</td>
                            </tr>
                            <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">IPI (Federal)</td>
                            </tr>
                            
                            <tr className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">ICMS (Estadual)</td>
                                <td className="px-6 py-4 font-bold text-emerald-800 dark:text-emerald-300 border-l-4 border-emerald-600 bg-emerald-50/30 dark:bg-emerald-900/10 align-middle" rowSpan={2}>
                                    IBS (Imposto sobre Bens e Serviços)<br/>
                                    <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400">Arrecadação Estadual/Municipal</span>
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">ISS (Municipal)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </div>

              {/* MOBILE CARDS (SIMPLIFIED TRANSFORMATION) */}
              <div className="md:hidden space-y-4">
                  {/* CARD 1: CBS */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                      <div className="bg-blue-600 p-4 text-white text-center font-bold">
                          Transição Federal
                      </div>
                      <div className="p-4 flex items-center justify-between">
                          <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400 line-through">
                              <div>PIS</div>
                              <div>COFINS</div>
                              <div>IPI</div>
                          </div>
                          <div className="text-blue-500"><ArrowRight size={24}/></div>
                          <div className="text-right">
                              <span className="block font-black text-blue-700 dark:text-blue-400 text-xl">CBS</span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Contribuição Federal</span>
                          </div>
                      </div>
                  </div>
                  
                  {/* CARD 2: IBS */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                      <div className="bg-emerald-600 p-4 text-white text-center font-bold">
                          Transição Estadual/Municipal
                      </div>
                      <div className="p-4 flex items-center justify-between">
                          <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400 line-through">
                              <div>ICMS</div>
                              <div>ISS</div>
                          </div>
                          <div className="text-emerald-500"><ArrowRight size={24}/></div>
                          <div className="text-right">
                              <span className="block font-black text-emerald-700 dark:text-emerald-400 text-xl">IBS</span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Imposto Único</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-12 mb-6 flex items-center gap-2">
              <Scale className="text-indigo-600" /> Quem paga a conta? (Ganhadores e Perdedores)
          </h3>
          <p className="text-slate-700 dark:text-slate-300">
              A alíquota padrão estimada é de <strong>26,5%</strong>. Pode parecer alto, mas lembre-se: hoje, somando tudo, muitos produtos já pagam mais de 34% de imposto "escondido".
          </p>
          <p>
              Para manter a carga tributária neutra (o governo não arrecadar nem mais, nem menos), houve um reequilíbrio de forças. Veja onde você se encaixa:
          </p>

          <div className="grid md:grid-cols-2 gap-6 not-prose mb-10">
              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10"><TrendingDown size={80} className="text-emerald-800 dark:text-emerald-400"/></div>
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200 mb-4 flex items-center gap-2 text-lg"><CheckCircle2 size={24}/> Vai ficar mais barato</h4>
                  <p className="text-xs text-emerald-900 dark:text-emerald-300 mb-4 uppercase font-bold tracking-wide">Indústria e Essenciais</p>
                  <ul className="text-sm text-emerald-900 dark:text-emerald-200 space-y-3 font-medium">
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0"/> Cesta Básica Nacional (Alíquota Zero)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0"/> Medicamentos e Dispositivos Médicos</li>
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0"/> Eletrodomésticos e Eletrônicos</li>
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0"/> Conta de Luz (Baixa renda via Cashback)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0"/> Transporte Público Coletivo</li>
                  </ul>
              </div>
              
              <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-2xl border border-rose-200 dark:border-rose-800/50 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10"><TrendingUp size={80} className="text-rose-800 dark:text-rose-400"/></div>
                  <h4 className="font-bold text-rose-900 dark:text-rose-200 mb-4 flex items-center gap-2 text-lg"><AlertTriangle size={24}/> Vai ficar mais caro</h4>
                  <p className="text-xs text-rose-900 dark:text-rose-300 mb-4 uppercase font-bold tracking-wide">Serviços e Supérfluos</p>
                  <ul className="text-sm text-rose-900 dark:text-rose-200 space-y-3 font-medium">
                      <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0"/> Serviços (Streaming, Academias, Apps)</li>
                      <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0"/> Cigarros e Bebidas (Imposto Seletivo)</li>
                      <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0"/> Refrigerantes e Ultraprocessados</li>
                      <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0"/> Iates, Jatinhos e Carros Poluentes</li>
                      <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0"/> Heranças (ITCMD Progressivo)</li>
                  </ul>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-12 mb-6 flex items-center gap-2">
              <Zap className="text-yellow-500" /> A Tecnologia do Split Payment
          </h3>
          <p className="text-slate-700 dark:text-slate-300">
              Essa é a verdadeira revolução silenciosa. O <strong>Split Payment</strong> (Pagamento Dividido) vai acabar com a sonegação.
          </p>
          <p className="text-slate-700 dark:text-slate-300">
              Funciona assim: quando você passar o cartão para comprar uma TV de R$ 1.000, o sistema do banco vai identificar automaticamente que R$ 265 são impostos. Esse valor nem entra na conta da loja; vai direto para o governo em tempo real.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/50 border-l-4 border-yellow-400 p-4 my-6 italic text-slate-700 dark:text-slate-300">
              "Isso significa o fim daquelas empresas que vendem sem nota para pagar menos imposto e concorrem de forma desleal com quem faz tudo certo."
          </div>

          {/* CASHBACK E IMPOSTO SELETIVO */}
          <div className="grid gap-8 my-12 not-prose">
              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-400 mb-3 flex items-center gap-2 relative z-10">
                      <Wallet size={24} className="text-indigo-600 dark:text-indigo-500"/> Cashback do Povo: Justiça Social
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed relative z-10 mb-4 text-sm">
                      Pela primeira vez, o Brasil terá um sistema de devolução de impostos. O sistema tributário antigo era cruel: o pobre pagava o mesmo imposto no arroz que o rico.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed relative z-10 text-sm">
                      Com o Cashback, famílias cadastradas no <strong>CadÚnico</strong> receberão de volta parte da CBS/IBS paga na luz, água, gás e alimentos. O dinheiro volta direto para o cartão ou conta bancária. É a justiça tributária na veia.
                  </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-orange-100 dark:border-orange-900/50 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 dark:bg-orange-900/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  <h3 className="text-xl font-bold text-orange-900 dark:text-orange-400 mb-3 flex items-center gap-2 relative z-10">
                      <AlertTriangle size={24} className="text-orange-600 dark:text-orange-500"/> O "Imposto do Pecado"
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed relative z-10 mb-4 text-sm">
                      O nome técnico é <strong>Imposto Seletivo (IS)</strong>, mas todo mundo chama de Imposto do Pecado. É uma sobretaxa para desestimular o consumo de coisas que fazem mal para você ou para o planeta.
                  </p>
                  <div className="grid grid-cols-2 gap-4 relative z-10 mt-4">
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-xs text-orange-800 dark:text-orange-200 font-medium border border-orange-100 dark:border-orange-900/30 text-center">🚫 Cigarros e Álcool</div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-xs text-orange-800 dark:text-orange-200 font-medium border border-orange-100 dark:border-orange-900/30 text-center">⛽ Carros a Gasolina</div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-xs text-orange-800 dark:text-orange-200 font-medium border border-orange-100 dark:border-orange-900/30 text-center">⛏️ Mineração</div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-xs text-orange-800 dark:text-orange-200 font-medium border border-orange-100 dark:border-orange-900/30 text-center">🥤 Refrigerantes (Açucarados)</div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-xs text-orange-800 dark:text-orange-200 font-medium border border-orange-100 dark:border-orange-900/30 text-center">🎰 Apostas (Bets)</div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 italic border-t border-orange-100 dark:border-orange-900/30 pt-3">
                      *A lista oficial pode mudar até a regulamentação final. O objetivo é saúde pública e ambiental.
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-12 mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-blue-600" /> Simulação por Profissão (Veja a sua)
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-8">
              A reforma afeta cada profissão de um jeito. Advogados, Médicos e Motoristas terão regras diferentes. Selecione sua área para uma análise detalhada:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 not-prose mb-12">
                {reformData.slice(0, 12).map((item) => (
                    <Link key={item.slug} href={`/financeiro/reforma-tributaria/${item.slug}`} 
                        className="group flex flex-col p-4 bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 rounded-xl transition-all shadow-sm hover:shadow-md"
                    >
                        <span className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 text-sm mb-1">{item.jobTitle}</span>
                        <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide
                                ${item.verdict.includes('Aumento') ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 
                                  item.verdict.includes('Redução') ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 
                                  'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'}`
                            }>
                                {item.verdict === 'Aumento de Carga' ? 'Aumento' : item.verdict === 'Redução de Carga' ? 'Queda' : 'Neutro'}
                            </span>
                        </div>
                    </Link>
                ))}
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-12 mb-6 flex items-center gap-2">
              <CalendarClock className="text-blue-600" /> Cronograma: Quando começa?
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-8">
              Muita calma nessa hora. A transição será lenta (quase uma década) para não quebrar a economia de uma vez. Confira as datas chave:
          </p>
          
          <div className="not-prose relative border-l-2 border-slate-200 ml-4 space-y-10 pb-4">
              <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm ring-1 ring-blue-100"></div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">2026 (Hoje): O Ano do Teste</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                      Tudo começa com uma alíquota simbólica de <strong>0,9% (CBS)</strong> e <strong>0,1% (IBS)</strong>. O objetivo não é arrecadar, é testar se os sistemas digitais funcionam.
                  </p>
              </div>
              <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-400 rounded-full border-4 border-white ring-1 ring-slate-200"></div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">2027: Adeus Impostos Federais</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                      Aqui o bicho pega. <strong>PIS e COFINS deixam de existir</strong>. A CBS federal entra com força total. O IPI é zerado para a maioria dos produtos.
                  </p>
              </div>
              <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-400 rounded-full border-4 border-white ring-1 ring-slate-200"></div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">2029 a 2032: A Transição Estadual</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                      Nesses 4 anos, o ICMS e o ISS vão diminuindo gradualmente, enquanto o novo IBS sobe na mesma proporção.
                  </p>
              </div>
              <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-sm ring-1 ring-emerald-100"></div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">2033: O Novo Brasil</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                      Vigência integral do novo modelo. O antigo "manicômio tributário" é oficialmente enterrado.
                  </p>
              </div>
          </div>

          <div className="mt-16 not-prose" id="faq">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-600" /> Tira-Dúvidas Definitivo
            </h2>
            <div className="grid gap-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-900 open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all duration-300">
                      <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center text-base md:text-lg select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-blue-600 dark:text-blue-400 font-black text-sm mt-1">#{idx + 1}</span>
                              <span className="leading-snug">{item.p}</span>
                          </div>
                          <span className="text-slate-500 dark:text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 text-sm md:text-base pl-8 animate-in fade-in">
                          {item.r}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* FONTES AUTORIDADE */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-2xl">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><BookOpen size={14}/> Fontes Oficiais & Verificação</h3>
              <div className="flex flex-wrap gap-3 text-xs font-bold text-blue-700 dark:text-blue-400">
                  <a href="https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all">Emenda Constitucional 132/2023 <ExternalLink size={10}/></a>
                  <a href="https://www.gov.br/fazenda/pt-br/acesso-a-informacao/acoes-e-programas/reforma-tributaria" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all">Ministério da Fazenda <ExternalLink size={10}/></a>
                  <a href="https://www.camara.leg.br/internet/agencia/infograficos-html5/reforma-tributaria/index.html" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all">Infográfico Câmara dos Deputados <ExternalLink size={10}/></a>
              </div>
          </div>

        </div>

        <SmartCrossLinker currentHref="/financeiro/reforma-tributaria" category="financeiro" />

        {/* --- ANÚNCIO BOTTOM (PARA DEVS/RETENÇÃO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="reforma_bottom" format="horizontal" variant="software" />
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