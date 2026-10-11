import * as k from '../kit'
import { bench, lamp } from './bench'
import { runner, follow, springTo, clamp, pointerShare } from '../live'

// Etapa 6 · Pipelines avanzados: una cama de pines en matriz. Cada pin es un
// job de la matriz (sistema × versión). Mientras corre, el pin sube; al
// terminar baja con la tapa encendida. Cuatro lámparas al frente son los
// slots de ejecución en paralelo (max-parallel: 4).

const W = 600
const H = 380
const PLATE = { x: -130, y: -90, w: 260, d: 180, r: 9 }
const BLOCK = { x: -86, y: -62, w: 172, d: 124, r: 5 }
const TOP = 26
const COLS = [-50, -16, 18, 52]
const ROWS = [-34, -4, 26]
const OS = ['linux', 'mac', 'win']
const VER = ['18', '20', '22', '24']
const SLOTS = 4
const HEIGHT = { queued: 3, running: 24, done: 9 }
const DUR = [1.3, 1.0, 1.6, 1.2, 1.8, 1.1, 1.4, 1.0, 1.5, 1.7, 1.2, 1.3]

// Plan voraz: cada job toma el primer slot libre
function schedule() {
  const free = Array(SLOTS).fill(0)
  return DUR.map((d, i) => {
    let s = 0
    free.forEach((t, j) => {
      if (t < free[s]) s = j
    })
    const start = free[s] + 0.15
    free[s] = start + d
    return { i, start, end: start + d, slot: s }
  })
}

export default function build() {
  const P = k.fit([...k.boxCorners(PLATE, -14, 0), [-86, -62, TOP + 30], [86, 62, TOP + 30]], W, H, { pad: 16, azimuth: 40 })
  const S = k.solid
  const L = k.line
  const D = (pts, o) => k.dots(pts.map(p => k.at(p, P)), o)
  const plan = schedule()
  const TOTAL = Math.max(...plan.map(p => p.end))

  let s = bench(P, PLATE, { label: 'ADV·19' })
  s += S(k.slab(k.inset(BLOCK, -3), 0, 4, P, 5), { tone: 'lo' })
  s += S(k.slab(BLOCK, 4, TOP - 4, P, 5), { tone: 'mid' })
  s += L(k.planLine(k.inset(BLOCK, 4), TOP, P, 4), { tone: 'faint' })
  s += D(k.cornersOf(BLOCK, 7).map(([x, y]) => [x, y, TOP]), { r: 0.5 })
  const jobs = []
  ROWS.forEach((y, r) =>
    COLS.forEach((x, c) => {
      jobs.push({ x, y, i: r * COLS.length + c })
      s += L(k.planLine({ x: x - 11, y: y - 11, w: 22, d: 22, r: 4 }, TOP, P, 3), { tone: 'lo' })
    })
  )
  OS.forEach((name, r) => (s += k.topText([BLOCK.x + 6, ROWS[r] + 1.4], TOP, P, name, { size: 3, tone: 'mid', anchor: 'start' })))
  VER.forEach((v, c) => (s += k.topText([COLS[c], BLOCK.y + 8], TOP, P, `v${v}`, { size: 3, tone: 'mid' })))
  // Pines en orden de profundidad
  const order = [...jobs].sort((a, b) => k.depthOf([a.x, a.y, 0], P) - k.depthOf([b.x, b.y, 0], P))
  for (const j of order) {
    s += S(k.slab({ x: j.x - 8, y: j.y - 8, w: 16, d: 16, r: 3 }, TOP, HEIGHT.queued, P, 3), { tone: 'hi', crease: 'lo', part: `pin-${j.i}` })
    s += `<path class="k-line" data-tone="faint" data-part="cap-${j.i}"/>`
  }
  // Slots en paralelo al frente
  for (let i = 0; i < SLOTS; i++) s += lamp(P, COLS[i], BLOCK.y + BLOCK.d - 8, TOP, `slot-${i}`)

  const svg = k.svg(
    W,
    H,
    'Una cama de pines en matriz sobre una placa: tres sistemas operativos por cuatro versiones, doce jobs. Cada pin sube mientras su job corre y baja con la tapa encendida al terminar. Cuatro lámparas al frente muestran los slots que corren en paralelo.',
    s
  )

  function mount(stage, say) {
    const q = n => stage.querySelector(`[data-part="${n}"]`)
    const pins = jobs.map(j => q(`pin-${j.i}`))
    const caps = jobs.map(j => q(`cap-${j.i}`))
    const slots = Array.from({ length: SLOTS }, (_, i) => q(`slot-${i}`))
    const tips = jobs.map(() => ({ at: HEIGHT.queued, rate: 0 }))
    const st = { t: 0, target: 0 }
    const stateOf = (j, t) => (t < plan[j].start ? 'queued' : t < plan[j].end ? 'running' : 'done')

    const draw = () => {
      let done = 0
      let running = 0
      const busy = Array(SLOTS).fill(false)
      jobs.forEach((j, n) => {
        const state = stateOf(n, st.t)
        if (state === 'done') done++
        if (state === 'running') {
          running++
          busy[plan[n].slot] = true
        }
        const h = Math.max(1, tips[n].at)
        k.setSolid(pins[n], k.slab({ x: j.x - 8, y: j.y - 8, w: 16, d: 16, r: 3 }, TOP, h, P, 3))
        caps[n].setAttribute('d', k.planLine({ x: j.x - 5, y: j.y - 5, w: 10, d: 10, r: 2 }, TOP + h, P, 2))
        state === 'done' ? pins[n].setAttribute('data-on', '') : pins[n].removeAttribute('data-on')
      })
      busy.forEach((b, i) => (b ? slots[i].setAttribute('data-on', '') : slots[i].removeAttribute('data-on')))
      say(done === jobs.length ? 'matriz 3×4 · 12/12 ok' : `${done}/12 ok · ${running} en paralelo`)
    }
    const ctx = runner(stage, (dt, calm, c) => {
      if (c.touring) {
        const cycle = TOTAL + 2.2
        st.target = Math.min(TOTAL, c.clock % cycle)
        st.t = st.target
      } else st.t = follow(st.t, st.target, dt, 0.2, calm)
      let settled = !c.touring && st.t === st.target
      jobs.forEach((_, n) => {
        if (!springTo(tips[n], HEIGHT[stateOf(n, st.t)], dt, 300, 17, calm)) settled = false
      })
      draw()
      return !settled
    })
    const set = t => {
      st.target = clamp(t, 0, TOTAL)
      stage.setAttribute('aria-valuenow', String(Math.round((st.target / TOTAL) * 12)))
      ctx.interact()
    }
    const onMove = e => set(pointerShare(e, stage, 0.18) * TOTAL)
    const onKey = e => {
      let t = null
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') t = st.target + 0.4
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') t = st.target - 0.4
      if (e.key === 'Home') t = 0
      if (e.key === 'End') t = TOTAL
      if (t === null) return
      e.preventDefault()
      set(t)
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
    steps: 13,
    fig: 'Fig 6',
    title: 'Build matrix',
    hint: 'Mové el cursor en el tiempo',
    readout: '0/12 ok · 0 en paralelo',
    aria: 'Build matrix: las flechas avanzan o retroceden en el tiempo de la ejecución',
    keys: [
      { mark: 'raised', label: 'Pin alto: job corriendo' },
      { mark: 'lit', label: 'Tapa encendida: job terminado' },
    ],
    caption:
      'Una matriz genera un job por combinación (3 sistemas × 4 versiones = 12) y los reparte entre los slots disponibles. Con cuatro en paralelo, termina en una fracción de lo que tardaría en serie.',
  }
}
