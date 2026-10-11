import * as k from '../kit'
import { bench } from './bench'
import { runner } from '../live'
import { shortOf, isDecision } from '../flowParse'

// «¿Qué ocurre internamente?» como máquina: cada paso es una estación sobre
// una cinta que serpentea por el banco; un paquete salta de estación en
// estación. Las decisiones («¿…?») son estaciones redondas y los sub-ítems
// de un paso son pernos sobre su estación.

const W = 600
const SPX = 58
const SPY = 70
const BOX = 26
const TRACK_Z = 1.2
const HOP = 22

export default function buildFlow(steps, { fig = 'Fig 1', title = 'Flujo interno' } = {}) {
  const N = steps.length
  const rows = N <= 4 ? 1 : N <= 12 ? 2 : 3
  const cols = Math.ceil(N / rows)
  const H = rows === 1 ? 250 : rows === 2 ? 350 : 430
  // Serpentina: fila 0 de izquierda a derecha, fila 1 de derecha a izquierda…
  const pos = steps.map((_, i) => {
    const r = Math.floor(i / cols)
    const c = r % 2 === 0 ? i % cols : cols - 1 - (i % cols)
    return [(c - (cols - 1) / 2) * SPX, (r - (rows - 1) / 2) * SPY]
  })
  const heightOf = i => 16 + (steps[i].subs.length ? 5 : 0) + (i % 2) * 3
  const topOf = i => TRACK_Z + heightOf(i)
  const PLATE = {
    x: -((cols - 1) / 2) * SPX - 42,
    y: -((rows - 1) / 2) * SPY - 40,
    w: (cols - 1) * SPX + 84,
    d: (rows - 1) * SPY + 80,
    r: 9,
  }
  const az = rows === 1 ? 60 : 48
  const P = k.fit([...k.boxCorners(PLATE, -14, 0), ...pos.map(([x, y]) => [x, y, 30 + HOP])], W, H, { pad: 18, azimuth: az })
  const S = k.solid
  const L = k.line
  const D = (pts, o) => k.dots(pts.map(p => k.at(p, P)), o)

  let s = bench(P, PLATE, { label: `${String(N).padStart(2, '0')} PASOS`, ruler: rows > 1 || cols > 3 })
  // Cinta: un tramo recto por par de estaciones consecutivas
  let flow = ''
  for (let i = 0; i < N - 1; i++) {
    const [ax, ay] = pos[i]
    const [bx, by] = pos[i + 1]
    const plan =
      Math.abs(ay - by) < 0.01
        ? { x: Math.min(ax, bx) - 6, y: ay - 6, w: Math.abs(bx - ax) + 12, d: 12, r: 3 }
        : { x: ax - 6, y: Math.min(ay, by) - 6, w: 12, d: Math.abs(by - ay) + 12, r: 3 }
    s += S(k.slab(plan, 0, TRACK_Z, P, 3), { tone: 'lo', crease: 'none' })
    flow += k.lineTop([ax, ay], [bx, by], TRACK_Z, P)
  }
  s += L(flow, { tone: 'mid', flow: true })
  s += `<path class="k-halo" data-part="shadow" style="filter:blur(3px);opacity:0" d="${k.slab({ x: -7, y: -7, w: 14, d: 14, r: 3 }, TRACK_Z, 0.1, P).fill}"/>`

  // Estaciones en orden de profundidad
  const order = steps.map((_, i) => i).sort((a, b) => k.depthOf([...pos[a], 0], P) - k.depthOf([...pos[b], 0], P))
  for (const i of order) {
    const [x, y] = pos[i]
    const h = heightOf(i)
    const top = topOf(i)
    let g = ''
    if (isDecision(steps[i].label)) {
      g += S(k.cyl(x, y, BOX / 2 + 2, TRACK_Z, 3, P, 36), { tone: 'mid' })
      g += S(k.cyl(x, y, BOX / 2, TRACK_Z + 3, h - 3, P, 36), { tone: 'hi', crease: 'lo', part: `st-${i}` })
      g += L(k.ringTop(x, y, BOX / 2 - 3, top, P, 32), { tone: 'faint' })
      g += L(k.sideArc(x, y, BOX / 2, TRACK_Z + 3 + (h - 3) * 0.5, P, 24), { tone: 'faint' })
    } else {
      const plan = { x: x - BOX / 2, y: y - BOX / 2, w: BOX, d: BOX, r: 3 }
      g += S(k.slab(k.inset(plan, -2), TRACK_Z, 3, P, 3), { tone: 'mid' })
      g += S(k.slab(plan, TRACK_Z + 3, h - 3, P, 3), { tone: 'hi', crease: 'lo', part: `st-${i}` })
      g += L(k.planLine(k.inset(plan, 3), top, P, 2), { tone: 'faint' })
      g += D(k.cornersOf(plan, 2.4).map(([a, b]) => [a, b, top]), { r: 0.42 })
    }
    g += k.topText([x, y + 2.2], top, P, String(i + 1).padStart(2, '0'), { size: 6.5, tone: 'hi' })
    g += k.topText([x, y + 8.4], top, P, shortOf(steps[i].label), { size: 2.6, tone: 'mid' })
    // pernos por sub-ítem (máx. 4)
    const subs = Math.min(4, steps[i].subs.length)
    for (let j = 0; j < subs; j++) {
      const px = x - ((subs - 1) / 2) * 6 + j * 6
      g += S(k.cyl(px, y - 9, 1.7, top, 2.4, P, 12), { tone: 'mid', part: `sub-${i}-${j}` })
    }
    s += `<g data-part="station-${i}">${g}</g>`
  }

  // Paquete (va encima de todo)
  let pkg = ''
  const pb = { x: -6, y: -6, w: 12, d: 12, r: 1.5 }
  pkg += S(k.slab(pb, 0, 7, P, 2), { tone: 'hi', crease: 'lo', lit: true })
  pkg += S(k.slab(k.inset(pb, -0.6), 7, 2, P, 2), { tone: 'hi', crease: 'lo', lit: true })
  pkg += L(k.lineTop([-6.6, 0], [6.6, 0], 9, P), { tone: 'lit' })
  s += `<g data-part="pkg">${pkg}</g>`

  const svg = k.svg(
    W,
    H,
    `Un banco con ${N} estaciones unidas por una cinta, una por paso del proceso: ${steps.map((st, i) => `${i + 1}, ${st.label}`).join('; ')}. Un paquete salta de estación en estación.`,
    s
  )

  function mount(stage, say, onStep) {
    const q = n => stage.querySelector(`[data-part="${n}"]`)
    const pkgEl = q('pkg')
    const shadow = q('shadow')
    const stations = steps.map((_, i) => q(`st-${i}`))
    const subs = steps.map((st, i) => Array.from({ length: Math.min(4, st.subs.length) }, (_, j) => q(`sub-${i}-${j}`)))
    const svgEl = stage.querySelector('svg')
    const st = { from: 0, to: 0, t: 1, at: 0, hold: 0 }
    const centres = pos.map((p, i) => k.at([...p, topOf(i)], P))

    const place = () => {
      const a = pos[st.from], b = pos[st.to]
      const e = st.t < 1 ? st.t * st.t * (3 - 2 * st.t) : 1
      const x = a[0] + (b[0] - a[0]) * e
      const y = a[1] + (b[1] - a[1]) * e
      const z0 = topOf(st.from), z1 = topOf(st.to)
      const dist = Math.hypot(b[0] - a[0], b[1] - a[1])
      const hop = st.from === st.to ? 0 : (HOP + dist * 0.08) * 4 * e * (1 - e)
      const z = z0 + (z1 - z0) * e + hop
      pkgEl.setAttribute('transform', k.move(P, [x, y, z]))
      shadow.setAttribute('transform', k.move(P, [x, y, 0]))
      shadow.style.opacity = String(Math.min(1, hop / 8) * 0.8)
    }
    const mark = () => {
      stations.forEach((el, i) => (i === st.at ? el.setAttribute('data-on', '') : el.removeAttribute('data-on')))
      subs.forEach((list, i) => list.forEach(el => (i === st.at ? el.setAttribute('data-on', '') : el.removeAttribute('data-on'))))
      say(`paso ${st.at + 1}/${N} · ${shortOf(steps[st.at].label).toLowerCase()}`)
      stage.setAttribute('aria-valuenow', String(st.at))
      stage.setAttribute('aria-valuetext', `Paso ${st.at + 1} de ${N}: ${steps[st.at].label}`)
      onStep && onStep(st.at)
    }
    const goTo = i => {
      if (i === st.to && st.t >= 1) return
      st.from = st.t >= 1 ? st.to : st.at
      st.to = i
      st.t = 0
      st.hold = 0
    }

    const ctx = runner(stage, (dt, calm, c) => {
      if (st.t < 1) {
        const dur = 0.55 + Math.hypot(pos[st.to][0] - pos[st.from][0], pos[st.to][1] - pos[st.from][1]) * 0.002
        st.t = calm ? 1 : Math.min(1, st.t + dt / dur)
        if (st.t >= 0.5 && st.at !== st.to) {
          st.at = st.to
          mark()
        }
      } else st.hold += dt
      if (c.touring && st.t >= 1 && st.hold > (st.at === N - 1 ? 3.2 : 2.2)) goTo((st.at + 1) % N)
      place()
      return st.t < 1
    })

    const onMove = e => {
      const r = svgEl.getBoundingClientRect()
      const px = ((e.clientX - r.left) / r.width) * W
      const py = ((e.clientY - r.top) / r.height) * H
      let best = 0, bd = Infinity
      centres.forEach(([x, y], i) => {
        const d = (x - px) ** 2 + (y - py) ** 2
        if (d < bd) { bd = d; best = i }
      })
      goTo(best)
      ctx.interact()
    }
    const onKey = e => {
      let i = null
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') i = Math.min(N - 1, st.to + 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') i = Math.max(0, st.to - 1)
      if (e.key === 'Home') i = 0
      if (e.key === 'End') i = N - 1
      if (i === null) return
      e.preventDefault()
      goTo(i)
      ctx.interact()
    }
    const onGo = e => {
      goTo(e.detail)
      ctx.interact()
    }
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('keydown', onKey)
    stage.addEventListener('k-go', onGo)
    place()
    mark()
    return () => {
      ctx.destroy()
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('keydown', onKey)
      stage.removeEventListener('k-go', onGo)
    }
  }

  return {
    svg,
    mount,
    steps: N,
    fig,
    title,
    hint: 'Mové el cursor',
    readout: `paso 1/${N} · ${shortOf(steps[0].label).toLowerCase()}`,
    aria: `${title}: las flechas mueven el paquete entre los ${N} pasos`,
    keys: [],
    caption: '',
  }
}
