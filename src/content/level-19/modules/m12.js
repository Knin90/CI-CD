const content = `
## Módulo 12 — Caching

### 🎯 Objetivos de aprendizaje

* Cachear dependencias y builds en el pipeline.
* Configurar cachés por job y por llave.
* Equilibrar caché y reproducibilidad.

### ❓ Problema real que resuelve

Descargar dependencias en cada run (npm install, pip install, go mod download) tarda minutos en cada pipeline. El caching guarda esos datos entre runs: la segunda vez, el job los recupera de la caché — reduciendo drásticamente el tiempo de build y el coste.

### 💡 Analogía

El caching es el almacén de herramientas del taller: en vez de que cada mecánico compre herramientas nuevas para cada coche (descargar dependencias en cada run), el taller guarda las herramientas comunes y cada trabajo las toma del almacén (caché). El primer uso las compra; los siguientes las reutilizan.

### 📖 Explicación técnica

* Qué cachear: dependencias del gestor (npm/node_modules, pip, go, maven), builds parciales, imágenes Docker base (nivel 9), steps descargados.
* Implementaciones: GitHub \`actions/cache\` (key/restore-keys), GitLab cache (paths + key), Jenkins (workspace/registry cache), Docker build cache (nivel 9).
* **Clave de caché**: identifica qué caché usar — basada en lockfile (\`package-lock.json\`), versión de runtime, rama. Si el lockfile cambia, la caché se invalida (key nueva).
* Restauración: si la key exacta no existe, se usan restore-keys (la más cercana) — trade-off entre acierto (speed) y frescura (corrección).
* Riesgos: caché corrupta o desactualizada que produce builds "que funcionan en CI pero no en local" (reproducibilidad, nivel 6) — invalidar caché cuando haya dudas, testear con caché fría.
* Buenas prácticas: cachear solo lo estable (dependencias, no código fuente), claves precisas, monitorear el hit rate (¿la caché se usa de verdad?).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Run 1: npm install (5 min) → caché guardada (key: lockfile-hash)
   ↓
Run 2: ¿caché con key lockfile-hash? → sí → restore (5 s)
   ↓
npm install usa node_modules cacheado
   ↓
Lockfile cambia → key nueva → caché fría (re-descarga)
\`\`\`

### 🧪 Ejercicios

1. Configura caché de dependencias en tu pipeline (npm/pip/go).
2. Mide el tiempo del job con caché fría vs caliente.
3. Verifica el hit rate: ¿la caché se está usando o siempre falla?

### ⚠️ Errores comunes

* Claves de caché mal diseñadas (cambian en cada run: caché inútil).
* Cachear código fuente (contamina resultados entre commits).
* Caché corrupta que produce builds inconsistentes (invalidar ante dudas).
* Cachear de más: la caché oculta bugs de dependencias (resolver siempre desde cero periódicamente).

### 🔗 Conexión DevOps

El caching conecta build automation (nivel 6), fast feedback (nivel 23), coste de runners (nivel 4) y reproducibilidad (nivel 6). Es una de las palancas más efectivas para acortar pipelines.
`
export default content
