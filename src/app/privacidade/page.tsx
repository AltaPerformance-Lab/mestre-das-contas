import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | ContaRápida",
  robots: { index: false, follow: true }, // Não precisa indexar no Google, mas o bot segue
};

export default function PrivacidadePage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Política de Privacidade</h1>
      
      <div className="prose prose-slate max-w-none text-slate-600">
        <p>A sua privacidade é importante para nós. É política do <strong>ContaRápida</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site.</p>
        
        <h3>1. Informações que coletamos</h3>
        <p>
          Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço (por exemplo, dados para cálculo). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.
          <strong>Não armazenamos nenhum dado sensível ou bancário inserido nas calculadoras.</strong> Todo o processamento é feito em tempo real no seu navegador e descartado em seguida.
        </p>

        <h3>2. Cookies e AdSense</h3>
        <p>
          O ContaRápida utiliza cookies para melhorar a experiência do usuário. Como parceiros do Google AdSense, utilizamos cookies para exibir anúncios relevantes baseados nas suas visitas anteriores a este ou outros sites.
        </p>
        <ul>
            <li>O Google usa cookies para exibir anúncios com base nos seus interesses;</li>
            <li>Você pode desativar a publicidade personalizada acessando as Configurações de Anúncios do Google.</li>
        </ul>

        <h3>3. Compromisso do Usuário</h3>
        <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o ContaRápida oferece no site e com caráter enunciativo, mas não limitativo:</p>
        <ul>
            <li>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
            <li>B) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do ContaRápida, de seus fornecedores ou terceiros.</li>
        </ul>

        <h3>4. Mais informações</h3>
        <p>
            Esta política é efetiva a partir de <strong>Janeiro de 2025</strong>.
        </p>
      </div>
    </div>
  );
}