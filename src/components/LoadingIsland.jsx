'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import spriteSheet from '../assets/img/sprite/sprite_sheet.webp';

// Standard CSS keyframes for the animations
const STYLE_INJECT = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 12px rgba(124, 58, 237, 0.4), inset 0 0 4px rgba(124, 58, 237, 0.2); }
    50% { box-shadow: 0 0 24px rgba(124, 58, 237, 0.8), inset 0 0 8px rgba(124, 58, 237, 0.4); }
  }
`;

const WhaleSprite = () => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const duration = 4500; // 4.5 seconds to match curtain wipe transition
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate current frame index (0 to 191)
      const frame = Math.min(Math.floor(progress * 192), 191);
      setCurrentFrame(frame);

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, 20); // 20ms interval (50 FPS)

    return () => clearInterval(timer);
  }, []);

  // 14x14 grid calculations (14 columns, 14 rows)
  const col = currentFrame % 14;
  const row = Math.floor(currentFrame / 14);

  return (
    <div 
      style={{
        width: '320px',
        height: '180px',
        backgroundImage: `url(${spriteSheet.src || spriteSheet})`,
        backgroundPosition: `${-(col * 320)}px ${-(row * 180)}px`,
        backgroundSize: '4480px 2520px', // 14 columns * 320px, 14 rows * 180px
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};

const LoadingScreen = ({ onReveal }) => {
  const [progressWidth, setProgressWidth] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [stars, setStars] = useState([]);
  
  // Generate stars on mount to avoid SSR mismatch
  useEffect(() => {
    const generatedStars = Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
      duration: 1.5 + Math.random() * 2
    }));
    setStars(generatedStars);
  }, []);

  // Progress simulation over exactly 2 seconds (2000ms)
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutQuad
      const width = (progress * (2 - progress)) * 180;
      setProgressWidth(width);

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, 20); // 20ms interval (50 FPS)

    return () => clearInterval(timer);
  }, []);

  // When 100% reached, trigger delay then show button
  useEffect(() => {
    if (progressWidth >= 180) {
      const timeout = setTimeout(() => {
        setShowButton(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progressWidth]);

  const pct = Math.min(Math.round((progressWidth / 180) * 100), 100);
  const name = "CREATING UNIVERSE";

  return (
    <div className="fixed inset-0 w-full h-full bg-[#080810] z-[9999] flex flex-col items-center justify-center overflow-hidden select-none font-outfit">
      <style dangerouslySetInnerHTML={{ __html: STYLE_INJECT }} />
      
      {/* Star Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map(star => (
          <div 
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0.2,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>

      {/* Main Centered Content */}
      <div className="relative flex flex-col items-center justify-center z-10">
        <AnimatePresence mode="wait">
          {!showButton ? (
            <motion.div 
              key="loading-info"
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Float Animated Name */}
              <h1 className="text-white text-xs md:text-sm tracking-[0.45em] font-light mb-10 flex flex-wrap justify-center">
                {name.split("").map((char, i) => (
                  <span 
                    key={i} 
                    style={{ 
                      display: char === " " ? "inline" : "inline-block",
                      whiteSpace: "pre",
                      animation: char === " " ? "none" : `float 2.2s ease-in-out infinite`,
                      animationDelay: `${i * 0.08}s`
                    }}
                  >
                    {char}
                  </span>
                ))}
              </h1>

              {/* Progress Bar Wrapper */}
              <div className="w-[180px] h-[1.5px] bg-white/10 relative overflow-hidden rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-[#7c3aed] to-[#0d9488] transition-all duration-100 ease-out"
                  style={{ width: `${progressWidth}px` }}
                />
              </div>

              {/* Percentage */}
              <p className="text-[10px] text-white/40 tracking-widest mt-3 tabular-nums font-mono">
                {pct}%
              </p>
            </motion.div>
          ) : (
            <motion.button
              key="start-button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5 }}
              onClick={onReveal}
              className="border border-[rgba(124,58,237,0.7)] bg-transparent text-[#c4b5fd] text-[13px] tracking-[0.35em] uppercase px-10 py-3.5 rounded transition-colors duration-300 hover:bg-[rgba(124,58,237,0.15)] hover:text-[#ede9fe] focus:outline-none active:scale-95"
              style={{ animation: 'glowPulse 2.5s infinite' }}
            >
              IT'S SHOW TIME
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function LoadingIsland({ children }) {
  const [state, setState] = useState('loading'); // 'loading', 'revealing', 'complete'

  useEffect(() => {
    // Prevent body scrolling while loader is active
    if (state !== 'complete') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [state]);

  const handleStartReveal = () => {
    // Transition starts from button click
    setState('revealing');
  };

  return (
    <>
      {/* Phase 1: Simulated Preload */}
      {state === 'loading' && (
        <LoadingScreen onReveal={handleStartReveal} />
      )}

      {/* Phase 2: Reveal Wipe + Whale Swim */}
      <AnimatePresence onExitComplete={() => setState('complete')}>
        {state === 'revealing' && (
          <>
            {/* Curtain Wipe */}
            <motion.div
              initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)' }}
              animate={{ clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%, 125% 50%)' }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 4.5,
                ease: [0.76, 0, 0.24, 1]
              }}
              onAnimationComplete={() => setState('complete')}
              className="fixed inset-0 w-full h-full bg-[#080810] z-[9998] pointer-events-none"
            />

            {/* Whale Runner */}
            <motion.div
              initial={{ left: '-600px', opacity: 1, scale: 1.8, y: '-50%' }}
              animate={{ 
                left: 'calc(100% + 200px)',
                opacity: [1, 1, 1, 0.5, 0], // Fade out at the very end (approx last 15%)
                y: '-50%'
              }}
              transition={{
                duration: 4.5,
                ease: [0.76, 0, 0.24, 1],
                // Connect opacity keyframes so it fades at 85% of the path
                opacity: {
                  times: [0, 0.7, 0.85, 0.95, 1],
                  values: [1, 1, 1, 0, 0],
                  duration: 4.5,
                  ease: "linear"
                }
              }}
              className="fixed top-1/2 z-[9999] pointer-events-none flex items-center justify-center"
            >
              <WhaleSprite />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Backing child content */}
      <div 
        style={{ 
          visibility: state === 'loading' ? 'hidden' : 'visible',
          position: state === 'loading' ? 'fixed' : 'relative',
          width: '100%',
          height: state === 'loading' ? '100vh' : 'auto',
          overflow: state === 'loading' ? 'hidden' : 'visible'
        }}
      >
        {children}
      </div>
    </>
  );
}
