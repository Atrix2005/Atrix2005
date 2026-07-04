import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Provider } from './Provider'

export const metadata: Metadata = {
  title: 'PharmaLink TZ — East Africa Pharmacy Supply Network',
  description:
    'Connecting every pharmacy in Tanzania to East African suppliers. Order medicine stock, track cargo ships across East African ports in real time, and watch live pharmacy stock analytics.',
  keywords: [
    'pharmacy',
    'Tanzania',
    'East Africa',
    'medicine supply chain',
    'ship tracking',
    'PharmaLink',
  ],
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
