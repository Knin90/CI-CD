import * as k from '../kit'
import { bench, knob, lamp } from './bench'
import { runner, follow, springTo, clamp, pointerShare } from '../live'

// Etapa 1 · Fundamentos: una línea de ensamblado. El commit es una caja
// sobre un carro que recorre tres estaciones (build, test, deploy); en cada
// una la herramienta baja sobre la caja y la lámpara de la estación queda
// encendida: esa etapa del pipeline pasó.

const W = 600
const H = 340
const PLATE = { x: -150, y: -52, w: 300, d: 104, r: 8 }
const RAILS = [-17, 12]
const CAR = { x: -20, y: -20, w: 40, d: 40, r: 3 }
const CAR_Z = 3
const CAR_TOP = 7
const CRATE = { x: -14, y: -14, w: 28, d: 28, r: 2 }
const CRATE_TOP = 27
const STATIONS = [
  { x: -80, name: 'build', tool: 'press' },
  { x: 0, name: 'test', tool: 'probe' },
  { x: 80, name: 'deploy', tool: 'stamp' },
]
const POST_Y = [-38, 36]
const BAR_Z = 72
const HEAD_Z = 60
const TOOL_Z = 40 // base de la herramienta en reposo
const PRESS = TOOL_Z - CRATE_TOP
const STOPS = [-118, -80, 0, 80, 118]
const SHA = '3f2a'

export default function build() {
  const P = k.fit([...k.boxCorners(PLATE, -14, 0), [-80, -42, BAR_Z + 10], [80, 42, BAR_Z + 10]], W, H, { pad: 18, azimuth: 36 })
  const S = k.solid
  const L = k.line
  const D = (pts, o) => k.dots(pts.map(p => k.at(p, P)), o)

  let back = bench(P, PLATE, { label: 'CI·01' })
  // Raíles con topes
  for (const y of RAILS) {
    back += S(k.slab({ x: -138, y, w: 276, d: 5, r: 1 }, 0, 3, P, 2), { tone: 'mid' })
    back += D([-132, -66, 0, 66, 132].map(x => [x, y + 2.5, 3]), { r: 0.4 })
  }
  for (const x of [-144, 139]) {
    back += S(k.slab({ x, y: -21, w: 5, d: 42, r: 1.2 }, 0, 7, P, 2), { tone: 'mid' })
    back += D([[x + 2.5, -16, 7], [x + 2.5, 16, 7]], { r: 0.45 })
  }
  // Postes traseros de cada estación
  const post = (x, y) =>
    S(k.slab({ x: x - 7, y: y - 7, w: 14, d: 14, r: 2 }, 0, 4, P, 3), { tone: 'mid' }) +
    D(k.cornersOf({ x: x - 7, y: y - 7, w: 14, d: 14 }, 2.4).map(([a, b]) => [a, b, 4]), { r: 0.4 }) +
    S(k.cyl(x, y, 3.6, 4, BAR_Z - 4, P, 24), { tone: 'mid', crease: 'none' }) +
    L(k.sideArc(x, y, 3.6, 22, P) + k.sideArc(x, y, 3.6, 48, P), { tone: 'faint' }) +
    S(k.cyl(x, y, 4.6, 30, 5, P, 24), { tone: 'mid' })
  for (const s of STATIONS) back += post(s.x, POST_Y[0])

  // Carro + caja (el commit)
  let car = `<path class="k-halo" style="filter:blur(4px)" d="${k.slab(k.inset(CAR, 3), CAR_Z, 0.1, P).fill}"/>`
  car += S(k.slab(CAR, CAR_Z, CAR_TOP - CAR_Z, P, 3), { tone: 'mid' })
  car += D([-14, -5, 5, 14].map(x => [x, CAR.y + CAR.d - 2.4, CAR_TOP]), { r: 0.38, tone: 'lo' })
  car += S(k.slab({ x: CAR.x + CAR.w - 1, y: -2, w: 4, d: 4, r: 1 }, CAR_Z + 1, 3, P, 2), { tone: 'mid', crease: 'none' })
  car += knob(P, CAR.x + CAR.w + 4.4, 0, CAR_Z, 3, 5)
  car += S(k.slab(CRATE, CAR_TOP, 16, P, 3), { tone: 'hi', crease: 'lo' })
  const lid = k.inset(CRATE, -0.6)
  car += S(k.slab(lid, CAR_TOP + 16, CRATE_TOP - CAR_TOP - 16, P, 3), { tone: 'hi', crease: 'lo', part: 'lid' })
  car += L(k.planLine(k.inset(lid, 3), CRATE_TOP, P, 3), { tone: 'faint' })
  car += D(k.cornersOf(lid, 2).map(([x, y]) => [x, y, CRATE_TOP]), { r: 0.45 })
  car += k.topText([0, 1.6], CRATE_TOP, P, SHA, { size: 5, tone: 'hi' })
  car += L(k.lineTop([-7, 5.5], [7, 5.5], CRATE_TOP, P) + k.lineTop([-7, 8], [3, 8], CRATE_TOP, P), { tone: 'lo' })

  // Estaciones: herramienta (se mueve), muelle, cabezal, travesaño, lámpara, poste delantero
  const toolOf = s => {
    let t = S(k.cyl(s.x, 0, 1.8, TOOL_Z + 3, HEAD_Z + 14 - TOOL_Z - 3, P, 16), { tone: 'mid', crease: 'none' })
    if (s.tool === 'press') {
      t += S(k.slab({ x: s.x - 10, y: -10, w: 20, d: 20, r: 2 }, TOOL_Z, 3, P, 3), { tone: 'hi', crease: 'lo' })
      t += L(k.planLine({ x: s.x - 7, y: -7, w: 14, d: 14, r: 1 }, TOOL_Z + 3, P, 3), { tone: 'faint' })
    } else if (s.tool === 'probe') {
      t += S(k.cyl(s.x, 0, 4, TOOL_Z + 1.5, 1.5, P, 20), { tone: 'mid' })
      t += S(k.cyl(s.x, 0, 1.2, TOOL_Z, 1.5, P, 12), { tone: 'hi' })
    } else {
      t += S(k.cyl(s.x, 0, 8, TOOL_Z, 3, P, 32), { tone: 'hi', crease: 'lo' })
      t += L(k.ringTop(s.x, 0, 5, TOOL_Z + 3, P, 28), { tone: 'faint' })
    }
    return t
  }
  let stations = ''
  STATIONS.forEach((s, i) => {
    stations += `<path class="k-line" data-tone="lo" data-part="spring-back-${i}"/>`
    stations += `<g data-part="tool-${i}">${toolOf(s)}</g>`
    stations += `<path class="k-line" data-tone="mid" data-part="spring-front-${i}"/>`
    const head = { x: s.x - 8, y: -8, w: 16, d: 16, r: 2 }
    stations += S(k.slab(head, HEAD_Z, BAR_Z - HEAD_Z, P, 3), { tone: 'mid' })
    stations += L(k.planLine(k.inset(head, 2.5), BAR_Z, P, 2), { tone: 'faint' })
    const bar = { x: s.x - 6, y: -42, w: 12, d: 82, r: 2 }
    stations += S(k.slab(bar, BAR_Z, 8, P, 3), { tone: 'mid' })
    stations += L(k.lineTop([s.x - 6, -20], [s.x + 6, -20], BAR_Z + 8, P) + k.lineTop([s.x - 6, 20], [s.x + 6, 20], BAR_Z + 8, P), { tone: 'faint' })
    stations += D([[s.x, -38, BAR_Z + 8], [s.x, 36, BAR_Z + 8], [s.x - 3, -12, BAR_Z + 8], [s.x + 3, -12, BAR_Z + 8]], { r: 0.45 })
    stations += lamp(P, s.x, 24, BAR_Z + 8, `lamp-${i}`)
    stations += k.topText([s.x, 10], BAR_Z + 8, P, s.name, { size: 3.2, tone: 'mid' })
    stations += post(s.x, POST_Y[1])
  })

  const svg = k.svg(
    W,
    H,
    'Una línea de ensamblado sobre una placa: un carro con una caja (el commit) recorre unos raíles y pasa por tres estaciones, build, test y deploy. En cada estación la herramienta baja sobre la caja y la lámpara se enciende cuando esa etapa pasó.',
    back + `<g data-part="car">${car}</g>` + stations
  )

  const springAt = (i, z) => {
    const s = STATIONS[i]
    return k.spring(s.x, 0, 3.6, z + 4, HEAD_Z, 6, P)
  }

  function mount(stage, say) {
    const q = n => stage.querySelector(`[data-part="${n}"]`)
    const carEl = q('car')
    const tools = STATIONS.map((_, i) => q(`tool-${i}`))
    const lamps = STATIONS.map((_, i) => q(`lamp-${i}`))
    const sb = STATIONS.map((_, i) => q(`spring-back-${i}`))
    const sf = STATIONS.map((_, i) => q(`spring-front-${i}`))
    const st = { x: STOPS[0], target: STOPS[0], tips: STATIONS.map(() => ({ at: 0, rate: 0 })), stop: 0 }
    const tourAt = t => STOPS[Math.floor(t / 2.4) % STOPS.length]

    const draw = () => {
      carEl.setAttribute('transform', k.move(P, [st.x, 0, 0]))
      STATIONS.forEach((s, i) => {
        const dz = -st.tips[i].at
        tools[i].setAttribute('transform', k.move(P, [0, 0, dz]))
        const sp = springAt(i, TOOL_Z + dz)
        sb[i].setAttribute('d', sp.back)
        sf[i].setAttribute('d', sp.front)
        if (st.x >= s.x - 3) lamps[i].setAttribute('data-on', '')
        else lamps[i].removeAttribute('data-on')
      })
      const passed = STATIONS.filter(s => st.x >= s.x - 3).length
      const here = STATIONS.findIndex(s => Math.abs(st.x - s.x) < 3)
      let text
      if (here >= 0) text = `commit ${SHA} · en ${STATIONS[here].name}`
      else if (passed === 0) text = `commit ${SHA} · en cola`
      else if (passed === STATIONS.length) text = `commit ${SHA} · desplegado`
      else text = `commit ${SHA} · ${passed}/3 etapas`
      say(text)
    }

    const ctx = runner(stage, (dt, calm, c) => {
      if (c.touring) st.target = tourAt(c.clock)
      st.x = follow(st.x, st.target, dt, 0.4, calm)
      const arrived = Math.abs(st.target - st.x) < 1
      let settled = st.x === st.target
      STATIONS.forEach((s, i) => {
        const want = arrived && Math.abs(st.x - s.x) < 3 ? PRESS : 0
        if (!springTo(st.tips[i], want, dt, 260, 22, calm)) settled = false
      })
      draw()
      return !settled
    })

    const steer = x => {
      st.target = clamp(x, STOPS[0], STOPS[STOPS.length - 1])
      ctx.interact()
    }
    const onMove = e => steer(STOPS[0] + pointerShare(e, stage) * (STOPS[STOPS.length - 1] - STOPS[0]))
    const onKey = e => {
      const near = STOPS.reduce((b, s, i) => (Math.abs(s - st.target) < Math.abs(STOPS[b] - st.target) ? i : b), 0)
      let to = null
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') to = Math.min(STOPS.length - 1, near + 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') to = Math.max(0, near - 1)
      if (e.key === 'Home') to = 0
      if (e.key === 'End') to = STOPS.length - 1
      if (to === null) return
      e.preventDefault()
      stage.setAttribute('aria-valuenow', String(to))
      steer(STOPS[to])
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
    steps: STOPS.length,
    fig: 'Fig 1',
    title: 'Línea de integración',
    hint: 'Mové el cursor',
    readout: `commit ${SHA} · en cola`,
    aria: 'Línea de integración: las flechas mueven el commit de estación en estación',
    keys: [
      { mark: 'raised', label: 'Caja: el commit' },
      { mark: 'lit', label: 'Lámpara: etapa superada' },
    ],
    caption:
      'Cada commit recorre las mismas estaciones en orden: se compila, se prueba y se despliega. Si una estación no lo aprueba, no pasa a la siguiente.',
  }
}
