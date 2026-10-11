import * as k from '../kit'
import { bench, knob, lamp } from './bench'
import { runner, follow, springTo, clamp, pointerShare } from '../live'

// Etapa 4 · Entrega y despliegue: un repartidor de tráfico. Un cursor sobre
// una guía graduada decide cuántas de diez fichas (10 % del tráfico cada
// una) van a la columna canary (v2) y cuántas a la estable (v1). Las fichas
// caen en su columna con un pequeño rebote.

const W = 600
const H = 380
const PLATE = { x: -130, y: -80, w: 260, d: 160, r: 9 }
const COLS = [
  { x: -46, y: -14, name: 'v1' },
  { x: 46, y: -14, name: 'v2' },
]
const N = 10
const DISC_R = 15
const DISC_H = 5.2
const BASE_Z = 9
const ROD_TOP = BASE_Z + N * DISC_H + 14
const TRACK = { x: -96, y: 38, w: 192, d: 14, r: 3 }
const TRACK_Z = 5
const SLIDE = [-84, 84]
const TOUR = [0, 1, 2, 5, 10, 10, 0]

export default function build() {
  const P = k.fit([...k.boxCorners(PLATE, -14, 0), [-46, -14, ROD_TOP + 6], [46, -14, ROD_TOP + 6]], W, H, { pad: 16, azimuth: 40 })
  const S = k.solid
  const L = k.line
  const D = (pts, o) => k.dots(pts.map(p => k.at(p, P)), o)

  let s = bench(P, PLATE, { label: 'CD·13', ruler: false })
  const discs = []
  // Columnas: base, varilla, fichas (de abajo a arriba), tapa
  const column = (c, ci) => {
    let g = ''
    const base = { x: c.x - 22, y: c.y - 22, w: 44, d: 44, r: 4 }
    g += S(k.slab(base, 0, 5, P, 4), { tone: 'mid' })
    g += D(k.cornersOf(base, 4).map(([x, y]) => [x, y, 5]), { r: 0.45 })
    g += S(k.cyl(c.x, c.y, DISC_R + 3, 5, BASE_Z - 5, P, 40), { tone: 'mid' })
    g += L(k.ringTop(c.x, c.y, DISC_R, BASE_Z, P, 40), { tone: 'faint' })
    g += k.topText([c.x, c.y + 19], 5, P, c.name, { size: 4, tone: 'hi' })
    g += S(k.cyl(c.x, c.y, 1.8, BASE_Z, ROD_TOP - BASE_Z, P, 14), { tone: 'mid', crease: 'none' })
    for (let i = 0; i < N; i++) {
      const z = BASE_Z + i * DISC_H
      let d = S(k.cyl(c.x, c.y, DISC_R, z, DISC_H - 0.6, P, 40), { tone: 'hi', crease: 'lo', lit: ci === 1 })
      d += L(k.ringTop(c.x, c.y, DISC_R - 3.5, z + DISC_H - 0.6, P, 32), { tone: 'faint' })
      d += S(k.cyl(c.x, c.y, 1.8, z + DISC_H - 0.6, 0.6, P, 12), { tone: 'mid', crease: 'none' })
      g += `<g data-part="disc-${ci}-${i}" style="display:none">${d}</g>`
      discs.push({ ci, i })
    }
    g += S(k.cyl(c.x, c.y, 3, ROD_TOP, 2.4, P, 16), { tone: 'mid' })
    return g
  }
  // la columna izquierda queda detrás de la derecha (x menor)
  s += column(COLS[0], 0) + column(COLS[1], 1)

  // Guía graduada con el cursor
  s += S(k.slab(TRACK, 0, TRACK_Z, P, 4), { tone: 'mid' })
  s += L(k.planLine({ x: SLIDE[0] - 2, y: TRACK.y + 5.2, w: SLIDE[1] - SLIDE[0] + 4, d: 3.6, r: 1.8 }, TRACK_Z, P, 4), { tone: 'lo' })
  let minor = '', major = ''
  for (let i = 0; i <= 20; i++) {
    const x = SLIDE[0] + ((SLIDE[1] - SLIDE[0]) * i) / 20
    const d = k.lineTop([x, TRACK.y + 10], [x, TRACK.y + (i % 2 ? 11.6 : 12.8)], TRACK_Z, P)
    if (i % 2) minor += d
    else major += d
  }
  s += L(minor, { tone: 'lo' }) + L(major, { tone: 'mid' })
  s += k.topText([SLIDE[0], TRACK.y + 3.4], TRACK_Z, P, '0%', { size: 2.8, tone: 'lo' })
  s += k.topText([SLIDE[1], TRACK.y + 3.4], TRACK_Z, P, '100%', { size: 2.8, tone: 'lo' })
  s += D([[TRACK.x + 4, TRACK.y + 7, TRACK_Z], [TRACK.x + TRACK.w - 4, TRACK.y + 7, TRACK_Z]], { r: 0.5 })
  let slider = ''
  slider += S(k.slab({ x: -7, y: TRACK.y + 1.5, w: 14, d: 11, r: 2 }, TRACK_Z, 4, P, 3), { tone: 'hi', crease: 'lo', lit: true })
  slider += L(k.lineTop([0, TRACK.y + 3], [0, TRACK.y + 11], TRACK_Z + 4, P), { tone: 'lit' })
  slider += knob(P, 0, TRACK.y + 7, TRACK_Z + 4, 3.4, 5)
  s += `<g data-part="slider">${slider}</g>`
  s += lamp(P, TRACK.x + 10, TRACK.y + 7, TRACK_Z, 'canary-lamp')

  const svg = k.svg(
    W,
    H,
    'Un repartidor de tráfico sobre una placa: dos columnas de fichas, v1 estable y v2 canary, y una guía graduada de 0 a 100 %. El cursor decide cuántas de las diez fichas, 10 % del tráfico cada una, van a la versión canary.',
    s
  )

  function mount(stage, say) {
    const q = n => stage.querySelector(`[data-part="${n}"]`)
    const sliderEl = q('slider')
    const lampEl = q('canary-lamp')
    const els = discs.map(d => q(`disc-${d.ci}-${d.i}`))
    const tips = discs.map(() => ({ at: 0, rate: 0 }))
    const shown = discs.map(() => false)
    const st = { share: 0, target: 0, x: SLIDE[0] }

    const countOf = () => Math.round(st.share * N)
    const draw = () => {
      sliderEl.setAttribute('transform', k.move(P, [st.x, 0, 0]))
      const n = countOf()
      discs.forEach((d, j) => {
        const want = d.ci === 1 ? d.i < n : d.i < N - n
        if (want !== shown[j]) {
          shown[j] = want
          els[j].style.display = want ? '' : 'none'
          if (want) tips[j].at = 22 // entra desde arriba
        }
        els[j].setAttribute('transform', k.move(P, [0, 0, tips[j].at]))
      })
      n > 0 ? lampEl.setAttribute('data-on', '') : lampEl.removeAttribute('data-on')
      say(n === 0 ? 'estable 100% · sin canary' : n === N ? 'v2 al 100% · promovida' : `canary ${n * 10}% · estable ${100 - n * 10}%`)
    }
    const ctx = runner(stage, (dt, calm, c) => {
      if (c.touring) st.target = TOUR[Math.floor(c.clock / 2.2) % TOUR.length] / N
      st.share = follow(st.share, st.target, dt, 0.3, calm)
      st.x = SLIDE[0] + st.share * (SLIDE[1] - SLIDE[0])
      let settled = st.share === st.target
      draw()
      tips.forEach((t, j) => {
        if (!shown[j]) return
        if (!springTo(t, 0, dt, 260, 15, calm)) settled = false
      })
      return !settled
    })
    const set = v => {
      st.target = clamp(v, 0, 1)
      stage.setAttribute('aria-valuenow', String(Math.round(st.target * N)))
      stage.setAttribute('aria-valuetext', `${Math.round(st.target * 100)} % del tráfico a la versión canary`)
      ctx.interact()
    }
    const onMove = e => set(Math.round(pointerShare(e, stage, 0.2) * N) / N)
    const onKey = e => {
      const n = Math.round(st.target * N)
      let to = null
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') to = n + 1
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') to = n - 1
      if (e.key === 'Home') to = 0
      if (e.key === 'End') to = N
      if (to === null) return
      e.preventDefault()
      set(to / N)
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
    steps: N + 1,
    fig: 'Fig 4',
    title: 'Canary release',
    hint: 'Mové el cursor',
    readout: 'estable 100% · sin canary',
    aria: 'Canary release: las flechas pasan tráfico de v1 a v2 de 10 en 10 %',
    keys: [
      { mark: 'lit', label: 'Fichas v2: tráfico a la canary' },
      { mark: 'raised', label: 'Fichas v1: tráfico estable' },
    ],
    caption:
      'Un despliegue canary manda primero una parte pequeña del tráfico a la versión nueva. Si las métricas aguantan, se sube de a poco hasta el 100 %; si no, se vuelve a v1.',
  }
}
