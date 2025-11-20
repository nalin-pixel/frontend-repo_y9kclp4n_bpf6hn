import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-28 overflow-hidden">
      {/* 3D scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4HIlOdlXYYkZW66z/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950"></div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-cyan-500/20"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl py-24 sm:py-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_5px_25px_rgba(59,130,246,0.35)]"
          >
            Protezione VPN ultra-veloce e sicura
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-6 text-lg sm:text-xl leading-8 text-blue-100 max-w-xl"
          >
            Naviga in modo anonimo, sblocca contenuti globali e proteggi i tuoi dati con crittografia di livello enterprise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-10 flex items-center gap-4"
          >
            <a href="#pricing" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow">
              Inizia ora
            </a>
            <a href="#features" className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-base font-semibold text-white hover:bg-white/15 transition-colors">
              Scopri di più
            </a>
          </motion.div>
          <div className="mt-8 flex items-center gap-6 text-white/70 text-sm">
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={`https://i.pravatar.cc/40?img=${i+10}`} alt="avatar" className="w-8 h-8 rounded-full ring-2 ring-slate-900" />
              ))}
            </div>
            <p>Oltre 50k utenti protetti</p>
          </div>
        </div>
      </div>
    </section>
  )
}
