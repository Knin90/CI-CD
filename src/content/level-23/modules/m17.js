const content = `
## Módulo 17 — Observability

### 🎯 Objetivos de aprendizaje

* Hacer observable el pipeline (métricas, logs, trazabilidad).
* Medir lo que importa: tiempo, éxito, fallos.
* Usar la observabilidad para decidir mejoras.

### ❓ Problema real que resuelve

El pipeline es una caja negra: no se sabe cuánto tarda cada etapa, qué falla con frecuencia, ni si el CI/CD está "sano". Sin observabilidad (nivel 18), las decisiones se toman por intuición y los problemas aparecen cuando ya son graves. La observabilidad del pipeline mide tiempo, éxito y fallos — y convierte el CI/CD en un sistema gestionable, no en un misterio.

### 💡 Analogía

La observabilidad del pipeline es el cuadro de mandos del avión: altímetro (tiempo de cada etapa), indicadores de motor (tasa de éxito) y alarmas (fallos). El piloto no vuela "porque sí": mira los instrumentos y ajusta. Un pipeline sin instrumentos es un avión sin cuadro de mandos — vuela, pero nadie sabe si va bien hasta que se cae.

### 📖 Explicación técnica

* **Métricas del pipeline** (nivel 18):
  * **Tiempo**: duración total y por etapa/job; tendencia (¿crece? — módulo 5).
  * **Éxito**: tasa de builds verdes/rojos; % de fallos por etapa (nivel 18).
  * **Fallos**: frecuencia por tipo (config, test, infra — nivel 22), flaky rate (nivel 20 de 22).
  * **Flujo**: tiempo de commit → deploy (lead time), frecuencia de despliegues (nivel 18).
* **Logs**: centralizados y buscables (nivel 18) — el debugging (nivel 22) necesita logs accesibles, no "ir a buscar el runner".
* **Trazabilidad**: cada deploy sabe qué commit, qué artefacto y qué config usó (módulo 8 y 9) — observable y auditable (nivel 23).
* Alertas: cuando el tiempo crece, la tasa de éxito baja o un stage falla repetidamente (nivel 18) — alertar lo que importa, no el ruido.
* Buenas prácticas: dashboard del pipeline (verde, tiempo, tendencias), métricas en el sistema de monitoreo existente (nivel 18), y usar los datos para decidir (optimizar el cuello de botella — módulo 6).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Cada job reporta: duración, resultado, etapa
   ↓
Métricas centralizadas (tiempo, éxito, fallos)
   ↓
Logs buscables para el debugging
   ↓
Trazabilidad: commit → artefacto → deploy
   ↓
Dashboards + alertas
   ↓
Datos → decisión: optimizar, arreglar, ajustar gates
\`\`\`

### 🧪 Ejercicios

1. Mide el tiempo total y por etapa de tu pipeline durante una semana.
2. Calcula la tasa de éxito y los fallos por tipo.
3. Crea un dashboard con 3 métricas del pipeline (tiempo, éxito, tendencia).

### ⚠️ Errores comunes

* Métricas sin acción (el dashboard bonito que nadie mira — nivel 18).
* Medir solo el resultado final (el tiempo por etapa muestra el cuello de botella).
* Alertas por ruido (se ignoran — módulo 15).
* Sin trazabilidad (el deploy "funciona" pero no se sabe qué corrió — módulo 8).

### 🔗 Conexión DevOps

La observabilidad conecta con observability y feedback (nivel 18), deployment metrics (nivel 18), fast feedback (módulo 5) y la mejora continua (nivel 23). Es el instrumento del pipeline profesional: sin datos, las mejoras son opiniones.
`
export default content
