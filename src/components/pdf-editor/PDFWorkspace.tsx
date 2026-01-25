"use client";

import { useState, useEffect, useRef } from 'react';
import { usePDFStore } from '@/store/pdf-store';
import { PDFDocument } from 'pdf-lib';
import { useDropzone } from 'react-dropzone';
import { FileText, Loader2 } from 'lucide-react';

// Components
import PDFToolbar from './Toolbar';
import PDFViewer from './PDFViewer';
import TextPropertiesBar from './TextPropertiesBar';

export default function PDFWorkspace() {
  const { 
    file, setFile, setPdfDoc, setNumPages, setIsProcessing, isProcessing, selectedTool 
  } = usePDFStore();

  const [error, setError] = useState<string | null>(null);
  
  // Viewport State (Must be top level)
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(800);

  // Initialize PDF
  useEffect(() => {
    if (!file) return;

    const loadPDF = async () => {
      setIsProcessing(true);
      setError(null);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setPdfDoc(pdfDoc);
        setNumPages(pdfDoc.getPageCount());
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("Não foi possível abrir este arquivo PDF. Ele pode estar corrompido ou protegido por senha.");
        setFile(null as any); 
      } finally {
        setIsProcessing(false);
      }
    };

    loadPDF();
  }, [file, setPdfDoc, setNumPages, setIsProcessing, setFile]);

  // ResizeObserver for Viewport
  useEffect(() => {
    if (!viewportRef.current) return;
    const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const width = entry.contentRect.width;
            if (width > 0) {
                 // Debounce slightly to prevent micro-jitters
                 setViewportWidth(prev => {
                     const margin = width < 600 ? 32 : 48;
                     const newWidth = width - margin;
                     if (newWidth > 0 && Math.abs(prev - newWidth) > 5) return newWidth; 
                     return prev;
                 });
            }
        }
    });
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  // Dropzone setup
  const onDrop = (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
    } else {
      setError("Por favor, envie um arquivo PDF válido.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  // --- Render: Upload State ---
  if (!file) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
            <div 
                {...getRootProps()} 
                className={`w-full max-w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-colors cursor-pointer p-4
                    ${isDragActive ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' : 'border-slate-300 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-500 hover:bg-slate-50 dark:hover:bg-slate-800'}
                `}
            >
                <input {...getInputProps()} />
                <div className="w-20 h-20 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
                   <FileText size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Editor de PDF Ultimate</h3>
                <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
                    Arraste seu arquivo aqui ou clique para selecionar. 
                    <br/><span className="text-sm">Edite textos, assine e junte documentos. 100% Grátis.</span>
                </p>
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 active:scale-95">
                    Selecionar Arquivo PDF
                </button>
            </div>
      </div>
    );
  }



  // --- Render: Workspace (Full Width, No Sidebar) ---
  return (
    <div className="w-full h-full flex flex-col bg-slate-100 dark:bg-slate-900 relative">
        {/* Header / Toolbar */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm z-30 flex-none h-auto min-h-[4rem]">
            <div className="w-full">
                 <PDFToolbar />
            </div>
            {/* Secondary Toolbar for Text Properties */}
            {selectedTool === 'text' && (
                <TextPropertiesBar />
            )}
        </header>

        {/* Main Workspace - Full Width & Height */}
        <main className="flex-1 relative overflow-hidden flex flex-col">
             {/* Viewer (Scrollable) */}
             <div 
                ref={viewportRef}
                className="flex-1 overflow-auto bg-slate-100 dark:bg-slate-900 relative custom-scrollbar flex justify-center p-4 md:p-6"
             >
                  <div className="relative shadow-2xl transition-transform duration-75 ease-out origin-top border border-slate-200 dark:border-slate-800">
                      <PDFViewer viewportWidth={viewportWidth} />
                  </div>
             </div>
        </main>

        {isProcessing && (
            <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-violet-600 animate-spin mb-4" />
                <p className="text-slate-600 dark:text-slate-300 font-medium animate-pulse">Processando documento...</p>
            </div>
        )}
    </div>
  );
}
