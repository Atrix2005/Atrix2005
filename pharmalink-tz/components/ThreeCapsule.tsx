'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Stars } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

// A two-tone medicine capsule (emerald + electric blue) with a small
// molecule orbiting it — the essence of the product: pharma + supply.
function Capsule() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = Math.PI / 4
      group.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  const r = 1
  const bodyLen = 2.4

  return (
    <group ref={group}>
      {/* Green half */}
      <mesh position={[0, bodyLen / 4, 0]}>
        <cylinderGeometry args={[r, r, bodyLen / 2, 48]} />
        <meshStandardMaterial color="#10B981" metalness={0.4} roughness={0.15} emissive="#10B981" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0, bodyLen / 2, 0]}>
        <sphereGeometry args={[r, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#10B981" metalness={0.4} roughness={0.15} emissive="#10B981" emissiveIntensity={0.25} />
      </mesh>

      {/* Blue half */}
      <mesh position={[0, -bodyLen / 4, 0]}>
        <cylinderGeometry args={[r, r, bodyLen / 2, 48]} />
        <meshStandardMaterial color="#F5FBFF" metalness={0.3} roughness={0.1} emissive="#00D4FF" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0, -bodyLen / 2, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[r, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#F5FBFF" metalness={0.3} roughness={0.1} emissive="#00D4FF" emissiveIntensity={0.15} />
      </mesh>

      {/* Seam band */}
      <mesh>
        <torusGeometry args={[r * 1.01, 0.06, 16, 64]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  )
}

function Molecule() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = -state.clock.elapsedTime * 0.6
      group.current.rotation.x = state.clock.elapsedTime * 0.3
    }
  })

  const atoms: [number, number, number][] = [
    [0, 0, 0],
    [1.1, 0.4, 0.2],
    [-0.9, 0.6, -0.5],
    [0.3, -1, 0.6],
    [-0.4, -0.6, 1],
  ]

  return (
    <group ref={group} position={[3.4, 1.6, 0]} scale={0.55}>
      {atoms.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[i === 0 ? 0.45 : 0.28, 24, 24]} />
          <meshStandardMaterial
            color={i % 2 ? '#00D4FF' : '#10B981'}
            emissive={i % 2 ? '#00D4FF' : '#10B981'}
            emissiveIntensity={0.5}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      ))}
      {atoms.slice(1).map((p, i) => {
        const start = new THREE.Vector3(0, 0, 0)
        const end = new THREE.Vector3(...p)
        const mid = start.clone().add(end).multiplyScalar(0.5)
        const len = start.distanceTo(end)
        const q = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          end.clone().sub(start).normalize()
        )
        return (
          <mesh key={`bond-${i}`} position={mid.toArray()} quaternion={q}>
            <cylinderGeometry args={[0.05, 0.05, len, 8]} />
            <meshStandardMaterial color="#67E8F9" emissive="#00D4FF" emissiveIntensity={0.3} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function ThreeCapsule() {
  return (
    <Canvas
      style={{ height: 380, width: '100%' }}
      camera={{ position: [0, 0, 9], fov: 45 }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[6, 8, 8]} color="#00D4FF" intensity={2.4} />
      <pointLight position={[-8, -4, 4]} color="#10B981" intensity={1.8} />
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <Capsule />
      </Float>
      <Molecule />
      <Stars radius={200} depth={50} count={800} factor={4} saturation={0} fade speed={1} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}
