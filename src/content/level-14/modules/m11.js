const content = `
## Módulo 11 — Health checks

### 🎯 Objetivos de aprendizaje

* Definir liveness y readiness probes.
* Configurar probes en los Deployments.
* Entender cómo las probes protegen el tráfico y la recuperación.

### ❓ Problema real que resuelve

Un pod "corriendo" no significa que funcione: puede estar arrancando, atascado en un deadlock o respondiendo errores. Las health checks (probes) le dicen a Kubernetes cuándo un pod está vivo (liveness) y cuándo está listo para recibir tráfico (readiness) — protegiendo a los usuarios de pods rotos y permitiendo la auto-recuperación.

### 💡 Analogía

Las probes son el parte médico del jugador: el entrenador (Kubernetes) pregunta "¿está vivo?" (liveness — que no esté inconsciente) y "¿está en condiciones de jugar?" (readiness — que no se desmaye en el campo). Un jugador vivo pero con fiebre no debe saltar al campo — y un jugador que se desmaya debe ser retirado y reemplazado.

### 📖 Explicación técnica

* **Liveness probe**: ¿está vivo el proceso? Si falla, Kubernetes **reinicia** el contenedor (recovery de deadlocks).
* **Readiness probe**: ¿puede recibir tráfico? Si falla, el pod se **retira del Service** (no recibe tráfico) pero no se reinicia.
* **Startup probe**: ¿arrancó? Para apps con arranque lento — evita que el liveness mate al pod durante el boot.
* Configuración: \`httpGet\` (GET a un endpoint), \`tcpSocket\`, \`exec\` (comando). Con \`initialDelaySeconds\`, \`periodSeconds\`, \`failureThreshold\`, \`timeoutSeconds\`.
* El endpoint de health debe reflejar el estado real (no solo "el servidor existe"): DB reachable, dependencias listas.
* En CI/CD: las probes determinan el éxito del rollout (módulo 10): el pipeline espera \`rollout status\`, que depende de que los pods pasen readiness.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pod arranca → startup probe
   ↓
Readiness OK → pod entra al Service (recibe tráfico)
   ↓
Readiness FAIL → pod fuera del Service (sin tráfico, sin reiniciar)
   ↓
Liveness FAIL → contenedor reiniciado
   ↓
Rollout espera readiness de pods nuevos
\`\`\`

### 🧪 Ejercicios

1. Añade liveness y readiness probes a tu Deployment (endpoint real de salud).
2. Simula un fallo (endpoint que devuelve 500) y observa: pod fuera del Service / reinicio.
3. Configura startup probe para una app con arranque lento y verifica que no la reinicie en loop.

### ⚠️ Errores comunes

* Probes que solo comprueban "el puerto está abierto" (no verifica la app).
* Readiness que depende de cosas que no deben bloquear tráfico (cron jobs externos).
* Liveness demasiado agresivo: reinicia pods durante arranques normales (CrashLoopBackOff).
* Sin probes: los pods rotos "sanan" el rollout y el Service reparte tráfico a instancias muertas.

### 🔗 Conexión DevOps

Las health checks son el corazón del despliegue en Kubernetes: determinan rolling updates (módulo 10), la exposición del Service (módulo 5) y la verificación de despliegue (nivel 13). Sin probes, la automatización de Kubernetes es ciega.
`
export default content
