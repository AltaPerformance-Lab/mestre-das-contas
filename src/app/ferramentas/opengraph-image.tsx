import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ferramentas | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #312e81, #1e1b4b)', // Indigo-900 to Indigo-950
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
            background: '#6366f1', // Indigo-500
            borderRadius: '32px',
            width: '140px',
            height: '140px',
            marginBottom: '40px',
            boxShadow: '0 20px 50px rgba(99, 102, 241, 0.3)',
          }}
        >
          {/* Wrench Icon SVG */}
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
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>

        {/* Title */}
        <div style={{ fontSize: 80, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-3px' }}>
          Ferramentas
        </div>

        {/* Brand */}
        <div style={{ fontSize: 32, fontWeight: 700, color: '#818cf8', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '4px' }}>
          Mestre das Contas
        </div>

        {/* Description */}
        <div style={{ fontSize: 34, color: '#c7d2fe', textAlign: 'center', maxWidth: '85%', lineHeight: 1.4 }}>
          QR Code, Pix, PDF, Imagens e Utilitários Digitais Gratuitos
        </div>
      </div>
    ),
    { ...size }
  )
}
