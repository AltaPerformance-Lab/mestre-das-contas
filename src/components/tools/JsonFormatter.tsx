"use client";

import React, { useState, useRef } from "react";
import { 
    Braces, Copy, Check, Download, Trash2, 
    Minimize2, Maximize2, AlertTriangle, FileJson, 
    ShieldCheck, Zap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JsonFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [mode, setMode] = useState<"formatted" | "minified" | null>(null);

    // --- ACTIONS ---

    const handleFormat = () => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
            setError(null);
            setMode("formatted");
        } catch (err: any) {
            setError(err.message);
            setOutput("");
            setMode(null);
        }
    };

    const handleMinify = () => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            setError(null);
            setMode("minified");
        } catch (err: any) {
            setError(err.message);
            setOutput("");
            setMode(null);
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setError(null);
        setMode(null);
    };

    const handleDownload = () => {
        if (!output) return;
        const blob = new Blob([output], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `data-${mode || "formatted"}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setInput(content);
            // Auto format on load
            try {
                const parsed = JSON.parse(content);
                setOutput(JSON.stringify(parsed, null, 2));
                setError(null);
                setMode("formatted");
            } catch (err: any) {
                setError("Erro ao ler arquivo: " + err.message);
            }
        };
        reader.readAsText(file);
    };

    // --- METRICS ---
    const getStats = (jsonStr: string) => {
        if (!jsonStr) return null;
        return {
            chars: jsonStr.length,
            lines: jsonStr.split('\n').length,
            sizeKB: (new Blob([jsonStr]).size / 1024).toFixed(2)
        };
    };

    const stats = getStats(output || input);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            
            {/* TOOLBAR */}
            <Card className="border-0 shadow-md ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                <Braces size={20} />
                            </div>
                            Validar e Formatar JSON
                        </CardTitle>
                        <div className="flex items-center gap-2 text-xs font-bold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-900">
                            <ShieldCheck size={14} /> Processamento 100% Client-Side. Seus dados não saem daqui.
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                    <div className="flex flex-wrap gap-3">
                         <div className="relative">
                            <input 
                                type="file" 
                                id="json-upload" 
                                accept=".json,.txt" 
                                onChange={handleFileUpload} 
                                className="hidden" 
                            />
                            <Button variant="outline" asChild className="cursor-pointer border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                                <label htmlFor="json-upload">
                                    <FileJson size={16} className="mr-2"/> Carregar Arquivo
                                </label>
                            </Button>
                        </div>
                        <div className="w-px h-10 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
                        <Button 
                            onClick={handleFormat} 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                        >
                            <Maximize2 size={16} className="mr-2" /> Formatar (Beautify)
                        </Button>
                        <Button 
                            onClick={handleMinify} 
                            variant="secondary"
                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                        >
                            <Minimize2 size={16} className="mr-2" /> Minificar
                        </Button>
                        <Button 
                            onClick={handleClear} 
                            variant="ghost" 
                            className="text-slate-400 dark:text-slate-500 hover:text-red-500 ml-auto"
                        >
                            <Trash2 size={16} className="mr-2"/> Limpar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* EDITORS */}
            <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
                
                {/* INPUT */}
                <div className="flex flex-col h-full gap-2">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">JSON Entrada</span>
                        {error && <span className="text-xs font-bold text-red-500 flex items-center gap-1"><AlertTriangle size={12}/> JSON Inválido</span>}
                    </div>
                    <Textarea 
                        placeholder="Cole seu JSON aqui..." 
                        className={`flex-1 font-mono text-sm resize-none bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-200 dark:text-slate-300 ${error ? "border-red-300 focus:ring-red-200" : ""}`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        spellCheck={false}
                    />
                </div>

                {/* OUTPUT */}
                <div className="flex flex-col h-full gap-2">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Resultado</span>
                        <div className="flex gap-2">
                             {output && (
                                <>
                                    <Button size="sm" variant="outline" onClick={handleDownload} className="h-7 text-xs border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700">
                                        <Download size={12} className="mr-1"/> Salvar
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        onClick={handleCopy} 
                                        className={`h-7 text-xs transition-all ${copied ? "bg-green-500 hover:bg-green-600 border-green-500" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
                                        variant={copied ? "default" : "outline"}
                                    >
                                        {copied ? <Check size={12} className="mr-1 text-white"/> : <Copy size={12} className="mr-1"/>}
                                        {copied ? "Copiado!" : "Copiar"}
                                    </Button>
                                </>
                             )}
                        </div>
                    </div>
                    <div className="relative flex-1">
                         <Textarea 
                            readOnly
                            className="w-full h-full font-mono text-sm resize-none bg-slate-900 text-green-400 border-slate-800 focus:ring-slate-700 shadow-inner"
                            value={output}
                            placeholder="O resultado aparecerá aqui..."
                        />
                         {/* STATS OVERLAY */}
                         {output && (
                            <div className="absolute bottom-4 right-4 bg-slate-800/90 text-slate-400 text-[10px] px-2 py-1 rounded border border-slate-700 backdrop-blur-sm">
                                {stats?.sizeKB} KB • {stats?.lines} linhas
                            </div>
                         )}
                    </div>
                </div>

            </div>

            {/* ERROR ALERT */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
                    <div>
                        <h4 className="font-bold text-sm">Erro de Sintaxe</h4>
                        <div className="font-mono text-xs mt-1">
                            {error}
                        </div>
                    </div>
                </div>
            )}

            {/* INFO BOX */}
            <div className="grid md:grid-cols-3 gap-4 text-center mt-8">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="mx-auto w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center mb-2">
                        <Zap size={20}/>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Ultra Rápido</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Processa arquivos grandes instantaneamente no navegador.</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="mx-auto w-10 h-10 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-2">
                         <ShieldCheck size={20}/>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Privacidade Total</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Processamento 100% Client-Side. Seus dados não saem daqui.</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="mx-auto w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-2">
                         <Download size={20}/>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Ilimitado</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sem limites de uso diário. Totalmente gratuito.</p>
                </div>
            </div>

        </div>
    );
}
