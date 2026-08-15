const content = `
## Módulo 3 — Metrics

### 🎯 Objetivos de aprendizaje

* Definir métricas y los cuatro "golden signals".
* Recopilar y consultar métricas de la app y la infra.
* Usar métricas para alertas y decisiones de release.

### ❓ Problema real que resuelve

¿Cómo saber que el sistema está sano? Las métricas dan números objetivos y continuos: cuántas peticiones, cuántos errores, qué latencia. Con métricas se detectan tendencias (la latencia sube desde el último deploy), se disparan alertas y se decide si un release es seguro (canary — nivel 13).

### 💡 Analogía

Las métricas son los signos vitales del sistema: temperatura, pulso y presión se miden continuamente, no cuando el paciente se queja. Un paciente con fiebre baja pero sostenida (tendencia) se detecta antes de que la fiebre sea grave — igual que un error rate que sube despacio.

### 📖 Explicación técnica

* **Golden signals** (Google SRE): los cuatro indicadores clave:
  * **Latency**: cuánto tarda en responder (percentiles p50/p95/p99 — no solo el promedio).
  * **Traffic**: cuánta demanda recibe el sistema (requests/s).
  * **Errors**: tasa de errores (HTTP 5xx, excepciones).
  * **Saturation**: cuánto de la capacidad se usa (CPU, memoria, conexiones).
* Recopilación: exporters en la app (Prometheus client), agentes de infra (node_exporter), métricas del cloud (CloudWatch), service mesh (Istio).
* Almacenamiento y consulta: Prometheus + Grafana (time-series, PromQL), Datadog, New Relic.
* Uso: dashboards (visión continua), **alertas** (umbrales sobre las métricas), decisiones de release (módulo 1 — comparar pre/post deploy).
* Buenas prácticas: medir lo que importa (no todo), percentiles en vez de promedios (el promedio oculta picos), métricas con labels útiles, alertas basadas en SLOs (módulo 9).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
App expone métricas (/metrics)
   ↓
Prometheus scrape (intervalo)
   ↓
Time-series almacenadas
   ↓
Consultas (PromQL) → dashboards + alertas
   ↓
Decisiones: ¿release sano? ¿incidente?
\`\`\`

### 🧪 Ejercicios

1. Expón métricas de tu app (Prometheus client) y visualízalas en Grafana.
2. Crea un dashboard con los 4 golden signals de un servicio.
3. Define una alerta sobre el p99 de latencia con umbral razonable.

### ⚠️ Errores comunes

* Mirar solo el promedio (oculta picos de latencia o errores).
* Métricas sin labels: no se puede desglosar por servicio/ruta/versión.
* Dashboards bonitos sin alertas (nadie mira los gráficos 24/7).
* Medir todo "por si acaso" (costo y ruido — medir lo que decide).

### 🔗 Conexión DevOps

Las métricas son el segundo pilar de la observabilidad: conectan alertas (módulo 1), SLOs/DORA (módulo 9), canary (nivel 13) y el monitoreo de infraestructura (módulo 7).
`
export default content
