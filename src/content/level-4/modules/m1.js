const content = `
## Módulo 1 — Runner

### 🎯 Objetivos de aprendizaje

* Definir qué es un **runner** y su papel en la ejecución de jobs.
* Explicar la relación runner ↔ orquestador ↔ job.
* Entender por qué el runner es uno de los conceptos más omitidos y más importantes.

### ❓ Problema real que resuelve

El pipeline define *qué* ejecutar; el runner es *dónde* y *quién* lo ejecuta. Sin runners, los jobs no tienen máquina: la configuración es solo texto. Comprender el runner es comprender el plano de ejecución: quién tiene los permisos, qué entornos hay disponibles, por qué un job espera en cola y cómo se escala la capacidad.

### 💡 Analogía

El pipeline es la receta; el runner es la cocina donde se cocina. Puedes tener la mejor receta del mundo, pero si la cocina (runner) no tiene horno (herramientas), gas (recursos) o permisos de seguridad (acceso), el plato no sale. Y si solo tienes una cocina, los platos se encolan.

### 📖 Explicación técnica

* **Runner** (GitLab/GitHub) o **Agent** (Azure/Jenkins): agente que descarga un job del orquestador, lo ejecuta en su máquina y reporta el resultado (logs, exit codes, artefactos).
* Componentes de un runner:
  * **Máquina**: host, VM, contenedor o pod donde se ejecuta.
  * **Agente**: proceso que se comunica con la plataforma (long-polling o websockets).
  * **Entorno**: SO, herramientas instaladas, imágenes disponibles.
  * **Registro**: credenciales que lo vinculan al proyecto/org.
  * **Labels**: etiquetas que lo describen (OS, arquitectura, capacidades).
* Flujo: la plataforma encola el job → un runner disponible y compatible lo toma → ejecuta los steps → reporta.
* El runner puede ser **hosted** (gestionado por la plataforma) o **self-hosted** (de tu infraestructura).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
CI/CD Platform (orquestador)
  │   (encola el job, espera un runner)
  ▼
Runner (agente)
  │   (descarga el job, clona el repo)
  ▼
Ejecución en la máquina del runner
  │   (steps, tests, builds)
  ▼
Reporte: logs + exit codes + artefactos
  │
  ▼
Resultado: build / test / deploy completado
\`\`\`

### 💻 Ejemplo básico

Selección de runner por label (GitLab):

\`\`\`yaml
build:
  tags:
    - docker
    - linux
  script:
    - docker build -t app .
\`\`\`

El job solo se ejecutará en runners con los labels \`docker\` y \`linux\`.

### 🏢 Caso de uso profesional

Un equipo tiene jobs que necesitan GPU para tests de ML. Configuran runners self-hosted con GPUs y labels \`gpu\`. Los jobs de ML se etiquetan con \`tags: [gpu]\`; los demás corren en runners hosted estándar. Cada tipo de trabajo tiene su plano de ejecución correcto, sin desperdiciar recursos.

### ⚠️ Errores comunes

* Confundir runner con la plataforma en sí.
* Jobs sin tags/labels: se ejecutan en cualquier runner, quizá sin las herramientas necesarias.
* No dimensionar la capacidad: colas infinitas por falta de runners.
* Runners con permisos excesivos (ver seguridad de runners).
* Olvidar que el runner ejecuta código de terceros: es un riesgo de seguridad.

### 📋 Lo que debes recordar

* Runner = la máquina/agente que ejecuta los jobs.
* Flujo: orquestador encola → runner ejecuta → reporta.
* Labels/tags seleccionan el runner adecuado.
* Hosted (gestionado) vs self-hosted (propio): decisión clave.

### 🧪 Autoevaluación rápida

1. ¿Qué hace exactamente un runner?
2. ¿Cómo se selecciona el runner para un job?
3. ¿Qué diferencia hay entre hosted y self-hosted?

---

1. Descarga un job del orquestador, lo ejecuta en su máquina (clonando el repo y corriendo los steps) y reporta logs, exit codes y artefactos.
2. Con tags/labels en la configuración del job: solo los runners con esas etiquetas pueden ejecutarlo.
3. Hosted lo gestiona y mantiene la plataforma (cero mantenimiento, facturado por uso); self-hosted corre en tu infraestructura (control total, pero lo mantienes tú).
`
export default content
