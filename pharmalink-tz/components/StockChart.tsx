'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'
import { STOCK_TREND, type StockPoint } from '../lib/data'
import { fetchStockTrend } from '../lib/queries'

export default function StockChart() {
  // Seed with mock data to avoid an empty flash, then hydrate from the data
  // layer (Supabase when configured, mock otherwise).
  const [data, setData] = useState<StockPoint[]>(STOCK_TREND)

  useEffect(() => {
    let active = true
    fetchStockTrend().then((rows) => {
      if (active && rows.length) setData(rows)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="glowGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#10B981" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="day" stroke="#6B7280" fontSize={12} tickLine={false} />
        <YAxis stroke="#6B7280" fontSize={12} tickLine={false} domain={[40, 100]} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111111',
            border: '1px solid #222',
            borderRadius: 12,
            color: '#fff',
          }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="Dar"
          name="Dar es Salaam"
          stroke="#10B981"
          strokeWidth={3}
          dot={{ r: 4, fill: '#10B981' }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="Arusha"
          stroke="#00D4FF"
          strokeWidth={3}
          dot={{ r: 4, fill: '#00D4FF' }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="Mwanza"
          stroke="#34D399"
          strokeWidth={3}
          dot={{ r: 4, fill: '#34D399' }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
