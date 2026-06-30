"use client";

/**
 * The Quiet Hours — Act 1 ("11:47 PM")
 * Hero object: a hand-blown glass Vessel holding the churning dark "work"
 * (unhandled after-hours admin). Night state. Built with React Three Fiber.
 *
 * No HDRI fetch at runtime — reflections come from in-scene <Lightformer>s,
 * so the scene is fully self-contained (no external CDN dependency).
 */

import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  Float,
  Environment,
  Lightformer,
  GradientTexture,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Vessel() {
  const group = useRef<THREE.Group>(null);

  // Hand-blown vessel silhouette via LatheGeometry (radius, height) profile.
  const geometry = useMemo(() => {
    const profile: [number, number][] = [
      [0.001, -1.28],
      [0.5, -1.24],
      [0.84, -0.96],
      [0.96, -0.46],
      [0.86, 0.04],
      [0.64, 0.46],
      [0.6, 0.62],
      [0.72, 0.86],
      [0.8, 1.04],
      [0.74, 1.18], // rim
      [0.66, 1.2],
    ];
    const points = profile.map(([x, y]) => new THREE.Vector2(x, y));
    const g = new THREE.LatheGeometry(points, 128);
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // slow inevitable rotation + subtle pointer parallax (you're touching the work)
    g.rotation.y = Math.sin(t * 0.13) * 0.22;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.12, 0.04);
    g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 0.18, 0.04);
  });

  return (
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.5}>
      <group ref={group} position={[0, -0.05, 0]}>
        {/* inner churning "work" — dark, agitated (night state) */}
        <mesh scale={[0.92, 1.08, 0.92]} position={[0, -0.12, 0]}>
          <sphereGeometry args={[0.62, 96, 96]} />
          <MeshDistortMaterial
            color="#0d1320"
            emissive="#5a3a14"
            emissiveIntensity={0.22}
            roughness={0.32}
            metalness={0.65}
            distort={0.5}
            speed={1.5}
          />
        </mesh>

        {/* glass shell */}
        <mesh geometry={geometry}>
          <MeshTransmissionMaterial
            transmission={1}
            thickness={0.7}
            roughness={0.05}
            ior={1.4}
            chromaticAberration={0.07}
            anisotropy={0.3}
            distortion={0.08}
            distortionScale={0.3}
            temporalDistortion={0.08}
            color="#fff5e6"
            attenuationColor="#e8a24a"
            attenuationDistance={1.5}
            backside
          />
        </mesh>
      </group>
    </Float>
  );
}

function Backdrop() {
  // Night gradient the glass refracts (deep ink → pre-dawn slate at the base).
  return (
    <mesh position={[0, 0, -4]} scale={[40, 24, 1]}>
      <planeGeometry />
      <meshBasicMaterial>
        <GradientTexture stops={[0, 0.55, 1]} colors={["#05070c", "#0b1018", "#1b2433"]} size={1024} />
      </meshBasicMaterial>
    </mesh>
  );
}

export default function VesselScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 4.3], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      frameloop="always"
    >
      <color attach="background" args={["#06080e"]} />
      <fog attach="fog" args={["#06080e", 6.5, 15]} />

      <Backdrop />

      <ambientLight intensity={0.22} />
      <directionalLight position={[3.5, 5, 4]} intensity={1.7} color="#ffd9a0" />
      <pointLight position={[-3.5, -1.2, 2.5]} intensity={2.4} color="#e8a24a" distance={12} />
      <spotLight position={[0, 6, 3]} angle={0.5} penumbra={1} intensity={1.4} color="#fff0d8" />

      <Vessel />

      {/* reflections without an HDRI download */}
      <Environment resolution={256}>
        <Lightformer intensity={2.2} position={[0, 3.2, 2]} scale={[7, 2, 1]} color="#fff0d8" />
        <Lightformer intensity={1.3} position={[-4.5, 1, 1]} scale={[3, 4, 1]} color="#e8a24a" />
        <Lightformer intensity={0.7} position={[4.5, -2, 2]} scale={[3, 3, 1]} color="#33425a" />
      </Environment>

      <EffectComposer>
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.62} luminanceSmoothing={0.3} />
        <Vignette offset={0.28} darkness={0.82} />
        <Noise opacity={0.045} />
      </EffectComposer>
    </Canvas>
  );
}
