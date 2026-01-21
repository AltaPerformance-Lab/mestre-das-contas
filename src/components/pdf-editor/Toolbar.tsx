"use client";
import { usePDFStore, ToolType } from '@/store/pdf-store';
import { 
    MousePointer2, Type, Eraser, Image as ImageIcon, 
    PenTool, Download, Plus, Minus, RotateCw, X, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { rgb, StandardFonts } from 'pdf-lib';

export default function PDFToolbar() {
    const { 
        selectedTool, setSelectedTool, 
        scale, setScale,
        pdfDoc,
        setIsProcessing,
        setFile
    } = usePDFStore();

    const tools: { id: ToolType; icon: any; label: string }[] = [
        { id: 'select', icon: MousePointer2, label: 'Selecionar' },
        { id: 'text', icon: Type, label: 'Texto' },
        { id: 'draw', icon: PenTool, label: 'Desenhar' },
        { id: 'image', icon: ImageIcon, label: 'Imagem' },
        { id: 'erase', icon: Eraser, label: 'Apagar' },
    ];



    const handleDownload = async () => {
        if (!pdfDoc) return;
        
        setIsProcessing(true);
        try {
            // 1. Incorporar anotações (Burn-in)
            const pagesState = usePDFStore.getState().pages;
            const pdfPages = pdfDoc.getPages();
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

            pagesState.forEach((p: any) => {
                const page = pdfPages[p.id];
                if (!page) return;
                
                const { height } = page.getSize();

                // Desenhar Textos
                p.texts.forEach((text: any) => {
                    // Ajuste de coordenadas (PDF é bottom-up, Canvas é top-down)
                    // Simplificação: Assumindo escala 1:1 por enquanto ou ajustando proporcionalmente
                    // TODO: Melhorar precisão de coordenadas com base no viewport
                   
                    page.drawText(text.text, {
                        x: text.x,
                        y: height - text.y, // Inverte Y
                        size: text.size,
                        font: helveticaFont,
                        color: rgb(0, 0, 0),
                    });
                });

                // Desenhar Linhas (Path)
                // TODO: Implementar desenho de vetores (mais complexo)
            });

            // 2. Salvar PDF
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'MestreDasContas_Editado.pdf';
            link.click();
        } catch (err) {
            console.error("Erro ao salvar:", err);
            alert("Erro ao gerar arquivo final.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full h-auto min-h-[4rem] flex flex-wrap items-center justify-between px-2 md:px-4 py-2 gap-4 bg-white">
            <div className="flex items-center gap-2 flex-shrink-0">
                <button
                    onClick={() => setFile(null as any)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    title="Fechar e Sair"
                >
                    <X size={20} />
                </button>
                <div className="hidden md:block h-8 w-px bg-slate-200 mx-1 flex-shrink-0" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => setSelectedTool(tool.id)}
                        title={tool.label}
                        className={`
                            p-2 rounded-lg transition-all flex flex-col items-center justify-center gap-1 min-w-[3rem]
                            ${selectedTool === tool.id 
                                ? 'bg-cyan-100 text-cyan-700 shadow-inner' 
                                : 'text-slate-600 hover:bg-slate-100 hover:text-cyan-600'}
                        `}
                    >
                        <tool.icon size={20} />
                        <span className="text-[10px] font-medium hidden md:block">{tool.label}</span>
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4 flex-shrink-0 ml-auto pr-2">
                {/* Page Navigation */}
                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200 shadow-sm">
                    <button
                        onClick={() => usePDFStore.getState().setCurrentPage(Math.max(1, usePDFStore.getState().currentPage - 1))}
                        disabled={usePDFStore.getState().currentPage <= 1}
                        className="p-1.5 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-xs font-mono font-bold text-slate-600 w-12 md:w-16 text-center select-none">
                        {usePDFStore.getState().currentPage} / {usePDFStore.getState().numPages || '-'}
                    </span>
                    <button
                        onClick={() => usePDFStore.getState().setCurrentPage(Math.min(usePDFStore.getState().numPages, usePDFStore.getState().currentPage + 1))}
                        disabled={usePDFStore.getState().currentPage >= usePDFStore.getState().numPages}
                        className="p-1.5 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                <div className="h-8 w-px bg-slate-200 hidden md:block" />

                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200 shadow-sm">
                    <button
                        onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                        className="p-1.5 text-slate-500 hover:bg-slate-200 rounded"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="text-xs font-mono font-bold text-slate-600 w-10 text-center select-none">
                        {Math.round(scale * 100)}%
                    </span>
                    <button 
                        onClick={() => setScale(Math.min(3.0, scale + 0.1))}
                        className="p-1.5 text-slate-500 hover:bg-slate-200 rounded"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                <button 
                    onClick={handleDownload}
                    className="flex-shrink-0 flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 whitespace-nowrap"
                >
                    <Download size={18} />
                    <span className="hidden md:inline">Baixar PDF</span>
                    <span className="md:hidden">Baixar</span>
                </button>
            </div>
        </div>
    );
}
