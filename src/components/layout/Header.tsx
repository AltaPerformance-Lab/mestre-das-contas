"use client";

import React from "react";
import Link from "next/link";
import { Calculator, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription, // <--- IMPORTADO AQUI
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
            <Calculator size={20} strokeWidth={2.5} />
          </div>
          <span className="font-extrabold text-lg md:text-xl text-slate-900 tracking-tight">
            Conta<span className="text-blue-600">Rápida</span>
          </span>
        </Link>

        {/* 2. MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="/trabalhista" className="hover:text-blue-600 transition-colors">Trabalhista</Link>
          <Link href="/financeiro" className="hover:text-blue-600 transition-colors">Financeiro</Link>
          <Link href="/saude" className="hover:text-blue-600 transition-colors">Saúde</Link>
          <Link href="/conversor" className="hover:text-blue-600 transition-colors">Conversores</Link>
        </nav>

        {/* 3. BUSCA DESKTOP */}
        <div className="hidden lg:flex items-center w-full max-w-xs ml-4">
            <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input 
                  type="search" 
                  placeholder="Buscar..." 
                  className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all rounded-full" 
                />
            </div>
        </div>

        {/* 4. MENU MOBILE */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2 text-slate-700 hover:bg-slate-100 hover:text-blue-600">
                <Menu size={28} />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-bold text-xl text-left">
                  <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                    <Calculator size={18} /> 
                  </div>
                  ContaRápida
                </SheetTitle>
                {/* CORREÇÃO DO ALERTA DE ACESSIBILIDADE ABAIXO */}
                <SheetDescription className="sr-only">
                  Menu de navegação principal com categorias de calculadoras.
                </SheetDescription>
              </SheetHeader>
              
              <div className="flex flex-col gap-6 mt-8">
                {/* Busca Mobile */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input type="search" placeholder="O que deseja calcular?" className="pl-10 h-12 bg-slate-50" />
                </div>
                
                <nav className="flex flex-col gap-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Categorias</h3>
                    {[
                      { label: "Trabalhista", icon: "💼", href: "/trabalhista" },
                      { label: "Financeiro", icon: "💰", href: "/financeiro" },
                      { label: "Saúde", icon: "❤️", href: "/saude" },
                      { label: "Conversores", icon: "🔄", href: "/conversor" },
                    ].map((item) => (
                      <Link 
                        key={item.href}
                        href={item.href} 
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all active:scale-95"
                      >
                        <span>{item.icon}</span> {item.label}
                      </Link>
                    ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-slate-100">
                   <p className="text-xs text-center text-slate-400">
                     © {new Date().getFullYear()} ContaRápida App
                   </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}