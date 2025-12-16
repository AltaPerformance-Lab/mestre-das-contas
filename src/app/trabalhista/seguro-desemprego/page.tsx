import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import UnemploymentCalculator from "@/components/calculators/UnemploymentCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  Briefcase, HelpCircle, History, BookOpen, 
  AlertTriangle, CheckCircle2, Coins, Calculator, 
  Wallet, FileText, Scale, Users, Calendar, ShieldCheck, XCircle, Search
} from "lucide-react";

// --- 1. METADATA DE ALTA PERFORMANCE (SEO) ---
export const metadata: Metadata = {
  title: "Calculadora de Seguro-Desemprego 2025 | Valor e Parcelas (Oficial)",
  description: "Foi demitido? Simule agora o valor exato e a quantidade de parcelas do seu Seguro-Desemprego. Tabela atualizada 2025, regras de carência e prazos.",
  keywords: [
    "calculadora seguro desemprego", 
    "valor seguro desemprego 2025", 
    "quantas parcelas seguro desemprego", 
    "quem tem direito seguro desemprego", 
    "teto seguro desemprego 2025",
    "dar entrada seguro desemprego online"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/trabalhista/seguro-desemprego" },
  openGraph: {
    title: "Calculadora de Seguro-Desemprego 2025 - Mestre das Contas",
    description: "Guia completo: Descubra o valor, parcelas e prazos para solicitar seu benefício hoje.",
    url: "https://mestredascontas.com.br/trabalhista/seguro-desemprego",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-seguro.png", width: 1200, height: 630, alt: "Simulador Seguro Desemprego" }],
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
      "name": "Calculadora de Seguro-Desemprego",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Simulador online para cálculo de valor e parcelas do Seguro-Desemprego no Brasil de acordo com as regras do FAT."
    },
    {
      "@type": "Article",
      "headline": "Seguro-Desemprego: Guia Definitivo de Direitos e Prazos",
      "description": "Tudo sobre o benefício: quem tem direito, como calcular a média salarial e prazos para requerimento.",
      "datePublished": "2024-02-20",
      "dateModified": "2025-01-25",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/logo.png" } }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Quantas parcelas eu recebo?", "acceptedAnswer": { "@type": "Answer", "text": "Depende do tempo de trabalho e de quantas vezes você já solicitou. Varia de 3 a 5 parcelas." } },
        { "@type": "Question", "name": "Qual o valor máximo do seguro?", "acceptedAnswer": { "@type": "Answer", "text": "O teto máximo é reajustado anualmente pelo governo." } },
        { "@type": "Question", "name": "MEI tem direito a seguro-desemprego?", "acceptedAnswer": { "@type": "Answer", "text": "Em regra não, pois o sistema entende que você tem renda. Salvo se comprovar inatividade ou renda insuficiente." } }
      ]
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function SeguroPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- LAYOUT EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-white p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
                    <UnemploymentCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredascontas.com.br/trabalhista/seguro-desemprego" target="_blank" className="text-[10px] text-slate-400 hover:text-blue-600 uppercase font-bold tracking-wider">
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

      {/* HEADER HERO */}
      <header className="space-y-4 text-center md:text-left print:hidden max-w-4xl mx-auto md:mx-0">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
          <ShieldCheck size={14} /> Proteção Social
        </span>
        
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
          Calculadora de <span className="text-blue-600">Seguro-Desemprego</span>
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          Foi demitido sem justa causa? Descubra o valor exato do benefício e quantas parcelas você tem direito de receber segundo a regra oficial de 2025.
        </p>
        
        {/* ALERTA DE PRAZO CRÍTICO */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start text-left max-w-2xl mx-auto md:mx-0 shadow-sm mt-4">
          <Calendar className="text-amber-600 shrink-0 mt-0.5" size={18} />
          <div className="space-y-1">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Atenção ao Prazo!</p>
            <p className="text-xs text-amber-800/80 leading-relaxed">
              Trabalhador formal tem de <strong>7 a 120 dias</strong> após a demissão para dar entrada no requerimento. Passou disso, perde o direito.
            </p>
          </div>
        </div>
      </header>

      {/* ANÚNCIO TOPO */}
      <div className="w-full max-w-full overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 my-4 print:hidden">
         <AdUnit slot="seguro_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      {/* FERRAMENTA */}
      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Carregando Calculadora...</div>}>
           <UnemploymentCalculator />
        </Suspense>
        
        <div className="mt-8 print:hidden">
            <DisclaimerBox />
        </div>
      </section>

      {/* ANÚNCIO MEIO */}
      <div className="w-full flex justify-center my-6 print:hidden">
        <AdUnit slot="seguro_mid" format="auto" />
      </div>

      {/* --- CONTEÚDO EDUCACIONAL DENSO --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
            Como funciona o Cálculo (A Matemática do Benefício)
        </h2>
        <p className="lead text-slate-700 text-lg">
          Muitas pessoas acham que vão receber o mesmo valor do último salário, mas não é assim. O cálculo do Seguro-Desemprego segue uma lógica baseada na <strong>média dos últimos 3 meses</strong> anteriores à demissão.
        </p>
        <p>
          O governo utiliza uma tabela progressiva para definir o valor da parcela. Isso significa que existe um piso (ninguém recebe menos que um salário mínimo) e um teto (um valor máximo, independente de quanto você ganhava).
        </p>

        {/* TABELA DE CÁLCULO VISUAL */}
        <div className="not-prose my-8 overflow-hidden border rounded-xl border-slate-200 shadow-sm">
            <div className="bg-slate-100 p-3 border-b border-slate-200">
                <h3 className="font-bold text-slate-700 text-sm uppercase flex items-center gap-2">
                    <Calculator size={16} /> Tabela de Cálculo 2024/2025
                </h3>
            </div>
            <table className="w-full text-sm text-left">
                <tbody className="divide-y divide-slate-100">
                    <tr className="bg-white">
                        <td className="px-4 py-3 font-medium text-slate-600">Média até R$ 2.041,39</td>
                        <td className="px-4 py-3 text-slate-800">Multiplica-se a média por <strong>0.8</strong> (80%)</td>
                    </tr>
                    <tr className="bg-white">
                        <td className="px-4 py-3 font-medium text-slate-600">De R$ 2.041,40 até R$ 3.402,65</td>
                        <td className="px-4 py-3 text-slate-800">O que exceder a 2.041,39 multiplica por <strong>0.5</strong> e soma a 1.633,10</td>
                    </tr>
                    <tr className="bg-blue-50">
                        <td className="px-4 py-3 font-bold text-blue-800">Acima de R$ 3.402,65</td>
                        <td className="px-4 py-3 font-bold text-blue-800">Valor fixo (Teto): R$ 2.313,74</td>
                    </tr>
                </tbody>
            </table>
            <p className="text-xs text-slate-500 p-2 bg-slate-50 text-center">* Valores reajustados anualmente conforme o salário mínimo.</p>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
            <Coins className="text-green-600" /> Quantas parcelas vou receber?
        </h3>
        <p>
            A quantidade de dinheiro que você vai receber depende da sua "carência", ou seja, de quanto tempo você trabalhou e de quantas vezes você já pediu o seguro na vida.
        </p>

        <div className="grid md:grid-cols-3 gap-6 not-prose mb-10">
            {/* Card 1ª Solicitação */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
                <div className="absolute top-0 right-0 p-2 opacity-5"><Briefcase size={60} /></div>
                <div className="inline-block bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs mb-3">1ª Solicitação</div>
                <ul className="text-sm text-slate-600 space-y-2">
                    <li className="flex justify-between border-b border-slate-100 pb-1"><span>12 a 23 meses</span> <strong>4 parcelas</strong></li>
                    <li className="flex justify-between pt-1"><span>24 meses ou mais</span> <strong>5 parcelas</strong></li>
                </ul>
                <p className="text-xs text-slate-400 mt-3 italic">* Exige mínimo de 12 meses trabalhados.</p>
            </div>

            {/* Card 2ª Solicitação */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
                <div className="absolute top-0 right-0 p-2 opacity-5"><Briefcase size={60} /></div>
                <div className="inline-block bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-xs mb-3">2ª Solicitação</div>
                <ul className="text-sm text-slate-600 space-y-2">
                    <li className="flex justify-between border-b border-slate-100 pb-1"><span>9 a 11 meses</span> <strong>3 parcelas</strong></li>
                    <li className="flex justify-between border-b border-slate-100 pb-1 pt-1"><span>12 a 23 meses</span> <strong>4 parcelas</strong></li>
                    <li className="flex justify-between pt-1"><span>24 meses +</span> <strong>5 parcelas</strong></li>
                </ul>
            </div>

            {/* Card 3ª Solicitação */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-purple-300 transition-all">
                <div className="absolute top-0 right-0 p-2 opacity-5"><Briefcase size={60} /></div>
                <div className="inline-block bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full text-xs mb-3">3ª Solicitação</div>
                <ul className="text-sm text-slate-600 space-y-2">
                    <li className="flex justify-between border-b border-slate-100 pb-1"><span>6 a 11 meses</span> <strong>3 parcelas</strong></li>
                    <li className="flex justify-between border-b border-slate-100 pb-1 pt-1"><span>12 a 23 meses</span> <strong>4 parcelas</strong></li>
                    <li className="flex justify-between pt-1"><span>24 meses +</span> <strong>5 parcelas</strong></li>
                </ul>
            </div>
        </div>

        {/* CURIOSIDADE HISTÓRICA */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8 rounded-2xl border border-blue-100 my-10 not-prose relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <History size={140} className="text-blue-900"/>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2 relative z-10">
                <BookOpen size={24} className="text-blue-600"/> Você Sabia? A Origem do Benefício
            </h3>
            <div className="space-y-4 text-slate-700 relative z-10 text-sm md:text-base leading-relaxed">
                <p>
                    O Seguro-Desemprego foi criado no Brasil em <strong>1986</strong>, durante o governo Sarney, como parte do famoso "Plano Cruzado".
                </p>
                <p>
                    O objetivo era proteger o trabalhador em momentos de grande instabilidade econômica e hiperinflação. Ele é financiado pelo <strong>FAT (Fundo de Amparo ao Trabalhador)</strong>, que recebe recursos do PIS/PASEP.
                </p>
                <p>
                    Ou seja, é um dinheiro público, gerido pelo governo, mas que vem das contribuições feitas sobre a folha de pagamento das empresas.
                </p>
            </div>
        </div>

        {/* REQUISITOS GERAIS */}
        <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-blue-600" /> Quem tem direito? (Checklist Rápido)
        </h3>
        <ul className="space-y-3 not-prose mb-8">
            <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                <span className="text-slate-700 text-sm">Ter sido dispensado <strong>sem justa causa</strong>.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                <span className="text-slate-700 text-sm">Estar desempregado no momento do requerimento.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                <span className="text-slate-700 text-sm">Não possuir renda própria para o sustento (ex: não ser sócio de empresa ativa com lucro).</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                <span className="text-slate-700 text-sm">Não estar recebendo benefício do INSS (exceto auxílio-acidente ou pensão por morte).</span>
            </li>
        </ul>

        {/* FAQ MONSTRO */}
        <div className="mt-12 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" /> Perguntas Frequentes
          </h3>
          <div className="space-y-3">
            
            <details className="group bg-white p-4 rounded-lg border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center text-sm md:text-base">
                Quem pediu demissão tem direito?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                <strong>Não.</strong> O benefício é exclusivo para demissão involuntária (sem justa causa). Quem pede demissão "escolheu" ficar sem emprego, segundo a lei.
              </p>
            </details>

            <details className="group bg-white p-4 rounded-lg border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center text-sm md:text-base">
                Sou MEI, posso receber?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                Essa é uma pegadinha. O sistema cruza dados. Se você tem um CNPJ MEI <strong>ativo</strong>, o governo presume que você tem renda e bloqueia o seguro. Para receber, você precisa provar que o MEI não gera renda suficiente (declaração anual sem faturamento) ou dar baixa no CNPJ antes de solicitar.
              </p>
            </details>

            <details className="group bg-white p-4 rounded-lg border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center text-sm md:text-base">
                Como dar entrada no benefício?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                Hoje é tudo digital. Baixe o app <strong>Carteira de Trabalho Digital</strong>, vá na aba "Benefícios" e digite o número do requerimento que a empresa te deu na demissão.
              </p>
            </details>

            <details className="group bg-white p-4 rounded-lg border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center text-sm md:text-base">
                Arrumei emprego, perco as parcelas?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                Sim. O seguro é para quem está desempregado. Se sua carteira for assinada novamente, o benefício é suspenso automaticamente na próxima parcela.
              </p>
            </details>

            <details className="group bg-white p-4 rounded-lg border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center text-sm md:text-base">
                O que é a "Multa de 40%"?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                A multa de 40% não tem a ver com o Seguro-Desemprego, ela é sobre o saldo do FGTS. São direitos diferentes, embora ambos sejam pagos na demissão sem justa causa.
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
            <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600"><Briefcase size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Rescisão CLT</span>
                <span className="text-sm text-slate-500 mt-1">Cálculo completo</span>
            </Link>
            <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group">
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600"><Coins size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                <span className="text-sm text-slate-500 mt-1">Descontos mensais</span>
            </Link>
            <Link href="/trabalhista/ferias" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group">
                <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-amber-600"><Calculator size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Calculadora de Férias</span>
                <span className="text-sm text-slate-500 mt-1">Venda de 10 dias</span>
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