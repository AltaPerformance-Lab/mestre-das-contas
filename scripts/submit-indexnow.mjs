import fs from 'fs';
import path from 'path';

const host = "mestredascontas.com.br";
const key = "80cc13d3735c4f4eumfumdbc7f7fec90f1";
const keyLocation = `https://${host}/${key}.txt`;
const baseUrl = `https://${host}`;

async function submitIndexNow() {
    console.log("🚀 Iniciando submissão para IndexNow (Sincronizado com Sitemap)...");

    const urls = new Set();

    // 1. ROTAS ESTÁTICAS (Copiado do sitemap.ts)
    const staticPaths = [
        '', // Home
        '/ferramentas',
        '/ferramentas/editor-pdf-online',
        '/ferramentas/gerador-qr-code',
        '/ferramentas/gerador-pix',
        '/ferramentas/gerador-link-whatsapp',
        '/ferramentas/gerador-de-senhas',
        '/ferramentas/conversor-imagem',
        '/ferramentas/gerador-recibo',
        '/ferramentas/criador-orcamentos', 
        '/ferramentas/criador-pedidos',
        '/ferramentas/formatador-json',
        '/ferramentas/declaracao-conteudo',
        '/ferramentas/gerador-privacidade',
        '/ferramentas/fases-da-lua',
        '/trabalhista',
        '/trabalhista/rescisao',
        '/trabalhista/ferias',
        '/trabalhista/decimo-terceiro',
        '/trabalhista/seguro-desemprego',
        '/trabalhista/horas-extras',
        '/trabalhista/horas-trabalhadas', 
        '/financeiro',
        '/financeiro/juros-compostos',
        '/financeiro/calculadora-dias-uteis',
        '/financeiro/reforma-tributaria', 
        '/financeiro/calculadora-mei',
        '/financeiro/salario-liquido',
        '/financeiro/financiamento', 
        '/financeiro/financiamento-veiculos',
        '/financeiro/porcentagem', 
        '/financeiro/reajuste-aluguel',
        '/financeiro/simulador-maquininha',
        '/saude',
        '/saude/imc',
        '/saude/calorias-diarias',
        '/saude/gestacional', 
        '/saude/agua',
        '/sobre',
        '/fale-conosco',
        '/politica-privacidade',
        '/termos-de-uso',
        '/politica-cookies',
        '/financeiro/comparador-salario'
    ];
    staticPaths.forEach(p => urls.add(`${baseUrl}${p}`));

    // 2. Rotas Dinâmicas (pSEO)
    try {
        const dataDir = path.join(process.cwd(), 'src/data');

        // JSONs
        const salarios = JSON.parse(fs.readFileSync(path.join(dataDir, 'salarios.json'), 'utf8'));
        salarios.forEach(item => urls.add(`${baseUrl}/financeiro/salario-liquido/${item.valor || item.slug}`));

        const veiculos = JSON.parse(fs.readFileSync(path.join(dataDir, 'veiculos.json'), 'utf8'));
        veiculos.forEach(item => urls.add(`${baseUrl}/financeiro/financiamento-veiculos/simulacao/${item.slug}`));

        const qrcode = JSON.parse(fs.readFileSync(path.join(dataDir, 'qrcode-cases.json'), 'utf8'));
        qrcode.forEach(item => urls.add(`${baseUrl}/ferramentas/gerador-qr-code/${item.slug}`));

        // Comparador pSEO (Amostra)
        [1500, 2000, 3000, 5000, 10000, 15000, 20000, 50000].forEach(v => {
            urls.add(`${baseUrl}/financeiro/comparador-salario/${v}`);
        });

        // Arquivos .ts/.tsx
        const tsFiles = [
            { file: 'reform-data.ts', prefix: '/financeiro/reforma-tributaria/' },
            { file: 'image-conversions.ts', prefix: '/ferramentas/conversor-imagem/' },
            { file: 'receipt-cases.ts', prefix: '/ferramentas/gerador-recibo/' },
            { file: 'budget-pseo-list.tsx', prefix: '/ferramentas/criador-orcamentos/' },
            { file: 'order-pseo-list.tsx', prefix: '/ferramentas/criador-pedidos/' },
            { file: 'mei-activities.ts', prefix: '/financeiro/calculadora-mei/' },
            { file: 'rent-pseo.ts', prefix: '/financeiro/reajuste-aluguel/' },
            { file: 'termination-pseo.ts', prefix: '/trabalhista/rescisao/' },
            { file: 'card-machine-pseo.ts', prefix: '/financeiro/simulador-maquininha/' },
            { file: 'financing-pseo.ts', prefix: '/financeiro/financiamento/' }
        ];

        tsFiles.forEach(({ file, prefix }) => {
            const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
            const matches = content.matchAll(/slug:\s*["']([^"']+)["']/g);
            for (const match of matches) {
                urls.add(`${baseUrl}${prefix}${match[1]}`);
            }
        });

    } catch (error) {
        console.error("⚠️ Erro ao ler arquivos de dados:", error.message);
    }

    const urlList = Array.from(urls);
    console.log(`📊 Total de URLs encontradas: ${urlList.length}`);

    if (urlList.length === 0) {
        console.log("❌ Nenhuma URL encontrada. Abortando.");
        return;
    }

    // Dividir em lotes de 10.000
    const chunkSize = 10000;
    for (let i = 0; i < urlList.length; i += chunkSize) {
        const chunk = urlList.slice(i, i + chunkSize);
        const payload = { host, key, keyLocation, urlList: chunk };

        try {
            const response = await fetch("https://api.indexnow.org/indexnow", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log(`✅ Lote ${i/chunkSize + 1} enviado com sucesso (${chunk.length} URLs)!`);
            } else {
                const text = await response.text();
                console.error(`❌ Falha no envio do lote ${i/chunkSize + 1}:`, response.status, text);
            }
        } catch (error) {
            console.error(`❌ Erro de rede no lote ${i/chunkSize + 1}:`, error.message);
        }
    }
    console.log("🏁 Processo de IndexNow concluído.");
}

submitIndexNow();
