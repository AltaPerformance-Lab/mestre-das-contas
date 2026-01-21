"use client";
import React, { useRef } from 'react';
import { usePDFStore } from '@/store/pdf-store';
import { PDFDocument } from 'pdf-lib';
import { Plus, Trash2, ArrowUp, ArrowDown, FilePlus, Scissors } from 'lucide-react';

export default function OperationsPanel() {
    const { pdfDoc, setPdfDoc, setNumPages, setIsProcessing, pages } = usePDFStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- MERGE PDF ---
    const handleMerge = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0 || !pdfDoc) return;

        setIsProcessing(true);
        try {
            const fileToMerge = files[0];
            const mergeBytes = await fileToMerge.arrayBuffer();
            const mergePdf = await PDFDocument.load(mergeBytes);
            
            const copiedPages = await pdfDoc.copyPages(mergePdf, mergePdf.getPageIndices());
            copiedPages.forEach((page: any) => pdfDoc.addPage(page));
            
            setNumPages(pdfDoc.getPageCount());
            // Need to save to regenerate UI or thumbnails if we had them
            // const savedBytes = await pdfDoc.save();
            // setPdfDoc(await PDFDocument.load(savedBytes)); 
            alert("PDF adicionado com sucesso!");
        } catch (err) {
            console.error(err);
            alert("Erro ao juntar PDF.");
        } finally {
            setIsProcessing(false);
            if(fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const triggerMerge = () => fileInputRef.current?.click();

    return (
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
             <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Ações Rápidas</h4>
             
             <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleMerge} 
                accept="application/pdf" 
                className="hidden" 
             />

             <button 
                onClick={triggerMerge}
                className="w-full flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-lg text-sm font-medium transition-all shadow-sm"
             >
                <FilePlus size={16} />
                <span>Juntar PDF</span>
             </button>

             <button 
                className="w-full flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:border-red-400 hover:text-red-600 rounded-lg text-sm font-medium transition-all shadow-sm opacity-50 cursor-not-allowed"
                title="Em breve"
             >
                <Scissors size={16} />
                <span>Cortar Páginas</span>
             </button>
        </div>
    );
}
