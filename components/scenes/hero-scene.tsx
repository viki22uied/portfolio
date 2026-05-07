"use client";

import { memo, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, Stars } from "@react-three/drei";
import { Group, Vector3, MeshStandardMaterial } from "three";

const MovingGroup = memo(function MovingGroup() {
  const ref = useRef<Group>(null);
  const target = useRef(new Vector3());
  const particleRefs = useRef<MeshStandardMaterial[]>([]);

  useFrame(({ pointer, clock, invalidate }) => {
    if (!ref.current) return;
    target.current.set(pointer.x * 0.12, pointer.y * 0.08, 0);
    ref.current.position.lerp(target.current, 0.06);
    ref.current.rotation.y += 0.0012;
    ref.current.rotation.x = Math.sin(Date.now() * 0.0002) * 0.08;

    /* ANIM 3: Pulse emissive intensity on particles */
    particleRefs.current.forEach((mat) => {
      if (mat) {
        mat.emissiveIntensity = 0.2 + Math.sin(clock.elapsedTime * 1.5) * 0.3;
      }
    });

    invalidate();
  });

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        key: i,
        position: [Math.random() * 9 - 4.5, Math.random() * 4 - 2, Math.random() * 5 - 2] as [number, number, number],
      })),
    []
  );

  return (
    <group ref={ref}>
      <Grid
        args={[18, 12]}
        cellSize={0.7}
        cellThickness={0.4}
        sectionThickness={0.7}
        cellColor="#d4af37"
        sectionColor="#f59e0b"
        fadeDistance={28}
        fadeStrength={1}
        infiniteGrid
      />
      <Float speed={0.7} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[-2.3, 1.4, 0]}>
          <icosahedronGeometry args={[0.52, 0]} />
          <meshBasicMaterial color="#d4af37" wireframe />
        </mesh>
      </Float>
      <Float speed={0.8} rotationIntensity={0.18} floatIntensity={0.5}>
        <mesh position={[2.8, -0.7, -0.4]}>
          <torusGeometry args={[0.6, 0.15, 16, 30]} />
          <meshBasicMaterial color="#f59e0b" wireframe />
        </mesh>
      </Float>
      {/* ANIM 3: Upgraded particles with emissive gold shimmer */}
      {particles.map((item) => (
        <mesh key={item.key} position={item.position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            ref={(el: MeshStandardMaterial | null) => { if (el) particleRefs.current[item.key] = el; }}
            color={item.key % 2 ? "#d4af37" : "#f59e0b"}
            emissive="#d4af37"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      <Stars radius={28} depth={20} count={220} factor={1.3} saturation={0} fade speed={0.22} />
    </group>
  );
});

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 1.2, 7], fov: 55 }} gl={{ alpha: true, antialias: true }} frameloop="demand" shadows={false}>
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 6, 4]} intensity={0.7} color="#d4af37" />
      <MovingGroup />
    </Canvas>
  );
}
