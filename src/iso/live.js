// Bucle de animación por figura: un solo requestAnimationFrame, se detiene
// fuera de viewport o cuando todo está quieto, recorrido automático en
// reposo y respeto de prefers-reduced-motion.

export function runner(stage, tick) {
  const still = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false }
  let frame = 0
  let last = 0
  let visible = false
  const ctx = { touring: false, clock: 0, idle: 0 }

  function loop(now) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60
    last = now
    if (ctx.touring) ctx.clock += dt
    const busy = tick(dt, still.matches, ctx)
    frame = visible && (busy || ctx.touring) ? requestAnimationFrame(loop) : 0
  }
  const run = () => {
    if (!frame && visible) {
      last = 0
      frame = requestAnimationFrame(loop)
    }
  }
  const io =
    typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          entries => {
            visible = entries[entries.length - 1].isIntersecting
            if (visible) run()
            else {
              cancelAnimationFrame(frame)
              frame = 0
            }
          },
          { rootMargin: '120px 0px' }
        )
      : null
  if (io) io.observe(stage)
  else visible = true

  // El recorrido arranca a los ~1.4 s y se reanuda 3.6 s después de la última interacción
  const start = setTimeout(() => {
    ctx.touring = !still.matches
    run()
  }, 1400)
  ctx.interact = () => {
    ctx.touring = false
    clearTimeout(ctx.idle)
    ctx.idle = setTimeout(() => {
      ctx.touring = !still.matches
      ctx.clock = 0
      run()
    }, 3600)
    run()
  }
  ctx.run = run
  ctx.destroy = () => {
    io && io.disconnect()
    cancelAnimationFrame(frame)
    clearTimeout(ctx.idle)
    clearTimeout(start)
  }
  run()
  return ctx
}

// Seguimiento exponencial hacia un objetivo
export function follow(x, target, dt, tau, calm) {
  if (calm || Math.abs(target - x) < 0.01) return target
  return x + (target - x) * (1 - Math.exp(-dt / tau))
}

// Muelle sub-muestreado; devuelve true si ya se asentó
export function springTo(s, target, dt, k = 420, c = 26, calm = false) {
  if (calm) {
    s.at = target
    s.rate = 0
    return true
  }
  for (let i = 0; i < 4; i++) {
    s.rate += ((target - s.at) * k - s.rate * c) * (dt / 4)
    s.at += s.rate * (dt / 4)
  }
  if (Math.abs(target - s.at) < 0.005 && Math.abs(s.rate) < 0.005) {
    s.at = target
    s.rate = 0
    return true
  }
  return false
}

export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

// Fracción horizontal del puntero dentro del SVG (0…1), con márgenes
export function pointerShare(e, el, margin = 0.18) {
  const r = el.getBoundingClientRect()
  return clamp(((e.clientX - r.left) / r.width - margin) / (1 - margin * 2), 0, 1)
}
