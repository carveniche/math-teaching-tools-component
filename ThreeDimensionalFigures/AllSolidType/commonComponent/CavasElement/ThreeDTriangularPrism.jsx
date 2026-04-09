import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ---------- Shape ---------- */
const TriangularPrism = ({ color, autoRotate }) => {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  // Triangle shape
  const shape = new THREE.Shape();
  shape.moveTo(-1, -1);
  shape.lineTo(1, -1);
  shape.lineTo(0, 1);
  shape.lineTo(-1, -1);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 2,
    bevelEnabled: false,
  });

  return (
    <group ref={groupRef}>
      {/* Solid body */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Edges */}
      <lineSegments geometry={new THREE.EdgesGeometry(geometry)}>
        <lineBasicMaterial color="#222" />
      </lineSegments>
    </group>
  );
};

/* ---------- Main Component ---------- */
const TriangularPrism3D = () => {
  const [color, setColor] = useState("#3b82f6");
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
      <Canvas camera={{ position: [4, 3, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />

        <TriangularPrism color={color} autoRotate={autoRotate} />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Auto Rotate Button */}
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

      {/* Color Picker */}
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

export default TriangularPrism3D;
