const content = `
## Módulo 6 — Container registries

### 🎯 Objetivos de aprendizaje

* Explicar qué es un registry de contenedores y su modelo (repos, tags, digests).
* Publicar y extraer imágenes desde el pipeline.
* Aplicar inmutabilidad, escaneo y políticas de retención.

### ❓ Problema real que resuelve

Las imágenes de contenedor son el artefacto de despliegue moderno: el registry las almacena, versiona y distribuye. Sin un registry bien gestionado: imágenes sin versionar, sobreescrituras, imágenes vulnerables en producción y sin trazabilidad. El container registry profesional combina versionado por digest, inmutabilidad y escaneo integrado.

### 💡 Analogía

El container registry es el depósito de la flota de vehículos: cada modelo (repo), cada versión (tag), cada matrícula exacta (digest). El taller (pipeline) entrega los vehículos nuevos y los retira cuando toca (retención). Sin depósito organizado, no sabes qué flota tienes ni cuál está en la calle.

### 📖 Explicación técnica

Modelo de un registry:

* **Repositorio** (\`registry/app\`): colección de imágenes del mismo producto.
* **Tag** (\`v1.4.0\`, \`latest\`): referencia a una imagen.
* **Digest** (\`sha256:...\`): identidad criptográfica del contenido (inmutable).
* **Manifest**: describe los layers y la configuración de la imagen.

Prácticas en el pipeline:

* **Publicar** con tag semver + digest (\`docker push registry/app:v1.4.0\`).
* **Extraer** con digest exacto para despliegues reproducibles.
* **Inmutabilidad**: políticas de "tag inmutable" (no sobreescribir).
* **Escaneo**: el registry escanea imágenes (Trivy, Clair) o el pipeline lo hace antes del push (ver nivel Security).
* **Retención**: limpieza de imágenes antiguas y sin tag.
* **Autenticación**: credenciales del registry como secretos (o OIDC).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline: docker build → imagen local
  │
  ▼
docker tag app:build → registry/app:v1.4.0
  │
  ▼
docker push → registry (manifest + layers + digest)
  │
  ▼
Escaneo (Trivy/Clair) → ¿vulnerabilidades críticas? → gate
  │
  ▼
Despliegues: pull con digest exacto (reproducible)
  │
  ▼
Retención: purga de viejos y sin tag
\`\`\`

### 💻 Ejemplo básico

Publicar y desplegar con digest:

\`\`\`bash
# CI: construir, etiquetar y publicar
docker build -t registry/app:v1.4.0 .
docker push registry/app:v1.4.0
digest=\$(docker inspect registry/app:v1.4.0 --format='{{index .RepoDigests 0}}')
echo "digest=\$digest" >> "\$GITHUB_OUTPUT"

# CD: desplegar con el digest exacto
kubectl set image deployment/app app=registry/app:v1.4.0@\$digest
\`\`\`

### 🏢 Caso de uso profesional

Una plataforma desplegada en Kubernetes usa ECR: cada pipeline publica la imagen con tag semver y guarda el digest; el despliegue referencia el digest. Las políticas de inmutabilidad impiden sobreescribir tags de release, y el escaneo integrado bloquea imágenes con vulnerabilidades críticas. Ante un incidente, revertir es desplegar el digest anterior — reproducible al 100%.

### ⚠️ Errores comunes

* Desplegar \`latest\` (mutable, no reproducible).
* Tags sobreescritos (inmutabilidad rota).
* Imágenes sin escanear antes de producción.
* Credenciales del registry en el código.
* Retención infinita: el registry se llena de capas huérfanas.

### 📋 Lo que debes recordar

* Repo + tag + digest: la identidad completa de la imagen.
* Publica con semver; despliega con digest.
* Inmutabilidad, escaneo y retención: políticas del registry.
* Autenticación con secretos u OIDC.

### 🧪 Autoevaluación rápida

1. ¿Qué identifica de forma única a una imagen?
2. ¿Por qué se despliega con digest en vez de \`latest\`?
3. ¿Qué políticas debe tener un registry profesional?

---

1. El digest (\`sha256:...\`): identidad criptográfica e inmutable del contenido.
2. Por reproducibilidad y trazabilidad: el digest garantiza exactamente qué imagen se desplegó; \`latest\` cambia.
3. Inmutabilidad de tags de release, escaneo de vulnerabilidades y retención/limpieza de imágenes.
`
export default content
