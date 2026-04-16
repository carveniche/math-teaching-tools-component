import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import * as THREE from "three";
import { useTriangleContext } from "../../../contextDimensional/ContextTriangle";

const SquarePyramid = ({ color, autoRotate }) => {
  const groupRef = useRef(null);

  // radius, height, radialSegments = 4 (square base)
  const geometry = new THREE.ConeGeometry(1.6, 2.6, 4);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Pyramid faces */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Sharp edges */}
      <Edges
        geometry={geometry}
        color="#111"
        threshold={15}
      />
    </group>
  );
};

const SquarePyramid3D = () => {
  const [color, setColor] = useState("#f59e0b");
  const [autoRotate, setAutoRotate] = useState(false);
  const { isLiveClass } = useTriangleContext();

  return (
    <div
      style={{
        width: "100%",        // ✅ full width
        height: "100%",       // ✅ full height (comes from parent)
        position: "relative",
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1]}   // 👈 removes edge blur
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />

        <SquarePyramid color={color} autoRotate={autoRotate} />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Auto rotate button */}
      <div
        style={{
          position: "absolute",
          top: "clamp(8px,2vh,16px)",
          left: "clamp(8px,2vw,16px)",
         
        }}
      >
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          style={{
            padding: "clamp(6px,1vw,10px) clamp(10px,2vw,16px)",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: autoRotate ? "#ef4444" : "#22c55e",
            color: "#fff",
            fontSize: "clamp(12px,1vw,14px)"
          }}
        >
          {autoRotate ? "Stop" : "Rotate"}
        </button>
      </div>

      {/* 🔷 COLOR PICKER */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(8px,2vh,16px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
           zIndex: isLiveClass ? 0 : 10,
        }}
      >
        {["#4f46e5", "#22c55e", "#ef4444", "#eab308"].map((c) => (
          <div
            key={c}
            onClick={() => setColor(c)}
            style={{
              width: "clamp(20px,3vw,30px)",
              height: "clamp(20px,3vw,30px)",
              backgroundColor: c,
              borderRadius: "50%",
              cursor: "pointer",
              border: color === c ? "3px solid black" : "2px solid #ccc",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SquarePyramid3D;
