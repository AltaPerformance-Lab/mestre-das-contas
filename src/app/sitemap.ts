import { MetadataRoute } from 'next'
import { reformData } from '@/data/reform-data'
import { conversionData } from '@/data/image-conversions'
import { receiptCases } from '@/data/receipt-cases'
import { budgetCases } from '@/data/budget-pseo-list'
import { orderCases } from '@/data/order-pseo-list'
import { meiActivities } from '@/data/mei-activities'
import { rentPSeoCases } from '@/data/rent-pseo'
import { terminationCases } from '@/data/termination-pseo'
import { cardMachineCases } from '@/data/card-machine-pseo'
import { financingCases } from '@/data/financing-pseo'
import { glossaryData } from '@/data/glossary'
import fs from 'fs'
import path from 'path'

// --- FUNÇÕES AUXILIARES DE LEITURA (JSONs) ---
async function getQRCodeCases() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/qrcode-cases.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) { return []; }
}

async function getSalariosData() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/salarios.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) { return []; }
}

async function getVeiculosData() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/veiculos.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) { return []; }
}

// --- FUNÇÕES DE OTIMIZAÇÃO SEO ---
function calculatePriority(route: string): number {
  if (route === '') return 1.0;
  if (route.includes('reforma-tributaria')) return 0.95;
  if (route.includes('rescisao')) return 0.90;
  if (route.includes('salario-liquido')) return 0.85;
  if (route.includes('para-empresas')) return 0.95;
  if (route.includes('sobre')) return 0.70;
  return 0.65;
}

function getChangeFrequency(route: string): 'daily' | 'weekly' | 'monthly' {
  if (route === '') return 'daily';
  if (route.includes('reforma-tributaria') || route.includes('salario-liquido')) return 'weekly';
  return 'monthly';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mestredascontas.com.br'

  const qrCodeCases = await getQRCodeCases();
  const salariosData = await getSalariosData();
  const veiculosData = await getVeiculosData();

  // 1. ROTAS ESTÁTICAS
  const staticRoutes: MetadataRoute.Sitemap = [
    '', '/ferramentas', '/ferramentas/editor-pdf-online', '/ferramentas/gerador-qr-code',
    '/ferramentas/gerador-pix', '/ferramentas/gerador-link-whatsapp', '/ferramentas/gerador-de-senhas',
    '/ferramentas/conversor-imagem', '/ferramentas/gerador-recibo', '/ferramentas/criador-orcamentos',
    '/ferramentas/criador-pedidos', '/ferramentas/formatador-json', '/ferramentas/declaracao-conteudo',
    '/ferramentas/gerador-privacidade', '/ferramentas/fases-da-lua', '/trabalhista', '/trabalhista/rescisao',
    '/trabalhista/ferias', '/trabalhista/decimo-terceiro', '/trabalhista/seguro-desemprego',
    '/trabalhista/horas-extras', '/financeiro', '/financeiro/juros-compostos', '/financeiro/calculadora-mei',
    '/financeiro/salario-liquido', '/financeiro/financiamento-veiculos', '/financeiro/reajuste-aluguel',
    '/financeiro/simulador-maquininha', '/saude', '/saude/imc', '/para-empresas', '/sobre',
    '/sobre/autor', '/sobre/metodologia', '/sitemap-html', '/fale-conosco', '/politica-privacidade',
    '/termos-de-uso', '/politica-cookies'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(route),
    priority: calculatePriority(route),
  }))

  // 2. ROTAS DINÂMICAS
  const reformRoutes: MetadataRoute.Sitemap = reformData.map((item) => ({
    url: `${baseUrl}/financeiro/reforma-tributaria/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const salarioRoutes: MetadataRoute.Sitemap = salariosData.map((item: any) => ({
    url: `${baseUrl}/financeiro/salario-liquido/${item.valor || item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const veiculosRoutes: MetadataRoute.Sitemap = veiculosData.map((item: any) => ({
    url: `${baseUrl}/financeiro/financiamento-veiculos/simulacao/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const rentRoutes: MetadataRoute.Sitemap = rentPSeoCases.map((item) => ({
    url: `${baseUrl}/financeiro/reajuste-aluguel/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const terminationRoutes: MetadataRoute.Sitemap = terminationCases.map((item) => ({
    url: `${baseUrl}/trabalhista/rescisao/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const cardMachineRoutes: MetadataRoute.Sitemap = cardMachineCases.map((item) => ({
    url: `${baseUrl}/financeiro/simulador-maquininha/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const financingRoutes: MetadataRoute.Sitemap = financingCases.map((item) => ({
    url: `${baseUrl}/financeiro/financiamento-veiculos/simulacao/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const glossaryRoutes: MetadataRoute.Sitemap = glossaryData.map((item) => ({
    url: `${baseUrl}/glossario/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const commonSalaries = [1000, 1412, 1500, 1800, 2000, 2500, 3000, 5000, 10000];
  const comparatorPseoRoutes: MetadataRoute.Sitemap = commonSalaries.map(v => ({
    url: `${baseUrl}/financeiro/comparador-salario/${v}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  }))

  return [
    ...staticRoutes, ...reformRoutes, ...salarioRoutes, ...veiculosRoutes,
    ...rentRoutes, ...terminationRoutes, ...cardMachineRoutes,
    ...financingRoutes, ...glossaryRoutes, ...comparatorPseoRoutes
  ]
}