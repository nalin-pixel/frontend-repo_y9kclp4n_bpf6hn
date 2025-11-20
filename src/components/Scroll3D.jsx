import { motion, useScroll, useTransform } from 'framer-motion'
import { Shield, Globe, Zap } from 'lucide-react'
import { useRef } from 'react'

function Card3D({ icon: Icon, title, desc, gradient }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const rotateX = useTransform(scrollYProgress, [0, 1], [12, -12])
  const rotateY = useTransform(scrollYProgress, [0, 1], [-8, 8])
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 60, 0])
  const shadow = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.45, 0.2])
  const boxShadow = useTransform(shadow, (v) => `0 12px 40px rgba(0,0,0,${v})`)

  return (
    <div ref={ref} className="relative py-24">
      <motion.div
        style={{ rotateX, rotateY, translateZ }}
        className="mx-auto w-full max-w-4xl [perspective:1200px]"
      >
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur [transform-style:preserve-3d]">
          {/* lighting gradient */}
          <div className={`pointer-events-none absolute inset-0 ${gradient}`} />

          <div className="p-10 md:p-14">
            <div className="flex items-center gap-4">
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-white/10 border border-white/10">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
            </div>
            <p className="mt-5 text-white/80 text-lg max-w-2xl">{desc}</p>

            {/* depth elements */}
            <motion.div
              style={{ translateZ }}
              className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 [transform-style:preserve-3d]"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  style={{ boxShadow }}
                  className="rounded-xl bg-slate-900/60 border border-white/10 p-5"
                >
                  <p className="text-white/80">Layer {i}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function FloatingOrbs() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 600], [0, -80])
  const y2 = useTransform(scrollY, [0, 800], [0, 120])
  const y3 = useTransform(scrollY, [0, 1000], [0, -160])

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-500/25 to-blue-600/25 blur-3xl" />
      <motion.div style={{ y: y2 }} className="absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 blur-3xl" />
      <motion.div style={{ y: y3 }} className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 blur-3xl" />
    </div>
  )
}

export default function Scroll3D() {
  return (
    <section id="esperienza" className="relative py-10">
      <FloatingOrbs />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">Transizioni 3D al tuo scroll</h2>
          <p className="mt-3 text-white/70 text-lg">
            Gli elementi reagiscono allo scorrimento con rotazioni prospettiche e profondità.
          </p>
        </div>

        <div className="mt-12 space-y-20">
          <Card3D
            icon={Shield}
            title="Protezione con profondità"
            desc="Animazioni prospettiche rendono tangibile la sicurezza: i livelli si muovono su assi X/Y e sulla profondità Z mentre scorri."
            gradient="bg-[radial-gradient(60%_80%_at_20%_10%,rgba(59,130,246,0.25),transparent),radial-gradient(50%_60%_at_80%_30%,rgba(34,211,238,0.2),transparent)]"
          />

          <Card3D
            icon={Globe}
            title="Rete globale in movimento"
            desc="Mostra l'estensione mondiale con pannelli che ruotano e si muovono in parallasse per una sensazione dinamica e fluida."
            gradient="bg-[radial-gradient(60%_80%_at_80%_20%,rgba(34,211,238,0.25),transparent),radial-gradient(50%_60%_at_20%_60%,rgba(168,85,247,0.18),transparent)]"
          />

          <Card3D
            icon={Zap}
            title="Velocità che senti"
            desc="Transizioni scattanti e riflessi di luce sottolineano le prestazioni elevate senza appesantire l'esperienza."
            gradient="bg-[radial-gradient(60%_80%_at_50%_0%,rgba(59,130,246,0.25),transparent),radial-gradient(50%_60%_at_50%_100%,rgba(16,185,129,0.18),transparent)]"
          />
        </div>
      </div>
    </section>
  )
}
