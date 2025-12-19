"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calculator, Heart, Briefcase, TrendingUp, 
  Home, Landmark, Percent, Droplet, Sparkles, Scale,
  LucideIcon
} from "lucide-react";

// --- TIPAGEM ---
interface MenuItem { label: string; href: string; icon: LucideIcon; highlight?: boolean; }
interface MenuGroup { title: string; theme?: "blue" | "emerald" | "rose"; items: MenuItem[]; }

// --- DADOS DO MENU ---
const menuGroups: MenuGroup[] = [
  {
    title: "Destaques",
    items: [
      { label: "Reforma Tributária 2026", href: "/financeiro/reforma-tributaria", icon: Sparkles, highlight: true },
    ]
  },
  {
    title: "Trabalhista", theme: "blue",
    items: [
      { label: "Rescisão CLT", href: "/trabalhista/rescisao", icon: Briefcase },
      { label: "Férias", href: "/trabalhista/ferias", icon: Home },
      { label: "13º Salário", href: "/trabalhista/decimo-terceiro", icon: Calculator },
      { label: "Seguro Desemprego", href: "/trabalhista/seguro-desemprego", icon: Briefcase },
    ]
  },
  {
    title: "Financeiro", theme: "emerald",
    items: [
      { label: "Salário Líquido", href: "/financeiro/salario-liquido", icon: Calculator },
      { label: "Financiamento", href: "/financeiro/financiamento", icon: Landmark },
      { label: "Juros Compostos", href: "/financeiro/juros-compostos", icon: TrendingUp },
    ]
  },
  {
    title: "Saúde", theme: "rose",
    items: [
      { label: "IMC Online", href: "/saude/imc", icon: Scale },
      { label: "Gestacional", href: "/saude/gestacional", icon: Heart },
    ]
  }
];

export default function MobileSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-20">
      <nav className="space-y-6">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            {group.title !== "Destaques" && (
              <p className="px-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                {group.title}
              </p>
            )}

            <ul className="space-y-2">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                
                // Estilos condicionais simples
                let itemClass = "text-slate-600 hover:bg-slate-50";
                if (item.highlight) itemClass = "bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold";
                else if (isActive) itemClass = "bg-slate-100 text-slate-900 font-semibold";

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors ${itemClass}`}
                    >
                      <item.icon size={20} className={item.highlight ? "text-emerald-600" : (isActive ? "text-blue-600" : "text-slate-400")} />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}