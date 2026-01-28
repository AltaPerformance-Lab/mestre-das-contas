interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  category?: string;
  image?: string;
}

export default function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  authorName = "Equipe Mestre das Contas",
  category = "Finance",
  image
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title.substring(0, 110), // Limitado para SEO
    "description": description,
    "image": image ? [image] : ["https://mestredascontas.com.br/opengraph-image.png"],
    "datePublished": datePublished,
    "dateModified": dateModified || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": "https://mestredascontas.com.br/sobre"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mestre das Contas",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mestredascontas.com.br/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": typeof window !== 'undefined' ? window.location.href : "https://mestredascontas.com.br"
    },
    "articleSection": category
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
