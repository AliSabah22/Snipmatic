'use client';

import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface VideoThumbnailProps {
  position: [number, number, number];
  rotation: [number, number, number];
  url: string;
  index: number;
  title: string;
  description: string;
  delay?: number;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  position,
  rotation,
  url,
  index,
  title,
  description,
  delay = 0
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Create a colored texture with enhanced styling
  const texture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 288;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Enhanced color palette with gradients
      const colors = [
        { start: '#4f46e5', end: '#7c3aed', accent: '#a855f7' }, // Indigo to Purple
        { start: '#db2777', end: '#be185d', accent: '#ec4899' }, // Pink to Rose
        { start: '#059669', end: '#047857', accent: '#10b981' }, // Emerald to Green
        { start: '#d97706', end: '#b45309', accent: '#f59e0b' }, // Amber to Orange
        { start: '#2563eb', end: '#1d4ed8', accent: '#3b82f6' }, // Blue to Indigo
      ];

      const color = colors[index % colors.length];

      // Create gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, color.start);
      bgGradient.addColorStop(0.5, color.accent);
      bgGradient.addColorStop(1, color.end);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle pattern overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < canvas.width; i += 20) {
        for (let j = 0; j < canvas.height; j += 20) {
          if ((i + j) % 40 === 0) {
            ctx.fillRect(i, j, 10, 10);
          }
        }
      }

      // Add depth with multiple gradient overlays
      const overlayGradient1 = ctx.createLinearGradient(0, 0, 0, canvas.height);
      overlayGradient1.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      overlayGradient1.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = overlayGradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const overlayGradient2 = ctx.createLinearGradient(0, 0, canvas.width, 0);
      overlayGradient2.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      overlayGradient2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = overlayGradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add glow effect
      ctx.shadowColor = color.accent;
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Headline styling with improved alignment
      ctx.font = 'bold 42px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 30);

      // Description styling with improved alignment
      ctx.font = '300 24px Inter, Arial, sans-serif';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(description, canvas.width / 2, canvas.height / 2 + 30);

      // Add subtle border with glow
      ctx.strokeStyle = color.accent;
      ctx.lineWidth = 2;
      ctx.shadowColor = color.accent;
      ctx.shadowBlur = 10;
      ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [index, title, description]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1;
      
      const targetRotation = hovered ? 0.1 : 0.002;
      mesh.current.rotation.y += targetRotation;
      
      const targetScale = hovered ? 1.15 : 1;
      mesh.current.scale.lerp(
        new THREE.Vector3(2 * targetScale, 1.125 * targetScale, 1),
        clicked ? 0.1 : 0.05
      );
    }
  });

  if (!texture) return null;

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.8}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={position} rotation={rotation}>
        <mesh
          ref={mesh}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setClicked(!clicked)}
        >
          <planeGeometry args={[2, 1.125]} />
          <meshPhysicalMaterial
            map={texture}
            metalness={0.6}
            roughness={0.2}
            transmission={0.9}
            thickness={0.5}
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            ior={1.5}
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
          />
        </mesh>
        <Text
          position={[0, -0.7, 0.1]}
          fontSize={0.1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
          visible={hovered}
          maxWidth={1.8}
          textAlign="center"
        >
          {description}
        </Text>
      </group>
    </Float>
  );
};

const Scene: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mousePosition.x * 0.3,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mousePosition.y * 0.15,
        0.05
      );
    }
  });

  const thumbnails = useMemo(() => [
    {
      position: [0, 0, -4] as [number, number, number],
      title: 'AI Video Creation',
      description: 'Transform long videos into viral clips',
      delay: 0
    },
    {
      position: [3.5, 0, -2] as [number, number, number],
      title: 'Smart Editing',
      description: 'AI-powered content analysis',
      delay: 0.5
    },
    {
      position: [3, 0, 2] as [number, number, number],
      title: 'Viral Content',
      description: 'Optimize for maximum engagement',
      delay: 1
    },
    {
      position: [-3, 0, 2] as [number, number, number],
      title: 'Auto Captions',
      description: 'Generate accurate subtitles instantly',
      delay: 1.5
    },
    {
      position: [-3.5, 0, -2] as [number, number, number],
      title: 'Social Media Ready',
      description: 'Export for all platforms',
      delay: 2
    },
  ], []);

  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 5, 20]} />
      <ambientLight intensity={0.7} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1.5}
        castShadow
        color="#4f46e5"
      />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        color="#db2777"
      />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
      <group ref={group}>
        {thumbnails.map((thumbnail, index) => (
          <VideoThumbnail
            key={index}
            {...thumbnail}
            url={`/thumbnails/video${index + 1}.jpg`}
            rotation={[0, (index * Math.PI * 2) / thumbnails.length, 0]}
            index={index}
          />
        ))}
      </group>
      <Environment preset="city" />
    </>
  );
};

const ThreeCanvas: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Simple timeout to ensure window is available
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Loading 3D Scene...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Loading 3D Scene...
          </h2>
        </div>
      </div>
    }>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
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
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Scene />
      </Canvas>
    </Suspense>
  );
};

export default ThreeCanvas; 