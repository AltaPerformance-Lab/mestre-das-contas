import fs from 'fs';
import path from 'path';

const host = "mestredascontas.com.br";
const key = "80cc13d3735c4f4eumfumdbc7f7fec90f1";
const keyLocation = `https://${host}/${key}.txt`;
const baseUrl = `https://${host}`;

async function submitIndexNow() {
    console.log("🚀 Iniciando submissão para IndexNow (Sincronizado com Sitemap)...");

    const urls = new Set();

    // 1. Tenta ler o sitemap.xml.body gerado pelo build do Next.js
    const sitemapBodyPath = path.join(process.cwd(), '.next/server/app/sitemap.xml.body');
    
    if (fs.existsSync(sitemapBodyPath)) {
        console.log("📄 Lendo URLs diretamente do sitemap.xml.body compilado...");
        try {
            const xmlContent = fs.readFileSync(sitemapBodyPath, 'utf8');
            const matches = xmlContent.matchAll(/<loc>([^<]+)<\/loc>/g);
            for (const match of matches) {
                urls.add(match[1].trim());
            }
        } catch (err) {
            console.error("⚠️ Erro ao ler sitemap.xml.body:", err.message);
        }
    }

    // 2. Fallback robusto caso o sitemap compilado não seja encontrado (ex: execução isolada)
    if (urls.size === 0) {
        console.log("⚠️ Sitemap compilado não encontrado. Usando analisador estático como fallback...");
        
        const staticPaths = [
            '', 
            '/ferramentas',
            '/ferramentas/editor-pdf-online',
            '/ferramentas/gerador-qr-code',
            '/ferramentas/gerador-pix',
            '/ferramentas/gerador-link-whatsapp',
            '/ferramentas/gerador-de-senhas',
            '/ferramentas/conversor-imagem',
            '/ferramentas/gerador-recibo',
            '/ferramentas/gerador-contrato',
            '/ferramentas/gerador-promissoria',
            '/ferramentas/quanto-cobrar',
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
            '/trabalhista/horas-simples',
            '/trabalhista/soma-de-horas',
            '/trabalhista/cartao-de-ponto',
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
            '/sobre/autor',
            '/sobre/metodologia',
            '/fale-conosco',
            '/politica-privacidade',
            '/termos-de-uso',
            '/politica-cookies',
            '/financeiro/comparador-salario',
            '/sitemap-html',
            '/para-empresas'
        ];
        staticPaths.forEach(p => urls.add(`${baseUrl}${p}`));

        try {
            const dataDir = path.join(process.cwd(), 'src/data');

            // JSONs
            const salarios = JSON.parse(fs.readFileSync(path.join(dataDir, 'salarios.json'), 'utf8'));
            salarios.forEach(item => urls.add(`${baseUrl}/financeiro/salario-liquido/${item.valor || item.slug}`));

            const veiculos = JSON.parse(fs.readFileSync(path.join(dataDir, 'veiculos.json'), 'utf8'));
            veiculos.forEach(item => urls.add(`${baseUrl}/financeiro/financiamento-veiculos/simulacao/${item.slug}`));

            const qrcode = JSON.parse(fs.readFileSync(path.join(dataDir, 'qrcode-cases.json'), 'utf8'));
            qrcode.forEach(item => urls.add(`${baseUrl}/ferramentas/gerador-qr-code/${item.slug}`));

            // Comparador pSEO
            [1000, 1412, 1500, 1800, 2000, 2200, 2500, 2800, 3000, 3200, 3500, 
             4000, 4500, 5000, 5500, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 20000, 25000, 30000, 50000].forEach(v => {
                urls.add(`${baseUrl}/financeiro/comparador-salario/${v}`);
            });

            // Arquivos de dados TS/TSX
            const tsFiles = [
                { file: 'reform-data.ts', prefix: '/financeiro/reforma-tributaria/' },
                { file: 'image-conversions.ts', prefix: '/ferramentas/conversor-imagem/' },
                { file: 'receipt-cases.ts', prefix: '/ferramentas/gerador-recibo/' },
                { file: 'budget-pseo-list.tsx', prefix: '/ferramentas/criador-orcamentos/' },
                { file: 'order-pseo-list.tsx', prefix: '/ferramentas/criador-pedidos/' },
                { file: 'contract-cases.ts', prefix: '/ferramentas/gerador-contrato/' },
                { file: 'promissory-cases.ts', prefix: '/ferramentas/gerador-promissoria/' },
                { file: 'mei-activities.ts', prefix: '/financeiro/calculadora-mei/' },
                { file: 'rent-pseo.ts', prefix: '/financeiro/reajuste-aluguel/' },
                { file: 'termination-pseo.ts', prefix: '/trabalhista/rescisao/' },
                { file: 'card-machine-pseo.ts', prefix: '/financeiro/simulador-maquininha/' },
                { file: 'financing-pseo.ts', prefix: '/financeiro/financiamento-veiculos/simulacao/' },
                { file: 'glossary.ts', prefix: '/glossario/' },
                { file: 'profissoes.ts', prefix: '/trabalhista/piso-salarial/' }
            ];

            tsFiles.forEach(({ file, prefix }) => {
                const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
                const matches = content.matchAll(/slug:\s*["']([^"']+)["']/g);
                for (const match of matches) {
                    urls.add(`${baseUrl}${prefix}${match[1]}`);
                }
            });

        } catch (error) {
            console.error("⚠️ Erro ao ler arquivos de dados no fallback:", error.message);
        }
    }

    const urlList = Array.from(urls);
    console.log(`📊 Total de URLs encontradas: ${urlList.length}`);

    if (urlList.length === 0) {
        console.log("❌ Nenhuma URL encontrada. Abortando.");
        return;
    }

    // --- 1. GERAÇÃO DO SITEMAP.XML ESTÁTICO EM public/sitemap.xml ---
    console.log("📦 Gerando sitemap.xml estático em public/sitemap.xml...");
    const lastmod = new Date().toISOString().split('T')[0];
    
    function calculatePriority(url) {
      const path = url.replace('https://mestredascontas.com.br', '');
      if (path === '') return '1.0';
      if (['/financeiro', '/trabalhista', '/saude', '/ferramentas', '/glossario', '/trabalhista/piso-salarial'].includes(path)) return '0.95';
      if (path.includes('reforma-tributaria')) return '0.90';
      if (path.includes('rescisao')) return '0.90';
      if (path.includes('salario-liquido')) return '0.90';
      if (path.includes('calculadora-mei')) return '0.85';
      if (path.includes('juros-compostos')) return '0.85';
      if (path.includes('ferias')) return '0.85';
      if (path.includes('imc')) return '0.85';
      if (path.includes('para-empresas')) return '0.80';
      if (path.includes('sobre')) return '0.70';
      return '0.65';
    }

    function getChangeFrequency(url) {
      const path = url.replace('https://mestredascontas.com.br', '');
      if (path === '') return 'daily';
      if (path.includes('reforma-tributaria') || path.includes('salario-liquido') || path.includes('financeiro')) return 'weekly';
      if (path.includes('trabalhista') || path.includes('saude') || path.includes('piso-salarial')) return 'weekly';
      return 'monthly';
    }

    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    urlList.forEach(url => {
        const priority = calculatePriority(url);
        const freq = getChangeFrequency(url);
        sitemapXml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    sitemapXml += `\n</urlset>`;

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
    console.log("✅ Sitemap estático gravado com sucesso em public/sitemap.xml");

    // --- 2. SUBMISSÃO CONDICIONAL AO INDEXNOW (APENAS VERCEL PRODUCTION OU MANUAL LOCAL) ---
    const isProduction = process.env.VERCEL_ENV === 'production' || !process.env.VERCEL;
    if (!isProduction) {
        console.log(`⚠️ Ambiente Vercel não produtivo (${process.env.VERCEL_ENV}). Submissão IndexNow ignorada para evitar bot-storming.`);
        console.log("🏁 Processo concluído com sucesso.");
        return;
    }

    console.log("🚀 Iniciando envio de URLs para a API do IndexNow...");
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
