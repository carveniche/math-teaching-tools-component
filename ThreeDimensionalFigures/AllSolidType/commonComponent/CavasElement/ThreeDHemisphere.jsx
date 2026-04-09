import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Hemisphere = ({ color, autoRotate }) => {
  const groupRef = useRef(null);

  const geometry = new THREE.SphereGeometry(
    1.6,
    64,
    64,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  // ✅ One shared material
  const materialProps = {
    color: color,
    roughness: 0.3,
    metalness: 0.1,
  };

  return (
    <group ref={groupRef}>
      {/* Curved hemisphere */}
      <mesh geometry={geometry}>
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Edge lines */}
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="#ffffff" />
      </lineSegments>

      {/* Flat base - SAME MATERIAL */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.001, 0]}   // 👈 tiny lift to avoid flicker
      >
        <circleGeometry args={[1.6, 64]} />
        <meshStandardMaterial {...materialProps} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};


const Hemisphere3D = () => {
  const [color, setColor] = useState("#3b82f6");
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <div
      style={{
        width: "400px",
        height: "450px",
        background: "#c1e3db",
        borderRadius: "20px",
        padding: "10px",
        position: "relative",
      }}
    >
      <Canvas camera={{ position: [0, 2.5, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />

        <Hemisphere color={color} autoRotate={autoRotate} />

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
        {["#3b82f6", "#22c55e", "#ef4444", "#eab308"].map((c) => (
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

export default Hemisphere3D;
