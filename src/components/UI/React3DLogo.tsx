"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

interface React3DLogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

function ReactModel({
  url = "/models/react_logo.glb",
  scale = 0.82,
  rotationSpeed = 0.35,
  initialRotation = [0, 0, 0],
}: {
  url?: string;
  scale?: number;
  rotationSpeed?: number;
  initialRotation?: [number, number, number];
}) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  // Smooth continuous rotation & gentle floating rocking
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * rotationSpeed;
      modelRef.current.rotation.x =
        0.08 * Math.sin(state.clock.elapsedTime * (rotationSpeed || 0.35));
    }
  });

  return (
    <group ref={modelRef}>
      <Center>
        <group rotation={new THREE.Euler(...initialRotation)}>
          <primitive object={scene} scale={scale} />
        </group>
      </Center>
    </group>
  );
}

useGLTF.preload("/models/react_logo.glb");

export default function React3DLogo({
  className = "",
  size = "large",
}: React3DLogoProps) {
  const sizeClasses = {
    small: "w-[160px] h-[160px] sm:w-[190px] sm:h-[190px]",
    medium:
      "w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] lg:w-[280px] lg:h-[280px]",
    large:
      "w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px]",
  };

  const modelScales = {
    small: 0.76,
    medium: 0.82,
    large: 0.92,
  };

  return (
    <motion.div
      initial={{ y: 60, opacity: 0, scale: 0.85 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        bounce: 0.4,
        duration: 1.4,
        delay: 0.2,
      }}
      className={`relative pointer-events-none select-none drop-shadow-xl ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        {/* Balanced Three.js Studio Lighting matching Wildan's setup */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.7} />
        <directionalLight
          position={[-10, -10, -10]}
          intensity={0.6}
          color="#455ce9"
        />

        <Suspense fallback={null}>
          {/* Floating and rocking motion with safe range so it never clips */}
          <Float
            speed={2}
            rotationIntensity={0.15}
            floatIntensity={0.8}
            floatingRange={[-0.15, 0.15]}
          >
            <ReactModel
              url="/models/react_logo.glb"
              scale={modelScales[size]}
              rotationSpeed={0.35}
            />
          </Float>
        </Suspense>
      </Canvas>
    </motion.div>
  );
}
