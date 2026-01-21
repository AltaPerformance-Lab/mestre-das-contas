"use client";
import dynamic from 'next/dynamic';
import { FileText } from 'lucide-react';

const PDFWorkspace = dynamic(() => import('./PDFWorkspace'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-50 min-h-[600px]">
        <div className="flex flex-col items-center gap-3 animate-pulse">
            <FileText size={48} className="text-slate-300"/>
            <span className="text-slate-400 font-medium">Carregando Editor...</span>
        </div>
    </div>
  )
});

export default function PDFEditorWrapper() {
  return <PDFWorkspace />;
}
