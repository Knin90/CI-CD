const content = `
## Módulo 1 — Deployment monitoring

### 🎯 Objetivos de aprendizaje

* Definir monitoreo de despliegues y su diferencia con el monitoreo general.
* Observar el sistema antes, durante y después del deploy.
* Detectar regresiones introducidas por el release.

### ❓ Problema real que resuelve

Un deploy puede pasar todos los tests y aun así degradar el sistema en producción (rendimiento, errores en rutas poco probadas, dependencias externas). El monitoreo de despliegues observa las métricas justo alrededor del release: si algo cambia al desplegar, se detecta inmediatamente — no días después, cuando nadie sabe qué cambio lo causó.

### 💡 Analogía

El deployment monitoring es el chequeo del paciente antes, durante y después de la cirugía: se miden constantes (pulso, presión, oxígeno) en el momento exacto de la operación (deploy) para detectar cualquier reacción al instante. Si el paciente se desestabiliza en la mesa, se actúa de inmediato — no cuando ya está en casa.

### 📖 Explicación técnica

* **Monitoreo de despliegues**: observación enfocada en el momento del release — comparar métricas pre/post deploy.
* Qué observar: error rate, latencia (percentiles), saturation (CPU/memoria), throughput, health de dependencias, métricas de negocio.
* Métodos:
  * **Baseline**: métricas antes del deploy (ventana de referencia) vs después.
  * **Release markers**: marcar en el dashboard cuándo ocurrió cada deploy (deploy events en el gráfico).
  * **Alertas post-deploy**: umbrales que disparan si el release degrada (vinculado al rollback — nivel 13).
* Herramientas: Prometheus/Grafana, Datadog, New Relic, CloudWatch — con anotaciones de release.
* En el pipeline: el stage de verificación (nivel 13) consulta las métricas post-deploy y decide éxito/rollback (canary — nivel 13).
* Buenas prácticas: definir qué métricas deciden el éxito de un release ANTES de desplegar, alertar en los primeros minutos post-deploy, correlacionar métricas con el commit/release.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Ventana de baseline (antes del deploy)
   ↓
DEPLOY (evento marcado en dashboards)
   ↓
Observación post-deploy (error rate, latencia, saturación)
   ↓
¿Degradación? → alerta → rollback / incidente
   ↓
¿Estable? → release confirmado
\`\`\`

### 🧪 Ejercicios

1. Marca tus deploys como eventos en el dashboard de métricas.
2. Define 3 métricas que decidan el éxito de tu release y sus umbrales.
3. Compara un gráfico pre/post deploy de un release problemático.

### ⚠️ Errores comunes

* Monitorear "siempre" sin enfocarse en el momento del deploy (las regresiones se pierden entre el ruido).
* Alertas genéricas que no distinguen release de otros cambios.
* Decidir "éxito" sin métricas (el deploy "terminó" y ya).
* No tener baseline: no hay con qué comparar.

### 🔗 Conexión DevOps

El deployment monitoring conecta la verificación de despliegue (nivel 13) con la observabilidad (nivel 18): es el puente entre "el deploy terminó" y "el deploy funciona". Alimenta el feedback loop (módulo 14) y las DORA metrics (módulo 9).
`
export default content
