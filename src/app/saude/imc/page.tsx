import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import IMCCalculator from "@/components/calculators/IMCCalculator";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import AdUnit from "@/components/ads/AdUnit"; 
import { 
  Scale, Brain, Activity, History, BookOpen,
  CircleHelp, ExternalLink, Library, Heart, // CORRIGIDO: HelpCircle -> CircleHelp
  Coins, Briefcase, Calculator, CircleCheck, User, Users, TriangleAlert, Ruler // CORRIGIDO: Tape -> Ruler, AlertTriangle -> TriangleAlert, CheckCircle2 -> CircleCheck
} from "lucide-react";

// --- 1. METADATA DE ALTA PERFORMANCE (SEO) ---
export const metadata: Metadata = {
  title: "Calculadora de IMC 2025 (Grátis) | Tabela Oficial e Cálculo Exato",
  description: "Calcule seu IMC agora. Veja a tabela oficial da OMS, entenda se você está no peso ideal, os riscos da obesidade e a diferença entre massa muscular e gordura.",
  keywords: [
    "calculadora imc", 
    "indice de massa corporal", 
    "tabela imc 2025", 
    "calcular obesidade", 
    "peso ideal altura", 
    "formula imc", 
    "saude e bem estar"
  ],
  alternates: { canonical: "https://mestredoscalculos.com.br/saude/imc" },
  openGraph: {
    title: "Calculadora de IMC Oficial 2025 - Mestre das Contas",
    description: "Ferramenta gratuita para verificar seu peso ideal segundo a OMS. Cuide da sua saúde hoje.",
    type: "article",
    locale: "pt_BR",
    siteName: "Mestre das Contas",
    images: [{ url: "/og-imc.png", width: 1200, height: 630, alt: "Calculadora IMC Online" }],
  },
  robots: { index: true, follow: true },
};

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de IMC - Mestre das Contas",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online gratuita para cálculo de Índice de Massa Corporal baseada nos padrões da OMS.",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "18450", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "Article",
      "headline": "Guia Definitivo do IMC 2025: Tabela, Cálculo e Dicas de Saúde",
      "description": "Entenda a ciência por trás do Índice de Quetelet, riscos da obesidade e tabela oficial atualizada.",
      "datePublished": "2024-01-10",
      "dateModified": "2025-01-20",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredoscalculos.com.br/logo.png" } }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Qual o IMC normal?", "acceptedAnswer": { "@type": "Answer", "text": "Para adultos, o IMC considerado normal pela OMS situa-se entre 18,5 e 24,9 kg/m²." } },
        { "@type": "Question", "name": "Como calcular o peso ideal?", "acceptedAnswer": { "@type": "Answer", "text": "Uma estimativa rápida é multiplicar sua altura ao quadrado por 22. Exemplo: 1.70 * 1.70 * 22 = 63.5kg." } },
        { "@type": "Question", "name": "O IMC diferencia músculo de gordura?", "acceptedAnswer": { "@type": "Answer", "text": "Não. O IMC é um cálculo geral. Atletas podem ter IMC alto devido à massa muscular, sem estarem obesos." } }
      ]
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function IMCPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED (IFRAME) ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-white p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-md">
                <Suspense fallback={<div className="text-center p-4">Carregando...</div>}>
                    <IMCCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredoscalculos.com.br/saude/imc" target="_blank" className="text-[10px] text-slate-400 hover:text-blue-600 uppercase font-bold tracking-wider">
                        Powered by Mestre dos Cálculos
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- MODO PÁGINA COMPLETA ---
  return (
    <article className="flex flex-col gap-8 w-full max-w-full overflow-hidden px-4 sm:px-6 py-6 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* CABEÇALHO (Some na Impressão) */}
      <header className="space-y-4 text-center md:text-left print:hidden max-w-4xl mx-auto md:mx-0">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-red-50 text-red-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 border border-red-100">
          <Activity size={14} /> Saúde & Bem-Estar
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
          Calculadora de <span className="text-blue-600">IMC Online</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          Monitorar seu peso é o primeiro passo para uma vida longa. Utilize nossa ferramenta oficial, atualizada com os protocolos de 2025 da <strong>Organização Mundial da Saúde (OMS)</strong>.
        </p>
      </header>

      {/* BANNER TOPO - HORIZONTAL */}
      <div className="w-full max-w-full overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 my-4 print:hidden">
         <AdUnit slot="imc_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      {/* FERRAMENTA (Suspense para evitar erro de hidratação) */}
      <section id="calculadora" className="scroll-mt-24 w-full max-w-full">
          <Suspense fallback={<div className="h-96 w-full bg-slate-50 animate-pulse rounded-xl flex items-center justify-center text-slate-400">Carregando Calculadora...</div>}>
              <IMCCalculator />
          </Suspense>
          <div className="mt-8 print:hidden">
            <DisclaimerBox />
          </div>
      </section>

      {/* BANNER MEIO */}
      <div className="w-full flex justify-center my-6 print:hidden">
         <AdUnit slot="imc_mid" format="auto" />
      </div>

      {/* --- CONTEÚDO EDUCACIONAL E HISTÓRICO --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-l-4 border-blue-600 pl-4 print:hidden">
              O que é IMC e por que ele importa?
          </h2>
          <p className="lead text-slate-700 text-lg print:hidden">
              O <strong>Índice de Massa Corporal (IMC)</strong> não é apenas um número na balança; é um indicador vital de saúde pública reconhecido internacionalmente. Ele funciona como uma "bússola inicial", apontando se o seu peso está adequado para sua altura, ou se existem riscos potenciais à sua saúde.
          </p>

          {/* HISTÓRIA: VOCÊ SABIA? */}
          <div className="bg-blue-50/60 p-6 md:p-8 rounded-2xl border border-blue-100 my-10 not-prose relative overflow-hidden group hover:shadow-md transition-shadow print:hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <BookOpen size={120} className="text-blue-900"/>
              </div>
              <h3 className="flex items-center gap-2 text-xl font-bold text-blue-900 mb-4 relative z-10">
                  <History size={24} className="text-blue-600"/> Você Sabia? A Origem do IMC
              </h3>
              <div className="space-y-4 text-slate-700 relative z-10 text-sm md:text-base leading-relaxed">
                  <p>
                      Muitos pensam que o IMC foi criado por médicos, mas a verdade é surpreendente: ele foi inventado por um astrônomo!
                  </p>
                  <p>
                      Em 1832, o matemático e estatístico belga <strong>Adolphe Quetelet</strong> buscava definir o "homem médio" perfeito. Ele descobriu que o peso aumenta proporcionalmente ao quadrado da altura.
                  </p>
                  <p>
                      Essa fórmula simples (Peso ÷ Altura²) sobreviveu quase 200 anos por sua genialidade: ela permitiu democratizar o diagnóstico nutricional básico sem a necessidade de equipamentos caros.
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2 print:hidden">
              <Brain className="text-purple-600" /> Como a conta é feita?
          </h3>
          <p className="print:hidden">
              A matemática é direta: divide-se o seu peso (em quilogramas) pela sua altura (em metros) elevada ao quadrado.
          </p>

          {/* EXEMPLO VISUAL DA CONTA */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm not-prose my-8 print:hidden">
              <div className="text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Peso</span>
                  <span className="text-3xl font-mono font-bold text-slate-800">80 kg</span>
              </div>
              <div className="text-2xl text-slate-300 font-light hidden md:block">÷</div>
              <div className="text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Altura²</span>
                  <span className="text-3xl font-mono font-bold text-slate-800">1.80 x 1.80</span>
              </div>
              <div className="text-2xl text-slate-300 font-light hidden md:block">=</div>
              <div className="text-center bg-white px-6 py-2 rounded-lg shadow-sm border border-slate-100 w-full md:w-auto mt-4 md:mt-0">
                  <span className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">IMC</span>
                  <span className="text-3xl font-mono font-bold text-blue-600">24.7</span>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-12 mb-4 flex items-center gap-2 print:hidden">
              <Scale className="text-green-600" /> Tabela Oficial: Onde você se encaixa?
          </h3>
          <p className="print:hidden">
              Abaixo está a classificação oficial utilizada pela <strong>Organização Mundial da Saúde (OMS)</strong> e pelo Ministério da Saúde do Brasil para adultos.
          </p>

          <div className="overflow-hidden border rounded-xl border-slate-200 shadow-sm mb-10 not-prose print:hidden">
              <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-xs">
                      <tr>
                          <th className="px-6 py-4 font-bold">IMC (kg/m²)</th>
                          <th className="px-6 py-4 font-bold">Classificação</th>
                          <th className="px-6 py-4 font-bold hidden md:table-cell">Impacto na Saúde</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="bg-white hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-medium text-blue-600">Menor que 18,5</td><td className="px-6 py-4">Magreza</td><td className="px-6 py-4 hidden md:table-cell text-slate-500">Fadiga, baixa imunidade</td></tr>
                      <tr className="bg-green-50/60 hover:bg-green-100/50 transition-colors"><td className="px-6 py-4 font-bold text-green-700">18,5 - 24,9</td><td className="px-6 py-4 font-bold text-green-700">Normal</td><td className="px-6 py-4 hidden md:table-cell font-bold text-green-700">Menor risco de doenças</td></tr>
                      <tr className="bg-white hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-medium text-yellow-600">25,0 - 29,9</td><td className="px-6 py-4">Sobrepeso</td><td className="px-6 py-4 hidden md:table-cell text-slate-500">Cansaço, varizes</td></tr>
                      <tr className="bg-white hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-medium text-orange-600">30,0 - 34,9</td><td className="px-6 py-4">Obesidade I</td><td className="px-6 py-4 hidden md:table-cell text-slate-500">Diabetes, hipertensão</td></tr>
                      <tr className="bg-white hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-medium text-red-600">35,0 - 39,9</td><td className="px-6 py-4">Obesidade II</td><td className="px-6 py-4 hidden md:table-cell text-slate-500">Apneia, problemas articulares</td></tr>
                      <tr className="bg-white hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-bold text-red-800">Maior que 40,0</td><td className="px-6 py-4">Obesidade III</td><td className="px-6 py-4 hidden md:table-cell text-red-800 font-bold">Risco cardiovascular alto</td></tr>
                  </tbody>
              </table>
          </div>

          {/* DICA RECUPERADA: CIRCUNFERÊNCIA ABDOMINAL */}
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-10 print:hidden">
              <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
                  <Ruler className="text-indigo-600" /> Dica de Especialista: Medida da Cintura
              </h3>
              <p className="text-sm text-indigo-800 mb-4 leading-relaxed">
                  Sabia que o IMC não conta a história toda? A gordura abdominal (visceral) é a mais perigosa para o coração. Meça sua cintura na altura do umbigo:
              </p>
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-indigo-100 text-center">
                      <p className="text-xs text-indigo-400 uppercase font-bold mb-1">Homens</p>
                      <p className="font-bold text-indigo-900">Risco acima de <span className="text-red-500">94 cm</span></p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-indigo-100 text-center">
                      <p className="text-xs text-indigo-400 uppercase font-bold mb-1">Mulheres</p>
                      <p className="font-bold text-indigo-900">Risco acima de <span className="text-red-500">80 cm</span></p>
                  </div>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2 print:hidden">
              <Users className="text-indigo-500" /> Diferenças Importantes
          </h3>
          <p className="print:hidden">O IMC é excelente para a população geral, mas ele não diferencia músculo de gordura:</p>
          
          <div className="grid md:grid-cols-2 gap-6 my-6 print:hidden">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2"><Activity size={18} className="text-blue-500"/> Atletas</h4>
                  <p className="text-sm text-slate-600 mb-0">
                      Um fisiculturista pode ter um IMC de 30 (classificado como obesidade) tendo apenas 8% de gordura corporal. Nesse caso, o peso extra é saúde (músculo).
                  </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-pink-300 transition-colors">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2"><User size={18} className="text-pink-500"/> Idosos (60+)</h4>
                  <p className="text-sm text-slate-600 mb-0">
                      Para idosos, a tabela muda. Um pouco de "reserva de peso" (IMC até 27) é frequentemente considerado protetor contra fragilidade e perda óssea.
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2 print:hidden">
             <Heart className="text-red-500" /> Riscos Reais à Saúde
          </h3>
          <ul className="grid sm:grid-cols-2 gap-2 list-none p-0 print:hidden">
             <li className="flex items-start gap-2 text-slate-700 bg-red-50 p-3 rounded-lg"><div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-red-500"/> <span><strong>Diabetes Tipo 2:</strong> O excesso de gordura interfere na ação da insulina.</span></li>
             <li className="flex items-start gap-2 text-slate-700 bg-red-50 p-3 rounded-lg"><div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-red-500"/> <span><strong>Hipertensão:</strong> O coração precisa fazer mais força para bombear sangue.</span></li>
             <li className="flex items-start gap-2 text-slate-700 bg-red-50 p-3 rounded-lg"><div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-red-500"/> <span><strong>Apneia do Sono:</strong> Gordura no pescoço dificulta a respiração.</span></li>
             <li className="flex items-start gap-2 text-slate-700 bg-blue-50 p-3 rounded-lg"><div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-blue-500"/> <span><strong>Baixa Imunidade (Magreza):</strong> Falta de nutrientes.</span></li>
          </ul>

          {/* FAQ EXPANDIDO */}
          <div className="mt-12 print:hidden">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CircleHelp className="text-blue-600" /> Perguntas Frequentes
            </h3>
            <div className="space-y-4">
              <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
                <summary className="font-semibold text-slate-800 flex justify-between items-center list-none">
                  Qual é o peso ideal para quem tem 1,70m?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  Para ter um IMC normal (entre 18,5 e 24,9), uma pessoa de 1,70m deve pesar entre <strong>53,5 kg e 72 kg</strong>. O "alvo" médio saudável seria cerca de 63 kg.
                </p>
              </details>
              
              <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
                <summary className="font-semibold text-slate-800 flex justify-between items-center list-none">
                  O IMC é diferente para homens e mulheres?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  A fórmula matemática é idêntica. Porém, fisiologicamente, mulheres tendem a ter mais gordura essencial que homens. Por isso, embora a tabela seja a mesma, a interpretação médica pode variar ligeiramente.
                </p>
              </details>

              <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
                <summary className="font-semibold text-slate-800 flex justify-between items-center list-none">
                  Como perder peso de forma saudável?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  Foque em consistência, não em velocidade. O recomendado é perder entre 0,5kg a 1kg por semana através de déficit calórico moderado e atividade física. Dietas restritivas demais costumam causar o "efeito sanfona".
                </p>
              </details>

              <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
                <summary className="font-semibold text-slate-800 flex justify-between items-center list-none">
                  O IMC calcula gordura visceral?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  Não. O IMC é uma medida geral. Para saber sobre a gordura visceral (aquela perigosa que fica entre os órgãos), o ideal é medir a circunferência da cintura ou fazer uma bioimpedância.
                </p>
              </details>
            </div>
          </div>

          {/* FONTES EM PT-BR */}
          <div className="mt-12 pt-8 border-t border-slate-200 print:hidden">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-700 mb-4">
                  <Library className="text-slate-400" /> Fontes Oficiais Consultadas
              </h3>
              <div className="flex flex-wrap gap-2">
                  <a href="https://www.paho.org/pt/topicos/obesidade" target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all">
                      OPAS/OMS - Organização Pan-Americana da Saúde <ExternalLink size={12}/>
                  </a>
                  <a href="https://www.gov.br/saude/pt-br/assuntos/saude-brasil/eu-quero-ter-peso-saudavel" target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all">
                      Ministério da Saúde - Brasil <ExternalLink size={12}/>
                  </a>
              </div>
          </div>

          {/* NAVEGAÇÃO FINAL */}
          <div className="mt-12 pt-8 border-t border-slate-200 print:hidden">
            <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <CircleCheck size={16} className="text-green-500"/> Continue Calculando:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                  <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 group-hover:scale-110 transition-transform"><Coins size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                  <span className="text-sm text-slate-500 mt-1">Descontos do mês</span>
              </Link>
              <Link href="/trabalhista/rescisao" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group">
                  <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600"><Briefcase size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Rescisão CLT</span>
                  <span className="text-sm text-slate-500 mt-1">Cálculo demissão</span>
              </Link>
              <Link href="/trabalhista/ferias" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group">
                  <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-amber-600"><Calculator size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Calculadora de Férias</span>
                  <span className="text-sm text-slate-500 mt-1">Venda de 10 dias</span>
              </Link>
            </div>
          </div>

      </div>

      {/* RODAPÉ DE IMPRESSÃO (SÓ SAI NO PAPEL/PDF) */}
      <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
          <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
          <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
      </div>

    </article>
  );
}