const content = `
## Módulo 9 — Retry

### 🎯 Objetivos de aprendizaje

* Explicar cuándo reintentar un job y cuándo no.
* Configurar reintentos con límites y backoff.
* Evitar que el retry enmascare problemas reales.

### ❓ Problema real que resuelve

Algunos fallos son transitorios: una descarga interrumpida, un servicio externo con un 500 momentáneo, un runner que se reinicia. Reintentar automáticamente resuelve estos casos sin intervención humana. Pero el retry mal usado enmascara fallos reales: un test que falla 3 veces "porque es flaky" es un problema que nadie arregla.

### 💡 Analogía

El retry es como reintentar una llamada telefónica cuando sale "red ocupada": la mayoría de las veces, el segundo intento funciona. Pero si el número está mal (bug real), reintentar 50 veces no lo arregla: hay que corregir el número. El retry es para ruido, no para señales.

### 📖 Explicación técnica

* El **retry** re-ejecuta el job/step un número máximo de veces tras un fallo.
* Configuración típica: \`max attempts\` (2-3), espera entre intentos (backoff: corto y creciente), y reintento solo de los **steps** fallidos (GitHub) o del job completo (según plataforma).
* Cuándo usar:
  * Fallos **transitorios**: red, servicios externos, límites de rate, cold starts.
  * Jobs conocidos por flakiness de infraestructura (no de código).
* Cuándo NO:
  * Tests que fallan por lógica (el retry los esconde).
  * Errores deterministas (siempre falla igual).
  * Fallos de configuración (reintentar no arregla el YAML).
* El retry debe acompañarse de: logging del intento, métricas de cuántos jobs pasan al segundo intento, y una alerta si el retry se activa con frecuencia (señal de inestabilidad).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Step falla (exit ≠ 0)
  │
  ├── Intento 1 falla → espera (backoff) → intento 2
  ├── Intento 2 falla → espera → intento 3 (máximo)
  └── Intento 3 falla → job FALLIDO definitivo
  │
  ▼
Si el intento 2 tiene éxito → job verde (con nota de retry)
\`\`\`

### 💻 Ejemplo básico

Retry de un step (GitHub Actions):

\`\`\`yaml
steps:
  - name: Descargar dependencias
    run: npm ci
    retry: 2
    retry_wait_seconds: 30
\`\`\`

(En GitLab: \`retry: 2\` a nivel de job, con \`when: runner_system_failure\` o \`script_failure\`.)

### 🏢 Caso de uso profesional

Un pipeline con tests E2E contra un entorno compartido sufría fallos por conflictos transitorios. El equipo configura \`retry: 2\` solo para esos jobs y añade una métrica: si más del 5% de las ejecuciones necesitan el retry, se abre un incidente de estabilidad. Los fallos transitorios desaparecen de la experiencia diaria y la inestabilidad real se detecta por métrica, no por molestia.

### ⚠️ Errores comunes

* Retry en tests de lógica: los bugs se esconden.
* Reintentos ilimitados: el pipeline "cuelga" reintentando.
* Sin backoff: reintentos inmediatos que fallan igual.
* Retry en fallos de configuración (deterministas).
* No medir la tasa de retries: la inestabilidad se normaliza.

### 📋 Lo que debes recordar

* Retry para fallos transitorios, no para bugs.
* Límite (2-3) y backoff; nunca infinito.
* Mide la tasa de retries: es una métrica de estabilidad.
* Un fallo que "se arregla solo" con retry aún merece análisis.

### 🧪 Autoevaluación rápida

1. ¿Qué fallos justifican un retry?
2. ¿Qué fallos NO deben reintentarse?
3. ¿Qué métrica debería acompañar al retry?

---

1. Fallos transitorios: red, servicios externos, rate limits, cold starts.
2. Fallos deterministas (bugs, configuración): reintentarlos los enmascara y nunca los arregla.
3. La tasa de ejecuciones que requieren retry: si sube, hay inestabilidad que investigar.
`
export default content
