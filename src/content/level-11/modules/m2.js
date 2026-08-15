const content = `
## Módulo 2 — Pipeline variables

### 🎯 Objetivos de aprendizaje

* Definir variables a nivel de pipeline y su alcance.
* Configurar variables en YAML y en la UI de la plataforma.
* Usar variables predefinidas del pipeline.

### ❓ Problema real que resuelve

El pipeline necesita valores compartidos (versiones, URLs, flags) y contexto de la ejecución (commit, rama, número de build). Las variables de pipeline centralizan la configuración: se definen una vez y todos los jobs las usan; las variables predefinidas inyectan el contexto automáticamente.

### 💡 Analogía

Las variables de pipeline son como la pizarra de instrucciones de la fábrica: "versión de Node: 20, entorno: staging, lote: 4521". Todos los operarios (jobs) leen la misma pizarra. La pizarra central (variables de pipeline) evita que cada operario tenga su propia versión de las instrucciones.

### 📖 Explicación técnica

Niveles:

* **Pipeline (global)**: \`env:\` (GitHub), \`variables:\` (GitLab), aplican a todos los jobs.
* **Job**: sobreescriben las del pipeline para ese job.
* **Step**: solo ese paso.
* **UI de la plataforma**: variables configuradas en settings (editables sin tocar YAML; \`vars\` en GitHub, \`variables\` en GitLab) — incluyen flags \`protected\`/\`masked\`.
* **Predefinidas**: la plataforma las inyecta: \`github.sha\`, \`github.ref\`, \`GITHUB_RUN_ID\`, \`CI_COMMIT_SHA\`, \`Build.BuildId\` — contexto de la ejecución.
* Precedencia: las más específicas ganan (step > job > pipeline > UI).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
variables (pipeline):
  NODE_VERSION: 20
  REGISTRY: registry.corp.example

Job build:
  env: NODE_ENV=production   (job > pipeline)
  → usa NODE_VERSION=20, REGISTRY=..., NODE_ENV=production

Predefinidas: github.sha, github.ref → etiquetado
  → app:\${GITHUB_SHA}
\`\`\`

### 💻 Ejemplo básico

Variables de pipeline (GitLab):

\`\`\`yaml
variables:
  NODE_VERSION: "20"
  REGISTRY_IMAGE: registry.gitlab.example/org/app

build:
  script:
    - docker build -t \$REGISTRY_IMAGE:\$CI_COMMIT_SHA .
    - docker push \$REGISTRY_IMAGE:\$CI_COMMIT_SHA
\`\`\`

### 🏢 Caso de uso profesional

Un equipo centraliza sus versiones de herramientas en variables de pipeline: subir Node de 18 a 20 es cambiar UNA variable en la UI (sin tocar YAML) y todos los pipelines la toman. Las variables predefinidas (commit, build id) alimentan el taggeo de imágenes y artefactos sin código adicional.

### ⚠️ Errores comunes

* Variables secretas como variables normales (visibles).
* Definir en cada job lo que debería ser global.
* Precedencia malentendida (sobreescrituras inesperadas).
* Nombres ambiguos que chocan con predefinidas.
* Config en la UI sin documentar (nadie sabe dónde vive).

### 📋 Lo que debes recordar

* Niveles: pipeline > job > step (los específicos ganan).
* La UI permite cambiar variables sin editar YAML.
* Las predefinidas dan contexto (sha, ref, build id).
* Secretos aparte, siempre.

### 🧪 Autoevaluación rápida

1. ¿En qué niveles se pueden definir variables de pipeline?
2. ¿Qué son las variables predefinidas?
3. ¿Qué ventaja tiene la configuración en la UI?

---

1. Pipeline (global), job y step; los niveles más específicos sobreescriben.
2. Variables que la plataforma inyecta automáticamente con el contexto de la ejecución (commit, rama, build id).
3. Poder cambiar valores (versiones, URLs) sin editar ni revisar el YAML — útil para operaciones rápidas.
`
export default content
