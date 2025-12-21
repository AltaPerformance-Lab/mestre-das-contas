import type { Metadata } from "next";
import Link from "next/link";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Briefcase, Calculator, Calendar, Coins, 
  BookOpen, History, ShieldCheck, HelpCircle, 
  ArrowRight, Scale, AlertTriangle, Clock, Timer, Gift, Wallet
} from "lucide-react";

// --- METADATA (SEO DE CATEGORIA 2026) ---
export const metadata: Metadata = {
  title: "Cálculos Trabalhistas 2026 | Rescisão, Férias e Horas Extras",
  description: "Central de cálculos trabalhistas gratuitos. Simule Rescisão CLT, Férias, Décimo Terceiro, Horas Extras e Seguro-Desemprego com as tabelas oficiais de 2026.",
  keywords: [
    "calculadoras trabalhistas", 
    "direitos clt", 
    "simulador rescisão", 
    "calcular ferias online", 
    "tabela inss 2026", 
    "cálculo exato trabalhista",
    "banco de horas"
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
    images: [{ url: "https://mestredascontas.com.br/og-trabalhista.png", width: 1200, height: 630, alt: "Cálculos Trabalhistas" }],
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
    { "@type": "SoftwareApplication", "name": "Calculadora de 13º Salário", "url": "https://mestredascontas.com.br/trabalhista/decimo-terceiro" },
    { "@type": "SoftwareApplication", "name": "Calculadora de Horas Extras", "url": "https://mestredascontas.com.br/trabalhista/horas-extras" },
    { "@type": "SoftwareApplication", "name": "Calculadora de Seguro-Desemprego", "url": "https://mestredascontas.com.br/trabalhista/seguro-desemprego" },
    { "@type": "SoftwareApplication", "name": "Calculadora de Horas Trabalhadas", "url": "https://mestredascontas.com.br/trabalhista/horas-trabalhadas" }
  ]
};

export default function TrabalhistaHubPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Cálculos Trabalhistas"
          description="A legislação brasileira é complexa, mas seus cálculos não precisam ser. Escolha uma ferramenta abaixo e descubra exatamente quanto você tem a receber."
          category="Direitos & Deveres"
          icon={<Scale size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="blue"
          badge="Atualizado CLT 2026"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Trabalhista" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">

        {/* ANÚNCIO TOPO */}
        <div className="w-full flex justify-center">
           <AdUnit slot="hub_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
        </div>

        {/* --- GRID DE FERRAMENTAS (6 ITENS) --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Rescisão */}
          <Link href="/trabalhista/rescisao" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Briefcase size={80} className="text-blue-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-blue-100">
                <Briefcase size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Rescisão de Contrato</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Foi demitido ou pediu demissão? Calcule saldo de salário, aviso prévio, férias vencidas e a multa de 40% do FGTS.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-blue-600 px-4 py-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                  Calcular Acerto <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 2. Férias */}
          <Link href="/trabalhista/ferias" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Coins size={80} className="text-amber-500" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-amber-100">
                <Coins size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">Calculadora de Férias</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Planeje seu descanso. Veja o valor líquido com 1/3 constitucional, venda de 10 dias (abono) e adiantamento do 13º.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-amber-500 px-4 py-2 rounded-lg group-hover:bg-amber-600 transition-colors">
                  Simular Férias <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 3. 13º Salário */}
          <Link href="/trabalhista/decimo-terceiro" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Gift size={80} className="text-green-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-green-100">
                <Gift size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">13º Salário</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Gratificação natalina. Descubra quanto cairá na 1ª parcela (novembro) e na 2ª parcela (dezembro) com os descontos.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-green-600 px-4 py-2 rounded-lg group-hover:bg-green-700 transition-colors">
                  Ver Parcelas <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 4. Horas Extras */}
          <Link href="/trabalhista/horas-extras" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock size={80} className="text-purple-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-purple-100">
                <Clock size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">Horas Extras</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Quanto vale seu tempo? Calcule horas 50%, 100%, adicional noturno e o reflexo no Descanso Semanal Remunerado (DSR).
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-purple-600 px-4 py-2 rounded-lg group-hover:bg-purple-700 transition-colors">
                  Calcular Extras <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 5. Seguro Desemprego */}
          <Link href="/trabalhista/seguro-desemprego" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck size={80} className="text-indigo-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-indigo-100">
                <ShieldCheck size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Seguro Desemprego</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Foi demitido sem justa causa? Veja se tem direito, quantas parcelas receberá e o valor atualizado do benefício.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                  Simular Benefício <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* 6. Horas Trabalhadas (Ponto) */}
          <Link href="/trabalhista/horas-trabalhadas" className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Timer size={80} className="text-cyan-600" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform shadow-sm ring-1 ring-cyan-100">
                <Timer size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">Horas Trabalhadas</h2>
              <p className="text-slate-600 mb-6 leading-relaxed flex-1 text-sm">
                Calculadora de ponto. Some horas e minutos, desconte o almoço e descubra seu saldo diário de banco de horas.
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center text-sm font-bold text-white bg-cyan-600 px-4 py-2 rounded-lg group-hover:bg-cyan-700 transition-colors">
                  Somar Horas <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

        </section>

        {/* --- CONTEÚDO RICO & HISTÓRIA --- */}
        <div className="prose prose-sm md:prose-lg max-w-none bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-sm mt-10">
          
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={32} /> A Proteção do Trabalhador Brasileiro
          </h2>
          <p className="lead text-slate-700 text-lg">
            O Brasil possui uma das legislações trabalhistas mais completas do mundo. A CLT (Consolidação das Leis do Trabalho) não é apenas um livro de regras; é o escudo que protege o tempo, a saúde e a dignidade de quem trabalha.
          </p>

          {/* BLOCO DE HISTÓRIA */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-3xl text-white my-10 relative overflow-hidden shadow-2xl shadow-slate-900/20">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                  <History size={150} className="text-white"/>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                  <BookOpen size={28} className="text-yellow-400"/> Um Marco Histórico: 1943
              </h3>
              <div className="space-y-4 text-slate-300 relative z-10 leading-relaxed text-base font-medium">
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
          <p className="text-slate-600 mb-8">
              Muitos trabalhadores tentam fazer a conta na calculadora simples e o resultado nunca bate. Isso acontece porque a tributação brasileira funciona em "Cascata" e "Faixas Progressivas":
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-200 transition-colors">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-lg"><Scale className="text-blue-500" size={24}/> Tabela Progressiva</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                      Você não paga 9% sobre todo o salário. Você paga 7,5% sobre a primeira parte, 9% sobre a segunda... É um cálculo fatiado que reduz o imposto final.
                  </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-amber-200 transition-colors">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-lg"><AlertTriangle className="text-amber-500" size={24}/> Dedução em Cascata</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                      O Imposto de Renda (IRRF) só é calculado DEPOIS que o INSS e os dependentes são subtraídos. Se errar a ordem, erra o valor final.
                  </p>
              </div>
          </div>

          {/* FAQ GERAL */}
          <div className="mt-16 not-prose">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HelpCircle className="text-blue-600" /> Perguntas Frequentes sobre CLT
            </h3>
            <div className="space-y-4">
              <details className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
                <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                  Qual a diferença entre Salário Bruto e Remuneração?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                  Salário base é o valor fixo contratado. Remuneração é a soma do salário com outras vantagens como comissões, gratificações, horas extras e adicionais. O 13º e as férias são calculados sobre a <strong>remuneração</strong> (média), e não apenas sobre o salário base.
                </p>
              </details>
              
              <details className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 transition-all">
                <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                  O que é o desconto do "Sistema S"?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
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
    </div>
  );
}