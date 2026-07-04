// Mock domain data for PharmaLink TZ.
// In production these would be served from the API / realtime feeds.

export type ShipStatus = 'En Route' | 'Docking' | 'Unloading' | 'Cleared'

export interface CargoShip {
  id: number
  name: string
  lat: number
  lng: number
  port: string
  status: ShipStatus
  cargo: string
  eta: string
}

export const PORTS = [
  { name: 'Dar es Salaam', country: 'Tanzania', lat: -6.82, lng: 39.28 },
  { name: 'Zanzibar', country: 'Tanzania', lat: -6.16, lng: 39.2 },
  { name: 'Mombasa', country: 'Kenya', lat: -4.05, lng: 39.65 },
  { name: 'Tanga', country: 'Tanzania', lat: -5.07, lng: 39.1 },
]

export const INITIAL_SHIPS: CargoShip[] = [
  {
    id: 1,
    name: 'MV Dar Medicine',
    lat: -6.82,
    lng: 39.28,
    port: 'Dar es Salaam',
    status: 'Docking',
    cargo: 'Antibiotics — 240k boxes',
    eta: 'Arrived',
  },
  {
    id: 2,
    name: 'MV Mombasa Cargo',
    lat: -4.05,
    lng: 39.65,
    port: 'Mombasa',
    status: 'En Route',
    cargo: 'Vaccines — 180k vials',
    eta: '6h 12m',
  },
  {
    id: 3,
    name: 'MV Zanzibar Star',
    lat: -6.16,
    lng: 39.2,
    port: 'Zanzibar',
    status: 'Unloading',
    cargo: 'Painkillers — 150k units',
    eta: 'Arrived',
  },
  {
    id: 4,
    name: 'MV Serengeti Health',
    lat: -5.07,
    lng: 39.45,
    port: 'Tanga',
    status: 'En Route',
    cargo: 'IV Fluids — 90k packs',
    eta: '2h 40m',
  },
]

export interface StockPoint {
  day: string
  Dar: number
  Arusha: number
  Mwanza: number
}

export const STOCK_TREND: StockPoint[] = [
  { day: 'Mon', Dar: 92, Arusha: 68, Mwanza: 84 },
  { day: 'Tue', Dar: 87, Arusha: 71, Mwanza: 79 },
  { day: 'Wed', Dar: 65, Arusha: 82, Mwanza: 91 },
  { day: 'Thu', Dar: 78, Arusha: 75, Mwanza: 88 },
  { day: 'Fri', Dar: 95, Arusha: 88, Mwanza: 72 },
  { day: 'Sat', Dar: 83, Arusha: 90, Mwanza: 80 },
  { day: 'Sun', Dar: 97, Arusha: 84, Mwanza: 93 },
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

export const METRICS = [
  { key: 'ships', label: 'Ships Docking Today', value: '14', accent: 'green' },
  { key: 'stock', label: 'Stock Ordered This Week', value: '2.4M', unit: 'boxes', accent: 'blue' },
  { key: 'pharmacies', label: 'Pharmacies Connected', value: '1,872', accent: 'green' },
  { key: 'roi', label: 'Projected ROI (18 mo)', value: '487%', accent: 'blue' },
] as const

export const MEDICINE_TYPES = [
  'Antibiotics',
  'Vaccines',
  'Painkillers',
  'IV Fluids',
  'Antimalarials',
]

export const SUPPLIERS = [
  'Mombasa Supplier — Kenya',
  'Kampala Pharma — Uganda',
  'Kigali MedSource — Rwanda',
  'Dar Wholesale — Tanzania',
]
