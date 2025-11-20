import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('UI ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
          <div className="max-w-lg text-center">
            <h1 className="text-2xl font-bold">Si è verificato un errore nell\'interfaccia</h1>
            <p className="mt-3 text-white/70 text-sm break-all">{String(this.state.error)}</p>
            <a href="/" className="inline-block mt-6 px-4 py-2 rounded bg-white/10 hover:bg-white/15">Ricarica</a>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
