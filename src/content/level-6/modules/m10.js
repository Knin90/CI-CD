const content = `
## Módulo 10 — Build caching

### 🎯 Objetivos de aprendizaje

* Explicar qué se cachea en un build y por qué acelera CI.
* Configurar caché por ecosistema (npm, Maven, Gradle, pip).
* Gestionar invalidez y limpieza de cachés.

### ❓ Problema real que resuelve

Los builds repiten trabajo idéntico en cada ejecución: descargar las mismas dependencias, recompilar lo que no cambió. La caché evita ese trabajo: guarda dependencias y outputs de compilación entre ejecuciones. El resultado: pipelines de 10 minutos que bajan a 3, y un feedback más rápido (y más barato).

### 💡 Analogía

La caché del build es como la despensa del restaurante: no compras (descargas) los mismos ingredientes cada vez que cocinas; los guardas y solo repones lo que falta. Sin despensa (caché), cada plato (build) empieza yendo al supermercado. La despensa debe ordenarse (claves de caché) y limpiarse (TLC) para no llenarse de comida caducada.

### 📖 Explicación técnica

Qué se cachea:

* **Dependencias descargadas**: ~/.npm, ~/.m2, ~/.gradle/caches, ~/.cache/pip, GOMODCACHE.
* **Outputs de compilación**: .tsbuildinfo, target/, build/ (build cache de Gradle, incremental de Maven).
* **Herramientas**: toolchains descargadas (setup-node, setup-python).

Claves de caché:

* La clave identifica el contenido: hash de lockfiles (\`hashFiles('package-lock.json')\`), versión de herramientas, rama.
* **Restore key**: si la clave exacta no existe, usar la más cercana (útil con PRs que no tocan dependencias).

Gestión:

* La caché es **inmutable por clave**: no se actualiza, se crea otra.
* **Limpieza**: retención, tamaño máximo, purga de claves viejas.
* **Riesgos**: caché con estado corrupto (borrar y regenerar), secretos en la caché (¡no cachear archivos con secretos!).
* Caché **distribuida** (remota): comparte entre runners; build cache de Gradle remoto, cache server de Turborepo.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job 1: npm ci (descarga todo) → guarda caché (clave: hash(lock))
Job 2: ¿Caché con esa clave? → SÍ → restaura node_modules
       └── npm ci usa el cache → segundos, no minutos
  │
  ▼
El lockfile cambia → clave nueva → nueva descarga → nueva caché
\`\`\`

### 💻 Ejemplo básico

Caché con claves (GitHub Actions):

\`\`\`yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-\${{ hashFiles('package-lock.json') }}
    restore-keys: |
      npm-
- run: npm ci
\`\`\`

### 🏢 Caso de uso profesional

Un monorepo de 40 paquetes: el build de CI tardaba 18 minutos (instalación 6, compilación 12). Con caché de dependencias (npm + workspace) y compilación incremental, baja a 5 minutos. El equipo ahorra ~13 minutos de runner por ejecución × 200 ejecuciones/día = enorme ahorro de costo y feedback casi instantáneo.

### ⚠️ Errores comunes

* Caché sin claves basadas en lockfile: restaura contenido obsoleto.
* Cachear archivos con secretos (tokens, .env) — riesgo de fuga.
* Caché corrupta que rompe builds (saber purgarla).
* No limpiar: la caché consume almacenamiento.
* Caché compartida entre entornos/plataformas incompatibles.

### 📋 Lo que debes recordar

* Cachea dependencias y outputs de compilación.
* Claves basadas en el contenido (hash de lockfiles).
* La caché es inmutable por clave; gestiona su ciclo de vida.
* Nunca cachees secretos.

### 🧪 Autoevaluación rápida

1. ¿Qué se cachea típicamente en un build?
2. ¿Qué clave de caché usarías para dependencias?
3. ¿Qué riesgo tiene cachear archivos con secretos?

---

1. Dependencias descargadas (~/.npm, ~/.m2, ~/.gradle) y outputs de compilación (build cache, incremental).
2. El hash del lockfile (\`hashFiles('package-lock.json')\`): cuando cambian las dependencias, la caché cambia.
3. Los secretos persisten en la caché compartida: otros jobs/ejecuciones pueden leerlos — es una fuga de credenciales.
`
export default content
