"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image"; // Importamos o componente Image
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Image as ImageIcon, UploadCloud, Download, 
  Trash2, RefreshCw
} from "lucide-react";

type ConvertedFile = {
  originalName: string;
  originalSize: number;
  previewUrl: string;
  convertedUrl: string | null;
  convertedSize: number | null;
  status: "pending" | "converting" | "done" | "error";
  id: string;
};

// Formatos de Saída Suportados
type TargetFormat = "png" | "jpeg" | "webp" | "avif" | "ico";

// Interface para receber o pSEO
interface ImageConverterProps {
    initialTarget?: string; // Ex: 'png', 'jpg'
}

export default function ImageConverter({ initialTarget }: ImageConverterProps) {
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [targetFormat, setTargetFormat] = useState<TargetFormat>("png");
  const [quality, setQuality] = useState([0.9]); // 0.1 a 1.0
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- EFEITO pSEO: Configura o formato inicial baseado na URL ---
  useEffect(() => {
    if (initialTarget) {
        // Mapa para garantir que 'jpg' vire 'jpeg' (técnico)
        const map: Record<string, TargetFormat> = {
            'jpg': 'jpeg',
            'jpeg': 'jpeg',
            'png': 'png',
            'webp': 'webp',
            'avif': 'avif',
            'ico': 'ico'
        };
        const mappedFormat = map[initialTarget.toLowerCase()];
        if (mappedFormat) {
            setTargetFormat(mappedFormat);
        }
    }
  }, [initialTarget]);

  // --- LÓGICA DE UPLOAD ---
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    
    const newFiles: ConvertedFile[] = Array.from(fileList).map((file) => ({
      originalName: file.name,
      originalSize: file.size,
      previewUrl: URL.createObjectURL(file),
      convertedUrl: null,
      convertedSize: null,
      status: "pending",
      id: Math.random().toString(36).substr(2, 9),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  // --- MOTOR DE CONVERSÃO (CANVAS) ---
  const convertImage = async (fileItem: ConvertedFile) => {
    return new Promise<void>((resolve) => {
      const img = new window.Image(); // Usa window.Image explicitamente para evitar conflito com componente Image
      img.src = fileItem.previewUrl;
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Regra especial para ICO (Favicon): Máximo 256x256
        if (targetFormat === "ico") {
            if (width > 256 || height > 256) {
                const ratio = Math.min(256 / width, 256 / height);
                width = width * ratio;
                height = height * ratio;
            }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          // Fundo branco para JPG (remove transparência preta)
          if (targetFormat === "jpeg") {
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Mapeamento de MIME Types
          let mimeType = `image/${targetFormat}`;
          if (targetFormat === "ico") mimeType = "image/png"; // ICO via Canvas geralmente usa PNG como base
          
          // Qualidade (Apenas para formatos com perda)
          const qualityVal = ["png", "ico"].includes(targetFormat) ? undefined : quality[0];
          
          const dataUrl = canvas.toDataURL(mimeType, qualityVal);
          
          // Calcula tamanho aproximado
          const head = `data:${mimeType};base64,`;
          const size = Math.round((dataUrl.length - head.length) * 3 / 4);

          setFiles((prev) => prev.map(f => {
            if (f.id === fileItem.id) {
              return { 
                ...f, 
                convertedUrl: dataUrl, 
                convertedSize: size, 
                status: "done" 
              };
            }
            return f;
          }));
        }
        resolve();
      };
      
      img.onerror = () => {
         setFiles((prev) => prev.map(f => f.id === fileItem.id ? { ...f, status: "error" } : f));
         resolve();
      }
    });
  };

  const handleConvertAll = async () => {
    setFiles(prev => prev.map(f => f.status === "done" ? f : { ...f, status: "converting" }));
    for (const file of files) {
      if (file.status !== "done") {
        await convertImage(file);
      }
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const downloadFile = (url: string, originalName: string) => {
    const link = document.createElement("a");
    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
    link.href = url;
    link.download = `${nameWithoutExt}.${targetFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-8">
      
      <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-900 text-white p-6">
          <CardTitle className="text-xl flex items-center gap-3">
             <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
               <ImageIcon size={22} strokeWidth={2.5} />
             </div> 
             Conversor de Imagens Universal
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          
          <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                  <Label>Converter para:</Label>
                  <Select value={targetFormat} onValueChange={(v: TargetFormat) => setTargetFormat(v)}>
                      <SelectTrigger className="h-12 text-lg">
                          <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="png">PNG (Transparente)</SelectItem>
                          <SelectItem value="jpeg">JPG (Mais Leve)</SelectItem>
                          <SelectItem value="webp">WebP (Sites/SEO)</SelectItem>
                          <SelectItem value="avif">AVIF (Ultra Compressão)</SelectItem>
                          <SelectItem value="ico">ICO (Favicon 256px)</SelectItem>
                      </SelectContent>
                  </Select>
              </div>

              {!["png", "ico"].includes(targetFormat) && (
                  <div className="space-y-3">
                      <div className="flex justify-between">
                          <Label>Qualidade: {Math.round(quality[0] * 100)}%</Label>
                          <span className="text-xs text-slate-400">Menor = Arquivo menor</span>
                      </div>
                      <Slider 
                          value={quality} 
                          onValueChange={setQuality} 
                          max={1} 
                          min={0.1} 
                          step={0.1} 
                      />
                  </div>
              )}
          </div>

          <div 
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${isDragging ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
          >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                multiple 
                // Aceita quase tudo na entrada
                accept="image/png, image/jpeg, image/webp, image/jpg, image/bmp, image/gif, image/svg+xml, image/avif"
              />
              <div className="flex flex-col items-center gap-4 text-slate-500">
                  <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                      <UploadCloud size={40} />
                  </div>
                  <div>
                      <p className="font-bold text-lg text-slate-700">Clique ou arraste imagens aqui</p>
                      <p className="text-sm">Suporta JPG, PNG, WEBP, AVIF, SVG, BMP</p>
                  </div>
              </div>
          </div>

        </CardContent>
      </Card>

      {files.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-700 text-lg">Fila de Conversão ({files.length})</h3>
                  <Button onClick={handleConvertAll} className="bg-green-600 hover:bg-green-700 text-white font-bold shadow-md">
                      <RefreshCw size={18} className="mr-2"/> Converter Todas
                  </Button>
              </div>

              <div className="grid gap-3">
                  {files.map((file) => (
                      <div key={file.id} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                          {/* CORREÇÃO AQUI: Uso do componente Image para evitar erro do ESLint */}
                          <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                             <Image 
                               src={file.previewUrl} 
                               alt="Preview" 
                               fill
                               className="object-cover"
                               unoptimized // Obrigatório para Blob URLs locais
                             />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                              <p className="font-bold text-slate-800 truncate text-sm">{file.originalName}</p>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <span>{formatBytes(file.originalSize)}</span>
                                  {file.convertedSize && (
                                      <>
                                        <ArrowRightIcon size={12}/>
                                        <span className="text-green-600 font-bold">{formatBytes(file.convertedSize)}</span>
                                      </>
                                  )}
                              </div>
                          </div>

                          <div className="flex items-center gap-2">
                              {file.status === "done" && file.convertedUrl ? (
                                  <Button size="sm" onClick={() => downloadFile(file.convertedUrl!, file.originalName)} className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-3">
                                      <Download size={16} className="md:mr-2"/> <span className="hidden md:inline">Baixar</span>
                                  </Button>
                              ) : file.status === "converting" ? (
                                  <RefreshCw size={20} className="animate-spin text-blue-500"/>
                              ) : (
                                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-medium">Pronto</span>
                              )}

                              <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)} className="text-slate-400 hover:text-red-500 w-9 h-9">
                                  <Trash2 size={16}/>
                              </Button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

    </div>
  );
}

function ArrowRightIcon({ size, className }: { size?: number, className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
}