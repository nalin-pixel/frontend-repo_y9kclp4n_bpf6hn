import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'

function useTilt() {
  const rx = useSpring(0, { stiffness: 140, damping: 16 })
  const ry = useSpring(0, { stiffness: 140, damping: 16 })
  const d = useSpring(30, { stiffness: 120, damping: 18 })

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * 16)
    rx.set((0.5 - py) * 12)
    d.set(60)
  }
  const onLeave = () => {
    rx.set(0); ry.set(0); d.set(30)
  }
  return { rx, ry, d, onMove, onLeave }
}

function SVGPanel({ title, subtitle, render }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const { rx, ry, d, onMove, onLeave } = useTilt()

  const lift = useTransform(scrollYProgress, [0, 0.5, 1], [0, 28, 0])
  const glow = useTransform(scrollYProgress, [0, 1], [0.25, 0.55])

  return (
    <motion.div
      ref={ref}
      className="group relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden [perspective:1200px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ boxShadow: `0 20px 80px rgba(0,0,0,0.25)` }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, translateZ: lift }}
        className="[transform-style:preserve-3d]"
      >
        {/* Lighting */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
        <div className="pointer-events-none absolute -inset-20 opacity-40 blur-3xl bg-[conic-gradient(from_90deg_at_50%_50%,#22d3ee,transparent,#60a5fa,#a78bfa,transparent)]" />

        {/* Header */}
        <div className="relative p-6">
          <div className="text-sm text-white/60">{subtitle}</div>
          <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
        </div>

        {/* SVG Scene */}
        <div className="relative h-72 grid place-items-center">
          <motion.div style={{ filter: glow.to(v => `drop-shadow(0 8px 30px rgba(56,189,248,${v}))`) }}>
            {render({ depth: d })}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function LockModel({ depth }) {
  return (
    <motion.svg width="340" height="220" viewBox="0 0 340 220" fill="none">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <radialGradient id="rg1" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* base */}
      <motion.rect x="60" y="70" rx="22" ry="22" width="220" height="140" fill="url(#lg1)" style={{ translateZ: depth }} />
      <motion.rect x="70" y="80" rx="16" ry="16" width="200" height="120" fill="#0f172a" opacity="0.7" />
      {/* arch */}
      <motion.path d="M110 90 C110 50, 230 50, 230 90" stroke="url(#lg1)" strokeWidth="18" strokeLinecap="round" fill="none" />
      {/* keyhole */}
      <motion.circle cx="170" cy="140" r="18" fill="url(#rg1)" />
      <motion.rect x="164" y="150" width="12" height="24" rx="6" fill="#e2f3ff" opacity="0.9" />
    </motion.svg>
  )
}

function GlobeModel({ depth }) {
  return (
    <motion.svg width="340" height="220" viewBox="0 0 340 220" fill="none">
      <defs>
        <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <motion.circle cx="170" cy="110" r="80" stroke="url(#lg2)" strokeWidth="14" fill="rgba(15,23,42,0.65)" />
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.ellipse key={i} cx="170" cy="110" rx={70 - i * 10} ry={40 - i * 6} stroke="#7dd3fc" strokeOpacity={0.35 - i * 0.05} fill="none" />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.ellipse key={`v-${i}`} cx="170" cy="110" rx={40 - i * 6} ry={70 - i * 10} stroke="#c4b5fd" strokeOpacity={0.25 - i * 0.04} fill="none" transform="rotate(90 170 110)" />
      ))}
      <motion.circle cx="240" cy="80" r="8" fill="#22d3ee" />
      <motion.circle cx="120" cy="150" r="6" fill="#60a5fa" />
    </motion.svg>
  )
}

function ShieldModel({ depth }) {
  return (
    <motion.svg width="340" height="220" viewBox="0 0 340 220" fill="none">
      <defs>
        <linearGradient id="lg3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#22d3ee" floodOpacity="0.25" />
        </filter>
      </defs>
      <motion.path d="M170 40 L240 80 L230 140 C220 170 200 190 170 200 C140 190 120 170 110 140 L100 80 Z" fill="url(#lg3)" filter="url(#shadow)" />
      <motion.path d="M170 60 L220 90 L212 132 C206 148 192 164 170 172 C148 164 134 148 128 132 L120 90 Z" fill="#0f172a" opacity="0.7" />
      <motion.path d="M170 100 L190 112 L182 138 C178 146 172 154 170 156 C168 154 162 146 158 138 L150 112 Z" fill="#eafffb" opacity="0.9" />
    </motion.svg>
  )
}

export default function SVG3DShowcase() {
  return (
    <section id="story" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(560px_260px_at_20%_20%,rgba(56,189,248,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(560px_260px_at_80%_70%,rgba(168,85,247,0.08),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">SVG interattivi con effetto 3D</h2>
          <p className="mt-3 text-white/70 text-lg">Modelli vettoriali leggeri che reagiscono al mouse e allo scroll, con luci, profondità e glow dinamici.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <SVGPanel title="Cifratura visibile" subtitle="Lock" render={({ depth }) => <LockModel depth={depth} />} />
          <SVGPanel title="Rete globale" subtitle="Globe" render={({ depth }) => <GlobeModel depth={depth} />} />
          <SVGPanel title="Protezione attiva" subtitle="Shield" render={({ depth }) => <ShieldModel depth={depth} />} />
        </div>
      </div>
    </section>
  )
}
