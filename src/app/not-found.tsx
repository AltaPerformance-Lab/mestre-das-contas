import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Search, Home, Calculator } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-lg w-full">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 animate-pulse">
            <Search size={40}/>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4">404</h1>
        <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-4">Ops! Página não encontrada.</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Parece que o link que você tentou acessar está quebrado ou a página mudou de lugar. Mas não se preocupe, nossas calculadoras continuam funcionando!
        </p>
        
        <div className="grid gap-3 w-full">
            <Link href="/" className="w-full">
                <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 font-bold">
                    <Home className="mr-2" size={18}/> Voltar para o Início
                </Button>
            </Link>
            <Link href="/trabalhista/rescisao" className="w-full">
                <Button variant="outline" className="w-full h-12 text-slate-600 hover:bg-slate-50 border-slate-200">
                    <Calculator className="mr-2" size={18}/> Calcular Rescisão
                </Button>
            </Link>
        </div>
      </div>
      <p className="mt-8 text-sm text-slate-400 font-medium tracking-wide uppercase">Mestre das Contas</p>
    </div>
  );
}