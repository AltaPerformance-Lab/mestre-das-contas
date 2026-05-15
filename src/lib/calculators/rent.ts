import { historicalIndices } from "@/data/indices-historicos";

export interface RentResult {
    oldRent: number;
    newRent: number;
    difference: number;
    rate: number;
    rateOpposite: number;
    relevantMonths: any[];
    indexUsed: string;
    indexOpposite: string;
}

export function calculateRent(
    rentValue: number,
    anniversaryMonth: string,
    indexType: string
): RentResult | null {
    if (!rentValue || !anniversaryMonth) return null;

    const startIndex = historicalIndices.findIndex(m => m.date < anniversaryMonth);
    if (startIndex === -1) return null;

    const relevantMonths = historicalIndices.slice(startIndex, startIndex + 12);
    
    let accumulatedFactor = 1;
    let accumulatedOpposite = 1;

    relevantMonths.forEach(m => {
        const val = indexType === 'ipca' ? m.ipca : m.igpm;
        const opp = indexType === 'ipca' ? m.igpm : m.ipca;
        accumulatedFactor *= (1 + val / 100);
        accumulatedOpposite *= (1 + opp / 100);
    });

    const finalRate = (accumulatedFactor - 1) * 100;
    const finalRateOpposite = (accumulatedOpposite - 1) * 100;
    const newRent = rentValue * accumulatedFactor;

    return {
        oldRent: rentValue,
        newRent,
        difference: newRent - rentValue,
        rate: finalRate,
        rateOpposite: finalRateOpposite,
        relevantMonths,
        indexUsed: indexType.toUpperCase(),
        indexOpposite: indexType === 'ipca' ? 'IGP-M' : 'IPCA'
    };
}
