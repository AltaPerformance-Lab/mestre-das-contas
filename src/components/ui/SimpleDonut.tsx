"use client";

import React from "react";

interface SimpleDonutProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
  thickness?: number;
}

export function SimpleDonut({ data, size = 160, thickness = 20 }: SimpleDonutProps) {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let currentAngle = 0;
  
  // Se total for 0, mostra cinza
  if (total === 0) {
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
            <circle
                cx={size / 2}
                cy={size / 2}
                r={(size - thickness) / 2}
                fill="transparent"
                stroke="#e2e8f0"
                strokeWidth={thickness}
            />
        </svg>
      )
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        {data.map((item, index) => {
          const percentage = item.value / total;
          const circumference = 2 * Math.PI * ((size - thickness) / 2);
          const strokeDasharray = `${percentage * circumference} ${circumference}`;
          const strokeDashoffset = -currentAngle * circumference; // Invertido para sentido horário correto visualmente no SVG
          
          // Avança o ângulo (percentage * 1 = total do circulo em 'turn', mas aqui usamos dashoffset logic)
          // Dashoffset funciona subtraindo do total.
          // Simplificação: SVG Circle dasharray
          
          const r = (size - thickness) / 2;
          const cx = size / 2;
          const cy = size / 2;
          
          const dashOffset = circumference - (percentage * circumference); 
          // Correção da lógica de offset acumulado
          const accumulatedPercentage = currentAngle;
          currentAngle += percentage;
            
          return (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={r}
              fill="transparent"
              stroke={item.color}
              strokeWidth={thickness}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={-accumulatedPercentage * circumference}
              className="transition-all duration-1000 ease-out"
              style={{ strokeLinecap: "round" }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Líquido</span>
          <span className="text-lg font-bold text-slate-700 dark:text-slate-200 leading-tight">
            {Math.round((data.find(d => d.label === "Líquido")?.value || 0) / total * 100)}%
          </span>
      </div>
    </div>
  );
}
