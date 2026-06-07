import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import OvertimeCalculator from "@/components/calculators/OvertimeCalculator";

import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Clock, HelpCircle, History, 
  AlertTriangle, CheckCircle2, Coins, 
  Wallet, FileText, Sun, Moon, CalendarDays,
  TrendingUp, Calculator, Landmark, ExternalLink, Scale, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Horas Extras 2026 | Simule seu Recebimento";
  const description = "Trabalhou a mais e quer saber o valor real da sua hora extra? Calcule agora com adicionais de 50%, 100%, Noturno e reflexo no DSR. Simulação 100% grátis!";

  return {
    title,
    description,
    keywords: [
      "calculadora horas extras", 
      "calcular hora extra 50 e 100", 
      "reflexo dsr horas extras", 
      "valor hora de trabalho", 
      "cálculo hora extra sábado", 
      "hora extra noturna",
      "divisor 220 ou 180"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/horas-extras" },
    openGraph: {
      title,
      url: "https://mestredascontas.com.br/trabalhista/horas-extras",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Horas Extras Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Trabalhou a mais? Saiba quanto vai receber!",
      images: ["/opengraph-image"],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } } };
}

// --- FAQ LIST (Exatamente 7 Dúvidas Reais de Usuários) ---
const faqList = [
  { 
    q: "Como calcular o valor de uma hora extra com adicional de 50%?", 
    a: "Para encontrar o valor de uma hora extra comum (50%), você deve primeiro descobrir o valor da sua hora normal de trabalho. Basta dividir o seu salário bruto mensal pelo seu divisor contratual (geralmente 220). Em seguida, multiplique o valor da hora normal por 1,5. Por exemplo: se a sua hora normal vale R$ 10,00, a sua hora extra de 50% valerá exatamente R$ 15,00." 
  },
  { 
    q: "Em quais situações o trabalhador tem direito ao adicional de 100%?", 
    a: "O adicional de 100% (pagamento do valor da hora normal em dobro) é garantido por lei quando o trabalhador realiza horas extraordinárias em dias que seriam suas folgas obrigatórias, como domingos, ou em feriados nacionais, estaduais e municipais. Esse direito só não se aplica se a empresa conceder uma folga compensatória em outro dia da mesma semana." 
  },
  { 
    q: "Como calcular o DSR (Descanso Semanal Remunerado) sobre as horas extras?", 
    a: "Como a hora extra habitual reflete no seu descanso semanal, a conta é feita somando-se todos os valores recebidos de horas extras no mês, dividindo esse total pelo número de dias úteis daquele mês (considerando o sábado como dia útil), e multiplicando o resultado pelo número de domingos e feriados do respectivo período." 
  },
  { 
    q: "O que diz a lei sobre o limite diário de horas extras?", 
    a: "De acordo com o artigo 59 da Consolidação das Leis do Trabalho (CLT), a jornada normal diária de trabalho só pode ser acrescida de horas suplementares em número não excedente a 2 horas diárias, mediante acordo escrito entre empregador e empregado, ou contrato coletivo de trabalho." 
  },
  { 
    q: "Como funciona o cálculo de hora extra noturna?", 
    a: "O cálculo da hora extra noturna acumula dois direitos. Primeiro, aplica-se o adicional noturno (no mínimo 20% sobre a hora diurna). Depois, aplica-se o adicional de hora extra (no mínimo 50%) sobre o valor da hora já acrescida do adicional noturno. Vale lembrar também que a hora noturna urbana é reduzida (dura 52 minutos e 30 segundos)." 
  },
  { 
    q: "A empresa pode substituir o pagamento em dinheiro por banco de horas?", 
    a: "Sim, desde que haja um acordo individual escrito, convenção coletiva ou acordo coletivo de trabalho instituindo o Banco de Horas. Nesse regime, em vez de receber em dinheiro, as horas adicionais trabalhadas são acumuladas para compensação futura na forma de folgas ou saídas antecipadas." 
  },
  { 
    q: "Como provar que trabalhei horas extras caso a empresa não queira pagar?", 
    a: "Você pode utilizar diversos meios de prova na Justiça do Trabalho, como registros paralelos em cadernos ou aplicativos, fotos do local de trabalho com horários, e-mails enviados fora do expediente, mensagens de WhatsApp, relatórios de login no sistema da empresa, além do depoimento de testemunhas que trabalhavam no mesmo horário." 
  }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO COM 7 FAQ) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Horas Extras",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para cálculo de horas suplementares com adicional de 50%, 100% e reflexo no repouso remunerado."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Horas Extras e DSR",
      "description": "Aprenda a calcular o valor das suas horas extraordinárias com adicionais legais passo a passo.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Calcule a Hora Normal",
          "text": "Divida seu salário mensal pelo divisor de horas do seu contrato (ex: 220 para 44h semanais)."
        },
        {
          "@type": "HowToStep",
          "name": "Aplique o Adicional",
          "text": "Multiplique o valor obtido por 1,5 para horas comuns (50%) ou por 2,0 para feriados e folgas (100%)."
        },
        {
          "@type": "HowToStep",
          "name": "Apure os Reflexos no DSR",
          "text": "Some o valor mensal das extras, divida pelos dias úteis e multiplique pelos domingos e feriados."
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Guia Avançado das Horas Extras: Descubra Seus Direitos e Evite Erros",
      "description": "Guia detalhado sobre adicionais de horas extras, o impacto invisível do DSR na folha de pagamento e regras do regime CLT.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-03-01",
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

export default async function HorasExtrasPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Horas Extras"
          description="Você sabe quanto vale o seu tempo trabalhado a mais? Simule o valor exato das horas de 50%, feriados (100%) e descubra o impacto real do DSR."
          category="Direitos Trabalhistas (CLT)"
          icon={<Clock size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="purple"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Horas Extras" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO LEGAL (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Informações baseadas na Consolidação das Leis do Trabalho (CLT) e atualizações vigentes em 2026.</span>
        </div>

        {/* ALERTA BANCO DE HORAS */}
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex gap-3 items-start text-left max-w-3xl mx-auto w-full shadow-sm">
          <AlertTriangle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide">Atenção ao Banco de Horas</p>
            <p className="text-sm text-amber-800/90 dark:text-amber-300 leading-relaxed">
              Se sua empresa adota o acordo de Banco de Horas, ela pode compensar o tempo extra com folgas futuras em vez de pagar em dinheiro. Fique atento às convenções coletivas!
            </p>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="horas_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
            <PrivacyBadge />
            <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <OvertimeCalculator />
            </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
            <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
          <LazyAdUnit slot="horas_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DENSO E HUMANIZADO (ADSENSE & AI GROUNDING) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-purple-600 pl-4">
              O Incrível Impacto das Horas Extras no Salário
          </h2>
          
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Você já teve a incômoda sensação de que trabalha muito além do combinado, mas que esse tempo extra simplesmente desaparece no fechamento do seu holerite?
          </p>

          <p>
            A verdade é que as horas extras representam um dos temas que mais geram atritos e dúvidas nos ambientes profissionais do Brasil. 
          </p>

          <p>
            Veja bem, o nosso tempo de trabalho é o nosso recurso mais valioso e escasso, funcionando como uma espécie de motor de alta performance que colocamos à disposição das empresas.
          </p>

          <p>
            Se nós passamos a "overclocar" esse motor para entregar um rendimento acima do programado, é de extrema justiça que a remuneração venha na mesma proporção.
          </p>

          <p>
            Parece óbvio, né? No entanto, os cálculos trabalhistas envolvem uma série de variáveis legais que costumam deixar até os trabalhadores mais experientes com a cabeça cheia de interrogações.
          </p>

          <p>
            O melhor de tudo? Nós preparamos este guia completo para desmistificar todo o processo e ensinar você a simular o valor exato a que tem direito!
          </p>

          <h3 className="text-xl font-bold text-slate-850 dark:text-slate-150 mt-8 mb-4">
              O Segredo do Divisor de Horas na Escala CLT
          </h3>

          <p>
            Para dar o primeiro passo e descobrir o real valor da sua hora extraordinária, nós precisamos primeiro encontrar o valor do seu período comum de labor.
          </p>

          <p>
            Muitos profissionais acreditam que basta dividir o salário bruto direto por 30 dias. Mas, na realidade, a CLT utiliza "divisores de jornada" específicos.
          </p>

          <p>
            Se a sua jornada contratual é de 44 horas semanais (o padrão da grande maioria dos trabalhadores urbanos no país), o seu divisor oficial é o **220**.
          </p>

          <p>
            Isso quer dizer que, independentemente do mês ter 28, 30 ou 31 dias, o cálculo da sua remuneração base é rateado sempre por essa régua de tempo.
          </p>

          {/* TABELA DE COMPARAÇÃO DE HORAS EXTRAS (MANDATORY RULE 4) */}
          <div className="not-prose my-8 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Tabela Comparativa de Adicionais Extras</h4>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Legislação Federal 2026</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-sm text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs">
                  <tr>
                    <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Tipo de Escala / Dia</th>
                    <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Adicional Praticado</th>
                    <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Como é Calculado</th>
                    <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700 text-right">Direito Adicional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Segunda a Sábado (Diurno)</td>
                    <td className="px-6 py-4 font-bold text-orange-600">50%</td>
                    <td className="px-6 py-4 text-xs">Valor da Hora Normal × 1,50</td>
                    <td className="px-6 py-4 text-xs text-right font-medium">Mínimo Constitucional</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Domingos e Feriados</td>
                    <td className="px-6 py-4 font-bold text-purple-600">100%</td>
                    <td className="px-6 py-4 text-xs">Valor da Hora Normal × 2,00</td>
                    <td className="px-6 py-4 text-xs text-right font-medium">Dobro sem compensação</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Horário Noturno (22h às 5h)</td>
                    <td className="px-6 py-4 font-bold text-emerald-600">50% + Adc. Noturno</td>
                    <td className="px-6 py-4 text-xs">(Hora Normal × 1,20) × 1,50</td>
                    <td className="px-6 py-4 text-xs text-right font-medium text-emerald-600 font-semibold">Hora Reduzida de 52m30s</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 p-2 bg-slate-50 dark:bg-slate-800 text-center border-t border-slate-100 dark:border-slate-700">* Importante: Normas coletivas de certas categorias profissionais garantem adicionais maiores, como 60% ou 110%.</p>
          </div>

          <h3 className="text-xl font-bold text-slate-850 dark:text-slate-150 mt-8 mb-4">
              A Verdade Sobre o Bônus Silencioso: Reflexo no DSR
          </h3>

          <p>
            Muitos trabalhadores ficam atentos exclusivamente à linha de "horas extras" no holerite e acabam deixando passar em branco outro direito vital: o **Descanso Semanal Remunerado (<GlossaryTerm slug="dsr-descanso-semanal-remunerado">DSR</GlossaryTerm>)**.
          </p>

          <p>
            Como as horas suplementares representam um ganho financeiro de natureza salarial e habitual, elas obrigatoriamente influenciam o pagamento do seu dia de repouso semanal.
          </p>

          <p>
            Imagine que seu repouso remunerado também precisa ser compensado pela energia extra que você investiu durante os dias normais de trabalho. Faz todo sentido, não é mesmo?
          </p>

          <p>
            A conta do DSR é calculada com base em uma fórmula proporcional que considera o número de dias úteis e o total de domingos e feriados no calendário daquele mês.
          </p>

          <p>
            Para realizar essa conferência, basta somar todas as horas extras prestadas, dividir essa quantia pelos dias de trabalho do mês e multiplicar a fração resultante pelas folgas remuneradas.
          </p>

          <h3 className="text-xl font-bold text-slate-850 dark:text-slate-150 mt-8 mb-4">
              O Poder do <GlossaryTerm slug="adicional-noturno-clt">Adicional Noturno</GlossaryTerm> Cumulativo
          </h3>

          <p>
            Se a sua jornada de trabalho invade o período noturno (compreendido pela legislação urbana entre as 22h de um dia e as 5h da manhã seguinte), prepare-se para ver seu direito crescer de forma substancial.
          </p>

          <p>
            A verdade é que a lei entende que o desgaste físico e social do período da noite é maior e, por isso, concede uma proteção dupla.
          </p>

          <p>
            Em primeiro lugar, a hora noturna tem um tempo menor: a cada 52 minutos e 30 segundos decorridos no relógio comum, a CLT considera que você cumpriu 1 hora inteira de trabalho.
          </p>

          <p>
            Além disso, incide sobre esse valor de hora o adicional de 20%. Quando a hora noturna é acumulada com a extraordinária, aplica-se o multiplicador de 1,5 sobre o valor já integrado.
          </p>

          <p>
            Isso faz com que as horas extras cumpridas de madrugada sejam as mais valiosas da folha de pagamento, impulsionando a compensação pelo seu sacrifício noturno.
          </p>

          {/* SEÇÃO FAQ COM 7 DÚVIDAS REAIS (MANDATORY RULE 5) */}
          <div className="mt-16 not-prose">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-purple-500" /> Perguntas Frequentes sobre Horas Extras
            </h2>
            
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-1 open:ring-purple-100 dark:open:ring-purple-900/30 transition-all">
                      <summary className="font-semibold text-slate-850 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-purple-500 dark:text-purple-400 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug text-slate-800 dark:text-slate-200">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-650 dark:text-slate-350 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* REFERÊNCIAS OFICIAIS */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Fontes Oficiais e Legislação (CLT)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Saiba exatamente onde consultar a lei:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      CLT - Artigo 59 (Horas Extras) <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      CF/88 - Artigo 7º (Direito Constitucional) <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          <ExpertSignature updatedAt="Junho de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
        </div>

        <SmartGlossaryLinker currentHref="/trabalhista/horas-extras" category="trabalhista" />
        <SmartCrossLinker currentHref="/trabalhista/horas-extras" category="trabalhista" />

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="horas_bottom" format="horizontal" variant="software" />
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