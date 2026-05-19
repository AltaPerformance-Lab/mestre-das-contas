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

  const title = `Piso Salarial do ${profissao.title} 2026 | Salário Mínimo`;
  const description = `Confira qual é o piso salarial do ${profissao.title} em 2026: R$ ${profissao.piso2026.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}. Veja a média salarial, carga horária, benefícios e simule o salário líquido.`;

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

  // --- DADOS ESTRUTURADOS (JSON-LD COMPLEXO) ---
  const faqList = [
    { 
      q: `Qual o valor do piso salarial do ${profissao.title} em 2026?`, 
      a: `O piso salarial do ${profissao.title} em 2026 é de R$ ${profissao.piso2026.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} para a jornada padrão, conforme estabelecido por ${profissao.fonte}.` 
    },
    { 
      q: `Qual a média salarial real do ${profissao.title} no Brasil?`, 
      a: `A média salarial praticada no mercado brasileiro para o cargo de ${profissao.title} é de aproximadamente R$ ${profissao.mediaSalarial.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}, variando de acordo com a experiência, porte da empresa e região do país.` 
    },
    { 
      q: `Como é calculado o salário líquido sobre o piso do ${profissao.title}?`, 
      a: `O cálculo do salário líquido desconta o INSS e o IRRF sobre o valor bruto. Para o piso de R$ ${profissao.piso2026.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}, você pode simular os descontos exatos na nossa calculadora de salário líquido interativa presente nesta página.` 
    },
    {
      q: `Quais os adicionais previstos para o ${profissao.title}?`,
      a: `Os profissionais desta categoria podem ter direito a: ${profissao.adicionais}.`
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

        {/* --- ARTICLE / EDUCATIONAL CONTENT --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
              Direitos e Convenção Coletiva do {profissao.title}
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            {profissao.desc} Compreender a estrutura de remuneração da sua carreira é essencial para garantir o cumprimento dos seus direitos trabalhistas no mercado formal.
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4">
            Evolução Salarial por Nível de Experiência
          </h3>
          <p>
            Abaixo, apresentamos uma estimativa realista do salário do <strong>{profissao.title}</strong> segmentada por faixa profissional e maturidade de carreira (Júnior, Pleno e Sênior):
          </p>

          {/* TABLE OF LEVELS */}
          <div className="not-prose my-6 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs">
                      <tr>
                          <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Nível Profissional</th>
                          <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Jornada Média</th>
                          <th className="px-6 py-3 font-bold border-b border-slate-200 dark:border-slate-700">Salário Base Estimado</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Júnior / Assistente (Piso)</td>
                          <td className="px-6 py-4 text-slate-500">{profissao.cargaHoraria}</td>
                          <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">
                            R$ {profissao.faixasProfissionais.junior.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Pleno / Analista</td>
                          <td className="px-6 py-4 text-slate-500">{profissao.cargaHoraria}</td>
                          <td className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">
                            R$ {profissao.faixasProfissionais.pleno.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Sênior / Coordenador</td>
                          <td className="px-6 py-4 text-slate-500">{profissao.cargaHoraria}</td>
                          <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">
                            R$ {profissao.faixasProfissionais.senior.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4">
            Adicionais e Benefícios Adicionais Previstos
          </h3>
          <p>
            Além do vencimento básico garantido pela lei ou convenção do sindicato, a atuação profissional do <strong>{profissao.title}</strong> costuma ter incidência de adicionais específicos:
          </p>
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-150 dark:border-slate-800 my-6 not-prose">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">Adicionais de Lei</span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {profissao.adicionais}
            </p>
          </div>

          <p>Os acordos coletivos representativos também estabelecem benefícios extras que auxiliam a compor a remuneração indireta:</p>
          <ul className="list-disc pl-5 space-y-2">
            {profissao.beneficios.map((ben, idx) => (
              <li key={idx}><strong>{ben.split(" (")[0]}:</strong> {ben.includes(" (") ? ben.split(" (")[1].replace(")", "") : "Previsto no plano de cargos da categoria."}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">
            Situação do Mercado e Empregabilidade
          </h3>
          <p>
            {profissao.detalhesMercado} A especialização em subáreas técnicas e cursos credenciados é um dos caminhos mais sólidos para conseguir vagas de liderança com remunerações acima do piso mínimo da categoria profissional.
          </p>

          {/* FAQ ACCORDION */}
          <div className="mt-16 not-prose">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-emerald-500" /> Dúvidas Frequentes sobre o Piso
            </h2>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-900/50 open:ring-1 open:ring-emerald-100 dark:open:ring-emerald-900/30 transition-all">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
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

        <SmartCrossLinker currentHref="/trabalhista/piso-salarial" category="trabalhista" />

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
