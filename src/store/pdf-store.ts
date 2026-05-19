import { create } from 'zustand';
import { PDFDocument, degrees } from 'pdf-lib';

export type ToolType = 'select' | 'text' | 'draw' | 'erase' | 'image' | 'signature';

interface PDFState {
  file: File | null;
  pdfDoc: PDFDocument | null;
  numPages: number;
  scale: number;
  currentPage: number;
  selectedTool: ToolType;
  thumbnails: string[]; // Base64 images of pages
  isProcessing: boolean;
  
  // Style State
  textStyle: {
      font: string; // 'Helvetica', 'Times-Roman', 'Courier', 'Symbol'
      size: number;
      color: { r: number, g: number, b: number };
  };

  // State for Annotations
  pages: { 
      id: number; 
      lines: any[]; 
      texts: { id?: number; x: number; y: number; text: string; size: number }[];
      images: { id: number; x: number; y: number; width: number; height: number; data: string | ArrayBuffer }[];
      originalTexts: { str: string; transform: number[]; width: number; height: number }[]; 
  }[];

  // Actions
  setFile: (file: File | null) => void;
  setPdfDoc: (doc: PDFDocument | null) => void;
  setNumPages: (num: number) => void;
  setScale: (scale: number) => void;
  setCurrentPage: (page: number) => void;
  setSelectedTool: (tool: ToolType) => void;
  setIsProcessing: (loading: boolean) => void;
  setThumbnails: (thumbnails: string[]) => void;
  setTextStyle: (style: Partial<PDFState['textStyle']>) => void;
  
  // Annotation Actions
  addTextToPage: (pageIndex: number, text: string, x: number, y: number) => void;
  updateText: (pageIndex: number, id: number, newText: string) => void;
  deleteText: (pageIndex: number, id: number) => void;
  addImageToPage: (pageIndex: number, data: string | ArrayBuffer, x: number, y: number, width: number, height: number) => void;
  updateImage: (pageIndex: number, id: number, updates: Partial<{x:number, y:number, width:number, height:number}>) => void;
  deleteImage: (pageIndex: number, id: number) => void;
  addPathToPage: (pageIndex: number, path: any, options: { color: string, width: number, type?: 'draw' | 'erase' }) => void;
  setOriginalTexts: (pageIndex: number, textItems: any[]) => void;

  // PDF Suite Operations
  updateFileFromDoc: () => Promise<void>;
  rotatePage: (pageIndex: number) => Promise<void>;
  deletePage: (pageIndex: number) => Promise<void>;
  movePage: (fromIndex: number, toIndex: number) => Promise<void>;
  mergePdfFile: (mergeFile: File) => Promise<void>;
  splitPdfPages: (rangesStr: string) => Promise<void>;
  compressPdf: () => Promise<void>;
  isFullscreen: boolean;
  setIsFullscreen: (isFullscreen: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

export const usePDFStore = create<PDFState>((set, get) => ({
  file: null,
  pdfDoc: null,
  numPages: 0,
  scale: 1.0,
  currentPage: 1,
  selectedTool: 'select',
  thumbnails: [],
  isProcessing: false,
  isFullscreen: false,
  isSidebarOpen: true,
  textStyle: {
      font: 'Helvetica',
      size: 16,
      color: { r: 0, g: 0, b: 0 }
  },
  pages: [],

  setFile: (file: File | null) => set({ file }),
  setPdfDoc: (pdfDoc: PDFDocument | null) => set({ pdfDoc }),
  setNumPages: (numPages: number) => set({ numPages }),
  setScale: (scale: number) => set({ scale }),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  setSelectedTool: (selectedTool: ToolType) => set({ selectedTool }),
  setIsProcessing: (isProcessing: boolean) => set({ isProcessing }),
  setThumbnails: (thumbnails: string[]) => set({ thumbnails }),
  setTextStyle: (style) => set((state) => ({ textStyle: { ...state.textStyle, ...style } })),
  setIsFullscreen: (isFullscreen: boolean) => set({ isFullscreen }),
  setIsSidebarOpen: (isSidebarOpen: boolean) => set({ isSidebarOpen }),
  
  addTextToPage: (pageIndex: number, text: string, x: number, y: number) => set((state: PDFState) => {
      const newPages = [...state.pages];
      if (!newPages[pageIndex]) newPages[pageIndex] = { id: pageIndex, lines: [], texts: [], images: [], originalTexts: [] };
      newPages[pageIndex].texts.push({ x, y, text, size: state.textStyle.size, id: Date.now() });
      return { pages: newPages };
  }),

  updateText: (pageIndex: number, id: number, newText: string) => set((state: PDFState) => {
      const newPages = [...state.pages];
      const page = newPages[pageIndex];
      if (!page) return {};
      
      const textIndex = page.texts.findIndex(t => (t as any).id === id);
      if (textIndex !== -1) {
          if (newText.trim() === "") {
              page.texts.splice(textIndex, 1); // Delete if empty
          } else {
              page.texts[textIndex].text = newText;
          }
      }
      return { pages: newPages };
  }),

  deleteText: (pageIndex: number, id: number) => set((state: PDFState) => {
      const newPages = [...state.pages];
      const page = newPages[pageIndex];
      if (!page) return {};
      page.texts = page.texts.filter(t => (t as any).id !== id);
      return { pages: newPages };
  }),

  addImageToPage: (pageIndex, data, x, y, width, height) => set((state) => {
      const newPages = [...state.pages];
      if (!newPages[pageIndex]) newPages[pageIndex] = { id: pageIndex, lines: [], texts: [], images: [], originalTexts: [] };
      if (!newPages[pageIndex].images) newPages[pageIndex].images = [];
      newPages[pageIndex].images.push({ id: Date.now(), x, y, width, height, data });
      return { pages: newPages };
  }),

  updateImage: (pageIndex, id, updates) => set((state) => {
      const newPages = [...state.pages];
      const page = newPages[pageIndex];
      if (!page) return {};
      const imgIndex = page.images?.findIndex(i => i.id === id);
      if (imgIndex !== undefined && imgIndex !== -1 && page.images) {
          page.images[imgIndex] = { ...page.images[imgIndex], ...updates };
      }
      return { pages: newPages };
  }),

  deleteImage: (pageIndex, id) => set((state) => {
      const newPages = [...state.pages];
      const page = newPages[pageIndex];
      if (!page || !page.images) return {};
      page.images = page.images.filter(i => i.id !== id);
      return { pages: newPages };
  }),
  
  addPathToPage: (pageIndex: number, path: any, options: { color: string, width: number, type?: 'draw' | 'erase' }) => set((state: PDFState) => {
      const newPages = [...state.pages];
      if (!newPages[pageIndex]) newPages[pageIndex] = { id: pageIndex, lines: [], texts: [], images: [], originalTexts: [] };
      newPages[pageIndex].lines.push({ ...path, ...options });
      return { pages: newPages };
  }),

  setOriginalTexts: (pageIndex: number, textItems: any[]) => set((state: PDFState) => {
      const newPages = [...state.pages];
      if (!newPages[pageIndex]) newPages[pageIndex] = { id: pageIndex, lines: [], texts: [], images: [], originalTexts: [] };
      newPages[pageIndex].originalTexts = textItems;
      return { pages: newPages };
  }),

  // PDF Suite Operations Implementation
  updateFileFromDoc: async () => {
    const { pdfDoc, file } = get();
    if (!pdfDoc || !file) return;
    set({ isProcessing: true });
    try {
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const newFile = new File([blob], file.name, { type: 'application/pdf' });
      const freshDoc = await PDFDocument.load(pdfBytes);
      
      set({ 
        file: newFile, 
        pdfDoc: freshDoc, 
        numPages: freshDoc.getPageCount() 
      });
    } catch (err) {
      console.error("Error updating PDF stream:", err);
    } finally {
      set({ isProcessing: false });
    }
  },

  rotatePage: async (pageIndex: number) => {
    const { pdfDoc, updateFileFromDoc } = get();
    if (!pdfDoc) return;
    const pages = pdfDoc.getPages();
    const page = pages[pageIndex];
    if (page) {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees((currentRotation + 90) % 360));
      await updateFileFromDoc();
    }
  },

  deletePage: async (pageIndex: number) => {
    const { pdfDoc, currentPage, setCurrentPage, updateFileFromDoc } = get();
    if (!pdfDoc) return;
    if (pdfDoc.getPageCount() <= 1) {
      alert("O documento precisa ter pelo menos 1 página!");
      return;
    }
    pdfDoc.removePage(pageIndex);
    const newTotal = pdfDoc.getPageCount();
    if (currentPage > newTotal) {
      setCurrentPage(newTotal);
    }
    await updateFileFromDoc();
  },

  movePage: async (fromIndex: number, toIndex: number) => {
    const { pdfDoc, updateFileFromDoc } = get();
    if (!pdfDoc) return;
    const total = pdfDoc.getPageCount();
    if (toIndex < 0 || toIndex >= total) return;
    
    set({ isProcessing: true });
    try {
      const newDoc = await PDFDocument.create();
      const indices = Array.from({ length: total }, (_, i) => i);
      const temp = indices[fromIndex];
      indices.splice(fromIndex, 1);
      indices.splice(toIndex, 0, temp);
      
      const copiedPages = await newDoc.copyPages(pdfDoc, indices);
      copiedPages.forEach((page) => newDoc.addPage(page));
      
      set({ pdfDoc: newDoc });
      await updateFileFromDoc();
    } catch (err) {
      console.error(err);
    } finally {
      set({ isProcessing: false });
    }
  },

  mergePdfFile: async (mergeFile: File) => {
    const { pdfDoc, updateFileFromDoc } = get();
    if (!pdfDoc) return;
    set({ isProcessing: true });
    try {
      const mergeBytes = await mergeFile.arrayBuffer();
      const otherDoc = await PDFDocument.load(mergeBytes);
      const copiedPages = await pdfDoc.copyPages(otherDoc, otherDoc.getPageIndices());
      copiedPages.forEach((page) => pdfDoc.addPage(page));
      await updateFileFromDoc();
    } catch (err) {
      console.error("Error merging file:", err);
      alert("Não foi possível anexar este PDF. Ele pode estar corrompido ou protegido.");
    } finally {
      set({ isProcessing: false });
    }
  },

  splitPdfPages: async (rangesStr: string) => {
    const { pdfDoc, file } = get();
    if (!pdfDoc || !file) return;
    set({ isProcessing: true });
    try {
      const pagesToKeep: number[] = [];
      const parts = rangesStr.split(",");
      const totalPages = pdfDoc.getPageCount();

      for (const part of parts) {
        const cleanPart = part.trim();
        if (cleanPart.includes("-")) {
          const [start, end] = cleanPart.split("-").map(Number);
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= totalPages) pagesToKeep.push(i - 1);
          }
        } else {
          const val = Number(cleanPart);
          if (val >= 1 && val <= totalPages) pagesToKeep.push(val - 1);
        }
      }

      if (pagesToKeep.length === 0) {
        alert("Digite um intervalo de páginas válido (Ex: 1-3, 5)!");
        return;
      }

      const newDoc = await PDFDocument.create();
      const copiedPages = await newDoc.copyPages(pdfDoc, pagesToKeep);
      copiedPages.forEach((page) => newDoc.addPage(page));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${file.name.replace(".pdf", "")}_extraido.pdf`;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Erro ao extrair páginas.");
    } finally {
      set({ isProcessing: false });
    }
  },

  compressPdf: async () => {
    const { pdfDoc, file } = get();
    if (!pdfDoc || !file) return;
    set({ isProcessing: true });
    try {
      // Stripping metadata, compressing streams
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: true
      });
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${file.name.replace(".pdf", "")}_comprimido.pdf`;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Erro ao comprimir PDF.");
    } finally {
      set({ isProcessing: false });
    }
  }
}));
