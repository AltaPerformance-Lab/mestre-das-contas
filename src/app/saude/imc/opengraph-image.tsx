import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Calculadora de IMC | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #4c0519, #881337)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 120, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-6px' }}>
                Calculadora IMC
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#fb7185', textTransform: 'uppercase', letterSpacing: '8px' }}>
                Mestre das Contas
            </div>
        </div>

        <div style={{ fontSize: 32, color: '#fecdd3', marginTop: '30px', textAlign: 'center', maxWidth: '80%' }}>
            Descubra seu peso ideal e monitore sua saúde com precisão científica.
        </div>
      </div>
    ),
    { ...size }
  )
}
