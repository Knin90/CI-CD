const content = `
## Módulo 12 — Reusable configuration

### 🎯 Objetivos de aprendizaje

* Explicar los mecanismos de reutilización de configuración de pipelines.
* Usar \`extends\`, \`include\`, templates y reusable workflows.
* Aplicar DRY sin perder legibilidad.

### ❓ Problema real que resuelve

Con muchos servicios o proyectos, cada pipeline copiado se convierte en 20 copias divergentes: un equipo arregla un bug de seguridad en un pipeline y los otros 19 siguen rotos. La configuración reutilizable define el pipeline **una vez** (template, include, reusable workflow) y lo consume en todos lados: las correcciones se propagan automáticamente.

### 💡 Analogía

Los templates de configuración son como los planos de una casa modelo: la inmobiliaria construye 50 casas a partir del mismo plano y todas son iguales (con variaciones menores). Si el plano tiene un error de cableado, se corrige una vez y las 50 casas quedan corregidas. Sin plano, habría que revisar casa por casa.

### 📖 Explicación técnica

Mecanismos por plataforma:

* **GitLab CI**:
  * \`extends\`: un job hereda la configuración de otro (\`extends: .template-job\`).
  * \`include\`: importa archivos YAML (local, proyecto, remoto) — \`include:\n  - local: '/ci/templates.yml'\`.
  * Jobs con prefijo \`.\` son **plantillas ocultas** (no se ejecutan).
* **GitHub Actions**:
  * **Reusable workflows**: workflows llamados con \`uses: org/repo/.github/workflows/reusable.yml@v1\` + \`on: workflow_call\`.
  * **Composite actions**: acciones que agrupan steps reutilizables.
* **Azure DevOps**: templates \`extends:\` de archivos \`templates/*.yml\` con parámetros.
* **Jenkins**: shared libraries con funciones de pipeline.
* Reglas de oro: parametriza lo que cambia (versiones, rutas, entornos); versiona los templates (tags); prueba el template antes de propagarlo.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Template: ci/base.yml (versionado)
  ├── stage de build estándar
  ├── stage de test estándar
  └── variables por defecto

Servicio A: include + extends (solo su build/test)
Servicio B: include + extends (igual)
  │
  ▼
La plataforma combina en tiempo de parseo
  │
  ▼
Corrección en el template → A y B actualizados en el próximo push
\`\`\`

### 💻 Ejemplo básico

GitLab con include + extends:

\`\`\`yaml
# ci/templates.yml
.build-job:
  stage: build
  script:
    - npm ci
    - npm run build
\`\`\`

\`\`\`yaml
# .gitlab-ci.yml
include:
  - local: '/ci/templates.yml'

build-app:
  extends: .build-job
  variables:
    APP_NAME: web
\`\`\`

### 🏢 Caso de uso profesional

Una organización con 40 microservicios centraliza su CI/CD en un template GitLab: stages estándar (build, test, security, deploy), escaneo de imágenes y notificaciones. Cada servicio solo define sus variables y su script específico. Cuando aparece una vulnerabilidad crítica en una imagen base, el equipo la corrige **una vez** en el template y los 40 pipelines quedan protegidos en la siguiente ejecución.

### ⚠️ Errores comunes

* Templates sin versionar o sin pruebas: un cambio rompe todos los consumidores.
* Sobrecarga de parámetros: el template se vuelve inmanejable.
* Override excesivo: cada consumidor redefine todo y el template pierde sentido.
* Dependencias ocultas entre templates (incluir A que incluye B).
* Reutilizar sin documentar: nadie sabe qué hace el template.

### 📋 Lo que debes recordar

* Reutilización: extends/include (GitLab), reusable workflows (GitHub), templates (Azure).
* DRY real: corrige una vez, propaga a todos.
* Parametriza lo que cambia; versiona los templates.
* Prueba el template antes de propagarlo a todos.

### 🧪 Autoevaluación rápida

1. ¿Qué mecanismos de reutilización ofrece GitLab CI?
2. ¿Qué es un reusable workflow en GitHub Actions?
3. ¿Qué regla de oro debe seguir un template?

---

1. \`extends\` (heredar configuración de otro job), \`include\` (importar archivos YAML) y las plantillas ocultas (jobs con prefijo \`.\`).
2. Un workflow que se define con \`on: workflow_call\` y se invoca desde otro con \`uses: org/repo/.github/workflows/...@v1\`.
3. Versionarlo y probarlo antes de propagarlo: un cambio en el template afecta a todos los consumidores a la vez.
`
export default content
