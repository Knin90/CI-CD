import * as k from '../kit'
import { bench } from './bench'
import { runner, follow } from '../live'
import { shortOf, isDecision } from '../flowParse'

// «¿Qué ocurre internamente?» como máquina. Cada paso es una estación y un
// paquete salta de una a otra. La forma de la máquina se elige según el
// contenido del flujo, para que cada módulo tenga su propia figura:
//   line      cinta transportadora (build, test, jobs, merge…)
//   carousel  plato giratorio con brazo indicador (ciclos, feedback, reconciliación)
//   stairs    escalera de plataformas (promoción entre entornos, despliegue)
//   rack      torres de servidores con LEDs (runners, nodos, contenedores)
//   tanks     silos (caché, artefactos, logs, métricas, estado)

const W = 600
const HOP = 22
const S = k.solid
const L = k.line

const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
function hashOf(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  return h >>> 0
}

const KINDS = {
  carousel: { w: 2.6, re: /vuelve|ciclo|feedback|bucle|loop|reconcil|retro|itera|repite|continu|rota|monitor|observ/g, n: [3, 12] },
  stairs: { w: 1, re: /promoc|staging|produccion|entorno|madurez|escal|release|despliega|deploy|aprob|nivel|version/g, n: [2, 7] },
  rack: { w: 1.5, re: /runner|cluster|nodo|pods?\b|servidor|host|contenedor|docker|kubernetes|\bvm\b|agente|maquina|instancia|red\b|ssh/g, n: [2, 8] },
  tanks: { w: 1.2, re: /cache|artefact|logs?\b|metric|dato|almacen|storage|secret|variable|backup|estado|state|registry|digest|paquete/g, n: [2, 8] },
  line: { w: 0.75, re: /build|test|lint|commit|pipeline|job|stage|merge|\bpr\b|compila|scan|check/g, n: [2, 16] },
}

export function pickKind(steps) {
  const text = norm(steps.map(s => [s.label, s.meta, ...s.subs].join(' ')).join(' '))
  const N = steps.length
  let best = null
  let score = 0
  for (const [name, { re, n, w }] of Object.entries(KINDS)) {
    if (N < n[0] || N > n[1]) continue
    const m = (text.match(re) || []).length * w
    if (m > score) {
      score = m
      best = name
    }
  }
  if (best) return best
  const fits = Object.entries(KINDS).filter(([, { n }]) => N >= n[0] && N <= n[1]).map(([name]) => name)
  return fits[hashOf(text) % fits.length]
}

// Serpentina de filas
function grid(N, rows, spx, spy) {
  const cols = Math.ceil(N / rows)
  return {
    cols,
    pos: Array.from({ length: N }, (_, i) => {
      const r = Math.floor(i / cols)
      const c = r % 2 === 0 ? i % cols : cols - 1 - (i % cols)
      return [(c - (cols - 1) / 2) * spx, (r - (rows - 1) / 2) * spy]
    }),
  }
}
const plateAround = (pos, mx, my) => {
  const xs = pos.map(p => p[0]), ys = pos.map(p => p[1])
  const x0 = Math.min(...xs) - mx, x1 = Math.max(...xs) + mx
  const y0 = Math.min(...ys) - my, y1 = Math.max(...ys) + my
  return { x: x0, y: y0, w: x1 - x0, d: y1 - y0, r: 9 }
}

// Número y nombre corto grabados en la cara superior de una estación
function engrave(P, i, step, x, y, top, size = 6.5) {
  return (
    k.topText([x, y + size * 0.34], top, P, String(i + 1).padStart(2, '0'), { size, tone: 'hi' }) +
    k.topText([x, y + size * 0.34 + size * 0.95], top, P, shortOf(step.label), { size: Math.max(2.2, size * 0.4), tone: 'mid' })
  )
}
function pins(P, i, step, x, y, top) {
  let g = ''
  const n = Math.min(4, step.subs.length)
  for (let j = 0; j < n; j++) g += S(k.cyl(x - ((n - 1) / 2) * 6 + j * 6, y - 9, 1.7, top, 2.4, P, 12), { tone: 'mid', part: `sub-${i}-${j}` })
  return g
}

/* ---------------- Formas de máquina ---------------- */

function line(steps, hash) {
  const N = steps.length
  const rows = N <= 4 ? 1 : N <= 12 ? 2 : 3
  const { pos, cols } = grid(N, rows, 58, 70)
  const BOX = 26
  const T = 1.2
  const heightOf = i => 16 + (steps[i].subs.length ? 5 : 0) + (i % 2) * 3
  const topOf = i => T + heightOf(i)
  const H = rows === 1 ? 250 : rows === 2 ? 350 : 430
  const plate = plateAround(pos, 42, 40)
  const P = k.fit([...k.boxCorners(plate, -14, 0), ...pos.map(([x, y]) => [x, y, 30 + HOP])], W, H, { pad: 18, azimuth: (rows === 1 ? 60 : 48) + (hash % 7) - 3 })
  let base = bench(P, plate, { label: `${String(N).padStart(2, '0')} PASOS`, ruler: rows > 1 || cols > 3 })
  let flow = ''
  for (let i = 0; i < N - 1; i++) {
    const [ax, ay] = pos[i], [bx, by] = pos[i + 1]
    const pl = Math.abs(ay - by) < 0.01
      ? { x: Math.min(ax, bx) - 6, y: ay - 6, w: Math.abs(bx - ax) + 12, d: 12, r: 3 }
      : { x: ax - 6, y: Math.min(ay, by) - 6, w: 12, d: Math.abs(by - ay) + 12, r: 3 }
    base += S(k.slab(pl, 0, T, P, 3), { tone: 'lo', crease: 'none' })
    flow += k.lineTop([ax, ay], [bx, by], T, P)
  }
  base += L(flow, { tone: 'mid', flow: true })
  const items = steps.map((step, i) => {
    const [x, y] = pos[i]
    const h = heightOf(i), top = topOf(i)
    let g = ''
    if (isDecision(step.label)) {
      g += S(k.cyl(x, y, BOX / 2 + 2, T, 3, P, 36), { tone: 'mid' })
      g += S(k.cyl(x, y, BOX / 2, T + 3, h - 3, P, 36), { tone: 'hi', crease: 'lo', part: `st-${i}` })
      g += L(k.ringTop(x, y, BOX / 2 - 3, top, P, 32) + k.sideArc(x, y, BOX / 2, T + 3 + (h - 3) * 0.5, P, 24), { tone: 'faint' })
    } else {
      const pl = { x: x - BOX / 2, y: y - BOX / 2, w: BOX, d: BOX, r: 3 }
      g += S(k.slab(k.inset(pl, -2), T, 3, P, 3), { tone: 'mid' })
      g += S(k.slab(pl, T + 3, h - 3, P, 3), { tone: 'hi', crease: 'lo', part: `st-${i}` })
      g += L(k.planLine(k.inset(pl, 3), top, P, 2), { tone: 'faint' })
      g += k.dots(k.cornersOf(pl, 2.4).map(([a, b]) => k.at([a, b, top], P)), { r: 0.42 })
    }
    return { at: [x, y, 0], svg: g + engrave(P, i, step, x, y, top) + pins(P, i, step, x, y, top) }
  })
  return { P, H, pos, topOf, base, items, desc: `un banco con ${N} estaciones unidas por una cinta` }
}

function carousel(steps, hash) {
  const N = steps.length
  const R = N <= 5 ? 50 : N <= 8 ? 62 : 74
  const RB = R + 34
  const TT = 4 // plato
  const a0 = -Math.PI * 0.8 + (hash % 5) * 0.1
  const ang = i => a0 + (i / N) * Math.PI * 2
  const pos = steps.map((_, i) => [Math.cos(ang(i)) * R, Math.sin(ang(i)) * R])
  const heightOf = i => 12 + (steps[i].subs.length ? 4 : 0) + (i % 2) * 2
  const topOf = i => TT + heightOf(i)
  const HUB = 30
  const H = 360
  const P = k.fit([[-RB, -RB, -14], [RB, RB, -14], [-RB, RB, -14], [RB, -RB, -14], [0, 0, HUB + 10], ...pos.map(([x, y]) => [x, y, 26 + HOP])], W, H, { pad: 16, azimuth: 40 + (hash % 9) - 4 })
  // Banco redondo
  let base = k.halo(k.cyl(0, 0, RB, -14, 10, P, 72).fill)
  const feet = [0.25, 0.75, 1.25, 1.75].map(t => [Math.cos(t * Math.PI) * (RB - 18), Math.sin(t * Math.PI) * (RB - 18)])
  feet.sort((a, b) => k.depthOf([...a, 0], P) - k.depthOf([...b, 0], P))
  for (const [x, y] of feet) base += S(k.cyl(x, y, 6, -14, 4, P, 24), { tone: 'mid' })
  base += S(k.cyl(0, 0, RB, -10, 10, P, 80), { tone: 'mid' })
  base += L(k.ringTop(0, 0, RB - 5, 0, P, 80), { tone: 'lo' })
  base += k.dots(Array.from({ length: 12 }, (_, i) => k.at([Math.cos((i / 12) * Math.PI * 2) * (RB - 10), Math.sin((i / 12) * Math.PI * 2) * (RB - 10), 0], P)), { r: 0.5 })
  // Plato con marcas
  base += S(k.cyl(0, 0, R + 20, 0, TT, P, 80), { tone: 'mid' })
  base += L(k.ringTop(0, 0, R + 15, TT, P, 80) + k.ringTop(0, 0, R - 16, TT, P, 64), { tone: 'faint' })
  const t = k.radial(0, 0, R + 19, N * 6, 6, TT, [1.6, 3.4], P)
  base += L(t.minor, { tone: 'lo' }) + L(t.major, { tone: 'mid' })
  base += L(k.ringTop(0, 0, R, TT + 0.1, P, 72), { tone: 'mid', flow: true })
  const items = steps.map((step, i) => {
    const [x, y] = pos[i]
    const h = heightOf(i), top = topOf(i)
    let g = S(k.cyl(x, y, 14, TT, 2.5, P, 32), { tone: 'mid' })
    g += S(k.cyl(x, y, 12, TT + 2.5, h - 2.5, P, 32), { tone: 'hi', crease: 'lo', part: `st-${i}` })
    g += L(k.ringTop(x, y, 9, top, P, 28), { tone: 'faint' })
    if (isDecision(step.label)) g += L(k.sideArc(x, y, 12, TT + 2.5 + (h - 2.5) / 2, P, 20), { tone: 'lo' })
    return { at: [x, y, 0], svg: g + engrave(P, i, step, x, y, top, 5.4) }
  })
  // Eje central
  let hub = S(k.cyl(0, 0, 10, TT, 4, P, 32), { tone: 'mid' })
  hub += S(k.cyl(0, 0, 5, TT + 4, HUB - TT - 4, P, 24), { tone: 'mid', crease: 'none' })
  hub += L(k.sideArc(0, 0, 5, 16, P, 16), { tone: 'faint' })
  hub += S(k.cyl(0, 0, 7.5, HUB, 3, P, 28), { tone: 'hi', crease: 'lo' })
  hub += L(k.knurl(0, 0, 7.5, HUB, HUB + 3, 22, P), { tone: 'lo' })
  items.push({ at: [0, 0, 0], svg: hub })
  const after = `<path class="k-line" data-tone="lit" data-part="arm" style="stroke-width:1.4"/><g data-part="arm-tip">${k.dots([[0, 0]], { r: 1.6, tone: 'lit' })}</g>`
  const live = stage => {
    const arm = stage.querySelector('[data-part="arm"]')
    const tip = stage.querySelector('[data-part="arm-tip"]')
    const s = { a: ang(0), target: ang(0) }
    const draw = () => {
      const end = [Math.cos(s.a) * (R - 6), Math.sin(s.a) * (R - 6), HUB + 3]
      arm.setAttribute('d', k.seg([0, 0, HUB + 3], end, P))
      const p = k.at(end, P)
      tip.setAttribute('transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})`)
    }
    return {
      to(i) {
        let d = ang(i) - s.a
        d = Math.atan2(Math.sin(d), Math.cos(d))
        s.target = s.a + d
      },
      tick(dt, calm) {
        s.a = follow(s.a, s.target, dt, 0.35, calm)
        draw()
        return s.a !== s.target
      },
    }
  }
  return { P, H, pos, topOf, base, items, after, live, desc: `un plato giratorio con ${N} estaciones en círculo y un brazo que señala la activa` }
}

function stairs(steps, hash) {
  const N = steps.length
  const RISE = 8
  const c = (N - 1) / 2
  const pos = steps.map((_, i) => [(i - c) * 46, -(i - c) * 26])
  const baseOf = i => 3 + i * RISE
  const topOf = i => baseOf(i) + 11
  const H = 340
  const plate = plateAround(pos, 40, 38)
  const P = k.fit([...k.boxCorners(plate, -14, 0), ...pos.map(([x, y], i) => [x, y, topOf(i) + HOP + 8])], W, H, { pad: 16, azimuth: 36 + (hash % 7) - 3 })
  let base = bench(P, plate, { label: `${String(N).padStart(2, '0')} NIVELES` })
  // Pasamanos: línea punteada que une las plataformas
  base += L(pos.slice(0, -1).map((p, i) => k.lineTop(p, pos[i + 1], 0.2, P)).join(''), { tone: 'mid', flow: true })
  const items = steps.map((step, i) => {
    const [x, y] = pos[i]
    let g = ''
    // pedestal hecho de capas, una por escalón
    for (let j = 0; j <= i; j++) {
      const pl = { x: x - 18 + j * 0.4, y: y - 18 + j * 0.4, w: 36 - j * 0.8, d: 36 - j * 0.8, r: 3 }
      g += S(k.slab(pl, j === 0 ? 0 : 3 + (j - 1) * RISE, j === 0 ? 3 : RISE, P, 3), { tone: 'mid' })
    }
    const z = baseOf(i)
    if (isDecision(step.label)) {
      g += S(k.cyl(x, y, 12, z, 11, P, 32), { tone: 'hi', crease: 'lo', part: `st-${i}` })
      g += L(k.ringTop(x, y, 9, z + 11, P, 28), { tone: 'faint' })
    } else {
      const pl = { x: x - 12, y: y - 12, w: 24, d: 24, r: 2.5 }
      g += S(k.slab(pl, z, 11, P, 3), { tone: 'hi', crease: 'lo', part: `st-${i}` })
      g += L(k.planLine(k.inset(pl, 2.5), z + 11, P, 2), { tone: 'faint' })
    }
    g += k.dots(k.cornersOf({ x: x - 18, y: y - 18, w: 36, d: 36 }, 3).map(([a, b]) => k.at([a, b, z], P)), { r: 0.42 })
    return { at: [x, y, 0], svg: g + engrave(P, i, step, x, y, topOf(i), 5.6) + pins(P, i, step, x, y + 2, topOf(i)) }
  })
  return { P, H, pos, topOf, base, items, desc: `una escalera de ${N} plataformas que suben` }
}

function rack(steps, hash) {
  const N = steps.length
  const rows = N <= 5 ? 1 : 2
  const { pos } = grid(N, rows, 46, 70)
  const TW = 26, TD = 32
  const heightOf = i => 42 + (i % 3) * 5 + (steps[i].subs.length ? 4 : 0)
  const topOf = i => 3 + heightOf(i)
  const H = rows === 1 ? 300 : 390
  const plate = plateAround(pos, 40, 42)
  const P = k.fit([...k.boxCorners(plate, -14, 0), ...pos.map(([x, y], i) => [x, y, topOf(i) + HOP + 6])], W, H, { pad: 16, azimuth: 50 + (hash % 7) - 3 })
  let base = bench(P, plate, { label: `${String(N).padStart(2, '0')} NODOS`, ruler: false })
  // Bandeja de cables por el frente de cada fila
  const cable = []
  for (let i = 0; i < N - 1; i++) cable.push(k.lineTop([pos[i][0], pos[i][1] + TD / 2 + 5], [pos[i + 1][0], pos[i + 1][1] + TD / 2 + 5], 0.2, P))
  base += L(cable.join(''), { tone: 'mid', flow: true })
  const items = steps.map((step, i) => {
    const [x, y] = pos[i]
    const h = heightOf(i), top = topOf(i)
    const pl = { x: x - TW / 2, y: y - TD / 2, w: TW, d: TD, r: 1.5 }
    let g = S(k.slab(k.inset(pl, -2), 0, 3, P, 2), { tone: 'lo' })
    g += S(k.slab(pl, 3, h, P, 2), { tone: 'hi', crease: 'lo', part: `st-${i}` })
    // rejillas en el frente (+y) y LEDs
    const fy = pl.y + pl.d
    let vents = ''
    for (let z = 10; z < h - 6; z += 4.5) vents += k.seg([pl.x + 9, fy, z], [pl.x + pl.w - 3, fy, z], P)
    g += L(vents, { tone: 'faint' })
    g += L(k.seg([pl.x + 6.5, fy, 6], [pl.x + 6.5, fy, h - 2], P), { tone: 'lo' })
    const leds = Array.from({ length: 2 + Math.min(3, step.subs.length) }, (_, j) => k.at([pl.x + 3.4, fy, h - 4 - j * 4], P))
    g += `<g data-part="led-${i}">${k.dots(leds, { r: 0.9, tone: 'lo' })}</g>`
    g += L(k.planLine(k.inset(pl, 2.5), top, P, 2), { tone: 'faint' })
    return { at: [x, y, 0], svg: g + engrave(P, i, step, x, y - 3, top, 5.8) }
  })
  const live = stage => {
    const leds = steps.map((_, i) => stage.querySelector(`[data-part="led-${i}"] .k-dots`))
    return {
      to(i) {
        leds.forEach((el, j) => el && el.setAttribute('data-tone', j === i ? 'lit' : 'lo'))
      },
      tick: () => false,
    }
  }
  return { P, H, pos, topOf, base, items, live, desc: `una fila de ${N} torres de servidores con LEDs` }
}

function tanks(steps, hash) {
  const N = steps.length
  const rows = N <= 4 ? 1 : 2
  const { pos } = grid(N, rows, 50, 64)
  const R = 14
  const heightOf = i => 32 + (i % 2) * 8 + (steps[i].subs.length ? 4 : 0)
  const topOf = i => heightOf(i) + 3
  const H = rows === 1 ? 300 : 390
  const plate = plateAround(pos, 40, 40)
  const P = k.fit([...k.boxCorners(plate, -14, 0), ...pos.map(([x, y], i) => [x, y, topOf(i) + HOP + 6])], W, H, { pad: 16, azimuth: 42 + (hash % 9) - 4 })
  let base = bench(P, plate, { label: `${String(N).padStart(2, '0')} SILOS` })
  // tubería en el suelo entre silos
  let pipe = ''
  for (let i = 0; i < N - 1; i++) pipe += k.lineTop(pos[i], pos[i + 1], 0.2, P)
  base += L(pipe, { tone: 'mid', flow: true })
  const c = P.cam || k.camera(P)
  const front = Math.atan2(c.sa, c.ca)
  const items = steps.map((step, i) => {
    const [x, y] = pos[i]
    const h = heightOf(i), top = topOf(i)
    let g = S(k.cyl(x, y, R + 3, 0, 3, P, 36), { tone: 'mid' })
    g += S(k.cyl(x, y, R, 3, h - 3, P, 40), { tone: 'hi', crease: 'none', part: `st-${i}` })
    const bands = [0.32, 0.64].map(f => k.sideArc(x, y, R, 3 + (h - 3) * f, P, 24)).join('')
    g += L(bands, { tone: 'lo' })
    // escalera sobre la cara que mira al observador
    const off = 0.22
    const rail = a => [x + Math.cos(front + a) * R, y + Math.sin(front + a) * R]
    const [l1, l2] = [rail(-off), rail(off)]
    let ladder = k.seg([...l1, 5], [...l1, h - 2], P) + k.seg([...l2, 5], [...l2, h - 2], P)
    for (let z = 8; z < h - 2; z += 4) ladder += k.seg([...l1, z], [...l2, z], P)
    g += L(ladder, { tone: 'faint' })
    g += S(k.cyl(x, y, R - 1, h, 3, P, 36), { tone: 'hi', crease: 'lo' })
    g += L(k.ringTop(x, y, R - 4, top, P, 32), { tone: 'faint' })
    g += S(k.cyl(x + 6, y - 6, 2.4, top, 3, P, 14), { tone: 'mid' })
    return { at: [x, y, 0], svg: g + engrave(P, i, step, x - 1, y + 1, top, 5.4) }
  })
  return { P, H, pos, topOf, base, items, desc: `${N} silos unidos por una tubería` }
}

const BUILDERS = { line, carousel, stairs, rack, tanks }
const TITLES = { line: 'Cinta del flujo', carousel: 'Ciclo del flujo', stairs: 'Escalera del flujo', rack: 'Rack del flujo', tanks: 'Silos del flujo' }

/* ---------------- Figura ---------------- */

export default function buildFlow(steps, { fig = 'Fig 1', kind } = {}) {
  const N = steps.length
  const hash = hashOf(steps.map(s => s.label).join('|'))
  const type = kind || pickKind(steps)
  const M = BUILDERS[type](steps, hash)
  const { P, H, pos, topOf } = M

  let s = M.base
  s += `<path class="k-halo" data-part="shadow" style="filter:blur(3px);opacity:0" d="${k.slab({ x: -7, y: -7, w: 14, d: 14, r: 3 }, 0.3, 0.1, P).fill}"/>`
  const items = [...M.items].sort((a, b) => k.depthOf(a.at, P) - k.depthOf(b.at, P))
  s += items.map(it => it.svg).join('')
  s += M.after || ''
  // Paquete (va encima de todo)
  const pb = { x: -6, y: -6, w: 12, d: 12, r: 1.5 }
  let pkg = S(k.slab(pb, 0, 7, P, 2), { tone: 'hi', crease: 'lo', lit: true })
  pkg += S(k.slab(k.inset(pb, -0.6), 7, 2, P, 2), { tone: 'hi', crease: 'lo', lit: true })
  pkg += L(k.lineTop([-6.6, 0], [6.6, 0], 9, P), { tone: 'lit' })
  s += `<g data-part="pkg">${pkg}</g>`

  const svg = k.svg(
    W,
    H,
    `Una figura isométrica: ${M.desc}, una por paso del proceso: ${steps.map((st, i) => `${i + 1}, ${st.label}`).join('; ')}. Un paquete salta de estación en estación.`,
    s
  )

  function mount(stage, say, onStep) {
    const q = n => stage.querySelector(`[data-part="${n}"]`)
    const pkgEl = q('pkg')
    const shadow = q('shadow')
    const stations = steps.map((_, i) => q(`st-${i}`))
    const subs = steps.map((st, i) => Array.from({ length: Math.min(4, st.subs.length) }, (_, j) => q(`sub-${i}-${j}`)).filter(Boolean))
    const extra = M.live ? M.live(stage) : null
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
      pkgEl.setAttribute('transform', k.move(P, [x, y, z0 + (z1 - z0) * e + hop]))
      shadow.setAttribute('transform', k.move(P, [x, y, 0]))
      shadow.style.opacity = String(Math.min(1, hop / 8) * 0.8)
    }
    const mark = () => {
      stations.forEach((el, i) => (i === st.at ? el.setAttribute('data-on', '') : el.removeAttribute('data-on')))
      subs.forEach((list, i) => list.forEach(el => (i === st.at ? el.setAttribute('data-on', '') : el.removeAttribute('data-on'))))
      extra && extra.to(st.at)
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
      const moving = extra ? extra.tick(dt, calm) : false
      return st.t < 1 || moving
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
    extra && extra.tick(0, true)
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
    kind: type,
    fig,
    title: TITLES[type],
    hint: 'Mové el cursor',
    readout: `paso 1/${N} · ${shortOf(steps[0].label).toLowerCase()}`,
    aria: `${TITLES[type]}: las flechas mueven el paquete entre los ${N} pasos`,
    keys: [],
    caption: '',
  }
}
