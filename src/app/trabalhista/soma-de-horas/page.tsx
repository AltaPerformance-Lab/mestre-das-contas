import { Suspense } from "react";
import type { Metadata } from "next";
import TimeMathCalculator from "@/components/calculators/TimeMathCalculator";

import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Calculator, HelpCircle, Clock, Plus, Minus, ShieldCheck, Scale
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Soma de Horas Trabalhadas | Somar e Subtrair (Grátis)";
  const description = "Some horas e minutos facilmente. Ferramenta gratuita para calcular banco de horas, plantões e fazer adição ou subtração de tempo (Ex: 1h30 + 2h45).";

  return {
    title,
    description,
    keywords: ["qual a soma para calcular a hora trabalhada", "calculadoras de horas trabalhadas que soma", "contador de soma pra quem trabalha", "somar banco de horas", "calculadora de horas em minutos"],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/soma-de-horas" },
    openGraph: {
      title: "Somador de Horas Grátis",
      description: "Adicione e subtraia horas trabalhadas rapidamente com nossa ferramenta gratuita.",
      url: "https://mestredascontas.com.br/trabalhista/soma-de-horas",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora Soma de Horas", 
        }
      ],
    },
    robots: { index: true, follow: true } };
}

const faqList = [
    { q: "Como somar horas trabalhadas manualmente?", a: "Como o tempo é calculado em base 60, não é uma soma decimal simples. Se você somar 1h30 + 1h45, o total é 3h15. O cálculo exato é: some os minutos (30+45=75). Como passou de 60, subtraia 60 e adicione 1 às horas (75-60 = 15m extras). Depois some as horas (1+1+1 extra = 3h). Nossa calculadora já faz isso." },
    { q: "Posso somar e subtrair ao mesmo tempo?", a: "Sim! Na nossa ferramenta, basta alterar o sinal de '+' para '-' ao lado do tempo para que aquele valor seja subtraído do total." },
    { q: "Como transformar os minutos em dinheiro?", a: "Você precisa converter os minutos para formato decimal. Divida os minutos por 60. Ex: 30 minutos = 30/60 = 0,5. Então 3h30 equivalem a 3,5 horas decimais. Multiplique isso pelo valor da sua hora." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Somador de Horas e Minutos",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Calculadora online gratuita para somar e subtrair horas e minutos."
    },
    {
      "@type": "HowTo",
      "name": "Como Somar Horas e Minutos Trabalhados",
      "description": "Passo a passo simples para fazer adição ou subtração de períodos de horas utilizando nossa calculadora de tempo sexagesimal.",
      "totalTime": "PT30S",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Insira os Horários",
          "text": "Digite as horas e minutos nos campos fornecidos. Por exemplo, 08:30 para 8 horas e 30 minutos.",
          "url": "https://mestredascontas.com.br/trabalhista/soma-de-horas#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Escolha a Operação",
          "text": "Selecione o botão de operação ao lado de cada campo para alternar entre Somar (+) ou Subtrair (-).",
          "url": "https://mestredascontas.com.br/trabalhista/soma-de-horas#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Adicione Linhas e Veja o Total",
          "text": "Clique em '+ Adicionar Horas' para incluir mais linhas. O resultado recalcula instantaneamente na barra inferior no formato de horas e formato decimal.",
          "url": "https://mestredascontas.com.br/trabalhista/soma-de-horas#ferramenta"
        }
      ]
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

export default async function SomaDeHorasPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora: Soma de Horas"
          description="A forma mais fácil de somar e subtrair tempo (HH:MM). Ideal para quem precisa somar plantões, banco de horas ou fechar folha de pagamento."
          category="Produtividade"
          icon={<Plus size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="indigo"
          badge="Grátis"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Soma de Horas" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-indigo-700 dark:text-indigo-300 mb-2">
          <ShieldCheck size={18} className="text-indigo-600 shrink-0" />
          <span>O cálculo considera o sistema sexagesimal (base 60), garantindo precisão absoluta na soma de minutos.</span>
        </div>

        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-indigo-50/30 dark:bg-slate-900/50 rounded-lg border border-dashed border-indigo-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="soma_top" format="horizontal" variant="agency" />
        </div>

        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-indigo-100 dark:border-slate-800 shadow-xl shadow-indigo-100/50 dark:shadow-none p-1 md:p-2">
                  <PrivacyBadge />
                  <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                    <TimeMathCalculator />
                  </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="soma_mid" format="auto" />
        </div>

        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
              Como Usar o Somador de Horas (Passo a Passo)
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
             Nossa ferramenta foi desenhada para ser ultra intuitiva, permitindo que você some uma lista completa de horários de entrada e saída (banco de horas) sem complicação. Siga os passos:
          </p>

          <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">1</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Insira os Horários</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Digite as horas e minutos nos campos. Exemplo: <code>08:30</code> (8 horas e 30 minutos).</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">2</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Escolha Somar ou Subtrair</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Clique no botão de operação ao lado do campo para alternar entre <strong>Somar (+)</strong> ou <strong>Subtrair (-)</strong>.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">3</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Adicione Mais Linhas</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Clique no botão <strong>"+ Adicionar Horas"</strong> para incluir quantas linhas precisar (ótimo para fechar o mês inteiro!).</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">4</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Acompanhe em Tempo Real</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">O resultado final recalcula instantaneamente na barra inferior, exibindo o total em formato tradicional e também convertido em formato decimal.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
              Entenda: Por que é Difícil Somar Horas Trabalhadas?
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Se você já tentou fechar sua folha de ponto ou calcular as horas extras do mês usando uma calculadora comum ou o celular, provavelmente se deparou com um resultado estranho. 
          </p>
          <p>
            Isso acontece por causa de um choque matemático simples: o nosso sistema financeiro e matemático padrão opera na <strong>base 100 (Decimal)</strong>, enquanto a medição do tempo opera na <strong>base 60 (Sexagesimal)</strong>. 
          </p>

          <div className="my-8 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-6 rounded-r-2xl">
            <h4 className="text-amber-800 dark:text-amber-400 font-bold flex items-center gap-2 m-0">
              <ShieldCheck size={20} /> O Clássico Erro do Celular
            </h4>
            <p className="text-amber-900 dark:text-amber-200 text-sm mt-2 mb-0">
              Se você somar <strong>1h30 + 1h30</strong> na calculadora tradicional, ela interpretará como <code>1,30 + 1,30 = 2,60</code> (o que significaria 2 horas e 60 minutos). Porém, na realidade física do tempo, 30 minutos mais 30 minutos formam uma hora completa, totalizando <strong>3 horas redondas (3h00)</strong>. Esse pequeno erro acumulado no mês gera prejuízos financeiros graves para funcionários ou empresas.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <Clock className="text-indigo-600 dark:text-indigo-400" /> Como Somar Horas Manualmente (Passo a Passo)
          </h3>
          <p>
            Para somar períodos de tempo de forma manual sem errar, você deve separar completamente o cálculo das <strong>Horas</strong> do cálculo dos <strong>Minutos</strong>. Acompanhe a regra:
          </p>
          
          <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 my-6 space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white m-0">Exemplo Prático: Somar 2h45m + 1h30m</h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li>
                <strong>Some os minutos isoladamente:</strong> <br/>
                <code>45 minutos + 30 minutos = 75 minutos</code>
              </li>
              <li>
                <strong>Converta o excesso de minutos em horas:</strong> <br/>
                Como 60 minutos equivalem a 1 hora, dividimos 75 por 60. <br/>
                <code>75 - 60 = 15 minutos restantes</code> (guarde esse número) e adicionamos <code>+1 hora</code> ao total de horas.
              </li>
              <li>
                <strong>Some as horas isoladamente, incluindo a hora convertida:</strong> <br/>
                <code>2 horas + 1 hora + 1 hora (vinda dos minutos) = 4 horas</code>
              </li>
              <li>
                <strong>Junte os resultados finais:</strong> <br/>
                O total correto é de <strong>4 horas e 15 minutos (4h15)</strong>.
              </li>
            </ol>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <Minus className="text-red-500" /> Como Subtrair Horas Trabalhadas (O Truque do "Empréstimo")
          </h3>
          <p>
            A subtração de horas (útil para calcular atrasos ou saídas antecipadas) segue uma lógica parecida, mas exige atenção quando os minutos do valor a ser subtraído são maiores do que os do valor original.
          </p>
          
          <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 my-6 space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white m-0">Exemplo Prático: Calcular 4h15m - 1h30m</h4>
            <p className="text-sm">
              Note que não podemos subtrair 30 de 15 diretamente de forma simples. Precisamos "pegar emprestado" 1 hora (60 minutos) da coluna das horas.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li>
                <strong>Transforme o primeiro valor:</strong> <br/>
                Retire 1 hora de 4 horas (ficando 3 horas) e adicione 60 minutos aos 15 minutos originais (ficando 75 minutos). <br/>
                Logo, <code>4h15m</code> vira <code>3h75m</code>.
              </li>
              <li>
                <strong>Subtraia os minutos:</strong> <br/>
                <code>75 minutos - 30 minutos = 45 minutos</code>.
              </li>
              <li>
                <strong>Subtraia as horas:</strong> <br/>
                <code>3 horas - 1 hora = 2 horas</code>.
              </li>
              <li>
                <strong>Resultado final:</strong> <br/>
                O saldo é de <strong>2 horas e 45 minutos (2h45)</strong>.
              </li>
            </ol>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <Plus className="text-emerald-600" /> Como Converter Horas para Decimal (Dinheiro/Salário)
          </h3>
          <p>
            Se você ganha por hora trabalhada (ou precisa calcular o valor exato de horas extras), <strong>nunca multiplique o horário do relógio direto pelo valor financeiro</strong>. Fazer <code>8h30 * R$ 20,00</code> e colocar 8.3 na calculadora dará R$ 166,00 (Errado!). 
          </p>
          <p>
            Você precisa converter os minutos em formato decimal dividindo-os por 60. A fórmula é simples:
          </p>

          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-2xl text-center border border-indigo-100 dark:border-indigo-900/50 my-6">
            <span className="text-lg font-mono font-bold text-indigo-700 dark:text-indigo-300">
              Horas Decimais = Horas + (Minutos / 60)
            </span>
          </div>

          <p>Veja a tabela de conversão rápida dos minutos mais comuns:</p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                  <th className="py-2">Minutos do Relógio</th>
                  <th className="py-2">Fórmula</th>
                  <th className="py-2">Formato Decimal (Multiplicador)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr><td className="py-2 font-mono">15 min</td><td className="py-2">15 / 60</td><td className="py-2 font-bold text-indigo-600 dark:text-indigo-400">0,25</td></tr>
                <tr><td className="py-2 font-mono">30 min</td><td className="py-2">30 / 60</td><td className="py-2 font-bold text-indigo-600 dark:text-indigo-400">0,50</td></tr>
                <tr><td className="py-2 font-mono">45 min</td><td className="py-2">45 / 60</td><td className="py-2 font-bold text-indigo-600 dark:text-indigo-400">0,75</td></tr>
                <tr><td className="py-2 font-mono">10 min</td><td className="py-2">10 / 60</td><td className="py-2 font-bold text-indigo-600 dark:text-indigo-400">0,17</td></tr>
                <tr><td className="py-2 font-mono">50 min</td><td className="py-2">50 / 60</td><td className="py-2 font-bold text-indigo-600 dark:text-indigo-400">0,83</td></tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Exemplo de Cálculo de Salário:</strong> <br/>
            Se você trabalhou <strong>140 horas e 45 minutos</strong> no mês com valor de hora de <strong>R$ 35,00</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-400">
            <li>Converta 45 minutos: <code>45 / 60 = 0,75</code></li>
            <li>Horas totais em formato decimal: <code>140,75 horas</code></li>
            <li>Multiplicação final: <code>140,75 * R$ 35,00 = R$ 4.926,25</code>. (Se fizesse direto com 140,45 daria R$ 4.915,75 - uma perda de R$ 10,50!).</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <Scale className="text-indigo-600" /> Legislação Trabalhista (CLT) e Banco de Horas
          </h3>
          <p>
            Segundo a Consolidação das Leis do Trabalho (CLT), a jornada normal de trabalho é de até <strong>8 horas diárias e 44 horas semanais</strong>.
          </p>
          <ul>
            <li>
              <strong>Tolerância de Ponto (Artigo 58, § 1º da CLT):</strong> Não são descontadas nem computadas como horas extras as variações de registro de ponto que não excedam <strong>5 minutos</strong> em cada entrada e saída, observado o limite máximo de <strong>10 minutos diários</strong>.
            </li>
            <li>
              <strong>Horas Extras:</strong> Qualquer período somado que passe da sua jornada contratual diária deve ser pago com acréscimo mínimo de <strong>50%</strong> (dias úteis) ou <strong>100%</strong> (domingos e feriados).
            </li>
          </ul>

          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-indigo-600 dark:text-indigo-400" /> Dúvidas Frequentes sobre Cálculo de Horas
            </h3>
            
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-indigo-100 dark:open:ring-indigo-900/30 transition-all">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-indigo-500 dark:text-indigo-400 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm animate-in fade-in">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>
            
            <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </div>

        <SmartCrossLinker currentHref="/trabalhista/soma-de-horas" category="trabalhista" />

        <div className="w-full flex justify-center my-8 min-h-[250px]">
            <LazyAdUnit slot="soma_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}
