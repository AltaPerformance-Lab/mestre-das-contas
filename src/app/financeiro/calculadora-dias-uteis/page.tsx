import { Suspense } from "react";
import { Metadata } from "next";
import BusinessDaysCalculator from "@/components/tools/BusinessDaysCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import ExpertSignature from "@/components/ui/ExpertSignature";
import { 
  CalendarDays, Briefcase, Clock, CheckCircle2, 
  AlertTriangle, HelpCircle, Landmark, Calendar, Scale, Scale as ScaleIcon, ShieldCheck
} from "lucide-react";
import DisclaimerBox from "@/components/ui/DisclaimerBox";

export const metadata: Metadata = {
  title: "Calculadora de Dias Úteis 2026 (Grátis) | Contagem de Prazos",
  description: "Precisa contar prazos processuais ou comerciais? Calcule dias úteis entre duas datas considerando todos os feriados nacionais brasileiros. Rápido e grátis!",
  keywords: [
    "calculadora dias uteis", 
    "contagem de prazo dias uteis", 
    "dias uteis 2026", 
    "somar dias uteis data", 
    "diferença de dias entre datas",
    "calendario dias uteis",
    "dias uteis janeiro 2026",
    "dias uteis fevereiro 2026",
    "prazos processuais dias uteis",
    "contagem cpc dias uteis"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/financeiro/calculadora-dias-uteis" },
  openGraph: {
    title: "Calculadora de Dias Úteis 2026",
    url: "https://mestredascontas.com.br/financeiro/calculadora-dias-uteis",
    siteName: "Mestre das Contas",
    type: "website" }
};

const faqList = [
  { 
    q: "O sábado é considerado dia útil para fins de prazo ou trabalho?", 
    a: "Depende da finalidade. Para fins bancários, liquidação de boletos e prazos processuais do Novo CPC, o sábado NÃO é considerado dia útil. Já para fins trabalhistas de jornada padrão na CLT, o sábado é computado como dia útil." 
  },
  { 
    q: "Como funciona a contagem de prazos: exclui-se o dia do início?", 
    a: "Sim. A regra civil e processual determina que você exclui o dia do começo (a data da intimação ou evento) e inclui o dia de vencimento final. Se o prazo for útil, a contagem inicia no primeiro dia útil subsequente." 
  },
  { 
    q: "Como adicionar feriados municipais ou estaduais na contagem?", 
    a: "Nossa calculadora padrão processa feriados NACIONAIS federais. Para descontar feriados locais (municipais/estaduais), você pode incluí-los de forma totalmente personalizada no campo 'Configurações' da ferramenta." 
  },
  {
    q: "A quarta-feira de cinzas e a véspera de natal contam como dias úteis?",
    a: "A Quarta-feira de Cinzas (até as 12h) e as vésperas de feriados são pontos facultativos ou dias de expediente reduzido bancário. Via de regra, são computados como dias úteis bancários parciais, exceto se decretado recesso local."
  },
  {
    q: "Qual a diferença de prazo processual no Novo CPC vs. prazo de dias corridos?",
    a: "No Novo Código de Processo Civil (CPC, Artigo 219), a contagem de qualquer prazo processual computa exclusivamente os dias úteis. Prazos civis comuns ou contratuais gerais seguem a regra de dias corridos seguidos."
  },
  {
    q: "O que acontece se a data de vencimento de um boleto cai em um feriado ou final de semana?",
    a: "Segundo a Lei Federal nº 7.089/1983, o pagamento de qualquer título ou obrigação tributária cujo vencimento coincidir com dia não útil poderá ser efetuado no primeiro dia útil subsequente sem qualquer cobrança de juros ou multa."
  },
  {
    q: "Como funciona a contagem de prazos trabalhistas para aviso prévio pela CLT?",
    a: "A contagem do prazo do aviso prévio trabalhista obedece à regra civil comum (exclui o dia da notificação e inclui o dia do vencimento final), porém ela é computada em dias corridos ininterruptos, sem descontar finais de semana."
  }
];

export default function BusinessDaysPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculadora de Dias Úteis - Mestre das Contas",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": "Calculadora profissional para somar dias úteis a uma data ou contar a diferença de dias úteis entre datas, considerando feriados nacionais de 2026." },
      {
        "@type": "Article",
        "headline": "Guia de Contagem de Dias Úteis 2026: Prazos Bancários e Processuais",
        "description": "Aprenda a diferença entre dias úteis e corridos e como calcular prazos corretamente seguindo o CPC e normas bancárias.",
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

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 font-sans bg-slate-50 dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Dias Úteis"
          description="A ferramenta definitiva para contagem de prazos. Some dias úteis a uma data ou descubra o intervalo exato entre dois dias, descontando finais de semana e feriados de 2026."
          category="Cálculo de Prazos"
          icon={<CalendarDays size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="blue"
          badge="Feriados 2026"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Dias Úteis" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        
        {/* REVISÃO LEGAL/FINANCEIRA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Contagem baseada no calendário oficial de feriados nacionais de 2026 e normas vigentes de prazos civis.</span>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="dias_uteis_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section className="w-full max-w-full relative z-10">
           <div className="mb-6 print:hidden">
              <PrivacyBadge />
           </div>
           
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <BusinessDaysCalculator />
           </Suspense>
           
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="dias_uteis_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO PROFUNDO (DEEP CONTENT) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
               Como dominar a contagem de Prazos em 2026
            </h2>
            
            <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
               Seja você um advogado contando prazos processuais, um gestor de projetos planejando uma entrega ou apenas alguém querendo saber quando cairá o pagamento de um boleto, uma coisa é certa: <strong>dias corridos e dias úteis são universos diferentes</strong>. Nós estamos aqui para te ajudar a desvendar esses prazos.
            </p>
            <p>
               Um prazo de "30 dias" pode facilmente se transformar em 45 dias reais se houver feriados e muitos finais de semana no caminho. Errar essa conta pode custar caro: multas, <GlossaryTerm slug="juros-compostos-o-que-e">juros</GlossaryTerm> ou a perda de um direito na justiça. Veja bem, a verdade é que dominar a contagem previne surpresas indesejáveis.
            </p>
            <p>
               Neste guia completo, não vamos apenas te dar a calculadora (que está acima e é ótima), mas vamos te ensinar a lógica por trás da contagem de prazos bancários e civis no Brasil. O melhor de tudo? Nós facilitamos essa conta!
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6 rounded-2xl my-8 not-prose shadow-sm">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-3 flex items-center gap-2">
                    <Clock size={20}/> O que é um Dia Útil?
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-0">
                    No Brasil, dia útil é qualquer dia que <strong>não seja</strong> sábado, domingo ou feriado nacional. Para fins bancários (pagamento de boletos), feriados estaduais e municipais também suspendem o expediente, prorrogando o vencimento para o próximo dia útil.
                </p>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <Briefcase className="text-emerald-600 dark:text-emerald-500"/> Prazos Bancários vs. Processuais
            </h3>
            <p>
                Aqui mora a maior confusão. A contagem muda dependendo do objetivo.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3"><Landmark size={20} className="text-emerald-500"/> Prazos Bancários</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Se o vencimento cai em dia não útil, prorroga-se para o dia seguinte. Sábados não são dias bancários.
                    </p>
                    <ul className="mt-3 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                        <li>• Boletos</li>
                        <li>• TED/DOC</li>
                        <li>• Impostos</li>
                    </ul>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3"><ScaleIcon size={20} className="text-blue-500"/> Prazos Processuais (CPC)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        O Novo CPC (Art. 219) estabeleceu que prazos são contados apenas em <strong>dias úteis</strong>.
                    </p>
                    <ul className="mt-3 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                        <li>• Recursos</li>
                        <li>• Contestações</li>
                        <li>• Intimações</li>
                    </ul>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <Calendar className="text-rose-600 dark:text-rose-500"/> Os Vilões do Prazo: Pontes e Feriados Móveis
            </h3>
            <p>
                Em 2026, teremos vários feriados caindo em dias de semana, o que cria as famosas "pontes" ou "emendas".
            </p>
            <p>
                Embora o ponto facultativo (como a sexta-feira após Corpus Christi) não seja feriado oficial para o setor privado, muitos órgãos públicos e bancos operam em horário reduzido ou fecham. Na nossa calculadora acima, você pode adicionar essas datas manualmente na seção "Configurações" para ter uma precisão cirúrgica.
            </p>

            {/* TABELA DE FERIADOS */}
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">
               Calendário de Feriados Nacionais 2026
            </h3>
            <div className="not-prose my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <table className="w-full text-sm text-left min-w-[600px]">
                    <thead className="bg-slate-900 dark:bg-slate-950 text-white">
                        <tr>
                            <th className="px-6 py-4 font-bold w-1/4">Data</th>
                            <th className="px-6 py-4 font-bold w-1/4">Dia da Semana</th>
                            <th className="px-6 py-4 font-bold">Feriado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-mono">01/01</td><td>Quinta</td><td>Confraternização Universal</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 bg-blue-50/30 dark:bg-blue-900/10"><td className="px-6 py-3 font-mono">16/02</td><td>Segunda</td><td>Carnaval (Ponto Facultativo)</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 bg-blue-50/30 dark:bg-blue-900/10"><td className="px-6 py-3 font-mono">17/02</td><td>Terça</td><td>Carnaval (Ponto Facultativo)</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-mono">03/04</td><td>Sexta</td><td>Paixão de Cristo</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-mono">21/04</td><td>Terça</td><td>Tiradentes</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-mono">01/05</td><td>Sexta</td><td>Dia do Trabalho</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-mono">04/06</td><td>Quinta</td><td>Corpus Christi</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-mono">07/09</td><td>Segunda</td><td>Independência do Brasil</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-mono">12/10</td><td>Segunda</td><td>Nossa Sra. Aparecida</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-mono">02/11</td><td>Segunda</td><td>Finados</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-mono">15/11</td><td>Domingo</td><td>Proclamação da República</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800"><td className="px-6 py-3 font-mono">25/12</td><td>Sexta</td><td>Natal</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
                <CalendarDays className="text-blue-600" /> Quantos dias úteis tem cada mês em 2026?
            </h3>
            <p>
                Para ajudar no seu planejamento financeiro e operacional, montamos uma tabela de referência rápida com o total de dias úteis em cada mês de 2026, considerando feriados nacionais e finais de semana:
            </p>

            <div className="not-prose my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <table className="w-full text-sm text-left min-w-[600px]">
                    <thead className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
                        <tr>
                            <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-800">Mês</th>
                            <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-800">Dias Corridos</th>
                            <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-800">Finais de Semana</th>
                            <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-800">Feriados (Úteis)</th>
                            <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-800 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">Total Úteis</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-bold">Janeiro</td><td>31</td><td>9</td><td>1</td><td className="px-6 py-4 font-bold text-blue-600">21</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-bold">Fevereiro</td><td>28</td><td>8</td><td>2</td><td className="px-6 py-4 font-bold text-blue-600">18</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-bold">Março</td><td>31</td><td>9</td><td>0</td><td className="px-6 py-4 font-bold text-blue-600">22</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-bold">Abril</td><td>30</td><td>8</td><td>2</td><td className="px-6 py-4 font-bold text-blue-600">20</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-bold">Maio</td><td>31</td><td>10</td><td>1</td><td className="px-6 py-4 font-bold text-blue-600">20</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-bold">Junho</td><td>30</td><td>8</td><td>1</td><td className="px-6 py-4 font-bold text-blue-600">21</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-bold">Julho</td><td>31</td><td>8</td><td>0</td><td className="px-6 py-4 font-bold text-blue-600">23</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-bold">Agosto</td><td>31</td><td>10</td><td>0</td><td className="px-6 py-4 font-bold text-blue-600">21</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-bold">Setembro</td><td>30</td><td>8</td><td>1</td><td className="px-6 py-4 font-bold text-blue-600">21</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-bold">Outubro</td><td>31</td><td>9</td><td>1</td><td className="px-6 py-4 font-bold text-blue-600">21</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-bold">Novembro</td><td>30</td><td>9</td><td>1</td><td className="px-6 py-4 font-bold text-blue-600">20</td></tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-6 py-4 font-bold">Dezembro</td><td>31</td><td>8</td><td>1</td><td className="px-6 py-4 font-bold text-blue-600">22</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-6 rounded-2xl my-8 not-prose shadow-sm">
                <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-2 flex items-center gap-2">
                    <AlertTriangle size={18} /> Atenção aos Feriados Estaduais
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
                    A tabela acima considera apenas feriados nacionais. Se você mora em São Paulo, por exemplo, o dia 9 de Julho é feriado estadual. Nesses casos, subtraia 1 dia da contagem do respectivo mês para maior precisão.
                </p>
            </div>

            <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </div>

        <SmartGlossaryLinker currentHref="/financeiro/calculadora-dias-uteis" category="financeiro" />
        <SmartCrossLinker currentHref="/financeiro/calculadora-dias-uteis" category="financeiro" />

        {/* FAQ */}
        <div className="max-w-4xl mx-auto w-full print:hidden">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-600 dark:text-blue-400" /> Dúvidas Frequentes sobre Dias Úteis
            </h2>
            <div className="space-y-4">
                {faqList.map((faq, idx) => (
                  <details key={idx} className="group bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all duration-200">
                      <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-blue-600 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug text-slate-800 dark:text-slate-200 font-semibold">{faq.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm animate-in fade-in">
                          {faq.a}
                      </p>
                  </details>
                ))}
            </div>
          </div>
        </div>

        {/* ANÚNCIO FINAL */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="dias_uteis_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
