import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import FAQ from './components/FAQ'
import Scroll3D from './components/Scroll3D'
import Sticky3D from './components/Sticky3D'
import SplineScroll from './components/SplineScroll'
import PricingFlip from './components/PricingFlip'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 pointer-events-none [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <ErrorBoundary>
        <Navbar />
        <Hero />
        <Scroll3D />
        <Sticky3D />
        <SplineScroll />

        <Features />
        <section id="pricing" className="relative py-12">
          <div className="text-center max-w-2xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Scegli il tuo piano</h2>
            <p className="mt-4 text-blue-200/80">Tutti i piani includono dati illimitati, nessun log e accesso a tutta la rete globale.</p>
          </div>
          <PricingFlip />
        </section>

        <FAQ />

        <footer className="relative border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">© {new Date().getFullYear()} AegisVPN — Tutti i diritti riservati.</p>
            <div className="flex items-center gap-6 text-sm text-white/70">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Termini</a>
              <a href="/test" className="hover:text-white">Stato sistema</a>
            </div>
          </div>
        </footer>
      </ErrorBoundary>
    </div>
  )
}

export default App
