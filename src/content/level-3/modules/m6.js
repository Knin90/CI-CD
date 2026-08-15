const content = `
## Módulo 6 — Variables

### 🎯 Objetivos de aprendizaje

* Definir variables en YAML a nivel de pipeline, job y step.
* Usar variables predefinidas de la plataforma.
* Comprender la precedencia de variables.

### ❓ Problema real que resuelve

Los pipelines repiten valores (versiones, URLs, nombres) y necesitan datos del contexto (branch, SHA, ref). Las variables eliminan la repetición y permiten que el pipeline se adapte al evento que lo disparó: versiones definidas una vez y usadas en muchos jobs, valores de contexto (commit, rama) inyectados automáticamente por la plataforma.

### 💡 Analogía

Las variables son como los ajustes de una plantilla de documento: defines "Nombre del cliente" una vez y se rellena en todas las cartas. En el pipeline, defines \`NODE_VERSION: 20\` una vez y todos los jobs la usan; si mañana cambias a Node 22, editas un solo lugar.

### 📖 Explicación técnica

* **Variables propias**: se definen en el YAML a distintos niveles:
  * Nivel **pipeline** (global): aplican a todos los jobs.
  * Nivel **job**: solo para ese job.
  * Nivel **step**: solo para ese paso.
* **Variables predefinidas** (contexto de la plataforma): \`github.sha\`, \`github.ref\`, \`CI\`, \`GITHUB_ACTIONS\`, \`CI_COMMIT_SHA\` (GitLab), \`Build.BuildId\` (Azure) — la plataforma las inyecta automáticamente.
* **Precedencia** (de menor a mayor, típicamente): defaults → nivel pipeline → nivel job → nivel step → variables del entorno (UI) → secretos → override en UI.
* Interpolación:
  * GitHub Actions: \`\${{\\ vars.MY_VAR }}\` en campos YAML; \`$VAR\` dentro de \`run:\` (shell).
  * GitLab: \`\$MY_VAR\`.
  * Azure: \`\$(MY_VAR)\`.
* Las variables NO deben contener secretos (ver nivel de Secrets): los secretos se gestionan aparte.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
variables:
  NODE_VERSION: 20
  APP_NAME: web

Parser → cada job recibe el mapa de variables
  │
  ▼
Precedencia aplicada (job > pipeline > default)
  │
  ▼
Interpolación en los steps:
  - run: echo "App: $APP_NAME"
  → "App: web"
\`\`\`

### 💻 Ejemplo básico

Variables en GitHub Actions:

\`\`\`yaml
env:
  NODE_VERSION: 20

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: production
    steps:
      - name: Versión
        run: echo "Node \$NODE_VERSION en \$NODE_ENV"
      - name: Contexto
        run: echo "Commit \${{\\ github.sha }} en rama \${{\\ github.ref }}"
\`\`\`

### 🏢 Caso de uso profesional

Un equipo mantiene 20 servicios con el mismo pipeline. Versionan las variables centrales (versión de Node, imagen base, URL del registry) en un template: cuando suben Node de 18 a 20, cambian **una** variable y los 20 pipelines se actualizan en la próxima ejecución. Las variables de contexto (SHA, rama) alimentan el taggeo de imágenes sin escribir código.

### ⚠️ Errores comunes

* Guardar secretos en variables (visibles en los logs y el YAML).
* Precedencia ignorada: una variable de job pisada por una global inesperada.
* Interpolación equivocada según la plataforma (\$\{{ \}\} vs \$VAR vs \$(var)).
* Variables con nombre ambiguo que se pisan entre niveles.
* Definir en cada job lo que debería ser global.

### 📋 Lo que debes recordar

* Variables a nivel pipeline, job y step; los niveles menores ganan.
* Las variables predefinidas dan contexto (SHA, ref, branch).
* Los secretos van en el gestor de secretos, no en variables.
* Interpolación: \$\{{ \}\}, \$VAR o \$(var) según la plataforma.

### 🧪 Autoevaluación rápida

1. ¿En qué niveles se pueden definir variables?
2. ¿Qué son las variables predefinidas?
3. ¿Por qué los secretos no deben ir en variables?

---

1. Pipeline (global), job y step; la precedencia va del nivel más específico al más general.
2. Variables que la plataforma inyecta automáticamente con contexto de la ejecución: SHA del commit, rama, ref, identificador del build, etc.
3. Porque las variables son visibles en el YAML, en los logs y en la UI; los secretos requieren almacenamiento cifrado, masking y permisos.
`
export default content
