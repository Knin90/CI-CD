import * as k from '../kit'
import { bench, lamp } from './bench'
import { runner, follow, springTo, clamp, pointerShare } from '../live'

// Etapa 3 · Calidad y seguridad: una cerradura de pines. Cada pin es un
// check (lint, test, cobertura, SAST, secretos); sobresale mientras falla y
// queda al ras cuando pasa. Solo con los cinco al ras el cerrojo se retira
// del cerradero de producción.

const W = 600
const H = 360
const PLATE = { x: -140, y: -66, w: 280, d: 132, r: 8 }
const BODY = { x: -96, y: -24, w: 126, d: 48, r: 3 }
const TOP = 44
const PIN_X = [-78, -57, -36, -15, 6]
const PIN_R = 4.2
const FAIL = [12, 7, 15, 9, 13]
const CHECKS = ['lint', 'test', 'cov', 'sast', 'sec']
const NAMES = ['lint', 'tests', 'cobertura', 'SAST', 'secretos']
const BRIDGE_Z = 82
const BOLT = { x: BODY.x + BODY.w, y: -8, z: 14, h: 16 }
const DOOR = { x: 72, y: -17, w: 22, d: 34, r: 2 }
const LOCKED = DOOR.x + 8 - BOLT.x
const OPEN = 7

export default function build() {
  const P = k.fit([...k.boxCorners(PLATE, -14, 0), [DOOR.x + DOOR.w, DOOR.y + DOOR.d, TOP], [-90, 0, BRIDGE_Z + 10]], W, H, { pad: 16, azimuth: 38 })
  const S = k.solid
  const L = k.line
  const D = (pts, o) => k.dots(pts.map(p => k.at(p, P)), o)

  let s = bench(P, PLATE, { label: 'QA·10' })
  // Cuerpo de la cerradura
  s += S(k.slab({ ...BODY, x: BODY.x - 3, y: BODY.y - 3, w: BODY.w + 6, d: BODY.d + 6 }, 0, 4, P, 3), { tone: 'mid' })
  s += S(k.slab(BODY, 4, TOP - 4, P, 4), { tone: 'mid' })
  s += L(k.planLine(k.inset(BODY, 3.5), TOP, P, 3), { tone: 'faint' })
  s += D(k.cornersOf(BODY, 6).map(([x, y]) => [x, y, TOP]), { r: 0.5 })
  PIN_X.forEach((x, i) => {
    s += L(k.ringTop(x, 0, PIN_R + 2, TOP, P, 28), { tone: 'lo' })
    s += k.topText([x, 14.5], TOP, P, CHECKS[i], { size: 3, tone: 'mid' })
    s += L(k.lineTop([x - 4, 17.5], [x + 4, 17.5], TOP, P), { tone: 'faint' })
  })
  s += lamp(P, 20, 12, TOP, 'gate-lamp')
  // Poste trasero del puente
  const post = x => S(k.cyl(x, 0, 3.4, TOP, BRIDGE_Z - TOP, P, 22), { tone: 'mid', crease: 'none' }) + S(k.cyl(x, 0, 4.6, TOP, 3, P, 22), { tone: 'mid' })
  s += post(-92)
  // Pines y muelles (se reconstruyen por fotograma)
  PIN_X.forEach((x, i) => {
    s += S(k.cyl(x, 0, PIN_R, TOP, FAIL[i], P, 26), { tone: 'hi', crease: 'lo', part: `pin-${i}` })
    s += `<path class="k-line" data-tone="lo" data-part="sb-${i}"/><path class="k-line" data-tone="mid" data-part="sf-${i}"/>`
  })
  s += post(24)
  // Puente superior
  const bridge = { x: -100, y: -7, w: 130, d: 14, r: 2 }
  s += S(k.slab(bridge, BRIDGE_Z, 8, P, 3), { tone: 'mid' })
  s += L(k.lineTop([bridge.x + 4, 0], [bridge.x + bridge.w - 4, 0], BRIDGE_Z + 8, P), { tone: 'faint' })
  s += D([...PIN_X, -92, 24].map(x => [x, -3.5, BRIDGE_Z + 8]), { r: 0.42 })
  // Cerrojo (cambia de largo) y puerta
  s += `<g data-part="bolt">${S(k.slab({ x: BOLT.x, y: BOLT.y, w: LOCKED, d: 16, r: 1.5 }, BOLT.z, BOLT.h, P, 2), { tone: 'hi', crease: 'lo' })}</g>`
  s += `<path class="k-line" data-tone="faint" data-part="bolt-slot"/>`
  s += S(k.slab({ x: DOOR.x - 5, y: DOOR.y - 6, w: DOOR.w + 10, d: DOOR.d + 12, r: 2 }, 0, 5, P, 3), { tone: 'mid' })
  s += D(k.cornersOf({ x: DOOR.x - 5, y: DOOR.y - 6, w: DOOR.w + 10, d: DOOR.d + 12 }, 2.6).map(([x, y]) => [x, y, 5]), { r: 0.42 })
  s += S(k.slab(DOOR, 5, TOP - 5, P, 3), { tone: 'mid' })
  s += L(k.planLine(k.inset(DOOR, 3), TOP, P, 2), { tone: 'faint' })
  s += k.topText([DOOR.x + DOOR.w / 2, 1.2], TOP, P, 'prod', { size: 4, tone: 'hi' })
  s += L(k.lineTop([DOOR.x + 6, 6], [DOOR.x + DOOR.w - 6, 6], TOP, P), { tone: 'faint' })
  s += D(k.cornersOf(DOOR, 3).map(([x, y]) => [x, y, TOP]), { r: 0.42 })
  const svg = k.svg(
    W,
    H,
    'Una cerradura de pines sobre una placa, junto al cerradero de producción. Cinco pines, uno por check (lint, tests, cobertura, SAST y secretos), sobresalen mientras su check falla y quedan al ras cuando pasa. Con los cinco al ras, el cerrojo sale del cerradero.',
    s
  )

  function mount(stage, say) {
    const q = n => stage.querySelector(`[data-part="${n}"]`)
    const pins = PIN_X.map((_, i) => q(`pin-${i}`))
    const sb = PIN_X.map((_, i) => q(`sb-${i}`))
    const sf = PIN_X.map((_, i) => q(`sf-${i}`))
    const boltEl = q('bolt').firstElementChild
    const slot = q('bolt-slot')
    const gate = q('gate-lamp')
    const st = { n: 0, tips: FAIL.map(h => ({ at: h, rate: 0 })), bolt: LOCKED, hold: 0 }

    const draw = () => {
      PIN_X.forEach((x, i) => {
        const o = Math.max(0, st.tips[i].at)
        const p = k.cyl(x, 0, PIN_R, TOP, Math.max(0.4, o), P, 26)
        k.setSolid(pins[i], p)
        o < 0.6 ? pins[i].setAttribute('data-on', '') : pins[i].removeAttribute('data-on')
        const sp = k.spring(x, 0, 3, TOP + o + 0.6, BRIDGE_Z, 5, P)
        sb[i].setAttribute('d', sp.back)
        sf[i].setAttribute('d', sp.front)
      })
      const b = k.slab({ x: BOLT.x, y: BOLT.y, w: st.bolt, d: 16, r: 1.5 }, BOLT.z, BOLT.h, P, 2)
      k.setSolid(boltEl, b)
      slot.setAttribute('d', k.lineTop([BOLT.x + 2, 0], [BOLT.x + Math.max(2.5, st.bolt - 3), 0], BOLT.z + BOLT.h, P))
      const open = st.bolt < OPEN + 2
      open ? gate.setAttribute('data-on', '') : gate.removeAttribute('data-on')
      const passed = st.tips.filter(t => t.at < 0.6).length
      say(`checks ${passed}/5 · ${open ? 'liberado' : passed === 5 ? 'abriendo' : 'bloqueado'}`)
    }

    const ctx = runner(stage, (dt, calm, c) => {
      if (c.touring) {
        const step = Math.floor(c.clock / 1.1) % 9 // 0…5 checks, luego pausa
        st.n = Math.min(5, step)
      }
      let pinsSettled = true
      st.tips.forEach((t, i) => {
        if (!springTo(t, i < st.n ? 0 : FAIL[i], dt, 300, 18, calm)) pinsSettled = false
      })
      const allFlush = st.tips.every(t => t.at < 0.6)
      const boltTarget = allFlush && pinsSettled ? OPEN : LOCKED
      st.bolt = follow(st.bolt, boltTarget, dt, 0.32, calm)
      draw()
      return !(pinsSettled && st.bolt === boltTarget)
    })

    const set = n => {
      st.n = clamp(n, 0, 5)
      stage.setAttribute('aria-valuenow', String(st.n))
      stage.setAttribute('aria-valuetext', `${st.n} de 5 checks aprobados`)
      ctx.interact()
    }
    const onMove = e => {
      const n = Math.round(pointerShare(e, stage, 0.2) * 5)
      if (n !== st.n) set(n)
      else ctx.interact()
    }
    const onKey = e => {
      let n = null
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') n = st.n + 1
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') n = st.n - 1
      if (e.key === 'Home') n = 0
      if (e.key === 'End') n = 5
      if (n === null) return
      e.preventDefault()
      set(n)
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
    steps: 6,
    fig: 'Fig 3',
    title: 'Quality gate',
    hint: 'Mové el cursor',
    readout: 'checks 0/5 · bloqueado',
    aria: `Quality gate: las flechas aprueban o revierten los checks (${NAMES.join(', ')})`,
    keys: [
      { mark: 'lit', label: 'Pin al ras: check aprobado' },
      { mark: 'raised', label: 'Cerrojo: bloquea producción' },
    ],
    caption:
      'Un quality gate solo abre cuando pasan todos los checks. Basta un pin fuera de la línea —un test roto, un secreto expuesto— para que el cerrojo siga trabado.',
  }
}
