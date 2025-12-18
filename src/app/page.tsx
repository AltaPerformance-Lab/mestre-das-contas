import Link from "next/link";
import { 
  Calculator, 
  TrendingUp, 
  Heart, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  Landmark
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Mestre das Contas - Calculadoras Trabalhistas e Financeiras Precisas",
  description: "Faça cálculos de Rescisão, Férias, Financiamentos e Reforma Tributária em segundos. Ferramentas atualizadas pela CLT e legislação vigente.",
};

export default function Home() {
  
  // SCHEMA MARKUP PARA SEO (JSON-LD)
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
    "description": "Calculadoras gratuitas para cálculos trabalhistas, financeiros e de saúde. Simule rescisão, férias, financiamentos e a nova reforma tributária.",
    "publisher": {
      "@type": "Organization",
      "name": "Mestre das Contas",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mestredascontas.com.br/icon.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* INJEÇÃO DO SCHEMA NO HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Zap size={14} className="text-yellow-400" /> Atualizado 2026
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
              Simplifique suas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Contas</span> e tome decisões melhores.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700">
              Calculadoras precisas para Finanças, Direitos Trabalhistas e Saúde. 
              Sem cadastro, sem enrolação e 100% gratuito.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <Link href="/financeiro/reforma-tributaria">
                <Button className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 rounded-full w-full sm:w-auto">
                  Simular Reforma Tributária
                </Button>
              </Link>
              <Link href="#calculadoras">
                <Button variant="outline" className="h-14 px-8 text-lg font-medium border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full w-full sm:w-auto">
                  Ver todas as ferramentas
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500"/> Legislação Atualizada</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-500"/> Dados Seguros</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- DESTAQUE: REFORMA TRIBUTÁRIA --- */}
      <section className="py-8 px-4 -mt-16 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-1 md:p-2 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <Landmark className="text-blue-400" size={32}/>
                  A Reforma Tributária vai afetar você?
                </h2>
                <p className="text-slate-300 text-lg">
                  Criamos o simulador mais completo do Brasil. Descubra exatamente como o novo IVA Dual (IBS + CBS) impacta sua profissão a partir de 2026.
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-slate-400 font-medium pt-2">
                  <span className="bg-white/10 px-3 py-1 rounded-full">Advogados</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full">Médicos</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full">Programadores</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full">+20 Profissões</span>
                </div>
              </div>
              <Link href="/financeiro/reforma-tributaria" className="shrink-0">
                <Button className="bg-white text-slate-900 hover:bg-blue-50 font-bold h-12 px-6 rounded-xl shadow-lg">
                  Calcular Impacto Agora <ArrowRight size={18} className="ml-2"/>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- CATEGORIAS DE CALCULADORAS --- */}
      <section id="calculadoras" className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-20">
          
          {/* BLOCO TRABALHISTA */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Briefcase size={24}/></div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Trabalhista</h2>
                <p className="text-slate-600">Garanta seus direitos. Cálculos exatos baseados na CLT.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                href="/trabalhista/rescisao"
                title="Rescisão de Contrato"
                desc="Vai sair da empresa? Calcule o valor exato da sua rescisão, multa de 40% e férias."
                icon={<Calculator size={20} className="text-blue-600"/>}
              />
              <FeatureCard 
                href="/trabalhista/seguro-desemprego"
                title="Seguro Desemprego"
                desc="Descubra quantas parcelas você tem direito e qual o valor do benefício."
                icon={<ShieldCheck size={20} className="text-blue-600"/>}
              />
              <FeatureCard 
                href="/trabalhista/decimo-terceiro"
                title="Décimo Terceiro"
                desc="Calcule a primeira e segunda parcela do seu 13º salário com descontos."
                icon={<Briefcase size={20} className="text-blue-600"/>}
              />
              <FeatureCard 
                href="/trabalhista/ferias"
                title="Cálculo de Férias"
                desc="Planeje seu descanso. Saiba quanto vai receber líquido antes de sair."
                icon={<Zap size={20} className="text-blue-600"/>}
              />
              <FeatureCard 
                href="/trabalhista/horas-extras"
                title="Horas Extras"
                desc="Trabalhou a mais? Veja quanto vale sua hora extra 50% ou 100%."
                icon={<TrendingUp size={20} className="text-blue-600"/>}
              />
            </div>
          </div>

          {/* BLOCO FINANCEIRO */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><TrendingUp size={24}/></div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Financeiro</h2>
                <p className="text-slate-600">Planeje seu futuro e proteja seu dinheiro.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                href="/financeiro/salario-liquido"
                title="Salário Líquido 2026"
                desc="Descontos de INSS e IRRF atualizados. Saiba quanto cai na conta."
                icon={<TrendingUp size={20} className="text-emerald-600"/>}
                highlight
              />
              <FeatureCard 
                href="/financeiro/financiamento"
                title="Financiamento (SAC/Price)"
                desc="Vai comprar casa ou carro? Simule as parcelas e os juros reais."
                icon={<Landmark size={20} className="text-emerald-600"/>}
              />
              <FeatureCard 
                href="/financeiro/juros-compostos"
                title="Juros Compostos"
                desc="Veja a mágica dos juros trabalhando a seu favor nos investimentos."
                icon={<TrendingUp size={20} className="text-emerald-600"/>}
              />
            </div>
          </div>

          {/* BLOCO SAÚDE */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-xl"><Heart size={24}/></div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Saúde e Bem-estar</h2>
                <p className="text-slate-600">Cuidar de você também é uma conta que precisa fechar.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                href="/saude/imc"
                title="Cálculo de IMC"
                desc="Verifique seu Índice de Massa Corporal ideal."
                icon={<Heart size={20} className="text-rose-600"/>}
              />
              <FeatureCard 
                href="/saude/gestacional"
                title="Idade Gestacional"
                desc="Acompanhe as semanas da gravidez e data provável do parto."
                icon={<Heart size={20} className="text-rose-600"/>}
              />
              <FeatureCard 
                href="/saude/calorias-diarias"
                title="Gasto Calórico"
                desc="Quantas calorias você gasta por dia? (Taxa Metabólica)."
                icon={<Zap size={20} className="text-rose-600"/>}
              />
              <FeatureCard 
                href="/saude/agua"
                title="Ingestão de Água"
                desc="Descubra a quantidade ideal de água para seu peso."
                icon={<CheckCircle2 size={20} className="text-rose-600"/>}
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

// COMPONENTE DE CARD REUTILIZÁVEL
function FeatureCard({ href, title, desc, icon, highlight = false }: any) {
  return (
    <Link href={href} className="group h-full">
      <div className={`h-full p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col
        ${highlight 
          ? 'bg-gradient-to-br from-white to-blue-50 border-blue-200 hover:border-blue-400 shadow-md' 
          : 'bg-white border-slate-200 hover:border-slate-300'
        }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-slate-50 rounded-lg group-hover:scale-110 transition-transform">
            {icon}
          </div>
          {highlight && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              Popular
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
}