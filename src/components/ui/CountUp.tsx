"use client";

import { useEffect, useState } from "react";

interface CountUpProps {
  value: number;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  separator?: string;
  decimal?: string;
}

export function CountUp({ 
  value, 
  prefix = "R$ ", 
  decimals = 2, 
  duration = 1000, 
  className = "",
  separator = ".",
  decimal = ","
}: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (easeOutQuart)
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const currentCount = startValue + (value - startValue) * ease;
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  const output = count.toFixed(decimals);
  const [int, dec] = output.split(".");
  
  // Format thousands
  const formattedInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return (
    <span className={className}>
      {prefix}{formattedInt}{decimals > 0 ? decimal + dec : ""}
    </span>
  );
}
