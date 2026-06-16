'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Truck,
  Package,
  Users,
  TrendingUp,
  Activity,
  Ship,
  MapPin,
  ArrowRight,
  Zap,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { METRICS } from '../lib/data'

// Heavy / browser-only visuals are loaded client-side to keep SSR clean.
const ThreeShip = dynamic(() => import('../components/ThreeShip'), {
  ssr: false,
  loading: () => <SkeletonBox label="Booting 3D engine…" height={340} />,
})
const ShipMap = dynamic(() => import('../components/ShipMap'), {
  ssr: false,
  loading: () => <SkeletonBox label="Loading live map…" height={440} />,
})
const StockChart = dynamic(() => import('../components/StockChart'), { ssr: false })
const CategoryBars = dynamic(() => import('../components/CategoryBars'), { ssr: false })
const OrderForm = dynamic(() => import('../components/OrderForm'), { ssr: false })

function SkeletonBox({ label, height }: { label: string; height: number }) {
  return (
    <div
      className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-panelSoft animate-pulseGlow"
      style={{ height }}
    >
      <span className="text-sm text-white/50">{label}</span>
    </div>
  )
}

const metricIcons: Record<string, typeof Truck> = {
  ships: Truck,
  stock: Package,
  pharmacies: Users,
  roi: TrendingUp,
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <main className="aurora-bg min-h-screen text-white">
      <div className="grid-overlay">
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
          {/* ───────────── Nav ───────────── */}
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-neonGreen to-neonBlue shadow-neon">
                <Ship size={22} className="text-black" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="neon-text text-2xl font-black tracking-tight text-neonGreen">
                  PHARMALINK
                </span>
                <span className="neon-text text-2xl font-black tracking-tight text-neonBlue">
                  TZ
                </span>
              </div>
            </div>
            <div className="hidden items-center gap-6 text-sm text-white/70 md:flex">
              <a href="#tracking" className="hover:text-white">Live Tracking</a>
              <a href="#analytics" className="hover:text-white">Analytics</a>
              <a href="#order" className="hover:text-white">Order</a>
            </div>
            <Button variant="primary" size="sm">
              Order Stock <ArrowRight size={16} />
            </Button>
          </nav>

          {/* ───────────── Hero ───────────── */}
          <section className="mt-14 grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <Badge tone="green">
                <span className="h-2 w-2 animate-pulseGlow rounded-full bg-neonGreen" />
                Live across East Africa
              </Badge>
              <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                Tanzania&apos;s pharmacies.{' '}
                <span className="neon-text text-neonGreen">East Africa&apos;s</span>{' '}
                <span className="neon-text text-neonBlue">supply chain.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-white/70">
                One platform to order medicine stock, track cargo ships across
                East African ports in real time, and watch live pharmacy
                inventory analytics — built to scale a continent&apos;s health
                supply.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  <Zap size={18} /> Start Ordering
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToId('tracking')}>
                  <MapPin size={18} /> Track Ships Live
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Card className="overflow-hidden shadow-neon">
                <CardContent className="p-3">
                  <ThreeShip />
                  <div className="flex items-center justify-center gap-2 pb-2 pt-3 text-sm font-semibold text-neonBlue">
                    <Ship size={16} /> LIVE 3D CARGO VESSEL — DAR ES SALAAM PORT
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </section>

          {/* ───────────── Metrics ───────────── */}
          <section className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {METRICS.map((m, i) => {
              const Icon = metricIcons[m.key]
              const isBlue = m.accent === 'blue'
              return (
                <motion.div
                  key={m.key}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <Icon
                        size={34}
                        className={isBlue ? 'text-neonBlue' : 'text-neonGreen'}
                      />
                      <div className="mt-4 text-3xl font-black">
                        {m.value}
                        {'unit' in m && m.unit ? (
                          <span className="ml-1 text-base font-medium text-white/50">
                            {m.unit}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-1 text-sm text-white/60">{m.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </section>

          {/* ───────────── Live tracking ───────────── */}
          <section id="tracking" className="mt-20">
            <SectionTitle
              icon={<MapPin size={18} className="text-neonBlue" />}
              eyebrow="REAL-TIME"
              title="Live ship tracking across East African ports"
              subtitle="Vessels carrying medicine stock, updated continuously across Dar es Salaam, Zanzibar, Tanga & Mombasa."
            />
            <div className="mt-6 grid gap-6 lg:grid-cols-5">
              <Card className="overflow-hidden lg:col-span-3">
                <ShipMap />
              </Card>
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity size={18} className="text-neonGreen" /> Fleet status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: 'MV Dar Medicine', s: 'Docking', t: 'green' as const, c: 'Antibiotics · 240k' },
                    { name: 'MV Mombasa Cargo', s: 'En Route', t: 'blue' as const, c: 'Vaccines · 180k' },
                    { name: 'MV Zanzibar Star', s: 'Unloading', t: 'green' as const, c: 'Painkillers · 150k' },
                    { name: 'MV Serengeti Health', s: 'En Route', t: 'blue' as const, c: 'IV Fluids · 90k' },
                  ].map((f) => (
                    <div
                      key={f.name}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-panelSoft/60 px-4 py-3"
                    >
                      <div>
                        <div className="text-sm font-semibold">{f.name}</div>
                        <div className="text-xs text-white/50">{f.c}</div>
                      </div>
                      <Badge tone={f.t}>{f.s}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ───────────── Analytics ───────────── */}
          <section id="analytics" className="mt-20">
            <SectionTitle
              icon={<TrendingUp size={18} className="text-neonGreen" />}
              eyebrow="ANALYTICS"
              title="Live stock levels that make the case"
              subtitle="Weekly inventory trends across flagship pharmacies and per-category stock health."
            />
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Stock trend — flagship pharmacies</CardTitle>
                </CardHeader>
                <CardContent>
                  <StockChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Stock health by category</CardTitle>
                </CardHeader>
                <CardContent>
                  <CategoryBars />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ───────────── Order ───────────── */}
          <section id="order" className="mt-20">
            <SectionTitle
              icon={<Package size={18} className="text-neonBlue" />}
              eyebrow="ONE-CLICK"
              title="Instant medicine order"
              subtitle="Choose a medicine, set quantity, pick an East African supplier — ship in minutes."
            />
            <Card className="mt-6">
              <CardContent className="p-6 md:p-8">
                <OrderForm />
              </CardContent>
            </Card>
          </section>

          {/* ───────────── Footer ───────────── */}
          <footer className="mt-20 border-t border-white/10 pt-8 text-center text-sm text-white/40">
            <p>
              PharmaLink TZ · Built with Next.js + Tamagui + shadcn/ui · Three.js
              · Recharts · Leaflet
            </p>
            <p className="mt-1">
              Connecting Tanzania&apos;s pharmacies to East Africa&apos;s medicine
              supply chain.
            </p>
          </footer>
        </div>
      </div>
    </main>
  )
}

function SectionTitle({
  icon,
  eyebrow,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/50">
        {icon}
        {eyebrow}
      </div>
      <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-white/60">{subtitle}</p>
    </motion.div>
  )
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
