"use client";

import { useState } from "react";
import { 
  Calendar, User, Clock, ShieldCheck, HelpCircle, 
  ArrowRight, Info, Coins, Calculator as CalcIcon, 
  CheckCircle2, AlertCircle, TrendingUp, Landmark, Flame,
  Share2, Printer
} from "lucide-react";

export default function InssRetirementCalculator() {
  // Inputs
  const [gender, setGender] = useState<"masculino" | "feminino">("feminino");
  const [birthDate, setBirthDate] = useState("");
  const [totalYears, setTotalYears] = useState(25);
  const [totalMonths, setTotalMonths] = useState(0);
  const [contribBeforeReformYears, setContribBeforeReformYears] = useState(18);
  const [contribBeforeReformMonths, setContribBeforeReformMonths] = useState(0);
  const [salaryAverage, setSalaryAverage] = useState<number | "">(3500);

  // States for calculated results
  const [isCalculated, setIsCalculated] = useState(false);
  const [calculatedData, setCalculatedData] = useState<any>(null);
  const [copiado, setCopiado] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // Constants for 2026
  const TETO_INSS = 7786.02;
  const SALARIO_MINIMO = 1412.00;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!birthDate) return;

    // Calculate Age dynamically as of today
    const birth = new Date(birthDate);
    const today = new Date();
    let ageYears = today.getFullYear() - birth.getFullYear();
    let ageMonths = today.getMonth() - birth.getMonth();
    if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birth.getDate())) {
      ageYears--;
      ageMonths = 12 + ageMonths;
    }

    const ageDecimal = ageYears + ageMonths / 12;
    const totalContribDecimal = totalYears + totalMonths / 12;
    const points = ageDecimal + totalContribDecimal;

    // Transition Rules Calculations

    // 1. Regra por Pontos
    const pointsTarget = gender === "masculino" ? 103 : 93;
    const pointsMinContrib = gender === "masculino" ? 35 : 30;
    const pointsEligible = totalContribDecimal >= pointsMinContrib && points >= pointsTarget;
    const pointsMissingContrib = Math.max(0, pointsMinContrib - totalContribDecimal);
    const pointsMissingPoints = Math.max(0, pointsTarget - points);

    // 2. Idade Mínima Progressiva
    const ageMinTarget = gender === "masculino" ? 64.5 : 59.5;
    const ageMinContrib = gender === "masculino" ? 35 : 30;
    const ageMinEligible = ageDecimal >= ageMinTarget && totalContribDecimal >= ageMinContrib;
    const ageMinMissingAge = Math.max(0, ageMinTarget - ageDecimal);
    const ageMinMissingContrib = Math.max(0, ageMinContrib - totalContribDecimal);

    // 3. Pedágio de 50%
    // Only eligible if had >= 33 years (men) or >= 28 years (women) as of 13/11/2019
    const reformContribDecimal = contribBeforeReformYears + contribBeforeReformMonths / 12;
    const toll50RequiredPreReform = gender === "masculino" ? 33 : 28;
    const toll50MinContribTarget = gender === "masculino" ? 35 : 30;
    
    let toll50Eligible = false;
    let toll50Applicable = false;
    let toll50Toll = 0;
    let toll50TotalRequired = 0;
    let toll50Missing = 0;

    if (reformContribDecimal >= toll50RequiredPreReform && reformContribDecimal < toll50MinContribTarget) {
      toll50Applicable = true;
      const missingAtReform = toll50MinContribTarget - reformContribDecimal;
      toll50Toll = missingAtReform * 0.5;
      toll50TotalRequired = toll50MinContribTarget + toll50Toll;
      toll50Eligible = totalContribDecimal >= toll50TotalRequired;
      toll50Missing = Math.max(0, toll50TotalRequired - totalContribDecimal);
    }

    // 4. Pedágio de 100%
    const toll100MinAge = gender === "masculino" ? 60 : 57;
    const toll100MinContribTarget = gender === "masculino" ? 35 : 30;
    const missingAtReform100 = Math.max(0, toll100MinContribTarget - reformContribDecimal);
    const toll100TotalRequired = toll100MinContribTarget + missingAtReform100;
    const toll100Eligible = ageDecimal >= toll100MinAge && totalContribDecimal >= toll100TotalRequired;
    const toll100MissingAge = Math.max(0, toll100MinAge - ageDecimal);
    const toll100MissingContrib = Math.max(0, toll100TotalRequired - totalContribDecimal);

    // 5. Aposentadoria por Idade (Regra de Transição)
    const ageTransTarget = gender === "masculino" ? 65 : 62;
    const ageTransMinContrib = 15;
    const ageTransEligible = ageDecimal >= ageTransTarget && totalContribDecimal >= ageTransMinContrib;
    const ageTransMissingAge = Math.max(0, ageTransTarget - ageDecimal);
    const ageTransMissingContrib = Math.max(0, ageTransMinContrib - totalContribDecimal);

    // Estimated Value Calculation
    const average = Number(salaryAverage) || 0;
    const baseExceedYears = gender === "masculino" ? 20 : 15;
    const basePercentage = 60;
    const extraYears = Math.max(0, Math.floor(totalContribDecimal) - baseExceedYears);
    const finalPercentage = Math.min(100, basePercentage + extraYears * 2);
    
    // Apply Fator Previdenciário if applicable (e.g. Pedágio de 50%)
    // Let's keep it simple: standard calculation is percentage of average
    let rawBenefit = (finalPercentage / 100) * average;
    
    // Limits
    const finalBenefit = Math.min(TETO_INSS, Math.max(SALARIO_MINIMO, rawBenefit));

    setCalculatedData({
      ageYears,
      ageMonths,
      totalContribDecimal,
      points,
      pointsTarget,
      pointsMinContrib,
      pointsEligible,
      pointsMissingContrib,
      pointsMissingPoints,
      ageMinTarget,
      ageMinContrib,
      ageMinEligible,
      ageMinMissingAge,
      ageMinMissingContrib,
      toll50Applicable,
      toll50Eligible,
      toll50Toll,
      toll50TotalRequired,
      toll50Missing,
      toll100MinAge,
      toll100Eligible,
      toll100TotalRequired,
      toll100MissingAge,
      toll100MissingContrib,
      ageTransTarget,
      ageTransMinContrib,
      ageTransEligible,
      ageTransMissingAge,
      ageTransMissingContrib,
      finalPercentage,
      finalBenefit
    });
    setIsCalculated(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl print:bg-white print:text-slate-950 print:p-0 print:border-0 print:shadow-none">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/20">
          <Landmark size={28} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Simulador de Aposentadoria INSS 2026</h2>
          <p className="text-xs sm:text-sm text-slate-400">Verifique sua elegibilidade sob as 5 regras de transição vigentes da Reforma.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* INPUTS FORM */}
        <form onSubmit={handleCalculate} className="lg:col-span-5 space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 print:hidden">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Gênero</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender("feminino")}
                className={`py-3 px-4 rounded-xl font-bold text-sm border flex items-center justify-center gap-2 transition-all ${
                  gender === "feminino"
                    ? "bg-pink-600/20 border-pink-500 text-pink-400 shadow-lg shadow-pink-500/10"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <User size={16} /> Mulher
              </button>
              <button
                type="button"
                onClick={() => setGender("masculino")}
                className={`py-3 px-4 rounded-xl font-bold text-sm border flex items-center justify-center gap-2 transition-all ${
                  gender === "masculino"
                    ? "bg-blue-600/20 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/10"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <User size={16} /> Homem
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Data de Nascimento</label>
            <div className="relative">
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Tempo Total de Contribuição</label>
              <span className="text-xs text-blue-400 font-bold">{totalYears} anos e {totalMonths} meses</span>
            </div>
            <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div>
                <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Anos: {totalYears}</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={totalYears}
                  onChange={(e) => setTotalYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Meses: {totalMonths}</label>
                <input
                  type="range"
                  min="0"
                  max="11"
                  value={totalMonths}
                  onChange={(e) => setTotalMonths(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Tempo de Contribuição até a Reforma (13/11/2019)</label>
              <span className="text-xs text-indigo-400 font-bold">{contribBeforeReformYears} anos e {contribBeforeReformMonths} meses</span>
            </div>
            <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div>
                <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Anos: {contribBeforeReformYears}</label>
                <input
                  type="range"
                  min="0"
                  max="45"
                  value={contribBeforeReformYears}
                  onChange={(e) => setContribBeforeReformYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Meses: {contribBeforeReformMonths}</label>
                <input
                  type="range"
                  min="0"
                  max="11"
                  value={contribBeforeReformMonths}
                  onChange={(e) => setContribBeforeReformMonths(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Média dos Salários de Contribuição (R$)</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-500 font-bold text-sm">R$</span>
              <input
                type="number"
                value={salaryAverage}
                onChange={(e) => setSalaryAverage(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="Ex: 3500"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Sua média desde julho de 1994 (usada para calcular o valor do benefício).</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            <CalcIcon size={18} /> Calcular Elegibilidade
          </button>
        </form>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-7 print:col-span-12 flex flex-col justify-between">
          {!isCalculated ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-950 rounded-2xl border border-slate-800 border-dashed">
              <Landmark size={48} className="text-slate-700 mb-4 animate-bounce" />
              <h3 className="text-lg font-bold text-slate-300">Aguardando Dados</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-1">Preencha suas informações ao lado para simular o valor estimado e ver quais regras de transição você atende em 2026.</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* TOP ESTIMATED VALUE BANNER */}
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-800/50 p-6 rounded-2xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:bg-slate-100 print:from-slate-100 print:to-slate-100 print:border-slate-300 print:text-slate-950 print:shadow-none">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none print:hidden">
                  <Coins size={120} />
                </div>
                
                <div className="space-y-1">
                  <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5 print:text-slate-700">
                    <Flame size={12} className="text-orange-500" /> Benefício Estimado em 2026
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white print:text-slate-950">
                    R$ {calculatedData.finalBenefit.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                  <p className="text-xs text-slate-400 print:text-slate-600">
                    Equivalente a <span className="font-bold text-blue-400 print:text-blue-700">{calculatedData.finalPercentage}%</span> da sua média salarial de R$ {Number(salaryAverage || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}.
                  </p>
                </div>
                
                <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-3 text-center sm:self-center print:bg-slate-200 print:border-slate-300">
                  <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest print:text-slate-600">Base de Cálculo</div>
                  <div className="text-xs font-bold text-blue-400 mt-0.5 print:text-slate-800">60% + 2% por ano extra</div>
                </div>
              </div>

              {/* TRANSITION RULES CHECKLIST */}
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Seu Status nas 5 Regras de Transição (2026)</h4>
              
              <div className="space-y-3">
                
                {/* 1. REGRA POR PONTOS */}
                <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  calculatedData.pointsEligible 
                    ? "bg-emerald-950/20 border-emerald-800/50 print:bg-emerald-50 print:border-emerald-300 print:text-emerald-900" 
                    : "bg-slate-950 border-slate-800 print:bg-slate-50 print:border-slate-200 print:text-slate-950"
                }`}>
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold flex items-center gap-2 text-white print:text-slate-950">
                      {calculatedData.pointsEligible ? (
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle size={16} className="text-slate-500 shrink-0" />
                      )}
                      1. Regra de Transição por Pontos
                    </h5>
                    <p className="text-[11px] text-slate-400 print:text-slate-700 leading-relaxed">
                      Sua pontuação atual: <span className="text-white print:text-slate-950 font-bold">{calculatedData.points.toFixed(1)}</span> (Idade + Contribuição). Exigência para {gender === "masculino" ? "Homens" : "Mulheres"} em 2026: <span className="text-white print:text-slate-950 font-bold">{calculatedData.pointsTarget} pontos</span>.
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    {calculatedData.pointsEligible ? (
                      <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 print:bg-emerald-100 print:text-emerald-800 print:border-emerald-200">Elegível</span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 print:text-slate-600">
                        {calculatedData.pointsMissingPoints > 0 
                          ? `Faltam ${calculatedData.pointsMissingPoints.toFixed(1)} pontos` 
                          : `Falta tempo tempo contribuição`}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. IDADE MÍNIMA PROGRESSIVA */}
                <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  calculatedData.ageMinEligible 
                    ? "bg-emerald-950/20 border-emerald-800/50 print:bg-emerald-50 print:border-emerald-300 print:text-emerald-900" 
                    : "bg-slate-950 border-slate-800 print:bg-slate-50 print:border-slate-200 print:text-slate-950"
                }`}>
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold flex items-center gap-2 text-white print:text-slate-950">
                      {calculatedData.ageMinEligible ? (
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle size={16} className="text-slate-500 shrink-0" />
                      )}
                      2. Idade Mínima Progressiva
                    </h5>
                    <p className="text-[11px] text-slate-400 print:text-slate-700 leading-relaxed">
                      Sua idade: <span className="text-white print:text-slate-950 font-bold">{calculatedData.ageYears} anos e {calculatedData.ageMonths} meses</span>. Alvo de idade em 2026: <span className="text-white print:text-slate-950 font-bold">{calculatedData.ageMinTarget} anos</span> + {calculatedData.ageMinContrib} anos de contribuição.
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    {calculatedData.ageMinEligible ? (
                      <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 print:bg-emerald-100 print:text-emerald-800 print:border-emerald-200">Elegível</span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 print:text-slate-600">
                        {calculatedData.ageMinMissingAge > 0 
                          ? `Faltam ${calculatedData.ageMinMissingAge.toFixed(1)} anos` 
                          : `Falta tempo contribuição`}
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. PEDÁGIO DE 50% */}
                <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  !calculatedData.toll50Applicable 
                    ? "bg-slate-900/50 border-slate-900/80 opacity-60 print:hidden" 
                    : calculatedData.toll50Eligible 
                      ? "bg-emerald-950/20 border-emerald-800/50 print:bg-emerald-50 print:border-emerald-300 print:text-emerald-900" 
                      : "bg-slate-950 border-slate-800 print:bg-slate-50 print:border-slate-200 print:text-slate-950"
                }`}>
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold flex items-center gap-2 text-white print:text-slate-950">
                      {calculatedData.toll50Eligible ? (
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle size={16} className="text-slate-500 shrink-0" />
                      )}
                      3. Regra do Pedágio de 50%
                    </h5>
                    <p className="text-[11px] text-slate-400 print:text-slate-700 leading-relaxed">
                      {!calculatedData.toll50Applicable 
                        ? `Não elegível: você tinha menos de ${gender === "masculino" ? "33" : "28"} anos de contribuição em 13/11/2019.`
                        : `Exigência total recalculada com pedágio: ${calculatedData.toll50TotalRequired.toFixed(1)} anos de contribuição. Seu tempo: ${calculatedData.totalContribDecimal.toFixed(1)} anos.`
                      }
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    {!calculatedData.toll50Applicable ? (
                      <span className="text-[9px] font-bold text-slate-600 uppercase print:hidden">Não se aplica</span>
                    ) : calculatedData.toll50Eligible ? (
                      <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 print:bg-emerald-100 print:text-emerald-800 print:border-emerald-200">Elegível</span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 print:text-slate-600">
                        {`Faltam ${calculatedData.toll50Missing.toFixed(1)} anos`}
                      </span>
                    )}
                  </div>
                </div>

                {/* 4. PEDÁGIO DE 100% */}
                <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  calculatedData.toll100Eligible 
                    ? "bg-emerald-950/20 border-emerald-800/50 print:bg-emerald-50 print:border-emerald-300 print:text-emerald-900" 
                    : "bg-slate-950 border-slate-800 print:bg-slate-50 print:border-slate-200 print:text-slate-950"
                }`}>
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold flex items-center gap-2 text-white print:text-slate-950">
                      {calculatedData.toll100Eligible ? (
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle size={16} className="text-slate-500 shrink-0" />
                      )}
                      4. Regra do Pedágio de 100%
                    </h5>
                    <p className="text-[11px] text-slate-400 print:text-slate-700 leading-relaxed">
                      Idade mínima exigida: <span className="text-white print:text-slate-950 font-bold">{calculatedData.toll100MinAge} anos</span>. Contribuição total exigida (incluindo pedágio de 100% do tempo faltante em 2019): <span className="text-white print:text-slate-950 font-bold">{calculatedData.toll100TotalRequired.toFixed(1)} anos</span>.
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    {calculatedData.toll100Eligible ? (
                      <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 print:bg-emerald-100 print:text-emerald-800 print:border-emerald-200">Elegível</span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 print:text-slate-600">
                        {calculatedData.toll100MissingAge > 0 
                          ? `Falta idade` 
                          : `Faltam ${calculatedData.toll100MissingContrib.toFixed(1)} anos`}
                      </span>
                    )}
                  </div>
                </div>

                {/* 5. APOSENTADORIA POR IDADE */}
                <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  calculatedData.ageTransEligible 
                    ? "bg-emerald-950/20 border-emerald-800/50 print:bg-emerald-50 print:border-emerald-300 print:text-emerald-900" 
                    : "bg-slate-950 border-slate-800 print:bg-slate-50 print:border-slate-200 print:text-slate-950"
                }`}>
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold flex items-center gap-2 text-white print:text-slate-950">
                      {calculatedData.ageTransEligible ? (
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle size={16} className="text-slate-500 shrink-0" />
                      )}
                      5. Aposentadoria por Idade (Transição)
                    </h5>
                    <p className="text-[11px] text-slate-400 print:text-slate-700 leading-relaxed">
                      Exigência em 2026: Idade de <span className="text-white print:text-slate-950 font-bold">{calculatedData.ageTransTarget} anos</span> + <span className="text-white print:text-slate-950 font-bold">{calculatedData.ageTransMinContrib} anos</span> de contribuição.
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    {calculatedData.ageTransEligible ? (
                      <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 print:bg-emerald-100 print:text-emerald-800 print:border-emerald-200">Elegível</span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 print:text-slate-600">
                        {calculatedData.ageTransMissingAge > 0 
                          ? `Faltam ${calculatedData.ageTransMissingAge.toFixed(1)} anos de idade` 
                          : `Falta contribuição`}
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* AÇÕES DE IMPRESSÃO E COMPARTILHAMENTO */}
              <div className="flex flex-wrap gap-4 pt-4 print:hidden">
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

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
