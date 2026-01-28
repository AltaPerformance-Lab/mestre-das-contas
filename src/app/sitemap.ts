import { MetadataRoute } from 'next'
import { reformData } from '@/data/reform-data'
import { conversionData } from '@/data/image-conversions'
import { receiptCases } from '@/data/receipt-cases'
import { budgetCases } from '@/data/budget-pseo-list'
import { orderCases } from '@/data/order-pseo-list'
import { meiActivities } from '@/data/mei-activities'
import { rentPSeoCases } from '@/data/rent-pseo' // Data de Reajuste Aluguel
import { terminationCases } from '@/data/termination-pseo' // Data de Rescisão
import { cardMachineCases } from '@/data/card-machine-pseo' // Data de Maquininha
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

// --- FUNÇÕES DE OTIMIZAÇÃO SEO ---

// Calcula prioridade baseada na importância da rota
function calculatePriority(route: string): number {
  if (route === '') return 1.0; // Home - máxima prioridade
  
  // Páginas de alta conversão
  if (route.includes('reforma-tributaria')) return 0.95;
  if (route.includes('rescisao')) return 0.90;
  if (route.includes('ferias')) return 0.90;
  if (route.includes('salario-liquido')) return 0.85;
  if (route.includes('gerador-qr-code')) return 0.85;
  if (route.includes('gerador-pix')) return 0.85;
  
  // Hubs de categoria
  if (route.match(/^\/(financeiro|trabalhista|ferramentas|saude)$/)) return 0.80;
  
  // Calculadoras principais
  if (route.includes('juros-compostos')) return 0.75;
  if (route.includes('decimo-terceiro')) return 0.75;
  if (route.includes('imc')) return 0.75;
  
  // pSEO e páginas dinâmicas
  if (route.includes('/[slug]') || route.includes('/[')) return 0.70;
  
  // Outras páginas
  return 0.65;
}

// Define frequência de mudança baseada no tipo de conteúdo
function getChangeFrequency(route: string): 'daily' | 'weekly' | 'monthly' {
  if (route === '') return 'daily'; // Home atualiza frequentemente
  
  // Conteúdo que muda com legislação
  if (route.includes('reforma-tributaria')) return 'weekly';
  if (route.includes('salario-liquido')) return 'weekly';
  if (route.includes('mei')) return 'weekly';
  
  // Ferramentas e calculadoras (estáveis)
  if (route.includes('/ferramentas/')) return 'monthly';
  
  // Hubs (atualizam com novo conteúdo)
  if (route.match(/^\/(financeiro|trabalhista|ferramentas|saude)$/)) return 'weekly';
  
  // Páginas pSEO (raramente mudam)
  if (route.includes('/[slug]') || route.includes('/[')) return 'monthly';
  
  // Padrão
  return 'monthly';
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
    '/ferramentas/editor-pdf-online',
    '/ferramentas/gerador-qr-code',
    '/ferramentas/gerador-pix',
    '/ferramentas/gerador-link-whatsapp',
    '/ferramentas/gerador-de-senhas',
    '/ferramentas/conversor-imagem',
    '/ferramentas/gerador-recibo',
    '/ferramentas/criador-orcamentos', 
    '/ferramentas/criador-pedidos',
    '/ferramentas/formatador-json',
    '/ferramentas/declaracao-conteudo',
    '/ferramentas/gerador-privacidade',
    
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
    '/financeiro/calculadora-dias-uteis',
    '/financeiro/reforma-tributaria', 
    '/financeiro/calculadora-mei',
    '/financeiro/salario-liquido',
    '/financeiro/financiamento', 
    '/financeiro/financiamento-veiculos',
    '/financeiro/porcentagem', 
    '/financeiro/reajuste-aluguel',
    '/financeiro/simulador-maquininha',

    // Saúde
    '/saude',
    '/saude/imc',
    '/saude/calorias',
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
    changeFrequency: getChangeFrequency(route),
    priority: calculatePriority(route),
  }))

  // --- 2. ROTAS DINÂMICAS (pSEO) ---

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

  // C. Conversor de Imagem
  const imageConverterRoutes: MetadataRoute.Sitemap = conversionData.map((item) => ({
    url: `${baseUrl}/ferramentas/conversor-imagem/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85, 
  }))

  // D. Gerador de Recibo
  const receiptRoutes: MetadataRoute.Sitemap = receiptCases.map((item) => ({
    url: `${baseUrl}/ferramentas/gerador-recibo/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85, 
  }))

  // E. Salário Líquido (Ativado)
  const salarioRoutes: MetadataRoute.Sitemap = salariosData.map((item: any) => ({
    url: `${baseUrl}/financeiro/salario-liquido/${item.valor || item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // F. Orçamento
  const budgetRoutes: MetadataRoute.Sitemap = budgetCases.map((item) => ({
    url: `${baseUrl}/ferramentas/criador-orcamentos/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, 
  }))

  // G. Pedidos
  const orderRoutes: MetadataRoute.Sitemap = orderCases.map((item) => ({
    url: `${baseUrl}/ferramentas/criador-pedidos/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, 
  }))

  // H. Financiamento Veículos (Ativado)
  const veiculosRoutes: MetadataRoute.Sitemap = veiculosData.map((item: any) => ({
    url: `${baseUrl}/financeiro/financiamento-veiculos/simulacao/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // I. MEI pSEO
  const meiRoutes: MetadataRoute.Sitemap = meiActivities.map((item) => ({
    url: `${baseUrl}/financeiro/calculadora-mei/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85, 
  }))

  // J. Reajuste Aluguel (NOVO)
  const rentRoutes: MetadataRoute.Sitemap = rentPSeoCases.map((item) => ({
    url: `${baseUrl}/financeiro/reajuste-aluguel/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, 
  }))

  // K. Rescisão Trabalhista pSEO (NOVO)
  const terminationRoutes: MetadataRoute.Sitemap = terminationCases.map((item) => ({
    url: `${baseUrl}/trabalhista/rescisao/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, 
  }))

    // L. Simulador Maquininha (NOVO)
    const cardMachineRoutes: MetadataRoute.Sitemap = cardMachineCases.map((item) => ({
      url: `${baseUrl}/financeiro/simulador-maquininha/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, 
    }))

    // M. Comparador Salario (NOVO)
    const comparatorRoutes: MetadataRoute.Sitemap = [{
      url: `${baseUrl}/financeiro/comparador-salario`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9, 
    }]

    // N. Comparador pSEO (Amostra)
    const comparatorPseoRoutes: MetadataRoute.Sitemap = [1500, 2000, 3000, 5000, 10000, 15000, 20000, 50000].map(v => ({
       url: `${baseUrl}/financeiro/comparador-salario/${v}`,
       lastModified: new Date(),
       changeFrequency: 'monthly',
       priority: 0.8 
    }))

  // Junta tudo
  return [
    ...staticRoutes, 
    ...reformRoutes, 
    ...qrCodeRoutes,
    ...imageConverterRoutes,
    ...receiptRoutes,
    ...budgetRoutes,
    ...orderRoutes,
    ...meiRoutes,
    //...salarioRoutes, 
    //...veiculosRoutes, 
    ...rentRoutes,
    ...terminationRoutes,
    ...cardMachineRoutes,
    ...comparatorRoutes,
    ...comparatorPseoRoutes
  ]
}