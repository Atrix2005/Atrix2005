import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // PharmaLink TZ brand palette — black base, emerald green, electric blue
        ink: '#0A0A0A',
        panel: '#111111',
        panelSoft: '#1A1A1A',
        neonGreen: '#10B981',
        neonGreenSoft: '#34D399',
        neonBlue: '#00D4FF',
        neonBlueSoft: '#67E8F9',
      },
      boxShadow: {
        neon: '0 0 30px rgba(16,185,129,0.35), 0 0 60px rgba(0,212,255,0.15)',
        glow: '0 0 40px rgba(0,212,255,0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
