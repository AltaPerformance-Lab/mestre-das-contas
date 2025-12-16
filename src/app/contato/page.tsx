import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Fale Conosco | ContaRápida",
  robots: { index: false, follow: true },
};

export default function ContatoPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail size={32} />
      </div>
      
      <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Fale Conosco</h1>
      <p className="text-slate-600 mb-8 leading-relaxed">
        Encontrou algum erro em um cálculo? Tem sugestão de uma nova ferramenta? 
        Entre em contato conosco. Responderemos o mais breve possível.
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 inline-block">
        <p className="text-sm text-slate-500 mb-2 uppercase font-bold tracking-wide">E-mail de Suporte</p>
        <a href="mailto:contato@contarapida.app.br" className="text-2xl font-bold text-blue-600 hover:underline">
          contato@contarapida.app.br
        </a>
        <p className="text-xs text-slate-400 mt-4">
          (Para parcerias comerciais e publicidade, utilize o mesmo canal)
        </p>
      </div>
    </div>
  );
}