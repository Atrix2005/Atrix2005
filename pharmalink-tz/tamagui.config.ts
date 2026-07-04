import { config as base } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'

// PharmaLink TZ theme — Three.js-inspired neon: pure black base,
// emerald green + electric blue accents.
const brand = {
  background: '#0A0A0A',
  backgroundHover: '#141414',
  backgroundPress: '#0A0A0A',
  backgroundFocus: '#141414',
  backgroundStrong: '#111111',
  backgroundSoft: '#1A1A1A',
  color: '#FFFFFF',
  colorHover: '#FFFFFF',
  colorPress: '#E5E7EB',
  colorFocus: '#FFFFFF',
  borderColor: '#222222',
  borderColorHover: '#2E2E2E',
  borderColorPress: '#222222',
  borderColorFocus: '#10B981',
  placeholderColor: '#6B7280',
  primary: '#10B981',
  primaryHover: '#34D399',
  accent: '#00D4FF',
  accentHover: '#67E8F9',
  shadowColor: 'rgba(16, 185, 129, 0.4)',
  shadowColorHover: 'rgba(0, 212, 255, 0.5)',
}

export const config = createTamagui({
  ...base,
  themes: {
    ...base.themes,
    dark: {
      ...base.themes.dark,
      ...brand,
    },
    // make the app default ("light") also render dark so SSR is consistent
    light: {
      ...base.themes.dark,
      ...brand,
    },
  },
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
