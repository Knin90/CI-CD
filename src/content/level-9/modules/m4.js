const content = `
## Módulo 4 — Image tagging

### 🎯 Objetivos de aprendizaje

* Explicar el modelo de tags de imágenes.
* Aplicar esquemas de taggeo: semver, digest, commit, latest.
* Usar tags para trazabilidad y despliegues reproducibles.

### ❓ Problema real que resuelve

Los tags identifican versiones de imágenes; un mal taggeo (solo \`latest\`, tags sin semver, sobreescrituras) destruye la trazabilidad: "¿qué imagen está en producción?" no tiene respuesta. El taggeo profesional combina semver (legible), digest (exacto) y reglas de inmutabilidad.

### 💡 Analogía

El tag de una imagen es como la placa de un vehículo en la flota: \`v1.4.0\` es la matrícula legible, el digest es el número de chasis (único, imborrable), y \`latest\` es el rótulo "vehículo actual" que puede cambiar de coche. Para operar la flota se usa la matrícula o el chasis, nunca el rótulo móvil.

### 📖 Explicación técnica

Esquemas de tags:

* **Semver**: \`v1.4.0\`, \`v1.4.1\` — legible y ordenable; corresponde al tag de git.
* **Commit SHA**: \`9f3a2c1\` — identifica el commit exacto (bueno para PRs).
* **Digest**: \`sha256:...\` — identidad criptográfica del contenido (no es un tag, es la verdad).
* **latest**: mutable, solo conveniencia — nunca para despliegues.
* **Combinaciones**: \`v1.4.0\` (release) + \`9f3a2c1\` (build de PR).

Reglas:

* **Inmutabilidad**: las releases (\`v*\`) no se sobreescriben.
* **Consistencia**: el tag de la imagen = el tag del código.
* **Despliegues**: referencias fijas (semver o digest), nunca \`latest\`.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build → imagen con múltiples referencias:
  │
  ├── registry/app:v1.4.0      (release, inmutable)
  ├── registry/app:9f3a2c1     (commit, debug)
  └── registry/app:latest      (mutable, solo UI/conveniencia)
  │
  ▼
Despliegue: registry/app:v1.4.0@sha256:9f86...
  └── exacto, trazable, reproducible
\`\`\`

### 💻 Ejemplo básico

Taggeo en el pipeline:

\`\`\`bash
docker tag app:build registry/app:\$VERSION          # v1.4.0
docker tag app:build registry/app:\$GITHUB_SHA      # commit
docker tag app:build registry/app:latest            # conveniencia
docker push registry/app --all-tags
\`\`\`

### 🏢 Caso de uso profesional

Un equipo etiqueta sus imágenes: \`v1.4.0\` para releases (inmutable), \`9f3a2c1\` (commit) para cada build de PR, y \`latest\` solo para la UI. Los despliegues usan \`v\`+digest. Cuando un incidente apunta a una imagen, el digest y el tag llevan directo al commit, y el rollback a \`v1.3.9\` es inmediato porque el tag sigue intacto.

### ⚠️ Errores comunes

* Desplegar \`latest\` (no trazable).
* Sobreescribir tags de release.
* Tags sin semver ("nueva", "final").
* Solo tag de commit sin semver (ilegible para releases).
* No fijar la inmutabilidad en el registry.

### 📋 Lo que debes recordar

* Semver para releases, commit para builds, digest como verdad.
* \`latest\` es mutable: nunca para despliegues.
* El tag de imagen = el tag de código (consistencia).
* Despliega con referencias fijas e inmutables.

### 🧪 Autoevaluación rápida

1. ¿Qué esquemas de taggeo existen?
2. ¿Por qué \`latest\` no sirve para desplegar?
3. ¿Qué garantiza el digest?

---

1. Semver (\`v1.4.0\`), commit SHA, digest criptográfico y \`latest\` mutable.
2. Porque cambia: no identifica una versión concreta, rompe la trazabilidad y el rollback.
3. Que el contenido de la imagen es exactamente el construido: cualquier modificación produce otro digest.
`
export default content
