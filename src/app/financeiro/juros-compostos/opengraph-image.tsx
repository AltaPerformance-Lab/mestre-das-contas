import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Simulador de Juros Compostos | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #064e3b, #065f46)',
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
            right: 40,
            background: '#10b981',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '100px',
            fontSize: 24,
            fontWeight: 900,
        }}>
            Padrão 2026
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 90, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-4px' }}>
                Juros Compostos
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '8px' }}>
                Mestre das Contas
            </div>
        </div>

        <div style={{ fontSize: 32, color: '#a7f3d0', marginTop: '30px', textAlign: 'center', maxWidth: '80%' }}>
            Veja o poder do tempo sobre o seu dinheiro. Simule aportes mensais e rentabilidade.
        </div>
      </div>
    ),
    { ...size }
  )
}
