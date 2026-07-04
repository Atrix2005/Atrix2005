'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Ship,
  ArrowRight,
  Rocket,
  ShieldCheck,
  Boxes,
  Radar,
  LineChart,
  Globe2,
  Pill,
  AlertTriangle,
  Clock,
  BadgeDollarSign,
  Quote,
  CheckCircle2,
  Zap,
} from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'

// ── 3D scenes (browser-only) ──────────────────────────────────────
const ThreeGlobe = dynamic(() => import('../components/ThreeGlobe'), {
  ssr: false,
  loading: () => <SceneSkeleton label="Rendering East Africa network…" height={420} />,
})
const ThreeCapsule = dynamic(() => import('../components/ThreeCapsule'), {
  ssr: false,
  loading: () => <SceneSkeleton label="Synthesizing molecule…" height={380} />,
})
const ThreeShip = dynamic(() => import('../components/ThreeShip'), {
  ssr: false,
  loading: () => <SceneSkeleton label="Booting 3D engine…" height={340} />,
})

function SceneSkeleton({ label, height }: { label: string; height: number }) {
  return (
    <div
      className="flex w-full items-center justify-center rounded-2xl border border-white/10 bg-panelSoft animate-pulseGlow"
      style={{ height }}
    >
      <span className="text-sm text-white/50">{label}</span>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
}

// ── Content data ──────────────────────────────────────────────────
const PROBLEMS = [
  {
    icon: AlertTriangle,
    stat: '1 in 3',
    label: 'Tanzanian pharmacies hit a critical stockout every month, turning patients away.',
  },
  {
    icon: Clock,
    stat: '3–6 wks',
    label: 'Typical lead time to restock imported medicine — with zero shipment visibility.',
  },
  {
    icon: ShieldCheck,
    stat: '~19%',
    label: 'Of medicine in sub-Saharan Africa is substandard or falsified (WHO estimate).',
  },
]

const STEPS = [
  {
    icon: Boxes,
    title: 'Order in one click',
    body: 'Pharmacies order verified stock from vetted East African suppliers — no brokers, no phone calls.',
  },
  {
    icon: Radar,
    title: 'Track every shipment',
    body: 'Live AIS tracking follows each cargo vessel from port to pharmacy across the region.',
  },
  {
    icon: LineChart,
    title: 'Never run dry',
    body: 'Predictive stock analytics flag shortages before they happen and auto-suggest reorders.',
  },
]

const FEATURES = [
  { icon: Globe2, title: 'Regional supply network', body: 'Connects Tanzania to Kenya, Uganda, Rwanda & Ethiopia suppliers in one marketplace.' },
  { icon: Radar, title: 'Real-time ship tracking', body: 'Live vessel positions across Dar es Salaam, Mombasa, Zanzibar & Tanga ports.' },
  { icon: LineChart, title: 'Predictive stock analytics', body: 'Per-pharmacy and per-category inventory health, forecast weeks in advance.' },
  { icon: ShieldCheck, title: 'Verified & traceable', body: 'Every batch tracked end-to-end to fight counterfeit and expired medicine.' },
  { icon: Pill, title: 'Full formulary', body: 'Antibiotics, vaccines, antimalarials, IV fluids and more — from a single dashboard.' },
  { icon: Zap, title: 'Minutes, not weeks', body: 'From reorder to dispatch in minutes with automated supplier routing.' },
]

const MARKET = [
  { value: '$7.4B', label: 'East Africa pharma market by 2028' },
  { value: '11.4%', label: 'Regional CAGR (2024–2030)' },
  { value: '12,000+', label: 'Pharmacies across Tanzania' },
  { value: '300M+', label: 'People served across East Africa' },
]

const TRACTION = [
  { value: '1,872', label: 'Pharmacies connected' },
  { value: '2.4M', label: 'Boxes ordered / week' },
  { value: '14', label: 'Ships docking today' },
  { value: '487%', label: 'Projected 18-mo ROI' },
]

const QUOTES = [
  {
    quote: 'PharmaLink turned a 4-week guessing game into a live dashboard. We haven’t had a stockout since.',
    who: 'Dr. Amina K.',
    role: 'Pharmacy Group, Dar es Salaam',
  },
  {
    quote: 'The supply-chain visibility is the moat. Whoever owns this data owns East African pharma distribution.',
    who: 'J. Mwangi',
    role: 'Health-tech Investor, Nairobi',
  },
]

export default function Landing() {
  return (
    <main className="aurora-bg min-h-screen text-white">
      <div className="grid-overlay">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* ───────────── Nav ───────────── */}
          <nav className="flex items-center justify-between py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-neonGreen to-neonBlue shadow-neon">
                <Ship size={22} className="text-black" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="neon-text text-2xl font-black tracking-tight text-neonGreen">PHARMALINK</span>
                <span className="neon-text text-2xl font-black tracking-tight text-neonBlue">TZ</span>
              </div>
            </div>
            <div className="hidden items-center gap-7 text-sm text-white/70 lg:flex">
              <a href="#problem" className="hover:text-white">Problem</a>
              <a href="#solution" className="hover:text-white">Solution</a>
              <a href="#market" className="hover:text-white">Market</a>
              <a href="#investors" className="hover:text-white">Investors</a>
            </div>
            <Link href="/dashboard">
              <Button variant="primary" size="sm">
                Launch Dashboard <ArrowRight size={16} />
              </Button>
            </Link>
          </nav>

          {/* ───────────── Hero ───────────── */}
          <section className="grid items-center gap-10 pt-8 lg:grid-cols-2 lg:pt-14">
            <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.6 }}>
              <Badge tone="green">
                <span className="h-2 w-2 animate-pulseGlow rounded-full bg-neonGreen" />
                Live across East Africa
              </Badge>
              <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
                The operating system for{' '}
                <span className="neon-text text-neonGreen">East Africa&apos;s</span>{' '}
                <span className="neon-text text-neonBlue">medicine supply.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/70 md:text-xl">
                PharmaLink TZ connects every pharmacy in Tanzania to vetted regional
                suppliers — order stock in one click, track cargo ships in real time,
                and predict shortages before they happen.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/dashboard">
                  <Button variant="primary" size="lg">
                    <Rocket size={18} /> Launch Live Dashboard
                  </Button>
                </Link>
                <a href="#investors">
                  <Button variant="outline" size="lg">
                    <BadgeDollarSign size={18} /> For Investors
                  </Button>
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/50">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-neonGreen" /> 1,872 pharmacies live</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-neonGreen" /> 4 active ports</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-neonGreen" /> Real-time AIS</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="overflow-hidden shadow-neon">
                <CardContent className="p-3">
                  <ThreeGlobe />
                  <div className="flex items-center justify-center gap-2 pb-2 pt-3 text-sm font-semibold text-neonGreen">
                    <Globe2 size={16} /> LIVE SUPPLY NETWORK — TANZANIA ↔ EAST AFRICA
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </section>

          {/* ───────────── Problem ───────────── */}
          <Section id="problem" eyebrow="THE PROBLEM" title="Medicine doesn't reach the shelf" className="mt-28">
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {PROBLEMS.map((p, i) => (
                <Reveal key={p.stat} delay={i * 0.1}>
                  <Card className="h-full">
                    <CardContent className="p-7">
                      <p.icon size={30} className="text-neonBlue" />
                      <div className="mt-4 text-4xl font-black text-white">{p.stat}</div>
                      <p className="mt-2 text-white/60">{p.label}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* ───────────── Solution + Capsule 3D ───────────── */}
          <Section id="solution" eyebrow="THE SOLUTION" title="One platform, from molecule to pharmacy shelf" className="mt-28">
            <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Card className="overflow-hidden shadow-neon">
                  <CardContent className="p-3">
                    <ThreeCapsule />
                    <div className="flex items-center justify-center gap-2 pb-2 pt-3 text-sm font-semibold text-neonGreen">
                      <Pill size={16} /> VERIFIED MEDICINE · TRACEABLE COMPOUND
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="space-y-4">
                {STEPS.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.1}>
                    <div className="flex gap-4 rounded-2xl border border-white/10 bg-panel/60 p-5">
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-neonGreen/20 to-neonBlue/20">
                        <s.icon size={22} className="text-neonGreen" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neonBlue">0{i + 1}</span>
                          <h3 className="text-lg font-bold">{s.title}</h3>
                        </div>
                        <p className="mt-1 text-white/60">{s.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Section>

          {/* ───────────── Features ───────────── */}
          <Section eyebrow="THE PLATFORM" title="Everything the supply chain needs" className="mt-28">
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.06}>
                  <Card className="group h-full transition-colors hover:border-neonGreen/40">
                    <CardContent className="p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-neonGreen/15">
                        <f.icon size={22} className="text-neonBlue transition-colors group-hover:text-neonGreen" />
                      </div>
                      <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                      <p className="mt-1.5 text-sm text-white/60">{f.body}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* ───────────── Logistics + Ship 3D ───────────── */}
          <Section eyebrow="LOGISTICS" title="See every ship, live" className="mt-28">
            <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="text-lg text-white/70">
                  Medicine moves by sea across East Africa — and until now, nobody could
                  see it move. PharmaLink streams live AIS vessel data so pharmacies,
                  suppliers and investors watch stock arrive in real time.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {['Dar es Salaam', 'Mombasa', 'Zanzibar', 'Tanga'].map((p) => (
                    <div key={p} className="flex items-center gap-2 rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm">
                      <Ship size={16} className="text-neonBlue" /> {p} Port
                    </div>
                  ))}
                </div>
                <Link href="/dashboard" className="mt-7 inline-block">
                  <Button variant="accent" size="lg">
                    <Radar size={18} /> Open Live Tracking
                  </Button>
                </Link>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Card className="overflow-hidden shadow-neon">
                  <CardContent className="p-3">
                    <ThreeShip />
                    <div className="flex items-center justify-center gap-2 pb-2 pt-3 text-sm font-semibold text-neonBlue">
                      <Ship size={16} /> LIVE 3D CARGO VESSEL — DAR ES SALAAM
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </Section>

          {/* ───────────── Market ───────────── */}
          <Section id="market" eyebrow="THE OPPORTUNITY" title="A continent-scale market, digitizing now" className="mt-28">
            <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {MARKET.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.08}>
                  <Card className="h-full text-center">
                    <CardContent className="p-7">
                      <div className="bg-gradient-to-r from-neonGreen to-neonBlue bg-clip-text text-4xl font-black text-transparent">
                        {m.value}
                      </div>
                      <p className="mt-2 text-sm text-white/60">{m.label}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* ───────────── Traction ───────────── */}
          <Section eyebrow="TRACTION" title="Momentum investors can measure" className="mt-24">
            <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {TRACTION.map((t, i) => (
                <Reveal key={t.label} delay={i * 0.08}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="text-3xl font-black text-neonGreen">{t.value}</div>
                      <p className="mt-1 text-sm text-white/60">{t.label}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* ───────────── Quotes ───────────── */}
          <Section eyebrow="WHAT THEY SAY" title="Built for the people who move medicine" className="mt-24">
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {QUOTES.map((q, i) => (
                <Reveal key={q.who} delay={i * 0.1}>
                  <Card className="h-full">
                    <CardContent className="p-7">
                      <Quote size={26} className="text-neonBlue" />
                      <p className="mt-4 text-lg text-white/85">&ldquo;{q.quote}&rdquo;</p>
                      <div className="mt-5 text-sm">
                        <div className="font-bold text-white">{q.who}</div>
                        <div className="text-white/50">{q.role}</div>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* ───────────── Investor CTA ───────────── */}
          <section id="investors" className="mt-28">
            <Reveal>
              <Card className="relative overflow-hidden border-neonGreen/30 shadow-neon">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neonGreen/10 via-transparent to-neonBlue/10" />
                <CardContent className="relative p-8 md:p-14 text-center">
                  <Badge tone="green">Seed round open</Badge>
                  <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight md:text-5xl">
                    Own the rails of East African medicine distribution.
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
                    The pharmacies, the ships, the data — one network. Join the investors
                    backing the platform that keeps a region&apos;s medicine in stock.
                  </p>
                  <div className="mt-9 flex flex-wrap justify-center gap-4">
                    <Link href="/dashboard">
                      <Button variant="primary" size="lg">
                        <Rocket size={18} /> Explore the Live Product
                      </Button>
                    </Link>
                    <a href="mailto:invest@pharmalink.tz?subject=PharmaLink%20TZ%20Investor%20Deck">
                      <Button variant="outline" size="lg">
                        <BadgeDollarSign size={18} /> Request Investor Deck
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </section>

          {/* ───────────── Footer ───────────── */}
          <footer className="mt-24 border-t border-white/10 py-10 text-center text-sm text-white/40">
            <div className="flex items-center justify-center gap-1.5">
              <span className="font-black text-neonGreen">PHARMALINK</span>
              <span className="font-black text-neonBlue">TZ</span>
            </div>
            <p className="mt-3">Connecting Tanzania&apos;s pharmacies to East Africa&apos;s medicine supply chain.</p>
            <p className="mt-1">Built with Next.js · Tamagui · shadcn/ui · Three.js · Recharts · Leaflet</p>
          </footer>
        </div>
      </div>
    </main>
  )
}

// ── Small helpers ─────────────────────────────────────────────────
function Section({
  id,
  eyebrow,
  title,
  className,
  children,
}: {
  id?: string
  eyebrow: string
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={className}>
      <Reveal>
        <div className="text-xs font-bold tracking-widest text-neonBlue">{eyebrow}</div>
        <h2 className="mt-2 max-w-3xl text-3xl font-black tracking-tight md:text-5xl">{title}</h2>
      </Reveal>
      {children}
    </section>
  )
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
