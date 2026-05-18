import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";

const MagneticButton = ({ children, variant = "outline", testId, href, onClick }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.4 });
  };
  const handleLeave = () => setPos({ x: 0, y: 0 });

  const classes =
    variant === "outline"
      ? "border border-[#f0f0ff]/30 text-[#f0f0ff] hover:bg-[#f0f0ff] hover:text-[#0a0a0f]"
      : "border border-transparent text-[#f0f0ff]/70 hover:text-[#f0f0ff]";

  const Tag = href ? "a" : "button";

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-testid={testId}
      className={`magnetic-btn inline-flex items-center gap-3 px-7 py-3 uppercase tracking-[0.2em] text-xs md:text-sm font-oswald font-medium ${classes}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      download={variant === "ghost" ? "Rizqi_Fauzan_CV.pdf" : undefined}
    >
      {children}
    </Tag>
  );
};

const GLITCH_STYLE = `
  @keyframes cosmicGlitchShadow {
    0%, 100% { text-shadow: none; transform: translate(0); }
    20% { text-shadow: 4px -3px 0 rgba(124,58,237,0.6), -4px 3px 0 rgba(13,148,136,0.6); transform: translate(-3px, 1px); }
    40% { text-shadow: -4px 3px 0 rgba(124,58,237,0.6), 4px -3px 0 rgba(251,191,36,0.6); transform: translate(3px, -1px); }
    60% { text-shadow: 3px 4px 0 rgba(13,148,136,0.6), -3px -4px 0 rgba(124,58,237,0.6); transform: translate(-1px, 3px); }
    80% { text-shadow: -3px -3px 0 rgba(251,191,36,0.6), 3px 3px 0 rgba(13,148,136,0.6); transform: translate(1px, -3px); }
  }
  .cosmic-glitch-active {
    animation: cosmicGlitchShadow 0.2s linear infinite;
  }
`;

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const doScramble = () => {
    if (isGlitching) return; 
    setIsGlitching(true);
    
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < Math.floor(iteration)) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setIsGlitching(false);
        setDisplayText(text);
      }

      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    // Dynamic trigger after component load and initial entry animations
    timeoutRef.current = setTimeout(doScramble, 2500);

    // Periodic ambient scramble
    const ambientTimer = setInterval(doScramble, 12000);

    return () => {
      clearInterval(ambientTimer);
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [text]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLITCH_STYLE }} />
      <span 
        onMouseEnter={doScramble}
        className={isGlitching ? "cosmic-glitch-active inline-block" : "inline-block"}
        style={{ cursor: 'default' }}
      >
        {displayText}
      </span>
    </>
  );
};

const InteractiveStars = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!canvas || !ctx) return;
    
    let animationFrameId;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const stars = Array.from({ length: 120 }).map(() => {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      return {
        x: rx,
        y: ry,
        originX: rx,
        originY: ry,
        size: Math.random() * 1.5 + 0.4,
        baseOpacity: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: (Math.random() - 0.5) * 0.08
      };
    });

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      stars.forEach(star => {
        star.originX += star.speedX;
        star.originY += star.speedY;
        
        if (star.originX < 0) star.originX = canvas.width;
        if (star.originX > canvas.width) star.originX = 0;
        if (star.originY < 0) star.originY = canvas.height;
        if (star.originY > canvas.height) star.originY = 0;

        const dx = mouse.x - star.originX;
        const dy = mouse.y - star.originY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const maxDistance = 110;
        let displacementX = 0;
        let displacementY = 0;

        if (distance < maxDistance && distance > 0) {
          const force = (maxDistance - distance) / maxDistance;
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          
          displacementX = forceDirectionX * force * -35;
          displacementY = forceDirectionY * force * -35;
        }

        star.x += (star.originX + displacementX - star.x) * 0.08;
        star.y += (star.originY + displacementY - star.y) * 0.08;

        const twinkle = Math.sin(Date.now() * 0.002 * star.size + star.originX) * 0.15;
        const currentOpacity = Math.max(0.1, Math.min(1, star.baseOpacity + twinkle));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 240, 255, ${currentOpacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-80" />;
};

const Hero = () => {
  const wrapRef = useRef(null);

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Cursor Aura Motion Values
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smoothing springs
  const smoothX = useSpring(x, { stiffness: 80, damping: 22 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 22 });
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 28 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 28 });

  // Translate spring percentages to tilting angles
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [11, -11]); 
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-11, 11]);

  // Glow background Template
  const glowBg = useMotionTemplate`radial-gradient(650px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(124, 58, 237, 0.15), rgba(13, 148, 136, 0.07), transparent 75%)`;

  const handleMouseMove = (e) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    
    const pctX = (e.clientX - rect.left) / rect.width - 0.5;
    const pctY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(pctX);
    y.set(pctY);

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] flex flex-col items-center justify-center"
      style={{ perspective: 1000 }}
    >
      {/* Interactive Background Elements */}
      <InteractiveStars />
      
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0" 
        style={{ background: glowBg }} 
      />

      {/* Japanese vertical tagline */}
      <div
        className="hidden md:block absolute top-24 right-8 lg:right-16 z-10 group cursor-default"
        data-testid="hero-japanese-tagline"
      >
        <p className="writing-vertical font-shippori text-[#f0f0ff]/40 text-xl tracking-[0.4em] transition-opacity duration-500 group-hover:opacity-0">
          作るから、存在する。
        </p>
        <p className="writing-vertical font-outfit text-[#fbbf24]/70 text-xs tracking-[0.3em] uppercase absolute top-0 right-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          Because I build, I exist.
        </p>
      </div>

      {/* Top label */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-10 left-8 md:left-16 z-10 font-outfit text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#f0f0ff]/50"
        data-testid="hero-label"
      >
        R.F · Portfolio 2025 · Vol.I
      </motion.p>

      {/* Jumbotron */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-oswald font-bold uppercase leading-[0.85] tracking-tighter text-white/70 transition-colors duration-300"
          style={{ fontSize: "clamp(3.5rem, 13vw, 13rem)", transform: "translateZ(40px)" }}
          data-testid="hero-headline-1"
        >
          I BUILD THINGS
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-oswald font-bold uppercase leading-[0.85] tracking-tighter text-[#7c3aed]/85 transition-colors duration-300 mt-1"
          style={{ fontSize: "clamp(3.5rem, 13vw, 13rem)", transform: "translateZ(60px)" }}
          data-testid="hero-headline-2"
        >
          THAT <ScrambleText text="MATTER." />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 font-outfit text-xs md:text-sm uppercase tracking-[0.45em] text-[#f0f0ff]/60"
          style={{ transform: "translateZ(30px)" }}
          data-testid="hero-meta"
        >
          Fullstack Developer · PT. INKA · Polinema · Malang, Indonesia
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row gap-6 items-center justify-center"
          style={{ transform: "translateZ(20px)" }}
        >
          <MagneticButton variant="outline" testId="hero-cta-work" onClick={scrollToProjects}>
            See My Work ↓
          </MagneticButton>
          <MagneticButton variant="ghost" testId="hero-cta-cv" href={`${import.meta.env.BASE_URL}cv.pdf`}>
            Download CV
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-4 right-8 font-outfit text-[10px] uppercase tracking-[0.4em] text-[#f0f0ff]/30">
        scroll ↓
      </div>
    </section>
  );
};

export default Hero;
