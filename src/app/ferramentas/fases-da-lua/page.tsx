import { Suspense } from "react";
import { Metadata } from "next";
import ModernCalendar from "@/components/ui/ModernCalendar";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import { 
  Moon, MoonStar, Sparkles, 
  HelpCircle, Compass, Waves, ThermometerSun, 
  Scissors, Tractor, Fish, Star, Clock, Activity
} from "lucide-react";
import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getMoonPhase, formatMoonDate } from "@/lib/calculators/moon";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calendário Lunar 2026 (Grátis) | Fases da Lua e Eclipses";
  const description = "O guia definitivo do Calendário Lunar 2026. Acompanhe a fase da lua de hoje, eclipses, teoria solunar para pesca e agricultura biodinâmica. Grátis.";

  return {
    title,
    description,
    keywords: [
      "calendario lunar 2026", "fases da lua hoje", "lua cheia 2026", "lua nova 2026",
      "eclipse lunar 2026", "superlua 2026", "teoria solunar pesca", "calendario lunar"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/fases-da-lua" },
    openGraph: {
      title: "Calendário Lunar 2026 | Fases da Lua e Eclipses",
      description: "Confira a fase da lua de hoje, calendário completo de 2026 e datas de eclipses.",
      url: "https://mestredascontas.com.br/ferramentas/fases-da-lua",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "website",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calendário Lunar 2026 - Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Calendário Lunar 2026 Completo",
      description: "Veja as fases da lua e eventos astronômicos de 2026.",
      images: ["/opengraph-image"],
    }
  };
}

export default async function MoonPhasesPage() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calendário Lunar Mestre das Contas",
        "applicationCategory": "ReferenceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": "Ferramenta astronômica para conferir as fases da lua, eclipses e calendário lunar completo do ano de 2026." },
      {
        "@type": "Article",
        "headline": "Calendário Lunar 2026: Guia Completo de Fases e Eclipses",
        "description": "Aprenda sobre o ciclo lunar, as 8 fases da lua, eclipses e a influência do nosso satélite na agricultura, pesca e biologia humana.",
        "author": { "@type": "Organization", "name": "Mestre das Contas" },
        "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon.png" } },
        "datePublished": "2024-03-01",
        "dateModified": new Date().toISOString()
      },
      {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Como descobrir qual é a fase da lua de hoje?", "acceptedAnswer": { "@type": "Answer", "text": "Você pode utilizar nossa ferramenta interativa no topo desta página. Nosso calendário lunar consulta um algoritmo astronômico para informar com precisão absoluta a fase, a iluminação percentual e os dias restantes para o próximo ciclo lunar, baseado no fuso horário do Brasil." } },
        { "@type": "Question", "name": "O que significa 'Maré de Sizígia' e 'Maré de Quadratura'?", "acceptedAnswer": { "@type": "Answer", "text": "Sizígia ocorre nas Luas Nova e Cheia. O Sol e a Lua alinham suas atrações gravitacionais sobre a Terra, causando as maiores amplitudes de maré (marés muito altas e muito baixas). A Quadratura ocorre nas fases Crescentes e Minguantes, quando o Sol e a Lua formam um ângulo de 90 graus em relação à Terra, cancelando parte da gravidade um do outro e resultando em marés brandas, conhecidas como 'marés mortas'." } },
        { "@type": "Question", "name": "A gravidade da Lua afeta os seres humanos já que somos feitos de água?", "acceptedAnswer": { "@type": "Answer", "text": "Essa é uma das dúvidas mais comuns. Embora o corpo humano seja composto por cerca de 60% de água, o volume total de líquido é minúsculo comparado aos oceanos. A força gravitacional da lua atua sobre *massas*, portanto, seu efeito físico direto nos líquidos do corpo humano é estatisticamente nulo. As influências da lua no comportamento humano (como no sono) estão mais ligadas à evolução biológica perante a luminosidade do que à atração gravitacional em si." } }
      ]
    }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 font-sans bg-slate-50 dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Calendário Lunar 2026"
          description="Muito além de olhar para o céu. Descubra a fase da lua de hoje e entenda a ciência, a biologia e a tradição por trás do nosso satélite natural."
          category="Astronomia & Cotidiano"
          icon={<MoonStar size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="indigo"
          badge="Guia Especialista 2026"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Fases da Lua 2026" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto mt-8">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="lua_top" format="horizontal" />
        </div>

        {/* REVISÃO ASTRONÔMICA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2 max-w-5xl mx-auto w-full">
          <MoonStar size={18} className="text-blue-600 shrink-0" />
          <span>Dados astronômicos baseados no Horário de Brasília (BRT) e cálculos de efemérides precisos para 2026.</span>
        </div>

        {/* FERRAMENTA PRINCIPAL */}
        <section className="w-full max-w-full relative z-10 py-8">
           <div className="mb-8 flex justify-center">
              <PrivacyBadge />
           </div>
           
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <ModernCalendar />
           </Suspense>
           
           <div className="mt-12 print:hidden max-w-5xl mx-auto text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                *O calendário acima utiliza cálculos astronômicos de alta precisão baseados no Tempo Universal Coordenado e ajustados para o horário de Brasília (BRT/UTC-3).
              </p>
              <div className="mt-4"><DisclaimerBox /></div>
           </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
             <LazyAdUnit slot="lua_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO PROFUNDO E DENSO (SEO MASTER) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-l-4 border-indigo-600 pl-5">
               O Relógio Mais Antigo da Humanidade
            </h2>
            
            <p className="lead text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
               Antes mesmo da invenção da roda, a humanidade já olhava para cima. Como um pêndulo cósmico silencioso e exato, a Lua dita o ritmo da vida na Terra há bilhões de anos. Ela é muito mais do que uma rocha iluminada na noite: é a engrenagem que move oceanos inteiros e afeta o relógio biológico de milhares de espécies.
            </p>
            
            <p className="text-slate-600 dark:text-slate-400">
               O ciclo lunar (ou mês sinódico) dura exatamente <strong>29 dias, 12 horas, 44 minutos e 2,9 segundos</strong>. Nesse período, a dança gravitacional entre o Sol, a Terra e a Lua cria as fases que observamos. E, embora muitos pensem na lua apenas de forma romântica, a ciência moderna, a cronobiologia e a oceanografia confirmam diariamente o que nossos ancestrais já sabiam: estar sintonizado com a Lua é estar sintonizado com a própria natureza.
            </p>

            {/* DESTAQUES 2026 */}
            <div className="my-10 bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-900/50 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
                <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 mt-0 mb-4 flex items-center gap-2">
                    <Star className="text-indigo-500" /> O Calendário de 2026: Um Ano de Espetáculos
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 mb-5">
                    O ano de 2026 é marcado por alinhamentos notáveis que merecem destaque no seu diário astronômico. Se você é um entusiasta do céu noturno, estas são as datas que você precisa memorizar:
                </p>
                <ul className="space-y-4 text-base text-slate-700 dark:text-slate-300">
                    <li className="flex flex-col">
                        <strong className="text-rose-600 dark:text-rose-400 text-lg">3 de Março: A Lua de Sangue</strong>
                        <span>O ano abriu com um espetacular Eclipse Lunar Total. A Terra se colocou perfeitamente entre o Sol e a Lua, filtrando a luz solar pela nossa atmosfera e banhando a superfície lunar com um vermelho profundo e inesquecível.</span>
                    </li>
                    <li className="flex flex-col">
                        <strong className="text-amber-600 dark:text-amber-400 text-lg">31 de Maio: A Rara "Lua Azul"</strong>
                        <span>Ao contrário do que o nome sugere, ela não muda de cor. Chama-se "Lua Azul" a ocorrência da <em>segunda Lua Cheia dentro do mesmo mês civil</em>. Em 2026, maio foi coroado com duas luas cheias (dia 1º e dia 31).</span>
                    </li>
                    <li className="flex flex-col">
                        <strong className="text-indigo-600 dark:text-indigo-400 text-lg">28 de Agosto: Eclipse Parcial</strong>
                        <span>Um fenômeno mais sutil, onde a umbra da Terra "morde" um pedaço da lua cheia, criando um contraste fascinante no céu noturno, facilmente visível do Brasil.</span>
                    </li>
                    <li className="flex flex-col">
                        <strong className="text-cyan-600 dark:text-cyan-400 text-lg">Novembro e Dezembro: As Superluas</strong>
                        <span>Nos dias 24 de Novembro e 24 de Dezembro (sim, na véspera de Natal!), a Lua Cheia coincidirá com o seu perigeu (ponto mais próximo da Terra na sua órbita elíptica). O resultado? Luas até 14% maiores e 30% mais brilhantes. Um presente da natureza.</span>
                    </li>
                </ul>
            </div>

            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-14 mb-8">Além do Básico: As 8 Fases Reais da Lua</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                A maioria das pessoas conhece apenas quatro fases, mas a jornada completa é composta por <strong>oito estágios distintos</strong>. Para os verdadeiros conhecedores e observadores do céu, dominar esse ciclo é essencial:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-slate-100 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0"><Moon size={20}/> 1. Lua Nova (Novilúnio)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Alinhada com o Sol, sua face visível está na escuridão. No campo energético e agrícola, é o marco zero. Momento de recolhimento e planejamento do solo.</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0"><MoonStar size={20} className="opacity-50"/> 2. Crescente Côncava</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Um filete fino de luz aparece no lado oeste. A seiva das plantas começa a despertar e subir lentamente para o caule.</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0"><MoonStar size={20}/> 3. Quarto Crescente</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Exatamente 50% iluminada. A força gravitacional gera as marés de quadratura (marés mortas). Ótima fase para o desenvolvimento rápido de plantios e projetos.</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0"><Sparkles size={20} className="text-amber-500 opacity-60"/> 4. Crescente Convexa (Gibosa)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Quase cheia, a lua parece "inchada". É a fase de refinamento antes do ápice. A luminosidade noturna já afeta o comportamento de predadores na natureza.</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0"><Sparkles size={20} className="text-amber-500"/> 5. Lua Cheia (Plenilúnio)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">100% iluminada. Sol, Terra e Lua alinhados geram as violentas <em>Marés de Sizígia</em>. A seiva atinge a copa das plantas e a agitação biológica é máxima.</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0"><Moon size={20} className="scale-x-[-1] opacity-60"/> 6. Minguante Convexa (Gibosa)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">A luz começa a recuar do lado direito. Inicia-se o processo de absorção; a energia que estava nas folhas e copas começa a descer novamente.</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0"><Moon size={20} className="scale-x-[-1]"/> 7. Quarto Minguante</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Apenas a metade esquerda é iluminada. Ideal para colheita de raízes, podas de contenção e para a limpeza do terreno (e da mente).</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0"><Moon size={20} className="scale-x-[-1] opacity-30"/> 8. Minguante Côncava</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Também conhecida como Lua Balsâmica. O último suspiro antes da escuridão total da Lua Nova. Fim do ciclo de 29,5 dias.</p>
                </div>
            </div>

            {/* APLICAÇÕES PRÁTICAS - CIÊNCIA E SABEDORIA */}
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-14 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">A Influência Lunar na Prática</h3>

            <div className="space-y-10 not-prose">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-2xl text-emerald-700 dark:text-emerald-400 shrink-0">
                        <Tractor size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Agricultura Biodinâmica e Plantio</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Mito? Absolutamente não. A agricultura biodinâmica, estruturada por Rudolf Steiner no século XX, utiliza rigorosamente os calendários lunares. A lógica é baseada na gravidade e na fotoperiodicidade. Na <strong>Lua Crescente e Cheia</strong>, a atração lunar puxa a umidade do solo e a seiva para o topo das plantas, sendo a fase de ouro para plantar tomate, milho, alface e colher frutos suculentos. Na <strong>Minguante</strong>, a seiva concentra-se nas raízes: é a hora exata para adubar o solo, podar, e plantar tubérculos como cenoura, beterraba e mandioca.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="bg-cyan-100 dark:bg-cyan-900/30 p-4 rounded-2xl text-cyan-700 dark:text-cyan-400 shrink-0">
                        <Fish size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">A Teoria Solunar na Pesca Esportiva e Comercial</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Se você perguntar a um pescador experiente qual o segredo de uma boa pescaria, ele apontará para o céu. Em 1926, John Alden Knight formulou a <strong>Teoria Solunar</strong>, provando que o movimento dos peixes em busca de alimento acompanha o ritmo das marés. Durante a <strong>Lua Nova e a Lua Cheia</strong>, temos as marés vivas (marés de sizígia). A água se movimenta agressivamente, revirando o fundo de rios e oceanos, liberando nutrientes e deixando os predadores altamente ativos. Pescar nessas fases aumenta suas chances exponencialmente.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-2xl text-indigo-700 dark:text-indigo-400 shrink-0">
                        <Activity size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Cronobiologia: O Efeito no Sono Humano</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            "A lua cheia me deixa agitado." A ciência concorda. Estudos recentes publicados em revistas como a <em>Science Advances</em> demonstraram que nos dias que antecedem a Lua Cheia, as pessoas demoram mais para adormecer e dormem menos profundamente. Essa resposta é um vestígio evolutivo: na pré-história, as noites de lua clara eram ideais para caçar e perigosas por conta dos predadores noturnos, forçando o relógio biológico humano a permanecer em alerta.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="bg-fuchsia-100 dark:bg-fuchsia-900/30 p-4 rounded-2xl text-fuchsia-700 dark:text-fuchsia-400 shrink-0">
                        <Scissors size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Mito ou Verdade: Corte de Cabelo</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            No Brasil, cortar o cabelo na Lua Crescente para acelerar o crescimento é quase uma lei não escrita. Cortar na Minguante é para conter o volume, e na Cheia, para encorpar os fios. Diferente da agricultura e das marés, a ciência biomédica rigorosa <strong>não encontra evidências</strong> de que o cabelo (que é tecido morto composto de queratina) responda à gravidade lunar. Contudo, o efeito placebo e o simbolismo de renovação atrelado aos ciclos naturais trazem um bem-estar psicológico inegável.
                        </p>
                    </div>
                </div>
            </div>

            {/* CURIOSIDADE FINAL */}
            <div className="my-16 p-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-slate-900 rounded-[2rem] text-white not-prose shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-full h-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700"><Compass size={150}/></div>
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 relative z-10"><Sparkles className="text-yellow-400"/> O Mistério do "Lado Negro" da Lua</h3>
                <p className="text-indigo-100 text-lg leading-relaxed mb-0 font-light relative z-10">
                    Ouvimos muito sobre o "lado negro" ou oculto da lua, imortalizado pela cultura pop. Mas a verdade astronômica é impressionante: devido à <strong>Rotação Síncrona</strong>, o tempo que a Lua leva para girar no seu próprio eixo (seu dia) é exatamente o mesmo tempo que ela leva para orbitar a Terra (seu ano). É por isso que, olhando daqui, nós <em>sempre</em> vemos as exatas mesmas crateras. O lado oculto recebe tanta luz solar quanto o lado visível, ele apenas guarda o segredo de nunca revelar seu rosto para nós.
                </p>
            </div>

            {/* FAQ OTIMIZADO PARA PAA (People Also Ask) DO GOOGLE */}
            <div className="mt-16 not-prose">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3">
                    <HelpCircle className="text-indigo-600 dark:text-indigo-400" /> Perguntas Frequentes
                </h2>
                <div className="grid gap-4">
                    <details className="group bg-white dark:bg-slate-800/40 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer open:ring-2 open:ring-indigo-100 dark:open:ring-indigo-900/30 transition-all">
                        <summary className="text-lg font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Como descobrir qual é a fase da lua de hoje?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300">▼</span>
                        </summary>
                        <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
                            Você pode utilizar nossa ferramenta interativa no topo desta página. Nosso calendário lunar consulta um algoritmo astronômico para informar com precisão absoluta a fase, a iluminação percentual e os dias restantes para o próximo ciclo lunar, baseado no fuso horário do Brasil.
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-800/40 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer open:ring-2 open:ring-indigo-100 dark:open:ring-indigo-900/30 transition-all">
                        <summary className="text-lg font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            O que significa "Maré de Sizígia" e "Maré de Quadratura"?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300">▼</span>
                        </summary>
                        <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
                            <strong>Sizígia</strong> ocorre nas Luas Nova e Cheia. O Sol e a Lua alinham suas atrações gravitacionais sobre a Terra, causando as maiores amplitudes de maré (marés muito altas e muito baixas). A <strong>Quadratura</strong> ocorre nas fases Crescentes e Minguantes, quando o Sol e a Lua formam um ângulo de 90 graus em relação à Terra, cancelando parte da gravidade um do outro e resultando em marés brandas, conhecidas como "marés mortas".
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-800/40 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer open:ring-2 open:ring-indigo-100 dark:open:ring-indigo-900/30 transition-all">
                        <summary className="text-lg font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            A gravidade da Lua afeta os seres humanos já que somos feitos de água?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300">▼</span>
                        </summary>
                        <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
                            Essa é uma das dúvidas mais comuns. Embora o corpo humano seja composto por cerca de 60% de água, o volume total de líquido é minúsculo comparado aos oceanos. A força gravitacional da lua atua sobre *massas*, portanto, seu efeito físico direto nos líquidos do corpo humano é estatisticamente nulo. As influências da lua no comportamento humano (como no sono) estão mais ligadas à evolução biológica perante a luminosidade do que à atração gravitacional em si.
                        </p>
                    </details>
                </div>
            </div>

        </div>

        <SmartCrossLinker currentHref="/ferramentas/fases-da-lua" category="ferramentas" />

        {/* ANÚNCIO FINAL */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="lua_bottom" format="horizontal" variant="software" />
        </div>

      </div>

      {/* FOOTER IMPRESSÃO */}
      <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8 pb-8">
            <p className="text-base font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-sm text-slate-500">Ferramentas de Astronomia e Produtividade | www.mestredascontas.com.br</p>
      </div>
    </article>
  );
}