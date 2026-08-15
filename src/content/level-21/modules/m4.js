const content = `
## Módulo 4 — Azure DevOps

### 🎯 Objetivos de aprendizaje

* Conocer Azure DevOps y su suite (Pipelines, Repos, Artifacts).
* Escribir pipelines YAML con stages, jobs y templates.
* Integrar Azure Pipelines con el ecosistema Azure.

### ❓ Problema real que resuelve

Azure DevOps ofrece una suite completa: Pipelines (CI/CD), Repos, Artifacts (registries — nivel 8), Boards y Test Plans en un solo producto, con integración profunda con Azure (cloud). Resuelve CI/CD para equipos de Microsoft/Azure — con pipelines YAML, agent pools y despliegues nativos a Azure.

### 💡 Analogía

Azure DevOps es el campus universitario integrado: biblioteca (Repos), laboratorios (Pipelines), almacén de material (Artifacts) y administración (Boards) en el mismo campus — y con convenios directos con las empresas locales (integración Azure). El estudiante (desarrollador) encuentra todo el ciclo en un solo lugar, sin cruzar la ciudad.

### 📖 Explicación técnica

* **Azure Pipelines**: YAML en \`azure-pipelines.yml\` con \`trigger\`, \`pool\` (agentes — nivel 4), \`stages\` → \`jobs\` → \`steps\` (\`script\`, \`task\`, \`template\`).
* **Templates** (nivel 19): \`extends\` con \`parameters\` tipados — reutilización fuerte.
* **Tasks**: pasos del marketplace (Npm, DotNetCore, Docker, Kubernetes, AzureCLI, Terraform).
* **Agent pools**: Microsoft-hosted o self-hosted (nivel 4).
* Integración Azure: service connections (credenciales a Azure — nivel 11), despliegues a App Service, AKS, VMs, Functions; environments con approvals y checks (nivel 12).
* **Artifacts**: feeds de paquetes (NuGet, npm, Maven — nivel 8) + pipelines de publicación.
* Características: matrix strategies (nivel 19), dependsOn/condition (nivel 19), variables y variable groups (nivel 11), secure files.
* Buenas prácticas: templates reutilizables (nivel 19), service connections con scope mínimo (nivel 11), checks de aprobación en entornos (nivel 12).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Commit/PR → Azure Pipelines detecta
   ↓
Pipeline YAML (stages/jobs)
   ↓
Agentes del pool ejecutan (tasks)
   ↓
Artifacts publicados (feeds)
   ↓
Deploy a entornos (con checks/approvals)
   ↓
Integración con Azure (service connections)
\`\`\`

### 🧪 Ejercicios

1. Escribe un azure-pipelines.yml con 2 stages (build y deploy a un entorno).
2. Crea un template con parameters y úsalo desde 2 pipelines.
3. Configura un service connection a Azure con scope mínimo.

### ⚠️ Errores comunes

* Service connections con permisos de la cuenta entera (nivel 11).
* Pipelines clásicos (UI) en vez de YAML (no es pipeline as code — nivel 23).
* Templates sin parámetros tipados (reutilización débil).
* Stages sin condiciones (jobs que corren cuando no deben).

### 🔗 Conexión DevOps

Azure DevOps es la suite Microsoft del nivel 21: conecta templates (nivel 19), artifacts (nivel 8), entornos (nivel 12), credenciales cloud (nivel 11) y el despliegue nativo a Azure.
`
export default content
