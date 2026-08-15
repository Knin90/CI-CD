const content = `
## Módulo 8 — Kubernetes GitOps

### 🎯 Objetivos de aprendizaje

* Aplicar GitOps específicamente a Kubernetes.
* Gestionar clusters y aplicaciones con GitOps.
* Combinar GitOps con Helm y Kustomize.

### ❓ Problema real que resuelve

Kubernetes es el entorno donde GitOps brilla: todo es declarativo (manifests), todo es controlable (CRDs/controllers), y el cluster puede auto-mantenerse. Kubernetes GitOps une ambas: los clusters y las apps se gestionan desde Git — aplicaciones, configs, namespaces e incluso la instalación de los controllers mismos.

### 💡 Analogía

Kubernetes GitOps es la gestión del rascacielos desde la sala de control central: cada piso (namespace) tiene su plano (manifests) y el sistema (controllers) mantiene cada piso según su plano. No hay "operarios" entrando a cada piso a ajustar cosas a mano (push): todo se gestiona desde los planos (Git).

### 📖 Explicación técnica

* Qué se gestiona con GitOps en Kubernetes: aplicaciones (Deployments, Services), configuración (ConfigMaps, Secrets cifrados), namespaces, policies (NetworkPolicies, Quotas), e incluso la instalación/upgrade de Argo CD o Flux (bootstrap).
* **Helm + GitOps**: los HelmReleases (Flux) o Apps con chart sources (Argo CD) se gestionan desde Git — el chart es la fuente, el repo define los values.
* **Kustomize + GitOps**: overlays por entorno en el repo; el controller aplica el overlay correcto.
* Gestión de clusters: GitOps "cluster-first" — los clusters se crean (Terraform — nivel 15) y luego se gestionan declarativamente desde repos (GitOps).
* **Secrets en GitOps**: no se versionan en claro — Sealed Secrets, SOPS, external-secrets + Vault (nivel 11/14) para que Git contenga solo el cifrado.
* Buenas prácticas: repo por entorno o monorepo con overlays, proteger ramas, auto-sync con revisión, observabilidad del sync (módulo 12).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Repo GitOps:
   ├── cluster/ (namespaces, policies, controllers)
   └── apps/
       ├── app1/ (kustomize o helm values)
       └── app2/ ...
   ↓
Controllers (Argo CD/Flux) aplican y mantienen
   ↓
Cluster = Git (siempre)
\`\`\`

### 🧪 Ejercicios

1. Gestiona una app con GitOps usando Kustomize (overlays dev/prod).
2. Gestiona un release de Helm con GitOps (values en el repo).
3. Versiona los secrets de forma segura (SOPS/Sealed Secrets) en el repo gitops.

### ⚠️ Errores comunes

* Secrets en claro en el repo gitops (la fuga más típica de GitOps).
* Gestionar las apps con GitOps pero los namespaces/policies a mano.
* Overlays por entorno mal estructurados (drift entre entornos).
* Mezclar herramientas: manifest a mano, Helm a medias, kustomize en otro lado.

### 🔗 Conexión DevOps

Kubernetes GitOps integra el nivel 14 (Kubernetes) con el modelo GitOps: conecta Helm (módulo 8 de nivel 14), Kustomize, secrets (nivel 11) y los controllers (módulos 9/10).
`
export default content
