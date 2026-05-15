export interface CardMachineResult {
    totalSale: number;
    installments: number;
    mdrRate: number;
    anticipationRate: number;
    
    // Sem antecipação (Receber parcelado)
    liquidInstallment: number;
    totalLiquidNoAnticipation: number;
    totalFeesNoAnticipation: number;

    // Com antecipação (Receber agora)
    liquidTotalAnticipated: number;
    totalFeesAnticipated: number;
    
    // Diferença
    difference: number;
    feePercentage: number;
}

export function calculateCardMachine(
    total: number, 
    n: number, 
    mdrPercent: number, 
    anticipationPercent: number
): CardMachineResult {
    const mdrRate = mdrPercent / 100;
    const antRate = anticipationPercent / 100;

    // 1. Receber Parcelado (Sem antecipação)
    const liquidNoAnticipation = total * (1 - mdrRate);
    const feesNoAnticipation = total * mdrRate;
    const installmentValue = liquidNoAnticipation / n;

    // 2. Receber Agora (Antecipação)
    let liquidAnticipated = 0;
    const totalAfterMdr = total * (1 - mdrRate);
    const baseInstallment = totalAfterMdr / n;

    // Traz cada parcela a valor presente (Cálculo Composto Padrão)
    for (let i = 1; i <= n; i++) {
        liquidAnticipated += baseInstallment / Math.pow(1 + antRate, i);
    }

    const feesAnticipated = total - liquidAnticipated;

    return {
        totalSale: total,
        installments: n,
        mdrRate: mdrPercent,
        anticipationRate: anticipationPercent,
        
        liquidInstallment: installmentValue,
        totalLiquidNoAnticipation: liquidNoAnticipation,
        totalFeesNoAnticipation: feesNoAnticipation,

        liquidTotalAnticipated: liquidAnticipated,
        totalFeesAnticipated: feesAnticipated,

        difference: liquidNoAnticipation - liquidAnticipated,
        feePercentage: (feesAnticipated / total) * 100
    };
}
