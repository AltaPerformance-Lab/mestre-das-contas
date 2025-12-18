"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
    Search, CalendarDays, Briefcase, Calculator, 
    TrendingUp, Heart, Baby, Landmark, Percent, Droplet 
} from "lucide-react";
import { Input } from "@/components/ui/input";

// --- LISTA DE PÁGINAS ---
const searchablePages = [
    // Trabalhista
    { title: "Rescisão CLT", url: "/trabalhista/rescisao", icon: Briefcase, category: "Trabalhista" },
    { title: "Calculadora de Férias", url: "/trabalhista/ferias", icon: Briefcase, category: "Trabalhista" },
    { title: "Décimo Terceiro (13º Salário)", url: "/trabalhista/decimo-terceiro", icon: Calculator, category: "Trabalhista" },
    { title: "Seguro Desemprego", url: "/trabalhista/seguro-desemprego", icon: Briefcase, category: "Trabalhista" },
    // Financeiro
    { title: "Juros Compostos", url: "/financeiro/juros-compostos", icon: TrendingUp, category: "Financeiro" },
    { title: "Reforma Tributária (Novo IVA)", url: "/financeiro/reforma-tributaria", icon: Landmark, category: "Financeiro" },
    { title: "Financiamento (Price/SAC)", url: "/financeiro/financiamento", icon: Landmark, category: "Financeiro" },
    { title: "Calculadora de Porcentagem", url: "/financeiro/porcentagem", icon: Percent, category: "Financeiro" },
    { title: "Salário Líquido", url: "/financeiro/salario-liquido", icon: Calculator, category: "Financeiro" },
    // Saúde
    { title: "Cálculo de IMC", url: "/saude/imc", icon: Heart, category: "Saúde" },
    { title: "Calculadora Gestacional (DPP)", url: "/saude/gestacional", icon: Baby, category: "Saúde" },
    { title: "Meta de Água Diária", url: "/saude/agua", icon: Droplet, category: "Saúde" },
    { title: "Calorias Diárias (TMB)", url: "/saude/calorias-diarias", icon: Heart, category: "Saúde" },
];

// --- FUNÇÃO DE NORMALIZAÇÃO (O SEGREDO DA BUSCA) ---
// Remove acentos: "Férias" vira "ferias", "Rescisão" vira "rescisao"
const normalizeText = (text: string) => {
  return text
    .normalize("NFD") // Decompõe caracteres (é -> e + ´)
    .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos (acentos)
    .toLowerCase(); // Tudo minúsculo
};

export default function HeaderDesktop() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof searchablePages>([]);

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setQuery(term);

      if (term.length < 2) {
          setResults([]);
          return;
      }

      // Normaliza o que o usuário digitou
      const termClean = normalizeText(term);

      // Filtra comparando versões "limpas" dos textos
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

  return (
    <header className="hidden xl:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm/50">
      
      {/* Data */}
      <div className="flex items-center gap-3 text-slate-500">
        <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
            <CalendarDays size={18} />
        </div>
        <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Hoje</span>
            <span className="text-sm font-medium capitalize text-slate-700 leading-tight">{today}</span>
        </div>
      </div>

      {/* Busca Inteligente */}
      <div>
        <div className="relative group w-80 z-50">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <Input 
            type="text" 
            placeholder="Buscar (ex: ferias, rescisao...)" 
            className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-full text-sm"
            value={query}
            onChange={handleSearch}
            onBlur={() => setTimeout(() => setResults([]), 200)}
          />

          {/* Dropdown */}
          {results.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase px-4 py-1">Encontrados</div>
                  {results.map((result, index) => {
                      const Icon = result.icon;
                      return (
                        <button
                            key={index}
                            onMouseDown={() => handleSelectResult(result.url)}
                            className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center gap-3 transition-colors group"
                        >
                            <div className="bg-slate-100 text-slate-500 p-1.5 rounded-md group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                <Icon size={16} />
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-slate-700 group-hover:text-blue-700">{result.title}</span>
                                <span className="block text-[10px] text-slate-400">{result.category}</span>
                            </div>
                        </button>
                      )
                  })}
              </div>
          )}
          
          {query.length >= 2 && results.length === 0 && (
              <div className="absolute top-12 left-0 w-full bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden py-4 px-4 text-center animate-in fade-in">
                  <p className="text-sm text-slate-600 font-medium">Ops!</p>
                  <p className="text-xs text-slate-400 mt-1">Não encontramos nada para "{query}".</p>
              </div>
          )}

        </div>
      </div>
    </header>
  );
}