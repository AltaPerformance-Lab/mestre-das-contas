import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',  // Regra para TODOS os robôs
      allow: '/',     // Permitir acesso a TUDO
      disallow: ['/private/', '/admin/'], // Bloqueia pastas internas (se existirem no futuro)
    },
    sitemap: 'https://mestredascontas.com.br/sitemap.xml', // Aponta o caminho do mapa
  }
}