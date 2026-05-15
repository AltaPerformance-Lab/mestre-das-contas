import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// --- MAPA DE FASES E DETALHES ---
export const MOON_PHASE_DETAILS = {
  'nova': { name: 'Nova', desc: 'Início (0%)', color: 'text-slate-400 dark:text-slate-500' },
  'crescente-concava': { name: 'Crescente Côncava', desc: 'Despertar', color: 'text-cyan-400' },
  'quarto-crescente': { name: 'Quarto Crescente', desc: 'Aceleração (50%)', color: 'text-blue-500' },
  'crescente-convexa': { name: 'Crescente Convexa', desc: 'Expansão', color: 'text-indigo-400' },
  'cheia': { name: 'Cheia', desc: 'Auge (100%)', color: 'text-yellow-400' },
  'minguante-convexa': { name: 'Minguante Convexa', desc: 'Absorção', color: 'text-amber-500' },
  'quarto-minguante': { name: 'Quarto Minguante', desc: 'Reflexão (50%)', color: 'text-orange-500' },
  'minguante-concava': { name: 'Minguante Côncava (Balsâmica)', desc: 'Encerramento', color: 'text-rose-400' },
};

export type MoonPhaseKey = keyof typeof MOON_PHASE_DETAILS;

// --- LÓGICA ASTRONÔMICA (ALGORITMO SINÓDICO) ---
export const getMoonPhase = (date: Date) => {
  const lp = 2551442.8; // Período sinódico em segundos
  const ref = new Date(Date.UTC(2000, 0, 6, 18, 14, 0)).getTime();
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0).getTime();
  
  let pNoon = ((targetDate - ref) / 1000) % lp / lp;
  if (pNoon < 0) pNoon += 1;

  const phaseIndex = Math.floor((pNoon + 0.0625) * 8) % 8;
  
  const phases: MoonPhaseKey[] = [
    'nova', 'crescente-concava', 'quarto-crescente', 'crescente-convexa',
    'cheia', 'minguante-convexa', 'quarto-minguante', 'minguante-concava'
  ];

  const currentPhase = phases[phaseIndex];
  const illumination = Math.round((0.5 * (1 - Math.cos(pNoon * 2 * Math.PI))) * 100);

  return {
    phase: currentPhase,
    details: MOON_PHASE_DETAILS[currentPhase],
    illumination,
    percent: pNoon
  };
};

export const formatMoonDate = (date: Date) => {
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};
