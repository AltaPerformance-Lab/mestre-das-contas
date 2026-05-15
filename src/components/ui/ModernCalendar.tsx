'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import { 
  format, addMonths, subMonths, startOfMonth, 
  endOfMonth, startOfWeek, endOfWeek, isSameMonth, 
  isSameDay, eachDayOfInterval, parseISO, isValid
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMoonPhase, MOON_PHASE_DETAILS, MoonPhaseKey } from '@/lib/calculators/moon';

// --- EVENTOS ASTRONÔMICOS ESPECIAIS DE 2026 ---
const SPECIAL_EVENTS: Record<string, { label: string, color: string, glow: string }> = {
  '2026-03-03': { label: 'Eclipse Total', color: 'bg-rose-600 text-white', glow: 'shadow-rose-500/50' },
  '2026-05-31': { label: 'Lua Azul', color: 'bg-blue-600 text-white', glow: 'shadow-blue-500/50' },
  '2026-08-28': { label: 'Eclipse Parcial', color: 'bg-fuchsia-600 text-white', glow: 'shadow-fuchsia-500/50' },
  '2026-11-24': { label: 'Superlua', color: 'bg-amber-500 text-white', glow: 'shadow-amber-500/50' },
  '2026-12-24': { label: 'Superlua', color: 'bg-amber-500 text-white', glow: 'shadow-amber-500/50' }
};

// --- COMPONENTES DE ÍCONES DE LUA (8 FASES) ---
const MoonIcon = ({ phase, className, size = 24 }: { phase: string, className?: string, size?: number }) => {
  const renderPhase = () => {
    switch (phase) {
      case 'nova':
        return null; 
      case 'crescente-concava':
        return <path d="M 12 3 A 9 9 0 0 1 12 21 A 4 9 0 0 0 12 3 Z" fill="currentColor" />;
      case 'quarto-crescente':
        return <path d="M 12 3 A 9 9 0 0 1 12 21 Z" fill="currentColor" />;
      case 'crescente-convexa':
        return <path d="M 12 3 A 9 9 0 0 1 12 21 A 4 9 0 0 1 12 3 Z" fill="currentColor" />;
      case 'cheia':
        return <circle cx="12" cy="12" r="9" fill="currentColor" />;
      case 'minguante-convexa':
        return <path d="M 12 3 A 9 9 0 0 0 12 21 A 4 9 0 0 0 12 3 Z" fill="currentColor" />;
      case 'quarto-minguante':
        return <path d="M 12 3 A 9 9 0 0 0 12 21 Z" fill="currentColor" />;
      case 'minguante-concava':
        return <path d="M 12 3 A 9 9 0 0 0 12 21 A 4 9 0 0 1 12 3 Z" fill="currentColor" />;
      default:
        return null;
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={cn("transition-colors duration-300", className)}>
      <circle cx="12" cy="12" r="9" fill="currentColor" className="opacity-10 print:opacity-5" />
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-30 print:opacity-100 print:stroke-slate-300" />
      {renderPhase()}
    </svg>
  );
};

interface ModernCalendarProps {
  initialDate?: string; // ISO format string
}

export default function ModernCalendar({ initialDate }: ModernCalendarProps) {
  // Inicializa com a data da URL se for válida, caso contrário usa hoje
  const parseInitialDate = () => {
    if (initialDate) {
      const parsed = parseISO(initialDate);
      if (isValid(parsed)) return parsed;
    }
    return new Date();
  };

  const [currentMonth, setCurrentMonth] = useState(parseInitialDate);
  const searchParams = useSearchParams();

  // Hydrate from URL
  useEffect(() => {
    const d = searchParams.get('data');
    const m = searchParams.get('mes');
    const target = d || (m ? `${m}-01` : undefined);
    if (target) {
        const parsed = parseISO(target);
        if (isValid(parsed)) setCurrentMonth(parsed);
    }
  }, [searchParams]);

  const today = new Date();
  
  const todayInfo = getMoonPhase(today);
  const todayPhaseDetails = MOON_PHASE_DETAILS[todayInfo.phase];

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const legendItems = Object.entries(MOON_PHASE_DETAILS).map(([key, value]) => ({
    id: key,
    phase: key,
    name: value.name,
    desc: value.desc,
    color: value.color
  }));

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 font-sans px-2 print:gap-4 print:px-0">
      
      {/* HEADER PROFISSIONAL (Otimizado para Impressão) */}
      <div className="bg-slate-900 dark:bg-slate-950 print:bg-white print:border-slate-300 print:shadow-none rounded-3xl print:rounded-xl p-6 print:p-4 text-white print:text-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 print:gap-2 shadow-xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none print:hidden" />
          
          <div className="flex flex-col items-center md:items-start relative z-10 print:w-full print:items-center">
              <div className="flex items-center gap-2 text-blue-400 print:text-slate-500 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest">Calendário Astral</span>
              </div>
              <h2 className="text-4xl print:text-3xl font-black capitalize tracking-tight flex items-center gap-4">
                  {format(currentMonth, 'MMMM', { locale: ptBR })}
                  <span className="text-xl font-light text-slate-500 print:text-slate-400">{format(currentMonth, 'yyyy')}</span>
              </h2>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5 relative z-10 print:hidden">
              <button onClick={prevMonth} className="p-3 hover:bg-white/10 rounded-xl transition-all active:scale-90 text-slate-400 hover:text-white" aria-label="Mês anterior">
                  <ChevronLeft size={24} />
              </button>
              <div className="h-8 w-[1px] bg-white/10" />
              <button onClick={nextMonth} className="p-3 hover:bg-white/10 rounded-xl transition-all active:scale-90 text-slate-400 hover:text-white" aria-label="Próximo mês">
                  <ChevronRight size={24} />
              </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 bg-white/5 print:bg-slate-50 px-6 py-3 print:py-2 rounded-2xl border border-white/5 print:border-slate-200 relative z-10 print:absolute print:right-4 print:top-4">
              <div className="w-10 h-10 bg-blue-600 print:bg-slate-200 rounded-xl flex items-center justify-center shadow-lg print:shadow-none shadow-blue-500/20 text-white print:text-slate-600">
                  <CalendarIcon size={20} />
              </div>
              <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 print:text-slate-500 mb-0.5">Hoje: {format(today, "dd/MM")}</p>
                  <p className={cn("text-xs font-bold uppercase", todayPhaseDetails.color)}>
                      Lua {todayPhaseDetails.name} <span className="print:hidden">({todayInfo.illumination}%)</span>
                  </p>
              </div>
          </div>
      </div>

      {/* GRADE DO CALENDÁRIO */}
      <div className="bg-white dark:bg-slate-900 print:bg-white rounded-[2rem] print:rounded-xl border border-slate-200 dark:border-slate-800 print:border-slate-300 shadow-2xl print:shadow-none overflow-hidden">
          
          <div className="grid grid-cols-7 bg-slate-50 dark:bg-slate-800/50 print:bg-slate-100 border-b border-slate-200 dark:border-slate-800 print:border-slate-300">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                  <div key={day} className="py-4 print:py-2 text-center text-[10px] md:text-xs font-black uppercase text-slate-400 dark:text-slate-500 print:text-slate-600 tracking-widest border-r last:border-r-0 border-slate-200 dark:border-slate-800 print:border-slate-300">
                      {day}
                  </div>
              ))}
          </div>

          <div className="grid grid-cols-7">
              {days.map((day, idx) => {
                  const isToday = isSameDay(day, today);
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const { phase, illumination } = getMoonPhase(day);
                  const phaseDetails = MOON_PHASE_DETAILS[phase];
                  
                  // Verifica se há evento astronômico neste dia
                  const dateString = format(day, 'yyyy-MM-dd');
                  const event = SPECIAL_EVENTS[dateString];
                  
                  return (
                      <div 
                          key={idx} 
                          className={cn(
                              "relative flex flex-col items-center justify-center min-h-[90px] md:min-h-[120px] print:min-h-[85px] border-r border-b border-slate-100 dark:border-slate-800 print:border-slate-300 py-2 px-0.5 md:p-2 transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/30 group",
                              !isCurrentMonth && "bg-slate-50/30 dark:bg-slate-950/20 print:bg-slate-50 opacity-40 print:opacity-50",
                              isToday && "bg-blue-50/50 dark:bg-blue-900/10 print:bg-slate-100",
                              (idx + 1) % 7 === 0 && "border-r-0"
                          )}
                      >
                          <span className={cn(
                              "absolute top-1 left-1 md:top-2 md:left-2 text-sm md:text-lg print:text-base font-black",
                              isToday ? "text-blue-600 dark:text-blue-400 print:text-black" : (isCurrentMonth ? "text-slate-900 dark:text-slate-100 print:text-slate-800" : "text-slate-400 dark:text-slate-600 print:text-slate-400")
                          )}>
                              {format(day, 'd')}
                          </span>

                          <div className="flex flex-col items-center gap-1 mt-4 md:mt-2 print:mt-1 w-full">
                              
                              <div 
                                className={cn(
                                  "transition-all duration-300 transform scale-[0.8] sm:scale-90 md:scale-110 group-hover:scale-125 print:scale-100",
                                  !isCurrentMonth && "grayscale opacity-60 print:opacity-40"
                                )}
                                style={{
                                  filter: illumination > 5 && !event ? `drop-shadow(0px 0px ${illumination / 10}px currentColor)` : 'none'
                                }}
                              >
                                  <MoonIcon phase={phase} className={cn(phaseDetails.color, "print:text-slate-900")} size={24} />
                              </div>
                              
                              <span className={cn(
                                  "text-[5.5px] min-[320px]:text-[6px] min-[375px]:text-[6.5px] sm:text-[8px] md:text-[9px] -tracking-[0.02em] sm:tracking-normal font-bold md:font-black uppercase text-center leading-tight mt-1 transition-colors w-full px-0.5",
                                  phaseDetails.color
                              )}>
                                  {phaseDetails.name}
                              </span>
                              <span className="text-[8px] text-slate-400 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
                                  {illumination}% luz
                              </span>
                          </div>
                          
                          {/* Evento Especial (Eclipse/Superlua) */}
                          {event && isCurrentMonth && (
                              <div className={cn(
                                  "absolute bottom-1 md:bottom-2 w-11/12 text-[5px] sm:text-[6px] md:text-[8px] font-black uppercase text-center rounded-sm md:rounded-md px-0.5 py-0.5 shadow-lg print:shadow-none print:border print:border-slate-400 print:bg-white print:text-slate-800 tracking-tighter sm:tracking-normal leading-none",
                                  event.color,
                                  event.glow
                              )}>
                                  {event.label}
                              </div>
                          )}

                          {isToday && (
                              <span className="absolute top-1 right-1 md:top-2 md:right-2 text-[5px] md:text-[8px] font-black uppercase bg-blue-600 print:bg-slate-300 print:text-slate-800 text-white px-1 md:px-1.5 py-0.5 rounded-full shadow-lg shadow-blue-500/30 print:shadow-none">Hoje</span>
                          )}
                      </div>
                  );
              })}
          </div>
      </div>

      {/* LEGENDA DAS 8 FASES SINCRONIZADA */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 print:gap-2">
          {legendItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-900 print:bg-white print:border-slate-300 p-3 md:p-4 print:p-2 rounded-2xl print:rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-3 shadow-sm print:shadow-none hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                  <div className={cn("shrink-0 p-2 md:p-3 print:p-1.5 bg-slate-50 dark:bg-slate-800/80 print:bg-transparent rounded-xl", item.color, "print:text-slate-700")}>
                      <MoonIcon phase={item.phase} size={20} />
                  </div>
                  <div>
                      <p className="text-[10px] md:text-[11px] font-black uppercase text-slate-900 dark:text-slate-100 print:text-black leading-tight">{item.name}</p>
                      <p className="text-[9px] md:text-[10px] text-slate-500 font-medium uppercase mt-0.5">{item.desc}</p>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}