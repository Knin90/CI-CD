// Kit isométrico mínimo: proyección, sólidos extruidos con sombreado en
// cuatro tonos, cilindros, líneas sobre caras y helpers SVG en texto.
// Mundo: x, y en el suelo y z hacia arriba (≈ 1 px). Pantalla: viewBox.

const RAD = Math.PI / 180

export function camera({ scale = 1, azimuth = 42, elevation = 30 }) {
  const a = azimuth * RAD
  const e = elevation * RAD
  return { sa: Math.sin(a), ca: Math.cos(a), se: Math.sin(e), ce: Math.cos(e), k: scale }
}

export function iso([x, y, z], P) {
  const c = P.cam || (P.cam = camera(P))
  return [P.origin[0] + (x * c.sa - y * c.ca) * c.k, P.origin[1] + ((x * c.ca + y * c.sa) * c.se - z * c.ce) * c.k]
}

// Mayor = más cerca del observador
export function depthOf([x, y, z], P) {
  const c = P.cam || (P.cam = camera(P))
  return (x * c.ca + y * c.sa) * c.ce + z * c.se
}

export function fit(points, width, height, { pad = 24, azimuth = 42, elevation = 30 } = {}) {
  const unit = { origin: [0, 0], scale: 1, azimuth, elevation }
  const flat = points.map(p => iso(p, unit))
  const xs = flat.map(p => p[0])
  const ys = flat.map(p => p[1])
  const l = Math.min(...xs), r = Math.max(...xs), u = Math.min(...ys), d = Math.max(...ys)
  const scale = Math.min((width - pad * 2) / (r - l), (height - pad * 2) / (d - u))
  return { origin: [width / 2 - ((l + r) / 2) * scale, height / 2 - ((u + d) / 2) * scale], scale, azimuth, elevation }
}

export const boxCorners = ({ x, y, w, d }, z0, z1) => {
  const out = []
  for (const px of [x, x + w]) for (const py of [y, y + d]) for (const pz of [z0, z1]) out.push([px, py, pz])
  return out
}

const n1 = v => {
  const t = (Math.round(v * 10) / 10).toFixed(1).replace(/\.0$/, '')
  return t === '-0' ? '0' : t
}
export const pathOf = (pts, closed = false) =>
  pts.length ? 'M' + pts.map(p => `${n1(p[0])} ${n1(p[1])}`).join('L') + (closed ? 'Z' : '') : ''

// ---------- Contornos en planta ----------
export function roundedPlan({ x, y, w, d, r }, steps = 6) {
  r = Math.max(0, Math.min(r, w / 2, d / 2))
  if (r < 0.01) return [[x, y], [x + w, y], [x + w, y + d], [x, y + d]]
  const pts = []
  const arc = (cx, cy, a0) => {
    for (let i = 0; i <= steps; i++) {
      const a = a0 + (i / steps) * (Math.PI / 2)
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
    }
  }
  arc(x + w - r, y + r, -Math.PI / 2)
  arc(x + w - r, y + d - r, 0)
  arc(x + r, y + d - r, Math.PI / 2)
  arc(x + r, y + r, Math.PI)
  return pts
}
export const circleRing = (cx, cy, r, steps = 32) =>
  Array.from({ length: steps }, (_, i) => {
    const a = (i / steps) * Math.PI * 2
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]
  })
export const inset = ({ x, y, w, d, r }, by) => ({ x: x + by, y: y + by, w: w - by * 2, d: d - by * 2, r: Math.max(0, r - by) })
export const cornersOf = ({ x, y, w, d }, i = 0) => [[x + i, y + i], [x + w - i, y + i], [x + w - i, y + d - i], [x + i, y + d - i]]

function hull(pts) {
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
  const lo = [], up = []
  for (const q of p) {
    while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop()
    lo.push(q)
  }
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i]
    while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop()
    up.push(q)
  }
  return lo.slice(0, -1).concat(up.slice(0, -1))
}

// ---------- Sólidos ----------
// Prisma convexo: contorno en planta extruido de z a z+h.
export function extrude(ring, z, h, P) {
  const c = P.cam || (P.cam = camera(P))
  const view = [c.ca, c.sa]
  // Luz rasante desde la izquierda del observador
  const la = (P.azimuth - 62) * RAD
  const light = [Math.cos(la), Math.sin(la)]
  let area = 0
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i], b = ring[(i + 1) % ring.length]
    area += a[0] * b[1] - b[0] * a[1]
  }
  const sgn = area > 0 ? 1 : -1
  const B = ring.map(([x, y]) => iso([x, y, z], P))
  const T = ring.map(([x, y]) => iso([x, y, z + h], P))
  const shades = ['', '', '', '']
  const crease = []
  for (let i = 0; i < ring.length; i++) {
    const j = (i + 1) % ring.length
    const dx = ring[j][0] - ring[i][0], dy = ring[j][1] - ring[i][1]
    const len = Math.hypot(dx, dy) || 1
    const nx = (sgn * dy) / len, ny = (-sgn * dx) / len
    if (nx * view[0] + ny * view[1] <= 1e-4) continue
    const lit = nx * light[0] + ny * light[1]
    const b = Math.max(0, Math.min(3, Math.floor((lit + 1) * 2)))
    shades[b] += pathOf([B[i], B[j], T[j], T[i]], true)
    crease.push([T[i], T[j]])
  }
  const outline = pathOf(hull([...B, ...T]), true)
  return {
    fill: outline,
    outline,
    top: pathOf(T, true),
    shades,
    crease: crease.map(([a, b]) => pathOf([a, b])).join(''),
  }
}
export const slab = (plan, z, h, P, steps = 4) => extrude(roundedPlan(plan, steps), z, h, P)
export const cyl = (cx, cy, r, z, h, P, steps = 28) => extrude(circleRing(cx, cy, r, steps), z, h, P)

// ---------- Líneas sobre caras ----------
export const onTop = (pts, z, P, closed = false) => pathOf(pts.map(([x, y]) => iso([x, y, z], P)), closed)
export const lineTop = (a, b, z, P) => onTop([a, b], z, P)
export const seg = (a, b, P) => pathOf([iso(a, P), iso(b, P)])
export const planLine = (plan, z, P, steps = 4) => onTop(roundedPlan(plan, steps), z, P, true)
export const ringTop = (cx, cy, r, z, P, steps = 32) => onTop(circleRing(cx, cy, r, steps), z, P, true)
export const at = (p, P) => iso(p, P)

// Arco visible de un cilindro a la altura z (costuras, bandas)
export function sideArc(cx, cy, r, z, P, steps = 20) {
  const c = P.cam || (P.cam = camera(P))
  const a0 = Math.atan2(c.sa, c.ca)
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const a = a0 - Math.PI / 2 + (i / steps) * Math.PI
    pts.push(iso([cx + Math.cos(a) * r, cy + Math.sin(a) * r, z], P))
  }
  return pathOf(pts)
}
// Moleteado: líneas verticales en la mitad visible
export function knurl(cx, cy, r, z0, z1, count, P) {
  const c = P.cam || (P.cam = camera(P))
  const a0 = Math.atan2(c.sa, c.ca)
  let d = ''
  for (let i = 1; i < count; i++) {
    const a = a0 - Math.PI / 2 + (i / count) * Math.PI
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r
    d += seg([x, y, z0], [x, y, z1], P)
  }
  return d
}
// Marcas de regla sobre una cara superior a lo largo de x
export function ticks(x0, x1, step, every, edgeY, z, [minor, major], P) {
  let a = '', b = ''
  for (let i = 0, x = x0; x <= x1 + 1e-6; i++, x += step) {
    const big = i % every === 0
    const d = lineTop([x, edgeY], [x, edgeY + (big ? major : minor)], z, P)
    if (big) b += d
    else a += d
  }
  return { minor: a, major: b }
}
// Marcas radiales sobre una cara horizontal
export function radial(cx, cy, r, count, every, z, [minor, major], P) {
  let a = '', b = ''
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2
    const s = Math.sin(t), c = -Math.cos(t)
    const len = i % every === 0 ? major : minor
    const d = lineTop([cx + s * r, cy + c * r], [cx + s * (r - len), cy + c * (r - len)], z, P)
    if (i % every === 0) b += d
    else a += d
  }
  return { minor: a, major: b }
}
// Muelle helicoidal vertical: mitades trasera y delantera
export function spring(cx, cy, r, z0, z1, turns, P, per = 14) {
  const c = P.cam || (P.cam = camera(P))
  const front = Math.atan2(c.sa, c.ca)
  const n = Math.round(turns * per)
  let back = '', fr = ''
  let run = [], runFront = null
  const flush = () => {
    if (run.length > 1) {
      if (runFront) fr += pathOf(run)
      else back += pathOf(run)
    }
  }
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const a = t * turns * Math.PI * 2
    const isFront = Math.cos(a - front) > 0
    const p = iso([cx + Math.cos(a) * r, cy + Math.sin(a) * r, z0 + (z1 - z0) * t], P)
    if (runFront !== null && isFront !== runFront) {
      run.push(p)
      flush()
      run = [p]
    } else run.push(p)
    runFront = isFront
  }
  flush()
  return { back, front: fr }
}

export function move(P, [dx, dy, dz]) {
  const o = iso([0, 0, 0], P)
  const m = iso([dx, dy, dz], P)
  return `translate(${(m[0] - o[0]).toFixed(2)} ${(m[1] - o[1]).toFixed(2)})`
}

// Texto apoyado en una cara superior
export function topText([x, y], z, P, text, { size = 3, tone = 'mid', anchor = 'middle' } = {}) {
  const o = iso([x, y, z], P)
  const ux = iso([x + 1, y, z], P), uy = iso([x, y + 1, z], P)
  const m = [ux[0] - o[0], ux[1] - o[1], uy[0] - o[0], uy[1] - o[1], o[0], o[1]].map(v => +v.toFixed(3))
  return `<text class="k-text" data-tone="${tone}" transform="matrix(${m.join(' ')})" font-size="${size}" text-anchor="${anchor}">${text}</text>`
}

// ---------- SVG en texto ----------
export function solid(p, { tone = 'hi', crease = 'faint', lit = false, part, halo = false } = {}) {
  let s = halo ? `<path class="k-halo" d="${p.fill}"/>` : ''
  s += `<path class="k-fill" d="${p.fill}"/>`
  p.shades.forEach((d, i) => {
    if (d) s += `<path class="k-shade" data-s="${i}" d="${d}"/>`
  })
  s += `<path class="k-top" d="${p.top}"/>`
  if (crease !== 'none' && p.crease) s += `<path class="k-line" data-tone="${crease}" d="${p.crease}"/>`
  s += `<path class="k-line k-edge" data-tone="${tone}" d="${p.outline}"/>`
  return `<g class="k-solid"${lit ? ' data-lit=""' : ''}${part ? ` data-part="${part}"` : ''}>${s}</g>`
}
export const line = (d, { tone = 'lo', flow = false, part, width } = {}) =>
  d ? `<path class="k-line" data-tone="${tone}"${flow ? ' data-flow=""' : ''}${part ? ` data-part="${part}"` : ''}${width ? ` style="stroke-width:${width}"` : ''} d="${d}"/>` : ''
export const dots = (pts, { r = 0.6, tone = 'mid' } = {}) =>
  `<g class="k-dots" data-tone="${tone}">${pts.map(p => `<circle cx="${n1(p[0])}" cy="${n1(p[1])}" r="${r}"/>`).join('')}</g>`
export const halo = d => `<path class="k-halo" d="${d}"/>`
export const group = (body, attrs = '') => `<g ${attrs}>${body}</g>`
export const svg = (w, h, label, body) =>
  `<svg class="k-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label.replace(/"/g, '&quot;')}">${body}</svg>`

// Reemplaza las rutas de un sólido ya montado (piezas que cambian de forma)
export function setSolid(g, p) {
  if (!g) return
  const fill = g.querySelector('.k-fill')
  const top = g.querySelector('.k-top')
  const edge = g.querySelector('.k-edge')
  fill && fill.setAttribute('d', p.fill)
  top && top.setAttribute('d', p.top)
  edge && edge.setAttribute('d', p.outline)
  const sh = g.querySelectorAll('.k-shade')
  // reconstruye las sombras si cambia el número de tonos visibles
  sh.forEach(n => n.remove())
  const ref = top
  p.shades.forEach((d, i) => {
    if (!d) return
    const n = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    n.setAttribute('class', 'k-shade')
    n.setAttribute('data-s', i)
    n.setAttribute('d', d)
    g.insertBefore(n, ref)
  })
  const cr = g.querySelector('.k-line:not(.k-edge)')
  cr && cr.setAttribute('d', p.crease)
}
