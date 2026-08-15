const content = `
## Módulo 8 — Deployment metrics

### 🎯 Objetivos de aprendizaje

* Medir métricas específicas del proceso de despliegue.
* Analizar duración, éxito y frecuencia de los deploys.
* Usar los datos del pipeline para optimizar el proceso.

### ❓ Problema real que resuelve

El proceso de despliegue tiene sus propias métricas: ¿cuánto tarda un deploy? ¿cuántos fallan? ¿dónde se atascan? Medir el propio pipeline (no solo la app) revela cuellos de botella: un stage de tests que tarda 40 minutos, deploys que fallan el 30% de las veces, approvals que esperan horas. Con datos, la mejora del pipeline deja de ser opinión.

### 💡 Analogía

Las deployment metrics son las métricas de la cocina del restaurante: no miden solo si la comida gusta (la app), sino si la cocina es eficiente — cuánto tarda cada plato en salir, cuántos platos se devuelven, dónde se acumula la cola. Una cocina lenta o desorganizada se mejora midiendo la cocina, no probando los platos.

### 📖 Explicación técnica

* Qué medir del proceso de despliegue:
  * **Duración del pipeline**: tiempo total y por stage (¿cuál es el más lento?).
  * **Tasa de éxito**: % de pipelines verdes (por etapa: CI, tests, deploy).
  * **Tiempo de espera**: approvals que esperan, colas de runners (módulo 4 de nivel 4).
  * **Frecuencia**: cuántos deploys por semana (alimenta DORA — módulo 9).
  * **Rollbacks**: cuántos y por qué (señal de calidad del release).
* Fuentes: logs de la plataforma CI/CD (duraciones, estados), artifacts de reports, integraciones con dashboards (Grafana/Datadog).
* Uso: identificar stages lentos (optimizar caching/paralelismo — niveles 19/23), stages frágiles (flaky tests — nivel 7), cuellos de botella humanos (approvals — nivel 12).
* Buenas prácticas: dashboard del pipeline visible al equipo, revisar las métricas en retrospectivas, fijar objetivos (reducir el tiempo del pipeline X% este trimestre).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline ejecuta → logs con tiempos y estados
   ↓
Agregación: duración por stage, tasa de éxito
   ↓
Dashboard del proceso
   ↓
Análisis: ¿stage lento? ¿frágil? ¿cola humana?
   ↓
Mejoras → medir de nuevo
\`\`\`

### 🧪 Ejercicios

1. Mide la duración de tu pipeline por stage e identifica el más lento.
2. Calcula la tasa de éxito de tus pipelines del último mes.
3. Crea un dashboard con las deployment metrics de tu equipo.

### ⚠️ Errores comunes

* Medir solo la app (el proceso mismo queda invisible).
* Métricas sin acción: el pipeline sigue lento aunque el dashboard lo diga.
* Comparar equipos con pipelines distintos (contextos diferentes).
* Optimizar lo fácil (un stage corto) en vez de lo impactante (el más lento).

### 🔗 Conexión DevOps

Las deployment metrics son la observabilidad del proceso: conectan el pipeline (todos los niveles), DORA (módulo 9), el feedback loop (módulo 14) y la mejora continua (nivel 23).
`
export default content
