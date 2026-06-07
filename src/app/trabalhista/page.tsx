import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Briefcase, History, BookOpen, 
  CheckCircle2, Coins, Calculator, 
  Wallet, FileText, Scale, ArrowRight,
  TrendingUp, Clock, CalendarDays, Zap, ShieldCheck, Plus, HelpCircle
} from "lucide-react";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

// --- METADATA (SEO 2026) ---
export const metadata: Metadata = {
  title: "Cálculos Trabalhistas CLT 2026 | Rescisão, Férias e 13º Salário",
  description: "Confira seus direitos trabalhistas em 2026. Simuladores gratuitos de rescisão CLT, férias, 13º salário, seguro-desemprego e horas extras. Tudo atualizado.",
  keywords: [
    "cálculos trabalhistas", 
    "rescisão clt", 
    "férias proporcionais", 
    "décimo terceiro salário",
    "seguro desemprego 2026",
    "direitos do trabalhador"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/trabalhista" },
  openGraph: {
    title: "Portal de Cálculos Trabalhistas 2026 | Mestre das Contas",
    description: "Confira seus direitos. Simuladores de Rescisão, Férias, 13º Salário e Seguro-Desemprego atualizados com as regras de 2026.",
    url: "https://mestredascontas.com.br/trabalhista",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [
      { 
        url: "/opengraph-image", 
        width: 1200, 
        height: 630, 
        alt: "Cálculos Trabalhistas Mestre das Contas", 
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seus Direitos Trabalhistas sob controle!",
    description: "Acesse nossas ferramentas gratuitas e calcule sua rescisão, férias e muito mais.",
    images: ["/opengraph-image"],
  } };

// --- SCHEMA.ORG (COLLECTION) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Direitos e Cálculos Trabalhistas 2026",
      "description": "Portal completo com ferramentas gratuitas para cálculo de benefícios e verbas rescisórias CLT.",
      "url": "https://mestredascontas.com.br/trabalhista",
      "hasPart": [
        { "@type": "SoftwareApplication", "name": "Cálculo de Rescisão", "url": "https://mestredascontas.com.br/trabalhista/rescisao" },
        { "@type": "SoftwareApplication", "name": "Cálculo de Férias", "url": "https://mestredascontas.com.br/trabalhista/ferias" },
        { "@type": "SoftwareApplication", "name": "Cálculo de 13º Salário", "url": "https://mestredascontas.com.br/trabalhista/decimo-terceiro" },
        { "@type": "SoftwareApplication", "name": "Seguro-Desemprego", "url": "https://mestredascontas.com.br/trabalhista/seguro-desemprego" },
        { "@type": "SoftwareApplication", "name": "Horas Extras", "url": "https://mestredascontas.com.br/trabalhista/horas-extras" }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" },
        { "@type": "ListItem", "position": 2, "name": "Trabalhista", "item": "https://mestredascontas.com.br/trabalhista" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "1. Qual é o prazo legal para a empresa fazer o acerto rescisório?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Conforme o artigo 477, § 6º da CLT, a empresa tem o prazo improrrogável de até 10 dias corridos, contados a partir do término do contrato de trabalho, para efetuar o pagamento das verbas rescisórias e entregar os documentos de rescisão ao trabalhador."
          }
        },
        {
          "@type": "Question",
          "name": "2. Como funciona o cálculo de férias proporcionais?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As férias proporcionais correspondem a 1/12 (um doze avos) do salário por cada mês trabalhado ou fração superior a 14 dias dentro do período aquisitivo. Ao valor final, adiciona-se o terço constitucional (1/3)."
          }
        },
        {
          "@type": "Question",
          "name": "3. O décimo terceiro salário pode ser pago em uma única parcela?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Legalmente, o 13º salário deve ser dividido em duas parcelas: a primeira entre 1º de fevereiro e 30 de novembro, e a segunda até 20 de dezembro. O pagamento em parcela única só é permitido se efetuado até 30 de novembro."
          }
        },
        {
          "@type": "Question",
          "name": "4. Quem pede demissão tem direito a receber o seguro-desemprego?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não. O seguro-desemprego é um benefício de amparo financeiro temporário concedido exclusivamente a trabalhadores demitidos sem justa causa ou em rescisão indireta. Quem pede demissão perde o direito ao benefício."
          }
        },
        {
          "@type": "Question",
          "name": "5. Qual é o limite de horas extras permitidas por lei diariamente?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "De acordo com o artigo 59 da CLT, a jornada diária normal de trabalho pode ser acrescida de horas suplementares em número não excedente a 2 (duas) horas por dia, mediante acordo escrito ou contrato coletivo."
          }
        },
        {
          "@type": "Question",
          "name": "6. O que é o saldo de salário na rescisão de contrato?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O saldo de salário é o pagamento pelos dias em que o empregado efetivamente trabalhou no mês da rescisão. Calcula-se dividindo o salário mensal por 30 e multiplicando pelo número de dias trabalhados até o desligamento."
          }
        },
        {
          "@type": "Question",
          "name": "7. A multa de 40% incide sobre o saldo atual do FGTS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A multa de 40% nas demissões sem justa causa incide sobre a totalidade de todos os depósitos realizados pelo empregador ao longo do contrato de trabalho, mesmo que o funcionário tenha efetuado saques anteriores (como no saque-aniversário)."
          }
        }
      ]
    }
  ]
};

export default function TrabalhistaHubPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Direitos Trabalhistas"
          description="Acesse simuladores precisos e atualizados com a legislação vigente. Proteja seu bolso e entenda cada centavo do seu holerite."
          category="CLT 2026"
          icon={<Briefcase size={32} strokeWidth={2} />}
          variant="labor" 
          categoryColor="blue"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Trabalhista" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">

        {/* ANÚNCIO TOPO */}
        <div className="w-full flex justify-center">
           <LazyAdUnit slot="hub_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
        </div>

        {/* --- GRID DE FERRAMENTAS (6 ITENS) --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Rescisão */}
          <Link href="/trabalhista/rescisao" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText size={80} className="text-blue-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-blue-100">
                <FileText size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Cálculo de Rescisão</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Simule seu acerto trabalhista completo: saldo de salário, aviso prévio, férias e multa de 40% do FGTS.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-blue-600 px-4 py-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                  Simular Acerto <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 2. Férias */}
          <Link href="/trabalhista/ferias" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <CalendarDays size={80} className="text-indigo-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-indigo-100">
                <CalendarDays size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Cálculo de Férias</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Saiba quanto vai receber de férias líquidas com 1/3 constitucional, abono pecuniário e descontos.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                  Calcular Férias <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 3. 13º Salário */}
          <Link href="/trabalhista/decimo-terceiro" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Coins size={80} className="text-emerald-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-emerald-100">
                <Coins size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">13º Salário</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Calcule o valor exato da primeira e segunda parcela do seu décimo terceiro com descontos de 2026.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-emerald-600 px-4 py-2 rounded-lg group-hover:bg-emerald-700 transition-colors">
                  Calcular 13º <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 4. Seguro-Desemprego */}
          <Link href="/trabalhista/seguro-desemprego" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wallet size={80} className="text-amber-500" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-amber-100">
                <Wallet size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Seguro-Desemprego</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Veja o valor das parcelas e quantas você tem direito a receber baseado no seu histórico.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-amber-500 px-4 py-2 rounded-lg group-hover:bg-amber-600 transition-colors">
                  Simular Seguro <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 5. Horas Extras */}
          <Link href="/trabalhista/horas-extras" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock size={80} className="text-orange-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-orange-100">
                <Clock size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Horas Extras</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Calcule o valor da sua hora extra com 50%, 100% e DSR. Saiba exatamente quanto deve vir no holerite.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-orange-600 px-4 py-2 rounded-lg group-hover:bg-orange-700 transition-colors">
                  Calcular Horas <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 6. Soma de Horas */}
          <Link href="/trabalhista/soma-de-horas" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Plus size={80} className="text-purple-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-purple-100">
                <Plus size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Soma de Horas</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                Some ou subtraia tempo facilmente. Nossa calculadora já converte os minutos e evita os erros comuns na soma de plantões.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-purple-600 px-4 py-2 rounded-lg group-hover:bg-purple-700 transition-colors">
                  Somar Tempo <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
          {/* 7. Piso Salarial */}
          <div className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Briefcase size={80} className="text-emerald-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-emerald-100">
                  <Briefcase size={28} strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Piso Salarial por Profissão
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-sm">
                  Consulte o salário mínimo e a média de mercado para dezenas de carreiras como enfermeiros, professores e simuladores de holerite correspondentes.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Link href="/trabalhista/piso-salarial/auxiliar-administrativo" className="text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 px-2.5 py-1 rounded-lg transition-colors font-medium">Aux. Administrativo</Link>
                  <Link href="/trabalhista/piso-salarial/recepcionista" className="text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 px-2.5 py-1 rounded-lg transition-colors font-medium">Recepcionista</Link>
                  <Link href="/trabalhista/piso-salarial/pedreiro" className="text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 px-2.5 py-1 rounded-lg transition-colors font-medium">Pedreiro</Link>
                  <Link href="/trabalhista/piso-salarial/engenheiro-civil" className="text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 px-2.5 py-1 rounded-lg transition-colors font-medium">Eng. Civil</Link>
                </div>
              </div>
              <div>
                <Link href="/trabalhista/piso-salarial" className="inline-flex items-center text-sm font-bold text-white bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors w-full justify-center">
                  Consultar Tabela Completa <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>        </section>

        {/* --- CONTEÚDO SEO (ARTIGO) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm mt-10">
          
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
            <Scale className="text-blue-600" size={32} /> Seus Direitos CLT Protegidos e Simplificados
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg mb-6">
            Nós sabemos perfeitamente que o universo das leis trabalhistas brasileiras pode parecer um labirinto burocrático e confuso. A verdade é que cada trabalhador de carteira assinada precisa compreender exatamente quais verbas possui direito a receber, seja no pagamento mensal, nas férias ou no momento de uma rescisão de contrato.
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
            Aqui no <strong>Mestre das Contas</strong>, traduzimos toda essa complexidade legal (Consolidação das Leis do Trabalho - CLT) em simuladores e ferramentas práticas de uso imediato. Nosso objetivo é blindar sua segurança jurídica e garantir que seus cálculos sejam feitos com precisão absoluta, sem surpresas desagradáveis ou erros de cálculo que drenam o seu bolso.
          </p>

          {/* TABELA DE DIREITOS CLT E BASES LEGAIS */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-6">
            Guia de Direitos Trabalhistas Principais
          </h3>
          <div className="overflow-x-auto w-full rounded-2xl border border-slate-200 dark:border-slate-800 mb-8">
            <table className="min-w-[600px] w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Direito CLT</th>
                  <th className="p-4">Base Legal</th>
                  <th className="p-4">Regra Principal</th>
                  <th className="p-4">Impacto Financeiro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Férias + 1/3</td>
                  <td className="p-4">Art. 129 da CLT</td>
                  <td className="p-4">Direito a 30 dias de descanso remunerado a cada 12 meses trabalhados</td>
                  <td className="p-4">Salário integral acrescido de 33,33% de abono constitucional</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">13º Salário</td>
                  <td className="p-4">Lei nº 4.090/1962</td>
                  <td className="p-4">Gratificação natalina correspondente a 1/12 avos por mês trabalhado</td>
                  <td className="p-4">Equivale a um salário extra pago em duas parcelas anuais</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Horas Extras</td>
                  <td className="p-4">Art. 59 da CLT</td>
                  <td className="p-4">Remuneração do tempo de trabalho que excede a jornada diária contratual</td>
                  <td className="p-4">Acréscimo mínimo de 50% em dias úteis ou 100% em domingos e feriados</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Rescisão de Contrato</td>
                  <td className="p-4">Art. 477 da CLT</td>
                  <td className="p-4">Quitação de haveres rescisórios com pagamento devido em até 10 dias corridos</td>
                  <td className="p-4">Variável de acordo com o tipo de rescisão (sem justa causa, acordo, etc.)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PERGUNTAS FREQUENTES (FAQ) */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6 flex items-center gap-2">
            <HelpCircle className="text-slate-500" size={26} /> Perguntas Frequentes sobre Direitos Trabalhistas
          </h3>
          <div className="space-y-4">
            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                1. Qual é o prazo legal para a empresa fazer o acerto rescisório?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Conforme o artigo 477, § 6º da CLT, a empresa tem o prazo improrrogável de até 10 dias corridos, contados a partir do término do contrato de trabalho, para efetuar o pagamento das verbas rescisórias e entregar os documentos de rescisão ao trabalhador.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                2. Como funciona o cálculo de férias proporcionais?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                As férias proporcionais correspondem a 1/12 (um doze avos) do salário por cada mês trabalhado ou fração superior a 14 dias dentro do período aquisitivo. Ao valor final, adiciona-se o terço constitucional (1/3).
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                3. O décimo terceiro salário pode ser pago em uma única parcela?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Legalmente, o 13º salário deve ser dividido em duas parcelas: a primeira entre 1º de fevereiro e 30 de novembro, e a segunda até 20 de dezembro. O pagamento em parcela única só é permitido se efetuado até 30 de novembro.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                4. Quem pede demissão tem direito a receber o seguro-desemprego?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Não. O seguro-desemprego é um benefício de amparo financeiro temporário concedido exclusivamente a trabalhadores demitidos sem justa causa ou em rescisão indireta. Quem pede demissão perde o direito ao benefício.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                5. Qual é o limite de horas extras permitidas por lei diariamente?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                De acordo com o artigo 59 da CLT, a jornada diária normal de trabalho pode ser acrescida de horas suplementares em número não excedente a 2 (duas) horas por dia, mediante acordo escrito ou contrato coletivo.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                6. O que é o saldo de salário na rescisão de contrato?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                O saldo de salário é o pagamento pelos dias em que o empregado efetivamente trabalhou no mês da rescisão. Calcula-se dividindo o salário mensal por 30 e multiplicando pelo número de dias trabalhados até o desligamento.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                7. A multa de 40% incide sobre o saldo atual do FGTS?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                A multa de 40% nas demissões sem justa causa incide sobre a totalidade de todos os depósitos realizados pelo empregador ao longo do contrato de trabalho, mesmo que o funcionário tenha efetuado saques anteriores (como no saque-aniversário).
              </div>
            </details>
          </div>

        </div>

        <SmartCrossLinker currentHref="/trabalhista" category="financeiro" />
        
        {/* ANÚNCIO RODAPÉ */}
        <div className="w-full flex justify-center mt-4">
          <LazyAdUnit slot="hub_bottom" format="auto" />
        </div>

      </div>
    </div>
  );
}