import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Calculadora de Salário Líquido | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1e3a8a, #2563eb)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{
            position: 'absolute',
            top: 40,
            left: 40,
            background: '#ffffff',
            color: '#1e3a8a',
            padding: '10px 24px',
            borderRadius: '100px',
            fontSize: 24,
            fontWeight: 900,
        }}>
            IRRF 2026
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 90, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-4px' }}>
                Salário Líquido
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '8px' }}>
                Mestre das Contas
            </div>
        </div>

        <div style={{ fontSize: 32, color: '#bfdbfe', marginTop: '30px', textAlign: 'center', maxWidth: '80%' }}>
            Descubra quanto cai na sua conta após todos os descontos de 2026.
        </div>
      </div>
    ),
    { ...size }
  )
}
