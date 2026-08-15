const content = `
## Módulo 4 — Traces

### 🎯 Objetivos de aprendizaje

* Definir traces y distributed tracing.
* Instrumentar peticiones a través de servicios.
* Usar traces para encontrar cuellos de botella y errores.

### ❓ Problema real que resuelve

Una petición cruza varios servicios (frontend → API → BD → externo): cuando es lenta o falla, ¿en qué salto está el problema? Los logs y métricas por servicio no lo dicen. Los traces siguen una petición concreta de punta a punta, mostrando el tiempo y resultado de cada etapa — localizando el cuello de botella o el fallo exacto.

### 💡 Analogía

Los traces son el seguimiento del paquete de mensajería: no solo sabes que "el envío tarda" (métrica) ni el estado final (log); ves el recorrido completo: salió del almacén a las 9:00, estuvo en aduanas 3 horas (cuello de botella), llegó al reparto... Cada paso con su tiempo y su resultado.

### 📖 Explicación técnica

* **Trace**: recorrido completo de una petición a través de todos los servicios.
* **Span**: una etapa del recorrido (un servicio, una llamada a BD, una llamada externa) con duración y resultado.
* Estructura: cada span tiene trace_id (compartido), span_id, parent span — formando un árbol.
* **Contexto propagado**: el trace_id viaja en los headers (\`traceparent\`/W3C) de servicio en servicio — por eso los logs también llevan trace_id (módulo 2).
* Instrumentación: OpenTelemetry (estándar — SDKs por lenguaje + auto-instrumentación), agentes (Datadog, New Relic), service mesh (Istio genera traces).
* Backends: Jaeger, Tempo, Zipkin, Datadog APM.
* Usos: debugging de latencia (¿qué span tarda?), errores (¿qué span falla?), correlación con logs (mismo trace_id).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Petición entra → trace_id creado
   ↓
Servicio A (span) → pasa trace_id en header
   ↓
Servicio B (span) → BD (span) → externo (span)
   ↓
Respuesta → todos los spans unidos por trace_id
   ↓
Árbol del trace: tiempos y errores por etapa
\`\`\`

### 🧪 Ejercicios

1. Instrumenta tu app con OpenTelemetry y exporta traces a Jaeger/Tempo.
2. Sigue una petición que cruce 2-3 servicios y encuentra el span más lento.
3. Correlaciona un log de error con su trace_id para ver el recorrido completo.

### ⚠️ Errores comunes

* Instrumentar un servicio solo (sin propagación del trace_id, los traces se rompen).
* Traces sin logs correlacionados (falta el detalle de cada span).
* Muestreo mal configurado (0% de traces → nada que ver; 100% → costo alto).
* Traces de "happy path" solamente (los errores también necesitan trazabilidad).

### 🔗 Conexión DevOps

Los traces son el tercer pilar de la observabilidad: conectan logs (módulo 2), debugging (nivel 22), canary/verificación (nivel 13) y la detección de regresiones de latencia (módulo 1).
`
export default content
