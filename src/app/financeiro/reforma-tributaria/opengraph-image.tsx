import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Calculadora da Reforma Tributária 2026 - Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #064e3b, #065f46)', // Emerald-900 to Emerald-800
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%)',
            backgroundSize: '50px 50px',
        }} />

        {/* Badge */}
        <div style={{
            background: '#10b981', // Emerald-500
            color: '#022c22', // Emerald-950
            padding: '8px 24px',
            borderRadius: '50px',
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: '2px',
            marginBottom: '30px',
            textTransform: 'uppercase',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}>
            Simulador Oficial 2026
        </div>

        {/* Main Title */}
        <div style={{ 
            fontSize: 80, 
            fontWeight: 900, 
            color: 'white', 
            marginBottom: '20px', 
            letterSpacing: '-2px',
            textAlign: 'center',
            lineHeight: 0.9,
            textShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
           <span>Reforma</span>
           <span style={{ color: '#6ee7b7' }}>Tributária</span>
        </div>

        {/* Subtitle */}
        <div style={{ 
            fontSize: 32, 
            color: '#d1fae5', 
            marginTop: '20px',
            textAlign: 'center', 
            maxWidth: '80%',
            fontWeight: 500
        }}>
          Simule o impacto do IVA Dual no seu bolso
        </div>

        {/* Footer */}
        <div style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            opacity: 0.8
        }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#34d399' }} />
            <span style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>Mestre das Contas</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
