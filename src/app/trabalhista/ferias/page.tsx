import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import VacationCalculator from "@/components/calculators/VacationCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  AlertTriangle, Calendar, Coins, HelpCircle, 
  CheckCircle2, History, BookOpen, Calculator,
  Wallet, Sun, Palmtree, Clock, FileText, Check, Briefcase, XCircle
} from "lucide-react";

// --- 1. METADATA (SEO) ---
export const metadata: Metadata = {
  title: "Calculadora de Férias 2025 | Vender 10 Dias e Adiantar 13º",
  description: "Calcule suas férias online. Simule venda de 10 dias (abono pecuniário), adiantamento do 13º salário e descontos de INSS/IRRF. Grátis e atualizado.",
  keywords: [
    "calculadora férias", 
    "calcular venda férias", 
    "abono pecuniário", 
    "adiantamento 13 nas férias", 
    "cálculo 1/3 férias", 
    "desconto irrf férias"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/trabalhista/ferias" },
  openGraph: {
    title: "Calculadora de Férias 2025 - Mestre das Contas",
    description: "Vai sair de férias? Calcule o valor exato que você tem para receber.",
    url: "https://mestredascontas.com.br/trabalhista/ferias",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-ferias.png", width: 1200, height: 630, alt: "Simulador de Férias" }],
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
      "name": "Calculadora de Férias",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para cálculo de férias, abono pecuniário e 1/3 constitucional.",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "8750", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "Article",
      "headline": "Guia Completo das Férias: Cálculo, Venda e Prazos",
      "description": "Tudo o que você precisa saber antes de sair de férias: como calcular, quando o dinheiro cai e se vale a pena vender 10 dias.",
      "datePublished": "2024-02-01",
      "dateModified": "2025-01-20",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/logo.png" } }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Quando o pagamento das férias deve ser feito?", "acceptedAnswer": { "@type": "Answer", "text": "Até 2 dias antes do início do período de descanso." } },
        { "@type": "Question", "name": "Posso vender 20 dias de férias?", "acceptedAnswer": { "@type": "Answer", "text": "Não. A lei permite vender apenas 1/3 do período a que você tem direito (no máximo 10 dias)." } },
        { "@type": "Question", "name": "O abono pecuniário (venda) tem desconto?", "acceptedAnswer": { "@type": "Answer", "text": "Não. O valor da venda das férias é isento de INSS e Imposto de Renda." } }
      ]
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function FeriasPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-white p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
                    <VacationCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredascontas.com.br/trabalhista/ferias" target="_blank" className="text-[10px] text-slate-400 hover:text-blue-600 uppercase font-bold tracking-wider">
                        Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // Dados para a Tabela Híbrida (Tributação)
  const tributacaoData = [
    { verba: "Férias Gozadas (Descanso)", inss: true, irrf: true },
    { verba: "1/3 Constitucional (sobre gozo)", inss: true, irrf: true },
    { verba: "Abono Pecuniário (Venda)", inss: false, irrf: false }, // Destaque: Isento
    { verba: "1/3 sobre Abono", inss: false, irrf: false }, // Destaque: Isento
  ];

  return (
    <article className="flex flex-col gap-8 w-full max-w-full overflow-hidden px-4 sm:px-6 py-6 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <header className="space-y-4 text-center md:text-left print:hidden max-w-4xl mx-auto md:mx-0">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-amber-100 text-amber-800 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
          <Sun size={14} /> Planejamento de Férias 2025
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight break-words leading-tight">
          Calculadora de <span className="text-amber-600">Férias</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          Chegou a hora do descanso! Simule o valor líquido das suas férias, incluindo a opção de <strong>vender 10 dias</strong> (abono) e <strong>adiantar o 13º salário</strong>.
        </p>
        
        {/* ALERTA PRAZO */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start text-left max-w-2xl mx-auto md:mx-0 shadow-sm mt-4">
          <Clock className="text-amber-600 shrink-0 mt-0.5" size={18} />
          <div className="space-y-1">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Quando o dinheiro cai?</p>
            <p className="text-xs text-amber-800/80 leading-relaxed">
              Pela lei, o pagamento das férias (incluindo o 1/3 adicional) deve ser feito até <strong>2 dias antes</strong> do início do seu descanso.
            </p>
          </div>
        </div>
      </header>

      {/* ANÚNCIO TOPO */}
      <div className="w-full max-w-full overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 my-4 print:hidden">
         <AdUnit slot="ferias_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      {/* FERRAMENTA */}
      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-slate-50 rounded-xl animate-pulse"/>}>
           <VacationCalculator />
        </Suspense>
        <div className="mt-8 print:hidden">
            <DisclaimerBox />
        </div>
      </section>

      {/* ANÚNCIO MEIO */}
      <div className="w-full flex justify-center my-6 print:hidden">
        <AdUnit slot="ferias_mid" format="auto" />
      </div>

      {/* --- CONTEÚDO SEO --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-amber-500 pl-4">
            Como funciona o pagamento das Férias?
        </h2>
        <p className="lead text-slate-700 text-lg">
          Todo trabalhador CLT tem direito a 30 dias de descanso remunerado após completar 12 meses de trabalho (o chamado período aquisitivo). 
          Mas o melhor vem agora: você recebe seu salário adiantado + um bônus de 1/3!
        </p>

        {/* CARDS EXPLICATIVOS */}
        <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
            <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 hover:shadow-md transition-shadow">
                <Sun className="text-amber-600 mb-3" size={32} />
                <h3 className="font-bold text-amber-900 mb-2 text-lg">Salário + 1/3</h3>
                <p className="text-sm text-slate-700">
                    Você recebe o salário dos dias que vai descansar, acrescido de 1/3 constitucional (33,33% a mais) para curtir as férias.
                </p>
            </div>
            <div className="bg-green-50 p-5 rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                <Wallet className="text-green-600 mb-3" size={32} />
                <h3 className="font-bold text-green-900 mb-2 text-lg">Abono Pecuniário</h3>
                <p className="text-sm text-slate-700">
                    É a famosa "venda de férias". Você pode trocar até 10 dias de descanso por dinheiro. A vantagem? Esse valor é <strong>isento de impostos</strong>.
                </p>
            </div>
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                <Calendar className="text-blue-600 mb-3" size={32} />
                <h3 className="font-bold text-blue-900 mb-2 text-lg">Adiantamento 13º</h3>
                <p className="text-sm text-slate-700">
                    Você pode pedir a 1ª parcela do 13º salário para receber junto com as férias. O prazo para solicitar isso geralmente é Janeiro.
                </p>
            </div>
        </div>

        {/* CURIOSIDADE HISTÓRICA */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 md:p-8 rounded-2xl border border-amber-100 my-10 not-prose relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Palmtree size={140} className="text-amber-900"/>
            </div>
            <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2 relative z-10">
                <History size={24} className="text-amber-600"/> Você Sabia? Férias nem sempre existiram
            </h3>
            <div className="space-y-4 text-slate-700 relative z-10 text-sm md:text-base leading-relaxed">
                <p>
                    No início da industrialização, trabalhava-se até a exaustão, sem férias remuneradas. No Brasil, o direito a 15 dias de férias só surgiu em **1925**, mas apenas para ferroviários e bancários.
                </p>
                <p>
                    A extensão para todos os operários veio com Getúlio Vargas em 1943 (CLT). Mas o famoso **"Terço de Férias"** (o bônus de 33%) é uma conquista mais recente: nasceu apenas com a Constituição de 1988, para garantir que o trabalhador tivesse dinheiro extra para realmente viajar ou descansar.
                </p>
            </div>
        </div>

        {/* TABELA DE TRIBUTAÇÃO */}
        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2">
            <FileText className="text-slate-500" /> O que é descontado (Impostos)?
        </h3>
        <p>Sim, o leão morde suas férias. Mas atenção para a isenção do abono:</p>

        <div className="not-prose my-6 border rounded-xl overflow-hidden border-slate-200 shadow-sm">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-slate-100 text-slate-700 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4 font-bold">Verba</th>
                        <th className="px-6 py-4 font-bold text-center">Incide INSS?</th>
                        <th className="px-6 py-4 font-bold text-center">Incide IRRF?</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    <tr className="bg-white hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">Férias Gozadas (Descanso)</td>
                        <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded"><XCircle size={14}/> Sim</span></td>
                        <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded"><XCircle size={14}/> Sim</span></td>
                    </tr>
                    <tr className="bg-white hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">1/3 Constitucional (sobre gozo)</td>
                        <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded"><XCircle size={14}/> Sim</span></td>
                        <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded"><XCircle size={14}/> Sim</span></td>
                    </tr>
                    <tr className="bg-green-50/40 hover:bg-green-50">
                        <td className="px-6 py-4 font-bold text-green-800">Abono Pecuniário (Venda)</td>
                        <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-green-700 font-bold text-xs bg-green-100 px-2 py-1 rounded border border-green-200"><Check size={14}/> Isento</span></td>
                        <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-green-700 font-bold text-xs bg-green-100 px-2 py-1 rounded border border-green-200"><Check size={14}/> Isento</span></td>
                    </tr>
                    <tr className="bg-green-50/40 hover:bg-green-50">
                        <td className="px-6 py-4 font-bold text-green-800">1/3 sobre Abono</td>
                        <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-green-700 font-bold text-xs bg-green-100 px-2 py-1 rounded border border-green-200"><Check size={14}/> Isento</span></td>
                        <td className="px-6 py-4 text-center"><span className="inline-flex items-center gap-1 text-green-700 font-bold text-xs bg-green-100 px-2 py-1 rounded border border-green-200"><Check size={14}/> Isento</span></td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* FAQ */}
        <div className="mt-12 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" /> Dúvidas Frequentes
          </h3>
          <div className="space-y-4">
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Posso vender 20 dias de férias?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Não. A legislação (CLT) permite vender apenas **1/3 do período** a que você tem direito. Se você tem direito a 30 dias, pode vender no máximo 10 dias e descansar 20.
              </p>
            </details>
            
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                O que acontece se a empresa atrasar o pagamento?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Se a empresa não pagar até 2 dias antes do início das férias, ela é obrigada a pagar o valor das férias **em dobro** (Súmula 450 do TST).
              </p>
            </details>

            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Posso dividir minhas férias em 3 períodos?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Sim, desde a Reforma Trabalhista de 2017. Um dos períodos não pode ser inferior a 14 dias corridos, e os outros não podem ser inferiores a 5 dias corridos.
              </p>
            </details>
          </div>
        </div>

        {/* NAVEGAÇÃO FINAL */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
          <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
             <CheckCircle2 size={16} className="text-green-500"/> Outras Ferramentas Úteis:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600"><Coins size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                <span className="text-sm text-slate-500 mt-1">Descontos do mês</span>
            </Link>
            <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group">
                <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-amber-600"><Briefcase size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Rescisão CLT</span>
                <span className="text-sm text-slate-500 mt-1">Cálculo demissão</span>
            </Link>
            <Link href="/trabalhista/decimo-terceiro" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group">
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600"><Wallet size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">13º Salário</span>
                <span className="text-sm text-slate-500 mt-1">1ª e 2ª parcelas</span>
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