import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Financeiro | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #064e3b, #022c22)', // Emerald-900 to Emerald-950
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Category Icon Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#10b981', // Emerald-500
            borderRadius: '32px',
            width: '140px',
            height: '140px',
            marginBottom: '40px',
            boxShadow: '0 20px 50px rgba(16, 185, 129, 0.3)',
          }}
        >
          {/* Landmark / Bank Icon SVG */}
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
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>

        {/* Title */}
        <div style={{ fontSize: 80, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-3px' }}>
          Financeiro
        </div>

        {/* Brand */}
        <div style={{ fontSize: 32, fontWeight: 700, color: '#10b981', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '4px' }}>
          Mestre das Contas
        </div>

        {/* Description */}
        <div style={{ fontSize: 34, color: '#a7f3d0', textAlign: 'center', maxWidth: '85%', lineHeight: 1.4 }}>
          Juros Compostos, Financiamentos e Investimentos Simplicados
        </div>
      </div>
    ),
    { ...size }
  )
}
