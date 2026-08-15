const content = `
## Módulo 3 — Package managers

### 🎯 Objetivos de aprendizaje

* Explicar qué es un gestor de paquetes y su papel en CI/CD.
* Conocer los gestores por ecosistema (npm, pip, Maven, Gradle, Go).
* Elegir el gestor adecuado y usarlo de forma reproducible en CI.

### ❓ Problema real que resuelve

Cada ecosistema resuelve las dependencias con su herramienta: Node con npm/yarn/pnpm, Python con pip/poetry, Java con Maven/Gradle, Go con modules. El pipeline debe usar el gestor correcto de forma reproducible: resolver dependencias, ejecutar el build, cachear y publicar. Conocer el patrón común (gestor → lockfile → instalación reproducible → build → publicación) permite aplicarlo a cualquier lenguaje.

### 💡 Analogía

Los gestores de paquetes son como las cadenas de suministro de distintos países: cada una tiene sus proveedores (registries), sus documentos (lockfiles) y sus vehículos (herramientas). El importador (pipeline) no necesita conocer cada país a fondo, pero sí saber qué documento exige cada uno y cómo pedir la mercancía exacta.

### 📖 Explicación técnica

Gestores principales:

* **Node/JS**: npm (\`npm ci\`), yarn (\`yarn install --frozen-lockfile\`), pnpm (\`pnpm install --frozen-lockfile\`).
* **Python**: pip (\`requirements.txt\`, \`pip install -r\`), pipenv (\`Pipfile.lock\`), poetry (\`poetry.lock\`, \`poetry install\`).
* **Java**: Maven (\`pom.xml\`, \`mvn dependency:go-offline\`), Gradle (\`build.gradle\`, \`gradle build --offline\`).
* **Go**: \`go.mod\` + \`go.sum\`, \`go mod download\`, \`go build\`.
* **Ruby**: Bundler (\`Gemfile.lock\`, \`bundle install\`).
* **Rust**: Cargo (\`Cargo.lock\`, \`cargo build\`).

Patrón común en CI:

\`\`\`text
1. Fijar la versión del gestor/herramienta (setup)
2. Instalar con lockfile congelado (reproducible)
3. Cachear las descargas del gestor
4. Ejecutar build/tests
5. (Release) publicar con credenciales del registry
\`\`\`

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Ecosistema  → Gestor → Lockfile → Instalación → Build → Publicación
Node        → npm     → package-lock → npm ci     → vite  → npm publish
Python      → pip     → requirements → pip install → build → twine upload
Java        → Maven   → pom.xml      → mvn deps    → mvn package → nexus
Go          → modules → go.sum       → go mod dl   → go build → proxy
\`\`\`

### 💻 Ejemplo básico

Setup del gestor en CI (GitHub Actions):

\`\`\`yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm          # caché del gestor incluida
- run: npm ci
- run: npm run build
\`\`\`

Para Python:

\`\`\`yaml
- uses: actions/setup-python@v5
  with:
    python-version: '3.12'
    cache: pip
- run: pip install -r requirements.txt
\`\`\`

### 🏢 Caso de uso profesional

Un equipo multi-lenguaje estandariza sus pipelines con el patrón común: cada servicio define su gestor y lockfile; el pipeline genérico detecta el ecosistema, configura la herramienta con caché, instala congelado y corre build+tests. Nuevos servicios con lenguajes distintos usan el mismo pipeline sin reescribir nada.

### ⚠️ Errores comunes

* Mezclar gestores (npm y yarn en el mismo proyecto).
* Instalar sin lockfile: builds no reproducibles.
* No fijar la versión del gestor/herramienta.
* Sin caché: cada build descarga todo de nuevo.
* Publicar con credenciales mal gestionadas (ver nivel de Secrets).

### 📋 Lo que debes recordar

* Cada ecosistema tiene su gestor y su lockfile.
* Patrón común: setup → instalación congelada → caché → build → publicación.
* La versión del gestor se fija (setup-action).
* Publicación con credenciales del registry gestionadas como secretos.

### 🧪 Autoevaluación rápida

1. Nombra el gestor y lockfile de tres ecosistemas.
2. ¿Cuál es el patrón común de uso del gestor en CI?
3. ¿Qué riesgo hay al no usar el lockfile?

---

1. Node: npm + package-lock.json; Python: pip/poetry + poetry.lock; Java: Maven + pom.xml (o Gradle); Go: modules + go.sum.
2. Fijar versión del gestor → instalar con lockfile congelado → cachear descargas → build/tests → publicar.
3. Dependencias flotantes: versiones nuevas entran sin aviso, builds no reproducibles y fallos intermitentes.
`
export default content
