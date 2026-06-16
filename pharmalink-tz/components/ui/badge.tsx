'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

const tones: Record<string, string> = {
  green: 'bg-neonGreen/15 text-neonGreenSoft border-neonGreen/40',
  blue: 'bg-neonBlue/15 text-neonBlueSoft border-neonBlue/40',
  amber: 'bg-amber-400/15 text-amber-300 border-amber-400/40',
  red: 'bg-red-500/15 text-red-300 border-red-500/40',
}

export function Badge({
  tone = 'green',
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        tones[tone],
        className
      )}
      {...props}
    />
  )
}
