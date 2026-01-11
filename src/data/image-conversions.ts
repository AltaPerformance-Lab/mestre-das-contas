export interface ConversionData {
  slug: string;
  from: string; // Formato original (ex: WebP)
  to: string;   // Formato destino (ex: PNG)
  title: string;
  desc: string;
  painPoint: string; // "O Photoshop não abre WebP..."
  benefit: string;   // "Transparência total e qualidade máxima..."
}

export const conversionData: ConversionData[] = [
  {
    slug: "webp-para-png",
    from: "WEBP",
    to: "PNG",
    title: "Converter WebP para PNG (Fundo Transparente)",
    desc: "Transforme imagens WebP do Google em arquivos PNG compatíveis com Photoshop e Office. Mantém a transparência.",
    painPoint: "Você baixou uma imagem do Google, mas ela veio como .webp e seu editor de fotos não abre? É frustrante.",
    benefit: "O PNG é o formato universal para design. Ele suporta transparência (fundo invisível) e não perde qualidade ao salvar várias vezes."
  },
  {
    slug: "jpg-para-png",
    from: "JPG",
    to: "PNG",
    title: "Converter JPG para PNG Grátis",
    desc: "Converta fotos JPG para PNG de alta qualidade. Ideal para criar logos, ícones e gráficos digitais.",
    painPoint: "O JPG gera 'ruído' (sujeira) ao redor de textos e linhas finas devido à compressão.",
    benefit: "Ao converter para PNG, você para de perder qualidade. É o formato ideal para preservar textos nítidos e bordas limpas."
  },
  {
    slug: "png-para-jpg",
    from: "PNG",
    to: "JPG",
    title: "Converter PNG para JPG (Mais Leve)",
    desc: "Reduza o tamanho das suas imagens transformando PNGs pesados em arquivos JPG leves e compatíveis.",
    painPoint: "Arquivos PNG podem ser gigantescos (5MB+), deixando seu site lento ou ocupando espaço no celular.",
    benefit: "O JPG é o rei da compressão. Você consegue reduzir o tamanho do arquivo em até 80% mantendo uma qualidade visual excelente para fotos."
  },
  {
    slug: "heic-para-jpg",
    from: "HEIC",
    to: "JPG",
    title: "Converter HEIC (iPhone) para JPG",
    desc: "Transforme as fotos do seu iPhone (HEIC) em JPGs que abrem no Windows e Android.",
    painPoint: "O formato HEIC da Apple é ótimo, mas o Windows e muitos sites ainda não aceitam. Você tenta enviar e dá erro.",
    benefit: "Universalidade. O JPG abre em qualquer geladeira com tela. Converta suas fotos do iOS para compartilhar sem dor de cabeça."
  },
  {
    slug: "png-para-webp",
    from: "PNG",
    to: "WEBP",
    title: "Converter PNG para WebP (SEO)",
    desc: "Otimize seu site. Converta imagens PNG para WebP e faça suas páginas carregarem muito mais rápido.",
    painPoint: "O Google PageSpeed reclama de 'Imagens de próxima geração'? É porque você ainda usa PNG/JPG antigos.",
    benefit: "O WebP é o formato do futuro. Ele oferece a mesma qualidade/transparência do PNG, mas com um arquivo 30% a 50% menor."
  },
  {
    slug: "avif-para-jpg",
    from: "AVIF",
    to: "JPG",
    title: "Converter AVIF para JPG",
    desc: "Baixou uma imagem AVIF e nada abre? Converta para JPG clássico instantaneamente.",
    painPoint: "O AVIF é super moderno, mas editores antigos e redes sociais ainda não entendem o que é esse arquivo.",
    benefit: "Volte para o básico seguro. O JPG garante que sua imagem será visualizada por qualquer pessoa, em qualquer dispositivo."
  }
];