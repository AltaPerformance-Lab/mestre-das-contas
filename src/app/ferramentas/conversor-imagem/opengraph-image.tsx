import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Conversor de Imagens',
        subtitle: 'Converta WebP, PNG, JPG e muito mais gratuitamente',
        category: 'Edição de Imagem',
        theme: 'purple'
    });
}
