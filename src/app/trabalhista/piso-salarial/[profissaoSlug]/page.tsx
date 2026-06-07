import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profissoes, type Profissao } from "@/data/profissoes";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";

import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Coins, Briefcase, Landmark, ExternalLink, Scale, ShieldCheck, 
  HelpCircle, GraduationCap, Clock, Award, CheckCircle2, ChevronRight
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

interface Props {
  params: Promise<{
    profissaoSlug: string;
  }>;
}

// --- 1. GENERATE STATIC PARAMS (Performance Extrema - SSG) ---
export async function generateStaticParams() {
  return profissoes.map((p) => ({
    profissaoSlug: p.slug,
  }));
}

// --- 2. DYNAMIC SEO METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profissaoSlug } = await params;
  const profissao = profissoes.find((p) => p.slug === profissaoSlug);

  if (!profissao) {
    return {
      title: "Profissão Não Encontrada | Mestre das Contas",
    };
  }

  const formatValue = (val: number) => val.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const title = `Piso Salarial do ${profissao.title} 2026: R$ ${formatValue(profissao.piso2026)} [Valor Oficial]`;
  const description = `Qual o piso salarial do ${profissao.title} em 2026? Veja a tabela oficial de R$ ${profissao.piso2026.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} homologado por convenção coletiva, benefícios e faça o cálculo líquido.`;

  return {
    title,
    description,
    keywords: [
      `piso salarial ${profissao.title.toLowerCase()}`,
      `salário mínimo ${profissao.title.toLowerCase()}`,
      `quanto ganha um ${profissao.title.toLowerCase()}`,
      `salário líquido ${profissao.title.toLowerCase()}`,
      `convenção coletiva ${profissao.title.toLowerCase()}`,
      `piso salarial 2026 ${profissao.title.toLowerCase()}`
    ],
    alternates: { canonical: `https://mestredascontas.com.br/trabalhista/piso-salarial/${profissaoSlug}` },
    openGraph: {
      title,
      description,
      url: `https://mestredascontas.com.br/trabalhista/piso-salarial/${profissaoSlug}`,
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: `Piso Salarial do ${profissao.title} 2026`, 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  };
}

export default async function ProfissaoPisoPage({ params }: Props) {
  const { profissaoSlug } = await params;
  const profissao = profissoes.find((p) => p.slug === profissaoSlug);

  if (!profissao) {
    notFound();
  }

  // --- DADOS ESTRUTURADOS COMPLEXOS COM 7 DÚVIDAS REAIS (JSON-LD) ---
  const faqList = [
    { 
      q: `Qual o valor exato do piso salarial do ${profissao.title} em 2026?`, 
      a: `O valor do piso salarial do ${profissao.title} em 2026 é de R$ ${profissao.piso2026.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} para a jornada padrão de trabalho, conforme o acordo homologado por meio de ${profissao.fonte}. Nenhuma empresa pode pagar um valor menor para profissionais sob este regime contratual.` 
    },
    { 
      q: `O piso salarial do ${profissao.title} é igual em todos os estados do Brasil?`, 
      a: `Não necessariamente. O valor de R$ ${profissao.piso2026.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} serve como uma referência nacional ou de acordos fortes da federação, mas estados como São Paulo, Rio de Janeiro e Paraná possuem salários mínimos regionais próprios. Além disso, convenções coletivas de sindicatos locais podem fixar pisos maiores para sua base territorial.` 
    },
    { 
      q: `O que acontece se a minha empresa pagar menos do que o piso da categoria?`, 
      a: `Esta é uma infração grave à legislação trabalhista brasileira (CLT). Se isso acontecer, você tem o direito garantido de cobrar a diferença salarial retroativa por meio de ação na Justiça do Trabalho ou fazendo uma denúncia formal ao Ministério do Trabalho ou ao sindicato representativo da categoria.` 
    },
    { 
      q: `Quem trabalha em regime de tempo parcial (Part-time) recebe o piso integral?`, 
      a: `Não, o pagamento pode ser proporcional. A lei trabalhista permite que o salário seja calculado proporcionalmente à jornada de trabalho praticada. Caso seu contrato de trabalho preveja uma jornada inferior a ${profissao.cargaHoraria}, o valor do piso poderá ser reduzido proporcionalmente às horas trabalhadas no mês.` 
    },
    { 
      q: `Quais são os adicionais por lei que podem aumentar o holerite do ${profissao.title}?`, 
      a: `A remuneração pode ser significativamente acrescida por benefícios legais como: ${profissao.adicionais}. Adicionalmente, horas extras feitas em dias de semana acrescentam 50%, e aos domingos e feriados somam 100% sobre o valor da hora convencional de trabalho.` 
    },
    { 
      q: `Como é calculado o salário líquido sobre o salário bruto do ${profissao.title}?`, 
      a: `O salário líquido é a quantia que realmente cai na sua conta corrente após os descontos obrigatórios de INSS (Previdência Social) e de IRRF (Imposto de Renda Retido na Fonte). Você pode simular o valor exato no holerite com o nosso simulador interativo presente no topo desta página.` 
    },
    { 
      q: `Qual a diferença entre salário mínimo nacional e o piso salarial do ${profissao.title}?`, 
      a: `O salário mínimo nacional é a menor quantia que qualquer trabalhador no Brasil pode receber por lei. Já o piso salarial é uma conquista específica da sua profissão, negociada pelos sindicatos junto aos empregadores, garantindo uma remuneração justa e superior ao salário mínimo por conta da qualificação e responsabilidade técnica exigidas.` 
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `Calculadora de Salário Líquido para ${profissao.title}`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": `Simulador interativo de salário líquido para a profissão de ${profissao.title} com base no piso salarial de 2026.`
      },
      {
        "@type": "HowTo",
        "name": `Como Consultar o Piso do ${profissao.title}`,
        "description": "Veja o passo a passo para conferir os direitos e o salário mínimo da sua profissão.",
        "image": "https://mestredascontas.com.br/opengraph-image",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Identifique a Convenção Coletiva",
            "text": "Consulte o sindicato representativo da categoria profissional para verificar o acordo vigente no seu estado."
          },
          {
            "@type": "HowToStep",
            "name": "Verifique a Carga Horária",
            "text": "Confirme se o seu contrato corresponde à jornada padrão da profissão para garantir o pagamento proporcional correto."
          },
          {
            "@type": "HowToStep",
            "name": "Simule o Salário Líquido",
            "text": "Insira o salário bruto e eventuais adicionais em nosso simulador para conferir o valor exato depositado na sua conta."
          }
        ]
      },
      {
        "@type": "Article",
        "headline": `Piso Salarial de ${profissao.title} em 2026: Valores, Direitos e Legislação`,
        "description": `Tudo o que você precisa saber sobre a remuneração mínima da categoria de ${profissao.title}, reajustes e adicionais previstos em lei.`,
        "author": { "@type": "Organization", "name": "Mestre das Contas" },
        "publisher": { 
          "@type": "Organization", 
          "name": "Mestre das Contas", 
          "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } 
        },
        "datePublished": "2026-01-10",
        "dateModified": new Date().toISOString()
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqList.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={`Piso Salarial do ${profissao.title} 2026`}
          description={`Consulte o valor do piso salarial nacional de ${profissao.title} regulamentado para 2026. Entenda a legislação, a média salarial no mercado e simule o holerite líquido.`}
          category="Pisos Salariais & Convenções"
          icon={<Briefcase size={32} strokeWidth={2} />}
          variant="reform" // Estilo verde profissional (Foco Trabalhista)
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Pisos Salariais", href: "/trabalhista/piso-salarial" },
            { label: profissao.title }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO LEGAL (E-E-A-T) */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300 mb-2">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Legislação verificada: Regulamentado oficialmente via <strong>{profissao.fonte}</strong>.</span>
        </div>

        {/* INFO HIGHLIGHT CARDS (PISO VS MÉDIA) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Piso Salarial 2026</span>
            <span className="text-2xl md:text-3xl font-extrabold text-slate-850 dark:text-white block tracking-tight">
              R$ {profissao.piso2026.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-slate-400 mt-2 block">{profissao.cargaHoraria}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Média de Mercado</span>
            <span className="text-2xl md:text-3xl font-extrabold text-blue-650 dark:text-blue-400 block tracking-tight">
              R$ {profissao.mediaSalarial.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-slate-400 mt-2 block">Contratações CLT Brasil</span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Regime Contratual</span>
            <span className="text-xl font-extrabold text-purple-600 dark:text-purple-400 block tracking-tight pt-1">
              {profissao.regime}
            </span>
            <span className="text-[11px] text-slate-400 mt-3 block truncate">{profissao.sindicato}</span>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="horas_top" format="horizontal" variant="agency" />
        </div>

        {/* INTERACTIVE CALCULATOR (PRE-FILLED WITH FLOOR SALARY FOR WOW FACTOR!) */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
            <div className="px-6 pt-6 pb-2 print:hidden">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">Simulador Integrado</span>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Simulador de Holerite Líquido para o Piso de {profissao.title}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Abaixo está pré-configurado o piso salarial bruto de <strong>R$ {profissao.piso2026.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong> da categoria. Pressione "Calcular" para ver o líquido exato com descontos.
              </p>
            </div>
            
            <PrivacyBadge />
            <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <SalaryCalculator initialValue={profissao.piso2026} />
            </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="horas_mid" format="auto" />
        </div>

        {/* --- ARTICLE / EDUCATIONAL CONTENT (ADSENSE & AI GROUNDING RICH) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
              Piso Salarial do {profissao.title} 2026: Guia Completo e Direitos
          </h2>
          
          <p className="lead text-slate-700 text-lg font-medium">
            Você já parou para pensar se o seu holerite reflete o valor correto da sua profissão? 
          </p>
          
          <p>
            A verdade é que milhares de trabalhadores no Brasil desempenham suas funções diariamente sem ter a certeza de que estão recebendo a remuneração mínima garantida por lei ou convenção coletiva de trabalho.
          </p>

          <p>
            Nós sabemos o quão exaustiva é a jornada e quão complexo pode parecer o linguajar jurídico das convenções sindicais. 
          </p>

          <p>
            Por isso, decidimos traduzir de forma clara, humanizada e extremamente detalhada todos os direitos que cercam o salário base do <strong>{profissao.title}</strong> em 2026. 
          </p>

          <p>
            Seja você um profissional experiente em busca de valorização, um jovem que está ingressando no mercado agora ou um empregador zelando pelo cumprimento das leis trabalhistas, este guia prático é essencial para você.
          </p>

          <h3 className="text-xl font-bold text-slate-850 dark:text-slate-150 mt-8 mb-4">
            O Segredo por Trás do Conceito de Piso Salarial
          </h3>

          <p>
            Veja bem, o <GlossaryTerm slug="piso-salarial-profissional">piso salarial</GlossaryTerm> não é uma simples sugestão de pagamento. 
          </p>

          <p>
            Ele funciona como uma verdadeira rede de segurança invisível para a sua carreira. 
          </p>

          <p>
            Imagine que o <GlossaryTerm slug="piso-salarial-profissional">piso salarial</GlossaryTerm> é a linha de partida em uma corrida de atletismo: ninguém pode começar a correr de trás dela. 
          </p>

          <p>
            Dessa forma, os sindicatos negociam exaustivamente com as entidades patronais para homologar esse valor mínimo, garantindo que o seu conhecimento técnico receba uma justa contraprestação financeira, blindando-o contra desvalorizações excessivas do mercado.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-6 border-l-4 border-emerald-500 pl-4">
            Análise Essencial do Valor Oficial em 2026
          </h2>

          <p>
            O piso do <strong>{profissao.title}</strong> foi estabelecido em <strong>R$ {profissao.piso2026.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong> por meio de <strong>{profissao.fonte}</strong>. 
          </p>

          <p>
            Essa remuneração é atrelada a uma jornada típica de <strong>{profissao.cargaHoraria}</strong>. 
          </p>

          <p>
            Mas o que acontece se o seu contrato prever menos horas por semana? 
          </p>

          <p>
            Aí é que está o detalhe: a CLT ampara o cálculo proporcional. 
          </p>

          <p>
            Se você cumpre metade da carga horária convencional, poderá receber um valor proporcional a essa metade, a menos que a convenção coletiva regional do seu sindicato vede expressamente essa redução proporcional.
          </p>

          <h3 className="text-xl font-bold text-slate-850 dark:text-slate-150 mt-8 mb-4">
            Tabela de Remuneração por Nível de Experiência
          </h3>

          <p>
            Sabemos que a evolução na carreira traz novos desafios e que a remuneração deve acompanhar essa bagagem. 
          </p>

          <p>
            Para que você possa planejar o seu futuro financeiro a médio e longo prazo, estruturamos uma tabela comparativa detalhada, dividida por níveis de maturidade profissional.
          </p>

          <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full min-w-[750px] text-sm text-left border-collapse bg-white dark:bg-slate-900">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Nível Profissional</th>
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Jornada Semanal</th>
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Responsabilidades Principais</th>
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300 text-right">Salário Estimado 2026</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Júnior / Assistente (Piso)</td>
                  <td className="px-6 py-4 text-slate-500">{profissao.cargaHoraria}</td>
                  <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-400">Execução técnica supervisionada, rotinas operacionais básicas e processos de suporte.</td>
                  <td className="px-6 py-4 font-extrabold text-slate-800 dark:text-white text-right">
                    R$ {profissao.faixasProfissionais.junior.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Pleno / Analista</td>
                  <td className="px-6 py-4 text-slate-500">{profissao.cargaHoraria}</td>
                  <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-400">Autonomia em demandas de média complexidade, soluções táticas e análise de indicadores.</td>
                  <td className="px-6 py-4 font-extrabold text-emerald-600 dark:text-emerald-400 text-right">
                    R$ {profissao.faixasProfissionais.pleno.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Sênior / Coordenador</td>
                  <td className="px-6 py-4 text-slate-500">{profissao.cargaHoraria}</td>
                  <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-400">Liderança de projetos estratégicos, mentoria técnica de juniores e gestão de riscos operacionais.</td>
                  <td className="px-6 py-4 font-extrabold text-blue-600 dark:text-blue-400 text-right">
                    R$ {profissao.faixasProfissionais.senior.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400 italic">
            *Nota: Os salários acima são estimativas projetadas a partir das médias de mercado CLT brasileiras registradas no CAGED e em convenções estaduais para 2026.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-6 border-l-4 border-emerald-500 pl-4">
            Adicionais Trabalhistas: Como Potencializar Seu Salário Bruto
          </h2>

          <p>
            Você sabia que o piso salarial é apenas a fundação do seu holerite? 
          </p>

          <p>
            Muitas vezes, a atividade profissional do <strong>{profissao.title}</strong> envolve condições ambientais ou horários específicos que garantem acréscimos significativos sobre a remuneração base por lei.
          </p>

          <p>
            O principal deles é o <strong>Adicional de Insalubridade</strong> ou de <strong>Periculosidade</strong>. 
          </p>

          <p>
            No caso de exposição frequente a agentes biológicos, químicos nocivos, calor extremo ou eletricidade, a legislação trabalhista brasileira (CLT) obriga o pagamento de percentuais que variam de 10%, 20% a 40% de insalubridade, ou fixos 30% de periculosidade aplicados sobre o salário mínimo ou salário base.
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-150 dark:border-slate-800 my-6 not-prose">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">Quadro de Incidências do {profissao.title}</span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-semibold italic">
              "{profissao.adicionais}"
            </p>
          </div>

          <p>
            Outro ponto vital é o <strong>Adicional Noturno</strong>. 
          </p>

          <p>
            Se a sua jornada de trabalho como <strong>{profissao.title}</strong> se estender entre as 22 horas de um dia e as 5 horas do dia seguinte, cada hora trabalhada recebe um acréscimo mínimo legal de 20%. 
          </p>

          <p>
            E quer saber mais? A hora noturna trabalhada é reduzida de 60 para 52 minutos e 30 segundos, o que acelera o acúmulo de horas extras nos plantões noturnos!
          </p>

          <h3 className="text-xl font-bold text-slate-850 dark:text-slate-150 mt-8 mb-4">
            O Valor dos Benefícios Conquistados via Sindicatos
          </h3>

          <p>
            Além dos adicionais pecuniários tradicionais, as convenções do <strong>{profissao.sindicato}</strong> estipulam uma série de amparos sociais que compõem o chamado salário indireto.
          </p>

          <p>
            O melhor de tudo? Estes benefícios não sofrem a incidência de descontos previdenciários e tributários se a empresa for optante do PAT (Programa de Alimentação do Trabalhador), servindo como dinheiro limpo para custear seu bem-estar.
          </p>

          <p>
            Consulte os acordos coletivos locais da sua região para verificar o acesso a:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            {profissao.beneficios.map((ben, idx) => (
              <li key={idx}>
                <strong>{ben.split(" (")[0]}</strong>: {ben.includes(" (") ? ben.split(" (")[1].replace(")", "") : "Custeado conforme os parâmetros de coparticipação ou acordo sindical do setor."}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-6 border-l-4 border-emerald-500 pl-4">
            Situação Real de Empregabilidade no Mercado
          </h2>

          <p>
            {profissao.detalhesMercado} 
          </p>

          <p>
            A verdade é que o mercado valoriza e sempre pagará mais para o profissional que resolve gargalos complexos. 
          </p>

          <p>
            Se você se limitar a executar apenas o arroz com feijão básico do cargo, ficará eternamente refém do piso mínimo de admissão. 
          </p>

          <p>
            Mas, por outro lado, se você buscar dominar ferramentas tecnológicas de ponta na sua área, buscar especializações validadas pela associação da categoria e aprimorar a sua oratória corporativa, passará a ditar o seu preço de mercado.
          </p>

          <h3 className="text-xl font-bold text-slate-850 dark:text-slate-150 mt-8 mb-4">
            Como Consultar e Fiscalizar os Seus Direitos
          </h3>

          <p>
            Se você suspeitar que a sua empresa está descumprindo o piso salarial ou sonegando o pagamento de horas extras e adicionais noturnos, saiba que você não está desamparado.
          </p>

          <p>
            A primeira recomendação é buscar a mediação amigável junto ao setor de Recursos Humanos de forma documental. 
          </p>

          <p>
            Caso as irregularidades persistam, você pode acionar de forma totalmente sigilosa o sindicato que representa a categoria profissional na sua cidade ou fazer uma denúncia anônima através do Portal da Inspeção do Trabalho do Governo Federal. 
          </p>

          <p>
            A lei garante proteção contra retaliações ao trabalhador que reivindica seus direitos básicos previstos na Consolidação das Leis do Trabalho (<GlossaryTerm slug="inss-previdencia-social">CLT</GlossaryTerm>).
          </p>

          {/* SEÇÃO FAQ COM 7 DÚVIDAS REAIS (Obrigatório AdSense / Grounding Copilot) */}
          <div className="mt-16 not-prose">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-emerald-500" /> Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-900/50 open:ring-1 open:ring-emerald-100 dark:open:ring-emerald-900/30 transition-all">
                      <summary className="font-semibold text-slate-850 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-emerald-500 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug text-slate-800 dark:text-slate-200">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* REFERÊNCIAS OFICIAIS */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Fontes de Legislação Oficial
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Consulte a base de publicação original do piso profissional:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      CLT - Portal do Planalto <ExternalLink size={10}/>
                  </a>
                  {profissao.slug === "enfermeiro" ? (
                      <a href="https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14434.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                          Lei do Piso de Enfermagem <ExternalLink size={10}/>
                      </a>
                  ) : (
                      <span className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm text-slate-500 dark:text-slate-400">
                          Base Legal: {profissao.fonte}
                      </span>
                  )}
              </div>
          </div>

          {/* Expert Signature - Using specialized Personal Dev/Systems signature for technical tool (Rule 12) */}
          <ExpertSignature updatedAt="Maio de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
        </div>

        <SmartGlossaryLinker currentHref={`/trabalhista/piso-salarial/${profissao.slug}`} category="trabalhista" />
        <SmartCrossLinker currentHref={`/trabalhista/piso-salarial/${profissao.slug}`} category="trabalhista" />

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="horas_bottom" format="horizontal" variant="software" />
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
