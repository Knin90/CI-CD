const content = `
## Módulo 7 — Runner labels

### 🎯 Objetivos de aprendizaje

* Explicar qué son los labels de un runner y cómo se usan.
* Configurar labels y dirigir jobs con \`tags\`/labels.
* Entender los labels como contrato entre jobs y runners.

### ❓ Problema real que resuelve

Sin labels, un job se ejecuta en cualquier runner — quizá en uno sin Docker, sin GPU o en el entorno equivocado. Los labels describen las capacidades del runner (SO, arquitectura, hardware, entorno) y los jobs los usan para elegir el runner correcto: es el **contrato** que conecta trabajo con capacidad.

### 💡 Analogía

Los labels son como las etiquetas de una herramienta: "solo para madera", "250V", "exterior". Un carpintero (job) que necesita cortar madera busca la sierra etiquetada para madera; usar una sierra para metal arruinaría el trabajo. Los labels evitan usar la herramienta equivocada.

### 📖 Explicación técnica

* Los **labels** son cadenas que describen un runner: \`self-hosted\`, \`linux\`, \`x64\`, \`gpu\`, \`docker\`, \`internal\`, \`arm64\`.
* **GitHub**: todos los self-hosted tienen el label \`self-hosted\`; los demás se agregan al registrar (\`--labels\`) o en la UI. Los jobs usan \`runs-on: [self-hosted, linux]\`.
* **GitLab**: se configuran con \`tags:\` en el runner y en el job; un job con \`tags: [gpu]\` solo corre en runners con esa tag.
* **Azure**: capabilities de los agents; los jobs usan \`demands\`.
* Reglas: el job especifica los labels que necesita; el runner los declara; la plataforma hace el match. Si ningún runner cumple, el job espera en cola.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Runner A: labels [self-hosted, linux, docker]
Runner B: labels [self-hosted, linux, gpu]

Job 1: runs-on: [self-hosted, linux, docker]
  → solo Runner A (tiene docker)

Job 2: runs-on: [self-hosted, linux, gpu]
  → solo Runner B (tiene gpu)

Job 3: runs-on: [self-hosted, linux, windows]  ← sin match
  → espera en cola (¡ningún runner coincide!)
\`\`\`

### 💻 Ejemplo básico

Labels en la configuración de un job:

\`\`\`yaml
jobs:
  ml-tests:
    runs-on: [self-hosted, linux, gpu]
    steps:
      - run: pytest tests/ml/

  docker-build:
    runs-on: [self-hosted, linux, docker]
    steps:
      - run: docker build -t app .
\`\`\`

### 🏢 Caso de uso profesional

Una empresa de ML tiene 3 tipos de runners: estándar (builds), con GPU (entrenamiento/tests de modelos) y con acceso a red interna (deploys). Los labels \`gpu\` y \`internal\` dirigen cada job al runner correcto; los jobs mal etiquetados quedan en cola en vez de ejecutarse en el entorno equivocado, y un job de build nunca ocupa una GPU cara.

### ⚠️ Errores comunes

* Jobs sin labels: se ejecutan en cualquier runner (impredecible).
* Labels inconsistentes: \`linux\` vs \`Linux\` (case-sensitive).
* Pedir labels que ningún runner tiene: cola infinita.
* Etiquetar de más: un job "docker" en un runner sin Docker.
* Cambiar labels sin actualizar los jobs que los usan.

### 📋 Lo que debes recordar

* Labels = capacidades declaradas del runner.
* Los jobs piden labels; la plataforma hace el match.
* Sin match → job en cola (revisa tus labels).
* Consistencia y documentación de labels en el equipo.

### 🧪 Autoevaluación rápida

1. ¿Qué son los labels de un runner?
2. ¿Qué sucede si ningún runner tiene los labels que pide un job?
3. ¿Cómo se agregan labels a un runner?

---

1. Etiquetas que describen las capacidades del runner (SO, arquitectura, hardware, entorno); los jobs las piden para elegir dónde ejecutarse.
2. El job queda en cola indefinidamente: no hay ningún runner compatible; hay que revisar labels o agregar runners.
3. Al registrar con \`--labels\` o editándolos en la UI de la plataforma.
`
export default content
