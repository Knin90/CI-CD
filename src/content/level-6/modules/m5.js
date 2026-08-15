const content = `
## Módulo 5 — Maven

### 🎯 Objetivos de aprendizaje

* Usar Maven en CI: ciclo de vida, fases y reproducción.
* Configurar dependencias, repositorios y caché.
* Publicar artefactos Java desde el pipeline.

### ❓ Problema real que resuelve

Maven es el gestor estándar de Java: define el ciclo de vida (validate, compile, test, package), resuelve dependencias desde repositorios (Maven Central, Nexus, Artifactory) y empaqueta artefactos (jar/war). En CI, usarlo bien — con repositorios privados, caché y versiones deterministas — hace builds Java rápidos y reproducibles.

### 💡 Analogía

Maven es como el maestro de obra de un proyecto Java: conoce el orden de los trabajos (fases), pide los materiales a los proveedores (repositorios) y entrega el edificio terminado (jar). El \`pom.xml\` es el plano: qué materiales, qué versiones, qué plugins. El pipeline es quien supervisa que el maestro trabaje siempre igual.

### 📖 Explicación técnica

* **pom.xml**: modelo del proyecto — dependencias, plugins, propiedades, repositorios.
* **Ciclo de vida**: \`validate → compile → test → package → verify → install → deploy\`. \`mvn package\` ejecuta todas las fases anteriores.
* **Repositorios**: local (\`~/.m2\`), remoto (Maven Central, privados como Nexus/Artifactory).
* **Dependencias**: coordenadas \`groupId:artifactId:version\`; \`mvn dependency:go-offline\` precarga todo.
* **Snapshot vs Release**: \`-SNAPSHOT\` (en desarrollo) vs versiones finales; en CI se publican releases, no snapshots, en el deploy.
* **Caché en CI**: cachear \`~/.m2/repository\` acelera enormemente.
* \`mvn deploy\`: publica en el repositorio de artefactos (requiere credenciales del registry).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
mvn package (en CI)
  │
  ├── validate → compile → test → package
  ├── Dependencias: desde ~/.m2 (caché) o repos remotos
  ├── Tests unitarios (surefire)
  └── Empaqueta: target/app.jar
  │
  ▼
mvn deploy → repositorio de artefactos (Nexus/Artifactory)
  │
  ▼
Consumidores: mvn dependency:get (u otros proyectos)
\`\`\`

### 💻 Ejemplo básico

Job Maven con caché:

\`\`\`yaml
build:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/setup-java@v4
      with:
        distribution: temurin
        java-version: '21'
        cache: maven
    - run: mvn -B package
    - uses: actions/upload-artifact@v4
      with:
        name: app-jar
        path: target/*.jar
\`\`\`

### 🏢 Caso de uso profesional

Una empresa con 30 microservicios Java centraliza el pipeline: setup-java con caché de Maven, \`mvn -B verify\` (tests + quality), publicación del jar al Nexus interno con credenciales de CI, y escaneo de dependencias (OWASP dependency-check). El build pasa de 10 a 4 minutos con caché, y los artefactos quedan versionados en el repositorio corporativo.

### ⚠️ Errores comunes

* Sin caché de \`~/.m2\`: cada build descarga el mundo.
* \`mvn deploy\` de snapshots a producción.
* Dependencias sin versiones fijas (rangos o \`LATEST\`).
* Publicar con credenciales en el pom.xml o settings.xml del repo.
* Ignorar el modo \`-B\` (batch) en CI: prompts que cuelgan.

### 📋 Lo que debes recordar

* Maven: pom.xml + ciclo de vida (compile → test → package).
* Caché de \`~/.m2\` para velocidad.
* \`mvn deploy\` publica en el repositorio de artefactos.
* Credenciales del registry como secretos, nunca en el repo.

### 🧪 Autoevaluación rápida

1. ¿Qué fases ejecuta \`mvn package\`?
2. ¿Qué se cachea para acelerar builds Maven?
3. ¿Qué comando publica el artefacto en el repositorio?

---

1. Todas las anteriores: validate, compile, test y package (empacar).
2. El repositorio local \`~/.m2/repository\`: las dependencias ya descargadas.
3. \`mvn deploy\`, que sube el artefacto al repositorio configurado (Nexus/Artifactory).
`
export default content
