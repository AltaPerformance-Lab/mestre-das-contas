import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import TimeCalculator from "@/components/calculators/TimeCalculator";

import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Clock, HelpCircle, History, BookOpen, Calculator,
  Wallet, FileText, Scale, Landmark, ExternalLink, Timer, 
  CheckCircle2, AlertTriangle, Moon, Coins, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Horas Trabalhadas 2026 (Grátis) | Somar Ponto Online";
  const description = "Quer controlar a sua jornada de trabalho? Calcule o total de horas trabalhadas no mês de forma exata e simplificada. Rápido, seguro e 100% gratuito!";

  return {
    title,
    description,
    keywords: ["calculadora de horas trabalhadas", "somar horas and minutos", "calculo de ponto online", "diferença de horas", "controle de ponto gratis"],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/horas-trabalhadas" },
    openGraph: {
      title,
      url: "https://mestredascontas.com.br/trabalhista/horas-trabalhadas",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Horas Trabalhadas Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Não erre mais na soma das suas horas!",
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true } };
}

// --- LISTA FAQ (7 DÚVIDAS REAIS) ---
const faqList = [
  { 
    q: "Como funciona o cálculo de horas trabalhadas no sistema sexagesimal (base 60)?", 
    a: "Diferente dos números decimais comuns, o tempo é medido em base 60. Isso significa que 1 hora tem exatamente 60 minutos, e não 100. Se você tentar somar 8 horas e 50 minutos com 8 horas e 50 minutos em uma calculadora comum, obterá 17,00. Mas o cálculo real é sexagesimal: 50 minutos mais 50 minutos somam 100 minutos (1 hora e 40 minutos), totalizando 17 horas e 40 minutos." 
  },
  { 
    q: "Qual é a tolerância máxima diária para atrasos e horas extras na folha de ponto?", 
    a: "Conforme determina o artigo 58 da CLT, existe um limite de tolerância diária de até 10 minutos no total, sendo tolerado o máximo de 5 minutos de atraso ou adiantamento no início do expediente, intervalo ou saída. Se o trabalhador extrapolar esse teto por apenas 1 minuto (totalizando 11 minutos de variação no dia), o empregador é obrigado a computar e pagar (ou descontar) todo o período de variação e não apenas os minutos sobressalentes." 
  },
  { 
    q: "O intervalo de almoço ou descanso (intrajornada) conta como hora de trabalho?", 
    a: "Não. O intervalo intrajornada, destinado ao repouso e à alimentação (almoço ou jantar), não é computado como tempo de serviço efetivo e, portanto, não é remunerado. Ele é considerado um período de suspensão do contrato diário, no qual o trabalhador tem plena liberdade para deixar o local de trabalho." 
  },
  { 
    q: "Como funciona o cálculo e o pagamento do adicional noturno na jornada de trabalho?", 
    a: "Para quem trabalha no ambiente urbano entre as 22h de um dia e as 5h do dia seguinte, a hora é computada como reduzida, correspondendo a apenas 52 minutos e 30 segundos. Adicionalmente, sobre esse tempo é acrescido o Adicional Noturno de no mínimo 20% aplicado diretamente sobre o valor da hora diurna convencional do trabalhador." 
  },
  { 
    q: "O que é o intervalo interjornada e qual o seu tempo mínimo obrigatório?", 
    a: "O intervalo interjornada é o período de repouso obrigatório que o trabalhador deve ter entre o fim de um expediente diário e o início do próximo. Por lei (Art. 66 da CLT), esse intervalo ininterrupto deve ser de no mínimo 11 horas consecutivas." 
  },
  { 
    q: "Como calcular o saldo acumulado de banco de horas no fim do mês?", 
    a: "Para apurar o saldo do seu banco de horas, você deve primeiro somar as horas trabalhadas em cada dia do mês e deduzir a jornada mensal contratual acordada. Se o resultado for positivo, são horas a compensar ou receber como folga/extra; se for negativo, são horas a repor para evitar descontos salariais." 
  },
  { 
    q: "O que diz a lei sobre a obrigatoriedade do registro de ponto na empresa?", 
    a: "De acordo com o artigo 74 da CLT, o registro do ponto (seja manual, mecânico ou eletrônico) é obrigatório para todas as empresas e estabelecimentos que possuam mais de 20 trabalhadores registrados em seu quadro de funcionários." 
  }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO COM 7 FAQ) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Horas Trabalhadas",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para somar horas de trabalho, calcular intervalos e saldo de banco de horas."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Horas Trabalhadas e Ponto Online",
      "description": "Aprenda a somar suas horas diárias e controlar seu banco de horas com nossa calculadora de ponto.",
      "totalTime": "PT30S",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Insira os Horários de Entrada e Saída",
          "text": "Digite o horário de início (Entrada 1) e o horário de fim da primeira jornada (Saída 1/Almoço).",
          "url": "https://mestredascontas.com.br/trabalhista/horas-trabalhadas#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Informe o Período da Tarde/Retorno",
          "text": "Digite o horário de volta do intervalo (Entrada 2) e a saída no fim do expediente (Saída 2).",
          "url": "https://mestredascontas.com.br/trabalhista/horas-trabalhadas#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Adicione Turnos ou Defina a Jornada",
          "text": "Se tiver turnos extras, clique em '+ Adicionar Turno'. Digite sua jornada contratual para ver o saldo diário de horas extras ou negativas.",
          "url": "https://mestredascontas.com.br/trabalhista/horas-trabalhadas#ferramenta"
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Como controlar seu Banco de Horas e evitar descontos",
      "description": "Guia prático sobre controle de jornada, tolerância de atrasos e cálculo de horas extras.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-03-10",
      "dateModified": new Date().toISOString()
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


export default async function HorasPage() {
  // --- MODO PÁGINA NORMAL ---
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Horas Trabalhadas"
          description="Controle seu ponto sem complicação. Some os horários de entrada e saída, desconte o almoço e descubra seu saldo diário de Banco de Horas."
          category="Produtividade & Trabalho"
          icon={<Timer size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="indigo"
          badge="Ferramenta Gratuita"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Horas Trabalhadas" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO LEGAL (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Informações baseadas na Consolidação das Leis do Trabalho (CLT) e atualizações vigentes em 2026.</span>
        </div>

        {/* ALERTA DE TOLERÂNCIA */}
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex gap-3 items-start text-left max-w-3xl mx-auto w-full shadow-sm">
          <AlertTriangle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide">Regra dos 10 Minutos</p>
            <p className="text-sm text-amber-800/90 dark:text-amber-300 leading-relaxed">
              Pela CLT, atrasos ou horas extras de até <strong>10 minutos diários</strong> (5 na entrada, 5 na saída) não são contabilizados. Passou disso, conta tudo!
            </p>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-indigo-50/30 dark:bg-slate-900/50 rounded-lg border border-dashed border-indigo-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="ponto_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-indigo-100 dark:border-slate-800 shadow-xl shadow-indigo-100/50 dark:shadow-none p-1 md:p-2">
                  <PrivacyBadge />
                  <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                    <TimeCalculator />
                  </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="ponto_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL (ADSENSE & AI GROUNDING RICH) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2 mb-4 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
                Como Usar a Calculadora de Horas Trabalhadas (Passo a Passo)
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
               Some suas horas diárias e saiba seu saldo de banco de horas em 3 passos rápidos:
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">1</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Entrada e Almoço</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Informe o horário de entrada (Entrada 1) e o horário em que saiu para o almoço (Saída 1).</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">2</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Retorno e Fim do Dia</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Informe o horário em que voltou do almoço (Entrada 2) e o encerramento do seu dia (Saída 2).</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">3</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Jornada e Saldo</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Defina sua jornada de trabalho regular (ex: 8h) para ver o saldo diário de horas positivas ou negativas.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
               O Segredo do Controle de Horas e Ponto Eletrônico
            </h2>
            
            <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
              Você já teve a incômoda sensação de que o seu banco de horas está sumindo ou que a conta da folha de pagamento simplesmente não fecha no fim do mês?
            </p>
            
            <p>
              A verdade é que somar horas não é como somar dinheiro ou itens de uma lista convencional. 
            </p>

            <p>
              Veja bem, o nosso tempo é metrificado no complexo <GlossaryTerm slug="sistema-sexagesimal-soma-horas">sistema sexagesimal</GlossaryTerm> (de base 60), o que costuma dar um nó na cabeça de qualquer pessoa. 
            </p>

            <p>
              Se você somar `8,50 + 8,50` em uma calculadora matemática comum do celular, por exemplo, o visor exibirá `17,00`. 
            </p>

            <p>
              Mas no cálculo de ponto real de trabalho, `8 horas e 50 minutos` somados a `8 horas e 50 minutos` resultam no saldo exato de **17 horas e 40 minutos**!
            </p>

            <p>
              Essa discrepância sutil é a porta de entrada para prejuízos financeiros silenciosos, gerando descontos salariais injustos para o colaborador ou o pagamento indevido de encargos extraordinários pela empresa.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">
              Entendendo os Regimes de Jornada Trabalhista no Brasil
            </h3>

            <p>
              Nós sabemos quão desafiador pode ser ler as dezenas de cláusulas da CLT e as normas de sindicatos locais. 
            </p>

            <p>
              Por isso, estruturamos uma tabela comparativa direta de regimes de jornada de trabalho para que você compreenda de forma transparente onde sua escala profissional se enquadra.
            </p>

            <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <table className="w-full min-w-[750px] text-sm text-left border-collapse bg-white dark:bg-slate-900">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Regime de Jornada</th>
                    <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Duração Padrão</th>
                    <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Intervalo Mínimo</th>
                    <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300 text-right">Direito Adicional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Jornada Diurna Padrão</td>
                    <td className="px-6 py-4 text-xs text-slate-500">8h por dia / 44h semanais</td>
                    <td className="px-6 py-4 text-xs text-slate-500">1h a 2h (para jornadas &gt; 6h)</td>
                    <td className="px-6 py-4 text-xs text-slate-600 text-right font-medium">Hora extra de no mínimo 50%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Jornada Noturna Urbana</td>
                    <td className="px-6 py-4 text-xs text-slate-500">Expediente entre 22h e 5h</td>
                    <td className="px-6 py-4 text-xs text-slate-500">1h (se jornada diária &gt; 6h)</td>
                    <td className="px-6 py-4 text-xs text-emerald-600 font-bold text-right">Hora de 52m30s + Adicional de 20%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Escala Especial 12x36</td>
                    <td className="px-6 py-4 text-xs text-slate-500">12h contínuas de labor</td>
                    <td className="px-6 py-4 text-xs text-slate-500">36h consecutivas de folga</td>
                    <td className="px-6 py-4 text-xs text-slate-500 text-right">Previsto em convenção coletiva ou lei</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-6 border-l-4 border-indigo-500 pl-4">
              Incrível Impacto da Regra Trabalhista de Tolerância
            </h2>

            <p>
              Muitos trabalhadores desconhecem a famosa regra de tolerância do ponto contida na CLT. 
            </p>

            <p>
              Imagine que você atrasou 4 minutos na sua entrada da manhã e, para compensar, resolveu sair 5 minutos mais tarde no fim do expediente. 
            </p>

            <p>
              A verdade é que esses pequenos minutos somam 9 minutos de oscilação total no dia. 
            </p>

            <p>
              Como essa variação ficou dentro do limite de tolerância legal diário de até **10 minutos**, o seu salário permanece intocado. Nenhuma empresa pode descontar esse atraso, assim como não é obrigada a pagar esse pequeno excedente como hora extra.
            </p>

            <p>
              Mas fique muito atento! Se essa variação somar **11 minutos**, a tolerância de 10 minutos é anulada retroativamente, fazendo com que todo o período de variação seja cobrado no banco de horas.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">
              A Diferença Oculta do Adicional Noturno Reduzido
            </h3>

            <p>
              Se a sua rotina de trabalho como trabalhador clt avança pelo período noturno, existe uma regra fascinante que funciona como um bônus de tempo legal.
            </p>

            <p>
              O melhor de tudo? Na jornada noturna (22h às 5h), a hora legal não dura 60 minutos, mas sim **52 minutos e 30 segundos**.
            </p>

            <p>
              Isso significa que, na prática, ao trabalhar 7 horas de relógio no período noturno, o seu empregador é obrigado a computar e pagar **8 horas normais** no seu holerite!
            </p>

            <p>
              E quer saber mais? Adicionalmente, sobre esse tempo recai o acréscimo financeiro obrigatório de no mínimo 20% do Adicional Noturno.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4">
              Como Blindar Seus Direitos de Ponto na Prática
            </h3>

            <p>
              Para assegurar que seus cálculos estejam sempre corretos, utilize nosso simulador de ponto diário de forma consistente. 
            </p>

            <p>
              Anotar as entradas e saídas em um bloco de notas pessoal ou aplicativo de banco de horas de forma paralela dá a você o poder do contra-argumento legal contra eventuais falhas do sistema de cartão de ponto biométrico ou digital da empresa.
            </p>

            {/* SEÇÃO FAQ COM 7 DÚVIDAS REAIS (MANDATORY RULE 5) */}
            <div className="mt-16 not-prose">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <HelpCircle className="text-indigo-500" /> Perguntas Frequentes
              </h2>
              
              <div className="space-y-4">
                {faqList.map((item, idx) => (
                    <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-1 open:ring-indigo-100 dark:open:ring-indigo-900/30 transition-all">
                        <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            <div className="flex items-start gap-3">
                                <span className="text-indigo-500 dark:text-indigo-400 font-bold text-xs mt-1">#</span>
                                <span className="leading-snug text-slate-800 dark:text-slate-200">{item.q}</span>
                            </div>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm">
                            {item.a}
                        </p>
                    </details>
                ))}
              </div>
            </div>

            {/* REFERÊNCIAS OFICIAIS */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Landmark size={16} /> Base Legal (CLT)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Saiba onde estão seus direitos:</p>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                    <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                        CLT - Artigo 58 (Jornada) <ExternalLink size={10}/>
                    </a>
                    <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                        CLT - Artigo 71 (Intervalos) <ExternalLink size={10}/>
                    </a>
                </div>
            </div>
            
            <ExpertSignature updatedAt="Maio de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
          </div>

        <SmartGlossaryLinker currentHref="/trabalhista/horas-trabalhadas" />
        <SmartCrossLinker currentHref="/trabalhista/horas-trabalhadas" category="trabalhista" />

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="ponto_bottom" format="horizontal" variant="software" />
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