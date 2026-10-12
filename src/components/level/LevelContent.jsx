import { useEffect, useRef, useState } from 'react'
import CodeBlock from './CodeBlock'
import FlowDiagram, { looksLikeFlow } from './FlowDiagram'
import Inline from './InlineText'
import useReveal from '../../hooks/useReveal'
import InternalsFlow from '../../iso/InternalsFlow'
import { parseFlow } from '../../iso/flowParse'

/* ============================================================
   Convierte el markdown de un módulo en las secciones y bloques
   del diseño (cards, analogías, flows, tablas, código con copiar,
   pasos, warnings, glosarios, autoevaluación…).
   ============================================================ */

const EMOJI_RE = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/gu
const cleanTitle = s =>
  s.replace(/^#{2,3}\s+/, '').replace(EMOJI_RE, '').replace(/\s+/g, ' ').trim()
const norm = s =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

function classifySection(rawTitle) {
  const title = cleanTitle(rawTitle)
  const t = norm(title)
  const raw = rawTitle.trim()

  if (t.includes('objetivos')) return { type: 'objectives', kicker: 'Objetivos de aprendizaje' }
  if (t.includes('problema real')) return { type: 'problem', kicker: 'Problema real que resuelve' }
  if (t.includes('analog')) return { type: 'analogy', kicker: 'Analogía' }
  if (t.includes('ocurre internamente')) return { type: 'internals', kicker: '¿Qué ocurre internamente?' }
  if (t.includes('laboratorio guiado')) return { type: 'lab', kicker: 'Laboratorio guiado' }
  if (t.includes('errores comunes')) return { type: 'warn', kicker: 'Errores comunes' }
  if (t.includes('resultado esperado')) return { type: 'result', kicker: 'Resultado esperado' }
  if (t.includes('lo que debes recordar')) return { type: 'summary', kicker: 'Resumen' }
  if (t === 'resumen' || t.startsWith('resumen ')) return { type: 'summary', kicker: 'Resumen' }
  if (t.includes('glosario')) return { type: 'glossary', kicker: 'Glosario del módulo' }
  if (t.includes('autoevaluacion')) return { type: 'quiz', kicker: 'Autoevaluación' }
  if (t.includes('caso de uso')) return { type: 'case', kicker: 'Caso de uso profesional' }
  if (t.includes('ejemplo')) return { type: 'example', kicker: '' }
  if (t.includes('explicacion tecnica')) return { type: 'explain', kicker: 'Explicación técnica' }
  if (raw.startsWith('💻') || /en la practica|verificacion|comandos|leer permisos/.test(t)) {
    return { type: 'example', kicker: '' }
  }
  if (raw.startsWith('⚠️')) return { type: 'warn', kicker: title }
  return { type: 'generic', kicker: title }
}

function parseModule(md) {
  const lines = md.split('\n')
  const sections = []
  let cur = null
  let buf = []
  let list = null
  let fence = null
  let table = null
  let quote = []
  let afterDivider = false

  const addBlock = b => {
    if (cur) cur.blocks.push(b)
  }
  const flushFence = () => {
    if (fence) {
      addBlock({ type: 'code', lang: fence.lang, code: fence.lines.join('\n') })
      fence = null
    }
  }
  const flushTable = () => {
    if (table) {
      addBlock({ type: 'table', rows: table.rows, hasHeader: table.hasHeader })
      table = null
    }
  }
  const flushList = () => {
    if (list) {
      addBlock({ type: list.type, items: list.items })
      list = null
    }
  }
  const flushPara = () => {
    if (buf.length) {
      addBlock({ type: 'para', text: buf.join('\n') })
      buf = []
    }
  }
  const flushQuote = () => {
    if (quote.length) {
      addBlock({ type: 'quote', text: quote.join('\n') })
      quote = []
    }
  }
  const flushAll = () => {
    flushFence()
    flushTable()
    flushList()
    flushPara()
    flushQuote()
  }

  const startList = type => {
    list = { type, items: [] }
  }

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    const line = lines[i]

    if (trimmed.startsWith('### ')) {
      flushAll()
      const spec = classifySection(trimmed)
      cur = { type: spec.type, kicker: spec.kicker, title: trimmed, blocks: [] }
      sections.push(cur)
      afterDivider = false
      continue
    }

    if (trimmed.startsWith('## ')) {
      flushAll()
      cur = null
      afterDivider = false
      continue
    }

    if (trimmed === '---') {
      flushAll()
      afterDivider = true
      continue
    }

    if (trimmed.startsWith('```')) {
      flushAll()
      fence = { lang: trimmed.slice(3).trim(), lines: [] }
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        fence.lines.push(lines[i])
        i++
      }
      flushFence()
      continue
    }

    if (trimmed.startsWith('|')) {
      flushAll()
      table = { rows: [], hasHeader: false }
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const row = lines[i].trim().slice(1, -1).split('|').map(c => c.trim())
        if (row.every(c => /^:?-+:?$/.test(c))) {
          table.hasHeader = true
        } else {
          table.rows.push(row)
        }
        i++
      }
      i--
      flushTable()
      continue
    }

    if (trimmed.startsWith('>')) {
      flushAll()
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quote.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      i--
      flushQuote()
      continue
    }

    const orderedMatch = trimmed.match(/^(\d+)[.)]\s+.*$/)
    const isBullet = /^([*+-])\s+/.test(trimmed)
    if (orderedMatch || isBullet) {
      flushPara()
      flushQuote()
      flushTable()
      flushFence()
      const type = orderedMatch ? 'ordered' : 'bullet'
      if (!list || list.type !== type) {
        if (afterDivider && type === 'ordered') {
          cur = { type: 'answers', kicker: 'Respuestas', title: '', blocks: [] }
          sections.push(cur)
        }
        flushList()
        startList(type)
      }
      const item = trimmed.replace(/^(\d+)[.)]\s+|^[*+-]\s+/, '')
      list.items.push(item)
      afterDivider = false
      continue
    }

    if (trimmed === '') {
      flushAll()
      continue
    }

    // Continuación de lista o párrafo
    if (list) {
      list.items[list.items.length - 1] += `\n${trimmed}`
    } else {
      buf.push(line)
    }
  }
  flushAll()

  // Kicker para secciones de ejemplo según el lenguaje de código
  sections.forEach(sec => {
    if (sec.type === 'example') {
      const lang = sec.blocks.find(b => b.type === 'code')?.lang
      if (lang === 'powershell' || lang === 'pwsh') sec.kicker = 'Ejemplo básico — PowerShell'
      else if (['bash', 'sh', 'zsh', 'shell'].includes(lang)) sec.kicker = 'Ejemplo básico — Terminal'
      else sec.kicker = 'Ejemplo básico'
    }
  })

  return { sections }
}

/* ---------- Bloques ---------- */

// Secuencia explicativa (lista numerada): los pasos entran en cascada cuando
// la lista aparece en pantalla (una sola vez).
function StepsList({ items }) {
  const { ref, inView } = useReveal(0.08)
  return (
    <ol ref={ref} className={`list-steps${inView ? ' in' : ''}`}>
      {items.map((it, j) => (
        <li key={j} style={{ '--i': j }}>{Inline(it)}</li>
      ))}
    </ol>
  )
}

function renderBlock(b, key) {
  switch (b.type) {
    case 'para':
      return <p key={key}>{Inline(b.text)}</p>
    case 'bullet':
      return (
        <ul key={key} className="list-plain">
          {b.items.map((it, j) => (
            <li key={j}>{Inline(it)}</li>
          ))}
        </ul>
      )
    case 'ordered':
      return <StepsList key={key} items={b.items} />
    case 'table':
      return (
        <div key={key} className="b tbl-wrap">
          <table>
            {b.hasHeader && (
              <thead>
                <tr>
                  {b.rows[0].map((c, j) => (
                    <th key={j}>{Inline(c)}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {(b.hasHeader ? b.rows.slice(1) : b.rows).map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{Inline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'quote':
      return (
        <div key={key} className="note">
          <span className="kicker">Nota</span>
          <p>{Inline(b.text)}</p>
        </div>
      )
    case 'code':
      if (b.lang === 'text' && looksLikeFlow(b.code)) {
        return <FlowDiagram key={key} code={b.code} />
      }
      return <CodeBlock key={key} lang={b.lang} code={b.code} />
    default:
      return null
  }
}

function flattenItems(blocks, type) {
  return blocks.filter(b => b.type === type).flatMap(b => b.items)
}

function parseDef(item) {
  const cleaned = item.trim()
  let term = cleaned
  let desc = ''
  const ci = cleaned.indexOf(':')
  if (ci > 0) {
    term = cleaned.slice(0, ci).trim()
    desc = cleaned.slice(ci + 1).trim()
  }
  term = term.replace(/\*\*/g, '').trim()
  return { term, desc }
}

/* ---------- Secciones ---------- */

function SectionBlocks({ section, accent }) {
  const { type, kicker, blocks } = section
  if (!blocks.length) return null

  if (type === 'objectives') {
    return (
      <div className="b card">
        <span className="kicker">{kicker}</span>
        {blocks.map((b, i) =>
          b.type === 'bullet' ? (
            <ul key={i} className="list-check two-col">
              {b.items.map((it, j) => (
                <li key={j}>{Inline(it)}</li>
              ))}
            </ul>
          ) : (
            renderBlock(b, i)
          )
        )}
      </div>
    )
  }

  if (type === 'example') {
    return (
      <div className="b">
        <span className="kicker">{kicker}</span>
        {blocks.map((b, i) =>
          b.type === 'para' ? (
            <p key={i} className="example-intro">
              {Inline(b.text)}
            </p>
          ) : (
            renderBlock(b, i)
          )
        )}
      </div>
    )
  }

  if (type === 'lab') {
    return (
      <div className="b card">
        <span className="kicker">{kicker}</span>
        {blocks.map((b, i) =>
          b.type === 'ordered' ? <StepsList key={i} items={b.items} /> : renderBlock(b, i)
        )}
      </div>
    )
  }

  if (type === 'warn') {
    return (
      <div className="b card-warn">
        <span className="kicker">{kicker}</span>
        {blocks.map((b, i) =>
          b.type === 'bullet' ? (
            <ul key={i} className="list-warn">
              {b.items.map((it, j) => (
                <li key={j}>{Inline(it)}</li>
              ))}
            </ul>
          ) : (
            renderBlock(b, i)
          )
        )}
      </div>
    )
  }

  if (type === 'internals') {
    return (
      <div className="b card card-internals">
        <span className="kicker">{kicker}</span>
        {blocks.map((b, i) => {
          const steps = b.type === 'code' ? parseFlow(b.code) : null
          return steps ? <InternalsFlow key={i} steps={steps} color={accent} /> : renderBlock(b, i)
        })}
      </div>
    )
  }

  if (type === 'result') {
    return (
      <div className="b card-result">
        <span className="kicker">{kicker}</span>
        {blocks.map((b, i) => renderBlock(b, i))}
      </div>
    )
  }

  if (type === 'glossary') {
    const items = flattenItems(blocks, 'bullet')
    return (
      <div className="b card">
        <span className="kicker">{kicker}</span>
        <div className="def-grid">
          {items.map((it, i) => {
            const { term, desc } = parseDef(it)
            return (
              <div className="def-row" key={i}>
                <span className="def-term">{term}</span>
                <span className="def-desc">{Inline(desc)}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (type === 'analogy') {
    return (
      <div className="b card-analogy">
        <span className="qm">“</span>
        <span className="kicker">{kicker}</span>
        {blocks.map((b, i) => (b.type === 'para' ? <p key={i}>{Inline(b.text)}</p> : renderBlock(b, i)))}
      </div>
    )
  }

  if (type === 'quiz') {
    // answerItems injected by ModuleContent when pairing quiz+answers
    const { answerItems = [] } = section
    const questions = blocks.flatMap(b => (b.type === 'ordered' ? b.items : []))
    return <QuizSection kicker={kicker} questions={questions} answers={answerItems} />
  }

  if (type === 'answers') {
    // Rendered inline by QuizSection — skip standalone render
    return null
  }

  // card / problem / case / explain / internals / summary / generic
  if (blocks.length === 1 && blocks[0].type === 'table') {
    return renderBlock(blocks[0])
  }
  return (
    <div className="b card">
      <span className="kicker">{kicker}</span>
      {blocks.map((b, i) => renderBlock(b, i))}
    </div>
  )
}

function QuizSection({ kicker, questions, answers }) {
  const [revealed, setRevealed] = useState({})
  const toggle = i => setRevealed(prev => ({ ...prev, [i]: !prev[i] }))
  const onKeyDown = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(i)
    }
  }
  return (
    <div className="b card">
      <span className="kicker">{kicker}</span>
      <ol className="list-quiz">
        {questions.map((q, i) => (
          <li
            key={i}
            className={`quiz-item${revealed[i] ? ' quiz-open' : ''}`}
            role="button"
            tabIndex={0}
            aria-expanded={Boolean(revealed[i])}
            onClick={() => toggle(i)}
            onKeyDown={e => onKeyDown(e, i)}
          >
            <div className="quiz-question">
              <span className="quiz-q-text">{Inline(q)}</span>
              <span className="quiz-toggle-icon" aria-hidden="true">▼</span>
            </div>
            <div className="quiz-answer" aria-hidden={!revealed[i]}>
              <div className="quiz-answer-inner">
                {answers[i] && <div>{Inline(answers[i])}</div>}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

// Etiqueta corta para el índice lateral
function tocLabel(sec) {
  if (sec.type === 'quiz') return 'Autoevaluación'
  return sec.kicker || cleanTitle(sec.title) || 'Sección'
}

// El módulo se lee de a una sección: índice flotante a la izquierda y, en
// el contenido, solo la sección activa con «anterior / siguiente» al pie.
export default function ModuleContent({ content, accent, onProgress, onFinish }) {
  const { sections: all } = parseModule(content)
  // Empareja cada autoevaluación con sus respuestas
  for (let i = 0; i < all.length; i++) {
    if (all[i].type === 'quiz' && all[i + 1]?.type === 'answers') {
      all[i].answerItems = all[i + 1].blocks.flatMap(b => (b.type === 'ordered' ? b.items : []))
    }
  }
  const sections = all.filter(sec => sec.type !== 'answers' && sec.blocks.length)
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState(() => new Set([0]))
  const topRef = useRef(null)
  const tocRef = useRef(null)
  const total = sections.length
  const cur = Math.min(active, Math.max(0, total - 1))

  useEffect(() => {
    setSeen(prev => (prev.has(cur) ? prev : new Set(prev).add(cur)))
    // En móvil el índice es una fila desplazable: centrar el chip activo
    const box = tocRef.current
    const item = box?.querySelector('.mod-toc-item.on')
    if (box && item && box.scrollWidth > box.clientWidth) {
      box.scrollTo({ left: item.offsetLeft - box.clientWidth / 2 + item.offsetWidth / 2, behavior: 'smooth' })
    }
  }, [cur])
  useEffect(() => {
    if (!total) return
    onProgress && onProgress(Math.round((seen.size / total) * 100))
    if (cur === total - 1) onFinish && onFinish()
  }, [seen, cur, total, onProgress, onFinish])

  const go = i => {
    if (i < 0 || i >= total || i === cur) return
    setActive(i)
    // Si el inicio del contenido quedó arriba de la pantalla, volver a él
    const el = topRef.current
    if (el) {
      const top = el.getBoundingClientRect().top
      const nav = 80
      if (top < nav) window.scrollTo({ top: window.scrollY + top - nav - 8, behavior: 'smooth' })
    }
  }

  if (!total) return null
  const prev = cur > 0 ? sections[cur - 1] : null
  const next = cur < total - 1 ? sections[cur + 1] : null

  return (
    <div className="mod-layout" ref={topRef}>
      <aside className="mod-toc" aria-label="Secciones del módulo">
        <div className="mod-toc-inner" ref={tocRef}>
          <div className="mod-toc-head">
            <span className="mod-toc-k">Secciones</span>
            <span className="mod-toc-count">{cur + 1}/{total}</span>
          </div>
          <div className="mod-toc-bar" aria-hidden="true">
            <span style={{ width: `${(seen.size / total) * 100}%` }} />
          </div>
          <ol className="mod-toc-list">
            {sections.map((sec, i) => (
              <li key={i}>
                <button
                  type="button"
                  className={`mod-toc-item${i === cur ? ' on' : ''}${seen.has(i) && i !== cur ? ' seen' : ''}`}
                  aria-current={i === cur ? 'step' : undefined}
                  onClick={() => go(i)}
                >
                  <span className="mod-toc-n" aria-hidden="true">{seen.has(i) && i !== cur ? '✓' : String(i + 1).padStart(2, '0')}</span>
                  <span className="mod-toc-t">{tocLabel(sec)}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <div className="mod-section">
        <div className="mod-section-body" key={cur}>
          <SectionBlocks section={sections[cur]} accent={accent} />
        </div>
        <nav className="mod-sec-nav" aria-label="Navegación entre secciones">
          {prev ? (
            <button type="button" className="mod-sec-btn prev" onClick={() => go(cur - 1)}>
              <span className="mod-sec-arrow" aria-hidden="true">←</span>
              <span>
                <span className="mod-sec-k">Anterior</span>
                <span className="mod-sec-t">{tocLabel(prev)}</span>
              </span>
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button type="button" className="mod-sec-btn next" onClick={() => go(cur + 1)}>
              <span>
                <span className="mod-sec-k">Siguiente sección</span>
                <span className="mod-sec-t">{tocLabel(next)}</span>
              </span>
              <span className="mod-sec-arrow" aria-hidden="true">→</span>
            </button>
          ) : (
            <span className="mod-sec-end">Fin del módulo ✓</span>
          )}
        </nav>
      </div>
    </div>
  )
}
