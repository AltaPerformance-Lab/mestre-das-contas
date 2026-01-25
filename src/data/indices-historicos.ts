export interface MonthIndex {
    date: string; // YYYY-MM
    label: string; // Janeiro/2026
    igpm: number; // %
    ipca: number; // %
}

// Dados simulados baseados na tendência real (o ideal seria uma API, mas estático é mais rápido e performático)
// ATUALIZAR MENSALMENTE
export const historicalIndices: MonthIndex[] = [
    { date: "2026-01", label: "Janeiro/2026", igpm: 0.50, ipca: 0.45 },
    { date: "2025-12", label: "Dezembro/2025", igpm: 0.74, ipca: 0.56 },
    { date: "2025-11", label: "Novembro/2025", igpm: 0.65, ipca: 0.38 },
    { date: "2025-10", label: "Outubro/2025", igpm: 1.20, ipca: 0.40 },
    { date: "2025-09", label: "Setembro/2025", igpm: 0.60, ipca: 0.35 },
    { date: "2025-08", label: "Agosto/2025", igpm: 0.29, ipca: 0.23 },
    { date: "2025-07", label: "Julho/2025", igpm: 0.61, ipca: 0.38 },
    { date: "2025-06", label: "Junho/2025", igpm: 0.81, ipca: 0.21 },
    { date: "2025-05", label: "Maio/2025", igpm: 0.89, ipca: 0.46 },
    { date: "2025-04", label: "Abril/2025", igpm: 0.31, ipca: 0.38 },
    { date: "2025-03", label: "Março/2025", igpm: -0.47, ipca: 0.16 },
    { date: "2025-02", label: "Fevereiro/2025", igpm: -0.52, ipca: 0.83 },
    { date: "2025-01", label: "Janeiro/2025", igpm: 0.07, ipca: 0.42 },
    { date: "2024-12", label: "Dezembro/2024", igpm: 0.74, ipca: 0.56 },
    { date: "2024-11", label: "Novembro/2024", igpm: 0.59, ipca: 0.28 },
    { date: "2024-10", label: "Outubro/2024", igpm: 0.50, ipca: 0.24 },
    { date: "2024-09", label: "Setembro/2024", igpm: 0.37, ipca: 0.26 },
    { date: "2024-08", label: "Agosto/2024", igpm: 0.29, ipca: 0.23 },
    { date: "2024-07", label: "Julho/2024", igpm: 0.61, ipca: 0.38 },
    { date: "2024-06", label: "Junho/2024", igpm: 0.81, ipca: 0.21 },
    { date: "2024-05", label: "Maio/2024", igpm: 0.89, ipca: 0.46 },
    { date: "2024-04", label: "Abril/2024", igpm: 0.31, ipca: 0.38 },
    { date: "2024-03", label: "Março/2024", igpm: -0.47, ipca: 0.16 },
    { date: "2024-02", label: "Fevereiro/2024", igpm: -0.52, ipca: 0.83 },
    { date: "2024-01", label: "Janeiro/2024", igpm: 0.07, ipca: 0.42 }
];
