import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Criador de Orçamentos | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #312e81, #4338ca)',
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
                Criador Orçamentos
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '8px' }}>
                Mestre das Contas
            </div>
        </div>

        <div style={{ fontSize: 32, color: '#c7d2fe', marginTop: '30px', textAlign: 'center', maxWidth: '80%' }}>
            Gere orçamentos profissionais em PDF para seus clientes em segundos de forma gratuita.
        </div>
      </div>
    ),
    { ...size }
  )
}
