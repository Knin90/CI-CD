import { useEffect, useMemo, useRef } from 'react'
import './iso.css'

// Tarjeta de figura: «Fig n» arriba a la izquierda, título arriba a la
// derecha, pista abajo a la izquierda y lectura en vivo abajo a la derecha.
// El SVG es estático (texto precalculado); `mount` mueve las piezas por ref.

function Swatch({ mark }) {
  return (
    <svg className="k-swatch" data-mark={mark} viewBox="0 0 16 10" aria-hidden="true">
      <path d="M2 4.5 8 1.5 14 4.5 14 6 8 9 2 6Z" />
      <path className="k-sw-crease" d="M2 4.5 8 7.5 14 4.5" />
    </svg>
  )
}

export default function IsoFigure({ build, color, fig, onStep, stageRef: outerRef, children }) {
  const f = useMemo(() => build(), [build])
  const stepRef = useRef(onStep)
  stepRef.current = onStep
  const stageRef = useRef(null)
  const readoutRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const say = text => {
      const el = readoutRef.current
      if (el && el.textContent !== text) el.textContent = text
    }
    if (outerRef) outerRef.current = stage
    return f.mount(stage, say, i => stepRef.current && stepRef.current(i))
  }, [f, outerRef])

  return (
    <figure className="k-fig" style={color ? { '--c': color } : undefined}>
      <div className="k-plate">
        <div className="k-corners" aria-hidden="true">
          <span className="k-corner" data-c="fig">{fig || f.fig}</span>
          <span className="k-corner" data-c="title">{f.title}</span>
          <span className="k-corner" data-c="hint">{f.hint}</span>
          <span className="k-corner" data-c="readout" ref={readoutRef}>{f.readout}</span>
        </div>
        <div
          className="k-stage"
          ref={stageRef}
          tabIndex={0}
          role="slider"
          aria-label={f.aria}
          aria-valuemin={0}
          aria-valuemax={f.steps - 1}
          aria-valuenow={0}
          dangerouslySetInnerHTML={{ __html: f.svg }}
        />
      </div>
      {children}
      {(f.keys?.length > 0 || f.caption) && (
        <figcaption className="k-legend">
          {f.keys?.length > 0 && (
            <span className="k-keys">
              {f.keys.map(k => (
                <span className="k-key" key={k.label}>
                  <Swatch mark={k.mark} />
                  {k.label}
                </span>
              ))}
            </span>
          )}
          {f.caption && <span>{f.caption}</span>}
        </figcaption>
      )}
    </figure>
  )
}
