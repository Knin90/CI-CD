#!/usr/bin/env node
/**
 * Regenera src/content/contentRegistry.js y src/content/metaRegistry.js
 * a partir de los archivos reales en src/content/level-N/.
 *
 * - contentRegistry: importa TODOS los módulos (m1..mN) de los niveles 0-25
 *   y construye contentMap con todas las ids. Elimina los niveles fantasma 26-39.
 * - metaRegistry: solo niveles 1-25 (sin el 0, como antes) sin 26-39.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const contentDir = path.join(root, 'src/content')

// ---- niveles reales con contenido ----
const levelDirs = fs.readdirSync(contentDir).filter(d => /^level-\d+$/.test(d))
const levels = levelDirs
  .map(d => ({ id: Number(d.replace('level-', '')), dir: d }))
  .sort((a, b) => a.id - b.id)

function moduleFiles(level) {
  const mdir = path.join(contentDir, level.dir, 'modules')
  if (!fs.existsSync(mdir)) return []
  return fs
    .readdirSync(mdir)
    .filter(f => /^m\d+\.js$/.test(f))
    .map(f => Number(f.replace('m', '').replace('.js', '')))
    .sort((a, b) => a - b)
}

// ================= contentRegistry.js =================
const importLines = []
const contentMapLines = []

for (const level of levels) {
  const L = level.id
  const mods = moduleFiles(level)
  if (!mods.length) continue

  importLines.push(`import * as level${L} from './level-${L}/index.js'`)
  for (const m of mods) {
    importLines.push(`import m${m}l${L} from './level-${L}/modules/m${m}.js'`)
  }

  const entries = mods.map(m => `${m}: m${m}l${L}`).join(', ')
  contentMapLines.push(`  ${L}: {
    meta: level${L}.meta,
    modules: level${L}.modules,
    contentMap: { ${entries} },
  },`)
}

const contentRegistry = `/* Registro completo de contenido: meta + módulos + contenido markdown por nivel.
   Generado por scripts/gen-registry.mjs — no editar a mano.
   Los contenidos se cargan bajo demanda con las rutas de nivel (React.lazy). */

${importLines.join('\n')}

export const contentRegistry = {
${contentMapLines.join('\n')}
}
`

fs.writeFileSync(path.join(contentDir, 'contentRegistry.js'), contentRegistry)
console.log(`contentRegistry.js: ${levels.filter(l => moduleFiles(l).length).length} niveles, ${levels.reduce((s, l) => s + moduleFiles(l).length, 0)} módulos`)

// ================= metaRegistry.js =================
const metaImports = []
const metaEntries = []
for (const level of levels) {
  const L = level.id
  const mods = moduleFiles(level)
  if (!mods.length) continue
  if (L === 0) continue // el nivel 0 no está en metaRegistry (comportamiento previo)
  metaImports.push(`import * as level${L} from './level-${L}/index.js'`)
  metaEntries.push(`  ${L}: { meta: level${L}.meta, modules: level${L}.modules },`)
}

const metaRegistry = `/* Registro ligero: solo meta + títulos de módulos por nivel.
   La landing solo necesita esto (búsqueda, tarjetas destacadas, primer nivel).
   Los contenidos markdown (pesados) viven en contentRegistry, que se carga
   bajo demanda con las rutas de nivel (React.lazy).
   Generado por scripts/gen-registry.mjs — no editar a mano. */

${metaImports.join('\n')}

export const metaRegistry = {
${metaEntries.join('\n')}
}
`

fs.writeFileSync(path.join(contentDir, 'metaRegistry.js'), metaRegistry)
console.log(`metaRegistry.js: ${metaEntries.length} niveles`)
