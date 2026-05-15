import { addDays, differenceInWeeks, differenceInDays, format, isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// --- IMC ---
export type IMCResult = {
    imc: string;
    classificacao: string;
    cor: string;
    bg: string;
    peso: string;
    altura: string;
};

export function calculateIMC(peso: string | number, altura: string | number): IMCResult | null {
    const p = typeof peso === "string" ? peso.replace(",", ".") : peso.toString();
    const a = typeof altura === "string" ? altura.replace(",", ".") : altura.toString();

    const pesoNum = parseFloat(p);
    let alturaNum = parseFloat(a);

    if (!pesoNum || !alturaNum || isNaN(pesoNum) || isNaN(alturaNum) || alturaNum <= 0) return null;

    if (alturaNum > 3) alturaNum = alturaNum / 100;

    const imcValue = pesoNum / (alturaNum * alturaNum);
    let classificacao = "";
    let cor = "";
    let bg = "";

    if (imcValue < 18.5) {
        classificacao = "Abaixo do Peso";
        cor = "text-blue-600 border-blue-200";
        bg = "bg-blue-50";
    } else if (imcValue < 24.9) {
        classificacao = "Peso Normal";
        cor = "text-green-700 border-green-200";
        bg = "bg-green-50";
    } else if (imcValue < 29.9) {
        classificacao = "Sobrepeso";
        cor = "text-yellow-700 border-yellow-200";
        bg = "bg-yellow-50";
    } else if (imcValue < 34.9) {
        classificacao = "Obesidade Grau I";
        cor = "text-orange-700 border-orange-200";
        bg = "bg-orange-50";
    } else if (imcValue < 39.9) {
        classificacao = "Obesidade Grau II";
        cor = "text-red-700 border-red-200";
        bg = "bg-red-50";
    } else {
        classificacao = "Obesidade Grau III";
        cor = "text-red-900 border-red-300";
        bg = "bg-red-100";
    }

    return {
        imc: imcValue.toFixed(2),
        classificacao,
        cor,
        bg,
        peso: pesoNum.toString(),
        altura: alturaNum.toFixed(2),
    };
}

// --- CALORIAS ---
export type CalorieResult = {
    tmb: number;
    tdee: number;
    perderPeso: number;
    ganharMassa: number;
    perderRapido: number;
    rawIdade: number;
    rawPeso: number;
    rawAltura: number;
    rawGenero: string;
    rawAtividade: string;
};

export function calculateCalorias(
    idade: string | number,
    peso: string | number,
    altura: string | number,
    genero: string,
    atividade: string
): CalorieResult | null {
    const age = typeof idade === "string" ? parseFloat(idade) : idade;
    const weight = typeof peso === "string" ? parseFloat(peso.replace(",", ".")) : peso;
    const height = typeof altura === "string" ? parseFloat(altura.replace(",", ".")) : altura;

    if (!age || !weight || !height || isNaN(age) || isNaN(weight) || isNaN(height)) return null;

    const tmb = genero === "masculino"
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    const fatores: Record<string, number> = {
        "sedentario": 1.2,
        "leve": 1.375,
        "moderado": 1.55,
        "ativo": 1.725,
        "atleta": 1.9
    };

    const tdee = tmb * (fatores[atividade] || 1.2);

    return {
        tmb: Math.round(tmb),
        tdee: Math.round(tdee),
        perderPeso: Math.round(tdee - 500),
        ganharMassa: Math.round(tdee + 300),
        perderRapido: Math.round(tdee - 750),
        rawIdade: age,
        rawPeso: weight,
        rawAltura: height,
        rawGenero: genero,
        rawAtividade: atividade
    };
}

// --- ÁGUA ---
export type WaterResult = {
    totalLitros: string;
    totalMl: number;
    copos: number;
    garrafas: string;
    rawPeso: number;
    rawAtiv: string;
};

export function calculateWater(peso: string | number, atividade: string): WaterResult | null {
    const p = typeof peso === "string" ? peso.replace(",", ".") : peso.toString();
    const pesoNum = parseFloat(p);

    if (!pesoNum || isNaN(pesoNum)) return null;

    let fator = 35;
    if (atividade === "leve") fator = 40;
    if (atividade === "moderado") fator = 45;
    if (atividade === "intenso") fator = 50;

    const totalMl = pesoNum * fator;
    const copos = Math.ceil(totalMl / 250);
    const garrafas = (totalMl / 500).toFixed(1);

    return {
        totalLitros: (totalMl / 1000).toFixed(2).replace('.', ',') + " L",
        totalMl: totalMl,
        copos,
        garrafas: garrafas.replace('.', ','),
        rawPeso: pesoNum,
        rawAtiv: atividade
    };
}

// --- GRAVIDEZ ---
export type PregnancyResult = {
    dpp: string;
    semanas: number;
    dias: number;
    trimestre: string;
    tamanho: string;
    rawDum: string;
};

export function calculatePregnancy(dum: string): PregnancyResult | null {
    if (!dum) return null;
    const dataDum = parseISO(dum);
    if (!isValid(dataDum)) return null;

    const dpp = addDays(dataDum, 280);
    const hoje = new Date();
    
    let semanas = differenceInWeeks(hoje, dataDum);
    let diasTotais = differenceInDays(hoje, dataDum);
    let diasRestantes = diasTotais % 7;

    if (semanas < 0) { semanas = 0; diasRestantes = 0; }
    if (semanas > 42) { semanas = 42; diasRestantes = 0; } 

    const getTamanhoBebe = (sem: number) => {
        if (sem < 4) return "Sementinha de Papoula";
        if (sem < 8) return "Framboesa";
        if (sem < 12) return "Limão Siciliano";
        if (sem < 16) return "Abacate";
        if (sem < 20) return "Banana";
        if (sem < 24) return "Espiga de Milho";
        if (sem < 28) return "Beringela";
        if (sem < 32) return "Coco Verde";
        if (sem < 36) return "Mamão Papaya";
        return "Melancia";
    };

    return {
      dpp: format(dpp, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
      semanas,
      dias: diasRestantes,
      trimestre: semanas < 13 ? "1º Trimestre" : semanas < 27 ? "2º Trimestre" : "3º Trimestre",
      tamanho: getTamanhoBebe(semanas),
      rawDum: dum
    };
}
