const content = `
## Módulo 9 — Argo CD

### 🎯 Objetivos de aprendizaje

* Conocer Argo CD y su arquitectura.
* Configurar aplicaciones (app of apps, sync, health).
* Usar Argo CD como controller GitOps de referencia.

### ❓ Problema real que resuelve

Necesitas un controller GitOps probado en producción: Argo CD vigila repos Git, aplica el estado deseado al cluster y muestra visualmente el estado de sincronización. Resuelve la operación diaria de GitOps: quién desplegó qué, si está sync, qué recursos creó cada app y cómo revertir.

### 💡 Analogía

Argo CD es el panel de control del aeropuerto: cada vuelo (aplicación) tiene un plan de vuelo (repo Git), un estado (synced/out-of-sync/progressing) y un historial. Los controladores (operadores) ven todo en una pantalla, aprueban despegues (sync) y pueden abortar (rollback) un vuelo problemático.

### 📖 Explicación técnica

* **Argo CD**: declarative GitOps tool for Kubernetes — controller + UI + CLI.
* Conceptos:
  * **Application**: define qué repo, qué path, qué cluster/namespace y cómo sincronizar.
  * **Sync**: proceso de aplicar el estado deseado al cluster.
  * **Sync status**: Synced / OutOfSync / Syncing; **Health status**: Healthy / Progressing / Degraded.
* Funcionalidades: auto-sync (aplicar automáticamente) o manual sync (aprobación humana), sync windows (ventanas), rollback a versiones anteriores, SSO/RBAC para quién puede operar, App of Apps (un app que define otras apps — gestión declarativa de todo).
* Integración con el pipeline: el CI actualiza Git; Argo CD aplica. El CI puede verificar el sync (\`argocd app wait\`) en el stage de verificación.
* Buenas prácticas: auto-sync con auto-prune (eliminar recursos sobrantes — con cuidado), health checks nativos, revisar el diff antes de sync manual en prod, separar entornos (apps por entorno).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Application definida (repo, path, cluster)
   ↓
Argo CD vigila el repo (poll/webhook)
   ↓
Detecta cambio → OutOfSync
   ↓
Sync (auto o manual) → kubectl apply / helm
   ↓
Health checks → Healthy
   ↓
Rollback = re-sync a un commit anterior
\`\`\`

### 🧪 Ejercicios

1. Instala Argo CD y crea tu primera Application (repo con manifests).
2. Configura auto-sync y observa el ciclo completo (commit → sync → healthy).
3. Practica: rollback a una revisión anterior y revisa el historial en la UI.

### ⚠️ Errores comunes

* Auto-sync con auto-prune sin revisión (recursos eliminados por sorpresa).
* Apps definidas a mano en la UI (deberían ser declarativas — app of apps).
* Ignorar el health status (synced pero degraded: sync sin salud).
* Credenciales de repos en Argo CD sin protección (nivel 11).

### 🔗 Conexión DevOps

Argo CD es la implementación de referencia del modelo GitOps: materializa pull (módulo 6), reconciliation (módulo 5) y observabilidad del sync (módulo 12). Se integra con CI (el pipeline actualiza Git) y con Helm (charts como fuentes).
`
export default content
