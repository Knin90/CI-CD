const content = `
## Módulo 5 — Image versioning

### 🎯 Objetivos de aprendizaje

* Aplicar versionado semántico a las imágenes.
* Mantener consistencia entre git, imagen y despliegue.
* Gestionar versiones de desarrollo y releases.

### ❓ Problema real que resuelve

Las imágenes versionadas mal son un caos: "¿la v2 es más nueva que la v1.5?" o "¿esta imagen es de la release o del dev?" El versionado de imágenes debe seguir las mismas reglas que el código (semver) y mantenerse consistente en toda la cadena: el tag de git, el tag de la imagen, la versión de la app y el despliegue apuntan al mismo número.

### 💡 Analogía

El versionado de imágenes es el ISBN de los libros: cada edición (versión) tiene un identificador estándar que dice su relación con las demás (1.4.0 < 1.4.1 < 1.5.0). Si la editorial (pipeline) etiquetara los libros con números inventados ("edición nueva"), nadie sabría qué leer ni qué actualizar.

### 📖 Explicación técnica

Reglas de versionado:

* **Semver para releases**: \`v1.4.0\` — major/minor/patch como el código.
* **Consistencia total**: git tag \`v1.4.0\` → imagen \`app:v1.4.0\` → app expone \`/version = 1.4.0\` → despliegue referencia \`app:v1.4.0\`.
* **Versiones de desarrollo**: \`<version>-<commit>\` o \`<version>-SNAPSHOT\` para builds de ramas/PRs.
* **Pre-release**: \`v1.4.0-rc.1\` para candidatos a release.
* **Inmutabilidad**: una versión publicada no se re-etiqueta.

Generación en el pipeline:

* Releases: el tag \`vX.Y.Z\` define la versión de la imagen.
* PRs: la imagen se etiqueta con el commit (o \`pr-<n>\`).
* El pipeline inyecta la versión como metadato de la imagen (LABEL) y de la app.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
git tag v1.4.0
  │
  ▼
Pipeline: docker build → tag app:v1.4.0 → push
  │
  ▼
LABEL version=1.4.0 commit=9f3a2c1 (metadatos)
  │
  ▼
App expone /version → 1.4.0
  │
  ▼
Despliegue: app:v1.4.0 (consistencia total)
\`\`\`

### 💻 Ejemplo básico

Derivar la versión de la imagen del tag de git:

\`\`\`bash
VERSION=\$(git describe --tags --abbrev=0)   # v1.4.0
docker build -t registry/app:\$VERSION .
docker push registry/app:\$VERSION
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con 20 microservicios versiona las imágenes en cada release: \`git tag v1.4.0\` → imagen \`api:v1.4.0\` → despliegue con \`api:v1.4.0\`. El monitoreo cruza la versión de la app (expuesta en \`/version\`) con el tag de la imagen: cuando una métrica se degrada, saben exactamente qué versión y qué commit corren. La consistencia del versionado hace el diagnóstico en minutos.

### ⚠️ Errores comunes

* Imagen con versión distinta del tag de git.
* Versiones de desarrollo sin sufijo (parecen releases).
* Sobreescribir versiones.
* \`latest\` en vez de semver.
* Versión hardcodeada en el código que no sigue al tag.

### 📋 Lo que debes recordar

* Semver para releases; commit/pre-release para desarrollo.
* Consistencia: git = imagen = app = despliegue.
* La versión se genera del tag en el pipeline.
* Publicado = inmutable.

### 🧪 Autoevaluación rápida

1. ¿Cómo se relaciona el tag de git con el de la imagen?
2. ¿Cómo se etiquetan los builds de desarrollo?
3. ¿Qué rompe la consistencia del versionado?

---

1. Deben coincidir: \`git tag v1.4.0\` produce y despliega \`app:v1.4.0\`.
2. Con el commit SHA o sufijos como \`-SNAPSHOT\`/\`-dev\`, para distinguirlos de releases.
3. Versionar a mano, sobreescribir versiones, o desplegar \`latest\` — todo lo que separa el identificador de la imagen del identificador del código.
`
export default content
