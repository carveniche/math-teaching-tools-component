import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Cube = ({ color, autoRotate }) => {
  const groupRef = useRef(null);
  const geometry = new THREE.BoxGeometry(2, 2, 2);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group ref={groupRef} scale={1.6}>
      {/* Transparent faces */}
      <mesh geometry={geometry}>
        <meshStandardMaterial color={color} transparent opacity={0.5} />
      </mesh>

      {/* Edges */}
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="black" />
      </lineSegments>
    </group>
  );
};
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const ResponsiveCamera = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    const width = size.width;

    // 🎯 Decide camera based on actual canvas size
    if (width < 500) {
      camera.position.set(7, 7, 7);   // mobile
      camera.fov = 65;
    } else if (width < 900) {
      camera.position.set(5.5, 5.5, 5.5); // tablet
      camera.fov = 55;
    } else {
      camera.position.set(4, 4, 4);   // desktop
      camera.fov = 50;
    }

    camera.updateProjectionMatrix(); // 🔥 VERY IMPORTANT
  }, [size, camera]);

  return null;
};

const Cube3D = () => {
  const [color, setColor] = useState("#4f46e5");
  const [autoRotate, setAutoRotate] = useState(false);

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

      {/* 🔷 3D CANVAS */}
      <Canvas
        style={{ width: "100%", height: "100%" }}   // ✅ full fit
      >
        <ResponsiveCamera />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Cube color={color} autoRotate={autoRotate} />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* 🔷 TOP CONTROLS */}
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
          zIndex: 10,
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

export default Cube3D;