'use client'

import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet'
import { PORTS } from '../lib/data'
import { useShips } from '../lib/useShips'

const STATUS_COLOR: Record<string, string> = {
  'En Route': '#00D4FF',
  Docking: '#10B981',
  Unloading: '#34D399',
  Cleared: '#67E8F9',
}

export default function ShipMap() {
  const { ships, source } = useShips()

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 10px',
          borderRadius: 999,
          background: 'rgba(10,10,10,0.75)',
          border: '1px solid #222',
          fontSize: 12,
          color: source === 'live' ? '#10B981' : '#00D4FF',
          fontWeight: 700,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: source === 'live' ? '#10B981' : '#00D4FF',
          }}
        />
        {source === 'live' ? 'LIVE AIS' : 'SIMULATED FEED'}
      </div>
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
    </div>
  )
}
