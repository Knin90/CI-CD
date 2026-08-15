const content = `
## Módulo 10 — Kubernetes deployment failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos de despliegues en Kubernetes.
* Investigar pods, deployments y eventos.
* Usar logs y estado para encontrar la causa raíz.

### ❓ Problema real que resuelve

El deploy "funciona" pero los pods no arrancan: CrashLoopBackOff, ImagePullBackOff, pending sin fin, o el rollout no avanza. Kubernetes es declarativo: el fallo no es un stack trace, es un estado. Diagnosticar despliegues — eventos, pods, recursos, imágenes — requiere leer el estado y los logs en orden.

### 💡 Analogía

El despliegue en Kubernetes es el edificio de apartamentos: el manifiesto es el plano, el Deployment el administrador del edificio, y los pods los apartamentos. Si un apartamento no se entrega (pod pendiente o en crash), el administrador deja una nota (eventos) y el estado en el tablero (kubectl get pods). El diagnóstico es leer esas notas antes de llamar al arquitecto (tu código).

### 📖 Explicación técnica

* Estado de los pods y su significado:
  * \`CrashLoopBackOff\`: el contenedor arranca y muere en bucle — logs de la app, entrypoint, healthcheck que falla (módulo 8 y 11 de nivel 14).
  * \`ImagePullBackOff\`: no puede bajar la imagen — registry, tag, pull secret (módulo 9).
  * \`Pending\`: no se programa — recursos, quotas, taints/tolerations, storage.
  * \`ContainerCreating\` eterno: storage, config, red.
  * Rollout estancado: strategy, readiness probes, budget (nivel 14).
* Método (en orden): \`kubectl get pods\` → \`kubectl describe pod\` (eventos y condiciones) → \`kubectl logs\` del contenedor → \`kubectl rollout status\` → revisa Deployment/Service/Ingress (labels, selectors, puertos).
* Preguntas clave: ¿la imagen existe y es accesible? ¿el pod tiene recursos? ¿la readiness probe falla? ¿los selectors coinciden?
* Buenas prácticas: rollout status en el pipeline (nivel 14), healthchecks correctos (nivel 14), limites de recursos, y observabilidad (nivel 18).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy aplicado (kubectl apply / helm)
   ↓
Rollout inicia → pods nuevos
   ↓
¿Pending? recursos / taints / storage
   ↓
¿ImagePullBackOff? registry / tag / secrets
   ↓
¿CrashLoopBackOff? logs de la app / probes
   ↓
describe + logs + eventos
   ↓
Corrige el manifiesto o la app
\`\`\`

### 🧪 Ejercicios

1. Despliega una imagen con un tag inexistente y diagnostica ImagePullBackOff.
2. Haz que una readiness probe falle y observa el rollout estancado.
3. Usa \`kubectl describe pod\` para investigar un pod en CrashLoopBackOff.

### ⚠️ Errores comunes

* Leer solo el log del contenedor (los eventos del pod explican más).
* Selectors/labels que no coinciden (el Service apunta a pods que no existen).
* Healthchecks demasiado estrictos (la app "funciona" pero nunca pasa la probe).
* Sin límites de recursos (pods pending por falta de CPU/memoria).

### 🔗 Conexión DevOps

Kubernetes conecta con deployment strategies (nivel 13), CI/CD con Kubernetes (nivel 14), registries (módulo 9), Docker (módulo 8) y observabilidad (nivel 18). Es el troubleshooting declarativo: el estado es la verdad, y los eventos cuentan la historia.
`
export default content
