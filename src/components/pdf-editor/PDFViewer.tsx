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
    viewportHeight: number;
}

export default function PDFViewer({ viewportWidth, viewportHeight }: PDFViewerProps) {
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

    // Fallback aspect ratio (A4 is 1.414 height / width)
    const aspect = 1.414;
    
    // Fit completely inside the available workspace space (both height and width)
    const fitWidth = Math.min(viewportWidth, viewportHeight / aspect);
    const finalWidth = fitWidth * scale;

    return (
        <div className="flex justify-center items-center bg-transparent w-full min-h-full">
            <style dangerouslySetInnerHTML={{ __html: `
                .react-pdf__Document {
                    width: 100% !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                }
                .react-pdf__Page {
                    margin: 0 auto !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                }
            `}} />
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                className="w-full flex justify-center items-center"
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
                <div className="flex justify-center items-center w-full h-full min-h-[500px]">
                    <div className="pdf-page-shadow rounded-sm overflow-hidden border border-slate-200 dark:border-slate-800 bg-white relative shadow-2xl" style={{ width: finalWidth, height: finalWidth * aspect }}>
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
                                height={finalWidth * aspect} 
                                pageIndex={currentPage - 1} 
                            />
                        </Page>
                    </div>
                </div>
            </Document>
        </div>
    );
}
