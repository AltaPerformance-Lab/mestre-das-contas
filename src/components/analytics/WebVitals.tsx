"use client";

import { useReportWebVitals } from 'next/web-vitals';

export default function WebVitals() {
  useReportWebVitals((metric: any) => {
    const { id, name, label, value } = metric;

    // Envia para o Google Analytics se estiver disponível
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, {
        event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
        value: Math.round(name === 'CLS' ? value * 1000 : value), // CLS é medido em score, outros em ms
        event_label: id,
        non_interaction: true,
      });
    }
    
    // Log em desenvolvimento para debug
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', name, value);
    }
  });

  return null;
}
