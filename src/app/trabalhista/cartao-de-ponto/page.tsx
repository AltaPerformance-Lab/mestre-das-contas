import { Suspense } from "react";
import type { Metadata } from "next";
import WeeklyTimeCardCalculator from "@/components/calculators/WeeklyTimeCardCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { Clock, HelpCircle, History, BookOpen, AlertTriangle, ShieldCheck, Calculator } from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Cartão de Ponto (Somar Horas) | 2026 Grátis";
  const description = "Esqueceu de marcar o ponto ou quer conferir as horas diárias? Simule a sua folha de ponto e o saldo do banco de horas em poucos cliques. Grátis e online!";

  return {
    title,
    description,
    keywords: ["somar cartão de ponto", "calculadora de horas trabalhadas", "calcular entrada e saida do trabalho", "somar bater ponto horario de entrada almoco e saida", "calculadora de horas extras semanais"],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/cartao-de-ponto" },
    openGraph: {
      title,
      url: "https://mestredascontas.com.br/trabalhista/cartao-de-ponto",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Cartão de Ponto - Mestre das Contas", 
        }
      ],
    },
    robots: { index: true, follow: true } };
}

const faqList = [
  { 
    q: "Como calcular horas extras do cartão de ponto?", 
    a: "Para calcular, você deve somar todas as horas efetivamente trabalhadas no dia (descontando o período do intervalo de almoço) e depois subtrair a sua jornada de trabalho contratual padrão (ex: 8 horas diárias). O saldo positivo resultante é considerado hora extra." 
  },
  { 
    q: "Qual a tolerância de atraso na batida de ponto pela CLT?", 
    a: "De acordo com o Artigo 58 da CLT, existe um limite de tolerância de até 5 minutos por batida, com um limite máximo total de 10 minutos por dia. Qualquer variação dentro dessa faixa não é computada como atraso ou hora extra." 
  },
  { 
    q: "É obrigatório bater o ponto no horário de almoço?", 
    a: "Sim. O registro do intervalo intrajornada (almoço/repouso) é obrigatório por lei para todas as empresas com mais de 20 colaboradores. Ele garante que o tempo de descanso mínimo esteja sendo respeitado." 
  },
  {
    q: "O que a CLT determina sobre o intervalo mínimo de almoço?",
    a: "Para qualquer jornada de trabalho diária que exceda 6 horas, a CLT exige um intervalo mínimo de repouso e alimentação de 1 hora (limite máximo de 2 horas). Para jornadas entre 4 e 6 horas, o intervalo exigido é de 15 minutos."
  },
  {
    q: "Como funciona o banco de horas e qual o prazo de compensação?",
    a: "No regime de banco de horas, as horas extras acumuladas são convertidas em folgas ou redução de jornada futura. Por acordo individual, a compensação deve ocorrer em até 6 meses. Por convenção ou acordo coletivo, o prazo estende-se para até 1 ano."
  },
  {
    q: "Menos de 10 minutos de variação diária pode ser descontado?",
    a: "Não. A CLT proíbe expressamente quaisquer descontos salariais ou acréscimos extraordinários se a soma diária de atrasos ou adiantamentos não ultrapassar a barreira limite de 10 minutos no dia."
  },
  {
    q: "O empregador pode impedir o funcionário de registrar as horas extras trabalhadas?",
    a: "Não. Impedir ou fraudar o registro correto das horas efetivamente trabalhadas constitui infração grave às leis trabalhistas, gerando multas administrativas severas e servindo como prova em eventuais ações judiciais de cobrança de horas extras."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Somador de Cartão de Ponto Semanal",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Aplicativo para somar horas do cartão de ponto, calculando entradas, saídas e almoço de segunda a domingo." },
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

export default async function CartaoDePontoPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12 font-sans bg-slate-50 dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Soma de Cartão de Ponto"
          description="Preencha os horários de entrada, almoço e saída para calcular automaticamente suas horas trabalhadas na semana e o saldo de horas extras."
          category="Direitos Trabalhistas"
          icon={<History size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="indigo"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Cartão de Ponto" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 mt-8 print:hidden min-h-[100px]">
           <LazyAdUnit slot="cartao_top" format="horizontal" variant="agency" />
        </div>

        <section className="w-full max-w-5xl mx-auto relative z-10">
           <div className="mb-6 print:hidden">
              <PrivacyBadge />
           </div>
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <WeeklyTimeCardCalculator />
           </Suspense>
           
           <div className="mt-8 print:hidden">
              <DisclaimerBox />
           </div>
        </section>

        {/* SEO Article */}
        <section className="w-full max-w-4xl mx-auto mt-12 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
            <BookOpen className="text-indigo-600" /> Como somar cartão de ponto corretamente?
          </h2>
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base space-y-6">
            <p>
              Saber <strong>como somar as horas do <GlossaryTerm slug="cartao-de-ponto-jornada">cartão de ponto</GlossaryTerm></strong> é essencial para garantir que seu contracheque venha correto e que nenhuma hora extra seja perdida. Nós entendemos perfeitamente o quão confuso pode ser esse cálculo no início. Antigamente, fazer essa conta no papel era confuso porque o relógio funciona em base 60, e não base 10 (decimal). A verdade é que, sem as ferramentas certas, cometer erros de minutos é extremamente comum.
            </p>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">Passo a passo do cálculo manual</h3>
            <p>Se você fosse fazer a conta no papel, a fórmula simplificada exige a divisão do dia em dois turnos independentes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Passo 1:</strong> Diminuir a Hora de Saída para o Almoço da Hora de Entrada (ex: 12:00 - 08:00 = 4 horas).</li>
              <li><strong>Passo 2:</strong> Diminuir a Hora de Saída Final da Hora de Volta do Almoço (ex: 18:00 - 13:00 = 5 horas).</li>
              <li><strong>Passo 3:</strong> Somar os dois resultados (4h + 5h = 9 horas trabalhadas no dia).</li>
            </ul>
            <p>
              O melhor de tudo? Usando nossa <strong>Calculadora de Cartão de Ponto interativa</strong>, você não precisa fazer nenhuma dessas contas ou conversões de minutos para decimais. Basta preencher os 4 horários da jornada diária e nós fazemos o resto. O sistema desconta o intervalo de descanso automaticamente e apresenta o somatório geral semanal.
            </p>

            {/* TABELA DE COMPARAÇÃO DE REGRAS DE JORNADA (HTML PURO RESPONSIVO) */}
            <div className="not-prose my-10 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-bold text-slate-750 dark:text-slate-250 uppercase tracking-wide flex items-center gap-2">
                        <Calculator size={16} /> Regras de Jornada e Limites da CLT (2026)
                    </h4>
                </div>
                
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Tipo de Parâmetro</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Limite Regulamentar</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Adicional ou Característica</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Obrigação Legal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Jornada Diária Comum</td>
                                <td className="px-6 py-4 font-mono">Máximo 8 horas diárias</td>
                                <td className="px-6 py-4">Limite máximo de 44 horas semanais</td>
                                <td className="px-6 py-4 font-semibold text-emerald-600">Sim (Constitucional)</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Horas Extras Máximas</td>
                                <td className="px-6 py-4 font-mono">Até 2 horas por dia</td>
                                <td className="px-6 py-4">Mínimo 50% em dias úteis, 100% em folgas/feriados</td>
                                <td className="px-6 py-4 font-semibold text-emerald-600">Sim (Acordo prévio)</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Intervalo de Almoço</td>
                                <td className="px-6 py-4 font-mono">Mínimo 1 hora, Máximo 2 horas</td>
                                <td className="px-6 py-4">Jornadas diárias maiores que 6 horas</td>
                                <td className="px-6 py-4 font-semibold text-emerald-600">Sim (Obrigatório)</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">Intervalo Interjornada</td>
                                <td className="px-6 py-4 font-mono">Mínimo 11 horas consecutivas</td>
                                <td className="px-6 py-4">Descanso obrigatório entre o fim de um turno e início do próximo</td>
                                <td className="px-6 py-4 font-semibold text-emerald-600">Sim (CLT Art. 66)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-950 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900 my-8">
              <h4 className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-300 mt-0">
                <ShieldCheck size={20} /> O que a empresa pode descontar?
              </h4>
              <p className="text-indigo-800 dark:text-indigo-200 text-sm mb-0">
                Atrasos diários que somem mais de 10 minutos ao total do dia podem ser legalmente descontados no contracheque. No entanto, se você tem um sistema de banco de horas acordado ativo com saldo positivo, as empresas costumam amortizar esse atraso em vez de realizar o desconto físico. Fique sempre atento às convenções da sua categoria.
              </p>
            </div>
          </div>
          
          <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </section>

        {/* ACCORDION FAQ */}
        <section className="w-full max-w-4xl mx-auto space-y-6 mt-8 print:hidden bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle size={24} className="text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dúvidas Comuns (Ponto Eletrônico & CLT)</h2>
          </div>
          
          <div className="space-y-4">
            {faqList.map((faq, idx) => (
              <details key={idx} className="group bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 cursor-pointer open:ring-2 open:ring-indigo-100 dark:open:ring-indigo-900/30 transition-all duration-200">
                  <summary className="font-bold text-slate-850 dark:text-slate-105 list-none flex justify-between items-center select-none">
                      <div className="flex items-start gap-3">
                          <span className="text-indigo-600 font-bold text-xs mt-1">#</span>
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
        </section>

        <SmartGlossaryLinker currentHref="/trabalhista/cartao-de-ponto" />
        <SmartCrossLinker 
          currentHref="/trabalhista/cartao-de-ponto" 
          category="trabalhista"
        />

        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center mt-12 print:hidden min-h-[250px]">
           <LazyAdUnit slot="cartao_bottom" format="square" variant="in-article" />
        </div>
      </div>
    </article>
  );
}
