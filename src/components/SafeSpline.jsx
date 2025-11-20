import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'

export default function SafeSpline({ scene, className = '', style = {} }) {
  const [canRender, setCanRender] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    // Ensure client-only render for WebGL
    const t = setTimeout(() => setCanRender(true), 0)
    return () => clearTimeout(t)
  }, [])

  if (failed) {
    return (
      <div className={`grid place-items-center bg-gradient-to-b from-slate-900 to-slate-950 ${className}`} style={style}>
        <div className="text-center px-6">
          <div className="text-white/80 font-semibold">Impossibile caricare la scena 3D</div>
          <div className="text-white/60 text-sm mt-1">Connessione sicura senza distrazioni – contenuto alternativo mostrato.</div>
        </div>
      </div>
    )
  }

  if (!canRender) {
    return (
      <div className={`grid place-items-center bg-gradient-to-b from-slate-900 to-slate-950 ${className}`} style={style}>
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
      </div>
    )
  }

  try {
    return (
      <Spline scene={scene} className={className} style={style} onError={() => setFailed(true)} />
    )
  } catch (_e) {
    setFailed(true)
    return null
  }
}
