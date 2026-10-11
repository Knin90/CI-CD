import { useCallback, useMemo, useRef, useState } from 'react'
import IsoFigure from './IsoFigure'
import buildFlow from './figures/flowMachine'
import Inline from '../components/level/InlineText'

// «¿Qué ocurre internamente?»: la máquina isométrica del flujo y, debajo,
// los pasos completos sincronizados con el paquete.
export default function InternalsFlow({ steps }) {
  const [cur, setCur] = useState(0)
  const stageRef = useRef(null)
  // firma estable: el contenido se vuelve a parsear en cada render del módulo
  const sig = JSON.stringify(steps)
  const stable = useMemo(() => JSON.parse(sig), [sig])
  const build = useCallback(() => buildFlow(stable, { fig: 'Fig 1', title: 'Flujo interno' }), [stable])
  const go = i => stageRef.current?.dispatchEvent(new CustomEvent('k-go', { detail: i }))
  return (
    <div className="internals-flow">
      <IsoFigure build={build} onStep={setCur} stageRef={stageRef}>
        <ol className="if-steps">
          {stable.map((s, i) => (
            <li key={i} className={i === cur ? 'on' : undefined}>
              <button type="button" onClick={() => go(i)} onMouseEnter={() => go(i)} aria-current={i === cur ? 'step' : undefined}>
                <span className="if-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="if-body">
                  <span className="if-label">{Inline(s.label)}</span>
                  {s.meta && <span className="if-meta">{Inline(s.meta)}</span>}
                  {s.subs.length > 0 && (
                    <span className="if-subs">
                      {s.subs.map((t, j) => (
                        <span key={j} className="if-sub">{Inline(t)}</span>
                      ))}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </IsoFigure>
    </div>
  )
}
