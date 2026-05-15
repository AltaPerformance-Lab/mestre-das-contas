const fs = require('fs');
const path = require('path');

const dir = "\\\\wsl.localhost\\Ubuntu\\home\\casa\\projetos\\conta-rapida\\src\\components\\calculators";
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    if (file === "SalaryCalculator.tsx") continue;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes('useSearchParams')) continue;

    // 1. Remove import
    content = content.replace(/import\s*{\s*useSearchParams\s*}\s*from\s*["']next\/navigation["'];?\r?\n/, '');
    
    // 2. Remove hook call
    content = content.replace(/[ \t]*const\s+searchParams\s*=\s*useSearchParams\(\);?\r?\n/, '');

    // 3. Add to useEffect where searchParams is first used.
    if (content.includes('searchParams.get')) {
        content = content.replace(
            /([ \t]*)(const\s+\w+\s*=\s*searchParams\.get\()/,
            "$1const searchParams = new URLSearchParams(window.location.search);\n$1$2"
        );
    }

    // 4. Remove from dependency array
    content = content.replace(/\[\s*searchParams\s*\]/g, '[]');
    content = content.replace(/\[\s*searchParams\s*,\s*/g, '[');
    content = content.replace(/,\s*searchParams\s*\]/g, ']');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
}
