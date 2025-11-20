import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import SafeSpline from './SafeSpline'

export default function BackgroundSpline() {
  // Global page scroll progress
  const { scrollYProgress } = useScroll()

  // Subtle parallax + cinematic drift
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, -3])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.6, 1], [1, 0.98, 0.9, 0.88])

  // Dynamic blur on deep scroll to maintain readability
  const blur = useTransform(scrollYProgress, [0, 1], [0, 2])
  const filter = useMotionTemplate`blur(${blur}px)`

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y, scale, rotateZ, opacity, filter }}
        className="absolute inset-0 will-change-transform"
      >
        <SafeSpline
          scene="https://prod.spline.design/4HIlOdlXYYkZW66z/scene.splinecode"
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Soft vignettes and gradient masks to blend with sections */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-600/15 via-transparent to-cyan-500/15" />
      </motion.div>
    </div>
  )
}
