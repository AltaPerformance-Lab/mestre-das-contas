import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import { User, ShieldCheck, Mail, Linkedin, Globe, Award, Target, Heart } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Quem Somos | Mestre das Contas",
  description: "Conheça a equipe por trás do Mestre das Contas. Nossa missão é democratizar o acesso a ferramentas financeiras precisas e seguras para todos os brasileiros.",
  alternates: { canonical: "https://mestredascontas.com.br/sobre/autor" }
};

export default function AboutPage() {
  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <PageHeader 
          title="Quem Faz o Mestre das Contas"
          description="Nossa missão é transformar leis complexas em ferramentas simples e úteis para o seu dia a dia."
          category="Institucional"
          icon={<User size={32} className="text-blue-600" />}
          variant="default"
          breadcrumbs={[
            { label: "Sobre", href: "/sobre/autor" },
            { label: "Autor" }
          ]}
        />

        <div className="mt-12 grid md:grid-cols-3 gap-8">
            {/* Sidebar Profile */}
            <div className="md:col-span-1 space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                        MC
                    </div>
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">Equipe Editorial</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4">Mestre das Contas</p>
                    <div className="flex justify-center gap-3">
                        <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                            <Linkedin size={18} />
                        </a>
                        <a href="mailto:contato@mestredascontas.com.br" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                            <Mail size={18} />
                        </a>
                    </div>
                </div>

                <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-xl shadow-blue-500/20">
                    <Award className="mb-4" size={32} />
                    <h4 className="font-bold text-lg mb-2">Compromisso E-E-A-T</h4>
                    <p className="text-blue-100 text-xs leading-relaxed">
                        Seguimos as diretrizes de Experiência, Especialidade, Autoridade e Confiança do Google para garantir que você receba apenas informações validadas.
                    </p>
                </div>
            </div>

            {/* Main Bio */}
            <div className="md:col-span-2 space-y-8">
                <section className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm prose prose-slate dark:prose-invert max-w-none">
                    <h2 className="mt-0 flex items-center gap-3 text-2xl font-bold">
                        <Target className="text-blue-600" /> Nossa Missão
                    </h2>
                    <p>
                        O <strong>Mestre das Contas</strong> nasceu de uma frustração comum: a dificuldade de encontrar calculadoras financeiras que fossem, ao mesmo tempo, precisas, fáceis de usar e seguras.
                    </p>
                    <p>
                        Em um cenário onde as leis trabalhistas e tributárias mudam constantemente, ter acesso a informação de qualidade não deveria custar caro nem exigir que você entregue todos os seus dados pessoais para empresas de marketing.
                    </p>
                    
                    <h2 className="flex items-center gap-3 text-2xl font-bold">
                        <Heart className="text-rose-500" /> Nossos Valores
                    </h2>
                    <ul>
                        <li><strong>Independência:</strong> Não somos ligados a nenhum banco ou órgão governamental. Nossa lealdade é com o usuário.</li>
                        <li><strong>Privacidade Máxima:</strong> Priorizamos tecnologias que processam dados no seu dispositivo, não nos nossos servidores.</li>
                        <li><strong>Gratuidade Real:</strong> Ferramentas essenciais devem ser acessíveis. Nosso sustento vem de publicidade transparente e parcerias selecionadas.</li>
                    </ul>

                    <h2 className="flex items-center gap-3 text-2xl font-bold">
                        <Globe className="text-emerald-500" /> Onde Estamos
                    </h2>
                    <p>
                        Sediados no Brasil, focamos 100% na realidade econômica brasileira, acompanhando de perto as atualizações do Congresso Nacional, Receita Federal e Ministério do Trabalho.
                    </p>
                </section>
            </div>
        </div>
      </div>
    </article>
  );
}
