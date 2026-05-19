"use client";

import { useState, useEffect, useRef } from 'react';
import { usePDFStore } from '@/store/pdf-store';
import { PDFDocument } from 'pdf-lib';
import { useDropzone } from 'react-dropzone';
import { FileText, Loader2, RotateCw, ArrowUp, ArrowDown, Trash2, FilePlus, Scissors, Layers } from 'lucide-react';

// Components
import PDFToolbar from './Toolbar';
import PDFViewer from './PDFViewer';
import TextPropertiesBar from './TextPropertiesBar';

export default function PDFWorkspace() {
  const { 
    file, setFile, setPdfDoc, setNumPages, setIsProcessing, isProcessing, selectedTool,
    numPages, currentPage, setCurrentPage, rotatePage, deletePage, movePage,
    mergePdfFile, splitPdfPages, compressPdf, isFullscreen, isSidebarOpen
  } = usePDFStore();

  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pages' | 'tools'>('pages');
  const [splitRange, setSplitRange] = useState<string>('');
  
  // Viewport State (Must be top level)
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(800);
  const [viewportHeight, setViewportHeight] = useState<number>(600);
  const mergeInputRef = useRef<HTMLInputElement>(null);

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
            const height = entry.contentRect.height;
            if (width > 0 && height > 0) {
                 // Debounce slightly to prevent micro-jitters
                 setViewportWidth(prev => {
                     const margin = width < 600 ? 32 : 48;
                     const newWidth = width - margin;
                     if (newWidth > 0 && Math.abs(prev - newWidth) > 5) return newWidth; 
                     return prev;
                 });
                 setViewportHeight(prev => {
                     const margin = height < 600 ? 32 : 48;
                     const newHeight = height - margin;
                     if (newHeight > 0 && Math.abs(prev - newHeight) > 5) return newHeight; 
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

  const handleMergeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      await mergePdfFile(files[0]);
    }
  };

  // --- Render: Workspace (Full Width, Split Layout) ---
  return (
    <div className={`flex flex-col bg-slate-100 dark:bg-slate-900 relative transition-all duration-300
        ${isFullscreen 
            ? 'fixed inset-0 z-[9999] w-screen h-screen' 
            : 'w-full h-full'
        }
    `}>
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

        {/* Main Workspace Split Layout */}
        <main className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
             {/* Left Panel Sidebar */}
             <aside className={`bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col flex-shrink-0 z-20 overflow-hidden transition-all duration-300
                 ${isSidebarOpen 
                     ? 'w-full md:w-80 border-b md:border-b-0 md:border-r h-[30vh] md:h-auto' 
                     : 'w-0 h-0 border-0'
                 }
             `}>
                  {/* Tabs Header */}
                  <div className="flex border-b border-slate-200 dark:border-slate-800">
                      <button
                          onClick={() => setActiveTab('pages')}
                          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2
                              ${activeTab === 'pages' 
                                  ? 'border-violet-600 text-violet-600 dark:text-violet-400' 
                                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'}
                          `}
                      >
                          Páginas ({numPages})
                      </button>
                      <button
                          onClick={() => setActiveTab('tools')}
                          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2
                              ${activeTab === 'tools' 
                                  ? 'border-violet-600 text-violet-600 dark:text-violet-400' 
                                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'}
                          `}
                      >
                          Ferramentas
                      </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                      {activeTab === 'pages' && (
                          <div className="space-y-3">
                              {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
                                  <div
                                      key={page}
                                      onClick={() => setCurrentPage(page)}
                                      className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer group
                                          ${currentPage === page 
                                              ? 'border-violet-500 bg-violet-50/50 dark:bg-violet-900/10 shadow-sm' 
                                              : 'border-slate-200 dark:border-slate-800 hover:border-violet-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                                      `}
                                  >
                                      {/* Thumbnail / Page Icon */}
                                      <div className="w-10 h-14 bg-white dark:bg-slate-850 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-400 shrink-0 shadow-sm">
                                          {page}
                                      </div>
                                      
                                      {/* Details */}
                                      <div className="flex-grow min-w-0">
                                          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Página {page}</p>
                                          <p className="text-[10px] text-slate-400">Jornada Standard</p>
                                      </div>

                                      {/* Micro Actions */}
                                      <div className="flex items-center gap-1 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  rotatePage(page - 1);
                                              }}
                                              title="Rotacionar 90°"
                                              className="p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                                          >
                                              <RotateCw size={13} />
                                          </button>
                                          <button
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  movePage(page - 1, page - 2);
                                              }}
                                              disabled={page <= 1}
                                              title="Subir"
                                              className="p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-30 transition-colors"
                                          >
                                              <ArrowUp size={13} />
                                          </button>
                                          <button
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  movePage(page - 1, page);
                                              }}
                                              disabled={page >= numPages}
                                              title="Descer"
                                              className="p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-30 transition-colors"
                                          >
                                              <ArrowDown size={13} />
                                          </button>
                                          <button
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  deletePage(page - 1);
                                              }}
                                              title="Excluir Página"
                                              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                          >
                                              <Trash2 size={13} />
                                          </button>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}

                      {activeTab === 'tools' && (
                          <div className="space-y-6">
                              {/* Merge Tool */}
                              <div className="bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80">
                                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                                      <FilePlus size={15} className="text-violet-600" /> Juntar Outro PDF
                                  </h4>
                                  <p className="text-[10px] text-slate-400 mb-3">Selecione arquivos para anexar ao final do documento.</p>
                                  
                                  <input 
                                      type="file" 
                                      ref={mergeInputRef} 
                                      onChange={handleMergeUpload} 
                                      accept="application/pdf" 
                                      className="hidden" 
                                  />
                                  <button
                                      onClick={() => mergeInputRef.current?.click()}
                                      className="w-full py-2 px-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                                  >
                                      <FilePlus size={14} /> Selecionar e Anexar
                                  </button>
                              </div>

                              {/* Split Tool */}
                              <div className="bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80">
                                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                                      <Scissors size={15} className="text-emerald-600" /> Dividir / Extrair
                                  </h4>
                                  <p className="text-[10px] text-slate-400 mb-3">Digite intervalos para extrair (Ex: 1-3, 5).</p>
                                  
                                  <input
                                      type="text"
                                      value={splitRange}
                                      onChange={(e) => setSplitRange(e.target.value)}
                                      placeholder="Ex: 1-2, 4"
                                      className="w-full px-3 py-1.5 mb-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                                  />
                                  <button
                                      onClick={() => splitPdfPages(splitRange)}
                                      className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                                  >
                                      <Scissors size={14} /> Extrair Páginas
                                  </button>
                              </div>

                              {/* Compress Tool */}
                              <div className="bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80">
                                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                                      <Layers size={15} className="text-amber-600" /> Comprimir Tamanho
                                  </h4>
                                  <p className="text-[10px] text-slate-400 mb-3">Reduz o tamanho do arquivo otimizando o stream de objetos.</p>
                                  
                                  <button
                                      onClick={compressPdf}
                                      className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                                  >
                                      <Layers size={14} /> Comprimir PDF
                                  </button>
                              </div>
                          </div>
                      )}
                  </div>
             </aside>

             {/* Right Content - Viewer (Scrollable) */}
             <div 
                ref={viewportRef}
                className="flex-1 overflow-auto bg-slate-100 dark:bg-slate-900 relative custom-scrollbar flex items-center justify-center p-4 md:p-6"
             >
                  <PDFViewer viewportWidth={viewportWidth} viewportHeight={viewportHeight} />
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
