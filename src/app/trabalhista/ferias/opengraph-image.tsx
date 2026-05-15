import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Calculadora de Férias | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #172554, #1e3a8a)',
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
            bottom: 40,
            right: 40,
            background: '#fbbf24',
            color: '#78350f',
            padding: '10px 24px',
            borderRadius: '100px',
            fontSize: 24,
            fontWeight: 900,
        }}>
            Com 1/3 e Abono
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 100, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-5px' }}>
                Cálculo de Férias
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '8px' }}>
                Mestre das Contas
            </div>
        </div>

        <div style={{ fontSize: 32, color: '#bfdbfe', marginTop: '30px', textAlign: 'center', maxWidth: '80%' }}>
            Planeje seu descanso. Saiba exatamente quanto vai receber nas suas próximas férias.
        </div>
      </div>
    ),
    { ...size }
  )
}
