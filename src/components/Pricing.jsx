export default function Pricing(){
  return (
    <section id="pricing" className="relative py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Scegli il tuo piano</h2>
          <p className="mt-4 text-blue-200/80">Tutti i piani includono dati illimitati, nessun log e accesso a tutta la rete globale.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[{
            name: 'Mensile', price: '9,99€', features: ['Velocità alta', 'Tutti i server', 'Assistenza 24/7']
          },{
            name: 'Annuale', price: '59,99€', features: ['Più conveniente', 'Priorità banda', 'Assistenza 24/7']
          },{
            name: 'Famiglia', price: '89,99€', features: ['5 dispositivi', 'Controllo genitori', 'Assistenza 24/7']
          }].map(card => (
            <div key={card.name} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-white text-xl font-semibold">{card.name}</h3>
              <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">{card.price}</p>
              <ul className="mt-4 space-y-2 text-blue-200/80 text-sm">
                {card.features.map(f => <li key={f}>• {f}</li>)}
              </ul>
              <a href="#" className="mt-6 inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 font-semibold text-white shadow-lg shadow-blue-500/20">Attiva</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
