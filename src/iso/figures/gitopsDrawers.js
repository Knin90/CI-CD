import * as k from '../kit'
import { bench, lamp } from './bench'
import { runner, follow } from '../live'

// Etapa 5 · Infraestructura y GitOps: una cajonera con un cajón por entorno.
// Encima está el manifiesto (el estado declarado en Git). Un cajón que se
// abre es drift: el estado real se aparta del declarado. El controlador lo
// detecta y lo vuelve a cerrar (reconcilia) hasta que coincide.

const W = 600
const H = 400
const PLATE = { x: -110, y: -90, w: 220, d: 180, r: 9 }
const BODY = { x: -52, y: -40, w: 104, d: 70, r: 3 }
const FRONT = BODY.y + BODY.d
const TOP = 100
const ROWS = [
  { z0: 8, z1: 36, name: 'dev' },
  { z0: 39, z1: 67, name: 'stg' },
  { z0: 70, z1: 98, name: 'prod' },
]
const DRIFT = 36
const SYNC_Y = [-26, -6, 14]

export default function build() {
  const P = k.fit([...k.boxCorners(PLATE, -14, 0), [-52, -40, TOP + 8], [52, FRONT + DRIFT + 4, 40]], W, H, { pad: 16, azimuth: 40 })
  const S = k.solid
  const L = k.line
  const D = (pts, o) => k.dots(pts.map(p => k.at(p, P)), o)

  let s = bench(P, PLATE, { label: 'OPS·17', ruler: false })
  // Zócalo y cuerpo
  s += S(k.slab(k.inset(BODY, 3), 0, 5, P, 3), { tone: 'lo' })
  s += S(k.slab(BODY, 5, TOP - 5, P, 4), { tone: 'mid' })
  s += S(k.slab(k.inset(BODY, -2), TOP, 3, P, 4), { tone: 'mid' })
  s += L(k.planLine(k.inset(BODY, 2), TOP + 3, P, 4), { tone: 'faint' })
  // huecos de los cajones en el frente
  const face = (x0, x1, z0, z1, y = FRONT) => k.pathOf([[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]].map(p => k.at(p, P)), true)
  s += L(ROWS.map(r => face(BODY.x + 4, BODY.x + BODY.w - 4, r.z0 - 0.6, r.z1 + 0.6)).join(''), { tone: 'lo' })
  // laterales: costuras y tornillos
  s += L(ROWS.slice(1).map(r => k.seg([BODY.x + BODY.w, BODY.y + 4, r.z0 - 1.5], [BODY.x + BODY.w, FRONT - 4, r.z0 - 1.5], P)).join(''), { tone: 'faint' })
  s += D(ROWS.flatMap(r => [[BODY.x + BODY.w, BODY.y + 8, (r.z0 + r.z1) / 2], [BODY.x + BODY.w, FRONT - 8, (r.z0 + r.z1) / 2]]), { r: 0.45 })

  // Manifiesto (estado declarado) y lámparas de sincronía
  const sheet = { x: -42, y: -32, w: 50, d: 58, r: 1.5 }
  s += S(k.slab(sheet, TOP + 3, 1, P, 2), { tone: 'hi', crease: 'lo' })
  s += k.topText([sheet.x + 8, sheet.y + 7], TOP + 4, P, 'git', { size: 4, tone: 'hi', anchor: 'start' })
  ROWS.forEach((r, i) => {
    const y = sheet.y + 16 + i * 13
    s += k.topText([sheet.x + 6, y], TOP + 4, P, r.name, { size: 3, tone: 'mid', anchor: 'start' })
    s += L(k.lineTop([sheet.x + 22, y - 1], [sheet.x + sheet.w - 6, y - 1], TOP + 4, P) + k.lineTop([sheet.x + 22, y + 2.4], [sheet.x + sheet.w - 14, y + 2.4], TOP + 4, P), { tone: 'lo' })
  })
  s += D([[sheet.x + sheet.w / 2, sheet.y + 2.6, TOP + 4]], { r: 0.8, tone: 'hi' })
  ROWS.forEach((r, i) => {
    s += lamp(P, 30, SYNC_Y[i], TOP + 3, `sync-${i}`)
    s += k.topText([42, SYNC_Y[i] + 1.4], TOP + 3, P, r.name, { size: 2.8, tone: 'lo', anchor: 'start' })
  })

  // Cajones (de abajo a arriba): caja visible, frente y tirador
  ROWS.forEach((r, i) => {
    s += `<g data-part="drawer-${i}">`
    s += S(k.slab({ x: BODY.x + 6, y: FRONT, w: BODY.w - 12, d: 0.3, r: 0 }, r.z0 + 2, r.z1 - r.z0 - 5, P, 1), { tone: 'mid', part: `box-${i}` })
    s += S(k.slab({ x: BODY.x + 3, y: FRONT, w: BODY.w - 6, d: 3, r: 1 }, r.z0, r.z1 - r.z0, P, 2), { tone: 'hi', crease: 'lo', part: `panel-${i}` })
    s += S(k.slab({ x: -14, y: FRONT + 3, w: 28, d: 3.4, r: 1.4 }, (r.z0 + r.z1) / 2 - 2, 4, P, 2), { tone: 'mid', part: `pull-${i}` })
    s += `<path class="k-line" data-tone="faint" data-part="card-${i}"/>`
    s += `</g>`
  })

  const svg = k.svg(
    W,
    H,
    'Una cajonera sobre una placa con un cajón por entorno: dev, stg y prod. Encima hay una hoja, el manifiesto en Git, y una lámpara de sincronía por entorno. Cuando un cajón se abre hay drift, y el controlador lo cierra hasta que coincide con lo declarado.',
    s
  )

  function mount(stage, say) {
    const q = n => stage.querySelector(`[data-part="${n}"]`)
    const parts = ROWS.map((_, i) => ({ box: q(`box-${i}`), panel: q(`panel-${i}`), pull: q(`pull-${i}`), card: q(`card-${i}`), lamp: q(`sync-${i}`) }))
    const svgEl = stage.querySelector('svg')
    const st = ROWS.map(() => ({ dy: 0, target: 0, since: 0 }))
    let hovered = -1

    const drawDrawer = i => {
      const r = ROWS[i]
      const dy = st[i].dy
      const p = parts[i]
      k.setSolid(p.box, k.slab({ x: BODY.x + 6, y: FRONT, w: BODY.w - 12, d: Math.max(0.3, dy), r: 0 }, r.z0 + 2, r.z1 - r.z0 - 5, P, 1))
      k.setSolid(p.panel, k.slab({ x: BODY.x + 3, y: FRONT + dy, w: BODY.w - 6, d: 3, r: 1 }, r.z0, r.z1 - r.z0, P, 2))
      k.setSolid(p.pull, k.slab({ x: -14, y: FRONT + 3 + dy, w: 28, d: 3.4, r: 1.4 }, (r.z0 + r.z1) / 2 - 2, 4, P, 2))
      const y = FRONT + 3 + dy
      p.card.setAttribute('d', face(BODY.x + 12, BODY.x + 34, r.z1 - 9, r.z1 - 4, y))
      const synced = dy < 1.5
      synced ? p.lamp.setAttribute('data-on', '') : p.lamp.removeAttribute('data-on')
    }
    const draw = () => {
      ROWS.forEach((_, i) => drawDrawer(i))
      const drift = st.map((d, i) => ({ i, dy: d.dy })).filter(d => d.dy > 1.5)
      if (!drift.length) say('dev · stg · prod en sync')
      else {
        const d = drift[0]
        const closing = st[d.i].target === 0
        say(`${ROWS[d.i].name} · ${closing ? 'reconciliando' : 'drift'} ${d.dy.toFixed(0)} px`)
      }
    }

    const ctx = runner(stage, (dt, calm, c) => {
      if (c.touring) {
        const t = c.clock % 12
        const i = Math.floor(t / 4)
        const local = t % 4
        st.forEach((d, j) => (d.target = j === i && local > 0.4 && local < 2 ? DRIFT : 0))
      }
      let settled = true
      st.forEach(d => {
        // el drift entra suave; la reconciliación cierra un poco más firme
        d.dy = follow(d.dy, d.target, dt, d.target > d.dy ? 0.5 : 0.36, calm)
        if (d.dy !== d.target) settled = false
      })
      draw()
      return !settled
    })

    const centres = ROWS.map(r => k.at([0, FRONT, (r.z0 + r.z1) / 2], P)[1])
    let leaveTimer = 0
    const open = i => {
      clearTimeout(leaveTimer)
      hovered = i
      st.forEach((d, j) => (d.target = j === i ? DRIFT : 0))
      stage.setAttribute('aria-valuenow', String(i))
      stage.setAttribute('aria-valuetext', `${ROWS[i].name} con drift`)
      ctx.interact()
    }
    const reconcile = () => {
      clearTimeout(leaveTimer)
      leaveTimer = setTimeout(() => {
        hovered = -1
        st.forEach(d => (d.target = 0))
        ctx.run()
      }, 1100)
    }
    const onMove = e => {
      const r = svgEl.getBoundingClientRect()
      const y = ((e.clientY - r.top) / r.height) * H
      let i = 0
      centres.forEach((cy, j) => {
        if (Math.abs(cy - y) < Math.abs(centres[i] - y)) i = j
      })
      if (i !== hovered) open(i)
      else ctx.interact()
      reconcile()
    }
    const onKey = e => {
      let i = null
      if (e.key === 'ArrowUp') i = Math.min(2, Math.max(-1, hovered) + 1)
      if (e.key === 'ArrowDown') i = Math.max(0, (hovered < 0 ? 0 : hovered) - 1)
      if (e.key === 'Escape') {
        st.forEach(d => (d.target = 0))
        ctx.interact()
        return
      }
      if (i === null) return
      e.preventDefault()
      open(i)
      reconcile()
    }
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('keydown', onKey)
    draw()
    return () => {
      ctx.destroy()
      clearTimeout(leaveTimer)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('keydown', onKey)
    }
  }

  return {
    svg,
    mount,
    steps: ROWS.length,
    fig: 'Fig 5',
    title: 'Reconciliación GitOps',
    hint: 'Abrí un cajón',
    readout: 'dev · stg · prod en sync',
    aria: 'Reconciliación GitOps: las flechas abren un cajón (drift) y el controlador lo vuelve a cerrar',
    keys: [
      { mark: 'raised', label: 'Manifiesto: estado declarado en Git' },
      { mark: 'lit', label: 'Lámpara: entorno en sync' },
    ],
    caption:
      'En GitOps, Git manda. Si alguien cambia un entorno a mano, el controlador detecta la diferencia y lo devuelve a lo que dice el repositorio.',
  }
}
