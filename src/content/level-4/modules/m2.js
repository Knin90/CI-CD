const content = `
## Módulo 2 — Agent

### 🎯 Objetivos de aprendizaje

* Explicar el término **agent** y su equivalencia con runner.
* Comparar el modelo de agentes de Azure DevOps y Jenkins con el de runners de GitHub/GitLab.
* Entender el ciclo de vida de un agente.

### ❓ Problema real que resuelve

Cada plataforma nombra distinto al mismo concepto: runner (GitHub/GitLab), agent (Azure DevOps/Jenkins), worker (Buildkite). El equipo multi-plataforma necesita el modelo mental transversal: un proceso que se registra ante la plataforma, recibe trabajos y los ejecuta. Confundir la terminología lleva a configurar mal la infraestructura de ejecución.

### 💡 Analogía

El agente es como un mensajero contratado por una empresa de repartos: se registra (alta), recibe encargos (jobs), los entrega (ejecución) y reporta la entrega (resultado). La empresa (plataforma) gestiona los repartos; el mensajero solo necesita su contrato (registro) y su zona de reparto (labels/agents pools).

### 📖 Explicación técnica

* **Agent** (Azure DevOps): máquina que ejecuta builds/deployments dentro de un **agent pool**. Puede ser Microsoft-hosted (gestionado) o self-hosted. Los agent pools se asignan a proyectos y jobs (\`pool:\`).
* **Agent** (Jenkins): el nodo/worker que ejecuta los jobs; el nodo maestro programa y los agentes ejecutan.
* Modelo común:
  1. **Registro**: el agente se instala y se registra con un token contra la organización/proyecto.
  2. **Conexión**: long-polling o conexión persistente para recibir trabajos.
  3. **Ejecución**: recibe el job, descarga los inputs, ejecuta, sube los resultados.
  4. **Disponibilidad**: vuelve al pool para el siguiente trabajo.
* En GitHub/GitLab el concepto se llama **runner**; el modelo es el mismo.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Agent pool (Azure DevOps)
  │
  ├── Agent 1 (ubuntu, listo)
  ├── Agent 2 (windows, listo)
  └── Agent 3 (ocupado)
  │
  ▼
Job → asignado al pool → agente libre compatible
  │
  ▼
Ejecución + reporte
  │
  ▼
Agente vuelve al pool
\`\`\`

### 💻 Ejemplo básico

Selección de pool en Azure DevOps:

\`\`\`yaml
jobs:
  - job: build
    pool:
      vmImage: ubuntu-latest    # Microsoft-hosted
  - job: deploy
    pool:
      name: SelfHosted-Prod     # agent pool propio
\`\`\`

### 🏢 Caso de uso profesional

Una empresa migra pipelines de Azure DevOps a GitHub Actions. El equipo descubre que los "agent pools" de Azure son los "runners" de GitHub: \`vmImage: ubuntu-latest\` equivale a \`runs-on: ubuntu-latest\`, y los pools self-hosted equivalen a runners self-hosted con labels. El modelo mental transversal acelera la migración.

### ⚠️ Errores comunes

* Confundir agente (ejecutor) con el controlador/orquestador.
* Asignar pools incorrectos: jobs en agentes sin las herramientas necesarias.
* No gestionar el ciclo de vida: agentes desregistrados, tokens vencidos.
* Mezclar agentes de entornos distintos (staging/prod) sin aislamiento.
* Ignorar el concepto en la nueva plataforma: "aquí se llama runner, es lo mismo".

### 📋 Lo que debes recordar

* Agent = runner: el ejecutor de jobs.
* Azure: agent pools; Jenkins: agentes/nodos; GitHub/GitLab: runners.
* Ciclo de vida: registrar → conectar → ejecutar → reportar → volver al pool.
* El modelo transversal se aplica a cualquier plataforma.

### 🧪 Autoevaluación rápida

1. ¿Qué es un agent pool en Azure DevOps?
2. ¿Qué ciclo de vida sigue un agente?
3. ¿Qué concepto equivalente existe en GitHub Actions?

---

1. Un grupo de máquinas (gestionadas o propias) que ejecutan los builds/deployments; los jobs seleccionan el pool.
2. Registro con token → conexión con la plataforma → recepción y ejecución del job → reporte → vuelta al pool.
3. Los runners: \`runs-on: ubuntu-latest\` equivale a un pool hosted, y los runners self-hosted a pools propios.
`
export default content
