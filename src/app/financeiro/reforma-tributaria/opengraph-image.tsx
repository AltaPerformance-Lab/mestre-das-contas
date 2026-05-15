import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Reforma Tributária 2026 | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #022c22, #064e3b)',
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
            color: '#064e3b',
            padding: '10px 24px',
            borderRadius: '100px',
            fontSize: 24,
            fontWeight: 900,
        }}>
            Impacto 2026
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 90, fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-4px' }}>
                Simulador Reforma
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '8px' }}>
                Mestre das Contas
            </div>
        </div>

        <div style={{ fontSize: 32, color: '#a7f3d0', marginTop: '30px', textAlign: 'center', maxWidth: '80%' }}>
            Entenda como as novas regras de tributação afetam seu consumo e seu bolso.
        </div>
      </div>
    ),
    { ...size }
  )
}
