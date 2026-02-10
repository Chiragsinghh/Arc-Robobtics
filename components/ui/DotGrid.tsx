"use client";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRadius;
  uniform float uStrength;
  varying float vDist;
  varying float vStrength;

  void main() {
    vec3 pos = position;
    
    float dist = distance(pos.xy, uMouse);
    vDist = dist;

    // The Shockwave logic
    float hover = 0.0;
    if(dist < uRadius) {
      // Create a non-linear push (feels more physical)
      float factor = pow(1.0 - dist / uRadius, 2.0);
      vec2 dir = normalize(pos.xy - uMouse);
      pos.xy += dir * factor * uStrength;
      hover = factor;
    }
    
    vStrength = hover; // Pass the interaction strength to fragment shader

    // Subtle background drift
    pos.z += sin(pos.x * 0.5 + uTime) * 0.05;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    // Size attenuation: dots get slightly larger when pushed
    gl_PointSize = (4.0 + (hover * 3.0)) * (10.0 / -mvPosition.z); 
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying float vDist;
  varying float vStrength;
  uniform vec3 uBaseColor;
  uniform vec3 uActiveColor;
  uniform float uRadius;

  void main() {
    // Determine color with a "Softness" threshold to create a trail feel
    float glow = smoothstep(uRadius * 1.2, 0.0, vDist);
    
    // Mix colors based on the interaction strength
    vec3 color = mix(uBaseColor, uActiveColor, glow);
    
    // Circular point rendering
    float circle = distance(gl_PointCoord, vec2(0.5));
    if (circle > 0.5) discard;

    // Opacity also increases near the mouse for a "lighting" effect
    float alpha = mix(0.3, 0.9, glow);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  shockRadius?: number;
  shockStrength?: number;
}

function GridPoints({ baseColor, activeColor, shockRadius, shockStrength }: DotGridProps) {
  const meshRef = useRef<any>(null!);
  const { viewport } = useThree();
  
  // Smoothing the mouse movement for the "Trail" feel
  const smoothMouse = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uBaseColor: { value: new THREE.Color(baseColor || "#e2e8f0") },
    uActiveColor: { value: new THREE.Color(activeColor || "#2563eb") },
    uRadius: { value: shockRadius || 3.0 },
    uStrength: { value: (shockStrength || 8) / 10 }
  }), [baseColor, activeColor, shockRadius, shockStrength]);

  const positions = useMemo(() => {
    const count = 75; 
    const spacing = 0.5;
    const pos = new Float32Array(count * count * 3);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j) * 3;
        pos[idx + 0] = (i - count / 2) * spacing;
        pos[idx + 1] = (j - count / 2) * spacing;
        pos[idx + 2] = 0;
      }
    }
    return pos;
  }, []);

  useFrame((state) => {
    const { mouse } = state;
    
    // LERP (Linear Interpolation) for the mouse position
    // This creates the lagging "Trail" effect where the grid follows slightly behind
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, (mouse.x * viewport.width) / 2, 0.15);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, (mouse.y * viewport.height) / 2, 0.15);

    meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    meshRef.current.material.uniforms.uMouse.value.copy(smoothMouse.current);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </points>
  );
}

export default function DotGrid(props: DotGridProps) {
  return (
    <div className="w-full h-full cursor-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }} 
        gl={{ antialias: true, alpha: true }}
      >
        <GridPoints {...props} />
      </Canvas>
    </div>
  );
}