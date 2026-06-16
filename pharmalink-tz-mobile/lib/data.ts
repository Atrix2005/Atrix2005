// Shared mock domain data for the PharmaLink TZ mobile app.
// Mirrors the web app's lib/data.ts so both clients show the same story.

export interface CargoShip {
  id: number
  name: string
  status: string
  cargo: string
  eta: string
}

export const SHIPS: CargoShip[] = [
  { id: 1, name: 'MV Dar Medicine', status: 'Docking', cargo: 'Antibiotics · 240k boxes', eta: 'Arrived' },
  { id: 2, name: 'MV Mombasa Cargo', status: 'En Route', cargo: 'Vaccines · 180k vials', eta: '6h 12m' },
  { id: 3, name: 'MV Zanzibar Star', status: 'Unloading', cargo: 'Painkillers · 150k units', eta: 'Arrived' },
  { id: 4, name: 'MV Serengeti Health', status: 'En Route', cargo: 'IV Fluids · 90k packs', eta: '2h 40m' },
]

export interface CategoryStock {
  name: string
  level: number
}

export const CATEGORY_STOCK: CategoryStock[] = [
  { name: 'Antibiotics', level: 86 },
  { name: 'Vaccines', level: 64 },
  { name: 'Painkillers', level: 92 },
  { name: 'IV Fluids', level: 48 },
  { name: 'Antimalarials', level: 73 },
]

export interface Metric {
  key: string
  label: string
  value: string
  accent: 'green' | 'blue'
}

export const METRICS: Metric[] = [
  { key: 'ships', label: 'Ships Docking Today', value: '14', accent: 'green' },
  { key: 'stock', label: 'Stock Ordered This Week', value: '2.4M', accent: 'blue' },
  { key: 'pharmacies', label: 'Pharmacies Connected', value: '1,872', accent: 'green' },
  { key: 'roi', label: 'Projected ROI (18 mo)', value: '487%', accent: 'blue' },
]

export function stockColor(level: number): string {
  if (level < 50) return '#F87171'
  if (level < 70) return '#FBBF24'
  return '#10B981'
}
