import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

// 📊 Portfolio Growth Bars
function GrowthBar({
  position,
  height,
  color,
  label,
}: {
  position: [number, number, number];
  height: number;
  color: string;
  label: string;
}) {
  return (
    <>
      <mesh position={[position[0], height / 2, position[2]]}>
        <boxGeometry args={[0.4, height, 0.4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
      <Text position={[position[0], height + 0.3, position[2]]} fontSize={0.2} color="white">
        {label}
      </Text>
    </>
  );
}

// 🥧 Asset Allocation Pie Slice
function AllocationSlice({
  position,
  color,
  rotation,
  size,
  label,
}: {
  position: [number, number, number];
  color: string;
  rotation: number;
  size: number;
  label: string;
}) {
  return (
    <>
      <mesh position={position} rotation={[Math.PI / 2, 0, rotation]}>
        <ringGeometry args={[0.8, 1.3, 32, 1, 0, size]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <Text
        position={[
          position[0] + Math.cos(rotation + size / 2) * 1.5,
          position[1],
          position[2] + Math.sin(rotation + size / 2) * 1.5,
        ]}
        fontSize={0.18}
        color={color}
      >
        {label}
      </Text>
    </>
  );
}

// 💰 Floating Coins (Transactions)
function FloatingCoin({ position }: { position: [number, number, number] }) {
  const coinRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (coinRef.current) {
      coinRef.current.rotation.y = clock.elapsedTime * 2;
      coinRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <mesh ref={coinRef} position={position}>
      <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
      <meshStandardMaterial color="gold" emissive="gold" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

function Scene() {
  // Bars for savings/investments growth
  const bars = useMemo(
    () => [
      { position: [-2, 0, 0] as [number, number, number], height: 1.2, color: "#10b981", label: "Savings" },
      { position: [-1, 0, 0] as [number, number, number], height: 2.0, color: "#3b82f6", label: "Investments" },
      { position: [0, 0, 0] as [number, number, number], height: 1.5, color: "#f59e0b", label: "Crypto" },
      { position: [1, 0, 0] as [number, number, number], height: 2.5, color: "#8b5cf6", label: "Stocks" },
      { position: [2, 0, 0] as [number, number, number], height: 1.8, color: "#ef4444", label: "Expenses" },
    ],
    []
  );

  // Pie chart for allocation
  const slices = useMemo(
    () => [
      { position: [0, -0.5, 2] as [number, number, number], color: "#3b82f6", rotation: 0, size: Math.PI / 3, label: "Stocks" },
      { position: [0, -0.5, 2] as [number, number, number], color: "#10b981", rotation: Math.PI / 3, size: Math.PI / 4, label: "Savings" },
      { position: [0, -0.5, 2] as [number, number, number], color: "#f59e0b", rotation: (7 * Math.PI) / 12, size: Math.PI / 6, label: "Crypto" },
      { position: [0, -0.5, 2] as [number, number, number], color: "#ef4444", rotation: (3 * Math.PI) / 4, size: Math.PI / 4, label: "Expenses" },
    ],
    []
  );

  // Floating coins around
  const coins = useMemo(
    () => [
      [0, 1.5, -2],
      [1, 2, -1],
      [-1, 1.8, -2.5],
      [0.5, 1.2, -1.5],
    ] as [number, number, number][],
    []
  );

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />

      {/* Growth Bars */}
      {bars.map((bar, i) => (
        <GrowthBar key={i} {...bar} />
      ))}

      {/* Pie Allocation */}
      {slices.map((slice, i) => (
        <AllocationSlice key={i} {...slice} />
      ))}

      {/* Floating Coins */}
      {coins.map((pos, i) => (
        <FloatingCoin key={i} position={pos} />
      ))}

      <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.6} />
    </>
  );
}

export function FloatingModel() {
  return (
    <div className="w-full h-96 rounded-xl overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
