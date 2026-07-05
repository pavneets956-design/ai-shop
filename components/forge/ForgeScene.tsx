"use client";

/**
 * /forge — the cinematic hero scene. One forged gold ingot in a black studio;
 * orbiting fragments fuse into it as the page scrolls and the metal heats up.
 *
 * Film-frame rules (from the art-direction contract):
 *  - metal is its environment: static Lightformer "studio" + animated key light
 *  - nothing moves 1:1 with scroll — targets are damped (weighted mass)
 *  - post stack (Bloom/DoF/Vignette/grain/CA) tuned subtle; degrades by FPS probe
 */

import { useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  ChromaticAberration,
  Vignette,
  Noise,
  SMAA,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

type SceneProps = {
  /** Scroll progress 0..1, written by the page (never React state). */
  progress: MutableRefObject<number>;
  /** Lite tier: phones/coarse pointers — idle loop, minimal post. */
  lite: boolean;
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Linear window ramp: 0 before `a`, 1 after `b`. */
const ramp = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const smooth = (f: number) => f * f * (3 - 2 * f);

/* ------------------------------------------------------------------ */
/* Geometry — trapezoid-profile ingot with generous bevels             */
/* ------------------------------------------------------------------ */

function useIngotGeometry() {
  return useMemo(() => {
    // End profile (XY): bullion taper — wider at the base, rounded corners.
    const bw = 2.0; // bottom width
    const tw = 1.6; // top width
    const h = 0.9;
    const r = 0.08; // corner radius
    const s = new THREE.Shape();
    s.moveTo(-bw / 2 + r, 0);
    s.lineTo(bw / 2 - r, 0);
    s.quadraticCurveTo(bw / 2, 0, bw / 2 - (bw - tw) / 2 / (h / r), r); // ease into the draft
    s.lineTo(tw / 2 + r * 0.4, h - r);
    s.quadraticCurveTo(tw / 2, h, tw / 2 - r, h);
    s.lineTo(-tw / 2 + r, h);
    s.quadraticCurveTo(-tw / 2, h, -tw / 2 - r * 0.4, h - r);
    s.lineTo(-bw / 2 + (bw - tw) / 2 / (h / r), r);
    s.quadraticCurveTo(-bw / 2, 0, -bw / 2 + r, 0);

    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 1.1,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 5, // a specular line must ride the edge — hard edges read as CGI
    });
    geo.center();
    return geo;
  }, []);
}

/* ------------------------------------------------------------------ */
/* Fragments — the "forged by hand" beat                               */
/* ------------------------------------------------------------------ */

type Fragment = {
  geo: "icosa" | "tetra" | "octa";
  size: number;
  orbitR: number;
  speed: number;
  phase: number;
  incl: number; // orbital inclination — never coplanar
  spin: [number, number];
  anchor: THREE.Vector3; // landing point on the ingot's top face (group space)
  window: [number, number]; // scroll window in which this fragment fuses
};

function makeFragments(count: number): Fragment[] {
  // Deterministic pseudo-random so SSR/renders agree and the shot is repeatable.
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const geos = ["icosa", "tetra", "octa"] as const;
  return Array.from({ length: count }, (_, i) => {
    const big = rnd() > 0.7; // power-law: ~70% chips, ~30% chunks
    const start = 0.16 + i * (0.36 / count);
    return {
      geo: geos[i % 3],
      size: big ? 0.1 + rnd() * 0.07 : 0.05 + rnd() * 0.05,
      orbitR: 2.3 + rnd() * 2.2,
      speed: 0.25 + rnd() * 0.3,
      phase: rnd() * Math.PI * 2,
      incl: (rnd() - 0.5) * 0.9, // ±25°
      spin: [0.4 + rnd() * 0.8, 0.3 + rnd() * 0.7],
      anchor: new THREE.Vector3((rnd() - 0.5) * 1.3, 0.42, (rnd() - 0.5) * 0.7),
      window: [start, start + 0.13],
    };
  });
}

function FragmentMesh({ frag, progress, heatRef, frozen }: {
  frag: Fragment;
  progress: MutableRefObject<number>;
  heatRef: MutableRefObject<number>;
  frozen: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshStandardMaterial>(null!);
  const v = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = progress.current;
    const f = frozen ? 0 : smooth(ramp(p, frag.window[0], frag.window[1]));

    // Orbit slows as the ingot captures the fragment → spiral-in.
    const theta = frag.phase + t * frag.speed * (1 - f * 0.7);
    v.set(Math.cos(theta) * frag.orbitR, Math.sin(theta) * frag.orbitR * Math.sin(frag.incl), Math.sin(theta) * frag.orbitR * Math.cos(frag.incl));
    // Accelerating capture: ease-in toward the anchor, then sink beneath the surface.
    const cap = f * f;
    mesh.current.position.lerpVectors(v, frag.anchor, cap);
    const sink = smooth(ramp(f, 0.75, 1));
    const sc = frag.size * (1 - sink);
    mesh.current.scale.setScalar(Math.max(sc, 0.0001));
    mesh.current.rotation.set(t * frag.spin[0] * (1 - f), t * frag.spin[1] * (1 - f), 0);

    // Landing flash — molten on contact, then gone.
    const flash = smooth(ramp(f, 0.7, 0.92)) * (1 - smooth(ramp(f, 0.92, 1)));
    mat.current.emissiveIntensity = 0.2 + heatRef.current * 0.3 + flash * 4;
  });

  return (
    <mesh ref={mesh}>
      {frag.geo === "icosa" ? (
        <icosahedronGeometry args={[1, 0]} />
      ) : frag.geo === "tetra" ? (
        <tetrahedronGeometry args={[1, 0]} />
      ) : (
        <octahedronGeometry args={[1, 0]} />
      )}
      <meshStandardMaterial
        ref={mat}
        color="#E8B24C"
        metalness={1}
        roughness={0.34}
        envMapIntensity={1.25}
        emissive="#FF6B1A"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* The forged core + choreography                                      */
/* ------------------------------------------------------------------ */

const GOLD = new THREE.Color("#E8B24C");
const HOT_GOLD = new THREE.Color("#FFD9A0");

function ForgedCore({ progress, lite }: SceneProps) {
  const geo = useIngotGeometry();
  const group = useRef<THREE.Group>(null!);
  const mat = useRef<THREE.MeshStandardMaterial>(null!);
  const key = useRef<THREE.SpotLight>(null!);
  const { camera } = useThree();

  const fragments = useMemo(() => makeFragments(lite ? 5 : 12), [lite]);
  // Shared damped state (refs, never React state — 60fps writes).
  const heat = useRef(0.1);
  const rot = useRef(0.55); // open on a 3/4 view — never a dead-parallel face
  const rotSpeed = useRef(0.15);
  const fov = useRef(35);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const p = lite ? 0 : progress.current;

    /* ---- targets from the 4 acts (never bound 1:1 — damped below) ---- */
    let heatT: number, zT: number, fovT: number, speedT: number, xT: number;
    if (lite) {
      // Idle loop: gentle rotation + emissive breathing, static telephoto camera.
      heatT = 0.7 + Math.sin(t * 0.5) * 0.35;
      zT = 4.8; fovT = 33; speedT = 0.12; xT = 0;
    } else {
      heatT =
        0.08 + // near-cold at rest — let the environment carry the gold, not the emissive
        ramp(p, 0.15, 0.55) * 1.0 + // fusion warms it
        ramp(p, 0.55, 0.85) * 1.2 - // heat-up act crosses the bloom threshold
        ramp(p, 0.85, 1) * 0.6; // settles warm — molten edge, never a uniform blob
      zT = 6 - ramp(p, 0.15, 0.55) * 1.4 - ramp(p, 0.55, 0.85) * 0.9 - ramp(p, 0.85, 1) * 0.1;
      fovT = 35 - ramp(p, 0.55, 0.85) * 6; // dolly + compress = product push-in
      speedT = 0.15 - ramp(p, 0.15, 0.55) * 0.03 - ramp(p, 0.55, 0.85) * 0.04 - ramp(p, 0.85, 1) * 0.05;
      xT = ramp(p, 0.55, 0.9) * 0.4; // slight drift — the ingot must stay in the right third
    }

    /* ---- damp everything (weighted mass — the film feel) ---- */
    heat.current = THREE.MathUtils.damp(heat.current, heatT, 4, dt);
    rotSpeed.current = THREE.MathUtils.damp(rotSpeed.current, speedT, 2, dt);
    rot.current += rotSpeed.current * dt;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, zT, 3, dt);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, xT, 3, dt);
    fov.current = THREE.MathUtils.damp(fov.current, fovT, 3, dt);
    const persp = camera as THREE.PerspectiveCamera;
    if (Math.abs(persp.fov - fov.current) > 0.01) {
      persp.fov = fov.current;
      persp.updateProjectionMatrix();
    }
    camera.lookAt(group.current.position.x * 0.8, 0, 0);

    /* ---- apply ---- */
    group.current.rotation.set(-0.07, rot.current, 0.03); // slight tilt — never axis-aligned
    // Counter-parallax drift for depth; ingot lives in the right third on desktop.
    group.current.position.set(lite ? 0 : 1.7, -0.1 + p * 0.35, 0);

    const h = heat.current;
    mat.current.emissiveIntensity = h;
    mat.current.roughness = 0.32 - clamp01((h - 1.2) / 1.8) * 0.1; // molten = smoother
    mat.current.color.copy(GOLD).lerp(HOT_GOLD, clamp01((h - 1.8) / 1.2) * 0.5);

    // Key light drifts — the highlight sweeps the bevel (never static, never fast).
    if (key.current) {
      key.current.position.x = Math.cos(t * 0.15) * 5;
      key.current.position.z = Math.sin(t * 0.15) * 5 + 2;
    }
  });

  return (
    <>
      <group ref={group}>
        <mesh geometry={geo} rotation={[0, Math.PI / 2, 0]}>
          <meshStandardMaterial
            ref={mat}
            color="#E8B24C"
            metalness={1}
            roughness={0.32}
            envMapIntensity={1.25}
            emissive="#FF6B1A"
            emissiveIntensity={0.2}
          />
        </mesh>
        {fragments.map((f, i) => (
          <FragmentMesh key={i} frag={f} progress={progress} heatRef={heat} frozen={lite} />
        ))}
      </group>

      {/* Animated cinematic rig — physical units (three r155+): spots in the tens. */}
      <spotLight ref={key} color="#FFB25E" intensity={60} angle={0.4} penumbra={1} distance={30} position={[4, 6, 5]} />
      <directionalLight color="#6FA8FF" intensity={0.6} position={[-5, 2, -4]} />

      {/* Static reflection studio — the metal IS this environment. No CDN fetch. */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2} position={[0, 4, -2]} scale={[8, 3, 1]} color="#FFF4E6" />
        <Lightformer form="rect" intensity={3} position={[4, 0, 1]} rotation-y={-Math.PI / 2} scale={[3, 6, 1]} color="#F5A623" />
        <Lightformer form="rect" intensity={2} position={[-4, 0, 1]} rotation-y={Math.PI / 2} scale={[3, 6, 1]} color="#3A6EA5" />
        <Lightformer form="circle" intensity={4} position={[1, 2, 3]} scale={[1, 1, 1]} color="#FF6B1A" />
        {/* Large soft frontal sheet — the camera-facing faces must have SOMETHING
            to mirror or they render as flat plastic. Low intensity = gradient sheen. */}
        <Lightformer form="rect" intensity={0.9} position={[0, 1, 5]} scale={[10, 4, 1]} color="#FFE3B8" />
        <Lightformer form="rect" intensity={0.6} position={[0, -3, 0]} rotation-x={-Math.PI / 2} scale={[8, 8, 1]} color="#1A1206" />
      </Environment>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* FPS governor — degrade post level if the device can't hold 30fps    */
/* ------------------------------------------------------------------ */

function PerfGovernor({ onDegrade }: { onDegrade: () => void }) {
  const frames = useRef(0);
  const start = useRef(0);
  useFrame(({ clock }) => {
    if (frames.current === 0) start.current = clock.elapsedTime;
    frames.current++;
    if (frames.current === 90) {
      const avgFps = 90 / (clock.elapsedTime - start.current);
      if (avgFps < 30) onDegrade();
      frames.current = 1; // resample after any degrade
      start.current = clock.elapsedTime;
    }
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* Post stack + canvas root                                            */
/* ------------------------------------------------------------------ */

function PostFX({ level, lite }: { level: number; lite: boolean }) {
  const caOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0006), []);
  if (level <= 0) return null;
  if (lite || level === 1) {
    // Bloom + Vignette carry the look; everything else is the first cut.
    return (
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.65} luminanceThreshold={1.0} luminanceSmoothing={0.3} mipmapBlur radius={0.7} />
        <Vignette offset={0.3} darkness={0.85} />
        <SMAA />
      </EffectComposer>
    );
  }
  return (
    <EffectComposer multisampling={0}>
      <DepthOfField target={[1.7, 0, 0]} focalLength={0.025} bokehScale={2.5} />
      <Bloom intensity={0.65} luminanceThreshold={1.0} luminanceSmoothing={0.3} mipmapBlur radius={0.7} />
      <ChromaticAberration offset={caOffset} radialModulation modulationOffset={0.35} />
      <Vignette offset={0.3} darkness={0.85} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.045} />
      <SMAA />
    </EffectComposer>
  );
}

export default function ForgeScene({ progress, lite }: SceneProps) {
  // 2 = full stack, 1 = Bloom+Vignette, 0 = raw. FPS probe steps it down.
  const [postLevel, setPostLevel] = useState(lite ? 1 : 2);

  return (
    <Canvas
      dpr={lite ? [1, 1.5] : [1, 2]}
      // stencil/depth off: EffectComposer owns its own buffers — leaving these on
      // causes GL_INVALID_OPERATION blit spam and corrupts the DoF depth read.
      gl={{ antialias: false, stencil: false, depth: false, powerPreference: "high-performance" }}
      camera={{ fov: 35, position: [0, 0.35, 6], near: 0.1, far: 40 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping; // this alone transforms the frame
        gl.toneMappingExposure = 1.1;
      }}
    >
      <ForgedCore progress={progress} lite={lite} />
      <PostFX level={postLevel} lite={lite} />
      <PerfGovernor onDegrade={() => setPostLevel((l) => Math.max(0, l - 1))} />
    </Canvas>
  );
}
