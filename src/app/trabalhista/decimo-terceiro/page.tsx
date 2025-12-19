import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ThirteenthCalculator from "@/components/calculators/ThirteenthCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  TriangleAlert, Calendar, Coins, CircleHelp, 
  CircleCheck, History, BookOpen, Calculator,
  Wallet, FileText, Scale, Briefcase, XCircle, Check, Gift,
  AlertOctagon, Landmark, TrendingUp, CheckCircle2
} from "lucide-react";

// --- 1. METADATA (SEO 2025) ---
export const metadata: Metadata = {
  title: "Calculadora Décimo Terceiro 2025 | 1ª e 2ª Parcela Exatas",
  description: "Calcule seu 13º salário online. Descubra o valor exato da primeira parcela (sem descontos) e da segunda (com INSS e IRRF). Simulação gratuita e atualizada.",
  keywords: [
    "calculadora decimo terceiro", "calcular 13o salario", "primeira parcela 13", 
    "data pagamento decimo terceiro", "descontos 13o salario", "gratificação natalina",
    "decimo terceiro proporcional", "decimo terceiro maternidade", "calculo media horas extras 13"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/trabalhista/decimo-terceiro" },
  openGraph: {
    title: "Calculadora de 13º Salário 2025 - Mestre das Contas",
    description: "Simule agora quanto você vai receber de gratificação natalina.",
    url: "https://mestredascontas.com.br/trabalhista/decimo-terceiro",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-13salario.png", width: 1200, height: 630, alt: "Simulador Décimo Terceiro" }],
  },
};

// --- FAQ LIST (Para JSON-LD e Conteúdo) ---
const faqList = [
    { q: "Quando deve ser paga a primeira parcela?", a: "A primeira parcela (adiantamento) deve ser paga entre 1º de fevereiro e 30 de novembro de cada ano. Muitas empresas optam por pagar junto com as férias ou no último dia útil de novembro." },
    { q: "Quando cai a segunda parcela?", a: "A segunda parcela deve ser paga impreterivelmente até o dia 20 de dezembro de cada ano. Se a data cair num fim de semana, antecipa-se para o último dia útil." },
    { q: "A primeira parcela tem descontos?", a: "Não. A primeira parcela corresponde a 50% do salário bruto do mês anterior, sem descontos. O INSS e o IRRF são descontados integralmente na segunda parcela." },
    { q: "Quem tem menos de 1 ano recebe?", a: "Sim, recebe o valor proporcional. O cálculo é: Salário dividido por 12, multiplicado pelo número de meses trabalhados (considerando fração igual ou superior a 15 dias)." },
    { q: "Horas extras entram no 13º?", a: "Sim! É feita uma média das horas extras, comissões e adicionais noturnos recebidos durante o ano (geralmente de janeiro a outubro para a 1ª parcela, e recalculado em dezembro)." },
    { q: "Mulher em licença-maternidade recebe?", a: "Sim. O pagamento é feito pelo empregador, mas o valor é abatido dos repasses ao INSS. O direito é garantido integralmente." },
    { q: "Quem foi demitido por justa causa recebe?", a: "Não. A demissão por justa causa retira o direito ao 13º salário proporcional. É a única modalidade de rescisão onde o benefício é perdido." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de 13º Salário",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para cálculo de Décimo Terceiro salário com parcelas e descontos de INSS/IRRF."
    },
    {
      "@type": "Article",
      "headline": "Guia Completo do Décimo Terceiro: Cálculos, Prazos e Direitos 2025",
      "description": "Entenda como funciona o pagamento da gratificação natalina, a média de horas extras e os descontos na segunda parcela.",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/logo.png" } }
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

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function DecimoTerceiroPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-slate-50 p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-slate-400">Carregando Calculadora...</div>}>
                    <ThirteenthCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-200 pt-3">
                    <Link href="https://mestredascontas.com.br/trabalhista/decimo-terceiro" target="_blank" className="text-[10px] text-slate-400 hover:text-blue-600 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Gift size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- PÁGINA COMPLETA ---
  return (
    <article className="w-full max-w-full overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de 13º Salário"
          description="Quanto vai cair na sua conta? Calcule o valor exato da 1ª parcela (adiantamento) e da 2ª parcela (quitação) com os devidos descontos."
          category="Direito Trabalhista"
          icon={<Gift size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="blue"
          badge="Tabela 2025"
          rating={4.8}
          reviews={9120}
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "13º Salário" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">

        {/* ALERTA DE PRAZOS */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start text-left shadow-sm max-w-3xl mx-auto w-full">
          <TriangleAlert className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 uppercase tracking-wide">Fique Atento aos Prazos 2025</p>
            <p className="text-sm text-amber-800/90 leading-relaxed">
              As empresas devem pagar a <strong>1ª parcela</strong> até <strong>30 de Novembro</strong> e a <strong>2ª parcela</strong> até <strong>20 de Dezembro</strong>. Atrasos geram multa administrativa.
            </p>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="13_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <Suspense fallback={<div className="h-96 w-full bg-slate-50 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">Carregando Calculadora...</div>}>
              <ThirteenthCalculator />
          </Suspense>
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden">
            <AdUnit slot="13_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL PROFUNDO (LONG FORM) --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              O Guia Definitivo do 13º Salário
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            O final do ano se aproxima e com ele a expectativa daquele dinheiro extra que salva o orçamento de milhões de brasileiros: a <strong>Gratificação Natalina</strong>, popularmente conhecida como 13º Salário.
          </p>
          <p>
            Mas você sabe exatamente quanto tem para receber? Entende por que a segunda parcela sempre vem menor que a primeira? Se a resposta for não, você está no lugar certo.
          </p>
          <p>
            Neste guia completo, vamos desvendar cada centavo do seu benefício, explicar a matemática por trás dos descontos e te ajudar a conferir se a empresa está pagando o valor correto.
          </p>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <Calendar className="text-blue-600" /> A Dinâmica das Duas Parcelas
          </h3>
          <p>
             Diferente do salário normal, o 13º possui uma regra de pagamento muito específica dividida em duas etapas obrigatórias. Entender isso é crucial para o seu planejamento financeiro.
          </p>

          <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden hover:border-blue-300 transition-colors">
                  <div className="absolute top-0 right-0 p-3 opacity-10"><Calendar size={80} className="text-blue-600"/></div>
                  <h4 className="font-bold text-blue-900 mb-2 text-lg relative z-10 flex items-center gap-2">1ª Parcela (Adiantamento)</h4>
                  <span className="inline-block bg-white text-blue-700 text-xs font-bold px-2 py-1 rounded border border-blue-200 mb-3 relative z-10">
                      Prazo: 01/Fev até 30/Nov
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed relative z-10">
                      Esta é a parcela "limpa". Você recebe exatamente <strong>50% do salário</strong> do mês anterior ao pagamento. Não há descontos de INSS ou Imposto de Renda nesta etapa. É o valor cheio para o seu bolso.
                  </p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden hover:border-slate-300 transition-colors">
                  <div className="absolute top-0 right-0 p-3 opacity-10"><Coins size={80} className="text-slate-600"/></div>
                  <h4 className="font-bold text-slate-800 mb-2 text-lg relative z-10 flex items-center gap-2">2ª Parcela (Quitação)</h4>
                  <span className="inline-block bg-white text-slate-700 text-xs font-bold px-2 py-1 rounded border border-slate-200 mb-3 relative z-10">
                      Prazo: Até 20/Dez
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                      É aqui que ocorre o "ajuste de contas". O cálculo é feito sobre o valor total do 13º. Desconta-se o <strong>INSS</strong> e o <strong>IRRF</strong> (sobre o montante total) e depois subtrai-se o valor que já foi adiantado na 1ª parcela. Por isso, ela é sempre menor.
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-12 mb-6 flex items-center gap-2">
              <Landmark className="text-amber-600" /> Uma Conquista Histórica
          </h3>
          <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border-l-4 border-amber-400 my-6 not-prose">
              <div className="flex gap-4">
                  <History className="text-amber-600 shrink-0 hidden md:block" size={32}/>
                  <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                      <p>
                          Você sabia que o 13º salário foi instituído no Brasil em <strong>1962</strong>, pelo presidente <strong>João Goulart</strong> (Lei 4.090)?
                      </p>
                      <p>
                          Na época, a medida gerou uma polêmica gigantesca. Jornais e associações comerciais previam o colapso da economia e a falência em massa das empresas, chamando a lei de "demagógica".
                      </p>
                      <p>
                          A história provou o contrário. O benefício não só não quebrou o país, como se tornou o principal motor do comércio varejista no final do ano, injetando bilhões na economia. Hoje, é considerado uma <strong>cláusula pétrea</strong> dos direitos trabalhistas.
                      </p>
                  </div>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <Calculator className="text-purple-600" /> A Matemática da Proporcionalidade
          </h3>
          <p>
              "Comecei a trabalhar em abril, quanto vou receber?". Essa é uma dúvida clássica. O 13º é pago na proporção de <strong>1/12 (um doze avos)</strong> para cada mês trabalhado.
          </p>
          <p>
              Mas existe uma "pegadinha" importante: a <strong>Regra dos 15 Dias</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-purple-600">
              <li>Para que um mês conte para o cálculo, você precisa ter trabalhado pelo menos <strong>15 dias</strong> nele.</li>
              <li>Se você foi admitido no dia 14 de maio, maio conta como um mês inteiro.</li>
              <li>Se foi admitido no dia 16 de maio, maio não conta. O cálculo começa a valer a partir de junho.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <TrendingUp className="text-green-600" /> Médias: O Segredo das Comissões e Horas Extras
          </h3>
          <p>
              Se o seu salário varia (você recebe comissões, faz horas extras ou tem adicional noturno), o 13º salário não será apenas o seu salário base. Ele deve refletir a sua remuneração real média.
          </p>
          <p>
              Para a 1ª parcela, a empresa geralmente faz a média dos valores recebidos de janeiro a outubro. Para a 2ª parcela, a média é recalculada considerando até dezembro, e a diferença é paga (ou descontada) no acerto final.
          </p>

          {/* TABELA DE QUEM TEM DIREITO */}
          <div className="not-prose my-10">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Quem tem e quem NÃO tem direito?</h3>
            <div className="overflow-hidden border rounded-xl border-slate-200 shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 font-bold border-b border-slate-200">Situação</th>
                            <th className="px-6 py-4 font-bold border-b border-slate-200 text-center">Tem Direito?</th>
                            <th className="px-6 py-4 font-bold border-b border-slate-200 hidden sm:table-cell">Detalhe</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr className="bg-white hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium">Trabalhador CLT</td>
                            <td className="px-6 py-4 text-center text-green-600 font-bold"><Check size={16} className="inline"/> Sim</td>
                            <td className="px-6 py-4 hidden sm:table-cell text-slate-500">Integral ou proporcional</td>
                        </tr>
                        <tr className="bg-white hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium">Licença Maternidade</td>
                            <td className="px-6 py-4 text-center text-green-600 font-bold"><Check size={16} className="inline"/> Sim</td>
                            <td className="px-6 py-4 hidden sm:table-cell text-slate-500">Pago pelo empregador (deduz do INSS)</td>
                        </tr>
                        <tr className="bg-white hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium">Auxílio Doença (Acidente)</td>
                            <td className="px-6 py-4 text-center text-green-600 font-bold"><Check size={16} className="inline"/> Sim</td>
                            <td className="px-6 py-4 hidden sm:table-cell text-slate-500">Empresa paga os primeiros 15 dias, INSS o resto</td>
                        </tr>
                        <tr className="bg-white hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium">Estagiário</td>
                            <td className="px-6 py-4 text-center text-red-500 font-bold"><XCircle size={16} className="inline"/> Não</td>
                            <td className="px-6 py-4 hidden sm:table-cell text-slate-500">Lei do Estágio não prevê 13º (é facultativo)</td>
                        </tr>
                        <tr className="bg-white hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium">Demitido por Justa Causa</td>
                            <td className="px-6 py-4 text-center text-red-500 font-bold"><XCircle size={16} className="inline"/> Não</td>
                            <td className="px-6 py-4 hidden sm:table-cell text-slate-500">Perde o direito ao proporcional</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>

          {/* FAQ ACORDION EXPANDIDO */}
          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b pb-4">
                <CircleHelp className="text-blue-600" /> Perguntas Frequentes (FAQ)
            </h3>
            <div className="space-y-4">
              <details className="group bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:bg-white open:ring-1 open:ring-blue-100 transition-all">
                <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                  A empresa pode pagar tudo em uma parcela só?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                  Por lei, o pagamento deve ser parcelado. Porém, algumas empresas optam por pagar a parcela única até 30 de novembro. O que é <strong>ilegal</strong> é deixar para pagar tudo apenas em dezembro (dia 20).
                </p>
              </details>
              
              <details className="group bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:bg-white open:ring-1 open:ring-blue-100 transition-all">
                <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                  Quem pediu demissão recebe 13º?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                  Sim! Se você pedir demissão, o 13º proporcional aos meses trabalhados será pago junto com as verbas rescisórias no termo de quitação.
                </p>
              </details>

              <details className="group bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:bg-white open:ring-1 open:ring-blue-100 transition-all">
                <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                  O patrão atrasou. O que fazer?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                  Se a empresa perder o prazo, ela está sujeita a multa administrativa por funcionário prejudicado. O ideal é conversar com o RH ou buscar o sindicato da categoria.
                </p>
              </details>
            </div>
          </div>

          {/* NAVEGAÇÃO FINAL */}
          <div className="mt-16 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <CheckCircle2 size={16} className="text-emerald-500"/> Outras Ferramentas:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group relative overflow-hidden">
                  <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 group-hover:scale-110 transition-transform"><Briefcase size={20}/></div>
                  <span className="font-bold text-slate-800 group-hover:text-blue-600 text-lg">Rescisão CLT</span>
                  <span className="text-sm text-slate-500 mt-1">Cálculo completo</span>
              </Link>
              <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all group relative overflow-hidden">
                  <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600 group-hover:scale-110 transition-transform"><Coins size={20}/></div>
                  <span className="font-bold text-slate-800 group-hover:text-green-600 text-lg">Salário Líquido</span>
                  <span className="text-sm text-slate-500 mt-1">Descontos mensais</span>
              </Link>
              <Link href="/trabalhista/ferias" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-lg transition-all group relative overflow-hidden">
                  <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-amber-600 group-hover:scale-110 transition-transform"><AlertOctagon size={20}/></div>
                  <span className="font-bold text-slate-800 group-hover:text-amber-600 text-lg">Férias</span>
                  <span className="text-sm text-slate-500 mt-1">Venda e abono</span>
              </Link>
            </div>
          </div>

        </div>

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden">
            <AdUnit slot="13_bottom" format="horizontal" variant="software" />
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