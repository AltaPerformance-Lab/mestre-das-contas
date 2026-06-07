import { ShieldCheck, Calendar, CheckCircle2, Heart } from "lucide-react";
import Link from "next/link";

interface Props {
    updatedAt?: string;
    author?: string;
    role?: string;
}

const getInitials = (name: string) => {
  const cleanName = name.replace(/(Equipe|de|o|a|os|as|do|da)\s+/gi, "");
  const parts = cleanName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleanName.slice(0, 2).toUpperCase();
};

const getRole = (authorName: string) => {
  const lower = authorName.toLowerCase();
  if (lower.includes("hugo dias")) {
    return "Desenvolvedor & Criador de Facilidades";
  }
  if (lower.includes("tecnologia") || lower.includes("ti") || lower.includes("segurança")) {
    return "Especialista em Tecnologia";
  }
  if (lower.includes("jurídica") || lower.includes("legal")) {
    return "Revisão Jurídica";
  }
  if (lower.includes("editorial") || lower.includes("redação") || lower.includes("equipe")) {
    return "Conselho Editorial";
  }
  if (lower.includes("rodrigo costa") || lower.includes("sistemas")) {
    return "Analista de Sistemas & Finanças";
  }
  return "Revisão Especializada";
};

export default function ExpertSignature({ 
    updatedAt = "Junho de 2026", 
    author = "Equipe Editorial" 
}: Props) {
  const initials = getInitials(author);
  const roleName = getRole(author);

  return (
    <div className="mt-12 py-8 border-t border-slate-100 dark:border-slate-800 print:hidden">
        <div className="flex flex-col gap-6 bg-slate-50/50 dark:bg-slate-900/30 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 shrink-0">
                        {initials}
                    </div>
                    <div>
                        <p className="text-base font-extrabold text-slate-900 dark:text-white">
                            Revisado por <Link href="/sobre/autor" className="text-blue-600 dark:text-blue-400 hover:underline">{author}</Link>
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest flex items-center gap-1.5 mt-0.5">
                            <ShieldCheck size={14} className="text-emerald-500" /> {roleName}
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-col md:items-end gap-2 shrink-0">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Calendar size={14} /> Atualizado em {updatedAt}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30 w-fit">
                        <CheckCircle2 size={12} /> Precisão Matemática Verificada
                    </div>
                </div>
            </div>

            {/* BIO HUMANIZADA DO AUTOR / CRIADOR */}
            <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <p className="m-0">
                    <strong>Sobre o portal:</strong> O <em>Mestre das Contas</em> é idealizado por <strong>Hugo Dias</strong>, um desenvolvedor itumbiarense apaixonado por tecnologia e por transformar cálculos complexos em facilidades digitais acessíveis. Nosso conteúdo é validado por uma equipe qualificada para garantir que as informações fornecidas sejam sempre precisas, atualizadas e seguras para a sua tomada de decisão.
                </p>
            </div>
        </div>
        
        <p className="mt-4 text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed text-center px-4">
            Nossa <Link href="/sobre/metodologia" className="underline hover:text-slate-600 dark:hover:text-slate-300">Metodologia Editorial</Link> garante que todos os cálculos e informações sejam baseados em fontes oficiais. 
            O Mestre das Contas é uma plataforma independente e gratuita.
        </p>
    </div>
  );
}
