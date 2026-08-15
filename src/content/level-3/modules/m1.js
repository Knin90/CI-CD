const content = `
## Módulo 1 — YAML: el lenguaje de los pipelines

### 🎯 Objetivos de aprendizaje

* Explicar por qué YAML se convirtió en el estándar de configuración de pipelines.
* Identificar las fortalezas y trampas del formato.
* Entender la relación: YAML → definición del pipeline → plataforma → ejecución.

### ❓ Problema real que resuelve

Los pipelines necesitan un formato de configuración **legible por humanos y parseable por máquinas**: alguien debe poder revisar en un PR "qué hace el pipeline" sin aprender un lenguaje de programación, y la plataforma debe poder validarlo y ejecutarlo. YAML (YAML Ain't Markup Language) cumple ese rol: es declarativo, estructurado y cercano al lenguaje natural — por eso GitHub Actions, GitLab CI, Ansible y Kubernetes lo usan.

### 💡 Analogía

YAML es como una ficha técnica escrita de forma clara: "el motor es eléctrico, la batería es de 50kWh, el color es rojo". Una máquina puede leerla y construir el coche; una persona puede leerla y entender el coche sin ser ingeniero. Los pipelines escritos en YAML son esa ficha técnica del proceso de entrega.

### 📖 Explicación técnica

* **YAML**: formato de serialización de datos basado en indentación, diseñado para ser fácil de leer y escribir.
* Por qué en pipelines: **declarativo** (describes qué quieres, no cómo), **legible** (revisable en PRs), **estándar** (mismo formato en muchas plataformas), **versionable** (es texto).
* La cadena: el YAML define el pipeline → la plataforma lo parsea y valida → genera el plan de ejecución → los runners lo ejecutan.
* **Trampas** de YAML: la indentación importa (espacios, no tabs), los "truthy" (valores que parecen booleanos), el problema \`on\` de GitHub Actions, las anclas y los caracteres especiales en strings.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
YAML (definición del pipeline)
  │
  ▼
Parser de la plataforma (valida sintaxis)
  │
  ▼
Modelo: stages → jobs → steps
  │
  ▼
Plan de ejecución (grafo)
  │
  ▼
Runners ejecutan los steps
\`\`\`

### 💻 Ejemplo básico

El mismo concepto en tres plataformas (todas YAML):

\`\`\`text
GitHub Actions:  .github/workflows/ci.yml
GitLab CI:       .gitlab-ci.yml
Azure DevOps:    azure-pipelines.yml
\`\`\`

\`\`\`yaml
# GitHub Actions — ejemplo mínimo
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Hola desde el pipeline"
\`\`\`

### 🏢 Caso de uso profesional

Un equipo centraliza los estándares de sus pipelines en templates YAML versionadas: los desarrolladores de 20 servicios usan la misma estructura (stages, jobs, steps estándar) y solo cambian las partes específicas (comandos de build, tests). La revisión de los PRs de pipelines es rápida porque todos hablan el mismo YAML, y los errores de sintaxis se detectan en la validación de la plataforma antes de ejecutar.

### ⚠️ Errores comunes

* Tabs en lugar de espacios: error de parseo inmediato.
* Confiar en la indentación visual sin validar con un linter.
* Valores "truthy" inesperados (\`yes\`, \`on\`, \`true\` convertidos a booleanos).
* Strings con caracteres especiales sin comillas.
* No validar el YAML antes del push (el CI valida, pero el feedback es más lento).

### 📋 Lo que debes recordar

* YAML = configuración declarativa legible y parseable.
* La cadena: YAML → validación → plan → ejecución.
* La indentación es sintaxis: espacios, nunca tabs.
* Conoce las trampas del formato (truthy, \`on\`, caracteres especiales).

### 🧪 Autoevaluación rápida

1. ¿Por qué YAML es el estándar de configuración de pipelines?
2. ¿Qué dos audiencias debe satisfacer un archivo YAML de pipeline?
3. ¿Qué trampas típicas tiene el formato YAML?

---

1. Porque es declarativo, legible por humanos, parseable por máquinas, versionable y estándar en casi todas las plataformas de CI/CD.
2. A las personas (revisión y comprensión en PRs) y a las máquinas (parseo, validación y ejecución).
3. La indentación como sintaxis (espacios, no tabs), los valores truthy (\`on\`, \`yes\`) y los strings con caracteres especiales sin comillas.
`
export default content
