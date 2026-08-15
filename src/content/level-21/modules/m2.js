const content = `
## Módulo 2 — GitLab CI/CD

### 🎯 Objetivos de aprendizaje

* Conocer GitLab CI/CD y su modelo (pipelines, stages, jobs).
* Escribir \`.gitlab-ci.yml\` con stages, rules y artifacts.
* Usar GitLab para CI/CD con entornos y approvals.

### ❓ Problema real que resuelve

GitLab CI/CD integra el pipeline en el mismo producto que el código, los repos y los issues: el \`.gitlab-ci.yml\` en la raíz define el pipeline, los runners ejecutan, y la UI muestra pipelines, stages y entornos. Resuelve CI/CD unificado para equipos que viven en GitLab — con una sintaxis YAML poderosa y declarativa.

### 💡 Analogía

GitLab CI/CD es el hospital con todo integrado: laboratorio, quirófano y UCI en el mismo campus (código, CI/CD y operaciones en GitLab). El paciente (código) no se traslada entre edificios (plataformas distintas): todo el proceso — análisis (tests), cirugía (build) y recuperación (deploy) — ocurre en el mismo sistema con un expediente único.

### 📖 Explicación técnica

* **\`.gitlab-ci.yml\`**: define stages (build, test, deploy), jobs (con \`stage\`, \`script\`, \`rules\`, \`artifacts\`, \`environment\`), variables, includes (nivel 19).
* **Pipelines**: por push, MR, schedule, manual (\`when: manual\`), triggers cross-project (nivel 19).
* **Runners**: shared/group/project; el runner pide trabajo (pull — modelo pull del runner, nivel 4).
* Características: environments con protección y approvals (nivel 12), variables por entorno (nivel 11), artifacts y packages (nivel 8), container registry integrado (nivel 9), SAST/DAST integrados (nivel 10), review apps (previews por MR — nivel 12).
* **Rules**: condiciones avanzadas (ramas, cambios, variables — nivel 19).
* Buenas prácticas: templates con includes (nivel 19), secrets como CI/CD variables masked (nivel 11), entornos protegidos para prod (nivel 12).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Push/MR → GitLab detecta
   ↓
Pipeline creada (stages + jobs del YAML)
   ↓
Runners ejecutan los jobs (paralelo por stage)
   ↓
Artifacts entre jobs (dependencies)
   ↓
Deploy a environments (con approvals si aplica)
\`\`\`

### 🧪 Ejercicios

1. Escribe un \`.gitlab-ci.yml\` con 3 stages (build, test, deploy).
2. Configura un environment protegido con job manual para prod.
3. Usa \`include\` para reutilizar un template de CI.

### ⚠️ Errores comunes

* Jobs gigantes sin stages claros (nivel 5).
* Variables sensibles no masked (nivel 11).
* Runners con acceso excesivo (nivel 4).
* Rules confusas (jobs que corren cuando no deben — nivel 19).

### 🔗 Conexión DevOps

GitLab CI/CD es la segunda plataforma del nivel 21: conecta environments (nivel 12), security integrado (nivel 10), registries (nivel 9) y reutilización (nivel 19). Es la plataforma "todo en uno" del DevOps.
`
export default content
