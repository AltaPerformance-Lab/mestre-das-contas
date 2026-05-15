export interface WorkHoursResult {
    totalTrabalhadoMins: number;
    horasTrabalhadas: string;
    saldo: string;
    status: "positivo" | "negativo" | "neutro";
    almoco: string;
    jornadaPadrao: string;
}

export const timeToMinutes = (time: string): number => {
    if (!time) return 0;
    const [h, m] = time.split(":").map(Number);
    return (h * 60) + (m || 0);
};

export const minutesToTime = (minutes: number): string => {
    const isNegative = minutes < 0;
    const absMins = Math.abs(minutes);
    const h = Math.floor(absMins / 60);
    const m = absMins % 60;
    return `${isNegative ? "-" : ""}${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

/**
 * Calcula jornada com 2 pontos e intervalo fixo
 */
export function calculateWorkHoursSimple(
    entrada: string,
    saida: string,
    intervalo: string,
    jornada: string = "08:00"
): WorkHoursResult {
    const minEntrada = timeToMinutes(entrada);
    const minSaida = timeToMinutes(saida);
    const minIntervalo = timeToMinutes(intervalo);
    const minJornada = timeToMinutes(jornada);

    let totalTrabalhado = minSaida - minEntrada - minIntervalo;
    if (minSaida < minEntrada) totalTrabalhado += 1440;

    const saldoMins = totalTrabalhado - minJornada;
    
    let status: "positivo" | "negativo" | "neutro" = "neutro";
    if (saldoMins > 10) status = "positivo";
    else if (saldoMins < -10) status = "negativo";

    return {
        totalTrabalhadoMins: totalTrabalhado,
        horasTrabalhadas: minutesToTime(totalTrabalhado),
        saldo: minutesToTime(saldoMins),
        status,
        almoco: intervalo,
        jornadaPadrao: jornada
    };
}

/**
 * Calcula jornada com 4 pontos (entrada1, saida1, entrada2, saida2)
 */
export function calculateWorkHoursAdvanced(
    entrada1: string,
    saida1: string,
    entrada2: string,
    saida2: string,
    jornada: string = "08:00"
): WorkHoursResult {
    const p1 = timeToMinutes(saida1) - timeToMinutes(entrada1);
    const p2 = (entrada2 && saida2) ? timeToMinutes(saida2) - timeToMinutes(entrada2) : 0;
    
    const p1Adjusted = p1 < 0 ? p1 + 1440 : p1;
    const p2Adjusted = p2 < 0 ? p2 + 1440 : p2;

    const totalTrabalhado = p1Adjusted + p2Adjusted;
    const jornadaMins = timeToMinutes(jornada);
    
    let almocoMins = 0;
    if (entrada2 && saida1) {
        almocoMins = timeToMinutes(entrada2) - timeToMinutes(saida1);
        if (almocoMins < 0) almocoMins += 1440;
    }

    const saldoMins = totalTrabalhado - jornadaMins;
    
    let status: "positivo" | "negativo" | "neutro" = "neutro";
    if (saldoMins > 10) status = "positivo";
    else if (saldoMins < -10) status = "negativo";

    return {
        totalTrabalhadoMins: totalTrabalhado,
        horasTrabalhadas: minutesToTime(totalTrabalhado),
        saldo: minutesToTime(saldoMins),
        status,
        almoco: minutesToTime(almocoMins),
        jornadaPadrao: jornada
    };
}
