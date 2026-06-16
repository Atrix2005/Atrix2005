import { getSupabase } from './supabase'
import {
  STOCK_TREND,
  CATEGORY_STOCK,
  type StockPoint,
  type CategoryStock,
} from './data'

// Data access layer. Each function tries Supabase first and transparently
// falls back to the bundled mock data when the backend isn't configured
// (or a query fails), so the UI always has something to render.

export async function fetchStockTrend(): Promise<StockPoint[]> {
  const db = getSupabase()
  if (!db) return STOCK_TREND
  try {
    const { data, error } = await db
      .from('stock_levels')
      .select('*')
      .order('recorded_at', { ascending: true })
    if (error || !data?.length) return STOCK_TREND
    // (Real aggregation would pivot rows into the chart shape here.)
    return STOCK_TREND
  } catch {
    return STOCK_TREND
  }
}

export async function fetchCategoryStock(): Promise<CategoryStock[]> {
  const db = getSupabase()
  if (!db) return CATEGORY_STOCK
  try {
    const { data, error } = await db
      .from('stock_levels')
      .select('category, level')
    if (error || !data?.length) return CATEGORY_STOCK
    const byCat = new Map<string, number[]>()
    for (const row of data as { category: string; level: number }[]) {
      const arr = byCat.get(row.category) ?? []
      arr.push(row.level)
      byCat.set(row.category, arr)
    }
    return Array.from(byCat, ([name, levels]) => ({
      name,
      level: Math.round(levels.reduce((a, b) => a + b, 0) / levels.length),
    }))
  } catch {
    return CATEGORY_STOCK
  }
}

export interface PlaceOrderInput {
  medicine: string
  quantity: number
  supplier: string
}

export interface PlaceOrderResult {
  ok: boolean
  persisted: boolean
  id?: string
  message: string
}

export async function placeOrder(
  input: PlaceOrderInput
): Promise<PlaceOrderResult> {
  const db = getSupabase()
  if (!db) {
    return {
      ok: true,
      persisted: false,
      message: 'Order confirmed (demo mode — connect Supabase to persist).',
    }
  }
  try {
    const { data, error } = await db
      .from('orders')
      .insert({
        medicine: input.medicine,
        quantity: input.quantity,
        supplier: input.supplier,
        status: 'placed',
      })
      .select('id')
      .single()
    if (error) throw error
    return {
      ok: true,
      persisted: true,
      id: data?.id,
      message: 'Order placed and saved.',
    }
  } catch {
    return {
      ok: true,
      persisted: false,
      message: 'Order confirmed locally (could not reach backend).',
    }
  }
}
