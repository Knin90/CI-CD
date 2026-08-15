const content = `
## Módulo 5 — Tasks

### 🎯 Objetivos de aprendizaje

* Aclarar el término **task** según la plataforma y el contexto.
* Diferenciar tasks de steps, jobs y stages.
* Entender el modelo de tareas reutilizables (acciones, plugins, tasks).

### ❓ Problema real que resuelve

El término "task" se usa con significados distintos según la plataforma (Azure DevOps lo usa para pasos, GitHub para acciones reutilizables, Jenkins para tareas unitarias). Confundir la terminología genera pipelines mal diseñados. Entender qué es una task en cada contexto permite aprovechar los bloques reutilizables que la plataforma ofrece.

### 💡 Analogía

Las tasks son como herramientas estandarizadas de un taller: no reinventas el martillo cada vez, usas el martillo del taller (task reutilizable). Según el taller (plataforma), la "herramienta" se llama task, acción o plugin, pero el concepto es el mismo: una pieza de trabajo lista para usar.

### 📖 Explicación técnica

Significados según la plataforma:

* **Azure DevOps**: \`steps\` pueden ser \`task\` (pasos predefinidos como \`UseNode@1\`, \`PublishBuildArtifacts@1\`) o \`script\` (comandos libres). Las tasks tienen versión y entrada de parámetros.
* **GitHub Actions**: el equivalente reutilizable son las **actions** (\`uses: actions/checkout@v4\`) — código compartido que encapsula lógica.
* **Jenkins**: \`steps\` unitarios dentro de stages; los \`shared libraries\` encapsulan lógica reutilizable.
* **GitLab CI**: \`script\` por job; la reutilización se hace con \`extends\`, templates y \`include\`.

Concepto transversal: la **tarea** es una unidad de trabajo reutilizable, parametrizable y versionada, que encapsula lógica conocida (checkout, cache, build, publish) para no repetirla en cada pipeline.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline
  └── Job
        └── Steps
              ├── task: UseNode@1 (versión 1.x, parametrizable)
              ├── task: PublishTestResults@2
              └── script: npm test

La plataforma descarga la task (versionada) y la ejecuta
con los parámetros indicados, registrando sus salidas.
\`\`\`

### 💻 Ejemplo básico

Tasks reutilizables en Azure DevOps:

\`\`\`yaml
steps:
  - task: UseNode@1
    inputs:
      version: '20.x'
  - task: Npm@1
    inputs:
      command: 'ci'
  - task: PublishTestResults@2
    inputs:
      testResultsFormat: 'JUnit'
      testResultsFiles: '**/junit.xml'
\`\`\`

### 🏢 Caso de uso profesional

Un equipo que migra de Azure DevOps a GitHub Actions se encuentra con el mismo patrón con distinto nombre: las tasks de Azure son las actions de GitHub. Al entender el concepto transversal (unidades reutilizables y versionadas), la migración de los pipelines se vuelve un mapeo de conceptos en lugar de una reescritura a ciegas.

### ⚠️ Errores comunes

* Confundir la terminología entre plataformas y diseñar mal.
* Reinventar tareas comunes (checkout, publish) en vez de usar las de la plataforma.
* Usar tasks sin fijar versión: actualizaciones inesperadas rompen el pipeline.
* Tasks gigantes que hacen de todo: pierden reutilización y claridad.

### 📋 Lo que debes recordar

* "Task" significa distinto según la plataforma: aprende el término local.
* Concepto transversal: unidad de trabajo reutilizable y parametrizable.
* Usa las tasks/actions/plugins de la plataforma, no las reinventes.
* Fija versiones de las tareas reutilizables.

### 🧪 Autoevaluación rápida

1. ¿Qué es una "task" en Azure DevOps?
2. ¿Cuál es el equivalente en GitHub Actions?
3. ¿Por qué conviene fijar la versión de las tareas reutilizables?

---

1. Un paso predefinido y parametrizable (ej: UseNode@1, Npm@1) que encapsula lógica conocida dentro de un job.
2. Las "actions" (\`uses: actions/checkout@v4\`): código compartido y versionado que encapsula lógica.
3. Para que actualizaciones de la tarea no cambien el comportamiento del pipeline de forma inesperada; se actualiza la versión de forma controlada.
`
export default content
