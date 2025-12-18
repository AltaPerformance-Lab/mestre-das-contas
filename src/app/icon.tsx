import { ImageResponse } from 'next/og'

// Configurações do ícone
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Geração da imagem
export default function Icon() {
  return new ImageResponse(
    (
      // Container Azul (Estilo App)
      <div
        style={{
          fontSize: 20,
          background: '#2563EB', // Cor blue-600 do Tailwind
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px', // Bordas arredondadas (estilo iOS)
        }}
      >
        {/* Ícone de Calculadora (SVG simplificado) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <line x1="8" x2="16" y1="6" y2="6" />
          <path d="M16 14h.01" />
          <path d="M12 14h.01" />
          <path d="M8 14h.01" />
          <path d="M16 18h.01" />
          <path d="M12 18h.01" />
          <path d="M8 18h.01" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}