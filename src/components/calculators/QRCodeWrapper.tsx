"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Importação Dinâmica com SSR desligado (Isso resolve o erro 500)
const QRCodeGenerator = dynamic(
  () => import("./QRCodeGenerator"), 
  {
    ssr: false, // Só carrega no navegador (evita erro de 'window not defined')
    loading: () => (
      <div className="h-[500px] w-full bg-slate-50 rounded-2xl border border-slate-200 animate-pulse flex flex-col items-center justify-center gap-3">
        <Loader2 size={40} className="text-slate-300 animate-spin" />
        <span className="text-slate-400 font-medium">Carregando Ferramenta...</span>
      </div>
    ),
  }
);

// Repassamos as props para o componente real
export default function QRCodeWrapper(props: any) {
  return <QRCodeGenerator {...props} />;
}