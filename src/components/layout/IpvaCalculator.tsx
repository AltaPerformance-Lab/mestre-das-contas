"use client";

import React, { useState, useEffect } from "react";
import { Calculator, MapPin, Percent, HelpCircle, FileText, CheckCircle2, ShieldAlert } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface StateRate {
  uf: string;
  name: string;
  carros: number;
  motos: number;
  caminhoes: number;
  descontoCotaUnica: number; // Porcentagem de desconto (ex: 3 para 3%)
  parcelasMax: number; // Número máximo de parcelas
}

const stateRates: Record<string, StateRate> = {
  AC: { uf: "AC", name: "Acre", carros: 2.0, motos: 1.0, caminhoes: 1.0, descontoCotaUnica: 10, parcelasMax: 3 },
  AL: { uf: "AL", name: "Alagoas", carros: 3.0, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 10, parcelasMax: 6 },
  AP: { uf: "AP", name: "Amapá", carros: 3.0, motos: 1.5, caminhoes: 1.0, descontoCotaUnica: 20, parcelasMax: 6 },
  AM: { uf: "AM", name: "Amazonas", carros: 3.0, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 10, parcelasMax: 3 },
  BA: { uf: "BA", name: "Bahia", carros: 2.5, motos: 1.0, caminhoes: 1.0, descontoCotaUnica: 15, parcelasMax: 5 },
  CE: { uf: "CE", name: "Ceará", carros: 3.0, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 5, parcelasMax: 5 },
  DF: { uf: "DF", name: "Distrito Federal", carros: 3.5, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 10, parcelasMax: 6 },
  ES: { uf: "ES", name: "Espírito Santo", carros: 2.0, motos: 1.0, caminhoes: 1.0, descontoCotaUnica: 5, parcelasMax: 6 },
  GO: { uf: "GO", name: "Goiás", carros: 3.45, motos: 2.0, caminhoes: 1.25, descontoCotaUnica: 5, parcelasMax: 10 },
  MA: { uf: "MA", name: "Maranhão", carros: 2.5, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 15, parcelasMax: 3 },
  MT: { uf: "MT", name: "Mato Grosso", carros: 3.0, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 10, parcelasMax: 8 },
  MS: { uf: "MS", name: "Mato Grosso do Sul", carros: 3.0, motos: 2.0, caminhoes: 1.5, descontoCotaUnica: 15, parcelasMax: 5 },
  MG: { uf: "MG", name: "Minas Gerais", carros: 4.0, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 3, parcelasMax: 3 },
  PA: { uf: "PA", name: "Pará", carros: 2.5, motos: 0.5, caminhoes: 1.0, descontoCotaUnica: 15, parcelasMax: 3 },
  PB: { uf: "PB", name: "Paraíba", carros: 2.5, motos: 1.5, caminhoes: 1.0, descontoCotaUnica: 10, parcelasMax: 3 },
  PR: { uf: "PR", name: "Paraná", carros: 3.5, motos: 3.5, caminhoes: 1.0, descontoCotaUnica: 3, parcelasMax: 5 },
  PE: { uf: "PE", name: "Pernambuco", carros: 3.0, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 7, parcelasMax: 10 },
  PI: { uf: "PI", name: "Piauí", carros: 2.5, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 15, parcelasMax: 3 },
  RJ: { uf: "RJ", name: "Rio de Janeiro", carros: 4.0, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 3, parcelasMax: 10 },
  RN: { uf: "RN", name: "Rio Grande do Norte", carros: 3.0, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 5, parcelasMax: 7 },
  RS: { uf: "RS", name: "Rio Grande do Sul", carros: 3.0, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 6, parcelasMax: 6 },
  RO: { uf: "RO", name: "Rondônia", carros: 2.5, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 10, parcelasMax: 5 },
  RR: { uf: "RR", name: "Roraima", carros: 2.0, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 10, parcelasMax: 5 },
  SC: { uf: "SC", name: "Santa Catarina", carros: 2.0, motos: 1.0, caminhoes: 1.0, descontoCotaUnica: 0, parcelasMax: 3 },
  SP: { uf: "SP", name: "São Paulo", carros: 4.0, motos: 2.0, caminhoes: 1.5, descontoCotaUnica: 3, parcelasMax: 5 },
  SE: { uf: "SE", name: "Sergipe", carros: 2.5, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 10, parcelasMax: 10 },
  TO: { uf: "TO", name: "Tocantins", carros: 2.0, motos: 2.0, caminhoes: 1.0, descontoCotaUnica: 10, parcelasMax: 10 }
};

interface IpvaCalculatorProps {
  valorFipe: string;
  tipo: "carros" | "motos" | "caminhoes";
}

export default function IpvaCalculator({ valorFipe, tipo }: IpvaCalculatorProps) {
  const [selectedUf, setSelectedUf] = useState("SP");
  const [customRate, setCustomRate] = useState<number>(4.0);
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Extrai o valor numérico puro da string monetária FIPE
  const numericFipe = parseFloat(valorFipe.replace(/[^\d]/g, "")) / 100 || 0;

  // Atualiza a alíquota padrão sempre que a UF ou o Tipo mudar
  useEffect(() => {
    if (!isCustomMode) {
      const ufRate = stateRates[selectedUf];
      if (ufRate) {
        setCustomRate(ufRate[tipo]);
      }
    }
  }, [selectedUf, tipo, isCustomMode]);

  const handleUfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const uf = e.target.value;
    setSelectedUf(uf);
    setIsCustomMode(false);
    trackEvent("fipe_ipva_uf_select", { uf, tipo });
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rate = parseFloat(e.target.value);
    setCustomRate(isNaN(rate) ? 0 : rate);
    setIsCustomMode(true);
  };

  const resetToStandard = () => {
    setIsCustomMode(false);
    const ufRate = stateRates[selectedUf];
    if (ufRate) {
      setCustomRate(ufRate[tipo]);
    }
  };

  const currentUfData = stateRates[selectedUf];
  const ipvaTotal = numericFipe * (customRate / 100);
  const descontoCotaUnicaValue = ipvaTotal * ((currentUfData?.descontoCotaUnica || 0) / 100);
  const ipvaCotaUnica = ipvaTotal - descontoCotaUnicaValue;
  const valorParcela = ipvaTotal / (currentUfData?.parcelasMax || 3);

  const getTipoLabel = () => {
    if (tipo === "carros") return "Carros de passeio";
    if (tipo === "motos") return "Motocicletas e Similares";
    return "Caminhões / Veículos Pesados";
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-2xl text-emerald-600 dark:text-emerald-400">
            <Calculator size={22} />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white">
              Tabela FIPE com Simulador de IPVA
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Alíquota baseada em regras estaduais para {getTipoLabel()}
            </p>
          </div>
        </div>

        {/* Dropdown de Seleção de Estado */}
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="uf-select" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <MapPin size={12} /> Estado:
          </label>
          <select
            id="uf-select"
            value={selectedUf}
            onChange={handleUfChange}
            className="h-10 px-3 pr-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-semibold text-sm text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            {Object.values(stateRates).map((state) => (
              <option key={state.uf} value={state.uf}>
                {state.name} ({state.uf})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lado Esquerdo - Controles */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Valor Venal de Referência (FIPE)
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                100%
              </span>
            </div>
            <div className="h-12 flex items-center px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/50 font-bold text-lg text-slate-800 dark:text-slate-200">
              {valorFipe}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Percent size={13} /> Alíquota do IPVA
              </span>
              {isCustomMode && (
                <button
                  onClick={resetToStandard}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
                >
                  Restaurar Padrão ({stateRates[selectedUf][tipo]}%)
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={customRate}
                  onChange={handleRateChange}
                  className="w-full h-12 px-4 pr-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-bold text-slate-800 dark:text-slate-200 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal flex items-start gap-1">
              <HelpCircle size={12} className="shrink-0 mt-0.5 text-slate-500" />
              <span>
                {isCustomMode 
                  ? "Você definiu uma alíquota customizada. Útil para motoristas PCD, frotistas, táxis, ou veículos movidos a gás natural/híbridos que possuem desconto."
                  : `Alíquota oficial de ${customRate}% fixada pela Sefaz-${selectedUf} para ${getTipoLabel().toLowerCase()}.`}
              </span>
            </p>
          </div>
        </div>

        {/* Lado Direito - Resultados */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-850 shadow-inner flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Total do IPVA Estimado
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Ano de Exercício
            </span>
          </div>

          <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {ipvaTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-900 mt-2">
            {/* Cota Única se houver desconto */}
            {currentUfData?.descontoCotaUnica > 0 ? (
              <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30 p-4 rounded-xl flex flex-col gap-1">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 size={12} /> Cota Única (À Vista)
                </span>
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {ipvaCotaUnica.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-semibold">
                  Economia de {currentUfData.descontoCotaUnica}% em {selectedUf}
                </span>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Cota Única (À Vista)
                </span>
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {ipvaTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
                <span className="text-[10px] text-slate-400">Sem desconto à vista em {selectedUf}</span>
              </div>
            )}

            {/* Parcelado */}
            <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100/30 dark:border-blue-900/10 p-4 rounded-xl flex flex-col gap-1">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1">
                <FileText size={12} /> Pagamento Parcelado
              </span>
              <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {currentUfData?.parcelasMax || 3}x de {valorParcela.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
              <span className="text-[10px] text-slate-400">Sem acréscimo / Sem juros</span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Disclaimer Card for Maximum Legal safety */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-start gap-3 bg-slate-100/50 dark:bg-slate-950/20 p-4 rounded-2xl">
        <ShieldAlert size={16} className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          <strong>Aviso de Responsabilidade / Informação de Apoio:</strong> Este simulador é uma ferramenta gratuita de apoio e caráter estritamente informativo. As alíquotas estaduais padrão e os cálculos de cota única/parcelamento apresentados são estimativas e não substituem o valor oficial de lançamento do imposto. O valor venal homologado, calendários reais de vencimento, isenções por deficiência (PCD), descontos por bom motorista e incentivos locais devem ser consultados e confirmados obrigatoriamente junto à <strong>Secretaria de Fazenda (Sefaz)</strong> ou ao <strong>Detran</strong> do seu respectivo estado. Este portal não possui qualquer vínculo oficial com órgãos públicos governamentais.
        </p>
      </div>
    </section>
  );
}
