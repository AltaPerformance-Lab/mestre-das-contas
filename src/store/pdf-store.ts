import { create } from 'zustand';
import { PDFDocument } from 'pdf-lib';

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
  setFile: (file: File) => void;
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
}

export const usePDFStore = create<PDFState>((set) => ({
  file: null,
  pdfDoc: null,
  numPages: 0,
  scale: 1.0,
  currentPage: 1,
  selectedTool: 'select',
  thumbnails: [],
  isProcessing: false,
  textStyle: {
      font: 'Helvetica',
      size: 16,
      color: { r: 0, g: 0, b: 0 }
  },
  pages: [],

  setFile: (file: File) => set({ file }),
  setPdfDoc: (pdfDoc: PDFDocument | null) => set({ pdfDoc }),
  setNumPages: (numPages: number) => set({ numPages }),
  setScale: (scale: number) => set({ scale }),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  setSelectedTool: (selectedTool: ToolType) => set({ selectedTool }),
  setIsProcessing: (isProcessing: boolean) => set({ isProcessing }),
  setThumbnails: (thumbnails: string[]) => set({ thumbnails }),
  setTextStyle: (style) => set((state) => ({ textStyle: { ...state.textStyle, ...style } })),
  
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
}));
