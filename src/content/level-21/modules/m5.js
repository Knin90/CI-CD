const content = `
## Módulo 5 — Cloud-native CI/CD

### 🎯 Objetivos de aprendizaje

* Definir CI/CD cloud-native y sus herramientas.
* Usar contenedores como runners (Tekton, Argo Workflows).
* Desplegar CI/CD dentro del cluster.

### ❓ Problema real que resuelve

El CI/CD tradicional usa servidores de build (VM). El CI/CD cloud-native ejecuta los pipelines dentro de Kubernetes: cada job es un contenedor (Tekton Tasks, Argo Workflows), los pipelines son recursos declarativos (CRDs) y todo se gestiona con las herramientas del cluster. Resuelve CI/CD para equipos Kubernetes-first que quieren una sola plataforma.

### 💡 Analogía

El CI/CD cloud-native es el restaurante que cocina con los ingredientes de su propio huerto: en vez de comprar platos preparados a un cáterin externo (CI/CD separado), la cocina (pipeline) usa sus propios cultivos (contenedores y cluster) — todo se produce en el mismo ecosistema, con las mismas herramientas (kubectl, manifests) y el mismo ciclo de vida (reconciliación — nivel 17).

### 📖 Explicación técnica

* **CI/CD cloud-native**: pipelines como recursos de Kubernetes.
* Herramientas:
  * **Tekton**: Tasks y Pipelines como CRDs; cada step es un contenedor; los results fluyen entre tasks.
  * **Argo Workflows**: workflows con DAGs (nivel 19), steps, parámetros; cada step en un contenedor.
  * **Jenkins X**: Jenkins sobre Kubernetes con preview environments.
* Características: pipelines declarativos (nivel 17), escalado nativo (los pods de build escalan — nivel 4), isolation por contenedor (nivel 4), artefactos en el cluster, integración con GitOps (nivel 17 — el deploy final suele ser un controller).
* Ventajas: una sola plataforma (cluster), reproducibilidad (contenedores), autoscaling nativo.
* Retos: complejidad operativa (gestionar el cluster del CI), recursos (los builds compiten con las apps), curva de aprendizaje.
* Buenas prácticas: empezar con un caso simple (un task de build), usar volumes/workspaces para compartir datos entre steps, monitorear los builds (nivel 18), combinar con GitOps (nivel 17) para el deploy.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Evento → webhook al cluster
   ↓
PipelineRun creado (CRD)
   ↓
Tasks ejecutan en pods (contenedores)
   ↓
Results/artifacts fluyen entre tasks
   ↓
Deploy (GitOps controller — nivel 17)
   ↓
Escalado y limpieza nativos
\`\`\`

### 🧪 Ejercicios

1. Crea un Tekton Task que construya tu app en un contenedor.
2. Encadena 2 Tasks (build → test) con results.
3. Compara el modelo cloud-native con tu plataforma actual: ¿qué ganas y qué pierdes?

### ⚠️ Errores comunes

* CI/CD cloud-native "por moda" (complejidad sin necesidad).
* Builds que compiten con las apps por recursos (quotas — nivel 14).
* Pipelines sin GitOps (el deploy vuelve a ser push — nivel 17).
* Cluster del CI sin monitoreo (nivel 18).

### 🔗 Conexión DevOps

El CI/CD cloud-native une Kubernetes (nivel 14), GitOps (nivel 17), contenedores (nivel 9) y runners efímeros (nivel 4). Es la evolución de CI/CD para el mundo Kubernetes-first.
`
export default content
