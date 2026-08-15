const content = `
## Módulo 10 — Syntax validation

### 🎯 Objetivos de aprendizaje

* Validar la sintaxis YAML antes de pushear y dentro del CI.
* Usar herramientas de validación específicas de cada plataforma.
* Integrar la validación como paso del pipeline.

### ❓ Problema real que resuelve

Un YAML con un error de indentación o un valor inválido rompe el pipeline con un mensaje críptico de parseo, desperdiciando una ejecución completa. La validación de sintaxis detecta esos errores **antes de ejecutar**: localmente con linters, y automáticamente en el CI con un job de validación que protege el repositorio.

### 💡 Analogía

La validación de sintaxis es como pasar el documento por el corrector ortográfico antes de enviarlo: detecta errores obvios (ortografía = sintaxis) sin costo. El pipeline ejecutándose con un YAML roto es como enviar el documento y que el destinatario lo devuelva porque no se entiende: feedback lento y vergonzoso.

### 📖 Explicación técnica

Herramientas de validación:

* **YAML genérico**: \`yamllint\` (estilo + sintaxis), \`python yaml.safe_load\`, \`ruby YAML.load\`, \`npx yaml-lint\`.
* **Específicas de plataforma**:
  * GitHub Actions: \`actionlint\` (valida sintaxis YAML + expresiones \$\{{ \}\} + schema), \`yamlint\` de la propia plataforma en la pestaña Actions.
  * GitLab: \`gitlab-ci-lint\` (API o \`glab ci lint\`) — valida el \`.gitlab-ci.yml\` contra el schema real.
  * Azure: \`az pipelines validate\` (\`azure-pipelines.yml\`).
  * Jenkins: \`jenkins-linter\` para declarative pipelines.
* **Integración en CI**: un job \`lint-yaml\` que valida los YAML del repo y bloquea el merge si fallan.
* La validación no solo cubre sintaxis: valida **schema** (claves correctas para la plataforma) y **expresiones** (interpolaciones válidas).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Editar ci.yml
  │
  ▼
Validación local (yamllint, actionlint)
  ├── Error → corregir antes del push
  └── OK → push
  │
  ▼
Job "validate-yaml" en CI
  ├── actionlint → schema + sintaxis
  └── Resultado → status check en el PR
  │
  ▼
Merge bloqueado si el YAML es inválido
\`\`\`

### 💻 Ejemplo básico

Validar localmente con actionlint (GitHub Actions):

\`\`\`bash
actionlint .github/workflows/*.yml
# o descargar el binario de releases
go install github.com/rhysd/actionlint/cmd/actionlint@latest
actionlint
\`\`\`

Job de validación en CI:

\`\`\`yaml
validate-workflows:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: reviewdog/action-actionlint@v1
\`\`\`

### 🏢 Caso de uso profesional

Un equipo sufre fallos de pipeline por YAML inválido ("Error: parse error en línea 34") cada semana. Agregan el job \`validate-workflows\` con actionlint + un hook pre-commit con yamllint. En un mes, los errores de parseo desaparecen: el error se detecta en el editor, en el hook o en el primer check del CI.

### ⚠️ Errores comunes

* Confiar solo en la validación de la plataforma tras el push (feedback lento).
* Validar sintaxis sin validar schema (el YAML parsea pero la clave no existe).
* No bloquear el merge con el check de validación.
* Ignorar los warnings de yamllint (estilo y errores potenciales).
* Validar solo el archivo principal y no los includes/templates.

### 📋 Lo que debes recordar

* Valida localmente (linters) y en CI (job de validación).
* Usa la herramienta específica de la plataforma (actionlint, gitlab-ci-lint, az pipelines validate).
* La validación cubre sintaxis, schema y expresiones.
* El check de validación debe bloquear el merge.

### 🧪 Autoevaluación rápida

1. ¿Qué herramienta valida workflows de GitHub Actions?
2. ¿Qué diferencia hay entre validar sintaxis y validar schema?
3. ¿Dónde se debe integrar la validación?

---

1. actionlint: valida sintaxis YAML, schema de GitHub Actions y expresiones \$\{{ \}\}.
2. La sintaxis valida que el YAML parsea; el schema valida que las claves y valores son los que la plataforma espera (ej: \`runs-on\` válido).
3. En dos lugares: localmente (linter/hook pre-commit) para feedback inmediato, y como job de CI con status check que bloquee el merge.
`
export default content
