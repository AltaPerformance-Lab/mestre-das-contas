export type VacationResult = {
    valorFerias: string;
    tercoFerias: string;
    abono: string;
    adiantamento13: string;
    inss: string;
    irrf: string;
    totalBruto: string;
    totalDescontos: string;
    totalLiquido: string;
    diasGozo: number;
    vendeuFerias: boolean;
    rawSalario: number;
    rawDias: number;
    rawVender: boolean;
    rawDecimo: boolean;
    rawDeps: number;
};

const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

export function calculateVacation(
    salario: number, 
    dias: number, 
    vender: boolean, 
    decimo: boolean, 
    deps: number = 0
): VacationResult | null {
    if (!salario) return null;

    const valorDia = salario / 30;

    // 1. Férias Gozadas
    const vlrFerias = valorDia * dias;
    const vlrTercoFerias = vlrFerias / 3;

    // 2. Abono Pecuniário (Venda)
    let vlrAbono = 0;
    let vlrTercoAbono = 0;

    if (vender) {
      const diasVendidos = 10; 
      vlrAbono = valorDia * diasVendidos;
      vlrTercoAbono = vlrAbono / 3;
    }

    // 3. Adiantamento 13º
    let vlrAdiantamento13 = 0;
    if (decimo) {
      vlrAdiantamento13 = salario / 2;
    }

    // 4. Base de Cálculo (Abono é isento)
    const baseTributavel = vlrFerias + vlrTercoFerias;
    
    // 5. INSS 2026 (Portaria Interministerial MPS/MF nº 13/2026)
    let inss = 0;
    let baseCalculo = baseTributavel;
    if (baseCalculo <= 1621.00) inss = baseCalculo * 0.075;
    else if (baseCalculo <= 2902.84) inss = (1621.00 * 0.075) + ((baseCalculo - 1621.00) * 0.09);
    else if (baseCalculo <= 4354.27) inss = (1621.00 * 0.075) + ((2902.84 - 1621.00) * 0.09) + ((baseCalculo - 2902.84) * 0.12);
    else if (baseCalculo <= 8475.55) inss = (1621.00 * 0.075) + ((2902.84 - 1621.00) * 0.09) + ((4354.27 - 2902.84) * 0.12) + ((baseCalculo - 4354.27) * 0.14);
    else inss = 988.10; // Teto Máximo INSS 2026

    // 6. IRRF 2026 (Regra Nova - Isenção até R$ 5.000)
    const deducaoDependentes = deps * 189.59;
    const baseIRRF = baseTributavel - inss - deducaoDependentes;
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

    const totalProventos = vlrFerias + vlrTercoFerias + vlrAbono + vlrTercoAbono + vlrAdiantamento13;
    const totalDescontos = inss + irrf;
    const totalLiquido = totalProventos - totalDescontos;

    return {
      valorFerias: formatBRL(vlrFerias),
      tercoFerias: formatBRL(vlrTercoFerias),
      abono: formatBRL(vlrAbono + vlrTercoAbono),
      adiantamento13: formatBRL(vlrAdiantamento13),
      inss: formatBRL(inss),
      irrf: formatBRL(irrf),
      totalBruto: formatBRL(totalProventos),
      totalDescontos: formatBRL(totalDescontos),
      totalLiquido: formatBRL(totalLiquido),
      diasGozo: dias,
      vendeuFerias: vender,
      rawSalario: salario,
      rawDias: dias,
      rawVender: vender,
      rawDecimo: decimo,
      rawDeps: deps
    };
}
