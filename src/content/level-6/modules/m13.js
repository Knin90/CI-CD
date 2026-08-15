const content = `
## Módulo 13 — Versioning

### 🎯 Objetivos de aprendizaje

* Aplicar versionado semántico al build y a los artefactos.
* Derivar versiones del pipeline (tags, commits, Conventional Commits).
* Mantener consistencia entre código, artefacto y release.

### ❓ Problema real que resuelve

Los artefactos necesitan identificadores únicos y ordenables: sin versionado, "¿cuál es la versión nueva?" es ambiguo y los rollbacks imposibles. El versionado semántico comunica el impacto del cambio (major/minor/patch), y el pipeline debe generarlo y aplicarlo consistentemente a código, artefacto y release.

### 💡 Analogía

Las versiones son como los modelos de un producto: el 1.2.0 indica la generación (major), la línea (minor) y la corrección (patch). Un cliente sabe si el 2.0 le rompe la compatibilidad o si el 1.2.1 solo corrige un bug. Las versiones bien asignadas permiten decidir actualizar o no — y al sistema, desplegar o revertir.

### 📖 Explicación técnica

Versionado semántico (\`MAJOR.MINOR.PATCH\`):

* **MAJOR**: cambios incompatibles (breaking).
* **MINOR**: features nuevas compatibles.
* **PATCH**: correcciones de bugs.
* Pre-release: \`1.4.0-rc.1\`, \`1.4.0-beta.2\`.
* Build metadata: \`1.4.0+build.4521\`.

Generación en el pipeline:

* **Manual**: el tag \`v1.4.0\` define la versión; el pipeline la lee del tag.
* **Automática**: Conventional Commits + semantic-release: feat → minor, fix → patch, breaking → major; el pipeline calcula, taggea y publica.
* **Derivada**: \`<version>-<commit>\` para builds de desarrollo (snapshots).

Consistencia: el tag del git, el tag de la imagen, la versión del paquete y los metadatos del artefacto deben ser el MISMO valor.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Conventional Commits desde el último tag
  │
  ▼
Análisis: feat? fix? breaking?
  │
  ▼
Versión calculada: v1.4.0 (minor)
  │
  ▼
Pipeline: tag v1.4.0 + imagen app:v1.4.0 + changelog
  │
  ▼
Todo con la misma versión: trazable y ordenable
\`\`\`

### 💻 Ejemplo básico

Versionado semántico en acción:

\`\`\`text
v1.3.0 ──► feat (nueva feature) ──► v1.4.0
v1.4.0 ──► fix (bug) ──► v1.4.1
v1.4.1 ──► feat! (breaking) ──► v2.0.0
\`\`\`

### 🏢 Caso de uso profesional

Una API pública con clientes externos usa versionado semántico estricto: los breaking changes solo entran en majors (v2, v3), las features en minors y los fixes en patches. El pipeline genera la versión automáticamente desde los mensajes de commit y la aplica al paquete, la imagen y la documentación. Los clientes actualizan sin sorpresas y la API mantiene su reputación.

### ⚠️ Errores comunes

* Versiones sin criterio ("v2-final", "ultima-version").
* Breaking changes en patches: clientes rotos sin aviso.
* Versión del tag ≠ versión del artefacto.
* Versiones de desarrollo sin sufijo (snapshots mal etiquetados).
* Generar versiones a mano en vez de en el pipeline.

### 📋 Lo que debes recordar

* Semver: MAJOR.MINOR.PATCH + pre-release + metadata.
* Genera la versión en el pipeline (del tag o de Conventional Commits).
* Consistencia total: git tag = imagen = paquete = metadatos.
* Los breaking changes solo en majors.

### 🧪 Autoevaluación rápida

1. ¿Qué incrementa cada parte del semver?
2. ¿Cómo se genera la versión automáticamente?
3. ¿Por qué tag e imagen deben coincidir?

---

1. MAJOR: breaking; MINOR: features nuevas; PATCH: fixes.
2. Analizando los mensajes Conventional Commits desde el último tag (feat→minor, fix→patch, breaking→major) con herramientas como semantic-release.
3. Porque la trazabilidad depende de ello: saber que la imagen \`app:v1.4.0\` corresponde al tag \`v1.4.0\` permite reproducir y revertir versiones con certeza.
`
export default content
