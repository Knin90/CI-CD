const content = `
## Módulo 8 — Job failures

### 🎯 Objetivos de aprendizaje

* Explicar las causas de fallo de un job y su impacto.
* Distinguir fallos del código, de la configuración y de la infraestructura.
* Configurar el comportamiento del pipeline ante fallos.

### ❓ Problema real que resuelve

Un job falla por muchas razones: un test rojo (código), un YAML inválido (configuración), un runner caído (infraestructura). Cada tipo de fallo tiene un responsable y una respuesta distinta. Clasificar el fallo correctamente evita echarle la culpa al código cuando la infraestructura falló, y viceversa.

### 💡 Analogía

En un hospital, las alarmas suenan por motivos distintos: un paciente grave (código), un monitor mal calibrado (configuración) o un corte de luz (infraestructura). El equipo no responde igual a cada uno: diagnostica la causa antes de actuar. Los fallos del pipeline merecen el mismo triaje.

### 📖 Explicación técnica

Causas de fallo:

* **Código**: tests que fallan, build roto, lint con errores. Respuesta: el autor corrige; el pipeline está haciendo su trabajo.
* **Configuración**: YAML inválido, secreto faltante, runner mal etiquetado. Respuesta: corregir la configuración; suele afectar a todos los jobs.
* **Infraestructura**: runner caído, red, registry inaccesible, cuota agotada. Respuesta: el equipo de plataforma; suele ser intermitente.
* **Tiempo**: timeout (job colgado, recurso bloqueado).

Comportamiento configurable:

* \`continue-on-error\`: el fallo no rompe el job/pipeline (reportes).
* \`allow_failure\` (GitLab): el job puede fallar; el pipeline sigue.
* \`retry\`: reintentos para fallos transitorios.
* \`if: failure()\`: reacciones al fallo (notificar, limpiar).
* Protección de rama: un check rojo bloquea el merge.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job falla
  │
  ├── ¿Test rojo? → código → autor corrige
  ├── ¿YAML inválido? → configuración → fix + validación
  ├── ¿Runner/red? → infra → plataforma (puede ser transitorio)
  └── ¿Timeout? → recurso/estado → investigar
  │
  ▼
Pipeline: stage roja → se detiene (o continúa según config)
  │
  ▼
Notificación + PR bloqueado + métricas de estabilidad
\`\`\`

### 💻 Ejemplo básico

Reintento para fallos transitorios (GitHub):

\`\`\`yaml
jobs:
  e2e:
    runs-on: ubuntu-latest
    strategy:
      max-parallel: 1
    steps:
      - name: Tests E2E
        run: npm run test:e2e
        retry: 2            # reintenta si falla por red/flakiness
\`\`\`

### 🏢 Caso de uso profesional

Un equipo clasifica sus fallos de CI por categoría con etiquetas en los issues: "fallo de código" (tests), "fallo de infra" (runner/red) y "fallo de config". Descubren que el 30% de los fallos eran de infraestructura transitoria y se resolvían con un retry. Agregan reintentos a los jobs propensos y un job de notificación que clasifica el fallo automáticamente por el mensaje del log.

### ⚠️ Errores comunes

* Culpar al código de fallos de infraestructura (y viceversa).
* \`continue-on-error\` en tests: el verde pierde significado.
* Sin retry en jobs propensos a fallos transitorios (network).
* Timeouts demasiado cortos: jobs legítimos cancelados.
* Ignorar fallos intermitentes: "es flaky, sigue".

### 📋 Lo que debes recordar

* Clasifica: código vs configuración vs infraestructura vs timeout.
* Configura la respuesta: retry, continue-on-error, allow_failure.
* Un check rojo debe bloquear el merge (protección de rama).
* Los fallos intermitentes merecen investigación, no normalización.

### 🧪 Autoevaluación rápida

1. ¿Qué tipos de fallo puede tener un job?
2. ¿Qué hace \`retry\` y cuándo conviene?
3. ¿Qué riesgo tiene normalizar los fallos intermitentes?

---

1. Fallos de código (tests/build), de configuración (YAML, secretos), de infraestructura (runner, red, registry) y por timeout.
2. Reintenta el job/step un número de veces; conviene para fallos transitorios (red, servicios externos), no para tests que fallan de verdad.
3. Un flaky test esconde bugs reales y destruye la confianza en el pipeline: los fallos intermitentes deben investigarse.
`
export default content
