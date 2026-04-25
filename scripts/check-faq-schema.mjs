import fs from 'fs';
import path from 'path';

const dir = './src/app';

//para você usar sempre que quiser fazer auditorias de SEO no futuro! 
// Basta rodar node scripts/check-faq-schema.mjs

// Funcao recursiva para ler todos os .tsx
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

let mismatchCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  
  // 1. Extrair Schema FAQ
  const faqSchemaRegex = /"@type"\s*:\s*"FAQPage"[\s\S]*?"mainEntity"\s*:\s*\[([\s\S]*?)\]/g;
  let schemaMatch = faqSchemaRegex.exec(content);
  
  if (!schemaMatch) return; // Não tem FAQ Schema

  // Extrair perguntas do schema
  const schemaQuestions = [];
  const questionRegex = /"name"\s*:\s*"([^"]+)"/g;
  let qMatch;
  while ((qMatch = questionRegex.exec(schemaMatch[1])) !== null) {
    schemaQuestions.push(qMatch[1].trim().toLowerCase().replace(/[^\w\s]/g, ''));
  }

  // 2. Extrair perguntas do HTML (<summary> ou tag similar)
  const htmlQuestions = [];
  const summaryRegex = /<summary[^>]*>([\s\S]*?)<\/summary>/g;
  let sMatch;
  while ((sMatch = summaryRegex.exec(content)) !== null) {
    let text = sMatch[1].replace(/<[^>]+>/g, '').replace(/▼/g, '').trim().toLowerCase().replace(/[^\w\s]/g, '');
    if (text) htmlQuestions.push(text);
  }

  // 3. Comparar
  if (htmlQuestions.length === 0 && schemaQuestions.length > 0) {
     console.log(`\n⚠️ ${file}: Schema tem ${schemaQuestions.length} perguntas, mas não achei tags <summary> visíveis.`);
     mismatchCount++;
     return;
  }

  if (schemaQuestions.length !== htmlQuestions.length) {
      console.log(`\n❌ ${file}: MISMATCH DE QUANTIDADE (${schemaQuestions.length} schema vs ${htmlQuestions.length} html)`);
      mismatchCount++;
      return;
  }

  for (let i = 0; i < schemaQuestions.length; i++) {
      if (!htmlQuestions.includes(schemaQuestions[i])) {
           const isSub = htmlQuestions.some(hq => hq.includes(schemaQuestions[i]) || schemaQuestions[i].includes(hq));
           if (!isSub) {
               console.log(`\n❌ ${file}: MISMATCH DE CONTEÚDO (Pergunta diferente)`);
               mismatchCount++;
               break; 
           }
      }
  }
});

console.log(`\n✅ Varredura concluída. ${files.length} arquivos analisados. ${mismatchCount} arquivos com possíveis divergências.`);
