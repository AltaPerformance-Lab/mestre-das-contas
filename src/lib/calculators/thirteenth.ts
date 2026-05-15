
export type ThirteenthResult = {
    totalBruto: string;
    primeiraParcela: string;
    segundaParcela: string;
    inss: string;
    irrf: string;
    totalLiquido: string;
    meses: number;
    rawSalario: number;
    rawMeses: number;
    rawDeps: number;
};

const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

export function calculateThirteenth(pSalario: number, pMeses: number, pDeps: number): ThirteenthResult | null {
    if (!pSalario) return null;

    // Valor Total Bruto (Proporcional)
    const valorTotal13 = (pSalario / 12) * pMeses;

    // 1ª Parcela (50% do total, sem descontos)
    const primeiraParcela = valorTotal13 / 2;

    // Descontos (Sobre o CHEIO) - INSS 2026
    let inss = 0;
    let baseCalculo = valorTotal13;
    
    if (baseCalculo <= 1621.00) inss = baseCalculo * 0.075;
    else if (baseCalculo <= 2902.84) inss = (1621.00 * 0.075) + ((baseCalculo - 1621.00) * 0.09);
    else if (baseCalculo <= 4354.27) inss = (1621.00 * 0.075) + ((2902.84 - 1621.00) * 0.09) + ((baseCalculo - 2902.84) * 0.12);
    else if (baseCalculo <= 8475.55) inss = (1621.00 * 0.075) + ((2902.84 - 1621.00) * 0.09) + ((4354.27 - 2902.84) * 0.12) + ((baseCalculo - 4354.27) * 0.14);
    else inss = 988.10; // Teto Máximo INSS 2026

    // IRRF 2026 (Regra Nova - Isenção até R$ 5.000)
    const deducaoDependentes = pDeps * 189.59;
    const baseIRRF = baseCalculo - inss - deducaoDependentes;
    let irrf = 0;

    if (baseIRRF <= 5000.00) {
        irrf = 0;
    } else if (baseIRRF <= 7350.00) {
        irrf = 978.62 - (0.133145 * baseIRRF);
    } else {
        if (baseIRRF <= 2428.80) irrf = 0;
        else if (baseIRRF <= 2826.65) irrf = (baseIRRF * 0.075) - 182.16;
        else if (baseIRRF <= 3751.05) irrf = (baseIRRF * 0.15) - 394.16;
        else if (baseIRRF <= 4664.68) irrf = (baseIRRF * 0.225) - 675.49;
        else irrf = (baseIRRF * 0.275) - 908.73;
    }
    if (irrf < 0) irrf = 0;

    // 2ª Parcela (Total - 1ª - Descontos)
    const segundaParcela = valorTotal13 - primeiraParcela - inss - irrf;

    return {
      totalBruto: formatBRL(valorTotal13),
      primeiraParcela: formatBRL(primeiraParcela),
      segundaParcela: formatBRL(segundaParcela),
      inss: formatBRL(inss),
      irrf: formatBRL(irrf),
      totalLiquido: formatBRL(primeiraParcela + segundaParcela),
      meses: pMeses,
      rawSalario: pSalario,
      rawMeses: pMeses,
      rawDeps: pDeps
    };
}
