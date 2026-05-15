import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Saúde | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #881337, #4c0519)', // Rose-900 to Rose-950
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
            background: '#e11d48', // Rose-600
            borderRadius: '32px',
            width: '140px',
            height: '140px',
            marginBottom: '40px',
            boxShadow: '0 20px 50px rgba(225, 29, 72, 0.3)',
          }}
        >
          {/* Heart Icon SVG */}
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
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>

        {/* Title */}
        <div style={{ fontSize: 80, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-3px' }}>
          Saúde
        </div>

        {/* Brand */}
        <div style={{ fontSize: 32, fontWeight: 700, color: '#fb7185', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '4px' }}>
          Mestre das Contas
        </div>

        {/* Description */}
        <div style={{ fontSize: 34, color: '#fecdd3', textAlign: 'center', maxWidth: '85%', lineHeight: 1.4 }}>
          Calculadoras de IMC, Calorias, Gestação e Bem-Estar
        </div>
      </div>
    ),
    { ...size }
  )
}
