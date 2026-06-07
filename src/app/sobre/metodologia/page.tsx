import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import { ShieldCheck, BookOpen, Calculator, Database, Lock, Scale, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Metodologia Editorial e de Cálculo | Mestre das Contas",
  description: "Como garantimos a precisão de nossas calculadoras. Conheça nossas fontes de dados oficiais, fórmulas e compromisso com a exatidão matemática.",
  alternates: { canonical: "https://mestredascontas.com.br/sobre/metodologia" }
};

export default function MethodologyPage() {
  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <PageHeader 
          title="Metodologia e Precisão"
          description="Transparência total sobre como processamos seus cálculos e garantimos a integridade das informações."
          category="Institucional"
          icon={<Scale size={32} className="text-blue-600 dark:text-blue-400" />}
          variant="default"
          categoryColor="blue"
          breadcrumbs={[
            { label: "Sobre", href: "/sobre" },
            { label: "Metodologia" }
          ]}
        />

        <div className="mt-12 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none space-y-10">
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <Database className="text-blue-600 dark:text-blue-400" /> Fontes de Dados Oficiais
            </h2>
            <p className="text-slate-750 dark:text-slate-200 leading-relaxed mb-6">
              O <strong>Mestre das Contas</strong> não trabalha com estimativas ou números fictícios. Nossos algoritmos de simulação são abastecidos diretamente por referências de órgãos oficiais brasileiros, incluindo:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-50/50 dark:bg-slate-950/40 p-5 rounded-2xl flex items-start gap-3 border border-slate-100 dark:border-slate-800/80 hover:shadow-sm transition-all duration-300">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                    <div>
                      <h4 className="font-bold text-slate-850 dark:text-slate-200 text-sm">Receita Federal</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">Tabelas progressivas oficiais de IRRF, regras e deduções tributárias vigentes.</p>
                    </div>
                </div>
                <div className="bg-slate-50/50 dark:bg-slate-950/40 p-5 rounded-2xl flex items-start gap-3 border border-slate-100 dark:border-slate-800/80 hover:shadow-sm transition-all duration-300">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                    <div>
                      <h4 className="font-bold text-slate-850 dark:text-slate-200 text-sm">Previdência Social (INSS)</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">Faixas e alíquotas de recolhimento progressivo e tetos anuais de benefício.</p>
                    </div>
                </div>
                <div className="bg-slate-50/50 dark:bg-slate-950/40 p-5 rounded-2xl flex items-start gap-3 border border-slate-100 dark:border-slate-800/80 hover:shadow-sm transition-all duration-300">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                    <div>
                      <h4 className="font-bold text-slate-850 dark:text-slate-200 text-sm">Banco Central do Brasil</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">Taxas oficiais de inflação (IPCA), taxas de juros básicas (SELIC) e IGP-M.</p>
                    </div>
                </div>
                <div className="bg-slate-50/50 dark:bg-slate-950/40 p-5 rounded-2xl flex items-start gap-3 border border-slate-100 dark:border-slate-800/80 hover:shadow-sm transition-all duration-300">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                    <div>
                      <h4 className="font-bold text-slate-850 dark:text-slate-200 text-sm">Legislação (CLT e Códigos)</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">Normativas e artigos do Código de Processo Civil (CPC), Código Civil e CLT.</p>
                    </div>
                </div>
            </div>
          </section>

          <hr className="border-slate-100 dark:border-slate-800" />

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-extrabold text-slate-900 dark:text-white mb-4">
                <Calculator className="text-blue-600 dark:text-blue-400" /> Fluxo de Auditoria e Validação
            </h2>
            <p className="text-slate-750 dark:text-slate-200 leading-relaxed mb-6">
              Toda nova calculadora ou ajuste de tabela passa por quatro fases rígidas de verificação antes de ir ao ar no portal:
            </p>
            <ol className="space-y-4 list-decimal pl-5 text-slate-750 dark:text-slate-200">
                <li><strong>Análise Legal:</strong> Mapeamos o Diário Oficial da União e fontes governamentais para identificar mudanças operacionais.</li>
                <li><strong>Tradução Lógica:</strong> O desenvolvedor traduz a fórmula legal em um algoritmo matemático limpo em Javascript/TypeScript.</li>
                <li><strong>Testes de Estresse:</strong> Rodamos centenas de simulações com casos extremos para comparar resultados com holerites e simuladores públicos oficiais.</li>
                <li><strong>Homologação Editorial:</strong> Um revisor especialista do conselho valida o arredondamento numérico e a redação explicativa do guia.</li>
            </ol>
          </section>

          <div className="bg-blue-50/50 dark:bg-blue-950/30 p-6 md:p-8 rounded-3xl border border-blue-100/50 dark:border-blue-900/30">
            <h3 className="text-blue-950 dark:text-blue-400 font-extrabold text-lg mt-0 flex items-center gap-2">
                <Lock size={18} className="text-blue-600 dark:text-blue-400 shrink-0" /> Segurança e Processamento Local
            </h3>
            <p className="mb-0 text-slate-700 dark:text-slate-300 text-sm leading-relaxed mt-2">
              Acreditamos que a privacidade dos seus dados financeiros e pessoais é sagrada. Por isso, <strong>praticamente 100% dos cálculos do Mestre das Contas são executados diretamente no seu navegador (client-side)</strong>. Nós não armazenamos, registramos ou enviamos salários, dívidas ou históricos de simulações para nossos servidores. Ao fechar a aba do site, os dados desaparecem.
            </p>
          </div>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-extrabold text-slate-900 dark:text-white mb-4">
                <ShieldCheck className="text-blue-600 dark:text-blue-400" /> Isenção de Responsabilidade
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Embora nossa equipe editorial e técnica trabalhe diariamente para garantir a máxima exatidão matemática, todas as simulações do Mestre das Contas têm caráter exclusivamente informativo e pedagógico. Os cálculos não substituem a análise de um profissional de contabilidade, advocacia trabalhista ou medicina (no caso de IMC/gravidez). Sempre consulte um especialista qualificado antes de tomar decisões contratuais ou financeiras.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
