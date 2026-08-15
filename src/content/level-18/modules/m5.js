const content = `
## Módulo 5 — Health checks

### 🎯 Objetivos de aprendizaje

* Definir health checks externos e internos.
* Verificar disponibilidad y salud real de los servicios.
* Integrar health checks en el pipeline y las alertas.

### ❓ Problema real que resuelve

El servicio puede estar "arriba" (el puerto responde) pero no sano (la BD está caída, la config rota). Los health checks verifican la salud real desde dentro (probes) y desde fuera (sondas externas): el pipeline los usa para validar despliegues y el monitoreo los usa para alertar — convirtiendo "responde" en "funciona".

### 💡 Analogía

Los health checks son la llamada de control del centro de salud: no basta con que el paciente "esté en casa" (puerto abierto); la enfermera pregunta "¿puede levantarse? ¿puede hablar?" (endpoint de salud que verifica dependencias). Un paciente en casa pero inconsciente no está sano — y nadie debería darle de alta (tráfico).

### 📖 Explicación técnica

* **Health check interno** (probes): liveness/readiness en Kubernetes (nivel 14), verifican el proceso y sus dependencias.
* **Health check externo** (synthetic): sondas desde fuera (Uptime Robot, CloudWatch Synthetics, Grafana k6) que hacen peticiones reales al endpoint público y verifican la respuesta.
* Endpoints típicos: \`/health\` (básico), \`/ready\` (dependencias listas), \`/live\` (proceso vivo) — el health endpoint debe reflejar el estado real (BD, cache, dependencias críticas) sin exponer datos internos.
* En CI/CD: los health checks validan el deploy (nivel 13 — verificación) y bloquean el tráfico (readiness en K8s — nivel 14).
* En monitoreo: sondas externas alertan si el servicio deja de responder desde la perspectiva del usuario (no solo del cluster).
* Buenas prácticas: endpoints de salud con verificación real de dependencias, distinto nivel de detalle (interno vs público), health checks como parte de los SLOs (módulo 9).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Probe interna: GET /ready → ¿BD OK? ¿cache OK?
   ↓
¿OK? → pod recibe tráfico (readiness)
   ↓
Sonda externa: GET /health desde fuera
   ↓
¿OK? → todo bien   ¿Fail? → alerta de disponibilidad
   ↓
Pipeline: health check post-deploy → ¿éxito o rollback?
\`\`\`

### 🧪 Ejercicios

1. Crea endpoints \`/live\` y \`/ready\` que verifiquen dependencias reales.
2. Configura una sonda externa que verifique el servicio desde fuera.
3. Usa el health check en el pipeline como gate de verificación post-deploy.

### ⚠️ Errores comunes

* Health endpoint que devuelve 200 "porque el servidor existe" (no verifica dependencias).
* Health checks solo internos (no se ve la perspectiva del usuario externo).
* Exponer detalles internos en el health público (información para atacantes).
* Health checks sin alertas: se verifican pero nadie se entera cuando fallan.

### 🔗 Conexión DevOps

Los health checks unen despliegues (nivel 13), Kubernetes (nivel 14), monitoreo (nivel 18) y alertas: son la señal común que todos los sistemas usan para decidir "sano o no".
`
export default content
