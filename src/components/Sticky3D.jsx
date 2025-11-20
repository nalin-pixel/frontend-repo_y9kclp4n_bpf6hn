import { motion, useScroll, useTransform } from 'framer-motion'
import { Shield, Lock, Globe2 } from 'lucide-react'
import { useRef } from 'react'

function Step({ index, title, desc }) {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div className="max-w-xl">
        <div className="text-white/60 text-sm">Step {index}</div>
        <h3 className="mt-2 text-3xl sm:text-4xl font-bold">{title}</h3>
        <p className="mt-4 text-white/70 text-lg">{desc}</p>
      </div>
    </div>
  )
}

export default function Sticky3D() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12])
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-16, 0, 16])
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-80, 40, -80])
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.55, 0.25])
  const hue = useTransform(scrollYProgress, [0, 1], [190, 210])

  return (
    <section className="relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ filter: hue.to(h => `hue-rotate(${h}deg)`), opacity: glow }} className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <motion.div style={{ opacity: glow }} className="absolute bottom-10 -left-10 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Sticky 3D Stage */}
          <div className="relative lg:h-[220vh]">
            <div className="lg:sticky lg:top-24">
              <div className="[perspective:1400px]">
                <motion.div
                  style={{ rotateX, rotateY, translateZ }}
                  className="relative w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur [transform-style:preserve-3d] overflow-hidden"
                >
                  <div className="p-8 sm:p-10">
                    <div className="flex items-center gap-3">
                      <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
                        <Shield className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-semibold">Schermo sicuro</h3>
                    </div>
                    <p className="mt-4 text-white/70 max-w-xl">Sezione sticky a narrazione: mentre scorri, la card reagisce con rotazioni prospettiche e profondità.</p>

                    <div className="mt-8 grid sm:grid-cols-2 gap-4 [transform-style:preserve-3d]">
                      <motion.div style={{ translateZ }} className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                        <div className="flex items-center gap-2 text-white">
                          <Lock className="w-5 h-5" />
                          <span className="font-semibold">Crittografia</span>
                        </div>
                        <p className="mt-2 text-white/70 text-sm">AES-256 con protocolli moderni. Sicurezza senza compromessi.</p>
                      </motion.div>
                      <motion.div style={{ translateZ }} className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                        <div className="flex items-center gap-2 text-white">
                          <Globe2 className="w-5 h-5" />
                          <span className="font-semibold">Copertura globale</span>
                        </div>
                        <p className="mt-2 text-white/70 text-sm">Server ovunque ti servano: latenza minima, performance massime.</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* light sweep */}
                  <motion.div
                    aria-hidden
                    style={{ opacity: glow }}
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_0%,rgba(59,130,246,0.18),transparent),radial-gradient(60%_50%_at_100%_60%,rgba(34,211,238,0.14),transparent)]"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="relative space-y-40 py-24 lg:py-32">
            <Step index={1} title="Connessione con 1 click" desc="Apri l'app e sei subito protetto. La nostra interfaccia riduce gli attriti, aumenta la sicurezza." />
            <Step index={2} title="Scudo intelligente" desc="Kill switch e split tunneling per controllare con precisione il tuo traffico." />
            <Step index={3} title="Copertura globale" desc="Scegli i server in base a velocità, ping e disponibilità. Streaming e gaming perfetti." />
          </div>
        </div>
      </div>
    </section>
  )
}
