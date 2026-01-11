"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// --- CONTEXTO PARA GERENCIAR ESTADO ---
const AccordionContext = React.createContext<{
  activeItem: string | undefined;
  toggleItem: (value: string) => void;
} | null>(null);

const AccordionItemContext = React.createContext<string | undefined>(undefined);

// --- COMPONENTE RAIZ ---
const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { type?: "single" | "multiple"; collapsible?: boolean }
>(({ className, type = "single", collapsible = true, ...props }, ref) => {
  const [activeItem, setActiveItem] = React.useState<string | undefined>(undefined);

  const toggleItem = (value: string) => {
    setActiveItem((prev) => (prev === value && collapsible ? undefined : value));
  };

  return (
    <AccordionContext.Provider value={{ activeItem, toggleItem }}>
      <div ref={ref} className={className} {...props} />
    </AccordionContext.Provider>
  )
})
Accordion.displayName = "Accordion"

// --- COMPONENTE ITEM ---
const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  return (
    <AccordionItemContext.Provider value={value}>
      <div ref={ref} className={cn("border-b", className)} {...props} />
    </AccordionItemContext.Provider>
  )
})
AccordionItem.displayName = "AccordionItem"

// --- COMPONENTE GATILHO (BOTÃO) ---
const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { activeItem, toggleItem } = React.useContext(AccordionContext)!;
  const value = React.useContext(AccordionItemContext);
  const isOpen = activeItem === value;

  return (
    <div className="flex">
      <button
        ref={ref}
        onClick={() => value && toggleItem(value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </div>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

// --- COMPONENTE CONTEÚDO ---
const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { activeItem } = React.useContext(AccordionContext)!;
  const value = React.useContext(AccordionItemContext);
  const isOpen = activeItem === value;

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all animate-in fade-in slide-in-from-top-1 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }