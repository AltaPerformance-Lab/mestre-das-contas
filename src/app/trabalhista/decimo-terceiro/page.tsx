import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ThirteenthCalculator from "@/components/calculators/ThirteenthCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  TriangleAlert, Calendar, Coins, CircleHelp, 
  CircleCheck, History, BookOpen, Calculator,
  Wallet, FileText, Scale, Briefcase, XCircle, Check, Gift,
  AlertOctagon, Landmark, TrendingUp, CheckCircle2
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import RelatedTools from "@/components/ui/RelatedTools";

// --- 1. METADATA (SEO 2025) ---
// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const salarioRaw = resolvedParams.salario as string;
  
  let title = "Calculadora Décimo Terceiro 2025 | 1ª e 2ª Parcela Exatas";
  let description = "Calcule seu 13º salário online. Descubra o valor exato da primeira parcela (sem descontos) e da segunda (com INSS e IRRF). Simulação gratuita e atualizada.";

  if (salarioRaw) {
    const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(salarioRaw));
    title = `Cálculo de 13º: Salário de ${valorFormatado} - Calculadora 2025`;
    description = `Veja quanto você vai receber de Décimo Terceiro com um salário de ${valorFormatado}. Valores da 1ª Parcela (Adiantamento) e 2ª Parcela.`;
  }

  return {
    title,
    description,
    keywords: [
      "calculadora decimo terceiro", "calcular 13o salario", "primeira parcela 13", 
      "data pagamento decimo terceiro", "descontos 13o salario", "gratificação natalina",
      "decimo terceiro proporcional", "decimo terceiro maternidade", "calculo media horas extras 13",
      ...(salarioRaw ? [`decimo terceiro salario ${salarioRaw}`, `calcular 13o ${salarioRaw}`] : [])
    ],
    alternates: {
      canonical: "https://mestredascontas.com.br/trabalhista/decimo-terceiro",
    },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/trabalhista/decimo-terceiro",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Simulador Décimo Terceiro" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://mestredascontas.com.br/opengraph-image"],
    },
  };
}

// --- FAQ LIST (DRY Content) ---
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
      "description": "Ferramenta online para cálculo de Décimo Terceiro salário com parcelas e descontos de INSS/IRRF.",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "9120", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular o 13º Salário",
      "description": "Veja como simular o valor das duas parcelas.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Salário Bruto",
          "text": "Digite o valor atual do seu salário na carteira."
        },
        {
          "@type": "HowToStep",
          "name": "Meses Trabalhados",
          "text": "Informe quantos meses você trabalhou no ano (fração igual ou maior que 15 dias conta como mês cheio)."
        },
        {
           "@type": "HowToStep",
           "name": "Dependentes",
           "text": "Se tiver dependentes legais, inclua-os para dedução do Imposto de Renda."
        },
        {
          "@type": "HowToStep",
          "name": "Resultado",
          "text": "O sistema mostrará o valor líquido da 1ª parcela (adiantamento) e da 2ª (quitação)."
        }
      ]
    },
    {
      "@type": "TechArticle",
      "headline": "Guia Completo do Décimo Terceiro: Cálculos, Prazos e Direitos 2025",
      "description": "Entenda como funciona o pagamento da gratificação natalina, a média de horas extras e os descontos na segunda parcela.",
      "proficiencyLevel": "Beginner",
      "author": { "@type": "Organization", "name": "Equipe Trabalhista Mestre das Contas", "url": "https://mestredascontas.com.br/sobre" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-10-15",
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
        <main className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                <Suspense fallback={<div className="p-10 text-center animate-pulse text-slate-400 dark:text-slate-500">Carregando Calculadora...</div>}>
                    <ThirteenthCalculator />
                </Suspense>
                <div className="mt-4 text-center border-t border-slate-200 dark:border-slate-800 pt-3">
                    <Link href="https://mestredascontas.com.br/trabalhista/decimo-terceiro" target="_blank" className="text-[10px] text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Gift size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- MODO PÁGINA NORMAL ---
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
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

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ALERTA DE PRAZOS */}
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 flex gap-3 items-start text-left shadow-sm max-w-3xl mx-auto w-full">
          <TriangleAlert className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide">Fique Atento aos Prazos 2025</p>
            <p className="text-sm text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
              As empresas devem pagar a <strong>1ª parcela</strong> até <strong>30 de Novembro</strong> e a <strong>2ª parcela</strong> até <strong>20 de Dezembro</strong>. Atrasos geram multa administrativa.
            </p>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="13_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
              <Suspense fallback={
                <div className="h-96 w-full bg-slate-50 dark:bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col items-center gap-2">
                        <Gift className="animate-bounce" size={32}/>
                        <span>Carregando Calculadora...</span>
                    </div>
                </div>
              }>
                  <PrivacyBadge />
                  <ThirteenthCalculator />
              </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden">
            <LazyAdUnit slot="13_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL PROFUNDO (LONG FORM) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              O Guia Definitivo do 13º Salário
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            O final do ano se aproxima e com ele a expectativa daquele dinheiro extra que salva o orçamento de milhões de brasileiros: a <strong>Gratificação Natalina</strong>, popularmente conhecida como 13º Salário.
          </p>
          <p>
            Mas você sabe exatamente quanto tem para receber? Entende por que a segunda parcela sempre vem menor que a primeira? Se a resposta for não, você está no lugar certo.
          </p>
          <p>
            Neste guia completo, vamos desvendar cada centavo do seu benefício, explicar a matemática por trás dos descontos e te ajudar a conferir se a empresa está pagando o valor correto.
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
              <Calendar className="text-blue-600 dark:text-blue-400" /> A Dinâmica das Duas Parcelas
          </h3>
          <p>
             Diferente do salário normal, o 13º possui uma regra de pagamento muito específica dividida em duas etapas obrigatórias. Entender isso é crucial para o seu planejamento financeiro.
          </p>

          <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm relative overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <div className="absolute top-0 right-0 p-3 opacity-10"><Calendar size={80} className="text-blue-600 dark:text-blue-500"/></div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-400 mb-2 text-lg relative z-10 flex items-center gap-2">1ª Parcela (Adiantamento)</h4>
                  <span className="inline-block bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded border border-blue-200 dark:border-blue-900/40 mb-3 relative z-10">
                      Prazo: 01/Fev até 30/Nov
                  </span>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed relative z-10">
                      Esta é a parcela "limpa". Você recebe exatamente <strong>50% do salário</strong> do mês anterior ao pagamento. Não há descontos de INSS ou Imposto de Renda nesta etapa. É o valor cheio para o seu bolso.
                  </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                  <div className="absolute top-0 right-0 p-3 opacity-10"><Coins size={80} className="text-slate-600 dark:text-slate-500"/></div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2 text-lg relative z-10 flex items-center gap-2">2ª Parcela (Quitação)</h4>
                  <span className="inline-block bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded border border-slate-200 dark:border-slate-700 mb-3 relative z-10">
                      Prazo: Até 20/Dez
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed relative z-10">
                      É aqui que ocorre o "ajuste de contas". O cálculo é feito sobre o valor total do 13º. Desconta-se o <strong>INSS</strong> e o <strong>IRRF</strong> (sobre o montante total) e depois subtrai-se o valor que já foi adiantado na 1ª parcela. Por isso, ela é sempre menor.
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-12 mb-6 flex items-center gap-2">
              <Landmark className="text-amber-600 dark:text-amber-500" /> Uma Conquista Histórica
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 md:p-8 rounded-2xl border-l-4 border-amber-400 dark:border-amber-500 my-6 not-prose shadow-sm">
              <div className="flex gap-4">
                  <History className="text-amber-600 dark:text-amber-500 shrink-0 hidden md:block" size={32}/>
                  <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
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

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
              <Calculator className="text-purple-600 dark:text-purple-400" /> A Matemática da Proporcionalidade
          </h3>
          <p>
              "Comecei a trabalhar em abril, quanto vou receber?". Essa é uma dúvida clássica. O 13º é pago na proporção de <strong>1/12 (um doze avos)</strong> para cada mês trabalhado.
          </p>
          <p>
              Mas existe uma "pegadinha" importante: a <strong>Regra dos 15 Dias</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-purple-600 dark:marker:text-purple-400">
              <li>Para que um mês conte para o cálculo, você precisa ter trabalhado pelo menos <strong>15 dias</strong> nele.</li>
              <li>Se você foi admitido no dia 14 de maio, maio conta como um mês inteiro.</li>
              <li>Se foi admitido no dia 16 de maio, maio não conta. O cálculo começa a valer a partir de junho.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
              <TrendingUp className="text-green-600 dark:text-green-500" /> Médias: O Segredo das Comissões
          </h3>
          <p>
              Se o seu salário varia (você recebe comissões, faz horas extras ou tem adicional noturno), o 13º salário não será apenas o seu salário base. Ele deve refletir a sua remuneração real média.
          </p>
          <p>
              Para a 1ª parcela, a empresa geralmente faz a média dos valores recebidos de janeiro a outubro. Para a 2ª parcela, a média é recalculada considerando até dezembro, e a diferença é paga (ou descontada) no acerto final.
          </p>

          {/* TABELA DE QUEM TEM DIREITO */}
          <div className="not-prose my-10">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Quem tem e quem NÃO tem direito?</h3>
            {/* TABELA DE QUEM TEM DIREITO (RESPONSIVA) */}
            <div className="overflow-hidden border rounded-xl border-slate-200 dark:border-slate-800 shadow-sm hidden md:block">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Situação</th>
                            <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 text-center">Tem Direito?</th>
                            <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700 hidden sm:table-cell">Detalhe</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium">Trabalhador CLT</td>
                            <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold"><Check size={16} className="inline"/> Sim</td>
                            <td className="px-6 py-4 hidden sm:table-cell text-slate-500 dark:text-slate-400">Integral ou proporcional</td>
                        </tr>
                        <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium">Licença Maternidade</td>
                            <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold"><Check size={16} className="inline"/> Sim</td>
                            <td className="px-6 py-4 hidden sm:table-cell text-slate-500 dark:text-slate-400">Pago pelo empregador (deduz do INSS)</td>
                        </tr>
                        <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium">Auxílio Doença (Acidente)</td>
                            <td className="px-6 py-4 text-center text-green-600 dark:text-green-500 font-bold"><Check size={16} className="inline"/> Sim</td>
                            <td className="px-6 py-4 hidden sm:table-cell text-slate-500 dark:text-slate-400">Empresa paga os primeiros 15 dias</td>
                        </tr>
                        <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium">Estagiário</td>
                            <td className="px-6 py-4 text-center text-red-500 dark:text-red-400 font-bold"><XCircle size={16} className="inline"/> Não</td>
                            <td className="px-6 py-4 hidden sm:table-cell text-slate-500 dark:text-slate-400">Facultativo da empresa</td>
                        </tr>
                        <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium">Demitido por Justa Causa</td>
                            <td className="px-6 py-4 text-center text-red-500 dark:text-red-400 font-bold"><XCircle size={16} className="inline"/> Não</td>
                            <td className="px-6 py-4 hidden sm:table-cell text-slate-500 dark:text-slate-400">Perde o direito ao proporcional</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* VERSÃO MOBILE (CARDS) */}
            <div className="md:hidden space-y-3">
                 {[
                    { sit: "Trabalhador CLT", tem: true, det: "Integral ou proporcional" },
                    { sit: "Licença Maternidade", tem: true, det: "Pago pelo empregador" },
                    { sit: "Auxílio Doença", tem: true, det: "Empresa paga 15 dias" },
                    { sit: "Estagiário", tem: false, det: "Facultativo da empresa" },
                    { sit: "Justa Causa", tem: false, det: "Perde o proporcional" },
                 ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center shadow-sm">
                        <div>
                            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm block">{item.sit}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">{item.det}</span>
                        </div>
                        <div className={`text-sm font-bold flex items-center gap-1 px-3 py-1 rounded-full ${item.tem ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
                            {item.tem ? <><Check size={14}/> Sim</> : <><XCircle size={14}/> Não</>}
                        </div>
                    </div>
                 ))}
            </div>
          </div>

          {/* FAQ ACORDION EXPANDIDO */}
          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <CircleHelp className="text-blue-600 dark:text-blue-400" /> Perguntas Frequentes (FAQ)
            </h3>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-blue-500 dark:text-blue-400 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 text-sm animate-in fade-in">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* NAVEGAÇÃO FINAL */}
          </div>

          <RelatedTools currentToolLink="/trabalhista/decimo-terceiro" category="trabalhista" />

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="13_bottom" format="horizontal" variant="software" />
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