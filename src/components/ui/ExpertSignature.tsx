import { ShieldCheck, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface Props {
    updatedAt?: string;
    author?: string;
}

export default function ExpertSignature({ 
    updatedAt = "Maio de 2026", 
    author = "Equipe Editorial" 
}: Props) {
  return (
    <div className="mt-12 py-8 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-900/30 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                    MC
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Revisado por <Link href="/sobre/autor" className="text-blue-600 hover:underline">{author}</Link>
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1">
                        <ShieldCheck size={12} className="text-emerald-500" /> Especialista Financeiro
                    </p>
                </div>
            </div>
            
            <div className="flex flex-col md:items-end gap-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Calendar size={14} /> Atualizado em {updatedAt}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800">
                    <CheckCircle2 size={12} /> Precisão Matemática Verificada
                </div>
            </div>
        </div>
        
        <p className="mt-4 text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed text-center px-4">
            Nossa <Link href="/sobre/metodologia" className="underline hover:text-slate-600">Metodologia Editorial</Link> garante que todos os cálculos e informações sejam baseados em fontes oficiais e revisados por especialistas. 
            O Mestre das Contas é uma plataforma independente e gratuita.
        </p>
    </div>
  );
}
