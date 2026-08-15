const content = `
## Módulo 9 — Pipeline configuration

### 🎯 Objetivos de aprendizaje

* Estructurar la configuración de un pipeline: metadatos, triggers, jobs y defaults.
* Organizar el archivo YAML para máxima legibilidad y mantenibilidad.
* Entender los elementos raíz comunes entre plataformas.

### ❓ Problema real que resuelve

Un archivo de pipeline desordenado es difícil de revisar, mantener y diagnosticar. La configuración bien estructurada sigue un patrón predecible: primero los metadatos y triggers (qué y cuándo), luego los defaults y variables (contexto), y al final los jobs (el trabajo). Ese orden permite a cualquier persona del equipo navegar el pipeline sin esfuerzo.

### 💡 Analogía

La configuración del pipeline es como el índice y las primeras páginas de un manual: portada (nombre del pipeline), fecha de publicación (versión), índice de contenidos (jobs) y glosario (variables). Si cada manual ordenara las secciones distinto, nadie encontraría nada. Un orden consistente hace que todos los pipelines se lean igual.

### 📖 Explicación técnica

Elementos raíz típicos (varía por plataforma):

* **Metadatos**: \`name\` (GitHub/Azure), descripción, versión.
* **Triggers**: \`on\` (GitHub), \`trigger\`/\`schedule\` (Azure), \`workflow:\` (GitLab usa \`on\`/rules por job).
* **Defaults**: \`defaults:\` (GitHub), \`default:\` (GitLab), configuración común de jobs.
* **Variables**: \`env\` (GitHub), \`variables\` (GitLab/Azure).
* **Jobs**: \`jobs\` (GitHub/Azure), jobs de nivel raíz (GitLab).
* **Reutilización**: \`include\` (GitLab), \`reusable workflows\` (GitHub), \`extends\`.

Orden recomendado del archivo:

\`\`\`text
1. Metadatos (nombre, descripción)
2. Triggers (cuándo corre)
3. Permisos / configuración global
4. Variables y defaults
5. Jobs (con stages/dependencias)
6. Plantillas y reutilización (si aplica)
\`\`\`

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
name: CI + Deploy      ← metadatos
on: [push]             ← trigger
env:                   ← contexto global
  NODE_VERSION: 20
jobs:                  ← el trabajo
  test:
    ...
  deploy:
    ...

Parser → valida → plan de ejecución → runners
\`\`\`

### 💻 Ejemplo básico

Configuración bien ordenada (GitHub Actions):

\`\`\`yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

env:
  NODE_VERSION: 20

defaults:
  run:
    working-directory: ./app

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
\`\`\`

### 🏢 Caso de uso profesional

Un equipo define una plantilla de estructura para todos sus pipelines: nombre, triggers, permisos mínimos, variables, defaults y jobs. Todos los servicios siguen el mismo orden; los reviewers saben dónde buscar cada cosa y los pipelines nuevos se escriben en minutos rellenando la plantilla.

### ⚠️ Errores comunes

* Archivos caóticos: triggers al final, jobs al principio.
* Elementos duplicados (dos \`env:\` a nivel raíz).
* Configuración global (permisos) esparcida entre jobs.
* Mezclar convenciones de plataformas distintas en un mismo archivo.
* Sin comentarios de estructura (\`# Triggers\`, \`# Jobs\`) en pipelines largos.

### 📋 Lo que debes recordar

* Orden: metadatos → triggers → permisos → variables/defaults → jobs.
* Cada plataforma tiene sus elementos raíz: conócelos.
* Consistencia de estructura = pipelines legibles para todos.
* Comentarios de sección ayudan en pipelines largos.

### 🧪 Autoevaluación rápida

1. ¿Qué elementos raíz tiene típicamente la configuración de un pipeline?
2. ¿Qué orden se recomienda para el archivo YAML?
3. ¿Por qué la consistencia de estructura importa en equipos?

---

1. Metadatos (name), triggers (on), permisos/configuración global, variables/defaults y jobs.
2. Metadatos → triggers → permisos → variables/defaults → jobs (y plantillas al final).
3. Porque permite que cualquier persona navegue y revise cualquier pipeline sin curva de aprendizaje: todos se leen igual.
`
export default content
