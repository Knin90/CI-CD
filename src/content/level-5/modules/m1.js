const content = `
## Módulo 1 — Jobs

### 🎯 Objetivos de aprendizaje

* Repasar el concepto de job como unidad de ejecución atómica.
* Configurar jobs con sus elementos completos.
* Entender la relación job ↔ stage ↔ pipeline.

### ❓ Problema real que resuelve

En el nivel 2 viste el job como pieza del pipeline; ahora es el momento de dominarlo: cada job es una unidad atómica que corre en un runner, con sus steps, su entorno, sus condiciones y sus dependencias. Un pipeline profesional es tan bueno como sus jobs: si los jobs están mal definidos (demasiado grandes, sin condiciones, sin timeout), el pipeline entero sufre.

### 💡 Analogía

Un job es como la ficha de trabajo de un operario: contiene la tarea (steps), la máquina (runner), el turno (conditions) y los materiales previos (needs). La fábrica (pipeline) coordina las fichas; cada operario cumple la suya de principio a fin sin interrupciones.

### 📖 Explicación técnica

Elementos completos de un job:

* **Nombre** (clave en el mapa de jobs).
* **Runner**: \`runs-on\` (GitHub), \`tags\` (GitLab), \`pool\` (Azure).
* **Steps/script**: los comandos.
* **Stage**: a qué fase pertenece.
* **Condiciones**: \`if\`/rules/only — cuándo se ejecuta.
* **Dependencias**: \`needs\`/dependencies.
* **Variables y entorno**: env/secretos.
* **Artefactos**: qué publica y qué consume.
* **Timeout y retry**: límites de ejecución.
* **Permisos**: token del job.
* **Estrategia**: matrix (variaciones del mismo job).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job "unit"
  │
  ├── Condición evaluada (if/rules)
  ├── Dependencias verificadas (needs)
  ├── Runner asignado por labels
  ├── Env + secretos inyectados
  ├── Steps ejecutados en orden
  ├── Artefactos publicados
  └── Resultado + logs + reportes
\`\`\`

### 💻 Ejemplo básico

Job completo (GitHub Actions):

\`\`\`yaml
unit:
  runs-on: ubuntu-latest
  needs: [lint]
  if: github.event_name == 'pull_request'
  timeout-minutes: 15
  env:
    NODE_ENV: test
  steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npm run test:unit
      env:
        COVERAGE: true
  # no artefactos aquí: el job solo valida
\`\`\`

### 🏢 Caso de uso profesional

Un equipo refactoriza su pipeline: los 3 jobs gigantes (cada uno con 40 steps) se convierten en 12 jobs atómicos con un propósito cada uno. Cada job tiene timeout, condiciones claras y artefactos explícitos. El diagnóstico de fallos pasa de "¿en qué parte de los 40 steps?" a "el job X falló", y los jobs se reutilizan entre pipelines.

### ⚠️ Errores comunes

* Jobs con muchos propósitos (imposibles de diagnosticar).
* Sin timeout: jobs colgados consumen runners.
* Condiciones mal escritas: el job corre cuando no debe.
* Dependencias no declaradas: el job espera inputs que nunca llegan.
* Artefactos sin retención ni limpieza.

### 📋 Lo que debes recordar

* Job = unidad atómica: un propósito, un runner, steps en orden.
* Todos los elementos (condiciones, needs, timeout, artefactos) se configuran en el job.
* Jobs pequeños y bien definidos = pipeline diagnosticable.
* Timeout en todos los jobs.

### 🧪 Autoevaluación rápida

1. ¿Qué elementos configuran un job?
2. ¿Por qué un job debe tener un solo propósito?
3. ¿Qué pasa si un job no tiene timeout?

---

1. Nombre, runner, steps, stage, condiciones, dependencias, variables, artefactos, timeout/retry y permisos.
2. Porque así el fallo se localiza al instante, el job se puede reutilizar y el pipeline es mantenible.
3. Un job colgado (esperando red, proceso muerto) consume el runner indefinidamente y encola a los demás.
`
export default content
