import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Calculadora Gestacional | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #db2777, #9d174d)',
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
            <div style={{ fontSize: 90, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-4px' }}>
                Gravidez
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#fbcfe8', textTransform: 'uppercase', letterSpacing: '8px' }}>
                Mestre das Contas
            </div>
        </div>

        <div style={{ fontSize: 32, color: '#fce7f3', marginTop: '30px', textAlign: 'center', maxWidth: '80%' }}>
            Calcule sua idade gestacional e descubra a data provável do parto (DPP) agora.
        </div>
      </div>
    ),
    { ...size }
  )
}
