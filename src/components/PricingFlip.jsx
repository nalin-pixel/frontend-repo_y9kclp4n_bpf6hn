import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

function PriceCard({ plan, price, features, highlighted }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3, once: true })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 12 })
  const opacity = useTransform(rotateY, [-180, 0, 180], [0, 1, 0])

  if (inView) rotateY.set(0)

  return (
    <div ref={ref} className={`relative [perspective:1200px] ${highlighted ? 'lg:scale-[1.02]' : ''}`}>
      <motion.div
        style={{ rotateY }}
        initial={{ rotateY: -90, opacity: 0 }}
        animate={inView ? { rotateY: 0, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        className={`relative h-full rounded-2xl border border-white/10 ${highlighted ? 'bg-gradient-to-br from-blue-600/30 to-cyan-500/20' : 'bg-white/5'} overflow-hidden`}
      >
        <div className="p-6">
          <div className="flex items-baseline justify-between">
            <h3 className="text-white text-xl font-semibold">{plan}</h3>
            {highlighted && (
              <span className="text-xs font-semibold px-2 py-1 rounded bg-white/10 text-white/80">Consigliato</span>
            )}
          </div>
          <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">{price}</p>
          <ul className="mt-4 space-y-2 text-blue-200/80 text-sm">
            {features.map(f => <li key={f}>• {f}</li>)}
          </ul>
          <a href="#" className="mt-6 inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 font-semibold text-white shadow-lg shadow-blue-500/20">Attiva</a>
        </div>

        {/* glossy edge */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-60" />
      </motion.div>
    </div>
  )
}

export default function PricingFlip() {
  const plans = [
    { plan: 'Mensile', price: '9,99€', features: ['Velocità alta', 'Tutti i server', 'Assistenza 24/7'] },
    { plan: 'Annuale', price: '59,99€', features: ['Più conveniente', 'Priorità banda', 'Assistenza 24/7'], highlighted: true },
    { plan: 'Famiglia', price: '89,99€', features: ['5 dispositivi', 'Controllo genitori', 'Assistenza 24/7'] },
  ]

  return (
    <section className="relative py-6">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <PriceCard key={p.plan} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
