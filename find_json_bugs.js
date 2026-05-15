const fs = require('fs');
const path = require('path');

function searchFiles(dir) {
    let results = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            results = results.concat(searchFiles(fullPath));
        } else if (file.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Procura por JSON.stringify e depois procura por strings q deveriam ser templates
            if (content.includes('JSON.stringify')) {
                // regex procura por propriedades q podem ter string errada
                // exemplo: "text": "{algumaCoisa}"
                const matches = content.match(/"[^"]*":\s*"[^"]*\{[a-zA-Z]+[^"]*"/g);
                if (matches) {
                    results.push({ file: fullPath, matches });
                }
            }
        }
    }
    return results;
}

const res = searchFiles("\\\\wsl.localhost\\Ubuntu\\home\\casa\\projetos\\conta-rapida\\src\\app");
console.log(JSON.stringify(res, null, 2));
