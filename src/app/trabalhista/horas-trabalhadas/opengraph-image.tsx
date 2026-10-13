import { ImageResponse } from 'next/og'

// export const runtime = 'edge'
export const alt = 'Calculadora de Horas Trabalhadas | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1e40af, #1e3a8a)',
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
                Horas Trabalhadas
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '8px' }}>
                Mestre das Contas
            </div>
        </div>

        <div style={{ fontSize: 32, color: '#bfdbfe', marginTop: '30px', textAlign: 'center', maxWidth: '80%' }}>
            Gerencie seu banco de horas e tenha controle total sobre sua jornada laboral.
        </div>
      </div>
    ),
    { ...size }
  )
}
