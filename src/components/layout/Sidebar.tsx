"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calculator, Briefcase, TrendingUp, 
  Landmark, Percent, Droplet, Sparkles, Scale,
  QrCode, LucideIcon, Zap, Coins, Timer,
  Palmtree, Gift, ShieldCheck, Flame, Baby,
  MessageCircle, Image as ImageIcon, Lock, FileText, CalendarDays,
  Home, CreditCard, BarChart3
} from "lucide-react";

// --- TIPAGEM ---
interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  highlight?: boolean;
}

// Adicionado 'indigo' para as Ferramentas
type MenuTheme = "blue" | "emerald" | "rose" | "slate" | "indigo";

interface MenuGroup {
  title: string;
  theme: MenuTheme;
  href?: string; // Link da categoria
  items: MenuItem[];
}

interface SidebarProps {
  isMobile?: boolean; 
  onItemClick?: () => void; 
}

// --- DADOS DO MENU (AGORA COM TODAS AS FERRAMENTAS) ---
const menuGroups: MenuGroup[] = [
  {
    title: "Destaques",
    theme: "slate",
    items: [
      { label: "Comparador de Renda", href: "/financeiro/comparador-salario", icon: BarChart3, badge: "Viral", highlight: true },
      { label: "Gerador de QR Code", href: "/ferramentas/gerador-qr-code", icon: QrCode, badge: "Grátis", highlight: true },
      { label: "Reforma Tributária", href: "/financeiro/reforma-tributaria", icon: Landmark, badge: "2026", highlight: true },
    ]
  },
  {
    title: "Ferramentas Úteis", // NOVA CATEGORIA
    theme: "indigo",
    href: "/ferramentas",
    items: [
      { label: "Editor de PDF", href: "/ferramentas/editor-pdf-online", icon: FileText, badge: "Top" },
      { label: "Gerador Link WhatsApp", href: "/ferramentas/gerador-link-whatsapp", icon: MessageCircle },
      { label: "Conversor de Imagens", href: "/ferramentas/conversor-imagem", icon: ImageIcon, badge: "Ilimitado" },
      { label: "Gerador de Senhas", href: "/ferramentas/gerador-de-senhas", icon: Lock, badge: "Seguro" },
      { label: "Gerador de Recibo", href: "/ferramentas/gerador-recibo", icon: FileText, badge: "PDF" },
      { label: "Criar Orçamento", href: "/ferramentas/criador-orcamentos", icon: Calculator, badge: "Novo" },
      { label: "Criar Pedido", href: "/ferramentas/criador-pedidos", icon: Briefcase, badge: "Novo" },
      { label: "Gerador de Pix", href: "/ferramentas/gerador-pix", icon: Zap, badge: "Pix" },
      { label: "Formatador JSON", href: "/ferramentas/formatador-json", icon: FileText, badge: "Dev" },
      { label: "Declaração Conteúdo", href: "/ferramentas/declaracao-conteudo", icon: FileText, badge: "Correios" },
      { label: "Gerador Privacidade", href: "/ferramentas/gerador-privacidade", icon: ShieldCheck, badge: "LGPD" },
    ]
  },
  {
    title: "Trabalhista",
    theme: "blue",
    href: "/trabalhista",
    items: [
      { label: "Rescisão CLT", href: "/trabalhista/rescisao", icon: Briefcase },
      { label: "Calculadora de Férias", href: "/trabalhista/ferias", icon: Palmtree },
      { label: "13º Salário", href: "/trabalhista/decimo-terceiro", icon: Gift },
      { label: "Seguro Desemprego", href: "/trabalhista/seguro-desemprego", icon: ShieldCheck },
      { label: "Horas Extras", href: "/trabalhista/horas-extras", icon: Zap },
      { label: "Horas Trabalhadas", href: "/trabalhista/horas-trabalhadas", icon: Timer },
    ]
  },
  {
    title: "Financeiro",
    theme: "emerald",
    href: "/financeiro",
    items: [
      { label: "Comparador de Renda", href: "/financeiro/comparador-salario", icon: BarChart3, badge: "Novo" },
      { label: "Salário Líquido", href: "/financeiro/salario-liquido", icon: Coins, badge: "2025" },
      { label: "Calculadora MEI", href: "/financeiro/calculadora-mei", icon: Briefcase, badge: "2026" },
      { label: "Reajuste Aluguel", href: "/financeiro/reajuste-aluguel", icon: Home },
      { label: "Simulador Maquininha", href: "/financeiro/simulador-maquininha", icon: CreditCard },
      { label: "Dias Úteis", href: "/financeiro/calculadora-dias-uteis", icon: CalendarDays },
      { label: "Juros Compostos", href: "/financeiro/juros-compostos", icon: TrendingUp },
      { label: "Financiamento Veículos", href: "/financeiro/financiamento-veiculos", icon: Landmark }, 
      { label: "Porcentagem", href: "/financeiro/porcentagem", icon: Percent },
    ]
  },
  {
    title: "Saúde",
    theme: "rose",
    href: "/saude",
    items: [
      { label: "IMC Online", href: "/saude/imc", icon: Scale },
      { label: "Idade Gestacional", href: "/saude/gestacional", icon: Baby },
      { label: "Calorias (TMB)", href: "/saude/calorias-diarias", icon: Flame },
      { label: "Ingestão de Água", href: "/saude/agua", icon: Droplet },
    ]
  }
];

// --- ESTILOS VISUAIS (DESIGN SYSTEM) ---
const themeStyles: Record<MenuTheme, { 
  bgTitle: string;
  textTitle: string;
  active: string; 
  inactive: string; 
  iconActive: string; 
  iconInactive: string; 
}> = {
  blue: {
    bgTitle: "bg-blue-50 dark:bg-blue-900/20", textTitle: "text-blue-600 dark:text-blue-400",
    active: "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none", 
    inactive: "text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-400",
    iconActive: "text-white",
    iconInactive: "text-blue-400 dark:text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400"
  },
  emerald: {
    bgTitle: "bg-emerald-50 dark:bg-emerald-900/20", textTitle: "text-emerald-600 dark:text-emerald-400",
    active: "bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-none",
    inactive: "text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400",
    iconActive: "text-white",
    iconInactive: "text-emerald-400 dark:text-emerald-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
  },
  rose: {
    bgTitle: "bg-rose-50 dark:bg-rose-900/20", textTitle: "text-rose-600 dark:text-rose-400",
    active: "bg-rose-600 text-white shadow-md shadow-rose-200 dark:shadow-none",
    inactive: "text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-800 hover:text-rose-700 dark:hover:text-rose-400",
    iconActive: "text-white",
    iconInactive: "text-rose-400 dark:text-rose-500 group-hover:text-rose-600 dark:group-hover:text-rose-400"
  },
  indigo: { // Novo tema para Ferramentas
    bgTitle: "bg-indigo-50 dark:bg-indigo-900/20", textTitle: "text-indigo-600 dark:text-indigo-400",
    active: "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none",
    inactive: "text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-700 dark:hover:text-indigo-400",
    iconActive: "text-white",
    iconInactive: "text-indigo-400 dark:text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
  },
  slate: { 
    bgTitle: "bg-slate-100 dark:bg-slate-800 transition-colors", textTitle: "text-slate-600 dark:text-slate-400",
    active: "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xl",
    inactive: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
    iconActive: "text-white dark:text-slate-900",
    iconInactive: "text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100"
  }
};

export default function Sidebar({ isMobile = false, onItemClick }: SidebarProps) {
  const pathname = usePathname();

  const containerStyle = isMobile 
    ? "flex flex-col w-full h-full bg-white dark:bg-slate-900 pb-4 transition-colors" 
    : "flex flex-col w-full h-full py-6 px-4 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transition-colors";

  return (
    <div className={containerStyle}>
      
      {/* LOGO (Desktop) */}
      {!isMobile && (
        <Link href="/" className="mb-8 px-2 flex items-center gap-3 group cursor-pointer select-none">
          <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-all duration-300 ring-4 ring-blue-50 dark:ring-slate-800">
            <Calculator size={22} strokeWidth={3} />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold font-heading text-xl leading-none text-slate-900 dark:text-slate-100 tracking-tight">
              Mestre
            </span>
            <span className="font-extrabold font-heading text-xl leading-none text-blue-600 dark:text-blue-400 tracking-tight">
              das Contas
            </span>
          </div>
        </Link>
      )}

      {/* NAV MENU */}
      <nav className="flex-1 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent pr-1 pb-4">
        {menuGroups.map((group, idx) => {
           const theme = themeStyles[group.theme] || themeStyles.slate;

           return (
            <div key={idx} className="px-1"> 
              
              {/* Título da Categoria */}
              {group.title !== "Destaques" && (
                <Link href={group.href || "#"} className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold font-heading uppercase tracking-widest mb-3 select-none ml-2 ${theme.bgTitle} ${theme.textTitle} hover:opacity-80 transition-opacity`}>
                  {group.title}
                </Link>
              )}

              <ul className="space-y-1.5"> 
                {group.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                  // --- ITEM DESTAQUE ---
                  if (item.highlight) {
                    return (
                      <li key={item.href} className="mb-3 first:mt-0">
                        <Link
                          href={item.href}
                          onClick={onItemClick}
                          className="group relative flex flex-col p-4 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg border border-slate-100 hover:border-blue-200 dark:border-slate-800 dark:hover:border-blue-900/50 w-full bg-gradient-to-br from-white to-slate-50 hover:to-white dark:from-slate-900 dark:to-slate-900/50 dark:hover:to-slate-900"
                        >
                          <div className={`absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500 ${item.label.includes("QR") ? "text-indigo-600" : "text-emerald-600"}`}>
                             <item.icon size={64} />
                          </div>

                          <div className="relative z-10 flex items-center justify-between mb-2">
                             <div className={`p-2 rounded-xl text-white shadow-sm ${item.label.includes("QR") ? "bg-indigo-600" : "bg-emerald-600"}`}>
                                <item.icon size={20} strokeWidth={2.5} />
                             </div>
                             {item.badge && (
                               <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white border shadow-sm ${item.label.includes("QR") ? "text-indigo-600 border-indigo-100" : "text-emerald-600 border-emerald-100"}`}>
                                 {item.badge}
                               </span>
                             )}
                          </div>

                          <span className="relative z-10 block text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight whitespace-normal">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    );
                  }

                  // --- ITEM PADRÃO ---
                  const containerClass = isActive ? theme.active : theme.inactive;
                  const iconClass = isActive ? theme.iconActive : theme.iconInactive;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onItemClick}
                        className={`group flex items-start gap-3 px-3.5 py-3 text-sm font-semibold rounded-xl transition-all duration-200 w-full active:scale-[0.98] ${containerClass}`}
                      >
                        <item.icon size={18} strokeWidth={2.5} className={`transition-colors duration-200 shrink-0 mt-0.5 ${iconClass}`} />
                        
                        <div className="flex-1 flex flex-col">
                            <span className="whitespace-normal leading-tight">{item.label}</span>
                        </div>

                        {item.badge && !isActive && (
                           <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 self-start mt-0.5`}>
                             {item.badge}
                           </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
           );
        })}
      </nav>

      {/* FOOTER DESKTOP */}
      {!isMobile && (
        <div className="pt-4 mt-auto px-1">
           <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-slate-700/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                © 2026 Mestre das Contas
              </p>
           </div>
        </div>
      )}
    </div>
  );
}