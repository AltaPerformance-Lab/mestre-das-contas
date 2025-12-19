"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calculator, Heart, Briefcase, TrendingUp, 
  Home, Landmark, Percent, Droplet, Sparkles, Scale,
  LucideIcon
} from "lucide-react";

// --- TIPAGEM ---
interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  highlight?: boolean;
}

type MenuTheme = "blue" | "emerald" | "rose";

interface MenuGroup {
  title: string;
  theme?: MenuTheme;
  items: MenuItem[];
}

// PROPRIEDADE PARA DETECTAR MOBILE
interface SidebarProps {
  isMobile?: boolean; 
}

// --- DADOS DO MENU ---
const menuGroups: MenuGroup[] = [
  {
    title: "Destaques",
    items: [
      { 
        label: "Reforma Tributária 2026", 
        href: "/financeiro/reforma-tributaria", 
        icon: Sparkles,
        highlight: true 
      },
    ]
  },
  {
    title: "Trabalhista",
    theme: "blue",
    items: [
      { label: "Rescisão CLT", href: "/trabalhista/rescisao", icon: Briefcase },
      { label: "Férias", href: "/trabalhista/ferias", icon: Home },
      { label: "13º Salário", href: "/trabalhista/decimo-terceiro", icon: Calculator },
      { label: "Seguro Desemprego", href: "/trabalhista/seguro-desemprego", icon: Briefcase },
      { label: "Horas Extras", href: "/trabalhista/horas-extras", icon: Calculator },
    ]
  },
  {
    title: "Financeiro",
    theme: "emerald",
    items: [
      { label: "Salário Líquido", href: "/financeiro/salario-liquido", icon: Calculator },
      { label: "Juros Compostos", href: "/financeiro/juros-compostos", icon: TrendingUp },
      { label: "Financiamento", href: "/financeiro/financiamento", icon: Landmark },
      { label: "Porcentagem", href: "/financeiro/porcentagem", icon: Percent },
    ]
  },
  {
    title: "Saúde",
    theme: "rose",
    items: [
      { label: "IMC Online", href: "/saude/imc", icon: Scale },
      { label: "Gestacional", href: "/saude/gestacional", icon: Heart },
      { label: "Calorias (TMB)", href: "/saude/calorias-diarias", icon: Heart },
      { label: "Água Diária", href: "/saude/agua", icon: Droplet },
    ]
  }
];

const themeStyles: Record<MenuTheme, { 
  active: string; 
  inactive: string; 
  iconActive: string; 
  iconInactive: string; 
}> = {
  blue: {
    active: "bg-blue-100 text-blue-900 border-blue-200", 
    inactive: "text-slate-600 hover:bg-blue-50 hover:text-blue-800",
    iconActive: "text-blue-600",
    iconInactive: "text-blue-400 group-hover:text-blue-600"
  },
  emerald: {
    active: "bg-emerald-100 text-emerald-900 border-emerald-200",
    inactive: "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800",
    iconActive: "text-emerald-600",
    iconInactive: "text-emerald-400 group-hover:text-emerald-600"
  },
  rose: {
    active: "bg-rose-100 text-rose-900 border-rose-200",
    inactive: "text-slate-600 hover:bg-rose-50 hover:text-rose-800",
    iconActive: "text-rose-600",
    iconInactive: "text-rose-400 group-hover:text-rose-600"
  }
};

export default function Sidebar({ isMobile = false }: SidebarProps) {
  const pathname = usePathname();

  // AQUI ESTÁ A MÁGICA:
  // Se for mobile, removemos larguras fixas e usamos w-full
  const containerStyle = isMobile 
    ? "flex flex-col w-full h-full bg-white pb-10" // Mobile: Sem borda, padding bottom extra
    : "flex flex-col w-full h-full py-6 px-4 bg-white border-r border-slate-100"; // Desktop: Com borda

  return (
    <div className={containerStyle}>
      
      {/* LOGO: Só mostra no Desktop (pois o mobile já tem logo no topo) */}
      {!isMobile && (
        <Link href="/" className="mb-8 px-2 flex items-center gap-3 group cursor-pointer select-none">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2.5 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-all duration-300">
            <Calculator size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none text-slate-800 tracking-tight">
              Mestre das<br/>
              <span className="text-blue-600">Contas</span>
            </h1>
          </div>
        </Link>
      )}

      {/* NAV MENU */}
      <nav className="flex-1 space-y-6">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="px-2"> {/* Adicionado px-2 para garantir espaçamento no mobile */}
            
            {/* Título da categoria */}
            {group.title !== "Destaques" && (
              <p className="px-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                {group.title}
              </p>
            )}

            <ul className="space-y-2"> 
              {group.items.map((item) => {
                const isActive = pathname === item.href;

                // --- ITEM DESTAQUE (REFORMA) ---
                if (item.highlight) {
                  return (
                    <li key={item.href} className="mb-4">
                      <Link
                        href={item.href}
                        className="group relative flex items-center gap-3 px-3 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md border border-emerald-100/60 hover:border-emerald-200 w-full"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white opacity-100" />
                        
                        <div className="relative z-10 p-1.5 bg-emerald-100/80 rounded-lg text-emerald-700 group-hover:scale-110 transition-transform shadow-sm shrink-0">
                          <item.icon size={20} strokeWidth={2.5} />
                        </div>

                        <div className="relative z-10 flex-1 min-w-0">
                          <span className="block text-sm font-bold text-emerald-950 leading-tight truncate">
                            {item.label}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                            Nova Lei 2026
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                }

                // --- ITEM PADRÃO ---
                const currentTheme = group.theme ? themeStyles[group.theme] : themeStyles.blue;
                const containerClass = isActive ? currentTheme.active : currentTheme.inactive;
                const iconClass = isActive ? currentTheme.iconActive : currentTheme.iconInactive;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 border border-transparent w-full ${containerClass}`}
                    >
                      <item.icon size={19} strokeWidth={2} className={`transition-colors duration-200 shrink-0 ${iconClass}`} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* FOOTER DA SIDEBAR: Só mostra no Desktop */}
      {!isMobile && (
        <div className="border-t border-slate-100 pt-6 mt-auto">
           <p className="text-[10px] text-slate-400 text-center leading-relaxed font-medium">
            © 2026 Mestre das Contas<br/>
            Seus cálculos exatos.
          </p>
        </div>
      )}
    </div>
  );
}