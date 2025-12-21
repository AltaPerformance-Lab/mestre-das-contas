import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, ShieldCheck, Settings, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Cookies | Mestre das Contas",
  description: "Saiba como e por que utilizamos cookies no Mestre das Contas. Transparência total sobre publicidade e navegação.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://mestredascontas.com.br/politica-cookies",
  },
};

export default function CookiesPage() {
  return (
    <article className="max-w-4xl mx-auto py-12 px-4 md:px-8">
      
      <div className="text-center mb-12 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl mb-6 shadow-sm">
           <Cookie size={32} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Política de Cookies
        </h1>
        <p className="text-slate-600">
          Entenda o que são e como você pode controlá-los.
        </p>
      </div>

      <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
        
        <p>
          Esta Política de Cookies explica o que são cookies e como nós, do <strong>Mestre das Contas</strong>, os utilizamos. Você deve ler esta política para entender que tipo de "dados de navegação" nós coletamos.
        </p>

        <h3 className="flex items-center gap-2 text-slate-900 font-bold mt-8">
            <Info className="text-blue-600" size={24}/> O que são Cookies?
        </h3>
        <p>
            Cookies são pequenos arquivos de texto que um site armazena no seu computador ou dispositivo móvel quando você o visita. Eles servem para "lembrar" suas ações e preferências ao longo do tempo.
        </p>

        <h3 className="flex items-center gap-2 text-slate-900 font-bold mt-8">
            <ShieldCheck className="text-emerald-600" size={24}/> Como usamos os cookies?
        </h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>
                <strong>Cookies Essenciais:</strong> Necessários para o site funcionar corretamente (ex: lembrar que você fechou um aviso).
            </li>
            <li>
                <strong>Cookies de Desempenho (Analytics):</strong> Usamos o Google Analytics para entender quantas pessoas visitam nosso site e quais calculadoras são mais usadas. Esses dados são anônimos.
            </li>
            <li>
                <strong>Cookies de Publicidade (AdSense):</strong> Nossos parceiros de publicidade (Google) podem usar cookies para mostrar anúncios mais relevantes baseados nos seus interesses.
            </li>
        </ul>

        {/* BOX DE DESTAQUE PARA ADSENSE */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 my-8 not-prose">
            <h4 className="font-bold text-slate-900 mb-2">Cookie DART do Google</h4>
            <p className="text-sm text-slate-700 mb-3">
                O Google, como fornecedor terceiro, utiliza cookies para exibir anúncios no nosso site. O uso do cookie DART permite que ele veicule anúncios para nossos usuários com base em sua visita ao Mestre das Contas e a outros sites na Internet.
            </p>
            <p className="text-sm">
                Você pode optar por não usar o cookie DART visitando a <a href="https://policies.google.com/technologies/ads" target="_blank" rel="nofollow noreferrer" className="text-blue-600 hover:underline">Política de privacidade da rede de conteúdo e anúncios do Google</a>.
            </p>
        </div>

        <h3 className="flex items-center gap-2 text-slate-900 font-bold mt-8">
            <Settings className="text-slate-600" size={24}/> Como controlar os cookies?
        </h3>
        <p>
            Você pode controlar e/ou excluir cookies como desejar. Você pode apagar todos os cookies que já estão no seu computador e pode configurar a maioria dos navegadores para impedir que eles sejam armazenados.
        </p>
        <p>
            No entanto, se você fizer isso, talvez tenha que ajustar manualmente algumas preferências toda vez que visitar um site e alguns serviços e funcionalidades podem não funcionar.
        </p>

        <div className="border-t border-slate-200 mt-12 pt-8 text-center not-prose">
            <Link 
                href="/politica-privacidade" 
                className="text-blue-600 font-bold hover:underline"
            >
                Voltar para a Política de Privacidade
            </Link>
        </div>

      </div>
    </article>
  );
}