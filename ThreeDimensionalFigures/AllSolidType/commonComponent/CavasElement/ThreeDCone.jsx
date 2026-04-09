import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Cone = ({ color, autoRotate }) => {
  const groupRef = useRef(null);
  const geometry = new THREE.ConeGeometry(1.4, 2.8, 32);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Cone surface */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={1}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Cone edges */}
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="#e5e5e5" />
      </lineSegments>
    </group>
  );
};

const Cone3D = () => {
  const [color, setColor] = useState("#f97316");
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <div
      style={{
        width: "400px",
        height: "450px",
        background: "#fff",
        borderRadius: "20px",
        padding: "10px",
        position: "relative",
      }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />

        <Cone color={color} autoRotate={autoRotate} />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Auto rotate button */}
      <div
        style={{
          position: "absolute",
          left: "0.5rem",
          top: "0.5rem",
        }}
      >
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: autoRotate ? "#ef4444" : "#22c55e",
            color: "#fff",
          }}
        >
          {autoRotate ? "Stop Rotation" : "Auto Rotate"}
        </button>
      </div>

      {/* Color picker */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "1rem",
        }}
      >
        {["#f97316", "#22c55e", "#3b82f6", "#ef4444"].map((c) => (
          <div
            key={c}
            onClick={() => setColor(c)}
            style={{
              width: "30px",
              height: "30px",
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

export default Cone3D;
