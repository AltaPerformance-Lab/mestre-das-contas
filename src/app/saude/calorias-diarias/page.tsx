import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  Flame, HelpCircle, BookOpen, Activity, 
  Scale, Utensils, Zap, Trophy, 
  AlertTriangle, CheckCircle2, TrendingUp, Apple, Briefcase
} from "lucide-react";

export const metadata: Metadata = {
  title: "Calculadora de Calorias Diárias 2025 | TMB e Gasto Total (TDEE)",
  description: "Descubra quantas calorias você gasta por dia. Calcule sua Taxa Metabólica Basal (TMB) e monte seu plano para emagrecer ou ganhar massa muscular com a fórmula Mifflin-St Jeor.",
  keywords: [
    "calculadora de calorias", 
    "taxa metabólica basal", 
    "calcular tmb e tdee", 
    "calorias para emagrecer", 
    "dieta flexível", 
    "fórmula mifflin-st jeor",
    "gasto calórico diário"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/saude/calorias-diarias" },
  openGraph: {
    title: "Calculadora de Gasto Calórico (TMB/TDEE) - Mestre das Contas",
    description: "A matemática do corpo humano. Saiba exatamente quanto comer para atingir seu objetivo.",
    url: "https://mestredascontas.com.br/saude/calorias-diarias",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "/og-calorias.png", width: 1200, height: 630, alt: "Calculadora de Calorias" }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Calorias Diárias",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta para cálculo de TMB e necessidade calórica diária baseada na equação de Mifflin-St Jeor."
    },
    {
      "@type": "Article",
      "headline": "A Ciência das Calorias: Como dominar seu metabolismo",
      "description": "Entenda a diferença entre TMB e TDEE e como criar um déficit calórico saudável.",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/logo.png" } }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "O que é Taxa Metabólica Basal (TMB)?", "acceptedAnswer": { "@type": "Answer", "text": "É a quantidade mínima de energia que seu corpo precisa para sobreviver em repouso absoluto." } },
        { "@type": "Question", "name": "Quantas calorias devo cortar para emagrecer?", "acceptedAnswer": { "@type": "Answer", "text": "Um déficit seguro é de 300 a 500 calorias por dia abaixo do seu Gasto Total (TDEE)." } }
      ]
    }
  ]
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function CaloriasPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-white p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
                    <CalorieCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredascontas.com.br/saude/calorias-diarias" target="_blank" className="text-[10px] text-slate-400 hover:text-orange-600 uppercase font-bold tracking-wider">
                        Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  return (
    <article className="flex flex-col gap-8 w-full max-w-full overflow-hidden px-4 sm:px-6 py-6 md:py-10">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="space-y-4 text-center md:text-left print:hidden max-w-4xl mx-auto md:mx-0">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-orange-100 text-orange-800 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 border border-orange-200">
          <Flame size={14} /> Nutrição & Performance
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
          Calculadora de <span className="text-orange-600">Calorias Diárias</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto md:mx-0">
          Você sabe quanto o seu corpo gasta só para existir? Descubra sua <strong>Taxa Metabólica Basal (TMB)</strong> e monte seu plano para emagrecer ou ganhar músculos com precisão científica.
        </p>
      </header>

      <div className="w-full max-w-full overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 my-4 print:hidden">
         <AdUnit slot="calorias_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      <section id="ferramenta" className="scroll-mt-24 w-full max-w-full">
        <Suspense fallback={<div className="w-full h-96 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Carregando Calculadora...</div>}>
           <CalorieCalculator />
        </Suspense>
        <div className="mt-8 print:hidden"><DisclaimerBox /></div>
      </section>

      <div className="w-full flex justify-center my-6 print:hidden"><AdUnit slot="calorias_mid" format="auto" /></div>

      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full print:hidden">
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-orange-500 pl-4">
            A Matemática do Corpo Humano
        </h2>
        <p className="lead text-slate-700 text-lg">
          Muitas pessoas acham que emagrecer é sorte ou genética, mas na verdade é <strong>termodinâmica</strong>. Seu corpo é uma máquina que consome energia (calorias) para funcionar.
        </p>
        <p>
          Para controlar seu peso, você precisa conhecer dois números mágicos: a sua <strong>TMB</strong> e o seu <strong>Gasto Total (TDEE)</strong>. Vamos entender a diferença?
        </p>

        <div className="grid md:grid-cols-2 gap-6 not-prose my-10">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-600 flex items-center gap-2 mb-3 text-lg">
                    <Activity className="text-blue-500" size={24} /> TMB (Metabolismo Basal)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    É quanto seu corpo gasta <strong>em repouso absoluto</strong>, só para manter você vivo (respirar, pensar, bater o coração). Representa cerca de 60-70% do seu gasto diário.
                </p>
                <div className="bg-white p-3 rounded border border-slate-200 text-xs text-slate-500">
                    Ex: Dormir o dia todo = ~1500 kcal
                </div>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 shadow-sm">
                <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-3 text-lg">
                    <Zap className="text-orange-600" size={24} /> TDEE (Gasto Total)
                </h3>
                <p className="text-sm text-orange-900/80 leading-relaxed mb-4">
                    É a soma da TMB + suas atividades (trabalho, academia, caminhar). É esse número que define se você engorda ou emagrece.
                </p>
                <div className="bg-white p-3 rounded border border-orange-200 text-xs font-bold text-orange-600">
                    Ex: Sua vida real = ~2200 kcal
                </div>
            </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
            <BookOpen className="text-indigo-600" /> Por que usamos Mifflin-St Jeor?
        </h3>
        <p>
            Existem várias fórmulas, mas nossa calculadora utiliza a equação de <strong>Mifflin-St Jeor</strong>, criada em 1990.
        </p>
        <p>
            Estudos mostram que ela é a mais precisa para a população moderna, com uma margem de erro menor que as fórmulas antigas (como Harris-Benedict), tanto para pessoas magras quanto para pessoas com sobrepeso.
        </p>

        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl text-white my-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
                <Utensils size={150} className="text-white"/>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                <Apple size={24} className="text-green-400"/> O Segredo Oculto: Efeito Térmico
            </h3>
            <div className="space-y-4 text-slate-300 relative z-10 leading-relaxed text-base md:text-lg">
                <p>
                    Você sabia que comer também gasta calorias? Isso se chama <strong>Efeito Térmico dos Alimentos (TEF)</strong>.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Gorduras:</strong> Gastam apenas 0-3% das calorias para serem digeridas.</li>
                    <li><strong>Carboidratos:</strong> Gastam cerca de 5-10%.</li>
                    <li><strong>Proteínas:</strong> Gastam incríveis <strong>20-30%</strong>!</li>
                </ul>
                <p>
                    Isso significa que, se você comer 100 kcal de proteína, seu corpo absorve apenas cerca de 75 kcal, pois gasta 25 kcal na digestão. Por isso dietas ricas em proteína ajudam tanto no emagrecimento.
                </p>
            </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mt-12 mb-6 flex items-center gap-2">
            <Trophy className="text-yellow-500" /> Monte sua Estratégia
        </h3>
        
        <div className="space-y-6 not-prose">
            <div className="flex gap-4 items-start">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0 mt-1"><Scale size={20}/></div>
                <div>
                    <h4 className="font-bold text-slate-900">Para Perder Peso (Cutting)</h4>
                    <p className="text-sm text-slate-600">Crie um déficit de 300 a 500 kcal. Mais que isso pode desacelerar seu metabolismo e causar perda de massa muscular.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600 shrink-0 mt-1"><TrendingUp size={20}/></div>
                <div>
                    <h4 className="font-bold text-slate-900">Para Ganhar Massa (Bulking)</h4>
                    <p className="text-sm text-slate-600">Crie um superávit leve de 200 a 300 kcal. O corpo tem um limite de quanto músculo consegue construir por dia.</p>
                </div>
            </div>
        </div>

        <div className="mt-12 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" /> Perguntas Frequentes
          </h3>
          <div className="space-y-3">
            <details className="group bg-white p-4 rounded-lg border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform select-none">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                Comer pouco demais engorda?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                Não exatamente, mas atrapalha. Se você comer muito abaixo da sua TMB (ex: 1000 kcal), seu corpo entra em "modo de alerta", reduzindo o gasto energético e aumentando a fome. O ideal é nunca comer menos que sua TMB.
              </p>
            </details>

            <details className="group bg-white p-4 rounded-lg border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform select-none">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                Devo contar calorias dos vegetais?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                Vegetais folhosos e verdes (alface, brócolis, espinafre) têm tão poucas calorias que muitos nutricionistas recomendam nem contar. Foque em pesar carboidratos, proteínas e gorduras.
              </p>
            </details>

            <details className="group bg-white p-4 rounded-lg border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform select-none">
              <summary className="font-semibold text-slate-800 flex justify-between items-center text-sm">
                O que é dia do lixo (Refeed)?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-2">
                É uma estratégia para "acordar" o metabolismo após dias de dieta restrita. Comer mais carboidratos em um dia específico pode ajudar a regular os hormônios da fome, mas cuidado para não exagerar.
              </p>
            </details>
          </div>
        </div>

        {/* NAVEGAÇÃO FINAL */}
        <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
          <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
             <CheckCircle2 size={16} className="text-green-500"/> Continue Cuidando da Saúde:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/saude/imc" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-red-400 hover:shadow-md transition-all group">
                <div className="bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-red-600"><Scale size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">IMC Online</span>
                <span className="text-sm text-slate-500 mt-1">Peso ideal</span>
            </Link>
            <Link href="/financeiro/juros-compostos" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all group">
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600"><TrendingUp size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Juros Compostos</span>
                <span className="text-sm text-slate-500 mt-1">Saúde financeira</span>
            </Link>
            <Link href="/trabalhista/ferias" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group">
                <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-amber-600"><Briefcase size={20}/></div>
                <span className="font-bold text-slate-800 text-lg">Calculadora de Férias</span>
                <span className="text-sm text-slate-500 mt-1">Planejamento</span>
            </Link>
          </div>
        </div>

      </div>

      <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
          <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
          <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
      </div>

    </article>
  );
}