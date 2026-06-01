import type { NextConfig } from "next";

// Bundle Analyzer (ativa com: ANALYZE=true npm run build)
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // ===== OTIMIZAÇÃO DE IMAGENS =====
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ===== PERFORMANCE =====
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // ===== REDIRECTS SEO (Correção de 404 — Search Console 01/06/2026) =====
  async redirects() {
    return [
      // --- ROTAS LEGADAS DE REFORMA TRIBUTÁRIA (sem prefixo /financeiro/) ---
      {
        source: '/reforma-tributaria/:slug*',
        destination: '/financeiro/reforma-tributaria/:slug*',
        permanent: true,
      },

      // --- SIMULAÇÃO DE FINANCIAMENTO: formato antigo com traço (simulacao-XXXXX) ---
      {
        source: '/financeiro/financiamento-veiculos/simulacao-:valor',
        destination: '/financeiro/financiamento-veiculos/simulacao/:valor',
        permanent: true,
      },

      // --- FINANCIAMENTO: rotas antigas /financeiro/financiamento/[slug] → /simulacao/[slug] ---
      {
        source: '/financeiro/financiamento/energia-solar-residencial',
        destination: '/financeiro/financiamento-veiculos/simulacao/energia-solar-residencial',
        permanent: true,
      },
      {
        source: '/financeiro/financiamento/carro-popular-usado',
        destination: '/financeiro/financiamento-veiculos/simulacao/carro-popular-usado',
        permanent: true,
      },
      {
        source: '/financeiro/financiamento/construcao-casa-terreno',
        destination: '/financeiro/financiamento-veiculos/simulacao/construcao-casa-terreno',
        permanent: true,
      },
      {
        source: '/financeiro/financiamento/moto-alta-cilindrada',
        destination: '/financeiro/financiamento-veiculos/simulacao/moto-alta-cilindrada',
        permanent: true,
      },
      {
        source: '/financeiro/financiamento/caminhao-leve',
        destination: '/financeiro/financiamento-veiculos/simulacao/caminhao-leve',
        permanent: true,
      },
      {
        source: '/financeiro/financiamento/suv-seminovo',
        destination: '/financeiro/financiamento-veiculos/simulacao/suv-seminovo',
        permanent: true,
      },

      // --- ROTA INCORRETA: /financeiro/rescisao → /trabalhista/rescisao ---
      {
        source: '/financeiro/rescisao',
        destination: '/trabalhista/rescisao',
        permanent: true,
      },

      // --- ROTAS INSTITUCIONAIS LEGADAS ---
      {
        source: '/contato',
        destination: '/fale-conosco',
        permanent: true,
      },
      {
        source: '/privacidade',
        destination: '/politica-privacidade',
        permanent: true,
      },
      {
        source: '/termos',
        destination: '/termos-de-uso',
        permanent: true,
      },

      // --- SAÚDE: rota antiga ---
      {
        source: '/saude/calorias',
        destination: '/saude/calorias-diarias',
        permanent: true,
      },
    ];
  },
  
  // ===== HEADERS DE SEGURANÇA E PERFORMANCE =====
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // DNS Prefetch
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // Segurança
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      // Cache para assets estáticos
      {
        source: '/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache para página inicial
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
      },
      // Cache para páginas estáticas institucionais (24 horas)
      {
        source: '/:path(sobre|fale-conosco|politica-privacidade|termos-de-uso|politica-cookies|sitemap-html)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
      },
      // Cache de 30 dias na CDN para todas as rotas de calculadoras e pSEO
      {
        source: '/financeiro/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/trabalhista/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/ferramentas/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/saude/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/glossario/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/veiculos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
