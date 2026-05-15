import { differenceInMonths, differenceInYears, addDays, differenceInDays, parseISO } from "date-fns";

export type TerminationResult = {
  saldoSalario: string;
  decimo: string;
  feriasProp: string;
  feriasVencidas: string;
  aviso: string;
  multaFgts: string;
  saqueFgts: string;
  descontosEst: string;
  totalLiquido: string;
  diasAviso: number;
  mesesDecimo: number;
  mesesFerias: number;
  bloqueadoSaqueAniversario: boolean;
  raw: any;
};

const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

export function calculateTermination(
    pSalario: number, 
    pInicio: string, 
    pFim: string, 
    pMotivo: string,
    avisoPrevio: string = "indenizado",
    temFeriasVencidas: boolean = false,
    diasFeriasVencidas: string = "30",
    saldoFgtsStr: string = "",
    saqueAniversario: boolean = false
): TerminationResult | null {
    if (!pSalario || !pInicio || !pFim) return null;

    const inicio = parseISO(pInicio);
    const fim = parseISO(pFim);
    
    if (inicio > fim) return null;
    
    // 1. Tempos
    const anosTrabalhados = differenceInYears(fim, inicio);
    
    let diasAviso = 30; 
    if (anosTrabalhados > 0 && pMotivo === "sem_justa_causa") {
      diasAviso += Math.min(anosTrabalhados * 3, 60);
    }

    const dataProjetada = (avisoPrevio === "indenizado" && pMotivo === "sem_justa_causa")
      ? addDays(fim, diasAviso) 
      : fim;

    // 2. Saldo de Salário
    const diaDesligamento = fim.getDate();
    const vlrSaldoSalario = (pSalario / 30) * diaDesligamento;

    // 3. 13º Proporcional
    let vlrDecimo = 0;
    let mesesDecimo = 0;

    if (pMotivo !== "justa_causa") {
        mesesDecimo = dataProjetada.getMonth() + 1; 
        if (dataProjetada.getDate() < 15) mesesDecimo -= 1;
        
        if (inicio.getFullYear() === fim.getFullYear()) {
            mesesDecimo = mesesDecimo - inicio.getMonth();
            if (inicio.getDate() > 15) mesesDecimo -= 1;
        }
        if (mesesDecimo < 0) mesesDecimo = 0;
        vlrDecimo = (pSalario / 12) * mesesDecimo;
    }

    // 4. Férias Proporcionais + 1/3
    let mesesFerias = 0;
    let vlrFeriasProp = 0;
    let vlrTercoFeriasProp = 0;

    if (pMotivo !== "justa_causa") {
        let inicioPeriodoAquisitivo = new Date(inicio);
        while (addDays(inicioPeriodoAquisitivo, 365) <= dataProjetada) {
            inicioPeriodoAquisitivo = addDays(inicioPeriodoAquisitivo, 365);
        }

        mesesFerias = differenceInMonths(dataProjetada, inicioPeriodoAquisitivo);
        const dataAux = new Date(inicioPeriodoAquisitivo);
        dataAux.setMonth(dataAux.getMonth() + mesesFerias);

        if (differenceInDays(dataProjetada, dataAux) >= 14) { 
            mesesFerias += 1;
        }

        if (mesesFerias > 12) mesesFerias = 12; 
        if (mesesFerias < 0) mesesFerias = 0;

        vlrFeriasProp = (pSalario / 12) * mesesFerias;
        vlrTercoFeriasProp = vlrFeriasProp / 3;
    }

    // 5. Férias Vencidas
    let vlrFeriasVencidasTotal = 0;
    if (temFeriasVencidas) {
        const dias = parseInt(diasFeriasVencidas) || 0;
        const valorBase = (pSalario / 30) * dias;
        vlrFeriasVencidasTotal = valorBase + (valorBase / 3);
    }

    // 6. Aviso Prévio Indenizado
    let vlrAvisoIndenizado = 0;
    if (pMotivo === "sem_justa_causa" && avisoPrevio === "indenizado") {
      vlrAvisoIndenizado = (pSalario / 30) * diasAviso;
    } else if (pMotivo === "acordo_comum" && avisoPrevio === "indenizado") {
      vlrAvisoIndenizado = ((pSalario / 30) * diasAviso) / 2;
    }

    // 7. FGTS
    let vlrMultaFgts = 0;
    let vlrSaqueFgts = 0;
    
    if (pMotivo === "sem_justa_causa" || pMotivo === "acordo_comum") {
      const saldoAtualInput = parseFloat(saldoFgtsStr.replace(/\D/g, "") || "0") / 100;
      const baseFgtsRescisao = vlrAvisoIndenizado + vlrDecimo + vlrSaldoSalario;
      const fgtsRescisao = baseFgtsRescisao * 0.08;
      const saldoTotalFgts = saldoAtualInput + fgtsRescisao;
      
      if (pMotivo === "sem_justa_causa") {
         vlrMultaFgts = saldoTotalFgts * 0.40;
      } else {
         vlrMultaFgts = saldoTotalFgts * 0.20;
      }

      if (saqueAniversario) {
          vlrSaqueFgts = vlrMultaFgts;
      } else {
          if (pMotivo === "sem_justa_causa") {
             vlrSaqueFgts = saldoTotalFgts + vlrMultaFgts;
          } else {
             vlrSaqueFgts = (saldoTotalFgts * 0.80) + vlrMultaFgts; 
          }
      }
    }

    const totalVerbasEmpresa = vlrSaldoSalario + vlrDecimo + vlrFeriasProp + vlrTercoFeriasProp + vlrAvisoIndenizado + vlrFeriasVencidasTotal;
    const estimativaDescontos = (vlrSaldoSalario + vlrDecimo) * 0.09; 
    const totalLiquidoReceber = totalVerbasEmpresa - estimativaDescontos + vlrSaqueFgts;

    return {
      saldoSalario: formatBRL(vlrSaldoSalario),
      decimo: formatBRL(vlrDecimo),
      feriasProp: formatBRL(vlrFeriasProp + vlrTercoFeriasProp),
      feriasVencidas: formatBRL(vlrFeriasVencidasTotal),
      aviso: formatBRL(vlrAvisoIndenizado),
      multaFgts: formatBRL(vlrMultaFgts),
      saqueFgts: formatBRL(vlrSaqueFgts),
      descontosEst: formatBRL(estimativaDescontos),
      totalLiquido: formatBRL(totalLiquidoReceber),
      diasAviso: diasAviso,
      mesesDecimo: mesesDecimo,
      mesesFerias: mesesFerias,
      bloqueadoSaqueAniversario: saqueAniversario && pMotivo === "sem_justa_causa",
      raw: {
          salario: pSalario,
          inicio: pInicio,
          fim: pFim,
          motivo: pMotivo,
          aviso: avisoPrevio,
          fgts: saldoFgtsStr,
          feriasVencidas: temFeriasVencidas,
          diasFerias: diasFeriasVencidas
      }
    };
}
