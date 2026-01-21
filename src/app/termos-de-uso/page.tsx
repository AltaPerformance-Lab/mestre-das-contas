import type { Metadata } from "next";
import Link from "next/link";
import { FileText, AlertTriangle, Scale, ShieldAlert, Gavel, RefreshCw } from "lucide-react";

// --- 1. METADATA DE CONFORMIDADE ---
export const metadata: Metadata = {
  title: "Termos de Uso | Mestre das Contas",
  description: "Leia nossos termos de serviço. Regras sobre o uso das calculadoras, isenção de responsabilidade e propriedade intelectual.",
  // IMPORTANTE: Deixe indexável para o AdSense verificar a conformidade do site.
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://mestredascontas.com.br/termos-de-uso",
  },
};

export default function TermosPage() {
  return (
    <article className="max-w-4xl mx-auto py-12 px-4 md:px-8">
      
      {/* HEADER */}
      <div className="text-center mb-12 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-6 shadow-sm">
           <FileText size={32} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Termos de Uso
        </h1>
        <p className="text-slate-600">
          Vigência a partir de: <span className="font-semibold">Janeiro de 2026</span>
        </p>
      </div>

      <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
        
        <p>
          Bem-vindo ao <strong>Mestre das Contas</strong>. Ao acessar nosso site e utilizar nossas ferramentas, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis, e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.
        </p>

        {/* BLOCO CRÍTICO: DISCLAIMER */}
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 my-8 not-prose">
            <h3 className="flex items-center gap-2 text-xl font-bold text-amber-900 mb-3">
                <AlertTriangle className="text-amber-600" size={24}/> 1. Isenção de Responsabilidade (Importante)
            </h3>
            <p className="text-amber-900/90 text-sm md:text-base leading-relaxed mb-4">
                As calculadoras e conteúdos disponibilizados no Mestre das Contas têm caráter estritamente <strong>educativo e informativo</strong>.
            </p>
            <ul className="space-y-2 text-sm text-amber-900/80">
                <li className="flex gap-2"><strong>• Simulação:</strong> Os resultados apresentados são estimativas baseadas nas regras vigentes, mas podem haver variações dependendo de interpretações sindicais, judiciais ou particularidades contratuais.</li>
                <li className="flex gap-2"><strong>• Sem Valor Legal:</strong> Nossos cálculos <strong>não substituem</strong> o trabalho de um contador, o departamento de RH da sua empresa ou uma decisão judicial.</li>
                <li className="flex gap-2"><strong>• Uso por Risco Próprio:</strong> O Mestre das Contas não se responsabiliza por quaisquer decisões financeiras tomadas com base nas informações aqui apresentadas.</li>
            </ul>
        </div>

        <h3 className="flex items-center gap-2 text-slate-900 font-bold mt-10">
            <Scale className="text-indigo-600" size={24}/> 2. Precisão dos Materiais
        </h3>
        <p>
           Embora nossa equipe de engenharia e conteúdo trabalhe constantemente para manter as tabelas (INSS, IRRF, FGTS) atualizadas conforme a legislação de 2026, os materiais exibidos podem incluir erros técnicos, tipográficos ou fotográficos.
        </p>
        <p>
           O Mestre das Contas pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio, mas não se compromete a atualizar os materiais imediatamente após mudanças na lei.
        </p>

        <h3 className="flex items-center gap-2 text-slate-900 font-bold mt-10">
            <ShieldAlert className="text-emerald-600" size={24}/> 3. Licença de Uso
        </h3>
        <p>
           É concedida permissão para visualizar temporariamente os materiais (informações ou software) no site Mestre das Contas apenas para uso pessoal, não comercial e transitório. Esta é a concessão de uma licença, não uma transferência de título, e sob esta licença você não pode:
        </p>
        <ul>
            <li>Modificar ou copiar os materiais (código-fonte das calculadoras);</li>
            <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública;</li>
            <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site;</li>
            <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais.</li>
        </ul>

        <h3 className="flex items-center gap-2 text-slate-900 font-bold mt-10">
            <RefreshCw className="text-blue-600" size={24}/> 4. Links Externos
        </h3>
        <p>
           O Mestre das Contas não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Mestre das Contas. O uso de qualquer site vinculado é por conta e risco do usuário.
        </p>

        <h3 className="flex items-center gap-2 text-slate-900 font-bold mt-10">
            <Gavel className="text-slate-600" size={24}/> 5. Lei Aplicável
        </h3>
        <p>
           Estes termos e condições são regidos e interpretados de acordo com as leis do Brasil e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
        </p>

        <div className="border-t border-slate-200 mt-12 pt-8 text-center not-prose">
            <p className="text-slate-500 mb-4">Caso não concorde com estes termos, por favor, não utilize nossos serviços.</p>
            <Link 
                href="/" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
                Voltar para a Home
            </Link>
        </div>

      </div>
    </article>
  );
}