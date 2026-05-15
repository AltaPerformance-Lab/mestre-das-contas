
export type CompoundInterestResult = {
  total: string;
  investido: string;
  juros: string;
  periodo: string;
  taxa: string;
  rawInicial: number;
  rawMensal: number;
  rawTaxa: number;
  rawTempo: number;
};

const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

export function calculateCompoundInterest(
    pInicial: number, 
    pMensal: number, 
    pTaxa: number, 
    pTempo: number
): CompoundInterestResult | null {
    if (isNaN(pTaxa) || isNaN(pTempo)) return null;

    const i = pTaxa / 100; // Taxa mensal
    const t = pTempo * 12; // Anos -> Meses

    // Fórmula VF = P(1+i)^t + M * [ ((1+i)^t - 1) / i ]
    const montanteInicial = pInicial * Math.pow(1 + i, t);
    
    // Tratamento para taxa zero no aporte mensal (evita divisão por zero)
    let montanteAportes = 0;
    if (i > 0) {
        montanteAportes = pMensal * ((Math.pow(1 + i, t) - 1) / i);
    } else {
        montanteAportes = pMensal * t;
    }
    
    const totalFinal = montanteInicial + (pMensal > 0 ? montanteAportes : 0);
    const totalInvestido = pInicial + (pMensal * t);
    const totalJuros = totalFinal - totalInvestido;

    return {
      total: formatBRL(totalFinal),
      investido: formatBRL(totalInvestido),
      juros: formatBRL(totalJuros),
      periodo: `${pTempo} anos`,
      taxa: `${pTaxa}% a.m.`,
      rawInicial: pInicial,
      rawMensal: pMensal,
      rawTaxa: pTaxa,
      rawTempo: pTempo
    };
}
