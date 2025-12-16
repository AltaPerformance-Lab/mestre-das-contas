import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | ContaRápida",
  robots: { index: false, follow: true },
};

export default function TermosPage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Termos de Uso</h1>
      
      <div className="prose prose-slate max-w-none text-slate-600">
        <h3>1. Aceitação dos Termos</h3>
        <p>Ao acessar ao site <strong>ContaRápida</strong>, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>

        <h3>2. Isenção de Responsabilidade (Disclaimer)</h3>
        <p>
            Os materiais e ferramentas no site da ContaRápida são fornecidos "como estão". O ContaRápida não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização.
        </p>
        <p>
            <strong>Uso das Calculadoras:</strong> As ferramentas disponibilizadas neste site têm caráter estritamente <strong>educativo e simulado</strong>. Embora nos esforcemos para manter as tabelas e alíquotas atualizadas (como INSS e IRRF), não garantimos precisão absoluta. Os resultados não substituem o cálculo oficial feito por um contador, departamento de RH ou decisão judicial.
        </p>
        <p>
            Em nenhum caso o ContaRápida será responsável por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro) decorrentes do uso ou da incapacidade de usar as ferramentas deste site.
        </p>

        <h3>3. Precisão dos materiais</h3>
        <p>
            Os materiais exibidos no site da ContaRápida podem incluir erros técnicos, tipográficos ou fotográficos. ContaRápida não garante que qualquer material em seu site seja preciso, completo ou atual.
        </p>

        <h3>4. Links</h3>
        <p>
            O ContaRápida não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por ContaRápida.
        </p>
      </div>
    </div>
  );
}