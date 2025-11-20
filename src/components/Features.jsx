import { ShieldCheck, Globe2, Zap, LockKeyhole, Wifi, Server } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Crittografia AES-256',
    desc: 'Protezione di livello militare per ogni pacchetto di dati.'
  },
  {
    icon: Globe2,
    title: 'Rete globale',
    desc: 'Server in 60+ paesi per latenza minima e massima velocità.'
  },
  {
    icon: Zap,
    title: 'Velocità estrema',
    desc: 'Protocollo ottimizzato per streaming, gaming e download.'
  },
  {
    icon: LockKeyhole,
    title: 'No log garantito',
    desc: 'Zero tracciamento. La tua privacy è la nostra priorità.'
  },
  {
    icon: Wifi,
    title: 'Protezione Wi‑Fi pubblici',
    desc: 'Connessioni sicure anche su reti non protette.'
  },
  {
    icon: Server,
    title: 'Kill Switch & Split Tunneling',
    desc: 'Controllo totale del traffico e interruzione automatica.'
  }
]

export default function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_20%,rgba(56,189,248,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_80%_60%,rgba(59,130,246,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Perché scegliere AegisVPN</h2>
          <p className="mt-4 text-blue-200/80">Tecnologia all'avanguardia, semplice da usare e pensata per proteggerti in ogni momento.</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
              <div className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white w-10 h-10 shadow">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-blue-200/80">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
