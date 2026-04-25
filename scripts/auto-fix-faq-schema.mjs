import fs from 'fs';
import path from 'path';

const dir = './src/app';

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles(dir);
let fixedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Regex para pegar o bloco FAQPage
  // Pega opcionalmente a vírgula antes, e todo o objeto FAQPage
  const faqSchemaRegex = /(,\s*)?\{\s*"@type"\s*:\s*"FAQPage"[\s\S]*?"mainEntity"\s*:\s*\[[\s\S]*?\]\s*\}(,)?/g;
  
  if (!faqSchemaRegex.test(content)) return; // Não tem FAQ Schema

  // Extrair perguntas do HTML (assumindo estrutura <details><summary>...<p>...)
  const htmlFaqs = [];
  // Usa um regex guloso mas restrito para pegar summary e o proximo <p>
  const detailsRegex = /<summary[^>]*>([\s\S]*?)<\/summary>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
  
  let match;
  while ((match = detailsRegex.exec(content)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').replace(/▼/g, '').trim().replace(/"/g, "'");
    const answer = match[2].replace(/<[^>]+>/g, '').trim().replace(/"/g, "'");
    
    if (question && answer) {
        htmlFaqs.push({ question, answer });
    }
  }

  let newContent = content;

  if (htmlFaqs.length === 0) {
      // Se não tem FAQ no HTML, removemos do Schema
      newContent = content.replace(faqSchemaRegex, (fullMatch, p1, p2) => {
          // Se tinha virgula antes e depois, mantem uma virgula. Senao tira.
          if (p1 && p2) return ',';
          return '';
      });
      console.log(`✅ [FIXED] Removido FAQPage vazio de: ${file}`);
      fixedCount++;
  } else {
      // Cria a nova string do FAQPage baseada no HTML
      let newFaqString = `{\n      "@type": "FAQPage",\n      "mainEntity": [\n`;
      
      htmlFaqs.forEach((faq, index) => {
          newFaqString += `        { "@type": "Question", "name": "${faq.question}", "acceptedAnswer": { "@type": "Answer", "text": "${faq.answer}" } }`;
          if (index < htmlFaqs.length - 1) newFaqString += ',\n';
      });
      newFaqString += `\n      ]\n    }`;

      // Substitui o antigo pelo novo
      newContent = content.replace(faqSchemaRegex, (fullMatch, p1, p2) => {
          return (p1 || '') + newFaqString + (p2 || '');
      });
      
      // Se houve alteração de fato
      if (newContent !== content) {
          console.log(`✅ [FIXED] Sincronizado FAQPage (${htmlFaqs.length} itens) em: ${file}`);
          fixedCount++;
      }
  }

  if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf-8');
  }
});

console.log(`\nMutirão concluído. ${fixedCount} arquivos corrigidos automaticamente.`);
