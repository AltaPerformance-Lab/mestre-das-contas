
export type FinancingResult = {
  valorParcela: string;
  primeiraParcela: string;
  ultimaParcela: string;
  totalPago: string;
  totalJuros: string;
  valorFinanciado: string;
  valorBem: string;
  valorEntrada: string;
  tipo: string;
  prazo: string;
  taxa: string;
  rawValor: number;
  rawEntrada: number;
  rawTaxa: number;
  rawPrazo: number;
  rawTipo: string;
};

const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

export function calculateFinancing(
    V: number, 
    E: number, 
    i_mensal: number, 
    n: number, 
    tipo: string
): FinancingResult | null {
    const P = V - E;

    if (P <= 0 || isNaN(i_mensal) || !n) return null;

    const i = i_mensal / 100;
    let valorParcela = 0;
    let totalPago = 0;
    let totalJuros = 0;
    let primeiraParcela = 0;
    let ultimaParcela = 0;

    if (tipo === "price") {
        // Fórmula Price: Prestação = P * [ (i * (1+i)^n) / ((1+i)^n - 1) ]
        valorParcela = P * ( (i * Math.pow(1+i, n)) / (Math.pow(1+i, n) - 1) );
        totalPago = valorParcela * n;
        totalJuros = totalPago - P;
        primeiraParcela = valorParcela;
        ultimaParcela = valorParcela;
    } else {
        // SAC
        const amortizacao = P / n;
        primeiraParcela = amortizacao + (P * i);
        ultimaParcela = amortizacao + (amortizacao * i); 
        totalPago = (n * (primeiraParcela + ultimaParcela)) / 2; 
        totalJuros = totalPago - P;
        valorParcela = primeiraParcela;
    }

    return {
        valorParcela: formatBRL(valorParcela),
        primeiraParcela: formatBRL(primeiraParcela),
        ultimaParcela: formatBRL(ultimaParcela),
        totalPago: formatBRL(totalPago),
        totalJuros: formatBRL(totalJuros),
        valorFinanciado: formatBRL(P),
        valorBem: formatBRL(V),
        valorEntrada: formatBRL(E),
        tipo: tipo === "price" ? "Price (Fixas)" : "SAC (Decrescentes)",
        prazo: `${n} meses`,
        taxa: `${i_mensal}% a.m.`,
        rawValor: V,
        rawEntrada: E,
        rawTaxa: i_mensal,
        rawPrazo: n,
        rawTipo: tipo
    };
}
