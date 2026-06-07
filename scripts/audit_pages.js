const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/app');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const report = [];

walkDir(srcDir, filePath => {
  const relPath = path.relative(srcDir, filePath).replace(/\\/g, '/');
  
  // Apenas arquivos page.tsx (ignora APIs, layouts, templates de rota dinâmica se forem genéricos)
  if (!filePath.endsWith('page.tsx')) return;
  if (relPath.includes('api/') || relPath.startsWith('api') || relPath.startsWith('layout') || relPath.startsWith('error') || relPath.startsWith('not-found')) return;
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Se não tiver PageHeader, não é uma página de hub/calculadora padrão
  if (!content.includes('<PageHeader') && !content.includes('PageHeader')) return;

  const hasExpertSignature = content.includes('<ExpertSignature') || content.includes('ExpertSignature');
  const hasSmartGlossaryLinker = content.includes('<SmartGlossaryLinker') || content.includes('SmartGlossaryLinker');
  const hasSmartCrossLinker = content.includes('<SmartCrossLinker') || content.includes('SmartCrossLinker');
  
  // Contagem de FAQs: busca pelo array faqList ou faqs ou tags <details>
  let faqCount = 0;
  const faqListMatch = content.match(/faqList\s*=\s*\[([\s\S]*?)\];/);
  const faqsMatch = content.match(/faqs\s*=\s*\[([\s\S]*?)\];/);
  
  if (faqListMatch || faqsMatch) {
    // Conta número de objetos no array
    const arrayContent = (faqListMatch ? faqListMatch[1] : faqsMatch[1]);
    faqCount = (arrayContent.match(/\{[\s\S]*?\}/g) || []).length;
  } else {
    // Tenta contar tags <details>
    faqCount = (content.match(/<details/g) || []).length;
  }

  // Verifica tabela
  const hasHtmlTable = content.includes('<table') || content.includes('table');
  const hasMarkdownTable = content.includes('|---|') || content.includes('| --- |');

  // Verifica ordem de posicionamento
  let orderCorrect = false;
  if (hasSmartGlossaryLinker && hasSmartCrossLinker) {
    const glossaryIndex = content.indexOf('<SmartGlossaryLinker');
    const crossIndex = content.indexOf('<SmartCrossLinker');
    orderCorrect = glossaryIndex < crossIndex;
  }

  report.push({
    file: relPath,
    hasExpertSignature,
    hasSmartGlossaryLinker,
    hasSmartCrossLinker,
    faqCount,
    hasHtmlTable,
    hasMarkdownTable,
    orderCorrect
  });
});

console.log(JSON.stringify(report, null, 2));
