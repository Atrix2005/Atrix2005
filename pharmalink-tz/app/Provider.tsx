'use client'

import { ReactNode } from 'react'
import { TamaguiProvider } from 'tamagui'
import config from '../tamagui.config'

export function Provider({ children }: { children: ReactNode }) {
  return (
    <TamaguiProvider config={config} defaultTheme="dark" disableInjectCSS={false}>
      {children}
    </TamaguiProvider>
  )
}
