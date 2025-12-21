import { ImageResponse } from 'next/og'

// Configurações da Imagem Social (Padrão OG)
export const runtime = 'edge'
export const alt = 'Mestre das Contas - Calculadoras Financeiras e Trabalhistas'
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
        {/* Logo Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#2563EB', // Blue-600
            borderRadius: '24px',
            width: '120px',
            height: '120px',
            marginBottom: '40px',
            boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
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

        {/* Brand Name */}
        <div style={{ fontSize: 70, fontWeight: 900, color: 'white', marginBottom: '20px', letterSpacing: '-2px' }}>
          Mestre das Contas
        </div>

        {/* Slogan */}
        <div style={{ fontSize: 32, color: '#94a3b8', textAlign: 'center', maxWidth: '80%' }}>
          Simplifique suas finanças e tome decisões melhores
        </div>
      </div>
    ),
    { ...size }
  )
}