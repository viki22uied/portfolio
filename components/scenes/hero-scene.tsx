"use client";

import { memo, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Palette ─────────────────────────────────────────── */
const GOLD = "#C9A84C";
const AMBER = "#F5A623";
const GREEN = "#00C853";
const RED = "#FF3D3D";

/* ── Math helpers ────────────────────────────────────── */
function gauss() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));

/* Mean-reverting random walk — looks like a live price series */
function nextLine(prev: number) {
  let n = prev + gauss() * 0.16;
  n = n * 0.985 + 0.2 * 0.015; // gentle pull toward a slight uptrend baseline
  return clamp(n, -1.25, 1.55);
}

type Candle = { o: number; c: number; h: number; l: number };
function nextCandle(prevClose: number): Candle {
  const o = prevClose;
  const c = clamp(o + gauss() * 0.22, -1, 1.1);
  const h = Math.max(o, c) + Math.abs(gauss()) * 0.12;
  const l = Math.min(o, c) - Math.abs(gauss()) * 0.12;
  return { o, c, h, l };
}

type PointerRef = MutableRefObject<{ x: number; y: number }>;

/* ── Scrolling price area-chart (centerpiece) ────────── */
const PriceTape = memo(function PriceTape({ pointer, reduced }: { pointer: PointerRef; reduced: boolean }) {
  const N = 110;
  const WIDTH = 14;
  const spacing = WIDTH / (N - 1);
  const half = WIDTH / 2;
  const yFloor = -0.6;
  const edgeH = 0.035;
  const markerX = 2.15;
  const xAt = (i: number) => i * spacing - half;

  const tapeRef = useRef<THREE.Group>(null);
  const markerRef = useRef<THREE.Group>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const guideRef = useRef<THREE.Mesh>(null);
  const tickRef = useRef<THREE.Mesh>(null);
  const acc = useRef(0);

  const values = useRef<Float32Array>(null!);
  if (values.current === null) {
    const arr = new Float32Array(N);
    let prev = 0.2;
    for (let i = 0; i < N; i++) {
      prev = i === 0 ? 0.2 : nextLine(prev);
      // blend a sine so the seeded shape is pleasant, not noisy
      arr[i] = prev * 0.6 + Math.sin(i * 0.18) * 0.5;
    }
    values.current = arr;
  }

  const { areaGeo, edgeGeo } = useMemo(() => {
    const v = values.current;

    // Area ribbon: 2 verts per sample (top = value, bottom = floor)
    const area = new THREE.BufferGeometry();
    const aPos = new Float32Array(N * 2 * 3);
    const aCol = new Float32Array(N * 2 * 3);
    const gTop = new THREE.Color(GOLD);
    const gBot = new THREE.Color("#0A0A0A");
    for (let i = 0; i < N; i++) {
      const x = xAt(i);
      const t = i * 6;
      aPos[t] = x; aPos[t + 1] = v[i]; aPos[t + 2] = 0;
      aPos[t + 3] = x; aPos[t + 4] = yFloor; aPos[t + 5] = 0;
      aCol[t] = gTop.r; aCol[t + 1] = gTop.g; aCol[t + 2] = gTop.b;
      aCol[t + 3] = gBot.r; aCol[t + 4] = gBot.g; aCol[t + 5] = gBot.b;
    }
    area.setAttribute("position", new THREE.BufferAttribute(aPos, 3));
    area.setAttribute("color", new THREE.BufferAttribute(aCol, 3));

    // Edge ribbon: bright glowing top line (2 verts per sample)
    const edge = new THREE.BufferGeometry();
    const ePos = new Float32Array(N * 2 * 3);
    for (let i = 0; i < N; i++) {
      const x = xAt(i);
      const t = i * 6;
      ePos[t] = x; ePos[t + 1] = v[i] + edgeH; ePos[t + 2] = 0.01;
      ePos[t + 3] = x; ePos[t + 4] = v[i] - edgeH; ePos[t + 5] = 0.01;
    }
    edge.setAttribute("position", new THREE.BufferAttribute(ePos, 3));

    // Shared quad index buffer
    const idx: number[] = [];
    for (let i = 0; i < N - 1; i++) {
      const a = i * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    area.setIndex(idx);
    edge.setIndex(idx);

    return { areaGeo: area, edgeGeo: edge };
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    // Parallax (always, even when reduced — it's pointer-driven, not auto)
    if (tapeRef.current) {
      const p = pointer.current;
      tapeRef.current.position.y += (p.y * 0.12 - tapeRef.current.position.y) * 0.05;
    }

    if (!reduced) {
      acc.current += dt * 5.2; // steps progressed per second
      while (acc.current >= 1) {
        acc.current -= 1;
        const v = values.current;
        for (let i = 0; i < N - 1; i++) v[i] = v[i + 1];
        v[N - 1] = nextLine(v[N - 2]);
      }
    }

    const v = values.current;
    const frac = acc.current;

    // Update area top + edge band
    const ap = areaGeo.attributes.position.array as Float32Array;
    const ep = edgeGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < N; i++) {
      const t = i * 6;
      ap[t + 1] = v[i];
      ep[t + 1] = v[i] + edgeH;
      ep[t + 4] = v[i] - edgeH;
    }
    areaGeo.attributes.position.needsUpdate = true;
    edgeGeo.attributes.position.needsUpdate = true;

    if (tapeRef.current) tapeRef.current.position.x = -frac * spacing;

    // Current-price marker at fixed world x
    const fi = clamp((markerX + frac * spacing + half) / spacing, 0, N - 1.001);
    const i0 = Math.floor(fi);
    const yM = v[i0] + (v[i0 + 1] - v[i0]) * (fi - i0);
    if (dotRef.current) dotRef.current.position.set(markerX, yM, 0.05);
    if (guideRef.current) {
      guideRef.current.position.y = yM;
      const m = guideRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.14 + Math.abs(Math.sin(performance.now() * 0.0012)) * 0.06;
    }
    if (tickRef.current) tickRef.current.position.set(markerX, yM, 0.04);
  });

  return (
    <group ref={markerRef}>
      <group ref={tapeRef}>
        <mesh geometry={areaGeo}>
          <meshBasicMaterial vertexColors transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        <mesh geometry={edgeGeo}>
          <meshBasicMaterial color={GOLD} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Horizontal price guide */}
      <mesh ref={guideRef} position={[-2, 0, 0]}>
        <boxGeometry args={[9, 0.012, 0.001]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.16} depthWrite={false} />
      </mesh>
      {/* Vertical tick at marker */}
      <mesh ref={tickRef}>
        <boxGeometry args={[0.012, 0.4, 0.001]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.4} depthWrite={false} />
      </mesh>
      {/* Glowing current-price dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
});

/* ── Scrolling candlestick stream ────────────────────── */
const Candles = memo(function Candles({ reduced }: { reduced: boolean }) {
  const NC = 20;
  const sc = 0.64;
  const halfC = ((NC - 1) * sc) / 2;
  const pScale = 0.5;
  const bandY = -1.95;
  const xAt = (j: number) => j * sc - halfC;

  const groupRef = useRef<THREE.Group>(null);
  const bodyRefs = useRef<THREE.Mesh[]>([]);
  const wickRefs = useRef<THREE.Mesh[]>([]);
  const acc = useRef(0);

  const data = useRef<Candle[]>(null!);
  if (data.current === null) {
    const arr: Candle[] = [];
    let prevC = 0;
    for (let j = 0; j < NC; j++) {
      const cd = nextCandle(prevC);
      arr.push(cd);
      prevC = cd.c;
    }
    data.current = arr;
  }

  const apply = () => {
    const arr = data.current;
    for (let j = 0; j < NC; j++) {
      const { o, c, h, l } = arr[j];
      const up = c >= o;
      const bodyMid = ((o + c) / 2) * pScale;
      const bodyH = Math.max(Math.abs(o - c) * pScale, 0.03);
      const wickMid = ((h + l) / 2) * pScale;
      const wickH = Math.max((h - l) * pScale, 0.04);
      const col = up ? GREEN : RED;

      const body = bodyRefs.current[j];
      const wick = wickRefs.current[j];
      if (body) {
        body.position.y = bandY + bodyMid;
        body.scale.y = bodyH;
        (body.material as THREE.MeshBasicMaterial).color.set(col);
      }
      if (wick) {
        wick.position.y = bandY + wickMid;
        wick.scale.y = wickH;
        (wick.material as THREE.MeshBasicMaterial).color.set(col);
      }
    }
  };

  useFrame((_, delta) => {
    if (reduced) return;
    const dt = Math.min(delta, 0.05);
    acc.current += dt * 5.2; // step in sync with the price tape
    let recycled = false;
    while (acc.current >= 1) {
      acc.current -= 1;
      const arr = data.current;
      for (let j = 0; j < NC - 1; j++) arr[j] = arr[j + 1];
      arr[NC - 1] = nextCandle(arr[NC - 2].c);
      recycled = true;
    }
    if (recycled) apply();
    if (groupRef.current) groupRef.current.position.x = -acc.current * sc;
  });

  useEffect(() => { apply(); }, []);

  return (
    <group ref={groupRef}>
      {Array.from({ length: NC }).map((_, j) => (
        <group key={j} position={[xAt(j), 0, -0.2]}>
          <mesh ref={(el) => { if (el) wickRefs.current[j] = el; }}>
            <boxGeometry args={[0.022, 1, 0.022]} />
            <meshBasicMaterial transparent opacity={0.55} depthWrite={false} />
          </mesh>
          <mesh ref={(el) => { if (el) bodyRefs.current[j] = el; }}>
            <boxGeometry args={[0.2, 1, 0.2]} />
            <meshBasicMaterial transparent opacity={0.8} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
});

/* ── Volatility surface (background) ─────────────────── */
const VolSurface = memo(function VolSurface({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.PlaneGeometry(20, 11, 44, 22), []);
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array as Float32Array), [geo]);

  useFrame(({ clock }) => {
    if (reduced || !meshRef.current) return;
    const t = clock.elapsedTime;
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      pos[i + 2] = Math.sin(x * 0.5 + t * 0.7) * 0.4 + Math.cos(y * 0.6 + t * 0.45) * 0.35;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geo} position={[0, -1.4, -4.2]} rotation={[-1.15, 0, 0]}>
      <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
});

/* ── Market-data dust ────────────────────────────────── */
const Dust = memo(function Dust({ reduced }: { reduced: boolean }) {
  const COUNT = 70;
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (reduced || !ref.current) return;
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += delta * 0.18;
      if (pos[i * 3 + 1] > 3.6) pos[i * 3 + 1] = -3.6;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={AMBER} size={0.035} transparent opacity={0.55} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
});

/* ── Rig: gentle global parallax ─────────────────────── */
const Rig = memo(function Rig({ pointer, reduced }: { pointer: PointerRef; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    const p = pointer.current;
    ref.current.rotation.y += (p.x * 0.12 - ref.current.rotation.y) * 0.04;
    ref.current.rotation.x += (-p.y * 0.06 - ref.current.rotation.x) * 0.04;
  });

  return (
    <group ref={ref}>
      <VolSurface reduced={reduced} />
      <Dust reduced={reduced} />
      <Candles reduced={reduced} />
      <PriceTape pointer={pointer} reduced={reduced} />
    </group>
  );
});

export function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);

    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.35, 7], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.75]}
      frameloop={reduced ? "demand" : "always"}
      style={{ pointerEvents: "none" }}
    >
      <Rig pointer={pointer} reduced={reduced} />
    </Canvas>
  );
}
