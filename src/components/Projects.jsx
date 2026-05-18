import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import * as THREE from "three";

const PROJECTS = [
  { title: "Malang Autism Center App", tag: "Flutter · Laravel · Social Impact", status: "🟢 Active · Pending HAKI", hook: "Built for those who can't speak for themselves" },
  { title: "PresMa", tag: "Laravel · KNN · Naive Bayes · ML", status: "✅ Shipped", hook: "ML-powered achievement tracker" },
  { title: "KELANews", tag: "Laravel · PHP · MySQL", status: "✅ Shipped", hook: "Clean news, zero noise" },
  { title: "SiTaTib", tag: "Laravel · PHP · MySQL", status: "✅ Shipped", hook: "Discipline, digitized" },
];

const ORBIT_RADIUS = 8.2;
const BASE_SPEED = 0.2;

/* ─── Gargantua Shader Materials ─── */
const AccretionDiskShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorInner: { value: new THREE.Color("#0d9488") }, // Cosmic Teal
    uColorMid: { value: new THREE.Color("#7c3aed") },   // Vibrant Purple
    uColorOuter: { value: new THREE.Color("#fbbf24") }, // Celestial Gold
    uBrightness: { value: 1.5 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vLocalPos;
    void main() {
      vUv = uv;
      vLocalPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorInner;
    uniform vec3 uColorMid;
    uniform vec3 uColorOuter;
    uniform float uBrightness;
    varying vec2 vUv;
    varying vec3 vLocalPos;

    // Procedural Noise functions for turbulent gas
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      for (int i = 0; i < 4; ++i) {
        v += a * noise(p);
        p = p * 2.0 + shift;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      // Local normalized radial coordinates
      vec2 st = vUv - 0.5;
      float r = length(st) * 2.0; // 0 at center, 1 at corners
      float theta = atan(st.y, st.x);

      // Discard core and extreme edge
      if (r < 0.4 || r > 1.0) discard;

      // Flow math: differential rotation (faster closer to singularity)
      float speed = 1.8;
      float angleFlow = theta - uTime * speed * (0.5 / max(r, 0.1));

      // Generate multi-octave gas clouds
      float n1 = fbm(vec2(r * 7.0, angleFlow * 5.0));
      float n2 = fbm(vec2(r * 14.0 + uTime * 0.2, angleFlow * 10.0));
      float gas = smoothstep(0.15, 0.85, n1 * 0.65 + n2 * 0.35);

      // Accretion thermal falloff
      float intensity = smoothstep(0.4, 0.55, r) * (1.0 - smoothstep(0.75, 1.0, r));

      // Relativistic Doppler Beaming: Left side (approaching) is much brighter!
      float beaming = 1.2 - (st.x * 0.95); 

      // Smooth multi-color gradient from Teal -> Purple -> Gold
      float t1 = smoothstep(0.4, 0.65, r);
      float t2 = smoothstep(0.65, 1.0, r);
      vec3 color = mix(mix(uColorInner, uColorMid, t1), uColorOuter, t2);

      // Add an intense bright white inner lip representing superheated matter
      color += vec3(1.0, 1.0, 1.0) * smoothstep(0.7, 1.0, gas) * smoothstep(0.6, 0.4, r) * 0.8;

      float finalAlpha = intensity * (gas + 0.15) * beaming * uBrightness;
      finalAlpha = clamp(finalAlpha, 0.0, 1.0);

      gl_FragColor = vec4(color, finalAlpha);
    }
  `
};

const LensingHaloShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorInner: { value: new THREE.Color("#0d9488") }, // Cosmic Teal
    uColorOuter: { value: new THREE.Color("#fbbf24") }  // Gold
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorInner;
    uniform vec3 uColorOuter;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      // Fresnel effect simulating lensed light shroud around the singularity
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      // Powerful thin bright halo effect
      float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 3.5);
      
      float glow = fresnel * 1.4;
      vec3 color = mix(uColorInner, uColorOuter, fresnel);
      color = mix(color, vec3(1.0, 1.0, 1.0), fresnel * 0.5);
      
      gl_FragColor = vec4(color, glow * 0.8);
    }
  `
};

/* ─── Black Hole ─── */
const BlackHole = ({ meshRef }) => {
  const diskMatRef = useRef();
  const haloMatRef = useRef();
  const warpRef = useRef();
  
  // Update shader time uniforms for realistic flow
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (diskMatRef.current) {
      diskMatRef.current.uniforms.uTime.value = elapsed;
    }
    if (haloMatRef.current) {
      haloMatRef.current.uniforms.uTime.value = elapsed;
    }
    // Add a subtle, ominous rotation to the whole vertical warp structure
    if (warpRef.current) {
      warpRef.current.rotation.y = elapsed * 0.05;
    }
  });

  const diskShaderData = useMemo(() => ({
    ...AccretionDiskShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  }), []);

  const haloShaderData = useMemo(() => ({
    ...LensingHaloShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  }), []);

  return (
    <group>
      {/* 1. The Singularity Core (Solid Light Trap) */}
      <mesh ref={meshRef} renderOrder={2}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* 2. Gravitational Lensing Shroud (Atmospheric Light Bender) */}
      <mesh ref={warpRef} renderOrder={1}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <shaderMaterial 
          ref={haloMatRef}
          attach="material" 
          args={[haloShaderData]} 
        />
      </mesh>

      {/* 3. Horizontal Accretion Disk (Procedural Gas) */}
      {/* Tilted slightly for cinematic dramatic angle */}
      <mesh rotation={[Math.PI / 2 + 0.15, 0, 0.2]} scale={[12.5, 12.5, 1]} renderOrder={3}>
        <planeGeometry args={[1, 1, 64, 64]} />
        <shaderMaterial 
          ref={diskMatRef}
          attach="material"
          args={[diskShaderData]}
        />
      </mesh>

      {/* 4. Relativistic Vertical Lensed Light Loop (Interstellar Halo) */}
      {/* This mimics the light bent from behind the black hole over the top and bottom */}
      <mesh rotation={[0.2, 0.1, 0]} scale={[9.0, 9.0, 1]} renderOrder={0}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial 
          attach="material"
          args={[diskShaderData]}
        />
      </mesh>
      
      {/* 5. Deep Void Core Corona */}
      <mesh>
        <sphereGeometry args={[4.2, 32, 32]} />
        <meshBasicMaterial 
          color="#7c3aed" // Purple glow around the core
          transparent 
          opacity={0.05} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </mesh>
    </group>
  );
};

/* ─── Orbit Ring ─── */
const OrbitRing = () => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * ORBIT_RADIUS, 0, Math.sin(a) * ORBIT_RADIUS));
    }
    return pts;
  }, []);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <line geometry={geo}>
      <lineBasicMaterial color="#fbbf24" transparent opacity={0.15} />
    </line>
  );
};

/* ─── Planet Card ─── */
const Planet = ({ project, index, angle, hovered, onEnter, onLeave, occluder }) => {
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.position.set(
      Math.cos(angle.current + (index / PROJECTS.length) * Math.PI * 2) * ORBIT_RADIUS,
      0,
      Math.sin(angle.current + (index / PROJECTS.length) * Math.PI * 2) * ORBIT_RADIUS
    );
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={hovered ? "#fbbf24" : "#0d9488"} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#fbbf24" : "#0d9488"} transparent opacity={hovered ? 0.3 : 0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <Html
        position={[0, 1.4, 0]}
        center
        distanceFactor={12}
        occlude={occluder ? [occluder] : false}
        zIndexRange={[100, 0]}
      >
        <div
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          data-testid={`project-card-${index}`}
          style={{
            width: 240, padding: "16px 18px", borderRadius: 8,
            backdropFilter: "blur(16px)",
            background: hovered ? "rgba(10,10,15,0.95)" : "rgba(10,10,15,0.75)",
            border: hovered ? "1px solid rgba(251,191,36,0.8)" : "1px solid rgba(13,148,136,0.3)",
            cursor: "pointer", transition: "all .3s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            boxShadow: hovered ? "0 0 24px rgba(251,191,36,0.4)" : "none",
            pointerEvents: "auto",
          }}
        >
          <p style={{ fontFamily: '"Outfit",sans-serif', fontSize: 9, textTransform: "uppercase", letterSpacing: "0.3em", color: "#0d9488", marginBottom: 6 }}>{project.status}</p>
          <h3 style={{ fontFamily: '"Oswald",sans-serif', fontSize: 17, textTransform: "uppercase", color: "#f0f0ff", marginBottom: 6, lineHeight: 1.2 }}>{project.title}</h3>
          <p style={{ fontFamily: '"Outfit",sans-serif', fontSize: 11, color: "rgba(240,240,255,0.55)", marginBottom: 10 }}>{project.tag}</p>
          <p style={{ fontFamily: '"Shippori Mincho",serif', fontStyle: "italic", fontSize: 12, color: "rgba(240,240,255,0.75)", borderLeft: "2px solid rgba(13,148,136,0.4)", paddingLeft: 10 }}>&ldquo;{project.hook}&rdquo;</p>
        </div>
      </Html>
    </group>
  );
};

/* ─── Scene with drag-to-spin via raycasting ─── */
const Scene = ({ paused, setPaused }) => {
  const blackHoleMeshRef = useRef();
  const orbitAngle = useRef(0);
  const { gl, camera } = useThree();
  const drag = useRef({ active: false, prevAngle: 0, vel: 0 });
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const orbitPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const hitPoint = useMemo(() => new THREE.Vector3(), []);

  // Raycast mouse onto y=0 plane → get angle from center
  const getPlaneAngle = useCallback((clientX, clientY) => {
    const rect = gl.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.ray.intersectPlane(orbitPlane, hitPoint);
    if (!hit) return null;
    return Math.atan2(hit.z, hit.x);
  }, [gl, camera, raycaster, orbitPlane, hitPoint]);

  useEffect(() => {
    const el = gl.domElement;
    const onDown = (e) => {
      const a = getPlaneAngle(e.clientX, e.clientY);
      if (a !== null) drag.current = { active: true, prevAngle: a, vel: 0 };
    };
    const onMove = (e) => {
      if (!drag.current.active) return;
      const a = getPlaneAngle(e.clientX, e.clientY);
      if (a === null) return;
      let delta = a - drag.current.prevAngle;
      // Handle wrap-around at ±π
      if (delta > Math.PI) delta -= Math.PI * 2;
      if (delta < -Math.PI) delta += Math.PI * 2;
      drag.current.vel = delta;
      orbitAngle.current += delta;
      drag.current.prevAngle = a;
    };
    const onUp = () => { drag.current.active = false; };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [gl, getPlaneAngle]);

  // Auto-rotate + momentum
  useFrame((_, dt) => {
    if (!drag.current.active) {
      // Momentum decay
      orbitAngle.current += drag.current.vel;
      drag.current.vel *= 0.96;
      // Auto speed when momentum dies
      if (Math.abs(drag.current.vel) < 0.001 && hoveredIdx === -1) {
        orbitAngle.current += BASE_SPEED * dt;
      }
    }
  });

  return (
    <>
      <color attach="background" args={["#0a0a0f"]} />
      <BlackHole meshRef={blackHoleMeshRef} />
      <OrbitRing />
      {PROJECTS.map((p, i) => (
        <Planet
          key={p.title}
          project={p}
          index={i}
          angle={orbitAngle}
          hovered={hoveredIdx === i}
          onEnter={() => { setHoveredIdx(i); setPaused(true); }}
          onLeave={() => { setHoveredIdx(-1); setPaused(false); }}
          occluder={blackHoleMeshRef}
        />
      ))}
      <Stars radius={80} depth={50} count={1200} factor={3} saturation={0} fade speed={0.3} />
    </>
  );
};

/* ─── Projects Section ─── */
const Projects = () => {
  const [paused, setPaused] = useState(false);
  return (
    <section id="projects" data-testid="projects-section" className="relative min-h-screen w-full bg-[#0a0a0f] py-24 md:py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto mb-4 flex items-end justify-between">
        <div>
          <p className="font-outfit text-[10px] uppercase tracking-[0.5em] text-[#0d9488] mb-3">02 / Constellation of Work</p>
          <h2 className="font-oswald uppercase text-4xl md:text-6xl tracking-tight text-[#f0f0ff]" data-testid="projects-heading">PROJECTS IN ORBIT</h2>
        </div>
        <span className="hidden md:block font-shippori text-xl text-[#fbbf24]/70">作品</span>
      </div>
      <div className="relative z-10 w-full" style={{ height: 650 }}>
        <Canvas
          camera={{ position: [0, 10, 16], fov: 45, near: 0.1, far: 100 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
          onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        >
          <Scene paused={paused} setPaused={setPaused} />
        </Canvas>
      </div>
      <p className="relative z-10 mt-4 text-center font-outfit text-[10px] uppercase tracking-[0.4em] text-[#f0f0ff]/40">
        ↻ hover to halt · drag left/right to spin the orbit
      </p>
    </section>
  );
};

export default Projects;
