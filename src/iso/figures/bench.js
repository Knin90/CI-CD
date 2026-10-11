import * as k from '../kit'

// Placa base compartida: halo, patas de dos niveles, placa biselada con
// ranura perimetral, tornillos de esquina, regla con marcas y placa de
// identificación con su texto grabado.
export function bench(P, plan, { h = 10, foot = 4, label = '', ruler = true } = {}) {
  const S = k.solid
  const L = k.line
  let s = k.halo(k.slab(plan, -h - foot, h, P, 8).fill)
  const feet = k.cornersOf(plan, 18).sort((a, b) => k.depthOf([...a, 0], P) - k.depthOf([...b, 0], P))
  for (const [x, y] of feet) {
    s += S(k.cyl(x, y, 6.5, -h - foot, 1.4, P, 24), { tone: 'lo' })
    s += S(k.cyl(x, y, 5, -h - foot + 1.4, foot - 1.4, P, 24), { tone: 'mid' })
  }
  s += S(k.slab(plan, -h, h, P, 8), { tone: 'mid' })
  s += L(k.planLine(k.inset(plan, 5), 0, P, 8), { tone: 'lo' })
  const screws = k.cornersOf(plan, 10)
  s += L(screws.map(([x, y]) => k.ringTop(x, y, 2.1, 0, P, 14)).join(''), { tone: 'lo' })
  s += k.dots(screws.map(([x, y]) => k.at([x, y, 0], P)), { r: 0.55 })

  if (ruler) {
    const strip = { x: plan.x + 24, y: plan.y + plan.d - 14, w: plan.w - 48, d: 6.5, r: 1 }
    s += S(k.slab(strip, 0, 0.6, P, 2), { tone: 'lo', crease: 'none' })
    const t = k.ticks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.6], P)
    s += L(t.minor, { tone: 'lo' }) + L(t.major, { tone: 'mid' })
    s += k.dots([k.at([strip.x + 2, strip.y + 3.2, 0.6], P), k.at([strip.x + strip.w - 2, strip.y + 3.2, 0.6], P)], { r: 0.45 })
  }
  if (label) {
    const lp = { x: plan.x + 14, y: plan.y + 12, w: 34, d: 12, r: 1.2 }
    s += S(k.slab(lp, 0, 0.8, P, 2), { tone: 'lo', crease: 'none' })
    s += k.topText([lp.x + lp.w / 2, lp.y + 5.2], 0.8, P, label, { size: 3.4, tone: 'mid' })
    s += L(k.lineTop([lp.x + 5, lp.y + 8.6], [lp.x + lp.w - 9, lp.y + 8.6], 0.8, P), { tone: 'faint' })
    s += k.dots(k.cornersOf(lp, 1.8).map(([x, y]) => k.at([x, y, 0.8], P)), { r: 0.4, tone: 'lo' })
  }
  return s
}

// Pomo moleteado sobre una cara
export function knob(P, x, y, z, r = 4, h = 4) {
  return (
    k.solid(k.cyl(x, y, r, z, h, P, 28), { tone: 'mid' }) +
    k.line(k.knurl(x, y, r, z, z + h, 24, P), { tone: 'lo' }) +
    k.dots([k.at([x, y, z + h], P)], { r: 0.5, tone: 'hi' })
  )
}

// Lámpara indicadora: base + lente; la lente cambia a data-on desde live
export function lamp(P, x, y, z, part) {
  return (
    k.solid(k.cyl(x, y, 4.2, z, 1.6, P, 24), { tone: 'mid' }) +
    k.solid(k.cyl(x, y, 3, z + 1.6, 3, P, 24), { tone: 'hi', part }) +
    k.line(k.ringTop(x, y, 1.4, z + 4.6, P, 14), { tone: 'faint' })
  )
}

export const byDepth = (items, P, key = i => i.at) =>
  [...items].sort((a, b) => k.depthOf(key(a), P) - k.depthOf(key(b), P))
