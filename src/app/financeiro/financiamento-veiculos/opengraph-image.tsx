import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Financiamento de Veículos | Mestre das Contas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #022c22, #065f46)',
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
                Crédito Veicular
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '8px' }}>
                Mestre das Contas
            </div>
        </div>

        <div style={{ fontSize: 32, color: '#a7f3d0', marginTop: '30px', textAlign: 'center', maxWidth: '80%' }}>
            Vai trocar de carro? Simule as parcelas e descubra o melhor financiamento de 2026.
        </div>
      </div>
    ),
    { ...size }
  )
}
