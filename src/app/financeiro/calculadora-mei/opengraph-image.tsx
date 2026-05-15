import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Calculadora MEI | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #065f46, #064e3b)', // Emerald-800 to Emerald-900
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Badge - Grátis e Ilimitado */}
        <div style={{
            position: 'absolute',
            top: 40,
            right: 40,
            background: '#fbbf24', // Amber-400
            color: '#78350f', // Amber-900
            padding: '10px 24px',
            borderRadius: '100px',
            fontSize: 24,
            fontWeight: 900,
            textTransform: 'uppercase'
        }}>
            Grátis e Ilimitado
        </div>

        {/* Title Group */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 90, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-4px' }}>
                Calculadora MEI
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '8px' }}>
                Mestre das Contas
            </div>
        </div>

        <div style={{
            marginTop: '40px',
            display: 'flex',
            gap: '20px'
        }}>
             <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px 40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: 28, fontWeight: 700 }}>
                 Limite 2026
             </div>
             <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px 40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: 28, fontWeight: 700 }}>
                 DAS Atualizado
             </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
