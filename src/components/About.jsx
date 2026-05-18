import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import silhouetteImg from "../assets/img/silhouette2.png";
import realImg from "../assets/img/me2.png";

/* ─── Character Stats Data ─── */
const STATS = [
  { label: "Frontend", value: 88, color: "#0d9488" },
  { label: "Backend", value: 82, color: "#0f766e" },
  { label: "IoT / Hardware", value: 78, color: "#7c3aed" },
  { label: "UI / UX Design", value: 72, color: "#6d28d9" },
  { label: "Leadership", value: 85, color: "#0d9488" },
];

const INFO_TAGS = [
  { label: "LVL", value: "6th Sem" },
  { label: "CLASS", value: "Fullstack" },
  { label: "ORIGIN", value: "Polinema" },
  { label: "GPA", value: "3.87" },
];

const EQUIPMENT = [
  { icon: "◈", name: "React / Next.js", desc: "Frontend" },
  { icon: "◈", name: "Node / Express", desc: "Backend" },
  { icon: "◈", name: "ESP32 / Arduino", desc: "Hardware" },
  { icon: "◈", name: "English · 日本語", desc: "Languages" },
  { icon: "✦", name: "NEC · Compsphere · KMIPN", desc: "Awards" },
];

/* ─── Animated Stat Bar ─── */
const StatBar = ({ label, value, color, delay }) => (
  <div className="mb-3 last:mb-0">
    <div className="flex items-center justify-between mb-1">
      <span className="font-outfit text-[11px] uppercase tracking-widest text-[#f0f0ff]/60">
        {label}
      </span>
      <span className="font-outfit text-[11px] tabular-nums text-[#f0f0ff]/40">
        {value}
      </span>
    </div>
    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.2, 0.8, 0.2, 1] }}
      />
    </div>
  </div>
);

/* ─── Reveal + Localized Ripple Distortion ─── */
const RevealRippleCanvas = ({ silSrc, realSrc, wrapRef }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1, y: -1, active: false });
  const silImgRef = useRef(null);
  const realImgRef = useRef(null);
  const animRef = useRef(null);

  // Reveal trail buffer (low-res)
  const revealBuf = useRef(null);
  const simW = useRef(0);
  const simH = useRef(0);

  const RES = 0.3;
  const BRUSH_RADIUS = 8;
  const DECAY_RATE = 0.00556;
  const DISTORT_STRENGTH = 3;
  const DISTORT_RADIUS = 10;

  useEffect(() => {
    const loadImg = (src, ref) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = typeof src === "string" ? src : src.src || src;
      img.onload = () => { ref.current = img; };
    };
    loadImg(silSrc, silImgRef);
    loadImg(realSrc, realImgRef);
  }, [silSrc, realSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const silCanvas = document.createElement("canvas");
    const silCtx = silCanvas.getContext("2d");
    const realCanvas = document.createElement("canvas");
    const realCtx = realCanvas.getContext("2d");

    let silData = null, realData = null;

    const render = (time) => {
      const wrap = wrapRef.current;
      const silImg = silImgRef.current;
      const realImgEl = realImgRef.current;
      if (!wrap || !silImg || !realImgEl) {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      const rect = wrap.getBoundingClientRect();
      const fullW = Math.floor(rect.width);
      const fullH = Math.floor(rect.height);
      const sw = Math.floor(fullW * RES);
      const sh = Math.floor(fullH * RES);

      if (canvas.width !== fullW || canvas.height !== fullH) {
        canvas.width = fullW;
        canvas.height = fullH;
      }

      if (silCanvas.width !== fullW || silCanvas.height !== fullH) {
        silCanvas.width = fullW;
        silCanvas.height = fullH;
        silCtx.drawImage(silImg, 0, 0, fullW, fullH);
        silData = silCtx.getImageData(0, 0, fullW, fullH).data;

        realCanvas.width = fullW;
        realCanvas.height = fullH;
        realCtx.drawImage(realImgEl, 0, 0, fullW, fullH);
        realData = realCtx.getImageData(0, 0, fullW, fullH).data;
      }

      if (!silData || !realData) {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      if (simW.current !== sw || simH.current !== sh) {
        simW.current = sw;
        simH.current = sh;
        revealBuf.current = new Float32Array(sw * sh);
      }

      const mo = mouseRef.current;
      const reveal = revealBuf.current;
      const cursorSX = Math.floor(mo.x * RES);
      const cursorSY = Math.floor(mo.y * RES);

      if (mo.active && mo.x >= 0 && mo.y >= 0) {
        for (let dy = -BRUSH_RADIUS; dy <= BRUSH_RADIUS; dy++) {
          for (let dx = -BRUSH_RADIUS; dx <= BRUSH_RADIUS; dx++) {
            const px = cursorSX + dx;
            const py = cursorSY + dy;
            if (px >= 0 && px < sw && py >= 0 && py < sh) {
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d <= BRUSH_RADIUS) {
                const strength = 1 - (d / BRUSH_RADIUS);
                const idx = py * sw + px;
                reveal[idx] = Math.min(1, reveal[idx] + strength * 0.4);
              }
            }
          }
        }
      }

      for (let i = 0, len = sw * sh; i < len; i++) {
        if (reveal[i] > 0) {
          reveal[i] = Math.max(0, reveal[i] - DECAY_RATE);
        }
      }

      const outData = ctx.createImageData(fullW, fullH);
      const out = outData.data;

      for (let y = 0; y < fullH; y++) {
        const sy = Math.floor(y * RES);
        for (let x = 0; x < fullW; x++) {
          const sx = Math.floor(x * RES);

          let displaceX = 0;
          let displaceY = 0;

          if (mo.active && mo.x >= 0 && mo.y >= 0) {
            const ddx = sx - cursorSX;
            const ddy = sy - cursorSY;
            const dist = Math.sqrt(ddx * ddx + ddy * ddy);

            if (dist > 0.5 && dist < DISTORT_RADIUS) {
              const normDist = dist / DISTORT_RADIUS;
              const wave = Math.sin(normDist * Math.PI * 2) * (1 - normDist);
              displaceX = (ddx / dist) * wave * DISTORT_STRENGTH;
              displaceY = (ddy / dist) * wave * DISTORT_STRENGTH;
            }
          }

          const sampX = Math.min(fullW - 1, Math.max(0, Math.round(x + displaceX / RES)));
          const sampY = Math.min(fullH - 1, Math.max(0, Math.round(y + displaceY / RES)));

          const srcIdx = (sampY * fullW + sampX) * 4;
          const dstIdx = (y * fullW + x) * 4;

          const revIdx = sy * sw + sx;
          const t = (revIdx >= 0 && revIdx < sw * sh) ? reveal[revIdx] : 0;

          out[dstIdx]     = silData[srcIdx]     + (realData[srcIdx]     - silData[srcIdx])     * t;
          out[dstIdx + 1] = silData[srcIdx + 1] + (realData[srcIdx + 1] - silData[srcIdx + 1]) * t;
          out[dstIdx + 2] = silData[srcIdx + 2] + (realData[srcIdx + 2] - silData[srcIdx + 2]) * t;
          out[dstIdx + 3] = silData[srcIdx + 3] + (realData[srcIdx + 3] - silData[srcIdx + 3]) * t;
        }
      }

      ctx.putImageData(outData, 0, 0);
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animRef.current);
  }, [wrapRef]);

  const handleMove = useCallback((e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  }, [wrapRef]);

  const handleLeave = useCallback(() => {
    mouseRef.current = { ...mouseRef.current, active: false };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
      />
      <div
        className="absolute inset-0 z-10"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      />
    </>
  );
};

const About = () => {
  const imgWrapRef = useRef(null);

  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative min-h-screen w-full bg-[#0a0a0f] py-24 md:py-32 px-6 md:px-16 overflow-hidden"
    >
      <div className="star-field opacity-50" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Photo with ripple distortion reveal */}
        <div className="lg:col-span-7 relative">
          <p className="font-outfit text-[10px] uppercase tracking-[0.5em] text-[#0d9488] mb-6">
            01 / Origin
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            ref={imgWrapRef}
            className="relative max-w-[420px] mx-auto select-none overflow-hidden"
            data-testid="about-photo-reveal"
          >
            {/* Orbital rings decoration */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 500"
              fill="none"
              aria-hidden
            >
              <ellipse cx="200" cy="250" rx="180" ry="220" stroke="#0d9488" strokeOpacity="0.18" />
              <ellipse cx="200" cy="250" rx="140" ry="180" stroke="#7c3aed" strokeOpacity="0.12" />
              <circle cx="380" cy="80" r="2" fill="#fbbf24" />
              <circle cx="40" cy="430" r="1.5" fill="#f0f0ff" />
              <circle cx="60" cy="60" r="1" fill="#f0f0ff" />
            </svg>

            {/* Invisible sizing image */}
            <img
              src={silhouetteImg.src || silhouetteImg}
              alt="Silhouette"
              className="relative w-full h-auto invisible"
              draggable={false}
            />

            {/* Canvas: reveal trail + localized ripple distortion */}
            <RevealRippleCanvas
              silSrc={silhouetteImg}
              realSrc={realImg}
              wrapRef={imgWrapRef}
            />

            {/* Hint text */}
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 font-outfit text-[9px] uppercase tracking-[0.4em] text-[#f0f0ff]/30 whitespace-nowrap z-20 pointer-events-none">
              ✦ hover to reveal
            </p>
          </motion.div>
        </div>

        {/* Right: Character Detail Panel */}
        <div className="lg:col-span-5 relative" data-testid="about-char-panel">
          {/* Header: name + class badge */}
          <div className="mb-6">
            <div className="flex items-baseline justify-between mb-1">
              <h2
                className="font-oswald uppercase text-3xl md:text-4xl tracking-tight text-[#f0f0ff]"
                data-testid="about-heading"
              >
                RIZQI FAUZAN
              </h2>
              <span className="font-shippori text-xl text-[#0d9488]">私について</span>
            </div>
            <p className="font-outfit text-xs uppercase tracking-[0.3em] text-[#fbbf24]/80">
              ✦ Fullstack Developer · IoT Engineer
            </p>
          </div>

          {/* Quick info tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {INFO_TAGS.map((tag) => (
              <div
                key={tag.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.04] border border-white/[0.08]"
              >
                <span className="font-outfit text-[9px] uppercase tracking-widest text-[#0d9488]">
                  {tag.label}
                </span>
                <span className="font-outfit text-xs text-[#f0f0ff]/90">
                  {tag.value}
                </span>
              </div>
            ))}
          </div>

          {/* Bio / flavor text */}
          <p className="font-outfit text-sm text-[#f0f0ff]/50 leading-relaxed mb-6 border-l-2 border-[#7c3aed]/40 pl-4 italic">
            "Shaped by the rails of PT. INKA and the lecture halls of
            Polinema — assembling software with the gravity of intent."
          </p>

          {/* Stats */}
          <div className="mb-6">
            <p className="font-outfit text-[9px] uppercase tracking-[0.4em] text-[#f0f0ff]/30 mb-3">
              ▸ Core Stats
            </p>
            {STATS.map((stat, i) => (
              <StatBar
                key={stat.label}
                label={stat.label}
                value={stat.value}
                color={stat.color}
                delay={0.15 + i * 0.1}
              />
            ))}
          </div>

          {/* Tech Arsenal */}
          <div className="mb-5">
            <p className="font-outfit text-[9px] uppercase tracking-[0.4em] text-[#f0f0ff]/30 mb-3">
              ▸ Tech Arsenal
            </p>
            <div className="space-y-1.5">
              {EQUIPMENT.map((eq) => (
                <div
                  key={eq.name}
                  className="flex items-center gap-3 px-3 py-2 rounded bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
                >
                  <span className={`text-xs ${eq.icon === "✦" ? "text-[#fbbf24]" : "text-[#0d9488]"}`}>
                    {eq.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-outfit text-xs text-[#f0f0ff]/90">{eq.name}</span>
                    <span className="font-outfit text-[10px] text-[#f0f0ff]/30 ml-2">{eq.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progression bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-outfit text-[9px] uppercase tracking-[0.4em] text-[#fbbf24]/60">
                ▸ Timeline Progress
              </span>
              <span className="font-outfit text-[10px] text-[#f0f0ff]/30 tabular-nums">
                Semester 6 / 8
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #fbbf24, #f59e0b)" }}
                initial={{ width: 0 }}
                whileInView={{ width: "75%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

