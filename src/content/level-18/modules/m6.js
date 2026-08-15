const content = `
## Módulo 6 — Application monitoring

### 🎯 Objetivos de aprendizaje

* Monitorear la aplicación desde dentro (APM).
* Medir rendimiento, errores y dependencias de la app.
* Usar APM para detectar problemas antes que los usuarios.

### ❓ Problema real que resuelve

La infraestructura puede estar perfecta y la app rota: un bug de código, una dependencia lenta, una consulta ineficiente. El monitoreo de aplicación (APM) observa la app desde dentro — tiempos por operación, errores, dependencias, código — para detectar y localizar problemas que ni la infra ni las métricas genéricas ven.

### 💡 Analogía

El APM es el monitor del paciente en la UCI: no solo mide que el corazón late (infra), sino la actividad de cada órgano (cada función, cada consulta), su consumo de oxígeno (recursos) y las anomalías (errores). Un órgano que trabaja mal se detecta por su actividad interna, no esperando el fallo del cuerpo completo.

### 📖 Explicación técnica

* **APM (Application Performance Monitoring)**: observación interna de la aplicación.
* Qué mide: tiempo por endpoint/operación, error rate por operación, dependencias (BD, cache, externos — tiempo y fallos), JVM/runtime internals (GC, threads), transacciones lentas (el stack trace de las más lentas).
* Implementación: agentes (Datadog APM, New Relic, Elastic APM) o OpenTelemetry (auto-instrumentación + SDKs).
* Relación con los pilares: usa métricas (tiempos/errores — módulo 3) y traces (recorrido por operación — módulo 4).
* Usos: detectar regresiones post-deploy (módulo 1 — ¿el endpoint X se volvió lento?), localizar cuellos de botella (¿la BD? ¿el externo?), alertar por degradación de rendimiento.
* Buenas prácticas: monitorear los endpoints críticos de negocio (no solo /health), comparar por versión desplegada, alertar sobre p95/p99 (no promedios).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Agente APM en la app
   ↓
Captura: cada request/operación (tiempo, error, dependencias)
   ↓
Agrega por endpoint + versión
   ↓
Dashboards: rendimiento, errores, dependencias
   ↓
Alertas + comparación por release
\`\`\`

### 🧪 Ejercicios

1. Instrumenta tu app con un agente APM u OpenTelemetry.
2. Identifica los 3 endpoints más lentos y su causa (traces).
3. Compara el rendimiento de una operación entre dos versiones desplegadas.

### ⚠️ Errores comunes

* APM solo en producción (las regresiones se descubren tarde).
* Monitorear el "tiempo total" sin desglosar por operación (no localiza nada).
* APM sin correlación con deploys (no se sabe qué release causó la degradación).
* Overhead del agente mal configurado (el muestreo excesivo ralentiza la app).

### 🔗 Conexión DevOps

El APM es la observación más cercana a la experiencia del código: conecta métricas y traces (módulos 3/4), la verificación de despliegues (módulo 1) y el debugging de rendimiento (nivel 22).
`
export default content
