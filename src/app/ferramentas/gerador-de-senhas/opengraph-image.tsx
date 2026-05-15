import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Gerador de Senhas Fortes | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1e1b4b, #312e81)',
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
            <div style={{ fontSize: 100, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-5px' }}>
                Senhas Seguras
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '8px' }}>
                Mestre das Contas
            </div>
        </div>

        <div style={{ fontSize: 32, color: '#c7d2fe', marginTop: '30px', textAlign: 'center', maxWidth: '80%' }}>
            Proteja suas contas digitais com senhas fortes e aleatórias geradas localmente.
        </div>
      </div>
    ),
    { ...size }
  )
}
