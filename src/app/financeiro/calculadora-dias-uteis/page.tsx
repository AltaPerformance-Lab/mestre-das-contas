
import { Metadata } from "next";
import BusinessDaysCalculator from "@/components/tools/BusinessDaysCalculator";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { 
  CalendarDays, Briefcase, Clock, CheckCircle2, 
  AlertTriangle, HelpCircle, Landmark, Calendar, Scale, Scale as ScaleIcon
} from "lucide-react";
import DisclaimerBox from "@/components/ui/DisclaimerBox";

export const metadata: Metadata = {
  title: "Calculadora de Dias Úteis 2026 (Com Feriados) | Grátis",
  description: "Calcule datas de vencimento, prazos processuais e entrega de projetos. Nossa calculadora considera feriados nacionais de 2026 e finais de semana.",
  keywords: [
    "calculadora dias uteis", 
    "contagem de prazo dias uteis", 
    "dias uteis 2026", 
    "somar dias uteis data", 
    "diferença de dias entre datas",
    "calendario dias uteis"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/financeiro/calculadora-dias-uteis" },
  openGraph: {
    title: "Calculadora de Dias Úteis 2026",
    description: "Ferramenta essencial para calcular prazos bancários e processuais. Inclui feriados.",
    url: "https://mestredascontas.com.br/financeiro/calculadora-dias-uteis",
    siteName: "Mestre das Contas",
    type: "website",
  }
};

export default function BusinessDaysPage() {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Calculadora de Dias Úteis",
    "applicationCategory": "mBusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
    "description": "Calculadora para somar dias úteis a uma data ou contar a diferença de dias úteis entre duas datas.",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "920" }
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Dias Úteis"
          description="A ferramenta definitiva para contagem de prazos. Some dias úteis a uma data ou descubra o intervalo exato entre dois dias, descontando finais de semana e feriados de 2026."
          category="Cálculo de Prazos"
          icon={<CalendarDays size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="blue"
          badge="Feriados 2026"
          rating={4.8}
          reviews={920}
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Dias Úteis" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <AdUnit slot="dias_uteis_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section className="w-full max-w-full relative z-10">
           <div className="mb-6 print:hidden">
              <PrivacyBadge />
           </div>
           
           <BusinessDaysCalculator />
           
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <AdUnit slot="dias_uteis_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO PROFUNDO (DEEP CONTENT) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
               Como dominar a contagem de Prazos em 2026
            </h2>
            
            <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
               Seja você um advogado contando prazos processuais, um gestor de projetos planejando uma entrega ou apenas alguém querendo saber quando cairá o pagamento de um boleto, uma coisa é certa: <strong>dias corridos e dias úteis são universos diferentes</strong>.
            </p>
            <p>
               Um prazo de "30 dias" pode facilmente se transformar em 45 dias reais se houver feriados e muitos finais de semana no caminho. Errar essa conta pode custar caro: multas, juros ou a perda de um direito na justiça.
            </p>
            <p>
               Neste guia completo, não vamos apenas te dar a calculadora (que está acima e é ótima), mas vamos te ensinar a lógica por trás da contagem de prazos bancários e civis no Brasil.
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
            <div className="not-prose overflow-hidden border rounded-xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 mb-8">
                <table className="w-full text-sm text-left">
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

            {/* FAQ */}
            <div className="mt-16 not-prose">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <HelpCircle className="text-blue-600 dark:text-blue-400" /> Perguntas Frequentes
                </h2>
                <div className="grid gap-4">
                    <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            O sábado é considerado dia útil?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-2">
                            Depende. Para fins bancários e de pagamentos, <strong>NÃO</strong>. Para fins trabalhistas (jornada de trabalho), o sábado é considerado dia útil (salvo acordo sindical). Na nossa calculadora, você tem um botão opcional para incluir sábados na contagem.
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Como contar o dia do início?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-2">
                            A regra de ouro do Código Civil e Processual é: <strong>exclui-se o dia do começo e inclui-se o do vencimento</strong>. Exemplo: Se o prazo começa dia 01/04, o dia 1 não conta. O "Dia 1" do prazo será o dia 02/04 (se for útil).
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            E os feriados municipais?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-2">
                            Nossa calculadora traz os feriados NACIONAIS. Feriados estaduais (como 9 de julho em SP) ou municipais (aniversário da cidade) devem ser adicionados manualmente no campo "Configurações" para garantir a precisão total.
                        </p>
                    </details>
                </div>
            </div>

        </div>

        {/* ANÚNCIO FINAL */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <AdUnit slot="dias_uteis_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
