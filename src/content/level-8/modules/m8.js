const content = `
## Módulo 8 — Maven repositories

### 🎯 Objetivos de aprendizaje

* Explicar los repositorios Maven: local, remoto, privado.
* Publicar artefactos Java (jar/war) desde el pipeline.
* Gestionar snapshots vs releases y proxy de dependencias.

### ❓ Problema real que resuelve

Los artefactos Java se publican en repositorios Maven (Nexus/Artifactory) que también proxean los públicos (Maven Central). El pipeline publica los jars de cada release y los proyectos los consumen como dependencias. La separación snapshot/release y el proxy determinan la reproducibilidad y la velocidad de los builds.

### 💡 Analogía

El repositorio Maven es la biblioteca técnica de la empresa: la sección de publicaciones propias (releases), el borrador permanente (snapshots) y el servicio de préstamo a otras bibliotecas (proxy de Maven Central). La biblioteca organiza, cachea y controla el acceso; los proyectos (investigadores) consultan con su carnet (credenciales).

### 📖 Explicación técnica

Repositorios:

* **Local**: \`~/.m2\` en la máquina de build (caché).
* **Remoto público**: Maven Central (dependencias abiertas).
* **Privado** (Nexus/Artifactory): repositorios propios de releases y snapshots, con proxy de Central.

Tipos:

* **Releases**: versiones finales (\`1.4.0\`), inmutables, publicadas desde el pipeline de release.
* **Snapshots**: versiones en desarrollo (\`1.5.0-SNAPSHOT\`), sobreescribibles, para integración continua.

Publicación desde el pipeline:

\`\`\`bash
mvn deploy   # publica en el repositorio configurado en settings.xml/pom
\`\`\`

Autenticación: credenciales en el \`settings.xml\` inyectado como secreto (nunca versionado).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline de release → mvn deploy
  │
  ├── Jar versionado (1.4.0) → repositorio de releases
  └── (Snapshots en CI dev → repo de snapshots)
  │
  ▼
Nexus/Artifactory
  ├── Proxy: Maven Central (caché de dependencias públicas)
  └── Privado: jars de la empresa
  │
  ▼
Consumidores: mvn dependency (coordenadas groupId:artifactId:version)
\`\`\`

### 💻 Ejemplo básico

Publicar desde el pipeline (con settings.xml secreto):

\`\`\`bash
# settings.xml inyectado como secreto (contiene las credenciales)
mvn -s \${CI_M2_SETTINGS} -B deploy -DskipTests
\`\`\`

Consumo en otro proyecto:

\`\`\`xml
<dependency>
  <groupId>com.corp</groupId>
  <artifactId>pagos-api</artifactId>
  <version>1.4.0</version>
</dependency>
\`\`\`

### 🏢 Caso de uso profesional

Una empresa con 30 microservicios Java centraliza en Nexus: el pipeline publica cada release en el repositorio de releases (inmutable) y usa el proxy de Maven Central con caché para las dependencias. Los builds pasan de 10 a 3 minutos (caché del proxy + ~/.m2), y un problema de dependencia en Central no rompe los builds porque el proxy conserva la copia.

### ⚠️ Errores comunes

* Publicar snapshots como releases (o al revés).
* Credenciales del repositorio en el pom.xml versionado.
* Sin proxy: dependencia total de Maven Central.
* Releases sobreescritas (romper la inmutabilidad).
* \`mvn deploy\` sin verificar (tests saltados por costumbre).

### 📋 Lo que debes recordar

* Local (~/.m2) · remoto (Central) · privado (Nexus/Artifactory).
* Releases inmutables; snapshots sobreescribibles.
* \`mvn deploy\` publica; credenciales como secretos.
* Proxy con caché para velocidad y disponibilidad.

### 🧪 Autoevaluación rápida

1. ¿Qué tipos de repositorios Maven existen?
2. ¿Qué diferencia hay entre release y snapshot?
3. ¿Cómo se publica un artefacto Java desde el pipeline?

---

1. Local (~/.m2), remoto público (Maven Central) y privado (Nexus/Artifactory) con proxy.
2. La release es una versión final inmutable; el snapshot es una versión de desarrollo sobreescribible.
3. Con \`mvn deploy\` (o \`gradle publish\`), usando el settings.xml con credenciales inyectado como secreto.
`
export default content
