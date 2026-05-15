import { ImageResponse } from 'next/og'
import { glossaryData } from '@/data/glossary'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: { slug: string }
}

export default async function Image({ params }: Props) {
  const item = glossaryData.find((i) => i.slug === params.slug)
  const term = item?.term || 'Glossário'
  const category = item?.category || 'Economia'
  const definition = item?.definition || 'Dicionário financeiro e trabalhista completo.'

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Category Badge */}
        <div style={{
            background: '#3b82f6',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '100px',
            fontSize: 22,
            fontWeight: 700,
            marginBottom: '30px',
            textTransform: 'uppercase',
            letterSpacing: '2px'
        }}>
            {category}
        </div>

        {/* Term Title */}
        <div style={{ fontSize: 90, fontWeight: 900, color: 'white', marginBottom: '20px', letterSpacing: '-4px', lineHeight: 1.1 }}>
          {term}
        </div>

        {/* Definition Preview */}
        <div style={{ fontSize: 32, color: '#94a3b8', maxWidth: '90%', lineHeight: 1.4, marginBottom: '40px' }}>
          {definition.length > 150 ? definition.substring(0, 150) + '...' : definition}
        </div>

        {/* Brand Footer */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
            <div style={{ background: '#2563eb', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/></svg>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: 'white', letterSpacing: '-1px' }}>Mestre das Contas</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
