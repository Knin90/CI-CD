const content = `
## Módulo 10 — Container registries

### 🎯 Objetivos de aprendizaje

* Usar container registries cloud en el pipeline.
* Publicar y consumir imágenes desde el registry.
* Configurar autenticación y políticas del registry.

### ❓ Problema real que resuelve

Las imágenes construidas en CI deben vivir en un lugar centralizado, privado y accesible por los despliegues: el container registry. Los registries cloud (ECR, GCR/Artifact Registry, ACR, GHCR) ofrecen almacenamiento seguro, autenticación integrada con el cloud, scanning (nivel 9) y políticas — la pieza entre el build y el deploy.

### 💡 Analogía

El container registry es el almacén central del hospital: la farmacia (build) produce los medicamentos (imágenes) y los entrega al almacén (registry); los quirófanos (deploys) los retiran con la receta correcta (autenticación). El almacén centraliza, protege y controla — nadie usa un medicamento sin pasar por el almacén.

### 📖 Explicación técnica

* **Container registry**: almacén de imágenes de contenedores con versionado (tags/digests — nivel 9), autenticación y políticas.
* Registries cloud: AWS ECR, GCP Artifact Registry, Azure ACR, GitHub Container Registry (GHCR), Docker Hub.
* En el pipeline:
  * **Push**: build (nivel 9) → login (credenciales — módulo 8/nivel 11) → push con tag inmutable.
  * **Pull**: los despliegues (Kubernetes — nivel 14, servicios — módulo 9) hacen pull con credenciales (imagePullSecrets — nivel 14).
* Características: scanning de vulnerabilidades (nivel 9 — integrado o Trivy), políticas de inmutabilidad (no sobrescribir tags), retención (nivel 8), replicación entre regiones, audit logs.
* Autenticación: OIDC/IRSA (módulo 8) para push desde CI; imagePullSecrets o IAM para pull desde el cluster.
* Buenas prácticas: tags inmutables + digest (nivel 9), escaneo antes del deploy (nivel 9/10), políticas de retención por entorno (nivel 8), registries privados (no públicos).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build → imagen (tag sha-abc123)
   ↓
Login al registry (OIDC/credenciales)
   ↓
Push: myregistry/app:sha-abc123
   ↓
Scan (vulnerabilidades)
   ↓
Deploy: cluster hace pull (credenciales)
   ↓
Políticas: inmutabilidad + retención
\`\`\`

### 🧪 Ejercicios

1. Publica tu imagen a un registry cloud desde el pipeline.
2. Configura imagePullSecrets (o IAM) para que el cluster haga pull.
3. Activa el scanning y la inmutabilidad de tags en tu registry.

### ⚠️ Errores comunes

* Registries públicos con imágenes internas (fuga — nivel 10).
* Tags mutables (latest) sin control (nivel 9).
* Credenciales del registry en el repo (nivel 11).
* Deploy sin scanning de la imagen (nivel 9 — el scan debe preceder al deploy).

### 🔗 Conexión DevOps

Los container registries conectan Docker (nivel 9), artifacts (nivel 8), credenciales (módulo 8) y Kubernetes (nivel 14). Son el puente inmutable entre el build y el deploy.
`
export default content
