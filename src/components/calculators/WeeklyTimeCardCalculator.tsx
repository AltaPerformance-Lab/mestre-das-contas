"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Moon, Sun, Calculator, Printer, Share2, Trash2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { calculateWorkHoursAdvanced, timeToMinutes, minutesToTime, type WorkHoursResult } from "@/lib/calculators/work-hours";

interface DayRecord {
  id: number;
  label: string;
  e1: string;
  s1: string;
  e2: string;
  s2: string;
  result?: WorkHoursResult;
}

const DAYS_OF_WEEK = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

export default function WeeklyTimeCardCalculator() {
  const [jornada, setJornada] = useState("08:00");
  const [jornadaSabado, setJornadaSabado] = useState("04:00");
  const [days, setDays] = useState<DayRecord[]>(
    DAYS_OF_WEEK.map((label, index) => ({
      id: index,
      label,
      e1: "",
      s1: "",
      e2: "",
      s2: "",
    }))
  );

  const [totals, setTotals] = useState<{
    trabalhado: string;
    extra: string;
    falta: string;
    saldo: string;
    status: "positivo" | "negativo" | "neutro";
  } | null>(null);

  const printRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({ 
    contentRef: printRef, 
    documentTitle: "Cartao_de_Ponto_MestreDasContas",
    pageStyle: `@page { size: auto; margin: 10mm; } @media print { body { -webkit-print-color-adjust: exact; } }`
  });

  const handleDayChange = (id: number, field: keyof DayRecord, value: string) => {
    setDays((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const calculateWeek = () => {
    let totalTrabalhadoMins = 0;
    let totalExtraMins = 0;
    let totalFaltaMins = 0;

    const newDays = days.map((d) => {
      // Pula dias que não tem nenhuma entrada preenchida
      if (!d.e1 && !d.s2 && !d.e2 && !d.s1) return d;

      const currentJornada = d.label === "Sábado" ? jornadaSabado : (d.label === "Domingo" ? "00:00" : jornada);
      
      const res = calculateWorkHoursAdvanced(d.e1, d.s1, d.e2, d.s2, currentJornada);
      
      totalTrabalhadoMins += res.totalTrabalhadoMins;
      
      const saldoMins = timeToMinutes(res.saldo);
      if (saldoMins > 0) {
        totalExtraMins += saldoMins;
      } else if (saldoMins < 0) {
        totalFaltaMins += Math.abs(saldoMins);
      }

      return { ...d, result: res };
    });

    setDays(newDays);

    const saldoGeralMins = totalExtraMins - totalFaltaMins;
    const status = saldoGeralMins > 10 ? "positivo" : saldoGeralMins < -10 ? "negativo" : "neutro";

    setTotals({
      trabalhado: minutesToTime(totalTrabalhadoMins),
      extra: minutesToTime(totalExtraMins),
      falta: minutesToTime(totalFaltaMins),
      saldo: minutesToTime(saldoGeralMins),
      status
    });

    trackEvent("calculate_weekly_timecard", { status, worked_mins: totalTrabalhadoMins });
  };

  const limpar = () => {
    setDays(DAYS_OF_WEEK.map((label, index) => ({ id: index, label, e1: "", s1: "", e2: "", s2: "" })));
    setTotals(null);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Calculadora de Cartão de Ponto',
          text: 'Calculei minhas horas da semana usando o Mestre das Contas!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className="w-full font-sans space-y-6" ref={printRef}>
      
      <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 rounded-2xl overflow-hidden print:shadow-none print:border">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 print:bg-slate-100 print:text-slate-900">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm print:bg-slate-200"><Clock size={22} className="print:text-slate-900" /></div>
              Cartão de Ponto Semanal
            </CardTitle>
            <div className="flex gap-2 print:hidden">
                <Button variant="ghost" size="icon" onClick={limpar} className="text-white hover:bg-white/20"><Trash2 size={18} /></Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 md:p-6 space-y-6">
          {/* Configuração de Jornada */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl print:hidden">
             <div className="space-y-2 col-span-2 md:col-span-1">
                <Label className="text-xs font-bold text-slate-500 uppercase">Jornada (Seg a Sex)</Label>
                <Input type="time" value={jornada} onChange={e => setJornada(e.target.value)} className="dark:bg-slate-900 dark:text-white" />
             </div>
             <div className="space-y-2 col-span-2 md:col-span-1">
                <Label className="text-xs font-bold text-slate-500 uppercase">Jornada (Sábado)</Label>
                <Input type="time" value={jornadaSabado} onChange={e => setJornadaSabado(e.target.value)} className="dark:bg-slate-900 dark:text-white" />
             </div>
             <div className="col-span-2 md:col-span-2 flex items-end">
                <Button onClick={calculateWeek} className="w-full bg-blue-600 hover:bg-blue-700 h-10 font-bold">
                   <Calculator size={16} className="mr-2" /> Calcular Semana
                </Button>
             </div>
          </div>

          {/* Tabela de Dias */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-800 text-slate-500 print:border-slate-300">
                  <th className="pb-3 px-2 font-bold uppercase text-xs">Dia</th>
                  <th className="pb-3 px-2 font-bold uppercase text-xs text-center"><Sun size={14} className="inline mr-1 text-orange-500"/> Entrada</th>
                  <th className="pb-3 px-2 font-bold uppercase text-xs text-center"><Moon size={14} className="inline mr-1 text-slate-400"/> Saída Almoço</th>
                  <th className="pb-3 px-2 font-bold uppercase text-xs text-center"><Sun size={14} className="inline mr-1 text-orange-500"/> Volta Almoço</th>
                  <th className="pb-3 px-2 font-bold uppercase text-xs text-center"><Moon size={14} className="inline mr-1 text-slate-400"/> Saída</th>
                  <th className="pb-3 px-2 font-bold uppercase text-xs text-right hidden md:table-cell">Total Dia</th>
                  <th className="pb-3 px-2 font-bold uppercase text-xs text-right hidden md:table-cell">Saldo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 print:divide-slate-200">
                {days.map((day) => (
                  <tr key={day.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-2 font-medium text-slate-900 dark:text-slate-100 print:text-xs">
                      {day.label}
                    </td>
                    <td className="py-2 px-1">
                      <Input type="time" value={day.e1} onChange={e => handleDayChange(day.id, 'e1', e.target.value)} className="h-9 px-2 text-center print:border-0 print:p-0 print:bg-transparent" />
                    </td>
                    <td className="py-2 px-1">
                      <Input type="time" value={day.s1} onChange={e => handleDayChange(day.id, 's1', e.target.value)} className="h-9 px-2 text-center print:border-0 print:p-0 print:bg-transparent" />
                    </td>
                    <td className="py-2 px-1">
                      <Input type="time" value={day.e2} onChange={e => handleDayChange(day.id, 'e2', e.target.value)} className="h-9 px-2 text-center print:border-0 print:p-0 print:bg-transparent" />
                    </td>
                    <td className="py-2 px-1">
                      <Input type="time" value={day.s2} onChange={e => handleDayChange(day.id, 's2', e.target.value)} className="h-9 px-2 text-center print:border-0 print:p-0 print:bg-transparent" />
                    </td>
                    
                    {/* Resultados Mobile/Desktop combinados na responsividade */}
                    <td className="py-3 px-2 text-right hidden md:table-cell font-mono">
                      {day.result?.horasTrabalhadas || "--:--"}
                    </td>
                    <td className="py-3 px-2 text-right hidden md:table-cell font-mono">
                      {day.result ? (
                         <span className={`font-bold ${day.result.status === 'positivo' ? 'text-green-600' : day.result.status === 'negativo' ? 'text-red-600' : 'text-slate-400'}`}>
                            {day.result.status === 'positivo' ? '+' : ''}{day.result.saldo}
                         </span>
                      ) : "--:--"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resumo Mobile (Renderiza apenas se calculou) */}
          {totals && (
            <div className="md:hidden mt-4 space-y-3 print:hidden">
              <h4 className="text-sm font-bold text-slate-500 uppercase">Resumo por Dia</h4>
              {days.filter(d => d.result).map(d => (
                 <div key={d.id} className="flex justify-between items-center text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="font-bold">{d.label}</span>
                    <div className="flex items-center gap-4 font-mono">
                       <span className="text-slate-600 dark:text-slate-300">{d.result?.horasTrabalhadas}</span>
                       <span className={`font-bold ${d.result?.status === 'positivo' ? 'text-green-600' : d.result?.status === 'negativo' ? 'text-red-600' : 'text-slate-400'}`}>
                          {d.result?.status === 'positivo' ? '+' : ''}{d.result?.saldo}
                       </span>
                    </div>
                 </div>
              ))}
            </div>
          )}

        </CardContent>
      </Card>

      {/* Resultados da Semana */}
      {totals && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4">
           <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-900 print:border print:shadow-none">
              <CardContent className="p-4 text-center">
                 <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase mb-1">Horas Trabalhadas</p>
                 <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">{totals.trabalhado}</p>
              </CardContent>
           </Card>
           <Card className="border-0 shadow-sm bg-green-50 dark:bg-green-900/20 print:border print:shadow-none">
              <CardContent className="p-4 text-center">
                 <p className="text-[10px] md:text-xs font-bold text-green-700 dark:text-green-400 uppercase mb-1">Horas Extras</p>
                 <p className="text-2xl md:text-3xl font-extrabold font-mono text-green-700 dark:text-green-400">+{totals.extra}</p>
              </CardContent>
           </Card>
           <Card className="border-0 shadow-sm bg-red-50 dark:bg-red-900/20 print:border print:shadow-none">
              <CardContent className="p-4 text-center">
                 <p className="text-[10px] md:text-xs font-bold text-red-700 dark:text-red-400 uppercase mb-1">Atrasos / Faltas</p>
                 <p className="text-2xl md:text-3xl font-extrabold font-mono text-red-700 dark:text-red-400">-{totals.falta}</p>
              </CardContent>
           </Card>
           <Card className={`border-0 shadow-sm print:border print:shadow-none ${totals.status === 'positivo' ? 'bg-green-600 text-white' : totals.status === 'negativo' ? 'bg-red-600 text-white' : 'bg-slate-800 text-white'}`}>
              <CardContent className="p-4 text-center">
                 <p className="text-[10px] md:text-xs font-bold uppercase mb-1 opacity-80">Saldo Final</p>
                 <p className="text-2xl md:text-3xl font-extrabold font-mono">
                    {totals.status === 'positivo' ? '+' : ''}{totals.saldo}
                 </p>
              </CardContent>
           </Card>
        </div>
      )}

      {/* Botões de Ação */}
      <div className="flex gap-3 justify-end print:hidden">
         <Button variant="outline" onClick={handleShare} className="bg-white dark:bg-slate-900">
            <Share2 size={16} className="mr-2"/> Compartilhar
         </Button>
         <Button variant="outline" onClick={() => reactToPrintFn()} className="bg-white dark:bg-slate-900">
            <Printer size={16} className="mr-2"/> Imprimir Folha
         </Button>
      </div>
    </div>
  );
}
