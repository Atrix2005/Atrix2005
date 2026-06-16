'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { CATEGORY_STOCK, type CategoryStock } from '../lib/data'
import { fetchCategoryStock } from '../lib/queries'

// Color scales from red (low stock) to neon green (healthy).
function colorFor(level: number) {
  if (level < 50) return '#F87171'
  if (level < 70) return '#FBBF24'
  return '#10B981'
}

export default function CategoryBars() {
  // Seed with mock data so there's no empty flash, then hydrate from the
  // data layer (Supabase when configured, mock otherwise).
  const [data, setData] = useState<CategoryStock[]>(CATEGORY_STOCK)

  useEffect(() => {
    let active = true
    fetchCategoryStock().then((rows) => {
      if (active && rows.length) setData(rows)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 6, right: 16, left: 24, bottom: 0 }}
      >
        <XAxis type="number" domain={[0, 100]} stroke="#6B7280" fontSize={12} />
        <YAxis
          type="category"
          dataKey="name"
          stroke="#9CA3AF"
          fontSize={12}
          width={92}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          contentStyle={{
            backgroundColor: '#111111',
            border: '1px solid #222',
            borderRadius: 12,
            color: '#fff',
          }}
        />
        <Bar dataKey="level" radius={[0, 8, 8, 0]} barSize={22}>
          {data.map((entry, i) => (
            <Cell key={i} fill={colorFor(entry.level)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
