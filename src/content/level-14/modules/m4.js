const content = `
## Módulo 4 — Deployments

### 🎯 Objetivos de aprendizaje

* Definir el recurso Deployment y su papel.
* Configurar réplicas, estrategia de actualización y plantilla de pod.
* Entender la relación Deployment → ReplicaSet → Pod.

### ❓ Problema real que resuelve

Correr pods sueltos no sirve: si un pod muere, nadie lo reemplaza, y actualizar la versión sería manual. El Deployment gestiona un conjunto de pods idénticos: garantiza el número de réplicas deseado, realiza actualizaciones controladas (rolling) y permite revertir. Es la unidad básica de aplicaciones sin estado en Kubernetes.

### 💡 Analogía

El Deployment es el jefe de sección de la fábrica: tiene una plantilla (replicas + pod template) y se asegura de que siempre haya el número de operarios acordado. Si uno se va (pod muere), contrata otro al instante (ReplicaSet crea uno nuevo). Y cuando hay que cambiar el uniforme (nueva versión), lo hace por tandas, sin parar la producción.

### 📖 Explicación técnica

* **Deployment**: recurso declarativo que gestiona ReplicaSets, que a su vez gestionan Pods.
* Jerarquía: Deployment (deseado + estrategia) → ReplicaSet (contador de réplicas) → Pods (unidades de ejecución).
* Campos clave del spec: \`replicas\`, \`selector\` (labels), \`template\` (pod spec: imagen, puertos, resources, probes), \`strategy\` (RollingUpdate/Recreate), \`revisionHistoryLimit\`.
* Actualización: al cambiar la plantilla (nueva imagen), el Deployment crea un ReplicaSet nuevo y escala gradualmente (módulo 10 — rolling updates).
* **Rollback**: \`kubectl rollout undo deployment/app\` vuelve al ReplicaSet anterior.
* El Deployment se auto-repara: si un pod muere, crea otro para mantener \`replicas\`.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
kubectl apply -f deployment.yaml
   ↓
Deployment controller crea ReplicaSet
   ↓
ReplicaSet crea los Pods (según template)
   ↓
Pod muere → ReplicaSet crea otro (self-healing)
   ↓
Nueva imagen → nuevo ReplicaSet + rolling (módulo 10)
\`\`\`

### 🧪 Ejercicios

1. Crea un Deployment de 3 réplicas y mata un pod: observa cómo se reemplaza.
2. Cambia la imagen y observa el rolling update entre ReplicaSets.
3. Practica \`kubectl rollout undo\` para volver a la versión anterior.

### ⚠️ Errores comunes

* Pods creados con \`kubectl run\` sueltos (sin Deployment, sin auto-reparación).
* Cambiar la imagen con \`kubectl edit\` sin versionarlo (drift).
* Sin recursos/limits ni probes: pods que "corren" pero no sirven.
* Confundir Deployment con Service (el primero gestiona pods; el segundo los expone).

### 🔗 Conexión DevOps

El Deployment es donde el pipeline "aterriza" la imagen en Kubernetes: conecta image updates (módulo 9), rolling updates (módulo 10), health checks (módulo 11) y rollbacks (módulo 12).
`
export default content
