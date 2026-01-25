import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadora de Calorias Diárias',
        subtitle: 'Descubra sua Taxa Metabólica Basal e quanto comer para emagrecer',
        category: 'Saúde',
        theme: 'rose'
    });
}
