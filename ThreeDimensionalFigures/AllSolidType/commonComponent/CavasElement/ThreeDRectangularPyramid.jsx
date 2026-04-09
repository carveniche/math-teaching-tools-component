import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import * as THREE from "three";

const RectangularPyramid = ({ color, autoRotate }) => {
  const groupRef = useRef();

 const geometry = useMemo(() => {
  const geo = new THREE.BufferGeometry();

  const vertices = new Float32Array([
    -1.5, 0, -1,
     1.5, 0, -1,
     1.5, 0,  1,
    -1.5, 0,  1,
     0, 2.6, 0
  ]);

  const indices = [
    0, 1, 2,
    0, 2, 3,
    0, 1, 4,
    1, 2, 4,
    2, 3, 4,
    3, 0, 4
  ];

  geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  geo.center(); // 👈 THIS IS THE KEY LINE

  return geo;
}, []);


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
           side={THREE.DoubleSide}
        />
      </mesh>

      {/* Crisp edges */}
      <Edges geometry={geometry} color="#111" />
    </group>
  );
};

const RectangularPyramid3D = () => {
  const [color, setColor] = useState("#8b5cf6");
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
      <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }} dpr={[1, 1]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />

        <RectangularPyramid color={color} autoRotate={autoRotate} />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Auto rotate */}
      <div style={{ position: "absolute", left: "0.5rem", top: "0.5rem" }}>
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
        {["#8b5cf6", "#22c55e", "#3b82f6", "#ef4444"].map((c) => (
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

export default RectangularPyramid3D;
