import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CompoundInterestCalculator from "@/components/calculators/CompoundInterestCalculator";
import { calculateCompoundInterest } from "@/lib/calculators/compound-interest";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";

import { 
  TrendingUp, HelpCircle, BookOpen, Calculator, Landmark,
  Coins, Briefcase, FileText, 
  CheckCircle2, ArrowRight, BarChart3,
  PieChart, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Juros Compostos | Simulador de Investimentos Grátis";
  const description = "Descubra o poder dos juros sobre juros. Simule seus investimentos mensais, rendimentos e planeje sua liberdade financeira em segundos. 100% Grátis.";

  return {
    title,
    description,
    keywords: ["calculadora juros compostos", "simulador de investimentos", "calcular rentabilidade", "juros sobre juros", "calculadora financeira", "aposentadoria"],
    alternates: { canonical: "https://mestredascontas.com.br/financeiro/juros-compostos" },
    openGraph: {
      title: "Calculadora de Juros Compostos 2026 | Simule seus Investimentos",
      description: "Descubra o poder dos juros sobre juros. Veja quanto seu dinheiro pode render com aportes mensais e planeje sua liberdade financeira.",
      url: "https://mestredascontas.com.br/financeiro/juros-compostos",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Juros Compostos Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Quer ver seu dinheiro trabalhar por você?",
      description: "Simule agora o efeito bola de neve dos juros compostos in seus investimentos.",
      images: ["/opengraph-image"],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } } };
}

// --- LISTA FAQ (Exatamente 7 Dúvidas Reais de Investidores) ---
const faqList = [
  { 
    q: "O que são juros compostos na prática?", 
    a: "Juros compostos representam a incidência de juros sobre juros. Ao contrário do regime simples, no qual os juros incidem apenas sobre o valor inicial, no regime composto os rendimentos gerados a cada período são integrados ao capital principal, servindo de base para o cálculo dos juros do período seguinte." 
  },
  { 
    q: "A poupança realmente utiliza o regime de juros compostos?", 
    a: "Sim. A caderneta de poupança opera sob a mecânica de juros compostos capitalizados mensalmente. Contudo, seu rendimento é limitado por lei (70% da taxa Selic + Taxa Referencial se a Selic estiver abaixo de 8,5% ao ano), fazendo com que muitas vezes perca para a inflação." 
  },
  { 
    q: "Qual a diferença exata entre juros simples e juros compostos?", 
    a: "Nos juros simples, o rendimento é sempre calculated apenas sobre o capital investido inicialmente (crescimento de formato linear). Já nos juros compostos, a taxa incide sobre o saldo atual acumulado (capital inicial somado aos lucros acumulados anteriores), gerando um crescimento de tipo exponencial." 
  },
  { 
    q: "Como transformar uma taxa de juros mensal em uma taxa anual?", 
    a: "Em regime de juros compostos, não se multiplica a taxa mensal por 12 devido ao efeito acumulado. A conversão exige o uso da fórmula de equivalência: Taxa Anual = (1 + Taxa Mensal)^12 - 1. Uma taxa de 1% ao mês, por exemplo, equivale a 12,68% ao ano." 
  },
  { 
    q: "O que é a famosa 'Regra dos 72' no mercado financeiro?", 
    a: "A Regra dos 72 é um atalho matemático rápido usado para estimar em quanto tempo seu capital vai dobrar com uma taxa de juros fixa. Basta dividir o número 72 pela taxa de juros anual esperada. Se você tem um rendimento de 6% ao ano, por exemplo, levará aproximadamente 12 anos para dobrar o capital (72 ÷ 6)." 
  },
  { 
    q: "Os investimentos em renda fixa, como o Tesouro Direto, rendem juros compostos?", 
    a: "Sim. A esmagadora maioria dos títulos públicos do Tesouro Direto, além de CDBs, LCI, LCA e debêntures do mercado de capitais, utiliza o regime de juros compostos diários em sua rentabilidade, acumulando valor até a data limite do vencimento do papel." 
  },
  { 
    q: "Como declarar rendimentos de juros compostos no Imposto de Renda?", 
    a: "Rendimentos obtidos em aplicações financeiras sujeitas a juros compostos devem ser declarados conforme o informe de rendimentos emitido pelo banco. Em renda fixa, os impostos são retidos na fonte pelo regime regressivo (22,5% a 15%) e lançados na ficha 'Rendimentos Sujeitos à Tributação Exclusiva'." 
  }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO COM 7 FAQ) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Juros Compostos",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para cálculo de juros compostos com aportes mensais e taxa de juros personalizada.",
      "featureList": "Cálculo de montante final, juros acumulados e comparação com investimento inicial."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Juros Compostos Online",
      "description": "Aprenda a simular o crescimento do seu dinheiro com juros sobre juros passo a passo.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Defina o Capital Inicial",
          "text": "Informe a quantia em dinheiro que você já possui guardada para começar a investir."
        },
        {
          "@type": "HowToStep",
          "name": "Insira o Aporte Mensal",
          "text": "Preencha o valor que você planeja economizar e investir recorrentemente a cada mês."
        },
        {
          "@type": "HowToStep",
          "name": "Informe a Taxa de Juros",
          "text": "Escreva a taxa de rentabilidade projetada (mensal ou anual) dos seus ativos."
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "O Segredo da Riqueza de Longo Prazo: Dominando a Matemática dos Juros Compostos",
      "description": "Um guia abrangente detalhando o efeito bola de neve dos investimentos, fórmulas matemáticas simplificadas e a regra dos 72.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-02-15",
      "dateModified": new Date().toISOString()
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

export default async function JurosCompostosPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Juros Compostos"
          description="Albert Einstein chamou os juros compostos de 'a oitava maravilha do mundo'. Simule como pequenos aportes mensais podem se transformar em uma grande fortuna."
          category="Planejamento Financeiro"
          icon={<TrendingUp size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="blue"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Juros Compostos" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO FINANCEIRA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Conteúdo verificado com base em fórmulas de matemática financeira e indicadores econômicos vigentes em 2026.</span>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="juros_top" format="horizontal" variant="software" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
            <PrivacyBadge />
            <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <CompoundInterestCalculator />
            </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
            <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-4 print:hidden min-h-[250px]">
          <LazyAdUnit slot="juros_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DE ALTA PERFORMANCE (ADSENSE & AI GROUNDING) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3 border-l-4 border-emerald-500 pl-4">
              O Efeito Bola de Neve: Desvendando a Oitava Maravilha do Mundo
          </h2>
          
          <p className="lead text-slate-700 dark:text-slate-300 font-medium text-lg">
            Você já parou para pensar na incrível razão pela qual algumas pessoas enriquecem de forma consistente, enquanto outras parecem presas em uma eterna corrida de ratos financeira?
          </p>

          <p>
            A verdade é que a grande chave para destravar a independência financeira de longo prazo atende por um nome matemático fascinante: <GlossaryTerm slug="juros-compostos">juros compostos</GlossaryTerm>.
          </p>

          <p>
            Veja bem, os juros compostos funcionam de forma idêntica a uma pequena bola de neve rolando suavemente pelo topo de uma montanha congelada.
          </p>

          <p>
            No início do trajeto, a bola parece minúscula e acumula pouquíssimo volume, passando quase despercebida por quem observa à distância.
          </p>

          <p>
            No entanto, conforme ela rola por mais tempo, a neve acumulada serve de aderência para novas camadas, gerando uma massa colossal ao final da descida.
          </p>

          <p>
            Parece mágica, não é mesmo? Mas na realidade financeira, esse processo exponencial é alimentado unicamente pelo reinvestimento sistemático dos seus lucros.
          </p>

          <p>
            O melhor de tudo? Nós preparamos este guia completo e denso para que você compreenda onde alocar seu patrimônio e simule com exatidão a velocidade de crescimento do seu capital!
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
              Juros Simples vs Juros Compostos: Comparação Definitiva
          </h3>

          <p>
            A maioria dos poupadores brasileiros perde fortunas silenciosas simplesmente por não compreender a diferença matemática entre as duas formas de acumulação.
          </p>

          <p>
            Para sanar todas as suas dúvidas estruturais, organizamos uma comparação clara do comportamento de cada regime financeiro em HTML puro.
          </p>

          {/* TABELA DE COMPARAÇÃO JUROS (MANDATORY RULE 4) */}
          <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full text-sm text-left border-collapse bg-white dark:bg-slate-900">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Característica</th>
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Juros Simples</th>
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Juros Compostos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Base de Cálculo</td>
                  <td className="px-6 py-4 text-xs">O percentual incide unicamente sobre o valor principal inicial investido.</td>
                  <td className="px-6 py-4 text-xs font-semibold text-emerald-600">O percentual incide sobre o saldo inicial somado aos lucros anteriores.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Comportamento Gráfico</td>
                  <td className="px-6 py-4 text-xs">Crescimento de formato linear (uma linha reta constante).</td>
                  <td className="px-6 py-4 text-xs">Crescimento de formato exponencial (curva ascendente acelerada).</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Aplicação no Mercado</td>
                  <td className="px-6 py-4 text-xs">Utilizado em transações comerciais de curto prazo e atrasos de contas simples.</td>
                  <td className="px-6 py-4 text-xs font-bold text-blue-600">Padrão universal de investimentos em Renda Fixa e Renda Variável.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-4 flex items-center gap-3">
              <Landmark className="text-blue-600" /> O Mapa dos Rendimentos: Onde Encontrar Juros Compostos
          </h3>
          
          <p>
            Nem todos os veículos de investimento operam com a mesma taxa de capitalização ou eficiência no mercado brasileiro.
          </p>

          <div className="overflow-x-auto mb-10 not-prose rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <table className="w-full text-sm text-left border-collapse text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-4 font-bold text-slate-750 dark:text-slate-200">Categoria de Ativo</th>
                  <th className="p-4 font-bold text-slate-750 dark:text-slate-200">Média de Retorno Estimada (2026)</th>
                  <th className="p-4 font-bold text-slate-750 dark:text-slate-200">Regime de Liquidez</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Poupança Convencional</td>
                  <td className="p-4 text-red-600 font-bold">~0,50% ao mês + TR (Rendimento limitado)</td>
                  <td className="p-4">Resgate imediato diário</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">CDBs e Tesouro Direto Selic</td>
                  <td className="p-4 text-emerald-600 font-bold">~0,85% a 0,95% ao mês (Excelente segurança)</td>
                  <td className="p-4">D+0 a D+1</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">Fundos Imobiliários e Ações</td>
                  <td className="p-4 font-bold text-blue-600">Histórico de 1,00% a 1,50% ao mês (Volatilidade ativa)</td>
                  <td className="p-4">D+2 no mercado secundário</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
              <FileText className="text-blue-500" /> A Fórmula Matemática Desmistificada
          </h3>
          
          <p>
            Muitos leitores sentem medo das equações de finanças corporativas, mas a fórmula básica dos juros sobre juros é bastante acessível.
          </p>

          <div className="bg-slate-900 text-white p-6 rounded-xl my-6 font-mono text-center text-lg md:text-2xl shadow-lg not-prose tracking-wider">
              M = C × (1 + i)ᵗ
          </div>

          <p>
            Nesse modelo matemático representativo:
          </p>

          <ul className="space-y-3 not-prose mb-8 text-sm md:text-base bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-650 flex items-center justify-center font-bold text-slate-600 dark:text-slate-200 shadow-sm shrink-0">M</div> <span className="text-slate-755 dark:text-slate-350"><strong>Montante Acumulado:</strong> A quantia em dinheiro que você terá ao final do prazo.</span></li>
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-650 flex items-center justify-center font-bold text-slate-600 dark:text-slate-200 shadow-sm shrink-0">C</div> <span className="text-slate-755 dark:text-slate-350"><strong>Capital Inicial:</strong> O valor em dinheiro depositado no primeiro dia da simulação.</span></li>
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-650 flex items-center justify-center font-bold text-slate-600 dark:text-slate-200 shadow-sm shrink-0">i</div> <span className="text-slate-755 dark:text-slate-350"><strong>Taxa de Juros:</strong> A rentabilidade percentual convertida em número decimal (ex: 0,01 para 1%).</span></li>
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-650 flex items-center justify-center font-bold text-slate-600 dark:text-slate-200 shadow-sm shrink-0">t</div> <span className="text-slate-755 dark:text-slate-350"><strong>Tempo de Exposição:</strong> O número de meses ou anos que seu dinheiro passará rendendo.</span></li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">
              O Incrível Legado de Benjamin Franklin e os Juros de Longo Prazo
          </h3>

          <p>
            Para comprovar de forma incontestável a potência colossal do tempo nos investimentos, nada melhor do que resgatar a história de Benjamin Franklin.
          </p>

          <p>
            Ao falecer em 1790, Franklin deixou um legado surpreendente de US$ 4.400 em testamento para as cidades de Boston e Filadélfia.
          </p>

          <p>
            No entanto, ele impôs uma regra rígida: o dinheiro deveria permanecer aplicado em um fundo sob regime de juros acumulativos por exatos 200 anos!
          </p>

          <p>
            O resultado dessa extraordinária paciência? Após dois séculos de rentabilidade, o capital original multiplicou-se exponencialmente, transformando-se em mais de **US$ 6,5 milhões** de dólares!
          </p>

          <p>
            Espectacular, não é mesmo? Isso prova que começar a poupar o quanto antes, mesmo com quantias pequenas, é o verdadeiro passaporte para sua paz mental financeira.
          </p>

          <ExpertSignature updatedAt="Junho de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
        </div>

        <SmartGlossaryLinker currentHref="/financeiro/juros-compostos" category="financeiro" />
        <SmartCrossLinker currentHref="/financeiro/juros-compostos" category="financeiro" />

        {/* FAQ ACORDION COM 7 DÚVIDAS REAIS */}
        <div className="max-w-4xl mx-auto w-full print:hidden">
          <div className="mt-8 not-prose bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-150 dark:border-slate-800 pb-4">
                <HelpCircle className="text-emerald-500" /> Perguntas Frequentes sobre Juros Compostos
            </h2>
            
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-900 open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900/30 transition-all duration-200">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-emerald-500 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug text-slate-800 dark:text-slate-200 font-semibold">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm animate-in fade-in">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>
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