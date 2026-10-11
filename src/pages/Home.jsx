import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { levels, stages } from '../registry'
import { metaRegistry } from '../content/metaRegistry'
import ThemeToggle from '../components/ThemeToggle'
import CountUp from '../components/CountUp'
import { stageColor } from '../stageColors'
import useRevealOnScroll from '../hooks/useRevealOnScroll'
import useCourseProgress from '../hooks/useCourseProgress'
import './landing.css'

// Figuras isométricas por etapa: chunk aparte para no cargar la landing
const StageFigure = lazy(() => import('../iso/StageFigure'))

const pad = n => String(n).padStart(2, '0')

export default function Home() {
  const landingRef = useRef(null)
  const location = useLocation()
  const [showTop, setShowTop] = useState(false)
  const [activeStage, setActiveStage] = useState('all')
  // Evita animar los nodos en la carga inicial: solo al filtrar
  const [filterTouched, setFilterTouched] = useState(false)
  const progressRef = useRef(null)
  // Progreso global del curso (suma de módulos leídos en od-progress)
  const course = useCourseProgress()

  const norm = s =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()

  // Al volver a la landing (p. ej. al terminar el último nivel), arrancar
  // desde arriba. Si el enlace trae ancla, ir a ella.
  useLayoutEffect(() => {
    const target = location.hash ? document.getElementById(location.hash.slice(1)) : null
    if (target) target.scrollIntoView({ block: 'start' })
    else window.scrollTo(0, 0)
  }, [location.hash])

  // Volver arriba — visible tras ~600px de scroll
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Barra de progreso de scroll — actualiza el DOM directo, sin re-render
  useEffect(() => {
    const onScroll = () => {
      const el = progressRef.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      el.style.transform = `scaleX(${p})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Cascada de entrada cuando cada [data-reveal] entra en viewport
  useRevealOnScroll(landingRef)

  const totalLevels = levels.length
  const totalModules = Object.values(metaRegistry).reduce((s, r) => s + (r.modules?.length || 0), 0)
  const totalLabs = Object.values(metaRegistry).filter(r =>
    (r.modules || []).some(m => norm(m.title).includes('laboratorio'))
  ).length
  const courseDone = course.total > 0 && course.done >= course.total

  // Primer nivel disponible con contenido (para «empezar desde el principio»)
  const firstAvailable = levels.find(l => l.status === 'available' && metaRegistry[l.id]) || levels[0]
  // Primer nivel con progreso incompleto (para «continuar donde lo dejaste»)
  const firstIncomplete =
    levels.find(l => {
      const p = course.byLevel[l.id]
      return p && p.total > 0 && p.done < p.total
    }) || null

  const firstPendingModule = lvl => {
    const reg = metaRegistry[lvl.id]
    const done = new Set(course.byLevel[lvl.id]?.doneIds || [])
    return reg?.modules?.find(m => !done.has(m.id))?.id ?? 1
  }

  const startTo =
    firstAvailable && metaRegistry[firstAvailable.id]
      ? `/nivel/${firstAvailable.id}/modulo/${firstPendingModule(firstAvailable)}`
      : '/nivel/0'
  const continueTo = firstIncomplete ? `/nivel/${firstIncomplete.id}/modulo/${firstPendingModule(firstIncomplete)}` : '/'

  // Nivel actual para el texto de progreso: el incompleto, el último con avance, o el 1
  const withProgress = levels.filter(l => (course.byLevel[l.id]?.done || 0) > 0)
  const currentLevel =
    firstIncomplete?.id ?? (withProgress.length ? withProgress[withProgress.length - 1].id : 1)

  // Estado de progreso de un nivel en el mapa: null si no aplica
  const levelState = level => {
    const p = course.byLevel[level.id]
    if (!p || p.total === 0) return null
    if (p.done >= p.total) return 'done'
    if (p.done > 0) return 'partial'
    return null
  }

  const nodeTo = level =>
    metaRegistry[level.id] ? `/nivel/${level.id}/modulo/${firstPendingModule(level)}` : `/nivel/${level.id}`

  const stageOf = id => stages.find(s => s.id === id)

  // Niveles visibles según el filtro de etapa activo
  const visibleLevels = activeStage === 'all' ? levels : levels.filter(l => l.stage === activeStage)
  const stageCounts = Object.fromEntries(stages.map(s => [s.id, levels.filter(l => l.stage === s.id).length]))

  const selectStage = id => {
    setActiveStage(id)
    setFilterTouched(true)
  }

  return (
    <div className="landing" ref={landingRef}>
      {/* Barra de progreso de lectura */}
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">&gt;_</span>
            Curso de CI/CD
          </a>
          <ThemeToggle />
        </div>
      </header>

      <main id="top">
        <div className="welcome-screen" data-reveal>
          <h2>
            Bienvenido al Curso Completo de <span>CI/CD</span>
          </h2>
          <p className="welcome-intro">
            Este curso está diseñado para llevarte desde los fundamentos de Git y los pipelines hasta
            automatizar el build, los tests y el despliegue de software: integración continua, calidad y
            seguridad, Kubernetes, Terraform y GitOps, siguiendo una ruta de aprendizaje progresiva y
            orientada a la práctica.
          </p>
          <p>
            {totalLevels} niveles en {stages.length} etapas, {totalModules} módulos con ejemplos reales y
            ejercicios, más un proyecto profesional integrador y una evaluación final con rúbrica que te
            dejan preparado para el trabajo real en CI/CD.
          </p>
          <div className="welcome-stats-card">
            <div className="wsc-item">
              <span className="wsc-icon">📚</span>
              <CountUp className="wsc-val" value={totalLevels} />
              <span className="wsc-label">Niveles</span>
            </div>
            <div className="wsc-item">
              <span className="wsc-icon">🗺️</span>
              <CountUp className="wsc-val" value={stages.length} />
              <span className="wsc-label">Etapas</span>
            </div>
            <div className="wsc-item">
              <span className="wsc-icon">🧩</span>
              <CountUp className="wsc-val" value={totalModules} />
              <span className="wsc-label">Módulos</span>
            </div>
            <div className="wsc-item">
              <span className="wsc-icon">🧪</span>
              <CountUp className="wsc-val" value={totalLabs} />
              <span className="wsc-label">Laboratorios</span>
            </div>
            <div className="wsc-item">
              <span className="wsc-icon">📈</span>
              <span className="wsc-val">De cero a pro</span>
              <span className="wsc-label">Nivel</span>
            </div>
          </div>
          <p>Seleccioná un nivel en el mapa para comenzar, o empezá desde el principio.</p>
          <Link className="start-btn" to={startTo}>
            Comenzar desde el principio <span aria-hidden="true">→</span>
          </Link>

          {!courseDone && course.done > 0 && firstIncomplete && (
            <Link className="beginner-card continue-card" to={continueTo}>
              <span className="beginner-mark" aria-hidden="true">→</span>
              <span className="beginner-body">
                <strong>Continuar donde lo dejaste</strong>
                <span className="beginner-sub" aria-hidden="true">Nivel {firstIncomplete.id} — {firstIncomplete.title}</span>
                <span className="beginner-cta">Seguir en el nivel {firstIncomplete.id} <span className="btn-arrow" aria-hidden="true">→</span></span>
              </span>
            </Link>
          )}

          <div className="learning-path">
            <div className="lp-progress">
              <div className="lp-progress-label">Tu progreso</div>
              <div
                className="lp-progress-bar-track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={course.total}
                aria-valuenow={course.done}
                aria-valuetext={`${course.pct}% completado`}
                aria-label="Progreso general del curso"
              >
                <div className={`lp-progress-bar-fill${courseDone ? ' full' : ''}`} style={{ width: `${course.pct}%` }} />
              </div>
              <div className="lp-progress-text">
                Nivel {currentLevel} de {totalLevels} · {course.done} de {course.total} módulos
              </div>
            </div>
            <div className="learning-path-title">Mapa del curso</div>
            <div className="lp-map">
              <aside className="lp-panel">
                <div className="lp-panel-label">Filtrar por etapa</div>
                <div className="lp-filters" role="group" aria-label="Filtrar el mapa por etapa">
                  <button
                    type="button"
                    className={`lp-filter${activeStage === 'all' ? ' active' : ''}`}
                    aria-pressed={activeStage === 'all'}
                    onClick={() => selectStage('all')}
                  >
                    Todas
                    <span className="lp-filter-count">{totalLevels}</span>
                  </button>
                  {stages.map(s => (
                    <button
                      type="button"
                      key={s.id}
                      className={`lp-filter${activeStage === s.id ? ' active' : ''}`}
                      aria-pressed={activeStage === s.id}
                      onClick={() => selectStage(s.id)}
                    >
                      <span className="lp-filter-dot" style={{ background: stageColor[s.color] }} aria-hidden="true" />
                      {s.title}
                      <span className="lp-filter-count">{stageCounts[s.id]}</span>
                    </button>
                  ))}
                </div>
              </aside>
              <div className="lp-grid-col">
                <div className="lp-filter-summary" role="status">
                  {activeStage === 'all'
                    ? `${totalLevels} niveles`
                    : `${visibleLevels.length} niveles · ${stageOf(activeStage)?.title}`}
                </div>
                <div className={`learning-path-grid${filterTouched ? ' filter-anim' : ''}`} key={activeStage}>
              {visibleLevels.map((level, idx) => {
                const st = stageOf(level.stage)
                const color = stageColor[st?.color] || '#2EC4A0'
                const state = levelState(level)
                return (
                  <Link
                    className={`lp-node${state ? ` lp-node--${state}` : ''}`}
                    to={nodeTo(level)}
                    key={level.id}
                    style={{ '--i': idx }}
                  >
                    <div className="lp-node-num">Nivel {pad(level.id)}</div>
                    <div className="lp-node-title">{level.title}</div>
                    <span className="lp-node-badge">
                      <span className="lp-node-badge-dot" style={{ background: color }} aria-hidden="true" />
                      Etapa {level.stage}
                    </span>
                  </Link>
                )
              })}
                </div>
              </div>
            </div>
          </div>

          <section className="stages-section" id="etapas" aria-labelledby="etapas-title">
            <div className="learning-path-title" id="etapas-title">Etapas del curso</div>
            <div className="stages-grid">
              {stages.map(s => {
                const stLevels = levels.filter(l => l.stage === s.id)
                const mods = stLevels.reduce((n, l) => n + (metaRegistry[l.id]?.modules?.length || l.moduleCount || 0), 0)
                return (
                  <article className="stage-card" key={s.id} style={{ '--c': stageColor[s.color] }}>
                    <header className="stage-card-head">
                      <span className="stage-card-num">Etapa {s.id}</span>
                      <h3 className="stage-card-title">{s.title}</h3>
                      <span className="stage-card-meta">{stLevels.length} niveles · {mods} módulos</span>
                    </header>
                    <Suspense fallback={<div className="stage-fig-ph" aria-hidden="true" />}>
                      <StageFigure stageId={s.id} color={stageColor[s.color]} fig={`Fig ${s.id}`} />
                    </Suspense>
                    <nav className="stage-card-levels" aria-label={`Niveles de la etapa ${s.id}`}>
                      {stLevels.map(l => (
                        <Link key={l.id} className="stage-level" to={nodeTo(l)}>
                          <span className="stage-level-n">{pad(l.id)}</span>
                          {l.title}
                        </Link>
                      ))}
                    </nav>
                  </article>
                )
              })}
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>Curso de CI/CD · De cero a pipelines profesionales</span>
          <span>{totalLevels} niveles · {stages.length} etapas · proyecto final integrador</span>
        </div>
      </footer>

      {/* Volver arriba */}
      <button
        className={`back-to-top${showTop ? ' visible' : ''}`}
        type="button"
        aria-label="Volver arriba"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  )
}
