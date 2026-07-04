'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Line } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const R = 3

// Convert lat/lng to a point on the sphere surface.
function toVec(lat: number, lng: number, radius = R): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

// Dar es Salaam is the hub; supplier cities are the spokes.
const HUB = { name: 'Dar es Salaam', lat: -6.82, lng: 39.28 }
const NODES = [
  { name: 'Mombasa', lat: -4.05, lng: 39.66, color: '#00D4FF' },
  { name: 'Nairobi', lat: -1.29, lng: 36.82, color: '#00D4FF' },
  { name: 'Kampala', lat: 0.35, lng: 32.58, color: '#34D399' },
  { name: 'Kigali', lat: -1.95, lng: 30.06, color: '#34D399' },
  { name: 'Zanzibar', lat: -6.16, lng: 39.2, color: '#10B981' },
  { name: 'Addis Ababa', lat: 9.03, lng: 38.74, color: '#00D4FF' },
]

// A lifted quadratic arc between two surface points (a "supply route").
function arcPoints(a: THREE.Vector3, b: THREE.Vector3): THREE.Vector3[] {
  const mid = a.clone().add(b).multiplyScalar(0.5)
  const lift = 1 + a.distanceTo(b) * 0.28
  mid.normalize().multiplyScalar(R * lift)
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
  return curve.getPoints(40)
}

function Globe() {
  const group = useRef<THREE.Group>(null)
  const hub = useMemo(() => toVec(HUB.lat, HUB.lng), [])

  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.12
  })

  return (
    <group ref={group} rotation={[0.3, 0, 0]}>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[R, 48, 48]} />
        <meshStandardMaterial color="#04120C" metalness={0.4} roughness={0.9} />
      </mesh>
      {/* Neon wireframe shell */}
      <mesh scale={1.001}>
        <sphereGeometry args={[R, 24, 24]} />
        <meshBasicMaterial color="#10B981" wireframe transparent opacity={0.28} />
      </mesh>
      {/* Atmosphere */}
      <mesh scale={1.06}>
        <sphereGeometry args={[R, 32, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      {/* Hub marker */}
      <mesh position={hub.toArray()}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#10B981" emissiveIntensity={1.2} />
      </mesh>

      {/* Nodes + supply arcs */}
      {NODES.map((n) => {
        const p = toVec(n.lat, n.lng)
        return (
          <group key={n.name}>
            <mesh position={p.toArray()}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={1} />
            </mesh>
            <Line points={arcPoints(hub, p)} color={n.color} lineWidth={1.4} transparent opacity={0.75} />
          </group>
        )
      })}
    </group>
  )
}

export default function ThreeGlobe() {
  return (
    <Canvas
      style={{ height: 420, width: '100%' }}
      camera={{ position: [0, 0, 9], fov: 45 }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[8, 6, 8]} color="#00D4FF" intensity={2} />
      <pointLight position={[-8, -4, 2]} color="#10B981" intensity={1.4} />
      <Globe />
      <Stars radius={200} depth={60} count={1200} factor={4} saturation={0} fade speed={1} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.35} />
    </Canvas>
  )
}
