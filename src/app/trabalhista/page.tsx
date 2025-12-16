import type { Metadata } from "next";
import Link from "next/link";
import AdUnit from "@/components/ads/AdUnit";
import { 
  Briefcase, Calculator, Calendar, Coins, 
  BookOpen, History, ShieldCheck, HelpCircle, 
  ArrowRight, Users, Scale, AlertTriangle 
} from "lucide-react";

// --- METADATA (SEO DE CATEGORIA) ---
export const metadata: Metadata = {
  title: "Cálculos Trabalhistas 2025 | Rescisão, Férias e 13º Salário",
  description: "Central de cálculos trabalhistas gratuitos. Simule Rescisão CLT, Férias, Décimo Terceiro e Salário Líquido com as tabelas oficiais de 2025.",
  keywords: [
    "calculadoras trabalhistas", 
    "direitos clt", 
    "simulador rescisão", 
    "calcular ferias online", 
    "tabela inss 2025", 
    "cálculo exato trabalhista"
  ],
  alternates: {
    canonical: "https://mestredascontas.com.br/trabalhista",
  },
  openGraph: {
    title: "Portal de Cálculos Trabalhistas - Mestre das Contas",
    description: "Todas as ferramentas para você conferir seus direitos. Não deixe dinheiro na mesa.",
    url: "https://mestredascontas.com.br/trabalhista",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-trabalhista.png", width: 1200, height: 630, alt: "Cálculos Trabalhistas" }],
  },
};

// --- SCHEMA.ORG (COLLECTION PAGE) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Calculadoras Trabalhistas",
  "description": "Coleção de ferramentas para cálculo de direitos trabalhistas no Brasil.",
  "url": "https://mestredascontas.com.br/trabalhista",
  "hasPart": [
    { "@type": "SoftwareApplication", "name": "Calculadora de Rescisão", "url": "https://mestredascontas.com.br/trabalhista/rescisao" },
    { "@type": "SoftwareApplication", "name": "Calculadora de Férias", "url": "https://mestredascontas.com.br/trabalhista/ferias" },
    { "@type": "SoftwareApplication", "name": "Calculadora de 13º Salário", "url": "https://mestredascontas.com.br/trabalhista/decimo-terceiro" }
  ]
};

export default function TrabalhistaHubPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <header className="text-center py-8 md:py-12 bg-gradient-to-b from-blue-50/50 to-white rounded-3xl border border-blue-50">
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-200 shadow-sm">
          <Scale size={14} /> Direitos & Deveres
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 px-4">
          Cálculos <span className="text-blue-600">Trabalhistas</span> Simplificados
        </h1>
        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto px-4 leading-relaxed">
          A legislação brasileira é complexa, mas seus cálculos não precisam ser. 
          Escolha uma ferramenta abaixo e descubra exatamente quanto você tem a receber.
        </p>
      </header>

      {/* ANÚNCIO TOPO */}
      <div className="w-full flex justify-center">
         <AdUnit slot="hub_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
      </div>

      {/* --- GRID DE FERRAMENTAS (PRINCIPAL) --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card Rescisão */}
        <Link href="/trabalhista/rescisao" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Briefcase size={80} className="text-blue-600" />
          </div>
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
              <Briefcase size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Rescisão de Contrato</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Foi demitido ou pediu demissão? Calcule saldo de salário, aviso prévio, férias vencidas e a multa de 40% do FGTS.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-2 transition-transform">
              Calcular Agora <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </Link>

        {/* Card Férias */}
        <Link href="/trabalhista/ferias" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Coins size={80} className="text-amber-500" />
          </div>
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
              <Coins size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">Calculadora de Férias</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Planeje seu descanso. Veja o valor líquido com 1/3 constitucional, venda de 10 dias (abono) e adiantamento do 13º.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-amber-600 group-hover:translate-x-2 transition-transform">
              Simular Férias <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </Link>

        {/* Card 13º Salário */}
        <Link href="/trabalhista/decimo-terceiro" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Calendar size={80} className="text-green-600" />
          </div>
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
              <Calendar size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">13º Salário</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Gratificação natalina. Descubra quanto cairá na 1ª parcela (novembro) e na 2ª parcela (dezembro) com os descontos.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-green-600 group-hover:translate-x-2 transition-transform">
              Ver Parcelas <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </Link>

        {/* Card Salário Líquido (Cross-link para Financeiro) */}
        <Link href="/financeiro/salario-liquido" className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Calculator size={80} className="text-indigo-600" />
          </div>
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
              <Calculator size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Salário Líquido 2025</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Entenda os descontos mensais do seu holerite (INSS, IRRF, Vale Transporte) e saiba quanto sobra no final do mês.
            </p>
            <span className="inline-flex items-center text-sm font-bold text-indigo-600 group-hover:translate-x-2 transition-transform">
              Calcular Líquido <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </Link>

      </section>

      {/* --- CONTEÚDO RICO & HISTÓRIA --- */}
      <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-sm mt-8">
        
        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <ShieldCheck className="text-blue-600" /> A Proteção do Trabalhador Brasileiro
        </h2>
        <p className="lead text-slate-700 text-lg">
          O Brasil possui uma das legislações trabalhistas mais completas do mundo. A CLT (Consolidação das Leis do Trabalho) não é apenas um livro de regras; é o escudo que protege o tempo, a saúde e a dignidade de quem trabalha.
        </p>

        {/* BLOCO DE HISTÓRIA */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl text-white my-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
                <History size={150} className="text-white"/>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                <BookOpen size={24} className="text-yellow-400"/> Um Marco Histórico: 1943
            </h3>
            <div className="space-y-4 text-slate-300 relative z-10 leading-relaxed text-base md:text-lg">
                <p>
                    Imagine um Brasil sem férias remuneradas, sem 13º salário e sem jornada de trabalho definida. Essa era a realidade antes da Era Vargas.
                </p>
                <p>
                    Em <strong>1º de Maio de 1943</strong>, o presidente Getúlio Vargas anunciou a CLT em um estádio lotado. Foi um momento divisor de águas: pela primeira vez, direitos esparsos foram unificados em um código robusto, inspirado nas cartas sociais modernas da época.
                </p>
                <p>
                    Desde então, direitos como o FGTS (1966) e o Seguro-Desemprego (1986) foram adicionados, fortalecendo a rede de segurança social que hoje calculamos aqui com precisão.
                </p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mt-12 mb-6">Por que é tão difícil calcular "de cabeça"?</h3>
        <p>
            Muitos trabalhadores tentam fazer a conta na calculadora simples e o resultado nunca bate. Isso acontece porque a tributação brasileira funciona em "Cascata" e "Faixas Progressivas":
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><Scale className="text-blue-500" size={20}/> Tabela Progressiva</h4>
                <p className="text-sm text-slate-600">
                    Você não paga 9% sobre todo o salário. Você paga 7,5% sobre a primeira parte, 9% sobre a segunda... É um cálculo fatiado.
                </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><AlertTriangle className="text-amber-500" size={20}/> Dedução em Cascata</h4>
                <p className="text-sm text-slate-600">
                    O Imposto de Renda (IRRF) só é calculado DEPOIS que o INSS e os dependentes são subtraídos. Se errar a ordem, erra o valor.
                </p>
            </div>
        </div>

        {/* FAQ GERAL */}
        <div className="mt-12 not-prose">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-600" /> Perguntas Frequentes sobre CLT
          </h3>
          <div className="space-y-4">
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                Qual a diferença entre Salário Bruto e Remuneração?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                Salário base é o valor fixo contratado. Remuneração é a soma do salário com outras vantagens como comissões, gratificações, horas extras e adicionais. O 13º e as férias são calculados sobre a <strong>remuneração</strong> (média), e não apenas sobre o salário base.
              </p>
            </details>
            
            <details className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
              <summary className="font-semibold text-slate-800 list-none flex justify-between items-center">
                O que é o desconto do "Sistema S"?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                São contribuições para entidades como SESC, SENAI e SEBRAE. Geralmente, esse custo é da empresa, mas em alguns casos específicos pode haver reflexos. Para o trabalhador CLT padrão, o foco principal é INSS e IRRF.
              </p>
            </details>
          </div>
        </div>

      </div>

      {/* ANÚNCIO RODAPÉ */}
      <div className="w-full flex justify-center mt-4">
        <AdUnit slot="hub_bottom" format="auto" />
      </div>

    </div>
  );
}