"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, Clock, TrendingUp, Percent, 
  HelpCircle, Sparkles, HelpCircle as InfoIcon,
  PieChart, ShieldAlert, Award, Calculator, ArrowRight
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Presets {
  name: string;
  salario: string;
  custos: string;
  dias: number;
  horas: number;
  produtividade: number;
  margem: number;
  impostos: number;
}

const PRESETS: Record<string, Presets> = {
  freelancer: {
    name: "Freelancer Iniciante",
    salario: "3500",
    custos: "450",
    dias: 20,
    horas: 8,
    produtividade: 70,
    margem: 15,
    impostos: 6, // Simples Nacional / MEI
  },
  pleno: {
    name: "Profissional Autônomo Pleno",
    salario: "7000",
    custos: "1200",
    dias: 20,
    horas: 8,
    produtividade: 75,
    margem: 25,
    impostos: 10,
  },
  senior: {
    name: "Consultor / Especialista",
    salario: "15000",
    custos: "2800",
    dias: 18,
    horas: 6,
    produtividade: 60,
    margem: 35,
    impostos: 15,
  }
};

export default function PricingCalculator() {
  // --- INPUT STATES ---
  const [salario, setSalario] = useState("6000");
  const [custosFixos, setCustosFixos] = useState("1000");
  const [diasTrabalhados, setDiasTrabalhados] = useState(20);
  const [horasDiarias, setHorasDiarias] = useState(8);
  const [produtividade, setProdutividade] = useState(70); // % de horas cobráveis

  // Projeto Específico
  const [calcularProjeto, setCalcularProjeto] = useState(true);
  const [horasProjeto, setHorasProjeto] = useState("40");
  const [custosProjeto, setCustosProjeto] = useState("200");
  const [impostos, setImpostos] = useState(6); // % imposto
  const [margemLucro, setMargemLucro] = useState(20); // % lucro

  // --- OUTPUT STATES ---
  const [horasUteisMes, setHorasUteisMes] = useState(0);
  const [horasFaturaveisMes, setHorasFaturaveisMes] = useState(0);
  const [custoHoraBasico, setCustoHoraBasico] = useState(0);
  const [valorHoraSugerido, setValorHoraSugerido] = useState(0);
  
  // Resultados do Projeto
  const [precoProjetoSugerido, setPrecoProjetoSugerido] = useState(0);
  const [lucroLiquidoProjeto, setLucroLiquidoProjeto] = useState(0);
  const [valorImpostosProjeto, setValorImpostosProjeto] = useState(0);
  const [pontoEquilibrioHoras, setPontoEquilibrioHoras] = useState(0);

  // --- CALCULATION LOGIC ---
  useEffect(() => {
    const s = parseFloat(salario.replace(/\D/g, "")) || 0;
    const c = parseFloat(custosFixos.replace(/\D/g, "")) || 0;
    
    // Total de horas brutas no mês
    const totalHorasUteis = diasTrabalhados * horasDiarias;
    
    // Total de horas que geram receita (faturáveis)
    const totalHorasFaturaveis = Math.max(1, Math.round(totalHorasUteis * (produtividade / 100)));
    
    // Quanto custa cada hora apenas para empatar (Despesa Fixa Total / Horas Faturáveis)
    const despesaTotal = s + c;
    const custoHora = totalHorasFaturaveis > 0 ? despesaTotal / totalHorasFaturaveis : 0;
    
    // Valor sugerido da hora com a margem de lucro embutida
    // CustoHora / (1 - (margemLucro / 100))
    const margemDivisor = 1 - (margemLucro / 100);
    const horaSugerido = margemDivisor > 0 ? custoHora / margemDivisor : custoHora;

    setHorasUteisMes(totalHorasUteis);
    setHorasFaturaveisMes(totalHorasFaturaveis);
    setCustoHoraBasico(custoHora);
    setValorHoraSugerido(horaSugerido);

    // Break-even: Quantas horas faturáveis precisa vender no mês para cobrir o custo básico (sem lucro)
    setPontoEquilibrioHoras(custoHora > 0 ? despesaTotal / custoHora : 0);

    // Projeto Específico
    const hProj = parseFloat(horasProjeto) || 0;
    const cProj = parseFloat(custosProjeto) || 0;
    
    // Preço Base = (Horas do Projeto * Valor da Hora Sugerido) + Custos Diretos do Projeto
    const custoBaseProjeto = (hProj * horaSugerido) + cProj;
    
    // Preço Final com Impostos embutidos
    // Preço Final = CustoBase / (1 - (Imposto / 100))
    const impostoDivisor = 1 - (impostos / 100);
    const precoFinal = impostoDivisor > 0 ? custoBaseProjeto / impostoDivisor : custoBaseProjeto;
    
    // Lucro Líquido Real do Projeto = Preço Final - Impostos - Custos Diretos - Custo do Trabalho (Salário + Custo Fixo daquelas horas)
    const impostosPagos = precoFinal * (impostos / 100);
    const custoTrabalhoEfetivo = hProj * custoHora;
    const lucroLiquido = Math.max(0, precoFinal - impostosPagos - cProj - custoTrabalhoEfetivo);

    setPrecoProjetoSugerido(precoFinal);
    setValorImpostosProjeto(impostosPagos);
    setLucroLiquidoProjeto(lucroLiquido);
  }, [
    salario, custosFixos, diasTrabalhados, horasDiarias, produtividade,
    horasProjeto, custosProjeto, impostos, margemLucro
  ]);

  const applyPreset = (key: keyof typeof PRESETS) => {
    const preset = PRESETS[key];
    if (preset) {
      setSalario(preset.salario);
      setCustosFixos(preset.custos);
      setDiasTrabalhados(preset.dias);
      setHorasDiarias(preset.horas);
      setProdutividade(preset.produtividade);
      setMargemLucro(preset.margem);
      setImpostos(preset.impostos);
      
      trackEvent("use_preset_pricing", { preset: preset.name });
    }
  };

  const formatBRL = (val: number) => {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handleInputChange = (val: string, setter: (v: string) => void) => {
    const clean = val.replace(/\D/g, "");
    setter(clean);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      
      {/* SELETOR DE PRESETS RÁPIDOS */}
      <div className="bg-gradient-to-r from-violet-900 to-indigo-900 p-6 rounded-3xl border border-violet-800 text-white shadow-xl shadow-violet-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6 not-prose">
        <div className="space-y-1">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Sparkles className="text-yellow-400 shrink-0" size={20}/> Presets de Precificação Rápida
          </h3>
          <p className="text-xs text-violet-200">Escolha um perfil para preencher os dados instantaneamente e ver como a matemática funciona:</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.entries(PRESETS).map(([key, p]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-xs md:text-sm font-bold py-2.5 px-4 rounded-xl border border-white/10 transition-all"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* ENTRADAS (LARGURA: 7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-0 shadow-xl shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 rounded-3xl overflow-hidden ring-1 ring-slate-100 dark:ring-slate-800">
            <CardHeader className="bg-slate-900 dark:bg-slate-950 text-white p-6">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  <Calculator size={22} strokeWidth={2.5} />
                </div> 
                1. Seus Custos e Capacidade de Trabalho
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              {/* DESPESAS FIXAS */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm border-l-4 border-violet-500 pl-2">Passo 1: Despesas Fixas Mensais</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salario" className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                      Pró-labore Desejado (Salário)
                      <span title="O salário líquido mensal que você deseja retirar do negócio.">
                        <HelpCircle size={14} className="text-slate-400 cursor-help" />
                      </span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">R$</span>
                      <Input
                        id="salario"
                        value={salario ? parseInt(salario).toLocaleString("pt-BR") : ""}
                        onChange={e => handleInputChange(e.target.value, setSalario)}
                        className="pl-10 h-11 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 dark:border-slate-700"
                        placeholder="Ex: 5.000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custosFixos" className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                      Custos do Negócio
                      <span title="Internet, telefone, contabilidade, licenças de software, aluguel da sala, MEI, etc.">
                        <HelpCircle size={14} className="text-slate-400 cursor-help" />
                      </span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">R$</span>
                      <Input
                        id="custosFixos"
                        value={custosFixos ? parseInt(custosFixos).toLocaleString("pt-BR") : ""}
                        onChange={e => handleInputChange(e.target.value, setCustosFixos)}
                        className="pl-10 h-11 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 dark:border-slate-700"
                        placeholder="Ex: 800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* JORNADA DE TRABALHO */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm border-l-4 border-violet-500 pl-2">Passo 2: Tempo de Trabalho Ativo</h3>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Dias trabalhados */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <Label className="text-slate-600 dark:text-slate-300">Dias Trabalhados / Mês</Label>
                      <span className="font-bold text-violet-600 dark:text-violet-400">{diasTrabalhados} dias</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={30}
                      value={diasTrabalhados}
                      onChange={e => setDiasTrabalhados(parseInt(e.target.value))}
                      className="w-full accent-violet-600 cursor-pointer h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>10 dias</span>
                      <span>20 dias (Seg-Sex)</span>
                      <span>30 dias</span>
                    </div>
                  </div>

                  {/* Horas diárias */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <Label className="text-slate-600 dark:text-slate-300">Horas Úteis / Dia</Label>
                      <span className="font-bold text-violet-600 dark:text-violet-400">{horasDiarias} horas</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={16}
                      value={horasDiarias}
                      onChange={e => setHorasDiarias(parseInt(e.target.value))}
                      className="w-full accent-violet-600 cursor-pointer h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>4 horas</span>
                      <span>8 horas (Padrão)</span>
                      <span>16 horas</span>
                    </div>
                  </div>
                </div>

                {/* Produtividade */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-sm">
                    <Label className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                      Horas Produtivas / Cobráveis (%)
                      <span title="Porcentagem do seu dia dedicada efetivamente ao serviço do cliente. O resto vai para reuniões, burocracia, prospecção e cafezinho.">
                        <HelpCircle size={14} className="text-slate-400 cursor-help" />
                      </span>
                    </Label>
                    <span className="font-bold text-violet-600 dark:text-violet-400">{produtividade}%</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={100}
                    value={produtividade}
                    onChange={e => setProdutividade(parseInt(e.target.value))}
                    className="w-full accent-violet-600 cursor-pointer h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>40% (Consultoria)</span>
                    <span>70% - 80% (Padrão Saudável)</span>
                    <span>100% (Impossível na prática)</span>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* PASSO 3: PROJETO ESPECÍFICO */}
          <Card className="border-0 shadow-xl shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 rounded-3xl overflow-hidden ring-1 ring-slate-100 dark:ring-slate-800">
            <CardHeader className="bg-slate-900 dark:bg-slate-950 text-white p-6 flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  <TrendingUp size={22} strokeWidth={2.5} />
                </div> 
                2. Precificar um Projeto / Serviço Específico
              </CardTitle>
              <input
                type="checkbox"
                checked={calcularProjeto}
                onChange={e => setCalcularProjeto(e.target.checked)}
                className="w-5 h-5 accent-violet-600 rounded cursor-pointer shrink-0"
              />
            </CardHeader>
            
            {calcularProjeto && (
              <CardContent className="p-6 space-y-6 animate-in fade-in duration-300">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="horasProjeto" className="text-slate-600 dark:text-slate-300">Horas Estimadas para o Projeto</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm"><Clock size={16}/></span>
                      <Input
                        id="horasProjeto"
                        type="number"
                        value={horasProjeto}
                        onChange={e => setHorasProjeto(e.target.value)}
                        className="pl-10 h-11 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 dark:border-slate-700"
                        placeholder="Ex: 40"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custosProjeto" className="text-slate-600 dark:text-slate-300">Custos Diretos do Projeto (R$)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">R$</span>
                      <Input
                        id="custosProjeto"
                        value={custosProjeto ? parseInt(custosProjeto).toLocaleString("pt-BR") : ""}
                        onChange={e => handleInputChange(e.target.value, setCustosProjeto)}
                        className="pl-10 h-11 font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 dark:border-slate-700"
                        placeholder="Ex: 200"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">Hospedagem, templates, impressão, etc.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Margem de lucro */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <Label className="text-slate-600 dark:text-slate-300">Margem de Lucro Desejada</Label>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{margemLucro}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={60}
                      value={margemLucro}
                      onChange={e => setMargemLucro(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>0% (Empate)</span>
                      <span>20% (Padrão Razoável)</span>
                      <span>60% (Alta Margem)</span>
                    </div>
                  </div>

                  {/* Impostos */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <Label className="text-slate-600 dark:text-slate-300">Impostos incidentes (%)</Label>
                      <span className="font-bold text-amber-500">{impostos}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      value={impostos}
                      onChange={e => setImpostos(parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>0% (Isento)</span>
                      <span>6% (DAS MEI / Simples)</span>
                      <span>25% (Altas alíquotas)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* RESULTADOS / SAÍDAS (LARGURA: 5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-0 shadow-2xl bg-slate-900 dark:bg-slate-950 text-white rounded-3xl overflow-hidden relative">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <CardHeader className="border-b border-white/5 p-6">
              <CardTitle className="text-lg uppercase tracking-wider font-bold text-violet-300 flex items-center gap-2">
                <PieChart size={18}/> Matemática da sua Hora
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              {/* CUSTO DE EMPATE */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Valor Hora de Custo (Break-Even)</span>
                <p className="text-2xl font-black text-slate-200">{formatBRL(custoHoraBasico)}</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Isto é quanto você precisa receber por hora faturada apenas para pagar seus custos fixos e tirar o salário desejado.
                </p>
              </div>

              {/* HORA SUGERIDA COM MARGEM */}
              <div className="bg-gradient-to-br from-violet-950/50 to-indigo-950/30 p-5 rounded-2xl border border-violet-800/30 space-y-1 relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-violet-500/20 text-violet-300 font-sans text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-widest flex items-center gap-1">
                   <Award size={10}/> Recomendado
                </div>
                <span className="text-[10px] uppercase font-bold text-violet-300 tracking-wider">Valor Hora Sugerido (com Lucro)</span>
                <p className="text-4xl font-black text-white">{formatBRL(valorHoraSugerido)}</p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  Recomendado para fechar contratos com <strong>{margemLucro}% de margem líquida</strong> para caixa de investimento do seu negócio.
                </p>
              </div>

              {/* DETALHAMENTO DE HORA */}
              <div className="grid grid-cols-2 gap-4 pt-2 text-xs border-t border-white/5">
                <div className="space-y-0.5">
                  <span className="text-slate-400 block">Horas Cobráveis:</span>
                  <span className="font-bold text-white text-sm">{horasFaturaveisMes}h <span className="text-slate-500 font-medium">/mês</span></span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400 block">Horas Administrativas:</span>
                  <span className="font-bold text-white text-sm">{horasUteisMes - horasFaturaveisMes}h <span className="text-slate-500 font-medium">/mês</span></span>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* CARD DO PROJETO SE ATIVO */}
          {calcularProjeto && (
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden ring-1 ring-slate-100 dark:ring-slate-800 animate-in slide-in-from-bottom duration-300">
              <CardHeader className="bg-emerald-50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/30 p-6">
                <CardTitle className="text-lg uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                  <Sparkles size={18}/> Orçamento Sugerido
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                {/* PREÇO FINAL SUGERIDO */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Preço de Venda Final do Serviço</span>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400">{formatBRL(precoProjetoSugerido)}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                     Este preço cobre o seu tempo faturável ({horasProjeto}h), custos diretos ({formatBRL(parseFloat(custosProjeto) || 0)}), paga todos os impostos ({impostos}%) e garante o lucro líquido.
                  </p>
                </div>

                {/* DETALHAMENTO DE DISTRIBUIÇÃO */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Trabalho Operacional (Custo Salário):</span>
                    <span className="font-bold text-slate-800 dark:text-white">{formatBRL(parseFloat(horasProjeto) * custoHoraBasico)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Custos Diretos (Ferramentas/Externos):</span>
                    <span className="font-bold text-slate-800 dark:text-white">{formatBRL(parseFloat(custosProjeto) || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      Imposto a recolher ({impostos}%):
                    </span>
                    <span className="font-bold text-amber-500">{formatBRL(valorImpostosProjeto)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">Lucro Líquido Real ({margemLucro}%):</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatBRL(lucroLiquidoProjeto)}</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl flex gap-3 text-xs text-blue-800 dark:text-blue-200 border border-blue-100 dark:border-blue-950">
                   <ShieldAlert size={18} className="shrink-0 mt-0.5 text-blue-500"/>
                   <div>
                     <p className="font-bold">E-E-A-T Dica Jurídica:</p>
                     <p className="mt-1 leading-relaxed">
                        Ao gerar seu orçamento final, formalize a parceria criando um <strong>Contrato de Prestação de Serviços</strong> para se proteger legalmente contra calotes e alterações de escopo unilateral.
                     </p>
                     <Button 
                       variant="link" 
                       onClick={() => window.open('/ferramentas/gerador-contrato', '_blank')} 
                       className="p-0 h-auto text-xs text-blue-700 dark:text-blue-400 font-bold hover:underline mt-2 flex items-center gap-1"
                     >
                       Gerar Contrato Grátis <ArrowRight size={12}/>
                     </Button>
                   </div>
                </div>

              </CardContent>
            </Card>
          )}
        </div>

      </div>

    </div>
  );
}
