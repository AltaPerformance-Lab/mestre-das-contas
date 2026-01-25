import Link from "next/link";
import { Calculator, Mail, Shield, FileText, QrCode, Cookie } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-16 pb-8 mt-auto z-10 relative print:hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* COLUNA 1: Marca e Sobre */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group" aria-label="Mestre das Contas Home">
              <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-200 group-hover:bg-blue-700 transition-colors">
                <Calculator size={24} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-slate-100 tracking-tight">
                Mestre das <span className="text-blue-600 dark:text-blue-500">Contas</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm text-pretty">
              Simplificamos a matemática da vida real. Ferramentas gratuitas, precisas e atualizadas para você tomar as melhores decisões financeiras com segurança.
            </p>
          </div>

          {/* COLUNA 2: Calculadoras Populares */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5 text-xs uppercase tracking-widest">Mais Acessadas</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><Link href="/financeiro/salario-liquido" className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Salário Líquido 2025</Link></li>
              <li><Link href="/ferramentas/gerador-qr-code" className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all inline-flex items-center gap-2"><QrCode size={14} className="text-blue-500 dark:text-blue-400"/> Gerador de QR Code</Link></li>
              <li><Link href="/trabalhista/rescisao" className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Rescisão CLT</Link></li>
              <li><Link href="/trabalhista/ferias" className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Calculadora de Férias</Link></li>
              <li><Link href="/saude/imc" className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Cálculo de IMC</Link></li>
            </ul>
          </div>

          {/* COLUNA 3: Categorias */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5 text-xs uppercase tracking-widest">Explore</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><Link href="/trabalhista" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Trabalhista</Link></li>
              <li><Link href="/financeiro" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Financeiro & Investimentos</Link></li>
              <li><Link href="/saude" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Saúde e Bem-estar</Link></li>
              <li>
                <Link href="/financeiro/reforma-tributaria" className="text-emerald-700 dark:text-emerald-500 font-bold hover:text-emerald-800 dark:hover:text-emerald-400 hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  Reforma Tributária <span className="text-[9px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded-full uppercase tracking-wide border border-emerald-200 dark:border-emerald-800">Novo</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 4: Institucional (ATUALIZADA) */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5 text-xs uppercase tracking-widest">Institucional</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link href="/sobre" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Shield size={14} className="text-slate-400" /> Privacidade
                </Link>
              </li>
              <li>
                <Link href="/politica-cookies" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Cookie size={14} className="text-slate-400" /> Cookies
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FileText size={14} className="text-slate-400" /> Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/fale-conosco" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Mail size={14} className="text-slate-400" /> Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <p>&copy; {currentYear} Mestre das Contas. Todos os direitos reservados.</p>
          
          <div className="flex items-center gap-4">
             <p className="flex items-center gap-1.5">
               Desenvolvido com <span className="text-red-500 animate-pulse">❤</span> por 
               <a 
                 href="https://altaperformance.dev.br" 
                 target="_blank" 
                 rel="noopener noreferrer nofollow" 
                 className="font-bold text-slate-600 hover:text-blue-600 transition-colors"
                 aria-label="Agência Alta Performance Web"
               >
                 Alta Performance Web
               </a>
             </p>
          </div>
        </div>

      </div>
    </footer>
  );
}