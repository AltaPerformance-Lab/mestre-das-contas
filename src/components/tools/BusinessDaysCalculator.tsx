"use client";

import React, { useState } from "react";
import { 
  addBusinessDays, isWeekend, isSameDay, 
  eachDayOfInterval, format, parseISO, differenceInBusinessDays 
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Calculator, ArrowRight, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- FERIADOS NACIONAIS 2026 (Fixos e Móveis Estimados) ---
const nationalHolidays2026 = [
  "2026-01-01", // Confraternização Universal
  "2026-02-16", // Carnaval (Segunda)
  "2026-02-17", // Carnaval (Terça)
  "2026-04-03", // Paixão de Cristo
  "2026-04-21", // Tiradentes
  "2026-05-01", // Dia do Trabalho
  "2026-06-04", // Corpus Christi
  "2026-09-07", // Independência do Brasil
  "2026-10-12", // Nossa Senhora Aparecida
  "2026-11-02", // Finados
  "2026-11-15", // Proclamação da República
  "2026-12-25", // Natal
];

export default function BusinessDaysCalculator() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [daysToAdd, setDaysToAdd] = useState(10);
  const [endDate, setEndDate] = useState(""); // For "Difference" mode
  const [includeSaturdays, setIncludeSaturdays] = useState(false);
  const [customHolidays, setCustomHolidays] = useState<string[]>([]);
  const [newHoliday, setNewHoliday] = useState("");

  const [resultDate, setResultDate] = useState<Date | null>(null);
  const [diffDays, setDiffDays] = useState<number | null>(null);

  // --- ACTIONS ---
  const addCustomHoliday = () => {
    if (newHoliday && !customHolidays.includes(newHoliday)) {
      setCustomHolidays([...customHolidays, newHoliday]);
      setNewHoliday("");
    }
  };

  const removeCustomHoliday = (date: string) => {
    setCustomHolidays(customHolidays.filter(d => d !== date));
  };

  const isHoliday = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return nationalHolidays2026.includes(dateString) || customHolidays.includes(dateString);
  };

  const calculateEndDate = () => {
    if (!startDate) return;
    const start = parseISO(startDate);
    
    // Custom logic to handle "include Saturdays" which is tricky with standard libraries
    // Simple iteration for robustness
    let currentD = start;
    let added = 0;
    while (added < daysToAdd) {
        currentD = new Date(currentD.setDate(currentD.getDate() + 1));
        const isWknd = isWeekend(currentD);
        const isSat = currentD.getDay() === 6;
        const isHol = isHoliday(currentD);

        if (!isHol) {
            if (!isWknd || (includeSaturdays && isSat)) {
                added++;
            }
        }
    }
    setResultDate(currentD);
  };

  const calculateDifference = () => {
      if (!startDate || !endDate) return;
      const start = parseISO(startDate);
      const end = parseISO(endDate);

      // Simple iteration again for consistency with "include saturdays"
      let count = 0;
      const interval = eachDayOfInterval({ start, end });
      // Remove start date from count usually? Or include? Standard is excluding start, including end.
      // Let's iterate from start+1 to end.
      
      let temp = new Date(start);
      while (temp < end) {
          temp.setDate(temp.getDate() + 1);
          const isWknd = isWeekend(temp);
          const isSat = temp.getDay() === 6;
          const isHol = isHoliday(temp);

          if (!isHol) {
             if (!isWknd || (includeSaturdays && isSat)) {
                 count++;
             }
          }
      }
      setDiffDays(count);
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 text-left">
      <div className="lg:col-span-2 space-y-6">
        <Tabs defaultValue="add" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <TabsTrigger value="add" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-400 font-bold transition-all">Somar Dias</TabsTrigger>
                <TabsTrigger value="diff" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-400 font-bold transition-all">Diferença entre Datas</TabsTrigger>
            </TabsList>

            {/* SOMAR DIAS */}
            <TabsContent value="add">
                <Card className="border-blue-100 dark:border-blue-900 shadow-lg shadow-blue-100/50 dark:shadow-none bg-white dark:bg-slate-900">
                    <CardContent className="p-6 space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Data Inicial</Label>
                                <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="bg-slate-50 dark:bg-slate-800 dark:border-slate-700"/>
                            </div>
                            <div className="space-y-2">
                                <Label>Dias Úteis a Somar</Label>
                                <Input type="number" value={daysToAdd} onChange={e => setDaysToAdd(Number(e.target.value))} className="bg-slate-50 dark:bg-slate-800 dark:border-slate-700"/>
                            </div>
                        </div>
                        <Button onClick={calculateEndDate} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-12 shadow-lg shadow-blue-200 dark:shadow-none">
                            <Calculator className="mr-2"/> Calcular Prazo Final
                        </Button>

                        {resultDate && (
                            <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 text-center animate-in fade-in zoom-in duration-300">
                                <span className="block text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Data Final Calculada</span>
                                <span className="block text-3xl font-black text-blue-700 dark:text-blue-400">
                                    {format(resultDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                </span>
                                <span className="block text-sm font-medium text-blue-600 dark:text-blue-300 mt-1 capitalize">
                                    {format(resultDate, "EEEE", { locale: ptBR })}
                                </span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>

            {/* DIFERENÇA */}
            <TabsContent value="diff">
                <Card className="border-blue-100 dark:border-blue-900 shadow-lg shadow-blue-100/50 dark:shadow-none bg-white dark:bg-slate-900">
                    <CardContent className="p-6 space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Data Inicial</Label>
                                <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="bg-slate-50 dark:bg-slate-800 dark:border-slate-700"/>
                            </div>
                            <div className="space-y-2">
                                <Label>Data Final</Label>
                                <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="bg-slate-50 dark:bg-slate-800 dark:border-slate-700"/>
                            </div>
                        </div>
                        <Button onClick={calculateDifference} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-12 shadow-lg shadow-blue-200 dark:shadow-none">
                            <CalendarIcon className="mr-2"/> Contar Dias Úteis
                        </Button>

                        {diffDays !== null && (
                            <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 text-center animate-in fade-in zoom-in duration-300">
                                <span className="block text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total de Dias Úteis</span>
                                <span className="block text-4xl font-black text-blue-700 dark:text-blue-400">
                                    {diffDays}
                                </span>
                                <span className="block text-sm font-medium text-blue-600 dark:text-blue-300 mt-1">
                                    (Excluindo finais de semana e feriados)
                                </span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>

      {/* SIDEBAR DE CONFIGURAÇÕES */}
      <div className="space-y-6">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                  <CardTitle className="text-base font-bold text-slate-700 dark:text-slate-200">Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                      <Label htmlFor="saturday" className="cursor-pointer text-slate-700 dark:text-slate-300">Considerar Sábado Útil?</Label>
                      <Switch id="saturday" checked={includeSaturdays} onCheckedChange={setIncludeSaturdays} />
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <Label className="mb-2 block text-slate-700 dark:text-slate-300">Adicionar Feriado Local</Label>
                      <div className="flex gap-2">
                          <Input type="date" value={newHoliday} onChange={e => setNewHoliday(e.target.value)} className="bg-slate-50 dark:bg-slate-800 dark:border-slate-700 h-9"/>
                          <Button size="icon" onClick={addCustomHoliday} className="h-9 w-9 bg-green-600 hover:bg-green-700 text-white"><Plus size={16}/></Button>
                      </div>
                      
                      {customHolidays.length > 0 && (
                          <div className="mt-3 space-y-2">
                              {customHolidays.map(h => (
                                  <div key={h} className="flex justify-between items-center text-sm bg-slate-50 dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                                      <span>{format(parseISO(h), "dd/MM/yyyy")}</span>
                                      <button onClick={() => removeCustomHoliday(h)} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
              </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-800 border-none">
              <CardContent className="p-4">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Feriados Nacionais 2026</h4>
                  <div className="h-48 overflow-y-auto pr-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                      {nationalHolidays2026.map(h => (
                          <div key={h} className="text-xs text-slate-600 dark:text-slate-300 flex justify-between">
                              <span>{format(parseISO(h), "dd/MM", { locale: ptBR })}</span>
                              <span className="text-slate-400 dark:text-slate-500">{format(parseISO(h), "EEEE", { locale: ptBR })}</span>
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
