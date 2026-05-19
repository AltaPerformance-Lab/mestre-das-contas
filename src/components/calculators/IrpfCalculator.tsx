"use client";

import React, { useState, useEffect } from "react";
import { 
  Calculator, Info, CheckCircle2, AlertCircle, Share2, Printer, 
  ArrowRight, ShieldAlert, Award, FileText, Sparkles, HelpCircle 
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  calculateIrpfMensal,
  calculateIrpfAnual,
  MENSAL_SIMPLIFIED_DISCOUNT,
  ANUAL_SIMPLIFIED_DISCOUNT_LIMIT,
  ANUAL_EDUCATION_LIMIT_PER_PERSON,
  IRPF_MENSAL_TABLE,
  IRPF_ANUAL_TABLE,
  type IrpfMensalResult,
  type IrpfAnualResult
} from "@/lib/calculators/irpf";

export default function IrpfCalculator() {
  // TABS: "anual" | "mensal"
  const [activeTab, setActiveTab] = useState<"anual" | "mensal">("anual");
  const [copiado, setCopiado] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // --- STATE FOR MENSAL ---
  const [mensalRendimento, setMensalRendimento] = useState("");
  const [mensalInss, setMensalInss] = useState("");
  const [mensalDependentes, setMensalDependentes] = useState("0");
  const [mensalPensao, setMensalPensao] = useState("");
  const [mensalOutras, setMensalOutras] = useState("");
  const [mensalResult, setMensalResult] = useState<IrpfMensalResult | null>(null);

  // --- STATE FOR ANUAL ---
  const [anualRendimento, setAnualRendimento] = useState("");
  const [anualOutros, setAnualOutros] = useState("");
  const [anualInss, setAnualInss] = useState("");
  const [anualDependentes, setAnualDependentes] = useState("0");
  const [anualPensao, setAnualPensao] = useState("");
  const [anualSaude, setAnualSaude] = useState("");
  const [anualEducacao, setAnualEducacao] = useState("");
  const [anualPgbl, setAnualPgbl] = useState("");
  const [anualIrrfPago, setAnualIrrfPago] = useState("");
  const [anualResult, setAnualResult] = useState<IrpfAnualResult | null>(null);

  // --- MONETARY FORMATTING HELPERS ---
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(val);
  };

  const parseNumber = (val: string): number => {
    if (!val) return 0;
    const clean = val.replace(/\./g, "").replace(",", ".");
    return parseFloat(clean) || 0;
  };

  // --- AUTO CALCULATION TRIGGER ---
  useEffect(() => {
    if (activeTab === "mensal") {
      const rend = parseNumber(mensalRendimento);
      if (rend > 0) {
        const res = calculateIrpfMensal({
          rendimentoBruto: rend,
          previdenciaOficial: parseNumber(mensalInss),
          dependentesCount: parseInt(mensalDependentes, 10) || 0,
          pensaoAlimenticia: parseNumber(mensalPensao),
          outrasDeducoes: parseNumber(mensalOutras)
        });
        setMensalResult(res);
      } else {
        setMensalResult(null);
      }
    } else {
      const rend = parseNumber(anualRendimento);
      const outros = parseNumber(anualOutros);
      if (rend > 0 || outros > 0) {
        const res = calculateIrpfAnual({
          rendimentoBruto: rend,
          outrosRendimentos: outros,
          previdenciaOficial: parseNumber(anualInss),
          dependentesCount: parseInt(anualDependentes, 10) || 0,
          pensaoAlimenticia: parseNumber(anualPensao),
          despesasMedicas: parseNumber(anualSaude),
          despesasEducacao: parseNumber(anualEducacao),
          previdenciaPrivadaPgbl: parseNumber(anualPgbl),
          irrfPago: parseNumber(anualIrrfPago)
        });
        setAnualResult(res);
      } else {
        setAnualResult(null);
      }
    }
  }, [
    activeTab,
    mensalRendimento, mensalInss, mensalDependentes, mensalPensao, mensalOutras,
    anualRendimento, anualOutros, anualInss, anualDependentes, anualPensao, anualSaude, anualEducacao, anualPgbl, anualIrrfPago
  ]);

  // --- LOAD PARAMS FROM URL ON MOUNT ---
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get("mode");
      if (mode === "mensal") {
        setActiveTab("mensal");
        if (params.get("rend")) setMensalRendimento(params.get("rend")!);
        if (params.get("inss")) setMensalInss(params.get("inss")!);
        if (params.get("dep")) setMensalDependentes(params.get("dep")!);
        if (params.get("pens")) setMensalPensao(params.get("pens")!);
        if (params.get("out")) setMensalOutras(params.get("out")!);
      } else if (mode === "anual") {
        setActiveTab("anual");
        if (params.get("rend")) setAnualRendimento(params.get("rend")!);
        if (params.get("outros")) setAnualOutros(params.get("outros")!);
        if (params.get("inss")) setAnualInss(params.get("inss")!);
        if (params.get("dep")) setAnualDependentes(params.get("dep")!);
        if (params.get("pens")) setAnualPensao(params.get("pens")!);
        if (params.get("saude")) setAnualSaude(params.get("saude")!);
        if (params.get("educ")) setAnualEducacao(params.get("educ")!);
        if (params.get("pgbl")) setAnualPgbl(params.get("pgbl")!);
        if (params.get("irrf")) setAnualIrrfPago(params.get("irrf")!);
      }
    } catch (e) {
      console.warn("Erro ao ler parâmetros da URL:", e);
    }
  }, []);

  // --- SHARE FUNCTION ---
  const handleShare = () => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const params = new URLSearchParams();
    params.set("mode", activeTab);

    if (activeTab === "mensal") {
      if (mensalRendimento) params.set("rend", mensalRendimento);
      if (mensalInss) params.set("inss", mensalInss);
      if (mensalDependentes) params.set("dep", mensalDependentes);
      if (mensalPensao) params.set("pens", mensalPensao);
      if (mensalOutras) params.set("out", mensalOutras);
    } else {
      if (anualRendimento) params.set("rend", anualRendimento);
      if (anualOutros) params.set("outros", anualOutros);
      if (anualInss) params.set("inss", anualInss);
      if (anualDependentes) params.set("dep", anualDependentes);
      if (anualPensao) params.set("pens", anualPensao);
      if (anualSaude) params.set("saude", anualSaude);
      if (anualEducacao) params.set("educ", anualEducacao);
      if (anualPgbl) params.set("pgbl", anualPgbl);
      if (anualIrrfPago) params.set("irrf", anualIrrfPago);
    }

    const shareUrl = `${baseUrl}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
    trackEvent("share_irpf_calculator", { mode: activeTab });
  };

  // --- FEEDBACK SUBMISSION ---
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    trackEvent("report_calculator_error", { tool: "irpf_calculator", feedback: feedbackText });
    
    // Redirecionamento funcional (mailto) para a equipe de suporte
    const subject = encodeURIComponent("Reporte de Erro / Inconsistência - Simulador de IRPF");
    const body = encodeURIComponent(`Olá Equipe do Mestre das Contas,\n\nEncontrei a seguinte inconsistência no Simulador de IRPF:\n\n${feedbackText}\n\nObrigado!`);
    window.location.href = `mailto:contato@mestredascontas.com.br?subject=${subject}&body=${body}`;

    setFeedbackSuccess(true);
    setTimeout(() => {
      setShowFeedbackModal(false);
      setFeedbackText("");
      setFeedbackSuccess(false);
    }, 2500);
  };

  return (
    <div className="w-full font-sans max-w-6xl mx-auto space-y-6">
      
      {/* TABS DE SELEÇÃO */}
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-full sm:max-w-md mx-auto print:hidden">
        <button
          type="button"
          onClick={() => {
            setActiveTab("anual");
            trackEvent("change_irpf_tab", { tab: "anual" });
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
            activeTab === "anual"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md shadow-slate-200/50 dark:shadow-none"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
          }`}
        >
          Declaração Anual
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("mensal");
            trackEvent("change_irpf_tab", { tab: "mensal" });
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
            activeTab === "mensal"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md shadow-slate-200/50 dark:shadow-none"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
          }`}
        >
          Cálculo Mensal
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUTS CONTAINER */}
        <div className="lg:col-span-6 space-y-6 print:hidden">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-150 dark:border-slate-800/50 shadow-xl shadow-slate-100/50 dark:shadow-none overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <h3 className="text-lg font-extrabold flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Calculator size={20} /></div>
                {activeTab === "anual" ? "Declaração de Ajuste Anual" : "Simulação de IR Retido Mensal"}
              </h3>
              <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                {activeTab === "anual" 
                  ? "Insira seus dados anuais acumulados para calcular a melhor modalidade (Completo ou Simplificado) e saber se terá imposto a restituir ou pagar."
                  : "Calcule a retenção de imposto direto na folha de pagamento com base na tabela mensal."
                }
              </p>
            </div>

            <div className="p-6 space-y-5">
              {activeTab === "anual" ? (
                <>
                  {/* SEÇÃO 1: RENDIMENTOS ANUAIS */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-2">1. Rendimentos Anuais</h4>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-end pb-1">Rendimento Tributável Principal</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 text-xs text-slate-400 dark:text-slate-500 font-bold">R$</span>
                          <input
                            type="text"
                            placeholder="0,00"
                            value={anualRendimento}
                            onChange={e => setAnualRendimento(e.target.value)}
                            className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-white"
                          />
                        </div>
                        <span className="text-[10px] text-slate-400">Salários, pró-labore, aposentadoria, etc.</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-end pb-1">Outros Rendimentos Tributáveis</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 text-xs text-slate-400 dark:text-slate-500 font-bold">R$</span>
                          <input
                            type="text"
                            placeholder="0,00"
                            value={anualOutros}
                            onChange={e => setAnualOutros(e.target.value)}
                            className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-white"
                          />
                        </div>
                        <span className="text-[10px] text-slate-400">Aluguéis, trabalho autônomo, etc.</span>
                      </div>
                    </div>
                  </div>

                  {/* SEÇÃO 2: DEDUÇÕES LEGAIS ANUAIS */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-2">2. Deduções Legais</h4>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-end pb-1">Previdência Oficial (INSS)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 text-xs text-slate-400 dark:text-slate-500 font-bold">R$</span>
                          <input
                            type="text"
                            placeholder="0,00"
                            value={anualInss}
                            onChange={e => setAnualInss(e.target.value)}
                            className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-end pb-1">Nº de Dependentes</label>
                        <select
                          value={anualDependentes}
                          onChange={e => setAnualDependentes(e.target.value)}
                          className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-slate-100"
                        >
                          <option value="0">Nenhum Dependente</option>
                          <option value="1">1 Dependente</option>
                          <option value="2">2 Dependentes</option>
                          <option value="3">3 Dependentes</option>
                          <option value="4">4 Dependentes</option>
                          <option value="5">5 Dependentes</option>
                          <option value="6">6 ou mais Dependentes</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-end pb-1">Pensão Alimentícia Paga</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 text-xs text-slate-400 dark:text-slate-500 font-bold">R$</span>
                          <input
                            type="text"
                            placeholder="0,00"
                            value={anualPensao}
                            onChange={e => setAnualPensao(e.target.value)}
                            className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-end pb-1">Previdência Privada (PGBL)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 text-xs text-slate-400 dark:text-slate-500 font-bold">R$</span>
                          <input
                            type="text"
                            placeholder="0,00"
                            value={anualPgbl}
                            onChange={e => setAnualPgbl(e.target.value)}
                            className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-end pb-1">Despesas com Saúde (Médicas)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 text-xs text-slate-400 dark:text-slate-500 font-bold">R$</span>
                          <input
                            type="text"
                            placeholder="0,00"
                            value={anualSaude}
                            onChange={e => setAnualSaude(e.target.value)}
                            className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-end pb-1">Despesas com Instrução (Educação)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 text-xs text-slate-400 dark:text-slate-500 font-bold">R$</span>
                          <input
                            type="text"
                            placeholder="0,00"
                            value={anualEducacao}
                            onChange={e => setAnualEducacao(e.target.value)}
                            className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEÇÃO 3: IMPOSTO PAGO */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-2">3. Imposto Já Retido (IRRF)</h4>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2rem] flex items-end pb-1">Imposto Retido na Fonte Anual</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3.5 text-xs text-slate-400 dark:text-slate-500 font-bold">R$</span>
                        <input
                          type="text"
                          placeholder="0,00"
                          value={anualIrrfPago}
                          onChange={e => setAnualIrrfPago(e.target.value)}
                          className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-white"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400">Total do IR descontado no contracheque ou pago via carnê-leão ao longo do ano.</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* CÁLCULO MENSAL */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-2">Rendimentos Mensais</h4>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2rem] flex items-end pb-1">Salário / Rendimento Bruto Mensal</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3.5 text-xs text-slate-400 dark:text-slate-500 font-bold">R$</span>
                        <input
                          type="text"
                          placeholder="0,00"
                          value={mensalRendimento}
                          onChange={e => setMensalRendimento(e.target.value)}
                          className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-2">Deduções Mensais</h4>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-end pb-1">Contribuição INSS Mensal</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 text-xs text-slate-400 dark:text-slate-500 font-bold">R$</span>
                          <input
                            type="text"
                            placeholder="0,00"
                            value={mensalInss}
                            onChange={e => setMensalInss(e.target.value)}
                            className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-end pb-1">Nº de Dependentes</label>
                        <select
                          value={mensalDependentes}
                          onChange={e => setMensalDependentes(e.target.value)}
                          className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-slate-100"
                        >
                          <option value="0">Sem Dependentes</option>
                          <option value="1">1 Dependente</option>
                          <option value="2">2 Dependentes</option>
                          <option value="3">3 Dependentes</option>
                          <option value="4">4 Dependentes</option>
                          <option value="5">5 Dependentes</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-end pb-1">Pensão Alimentícia</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 text-xs text-slate-400 dark:text-slate-500 font-bold">R$</span>
                          <input
                            type="text"
                            placeholder="0,00"
                            value={mensalPensao}
                            onChange={e => setMensalPensao(e.target.value)}
                            className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-end pb-1">Outras Deduções</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 text-xs text-slate-400 dark:text-slate-500 font-bold">R$</span>
                          <input
                            type="text"
                            placeholder="0,00"
                            value={mensalOutras}
                            onChange={e => setMensalOutras(e.target.value)}
                            className="w-full h-12 pl-9 pr-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-6 space-y-6 print:col-span-12 print:w-full">
          <div className="bg-slate-100/50 dark:bg-slate-900/30 rounded-3xl border border-slate-150 dark:border-slate-800/50 p-6 min-h-[450px] flex flex-col justify-between print:bg-white print:border-0 print:p-0 print:min-h-0 print:shadow-none">
            
            {activeTab === "anual" ? (
              anualResult ? (
                <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
                  
                  {/* HEADER DO RESULTADO */}
                  <div className={`p-6 rounded-3xl border text-center relative overflow-hidden group print:bg-slate-50 print:border-slate-200`}>
                    <div className="absolute top-0 right-0 p-4 opacity-15"><Sparkles className="text-emerald-500 dark:text-emerald-400" size={72} /></div>
                    
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Resultado Simulado</p>
                    
                    {anualResult.tipoResultado === "restituir" ? (
                      <>
                        <h4 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2">
                          Restituição Estimada
                        </h4>
                        <p className="text-5xl font-black text-emerald-600 dark:text-emerald-400 mt-2 font-mono">
                          {formatCurrency(anualResult.resultadoFinal)}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          Com a opção pelo modelo <strong className="text-slate-800 dark:text-slate-200 uppercase">{anualResult.modeloMaisVantajoso === "completo" ? "Deduções Legais (Completo)" : "Desconto Simplificado"}</strong>, você receberá a maior restituição possível do imposto retido.
                        </p>
                      </>
                    ) : anualResult.tipoResultado === "pagar" ? (
                      <>
                        <h4 className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">
                          Imposto a Pagar
                        </h4>
                        <p className="text-5xl font-black text-orange-600 dark:text-orange-400 mt-2 font-mono">
                          {formatCurrency(Math.abs(anualResult.resultadoFinal))}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          Com o modelo <strong className="text-slate-800 dark:text-slate-200 uppercase">{anualResult.modeloMaisVantajoso === "completo" ? "Deduções Legais (Completo)" : "Desconto Simplificado"}</strong>, você minimiza seu imposto a pagar para o fisco.
                        </p>
                      </>
                    ) : (
                      <>
                        <h4 className="text-3xl font-extrabold text-slate-700 dark:text-slate-300">
                          Isento de Imposto
                        </h4>
                        <p className="text-5xl font-black text-slate-700 dark:text-slate-300 mt-2 font-mono">
                          R$ 0,00
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          Seu rendimento total está dentro da faixa de isenção anual e não há imposto a restituir ou pagar.
                        </p>
                      </>
                    )}

                    <div className="mt-4 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 px-4">
                      <span>Alíquota Efetiva: <strong>{anualResult.aliquotaEfetivaFinal.toFixed(2)}%</strong></span>
                      <span>Receita Bruta: <strong>{formatCurrency(anualResult.receitaBruta)}</strong></span>
                    </div>
                  </div>

                  {/* NOTA DE INTELIGÊNCIA / LIMITES */}
                  {(anualResult.modeloMaisVantajoso === "completo" && (anualResult.completo.deducaoEducacao === ANUAL_EDUCATION_LIMIT_PER_PERSON * (1 + parseInt(anualDependentes, 10)) || anualResult.completo.deducaoPgbl === anualResult.receitaBruta * 0.12)) && (
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-150 dark:border-blue-900/30 p-4 rounded-2xl flex gap-3 text-left">
                      <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
                      <div className="space-y-1 text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                        <p className="font-bold">Aviso de Limites Legais:</p>
                        {anualResult.completo.deducaoEducacao === ANUAL_EDUCATION_LIMIT_PER_PERSON * (1 + parseInt(anualDependentes, 10)) && (
                          <p>• Suas despesas com educação ultrapassaram o teto legal de <strong>{formatCurrency(ANUAL_EDUCATION_LIMIT_PER_PERSON)}</strong> por pessoa e foram limitadas ao máximo de <strong>{formatCurrency(ANUAL_EDUCATION_LIMIT_PER_PERSON * (1 + parseInt(anualDependentes, 10)))}</strong>.</p>
                        )}
                        {anualResult.completo.deducaoPgbl === anualResult.receitaBruta * 0.12 && (
                          <p>• Suas deduções de Previdência Privada PGBL atingiram o limite legal de <strong>12%</strong> dos rendimentos e foram limitadas a <strong>{formatCurrency(anualResult.receitaBruta * 0.12)}</strong>.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TABELA COMPARATIVA LADO A LADO */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-150 dark:border-slate-800/50 shadow-sm text-left">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FileText size={14} /> Comparativo de Opções de Ajuste
                    </h5>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 text-xs font-bold text-slate-400 pb-2 border-b">
                        <span>Detalhamento</span>
                        <span className="text-right">Deduções Reais</span>
                        <span className="text-right">Simplificado</span>
                      </div>
                      
                      <div className="grid grid-cols-3 text-xs py-1 border-b border-slate-50 dark:border-slate-800/40">
                        <span className="font-medium text-slate-600 dark:text-slate-400">Rendimento Tributável</span>
                        <span className="text-right font-mono font-semibold">{formatCurrency(anualResult.receitaBruta)}</span>
                        <span className="text-right font-mono font-semibold">{formatCurrency(anualResult.receitaBruta)}</span>
                      </div>

                      <div className="grid grid-cols-3 text-xs py-1 border-b border-slate-50 dark:border-slate-800/40">
                        <span className="font-medium text-slate-600 dark:text-slate-400">Deduções Permitidas</span>
                        <span className="text-right font-mono text-emerald-600 font-semibold">-{formatCurrency(anualResult.completo.deducoesTotais)}</span>
                        <span className="text-right font-mono text-emerald-600 font-semibold">-{formatCurrency(anualResult.simplificado.deducoesTotais)}</span>
                      </div>

                      <div className="grid grid-cols-3 text-xs py-1 border-b border-slate-50 dark:border-slate-800/40">
                        <span className="font-medium text-slate-600 dark:text-slate-400">Base de Cálculo Líquida</span>
                        <span className="text-right font-mono font-bold text-slate-800 dark:text-slate-200">{formatCurrency(anualResult.completo.baseCalculo)}</span>
                        <span className="text-right font-mono font-bold text-slate-800 dark:text-slate-200">{formatCurrency(anualResult.simplificado.baseCalculo)}</span>
                      </div>

                      <div className="grid grid-cols-3 text-xs py-1 border-b border-slate-50 dark:border-slate-800/40">
                        <span className="font-medium text-slate-600 dark:text-slate-400">Imposto Devido</span>
                        <span className="text-right font-mono font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(anualResult.completo.impostoDevido)}</span>
                        <span className="text-right font-mono font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(anualResult.simplificado.impostoDevido)}</span>
                      </div>

                      <div className="grid grid-cols-3 text-xs py-1 border-b border-slate-50 dark:border-slate-800/40">
                        <span className="font-medium text-slate-600 dark:text-slate-400">Imposto Pago Retido</span>
                        <span className="text-right font-mono text-blue-500 font-semibold">{formatCurrency(anualResult.irrfPago)}</span>
                        <span className="text-right font-mono text-blue-500 font-semibold">{formatCurrency(anualResult.irrfPago)}</span>
                      </div>

                      <div className="grid grid-cols-3 text-xs pt-2 font-black">
                        <span className="text-slate-800 dark:text-slate-100">Resultado da Declaração</span>
                        <span className={`text-right font-mono ${anualResult.completo.resultado >= 0 ? 'text-emerald-500' : 'text-orange-500'}`}>
                          {anualResult.completo.resultado >= 0 ? "+" : ""}{formatCurrency(anualResult.completo.resultado)}
                        </span>
                        <span className={`text-right font-mono ${anualResult.simplificado.resultado >= 0 ? 'text-emerald-500' : 'text-orange-500'}`}>
                          {anualResult.simplificado.resultado >= 0 ? "+" : ""}{formatCurrency(anualResult.simplificado.resultado)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* IMPOSTOS POR FAIXA ANUAL */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-150 dark:border-slate-800/50 shadow-sm text-left">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Award size={14} /> Distribuição por Alíquota Progressiva
                    </h5>
                    <div className="space-y-2 font-mono text-xs">
                      {IRPF_ANUAL_TABLE.map((bracket, idx) => {
                        const baseCalculo = anualResult[anualResult.modeloMaisVantajoso].baseCalculo;
                        let faixaBase = 0;
                        const prevLimit = idx === 0 ? 0 : IRPF_ANUAL_TABLE[idx - 1].limit;
                        if (baseCalculo > prevLimit) {
                          faixaBase = Math.min(baseCalculo - prevLimit, bracket.limit - prevLimit);
                        }
                        const faixaImposto = faixaBase * bracket.rate;
                        return (
                          <div key={idx} className="flex justify-between border-b pb-1 dark:border-slate-800/60 last:border-0">
                            <span className="text-slate-500 dark:text-slate-400">Faixa {idx + 1} ({bracket.rate === 0 ? "Isento" : `${(bracket.rate * 100).toFixed(1)}%`})</span>
                            <span className="text-slate-800 dark:text-slate-200">
                              {faixaBase > 0 ? `${formatCurrency(faixaBase)} taxed ➔ ${formatCurrency(faixaImposto)}` : "R$ 0,00"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-500 my-auto">
                  <Calculator size={48} className="mb-4 opacity-30" />
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Aguardando Parâmetros</h4>
                  <p className="text-xs mt-2 max-w-xs leading-relaxed">
                    Insira o valor do seu rendimento anual tributável à esquerda para simular sua Declaração do Imposto de Renda.
                  </p>
                </div>
              )
            ) : (
              mensalResult ? (
                <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
                  
                  {/* HEADER DO RESULTADO MENSAL */}
                  <div className="p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/40 text-center relative overflow-hidden bg-slate-50 dark:bg-slate-900/40">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Retenção de Imposto Mensal</p>
                    <h4 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">Imposto Retido na Fonte</h4>
                    <p className="text-5xl font-black text-blue-600 dark:text-blue-400 mt-2 font-mono">
                      {formatCurrency(mensalResult.impostoFinal)}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Este é o valor mensal descontado no contracheque usando a melhor modalidade (<strong className="text-slate-800 dark:text-slate-200 uppercase">{mensalResult.modeloMaisVantajoso === "completo" ? "Deduções Legais" : "Desconto Simplificado"}</strong>).
                    </p>

                    <div className="mt-4 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 px-4">
                      <span>Alíquota Efetiva: <strong>{mensalResult.aliquotaEfetivaFinal.toFixed(2)}%</strong></span>
                      <span>Rendimento Bruto: <strong>{formatCurrency(mensalResult.rendimentoBruto)}</strong></span>
                    </div>
                  </div>

                  {/* TABELA COMPARATIVA MENSAL */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-150 dark:border-slate-800/50 shadow-sm text-left">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FileText size={14} /> Comparativo de Dedução Mensal
                    </h5>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 text-xs font-bold text-slate-400 pb-2 border-b">
                        <span>Detalhamento</span>
                        <span className="text-right">Deduções Reais</span>
                        <span className="text-right">Desconto Simplificado</span>
                      </div>
                      
                      <div className="grid grid-cols-3 text-xs py-1 border-b border-slate-50 dark:border-slate-800/40">
                        <span className="font-medium text-slate-600 dark:text-slate-400">Deduções Permitidas</span>
                        <span className="text-right font-mono text-emerald-600 font-semibold">-{formatCurrency(mensalResult.deducoesReais)}</span>
                        <span className="text-right font-mono text-emerald-600 font-semibold">-{formatCurrency(MENSAL_SIMPLIFIED_DISCOUNT)}</span>
                      </div>

                      <div className="grid grid-cols-3 text-xs py-1 border-b border-slate-50 dark:border-slate-800/40">
                        <span className="font-medium text-slate-600 dark:text-slate-400">Base de Cálculo Líquida</span>
                        <span className="text-right font-mono text-slate-800 dark:text-slate-200">{formatCurrency(mensalResult.baseCalculoCompleto)}</span>
                        <span className="text-right font-mono text-slate-800 dark:text-slate-200">{formatCurrency(mensalResult.baseCalculoSimplificado)}</span>
                      </div>

                      <div className="grid grid-cols-3 text-xs pt-2 font-black">
                        <span className="text-slate-800 dark:text-slate-100">Imposto de Renda Retido</span>
                        <span className="text-right font-mono text-blue-500 font-bold">{formatCurrency(mensalResult.impostoCompleto)}</span>
                        <span className="text-right font-mono text-blue-500 font-bold">{formatCurrency(mensalResult.impostoSimplificado)}</span>
                      </div>
                    </div>
                  </div>

                  {/* IMPOSTOS POR FAIXA MENSAL */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-150 dark:border-slate-800/50 shadow-sm text-left">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Award size={14} /> Distribuição por Alíquota Progressiva
                    </h5>
                    <div className="space-y-2 font-mono text-xs">
                      {IRPF_MENSAL_TABLE.map((bracket, idx) => {
                        const baseCalculo = mensalResult[mensalResult.modeloMaisVantajoso === "completo" ? "baseCalculoCompleto" : "baseCalculoSimplificado"];
                        let faixaBase = 0;
                        const prevLimit = idx === 0 ? 0 : IRPF_MENSAL_TABLE[idx - 1].limit;
                        if (baseCalculo > prevLimit) {
                          faixaBase = Math.min(baseCalculo - prevLimit, bracket.limit - prevLimit);
                        }
                        const faixaImposto = faixaBase * bracket.rate;
                        return (
                          <div key={idx} className="flex justify-between border-b pb-1 dark:border-slate-800/60 last:border-0">
                            <span className="text-slate-500 dark:text-slate-400">Faixa {idx + 1} ({bracket.rate === 0 ? "Isento" : `${(bracket.rate * 100).toFixed(1)}%`})</span>
                            <span className="text-slate-800 dark:text-slate-200">
                              {faixaBase > 0 ? `${formatCurrency(faixaBase)} taxed ➔ ${formatCurrency(faixaImposto)}` : "R$ 0,00"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-500 my-auto">
                  <Calculator size={48} className="mb-4 opacity-30" />
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Aguardando Parâmetros</h4>
                  <p className="text-xs mt-2 max-w-xs leading-relaxed">
                    Insira o valor do seu salário bruto mensal à esquerda para simular sua retenção na fonte.
                  </p>
                </div>
              )
            )}

            {/* AÇÕES DE IMPRESSÃO E COMPARTILHAMENTO */}
            {(anualResult || mensalResult) && (
              <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 mt-6 print:hidden">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex-1 h-12 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold gap-2 rounded-xl border border-slate-700 flex items-center justify-center transition-all"
                >
                  {copiado ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Share2 size={18} />}
                  {copiado ? "Link Copiado" : "Compartilhar"}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 h-12 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold gap-2 rounded-xl border border-slate-700 flex items-center justify-center transition-all"
                >
                  <Printer size={18} /> Imprimir / Salvar PDF
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* FEEDBACK BUTTON / CANAL DE FEEDBACK DE ERROS */}
      <div className="pt-6 text-center print:hidden">
        <button
          type="button"
          onClick={() => setShowFeedbackModal(true)}
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1.5 mx-auto font-medium"
        >
          <ShieldAlert size={14} className="text-slate-400" />
          Encontrou alguma inconsistência matemática? Reportar erro neste cálculo
        </button>
      </div>

      {/* MODAL DE FEEDBACK */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowFeedbackModal(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              <ShieldAlert className="text-orange-500" size={18} /> Reportar Erro / Feedback
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Valorizamos a precisão matemática absoluta. Se você encontrou alguma inconsistência de alíquota, dedução ou cálculo, por favor, descreva abaixo:
            </p>
            
            {feedbackSuccess ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-150 text-center space-y-2 py-6">
                <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Feedback Enviado com Sucesso!</h4>
                <p className="text-xs text-emerald-700/80 dark:text-emerald-400">Nossa equipe de auditoria revisará os dados imediatamente. Obrigado!</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <textarea
                  rows={4}
                  required
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  placeholder="Ex: No modelo Completo anual, as despesas médicas não deveriam ser limitadas, mas o sistema limitou em..."
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none dark:text-white"
                />
                <div className="flex gap-2 justify-end text-xs">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                  >
                    Enviar Relatório
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
