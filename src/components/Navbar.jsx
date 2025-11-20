import { Menu, Shield, Globe, Lock, Phone } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 backdrop-blur-md bg-slate-900/60 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between px-4 py-3">
            <a href="#" className="flex items-center gap-2 text-white">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-semibold tracking-tight">AegisVPN</span>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
              <a href="#features" className="hover:text-white transition-colors flex items-center gap-2"><Globe className="w-4 h-4"/>Rete globale</a>
              <a href="#security" className="hover:text-white transition-colors flex items-center gap-2"><Lock className="w-4 h-4"/>Sicurezza</a>
              <a href="#pricing" className="hover:text-white transition-colors">Prezzi</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="#" className="text-white/80 hover:text-white text-sm">Accedi</a>
              <a href="#pricing" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg shadow-blue-500/20">
                <Phone className="w-4 h-4"/> Provalo ora
              </a>
            </div>

            <button onClick={() => setOpen(!open)} className="md:hidden text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {open && (
            <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-3 text-white/80">
              <a href="#features" className="block">Rete globale</a>
              <a href="#security" className="block">Sicurezza</a>
              <a href="#pricing" className="block">Prezzi</a>
              <a href="#faq" className="block">FAQ</a>
              <div className="pt-2 flex items-center gap-3">
                <a href="#" className="text-white/80 hover:text-white text-sm">Accedi</a>
                <a href="#pricing" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg shadow-blue-500/20">
                  <Phone className="w-4 h-4"/> Provalo ora
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
