"use client";

import { useState } from "react";
import Link from "next/link";
import { glossaryData } from "@/data/glossary";
import { HelpCircle, ExternalLink } from "lucide-react";

interface GlossaryTermProps {
  slug: string;
  children: React.ReactNode;
}

export default function GlossaryTerm({ slug, children }: GlossaryTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const termData = glossaryData.find(item => item.slug === slug);

  if (!termData) {
    return <>{children}</>;
  }

  const shortTitle = termData.term.split(" (")[0];

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-0.5 border-b-2 border-dotted border-indigo-500 dark:border-indigo-400 font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-help focus:outline-none transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {children}
        <HelpCircle size={12} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
      </button>

      {isOpen && (
        <span 
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-slate-900 dark:bg-slate-950 text-white rounded-2xl shadow-xl border border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-200 not-prose"
          role="tooltip"
        >
          <span className="block font-bold text-sm text-indigo-300 mb-1 text-left">
            {shortTitle}
          </span>
          <span className="block text-xs text-slate-300 leading-relaxed mb-3 font-normal text-left">
            {termData.definition}
          </span>
          <Link 
            href={`/glossario/${slug}`}
            className="inline-flex items-center text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Saber mais <ExternalLink size={12} className="ml-1" />
          </Link>
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900 dark:border-t-slate-950" />
        </span>
      )}
    </span>
  );
}
