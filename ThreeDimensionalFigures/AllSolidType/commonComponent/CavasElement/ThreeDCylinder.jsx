import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useTriangleContext } from "../../../contextDimensional/ContextTriangle";

// ── Cylinder mesh ─────────────────────────────
const Cylinder = ({ color, autoRotate }) => {
  const groupRef = useRef(null);
  const geometry = new THREE.CylinderGeometry(1, 1, 2.5, 32);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="#e5e5e5" />
      </lineSegments>
    </group>
  );
};

// ── Responsive camera ─────────────────────────
const ResponsiveCamera = () => {
  const { camera, size } = useThree();
  useEffect(() => {
    const width = size.width;

    if (width < 500) {
      camera.position.set(0, 0, 8);
      camera.fov = 65;
    } else if (width < 900) {
      camera.position.set(0, 0, 6);
      camera.fov = 55;
    } else {
      camera.position.set(0, 0, 5);
      camera.fov = 50;
    }

    camera.updateProjectionMatrix();
  }, [size, camera]);

  return null;
};

// ── Main Cylinder3D component ─────────────────
const Cylinder3D = () => {
  const containerRef = useRef(null);
  const [color, setColor] = useState("#3b82f6");
  const [autoRotate, setAutoRotate] = useState(false);
  const { isLiveClass,canvasKey } = useTriangleContext();

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
      {/* 3D Canvas */}
      <Canvas  key={canvasKey}  style={{ width: "100%", height: "100%" }}>
        <ResponsiveCamera />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />

        <Cylinder color={color} autoRotate={autoRotate} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Auto rotate button */}
      <div
        style={{
          position: "absolute",
          top: "clamp(8px,2vh,16px)",
          left: "clamp(8px,2vw,16px)",
          zIndex: 10,
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
            fontSize: "clamp(12px,1vw,14px)",
          }}
        >
          {autoRotate ? "Stop" : "Rotate"}
        </button>
      </div>

      {/* Color picker */}
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
        {["#3b82f6", "#22c55e", "#ef4444", "#eab308"].map((c) => (
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

export default Cylinder3D;