import { ImageResponse } from 'next/og'

// Configurações da imagem (Padrão de redes sociais)
export const runtime = 'edge' // Gera mais rápido na borda
export const alt = 'Mestre das Contas - Calculadoras Online'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Geração da Imagem
export default async function Image() {
  return new ImageResponse(
    (
      // Container Principal (Fundo Azul)
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2563EB', // Mesma cor blue-600 do ícone
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Ícone de Calculadora (Versão Gigante) */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor" // Usa a cor do texto (white)
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginBottom: 40 }}
        >
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <line x1="8" x2="16" y1="6" y2="6" />
          <path d="M16 14h.01" />
          <path d="M12 14h.01" />
          <path d="M8 14h.01" />
          <path d="M16 18h.01" />
          <path d="M12 18h.01" />
          <path d="M8 18h.01" />
        </svg>

        {/* Título Principal */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            textAlign: 'center',
          }}
        >
          Mestre das Contas
        </div>

        {/* Subtítulo / Tagline */}
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            fontWeight: 400,
            opacity: 0.8, // Um pouco mais transparente
            textAlign: 'center',
          }}
        >
          Calculadoras Trabalhistas e Financeiras
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}