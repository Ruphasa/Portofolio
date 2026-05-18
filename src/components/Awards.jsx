import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Newspaper Data ─── */
const NEWSPAPERS = [
  {
    id: "nec-2026",
    vol: "Vol. MMXXVI · No. 003",
    date: "May 2026",
    section: "Special Edition · National Engineering",
    headline: "Polinema Sweeps National Engineering Competition",
    subtitle:
      "NEC Lombok 2026 — Rizqi Fauzan leads Polinema to Grand Champion, claiming Gold, Silver, Best Poster ×2, and Best Team.",
    body: [
      "LOMBOK — In a display that judges called \"nothing short of dominant,\" R. Fauzan of Politeknik Negeri Malang delivered two separate titles at the National Engineering Competition, securing Gold and Silver medals across both entries.",
      "The victories did not stop there. Both projects earned Best Poster recognition, and Fauzan's team was named Best Team — culminating in Polinema being crowned Grand Champion of the entire competition.",
      "\"Two titles, two posters, one grand champion,\" noted the head juror. \"That's not luck — that's engineering with intent.\"",
    ],
    footer: "Grand Champion · Gold · Silver · 2× Best Poster · Best Team",
  },
  {
    id: "compsphere-2025",
    vol: "Vol. MMXXV · No. 001",
    date: "Friday, 14 Nov 2025",
    section: "Special Edition · Innovation Section",
    headline: "Local Developer Claims Best Innovation Title",
    subtitle:
      "Compsphere 2025, President University — Rizqi Fauzan's project named most innovative among national competitors.",
    body: [
      "BEKASI — In what witnesses described as \"an event of extraordinary gravitas,\" judges at the Compsphere 2025 finals awarded the title of Best Innovation to a project led by R. Fauzan of Politeknik Negeri Malang.",
      "The presentation, spanning hardware, software, and what one juror called \"an unusually clear social conscience,\" eclipsed entries from across the archipelago.",
      "\"It was less of a pitch,\" remarked a panelist, \"and more of an arrival.\"",
    ],
    footer: "Best Innovation · Compsphere 2025",
  },
  {
    id: "kmipn-2025",
    vol: "Vol. MMXXV · No. 002",
    date: "Late Edition",
    section: "B.1 · Hackathon Bureau",
    headline: "Polinema Student Wins National Hackathon Presentation",
    subtitle:
      "KMIPN 2025, Politeknik Negeri Padang — First place secured in a competitive national-level presentation hackathon.",
    body: [
      "PADANG — Under the watchful eye of national adjudicators, R. Fauzan delivered what one observer called \"the calmest closing argument the discipline has seen this year.\"",
      "The team's submission combined practical engineering with deliberate storytelling — a combination judges remarked as \"rare and unmistakably intentional.\"",
      "The award was conferred at the closing ceremony; the trophy weighed nothing compared to what came next.",
    ],
    footer: "1st Place Presentation · KMIPN 2025",
    rollCall: [
      "NEC Lombok 2026 · Grand Champion, Gold, Silver, 2× Best Poster, Best Team",
      "Compsphere 2025 · Best Innovation",
      "KMIPN 2025 · 1st Place Presentation",
    ],
  },
];

/* ─── Stack offsets for each z-position ─── */
const STACK_VARIANTS = [
  { rotate: 0, x: 0, y: 0, scale: 1 },         // front
  { rotate: 2.5, x: 14, y: 8, scale: 0.97 },    // middle
  { rotate: -3, x: -10, y: 16, scale: 0.94 },   // back
];

/* ─── Single Newspaper Card ─── */
const NewspaperCard = ({ paper, stackIndex, total, onCycle }) => {
  const zIndex = total - stackIndex;
  const variant = STACK_VARIANTS[stackIndex] || STACK_VARIANTS[STACK_VARIANTS.length - 1];

  return (
    <motion.div
      layout
      drag={stackIndex === 0}
      dragConstraints={{ left: -120, right: 120, top: -60, bottom: 60 }}
      dragElastic={0.15}
      dragMomentum={false}
      onClick={stackIndex === 0 ? onCycle : undefined}
      className="absolute inset-0 paper paper-fold p-6 md:p-10 flex flex-col cursor-pointer select-none"
      style={{ zIndex }}
      animate={{
        rotate: variant.rotate,
        x: variant.x,
        y: variant.y,
        scale: variant.scale,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.8,
      }}
      whileTap={stackIndex === 0 ? { scale: 0.98 } : {}}
      data-testid={`newspaper-${paper.id}`}
    >
      {/* Masthead */}
      <div className="border-b-2 border-[#0a0a0f]/80 pb-2 mb-4 flex items-center justify-between">
        <span className="font-newspaper text-[10px] md:text-xs uppercase tracking-widest">
          {paper.vol}
        </span>
        <span className="font-newspaper text-[10px] md:text-xs uppercase tracking-widest">
          {paper.date}
        </span>
      </div>

      <h3 className="font-serif-news text-center text-2xl md:text-4xl font-black uppercase tracking-tight leading-none mb-1">
        The Cosmic Gazette
      </h3>
      <p className="text-center font-newspaper text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-5">
        ✦ All the news the void permits to print ✦
      </p>

      <div className="border-t border-b border-[#0a0a0f]/40 py-1.5 mb-4 text-center">
        <span className="font-newspaper text-[9px] md:text-[10px] uppercase tracking-widest">
          {paper.section}
        </span>
      </div>

      {/* Headline */}
      <h4 className="font-serif-news text-lg md:text-2xl font-black uppercase leading-tight mb-2">
        {paper.headline}
      </h4>
      <p className="font-serif-news italic text-xs md:text-sm text-[#0a0a0f]/80 mb-4 leading-snug">
        {paper.subtitle}
      </p>

      {/* Body */}
      <div className="columns-2 gap-4 text-[10px] md:text-[11px] font-serif-news leading-relaxed text-[#0a0a0f]/90 flex-1 overflow-hidden">
        {paper.body.map((para, i) => (
          <p key={i} className="mb-2">
            {para}
          </p>
        ))}
      </div>

      {/* Roll Call (only on last newspaper) */}
      {paper.rollCall && (
        <div className="mt-4 border-t border-[#0a0a0f]/30 pt-3">
          <p className="font-newspaper text-[9px] uppercase tracking-[0.3em] mb-1.5">
            Roll Call — Recent Distinctions
          </p>
          <ul className="font-serif-news text-[10px] md:text-xs leading-relaxed list-disc list-inside">
            {paper.rollCall.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-4 flex items-center justify-between text-[9px] md:text-[10px] font-newspaper uppercase tracking-widest text-[#0a0a0f]/50">
        <span>↺ click to cycle</span>
        <span>{paper.footer}</span>
      </div>
    </motion.div>
  );
};

/* ─── Awards Section ─── */
const Awards = () => {
  const [order, setOrder] = useState([0, 1, 2]);

  const handleCycle = () => {
    setOrder((prev) => {
      const next = [...prev];
      const front = next.shift();
      next.push(front);
      return next;
    });
  };

  return (
    <section
      id="awards"
      data-testid="awards-section"
      className="relative w-full h-screen bg-[#0a0a0f] py-10 md:py-14 px-6 overflow-hidden flex flex-col items-center"
    >
      <div className="star-field opacity-25" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto w-full mb-4 flex items-end justify-between flex-shrink-0">
        <div>
          <p className="font-outfit text-[10px] uppercase tracking-[0.5em] text-[#fbbf24] mb-3">
            04 / Press Archives
          </p>
          <h2
            className="font-oswald uppercase text-4xl md:text-6xl tracking-tight text-[#f0f0ff]"
            data-testid="awards-heading"
          >
            COSMIC HEADLINES
          </h2>
        </div>
        <span className="hidden md:block font-shippori text-xl text-[#fbbf24]/70">
          受賞歴
        </span>
      </div>

      {/* Stacked newspapers */}
      <div className="relative z-10 flex justify-center w-full flex-1 min-h-0">
        <div className="relative w-full max-w-xl h-full">
          {order.map((paperIdx, stackPos) => (
            <NewspaperCard
              key={NEWSPAPERS[paperIdx].id}
              paper={NEWSPAPERS[paperIdx]}
              stackIndex={stackPos}
              total={NEWSPAPERS.length}
              onCycle={handleCycle}
            />
          ))}
        </div>
      </div>

      <p className="relative z-10 mt-2 text-center font-outfit italic text-xs text-[#f0f0ff]/40 flex-shrink-0">
        click to cycle · drag to explore
      </p>
    </section>
  );
};

export default Awards;
