const content = `
## Módulo 6 — Gradle

### 🎯 Objetivos de aprendizaje

* Usar Gradle en CI: tasks, build cache y daemon.
* Comparar Gradle con Maven.
* Publicar artefactos Gradle desde el pipeline.

### ❓ Problema real que resuelve

Gradle es el build tool moderno de la JVM (y más allá): define tareas con dependencias, usa build cache para evitar recompilar lo que no cambió y es el estándar de Android. En CI, usarlo bien — con build cache, configuración de daemon y caché de dependencias — convierte builds lentos en rápidos y reproducible.

### 💡 Analogía

Gradle es como un chef con sistema de mise en place: prepara los ingredientes (dependencias) una vez y los reutiliza (build cache), solo cocina lo que falta (incremental) y tiene un ayudante permanente listo (daemon). Un chef que volviera a picar todas las verduras en cada plato (sin cache) sería lentísimo.

### 📖 Explicación técnica

* **build.gradle** (Groovy/Kotlin DSL): define tareas, plugins y dependencias.
* **Tareas**: \`compileJava\`, \`test\`, \`build\`, \`publish\`; Gradle calcula el grafo de tareas.
* **Build cache**: guarda el OUTPUT de las tareas; si los inputs no cambian, reutiliza el resultado (incluso entre máquinas).
* **Configuration cache**: evita reconfigurar el build en cada ejecución.
* **Daemon**: proceso JVM persistente que acelera las ejecuciones (en CI se configura para no consumir memoria de más).
* **Wrapper** (\`gradlew\`): fija la versión de Gradle del proyecto; en CI se usa el wrapper, no un Gradle instalado.
* **Publicación**: \`publish\` (plugin maven-publish) → repositorio de artefactos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
./gradlew build (en CI)
  │
  ├── Gradle wrapper (versión fija)
  ├── Grafo de tareas calculado
  ├── Build cache consultado
  │     ├── ¿Inputs cambiaron? → recompila esa tarea
  │     └── ¿Sin cambios? → reutiliza el output
  ├── Dependencias desde ~/.gradle (caché)
  └── test + assemble → artefacto
  │
  ▼
./gradlew publish → repositorio (Nexus/Artifactory)
\`\`\`

### 💻 Ejemplo básico

Job Gradle con caché:

\`\`\`yaml
build:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/setup-java@v4
      with:
        distribution: temurin
        java-version: '21'
    - name: Caché de Gradle
      uses: actions/cache@v4
      with:
        path: |
          ~/.gradle/caches
          ~/.gradle/wrapper
        key: gradle-\${{ hashFiles('**/*.gradle*') }}
    - run: ./gradlew build --build-cache --no-daemon
\`\`\`

### 🏢 Caso de uso profesional

Un proyecto Android con build de 25 minutos: activan el build cache de Gradle y cachean ~/.gradle en CI. Los builds pasan a 8 minutos (el 70% de las tareas reutilizan outputs), y el configuration cache ahorra 40 segundos por ejecución. El pipeline ahora tiene margen para correr tests instrumentados dentro del presupuesto de tiempo.

### ⚠️ Errores comunes

* No usar el wrapper (\`gradlew\`): builds con versiones de Gradle distintas.
* Sin build cache: recompilar lo que no cambió.
* Daemon mal configurado en CI: consumo de memoria.
* Cache inválida por claves mal definidas.
* Publicar con credenciales en el build file.

### 📋 Lo que debes recordar

* Usa el wrapper (\`gradlew\`) siempre.
* Build cache: reutiliza outputs de tareas sin cambios.
* Cachea \`~/.gradle\` en CI.
* Publicación con \`publish\` y credenciales seguras.

### 🧪 Autoevaluación rápida

1. ¿Qué hace el build cache de Gradle?
2. ¿Por qué se usa el wrapper en CI?
3. ¿Qué se cachea en un job de Gradle?

---

1. Guarda los outputs de las tareas: si los inputs no cambiaron, la tarea no se re-ejecuta y se reutiliza el resultado.
2. Porque fija la versión de Gradle del proyecto: todos (devs y CI) usan exactamente la misma.
3. \`~/.gradle/caches\` y \`~/.gradle/wrapper\` (dependencias descargadas y versiones del wrapper).
`
export default content
