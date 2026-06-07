import os

replacements = {
    "text-slate-650": "text-slate-600",
    "text-slate-655": "text-slate-600",
    "text-slate-750": "text-slate-700",
    "text-slate-755": "text-slate-700",
    "dark:text-slate-350": "dark:text-slate-300",
    "dark:hover:text-slate-350": "dark:hover:text-slate-300",
    "dark:border-slate-650": "dark:border-slate-600",
    "dark:border-slate-850": "dark:border-slate-800",
    "dark:text-slate-450": "dark:text-slate-400",
}

def clean_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        return
    
    new_content = content
    for target, replacement in replacements.items():
        new_content = new_content.replace(target, replacement)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed classes in {filepath}")

def main():
    base_dir = "/home/casa/projetos/conta-rapida/src"
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                filepath = os.path.join(root, file)
                clean_file(filepath)

if __name__ == "__main__":
    main()
