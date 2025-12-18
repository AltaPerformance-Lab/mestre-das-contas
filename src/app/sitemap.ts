import { MetadataRoute } from 'next'
import { reformData } from '@/data/reform-data' // Importa seus dados do pSEO

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mestredascontas.com.br'

  // 1. Rotas Estáticas (Suas calculadoras e páginas institucionais)
  const staticRoutes = [
    '', // Home
    // Trabalhista
    '/trabalhista/rescisao',
    '/trabalhista/ferias',
    '/trabalhista/decimo-terceiro',
    '/trabalhista/seguro-desemprego',
    '/trabalhista/horas-extras',
    // Financeiro
    '/financeiro/juros-compostos',
    '/financeiro/reforma-tributaria', // Calculadora Principal
    '/financeiro/financiamento',
    '/financeiro/porcentagem',
    '/financeiro/salario-liquido',
    // Saúde
    '/saude/imc',
    '/saude/gestacional',
    '/saude/agua',
    '/saude/calorias-diarias',
    // Institucional
    '/sobre',
    '/contato',
    '/privacidade',
    '/termos',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly', // Home é diária, o resto semanal
    priority: route === '' ? 1 : 0.8, // Home 1.0, Calculadoras 0.8
  })) as MetadataRoute.Sitemap

  // 2. Rotas Dinâmicas (pSEO - Reforma Tributária)
  // Gera automaticamente uma URL para cada item do seu JSON
  const reformRoutes = reformData.map((item) => ({
    url: `${baseUrl}/reforma-tributaria/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, // Prioridade alta, pois são Landing Pages de conversão
  })) as MetadataRoute.Sitemap

  // Junta tudo numa lista só
  return [...staticRoutes, ...reformRoutes]
}