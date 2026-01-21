import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, FileText, Cookie, Server } from "lucide-react";

// --- 1. METADATA DE CREDIBILIDADE ---
export const metadata: Metadata = {
  title: "Política de Privacidade | Mestre das Contas",
  description: "Entenda como tratamos seus dados. Transparência total sobre cookies, anúncios e a segurança das nossas calculadoras.",
  // IMPORTANTE: AdSense exige que essa página seja indexável!
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://mestredascontas.com.br/politica-privacidade",
  },
};

export default function PrivacidadePage() {
  return (
    <article className="max-w-4xl mx-auto py-12 px-4 md:px-8">
      
      {/* HEADER SIMPLES */}
      <div className="text-center mb-12 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mb-6 shadow-sm">
           <Shield size={32} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Política de Privacidade
        </h1>
        <p className="text-slate-600">
          Última atualização: <span className="font-semibold">Janeiro de 2026</span>
        </p>
      </div>

      <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
        
        <p>
          A sua privacidade é inegociável para nós. No <strong>Mestre das Contas</strong>, seguimos uma política rigorosa de transparência e respeito aos seus dados, em conformidade com a <strong>LGPD (Lei Geral de Proteção de Dados)</strong>.
        </p>

        {/* BLOCO 1: DADOS DAS CALCULADORAS */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 my-8 not-prose">
            <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-3">
                <Server className="text-blue-600" size={24}/> 1. Segurança dos seus Cálculos
            </h3>
            <p className="text-slate-700 text-sm md:text-base">
                Queremos deixar claro: <strong>Nós não armazenamos os valores que você digita.</strong>
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><CheckIcon/> Os cálculos de salário, férias ou rescisão acontecem 100% no seu navegador (Client-Side).</li>
                <li className="flex gap-2"><CheckIcon/> Nenhum dado financeiro é enviado para nossos servidores.</li>
                <li className="flex gap-2"><CheckIcon/> Assim que você fecha a aba, os dados desaparecem.</li>
            </ul>
        </div>

        <h3 className="flex items-center gap-2 text-slate-900 font-bold mt-10">
            <Eye className="text-indigo-600" size={24}/> 2. Coleta de Dados de Navegação
        </h3>
        <p>
          Embora não guardemos seus dados financeiros, coletamos informações técnicas automáticas para melhorar o site, como:
        </p>
        <ul>
            <li>Tipo de navegador e dispositivo (celular ou computador);</li>
            <li>Tempo de permanência nas páginas;</li>
            <li>Origem do acesso (Google, Redes Sociais, Direto).</li>
        </ul>
        <p>
            Utilizamos o <strong>Google Analytics</strong> para processar esses dados de forma anônima e agregada.
        </p>

        <h3 className="flex items-center gap-2 text-slate-900 font-bold mt-10">
            <Cookie className="text-amber-600" size={24}/> 3. Cookies e Publicidade (Google AdSense)
        </h3>
        <p>
          O Mestre das Contas é mantido através de publicidade. Para isso, utilizamos o <strong>Google AdSense</strong>, que pode usar cookies para exibir anúncios mais relevantes para você.
        </p>
        <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 text-sm text-amber-900 not-prose">
            <p className="font-bold mb-2">O que você precisa saber:</p>
            <ul className="list-disc pl-5 space-y-1">
                <li>Terceiros, incluindo o Google, usam cookies para veicular anúncios com base em suas visitas anteriores.</li>
                <li>O uso de cookies de publicidade permite que o Google e seus parceiros veiculem anúncios com base na sua navegação.</li>
                <li>Você pode desativar a publicidade personalizada acessando as <a href="https://www.google.com/settings/ads" target="_blank" rel="nofollow noreferrer" className="underline hover:text-amber-700">Configurações de Anúncios</a>.</li>
            </ul>
        </div>

        <h3 className="flex items-center gap-2 text-slate-900 font-bold mt-10">
            <Lock className="text-emerald-600" size={24}/> 4. Seus Direitos (LGPD)
        </h3>
        <p>
          Você tem total controle sobre seus dados. A qualquer momento, você pode:
        </p>
        <ul>
            <li>Solicitar informações sobre quais dados coletamos (basicamente, apenas cookies técnicos);</li>
            <li>Limpar os cookies do seu navegador para "esquecer" suas preferências;</li>
            <li>Entrar em contato conosco para esclarecer dúvidas.</li>
        </ul>

        <h3 className="flex items-center gap-2 text-slate-900 font-bold mt-10">
            <FileText className="text-slate-600" size={24}/> 5. Alterações nesta Política
        </h3>
        <p>
          Podemos atualizar esta política para refletir mudanças na legislação ou em nossos serviços. Recomendamos que verifique esta página periodicamente. O uso continuado do site após as alterações constitui aceitação dos novos termos.
        </p>

        <div className="border-t border-slate-200 mt-12 pt-8 text-center not-prose">
            <p className="text-slate-500 mb-4">Ainda tem dúvidas sobre nossa política?</p>
            <Link 
                href="/fale-conosco" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
                Entrar em Contato
            </Link>
        </div>

      </div>
    </article>
  );
}

// Pequeno helper para ícones na lista
function CheckIcon() {
    return (
        <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    )
}