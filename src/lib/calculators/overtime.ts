export type OvertimeResult = {
    valorHora: string;
    total50: string;
    total100: string;
    dsr: string;
    totalFinal: string;
    rawSalario: number;
    rawH50: number;
    rawH100: number;
};

const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

export function calculateOvertime(
    Sal: number, 
    H50: number = 0, 
    H100: number = 0,
    Jor: number = 220,
    DU: number = 25,
    DF: number = 5
): OvertimeResult | null {
    if (!Sal) return null;

    // 1. Valor da Hora Normal
    const valorHora = Sal / Jor;

    // 2. Cálculo Hora Extra 50%
    const valorHora50 = valorHora * 1.5;
    const total50 = valorHora50 * H50;

    // 3. Cálculo Hora Extra 100%
    const valorHora100 = valorHora * 2;
    const total100 = valorHora100 * H100;

    // 4. Cálculo do DSR (Descanso Semanal Remunerado)
    const totalHorasReais = total50 + total100;
    const dsr = DU > 0 ? (totalHorasReais / DU) * DF : 0;

    const totalReceber = total50 + total100 + dsr;

    return {
        valorHora: formatBRL(valorHora),
        total50: formatBRL(total50),
        total100: formatBRL(total100),
        dsr: formatBRL(dsr),
        totalFinal: formatBRL(totalReceber),
        rawSalario: Sal,
        rawH50: H50,
        rawH100: H100
    };
}
