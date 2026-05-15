import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Trabalhista | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1e3a8a, #172554)', // Blue-900 to Blue-950
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
            background: '#3b82f6', // Blue-500
            borderRadius: '32px',
            width: '140px',
            height: '140px',
            marginBottom: '40px',
            boxShadow: '0 20px 50px rgba(59, 130, 246, 0.3)',
          }}
        >
          {/* Briefcase Icon SVG */}
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
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </div>

        {/* Title */}
        <div style={{ fontSize: 80, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-3px' }}>
          Trabalhista
        </div>

        {/* Brand */}
        <div style={{ fontSize: 32, fontWeight: 700, color: '#60a5fa', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '4px' }}>
          Mestre das Contas
        </div>

        {/* Description */}
        <div style={{ fontSize: 34, color: '#bfdbfe', textAlign: 'center', maxWidth: '85%', lineHeight: 1.4 }}>
          Rescisão, Férias, 13º e Seguro-Desemprego 2026
        </div>
      </div>
    ),
    { ...size }
  )
}
