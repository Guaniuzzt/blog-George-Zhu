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
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Clash Display"', '"Satoshi"', 'sans-serif'],
        body: ['"Satoshi"', '"Inter"', 'sans-serif'],
      },
      colors: {
        acid: {
          50: '#f0ffe6',
          100: '#d4ffb8',
          200: '#b0ff7a',
          300: '#8aff3d',
          400: '#6dff1a',
          500: '#55e600',
          600: '#40b800',
          700: '#2e8a00',
          800: '#1f5c00',
          900: '#112e00',
        },
        neon: {
          pink: '#ff2d95',
          blue: '#00d4ff',
          purple: '#b066ff',
          green: '#39ff14',
        },
      },
      backgroundImage: {
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
        grid: 'linear-gradient(rgba(128,128,128,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-sm': '40px 40px',
        'grid-lg': '80px 80px',
      },
      animation: {
        glitch: 'glitch 0.5s ease-in-out infinite alternate',
        float: 'float 6s ease-in-out infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        marquee: 'marquee 25s linear infinite',
        typewriter: 'typewriter 2s steps(20) forwards',
        scan: 'scan 4s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseNeon: {
          '0%, 100%': {
            boxShadow:
              '0 0 5px currentColor, 0 0 20px currentColor, 0 0 40px currentColor',
          },
          '50%': {
            boxShadow:
              '0 0 10px currentColor, 0 0 40px currentColor, 0 0 80px currentColor',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        scan: {
          '0%': { top: '-5%' },
          '100%': { top: '105%' },
        },
      },
    },
  },
  plugins: [typography],
}

export default config