import Link from "next/link";
import { Metadata } from "next";
import { 
  Calculator, 
  TrendingUp, 
  Heart, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  Landmark,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- IMPORTAÇÃO DOS COMPONENTES DE PUBLICIDADE E CTA ---
import AdUnit from "@/components/ads/AdUnit";
import AgencyCTA from "@/components/layout/AgencyCTA";

// --- METADATA AVANÇADA PARA SEO ---
export const metadata: Metadata = {
  title: "Mestre das Contas - Calculadoras Trabalhistas, Financeiras e Reforma Tributária",
  description: "Faça cálculos exatos de Rescisão, Férias, 13º Salário e simule o impacto da Reforma Tributária 2026. Ferramentas gratuitas e atualizadas pela Lei vigente.",
  keywords: ["calculadora rescisão", "calculadora férias", "reforma tributária 2026", "simulador iva", "cálculo exato", "mestre das contas"],
  alternates: {
    canonical: "https://mestredascontas.com.br",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://mestredascontas.com.br",
    title: "Mestre das Contas - Ferramentas de Precisão",
    description: "Simplifique sua vida financeira com calculadoras que funcionam.",
    siteName: "Mestre das Contas",
  },
};

export default function Home() {
  
  // SCHEMA MARKUP (JSON-LD) - Estrutura de WebSite e Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mestre das Contas",
    "url": "https://mestredascontas.com.br",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mestredascontas.com.br/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "description": "Calculadoras gratuitas para cálculos trabalhistas, financeiros e de saúde.",
    "publisher": {
      "@type": "Organization",
      "name": "Mestre das Contas",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mestredascontas.com.br/icon" // Certifique-se de ter esse arquivo em public/
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* INJEÇÃO DO SCHEMA NO HEAD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* --- HERO SECTION (LCP OTIMIZADO) --- */}
      <section className="relative bg-slate-900 text-white overflow-hidden pb-32">
        {/* Background Pattern Leve (CSS Puro = Zero Carregamento) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-12 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            
            {/* Badge de Atualização */}
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 backdrop-blur-sm text-blue-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest animate-in fade-in zoom-in duration-500">
              <Zap size={14} className="text-yellow-400 fill-yellow-400" /> Atualizado Lei 2026
            </div>
            
            {/* Título Principal (H1) */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700">
              Simplifique suas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Contas</span> e tome decisões melhores.
            </h1>
            
            {/* Subtítulo */}
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              Calculadoras precisas para Finanças, Direitos Trabalhistas e Saúde. 
              Sem cadastro, sem enrolação e 100% gratuito.
            </p>

            {/* Botões de Ação (CTAs) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
              <Link href="/financeiro/reforma-tributaria" className="w-full sm:w-auto">
                <Button className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-500 hover:-translate-y-1 transition-all shadow-lg shadow-blue-900/40 rounded-full w-full">
                  Simular Reforma Tributária
                </Button>
              </Link>
              <Link href="#calculadoras" className="w-full sm:w-auto">
                <Button variant="outline" className="h-14 px-8 text-lg font-medium border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white rounded-full w-full">
                  Ver todas as ferramentas
                </Button>
              </Link>
            </div>

            {/* Prova Social / Trust Badges */}
            <div className="pt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500 font-medium opacity-80 animate-in fade-in duration-1000 delay-300">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Legislação Vigente</span>
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500"/> Privacidade Garantida</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Cálculos Exatos</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- DESTAQUE: REFORMA TRIBUTÁRIA (Overlap na Hero) --- */}
      <section className="px-4 -mt-24 relative z-20 mb-10">
        <div className="max-w-6xl mx-auto">
          {/* Card com efeito Glassmorphism e Borda Brilhante */}
          <div className="bg-slate-900 rounded-3xl shadow-2xl shadow-slate-900/50 border border-emerald-500/30 p-1 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="bg-slate-900/95 backdrop-blur-xl rounded-[20px] p-6 md:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3 mb-2">
                   <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                      <Landmark size={28}/>
                   </div>
                   <span className="text-emerald-400 font-bold tracking-wider uppercase text-xs">Destaque 2026</span>
                </div>
                
                <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                  A Reforma Tributária vai afetar seu bolso?
                </h2>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                  Criamos o simulador mais completo do Brasil. Descubra exatamente como o novo <strong>IVA Dual (IBS + CBS)</strong> impacta sua profissão e seus serviços.
                </p>
                
                <div className="flex flex-wrap gap-2 text-xs md:text-sm text-slate-400 font-medium pt-2">
                  <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">Advogados</span>
                  <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">Médicos</span>
                  <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">PJ / MEI</span>
                  <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-emerald-400">+20 Profissões</span>
                </div>
              </div>

              <Link href="/financeiro/reforma-tributaria" className="shrink-0 w-full lg:w-auto">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold h-14 px-8 rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:scale-105">
                  Calcular Impacto Agora <ArrowRight size={20} className="ml-2"/>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- PUBLICIDADE (SLOT 1 - ALTA VISIBILIDADE) --- */}
      <section className="max-w-5xl mx-auto px-4">
        <AdUnit slot="home_top_feed" format="horizontal" />
      </section>

      {/* --- CATEGORIAS DE CALCULADORAS --- */}
      <section id="calculadoras" className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* BLOCO TRABALHISTA */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-blue-100 text-blue-600 rounded-2xl shadow-sm"><Briefcase size={28}/></div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Trabalhista</h2>
                  <p className="text-slate-500 text-sm md:text-base">Garanta seus direitos. Cálculos baseados na CLT.</p>
                </div>
              </div>
              <Link href="/trabalhista" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
                Ver todos <ArrowRight size={14}/>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                href="/trabalhista/rescisao"
                title="Rescisão de Contrato"
                desc="Vai sair da empresa? Calcule o valor exato da sua rescisão, multa de 40% e férias proporcionais."
                icon={<Calculator size={22} className="text-blue-600"/>}
                highlight
              />
              <FeatureCard 
                href="/trabalhista/seguro-desemprego"
                title="Seguro Desemprego"
                desc="Descubra a quantidade de parcelas que você tem direito e o valor exato do benefício."
                icon={<ShieldCheck size={22} className="text-blue-600"/>}
              />
              <FeatureCard 
                href="/trabalhista/decimo-terceiro"
                title="Décimo Terceiro"
                desc="Calcule a 1ª e 2ª parcela do seu 13º salário com os descontos legais."
                icon={<Briefcase size={22} className="text-blue-600"/>}
              />
              <FeatureCard 
                href="/trabalhista/ferias"
                title="Cálculo de Férias"
                desc="Planeje seu descanso. Saiba quanto vai receber líquido (com 1/3) antes de sair."
                icon={<Zap size={22} className="text-blue-600"/>}
              />
              <FeatureCard 
                href="/trabalhista/horas-extras"
                title="Horas Extras"
                desc="Trabalhou a mais? Veja quanto vale sua hora extra 50%, 100% ou noturna."
                icon={<TrendingUp size={22} className="text-blue-600"/>}
              />
            </div>
          </div>

          {/* --- PUBLICIDADE (SLOT 2 - ENTRE CATEGORIAS) --- */}
          <AdUnit slot="home_middle_feed" format="horizontal" />

          {/* BLOCO FINANCEIRO */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-emerald-100 text-emerald-600 rounded-2xl shadow-sm"><TrendingUp size={28}/></div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Financeiro</h2>
                  <p className="text-slate-500 text-sm md:text-base">Planeje seu futuro e proteja seu dinheiro.</p>
                </div>
              </div>
              <Link href="/financeiro" className="text-emerald-600 font-bold text-sm hover:underline flex items-center gap-1">
                Ver todos <ArrowRight size={14}/>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                href="/financeiro/salario-liquido"
                title="Salário Líquido 2026"
                desc="Tabela de INSS e IRRF atualizada. Saiba quanto realmente cai na sua conta."
                icon={<TrendingUp size={22} className="text-emerald-600"/>}
                highlight
                theme="emerald"
              />
              <FeatureCard 
                href="/financeiro/financiamento"
                title="Financiamento (SAC/Price)"
                desc="Vai comprar casa ou carro? Simule as parcelas e descubra os juros reais."
                icon={<Landmark size={22} className="text-emerald-600"/>}
                theme="emerald"
              />
              <FeatureCard 
                href="/financeiro/juros-compostos"
                title="Juros Compostos"
                desc="Simule seus investimentos e veja a mágica dos juros trabalhando a seu favor."
                icon={<TrendingUp size={22} className="text-emerald-600"/>}
                theme="emerald"
              />
            </div>
          </div>

          {/* BLOCO SAÚDE */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-rose-100 text-rose-600 rounded-2xl shadow-sm"><Heart size={28}/></div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Saúde e Bem-estar</h2>
                  <p className="text-slate-500 text-sm md:text-base">Cuidar de você também é uma conta que precisa fechar.</p>
                </div>
              </div>
              <Link href="/saude" className="text-rose-600 font-bold text-sm hover:underline flex items-center gap-1">
                Ver todos <ArrowRight size={14}/>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                href="/saude/imc"
                title="Cálculo de IMC"
                desc="Verifique se seu Índice de Massa Corporal está na faixa ideal."
                icon={<Heart size={22} className="text-rose-600"/>}
                theme="rose"
              />
              <FeatureCard 
                href="/saude/gestacional"
                title="Idade Gestacional"
                desc="Acompanhe as semanas da gravidez e a Data Provável do Parto (DPP)."
                icon={<Heart size={22} className="text-rose-600"/>}
                theme="rose"
              />
              <FeatureCard 
                href="/saude/calorias-diarias"
                title="Gasto Calórico (TMB)"
                desc="Quantas calorias você gasta por dia? Essencial para dieta."
                icon={<Zap size={22} className="text-rose-600"/>}
                theme="rose"
              />
              <FeatureCard 
                href="/saude/agua"
                title="Ingestão de Água"
                desc="Descubra a quantidade exata de água para seu peso corporal."
                icon={<CheckCircle2 size={22} className="text-rose-600"/>}
                theme="rose"
              />
            </div>
          </div>

        </div>
      </section>

      {/* --- CTA FINAL DA AGÊNCIA (Capture Leads de Desenvolvimento) --- */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
         <AgencyCTA />
      </section>

    </div>
  );
}

// --- COMPONENTE DE CARD TIPADO E OTIMIZADO ---
interface FeatureCardProps {
  href: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  highlight?: boolean;
  theme?: "blue" | "emerald" | "rose"; // Permite variar as cores do hover
}

function FeatureCard({ href, title, desc, icon, highlight = false, theme = "blue" }: FeatureCardProps) {
  
  // Definição de cores baseadas no tema
  const themeStyles = {
    blue: {
      border: "hover:border-blue-400",
      bgHighlight: "bg-blue-50/50 border-blue-200",
      textHighlight: "text-blue-700",
      badge: "bg-blue-100 text-blue-700"
    },
    emerald: {
      border: "hover:border-emerald-400",
      bgHighlight: "bg-emerald-50/50 border-emerald-200",
      textHighlight: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-700"
    },
    rose: {
      border: "hover:border-rose-400",
      bgHighlight: "bg-rose-50/50 border-rose-200",
      textHighlight: "text-rose-700",
      badge: "bg-rose-100 text-rose-700"
    }
  };

  const style = themeStyles[theme];

  return (
    <Link href={href} className="group h-full block">
      <div className={`h-full p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col relative overflow-hidden
        ${highlight 
          ? `${style.bgHighlight} shadow-sm` 
          : `bg-white border-slate-200 ${style.border}`
        }`}>
        
        {/* Ícone e Badge */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="p-2.5 bg-slate-50 rounded-xl group-hover:scale-110 group-hover:bg-white transition-all shadow-sm">
            {icon}
          </div>
          {highlight && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${style.badge}`}>
              Popular
            </span>
          )}
        </div>

        {/* Conteúdo */}
        <h3 className={`text-lg font-bold text-slate-900 mb-2 transition-colors ${highlight ? style.textHighlight : "group-hover:text-blue-700"}`}>
            {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
            {desc}
        </p>
      </div>
    </Link>
  );
}