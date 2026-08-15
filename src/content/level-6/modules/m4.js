const content = `
## Módulo 4 — npm en el pipeline

### 🎯 Objetivos de aprendizaje

* Usar npm correctamente en CI: \`npm ci\`, lockfiles y scripts.
* Configurar caché de node_modules para acelerar el pipeline.
* Entender la publicación de paquetes npm desde CI.

### ❓ Problema real que resuelve

npm es el gestor de paquetes de JavaScript: instala dependencias, ejecuta scripts (build, test, lint) y publica paquetes. En CI, usarlo mal (npm install sin lockfile, sin caché) produce builds lentos, no reproducibles y fallos intermitentes. Dominar npm en el pipeline es la base del CI de cualquier proyecto JS/TS.

### 💡 Analogía

npm es como el supermercado del proyecto: \`package.json\` es la lista de la compra y \`package-lock.json\` es la factura exacta de lo que se compró. \`npm ci\` es comprar exactamente lo de la factura (rápido y exacto); \`npm install\` es rehacer la lista de la compra (puede traer versiones nuevas). En CI siempre se usa la factura.

### 📖 Explicación técnica

Comandos clave:

* \`npm ci\`: instala exactamente lo del lockfile, borrando node_modules; rápido y reproducible. **El comando de CI**.
* \`npm install\`: resuelve dependencias y puede actualizar el lockfile; para desarrollo local, no para CI.
* \`npm run <script>\`: ejecuta scripts definidos en package.json (build, test, lint).
* \`npm pack\` / \`npm publish\`: empaquetar y publicar.
* \`npm audit\`: análisis de vulnerabilidades de dependencias (SCA).
* \`npm cache\`: caché de descargas (se puede cachear en CI).

Configuración en CI:

* Lockfile **commitado**: \`package-lock.json\` en el repo.
* \`npm ci\` siempre (no \`npm install\`).
* Caché de \`~/.npm\` (o node_modules) entre ejecuciones.
* Registry privado con token (para paquetes privados).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
npm ci (en CI)
  │
  ├── Lee package-lock.json (versiones exactas)
  ├── Descarga desde caché o registry
  ├── Instala exactamente lo declarado
  └── Listo para scripts
  │
  ▼
npm run build → artefacto
npm test → validación
npm audit → SCA
npm publish (release) → publica el paquete
\`\`\`

### 💻 Ejemplo básico

Job de CI con npm:

\`\`\`yaml
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: 20, cache: npm }
    - run: npm ci
    - run: npm run lint
    - run: npm test
    - run: npm audit --audit-level=high
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de frontend acelera su CI: pasa de \`npm install\` (2-4 min, no reproducible) a \`npm ci\` con caché de npm (45 s, exacto). Los builds dejaron de fallar por versiones de dependencias que cambiaban solas, y el audit de dependencias corre en cada PR detectando vulnerabilidades temprano.

### ⚠️ Errores comunes

* \`npm install\` en CI (puede actualizar dependencias sin querer).
* Lockfile no commitado.
* Sin caché: cada build descarga todo de nuevo.
* \`npm ci\` sin el lockfile actualizado (falla con error claro).
* Publicar paquetes con secretos (tokens en .npmrc).

### 📋 Lo que debes recordar

* \`npm ci\` para CI: exacto y rápido (usa el lockfile).
* Lockfile commitado siempre.
* Caché de npm para acelerar.
* \`npm audit\` como SCA en cada PR.

### 🧪 Autoevaluación rápida

1. ¿Por qué se usa \`npm ci\` en CI y no \`npm install\`?
2. ¿Qué hace \`npm audit\`?
3. ¿Cómo se acelera un job de npm en CI?

---

1. Porque \`npm ci\` instala exactamente lo del lockfile (reproducible y rápido), mientras \`npm install\` puede resolver versiones nuevas.
2. Analiza las dependencias instaladas en busca de vulnerabilidades conocidas (SCA) y reporta el nivel de riesgo.
3. Cacheando las descargas de npm (carpeta \`~/.npm\` o node_modules) entre ejecuciones.
`
export default content
