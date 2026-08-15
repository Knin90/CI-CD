const content = `
## Módulo 12 — Rollbacks

### 🎯 Objetivos de aprendizaje

* Ejecutar rollbacks en Kubernetes con rollout undo.
* Entender el historial de revisiones del Deployment.
* Automatizar el rollback ante health check fallido.

### ❓ Problema real que resuelve

Cuando un despliegue falla (pods en CrashLoop, error rate alto), hay que volver a la versión anterior rápido. Kubernetes guarda el historial de revisiones del Deployment, así que el rollback es declarativo: \`kubectl rollout undo\` vuelve a la plantilla anterior y dispara un nuevo rolling update — sin reconstruir nada.

### 💡 Analogía

El rollout undo es la función "deshacer" del editor de texto: el documento (Deployment) guarda el historial de versiones, y un atajo deshace el último cambio — volviendo exactamente al texto anterior. No tienes que reescribir el documento; solo deshacer.

### 📖 Explicación técnica

* **Historial de revisiones**: cada cambio en la plantilla del Deployment crea una revisión nueva (\`kubectl rollout history deployment/app\`).
* **Rollback**: \`kubectl rollout undo deployment/app\` (última revisión) o \`kubectl rollout undo deployment/app --to-revision=N\` (revisión específica).
* Internamente: el Deployment vuelve al ReplicaSet de la revisión anterior y hace rolling update hacia esa plantilla.
* Configuración: \`revisionHistoryLimit\` (cuántas revisiones se guardan — default 10).
* Automatización en CI/CD: el pipeline verifica el rollout (módulo 1); si los health checks fallan o las métricas post-deploy son malas, dispara \`kubectl rollout undo\` (o Helm rollback) automáticamente o alerta para decisión humana.
* Combinar con: GitOps (módulo 14) — en GitOps, "rollback" es revertir el cambio en Git; el controller reconcilia.
* Limitación: si la causa del fallo es la configuración del entorno (secret, config), revertir el Deployment no basta.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy v2 → health checks FAIL
   ↓
kubectl rollout undo deployment/app
   ↓
Deployment vuelve a la revisión anterior (v1)
   ↓
Rolling update hacia v1 (ReplicaSet viejo escala)
   ↓
v1 sana → verificación
\`\`\`

### 🧪 Ejercicios

1. Despliega una versión rota y haz \`kubectl rollout undo\`; observa el historial.
2. Configura \`revisionHistoryLimit\` y explica qué pasa con las revisiones viejas.
3. Automatiza: verificación post-deploy que dispare rollback si el error rate sube.

### ⚠️ Errores comunes

* Rollback manual lento (cada minuto de fallo es tráfico roto).
* Revertir el Deployment pero no la configuración (secret/ConfigMap roto).
* revisionHistoryLimit = 0: sin historial, sin rollback posible.
* Confundir rollback de Deployment con restaurar datos (migraciones — nivel 13).

### 🔗 Conexión DevOps

Los rollbacks de Kubernetes materializan el rollback del nivel 13: conectan Deployments (módulo 4), health checks (módulo 11), image updates (módulo 9) y la automatización del pipeline. Un rollback rápido y probado es la red de seguridad del despliegue continuo.
`
export default content
