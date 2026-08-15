const content = `
## Módulo 1 — Área 1: CI/CD Fundamentals

### 🎯 Objetivos de aprendizaje

* Evaluar los fundamentos de CI/CD.
* Repasar Git, pipelines, stages, jobs y triggers.
* Demostrar el modelo mental completo del CI.

### ❓ Problema real que resuelve

La evaluación final se divide en cuatro áreas (nivel 25). El Área 1 verifica los fundamentos: sin una base sólida — Git, el modelo de pipeline, stages/jobs, triggers y la diferencia entre CI y CD — todo lo demás se apoya en arena. Este módulo repasa y evalúa esa base.

### 💡 Analogía

El Área 1 es el examen de los cimientos: antes de evaluar los pisos (delivery, seguridad, infra), se comprueba que la base está bien. Un constructor no certifica el edificio si los cimientos están agrietados — y un profesional de CI/CD no puede certificarse sin dominar los fundamentos.

### 📖 Explicación técnica

* **Conceptos fundamentales** (niveles 0-5):
  * **CI vs CD**: integración continua (merge frecuente con verificación automática — nivel 2) vs entrega continua (el artefacto listo para desplegar en cualquier momento — nivel 12).
  * **Git** (nivel 1): flujo de trabajo, branches, PR, merge — el repositorio como fuente de verdad.
  * **Pipeline** (nivel 2): la automatización del flujo; stages (fases — nivel 5) y jobs (tareas — nivel 5).
  * **Triggers** (nivel 2): qué inicia el pipeline (push, PR, schedule, manual, webhook).
  * **Runner/agent** (nivel 4): quién ejecuta los jobs.
  * **Variables y configuración** (nivel 11): la configuración externa al código.
* **Modelo mental**: commit → trigger → pipeline (stages/jobs) → resultado (checks, artifacts) → CD (deploy) — con feedback y verificación en cada paso.
* Preguntas de evaluación típicas: ¿qué dispara un pipeline? ¿cuándo usar CI vs CD? ¿qué es un stage y qué un job? ¿qué hace el runner? ¿por qué Git es la base?

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Commit → trigger → pipeline
   ↓
Stages: lint → test → build → security → deploy
   ↓
Jobs dentro de cada stage (en runners)
   ↓
Resultado: checks + artifacts
   ↓
CD: el artefacto listo para desplegar
   ↓
Feedback: verde/rojo, métricas
\`\`\`

### 🧪 Ejercicios

1. Explica con tus palabras CI vs CD con un ejemplo real.
2. Dibuja el flujo de un commit hasta el despliegue (todos los componentes).
3. Autoevalúate: ¿qué es un stage, un job, un trigger y un runner?

### ⚠️ Errores comunes

* Confundir CI con CD (integración vs entrega — nivel 2).
* Mezclar triggers con stages (el "cuándo" con el "qué" — nivel 2).
* No distinguir stage de job (fase vs tarea — nivel 5).
* Olvidar que Git es la fuente de verdad del flujo (nivel 1).

### 🔗 Conexión DevOps

El Área 1 conecta con Git (nivel 1), CI/CD pipeline (nivel 2), YAML (nivel 3), runners (nivel 4) y jobs/stages (nivel 5). Es la base evaluada: el resto del examen se apoya en estos cimientos.
`
export default content
