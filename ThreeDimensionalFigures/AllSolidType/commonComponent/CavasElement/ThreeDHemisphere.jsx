import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useTriangleContext } from "../../../contextDimensional/ContextTriangle";

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
      <Canvas camera={{ position: [0, 3, 6], fov: 50 }}>
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

export default Hemisphere3D;
