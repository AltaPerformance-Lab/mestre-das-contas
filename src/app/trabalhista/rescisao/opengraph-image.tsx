import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Cálculo de Rescisão | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1e3a8a, #1e40af)', // Blue-900 to Blue-800
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Badge - 100% Atualizado */}
        <div style={{
            position: 'absolute',
            top: 40,
            left: 40,
            background: '#ef4444', // Red-500
            color: 'white',
            padding: '10px 24px',
            borderRadius: '100px',
            fontSize: 24,
            fontWeight: 900,
            textTransform: 'uppercase'
        }}>
            Tabela 2026
        </div>

        {/* Title Group */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 90, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-4px' }}>
                Cálculo de Rescisão
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '8px' }}>
                Mestre das Contas
            </div>
        </div>

        <div style={{
            marginTop: '40px',
            display: 'flex',
            gap: '20px'
        }}>
             <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px 40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: 28, fontWeight: 700 }}>
                 FGTS + Multa
             </div>
             <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px 40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: 28, fontWeight: 700 }}>
                 Aviso Prévio
             </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
