const content = `
## Módulo 11 — Kubernetes deployment

### 🎯 Objetivos de aprendizaje

* Desplegar en clusters cloud (AKS/EKS/GKE) desde el pipeline.
* Usar credenciales cloud para el cluster.
* Integrar el deploy a Kubernetes con GitOps.

### ❓ Problema real que resuelve

Los clusters cloud (AKS, EKS, GKE) son el destino moderno de las apps en contenedores. El pipeline debe: autenticarse contra el cluster (credenciales cloud — módulo 8), actualizar la imagen (nivel 14), aplicar manifests/charts y verificar el rollout — todo desde CI/CD, con la seguridad de las credenciales cloud en lugar de kubeconfigs estáticos.

### 💡 Analogía

El Kubernetes deployment en cloud es la entrega de mercancía al puerto automatizado: el barco (imagen) llega al registro (registry), el sistema aduanero (credenciales cloud) verifica la identidad del transportista (pipeline) con su carné (OIDC) y autoriza la descarga (apply al cluster) en la zona (namespace) correspondiente — sin que el transportista tenga una llave maestra del puerto (sin kubeconfigs todopoderosos).

### 📖 Explicación técnica

* **Clusters cloud**: AKS (Azure), EKS (AWS), GKE (GCP) — Kubernetes gestionado.
* Autenticación desde el pipeline:
  * **Cloud-native**: OIDC federado (módulo 8) — el pipeline asume un rol y obtiene credenciales del cluster (\`aws eks update-kubeconfig\`, \`gcloud container clusters get-credentials\`, az aks get-credentials) — sin kubeconfig estático versionado.
  * **kubeconfig/Service Account**: para otros escenarios (nivel 14) — guardado como secret (nivel 11).
* Deploy: actualizar la imagen en manifests/Helm (nivel 14) → apply (kubectl/helm) → \`kubectl rollout status\` + verificación (nivel 20).
* **GitOps** (nivel 17): el flujo más maduro — el pipeline actualiza el repo GitOps y Argo CD/Flux aplica (pull); el pipeline verifica el estado de sync.
* Entornos: namespaces/clusters por entorno (nivel 14), con secrets y quotas por entorno.
* Buenas prácticas: credenciales por entorno (el pipeline de dev no toca el cluster de prod — nivel 12), verificación del rollout, imagen inmutable + digest (nivel 9), RBAC mínimo para el deploy (nivel 12).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline (OIDC) → credenciales del cluster
   ↓
Actualiza imagen (manifests/Helm o repo GitOps)
   ↓
kubectl apply / helm upgrade (namespace del entorno)
   ↓
Rollout status + health checks
   ↓
GitOps: controller aplica + verifica sync (nivel 17)
\`\`\`

### 🧪 Ejercicios

1. Configura autenticación cloud-native a tu cluster (OIDC, sin kubeconfig estático).
2. Despliega una app a un cluster cloud desde el pipeline con verificación del rollout.
3. Migra el deploy a GitOps: el pipeline actualiza el repo, el controller aplica.

### ⚠️ Errores comunes

* kubeconfigs estáticos con permisos de cluster-admin en el pipeline (nivel 11/12).
* Credenciales del cluster de prod accesibles desde jobs de dev (nivel 12).
* Deploy sin rollout status ni verificación (el deploy "termina" antes de estar listo).
* Ignorar GitOps: se sigue empujando directo al cluster (nivel 17).

### 🔗 Conexión DevOps

El Kubernetes deployment en cloud une Kubernetes (nivel 14), credenciales OIDC (módulo 8), GitOps (nivel 17) y entornos (nivel 12). Es el destino más común del despliegue moderno.
`
export default content
