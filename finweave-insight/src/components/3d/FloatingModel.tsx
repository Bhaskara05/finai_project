import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[0.3, 16, 16]}>
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.1} />
    </Sphere>
  );
}

function AnimatedBox({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 1.5) * 0.3;
    }
  });

  return (
    <Box ref={meshRef} position={position} args={[0.4, 0.4, 0.4]}>
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </Box>
  );
}

function AnimatedTorus({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 1.8) * 0.2;
    }
  });

  return (
    <Torus ref={meshRef} position={position} args={[0.3, 0.1, 8, 16]}>
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.1} />
    </Torus>
  );
}

function Scene() {
  const objects = useMemo(() => [
    { type: 'sphere', position: [-2, 1, 0] as [number, number, number], color: '#3b82f6' },
    { type: 'box', position: [2, -1, 1] as [number, number, number], color: '#10b981' },
    { type: 'torus', position: [0, 0, -1] as [number, number, number], color: '#f59e0b' },
    { type: 'sphere', position: [1.5, 1.5, 2] as [number, number, number], color: '#ef4444' },
    { type: 'box', position: [-1.5, -0.5, -2] as [number, number, number], color: '#8b5cf6' },
  ], []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {objects.map((obj, index) => {
        switch (obj.type) {
          case 'sphere':
            return <AnimatedSphere key={index} position={obj.position} color={obj.color} />;
          case 'box':
            return <AnimatedBox key={index} position={obj.position} color={obj.color} />;
          case 'torus':
            return <AnimatedTorus key={index} position={obj.position} color={obj.color} />;
          default:
            return null;
        }
      })}
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxDistance={8}
        minDistance={3}
      />
    </>
  );
}

export function FloatingModel() {
  return (
    <div className="w-full h-96 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}