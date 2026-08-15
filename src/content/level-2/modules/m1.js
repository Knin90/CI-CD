const content = `
## Módulo 1 — ¿Qué es un Pipeline?

### 🎯 Objetivos de aprendizaje

* Definir **pipeline** en el contexto de CI/CD.
* Explicar el pipeline como automatización de un flujo de trabajo de entrega.
* Distinguir pipeline, job, stage y step.

### ❓ Problema real que resuelve

Entregar software requiere una secuencia de pasos: compilar, testear, empaquetar, desplegar. Hechos a mano, se olvidan, se hacen en distinto orden y nadie los registra. El pipeline **automatiza la secuencia completa**: define los pasos, su orden, sus condiciones y sus dependencias, y los ejecuta de forma reproducible cada vez que ocurre un evento (push, PR, tag, horario).

### 💡 Analogía

Un pipeline es como la cadena de montaje de una fábrica: cada estación (stage) hace una tarea (job) con instrucciones concretas (steps), las piezas avanzan en orden, y si una estación falla, la línea se detiene y la pieza no sigue. La cadena produce un producto final (artefacto) de forma consistente, sin depender de que un operario recuerde qué hacer.

### 📖 Explicación técnica

* **Pipeline**: secuencia automatizada de fases que lleva el código desde un evento (push, PR, tag) hasta un resultado (artefacto validado, despliegue).
* Jerarquía de conceptos:
  * **Pipeline**: el flujo completo.
  * **Stage**: fase lógica del flujo (build, test, deploy).
  * **Job**: unidad de ejecución dentro de una stage (tiene runner, comandos, condiciones).
  * **Step**: comando individual dentro de un job.
* Definición típica en un archivo versionado (YAML): \`.gitlab-ci.yml\`, \`.github/workflows/*.yml\`, \`Jenkinsfile\`, \`azure-pipelines.yml\`.
* El pipeline es **código**: se versiona, se revisa con PRs y se prueba, como cualquier software.
* Cada ejecución del pipeline produce **resultados**: status (success/failure), logs, artefactos, reportes.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Evento (push / PR / tag)
  │
  ▼
PIPELINE (secuencia definida en código)
  │
  ├── Stage: Build ──── Job: compile ── Steps: npm ci, npm run build
  ├── Stage: Test ───── Job: unit ───── Steps: npm test
  ├── Stage: Security ─ Job: sast ───── Steps: npm run sast
  └── Stage: Deploy ─── Job: staging ── Steps: ssh deploy
  │
  ▼
Resultado: success + artefactos + logs + reportes
\`\`\`

### 💻 Ejemplo básico

Pipeline mínimo en YAML (GitLab CI):

\`\`\`yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - npm ci
    - npm run build

test:
  stage: test
  script:
    - npm test

deploy:
  stage: deploy
  script:
    - ./deploy.sh
\`\`\`

### 🏢 Caso de uso profesional

Un equipo tenía un "deploy" documentado en 30 pasos que solo sabía ejecutar una persona. Lo convierten en un pipeline versionado: stages de build, test, security y deploy, con triggers automáticos. El conocimiento pasa del documento al código, y cualquier cambio en el proceso se revisa con PR como cualquier cambio de la aplicación.

### ⚠️ Errores comunes

* Pipeline sin versionar: el proceso vive en la plataforma, no en el repo.
* Un pipeline gigante con todo en un solo job: sin stages ni paralelismo.
* Steps que dependen de estado manual (entornos configurados a mano).
* Sin reportes ni artefactos: ejecución sin resultados utilizables.
* Trigger manual para todo: se pierde la automatización.

### 📋 Lo que debes recordar

* Pipeline = secuencia automatizada de fases de entrega.
* Jerarquía: pipeline → stage → job → step.
* El pipeline es código versionado, revisado y probado.
* Cada ejecución produce status, logs, artefactos y reportes.

### 🧪 Autoevaluación rápida

1. ¿Cuál es la jerarquía de conceptos dentro de un pipeline?
2. ¿Por qué el pipeline debe estar versionado como código?
3. ¿Qué resultado produce cada ejecución de un pipeline?

---

1. Pipeline (flujo completo) → stage (fase lógica) → job (unidad de ejecución) → step (comando individual).
2. Porque así se revisa con PRs, se audita, se prueba y no depende de la configuración de una persona o una máquina concreta.
3. Un status (success/failure), los logs de cada job, los artefactos producidos y los reportes de tests/cobertura/seguridad.
`
export default content
