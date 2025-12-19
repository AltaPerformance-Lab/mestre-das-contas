import { MetadataRoute } from 'next'
import { reformData } from '@/data/reform-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mestredascontas.com.br'

  // 1. Rotas Estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    '', // Home
    // Trabalhista
    '/trabalhista/rescisao',
    '/trabalhista/ferias',
    '/trabalhista/decimo-terceiro',
    '/trabalhista/seguro-desemprego',
    '/trabalhista/horas-extras', 
    
    // Financeiro
    '/financeiro/juros-compostos',
    '/financeiro/reforma-tributaria', 
    '/financeiro/salario-liquido',
    '/financeiro/financiamento', 
    '/financeiro/porcentagem', 
    
    // Saúde
    '/saude/imc',
    '/saude/calorias-diarias',
    '/saude/gestacional', 
    '/saude/agua', // 
    
    // Institucional
    '/sobre',
    '/contato',
    '/privacidade',
    '/termos',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Rotas Dinâmicas (pSEO)
  const reformRoutes: MetadataRoute.Sitemap = reformData.map((item) => ({
    url: `${baseUrl}/reforma-tributaria/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, 
  }))

  return [...staticRoutes, ...reformRoutes]
}