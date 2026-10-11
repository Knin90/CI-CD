import * as k from '../kit'
import { bench, knob, lamp } from './bench'
import { runner, follow } from '../live'

// Etapa 2 · Integración continua: un plotter de pórtico. Un solo cabezal
// (el runner) visita una bandeja de 12 pocillos (los jobs) uno a uno; cada
// pocillo visitado queda lleno: job terminado.

const W = 600
const H = 400
const PLATE = { x: -140, y: -100, w: 280, d: 200, r: 9 }
const TRAY = { x: -84, y: -60, w: 168, d: 120, r: 5 }
const TRAY_TOP = 7
const COLS = [-57, -19, 19, 57]
const ROWS = [-36, 0, 36]
const WELLS = ROWS.flatMap((y, r) => COLS.map((x, c) => ({ x, y, i: r * COLS.length + c })))
const RAIL_X = [-118, 110]
const RAIL = { y: -88, d: 176 }
const BEAM_Z = 56
const HEAD_Z = 34

export default function build() {
  const P = k.fit([...k.boxCorners(PLATE, -14, 0), [-120, -90, BEAM_Z + 12], [120, 90, BEAM_Z + 12]], W, H, { pad: 14, azimuth: 40 })
  const S = k.solid
  const L = k.line
  const D = (pts, o) => k.dots(pts.map(p => k.at(p, P)), o)

  let s = bench(P, PLATE, { label: 'RUN·04' })
  // Raíles laterales sobre bloques, con regla
  for (const x of RAIL_X) {
    for (const y of [RAIL.y, RAIL.y + RAIL.d - 10]) s += S(k.slab({ x: x - 2, y, w: 12, d: 10, r: 1.5 }, 0, 6, P, 2), { tone: 'mid' })
    s += S(k.slab({ x, y: RAIL.y, w: 8, d: RAIL.d, r: 1.5 }, 6, 5, P, 2), { tone: 'mid' })
    // marcas a lo largo de y sobre el raíl
    let minor = '', major = ''
    for (let i = 0, y = RAIL.y + 14; y <= RAIL.y + RAIL.d - 14; i++, y += 6) {
      const d = k.lineTop([x + 1, y], [x + (i % 5 ? 3 : 5), y], 11, P)
      if (i % 5) minor += d
      else major += d
    }
    s += L(minor, { tone: 'lo' }) + L(major, { tone: 'mid' })
    s += D([[x + 4, RAIL.y + 4, 11], [x + 4, RAIL.y + RAIL.d - 4, 11]], { r: 0.45 })
  }
  // Bandeja con pocillos
  s += S(k.slab(TRAY, 0, TRAY_TOP, P, 6), { tone: 'mid' })
  s += L(k.planLine(k.inset(TRAY, 4), TRAY_TOP, P, 6), { tone: 'faint' })
  s += D(k.cornersOf(TRAY, 8).map(([x, y]) => [x, y, TRAY_TOP]), { r: 0.5 })
  const wellsSvg = WELLS.map(w => {
    let g = L(k.ringTop(w.x, w.y, 13, TRAY_TOP, P, 36), { tone: 'lo' })
    g += S(k.cyl(w.x, w.y, 10, TRAY_TOP - 3, 3.2, P, 32), { tone: 'lo', crease: 'none', part: `well-${w.i}` })
    g += L(k.ringTop(w.x, w.y, 6.5, TRAY_TOP + 0.2, P, 24), { tone: 'faint' })
    return g
  })
  s += wellsSvg.join('')
  s += COLS.map((x, c) => k.topText([x, -52], TRAY_TOP, P, `j${c + 1}`, { size: 3, tone: 'lo' })).join('')

  // Pórtico (se mueve en y) con el cabezal (se mueve en x dentro del pórtico)
  let gantry = ''
  const truck = x => S(k.slab({ x: x - 3, y: -10, w: 14, d: 20, r: 2 }, 11, 6, P, 3), { tone: 'mid' })
  const upright = x => S(k.slab({ x: x - 1, y: -4, w: 10, d: 8, r: 1.5 }, 17, BEAM_Z - 17, P, 3), { tone: 'mid' })
  gantry += truck(RAIL_X[0]) + upright(RAIL_X[0])
  gantry += `<g data-part="beam-back">`
  gantry += S(k.slab({ x: RAIL_X[0] - 2, y: -6, w: RAIL_X[1] - RAIL_X[0] + 12, d: 12, r: 2 }, BEAM_Z, 9, P, 3), { tone: 'mid' })
  gantry += L(k.lineTop([RAIL_X[0], -2], [RAIL_X[1] + 8, -2], BEAM_Z + 9, P) + k.lineTop([RAIL_X[0], 2], [RAIL_X[1] + 8, 2], BEAM_Z + 9, P), { tone: 'faint' })
  gantry += D([RAIL_X[0] + 3, RAIL_X[1] + 5].flatMap(x => [[x, -3, BEAM_Z + 9], [x, 3, BEAM_Z + 9]]), { r: 0.45 })
  // motor en el extremo izquierdo
  gantry += S(k.slab({ x: RAIL_X[0] - 1, y: -9, w: 16, d: 18, r: 2 }, BEAM_Z + 9, 10, P, 3), { tone: 'mid' })
  gantry += knob(P, RAIL_X[0] + 7, 0, BEAM_Z + 19, 4, 3)
  gantry += `</g>`
  let head = ''
  head += `<path class="k-halo" style="filter:blur(5px)" data-part="head-shadow" d="${k.cyl(0, 0, 7, TRAY_TOP, 0.1, P, 20).fill}"/>`
  head += S(k.cyl(0, 0, 1.6, HEAD_Z - 12, 12, P, 14), { tone: 'hi', crease: 'none', lit: true })
  head += S(k.cyl(0, 0, 3.6, HEAD_Z - 4, 4, P, 20), { tone: 'mid' })
  const hb = { x: -9, y: -11, w: 18, d: 22, r: 2.5 }
  head += S(k.slab(hb, HEAD_Z, BEAM_Z + 13 - HEAD_Z, P, 3), { tone: 'hi', crease: 'lo' })
  head += L(k.planLine(k.inset(hb, 2.5), BEAM_Z + 13, P, 2), { tone: 'faint' })
  head += lamp(P, 0, 5, BEAM_Z + 13, 'head-lamp')
  head += D([[-6, -8, BEAM_Z + 13], [6, -8, BEAM_Z + 13]], { r: 0.45 })
  gantry += `<g data-part="head">${head}</g>`
  gantry += truck(RAIL_X[1]) + upright(RAIL_X[1])
  s += `<g data-part="gantry">${gantry}</g>`

  const svg = k.svg(
    W,
    H,
    'Un plotter de pórtico sobre una placa: un único cabezal, el runner, recorre una bandeja de doce pocillos, los jobs. Cada pocillo que visita queda lleno, como un job terminado.',
    s
  )

  function mount(stage, say) {
    const q = n => stage.querySelector(`[data-part="${n}"]`)
    const gantryEl = q('gantry')
    const headEl = q('head')
    const lampEl = q('head-lamp')
    const wells = WELLS.map(w => q(`well-${w.i}`))
    const svgEl = stage.querySelector('svg')
    const st = { x: COLS[0], y: ROWS[0], tx: COLS[0], ty: ROWS[0], target: 0, dwell: 0, done: new Set(), clearAt: 0 }
    const centres = WELLS.map(w => k.at([w.x, w.y, TRAY_TOP], P))

    const draw = () => {
      gantryEl.setAttribute('transform', k.move(P, [0, st.y, 0]))
      headEl.setAttribute('transform', k.move(P, [st.x, 0, 0]))
      wells.forEach((el, i) => (st.done.has(i) ? el.setAttribute('data-on', '') : el.removeAttribute('data-on')))
      const busy = Math.abs(st.x - st.tx) > 0.5 || Math.abs(st.y - st.ty) > 0.5
      busy ? lampEl.removeAttribute('data-on') : lampEl.setAttribute('data-on', '')
      say(`${busy ? '→' : 'en'} job ${st.target + 1} · ${st.done.size}/12 listos`)
    }
    const goTo = i => {
      st.target = i
      st.tx = WELLS[i].x
      st.ty = WELLS[i].y
      st.dwell = 0
      stage.setAttribute('aria-valuenow', String(i))
    }
    let tourNext = 0
    const ctx = runner(stage, (dt, calm, c) => {
      st.x = follow(st.x, st.tx, dt, 0.32, calm)
      st.y = follow(st.y, st.ty, dt, 0.42, calm)
      const arrived = Math.abs(st.x - st.tx) < 0.5 && Math.abs(st.y - st.ty) < 0.5
      if (arrived) {
        st.dwell += dt
        if (st.dwell > 0.35) st.done.add(st.target)
      }
      if (c.touring && arrived && st.dwell > 0.9) {
        if (st.done.size >= WELLS.length) {
          st.clearAt += dt
          if (st.clearAt > 1.6) {
            st.done.clear()
            st.clearAt = 0
            tourNext = 0
            goTo(0)
          }
        } else {
          tourNext = WELLS.findIndex((_, i) => !st.done.has(i))
          goTo(tourNext)
        }
      }
      draw()
      return !arrived || st.dwell < 0.4
    })

    const nearest = (cx, cy) => {
      let best = 0, bd = Infinity
      centres.forEach(([x, y], i) => {
        const d = (x - cx) ** 2 + (y - cy) ** 2
        if (d < bd) { bd = d; best = i }
      })
      return best
    }
    const onMove = e => {
      const r = svgEl.getBoundingClientRect()
      const i = nearest(((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H)
      if (i !== st.target) goTo(i)
      ctx.interact()
    }
    const onKey = e => {
      let i = st.target
      if (e.key === 'ArrowRight') i = Math.min(11, i + 1)
      else if (e.key === 'ArrowLeft') i = Math.max(0, i - 1)
      else if (e.key === 'ArrowDown') i = Math.min(11, i + 4)
      else if (e.key === 'ArrowUp') i = Math.max(0, i - 4)
      else if (e.key === 'Escape') st.done.clear()
      else return
      e.preventDefault()
      goTo(i)
      ctx.interact()
    }
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('keydown', onKey)
    draw()
    return () => {
      ctx.destroy()
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('keydown', onKey)
    }
  }

  return {
    svg,
    mount,
    steps: WELLS.length,
    fig: 'Fig 2',
    title: 'Plotter de runners',
    hint: 'Elegí un job',
    readout: 'en job 1 · 0/12 listos',
    aria: 'Plotter de runners: las flechas mueven el cabezal entre los doce jobs; Escape vacía la bandeja',
    keys: [
      { mark: 'lit', label: 'Cabezal: el runner' },
      { mark: 'raised', label: 'Pocillos: jobs en cola o terminados' },
    ],
    caption:
      'Un runner ejecuta un job a la vez: se mueve al siguiente pocillo de la cola, lo procesa y sigue. Con más runners, la bandeja se vacía antes.',
  }
}
