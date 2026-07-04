'use client'

import { useEffect, useRef, useState } from 'react'
import { INITIAL_SHIPS, type CargoShip } from './data'

// East Africa bounding box (covers Mombasa → Dar es Salaam → Mtwara).
// AISStream expects [[lat, lng], [lat, lng]] (SW corner, NE corner).
const EAST_AFRICA_BBOX = [
  [-12.0, 38.0],
  [2.0, 52.0],
]

type Source = 'simulated' | 'live'

interface UseShipsResult {
  ships: CargoShip[]
  source: Source
}

/**
 * Returns cargo ship positions for the map.
 *
 * - If `NEXT_PUBLIC_AISSTREAM_KEY` is set, it opens a websocket to AISStream
 *   and streams real PositionReport messages for the East Africa region.
 * - Otherwise it falls back to a smooth local simulation so the demo always
 *   shows moving vessels.
 */
export function useShips(): UseShipsResult {
  const [ships, setShips] = useState<CargoShip[]>(INITIAL_SHIPS)
  const [source, setSource] = useState<Source>('simulated')
  const liveShips = useRef<Map<number, CargoShip>>(new Map())

  const apiKey = process.env.NEXT_PUBLIC_AISSTREAM_KEY

  useEffect(() => {
    // ── Live AIS feed ──────────────────────────────────────────────
    if (apiKey) {
      let ws: WebSocket | null = null
      let flush: ReturnType<typeof setInterval> | null = null
      try {
        ws = new WebSocket('wss://stream.aisstream.io/v0/stream')
        ws.onopen = () => {
          ws?.send(
            JSON.stringify({
              APIKey: apiKey,
              BoundingBoxes: [EAST_AFRICA_BBOX],
              FilterMessageTypes: ['PositionReport'],
            })
          )
          setSource('live')
        }
        ws.onmessage = (event) => {
          try {
            const msg = JSON.parse(event.data as string)
            if (msg.MessageType !== 'PositionReport') return
            const pr = msg.Message?.PositionReport
            const meta = msg.MetaData
            if (!pr || !meta) return
            const id = Number(meta.MMSI)
            liveShips.current.set(id, {
              id,
              name: (meta.ShipName || `MMSI ${id}`).trim(),
              lat: pr.Latitude,
              lng: pr.Longitude,
              port: '',
              status: 'En Route',
              cargo: 'Live AIS vessel',
              eta: '—',
            })
          } catch {
            /* ignore malformed frames */
          }
        }
        ws.onerror = () => setSource('simulated')
        // Repaint from the buffer a few times a second.
        flush = setInterval(() => {
          if (liveShips.current.size > 0) {
            setShips(Array.from(liveShips.current.values()).slice(0, 60))
          }
        }, 1500)
      } catch {
        setSource('simulated')
      }
      return () => {
        if (flush) clearInterval(flush)
        ws?.close()
      }
    }

    // ── Simulated feed ─────────────────────────────────────────────
    const interval = setInterval(() => {
      setShips((prev) =>
        prev.map((s) => ({
          ...s,
          lat: +(s.lat + (Math.random() - 0.5) * 0.012).toFixed(4),
          lng: +(s.lng + (Math.random() - 0.5) * 0.012).toFixed(4),
        }))
      )
    }, 1700)
    return () => clearInterval(interval)
  }, [apiKey])

  return { ships, source }
}
