import { ImageResponse } from 'next/og'

// Tamanho do ícone da Apple (usualmente 180x180 para Retina)
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2563eb', // Azul App (Cor sólida para iOS)
        }}
      >
         {/* Ícone de Calculadora Simplificado e Centralizado */}
         <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" fill="white" fillOpacity="0.1" />
          <line x1="8" x2="16" y1="6" y2="6" stroke="white" strokeWidth="2"/>
          <path d="M16 14h.01" stroke="white" strokeWidth="3"/>
          <path d="M12 14h.01" stroke="white" strokeWidth="3"/>
          <path d="M8 14h.01" stroke="white" strokeWidth="3"/>
          <path d="M16 18h.01" stroke="white" strokeWidth="3"/>
          <path d="M12 18h.01" stroke="white" strokeWidth="3"/>
          <path d="M8 18h.01" stroke="white" strokeWidth="3"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
