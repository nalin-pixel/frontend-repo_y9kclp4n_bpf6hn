export default function FAQ(){
  const faqs = [
    {
      q: 'Tenete i log delle attività?',
      a: 'No. La nostra politica No-Log garantisce che nessuna attività di navigazione venga registrata.'
    },
    {
      q: 'Posso usare la VPN per Netflix e streaming?',
      a: 'Sì, i nostri server sono ottimizzati per sbloccare i principali servizi di streaming.'
    },
    {
      q: 'Quanti dispositivi posso collegare?',
      a: 'Fino a 5 dispositivi contemporaneamente per account.'
    },
    {
      q: 'Avete app per tutte le piattaforme?',
      a: 'App native per iOS, Android, Windows, macOS e estensioni browser.'
    }
  ]

  return (
    <section id="faq" className="relative py-24">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Domande frequenti</h2>
          <p className="mt-4 text-blue-200/80">Le risposte ai dubbi più comuni.</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {faqs.map(({q,a}) => (
            <div key={q} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-white font-semibold">{q}</h3>
              <p className="mt-2 text-blue-200/80 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
