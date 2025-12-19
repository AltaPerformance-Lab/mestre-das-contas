import Link from "next/link";
import { Calculator, Mail, Shield, FileText } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-auto z-10 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* COLUNA 1: Marca e Sobre (Ocupa 4 colunas no Desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200 group-hover:bg-blue-700 transition-colors">
                <Calculator size={24} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                Mestre das <span className="text-blue-600">Contas</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Simplificamos a matemática da vida real. Ferramentas gratuitas, precisas e atualizadas para você tomar as melhores decisões financeiras com segurança.
            </p>
          </div>

          {/* COLUNA 2: Calculadoras Populares (3 colunas) */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-slate-900 mb-5 text-sm uppercase tracking-wider">Mais Acessadas</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/financeiro/salario-liquido" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Salário Líquido 2025</Link></li>
              <li><Link href="/trabalhista/rescisao" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Rescisão CLT</Link></li>
              <li><Link href="/trabalhista/ferias" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Calculadora de Férias</Link></li>
              <li><Link href="/saude/imc" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Cálculo de IMC</Link></li>
            </ul>
          </div>

          {/* COLUNA 3: Categorias (3 colunas) */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-slate-900 mb-5 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/trabalhista" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Trabalhista</Link></li>
              <li><Link href="/financeiro" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Financeiro & Investimentos</Link></li>
              <li><Link href="/saude" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Saúde e Bem-estar</Link></li>
              <li>
                <Link href="/financeiro/reforma-tributaria" className="text-emerald-600 font-medium hover:text-emerald-700 hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  Reforma Tributária <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">Novo</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 4: Institucional (2 colunas) */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-slate-900 mb-5 text-sm uppercase tracking-wider">Institucional</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/sobre" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                  <Shield size={14} className="text-slate-400" /> Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                  <FileText size={14} className="text-slate-400" /> Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                  <Mail size={14} className="text-slate-400" /> Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>&copy; {currentYear} Mestre das Contas. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1.5">
            Desenvolvido com <span className="text-red-500 animate-pulse">❤</span> por 
            <a 
              href="https://altaperformance.dev.br" 
              target="_blank" 
              rel="noopener noreferrer nofollow" 
              className="font-bold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Alta Performance Web
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}