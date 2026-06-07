import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import { calculateCalorias } from "@/lib/calculators/health";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox"; 
import PageHeader from "@/components/layout/PageHeader";
import { 
  Flame, HelpCircle, BookOpen, Activity, 
  Scale, Utensils, Zap, 
  CheckCircle2, TrendingUp, Apple, Briefcase,
  Dna, AlertTriangle, ArrowRight, ShieldCheck, TrendingDown
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO 2026) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Calorias Diárias 2026 | TMB e Gasto Calórico Total";
  const description = "Calcule sua Taxa Metabólica Basal (TMB) e Gasto Calórico Total em segundos. Planeje sua dieta de 2026 com precisão científica e gratuitamente.";

  return {
    title,
    description,
    keywords: ["calculadora de calorias", "taxa metabólica basal", "calcular tmb", "tdee calculator", "dieta para emagrecer"],
    alternates: { canonical: "https://mestredascontas.com.br/saude/calorias-diarias" },
    openGraph: {
      title: "Calculadora de Calorias Diárias 2026 | TMB e Gasto Total",
      description: "Saiba exatamente quantas calorias seu corpo gasta por dia e planeje sua dieta para emagrecer ou ganhar massa. Grátis e preciso.",
      url: "https://mestredascontas.com.br/saude/calorias-diarias",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Calorias Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Quantas calorias você queima por dia?",
      description: "Use nossa calculadora de TMB e Gasto Calórico para ajustar seu plano alimentar.",
      images: ["/opengraph-image"],
    }
  };
}

const faqList = [
    { q: "Afinal, o que é a Taxa Metabólica Basal (TMB) e por que ela importa tanto?", a: "Pense na TMB como a energia que seu corpo gasta só para manter as 'luzes acesas' se você ficasse o dia inteiro deitado na cama. Ela mantém seu coração batendo, seus pulmões funcionando e seu cérebro ativo. É o ponto de partida de qualquer dieta: você nunca deve comer menos que a sua TMB, senão o seu corpo entra em 'modo de sobrevivência' e trava a perda de gordura." },
    { q: "Qual a diferença real entre TMB e o Gasto Calórico Total (GET)?", a: "Enquanto a TMB é o seu gasto em repouso absoluto, o GET é a vida real acontecendo. O GET pega a sua TMB e soma com as calorias que você gasta tomando banho, trabalhando, caminhando e treinando. É o GET que dita se você vai engordar ou emagrecer." },
    { q: "Qual o tamanho do déficit calórico que eu preciso fazer para emagrecer?", a: "A regra de ouro da nutrição moderna é a sustentabilidade. Para um emagrecimento saudável (focado em perder gordura e não músculo), os especialistas recomendam um déficit de 300 a 500 calorias abaixo do seu GET. Dietas malucas com 1000 calorias de déficit só vão te deixar frustrado e causar o efeito sanfona." },
    { q: "É possível perder gordura e ganhar massa muscular ao mesmo tempo?", a: "Sim, é o famoso processo de 'recomposição corporal'. Porém, ele é mais comum e rápido em iniciantes na musculação, pessoas com sobrepeso ou quem está voltando a treinar após muito tempo. Exige um leve déficit calórico (cerca de 200 calorias) aliado a um alto consumo de proteínas e treino pesado." },
    { q: "Por que as proteínas são tão recomendadas em dietas de perda de peso?", a: "A proteína é a sua maior aliada por dois motivos. Primeiro: saciedade. Ela te deixa cheio por muito mais tempo. Segundo: o 'Efeito Térmico dos Alimentos'. O seu corpo gasta cerca de 20% a 30% das próprias calorias da proteína só para conseguir digeri-la, o que ajuda na queima passiva." },
    { q: "Eu realmente preciso contar calorias todos os dias?", a: "Contar calorias é como usar o GPS em uma viagem. Você não precisa usar para sempre, mas é essencial nas primeiras semanas para você 'aprender o caminho' e ter noção real do tamanho das porções. Muitas pessoas juram que comem pouco, mas exageram em alimentos calóricos 'saudáveis' como azeite e pasta de amendoim." },
    { q: "Se eu furar a dieta no fim de semana, jogo tudo a perder?", a: "De forma alguma! O corpo não zera a conta à meia-noite de domingo. O que importa é o balanço calórico semanal. Se você manteve um bom déficit de segunda a sexta, uma refeição livre no fim de semana não vai destruir o seu progresso. O segredo é a consistência, não a perfeição cega." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Calorias Diárias - Mestre das Contas",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta profissional para cálculo de TMB (Taxa Metabólica Basal) e planejamento de déficit ou superávit calórico."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Gasto Calórico e TMB",
      "description": "Descubra como calcular seu gasto calórico total e programar um déficit ou superávit calórico eficiente.",
      "totalTime": "PT30S",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Escolha o Sexo e Insira sua Idade",
          "text": "Selecione o sexo biológico e digite sua idade atual em anos para calibrar a taxa metabólica basal.",
          "url": "https://mestredascontas.com.br/saude/calorias-diarias#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Informe Peso, Altura e Nível de Atividade",
          "text": "Insira seu peso (kg), sua altura (cm) e selecione o seu nível de atividade física semanal (de sedentário a extremamente ativo).",
          "url": "https://mestredascontas.com.br/saude/calorias-diarias#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Selecione seu Objetivo",
          "text": "Escolha se o seu objetivo é perder peso (déficit), manter o peso ou ganhar peso (hipertrofia). O sistema calculará as calorias diárias sugeridas imediatamente.",
          "url": "https://mestredascontas.com.br/saude/calorias-diarias#ferramenta"
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Guia de Calorias e Metabolismo 2026: Como Calcular seu Gasto Real",
      "description": "Entenda como funciona a Taxa Metabólica Basal e como o déficit calórico controlado pode ajudar na perda de peso saudável.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-02-15",
      "dateModified": new Date().toISOString(),
      "image": "https://mestredascontas.com.br/opengraph-image"
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" },
        { "@type": "ListItem", "position": 2, "name": "Saúde", "item": "https://mestredascontas.com.br/saude" },
        { "@type": "ListItem", "position": 3, "name": "Calorias Diárias", "item": "https://mestredascontas.com.br/saude/calorias-diarias" }
      ]
    }
  ]
};

export default async function CaloriasPage() {

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Calorias"
          description="Quer emagrecer, manter o peso ou ganhar massa? Descubra seu gasto calórico real e saiba exatamente quanto consumir por dia."
          category="Saúde & Nutrição"
          icon={<Flame size={32} strokeWidth={2} />}
          variant="health"
          categoryColor="rose"
          badge="Precisão 2026"
          breadcrumbs={[
            { label: "Saúde", href: "/saude" },
            { label: "Calorias Diárias" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        
        {/* REVISÃO DE SAÚDE (E-E-A-T) */}
        <div className="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-orange-700 dark:text-orange-300 mb-2">
          <ShieldCheck size={18} className="text-orange-600 shrink-0" />
          <span>Cálculo fundamentado na Equação de Mifflin-St Jeor, amplamente aceita pela comunidade médica em 2026.</span>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="calorias_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
          <div className="mb-8">
               <PrivacyBadge />
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-orange-100 dark:border-slate-800 shadow-xl shadow-orange-100/50 dark:shadow-none p-1 md:p-2">
                  <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                    <CalorieCalculator />
                  </Suspense>
          </div>
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="calorias_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-orange-500 pl-4">
            A Matemática Escondida do Emagrecimento
          </h2>
          
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Seja muito honesto com você mesmo: quantas vezes você já começou uma "dieta da moda" na segunda-feira e desistiu antes da sexta? A frustração de fechar a boca, passar fome e ver a balança travada é esmagadora.
          </p>

          <p>
            Mas preste muita atenção nisto. O erro não está na sua força de vontade. O erro está em lutar contra a biologia do seu próprio corpo. 
          </p>

          <p>
            Você já ouviu centenas de vezes que o segredo é "comer menos e treinar mais". Parece simples, não é? O grande problema é: <em>quanto a menos?</em> Se você chuta o valor e come pouco demais, o seu metabolismo freia. Se você chuta e come um pouquinho a mais, você acumula gordura. O fim do achismo começa aqui.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6">
            O Motor do Seu Corpo: TMB e GET
          </h3>

          <p>
            Para destrancar o emagrecimento, você precisa conhecer duas siglas que mudam as regras do jogo.
          </p>

          <p>
            A primeira é a <strong>TMB (Taxa Metabólica Basal)</strong>. Imagine que você tire um dia inteiro para fazer maratona de séries no sofá, sem levantar nem para beber água. Mesmo paralisado, seu coração está batendo, seus pulmões estão inflando e seu cérebro está consumindo energia. A TMB é a energia mínima para você continuar vivo.
          </p>

          <p>
            A segunda é o <strong>GET (Gasto Energético Total)</strong>. O seu corpo não fica só no sofá. Você trabalha, limpa a casa, sobe escadas e treina. O GET é a soma da sua TMB com o esforço físico do seu dia a dia. É esse número (o GET) que define as suas roupas.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 flex items-center gap-2 border-l-4 border-orange-500 pl-4">
            O Segredo do Déficit Calórico Sustentável
          </h2>

          <p>
            A verdade nua e crua é que só existe um caminho cientificamente provado para perder barriga: o déficit calórico. Você precisa consumir menos calorias do que o seu corpo gasta (o seu GET). Se a matemática for negativa, o seu corpo não tem escolha a não ser queimar o "estoque de gordura" para gerar energia.
          </p>

          <p>
            Qual é a pegadinha? As pessoas criam déficits absurdos (cortam 1000 calorias por dia). O corpo entra em pânico, aumenta a fome em 10 vezes e sacrifica sua massa muscular. O déficit perfeito e blindado contra o "efeito sanfona" gira em torno de 300 a 500 calorias diárias.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">
            A Batalha dos Macronutrientes (O Que Colocar no Prato)
          </h3>

          <p>
            O próximo passo depois de descobrir suas calorias? Escolher onde investir esse "orçamento". Você poderia comer 1500 calorias só de sorvete? Sim. Você emagreceria? Sim. Você ficaria doente, flácido e com fome mortal? Absolutamente.
          </p>

          <p>
            Para garantir saciedade e preservar os músculos, a distribuição das calorias é vital. Montamos uma tabela para você não se perder na hora de ir ao mercado:
          </p>

          {/* TABELA DE MACROS VISUAL */}
          <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm not-prose">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm md:text-base">
                  <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold">Macronutriente</th>
                  <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold">Calorias por Grama</th>
                  <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold">Função Principal no Corpo</th>
                  <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-center">Exemplos Práticos</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base text-slate-700 dark:text-slate-300">
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <td className="p-4 font-bold text-orange-600 dark:text-orange-400">Proteínas</td>
                  <td className="p-4 text-center font-mono">4 kcal/g</td>
                  <td className="p-4">Construção muscular, alta saciedade e grande queima térmica.</td>
                  <td className="p-4 text-center">Frango, ovos, whey, laticínios magros.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <td className="p-4 font-bold text-blue-600 dark:text-blue-400">Carboidratos</td>
                  <td className="p-4 text-center font-mono">4 kcal/g</td>
                  <td className="p-4">Energia rápida para o cérebro e explosão muscular nos treinos.</td>
                  <td className="p-4 text-center">Arroz, batata, aveia, frutas doces.</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <td className="p-4 font-bold text-yellow-600 dark:text-yellow-400">Gorduras Boas</td>
                  <td className="p-4 text-center font-mono">9 kcal/g</td>
                  <td className="p-4">Regulação hormonal e absorção de vitaminas (A, D, E, K).</td>
                  <td className="p-4 text-center">Azeite, abacate, castanhas, salmão.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden my-12 shadow-2xl not-prose">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Zap size={200} />
              </div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10 text-orange-400">
                  A Regra Psicológica dos 80/20
              </h3>
              <p className="text-slate-300 mb-0 relative z-10 text-lg leading-relaxed">
                  Não tente ser perfeito 100% do tempo. A maioria das pessoas desiste porque cria regras parecidas com uma prisão. Foque em comer "alimentos limpos" da natureza em 80% do seu dia. Use os outros 20% para comer um pedaço de chocolate ou tomar um drink. Se couber nas suas calorias, você vai emagrecer sorrindo.
              </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/10 p-6 md:p-8 rounded-2xl border border-orange-100 dark:border-orange-900/30 my-8 not-prose">
              <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed m-0">
                  <strong>Investimento na sua Carreira:</strong> Assim como planejar o orçamento do seu negócio (<GlossaryTerm slug="capital-de-giro-negocios">capital de giro</GlossaryTerm>) ou organizar as contas do seu <GlossaryTerm slug="mei-microempreendedor-individual">MEI</GlossaryTerm> garante estabilidade de longo prazo, planejar seu gasto calórico garante a energia e produtividade necessárias para se destacar no mercado de trabalho.
              </p>
          </div>

          <p className="text-sm italic text-slate-500 mt-12 pt-6 border-t border-slate-100 dark:border-slate-800">
                Além do gasto calórico, não se esqueça que o processo de saúde envolve <Link href="/saude/imc" className="text-orange-500 font-bold hover:underline">o controle do IMC</Link> e a <Link href="/saude/agua" className="text-orange-500 font-bold hover:underline">sua hidratação correta</Link>.
          </p>

          <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </div>

        <SmartGlossaryLinker currentHref="/saude/calorias-diarias" />
        <SmartCrossLinker currentHref="/saude/calorias-diarias" category="saude" />

        {/* --- FAQ --- */}
        <div className="max-w-4xl mx-auto w-full print:hidden" id="faq">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <HelpCircle className="text-orange-600 dark:text-orange-500" /> Perguntas Frequentes Essenciais
            </h3>
            <div className="space-y-3 not-prose">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                    <summary className="font-semibold text-slate-800 dark:text-slate-100 flex justify-between items-center text-sm md:text-base select-none">
                      <span className="pr-4">{item.q}</span> <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0">▼</span>
                    </summary>
                    <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 animate-in fade-in">
                      {item.a}
                    </p>
                  </details>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Impressão */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}