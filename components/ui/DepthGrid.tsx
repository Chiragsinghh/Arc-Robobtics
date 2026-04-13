"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GridPoints() {
  const pointsRef = useRef<THREE.Points>(null!); // Use null! to avoid null checks
  const count = 50;

  // Initial grid setup
  const positions = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j) * 3;
        pos[idx] = i - count / 2;
        pos[idx + 1] = j - count / 2;
        pos[idx + 2] = 0;
      }
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j) * 3;
        
        // Slightly more complex math for a "rolling wave" effect
        const x = i * 0.2;
        const y = j * 0.2;
        
        array[idx + 2] = Math.sin(x + t) * 0.7 + Math.cos(y + t) * 0.5;
      }
    }

    // This is mandatory to tell Three.js to re-upload the data to the GPU
    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]} // Fixed the TS error here
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.12}
        color="#2563eb"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function DepthGrid() {
  return (
    <div className="w-full h-screen bg-slate-950">
      <Canvas camera={{ position: [0, 10, 20], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <GridPoints />
      </Canvas>
    </div>
  );
}