import fs from 'fs';
import path from 'path';

const host = "mestredascontas.com.br";
const key = "80cc13d3735c4f4eumfumdbc7f7fec90f1";
const keyLocation = `https://${host}/${key}.txt`;
const baseUrl = `https://${host}`;

async function submitIndexNow() {
    console.log("🚀 Iniciando submissão para IndexNow...");

    const urls = new Set();

    // 1. Rotas Estáticas Principais
    const staticPaths = [
        "",
        "/financeiro/salario-liquido",
        "/financeiro/financiamento",
        "/financeiro/financiamento-veiculos",
        "/trabalhista/rescisao",
        "/trabalhista/ferias",
        "/financeiro/reajuste-aluguel",
        "/financeiro/calculadora-mei",
        "/ferramentas/conversor-imagem",
        "/ferramentas/gerador-recibo",
        "/ferramentas/gerador-orcamento",
        "/ferramentas/gerador-pedido",
        "/financeiro/reforma-tributaria"
    ];
    staticPaths.forEach(p => urls.add(`${baseUrl}${p}`));

    // 2. Rotas Dinâmicas (pSEO) dos arquivos JSON
    try {
        const dataDir = path.join(process.cwd(), 'src/data');

        // Salários
        const salarios = JSON.parse(fs.readFileSync(path.join(dataDir, 'salarios.json'), 'utf8'));
        salarios.forEach(item => urls.add(`${baseUrl}/financeiro/salario-liquido/${item.valor || item.slug}`));

        // Veículos
        const veiculos = JSON.parse(fs.readFileSync(path.join(dataDir, 'veiculos.json'), 'utf8'));
        veiculos.forEach(item => urls.add(`${baseUrl}/financeiro/financiamento-veiculos/simulacao/${item.slug}`));

        // QR Code
        const qrcode = JSON.parse(fs.readFileSync(path.join(dataDir, 'qrcode-cases.json'), 'utf8'));
        qrcode.forEach(item => urls.add(`${baseUrl}/ferramentas/gerador-qrcode/${item.slug}`));

        // Para os arquivos .ts/.tsx, vamos usar regex simples para pegar os slugs
        const tsFiles = [
            { file: 'financing-pseo.ts', prefix: '/financeiro/financiamento/' },
            { file: 'rent-pseo.ts', prefix: '/financeiro/reajuste-aluguel/' },
            { file: 'termination-pseo.ts', prefix: '/trabalhista/rescisao/' },
            { file: 'card-machine-pseo.ts', prefix: '/financeiro/maquininha/' },
            { file: 'image-conversions.ts', prefix: '/ferramentas/conversor-imagem/' },
            { file: 'receipt-cases.ts', prefix: '/ferramentas/gerador-recibo/' },
            { file: 'budget-pseo-list.tsx', prefix: '/ferramentas/gerador-orcamento/' },
            { file: 'order-pseo-list.tsx', prefix: '/ferramentas/gerador-pedido/' }
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

    // Dividir em lotes de 10.000 (limite do IndexNow)
    const chunkSize = 10000;
    for (let i = 0; i < urlList.length; i += chunkSize) {
        const chunk = urlList.slice(i, i + chunkSize);
        
        const payload = {
            host,
            key,
            keyLocation,
            urlList: chunk
        };

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
