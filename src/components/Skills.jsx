import { useState } from "react";
import { motion } from "framer-motion";

const TECH_INFO = {
  "Laravel": { color: "#FF2D20", slug: "laravel" },
  "Express.js": { color: "#888888", slug: "express/ffffff" },
  "Python": { color: "#3776AB", slug: "python" },
  "PHP": { color: "#777BB4", slug: "php" },
  
  "React": { color: "#61DAFB", slug: "react" },
  "Next.js": { color: "#ffffff", slug: "nextdotjs/ffffff" },
  "TypeScript": { color: "#3178C6", slug: "typescript" },
  "Tailwind": { color: "#06B6D4", slug: "tailwindcss" },
  "HTML/CSS": { color: "#E34F26", slug: "html5" },

  "MySQL": { color: "#4479A1", slug: "mysql" },
  "PostgreSQL": { color: "#4169E1", slug: "postgresql" },
  "MongoDB": { color: "#47A248", slug: "mongodb" },
  "SQLServer": { color: "#CC2927", slug: "microsoftsqlserver" },

  "Flutter": { color: "#02569B", slug: "flutter" },
  "Dart": { color: "#0175C2", slug: "dart" },
  "Figma": { color: "#F24E1E", slug: "figma" },
  "Git": { color: "#F05032", slug: "git" },

  "IoT": { color: "#00A8E1", slug: "arduino" },
  "Digital Twin": { color: "#ffffff", slug: "unity/ffffff" },
  "AI/ML": { color: "#FF6F00", slug: "tensorflow" },
  "Looker": { color: "#4285F4", slug: "looker" }
};

// Star clusters - each constellation grouped by approximate region
// viewbox: 1000 x 600
const CLUSTERS = [
  {
    name: "Lyra",
    role: "Frontend & Interface",
    labelPos: { x: 550, y: 90 },
    stars: [
      { id: "React", x: 500, y: 80, size: 7.5, name: "Vega" }, // Vega
      { id: "Next.js", x: 475, y: 130, size: 5 },
      { id: "TypeScript", x: 525, y: 120, size: 5 },
      { id: "Tailwind", x: 505, y: 175, size: 4.5 },
      { id: "HTML/CSS", x: 455, y: 185, size: 4 },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [1, 2],
      [1, 3],
      [3, 4],
      [4, 2],
    ],
  },
  {
    name: "Cygnus",
    role: "Backend & Core Systems",
    labelPos: { x: 75, y: 255 },
    stars: [
      { id: "Laravel", x: 200, y: 250, size: 7.5, name: "Deneb" }, // Deneb
      { id: "PHP", x: 295, y: 255, size: 5.5 },
      { id: "MySQL", x: 450, y: 260, size: 4.5 }, // albireo (head)
      { id: "Python", x: 290, y: 170, size: 5 }, // wing
      { id: "PostgreSQL", x: 275, y: 90, size: 4.5 }, // wing tip
      { id: "Express.js", x: 300, y: 340, size: 5 }, // wing
      { id: "MongoDB", x: 315, y: 430, size: 4.5 }, // wing tip
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 4],
      [1, 5],
      [5, 6],
    ],
  },
  {
    name: "Aquila",
    role: "Mobile & Core Architecture",
    labelPos: { x: 660, y: 395 },
    stars: [
      { id: "Flutter", x: 760, y: 350, size: 7.5, name: "Altair" }, // Altair
      { id: "Dart", x: 745, y: 320, size: 4.5 },
      { id: "Figma", x: 775, y: 380, size: 4.5 },
      { id: "IoT", x: 830, y: 390, size: 5.5 }, // body
      { id: "AI/ML", x: 920, y: 430, size: 5 }, // tail
      { id: "Git", x: 810, y: 280, size: 5 }, // wing
      { id: "Digital Twin", x: 860, y: 480, size: 5 }, // wing
    ],
    edges: [
      [1, 0],
      [0, 2],
      [0, 3],
      [3, 4],
      [3, 5],
      [3, 6],
    ],
  },
];

const Skills = () => {
  const [activeCluster, setActiveCluster] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative min-h-screen w-full bg-[#0a0a0f] py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="star-field opacity-20" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(240, 240, 255, 0.06), transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto mb-8 flex items-end justify-between">
        <div>
          <p className="font-outfit text-[10px] uppercase tracking-[0.5em] text-[#f0f0ff]/70 mb-3">
            03 / Stellar Map
          </p>
          <h2
            className="font-oswald uppercase text-4xl md:text-6xl tracking-tight text-[#f0f0ff]"
            data-testid="skills-heading"
          >
            CONSTELLATIONS OF SKILL
          </h2>
        </div>
        <span className="hidden md:block font-shippori text-xl text-[#f0f0ff]/50">
          技術
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-auto"
          data-testid="skills-svg"
        >
          {/* Iconic Summer Triangle dashed polygon */}
          <motion.polygon
            points="500,80 200,250 760,350"
            fill="none"
            stroke="#f0f0ff"
            strokeOpacity="0.06"
            strokeWidth="1.2"
            strokeDasharray="6,10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 2 }}
          />

          {CLUSTERS.map((cluster, ci) => {
            const isActive = activeCluster === ci;
            return (
              <g
                key={cluster.name}
                onMouseEnter={() => setActiveCluster(ci)}
                onMouseLeave={() => setActiveCluster(null)}
              >
                {/* Edges */}
                {cluster.edges.map(([a, b], ei) => {
                  const sa = cluster.stars[a];
                  const sb = cluster.stars[b];
                  return (
                    <motion.line
                      key={ei}
                      x1={sa.x}
                      y1={sa.y}
                      x2={sb.x}
                      y2={sb.y}
                      stroke="#f0f0ff"
                      strokeOpacity={isActive ? 0.5 : 0.15}
                      strokeWidth={isActive ? 1 : 0.6}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, delay: 0.2 + ei * 0.1 }}
                    />
                  );
                })}


                {/* Stars */}
                {cluster.stars.map((star, si) => {
                  const tech = TECH_INFO[star.id] || { color: "#ffffff", slug: "react" };
                  const isHovered = tooltip && tooltip.id === star.id;
                  const iconSize = Math.max(22, star.size * 4.5);

                  return (
                    <g
                      key={star.id}
                      onMouseEnter={() => setTooltip({ ...star, cluster: cluster.name })}
                      onMouseLeave={() => setTooltip(null)}
                      style={{ cursor: "pointer" }}
                      data-testid={`skill-star-${star.id.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
                    >
                      {isHovered ? (
                        <motion.g
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        >
                          <image
                            href={`https://cdn.simpleicons.org/${tech.slug}`}
                            x={star.x - iconSize / 2}
                            y={star.y - iconSize / 2}
                            width={iconSize}
                            height={iconSize}
                            style={{
                              filter: `drop-shadow(0 0 12px ${tech.color})`,
                            }}
                          />
                        </motion.g>
                      ) : (
                        <g>
                          {/* Astro-photographic flare system with twinkling motion */}
                          <motion.g
                            animate={{
                              opacity: [0.7, 1, 0.7],
                              scale: [0.95, 1.05, 0.95],
                            }}
                            transition={{
                              duration: 2.5 + (si % 3),
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            {/* Soft glow background */}
                            <circle
                              cx={star.x}
                              cy={star.y}
                              r={star.size * (star.name ? 3.5 : 2.5) * (isActive ? 1.2 : 1)}
                              fill={tech.color}
                              opacity={isActive ? 0.28 : 0.14}
                              style={{ filter: "blur(6px)" }}
                            />

                            {/* 4-pointed flare cross */}
                            {/* Horizontal Spike */}
                            <ellipse
                              cx={star.x}
                              cy={star.y}
                              rx={star.size * (star.name ? 3.2 : 2.2) * (isActive ? 1.3 : 1)}
                              ry={Math.max(0.8, star.size * 0.14)}
                              fill={tech.color}
                              opacity={0.9}
                              style={{ filter: `drop-shadow(0 0 3px ${tech.color})` }}
                            />
                            {/* Vertical Spike */}
                            <ellipse
                              cx={star.x}
                              cy={star.y}
                              rx={Math.max(0.8, star.size * 0.14)}
                              ry={star.size * (star.name ? 3.2 : 2.2) * (isActive ? 1.3 : 1)}
                              fill={tech.color}
                              opacity={0.9}
                              style={{ filter: `drop-shadow(0 0 3px ${tech.color})` }}
                            />

                            {/* Diagonal spikes for major magnitude stars (Vega, Deneb, Altair) */}
                            {star.name && (
                              <g transform={`rotate(45 ${star.x} ${star.y})`}>
                                <ellipse
                                  cx={star.x}
                                  cy={star.y}
                                  rx={star.size * 2.2 * (isActive ? 1.3 : 1)}
                                  ry={Math.max(0.6, star.size * 0.12)}
                                  fill={tech.color}
                                  opacity={0.75}
                                />
                                <ellipse
                                  cx={star.x}
                                  cy={star.y}
                                  rx={Math.max(0.6, star.size * 0.12)}
                                  ry={star.size * 2.2 * (isActive ? 1.3 : 1)}
                                  fill={tech.color}
                                  opacity={0.75}
                                />
                              </g>
                            )}

                            {/* Extreme Bright Core */}
                            <circle
                              cx={star.x}
                              cy={star.y}
                              r={Math.max(1.6, star.size * 0.4)}
                              fill="#ffffff"
                              style={{
                                filter: `drop-shadow(0 0 4px #ffffff)`,
                              }}
                            />
                          </motion.g>
                        </g>
                      )}
                      
                      {/* Area tangkap hover yang lebih luas agar mulus */}
                      <circle
                        cx={star.x}
                        cy={star.y}
                        r={Math.max(18, star.size + 8)}
                        fill="transparent"
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute px-3 py-1.5 bg-[#0a0a0f]/90 border font-outfit text-xs text-[#f0f0ff]"
            style={{
              left: `${(tooltip.x / 1000) * 100}%`,
              top: `${((tooltip.y - 30) / 600) * 100}%`,
              borderColor: (TECH_INFO[tooltip.id] || { color: "#ffffff" }).color + '66',
              boxShadow: `0 0 15px ${(TECH_INFO[tooltip.id] || { color: "#ffffff" }).color}22`
            }}
            data-testid="skill-tooltip"
          >
            {tooltip.id}
            <span
              className="ml-2 text-[10px] uppercase tracking-widest"
              style={{ color: (TECH_INFO[tooltip.id] || { color: "#ffffff" }).color }}
            >
              {tooltip.cluster}
            </span>
          </div>
        )}
      </div>

      <p className="relative z-10 mt-12 text-center font-outfit text-[10px] uppercase tracking-[0.4em] text-[#f0f0ff]/40">
        ✦ hover the stars to read them
      </p>
    </section>
  );
};

export default Skills;
