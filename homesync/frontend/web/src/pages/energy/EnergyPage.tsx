import { useMemo, useState } from 'react'
import { Box, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useGetDevicesQuery, useGetEnergyDailyQuery, useGetSuggestionsQuery } from '@/services/api'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export function EnergyPage() {
  const { data: devices } = useGetDevicesQuery()
  const [selected, setSelected] = useState<string>('')
  const { data: energy } = useGetEnergyDailyQuery({ deviceId: selected }, { skip: !selected })
  const { data: suggestions } = useGetSuggestionsQuery()

  const chartData = useMemo(() => {
    if (!energy) return { labels: [], datasets: [] }
    return {
      labels: energy.labels ?? energy.map((r: any) => r.date),
      datasets: [
        {
          label: 'kWh',
          data: energy.values ?? energy.map((r: any) => r.kwh),
          borderColor: '#0066ff',
          backgroundColor: 'rgba(0,102,255,0.2)'
        }
      ]
    }
  }, [energy])

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Energy</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel id="device-select">Device</InputLabel>
          <Select labelId="device-select" label="Device" value={selected} onChange={(e) => setSelected(e.target.value)}>
            {devices?.map((d: any) => (
              <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' as const }, title: { display: true, text: 'Daily Usage' } } }} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">AI Suggestions</Typography>
          <ul>
            {(suggestions?.tips ?? suggestions ?? []).map((s: any, idx: number) => (
              <li key={idx}>{typeof s === 'string' ? s : s.text}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Box>
  )
}