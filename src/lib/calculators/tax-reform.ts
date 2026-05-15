
// --- PRESETS DE REFORMA TRIBUTÁRIA ---
export const REFORM_PRESETS: Record<string, { label: string; atual: number; iva: number }> = {
    padrao: { label: "Produto Geral (Varejo)", atual: 34, iva: 26.5 },
    servico: { label: "Serviços Gerais", atual: 16, iva: 26.5 }, 
    saude: { label: "Saúde/Educação (Reduzida)", atual: 14, iva: 10.6 },
    cesta: { label: "Cesta Básica Nacional", atual: 18, iva: 0 }, 
    seletivo: { label: "Cigarro/Bebida (Imposto Seletivo)", atual: 80, iva: 60 },
    imovel: { label: "Compra de Imóvel", atual: 8, iva: 15.9 }
};

const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
};

export function calculateTaxReform(V: number, Cat: string, initialCargaAtual?: number) {
    if (!V || isNaN(V)) return null;

    const regra = REFORM_PRESETS[Cat] || REFORM_PRESETS["padrao"];
    
    // Define a taxa antiga (prioriza o input manual se houver)
    const taxaAntigaPct = initialCargaAtual ?? regra.atual;
    const taxaNovaPct = regra.iva;
    
    const impostoAtual = V * (taxaAntigaPct / 100);
    const impostoNovo = V * (taxaNovaPct / 100);
    const diferenca = impostoNovo - impostoAtual;
    const variacao = impostoAtual > 0 ? ((impostoNovo - impostoAtual) / impostoAtual) * 100 : 0;

    const timeline = [
        {
            ano: "2025", fase: "Sistema Antigo", impostoEstimado: impostoAtual, valorTotal: formatBRL(impostoAtual),
            descricao: `Carga cheia de PIS, COFINS, ICMS, ISS e IPI (~${taxaAntigaPct}%).`
        },
        {
            ano: "2026 (Hoje)", fase: "Fase de Testes", impostoEstimado: impostoAtual, valorTotal: formatBRL(impostoAtual),
            descricao: "Início da cobrança de 1% (IVA) compensável. Carga inalterada."
        },
        {
            ano: "2027", fase: "Entra a CBS", impostoEstimado: impostoAtual + ((impostoNovo - impostoAtual) * 0.30), valorTotal: formatBRL(impostoAtual + ((impostoNovo - impostoAtual) * 0.30)),
            descricao: "Fim do PIS/COFINS. Entra a CBS federal completa."
        },
        {
            ano: "2030", fase: "Transição Gradual", impostoEstimado: impostoAtual + ((impostoNovo - impostoAtual) * 0.65), valorTotal: formatBRL(impostoAtual + ((impostoNovo - impostoAtual) * 0.65)),
            descricao: "Redução do ICMS/ISS e aumento proporcional do IBS."
        },
        {
            ano: "2033", fase: "Implementação Total", impostoEstimado: impostoNovo, valorTotal: formatBRL(impostoNovo),
            descricao: `Vigência integral do novo sistema (${taxaNovaPct}% IVA).`
        }
    ];

    return {
        atual: { taxa: taxaAntigaPct, valor: formatBRL(impostoAtual) },
        novo: { taxa: taxaNovaPct, valor: formatBRL(impostoNovo) },
        diferencaValor: formatBRL(Math.abs(diferenca)),
        diferencaPercent: isNaN(variacao) ? "0%" : variacao.toFixed(1) + "%",
        situacao: diferenca > 0 ? "Aumento" : "Redução",
        categoriaLabel: regra.label,
        rawValor: V, rawCat: Cat, timeline: timeline 
    };
}
