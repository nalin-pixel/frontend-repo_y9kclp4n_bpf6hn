import Spline from '@splinetool/react-spline'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { useRef } from 'react'

export default function SplineScroll() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [1, 1, 0.8])
  const blurAmount = useTransform(scrollYProgress, [0, 1], [0, 2])
  const filter = useMotionTemplate`blur(${blurAmount}px)`

  return (
    <section ref={ref} className="relative min-h-[80vh] overflow-hidden">
      <motion.div style={{ y, opacity, filter }} className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4HIlOdlXYYkZW66z/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold">Esperienza 3D reattiva allo scroll</h2>
          <p className="mt-4 text-white/70">La scena 3D accompagna lo storytelling: mentre la pagina scorre, la camera si sposta dolcemente creando profondità.</p>
        </div>
      </div>
    </section>
  )
}
