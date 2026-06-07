import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import { User, ShieldCheck, Mail, Linkedin, Globe, Award, Target, Heart, Code2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Quem Faz o Mestre das Contas | Hugo Dias",
  description: "Conheça Hugo Dias, desenvolvedor idealizador do Mestre das Contas, e a equipe focada em democratizar o acesso a ferramentas financeiras, de saúde e trabalhistas no Brasil.",
  alternates: { canonical: "https://mestredascontas.com.br/sobre/autor" }
};

export default function AboutPage() {
  const authorJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Hugo Dias",
      "jobTitle": "Desenvolvedor de Software",
      "nationality": "Brasileiro",
      "knowsAbout": ["Desenvolvimento Web", "SEO", "Engenharia de Software", "Cálculos Financeiros"],
      "homeLocation": {
        "@type": "Place",
        "name": "Itumbiara, Goiás, Brasil"
      },
      "description": "Desenvolvedor idealizador do portal Mestre das Contas, focado em criar ferramentas digitais que facilitam a vida e finanças das pessoas."
    }
  };

  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }} />
      
      <div className="max-w-5xl mx-auto px-4 pt-12">
        <PageHeader 
          title="Quem Faz o Mestre das Contas"
          description="Conheça a história de idealização do portal e quem está por trás das ferramentas de simulação."
          category="Institucional"
          icon={<User size={32} className="text-blue-600 dark:text-blue-400" />}
          variant="default"
          categoryColor="blue"
          breadcrumbs={[
            { label: "Sobre", href: "/sobre" },
            { label: "Quem Faz" }
          ]}
        />

        <div className="mt-12 grid md:grid-cols-3 gap-8">
            {/* Sidebar Profile */}
            <div className="md:col-span-1 space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                    <div className="w-28 h-28 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-3xl mx-auto mb-5 flex items-center justify-center text-white text-4xl font-extrabold shadow-lg shadow-blue-500/20">
                        HD
                    </div>
                    <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white">Hugo Dias</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Idealizador & Dev</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mb-5">Itumbiara - GO</p>
                    
                    <div className="space-y-3 pt-2">
                        <a href="mailto:contato@mestredascontas.com.br" className="w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-2 font-bold text-sm border border-slate-200/50 dark:border-slate-700">
                            <Mail size={16} />
                            <span>Entrar em Contato</span>
                        </a>
                    </div>
                </div>

                <div className="bg-slate-900 dark:bg-slate-900/40 p-6 rounded-3xl text-white border border-slate-800 shadow-sm">
                    <Award className="mb-4 text-yellow-500" size={32} />
                    <h4 className="font-bold text-lg mb-2">Compromisso E-E-A-T</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                        Seguimos as melhores práticas de produção de conteúdo e revisão matemática para que cada simulador seja totalmente preciso e seguro.
                    </p>
                </div>
            </div>

            {/* Main Bio */}
            <div className="md:col-span-2 space-y-8">
                <section className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-none space-y-6">
                    
                    <h2 className="mt-0 flex items-center gap-3 text-2xl font-extrabold text-slate-900 dark:text-white">
                        <Code2 className="text-blue-600 dark:text-blue-400" /> A Idealização do Portal
                    </h2>
                    
                    <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                        O <strong>Mestre das Contas</strong> foi idealizado por <strong>Hugo Dias</strong>, um desenvolvedor nascido e criado em Itumbiara, no interior de Goiás. Sendo fascinado pela tecnologia e pela capacidade do código de transformar a rotina das pessoas, ele percebeu uma barreira: a maioria das calculadoras de impostos, direitos trabalhistas e saúde na internet eram confusas, lentas ou cheias de pegadinhas para capturar dados pessoais dos usuários.
                    </p>
                    
                    <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                        Foi assim que surgiu a ideia de criar um portal limpo, super rápido e focado em resolver problemas sem enrolação. Cada simulador é desenvolvido localmente (processamento de dados feito no seu navegador) garantindo privacidade total para quem calcula.
                    </p>

                    <h2 className="flex items-center gap-3 text-2xl font-extrabold text-slate-900 dark:text-white">
                        <Target className="text-indigo-600 dark:text-indigo-400" /> Nossa Filosofia
                    </h2>
                    <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                        Acreditamos que a complexidade do sistema de impostos e leis no Brasil não deve ser um obstáculo para as suas escolhas de vida ou negócios. Nossa filosofia se apoia em três grandes pilares:
                    </p>
                    <ul className="text-sm md:text-base space-y-2 text-slate-700 dark:text-slate-200 list-disc pl-5">
                        <li><strong>Simplicidade Absoluta:</strong> Explicamos termos técnicos complicados em linguagem direta e acessível para qualquer pessoa.</li>
                        <li><strong>Segurança e Privacidade:</strong> O Mestre das Contas não retém, armazena ou comercializa qualquer dado inserido nas ferramentas de cálculo.</li>
                        <li><strong>Soberania de Acesso:</strong> Nossas ferramentas são de livre uso, sem necessidade de cadastros, e sempre serão 100% gratuitas.</li>
                    </ul>

                    <h2 className="flex items-center gap-3 text-2xl font-extrabold text-slate-900 dark:text-white">
                        <Heart className="text-rose-500" /> O Conselho Editorial
                    </h2>
                    <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                        Embora Hugo Dias lidere o desenvolvimento e a arquitetura técnica das soluções, o portal conta com o suporte de redatores e revisores especialistas em cada área (como finanças, direito do trabalho e saúde) para conferir a validade dos textos, das fórmulas aplicadas e a conformidade com as regras oficiais vigentes no ano de 2026.
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                        Saiba mais sobre como validamos e mantemos os dados atualizados lendo a nossa <Link href="/sobre/metodologia" className="text-blue-600 dark:text-blue-400 hover:underline">Metodologia Editorial e de Precisão</Link>.
                    </p>
                </section>
            </div>
        </div>
      </div>
    </article>
  );
}
