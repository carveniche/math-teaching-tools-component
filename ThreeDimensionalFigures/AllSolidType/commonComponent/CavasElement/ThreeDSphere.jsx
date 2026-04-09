import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Sphere = ({ color, autoRotate }) => {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={1}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Outline */}
      <lineSegments>
        <edgesGeometry args={[new THREE.SphereGeometry(1.5, 32, 32)]} />
        <lineBasicMaterial color="#e5e5e5" />
      </lineSegments>
    </group>
  );
};

const Sphere3D = () => {
  const [color, setColor] = useState("#22c55e");
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <div
      style={{
        width: "400px",
        height: "450px",
        background: "#fff",
        borderRadius: "20px",
        padding: "10px",
        position:"relative"
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />

        <Sphere color={color} autoRotate={autoRotate} />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Rotate button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10,position:"absolute",left:'0.5rem',top:"0rem" }}>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          style={{
            padding: "8px 16px",
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
        {["#22c55e", "#3b82f6", "#ef4444", "#eab308"].map((c) => (
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

export default Sphere3D;
