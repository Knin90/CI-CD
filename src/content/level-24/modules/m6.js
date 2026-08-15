const content = `
## Módulo 6 — Fase 5: Kubernetes y el pipeline de despliegue

### 🎯 Objetivos de aprendizaje

* Desplegar la app en Kubernetes desde el pipeline.
* Usar manifests/Helm con despliegues verificados.
* Aplicar deployment strategies (rolling, canary).

### ❓ Problema real que resuelve

La app está en el registry y la infra lista; ahora hay que desplegarla en Kubernetes de forma reproducible y verificada (niveles 13-14). La Fase 5 crea los manifests/Helm charts y el pipeline de despliegue: apply → rollout status → verificación (nivel 20 de 22), con estrategias seguras (rolling update, canary — nivel 13) y rollback a mano (nivel 18 de 23).

### 💡 Analogía

La Fase 5 es la mudanza al edificio (cluster): los inquilinos (pods) entran en sus apartamentos (Deployments) según el contrato (manifests), y el administrador (pipeline) espera a que cada uno confirme que está cómodo (readiness probes) antes de seguir. Si un inquilino no está bien, se desaloja (rollback) y se mantiene el edificio estable (rolling update).

### 📖 Explicación técnica

* **Manifests/Helm** (nivel 14): Deployment, Service, Ingress, ConfigMap/Secret (nivel 11) — versionados en el repo (nivel 17). Helm charts con values por entorno (nivel 14).
* **Pipeline de despliegue** (nivel 14 y 21): autenticación al cluster (OIDC/kubeconfig — nivel 21) → \`kubectl apply\` o \`helm upgrade --install\` → \`kubectl rollout status\` (esperar y verificar — nivel 20 de 22) → healthchecks y smoke tests (nivel 20).
* **Estrategias** (nivel 13): rolling update (sin downtime — nivel 14), canary/blue-green para riesgo controlado, con \`maxUnavailable\`/readiness correctos (nivel 14).
* **Rollback** (módulo 18 de 23): \`rollout undo\` o Helm rollback, con la versión anterior siempre disponible (módulo 8 de 23).
* Buenas prácticas: tags inmutables en los manifests (nivel 14), entornos aislados por namespace (nivel 14 y módulo 10 de 23), y verificación post-deploy con métricas (nivel 18).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Imagen inmutable del registry
   ↓
Pipeline autentica al cluster (OIDC)
   ↓
apply/helm upgrade (manifests versionados)
   ↓
rollout status + readiness probes
   ↓
Verificación: healthchecks + smoke tests
   ↓
¿Falla? → rollback (undo) automático/manual
   ↓
Nueva versión desplegada y verificada
\`\`\`

### 🧪 Ejercicios

1. Escribe los manifests/Helm chart de tu app (Deployment, Service, Ingress).
2. Crea el pipeline de deploy: apply → rollout status → verificación.
3. Practica un deploy con canary o rolling y un rollback.

### ⚠️ Errores comunes

* Apply sin esperar el rollout (el deploy "verde" pero la app no está lista — nivel 14).
* Tags \`latest\` en los manifests (no trazable — nivel 14).
* Sin verificación post-deploy (nivel 20 de 22).
* Estrategias sin probes correctas (el rolling corta el servicio — nivel 14).

### 🔗 Conexión DevOps

La Fase 5 conecta con Kubernetes (nivel 14), deployment strategies (nivel 13), CI/CD cloud (nivel 21), verificación (nivel 20) y rollback (nivel 23). Es donde la app llega a producción: desplegada, verificada y reversible.
`
export default content
