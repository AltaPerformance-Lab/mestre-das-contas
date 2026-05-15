export const MEI_CONSTANTS = {
    SALARIO_MINIMO_2026: 1621.00,
    LIMITE_ANUAL: 81000.00,
};

export type MeiResult = {
    dasValue: number;
    limiteProporcional: number;
    faturamentoAnualEstimado: number;
    isEstourou: boolean;
    estouroValor: number;
    estouroPercentual: number;
    margemRestante: number;
    mesesConsiderados: number;
    atividade: string;
};

export function calculateMei(faturamentoMensal: number, atividade: string, mesesTrabalhados: number): MeiResult {
    const meses = Math.max(1, Math.min(12, mesesTrabalhados || 12));
    
    // Cálculo DAS
    let inss = MEI_CONSTANTS.SALARIO_MINIMO_2026 * 0.05;
    let icms = 0;
    let iss = 0;

    if (atividade === 'comercio' || atividade === 'industria') {
        icms = 1.00;
    } else if (atividade === 'servicos') {
        iss = 5.00;
    } else if (atividade === 'comercio_servicos') {
        icms = 1.00;
        iss = 5.00;
    } else if (atividade === 'caminhoneiro') {
        inss = MEI_CONSTANTS.SALARIO_MINIMO_2026 * 0.12;
        icms = 0;
        iss = 0; // Simplificação conforme original
    }

    const dasValue = inss + icms + iss;
    const limiteProporcional = (MEI_CONSTANTS.LIMITE_ANUAL / 12) * meses;
    const faturamentoAnualEstimado = faturamentoMensal * meses;
    
    const isEstourou = faturamentoAnualEstimado > limiteProporcional;
    const estouroValor = Math.max(0, faturamentoAnualEstimado - limiteProporcional);
    const estouroPercentual = (estouroValor / limiteProporcional) * 100;
    const margemRestante = Math.max(0, limiteProporcional - faturamentoAnualEstimado);

    return {
        dasValue,
        limiteProporcional,
        faturamentoAnualEstimado,
        isEstourou,
        estouroValor,
        estouroPercentual,
        margemRestante,
        mesesConsiderados: meses,
        atividade
    };
}
