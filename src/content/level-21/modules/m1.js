const content = `
## Módulo 1 — GitHub Actions

### 🎯 Objetivos de aprendizaje

* Conocer GitHub Actions y su modelo (workflows, jobs, steps).
* Escribir workflows con triggers, actions y condiciones.
* Usar GitHub Actions para CI/CD completo.

### ❓ Problema real que resuelve

GitHub Actions integra CI/CD directamente en GitHub: los workflows viven en el repo, se disparan con los eventos de GitHub (push, PR, release) y se ven en la misma UI del código. Resuelve el CI/CD sin infraestructura adicional para equipos que ya viven en GitHub — con ecosistema de actions reutilizables (módulo 2 de nivel 19).

### 💡 Analogía

GitHub Actions es la cocina integrada del restaurante que ya tiene el comedor (GitHub): no necesitas contratar una cocina externa (CI separado); la cocina está en el mismo edificio, recibe los pedidos del comedor (eventos de GitHub) y prepara los platos (jobs) con los ingredientes estándar (actions del marketplace).

### 📖 Explicación técnica

* **Workflow**: archivo YAML en \`.github/workflows/\` que define el pipeline.
* Estructura: \`name\`, \`on\` (triggers — nivel 2: push, pull_request, schedule, workflow_dispatch, release), \`jobs\` con \`runs-on\` (runner), \`steps\` con \`uses\` (actions) o \`run\` (comandos shell).
* **Actions**: pasos reutilizables del marketplace (checkout, setup-node, cache — nivel 19, docker, deploy).
* Características: matrix builds (nivel 19), \`needs\` para dependencias (nivel 19), environments con approvals y secrets (nivel 12), reusable workflows (módulo 2 de nivel 19), permisos configurables (nivel 10), artifacts (nivel 8), OIDC (nivel 11).
* Runners: hosted (nivel 6) y self-hosted (nivel 7).
* Buenas prácticas: permisos mínimos (\`permissions:\` explícito), actions pinneadas por SHA (nivel 10), reusable workflows (nivel 19), secrets en environments (nivel 12).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Evento (push/PR) → GitHub detecta
   ↓
Workflow del repo seleccionado
   ↓
Runners ejecutan los jobs (con matrix/needs)
   ↓
Steps: actions + comandos
   ↓
Resultados: checks en el PR + artifacts + deploy
\`\`\`

### 🧪 Ejercicios

1. Escribe un workflow de CI (lint + tests + build) para tu repo.
2. Añade un job de deploy a un entorno protegido con approval.
3. Reutiliza un workflow de CI con inputs desde otro repo.

### ⚠️ Errores comunes

* Permisos write-all por defecto (nivel 10).
* Actions sin pin por SHA (supply chain — nivel 10).
* Workflows gigantes sin reutilización (nivel 19).
* Secrets en el repo o en \`with\` (nivel 11).

### 🔗 Conexión DevOps

GitHub Actions es la primera plataforma cloud del nivel 21: conecta reusable workflows (nivel 19), environments (nivel 12), secrets (nivel 11) y seguridad (nivel 10). Es la referencia del CI/CD integrado en el repo.
`
export default content
