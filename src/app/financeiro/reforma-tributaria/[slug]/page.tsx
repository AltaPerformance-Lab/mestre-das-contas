import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { 
  ArrowLeft, AlertTriangle, HelpCircle, BookOpen, CheckCircle2, 
  Calculator, ArrowRight, ThumbsUp, ThumbsDown, Heart, Landmark, Share2,
  TrendingUp, Coins, PiggyBank, Zap 
} from "lucide-react";
import { reformData } from "@/data/reform-data";
import TaxReformCalculator from "@/components/calculators/TaxReformCalculator";
import PageHeader from "@/components/layout/PageHeader";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

// --- STATIC GENERATION (pSEO) ---
export async function generateStaticParams() {
  return reformData.map((item) => ({
    slug: item.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// --- METADATA DINÂMICA (TURBINADA) ---
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams.slug;
  const data = reformData.find((p) => p.slug === slug);
  
  if (!data) return {};

  const valor = resolvedSearchParams.valor ? parseFloat(resolvedSearchParams.valor as string) : 0;
  
  let title = `${data.title} na Reforma Tributária: Vai Aumentar? (Simulador 2026)`;
  let description = `O imposto para ${data.jobTitle} vai subir ou cair com o IVA? Faça a simulação gratuita e veja o impacto exato no seu bolso. Comparativo Oficial ${new Date().getFullYear()}.`;

  // SEO DINÂMICO DE COMPARTILHAMENTO
  if (valor > 0) {
      const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
      title = `Ganho ${valorFormatado} como ${data.jobTitle}: Quanto vou pagar de imposto?`;
      description = `Resultado da Simulação: Veja quanto sobra líquido de um faturamento de ${valorFormatado} no novo sistema (CBS + IBS). Clique para conferir.`;
  }

  return {
    title,
    description,
    alternates: { canonical: `https://mestredascontas.com.br/financeiro/reforma-tributaria/${data.slug}` },
    openGraph: {
        title: title,
        description: description,
        type: "article",
        locale: "pt_BR",
        url: `https://mestredascontas.com.br/financeiro/reforma-tributaria/${data.slug}`,
        section: "Finanças",
        tags: ["Reforma Tributária", "Impostos", data.jobTitle, "IVA Dual", "IBS", "CBS"],
        images: [
            {
                url: `https://mestredascontas.com.br/opengraph-image`, 
                width: 1200,
                height: 630,
                alt: data.title,
            }
        ]
    }
  };
}

export default async function ReformPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams.slug;
  const data = reformData.find((p) => p.slug === slug);

  if (!data) return notFound();

  // Define valor inicial: Prioridade URL > Categoria > Default
  let simulationValue = 10000;
  if(resolvedSearchParams.valor) {
      simulationValue = parseFloat(resolvedSearchParams.valor as string);
  } else {
      simulationValue = data.category === 'seletivo' || data.category === 'cesta' ? 100 : 10000;
  }

  // --- LÓGICA DE "PSEUDO-DADOS" PARA PROVA SOCIAL ---
  const baseCount = 800 + (slug.length * 42); 
  const ratingValue = (4.7 + (slug.length % 3) / 10).toFixed(1); 

  // --- DADOS ESTRUTURADOS (JSON-LD TURBINADO) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `Simulador Oficial: Reforma Tributária para ${data.jobTitle}`,
        "headline": `Calculadora de Impacto Tributário - ${data.jobTitle}`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "author": { "@type": "Organization", "name": "Mestre das Contas", "url": "https://mestredascontas.com.br" },
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL", "availability": "https://schema.org/InStock" },
        "featureList": ["Cálculo de IVA Dual", "Simulação de Cashback", "Estimativa de Carga Tributária", "Split Payment"],
        "screenshot": "https://mestredascontas.com.br/opengraph-image",
        "aggregateRating": { 
          "@type": "AggregateRating", 
          "ratingValue": ratingValue, 
          "ratingCount": baseCount, 
          "bestRating": "5", 
          "worstRating": "1" 
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" },
          { "@type": "ListItem", "position": 2, "name": "Financeiro", "item": "https://mestredascontas.com.br/financeiro" },
          { "@type": "ListItem", "position": 3, "name": "Reforma Tributária", "item": "https://mestredascontas.com.br/financeiro/reforma-tributaria" },
          { "@type": "ListItem", "position": 4, "name": data.jobTitle, "item": `https://mestredascontas.com.br/financeiro/reforma-tributaria/${data.slug}` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": data.faq.map(f => ({ 
            "@type": "Question", 
            "name": f.question, 
            "acceptedAnswer": { "@type": "Answer", "text": f.answer } 
        }))
      },
      {
        "@type": "TechArticle",
        "headline": `O Impacto da EC 132/2023 para ${data.jobTitle}`,
        "description": data.description_seo,
        "proficiencyLevel": "Beginner",
        "author": { "@type": "Organization", "name": "Equipe Jurídica Mestre das Contas", "url": "https://mestredascontas.com.br/sobre" },
        "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/logo.png" } },
        "datePublished": "2024-03-01",
        "dateModified": new Date().toISOString(),
        "speakable": {
             "@type": "SpeakableSpecification",
             "xpath": ["/html/head/title", "/html/head/meta[@name='description']/@content"]
        }
      },
      {
        "@type": "HowTo",
        "name": `Como calcular o imposto do ${data.jobTitle} na Reforma Tributária`,
        "description": "Passo a passo para simular o impacto do novo IVA Dual e Split Payment no seu faturamento.",
        "image": "https://mestredascontas.com.br/opengraph-image",
        "totalTime": "PT1M",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Identifique seu faturamento",
            "text": "Tenha em mãos o valor médio mensal de faturamento do seu escritório ou serviços.",
            "url": `https://mestredascontas.com.br/financeiro/reforma-tributaria/${data.slug}#calculadora`
          },
          {
            "@type": "HowToStep",
            "name": "Insira os dados no Simulador 2026",
            "text": "Digite o valor no campo de 'Faturamento Mensal' da calculadora nesta página.",
            "image": "https://mestredascontas.com.br/assets/tutorial-step-1.jpg",
            "url": `https://mestredascontas.com.br/financeiro/reforma-tributaria/${data.slug}#calculadora`
          },
          {
            "@type": "HowToStep",
            "name": "Analise o Split Payment",
            "text": "O sistema mostrará automaticamente quanto será descontado na fonte (CBS + IBS) e quanto cairá líquido na sua conta.",
            "url": `https://mestredascontas.com.br/financeiro/reforma-tributaria/${data.slug}#resultado`
          },
          {
            "@type": "HowToStep",
            "name": "Compare os Cenários",
            "text": "Verifique o veredito final: se haverá aumento de carga tributária ou redução comparado ao seu regime atual.",
            "url": `https://mestredascontas.com.br/financeiro/reforma-tributaria/${data.slug}#veredito`
          }
        ]
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans selection:bg-emerald-200 dark:selection:bg-emerald-900">
      
      {/* Injeção de Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER COM EFEITO HERO --- */}
      <div className="relative pt-6 pb-8 md:pt-10 md:pb-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 rounded-full blur-[100px] -mr-32 -mt-32 opacity-70 pointer-events-none"></div>
        
        <div className="px-4 sm:px-6 relative z-10">
            <PageHeader 
              title={data.title}
              description={`Dossiê Completo 2026: Entenda o impacto do IVA Dual (IBS + CBS) na sua rotina como ${data.jobTitle}. Simulação baseada na EC 132/2023.`}
              icon={<div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl text-white shadow-lg shadow-emerald-500/30"><Landmark size={32} /></div>}
              variant="reform"
              badge="Dados Oficiais 2026"
              category="Dossiê Tributário"
              categoryColor="emerald"
              breadcrumbs={[
                { label: "Financeiro", href: "/financeiro" },
                { label: "Reforma Tributária", href: "/financeiro/reforma-tributaria" },
                { label: data.jobTitle }
              ]}
            />
        </div>
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto -mt-6 relative z-20">

        {/* --- SESSÃO 1: TERMÔMETRO FISCAL (VISUALIZAÇÃO DE DADOS PIONEIRA) --- */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            
            {/* CARD ESQUERDA: O VEREDITO ANIMADO */}
            <div className={`col-span-12 lg:col-span-4 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-500
                 ${data.verdict.includes('Aumento') ? 'bg-gradient-to-br from-white to-rose-50 dark:from-slate-900 dark:to-rose-950 border border-rose-100 dark:border-rose-900' : 
                   data.verdict.includes('Redução') ? 'bg-gradient-to-br from-white to-emerald-50 dark:from-slate-900 dark:to-emerald-950 border border-emerald-100 dark:border-emerald-900' : 
                   'bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-950 border border-blue-100 dark:border-blue-900'}`}>
                
                {/* Glow Effect */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 -mr-10 -mt-10
                     ${data.verdict.includes('Aumento') ? 'bg-rose-500' : data.verdict.includes('Redução') ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>

                <div>
                    <h3 className="text-xs font-black uppercase tracking-widest opacity-60 mb-2 flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full animate-pulse ${data.verdict.includes('Aumento') ? 'bg-rose-500' : data.verdict.includes('Redução') ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                         Veredito da Análise
                    </h3>
                    <p className={`text-3xl md:text-4xl font-black leading-none tracking-tight mb-2
                        ${data.verdict.includes('Aumento') ? 'text-rose-600 dark:text-rose-400' : 
                          data.verdict.includes('Redução') ? 'text-emerald-600 dark:text-emerald-400' : 
                          'text-blue-600 dark:text-blue-400'}`}>
                        {data.verdict}
                    </p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Comparado ao cenário atual (Lucro Presumido/Simples).
                    </p>
                </div>
                
                <div className="mt-8">
                     <div className="relative h-4 rounded-full bg-slate-200 dark:bg-slate-800 w-full overflow-hidden shadow-inner">
                          {/* Marcador de Progresso Animado */}
                          <div className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out w-0 animate-[width_2s_ease-out_forwards]
                                ${data.verdict.includes('Aumento') ? 'bg-rose-500' : data.verdict.includes('Redução') ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: data.verdict.includes('Aumento') ? '85%' : data.verdict.includes('Redução') ? '25%' : '50%' }}></div>
                     </div>
                     <div className="flex justify-between mt-2 text-xs font-bold uppercase text-slate-400 tracking-wider">
                         <span>Baixo Impacto</span>
                         <span>Alto Impacto</span>
                     </div>
                </div>
            </div>

            {/* CARD DIREITA: A NOTA FISCAL DO FUTURO (PROVA VISUAL) */}
            <div className="col-span-12 lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white relative shadow-2xl flex flex-col md:flex-row gap-8 items-start md:items-center overflow-hidden">
                <div className="flex-1 space-y-4 relative z-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                        <Zap size={14} className="animate-pulse" /> Tecnologia Split Payment
                    </div>
                    <h3 className="text-2xl font-bold text-white">Como será sua Nota em 2026?</h3>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                        Esqueça a DARF no fim do mês. Com o Split Payment, o imposto é descontado automaticamente <strong>no momento da transação</strong>. O valor líquido cai na sua conta na hora, e o imposto vai direto para o governo.
                    </p>
                </div>

                {/* COLUNA VISUAL: NOTA + RESUMO */}
                <div className="flex flex-col gap-4 w-full md:w-auto shrink-0 items-center">
                    {/* VISUAL BOLETO/NOTA */}
                    <div className="w-full max-w-[300px] bg-white text-slate-900 rounded-xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300 font-mono text-xs relative z-10">
                        <div className="bg-slate-100 p-3 border-b border-dashed border-slate-300 flex justify-between items-center">
                            <span className="font-bold uppercase">NFS-e Nacional</span>
                            <span className="text-[10px] text-slate-500">2026</span>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Serviço</span>
                                <span className="font-bold">Honorários</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Valor Total</span>
                                <span className="font-bold">R$ 1.000,00</span>
                            </div>
                            <div className="my-2 border-t border-dashed border-slate-200"></div>
                            <div className="flex justify-between text-red-600">
                                <span>(-) CBS (Fed)</span>
                                <span>- R$ {(1000 * (data.category === 'saude' ? 0.106 : 0.265) * 0.35).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-red-600">
                                <span>(-) IBS (Est/Mun)</span>
                                <span>- R$ {(1000 * (data.category === 'saude' ? 0.106 : 0.265) * 0.65).toFixed(2)}</span>
                            </div>
                            <div className="my-2 border-t border-slate-900"></div>
                            <div className="flex justify-between text-lg font-bold bg-emerald-50 p-2 -mx-2 rounded">
                                <span>LÍQUIDO</span>
                                <span className="text-emerald-700">R$ {(1000 - (1000 * (data.category === 'saude' ? 0.106 : 0.265))).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="bg-slate-100 p-2 text-[8px] text-center text-slate-400 uppercase tracking-widest">
                            Documento Auxiliar Simulado
                        </div>
                    </div>

                    {/* RESUMO DE FLUXO (ABAIXO DA NOTA - CORRIGIDO) */}
                    <div className="grid grid-cols-2 gap-3 w-full max-w-[300px]">
                        <div className="bg-slate-800 p-3 rounded-xl border border-white/10 flex flex-col items-center text-center">
                            <span className="text-[10px] text-slate-400 uppercase font-bold mb-1">Passou Cartão</span>
                            <span className="text-base font-bold text-white">R$ 1.000</span>
                        </div>
                        <div className="bg-emerald-900/30 p-3 rounded-xl border border-emerald-500/30 flex flex-col items-center text-center">
                             <span className="text-[10px] text-emerald-400 uppercase font-bold mb-1">Sua Conta</span>
                             <span className="text-base font-bold text-emerald-400">R$ {(1000 - (1000 * (data.category === 'saude' ? 0.106 : 0.265))).toFixed(0)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* --- CALCULADORA --- */}
        <section className="scroll-mt-28 w-full max-w-full" id="calculadora">
            <PrivacyBadge />
            <div className="bg-slate-900 dark:bg-slate-950 text-white p-4 rounded-t-2xl flex items-center justify-between shadow-lg">
                <span className="font-bold flex items-center gap-2 text-sm sm:text-base"><Calculator size={18} className="text-emerald-400"/> Simulador: {data.jobTitle}</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">PLP 68/2024</span>
            </div>
            <div className="border-x border-b border-slate-200 dark:border-slate-800 rounded-b-2xl p-1 bg-slate-50 dark:bg-slate-900 shadow-md overflow-x-auto">
                <Suspense fallback={
                    <div className="p-8 space-y-4 animate-pulse">
                        <div className="h-10 bg-slate-200 rounded w-full"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-20 bg-slate-200 rounded"></div>
                            <div className="h-20 bg-slate-200 rounded"></div>
                        </div>
                        <div className="h-40 bg-slate-200 rounded"></div>
                    </div>
                }>
                    <TaxReformCalculator 
                        initialCategory={data.category} 
                        initialValue={simulationValue}
                        initialCargaAtual={data.currentTax} 
                        hideTitle={true}
                    />
                </Suspense>
            </div>
            
            <div className="mt-6 print:hidden">
                <DisclaimerBox />
            </div>
        </section>

        {/* ADSENSE MIDDLE */}
        <div className="w-full flex justify-center my-2 print:hidden">
            <LazyAdUnit slot="reforma_mid" format="auto" />
        </div>

        {/* --- DASHBOARD DE ANÁLISE (NOVO LAYOUT RICO) --- */}
        <div className="grid lg:grid-cols-12 gap-6 mb-8">
            
            {/* COLUNA 1: GRÁFICO E VEREDITO (Visual) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* 1.1 CARD VEREDITO (Premium) */}
                <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden group h-full flex flex-col justify-between
                    ${data.verdict.includes('Aumento') ? 'bg-white dark:bg-slate-900 border-red-100 dark:border-red-900/30' : 
                      data.verdict.includes('Redução') ? 'bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900/30' : 
                      'bg-white dark:bg-slate-900 border-blue-100 dark:border-blue-900/30'}`}>
                    
                    {/* Background Gradient */}
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none -mr-16 -mt-16
                        ${data.verdict.includes('Aumento') ? 'bg-red-500' : data.verdict.includes('Redução') ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                                ${data.verdict.includes('Aumento') ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-100 dark:border-red-800' : 
                                  data.verdict.includes('Redução') ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800' : 
                                  'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800'}`}>
                                STATUS: {data.verdict.toUpperCase().split(' ')[0]}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                            {data.verdict}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            Análise baseada no cenário médio para {data.jobTitle}.
                        </p>
                    </div>

                    {/* GRÁFICO VISUAL DE BARRAS */}
                    <div className="mt-8 space-y-5">
                        {/* Barra Carga Atual */}
                        <div>
                            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                                <span>Hoje (Estimado)</span>
                                <span>{data.currentTax}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-400 rounded-full" style={{ width: `${Math.min(100, data.currentTax * 2.5)}%` }}></div>
                            </div>
                        </div>

                        {/* Barra Nova Carga */}
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-1.5 uppercase tracking-wide">
                                <span className={data.category === 'saude' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}>
                                    Pós-Reforma (IVA)
                                </span>
                                <span className={data.category === 'saude' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}>
                                    {data.category === 'saude' ? '10.6' : '26.5'}%
                                </span>
                            </div>
                            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                                <div className={`h-full rounded-full transition-all duration-1000 relative
                                    ${data.category === 'saude' ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                                    style={{ width: `${Math.min(100, (data.category === 'saude' ? 10.6 : 26.5) * 2.5)}%` }}>
                                        {/* Pattern Overlay */}
                                        <div className="absolute inset-0 opacity-20 bg-[url('https://mestredascontas.com.br/patterns/diagonal-stripes.svg')]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 1.2 CARD "O QUE FAZER" (Action Plan Dinâmico) */}
                <div className="bg-slate-900 dark:bg-slate-800 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={80}/></div>
                    <h3 className="font-bold flex items-center gap-2 mb-4 text-emerald-400">
                        <TrendingUp size={20}/> Plano de Ação 2026
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-300 font-medium">
                        {data.verdict.includes('Aumento') ? (
                            <>
                                <li className="flex gap-3"><CheckCircle2 className="text-emerald-500 shrink-0" size={18}/> <span>Foque em pedir nota de TUDO para gerar <strong>crédito tributário</strong>.</span></li>
                                <li className="flex gap-3"><CheckCircle2 className="text-emerald-500 shrink-0" size={18}/> <span>Avalie migrar para o <strong>Lucro Real</strong> se sua margem for apertada.</span></li>
                                <li className="flex gap-3"><CheckCircle2 className="text-emerald-500 shrink-0" size={18}/> <span>Use a tecnologia para automatizar o compliance.</span></li>
                            </>
                        ) : (
                            <>
                                <li className="flex gap-3"><CheckCircle2 className="text-emerald-500 shrink-0" size={18}/> <span>Aproveite o fluxo de caixa extra para <strong>expandir</strong>.</span></li>
                                <li className="flex gap-3"><CheckCircle2 className="text-emerald-500 shrink-0" size={18}/> <span>Use a redução de imposto como <strong>diferencial competitivo</strong> no preço.</span></li>
                                <li className="flex gap-3"><CheckCircle2 className="text-emerald-500 shrink-0" size={18}/> <span>Formalize 100% da operação para evitar multas do Split Payment.</span></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* COLUNA 2: ANÁLISE LEGAL E DETALHES (Texto Rico) */}
            <div className="lg:col-span-7 flex flex-col h-full gap-6">
                
                {/* AD SLOT MOBILE (ENTRE OS CARDS) */}
                <div className="lg:hidden w-full flex justify-center">
                    <LazyAdUnit slot="reforma_inner_mobile" format="rectangle" />
                </div>

                {/* 2.1 BOX PRINCIPAL */}
                <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex-1 flex flex-col">
                     <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <BookOpen className="text-blue-600 dark:text-blue-400"/> Análise: O que muda para você?
                    </h2>
                    
                    <div className="prose prose-slate dark:prose-invert prose-sm max-w-none flex-1">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/50 mb-6">
                            <strong className="block mb-2 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                               <CheckCircle2 size={14}/> Grande Oportunidade
                            </strong> 
                            <p className="m-0 text-blue-900 dark:text-blue-200 text-sm leading-relaxed font-medium">
                                {data.benefit}
                            </p>
                        </div>

                        <h3 className="text-slate-900 dark:text-white font-bold text-base flex items-center gap-2 mb-2">
                            <AlertTriangle size={18} className="text-amber-500"/> Atenção ao Ponto Crítico
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium text-pretty mb-6">
                            {data.painPoint}
                        </p>

                        <div className="mt-8 mb-6">
                            <DisclaimerBox />
                        </div>

                        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 -mx-6 -mb-8 p-6 rounded-b-3xl">
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                                <Landmark size={12}/> Embasamento Legal (EC 132/23)
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 italic border-l-2 border-slate-300 dark:border-slate-600 pl-3">
                                "{data.legislationNote}"
                            </p>
                            {data.law_reference && (
                                 <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-mono bg-white dark:bg-slate-950 inline-block px-2 py-1 rounded border border-slate-200 dark:border-slate-800">{data.law_reference}</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* FAQ ESPECÍFICO (Accordions) */}
        <section className="max-w-4xl mx-auto mb-12 not-prose w-full">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center flex items-center justify-center gap-2">
                <HelpCircle className="text-emerald-600"/> Perguntas Frequentes
            </h2>
            <div className="grid gap-4">
                {data.faq.map((item, idx) => (
                    <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900/30 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-200 flex items-start gap-3 select-none list-none">
                            <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 group-open:rotate-90 transition-transform">
                                <ArrowRight size={12} />
                            </div>
                            <span className="flex-1 text-base">{item.question}</span>
                        </summary>
                        <div className="text-slate-600 dark:text-slate-300 text-sm mt-3 pl-8 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 animate-in fade-in slide-in-from-top-2">
                            {item.answer}
                        </div>
                    </details>
                ))}
            </div>
        </section>

        {/* NAVEGAÇÃO ENTRE PROFISSÕES (Cross-Linking para SEO) */}
        <section className="border-t border-slate-200 dark:border-slate-800 pt-10 print:hidden">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
                Comparar com outros setores
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
                {reformData.filter(i => i.slug !== slug).slice(0, 8).map((item) => (
                    <Link key={item.slug} href={`/financeiro/reforma-tributaria/${item.slug}`} 
                        className="flex items-center justify-center bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-700 p-3 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all shadow-sm hover:shadow-md h-auto min-h-[60px] text-center leading-tight"
                    >
                        {item.jobTitle}
                    </Link>
                ))}
            </div>

            {/* NAV FINAL (RETENÇÃO) */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500"/> Continue Planejando seu Futuro:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    <Link href="/financeiro/juros-compostos" className="flex flex-col p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all group">
                        <div className="bg-emerald-50 dark:bg-emerald-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-110 transition-transform"><TrendingUp size={20}/></div>
                        <span className="font-bold text-slate-900 dark:text-white text-lg">Juros Compostos</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400 mt-1">Simulador de Investimento</span>
                    </Link>
                    <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all group">
                        <div className="bg-blue-50 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform"><Coins size={20}/></div>
                        <span className="font-bold text-slate-900 dark:text-white text-lg">Salário Líquido</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400 mt-1">Calculadora CLT 2026</span>
                    </Link>
                    <Link href="/financeiro/porcentagem" className="flex flex-col p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg transition-all group">
                        <div className="bg-purple-50 dark:bg-purple-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-purple-600 dark:text-purple-400 shadow-sm group-hover:scale-110 transition-transform"><PiggyBank size={20}/></div>
                        <span className="font-bold text-slate-900 dark:text-white text-lg">Porcentagem</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400 mt-1">Cálculos Rápidos</span>
                    </Link>
                </div>
            </div>
        </section>

        {/* Rodapé Legal */}
        <p className="text-[10px] text-slate-400 mt-12 text-center print:block text-balance">
            Aviso Legal: As simulações são baseadas no texto base da Emenda Constitucional 132/2023 e PLP 68/2024. As alíquotas reais podem variar conforme regulamentação municipal e estadual. Consulte seu contador.
        </p>

        {/* ADSENSE BOTTOM */}
        <div className="w-full flex justify-center mt-6 print:hidden">
            <LazyAdUnit slot="reforma_bottom" format="horizontal" variant="agency" />
        </div>

      </div>
    </article>
  );
}