import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Code2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nós | ContaRápida",
  description: "Conheça a missão do ContaRápida: simplificar a matemática financeira e trabalhista para todos os brasileiros.",
};

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Sobre o ContaRápida</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Nossa missão é desmistificar a burocracia brasileira através de tecnologia e simplicidade.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator size={24} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Precisão</h3>
            <p className="text-sm text-slate-600">Algoritmos atualizados constantemente conforme a legislação vigente (CLT, Receita Federal e Previdência).</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code2 size={24} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Tecnologia</h3>
            <p className="text-sm text-slate-600">Desenvolvido com a stack mais moderna da web para garantir velocidade instantânea em qualquer dispositivo.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Privacidade</h3>
            <p className="text-sm text-slate-600">Seus dados não saem do seu navegador. Não armazenamos históricos de salários ou informações pessoais.</p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none bg-slate-50 p-8 rounded-2xl border border-slate-100">
        <h3>Quem somos</h3>
        <p>
            O <strong>ContaRápida</strong> é um projeto independente de tecnologia, focado em criar utilitários digitais de alta performance.
        </p>
        <p>
            Acreditamos que todo trabalhador e empreendedor deve ter acesso fácil e transparente às informações que impactam seu bolso, sem precisar de planilhas complexas ou "economês".
        </p>
        <p>
    Este portal é mantido e desenvolvido pela{' '}
    <a 
      href="https://altaperformance.dev.br" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="font-bold text-blue-600 hover:underline"
    >
      Alta Performance Web
    </a>
    , especializada em soluções digitais.
</p>
      </div>
    </div>
  );
}