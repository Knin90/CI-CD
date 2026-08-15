const content = `
## Módulo 8 — YAML anchors

### 🎯 Objetivos de aprendizaje

* Usar anclas (\`&\`) y alias (\`*\`) para reutilizar bloques YAML.
* Aplicar anclas a la configuración de pipelines (DRY).
* Conocer \`extends\` de GitLab como alternativa nativa.

### ❓ Problema real que resuelve

Los pipelines repiten bloques: los mismos steps de instalación en 10 jobs, la misma configuración de runner, el mismo entorno. Copiar y pegar multiplica el mantenimiento (un cambio = editar 10 lugares) y provoca divergencias. Las anclas YAML definen un bloque **una vez** y lo reutilizan con un alias: un cambio actualiza todo.

### 💡 Analogía

Una ancla es como una plantilla de etiqueta de dirección: defines el destinatario una vez (la ancla) y la pegas en todos los sobres (los alias). Si la dirección cambia, corriges la plantilla y todos los sobres quedan actualizados. Sin plantilla, tendrías que reescribir la dirección a mano en cada sobre.

### 📖 Explicación técnica

Sintaxis:

* **Ancla**: \`&nombre\` al inicio del valor que quieres reutilizar.
* **Alias**: \`*nombre\` donde quieres insertar la copia.
* **Override**: el alias se puede **extender** localmente con claves adicionales (merge \`<<:\`):

\`\`\`yaml
x-defaults: &defaults
  image: node:20
  tags: [docker]

build:
  <<: *defaults
  script: npm run build
\`\`\`

* \`<<: *defaults\` (merge key) copia el mapa y permite agregar/sobrescribir claves.
* Limitaciones: los alias son **copias estáticas** (no reaccionan a cambios en el ancla después de parsear); la legibilidad se degrada con anclas excesivas; algunas plataformas ofrecen alternativas nativas más potentes (\`extends\` en GitLab, \`reusable workflows\` en GitHub).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
x-setup: &setup
  - run: npm ci
  - run: npm run lint

jobs:
  test:
    steps: *setup          ← se copia aquí
  build:
    steps: *setup          ← y aquí

Parser → los dos jobs reciben las mismas steps
  │
  ▼
Un cambio en &setup → ambos jobs se actualizan
\`\`\`

### 💻 Ejemplo básico

Anclas en un pipeline:

\`\`\`yaml
x-runner: &runner
  runs-on: ubuntu-latest
  timeout-minutes: 10

x-install: &install
  - uses: actions/checkout@v4
  - run: npm ci

jobs:
  lint:
    <<: *runner
    steps: *install
  test:
    <<: *runner
    steps:
      - *install          # no aplicable así; mejor:
      # ...
\`\`\`

(En la práctica, \`*install\` se usa como valor de \`steps\` directamente.)

### 🏢 Caso de uso profesional

Un pipeline con 8 jobs que comparten configuración (runner, instalación, variables) usa anclas: el bloque de instalación se define una vez. Cuando el equipo agrega un paso de caché a la instalación, edita la ancla y los 8 jobs la heredan en el próximo commit. La configuración pasa de 300 líneas repetitivas a 150 claras.

### ⚠️ Errores comunes

* Anclas que oscurecen la configuración (¿de dónde viene este bloque?).
* Alias usados donde se necesita override: falta el merge key.
* Anclas anidadas (ancla dentro de ancla) difíciles de seguir.
* Abusar de anclas cuando la plataforma ofrece \`extends\`/templates más claros.
* Anclas con nombres poco descriptivos.

### 📋 Lo que debes recordar

* \`&nombre\` define, \`*nombre\` reutiliza, \`<<: *nombre\` mergea con override.
* Las anclas aplican DRY a la configuración YAML.
* Prefiere las alternativas nativas de la plataforma cuando existan.
* Usa nombres descriptivos y no abuses.

### 🧪 Autoevaluación rápida

1. ¿Cuál es la sintaxis de ancla y alias?
2. ¿Qué hace la merge key \`<<:\`?
3. ¿Qué limitación tienen los alias?

---

1. \`&nombre\` define la ancla y \`*nombre\` la reutiliza como alias.
2. \`<<: *nombre\` copia el mapa del alias dentro del bloque actual, permitiendo agregar o sobrescribir claves.
3. Son copias estáticas en el parseo: no se actualizan dinámicamente, y las anclas excesivas degradan la legibilidad.
`
export default content
