const content = `
## Módulo 3 — Jobs

### 🎯 Objetivos de aprendizaje

* Definir qué es un **job** y qué elementos lo componen.
* Explicar la diferencia entre job, stage y step.
* Configurar jobs con runner, comandos, condiciones y dependencias.

### ❓ Problema real que resuelve

Un pipeline necesita unidades de trabajo bien definidas: qué comando correr, en qué máquina, con qué condiciones, con qué dependencias. El job es esa unidad: encapsula la ejecución (steps), el entorno (runner), las condiciones (only/if) y las relaciones (needs). Sin jobs bien definidos, el pipeline es un script sin estructura donde todo se mezcla.

### 💡 Analogía

Un job es como una receta de cocina asignada a un chef: la receta (steps) dice qué hacer, la cocina (runner) es dónde se hace, las condiciones dicen cuándo se puede cocinar (solo si hay ingredientes = artifacts de otro job), y la dependencia dice qué receta debe terminar antes. Cada receta produce un plato (artefacto) que otras pueden usar.

### 📖 Explicación técnica

Componentes de un job:

* **Script / steps**: los comandos a ejecutar, en orden.
* **Runner / agent**: dónde se ejecuta (máquina, contenedor, imagen).
* **Stage**: a qué fase pertenece.
* **Condiciones**: cuándo se ejecuta (solo en main, solo si cambió tal carpeta, solo en tags).
* **Dependencias**: qué jobs deben terminar antes (\`needs\`).
* **Variables**: configuración del job (env vars, secretos).
* **Artefactos**: qué produce el job y quién lo consume.
* **Retry/timeout**: reintentos y límite de tiempo.

Ejemplos de plataformas:

\`\`\`text
GitHub Actions: job con steps, runs-on, needs
GitLab CI:     job con script, stage, only/except
Jenkins:       stage con steps dentro de un pipeline declarativo
\`\`\`

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job "unit"
  │
  ├── ¿Condiciones cumplidas? → NO → se salta
  │         └── Sí
  ├── ¿Dependencias OK? (needs) → NO → espera
  │         └── Sí
  ├── Runner asigna una máquina
  ├── Se clona el repo / se descargan artefactos
  ├── Steps en orden:
  │     npm ci → npm test
  └── Resultado: success/failure + logs + reportes
\`\`\`

### 💻 Ejemplo básico

Job con todas sus partes (GitHub Actions):

\`\`\`yaml
jobs:
  unit:
    runs-on: ubuntu-latest
    needs: [lint]
    if: github.ref == 'refs/heads/main'
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:unit
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de un monorepo define jobs por servicio: cada job compila su servicio, corre sus tests y publica su imagen, con \`needs\` que expresan las dependencias. Los jobs de servicios independientes corren en paralelo y los que dependen de otros esperan. El pipeline pasa de 40 minutos a 12, y cada job es reutilizable y testeable por separado.

### ⚠️ Errores comunes

* Jobs gigantes con 50 steps: difíciles de mantener y diagnosticar.
* Ignorar condiciones: jobs que corren cuando no deberían (deploy en PRs).
* Dependencias incorrectas (\`needs\` mal declarado): jobs que corren antes de tiempo.
* Sin timeout: jobs colgados que consumen runners infinitamente.
* Steps no idempotentes: re-ejecutar el job falla.

### 📋 Lo que debes recordar

* Job = unidad de ejecución: steps + runner + condiciones + dependencias.
* Un job corre en una sola máquina de principio a fin.
* Las condiciones deciden cuándo corre; \`needs\` define el orden.
* Todo job debe tener timeout y dejar logs claros.

### 🧪 Autoevaluación rápida

1. ¿Qué componentes definen un job?
2. ¿Cuál es la diferencia entre job y step?
3. ¿Para qué sirve \`needs\` en un job?

---

1. Steps (comandos), runner (dónde corre), stage, condiciones de ejecución, dependencias, variables, artefactos y timeout/retry.
2. El job es la unidad de ejecución completa (corre en una máquina); los steps son los comandos individuales dentro del job.
3. Declara las dependencias del job: qué jobs deben terminar con éxito antes de que este se ejecute.
`
export default content
