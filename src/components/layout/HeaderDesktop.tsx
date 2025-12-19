"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    Search, CalendarDays, Briefcase, Calculator, 
    TrendingUp, Heart, Baby, Landmark, Percent, Droplet, LucideIcon 
} from "lucide-react";
import { Input } from "@/components/ui/input";

// --- TIPO PARA OS RESULTADOS ---
interface SearchItem {
  title: string;
  url: string;
  icon: LucideIcon;
  category: string;
}

// --- LISTA DE PÁGINAS ---
const searchablePages: SearchItem[] = [
    // Trabalhista
    { title: "Rescisão CLT", url: "/trabalhista/rescisao", icon: Briefcase, category: "Trabalhista" },
    { title: "Calculadora de Férias", url: "/trabalhista/ferias", icon: Briefcase, category: "Trabalhista" },
    { title: "Décimo Terceiro (13º Salário)", url: "/trabalhista/decimo-terceiro", icon: Calculator, category: "Trabalhista" },
    { title: "Seguro Desemprego", url: "/trabalhista/seguro-desemprego", icon: Briefcase, category: "Trabalhista" },
    { title: "Horas Extras", url: "/trabalhista/horas-extras", icon: Calculator, category: "Trabalhista" },
    // Financeiro
    { title: "Juros Compostos", url: "/financeiro/juros-compostos", icon: TrendingUp, category: "Financeiro" },
    { title: "Reforma Tributária (IVA 2026)", url: "/financeiro/reforma-tributaria", icon: Landmark, category: "Financeiro" },
    { title: "Financiamento (Price/SAC)", url: "/financeiro/financiamento", icon: Landmark, category: "Financeiro" },
    { title: "Calculadora de Porcentagem", url: "/financeiro/porcentagem", icon: Percent, category: "Financeiro" },
    { title: "Salário Líquido", url: "/financeiro/salario-liquido", icon: Calculator, category: "Financeiro" },
    // Saúde
    { title: "Cálculo de IMC", url: "/saude/imc", icon: Heart, category: "Saúde" },
    { title: "Calculadora Gestacional", url: "/saude/gestacional", icon: Baby, category: "Saúde" },
    { title: "Meta de Água Diária", url: "/saude/agua", icon: Droplet, category: "Saúde" },
    { title: "Calorias Diárias (TMB)", url: "/saude/calorias-diarias", icon: Heart, category: "Saúde" },
];

const normalizeText = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export default function HeaderDesktop() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Para navegação via teclado
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setQuery(term);
      setSelectedIndex(-1);

      if (term.length < 2) {
          setResults([]);
          return;
      }

      const termClean = normalizeText(term);
      const filtered = searchablePages.filter(page =>
          normalizeText(page.title).includes(termClean) ||
          normalizeText(page.category).includes(termClean)
      );
      setResults(filtered);
  };

  const handleSelectResult = (url: string) => {
      router.push(url);
      setQuery("");
      setResults([]);
  };

  // Navegação por teclado (UX Pro)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSelectResult(results[selectedIndex].url);
      } else if (results.length > 0) {
        // Se der enter sem selecionar, vai no primeiro
        handleSelectResult(results[0].url);
      }
    } else if (e.key === "Escape") {
      setResults([]);
    }
  };

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="hidden xl:flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 transition-all">
       
      {/* Data */}
      <div className="flex items-center gap-3 text-slate-500 select-none">
        <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl shadow-sm">
            <CalendarDays size={20} />
        </div>
        <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Hoje</span>
            <span className="text-sm font-semibold capitalize text-slate-700 leading-tight">{today}</span>
        </div>
      </div>

      {/* Busca Inteligente */}
      <div ref={searchContainerRef}>
        <div className="relative group w-96 z-50">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <Input 
            type="text" 
            placeholder="O que você precisa calcular?" 
            className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all rounded-full text-sm shadow-sm"
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />

          {/* Dropdown de Resultados */}
          {results.length > 0 && (
              <div className="absolute top-14 left-0 w-full bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase px-4 py-2 tracking-wider">
                    Resultados Encontrados
                  </div>
                  {results.map((result, index) => {
                      const Icon = result.icon;
                      const isSelected = index === selectedIndex;
                      
                      return (
                        <button
                            key={index}
                            onClick={() => handleSelectResult(result.url)}
                            className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors group ${
                              isSelected ? "bg-blue-50" : "hover:bg-slate-50"
                            }`}
                        >
                            <div className={`p-2 rounded-lg transition-colors ${
                              isSelected ? "bg-blue-200 text-blue-700" : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm"
                            }`}>
                                <Icon size={18} />
                            </div>
                            <div>
                                <span className={`block text-sm font-semibold ${isSelected ? "text-blue-700" : "text-slate-700 group-hover:text-blue-700"}`}>
                                  {result.title}
                                </span>
                                <span className="block text-[10px] font-medium text-slate-400 uppercase tracking-wide">
                                  {result.category}
                                </span>
                            </div>
                        </button>
                      )
                  })}
              </div>
          )}
           
          {query.length >= 2 && results.length === 0 && (
              <div className="absolute top-14 left-0 w-full bg-white rounded-2xl border border-slate-200 shadow-xl py-6 px-4 text-center animate-in fade-in">
                  <p className="text-sm text-slate-600 font-medium">Nenhum resultado encontrado</p>
                  <p className="text-xs text-slate-400 mt-1">Tente buscar por "férias", "juros" ou "imc".</p>
              </div>
          )}

        </div>
      </div>
    </header>
  );
}