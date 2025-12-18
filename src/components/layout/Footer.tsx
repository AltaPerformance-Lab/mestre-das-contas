import Link from "next/link";
import { Calculator, Mail, Shield, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-center md:text-left">
          
          {/* Marca e Sobre */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-xl text-slate-900">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <Calculator size={20} />
              </div>
              <span>Mestre das<span className="text-blue-600">Contas</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mx-auto md:mx-0 max-w-xs">
              Simplificamos a matemática da vida real. Ferramentas gratuitas para você tomar as melhores decisões financeiras.
            </p>
          </div>

          {/* Calculadoras Populares */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Mais Acessadas</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/financeiro/salario-liquido" className="hover:text-blue-600 transition-colors block py-1">Salário Líquido 2025</Link></li>
              <li><Link href="/trabalhista/rescisao" className="hover:text-blue-600 transition-colors block py-1">Rescisão CLT</Link></li>
              <li><Link href="/trabalhista/ferias" className="hover:text-blue-600 transition-colors block py-1">Calculadora de Férias</Link></li>
              <li><Link href="/saude/imc" className="hover:text-blue-600 transition-colors block py-1">Cálculo de IMC</Link></li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Explore</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/trabalhista" className="hover:text-blue-600 transition-colors block py-1">Trabalhista</Link></li>
              <li><Link href="/financeiro" className="hover:text-blue-600 transition-colors block py-1">Financeiro & Investimentos</Link></li>
              <li><Link href="/saude" className="hover:text-blue-600 transition-colors block py-1">Saúde e Bem-estar</Link></li>
              <li><Link href="/financeiro/reforma-tributaria" className="hover:text-blue-600 transition-colors block py-1">Reforma Tributária</Link></li>
            </ul>
          </div>

          {/* Legal / Institucional */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Institucional</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/sobre" className="hover:text-blue-600 transition-colors flex items-center justify-center md:justify-start gap-2 py-1">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-blue-600 transition-colors flex items-center justify-center md:justify-start gap-2 py-1">
                  <Shield size={14} /> Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-blue-600 transition-colors flex items-center justify-center md:justify-start gap-2 py-1">
                  <FileText size={14} /> Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-blue-600 transition-colors flex items-center justify-center md:justify-start gap-2 py-1">
                  <Mail size={14} /> Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Mestre das Contas. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Desenvolvido com <span className="text-red-400">❤</span> por <a href="https://altaperformance.dev.br" target="_blank" rel="nofollow noreferrer" className="font-bold text-slate-600 hover:text-blue-600 transition-colors">Alta Performance Web</a>
          </p>
        </div>

      </div>
    </footer>
  );
}