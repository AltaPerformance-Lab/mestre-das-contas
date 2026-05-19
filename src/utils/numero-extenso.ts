// --- FUNÇÃO AUXILIAR: NÚMERO POR EXTENSO (LÓGICA STRING PURA) ---
export const numeroParaExtenso = (valorStr: string): string => {
  if (!valorStr || valorStr === "0,00") return "Zero reais";

  const cleanStr = valorStr.replace(/\./g, ""); 
  const parts = cleanStr.split(",");
  
  const reais = parseInt(parts[0], 10);
  const centavos = parts[1] ? parseInt(parts[1], 10) : 0;

  const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const dezes = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const centenas = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

  const getGroup = (n: number) => {
    let str = "";
    const c = Math.floor(n / 100);
    const d = Math.floor((n % 100) / 10);
    const u = n % 10;

    if (n === 100) return "cem";
    
    if (c > 0) str += centenas[c];

    if (d === 1) {
        if (str) str += " e ";
        str += dezes[u];
    } else {
        if (d > 0) {
            if (str) str += " e ";
            str += dezenas[d];
        }
        if (u > 0) {
            if (str) str += " e ";
            str += unidades[u];
        }
    }
    return str;
  };

  let extenso = "";

  if (reais > 0) {
      if (reais >= 1000000) {
          const milhoes = Math.floor(reais / 1000000);
          const resto = reais % 1000000;
          extenso += getGroup(milhoes) + (milhoes === 1 ? " milhão" : " milhões");
           if (resto > 0) {
              if (resto < 100000) extenso += " e ";
              else extenso += ", ";
              const mil = Math.floor(resto / 1000);
              const restoMil = resto % 1000;
              if (mil > 0) extenso += getGroup(mil) + " mil";
              if (restoMil > 0) extenso += " e " + getGroup(restoMil);
          }
      } else if (reais >= 1000) {
          const mil = Math.floor(reais / 1000);
          const resto = reais % 1000;
          if (mil === 1) extenso += "mil";
          else extenso += getGroup(mil) + " mil";
          
          if (resto > 0) {
              if (resto < 100 || (resto % 100 === 0)) extenso += " e ";
              else extenso += ", ";
              extenso += getGroup(resto);
          }
      } else {
          extenso += getGroup(reais);
      }
      extenso += reais === 1 ? " real" : " reais";
  }

  if (centavos > 0) {
      if (extenso) extenso += " e ";
      extenso += getGroup(centavos) + (centavos === 1 ? " centavo" : " centavos");
  }

  return extenso.charAt(0).toUpperCase() + extenso.slice(1);
};
