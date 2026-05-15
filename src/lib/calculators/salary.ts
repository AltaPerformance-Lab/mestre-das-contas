export type SalaryResult = {
    bruto: string;
    inss: string;
    irrf: string;
    outros: string;
    totalDescontos: string;
    liquido: string;
    aliquotaEfetiva: string;
    rawBruto: number;
    rawDeps: number;
    rawOutros: number;
};

const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

export function calculateSalary(salario: number, pDeps: number = 0, pOutros: number = 0): SalaryResult | null {
    if (!salario) return null;

    let inss = 0;
    let resto = salario;

    // Tabela INSS 2026 (Estimada/Atualizada)
    if (salario > 8475.55) {
        inss = 988.10; 
    } else {
        if (salario > 4354.27) { inss += (salario - 4354.27) * 0.14; resto = 4354.27; }
        if (resto > 2902.84) { inss += (resto - 2902.84) * 0.12; resto = 2902.84; }
        if (resto > 1621.00) { inss += (resto - 1621.00) * 0.09; resto = 1621.00; }
        inss += resto * 0.075;
    }

    const deducaoDependentes = pDeps * 189.59;
    const baseIRRF = salario - inss - deducaoDependentes;
    let irrf = 0;

    // Tabela IRRF 2026 (Nova Isenção até R$ 5k)
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

    const totalDescontos = inss + irrf + pOutros;
    const salarioLiquido = salario - totalDescontos;

    return {
      bruto: formatBRL(salario),
      inss: formatBRL(inss),
      irrf: formatBRL(irrf),
      outros: formatBRL(pOutros),
      totalDescontos: formatBRL(totalDescontos),
      liquido: formatBRL(salarioLiquido),
      aliquotaEfetiva: salario > 0 ? ((totalDescontos / salario) * 100).toFixed(2) + "%" : "0%",
      rawBruto: salario,
      rawDeps: pDeps,
      rawOutros: pOutros
    };
}
