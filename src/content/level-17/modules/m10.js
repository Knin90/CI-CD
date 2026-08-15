const content = `
## Módulo 10 — Flux

### 🎯 Objetivos de aprendizaje

* Conocer Flux y su arquitectura de componentes.
* Comparar Flux con Argo CD.
* Usar GitOps Toolkit y Kustomize/Helm con Flux.

### ❓ Problema real que resuelve

No todos quieren la UI de Argo CD: Flux es el controller GitOps "toolkit" — componentes pequeños y declarativos que hacen GitOps de forma nativa en Kubernetes (todo es un CRD, todo es Git). Resuelve el mismo problema (Git como fuente de verdad) con una arquitectura más modular y 100% declarativa.

### 💡 Analogía

Flux es el sistema de riego automático del invernadero: sensores (controllers) vigilan cada zona (fuentes) y aplican riego (reconciliación) según el plan (Git). No hay panel central con botones (como Argo CD); el plan está escrito y el sistema lo ejecuta — si quieres cambiar el riego, cambias el plan (Git).

### 📖 Explicación técnica

* **Flux (GitOps Toolkit)**: familia de controllers Kubernetes-native: source-controller (vigila Git/OCI/Helm repos), kustomize-controller (aplica Kustomize), helm-controller (gestiona releases de Helm), notification-controller (alertas).
* Conceptos: **GitRepository** (fuente), **Kustomization** (qué aplicar y cómo), **HelmRelease** (releases), **Alert/Provider** (notificaciones).
* Todo es declarativo: la configuración de Flux misma vive en Git (bootstrap) — Git gestiona GitOps.
* Dependencia automática: Flux detecta imágenes nuevas (ImagePolicy/ImageUpdateAutomation) y las commitea al repo — "automated image updates".
* Comparación con Argo CD: Argo CD = UI + app-centric + SSO integrado; Flux = más minimalista, 100% declarativo, integración nativa con Git en el cluster, preferido por equipos "todo en Git".
* Buenas prácticas: bootstrap con \`flux bootstrap github\`, separar clusters por entornos, alertas con notification-controller, auto-update de imágenes con policies.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
GitRepository (fuente Git)
   ↓
source-controller: descarga y verifica
   ↓
Kustomization / HelmRelease (deseado)
   ↓
kustomize/helm-controller: aplica al cluster
   ↓
notification-controller: estado + alertas
   ↓
ImagePolicy: detecta imágenes nuevas → commit
\`\`\`

### 🧪 Ejercicios

1. Bootstrap Flux en un cluster de pruebas (\`flux bootstrap\`).
2. Define una Kustomization que aplique tus manifests desde un repo.
3. Configura un Alert para notificar el estado de la reconciliación.

### ⚠️ Errores comunes

* Configurar Flux a mano cuando el bootstrap lo hace declarativo.
* Mezclar Flux y Argo CD en el mismo cluster sin necesidad (dos modelos).
* Ignorar las alertas (el notification-controller está para eso).
* Auto-update de imágenes sin policies claras (rollouts no deseados).

### 🔗 Conexión DevOps

Flux es la alternativa declarativa de GitOps: materializa pull (módulo 6), reconciliation (módulo 5) y se integra con Helm (nivel 14) y la observabilidad (módulo 12).
`
export default content
