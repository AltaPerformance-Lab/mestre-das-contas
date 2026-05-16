"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Evita hydration mismatch (só renderiza o ícone correto no cliente)
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <span className="sr-only">Carregando tema</span>
        </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Alternar Tema"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform opacity-100 dark:-rotate-90 dark:scale-0 dark:opacity-0 text-amber-500" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100 text-slate-300" />
      <span className="sr-only">Alternar tema</span>
    </button>
  );
}
