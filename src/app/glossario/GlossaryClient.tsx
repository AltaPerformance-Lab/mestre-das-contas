
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, X } from 'lucide-react';
import LazyAdUnit from '@/components/ads/LazyAdUnit';

export default function GlossaryClient({ sortedData }: { sortedData: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredData = sortedData.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <>
      {/* SEARCH BAR (Functional) */}
      <div className="max-w-2xl mx-auto w-full relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
        </div>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="O que você está procurando? (Ex: FGTS, IVA...)"
          className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-rose-500 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="w-full flex justify-center py-4">
         <LazyAdUnit slot="glossary_hub_top" format="horizontal" />
      </div>

      {/* GLOSSARY GROUPS / SEARCH RESULTS */}
      <div className="space-y-12 mt-8 min-h-[400px]">
        {searchTerm ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-300">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <GlossaryCard key={item.slug} item={item} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                 <div className="inline-flex p-6 rounded-full bg-slate-100 dark:bg-slate-900 mb-4">
                    <Search size={40} className="text-slate-300" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nenhum termo encontrado</h3>
                 <p className="text-slate-500">Tente buscar por termos relacionados ou categorias.</p>
              </div>
            )}
          </div>
        ) : (
          alphabet.map(letter => {
            const termsInLetter = sortedData.filter(item => item.term.startsWith(letter));
            if (termsInLetter.length === 0) return null;

            return (
              <section key={letter} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-3xl font-black text-slate-200 dark:text-slate-800">{letter}</h2>
                  <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {termsInLetter.map((item) => (
                    <GlossaryCard key={item.slug} item={item} />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
    </>
  );
}

function GlossaryCard({ item }: { item: any }) {
  return (
    <Link 
      href={`/glossario/${item.slug}`}
      className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:shadow-xl transition-all flex flex-col h-full"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
          {item.category}
        </span>
      </div>
      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors mb-3 break-words">
        {item.term}
      </h3>
      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 flex-grow break-words">
        {item.definition}
      </p>
      <div className="flex items-center text-indigo-600 font-bold text-sm">
        Ver definição completa <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
