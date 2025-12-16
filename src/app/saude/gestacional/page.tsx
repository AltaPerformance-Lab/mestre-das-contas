import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PregnancyCalculator from "@/components/calculators/PregnancyCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  Baby, HelpCircle, BookOpen, Heart, 
  CalendarHeart, Stethoscope, Sparkles, 
  CheckCircle2, Dna, ExternalLink, Coffee, 
  Plane, Utensils, Scissors, AlertTriangle
} from "lucide-react";

// --- METADATA ---
export const metadata: Metadata = {
  title: "Calculadora Gestacional 2025 | DPP, Semanas e Sexo do Bebê",
  description: "Estou grávida de quanto tempo? Calcule a Data Provável do Parto (DPP), descubra o signo do bebê e acompanhe sua gestação semana a semana.",
  keywords: ["calculadora gestacional", "calcular data do parto", "dpp calculadora", "tabela gestacional semanas e meses", "sintomas gravidez semana a semana"],
  alternates: { canonical: "https://mestredascontas.com.br/saude/gestacional" },
  openGraph: {
    title: "Acompanhamento de Gravidez - Mestre das Contas",
    description: "O guia da mamãe moderna. Calcule sua DPP e tire as 20 maiores dúvidas da gestação.",
    url: "https://mestredascontas.com.br/saude/gestacional",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-gestacional.png", width: 1200, height: 630, alt: "Calculadora de Gravidez" }],
  },
};

const faqList = [
  { p: "Como é calculada a data do parto?", r: "Utilizamos a Regra de Naegele: soma-se 7 dias ao primeiro dia da última menstruação e subtrai-se 3 meses (ou adiciona-se 9 meses)." },
  { p: "A data do ultrassom é mais precisa que a DUM?", r: "Sim. O ultrassom do primeiro trimestre (até 12 semanas) é o 'padrão ouro'. Ele mede o comprimento do embrião (CCN) e tem margem de erro de apenas 3 a 5 dias." },
  { p: "Quando dá para ver o sexo do bebê?", r: "Pela sexagem fetal (exame de sangue), a partir da 8ª semana. Pelo ultrassom, geralmente a partir da 16ª semana, mas com certeza absoluta após a 20ª semana (morfológico)." },
  { p: "Estou de quantas semanas e meses?", r: "Essa é a confusão clássica! Médicos contam em semanas. Para saber o mês, consulte nossa tabela abaixo. Basicamente, 40 semanas completam 9 meses e 1 semana." },
  { p: "É normal sentir cólicas no início?", r: "Sim, leves cólicas são normais devido ao crescimento do útero e implantação. Mas se houver sangramento ou dor forte, procure o pronto-socorro imediatamente." },
  { p: "Quando o bebê começa a mexer?", r: "Mães de primeira viagem sentem entre 18 e 22 semanas. Quem já tem filhos pode sentir antes, por volta de 16 semanas. Parece uma 'borboleta' na barriga." },
  { p: "Posso pintar o cabelo na gravidez?", r: "A recomendação geral é evitar tinturas com amônia, especialmente no primeiro trimestre. Tonalizantes e luzes (sem tocar a raiz) costumam ser liberados após 12 semanas, mas consulte seu obstetra." },
  { p: "Grávida pode tomar café?", r: "Sim, mas com moderação. A OMS recomenda limitar a cafeína a 200mg por dia (cerca de 2 xícaras pequenas). Excesso pode aumentar risco de baixo peso ao nascer." },
  { p: "Posso comer comida japonesa (sushi)?", r: "O risco é a contaminação por bactérias ou parasitas no peixe cru. Se for um restaurante de altíssima confiança, alguns médicos liberam. A opção mais segura é comer os peças cozidas ou 'hot rolls'." },
  { p: "É verdade que não pode dormir de barriga para cima?", r: "No final da gravidez, sim. O peso do útero comprime a veia cava, diminuindo o oxigênio para você e para o bebê. A melhor posição é virada para o lado esquerdo." },
  { p: "O que é o tampão mucoso?", r: "É uma secreção gelatinosa (pode ter fios de sangue) que veda o colo do útero. Se ele sair, significa que o trabalho de parto está próximo, mas pode levar horas ou até dias." },
  { p: "Como diferenciar contração de treinamento e de parto?", r: "As de treinamento (Braxton Hicks) são irregulares e param se você mudar de posição. As de parto são ritmadas, ficam mais fortes e mais próximas com o tempo." },
  { p: "Pode viajar de avião grávida?", r: "Geralmente sim, até 36 semanas (com atestado médico após 28 semanas). O ideal é caminhar no corredor a cada hora para evitar trombose." },
  { p: "O que causa azia na gravidez?", r: "O hormônio progesterona relaxa a válvula do estômago, e o útero crescendo aperta o estômago para cima. Comer pouco e várias vezes ao dia ajuda." },
  { p: "Como evitar estrias?", r: "Hidratação é a chave. Beba muita água e use óleos/cremes específicos para gestantes (óleo de amêndoas, rosa mosqueta) na barriga, seios e quadril duas vezes ao dia." },
  { p: "Grávida pode fazer exercícios?", r: "Se não houver contraindicação médica (como placenta prévia), deve! Caminhada, hidroginástica e pilates são excelentes para preparar o corpo para o parto." },
  { p: "Inchaço nos pés é perigoso?", r: "Leve inchaço no final do dia é normal. Mas inchaço súbito, principalmente no rosto e mãos, acompanhado de dor de cabeça, pode ser sinal de pré-eclâmpsia (pressão alta). Meça a pressão." },
  { p: "Até quando posso trabalhar?", r: "Depende da sua disposição e saúde. Muitas mulheres trabalham até o dia do parto. A licença-maternidade pode começar até 28 dias antes da data prevista." },
  { p: "O que levar na mala da maternidade?", r: "Documentos, plano de parto, roupas para o bebê (6 trocas), fraldas, roupas confortáveis para você (pijama com abertura para amamentar) e itens de higiene." },
  { p: "O que é o puerpério?", r: "É o período pós-parto (resguardo), onde os hormônios despencam e o corpo volta ao normal. Dura cerca de 40 dias e pode envolver oscilações de humor (baby blues)." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora Gestacional",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta completa para acompanhamento gestacional, cálculo de DPP e fases do bebê."
    },
    {
      "@type": "MedicalWebPage",
      "name": "Guia da Gestação Semana a Semana",
      "about": { "@type": "MedicalCondition", "name": "Gravidez" },
      "audience": { "@type": "Patient", "audienceType": "Gestantes" },
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.p,
        "acceptedAnswer": { "@type": "Answer", "text": item.r }
      }))
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function GestacionalPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-pink-50/30 p-2 sm:p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center text-pink-400">Carregando Calculadora...</div>}>
                    <PregnancyCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredascontas.com.br/saude/gestacional" target="_blank" className="text-[10px] text-pink-400 hover:text-pink-600 uppercase font-bold tracking-wider">
                        Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- CORREÇÃO DE LAYOUT MOBILE: w-full e px-3 no container principal ---
  return (
    <article className="flex flex-col gap-6 md:gap-8 w-full max-w-full overflow-x-hidden px-3 md:px-6 py-4 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="space-y-4 text-center md:text-left print:hidden max-w-4xl mx-auto md:mx-0 w-full">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-pink-100 text-pink-800 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-pink-200">
          <Baby size={14} /> Maternidade & Família
        </span>
        <h1 className="text-2xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
          Calculadora <span className="text-pink-500">Gestacional 2025</span>
        </h1>
        <p className="text-sm md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          O milagre da vida começou! Calcule a Data Provável do Parto (DPP), descubra se é menino ou menina e tire todas as suas dúvidas.
        </p>
      </header>

      <div className="w-full flex justify-center bg-pink-50/30 rounded-lg border border-dashed border-pink-200/50 my-2 md:my-4 print:hidden">
         <AdUnit slot="gest_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-pink-50 rounded-xl animate-pulse flex items-center justify-center text-pink-300">Carregando Calculadora...</div>}>
           <PregnancyCalculator />
        </Suspense>
        <div className="mt-6 md:mt-8 print:hidden"><DisclaimerBox /></div>
      </section>

      <div className="w-full flex justify-center my-4 md:my-6 print:hidden"><AdUnit slot="gest_mid" format="auto" /></div>

      {/* --- CORREÇÃO DE ARTIGO: p-4 no mobile, p-10 no desktop --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-4 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        <h2 className="text-xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-2 border-l-4 border-pink-400 pl-4">
            Parabéns, mamãe! E agora?
        </h2>
        <p className="lead text-slate-700 text-base md:text-lg">
          Aquele segundo em que o teste dá positivo é indescritível. É um misto de alegria, medo e uma pergunta que não cala: <strong>"De quanto tempo eu estou?"</strong>.
        </p>
        <p>
          Calma, respira. Nós vamos te ajudar a decifrar a "matemática da gravidez". Diferente do que pensamos, a gravidez não começa no dia que o bebê foi feito (concepção), mas sim no primeiro dia da sua última menstruação.
        </p>

        {/* TABELA COM SCROLL HORIZONTAL (CORREÇÃO DE QUEBRA) */}
        <div className="not-prose my-8 md:my-10 w-full">
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CalendarHeart className="text-purple-500" /> Tabela Oficial: Semanas x Meses
            </h3>
            <p className="text-slate-600 mb-4 text-sm md:text-base">A dúvida número 1: "Doutor, 24 semanas são quantos meses?". Salve esta tabela:</p>
            
            <div className="overflow-x-auto border rounded-xl border-slate-200 shadow-sm w-full">
                <table className="w-full text-xs md:text-sm text-left min-w-[500px]">
                    <thead className="bg-pink-50 text-pink-900 uppercase">
                        <tr>
                            <th className="px-3 md:px-4 py-3 font-bold whitespace-nowrap">Trimestre</th>
                            <th className="px-3 md:px-4 py-3 font-bold whitespace-nowrap">Mês</th>
                            <th className="px-3 md:px-4 py-3 font-bold whitespace-nowrap">Semanas</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="bg-white"><td className="px-3 md:px-4 py-3 font-bold text-slate-500" rowSpan={3}>1º Trimestre</td><td className="px-3 md:px-4 py-3">Mês 1</td><td className="px-3 md:px-4 py-3">0 a 4 sem e meia</td></tr>
                        <tr className="bg-white"><td className="px-3 md:px-4 py-3">Mês 2</td><td className="px-3 md:px-4 py-3">4 e meia a 9 sem</td></tr>
                        <tr className="bg-white"><td className="px-3 md:px-4 py-3">Mês 3</td><td className="px-3 md:px-4 py-3">9 a 13 sem e meia</td></tr>
                        
                        <tr className="bg-slate-50"><td className="px-3 md:px-4 py-3 font-bold text-slate-500" rowSpan={3}>2º Trimestre</td><td className="px-3 md:px-4 py-3">Mês 4</td><td className="px-3 md:px-4 py-3">13 e meia a 18 sem</td></tr>
                        <tr className="bg-slate-50"><td className="px-3 md:px-4 py-3">Mês 5</td><td className="px-3 md:px-4 py-3">18 a 22 sem e meia</td></tr>
                        <tr className="bg-slate-50"><td className="px-3 md:px-4 py-3">Mês 6</td><td className="px-3 md:px-4 py-3">22 e meia a 27 sem</td></tr>

                        <tr className="bg-white"><td className="px-3 md:px-4 py-3 font-bold text-slate-500" rowSpan={3}>3º Trimestre</td><td className="px-3 md:px-4 py-3">Mês 7</td><td className="px-3 md:px-4 py-3">27 a 31 sem e meia</td></tr>
                        <tr className="bg-white"><td className="px-3 md:px-4 py-3">Mês 8</td><td className="px-3 md:px-4 py-3">31 e meia a 36 sem</td></tr>
                        <tr className="bg-pink-100/50"><td className="px-3 md:px-4 py-3 text-pink-700 font-bold">Mês 9</td><td className="px-3 md:px-4 py-3 font-bold text-pink-700">36 a 42 semanas</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="w-full flex justify-center my-6 md:my-8 print:hidden"><AdUnit slot="gest_content" format="auto" /></div>

        <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-8 md:mt-10 mb-4 md:mb-6 flex items-center gap-2">
            <Stethoscope className="text-teal-600" /> Regra de Naegele: A Ciência por Trás
        </h3>
        <p className="text-sm md:text-base">
            A calculadora usa um método criado pelo obstetra alemão Franz Naegele no século 19. Ele percebeu que a gestação humana dura em média <strong>280 dias</strong>.
        </p>
        <p className="text-sm md:text-base">
            Mas atenção: apenas <strong>5% dos bebês</strong> nascem na data exata (DPP). A maioria decide vir ao mundo entre 38 e 41 semanas. A DPP é apenas um norte!
        </p>

        {/* CURIOSIDADE */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 md:p-8 rounded-2xl border border-purple-100 my-8 md:my-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={120} className="text-purple-900"/>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-purple-900 mb-3 md:mb-4 flex items-center gap-2 relative z-10">
                <Dna size={24} className="text-pink-500"/> Mito ou Verdade: A Lua Influencia?
            </h3>
            <div className="space-y-4 text-slate-700 relative z-10 text-sm md:text-base leading-relaxed">
                <p>
                    Acredite se quiser: muitas parteiras juram que nas <strong>mudanças de lua</strong> (especialmente na Lua Cheia) as maternidades lotam.
                </p>
                <p>
                    Embora a ciência não tenha comprovado uma ligação direta entre a gravidade lunar e o trabalho de parto, a coincidência é intrigante. Fique de olho no calendário lunar quando estiver chegando perto das 39 semanas!
                </p>
            </div>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-8 md:mt-10 mb-4 md:mb-6 flex items-center gap-2">
            <Heart className="text-red-500" /> Cuidados Essenciais por Trimestre
        </h3>
        
        <div className="grid gap-4 md:gap-6 not-prose">
            <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold mx-auto md:mx-0">1º</div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-1 text-center md:text-left">O Início Delicado (Semana 1 a 13)</h4>
                    <p className="text-sm text-slate-600 text-center md:text-left">É a fase de formação dos órgãos. O ácido fólico é obrigatório. Enjoos e sono excessivo são comuns. Evite remédios sem prescrição.</p>
                </div>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold mx-auto md:mx-0">2º</div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-1 text-center md:text-left">A Fase de Ouro (Semana 14 a 27)</h4>
                    <p className="text-sm text-slate-600 text-center md:text-left">A disposição volta! A barriga aparece, você sente o bebê mexer e descobre o sexo. Hora de cuidar das estrias.</p>
                </div>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold mx-auto md:mx-0">3º</div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-1 text-center md:text-left">A Reta Final (Semana 28 a 40+)</h4>
                    <p className="text-sm text-slate-600 text-center md:text-left">O peso aumenta, o cansaço volta e a ansiedade bate. Prepare a mala da maternidade e descanse o máximo possível.</p>
                </div>
            </div>
        </div>

        {/* 20 PERGUNTAS FREQUENTES */}
        <div className="mt-12 md:mt-16 not-prose" id="faq">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-2 border-b pb-4">
              <HelpCircle className="text-pink-500" /> Tira-Dúvidas da Gestante (20 Respostas)
          </h2>
          
          <div className="grid gap-3 md:gap-4">
            {faqList.map((item, idx) => (
                <details key={idx} className="group bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-pink-100 transition-all">
                    <summary className="font-semibold text-slate-800 list-none flex justify-between items-center text-sm md:text-base">
                        <div className="flex items-center gap-3">
                            <span className="text-pink-400 font-bold text-xs md:text-sm">#{idx + 1}</span>
                            <span className="leading-snug">{item.p}</span>
                        </div>
                        <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2">▼</span>
                    </summary>
                    <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm md:text-base">
                        {item.r}
                    </p>
                </details>
            ))}
          </div>
        </div>

        {/* FONTES */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose bg-slate-50 p-4 md:p-6 rounded-xl">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Base Científica</h3>
            <p className="text-xs text-slate-500 mb-3">Este conteúdo foi elaborado com base nas diretrizes das principais instituições de saúde:</p>
            <div className="flex flex-wrap gap-3 md:gap-4 text-xs font-medium text-blue-600">
                <a href="https://www.febrasgo.org.br" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border">FEBRASGO <ExternalLink size={10}/></a>
                <a href="https://www.gov.br/saude/pt-br" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border">Ministério da Saúde <ExternalLink size={10}/></a>
                <a href="https://www.acog.org" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border">ACOG (EUA) <ExternalLink size={10}/></a>
            </div>
        </div>

      </div>
    </article>
  );
}