const content = `
## Módulo 14 — Conventional commits

### 🎯 Objetivos de aprendizaje

* Aplicar la especificación **Conventional Commits** a los mensajes de commit.
* Explicar cómo esta convención habilita changelogs automáticos y versionado semántico.
* Usar el formato como entrada de datos para las releases.

### ❓ Problema real que resuelve

Los mensajes de commit son datos: alimentan changelogs, versionado, releases y troubleshooting. Si cada desarrollador escribe lo que quiere ("fix", "mejoras", "cambios"), esos datos son inservibles. Conventional Commits define un **formato estándar** que las máquinas pueden parsear: el tipo del cambio (feat, fix, breaking) se convierte automáticamente en versionado semántico y changelogs generados sin esfuerzo manual.

### 💡 Analogía

Es como un formulario estandarizado en lugar de una nota libre: un hospital no registra "el paciente vino y le pasaron cosas"; registra síntomas, diagnósticos y tratamientos en campos definidos. Los formularios permiten estadísticas, historial y automatización. Conventional Commits es el formulario de Git: estructurado, parseable y útil para las máquinas y las personas.

### 📖 Explicación técnica

Formato:

\`\`\`text
<tipo>(<scope>): <descripción>
<blank line>
<cuerpo opcional>
<blank line>
<footer opcional (BREAKING CHANGE, refs)>
\`\`\`

* **Tipos** estándar: \`feat\` (nueva feature), \`fix\` (corrección), \`docs\`, \`style\`, \`refactor\`, \`perf\`, \`test\`, \`build\`, \`ci\`, \`chore\`, \`revert\`.
* \`feat\` y \`fix\` determinan el **versionado semántico**: feat → MINOR, fix → PATCH, BREAKING CHANGE → MAJOR.
* \`BREAKING CHANGE:\` en el footer o \`!\` tras el tipo (\`feat!\`) marca cambios incompatibles.
* Reglas: la descripción en imperativo, minúsculas, < 72 caracteres, sin punto final.
* Herramientas: \`commitlint\` (valida), \`commitizen\` (asiste), \`semantic-release\` (versiona y publica automáticamente).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
git log --oneline
  feat(api): endpoint de pagos
  fix(checkout): total con cupones
  feat!: cambia formato de la API (breaking)

  │
  ▼
Herramienta de release parsea los mensajes
  ├── feat  → bump MINOR
  ├── fix   → bump PATCH
  ├── breaking → bump MAJOR
  │
  ▼
Genera changelog automáticamente
  │
  ▼
Crea tag vNuevaVersión → dispara el release
\`\`\`

### 💻 Ejemplo básico

Mensajes válidos:

\`\`\`bash
git commit -m "feat(api): agrega endpoint POST /payments"
git commit -m "fix(checkout): corrige el total con cupones"
git commit -m "docs(readme): actualiza ejemplos de instalación"
git commit -m "feat!: cambia el formato de respuesta de la API"
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con 30 desarrolladores usa Conventional Commits + semantic-release: al mergear a main, la herramienta analiza los mensajes desde el último tag, calcula la próxima versión (feat → minor, fix → patch, breaking → major), genera el changelog, crea el tag y publica el artefacto. Los releases salen solos, con versiones correctas y changelogs exactos — sin ceremonias manuales de versionado.

### ⚠️ Errores comunes

* Tipos inventados: \`feat\` para todo, rompe el versionado.
* Descripciones largas y con punto final.
* BREAKING CHANGE sin marcarlo: los consumidores reciben cambios incompatibles sin aviso.
* Mensajes en otro idioma o sin convención: las herramientas no los parsean.
* Usar Conventional Commits sin herramientas: la convención sin automatización pierde la mitad de su valor.

### 📋 Lo que debes recordar

* Formato: \`tipo(scope): descripción\` con cuerpo y footers opcionales.
* feat → MINOR, fix → PATCH, breaking → MAJOR.
* Habilita changelogs y versionado 100% automáticos.
* La descripción: imperativo, corta, sin punto final.

### 🧪 Autoevaluación rápida

1. ¿Qué tipo de commit incrementa la versión MINOR?
2. ¿Cómo se marca un cambio que rompe compatibilidad?
3. ¿Qué herramientas validan y aplican la convención?

---

1. \`feat\`: una nueva feature compatible incrementa MINOR; \`fix\` incrementa PATCH y \`BREAKING CHANGE\` (o \`feat!\`) incrementa MAJOR.
2. Con \`BREAKING CHANGE:\` en el footer del mensaje o con \`!\` después del tipo (\`feat!\`, \`fix!\`).
3. commitlint (valida mensajes en el hook), commitizen (asiste el formato) y semantic-release (versiona, genera changelog y publica automáticamente).
`
export default content
