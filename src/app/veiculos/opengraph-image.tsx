import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Veículos & Financiamento | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0f172a, #1e293b)', // Slate-900 to Slate-800
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative background glow */}
        <div 
          style={{
            position: 'absolute',
            top: '-150px',
            right: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '250px',
            background: 'rgba(59, 130, 246, 0.15)', // Blue-500 glow
            filter: 'blur(80px)',
          }}
        />

        <div 
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '250px',
            background: 'rgba(16, 185, 129, 0.12)', // Emerald-500 glow
            filter: 'blur(80px)',
          }}
        />

        {/* Category Icon Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom right, #3b82f6, #1d4ed8)', // Blue-500 to Blue-700
            borderRadius: '36px',
            width: '140px',
            height: '140px',
            marginBottom: '35px',
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.25)',
          }}
        >
          {/* Car Icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        </div>

        {/* Title */}
        <div style={{ fontSize: 76, fontWeight: 900, color: 'white', marginBottom: '8px', letterSpacing: '-2px' }}>
          Veículos & Financiamento
        </div>

        {/* Brand */}
        <div style={{ fontSize: 28, fontWeight: 700, color: '#3b82f6', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '5px' }}>
          Mestre das Contas
        </div>

        {/* Description */}
        <div style={{ fontSize: 32, color: '#94a3b8', textAlign: 'center', maxWidth: '80%', lineHeight: 1.4 }}>
          Tabela FIPE oficial, Simulador de Parcelas SAC/Price e Emissor de Contratos
        </div>
      </div>
    ),
    { ...size }
  )
}
