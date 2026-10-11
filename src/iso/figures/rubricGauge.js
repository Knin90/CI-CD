import * as k from '../kit'
import { bench, knob } from './bench'
import { runner, follow, springTo, clamp, pointerShare } from '../live'

// Etapa 7 · Proyecto profesional: un comparador de cuadrante sobre un banco.
// El carro lleva cuatro bloques patrón, uno por criterio de la rúbrica; el
// palpador baja sobre el bloque que tiene debajo y la aguja marca su nota.

const W = 600
const H = 380
const PLATE = { x: -132, y: -64, w: 264, d: 128, r: 8 }
const BASE = { x: -116, y: -20, w: 44, d: 40, r: 3 }
const BASE_H = 24
const POST = [-102, 0]
const POST_TOP = 124
const CLAMP_Z = 102
const DIAL = [72, 0]
const DIAL_R = 20
const DIAL_Z = 84
const DIAL_TOP = DIAL_Z + 10
const CAR = { x: -36, y: -24, w: 72, d: 48, r: 3 }
const CAR_Z = 3
const CAR_TOP = 8
const BW = 13.6
const STEP = 16
const BLOCKS = [
  { h: 18, name: 'pip', label: 'pipeline' },
  { h: 14, name: 'cal', label: 'calidad' },
  { h: 16, name: 'seg', label: 'seguridad' },
  { h: 11, name: 'dep', label: 'despliegue' },
]
const FULL = 20 // altura = 100 %
const B0 = -30
const STOPS = BLOCKS.map((_, i) => DIAL[0] - (B0 + STEP * i + BW / 2))
const REACH = [STOPS[STOPS.length - 1] - 8, STOPS[0] + 8]
const TIP_R = 2.6

export default function build() {
  const P = k.fit([...k.boxCorners(PLATE, -14, 0), [POST[0], POST[1], POST_TOP + 4], [DIAL[0] + DIAL_R, 0, DIAL_TOP]], W, H, { pad: 18, azimuth: 40 })
  const S = k.solid
  const L = k.line
  const D = (pts, o) => k.dots(pts.map(p => k.at(p, P)), o)

  let s = bench(P, PLATE, { label: 'EVAL·25' })
  // Raíles y topes
  for (const y of [-19, 14]) {
    s += S(k.slab({ x: 4, y, w: 128, d: 5, r: 1 }, 0, 3, P, 2), { tone: 'mid' })
    s += D([10, 126].map(x => [x, y + 2.5, 3]), { r: 0.4 })
  }
  for (const x of [-1, 132]) {
    s += S(k.slab({ x, y: -22, w: 5, d: 44, r: 1.2 }, 0, 7, P, 2), { tone: 'mid' })
    s += D([[x + 2.5, -17, 7], [x + 2.5, 17, 7]], { r: 0.45 })
  }
  // Base magnética, poste, mordaza
  s += S(k.slab(BASE, 0, 11, P, 4), { tone: 'mid' })
  s += S(k.slab(k.inset(BASE, 0.8), 11, BASE_H - 11, P, 4), { tone: 'mid' })
  s += L(k.planLine(k.inset(BASE, 3), BASE_H, P, 3), { tone: 'faint' })
  s += knob(P, BASE.x + 32, BASE.y + 28, BASE_H, 6, 4)
  s += S(k.cyl(POST[0], POST[1], 5, BASE_H, 4, P, 24), { tone: 'mid' })
  s += S(k.cyl(POST[0], POST[1], 3.2, BASE_H + 4, CLAMP_Z - BASE_H - 8, P, 22), { tone: 'mid', crease: 'none' })
  s += L(k.sideArc(POST[0], POST[1], 3.2, 60, P) + k.sideArc(POST[0], POST[1], 3.2, 80, P), { tone: 'faint' })
  const clamp14 = { x: POST[0] - 7, y: -7, w: 14, d: 14, r: 2.5 }
  s += S(k.slab(clamp14, CLAMP_Z - 4, 12, P, 3), { tone: 'mid' })
  s += knob(P, POST[0], 10, CLAMP_Z, 2.6, 6)
  s += S(k.cyl(POST[0], POST[1], 3.2, CLAMP_Z + 8, POST_TOP - CLAMP_Z - 8, P, 22), { tone: 'mid', crease: 'none' })
  s += S(k.cyl(POST[0], POST[1], 3.8, POST_TOP, 2, P, 22), { tone: 'mid' })

  // Carro con bloques patrón
  let car = `<path class="k-halo" style="filter:blur(4px)" d="${k.slab(k.inset(CAR, 3), CAR_Z, 0.1, P).fill}"/>`
  car += S(k.slab(CAR, CAR_Z, CAR_TOP - CAR_Z, P, 3), { tone: 'mid' })
  car += L(k.lineTop([CAR.x, -15.5], [CAR.x + CAR.w, -15.5], CAR_TOP, P) + k.lineTop([CAR.x, 15.5], [CAR.x + CAR.w, 15.5], CAR_TOP, P), { tone: 'faint' })
  car += D([-26, -9, 9, 26].map(x => [x, CAR.y + CAR.d - 2.6, CAR_TOP]), { r: 0.4, tone: 'lo' })
  BLOCKS.forEach((b, i) => {
    const plan = { x: B0 + STEP * i, y: -12, w: BW, d: 24, r: 1 }
    car += S(k.slab(plan, CAR_TOP, b.h, P, 2), { tone: 'hi', crease: 'lo', part: `block-${i}` })
    car += L(k.planLine(k.inset(plan, 2), CAR_TOP + b.h, P, 2), { tone: 'faint' })
    car += k.topText([plan.x + BW / 2, 8], CAR_TOP + b.h, P, b.name, { size: 2.6, tone: 'mid' })
  })
  car += S(k.slab({ x: CAR.x + CAR.w - 1, y: -2, w: 4, d: 4, r: 1 }, CAR_Z + 1, 3, P, 2), { tone: 'mid', crease: 'none' })
  car += knob(P, CAR.x + CAR.w + 4.4, 0, CAR_Z, 3, 5)
  s += `<g data-part="car">${car}</g>`

  // Palpador (se mueve en z)
  let plunger = S(k.cyl(DIAL[0], DIAL[1], TIP_R, 0, 2.4, P, 18), { tone: 'hi', lit: true })
  plunger += S(k.cyl(DIAL[0], DIAL[1], 1.4, 2.4, 52, P, 14), { tone: 'hi', crease: 'none', lit: true })
  s += `<g data-part="plunger">${plunger}</g>`

  // Brazo, vástago y cuadrante
  const arm = { x: POST[0] + 7, y: -3, w: DIAL[0] - DIAL_R - POST[0] - 5, d: 6, r: 2 }
  s += S(k.slab(arm, CLAMP_Z, 4, P, 3), { tone: 'mid' })
  s += D([[arm.x + 4, 0, CLAMP_Z + 4], [arm.x + arm.w - 5, 0, CLAMP_Z + 4]], { r: 0.45 })
  s += S(k.cyl(DIAL[0], DIAL[1], 2.9, 56, DIAL_Z - 56, P, 18), { tone: 'mid' })
  s += S(k.slab({ x: DIAL[0] - DIAL_R - 6, y: -4, w: 8, d: 8, r: 1.5 }, DIAL_Z + 2, CLAMP_Z - DIAL_Z - 2, P, 2), { tone: 'mid' })
  s += S(k.cyl(DIAL[0], DIAL[1], DIAL_R, DIAL_Z, DIAL_TOP - DIAL_Z, P, 64), { tone: 'hi', crease: 'lo' })
  s += L(k.knurl(DIAL[0], DIAL[1], DIAL_R, DIAL_TOP - 3.4, DIAL_TOP, 72, P), { tone: 'lo' })
  s += L(k.sideArc(DIAL[0], DIAL[1], DIAL_R, DIAL_TOP - 3.4, P, 40), { tone: 'faint' })
  s += L(k.ringTop(DIAL[0], DIAL[1], DIAL_R - 2.2, DIAL_TOP, P, 64), { tone: 'lo' })
  const t = k.radial(DIAL[0], DIAL[1], DIAL_R - 3, 50, 5, DIAL_TOP, [1.3, 2.8], P)
  s += L(t.minor, { tone: 'lo' }) + L(t.major, { tone: 'mid' })
  s += k.topText([DIAL[0], DIAL[1] + 8.5], DIAL_TOP, P, '%', { size: 2.6, tone: 'lo' })
  s += S(k.slab({ x: DIAL[0] + DIAL_R - 1, y: -2.4, w: 5, d: 4.8, r: 1.2 }, DIAL_Z + 2, 5, P, 2), { tone: 'mid' })
  s += L(k.ringTop(DIAL[0], DIAL[1], 1.6, DIAL_TOP, P, 14), { tone: 'mid' })
  s += `<path class="k-line" data-tone="lit" data-part="needle" style="stroke-width:1.2"/>`

  const svg = k.svg(
    W,
    H,
    'Un comparador de cuadrante sobre un banco. Un carro lleva cuatro bloques patrón, uno por criterio de la rúbrica: pipeline, calidad, seguridad y despliegue. Donde se detiene el carro, el palpador baja sobre el bloque y la aguja marca su nota.',
    s
  )

  const needleAt = share => {
    const a = share * Math.PI * 2
    const [x, y] = DIAL
    return k.lineTop([x - Math.sin(a) * 3.4, y + Math.cos(a) * 3.4], [x + Math.sin(a) * (DIAL_R - 4), y - Math.cos(a) * (DIAL_R - 4)], DIAL_TOP + 0.2, P)
  }
  const heightUnder = cx => {
    let top = CAR_TOP
    BLOCKS.forEach((b, i) => {
      const from = cx + B0 + STEP * i
      if (from + BW > DIAL[0] - TIP_R && from < DIAL[0] + TIP_R) top = Math.max(top, CAR_TOP + b.h)
    })
    return top
  }
  const blockUnder = cx =>
    BLOCKS.findIndex((_, i) => {
      const from = cx + B0 + STEP * i
      return DIAL[0] >= from && DIAL[0] <= from + BW
    })

  function mount(stage, say) {
    const q = n => stage.querySelector(`[data-part="${n}"]`)
    const carEl = q('car')
    const plungerEl = q('plunger')
    const needle = q('needle')
    const blocks = BLOCKS.map((_, i) => q(`block-${i}`))
    const st = { x: STOPS[0], target: STOPS[0], tip: { at: CAR_TOP + BLOCKS[0].h, rate: 0 } }
    const draw = () => {
      carEl.setAttribute('transform', k.move(P, [st.x, 0, 0]))
      plungerEl.setAttribute('transform', k.move(P, [0, 0, st.tip.at]))
      needle.setAttribute('d', needleAt((st.tip.at - CAR_TOP) / FULL))
      const i = blockUnder(st.x)
      blocks.forEach((b, j) => (j === i ? b.setAttribute('data-on', '') : b.removeAttribute('data-on')))
      const pct = Math.round(((st.tip.at - CAR_TOP) / FULL) * 100)
      say(i < 0 ? `entre bloques · ${pct}%` : `${BLOCKS[i].label} · ${pct}%`)
    }
    const ctx = runner(stage, (dt, calm, c) => {
      if (c.touring) st.target = STOPS[Math.floor(c.clock / 2.2) % STOPS.length]
      st.x = follow(st.x, st.target, dt, 0.28, calm)
      const settled = springTo(st.tip, heightUnder(st.x), dt, 420, 26, calm)
      draw()
      return !(settled && st.x === st.target)
    })
    const steer = x => {
      st.target = clamp(x, REACH[0], REACH[1])
      ctx.interact()
    }
    // el carro se mueve al revés que el puntero para que el bloque bajo el
    // palpador avance de izquierda a derecha
    const onMove = e => steer(REACH[1] - pointerShare(e, stage, 0.25) * (REACH[1] - REACH[0]))
    const onKey = e => {
      const here = STOPS.reduce((b, s, i) => (Math.abs(s - st.target) < Math.abs(STOPS[b] - st.target) ? i : b), 0)
      let to = null
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') to = Math.min(STOPS.length - 1, here + 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') to = Math.max(0, here - 1)
      if (e.key === 'Home') to = 0
      if (e.key === 'End') to = STOPS.length - 1
      if (to === null) return
      e.preventDefault()
      stage.setAttribute('aria-valuenow', String(to))
      stage.setAttribute('aria-valuetext', `${BLOCKS[to].label}: ${Math.round((BLOCKS[to].h / FULL) * 100)} %`)
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
    steps: BLOCKS.length,
    fig: 'Fig 7',
    title: 'Banco de evaluación',
    hint: 'Mové el cursor',
    readout: `${BLOCKS[0].label} · ${Math.round((BLOCKS[0].h / FULL) * 100)}%`,
    aria: 'Banco de evaluación: las flechas mueven el carro de criterio en criterio',
    keys: [
      { mark: 'lit', label: 'Palpador y aguja: la medición' },
      { mark: 'raised', label: 'Bloques: criterios de la rúbrica' },
    ],
    caption:
      'La evaluación final mide el proyecto con una rúbrica: cada criterio es un bloque patrón y el comparador lee su altura. Un proyecto profesional sube en todos, no solo en uno.',
  }
}
