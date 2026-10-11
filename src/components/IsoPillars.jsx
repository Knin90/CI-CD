import { useEffect, useRef, useState } from 'react'
import './isoPillars.css'

// Pilares isométricos animados (SVG): un pilar por elemento. Hover/teclado
// eleva el pilar activo, autoplay recorre los pilares y el slider de
// intensidad escala la elevación. Animación con requestAnimationFrame que se
// pausa fuera de viewport.

const NS = 'http://www.w3.org/2000/svg'
const VW = 480
const VH = 270
const W = 40 // ancho del pilar
const D = 40 // fondo del pilar
const H0 = 64 // altura en reposo
const SP = 48 // separación entre pilares (en ejes iso)
const COS = Math.cos(Math.PI / 6)
const SIN = 0.5
const AUTO_STEP = 4.5 // segundos por pilar en autoplay

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Proyección isométrica centrada para n pilares en fila horizontal
function makeProjection(n) {
  const minXY = -D
  const maxXY = (n - 1) * 2 * SP + W
  const ox = VW / 2 - ((minXY + maxXY) / 2) * COS
  const oy = 180
  return (x, y, z) => [ox + (x - y) * COS, oy + (x + y) * SIN - z]
}

function boxPaths(P, x, y, w, d, h) {
  const bFL = P(x, y + d, 0)
  const bFR = P(x + w, y + d, 0)
  const bBR = P(x + w, y, 0)
  const tBL = P(x, y, h)
  const tFL = P(x, y + d, h)
  const tFR = P(x + w, y + d, h)
  const tBR = P(x + w, y, h)
  return {
    left: [tFL, tFR, bFR, bFL],
    right: [tFR, tBR, bBR, bFR],
    top: [tBL, tFL, tFR, tBR],
    tBL, tFL, tFR, tBR,
  }
}

const polyPts = pts => pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')

// easeOutBack: pequeño rebote al llegar
const ease = t => {
  const c1 = 1.4
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

function tval(lift, now) {
  if (!lift.dur) return lift.to
  const p = Math.min(1, Math.max(0, (now - lift.t0) / lift.dur))
  return lift.from + (lift.to - lift.from) * ease(p)
}

function el(tag, attrs, parent) {
  const n = document.createElementNS(NS, tag)
  for (const k in attrs) n.setAttribute(k, attrs[k])
  if (parent) parent.appendChild(n)
  return n
}

export default function IsoPillars({ items, color, homeIdx = -1, autoStart = true, onSelect, label }) {
  const svgRef = useRef(null)
  const apiRef = useRef(null)
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  const [active, setActiveState] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [intensity, setIntensity] = useState(1)
  const intensityRef = useRef(1)

  const sig = items.map(i => i.letter).join('|')

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const n = items.length
    const P = makeProjection(n)
    const rm = reducedMotion()

    let activeIdx = -1
    let autoPlay = false
    let autoStep = 0
    let autoTimer = 0
    let intensityV = intensityRef.current
    let dash = 0

    svg.replaceChildren()
    setPlaying(false)

    // Suelo: placa isométrica bajo la fila + carril del pipeline con flujo animado
    const pad = 16
    const xL = (n - 1) * SP
    const yL = -(n - 1) * SP
    // Hexágono en pantalla que envuelve las bases, con margen paralelo a los ejes iso
    const k = pad / Math.tan(Math.PI / 6)
    const [bX] = P(0, 0, 0)
    const [lbX] = P(xL, yL, 0)
    const [lX, mY] = P(0, D, 0)
    const [rX] = P(xL + W, yL, 0)
    const [fX, fY] = P(W, D, 0)
    const [lfX] = P(xL + W, yL + D, 0)
    const tY = P(0, 0, 0)[1]
    el('polygon', {
      class: 'iso-floor',
      points: polyPts([
        [bX, tY - pad * 1.15], [lbX, tY - pad * 1.15], [rX + k, mY],
        [lfX, fY + pad * 1.15], [fX, fY + pad * 1.15], [lX - k, mY],
      ]),
    }, svg)
    const railPts = items.map((_, i) => P(i * SP + W / 2, -i * SP + D + 9, 0))
    const railD = 'M' + railPts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L')
    el('path', { class: 'iso-rail', d: railD }, svg)
    const flow = el('path', { class: 'iso-flow', d: railD }, svg)
    const nodes = railPts.map(p => el('circle', { class: 'iso-node', cx: p[0], cy: p[1], r: 3.2 }, svg))

    // Pilares
    const pillars = items.map((pr, i) => {
      const g = el('g', { class: 'iso-p' }, svg)
      const p = {
        i,
        pr,
        g,
        pos: { x: i * SP, y: -i * SP },
        lift: { from: 0, to: 0, t0: 0, dur: 0 },
        left: el('polygon', { class: 'iso-left' }, g),
        right: el('polygon', { class: 'iso-right' }, g),
        top: el('polygon', { class: 'iso-top' }, g),
        outline: el('polyline', { class: 'sil' }, g),
        glyph: el('path', { class: 'iso-glyph' }, g),
        letter: el('text', { class: 'iso-letter', 'text-anchor': 'middle' }, g),
        cx: 0,
      }
      p.letter.textContent = pr.letter
      p.cx = P(p.pos.x + W / 2, p.pos.y + D / 2, 0)[0]
      return p
    })

    // Icono en la cara derecha: barras tipo «stages» que crecen con el pilar
    function drawIcon(p, h) {
      const { x, y } = p.pos
      const k = Math.max(0, Math.min(1, (h - H0 * 0.6) / (H0 * 1.4)))
      const segs = []
      for (let s = 0; s < 3; s++) {
        const yy = y + D * (0.25 + s * 0.25)
        const z0 = 10
        const z1 = z0 + (h - 22) * (0.35 + 0.65 * k) * (0.5 + s * 0.25)
        const a = P(x + W, yy, z0)
        const b = P(x + W, yy, Math.min(z1, h - 10))
        segs.push(`M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`)
      }
      p.glyph.setAttribute('d', segs.join(''))
    }

    function setActive(idx, now) {
      activeIdx = idx
      const shown = idx >= 0 ? idx : homeIdx
      pillars.forEach(p => {
        const cur = tval(p.lift, now)
        let to = 0
        if (shown >= 0) {
          const dist = Math.abs(p.i - shown)
          to = dist === 0 ? 62 * intensityV : dist === 1 ? 10 * intensityV : -8 * intensityV
        }
        p.lift = { from: cur, to, t0: now, dur: rm ? 0 : 700 }
        p.g.setAttribute('class', shown >= 0 && p.i !== shown ? 'iso-p dim' : 'iso-p')
      })
      nodes.forEach((c, i) => c.setAttribute('class', i === shown ? 'iso-node on' : 'iso-node'))
      setActiveState(idx)
    }

    function pick(sx, sy) {
      if (sy < 8 || sy > VH - 8) return -1
      let best = -1
      let bd = Infinity
      pillars.forEach(p => {
        const d = Math.abs(sx - p.cx)
        if (d < bd) { bd = d; best = p.i }
      })
      return bd < SP * COS * 1.1 ? best : -1
    }

    function toSvg(e) {
      const r = svg.getBoundingClientRect()
      return [((e.clientX - r.left) / r.width) * VW, ((e.clientY - r.top) / r.height) * VH]
    }

    function setPlay(on) {
      autoPlay = on
      setPlaying(on)
      if (on) {
        autoStep = 0
        autoTimer = 0
        setActive(0, performance.now())
      } else setActive(-1, performance.now())
    }

    const onMove = e => {
      if (autoPlay || e.pointerType === 'touch') return
      const [sx, sy] = toSvg(e)
      const idx = pick(sx, sy)
      if (idx !== activeIdx) setActive(idx, performance.now())
    }
    const onLeave = () => {
      if (!autoPlay) setActive(-1, performance.now())
    }
    const onClick = e => {
      const [sx, sy] = toSvg(e)
      const idx = pick(sx, sy)
      if (idx < 0) return
      // En táctil: el primer toque eleva el pilar, el segundo navega
      if (e.pointerType === 'touch' && idx !== activeIdx) {
        if (autoPlay) setPlay(false)
        setActive(idx, performance.now())
        return
      }
      onSelectRef.current?.(idx)
    }
    const onKey = e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        if (autoPlay) setPlay(false)
        const base = activeIdx >= 0 ? activeIdx : homeIdx >= 0 ? homeIdx : -1
        const next = e.key === 'ArrowRight' ? (base + 1) % n : (base - 1 + n) % n
        setActive(next, performance.now())
      } else if ((e.key === 'Enter' || e.key === ' ') && activeIdx >= 0) {
        e.preventDefault()
        onSelectRef.current?.(activeIdx)
      }
    }
    const onBlur = () => {
      if (!autoPlay) setActive(-1, performance.now())
    }

    svg.addEventListener('pointermove', onMove)
    svg.addEventListener('pointerleave', onLeave)
    svg.addEventListener('click', onClick)
    svg.addEventListener('keydown', onKey)
    svg.addEventListener('blur', onBlur)

    /* ── Frame ── */
    let raf = 0
    let last = performance.now()
    function render(now) {
      pillars.forEach(p => {
        const h = Math.max(18, H0 + tval(p.lift, now))
        const b = boxPaths(P, p.pos.x, p.pos.y, W, D, h)
        p.left.setAttribute('points', polyPts(b.left))
        p.right.setAttribute('points', polyPts(b.right))
        p.top.setAttribute('points', polyPts(b.top))
        p.outline.setAttribute('points', polyPts([b.tBL, b.tFL, b.tFR, b.tBR, b.tBL]))
        p.outline.setAttribute('class', activeIdx === p.i ? 'hi' : 'sil')
        const mid = P(p.pos.x + W / 2, p.pos.y + D / 2, h + 1)
        p.letter.setAttribute('x', mid[0].toFixed(1))
        p.letter.setAttribute('y', (mid[1] - 8).toFixed(1))
        p.letter.setAttribute('class', activeIdx === p.i ? 'iso-letter active' : 'iso-letter')
        drawIcon(p, h)
      })
    }
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (autoPlay) {
        autoTimer += dt
        if (autoTimer > AUTO_STEP) {
          autoTimer = 0
          autoStep = (autoStep + 1) % (n + 1)
          setActive(autoStep < n ? autoStep : -1, now)
        }
      }
      dash = (dash - dt * 26) % 20
      flow.setAttribute('stroke-dashoffset', dash.toFixed(2))
      render(now)
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (raf || rm) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    apiRef.current = {
      togglePlay: () => {
        setPlay(!autoPlay)
        if (rm) render(performance.now())
      },
      setIntensity: v => {
        intensityV = v
        setActive(activeIdx, performance.now())
        if (rm) render(performance.now())
      },
    }

    setActive(-1, performance.now())
    render(performance.now())

    // Solo anima en viewport; el autoplay arranca ~700 ms tras verse por primera vez
    let kick = 0
    let seen = false
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([en]) => {
              if (en.isIntersecting) {
                start()
                if (!seen && autoStart && !rm) {
                  seen = true
                  kick = setTimeout(() => {
                    if (!autoPlay) setPlay(true)
                  }, 700)
                }
              } else stop()
            },
            { threshold: 0.15 }
          )
        : null
    if (io) io.observe(svg)
    else start()

    return () => {
      stop()
      clearTimeout(kick)
      io?.disconnect()
      svg.removeEventListener('pointermove', onMove)
      svg.removeEventListener('pointerleave', onLeave)
      svg.removeEventListener('click', onClick)
      svg.removeEventListener('keydown', onKey)
      svg.removeEventListener('blur', onBlur)
      apiRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig, homeIdx, autoStart])

  const shown = active >= 0 ? active : homeIdx
  const cur = shown >= 0 ? items[shown] : null

  return (
    <div className="iso" style={{ '--c': color }}>
      <svg
        ref={svgRef}
        className="iso-svg"
        viewBox={`0 0 ${VW} ${VH}`}
        role="img"
        tabIndex={0}
        aria-label={`${label}. Usá las flechas para recorrer y Enter para abrir.`}
      />
      <div className="iso-caption">
        {cur ? (
          <>
            <span className="iso-cap-k">{cur.letter}</span>
            <span className="iso-cap-t">{cur.title}</span>
            {cur.sub && <span className="iso-cap-s">{cur.sub}</span>}
          </>
        ) : (
          <span className="iso-cap-hint">Pasá el cursor sobre un pilar</span>
        )}
      </div>
      <div className="iso-controls">
        <button
          type="button"
          className={`iso-btn${playing ? ' active' : ''}`}
          aria-pressed={playing}
          onClick={() => apiRef.current?.togglePlay()}
        >
          {playing ? 'pausa' : 'play'}
        </button>
        <label className="iso-range">
          <span>intensidad</span>
          <input
            type="range"
            min="0.2"
            max="1.6"
            step="0.05"
            value={intensity}
            onChange={e => {
              const v = +e.target.value
              setIntensity(v)
              intensityRef.current = v
              apiRef.current?.setIntensity(v)
            }}
          />
          <span className="iso-range-v">{intensity.toFixed(2)}</span>
        </label>
      </div>
    </div>
  )
}
