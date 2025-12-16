import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ThirteenthCalculator from "@/components/calculators/ThirteenthCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  TriangleAlert, Calendar, Coins, CircleHelp, 
  CircleCheck, History, BookOpen, Calculator,
  Wallet, FileText, Scale, Briefcase, XCircle, Check
} from "lucide-react";

// --- 1. METADATA (SEO) ---
export const metadata: Metadata = {
  title: "Calculadora Décimo Terceiro 2025 | 1ª e 2ª Parcela Exatas",
  description: "Calcule seu 13º salário online. Descubra o valor exato da primeira parcela (sem descontos) e da segunda (com INSS e IRRF). Simulação gratuita e atualizada.",
  keywords: [
    "calculadora decimo terceiro", 
    "calcular 13o salario", 
    "primeira parcela 13", 
    "data pagamento decimo terceiro", 
    "descontos 13o salario", 
    "gratificação natalina"
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
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

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
      "@type": "Article",
      "headline": "Tudo sobre o Décimo Terceiro: Datas, Cálculos e Direitos",
      "description": "Guia completo sobre a gratificação natalina, prazos de pagamento e quem tem direito.",
      "datePublished": "2024-01-20",
      "dateModified": "2025-01-25",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/logo.png" } }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Quando deve ser paga a primeira parcela?", "acceptedAnswer": { "@type": "Answer", "text": "Até o dia 30 de novembro de cada ano." } },
        { "@type": "Question", "name": "Quando cai a segunda parcela?", "acceptedAnswer": { "@type": "Answer", "text": "Até o dia 20 de dezembro." } },
        { "@type": "Question", "name": "A primeira parcela tem descontos?", "acceptedAnswer": { "@type": "Answer", "text": "Não. A primeira parcela é 50% do bruto. Os descontos ocorrem apenas na segunda parcela." } }
      ]
    }
  ]
};

// --- TIPAGEM NEXT 15 ---
type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function DecimoTerceiroPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-white p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
                    <ThirteenthCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredascontas.com.br/trabalhista/decimo-terceiro" target="_blank" className="text-[10px] text-slate-400 hover:text-blue-600 uppercase font-bold tracking-wider">
                        Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- PÁGINA COMPLETA ---
  return (
    <article className="flex flex-col gap-8 w-full max-w-full overflow-hidden px-4 sm:px-6 py-6 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <header className="space-y-4 text-center md:text-left print:hidden max-w-4xl mx-auto md:mx-0">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
          <Wallet size={14} /> Gratificação Natalina 2025
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight break-words leading-tight">
          Calculadora de <span className="text-blue-600">13º Salário</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          Quanto vai cair na sua conta? Calcule o valor exato da <strong>1ª parcela</strong> (adiantamento) e da <strong>2ª parcela</strong> (quitação) com os devidos descontos.
        </p>
        
        {/* ALERTA DE PRAZOS */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start text-left max-w-2xl mx-auto md:mx-0 shadow-sm mt-4">
          <TriangleAlert className="text-amber-600 shrink-0 mt-0.5" size={18} />
          <div className="space-y-1">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Fique Atento aos Prazos</p>
            <p className="text-xs text-amber-800/80 leading-relaxed">
              As empresas devem pagar a 1ª parcela até <strong>30 de Novembro</strong> e a 2ª parcela até <strong>20 de Dezembro</strong>. Atrasos geram multa administrativa.
            </p>
          </div>
        </div>
      </header>

      {/* ANÚNCIO TOPO */}
      <div className="w-full max-w-full overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 my-4 print:hidden">
         <AdUnit slot="13_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      {/* FERRAMENTA */}
      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Carregando Calculadora...</div>}>
           <ThirteenthCalculator />
        </Suspense>
        <div className="mt-8 print:hidden">
            <DisclaimerBox />
        </div>
      </section>

      {/* ANÚNCIO MEIO */}
      <div className="w-full flex justify-center my-6 print:hidden">
        <AdUnit slot="13_mid" format="auto" />
      </div>

      {/* --- CONTEÚDO SEO --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
            Como funciona o pagamento do 13º?
        </h2>
        <p className="lead text-slate-700 text-lg">
          O Décimo Terceiro Salário, ou Gratificação Natalina, é um direito garantido por lei a todo trabalhador com carteira assinada. 
          O pagamento é dividido obrigatoriamente em duas etapas, e a forma de cálculo muda drasticamente entre elas.
        </p>

        {/* CARDS VISUAIS DE PARCELAS */}
        <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10"><Calendar size={80} className="text-blue-600"/></div>
                <h3 className="font-bold text-blue-800 mb-2 text-lg relative z-10">1ª Parcela (Adiantamento)</h3>
                <span className="inline-block bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded border border-blue-200 mb-3 relative z-10">
                    Até 30 de Novembro
                </span>
                <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                    Você recebe <strong>50% do salário</strong> bruto do mês anterior. A grande vantagem é que esta parcela é paga "cheia", sem nenhum desconto de impostos (INSS/IRRF).
                </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10"><Coins size={80} className="text-slate-600"/></div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg relative z-10">2ª Parcela (Quitação)</h3>
                <span className="inline-block bg-white text-slate-600 text-xs font-bold px-2 py-1 rounded border border-slate-200 mb-3 relative z-10">
                    Até 20 de Dezembro
                </span>
                <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                    É aqui que o "leão" morde. O cálculo é feito sobre o valor total, descontando-se o <strong>INSS</strong> e o <strong>Imposto de Renda</strong> (sobre o total) e subtraindo o valor que já foi adiantado na 1ª parcela.
                </p>
            </div>
        </div>

        {/* CURIOSIDADE HISTÓRICA: A LUTA PELO 13º */}
        <div className="bg-blue-50/60 p-6 md:p-8 rounded-2xl border border-blue-100 my-10 not-prose relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <History size={140} className="text-blue-900"/>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2 relative z-10">
                <BookOpen size={24} className="text-blue-600"/> Você Sabia? A Origem do 13º Salário
            </h3>
            <div className="space-y-4 text-slate-700 relative z-10 text-sm md:text-base leading-relaxed">
                <p>
                    O 13º salário nem sempre existiu e foi motivo de muita polêmica. Ele foi instituído no Brasil em <strong>1962</strong>, pelo presidente <strong>João Goulart</strong> (Lei 4.090).
                </p>
                <p>
                    Na época, setores empresariais e jornais previram o "fim da economia" e a falência generalizada das empresas, chamando a medida de demagógica. A realidade provou o contrário: o benefício se tornou um motor vital para o comércio no final do ano.
                </p>
                <p>
                    Hoje, ele é considerado uma "cláusula pétrea" dos direitos sociais, injetando bilhões na economia todo mês de dezembro.
                </p>
            </div>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-8 mb-4">Quem tem direito a receber?</h3>
        <ul className="space-y-3 not-prose mb-8">
            <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <CircleCheck className="text-green-500 mt-0.5 shrink-0" size={18} />
                <span className="text-slate-700 text-sm">Todo trabalhador com carteira assinada (CLT), incluindo domésticas, rurais e avulsos.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <CircleCheck className="text-green-500 mt-0.5 shrink-0" size={18} />
                <span className="text-slate-700 text-sm">Aposentados e pensionistas do INSS (pago antecipadamente pelo governo).</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <CircleCheck className="text-green-500 mt-0.5 shrink-0" size={18} />
                <span className="text-slate-700 text-sm">Quem trabalhou pelo menos <strong>15 dias</strong> com carteira assinada durante o ano.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <CircleCheck className="text-green-500 mt-0.5 shrink-0" size={18} />
                <span className="text-slate-700 text-sm">Trabalhadores em licença maternidade ou afastados por acidente de trabalho.</span>
            </li>
        </ul>

        {/* NOTA DE ALERTA */}
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 not-prose flex gap-3 mb-10">
            <Scale className="text-red-500 shrink-0" size={20}/>
            <div>
                <h4 className="font-bold text-red-900 text-sm">Quem perde o direito?</h4>
                <p className="text-sm text-red-800/80 mt-1">
                    Funcionários demitidos por <strong>Justa Causa</strong> perdem o direito ao recebimento do 13º salário proporcional.
                </p>
            </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CircleHelp className="text-blue-600" /> Dúvidas Frequentes
          </h3>
          <div className="space-y-4">
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                A 2ª parcela é sempre menor que a 1ª?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Sim, na grande maioria dos casos. Isso acontece porque a 1ª parcela é metade do bruto sem descontos, enquanto a 2ª parcela sofre todos os descontos de INSS e IRRF referentes ao valor TOTAL do benefício.
              </p>
            </details>
            
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Recebo 13º se pedir demissão?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Com certeza! Se você pedir demissão, tem direito a receber o 13º salário proporcional aos meses trabalhados no ano (contando como mês cheio qualquer fração superior a 14 dias de trabalho).
              </p>
            </details>

            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Como ficam as horas extras no cálculo?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                As horas extras, adicionais noturnos e comissões entram no cálculo através da <strong>média anual</strong>. Soma-se tudo o que foi recebido durante o ano e divide-se pelo número de meses trabalhados para achar a média que será incorporada ao 13º.
              </p>
            </details>
          </div>
        </div>

        {/* NAVEGAÇÃO FINAL */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
          <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
             <CircleCheck size={16} className="text-green-500"/> Outras Ferramentas Úteis:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600"><Briefcase size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Rescisão CLT</span>
                <span className="text-sm text-slate-500 mt-1">Cálculo completo</span>
            </Link>
            <Link href="/trabalhista/ferias" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group">
                <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-amber-600"><Calculator size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Calculadora de Férias</span>
                <span className="text-sm text-slate-500 mt-1">Venda de 10 dias</span>
            </Link>
            <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group">
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600"><Coins size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                <span className="text-sm text-slate-500 mt-1">Descontos mensais</span>
            </Link>
          </div>
        </div>

      </div>

      {/* RODAPÉ IMPRESSÃO */}
      <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
          <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
          <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
      </div>

    </article>
  );
}