"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Interface simplificada para funcionar como o Radix, mas com HTML nativo
interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: number[];
  onValueChange: (value: number[]) => void;
  max?: number;
  min?: number;
  step?: number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    
    // Calcula a porcentagem para o background colorido
    const percentage = ((value[0] - min) / (max - min)) * 100;

    return (
      <div className="relative flex w-full touch-none select-none items-center">
        <input
          type="range"
          className={cn(
            "h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => onValueChange([Number(e.target.value)])}
          ref={ref}
          {...props}
          // Estilo inline para criar o efeito de preenchimento (track)
          style={{
            background: `linear-gradient(to right, #0f172a ${percentage}%, #e2e8f0 ${percentage}%)`
          }}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }