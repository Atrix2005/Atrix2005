'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

function Ship() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      // gentle bob on the "waves"
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.25
    }
  })

  return (
    <group ref={group}>
      {/* Hull */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[9, 2.2, 3.4]} />
        <meshStandardMaterial
          color="#0A0A0A"
          metalness={0.95}
          roughness={0.25}
          emissive="#10B981"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Stacked containers */}
      {[
        { x: -2.6, c: '#00D4FF' },
        { x: 0, c: '#10B981' },
        { x: 2.6, c: '#00D4FF' },
      ].map((b, i) => (
        <mesh key={i} position={[b.x, 1.9, 0]}>
          <boxGeometry args={[2.2, 1.8, 2.6]} />
          <meshStandardMaterial
            color={b.c}
            metalness={0.85}
            roughness={0.3}
            emissive={b.c}
            emissiveIntensity={0.22}
          />
        </mesh>
      ))}

      {/* Bridge tower */}
      <mesh position={[3.6, 2.6, 0]}>
        <boxGeometry args={[1.2, 2.6, 2.2]} />
        <meshStandardMaterial color="#111" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  )
}

export default function ThreeShip() {
  return (
    <Canvas
      style={{ height: 340, width: '100%' }}
      camera={{ position: [0, 6, 18], fov: 45 }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 12, 10]} color="#00D4FF" intensity={2.2} />
      <pointLight position={[-12, 6, -6]} color="#10B981" intensity={1.6} />

      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <Ship />
      </Float>

      <Stars
        radius={300}
        depth={60}
        count={1200}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.55}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  )
}
