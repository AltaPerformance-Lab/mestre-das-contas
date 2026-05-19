"use client";

import React, { useState } from "react";
import { Printer, Download, Share2, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

interface FipeActionsProps {
  marca: string;
  modelo: string;
  ano: string;
  valor: string;
  codigoFipe: string;
  mesReferencia: string;
}

export default function FipeActions({
  marca,
  modelo,
  ano,
  valor,
  codigoFipe,
  mesReferencia,
}: FipeActionsProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = (type: "print" | "pdf") => {
    trackEvent("fipe_valuation_action", { action: type, marca, modelo, ano, valor });
    window.print();
  };

  const handleShare = async () => {
    trackEvent("fipe_valuation_action", { action: "share", marca, modelo, ano, valor });
    
    const shareData = {
      title: `Tabela FIPE: ${marca} ${modelo} ${ano}`,
      text: `Confira o valor oficial da Tabela FIPE para o ${marca} ${modelo} ano ${ano}: ${valor} (Ref: ${mesReferencia}). Veja a ficha técnica e mais detalhes:`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Erro ao compartilhar:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error("Falha ao copiar link:", err);
      }
    }
  };

  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-center sm:justify-start print:hidden mt-2">
      {/* Imprimir Button */}
      <Button
        variant="outline"
        onClick={() => handlePrint("print")}
        className="flex-1 sm:flex-initial h-11 font-bold gap-2 px-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
      >
        <Printer size={16} className="text-slate-500" />
        Imprimir
      </Button>

      {/* Salvar PDF Button */}
      <Button
        variant="outline"
        onClick={() => handlePrint("pdf")}
        className="flex-1 sm:flex-initial h-11 font-bold gap-2 px-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
      >
        <Download size={16} className="text-emerald-500" />
        Salvar PDF
      </Button>

      {/* Compartilhar Button */}
      <Button
        onClick={handleShare}
        className="w-full sm:w-auto h-11 font-bold gap-2 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
      >
        {copied ? (
          <>
            <Check size={16} className="text-white animate-scale-up" />
            Link Copiado!
          </>
        ) : (
          <>
            <Share2 size={16} className="text-white" />
            Compartilhar
          </>
        )}
      </Button>
    </div>
  );
}
