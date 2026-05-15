export type UnemploymentResult = {
    media: string;
    valorParcela: string;
    qtdParcelas: number;
    total: string;
    direito: boolean;
    motivoNegativa: string;
    rawS1: number;
    rawS2: number;
    rawS3: number;
    rawMeses: number;
    rawVez: number;
};

const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

export function calculateUnemployment(
    s1: number, 
    s2: number = 0, 
    s3: number = 0, 
    meses: number, 
    vez: number = 1
): UnemploymentResult | null {
    if (!meses) return null;

    // 1. Calcular Média (Últimos 3 salários)
    let soma = s1 + s2 + s3;
    let divisor = 0;
    if (s1 > 0) divisor++;
    if (s2 > 0) divisor++;
    if (s3 > 0) divisor++;
    
    const mediaSalarial = divisor > 0 ? soma / divisor : 0;

    // 2. Calcular Valor da Parcela (Tabela 2026 - Base Salário Mínimo R$ 1.621)
    let valorParcela = 0;
    const salarioMinimo = 1621.00; // Oficial 2026

    if (mediaSalarial <= 2222.17) {
        valorParcela = mediaSalarial * 0.8;
    } else if (mediaSalarial <= 3703.99) {
        valorParcela = 1777.74 + ((mediaSalarial - 2222.17) * 0.5);
    } else {
        valorParcela = 2518.65; // Teto oficial 2026
    }

    if (valorParcela < salarioMinimo) valorParcela = salarioMinimo;

    // 3. Calcular Quantidade de Parcelas
    let qtdParcelas = 0;

    if (vez === 1) {
        if (meses >= 12 && meses <= 23) qtdParcelas = 4;
        else if (meses >= 24) qtdParcelas = 5;
    } else if (vez === 2) {
        if (meses >= 9 && meses <= 11) qtdParcelas = 3;
        else if (meses >= 12 && meses <= 23) qtdParcelas = 4;
        else if (meses >= 24) qtdParcelas = 5;
    } else { // 3ª ou mais
        if (meses >= 6 && meses <= 11) qtdParcelas = 3;
        else if (meses >= 12 && meses <= 23) qtdParcelas = 4;
        else if (meses >= 24) qtdParcelas = 5;
    }

    const totalReceber = valorParcela * qtdParcelas;

    return {
        media: formatBRL(mediaSalarial),
        valorParcela: formatBRL(valorParcela),
        qtdParcelas,
        total: formatBRL(totalReceber),
        direito: qtdParcelas > 0,
        motivoNegativa: qtdParcelas === 0 ? "Tempo de trabalho insuficiente para esta solicitação." : "",
        rawS1: s1, rawS2: s2, rawS3: s3, rawMeses: meses, rawVez: vez
    };
}
