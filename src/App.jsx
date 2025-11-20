import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* subtle backdrop grid */}
      <div className="fixed inset-0 pointer-events-none [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <Navbar />
      <Hero />
      <Features />
      <Pricing />
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
    </div>
  )
}

export default App
