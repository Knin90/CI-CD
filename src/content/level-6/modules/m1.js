const content = `
## Módulo 1 — Build process

### 🎯 Objetivos de aprendizaje

* Definir el proceso de build: de código fuente a artefacto.
* Describir las etapas del build (deps, compile, bundle, test).
* Entender el build como la etapa central del pipeline de CI.

### ❓ Problema real que resuelve

El código fuente no es ejecutable: hay que instalar dependencias, compilar, empaquetar. El build convierte el código en un **artefacto desplegable** de forma reproducible. Un build mal automatizado produce "en mi máquina funciona": resultados que dependen del entorno de quien lo ejecuta. El build del pipeline es el mismo proceso, ejecutado en un entorno limpio y versionado.

### 💡 Analogía

El build es como la cocción de una receta: los ingredientes (código) y la receta (configuración) producen el plato (artefacto). Si cada cocinero usa un horno distinto (entorno), el plato sale distinto. El build del pipeline es el horno estandarizado: mismo horno, misma temperatura, mismo plato siempre.

### 📖 Explicación técnica

Etapas típicas del build:

1. **Resolver dependencias**: descargar las librerías (lockfiles para reproducibilidad).
2. **Compilar/transpilar**: código fuente → código ejecutable (o bundle).
3. **Procesar assets**: CSS, imágenes, fuentes (minificar, hashear).
4. **Generar metadatos**: versión, build number, manifiestos.
5. **Empaquetar**: el artefacto final (binario, imagen, paquete).
6. **(Opcional) tests post-build**: validar el artefacto, no solo el código.

Requisitos de un buen build:

* **Reproducible**: mismo código + lockfile + versiones de tools = mismo resultado.
* **Rápido**: caché de dependencias y de compilación.
* **Verificado**: el artefacto resultante se valida (smoke test).
* **Inmutable**: el artefacto no cambia una vez publicado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Source Code
  │
  ▼
Dependencias (lockfile, cache)
  │
  ▼
Compilación (código → ejecutable)
  │
  ▼
Assets + metadatos (versión, hash)
  │
  ▼
Empaquetado → ARTEFACTO (binario/imagen)
  │
  ▼
Verificación (smoke) → publicación (registry)
\`\`\`

### 💻 Ejemplo básico

Build en un pipeline (GitHub Actions):

\`\`\`yaml
build:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: 20 }
    - name: Instalar dependencias
      run: npm ci
    - name: Compilar
      run: npm run build
    - name: Empaquetar
      run: tar -czf app.tar.gz dist/
    - uses: actions/upload-artifact@v4
      with:
        name: app
        path: app.tar.gz
\`\`\`

### 🏢 Caso de uso profesional

Una app con build "en mi máquina funciona" migra su build al pipeline: lockfile de dependencias, versiones fijas de Node, build en entorno limpio y caché. El artefacto se genera igual en cada ejecución y se publica en el registry con su versión. Los bugs de "build que solo funciona en la máquina de Juan" desaparecen.

### ⚠️ Errores comunes

* Sin lockfile: dependencias flotantes rompen el build un día sí y otro no.
* Versiones de herramientas flotantes (latest en runtime).
* Build que depende del estado de la máquina.
* No verificar el artefacto (compila pero no arranca).
* Artefactos no inmutables (se reconstruyen o mutan tras publicar).

### 📋 Lo que debes recordar

* Build = de código a artefacto, reproducible.
* Etapas: deps → compile → assets → metadatos → empaquetar.
* Lockfiles y versiones fijas = reproducibilidad.
* El artefacto se verifica y se vuelve inmutable.

### 🧪 Autoevaluación rápida

1. ¿Qué etapas componen un build típico?
2. ¿Qué garantiza la reproducibilidad del build?
3. ¿Por qué el artefacto debe verificarse tras el build?

---

1. Resolver dependencias, compilar/transpilar, procesar assets, generar metadatos y empaquetar.
2. Lockfiles (dependencias fijas), versiones fijas de herramientas y entorno limpio: el mismo código produce el mismo resultado.
3. Porque un artefacto que compila puede no arrancar; el smoke test post-build valida que el artefacto real funciona.
`
export default content
