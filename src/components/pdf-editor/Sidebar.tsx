"use client";
import { usePDFStore } from '@/store/pdf-store';
import OperationsPanel from './OperationsPanel';

export default function PDFSidebar() {
    const { numPages, currentPage, setCurrentPage } = usePDFStore();

    return (
        <div className="flex flex-row w-full h-full overflow-x-auto p-2 gap-4 scrollbar-thin scrollbar-thumb-slate-300 items-center bg-white border-b border-slate-200">
            {/* Page Thumbnails */}
            <div className="flex gap-3">
                {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
                    <button 
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`
                            h-24 w-[calc(24vh*0.7)] aspect-[1/1.4] min-w-[70px] rounded border-2 transition-all flex items-center justify-center relative flex-shrink-0
                            ${currentPage === page ? 'border-cyan-500 ring-2 ring-cyan-100' : 'border-slate-200 hover:border-cyan-300'}
                            bg-white shadow-sm
                        `}
                    >
                        <span className="text-slate-300 font-bold text-xl">{page}</span>
                        <span className="absolute bottom-1 right-2 text-[10px] text-slate-400 font-mono">{page}</span>
                    </button>
                ))}
            </div>

            {/* Separator */}
            <div className="w-px h-16 bg-slate-200 mx-2" />

            {/* Quick Actions Panel (Horizontal Adapter) */}
            <div className="flex items-center">
                 <OperationsPanel />
            </div>
        </div>
    );
}
