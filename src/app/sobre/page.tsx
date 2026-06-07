import type { Metadata } from "next";
import Link from "next/link";
import { 
  Calculator, ShieldCheck, Zap, 
  Target, Users, Code2, ArrowRight, Heart, CheckCircle2
} from "lucide-react";

// --- 1. METADATA INSTITUCIONAL (SEO) ---
export const metadata: Metadata = {
  title: "Sobre Nós | Mestre das Contas",
  description: "Conheça a missão do Mestre das Contas: simplificar a matemática financeira, trabalhista e de saúde para milhões de brasileiros com tecnologia e transparência.",
  keywords: ["sobre mestre das contas", "quem somos", "missão", "tecnologia financeira"],
  alternates: {
    canonical: "https://mestredascontas.com.br/sobre" 
  },
  openGraph: {
    title: "Quem faz o Mestre das Contas?",
    description: "Nossa missão é desmistificar a burocracia brasileira.",
    url: "https://mestredascontas.com.br/sobre",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website" 
  },
  robots: { index: true, follow: true } 
};

// --- 2. DADOS ESTRUTURADOS (ORGANIZATION) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "Mestre das Contas",
    "url": "https://mestredascontas.com.br",
    "logo": "https://mestredascontas.com.br/opengraph-image",
    "foundingDate": "2024",
    "mission": "Simplificar o acesso a cálculos trabalhistas, de saúde e financeiros complexos.",
    "areaServed": "BR"
  }
};

export default function SobrePage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <div className="relative bg-gradient-to-b from-blue-50/50 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 py-16 md:py-24 border-b border-slate-200 dark:border-slate-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-extrabold tracking-wide uppercase mb-6 border border-blue-100 dark:border-blue-800">
                Quem Somos
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 tracking-tight leading-tight md:leading-none">
                Matemática complexa.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Explicada de forma simples.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto mt-4">
                Nossa missão é desmistificar a burocracia brasileira. Transformamos leis complicadas, regras tributárias e fórmulas difíceis em ferramentas interativas que qualquer pessoa consegue usar em segundos de forma totalmente gratuita.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* PILARES DA MARCA */}
        <div className="grid md:grid-cols-3 gap-8 -mt-24 mb-20 relative z-20">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-1.5 transition-all duration-300">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-inner">
                    <Calculator size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Precisão Absoluta</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Nossos algoritmos matemáticos são auditados e atualizados constantemente conforme a legislação vigente (CLT, Receita Federal e Previdência).
                </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-1.5 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-inner">
                    <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Privacidade Total</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Seus dados não saem do seu navegador. Não salvamos salários ou informações pessoais. Sua privacidade é nossa prioridade absoluta.
                </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-1.5 transition-all duration-300">
                <div className="w-14 h-14 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-inner">
                    <Zap size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Alta Performance</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Zero carregamento lento. Desenvolvido com tecnologia de ponta para garantir resultados instantâneos, mesmo nas conexões móveis mais instáveis.
                </p>
            </div>
        </div>

        {/* CONTEÚDO INSTITUCIONAL */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                    <Users className="text-blue-600 dark:text-blue-400" size={32}/> Quem somos nós?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    O <strong>Mestre das Contas</strong> nasceu de uma necessidade diária comum: por que calcular direitos trabalhistas, juros de financiamento ou dados de saúde é sempre tão burocrático e confuso no Brasil?
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Idealizado pelo desenvolvedor <Link href="/sobre/autor" className="text-blue-600 hover:underline font-bold">Hugo Dias</Link> e respaldado por especialistas técnicos e redatores, o portal une o melhor da tecnologia à precisão de conteúdo para entregar transparência aos cidadãos.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Acreditamos na independência da informação: somos 100% autônomos, não oferecemos empréstimos ocultos nem temos vínculos com instituições bancárias.
                </p>
                <ul className="space-y-3 pt-2">
                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold text-sm">
                        <CheckCircle2 size={16} className="text-emerald-500" /> Ferramentas totalmente gratuitas e livres.
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold text-sm">
                        <CheckCircle2 size={16} className="text-emerald-500" /> Linguagem clara e livre de jargões técnicos.
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold text-sm">
                        <CheckCircle2 size={16} className="text-emerald-500" /> Processamento seguro local (client-side).
                    </li>
                </ul>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Code2 size={220} />
                </div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 relative z-10 text-blue-400">
                    <Code2 size={24}/> Tecnologia Web
                </h3>
                <p className="text-slate-300 mb-8 relative z-10 leading-relaxed text-sm md:text-base">
                    Nossos simuladores e páginas são desenvolvidos e mantidos sob padrões de excelência técnica com a parceria da <strong>Alta Performance Web</strong>, focada em entregar interfaces rápidas, otimizadas para motores de busca (SEO) e centradas no usuário.
                </p>
                <a 
                  href="https://alta-performance-web-site.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all relative z-10 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Conhecer a Agência <ArrowRight size={16}/>
                </a>
            </div>
        </div>

        {/* COMPROMISSO EDITORIAL (E-E-A-T) */}
        <div className="bg-gradient-to-tr from-emerald-50/40 to-teal-50/20 dark:from-slate-900 dark:to-slate-900/50 border border-emerald-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 mb-20">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6 text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck size={36} className="shrink-0" />
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Compromisso com a Metodologia</h2>
                </div>
                <div className="text-slate-700 dark:text-slate-300 space-y-6">
                    <p className="text-base md:text-lg leading-relaxed">
                        A exatidão dos números é o pilar que sustenta a reputação do <strong>Mestre das Contas</strong>. Sabemos que os resultados exibidos influenciam o planejamento e decisões reais da vida e finanças dos nossos leitores.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-8 pt-4">
                        <div className="bg-white/80 dark:bg-slate-950/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-900 shadow-sm">
                            <h4 className="font-extrabold text-slate-900 dark:text-slate-100 mb-2 text-base">Revisão Técnica Contínua</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                Todas as ferramentas financeiras, tributárias e trabalhistas passam por processos de simulação manual comparativa contra as tabelas vigentes de órgãos oficiais do governo.
                            </p>
                        </div>
                        <div className="bg-white/80 dark:bg-slate-950/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-900 shadow-sm">
                            <h4 className="font-extrabold text-slate-900 dark:text-slate-100 mb-2 text-base">Legislação Atualizada</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                Acompanhamos diariamente as portarias oficiais. Mudanças nas alíquotas do INSS, tabelas do IRRF ou regras de reajuste são aplicadas às ferramentas em tempo recorde.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* CTA FINAL */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-12 text-center max-w-xl mx-auto">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Quer falar com a gente?</h4>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">Tem alguma dúvida sobre os cálculos, deseja reportar um erro ou dar uma sugestão de nova calculadora?</p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link href="/fale-conosco" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none">
                    Fale Conosco
                </Link>
                <Link href="/sobre/metodologia" className="px-6 py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Nossa Metodologia
                </Link>
            </div>
        </div>

      </div>
    </article>
  );
}