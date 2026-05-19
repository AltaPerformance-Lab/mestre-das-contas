import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Tabela FIPE Oficial | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #022c22, #064e3b)', // Emerald-950 to Emerald-900
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
            background: 'rgba(52, 211, 153, 0.15)', // Emerald-400 glow
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
            background: 'linear-gradient(to bottom right, #10b981, #047857)', // Emerald-500 to Emerald-700
            borderRadius: '36px',
            width: '140px',
            height: '140px',
            marginBottom: '35px',
            boxShadow: '0 20px 40px rgba(16, 185, 129, 0.25)',
          }}
        >
          {/* Trending/Dollar Icon SVG */}
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
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>

        {/* Title */}
        <div style={{ fontSize: 76, fontWeight: 900, color: 'white', marginBottom: '8px', letterSpacing: '-2px' }}>
          Tabela FIPE Oficial
        </div>

        {/* Brand */}
        <div style={{ fontSize: 28, fontWeight: 700, color: '#34d399', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '5px' }}>
          Mestre das Contas
        </div>

        {/* Description */}
        <div style={{ fontSize: 32, color: '#a7f3d0', textAlign: 'center', maxWidth: '80%', lineHeight: 1.4 }}>
          Consulte o preço médio de carros, motos e caminhões. Valores atualizados mensalmente.
        </div>
      </div>
    ),
    { ...size }
  )
}
