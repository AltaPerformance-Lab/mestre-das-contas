export type PercentageResult = {
    valor: string;
    conta: string;
    detalhe: string;
    modo: string;
    rawA: number;
    rawB: number;
};

export function calculatePercentage(a: number, b: number, mode: string): PercentageResult | null {
    if (isNaN(a) || isNaN(b)) return null;

    let res = 0;
    let textoConta = "";
    let textoResultado = "";
    let detalhe = "";

    switch (mode) {
        case "simples": // Quanto é X% de Y?
            res = (a / 100) * b;
            textoConta = `${a}% de ${b}`;
            textoResultado = res.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
            detalhe = `Cálculo: (${a} ÷ 100) × ${b}`;
            break;
        case "reverso": // X é quantos % de Y?
            if (b === 0) return null;
            res = (a / b) * 100;
            textoConta = `${a} de ${b}`;
            textoResultado = `${res.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`;
            detalhe = `Cálculo: (${a} ÷ ${b}) × 100`;
            break;
        case "aumento": // Aumentar X% em Y
            res = b * (1 + (a / 100));
            textoConta = `${b} + ${a}%`;
            textoResultado = res.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
            detalhe = `Valor do aumento: ${(res - b).toLocaleString("pt-BR")}`;
            break;
        case "desconto": // Descontar X% de Y
            res = b * (1 - (a / 100));
            textoConta = `${b} - ${a}%`;
            textoResultado = res.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
            detalhe = `Valor do desconto: ${(b - res).toLocaleString("pt-BR")}`;
            break;
        case "variacao": // Variação de A para B
            if (a === 0) return null;
            res = ((b - a) / a) * 100;
            textoConta = `De ${a} para ${b}`;
            textoResultado = `${res > 0 ? "+" : ""}${res.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`;
            detalhe = res > 0 ? "Houve um Aumento" : "Houve uma Queda";
            break;
        default:
            return null;
    }

    return {
        valor: textoResultado,
        conta: textoConta,
        detalhe,
        modo: mode,
        rawA: a,
        rawB: b
    };
}
