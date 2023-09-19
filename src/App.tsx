import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import vertexShader from "./glsl/hello.vert";
import fragmentShader from "./glsl/hello.frag";
import { ShaderMaterial } from "three";

function App() {
  return (
    <div style={{ height: "100dvh", width: "100dvw" }}>
      <Canvas shadows>
        <ambientLight intensity={1}/>
        <pointLight position={[3, 3, 3]}/>
        <directionalLight position={[-2, 3, 5]}/>
        <ShaderPlane/>
        <OrbitControls/>
        <GizmoHelper alignment="top-right" margin={[75, 75]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
      </Canvas>
    </div>
  )
}

const ShaderPlane = () => {

  const ref = React.useRef<ShaderMaterial>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.uniforms.u_time.value += delta;
    }
  });

  return (
    <mesh scale={3}>
      <planeGeometry args={[1, 1, 1]}/>
      <shaderMaterial
        ref={ref}
        vertexShader={vertexShader} 
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: { value: 0.0 }
        }}
      />
    </mesh>
  )
};

export default App