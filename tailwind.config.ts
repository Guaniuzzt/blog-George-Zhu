import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'Inter',
          '-apple-system',
          'PingFang SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
        serif: ['var(--font-serif)', 'Songti SC', 'STSong', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-serif)', 'Songti SC', 'STSong', 'serif'],
      },
      colors: {
        ink: 'var(--text-primary)',
        mute: 'var(--text-secondary)',
        faint: 'var(--text-muted)',
        line: 'var(--border-color)',
        paper: 'var(--bg-primary)',
        card: 'var(--card-bg)',
        accent: 'var(--accent)',
        accentSoft: 'var(--accent-soft)',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      backgroundImage: {
        grid: 'linear-gradient(var(--dot-color) 1px, transparent 1px), linear-gradient(90deg, var(--dot-color) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-sm': '40px 40px',
        'grid-lg': '80px 80px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        typewriter: 'typewriter 2s steps(20) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
