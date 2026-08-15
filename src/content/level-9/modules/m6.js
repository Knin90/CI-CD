const content = `
## Módulo 6 — Container registry

### 🎯 Objetivos de aprendizaje

* Explicar el papel del container registry en el pipeline.
* Autenticarse y publicar/extraer imágenes.
* Aplicar políticas: inmutabilidad, escaneo, retención.

### ❓ Problema real que resuelve

El container registry es el almacén central de imágenes: el pipeline publica ahí el artefacto y los entornos lo extraen para desplegar. Un registry bien gestionado (con autenticación, inmutabilidad, escaneo y retención) es la infraestructura que conecta CI con CD de forma confiable y auditable.

### 💡 Analogía

El container registry es el depósito central de la flota: los talleres (pipelines) entregan los vehículos (imágenes) al depósito con matrícula (tag) y número de chasis (digest); los conductores (entornos) los retiran del depósito con la orden exacta (referencia). El depósito controla quién entra (auth), qué se acepta (escaneo) y qué se retira (retención).

### 📖 Explicación técnica

Opciones de registry:

* **Cloud**: ECR (AWS), ACR (Azure), GCR/Artifact Registry (GCP).
* **Gestionado por plataforma**: GitHub Packages, GitLab Container Registry.
* **Self-hosted**: Harbor, Nexus, Quay, registry propio.

Operaciones en el pipeline:

* **Autenticación**: \`docker login\` con credenciales de corta vida (OIDC) o token como secreto.
* **Publicar**: \`docker push\` tras build + scan + firma.
* **Extraer**: los entornos \`docker pull\` con digest para reproducibilidad.

Políticas:

* **Inmutabilidad**: tags de release no sobreescribibles.
* **Escaneo**: integrado (Clair, Trivy) o del pipeline antes del push.
* **Retención**: limpieza de imágenes viejas y sin tag.
* **Auditoría**: registro de quién publicó/extrajo qué.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
CI: docker build → scan → firma
  │
  ▼
docker login (OIDC/token) → docker push registry/app:v1.4.0
  │
  ▼
Registry: almacena manifest + layers + digest
  ├── Escaneo continuo de vulnerabilidades
  ├── Política: v* inmutable
  └── Retención: limpia viejos y sin tag
  │
  ▼
CD: docker pull registry/app:v1.4.0@sha256:... → deploy
\`\`\`

### 💻 Ejemplo básico

Push con OIDC (GitHub Actions):

\`\`\`yaml
- name: Login a ECR
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789012:role/ci-push
    aws-region: us-east-1
- run: |
    aws ecr get-login-password | docker login --username AWS --password-stdin \$AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com
    docker push \$AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/app:v1.4.0
\`\`\`

### 🏢 Caso de uso profesional

Una plataforma con ECR: el pipeline autentica con OIDC (sin claves estáticas), publica imágenes escaneadas y firmadas, y el registry aplica inmutabilidad (las \`v*\` no se sobreescriben) y retención (las imágenes sin tag expiran en 7 días). Un auditor puede ver el historial completo de imágenes y sus orígenes.

### ⚠️ Errores comunes

* Claves estáticas de registry en el repo.
* Publicar sin escanear.
* Tags sobreescritos.
* Sin retención (almacenamiento descontrolado).
* Extraer \`latest\` (no reproducible).

### 📋 Lo que debes recordar

* El registry conecta CI (push) con CD (pull).
* Autenticación con OIDC o tokens como secretos.
* Políticas: inmutabilidad, escaneo, retención, auditoría.
* Los despliegues extraen con digest.

### 🧪 Autoevaluación rápida

1. ¿Qué papel juega el registry en el pipeline?
2. ¿Cómo se autentica el pipeline contra el registry?
3. ¿Qué políticas debe tener el registry?

---

1. Almacenar y distribuir las imágenes: CI publica, CD extrae para desplegar.
2. Con OIDC (credenciales de corta vida) o con tokens inyectados como secretos.
3. Inmutabilidad de releases, escaneo de vulnerabilidades, retención/limpieza y auditoría de accesos.
`
export default content
