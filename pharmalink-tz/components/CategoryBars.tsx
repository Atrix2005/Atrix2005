'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { CATEGORY_STOCK } from '../lib/data'

// Color scales from red (low stock) to neon green (healthy).
function colorFor(level: number) {
  if (level < 50) return '#F87171'
  if (level < 70) return '#FBBF24'
  return '#10B981'
}

export default function CategoryBars() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={CATEGORY_STOCK}
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
          {CATEGORY_STOCK.map((entry, i) => (
            <Cell key={i} fill={colorFor(entry.level)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
