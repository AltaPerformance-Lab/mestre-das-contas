import { ImageResponse } from 'next/og';

export type OgTemplateProps = {
    title: string;
    subtitle: string;
    category: string;
    theme: 'blue' | 'emerald' | 'purple' | 'rose' | 'slate' | 'amber';
};

const themes = {
    blue: {
        gradient: 'linear-gradient(to bottom right, #1e3a8a, #172554)', // Blue-900 -> Blue-950
        accent: '#3b82f6', // Blue-500
        text: '#bfdbfe', // Blue-200
    },
    emerald: {
        gradient: 'linear-gradient(to bottom right, #064e3b, #065f46)', // Emerald-900 -> Emerald-800
        accent: '#10b981', // Emerald-500
        text: '#d1fae5', // Emerald-200
    },
    purple: {
        gradient: 'linear-gradient(to bottom right, #581c87, #3b0764)', // Purple-900 -> Purple-950
        accent: '#a855f7', // Purple-500
        text: '#e9d5ff', // Purple-200
    },
    rose: {
        gradient: 'linear-gradient(to bottom right, #881337, #4c0519)', // Rose-900 -> Rose-950
        accent: '#f43f5e', // Rose-500
        text: '#fecdd3', // Rose-200
    },
    amber: {
        gradient: 'linear-gradient(to bottom right, #78350f, #451a03)', // Amber-900 -> Amber-950
        accent: '#f59e0b', // Amber-500
        text: '#fde68a', // Amber-200
    },
    slate: {
        gradient: 'linear-gradient(to bottom right, #0f172a, #020617)', // Slate-900 -> Slate-950
        accent: '#94a3b8', // Slate-400
        text: '#e2e8f0', // Slate-200
    }
};

export default function OgTemplate({ title, subtitle, category, theme = 'blue' }: OgTemplateProps) {
    const t = themes[theme];

    return new ImageResponse(
        (
            <div
                style={{
                    background: t.gradient,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Background Pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
                    backgroundSize: '60px 60px',
                }} />

                {/* Badge */}
                <div style={{
                    background: t.accent,
                    color: '#fff',
                    padding: '6px 20px',
                    borderRadius: '50px',
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    marginBottom: '30px',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                }}>
                    {category}
                </div>

                {/* Main Title */}
                <div style={{
                    fontSize: 72,
                    fontWeight: 900,
                    color: 'white',
                    marginBottom: '16px',
                    letterSpacing: '-2px',
                    textAlign: 'center',
                    lineHeight: 1.0,
                    textShadow: '0 4px 10px rgba(0,0,0,0.4)',
                    maxWidth: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    {title}
                </div>

                {/* Subtitle */}
                <div style={{
                    fontSize: 28,
                    color: t.text,
                    marginTop: '10px',
                    textAlign: 'center',
                    maxWidth: '80%',
                    fontWeight: 500,
                    opacity: 0.9,
                }}>
                    {subtitle}
                </div>

                {/* Footer Brand */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    opacity: 0.6
                }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.accent }} />
                    <span style={{ color: 'white', fontSize: 18, fontWeight: 600, letterSpacing: '0.5px' }}>Mestre das Contas</span>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
