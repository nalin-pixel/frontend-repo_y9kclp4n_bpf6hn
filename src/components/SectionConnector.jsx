import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

// A fixed, full-viewport SVG that draws a flowing ribbon between sections
// - Path length draws on scroll
// - The ribbon softly morphs and glows
// - Waypoints let users jump to key sections
export default function SectionConnector() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: typeof window !== 'undefined' ? undefined : containerRef })

  // Smooth progress for buttery motion
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.4 })

  // Path morphing across scroll
  const c1 = useTransform(progress, [0, 0.33, 0.66, 1], [120, 80, 160, 110])
  const c2 = useTransform(progress, [0, 0.33, 0.66, 1], [40, 60, 30, 50])
  const c3 = useTransform(progress, [0, 0.33, 0.66, 1], [300, 260, 320, 280])
  const c4 = useTransform(progress, [0, 0.33, 0.66, 1], [520, 540, 560, 540])
  const c5 = useTransform(progress, [0, 0.33, 0.66, 1], [780, 740, 820, 780])

  // Stroke reveal and glow
  const length = useTransform(progress, [0, 1], [0, 1])
  const blur = useTransform(progress, [0, 1], [0, 3])
  const hue = useTransform(progress, [0, 1], [200, 180])
  const sat = useTransform(progress, [0, 1], [85, 95])
  const glow = useMotionTemplate`hue-rotate(${hue}deg) saturate(${sat}%) blur(${blur}px)`

  // Ribbon subtle wobble
  const wobble = useTransform(progress, [0, 0.5, 1], [0, 10, 0])

  const pathD = useMotionTemplate`M 0 120 C 160 ${c1} 320 ${c2} 480 120 S 800 ${c3} 960 120 S 1280 ${c4} 1440 120 S 1760 ${c5} 1920 120`

  const handleJump = (selector) => () => {
    const el = document.querySelector(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-[5]">
      {/* SVG ribbon */}
      <motion.svg
        className="absolute inset-0 w-[200vw] h-full -left-[50vw]"
        viewBox="0 0 1920 240"
        preserveAspectRatio="none"
        style={{ filter: glow, rotateZ: wobble }}
      >
        <defs>
          <linearGradient id="ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="soft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.14" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft filled ribbon */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#soft)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          style={{ pathLength: 1, pathOffset: 0 }}
        />

        {/* Crisp core line with dash reveal */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#ribbon)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 0"
          style={{ pathLength: length }}
        />
      </motion.svg>

      {/* Waypoints (clickable, but only these capture events) */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute left-4 top-[12vh] pointer-events-auto">
          <Waypoint label="Hero" onClick={handleJump('#top')} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[36vh] pointer-events-auto">
          <Waypoint label="Story" onClick={handleJump('#story')} />
        </div>
        <div className="absolute right-8 top-[58vh] pointer-events-auto">
          <Waypoint label="Features" onClick={handleJump('#features')} />
        </div>
        <div className="absolute left-12 bottom-[26vh] pointer-events-auto">
          <Waypoint label="Pricing" onClick={handleJump('#pricing')} />
        </div>
        <div className="absolute right-10 bottom-[10vh] pointer-events-auto">
          <Waypoint label="FAQ" onClick={handleJump('#faq')} />
        </div>
      </div>
    </div>
  )
}

function Waypoint({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur px-3 py-1.5 text-xs text-white/90 ring-1 ring-white/10 hover:ring-white/30 transition pointer-events-auto"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400/80 opacity-75 group-hover:animate-ping" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-300" />
      </span>
      <span className="font-medium tracking-wide">{label}</span>
    </button>
  )
}
