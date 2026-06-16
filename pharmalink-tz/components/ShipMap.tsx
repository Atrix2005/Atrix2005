'use client'

import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { INITIAL_SHIPS, PORTS, type CargoShip } from '../lib/data'

const STATUS_COLOR: Record<string, string> = {
  'En Route': '#00D4FF',
  Docking: '#10B981',
  Unloading: '#34D399',
  Cleared: '#67E8F9',
}

export default function ShipMap() {
  const [ships, setShips] = useState<CargoShip[]>(INITIAL_SHIPS)

  // Simulate a realtime AIS feed by nudging ship positions.
  useEffect(() => {
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
  }, [])

  return (
    <MapContainer
      center={[-5.6, 39.4]}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: 440, width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap &copy; CARTO'
      />

      {/* Ports */}
      {PORTS.map((p) => (
        <CircleMarker
          key={p.name}
          center={[p.lat, p.lng]}
          radius={7}
          pathOptions={{ color: '#10B981', fillColor: '#10B981', fillOpacity: 0.4 }}
        >
          <Tooltip direction="top">
            {p.name} Port — {p.country}
          </Tooltip>
        </CircleMarker>
      ))}

      {/* Live ships */}
      {ships.map((ship) => {
        const color = STATUS_COLOR[ship.status] ?? '#00D4FF'
        return (
          <CircleMarker
            key={ship.id}
            center={[ship.lat, ship.lng]}
            radius={10}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.85, weight: 2 }}
          >
            <Popup>
              <strong>{ship.name}</strong>
              <br />
              Cargo: {ship.cargo}
              <br />
              Bound for: {ship.port} Port
              <br />
              Status: <span style={{ color }}>{ship.status}</span>
              <br />
              ETA: {ship.eta}
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
