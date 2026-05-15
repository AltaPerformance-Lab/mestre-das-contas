import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import { ShieldCheck, BookOpen, Calculator, Database, Lock, Scale, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: "Metodologia Editorial e de Cálculo | Mestre das Contas",
  description: "Como garantimos a precisão de nossas calculadoras. Conheça nossas fontes, fórmulas e compromisso com a exatidão financeira e matemática.",
  alternates: { canonical: "https://mestredascontas.com.br/sobre/metodologia" }
};

export default function MethodologyPage() {
  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <PageHeader 
          title="Metodologia e Precisão"
          description="Transparência total sobre como processamos seus cálculos e garantimos a integridade das informações."
          category="Institucional"
          icon={<Scale size={32} className="text-indigo-600" />}
          variant="default"
          breadcrumbs={[
            { label: "Sobre", href: "/sobre/autor" },
            { label: "Metodologia" }
          ]}
        />

        <div className="mt-12 prose prose-slate dark:prose-invert prose-lg max-w-none bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <section>
            <h2 className="flex items-center gap-3">
                <Database className="text-indigo-500" /> Fontes de Dados Oficiais
            </h2>
            <p>
              O <strong>Mestre das Contas</strong> não utiliza estimativas genéricas. Nossos algoritmos são alimentados por fontes de dados oficiais do governo brasileiro e órgãos reguladores, incluindo:
            </p>
            <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0">
                <li className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex items-start gap-3 border border-slate-100 dark:border-slate-700">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                    <span><strong>Receita Federal:</strong> Tabelas de IRRF e normativas tributárias.</span>
                </li>
                <li className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex items-start gap-3 border border-slate-100 dark:border-slate-700">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                    <span><strong>Previdência Social (INSS):</strong> Alíquotas progressivas e tetos de contribuição.</span>
                </li>
                <li className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex items-start gap-3 border border-slate-100 dark:border-slate-700">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                    <span><strong>Banco Central:</strong> Índices de inflação (IPCA, SELIC) para cálculos de juros.</span>
                </li>
                <li className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex items-start gap-3 border border-slate-100 dark:border-slate-700">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                    <span><strong>CLT (Decreto-Lei 5.452):</strong> Regras para rescisão, férias e 13º salário.</span>
                </li>
            </ul>
          </section>

          <hr className="my-12 border-slate-100 dark:border-slate-800" />

          <section>
            <h2 className="flex items-center gap-3">
                <Calculator className="text-indigo-500" /> Ciclo de Validação Financeira
            </h2>
            <p>
              Cada nova ferramenta ou atualização de tabela passa por um rigoroso processo de auditoria antes de ir ao ar:
            </p>
            <ol>
                <li><strong>Mapeamento Legal:</strong> Analisamos o Diário Oficial da União para capturar mudanças em tempo real.</li>
                <li><strong>Desenvolvimento Algorítmico:</strong> Traduzimos a lei em código matemático puro (Javascript/TypeScript).</li>
                <li><strong>Testes de Stress:</strong> Comparamos os resultados do nosso sistema com holerites reais e simuladores de órgãos oficiais.</li>
                <li><strong>Revisão de Especialista:</strong> Um contador ou especialista financeiro valida a lógica de arredondamento e as exceções da regra.</li>
            </ol>
          </section>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-800 mt-12">
            <h3 className="text-indigo-900 dark:text-indigo-100 font-bold mt-0 flex items-center gap-2">
                <Lock size={20} /> Privacidade Client-Side
            </h3>
            <p className="mb-0 text-indigo-800 dark:text-indigo-300">
              Diferente de grandes portais, acreditamos que sua vida financeira é privada. 
              <strong> 95% de nossas calculadoras rodam inteiramente no seu navegador.</strong> 
              Isso significa que seu salário, sua dívida ou seu patrimônio não são salvos em nossos servidores. Os dados entram, o cálculo é feito e, ao fechar a aba, tudo é apagado.
            </p>
          </div>

          <section className="mt-12">
            <h2 className="flex items-center gap-3">
                <ShieldCheck className="text-indigo-500" /> Aviso de Isenção
            </h2>
            <p className="text-sm text-slate-500">
              Embora busquemos a perfeição matemática, as ferramentas do Mestre das Contas têm caráter informativo e educativo. 
              Cálculos trabalhistas e financeiros podem variar conforme convenções coletivas específicas ou nuances contratuais. 
              Sempre consulte um profissional contábil ou jurídico antes de tomar decisões definitivas.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
