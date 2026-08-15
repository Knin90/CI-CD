const content = `
## Módulo 2 — Reusable workflows

### 🎯 Objetivos de aprendizaje

* Definir reusable workflows (GitHub Actions).
* Crear y consumir workflows reutilizables.
* Pasar inputs, secrets y outputs entre workflows.

### ❓ Problema real que resuelve

En GitHub Actions, cada repo solía copiar los mismos jobs. Los reusable workflows permiten definir un workflow una vez y llamarlo desde otros: con inputs parametrizados, secrets protegidos y outputs — la forma nativa de reutilización en GitHub, con permisos controlados por el llamador.

### 💡 Analogía

El reusable workflow es el catering centralizado del edificio: la cocina (workflow reutilizable) prepara el menú estándar (lint, build, tests) y cada oficina (workflow llamador) hace su pedido con variaciones (inputs: qué tests, qué versión). Las oficinas no cocinan: piden al catering — y el catering mejora el menú para todos.

### 📖 Explicación técnica

* **Reusable workflow**: workflow llamado por otros workflows mediante \`uses: owner/repo/.github/workflows/ci.yml@v1\`.
* Requisitos: \`workflow_call\` como trigger; el workflow llamador usa \`jobs.<job>.uses\`.
* **Inputs**: parámetros definidos con \`workflow_call.inputs\` (tipos, defaults, required) — el llamador los pasa con \`with\`.
* **Secrets**: se declaran con \`secrets: inherit\` o \`secrets:\` explícito — los secrets NO se pasan por \`with\` (se filtran).
* **Outputs**: el workflow reutilizable expone outputs (\`workflow_call.outputs\`) que el llamador consume.
* Versionado: referenciar por tag/ref (\`@v1\`, \`@<sha>\`) — nunca \`@main\` sin control (un cambio rompe todos los llamadores).
* Buenas prácticas: parametrizar con defaults sensatos, documentar inputs/secrets, versionar semánticamente, testear el workflow reutilizable (nivel 20).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Workflow reutilizable (ci.yml, v1.2)
   inputs: node_version, run_lint
   secrets: REGISTRY_TOKEN
   outputs: image_tag
   ↓
Proyecto X: uses: org/ci.yml@v1.2
   with: node_version: 20
   secrets: inherit
   ↓
Jobs del template corren con los inputs
\`\`\`

### 🧪 Ejercicios

1. Crea un reusable workflow de CI (lint + tests + build) parametrizado.
2. Úsalo desde 2 repos con inputs distintos.
3. Versiona el workflow (tag v1) y referencia por tag.

### ⚠️ Errores comunes

* Referenciar @main (los cambios rompen a todos los llamadores).
* Pasar secrets por \`with\` (se exponen en logs).
* Workflows reutilizables sin versionar ni documentar.
* Inputs sin defaults: cada llamador debe especificar todo.

### 🔗 Conexión DevOps

Los reusable workflows son la implementación de GitHub de la reutilización (módulo 1): conectan pipeline reuse (módulo 1), secrets (nivel 11) y la mantenibilidad (nivel 23).
`
export default content
