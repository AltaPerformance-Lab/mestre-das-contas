"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, Minus, Trash2, Clock, CheckCircle2, Share2, Printer } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface TimeEntry {
  id: string;
  value: string;
  operation: "add" | "subtract";
}

export default function TimeMathCalculator() {
  const [entries, setEntries] = useState<TimeEntry[]>([
    { id: "1", value: "", operation: "add" },
    { id: "2", value: "", operation: "add" }
  ]);
  const [total, setTotal] = useState<{ hours: number; minutes: number; isNegative: boolean } | null>(null);

  const [copiado, setCopiado] = useState(false);

  // Carregar dados salvos do localStorage ao montar o componente
  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem("time_math_entries");
      const savedTotal = localStorage.getItem("time_math_total");

      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
      if (savedTotal) {
        setTotal(JSON.parse(savedTotal));
      }
    } catch (e) {
      console.warn("Erro ao acessar localStorage:", e);
    }
  }, []);

  // Salvar dados no localStorage sempre que as entradas ou total mudarem
  useEffect(() => {
    try {
      localStorage.setItem("time_math_entries", JSON.stringify(entries));
      if (total) {
        localStorage.setItem("time_math_total", JSON.stringify(total));
      } else {
        localStorage.removeItem("time_math_total");
      }
    } catch (e) {
      console.warn("Erro ao salvar no localStorage:", e);
    }
  }, [entries, total]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleAddEntry = () => {
    setEntries([...entries, { id: Date.now().toString(), value: "", operation: "add" }]);
  };

  const handleRemoveEntry = (id: string) => {
    if (entries.length > 2) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const handleChange = (id: string, field: "value" | "operation", val: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: val } : e));
  };

  const calculateTotal = () => {
    let totalMinutes = 0;

    entries.forEach(entry => {
      if (!entry.value) return;
      
      const [hStr, mStr] = entry.value.split(":");
      let hours = parseInt(hStr || "0", 10);
      let mins = parseInt(mStr || "0", 10);
      
      if (isNaN(hours)) hours = 0;
      if (isNaN(mins)) mins = 0;

      const entryTotalMins = (hours * 60) + mins;

      if (entry.operation === "add") {
        totalMinutes += entryTotalMins;
      } else {
        totalMinutes -= entryTotalMins;
      }
    });

    const isNegative = totalMinutes < 0;
    const absMins = Math.abs(totalMinutes);
    
    const finalHours = Math.floor(absMins / 60);
    const finalMins = absMins % 60;

    setTotal({ hours: finalHours, minutes: finalMins, isNegative });
    trackEvent("calculate_time_math", { total_minutes: totalMinutes });
  };

  const clearAll = () => {
    setEntries([
      { id: Date.now().toString(), value: "", operation: "add" },
      { id: (Date.now() + 1).toString(), value: "", operation: "add" }
    ]);
    setTotal(null);
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full">
        <div className="lg:col-span-6 space-y-6 print:hidden">
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Calculator size={22} /></div>
                Somar ou Subtrair Horas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              
              <div className="space-y-4">
                {entries.map((entry, index) => (
                  <div key={entry.id} className="flex items-center gap-3">
                    {index === 0 ? (
                      <div className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
                        <Clock size={20} className="text-slate-500" />
                      </div>
                    ) : (
                      <button
                        onClick={() => handleChange(entry.id, "operation", entry.operation === "add" ? "subtract" : "add")}
                        className={`w-12 h-12 flex items-center justify-center rounded-xl shrink-0 transition-colors ${
                          entry.operation === "add" 
                            ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                        title="Clique para mudar a operação"
                      >
                        {entry.operation === "add" ? <Plus size={20} /> : <Minus size={20} />}
                      </button>
                    )}
                    
                    <div className="flex-1">
                      <Input 
                        type="time" 
                        value={entry.value} 
                        onChange={e => handleChange(entry.id, "value", e.target.value)} 
                        className="h-12 text-lg dark:bg-slate-800 dark:text-white font-mono" 
                        placeholder="00:00"
                      />
                    </div>

                    <div className="w-10">
                      {index > 1 && (
                        <button onClick={() => handleRemoveEntry(entry.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between">
                <Button variant="outline" onClick={handleAddEntry} className="border-dashed border-2 dark:border-slate-700">
                  <Plus size={16} className="mr-2" /> Adicionar Linha
                </Button>
                <Button variant="ghost" onClick={clearAll} className="text-slate-500">
                  Limpar
                </Button>
              </div>

              <Button onClick={calculateTotal} className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 text-lg font-bold rounded-xl mt-4">
                Calcular Total
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-6">
          <Card className={`h-full border-0 shadow-lg ${total !== null ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'} min-h-[400px]`}>
            <CardContent className="p-6 flex flex-col justify-center h-full">
              {total !== null ? (
                <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  {/* Tabela de Detalhamento dos Lançamentos (Apenas para Impressão / PDF) */}
                  <div className="hidden print:block mb-6 w-full text-left">
                    <h3 className="text-base font-bold text-slate-800 mb-3">Detalhamento dos Lançamentos</h3>
                    <table className="w-full text-sm border border-slate-200">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="px-4 py-2 text-left w-1/4">Período</th>
                          <th className="px-4 py-2 text-center w-1/3">Operação</th>
                          <th className="px-4 py-2 text-right font-mono w-1/3">Duração</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.map((entry, idx) => entry.value && (
                          <tr key={entry.id} className="border-t border-slate-200">
                            <td className="px-4 py-2 text-left">Parcela {idx + 1}</td>
                            <td className="px-4 py-2 text-center font-semibold">
                              {entry.operation === "add" ? "Somar (+)" : "Subtrair (-)"}
                            </td>
                            <td className="px-4 py-2 text-right font-mono font-bold">{entry.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="relative w-64 h-64 mx-auto flex flex-col items-center justify-center print:border-4 print:border-indigo-600 print:rounded-full print:bg-slate-50 print:w-48 print:h-48">
                    <div className={`absolute inset-0 rounded-full border-4 opacity-20 ${total.isNegative ? 'border-red-500 bg-red-50' : 'border-indigo-500 bg-indigo-50'} print:hidden`}></div>
                    <div className="z-10 flex flex-col items-center">
                      <span className="text-sm font-bold text-slate-400 uppercase mb-2">Total Calculado</span>
                      <div className="flex items-baseline gap-1">
                        {total.isNegative && <span className="text-5xl font-extrabold text-red-500">-</span>}
                        <span className="text-6xl font-extrabold font-mono dark:text-white">
                          {String(total.hours).padStart(2, '0')}:{String(total.minutes).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-slate-500 mt-3">
                        ({total.hours} horas e {total.minutes} minutos)
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl text-sm text-slate-600 dark:text-slate-300 flex items-start gap-3 text-left">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                    <p>O sistema de tempo usa base 60. Por isso, ao somar 30 min + 45 min o resultado correto é 1h e 15m, e não 75. Nossa ferramenta já faz essa conversão automaticamente para você.</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-2 print:hidden">
                    <Button variant="outline" onClick={handleShare} className="flex-1 h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold gap-2 rounded-xl">
                        {copiado ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Share2 size={18} />}
                        {copiado ? "Link Copiado" : "Compartilhar"}
                    </Button>
                    <Button variant="outline" onClick={() => window.print()} className="flex-1 h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold gap-2 rounded-xl">
                        <Printer size={18} /> Imprimir
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-400 flex flex-col items-center print:hidden">
                  <Calculator size={48} className="opacity-20 mb-4" />
                  <p className="text-lg font-medium text-slate-500 dark:text-slate-400">Resultado aparecerá aqui</p>
                  <p className="text-sm mt-2 max-w-xs">Adicione os tempos à esquerda e clique em calcular para ver a soma ou subtração das horas.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
