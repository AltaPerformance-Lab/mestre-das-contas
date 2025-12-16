import Link from "next/link";
import { 
  Calculator, Heart, Briefcase, TrendingUp, 
  Home, Menu, X, Landmark, Percent, Droplet
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full py-6 px-4">
      {/* LOGO */}
      <div className="mb-8 px-2 flex items-center gap-2">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <Calculator size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight text-slate-900">Mestre das<br/>Contas</h1>
        </div>
      </div>

      {/* MENU NAV */}
      <nav className="flex-1 space-y-8">
        
        {/* GRUPO 1: TRABALHISTA */}
        <div>
          <p className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Trabalhista</p>
          <ul className="space-y-1">
            <li>
              <Link href="/trabalhista/rescisao" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Briefcase size={18} /> Rescisão CLT
              </Link>
            </li>
            <li>
              <Link href="/trabalhista/ferias" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Home size={18} /> Férias
              </Link>
            </li>
            <li>
              <Link href="/trabalhista/decimo-terceiro" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Calculator size={18} /> 13º Salário
              </Link>
            </li>
            <li>
              <Link href="/trabalhista/seguro-desemprego" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Briefcase size={18} /> Seguro Desemprego
              </Link>
            </li>
            <li>
              <Link href="/trabalhista/horas-extras" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Calculator size={18} /> Horas Extras
              </Link>
            </li>
          </ul>
        </div>

        {/* GRUPO 2: FINANCEIRO */}
        <div>
          <p className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Financeiro</p>
          <ul className="space-y-1">
            <li>
              <Link href="/financeiro/juros-compostos" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
                <TrendingUp size={18} /> Juros Compostos
              </Link>
            </li>
            <li>
              <Link href="/financeiro/financiamento" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
                <Landmark size={18} /> Financiamento
              </Link>
            </li>
            <li>
              <Link href="/financeiro/porcentagem" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
                <Percent size={18} /> Porcentagem
              </Link>
            </li>
            <li>
              <Link href="/financeiro/reforma-tributaria" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
                <Landmark size={18} /> Reforma Tributária
              </Link>
            </li>
          </ul>
        </div>

        {/* GRUPO 3: SAÚDE */}
        <div>
          <p className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Saúde</p>
          <ul className="space-y-1">
            <li>
              <Link href="/saude/imc" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                <Heart size={18} /> IMC Online
              </Link>
            </li>
            <li>
              <Link href="/saude/calorias-diarias" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                <Heart size={18} /> Calorias (TMB)
              </Link>
            </li>
            <li>
              <Link href="/saude/gestacional" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors">
                <Heart size={18} /> Gestacional
              </Link>
            </li>
            <li>
              <Link href="/saude/agua" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 transition-colors">
                <Droplet size={18} /> Água Diária
              </Link>
            </li>
          </ul>
        </div>

      </nav>

      {/* FOOTER DA SIDEBAR */}
      <div className="border-t border-slate-100 pt-4 mt-auto">
        <p className="text-[10px] text-slate-400 text-center">
          © 2025 Mestre das Contas<br/>Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}