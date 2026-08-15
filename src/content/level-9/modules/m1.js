const content = `
## Módulo 1 — Docker build

### 🎯 Objetivos de aprendizaje

* Construir imágenes Docker dentro del pipeline.
* Configurar build context y caché de capas.
* Validar el resultado del build (tamaño, layers, contenido).

### ❓ Problema real que resuelve

Construir imágenes en el pipeline (no en la máquina local) garantiza que la imagen se genera en un entorno limpio y reproducible: misma base, mismas capas, mismo resultado. El build en CI además permite escanear, firmar y versionar la imagen antes de publicarla, integrándola como un artefacto más del pipeline.

### 💡 Analogía

Construir la imagen en el pipeline es como fabricar la caja del producto en la fábrica oficial (entorno estandarizado) en vez de en el taller de cada empleado (máquina local). La fábrica garantiza que todas las cajas salen iguales, inspeccionadas y etiquetadas; el taller produce cajas "más o menos iguales".

### 📖 Explicación técnica

Pasos del Docker build en CI:

1. **Contexto**: el pipeline copia el repo (checkout) y ejecuta \`docker build\` desde la raíz.
2. **Build**: Docker lee el Dockerfile, resuelve capa por capa (con caché).
3. **Caché**: capas cuyo contexto no cambió se reutilizan (ordenar COPY de lo estable a lo cambiante).
4. **Taggeo**: \`docker tag\` con la versión (semver, commit).
5. **Validación**: tamaño, estructura, smoke del contenedor (\`docker run\` + check).

Mejores prácticas en el Dockerfile:

* Base fija (\`node:20-alpine\`) con digest.
* \`COPY\` de dependencias antes que código (caché de capas).
* Multi-stage (build y runtime separados).
* Usuario no-root.
* \`.dockerignore\` (node_modules, .git, dist).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Checkout del repo
  │
  ▼
docker build -f Dockerfile .
  │
  ├── Capa base (cacheada)
  ├── Capa dependencias (COPY lock + npm ci, cacheada)
  ├── Capa código (COPY .) — la única que cambia seguido
  └── Imagen final (multi-stage: solo runtime)
  │
  ▼
docker tag app:v1.4.0
  │
  ▼
Validación: docker run + smoke → escaneo → push
\`\`\`

### 💻 Ejemplo básico

Build en CI (GitHub Actions):

\`\`\`yaml
build-image:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Build
      run: |
        docker build -t app:build .
        docker tag app:build registry.example.com/app:v1.4.0
    - name: Smoke
      run: |
        docker run --rm -d -p 8080:8080 --name app app:build
        curl -fsS http://localhost:8080/health
        docker stop app
\`\`\`

### 🏢 Caso de uso profesional

Un equipo estandariza el build de imágenes en el pipeline: Dockerfile multi-stage con base fija, \`.dockerignore\` y caché de layers. El build pasa de 6 a 2 minutos gracias a la caché (solo la capa de código cambia), y la imagen bajó de 1 GB a 150 MB. El pipeline valida la imagen con un smoke test antes de escanearla y publicarla.

### ⚠️ Errores comunes

* Build sin caché (cada ejecución recompila todo).
* COPY de todo el repo antes de las dependencias (caché inútil).
* Imágenes con toolchain en runtime.
* Sin .dockerignore: contextos gigantes (node_modules al build).
* Build local que produce imágenes distintas a las del CI.

### 📋 Lo que debes recordar

* Docker build en CI = imagen reproducible y verificada.
* Ordena las capas para maximizar el caché.
* Multi-stage y no-root para imágenes pequeñas y seguras.
* Valida la imagen (smoke) antes de publicar.

### 🧪 Autoevaluación rápida

1. ¿Por qué construir la imagen en el pipeline y no en local?
2. ¿Cómo se optimiza el caché de capas?
3. ¿Qué validación se hace sobre la imagen construida?

---

1. Por reproducibilidad (entorno limpio y estandarizado) y porque permite escanear, firmar y versionar la imagen como parte del pipeline.
2. Copiando primero lo que cambia poco (dependencias con lockfile) y el código al final, para que las capas estables se reutilicen.
3. Un smoke test del contenedor (arranca y responde), el escaneo de vulnerabilidades y la revisión del tamaño/estructura.
`
export default content
