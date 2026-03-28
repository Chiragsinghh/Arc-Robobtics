"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GridPoints() {
  const pointsRef = useRef<THREE.Points | null>(null);
  const count = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j) * 3;
        pos[idx] = (i - count / 2);
        pos[idx + 1] = (j - count / 2);
        pos[idx + 2] = 0;
      }
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();

    const geometry = pointsRef.current.geometry as THREE.BufferGeometry;
    const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j) * 3;
        array[idx + 2] =
          Math.sin(i * 0.2 + time) * 0.5 +
          Math.cos(j * 0.2 + time) * 0.5;
      }
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* ✅ CORRECT R3F FORMAT */}
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.15}
        color="#2563eb"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

export default function DepthGrid() {
  return (
    <div className="w-full h-full opacity-50">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ alpha: true }}>
        <GridPoints />
      </Canvas>
    </div>
  );
}