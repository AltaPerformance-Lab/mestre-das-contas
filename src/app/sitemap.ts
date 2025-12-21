import { MetadataRoute } from 'next'
import { reformData } from '@/data/reform-data'
import fs from 'fs'
import path from 'path'

// --- FUNÇÕES AUXILIARES DE LEITURA ---

// 1. QR Codes
async function getQRCodeCases() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/qrcode-cases.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

// 2. Salários (pSEO)
async function getSalariosData() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/salarios.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Erro ao ler salarios.json:", error);
    return [];
  }
}

// 3. Veículos (pSEO)
async function getVeiculosData() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/veiculos.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Erro ao ler veiculos.json:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mestredascontas.com.br'

  // Carrega todos os dados externos
  const qrCodeCases = await getQRCodeCases();
  const salariosData = await getSalariosData();
  const veiculosData = await getVeiculosData();

  // --- 1. ROTAS ESTÁTICAS ---
  const staticRoutes: MetadataRoute.Sitemap = [
    '', // Home
    '/ferramentas/gerador-qr-code',
    '/trabalhista/rescisao',
    '/trabalhista/ferias',
    '/trabalhista/decimo-terceiro',
    '/trabalhista/seguro-desemprego',
    '/trabalhista/horas-extras',
    '/trabalhista/horas-trabalhadas', 
    '/financeiro/juros-compostos',
    '/financeiro/reforma-tributaria', 
    '/financeiro/salario-liquido',
    '/financeiro/financiamento', 
    '/financeiro/financiamento', // Página principal do financiamento
    '/financeiro/porcentagem', 
    '/saude/imc',
    '/saude/calorias-diarias',
    '/saude/gestacional', 
    '/saude/agua',
    '/sobre',
    '/contato',
    '/privacidade',
    '/termos',
    '/politica-cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  const hubs = [
    '/trabalhista',
    '/financeiro',
    '/saude',
    '/ferramentas', // Se existir
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // --- 2. ROTAS DINÂMICAS ---

  // A. Reforma Tributária
  const reformRoutes: MetadataRoute.Sitemap = reformData.map((item) => ({
    url: `${baseUrl}/financeiro/reforma-tributaria/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, 
  }))

  // B. QR Code
  const qrCodeRoutes: MetadataRoute.Sitemap = qrCodeCases.map((item: any) => ({
    url: `${baseUrl}/ferramentas/gerador-qr-code/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85, 
  }))

  // C. Salário Líquido (Novo)
  // Estrutura: /financeiro/salario-liquido/[valor]
  const salarioRoutes: MetadataRoute.Sitemap = salariosData.map((item: any) => ({
    // Assumindo que o JSON tem a propriedade 'valor' ou 'slug'
    url: `${baseUrl}/financeiro/salario-liquido/${item.valor || item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // D. Financiamento Veículos (Novo)
  // Estrutura: /financeiro/financiamento-veiculos/simulacao-[valor]
  const veiculosRoutes: MetadataRoute.Sitemap = veiculosData.map((item: any) => ({
    // Atenção aqui: Adicionei o prefixo "simulacao-" conforme sua imagem da pasta
    url: `${baseUrl}/financeiro/financiamento-veiculos/simulacao-${item.valor || item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Junta tudo
  return [
    ...staticRoutes, 
    ...reformRoutes, 
    ...qrCodeRoutes,
    ...salarioRoutes,
    ...veiculosRoutes
  ]
}