import type { Metadata } from "next";
import Link from "next/link";
import { 
  Calculator, ShieldCheck, Zap, 
  Target, Users, Code2, ArrowRight 
} from "lucide-react";

// --- 1. METADATA INSTITUCIONAL (SEO) ---
export const metadata: Metadata = {
  title: "Sobre Nós | Mestre das Contas",
  description: "Conheça a missão do Mestre das Contas: simplificar a matemática financeira e trabalhista para milhões de brasileiros com tecnologia e transparência.",
  keywords: ["sobre mestre das contas", "quem somos", "missão", "tecnologia financeira"],
  alternates: {
    canonical: "https://mestredascontas.com.br/sobre",
  },
  openGraph: {
    title: "Quem faz o Mestre das Contas?",
    description: "Nossa missão é desmistificar a burocracia brasileira.",
    url: "https://mestredascontas.com.br/sobre",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
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
    "mission": "Simplificar o acesso a cálculos trabalhistas e financeiros complexos.",
    "areaServed": "BR"
  }
};

export default function SobrePage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <div className="bg-slate-50 dark:bg-slate-950 py-16 md:py-20 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-sm mb-8 text-blue-600 dark:text-blue-400 ring-1 ring-slate-100 dark:ring-slate-800">
                <Target size={32} strokeWidth={2} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
                Matemática complexa.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Explicada de forma simples.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Nossa missão é desmistificar a burocracia brasileira. Transformamos leis complicadas e fórmulas difíceis em ferramentas que qualquer pessoa consegue usar em segundos.
            </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* PILARES DA MARCA */}
        <div className="grid md:grid-cols-3 gap-8 -mt-20 mb-16 relative z-10">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Calculator size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Precisão Absoluta</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Nossos algoritmos são auditados e atualizados constantemente conforme a legislação vigente (CLT, Receita Federal e Previdência).
                </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Privacidade Total</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Seus dados não saem do seu navegador. Não armazenamos salários ou informações pessoais. A segurança é nossa prioridade nº 1.
                </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Zap size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Alta Performance</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Sem loading infinito. Desenvolvido com a stack mais moderna da web para garantir resultados instantâneos, mesmo no 4G.
                </p>
            </div>
        </div>

        {/* CONTEÚDO INSTITUCIONAL */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-slate dark:prose-invert prose-lg">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Users className="text-indigo-600 dark:text-indigo-400"/> Quem somos nós?
                </h3>
                <p>
                    O <strong>Mestre das Contas</strong> nasceu de uma frustração comum: por que é tão difícil saber quanto vamos receber nas férias ou quanto custa um financiamento de verdade?
                </p>
                <p>
                    Somos uma equipe multidisciplinar formada por <strong>Desenvolvedores Seniores</strong> e consultada por especialistas em <strong>Contabilidade e Direito Trabalhista</strong>.
                </p>
                <p>
                    Nosso compromisso é com a verdade matemática. Não vendemos empréstimos nem temos vínculos com bancos. Somos 100% independentes.
                </p>
                <ul className="not-prose space-y-2 mt-4">
                    <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> Gratuita e acessível.
                    </li>
                    <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> Livre de jargões técnicos ("economês").
                    </li>
                    <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> Rápida e direta ao ponto.
                    </li>
                </ul>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Code2 size={180} />
                </div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
                    <Code2 className="text-blue-400"/> Tecnologia & Desenvolvimento
                </h3>
                <p className="text-slate-300 mb-6 relative z-10 leading-relaxed">
                    Este portal é mantido e desenvolvido com excelência técnica pela <strong>Alta Performance Web</strong>, especializada em soluções digitais que priorizam SEO e Experiência do Usuário.
                </p>
                <a 
                  href="https://altaperformance.dev.br" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition-colors relative z-10"
                >
                  Conhecer a Agência <ArrowRight size={16}/>
                </a>
            </div>
        </div>

        {/* CTA FINAL */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-6">Tem alguma dúvida ou sugestão de melhoria?</p>
            <div className="flex justify-center gap-4">
                <Link href="/fale-conosco" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none">
                    Fale Conosco
                </Link>
                <Link href="/politica-privacidade" className="px-6 py-3 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Privacidade
                </Link>
            </div>
        </div>

      </div>
    </article>
  );
}