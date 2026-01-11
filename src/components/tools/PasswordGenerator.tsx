"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Lock, Copy, RefreshCw, CheckCircle2, 
  ShieldCheck, ShieldAlert, Shield, KeyRound
} from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [strength, setStrength] = useState(0);
  const [copied, setCopied] = useState(false);
  
  // Configurações
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  // Lógica de Geração Segura
  const generatePassword = useCallback(() => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const number = "0123456789";
    const symbol = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charset = "";
    if (useLowercase) charset += lower;
    if (useUppercase) charset += upper;
    if (useNumbers) charset += number;
    if (useSymbols) charset += symbol;

    if (charset === "") {
        setPassword("");
        return;
    }

    let newPassword = "";
    const array = new Uint32Array(length[0]);
    crypto.getRandomValues(array);

    for (let i = 0; i < length[0]; i++) {
        newPassword += charset[array[i] % charset.length];
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols]);

  // Cálculo de Força (Entropia simplificada)
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score += 1;
    if (pass.length > 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    setStrength(score);
  };

  // Gera ao carregar e ao mudar configs
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthLabel = () => {
    if (strength <= 2) return { text: "Fraca", color: "bg-red-500", textCol: "text-red-600", icon: ShieldAlert };
    if (strength <= 4) return { text: "Média", color: "bg-yellow-500", textCol: "text-yellow-600", icon: Shield };
    return { text: "Forte", color: "bg-green-500", textCol: "text-green-600", icon: ShieldCheck };
  };

  const strInfo = getStrengthLabel();
  const StrengthIcon = strInfo.icon;

  return (
    <div className="grid lg:grid-cols-12 gap-8 w-full items-start">
      
      {/* --- COLUNA 1: DISPLAY E FORÇA --- */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-slate-900 text-white p-6">
            <CardTitle className="text-xl flex items-center gap-3">
               <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                 <Lock size={22} strokeWidth={2.5} />
               </div> 
               Gerador de Senhas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            
            {/* Display da Senha */}
            <div className="relative group">
                <div className="absolute inset-0 bg-slate-100 rounded-xl transform translate-y-1"></div>
                <div className="relative bg-white border-2 border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm transition-all group-hover:border-blue-300">
                    <p className="font-mono text-xl sm:text-2xl text-slate-800 break-all pr-4 tracking-wider">
                        {password}
                    </p>
                    <div className="flex gap-2 shrink-0">
                        <Button variant="ghost" size="icon" onClick={generatePassword} className="text-slate-400 hover:text-blue-600" title="Gerar Nova">
                            <RefreshCw size={20} />
                        </Button>
                        <Button 
                            onClick={copyToClipboard} 
                            className={`w-12 h-12 rounded-lg transition-all ${copied ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
                        >
                            {copied ? <CheckCircle2 size={20} className="text-white"/> : <Copy size={20} className="text-white"/>}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Barra de Força */}
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-500">Nível de Segurança:</span>
                    <span className={`font-bold flex items-center gap-1.5 ${strInfo.textCol}`}>
                        <StrengthIcon size={16}/> {strInfo.text}
                    </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 ease-out ${strInfo.color}`} 
                        style={{ width: `${(strength / 5) * 100}%` }}
                    ></div>
                </div>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* --- COLUNA 2: CONFIGURAÇÕES --- */}
      <div className="lg:col-span-5 w-full min-w-0">
         <Card className="border-0 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200 bg-white h-full">
            <CardHeader className="border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <Settings2 size={18} className="text-slate-400"/> Personalizar
                </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
                
                {/* Slider de Tamanho */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label className="text-base font-medium text-slate-700">Tamanho da Senha</Label>
                        <span className="bg-slate-900 text-white px-3 py-1 rounded-lg font-mono text-sm font-bold">{length[0]}</span>
                    </div>
                    <Slider
                        value={length}
                        onValueChange={setLength}
                        max={64}
                        min={6}
                        step={1}
                        className="cursor-pointer"
                    />
                </div>

                {/* Toggles */}
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <Label htmlFor="upper" className="text-base font-medium text-slate-700 cursor-pointer">Maiúsculas (A-Z)</Label>
                            <span className="text-xs text-slate-400">ABCD...</span>
                        </div>
                        <Switch id="upper" checked={useUppercase} onCheckedChange={setUseUppercase} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <Label htmlFor="lower" className="text-base font-medium text-slate-700 cursor-pointer">Minúsculas (a-z)</Label>
                            <span className="text-xs text-slate-400">abcd...</span>
                        </div>
                        <Switch id="lower" checked={useLowercase} onCheckedChange={setUseLowercase} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <Label htmlFor="number" className="text-base font-medium text-slate-700 cursor-pointer">Números (0-9)</Label>
                            <span className="text-xs text-slate-400">1234...</span>
                        </div>
                        <Switch id="number" checked={useNumbers} onCheckedChange={setUseNumbers} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <Label htmlFor="symbol" className="text-base font-medium text-slate-700 cursor-pointer">Símbolos (!@#)</Label>
                            <span className="text-xs text-slate-400">!@#$%...</span>
                        </div>
                        <Switch id="symbol" checked={useSymbols} onCheckedChange={setUseSymbols} />
                    </div>
                </div>

            </CardContent>
         </Card>
      </div>

    </div>
  );
}

// Icon auxiliar
function Settings2({ className, size }: { className?: string; size?: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
    )
}