# PharmaLink TZ 🚢💊

**The pharmacy supply network for East Africa.** PharmaLink TZ connects every
pharmacy in Tanzania to suppliers across East Africa — letting them order
medicine stock in one click, track cargo ships across East African ports in
real time, and watch live inventory analytics on a cinematic, investor-ready
dashboard.

> Pure-black base, emerald-green + electric-blue neon (Three.js-inspired),
> live 3D cargo vessel, real-time ship map, and animated stock graphs.

## ✨ Features

- **Live 3D cargo vessel** — a rotating, GPU-rendered ship hero built with
  Three.js / React Three Fiber.
- **Real-time ship tracking** — vessels moving across Dar es Salaam, Zanzibar,
  Tanga and Mombasa ports on a dark Leaflet map (simulated AIS feed).
- **Live stock analytics** — weekly inventory trends per flagship pharmacy and
  per-category stock-health bars (Recharts).
- **One-click ordering** — pick medicine, quantity and an East African
  supplier and place an order instantly.
- **Investor-grade UI** — black/green/blue neon theme, aurora backdrop, glass
  cards, and smooth Framer Motion animations.

## 🧱 Tech stack

| Concern            | Library                                   |
| ------------------ | ----------------------------------------- |
| Framework          | Next.js 14 (App Router)                   |
| Cross-platform UI  | Tamagui (React Native Web)                |
| Component styling  | shadcn/ui-style components + Tailwind CSS |
| 3D                 | Three.js · @react-three/fiber · drei      |
| Charts             | Recharts                                  |
| Maps               | React-Leaflet                             |
| Animation          | Framer Motion                             |
| Icons              | lucide-react                              |

Tamagui makes the UI layer portable to React Native, so the same design system
can power a future mobile app.

## 🚀 Getting started

```bash
cd pharmalink-tz
npm install        # uses .npmrc (legacy-peer-deps) for Tamagui + React 18
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## 📁 Project structure

```
app/
  layout.tsx        # root layout + Tamagui provider
  page.tsx          # the full dashboard
  Provider.tsx      # TamaguiProvider (dark theme)
  globals.css       # Tailwind + neon styling
components/
  ThreeShip.tsx     # 3D cargo vessel (R3F)
  ShipMap.tsx       # live Leaflet port/ship map
  StockChart.tsx    # weekly stock trend (Recharts)
  CategoryBars.tsx  # stock health by category
  OrderForm.tsx     # one-click order (Tamagui)
  ui/               # shadcn-style Button / Card / Badge
lib/
  data.ts           # mock domain data + realtime seeds
  utils.ts          # cn() class merger
tamagui.config.ts   # neon dark theme tokens
```

## 🔌 Wiring up real data

The demo uses mock data in `lib/data.ts` and a simulated realtime feed in
`ShipMap.tsx`. To make it production-ready:

- Replace the ship simulation with a real **AIS** feed (e.g. AISStream /
  MarineTraffic) via a WebSocket.
- Back the order form and stock metrics with an API (REST or Supabase).
- Add auth + per-pharmacy dashboards.

---

Built to connect Tanzania's pharmacies to East Africa's medicine supply chain.
