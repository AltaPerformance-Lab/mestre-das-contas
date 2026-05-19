"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calculator, Heart, Briefcase, TrendingUp, 
  Home, Landmark, Sparkles, Scale, QrCode, LucideIcon, Car
} from "lucide-react";

// --- TIPAGEM ---
interface MenuItem { label: string; href: string; icon: LucideIcon; highlight?: boolean; }
interface MenuGroup { title: string; theme?: "blue" | "emerald" | "rose" | "slate"; items: MenuItem[]; }

// --- DADOS DO MENU ---
const menuGroups: MenuGroup[] = [
  {
    title: "Destaques",
    items: [
      { label: "Gerador de QR Code", href: "/ferramentas/gerador-qr-code", icon: QrCode, highlight: true },
      { label: "Criar Orçamento", href: "/ferramentas/criador-orcamentos", icon: Calculator, highlight: true },
      { label: "Reforma Tributária 2026", href: "/financeiro/reforma-tributaria", icon: Sparkles },
    ]
  },
  {
    title: "Trabalhista", theme: "blue",
    items: [
      { label: "Rescisão CLT", href: "/trabalhista/rescisao", icon: Briefcase },
      { label: "Férias", href: "/trabalhista/ferias", icon: Home },
      { label: "13º Salário", href: "/trabalhista/decimo-terceiro", icon: Calculator },
      { label: "Seguro Desemprego", href: "/trabalhista/seguro-desemprego", icon: Briefcase },
      { label: "Antecipação do FGTS", href: "/trabalhista/fgts", icon: Calculator },
      { label: "Simulador Aposentadoria", href: "/trabalhista/aposentadoria", icon: Calculator },
      { label: "Horas Extras", href: "/trabalhista/horas-extras", icon: Calculator },
      { label: "Horas Simples", href: "/trabalhista/horas-simples", icon: Calculator },
      { label: "Horas Trabalhadas", href: "/trabalhista/horas-trabalhadas", icon: Calculator },
      { label: "Soma de Horas", href: "/trabalhista/soma-de-horas", icon: Calculator },
      { label: "Cartão de Ponto", href: "/trabalhista/cartao-de-ponto", icon: Briefcase },
      { label: "Piso Salarial 2026", href: "/trabalhista/piso-salarial", icon: Briefcase },
    ]
  },
  {
    title: "Financeiro", theme: "emerald",
    items: [
      { label: "Imposto de Renda (IRPF)", href: "/financeiro/imposto-de-renda", icon: Calculator },
      { label: "Salário Líquido 2026", href: "/financeiro/salario-liquido", icon: Calculator },
      { label: "Simulador Maquininha", href: "/financeiro/simulador-maquininha", icon: Calculator },
      { label: "Calculadora MEI", href: "/financeiro/calculadora-mei", icon: Calculator },
      { label: "Financiamento Veículos", href: "/financeiro/financiamento-veiculos", icon: Landmark },
      { label: "Juros Compostos", href: "/financeiro/juros-compostos", icon: TrendingUp },
    ]
  },
  {
    title: "Veículos", theme: "slate",
    items: [
      { label: "Tabela FIPE", href: "/veiculos/tabela-fipe", icon: Car },
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
    <div className="flex flex-col w-full px-4 pt-4 pb-20">
      <nav className="space-y-6">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            {group.title !== "Destaques" && (
              <p className="px-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-1">
                {group.title}
              </p>
            )}

            <ul className="space-y-1">
              {group.items.map((item) => {
                // Lógica de Ativo: Verifica se o pathname começa com o href (para pegar subpáginas)
                // Ex: /financeiro/salario-liquido/3000 mantém o link ativo
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                
                let itemClass = "text-slate-600 hover:bg-slate-50";
                if (item.highlight) itemClass = "bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold shadow-sm";
                else if (isActive) itemClass = "bg-blue-50 text-blue-700 font-bold";

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-[0.98] ${itemClass}`}
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