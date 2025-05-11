'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';

interface PanelProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color?: string;
  delay?: number;
}

const Panel: React.FC<PanelProps> = ({ position, rotation, scale, color = '#1f2937', delay = 0 }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Create a subtle noise texture for the material
  const noiseTexture = useMemo(() => {
    const texture = new THREE.TextureLoader().load('/noise.png');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      // Subtle floating animation
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1;
      
      // Smooth rotation
      mesh.current.rotation.y += 0.002;
      
      // Scale animation
      const targetScale = hovered ? 1.1 : 1;
      mesh.current.scale.lerp(
        new THREE.Vector3(...scale.map(s => s * targetScale)),
        clicked ? 0.1 : 0.05
      );
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh
        ref={mesh}
        position={position}
        rotation={rotation}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <boxGeometry args={[1, 1, 0.1]} />
        <meshPhysicalMaterial
          color={hovered ? '#4f46e5' : color}
          metalness={0.8}
          roughness={0.2}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          map={noiseTexture}
        />
      </mesh>
    </Float>
  );
};

const Scene: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useFrame((state) => {
    if (group.current) {
      // Smooth group rotation
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mousePosition.x * 0.2,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mousePosition.y * 0.1,
        0.05
      );
    }
  });

  const panels = useMemo(() => [
    {
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: [2, 2, 1] as [number, number, number],
      color: '#1f2937',
      delay: 0
    },
    {
      position: [3, 0, -2] as [number, number, number],
      rotation: [0, Math.PI / 4, 0] as [number, number, number],
      scale: [1.5, 1.5, 1] as [number, number, number],
      color: '#4f46e5',
      delay: 0.5
    },
    {
      position: [-3, 0, -2] as [number, number, number],
      rotation: [0, -Math.PI / 4, 0] as [number, number, number],
      scale: [1.5, 1.5, 1] as [number, number, number],
      color: '#7c3aed',
      delay: 1
    },
  ], []);

  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 5, 20]} />
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <group ref={group}>
        {panels.map((panel, index) => (
          <Panel key={index} {...panel} />
        ))}
      </group>
      <Environment preset="city" />
    </>
  );
};

const GlassmorphicPanels: React.FC = () => {
  return (
    <div className="h-[400px] w-full relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
        shadows
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default GlassmorphicPanels; 