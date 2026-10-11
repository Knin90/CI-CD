// Convierte un diagrama de texto de «¿Qué ocurre internamente?» en pasos:
//   Paso
//     │ / ▼ / ↓        → conector (separa pasos)
//     ├── rama         → sub-ítem del paso anterior
//     línea indentada  → continuación del paso anterior
// Devuelve null si el texto es arte ASCII que no encaja (cajas, grafos).

const EDGE_RE = /^[\s│|▼↓v^]+$/
const TREE_RE = /^(?:[│|]\s+)*[├└┌]\s*[─-]*\s*/
const ART_RE = /[┐┘●╮╯]|\\\\|\s\/\s*$/

function splitMeta(text) {
  const t = text.trim().replace(/\s{2,}/g, ' ')
  for (const sep of [' — ', ' -- ']) {
    const i = t.indexOf(sep)
    if (i > 0) return { label: t.slice(0, i).trim(), meta: t.slice(i + sep.length).trim() }
  }
  return { label: t, meta: '' }
}

export function parseFlow(code) {
  if (!code || ART_RE.test(code)) return null
  // columnas alineadas con espacios: es una tabla dibujada, no un flujo
  const body = l => l.trim().replace(/^([│|]\s*)+/, '').replace(/^[├└┌]\s*[─-]*\s*/, '')
  const lines = code.split('\n')
  if (lines.some(l => /[│|▼↓]\s{2,}[│|▼↓]/.test(l.trim()))) return null
  if (lines.some(l => (body(l).match(/\S\s{4,}(?=\S)/g) || []).length >= 2)) return null
  const steps = []
  let base = null
  let edge = false
  for (const raw of code.split('\n')) {
    const t = raw.trim()
    if (!t) continue
    if (EDGE_RE.test(t) && /[│|▼↓]/.test(t)) {
      edge = true
      continue
    }
    const indent = raw.length - raw.trimStart().length
    const tree = t.match(TREE_RE)
    const last = steps[steps.length - 1]
    if (tree && last) {
      last.subs.push(t.slice(tree[0].length).replace(/^[│|]\s*/, '').replace(/\s{2,}/g, ' ').trim())
      edge = false
      continue
    }
    if (base === null) base = indent
    // continuación: más indentada que la base y sin conector previo
    if (last && !edge && indent > base + 1) {
      last.subs.push(t.replace(/^[│|]\s*/, '').replace(/\s{2,}/g, ' '))
      continue
    }
    const clean = t.replace(/^[│|]\s+/, '').replace(/^[├└┌]\s*[─-]*\s*/, '')
    steps.push({ ...splitMeta(clean), subs: [] })
    edge = false
  }
  // una sola línea «A → B → C»: cada tramo es un paso
  if (steps.length === 1 && steps[0].label.includes(' → ') && !steps[0].subs.length) {
    const parts = steps[0].label.split(' → ').map(s => s.trim()).filter(Boolean)
    if (parts.length >= 2) return parts.map(p => ({ label: p, meta: '', subs: [] }))
  }
  if (steps.length < 2 || steps.length > 16) return null
  return steps
}

// Etiqueta corta para el texto grabado en la estación
export function shortOf(label) {
  const t = label.replace(/[`*"]/g, '').trim()
  const head = t.split(/[:(→,]/)[0].trim()
  const word = head.split(/\s+/).slice(0, 2).join(' ')
  return word.length > 12 ? word.slice(0, 11) + '…' : word
}

export const isDecision = label => /\?/.test(label)
