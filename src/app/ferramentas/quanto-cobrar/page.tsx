import type { Metadata } from "next";
import PricingCalculator from "@/components/tools/PricingCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { Suspense } from "react";
import { Coins, HelpCircle, CheckCircle2, TrendingUp, Sparkles, Star, Scale, ShieldCheck, AlertTriangle } from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

export const metadata: Metadata = {
  title: "Quanto Cobrar por Serviço (Precificação) | Calculadora Online 2026",
  description: "Trabalha como freelancer ou autônomo e não sabe como precificar? Descubra o valor ideal da sua hora de trabalho baseado em custos e lucros reais. Grátis!",
  keywords: [
    "quanto cobrar por serviço", "calculadora de preco de servico", 
    "preco da hora de trabalho", "como precificar servicos freelancer", "calculadora de precificacao"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/quanto-cobrar" },
  openGraph: {
    title: "Quanto Cobrar por Serviço | Calculadora de Precificação Online",
    url: "https://mestredascontas.com.br/ferramentas/quanto-cobrar",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://mestredascontas.com.br/opengraph/quanto-cobrar.jpg", width: 1200, height: 630, alt: "Quanto Cobrar por Serviço" }]
  },
  robots: { index: true, follow: true }
};

// 7 FAQs Dinâmicas Sincronizadas
const faqs = [
  {
    q: "Como esta calculadora calcula o valor ideal da minha hora de trabalho autônomo ou freelancer?",
    a: "Nossa ferramenta utiliza a metodologia clássica de custeio por absorção associada ao markup de lucros. Ela soma todas as suas despesas pessoais necessárias para sobreviver (seu pró-labore), adiciona os custos operacionais do negócio (softwares, internet, MEI) e divide o total pela quantidade real de horas produtivas mensais trabalhadas, adicionando por fim sua margem de lucro e impostos."
  },
  {
    q: "Qual é a diferença conceitual entre o meu Pró-labore (Salário) e o Lucro real da minha empresa?",
    a: "Veja bem, o Pró-labore representa o salário que você se paga mensalmente pela execução das atividades operacionais diárias (o seu esforço físico/mental). O Lucro, por outro lado, pertence integralmente ao caixa da empresa (mesmo sendo você o único dono) e deve ser acumulado para cobrir meses difíceis de baixa demanda, realizar novos investimentos em computadores ou cursos."
  },
  {
    q: "Por que é indispensável descontar um percentual de horas não cobráveis da minha jornada diária?",
    a: "A verdade é que ninguém consegue faturar 100% do seu tempo diário em atividades operacionais de clientes. Cerca de 30% a 40% da sua rotina é consumida por tarefas indispensáveis, porém não faturadas, como responder e-mails, agendar reuniões, emitir notas fiscais ou prospectar leads. Ignorar essa fricção produtiva fará sua hora real de trabalho ficar subprecificada."
  },
  {
    q: "Como devo embutir corretamente os impostos sobre notas fiscais (Simples Nacional) no meu preço?",
    a: "Os impostos devem ser embutidos utilizando o cálculo por dentro (através do multiplicador de markup). Por exemplo, se você emite notas no Simples Nacional e paga 6% de alíquota, seu markup deve considerar que 6% de cada real recebido pertence ao governo. Nossa calculadora automatiza esse embutimento por fora para evitar que você perca margem na nota fiscal."
  },
  {
    q: "Devo repassar as taxas financeiras de parcelamento de maquininha de cartão de crédito para o cliente?",
    a: "Esta é uma decisão estratégica comercial. Se o seu mercado B2B ou consumidor final exige opções de parcelamento longas sem juros aparentes, você deve embutir a taxa média de intermediação financeira no preço base de venda. Alternativamente, você pode oferecer descontos persuasivos à vista para incentivar transferências via Pix."
  },
  {
    q: "Como a calculadora do Mestre das Contas protege a privacidade e o sigilo das minhas informações financeiras?",
    a: "A nossa ferramenta foi estruturada sob o ecossistema Client-Side. Todos os cálculos matemáticos sobre suas finanças pessoais, faturamentos e expectativas de lucros são processados localmente na memória interna do seu próprio navegador. Nenhum dado financeiro ou valor confidencial de pró-labore é transmitido para servidores remotos."
  },
  {
    q: "Como posso usar os resultados desta calculadora para apresentar propostas comerciais mais persuasivas?",
    a: "Ao saber o custo exato da sua hora técnica, você ganha autoridade e segurança inabaláveis na mesa de negociação. Em vez de simplesmente mandar um preço solto e demonstrar hesitação, você apresenta sua precificação decomposta em custos operacionais e margem de lucros, neutralizando qualquer tentativa de barganha indevida do cliente."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Precificação Mestre das Contas",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta interativa profissional para calcular o preço ideal de venda de serviços de autônomos, profissionais liberais e freelancers de forma isolada."
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    }
  ]
};

export default function PricingPage() {
  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HEADER --- */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-6 w-full">
          <PageHeader 
            title="Calculadora de Precificação: Quanto Cobrar?"
            description="Descubra o preço de venda ideal para os seus serviços e projetos comerciais. Calcule o valor exato da sua hora de trabalho autônomo com precisão absoluta."
            category="Ferramentas"
            icon={<Coins size={32} className="text-violet-600" />}
            variant="default"
            categoryColor="violet"
            badge="Calculadora de Alta Precisão 2026"
            breadcrumbs={[
              { label: "Ferramentas", href: "/ferramentas" },
              { label: "Quanto Cobrar (Precificação)" }
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 flex flex-col gap-4 w-full">
        {/* AD TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200 mt-8 print:hidden min-h-[100px]">
           <LazyAdUnit slot="pricing_top" format="horizontal" variant="software" />
        </div>

        {/* PRIVACIDADE E SEGURANÇA (E-E-A-T) */}
        <div className="bg-violet-50/50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-violet-700 dark:text-violet-300 mb-2">
          <ShieldCheck size={18} className="text-violet-600 shrink-0" />
          <span>Privacidade Criptográfica Local: Suas despesas fixas e pró-labore não saem da máquina. Processamento 100% Client-Side.</span>
        </div>

        <PrivacyBadge />
      </div>

      {/* --- FERRAMENTA --- */}
      <div className="max-w-5xl mx-auto px-4 pb-12 w-full">
        <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
          <PricingCalculator />
        </Suspense>
        <div className="mt-8 print:hidden">
          <DisclaimerBox />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 w-full">
        
        {/* --- FEATURES GRID --- */}
        <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-violet-50 dark:bg-violet-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6 shadow-sm">
                    <TrendingUp size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Custos Reais</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Mapeie cada despesa oculta de softwares, aluguéis, contabilidade e impostos para vedar vazamentos de caixa.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 px-3 py-1 rounded-full">
                    <Scale size={12}/> Metodologia de Custeio Científica
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-blue-50 dark:bg-blue-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 dark:blue-400 mb-6 shadow-sm">
                    <Coins size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Valor da Hora Exato</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Descubra quanto vale o seu minuto de trabalho com base nos seus gastos reais de vida e crescimento comercial.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-sm">
                    <Sparkles size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Propostas Irrecusáveis</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Apresente orçamentos com margem de segurança integrada, eliminando perdas por negociação indevida.
                </p>
            </div>
        </section>

        {/* --- ARTIGO EDUCACIONAL DE ALTA DENSIDADE --- */}
        <div className="max-w-4xl mx-auto w-full space-y-8">
            
            {/* Review Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-violet-100 dark:bg-violet-900/30 p-3 rounded-xl text-violet-600 dark:text-violet-400 shrink-0">
                    <ShieldCheck size={28} />
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Saúde Financeira</p>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Controle de Caixa</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic mt-1">
                        "O uso da nossa calculadora elimina discussões emocionais e impasses internos sobre orçamentos comerciais, gerando propostas robustas fundamentadas em dados estruturados."
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm w-full">
                <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-violet-500 pl-4 flex items-center gap-3">
                    <Star className="text-violet-500 fill-violet-500 animate-pulse" /> O Balde de Areia Furado: O Guia Definitivo da Precificação
                </h2>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Imagine que você passou o dia inteiro coletando areia fina e dourada na praia para preencher um balde de plástico.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Contudo, as laterais e o fundo desse balde foram perfurados por pequenos rasgos imperceptíveis a olho nu.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  A verdade é que tentar cobrar pelo seu serviço sem fazer cálculos reais de despesas funciona exatamente como esse balde.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Você trabalha incansavelmente 12 horas por dia, sua agenda física de atendimentos parece totalmente lotada e dinâmica.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  No entanto, na virada do mês, o dinheiro do faturamento simplesmente desapareceu e suas contas pessoais continuam atrasadas.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Aí é que está o segredo: ao decompor seu preço entre sobrevivência, produtividade e lucro real, você fecha os vazamentos.
                </p>

                {/* Tabela Comparativa de Estratégias - Tabela HTML */}
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mt-10 mb-4">Tabela Técnica: Comparando Diferentes Estratégias de Cobrança Comercial</h3>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                   Conhecer os pontos fortes e os pontos fracos de cada estratégia de precificação evita prejuízos invisíveis e maximiza lucros.
                </p>

                <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                    <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Estratégia de Precificação</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Principal Vantagem</th>
                                <th className="px-6 py-4 text-sm font-bold text-violet-600 dark:text-violet-400 bg-violet-50/10 dark:bg-violet-950/10">Principal Ponto de Risco</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Recomendado Para</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Preço por Hora (Calculadora)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-mono">Fácil de mensurar e controlar</td>
                                <td className="px-6 py-4 text-sm text-red-500 font-bold bg-violet-50/10 dark:bg-violet-950/10">Limita ganhos ao limite diário físico</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Freelancers juniores e consultorias</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Preço Fixo por Projeto</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Transparência total para o cliente</td>
                                <td className="px-6 py-4 text-sm text-red-500">Escopos mal desenhados causam prejuízo</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Desenvolvimento de sites e design gráfico</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Cobrança por Performance</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Alinhamento de interesses extremos</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Pode trabalhar muito e lucrar nada</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Gestores de tráfego pago e vendas B2B</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Contrato de Assinatura (Retainer)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Previsibilidade de faturamento mensal</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Cancelamento repentino sem carência</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Suporte de TI e assessorias contínuas</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                   O melhor de tudo? Ao confrontar as opções na nossa planilha de precificação, fica nítido que o cálculo da sua hora base atua como o alicerce insubstituível para qualquer transição comercial de sucesso.
                </p>

                {/* Metáfora do Relógio Suíço */}
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Scale className="text-violet-500" /> A Metáfora do "Relógio Suíço": Precisão Contra Prejuízos
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Para ilustrar a relevância desse cálculo, adoramos usar a analogia das minúsculas engrenagens de um relógio de luxo.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Cada pequena engrenagem do relógio representa um gasto invisível do seu home office: a licença do software de design, a taxa do MEI, o cafezinho oferecido e a depreciação do notebook.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Se você remove uma única engrenagem microscópica do relógio por achar irrelevante, o mecanismo inteiro simplesmente trava e os ponteiros param de avançar.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  A nossa calculadora do Mestre das Contas funciona montando cada uma dessas engrenagens na posição matemática correta.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Ela calcula a taxa de fricção de produtividade diária (horas não faturáveis) e entrega a você o preço blindado e preciso de venda, eliminando o achismo comercial de uma vez por todas.
                </p>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Sparkles className="text-violet-500" /> Os Três Pilares Inflexíveis da Governança de Preço
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Para blindar de forma permanente as margens de lucro operacional da sua atividade autônoma, adote as seguintes práticas:
                </p>
                <ol className="space-y-4 marker:text-violet-600 marker:font-bold">
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong><GlossaryTerm slug="pro-labore-salario-socio">Pró-labore</GlossaryTerm> não é Lucro:</strong> Defina o seu salário fixo de sobrevivência operacional separadamente. O Lucro pertence à empresa e serve para a sustentação de longo prazo da marca.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Mapeamento de Sobrecarga Física:</strong> Nunca precifique com base em 100% de ocupação física de tempo. Considere um índice máximo de 70% de horas operacionais cobráveis para absorver reuniões e pós-vendas.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Prospecção e Amortizações:</strong> Inclua no seu custo de vida as ferramentas de marketing e a poupança para trocar de equipamentos de trabalho a cada 3 anos de forma planejada.
                    </li>
                </ol>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-violet-500 mt-10 not-prose">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-violet-600 dark:text-violet-400"/> Alerta sobre Inadimplência
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        A precificação sem margem de segurança integrada deixa a empresa exposta a riscos de falência técnica se um único cliente atrasar pagamentos importantes. Construa reservas contábeis sólidas cobrando o preço ideal.
                    </p>
                </div>
            </div>

            {/* Horizontal Ad */}
            <div className="w-full flex justify-center bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[100px] overflow-hidden py-4">
                <LazyAdUnit slot="pricing_sidebar" format="horizontal" />
            </div>
        </div>

        <ExpertSignature author="Equipe Técnica Mestre das Contas" updatedAt="Junho de 2026" />

        <SmartGlossaryLinker currentHref="/ferramentas/quanto-cobrar" />

        <SmartCrossLinker 
          currentHref="/ferramentas/quanto-cobrar" 
          category="ferramentas"
        />

        {/* --- FAQ SECTION ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
        <section id="faq" className="max-w-4xl mx-auto w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-violet-600 dark:text-violet-400 shrink-0" size={32} /> Tira-Dúvidas Definitivo
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Encontre respostas para as perguntas mais recorrentes sobre a precificação profissional de serviços.
            </p>

            <div className="space-y-4 not-prose">
              {faqs.map((faq, index) => (
                <details 
                  key={index}
                  className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 transition-all duration-300 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <span className="pr-4">{faq.q}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180 text-violet-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* AD BOTTOM */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center mt-12 print:hidden min-h-[250px]">
           <LazyAdUnit slot="pricing_bottom" format="square" variant="in-article" />
        </div>
      </div>
    </article>
  );
}
