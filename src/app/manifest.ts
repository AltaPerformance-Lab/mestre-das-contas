import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mestre das Contas',
    short_name: 'Mestre',
    description: 'Calculadoras Financeiras e Trabalhistas Gratuitas. Simule Rescisão, Férias, Financiamentos e muito mais.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a', // slate-950
    theme_color: '#2563eb', // blue-600
    orientation: 'portrait',
    icons: [
      {
        src: '/icon', // Usa o icon gerado pelo Next.js (mesmo sendo pequeno, é melhor que 404)
        sizes: '32x32',
        type: 'image/png',
      },
      // Idealmente, deve-se adicionar ícones grandes (192, 512) aqui
      // Vamos manter apenas o básico funcional para validação
    ],
    categories: ['finance', 'productivity', 'business'],
    lang: 'pt-BR',
  };
}
