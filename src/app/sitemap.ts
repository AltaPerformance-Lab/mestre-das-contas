import { MetadataRoute } from 'next'
import { reformData } from '@/data/reform-data'
import { conversionData } from '@/data/image-conversions'
import { receiptCases } from '@/data/receipt-cases' // Importando dados dos recibos
import fs from 'fs'
import path from 'path'

// --- FUNÇÕES AUXILIARES DE LEITURA (JSONs) ---

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
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mestredascontas.com.br'

  // Carrega dados assíncronos (JSONs)
  const qrCodeCases = await getQRCodeCases();
  const salariosData = await getSalariosData();
  const veiculosData = await getVeiculosData();

  // --- 1. ROTAS ESTÁTICAS ---
  const staticRoutes: MetadataRoute.Sitemap = [
    '', // Home
    
    // Ferramentas
    '/ferramentas',
    '/ferramentas/editor-pdf-online', // NOVO
    '/ferramentas/gerador-qr-code',
    '/ferramentas/gerador-link-whatsapp',
    '/ferramentas/gerador-de-senhas',
    '/ferramentas/conversor-imagem',
    '/ferramentas/gerador-recibo', 
    
    // Trabalhista
    '/trabalhista',
    '/trabalhista/rescisao',
    '/trabalhista/ferias',
    '/trabalhista/decimo-terceiro',
    '/trabalhista/seguro-desemprego',
    '/trabalhista/horas-extras',
    '/trabalhista/horas-trabalhadas', 
    
    // Financeiro
    '/financeiro',
    '/financeiro/juros-compostos',
    '/financeiro/reforma-tributaria', 
    '/financeiro/salario-liquido',
    '/financeiro/financiamento', 
    '/financeiro/financiamento-veiculos',
    '/financeiro/porcentagem', 
    
    // Saúde
    '/saude',
    '/saude/imc',
    '/saude/calorias-diarias',
    '/saude/gestacional', 
    '/saude/agua',
    
    // Institucional
    '/sobre',
    '/fale-conosco',
    '/politica-privacidade',
    '/termos-de-uso',
    '/politica-cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  // --- 2. ROTAS DINÂMICAS (pSEO) ---

  // A. Reforma Tributária (TS Data)
  const reformRoutes: MetadataRoute.Sitemap = reformData.map((item) => ({
    url: `${baseUrl}/financeiro/reforma-tributaria/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, 
  }))

  // B. QR Code (JSON Data)
  const qrCodeRoutes: MetadataRoute.Sitemap = qrCodeCases.map((item: any) => ({
    url: `${baseUrl}/ferramentas/gerador-qr-code/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85, 
  }))

  // C. Conversor de Imagem (TS Data)
  const imageConverterRoutes: MetadataRoute.Sitemap = conversionData.map((item) => ({
    url: `${baseUrl}/ferramentas/conversor-imagem/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85, 
  }))

  // D. Gerador de Recibo (TS Data - NOVO)
  const receiptRoutes: MetadataRoute.Sitemap = receiptCases.map((item) => ({
    url: `${baseUrl}/ferramentas/gerador-recibo/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85, 
  }))

  // E. Salário Líquido (JSON Data)
  const salarioRoutes: MetadataRoute.Sitemap = salariosData.map((item: any) => ({
    url: `${baseUrl}/financeiro/salario-liquido/${item.valor || item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // F. Financiamento Veículos (JSON Data)
  const veiculosRoutes: MetadataRoute.Sitemap = veiculosData.map((item: any) => ({
    url: `${baseUrl}/financeiro/financiamento-veiculos/simulacao/${item.slug}`, // Fixed path
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Junta tudo
  return [
    ...staticRoutes, 
    ...reformRoutes, 
    ...qrCodeRoutes,
    ...imageConverterRoutes,
    ...receiptRoutes,
    // ...salarioRoutes, // Temporarily excluded for AdSense Audit (Thin Content risk)
    // ...veiculosRoutes // Temporarily excluded for AdSense Audit (Thin Content risk)
  ]
}