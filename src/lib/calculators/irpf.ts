/**
 * Calculadora de Imposto de Renda Pessoa Física (IRPF)
 * Tabelas e alíquotas oficiais vigentes para 2025/2026.
 */

// Tabela Mensal IRPF (A partir de Maio de 2025)
export const IRPF_MENSAL_TABLE = [
  { limit: 2428.80, rate: 0.0, deduction: 0.0 },
  { limit: 2826.65, rate: 0.075, deduction: 182.16 },
  { limit: 3751.05, rate: 0.15, deduction: 394.16 },
  { limit: 4664.68, rate: 0.225, deduction: 675.49 },
  { limit: Infinity, rate: 0.275, deduction: 908.73 }
];

// Tabela Anual IRPF (Exercício 2026, Ano-Calendário 2025)
export const IRPF_ANUAL_TABLE = [
  { limit: 28467.20, rate: 0.0, deduction: 0.0 },
  { limit: 33919.80, rate: 0.075, deduction: 2135.04 },
  { limit: 45012.60, rate: 0.15, deduction: 4679.03 },
  { limit: 55976.16, rate: 0.225, deduction: 8054.97 },
  { limit: Infinity, rate: 0.275, deduction: 10853.78 }
];

export const MENSAL_DEDUCTION_PER_DEPENDENT = 189.59;
export const MENSAL_SIMPLIFIED_DISCOUNT = 607.20;

export const ANUAL_DEDUCTION_PER_DEPENDENT = 2275.08;
export const ANUAL_SIMPLIFIED_DISCOUNT_LIMIT = 16754.34;
export const ANUAL_EDUCATION_LIMIT_PER_PERSON = 3561.50;

export interface IrpfMensalInput {
  rendimentoBruto: number;
  previdenciaOficial: number;
  dependentesCount: number;
  pensaoAlimenticia: number;
  outrasDeducoes: number;
}

export interface IrpfMensalResult {
  rendimentoBruto: number;
  deducoesReais: number;
  deducaoDependentes: number;
  baseCalculoCompleto: number;
  baseCalculoSimplificado: number;
  impostoCompleto: number;
  impostoSimplificado: number;
  aliquotaEfetivaCompleto: number;
  aliquotaEfetivaSimplificado: number;
  modeloMaisVantajoso: "completo" | "simplificado";
  impostoFinal: number;
  aliquotaEfetivaFinal: number;
  baseCalculoFinal: number;
}

export interface IrpfAnualInput {
  rendimentoBruto: number;
  outrosRendimentos: number;
  previdenciaOficial: number;
  dependentesCount: number;
  pensaoAlimenticia: number;
  despesasMedicas: number;
  despesasEducacao: number; // Será validado contra o limite
  previdenciaPrivadaPgbl: number; // Limitado a 12% da receita bruta
  irrfPago: number;
}

export interface ModelDetail {
  baseCalculo: number;
  deducoesTotais: number;
  impostoDevido: number;
  resultado: number; // Positivo = Restituir, Negativo = Pagar
  aliquotaEfetiva: number;
}

export interface IrpfAnualResult {
  receitaBruta: number;
  completo: ModelDetail & {
    deducaoDependentes: number;
    deducaoEducacao: number;
    deducaoPgbl: number;
    deducaoPrevidencia: number;
    deducaoPensao: number;
    deducaoSaude: number;
  };
  simplificado: ModelDetail & {
    descontoSimplificado: number;
  };
  modeloMaisVantajoso: "completo" | "simplificado";
  irrfPago: number;
  resultadoFinal: number; // Positivo = Restituir, Negativo = Pagar
  tipoResultado: "restituir" | "pagar" | "isento";
  aliquotaEfetivaFinal: number;
}

/**
 * Calcula o Imposto de Renda Mensal
 */
export function calculateIrpfMensal(input: IrpfMensalInput): IrpfMensalResult {
  const { rendimentoBruto, previdenciaOficial, dependentesCount, pensaoAlimenticia, outrasDeducoes } = input;

  // 1. DEDUÇÕES REAIS
  const deducaoDependentes = dependentesCount * MENSAL_DEDUCTION_PER_DEPENDENT;
  const deducoesReais = previdenciaOficial + deducaoDependentes + pensaoAlimenticia + outrasDeducoes;

  // 2. MODELO DEDUÇÕES LEGAIS (COMPLETO)
  const baseCalculoCompleto = Math.max(0, rendimentoBruto - deducoesReais);
  let impostoCompleto = 0;
  for (const bracket of IRPF_MENSAL_TABLE) {
    if (baseCalculoCompleto <= bracket.limit) {
      impostoCompleto = Math.max(0, (baseCalculoCompleto * bracket.rate) - bracket.deduction);
      break;
    }
  }

  // 3. MODELO SIMPLIFICADO
  // Desconto simplificado de R$ 607,20 direto na base de cálculo
  const baseCalculoSimplificado = Math.max(0, rendimentoBruto - MENSAL_SIMPLIFIED_DISCOUNT);
  let impostoSimplificado = 0;
  for (const bracket of IRPF_MENSAL_TABLE) {
    if (baseCalculoSimplificado <= bracket.limit) {
      impostoSimplificado = Math.max(0, (baseCalculoSimplificado * bracket.rate) - bracket.deduction);
      break;
    }
  }

  // Comparação e escolha do mais vantajoso (menor imposto)
  const modeloMaisVantajoso = impostoCompleto <= impostoSimplificado ? "completo" : "simplificado";
  const impostoFinal = modeloMaisVantajoso === "completo" ? impostoCompleto : impostoSimplificado;
  const baseCalculoFinal = modeloMaisVantajoso === "completo" ? baseCalculoCompleto : baseCalculoSimplificado;

  const aliquotaEfetivaCompleto = rendimentoBruto > 0 ? (impostoCompleto / rendimentoBruto) * 100 : 0;
  const aliquotaEfetivaSimplificado = rendimentoBruto > 0 ? (impostoSimplificado / rendimentoBruto) * 100 : 0;
  const aliquotaEfetivaFinal = rendimentoBruto > 0 ? (impostoFinal / rendimentoBruto) * 100 : 0;

  return {
    rendimentoBruto,
    deducoesReais,
    deducaoDependentes,
    baseCalculoCompleto,
    baseCalculoSimplificado,
    impostoCompleto,
    impostoSimplificado,
    aliquotaEfetivaCompleto,
    aliquotaEfetivaSimplificado,
    modeloMaisVantajoso,
    impostoFinal,
    aliquotaEfetivaFinal,
    baseCalculoFinal
  };
}

/**
 * Calcula o Imposto de Renda Anual (Ajuste Anual)
 */
export function calculateIrpfAnual(input: IrpfAnualInput): IrpfAnualResult {
  const {
    rendimentoBruto,
    outrosRendimentos,
    previdenciaOficial,
    dependentesCount,
    pensaoAlimenticia,
    despesasMedicas,
    despesasEducacao,
    previdenciaPrivadaPgbl,
    irrfPago
  } = input;

  const receitaBruta = rendimentoBruto + outrosRendimentos;

  // --- MODELO SIMPLIFICADO ---
  // Desconto padrão de 20% limitado ao teto de R$ 16.754,34
  const descontoSimplificado = Math.min(receitaBruta * 0.20, ANUAL_SIMPLIFIED_DISCOUNT_LIMIT);
  const baseCalculoSimplificado = Math.max(0, receitaBruta - descontoSimplificado);
  
  let impostoSimplificado = 0;
  for (const bracket of IRPF_ANUAL_TABLE) {
    if (baseCalculoSimplificado <= bracket.limit) {
      impostoSimplificado = Math.max(0, (baseCalculoSimplificado * bracket.rate) - bracket.deduction);
      break;
    }
  }

  // --- MODELO COMPLETO (DEDUÇÕES LEGAIS) ---
  // Previdência oficial (INSS) deduz integralmente
  const deducaoPrevidencia = previdenciaOficial;

  // Dependentes: R$ 2.275,08 por dependente
  const deducaoDependentes = dependentesCount * ANUAL_DEDUCTION_PER_DEPENDENT;

  // Despesas Médicas: deduz integralmente, sem limite legal
  const deducaoSaude = despesasMedicas;

  // Educação: Limitado a R$ 3.561,50 por pessoa (contribuinte + dependentes)
  // Máximo permitido = R$ 3.561,50 * (1 + dependentesCount)
  const limiteEducacaoMaximo = ANUAL_EDUCATION_LIMIT_PER_PERSON * (1 + dependentesCount);
  const deducaoEducacao = Math.min(despesasEducacao, limiteEducacaoMaximo);

  // PGBL: Limitado a 12% da receita bruta anual
  const limitePgblMaximo = receitaBruta * 0.12;
  const deducaoPgbl = Math.min(previdenciaPrivadaPgbl, limitePgblMaximo);

  const deducaoPensao = pensaoAlimenticia;

  const deducoesCompletas = deducaoPrevidencia + deducaoDependentes + deducaoSaude + deducaoEducacao + deducaoPgbl + deducaoPensao;
  const baseCalculoCompleto = Math.max(0, receitaBruta - deducoesCompletas);

  let impostoCompleto = 0;
  for (const bracket of IRPF_ANUAL_TABLE) {
    if (baseCalculoCompleto <= bracket.limit) {
      impostoCompleto = Math.max(0, (baseCalculoCompleto * bracket.rate) - bracket.deduction);
      break;
    }
  }

  // --- COMPARATIVO ---
  // O mais vantajoso é o que resulta em menos imposto devido
  const modeloMaisVantajoso = impostoCompleto <= impostoSimplificado ? "completo" : "simplificado";
  const impostoDevidoFinal = modeloMaisVantajoso === "completo" ? impostoCompleto : impostoSimplificado;
  
  // Resultado = IRRF Pago - Imposto Devido.
  // Se > 0: Tem restituição. Se < 0: Tem imposto a pagar.
  const resultadoSimplificado = irrfPago - impostoSimplificado;
  const resultadoCompleto = irrfPago - impostoCompleto;
  
  const resultadoFinal = irrfPago - impostoDevidoFinal;

  let tipoResultado: "restituir" | "pagar" | "isento" = "isento";
  if (resultadoFinal > 0.01) {
    tipoResultado = "restituir";
  } else if (resultadoFinal < -0.01) {
    tipoResultado = "pagar";
  }

  const aliquotaEfetivaSimplificado = receitaBruta > 0 ? (impostoSimplificado / receitaBruta) * 100 : 0;
  const aliquotaEfetivaCompleto = receitaBruta > 0 ? (impostoCompleto / receitaBruta) * 100 : 0;
  const aliquotaEfetivaFinal = receitaBruta > 0 ? (impostoDevidoFinal / receitaBruta) * 100 : 0;

  return {
    receitaBruta,
    irrfPago,
    modeloMaisVantajoso,
    resultadoFinal,
    tipoResultado,
    aliquotaEfetivaFinal,
    simplificado: {
      baseCalculo: baseCalculoSimplificado,
      deducoesTotais: descontoSimplificado,
      impostoDevido: impostoSimplificado,
      resultado: resultadoSimplificado,
      aliquotaEfetiva: aliquotaEfetivaSimplificado,
      descontoSimplificado
    },
    completo: {
      baseCalculo: baseCalculoCompleto,
      deducoesTotais: deducoesCompletas,
      impostoDevido: impostoCompleto,
      resultado: resultadoCompleto,
      aliquotaEfetiva: aliquotaEfetivaCompleto,
      deducaoDependentes,
      deducaoEducacao,
      deducaoPgbl,
      deducaoPrevidencia,
      deducaoPensao,
      deducaoSaude
    }
  };
}
