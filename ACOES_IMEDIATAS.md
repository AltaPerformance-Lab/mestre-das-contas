# 🚀 AÇÕES IMEDIATAS - Monetização AdSense

## ⚡ PRIORIDADE MÁXIMA (Fazer AGORA)

### 1. Ativar AdSense (5 minutos)

**Arquivo:** `.env`

```env
# REMOVER os ## (descomentar)
NEXT_PUBLIC_ANALYTICS_ID=G-4ZPBQGPW5P
NEXT_PUBLIC_ADSENSE_ID=pub-1492397877345140
```

### 2. Criar Unidades de Anúncio no Google AdSense (15 minutos)

1. Acesse: https://adsense.google.com
2. Vá em: **Anúncios** → **Por unidade de anúncio**
3. Clique em: **Display ads**
4. Crie as seguintes unidades:

| Nome da Unidade | Formato | Onde Usar |
|----------------|---------|-----------|
| Home - Topo Feed | Responsivo | Página inicial (topo) |
| Home - Meio Feed | Responsivo | Página inicial (meio) |
| Reforma - Topo | Responsivo | Reforma Tributária (topo) |
| Reforma - Meio | Responsivo | Reforma Tributária (meio) |
| Sidebar - Sticky | Vertical | Barra lateral direita |
| Sidebar - Top | Retângulo | Barra lateral (topo) |

5. **Copie os IDs numéricos** de cada unidade

### 3. Configurar Slots de Anúncios (5 minutos)

**Arquivo:** `src/config/ad-slots.ts`

Substitua os valores vazios `""` pelos IDs que você copiou:

```typescript
export const ADS_SLOTS: Record<string, string> = {
  // HOME
  "home_top_feed": "1234567890",      // ← Cole o ID aqui
  "home_middle_feed": "0987654321",   // ← Cole o ID aqui
  
  // REFORMA TRIBUTÁRIA
  "reforma_top": "5544332211",        // ← Cole o ID aqui
  "reforma_mid": "6677889900",        // ← Cole o ID aqui
  "reforma_bottom": "9988776655",     // ← Cole o ID aqui
  
  // SIDEBAR
  "sidebar_sticky": "1231231234",     // ← Cole o ID aqui
  "right_sidebar_1": "4564564567",    // ← Cole o ID aqui
  
  // Deixe os outros vazios por enquanto
  "home_sidebar": "",
  "hub_top": "",
  // ... resto
};
```

### 4. Testar Localmente (2 minutos)

```bash
npm run dev
```

Abra: http://localhost:3000

**Verifique:**
- [ ] Anúncios aparecem (podem estar em branco inicialmente)
- [ ] Console sem erros
- [ ] Layout não quebrou

### 5. Deploy (5 minutos)

```bash
npm run build
# Se build passar, faça deploy
```

---

## 🎯 PRIORIDADE ALTA (Fazer HOJE)

### 6. Otimizar next.config.ts

**Arquivo:** `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimização de Imagens
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Performance
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  
  // Headers de Segurança e Performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### 7. Adicionar Preconnect no Layout

**Arquivo:** `src/app/layout.tsx`

Adicione dentro do `<head>` (após a linha 73):

```typescript
<head>
  {/* Preconnect para recursos externos */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
  <link rel="dns-prefetch" href="https://www.google-analytics.com" />
</head>
```

**IMPORTANTE:** Como você está usando App Router, adicione isso criando um componente `PreconnectLinks.tsx`:

**Novo arquivo:** `src/components/layout/PreconnectLinks.tsx`

```typescript
export default function PreconnectLinks() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    </>
  );
}
```

E importe no `layout.tsx`:

```typescript
import PreconnectLinks from "@/components/layout/PreconnectLinks";

// Dentro do <head> (implícito no Next.js 15)
export const metadata: Metadata = {
  // ... seu metadata atual
  other: {
    'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_ID || '',
  }
};
```

---

## 📊 PRIORIDADE MÉDIA (Fazer esta semana)

### 8. Adicionar Breadcrumb Schema

**Criar arquivo:** `src/utils/breadcrumb-schema.ts`

```typescript
export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.url && { "item": `https://mestredascontas.com.br${item.url}` })
    }))
  };
}
```

**Usar nas páginas:**

```typescript
// Exemplo: src/app/financeiro/reforma-tributaria/page.tsx
import { generateBreadcrumbSchema } from '@/utils/breadcrumb-schema';

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Financeiro", url: "/financeiro" },
  { name: "Reforma Tributária" }
]);

// Adicionar no JSON-LD existente
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbSchema,
    // ... seus schemas existentes
  ]
};
```

### 9. Otimizar Meta Descriptions

**Padrão atual:**
```typescript
description: "Simplifique sua vida financeira. Calculadoras gratuitas, precisas e atualizadas para 2026."
```

**Padrão otimizado (com CTA):**
```typescript
description: "✓ Calculadoras gratuitas e precisas ✓ Sem cadastro ✓ Resultados instantâneos → Calcule agora seu salário líquido, rescisão, férias e mais. Atualizado 2026."
```

**Aplicar em:**
- [ ] Home
- [ ] Reforma Tributária
- [ ] Rescisão
- [ ] Férias
- [ ] Salário Líquido
- [ ] Todas as páginas principais

### 10. Criar Sitemap de Imagens

**Novo arquivo:** `src/app/image-sitemap.xml/route.ts`

```typescript
import { MetadataRoute } from 'next';

export async function GET() {
  const images: MetadataRoute.Sitemap = [
    {
      url: 'https://mestredascontas.com.br/opengraph-image',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Adicione outras imagens importantes
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${images.map(img => `
        <url>
          <loc>${img.url}</loc>
          <image:image>
            <image:loc>${img.url}</image:loc>
          </image:image>
        </url>
      `).join('')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

---

## 🔍 VERIFICAÇÃO PÓS-DEPLOY

### Checklist de Validação

1. **AdSense**
   - [ ] Anúncios carregando
   - [ ] Sem erros no console
   - [ ] Formato responsivo funcionando

2. **SEO**
   - [ ] Sitemap acessível: `/sitemap.xml`
   - [ ] Robots.txt acessível: `/robots.txt`
   - [ ] ads.txt acessível: `/ads.txt`
   - [ ] Meta tags presentes (view source)

3. **Performance**
   - [ ] Lighthouse Score > 90
   - [ ] LCP < 2.5s
   - [ ] CLS < 0.1

4. **Analytics**
   - [ ] Google Analytics rastreando
   - [ ] Eventos de consentimento funcionando

### Ferramentas de Teste

```bash
# Lighthouse (Chrome DevTools)
# F12 → Lighthouse → Generate Report

# PageSpeed Insights
# https://pagespeed.web.dev/

# Google Search Console
# https://search.google.com/search-console
```

---

## 📈 MONITORAMENTO (Primeiros 7 dias)

### Métricas Diárias

| Métrica | Onde Ver | Meta |
|---------|----------|------|
| Impressões de Anúncios | AdSense Dashboard | > 100/dia |
| RPM | AdSense Dashboard | > R$ 2,00 |
| CTR | AdSense Dashboard | > 0.5% |
| Pageviews | Google Analytics | Crescente |
| Bounce Rate | Google Analytics | < 60% |

### Ajustes Rápidos

**Se RPM baixo (<R$ 2):**
- Testar outras posições de anúncios
- Aumentar densidade (até 3 por página)
- Verificar viewability

**Se CTR baixo (<0.5%):**
- Mudar cores dos anúncios
- Testar formatos diferentes
- Melhorar posicionamento

**Se Bounce Rate alto (>70%):**
- Melhorar velocidade da página
- Adicionar links internos
- Revisar conteúdo

---

## 🎯 PRÓXIMOS PASSOS (Semana 2)

1. **Conteúdo SEO**
   - Criar 5 novos artigos/guias
   - Otimizar páginas existentes
   - Adicionar mais pSEO

2. **Link Building**
   - Submeter em diretórios
   - Guest posts
   - Parcerias

3. **Otimização de Conversão**
   - A/B test de anúncios
   - Heatmaps (Hotjar)
   - Melhorar CTAs

4. **Expansão**
   - Novas calculadoras
   - Mais ferramentas
   - Blog/Notícias

---

## 💡 DICAS FINAIS

### ✅ FAÇA
- Monitore diariamente (primeiros 7 dias)
- Teste diferentes posições
- Mantenha qualidade do conteúdo
- Responda comentários/feedback

### ❌ NÃO FAÇA
- Clicar nos próprios anúncios
- Pedir cliques
- Colocar muitos anúncios (>4 por página)
- Comprar tráfego fake

---

## 📞 SUPORTE

**Problemas com AdSense:**
- [Central de Ajuda](https://support.google.com/adsense)
- [Fórum da Comunidade](https://support.google.com/adsense/community)

**Problemas Técnicos:**
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)

---

**Boa sorte com a monetização! 🚀💰**

*Última atualização: 28/01/2026*
