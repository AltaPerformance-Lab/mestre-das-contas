"use client";
import { usePDFStore } from '@/store/pdf-store';
import { Document, Page, pdfjs } from 'react-pdf';
import { useCallback } from 'react';
import EditorCanvas from './EditorCanvas';
// Importa estilos obrigatórios do react-pdf
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// IMPORTANT: Worker Setup for Next.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    viewportWidth: number;
}

export default function PDFViewer({ viewportWidth }: PDFViewerProps) {
    const file = usePDFStore(state => state.file);
    const scale = usePDFStore(state => state.scale);
    const currentPage = usePDFStore(state => state.currentPage);
    const setNumPages = usePDFStore(state => state.setNumPages);
    const setOriginalTexts = usePDFStore(state => state.setOriginalTexts);

    const onDocumentLoadSuccess = useCallback(() => {
        // No-op: NumPages is handled by PDFWorkspace via pdf-lib
    }, []);

    const handleGetTextSuccess = useCallback((textItems: any) => {
         setOriginalTexts(currentPage - 1, textItems.items);
    }, [currentPage, setOriginalTexts]);
    
    if (!file) return null;

    // Final width = available viewport width * zoom scale
    // This allows "Fit Width" at scale 1.0, and "Zoom In" > 1.0
    const finalWidth = viewportWidth * scale;

    return (
        <div className="flex justify-center bg-transparent min-h-[500px]">
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="flex flex-col items-center gap-2 mt-20">
                         <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                         <p className="text-slate-400 font-medium">Carregando documento...</p>
                    </div>
                }
                error={
                    <div className="p-10 text-red-500 font-bold bg-red-50 rounded-xl border border-red-100">
                        Erro ao renderizar PDF. Tente outro arquivo.
                    </div>
                }
            >
                <div className="pdf-page-shadow rounded-sm overflow-hidden border border-slate-200" style={{ transformOrigin: 'top center' }}>
                    <Page 
                        pageNumber={currentPage} 
                        renderTextLayer={true} 
                        renderAnnotationLayer={false} 
                        className="bg-white"
                        width={finalWidth}
                        onGetTextSuccess={handleGetTextSuccess}
                    >
                        <EditorCanvas 
                            width={finalWidth} 
                            height={finalWidth * 1.414} // Aspect ratio fallback
                            pageIndex={currentPage - 1} 
                        />
                    </Page>
                </div>
            </Document>
        </div>
    );
}
