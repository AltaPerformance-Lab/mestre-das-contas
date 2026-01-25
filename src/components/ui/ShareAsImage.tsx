"use client";

import React, { useState } from "react";
import { Download, Share2, Loader2, Check } from "lucide-react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";

interface ShareAsImageProps {
  elementId: string;
  fileName?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  className?: string;
  label?: string;
}

export default function ShareAsImage({ 
  elementId, 
  fileName = "resultado-mestre-das-contas",
  variant = "outline",
  className = "",
  label = "Salvar como Imagem"
}: ShareAsImageProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDownload = async () => {
    const node = document.getElementById(elementId);
    if (!node) {
      console.error(`Element with id '${elementId}' not found`);
      return;
    }

    setLoading(true);

    try {
      node.classList.add("dark");

      // Pequeno delay para garantir renderização de fontes/estilos
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: '#020817', // Força fundo dark (slate-950)
        pixelRatio: 3, // Melhora resolução
        width: node.scrollWidth + 20, // Garante largura total com folga
        height: node.scrollHeight + 20,
        style: {
           transform: 'scale(1)',
           borderRadius: '0px', // Evita cortes em bordas arredondadas ao capturar
        }
      });

      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
      
      setSuccess(true);
      toast({
        title: "Imagem salva com sucesso!",
        description: "O resultado foi baixado para o seu dispositivo.",
        duration: 3000,
      });

      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
      toast({
        title: "Erro ao salvar imagem",
        description: "Não foi possível gerar a imagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      const node = document.getElementById(elementId);
      if (node) node.classList.remove("dark");
      setLoading(false);
    }
  };

  return (
    <Button 
      variant={variant} 
      onClick={handleDownload} 
      className={`gap-2 ${className}`}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : success ? (
        <Check className="text-green-600" size={18} />
      ) : (
        <Download size={18} />
      )}
      {loading ? "Gerando..." : success ? "Salvo!" : label}
    </Button>
  );
}
