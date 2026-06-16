# PharmaLink TZ — Mobile 📱

The native companion to the [PharmaLink TZ web dashboard](../pharmalink-tz),
built with **Expo + Expo Router + Tamagui**. It reuses the same neon design
system (black / emerald-green / electric-blue) so the brand is identical across
web, iOS and Android.

## ✨ Screens

A single-screen investor dashboard with:

- Gradient hero (Tamagui `LinearGradient`)
- Live metric cards (ships docking, stock ordered, pharmacies, ROI)
- Animated stock-health bars by medicine category
- Live fleet status list
- One-tap "Order medicine stock" CTA

## 🚀 Run it

```bash
cd pharmalink-tz-mobile
npm install          # uses .npmrc (legacy-peer-deps)
npm start            # Expo dev server — scan the QR with Expo Go
# or:
npm run ios          # iOS simulator
npm run android      # Android emulator
npm run web          # run in the browser
```

## ✅ Verifying

```bash
npm run typecheck            # tsc --noEmit  (passes clean)
npx expo export --platform web   # full bundle export (passes clean)
```

## 🧱 Stack

Expo SDK 51 · Expo Router 3 · React Native 0.74 · Tamagui ·
`@tamagui/linear-gradient` · `lucide-react-native`.

The `lib/data.ts` mock mirrors the web app's data, so wiring this to the same
Supabase backend later is a drop-in change.
