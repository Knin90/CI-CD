const content = `
## Módulo 6 — Parallel jobs

### 🎯 Objetivos de aprendizaje

* Explicar cómo y cuándo paralelizar jobs.
* Reducir el tiempo de feedback con ejecución paralela.
* Gestionar los límites de paralelismo (runners, recursos).

### ❓ Problema real que resuelve

Un pipeline secuencial con 10 jobs de 3 minutos tarda 30 minutos; el mismo pipeline con los jobs independientes en paralelo tarda el máximo de uno solo. La paralelización es la palanca más directa para acelerar el feedback: los jobs independientes corren a la vez y el tiempo total pasa de la suma al máximo.

### 💡 Analogía

Un equipo de mudanza: si un solo cargador hace todo (secuencial), tarda horas; si varios cargadores trabajan en paralelo (muebles distintos a la vez), el camión se llena en minutos. El límite es el tamaño del camión (runners) y la dependencia entre muebles (jobs).

### 📖 Explicación técnica

* Los jobs **independientes** dentro de la misma stage corren en paralelo por defecto.
* Con \`needs\`, los jobs paralelos pueden cruzar stages (un job de la stage N corre en cuanto sus needs de la stage N-1 terminan).
* Condiciones para paralelizar:
  * Sin dependencia de datos ni de orden.
  * Runners disponibles (el paralelismo está limitado por la capacidad).
  * Recursos de la plataforma (concurrencia de jobs pagados/limítada).
* Ejemplos típicos: tests por servicio, lint + sast + unit, builds por SO (matrix).
* Costo: más runners/recursos simultáneos (facturación o infraestructura).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Secuencial (10 jobs × 3 min) = 30 min
  j1 → j2 → j3 → ... → j10

Paralelo (10 jobs × 3 min, 10 runners) = ~3 min
  j1 ─┐
  j2 ─┤
  j3 ─┼──► (todos a la vez)
  ... ┤
  j10 ┘
  │
  ▼
Límite: solo 5 runners → 2 tandas de 5 → ~6 min
\`\`\`

### 💻 Ejemplo básico

Paralelismo por servicio (GitLab):

\`\`\`yaml
test-api:
  stage: test
  script: cd services/api && npm test

test-web:
  stage: test
  script: cd services/web && npm test

test-mobile:
  stage: test
  script: cd services/mobile && npm test
\`\`\`

Los tres corren en paralelo en la stage test.

### 🏢 Caso de uso profesional

Un pipeline de monorepo pasaba de 45 minutos secuenciales a 40 segundos de feedback gracias a tres optimizaciones: tests por servicio en paralelo (12 jobs), lint+sast+unit en la misma stage, y \`needs\` para que el deploy no esperara todos los jobs. El p95 del tiempo de CI bajó a 6 minutos, y los desarrolladores dejaron de abrir PRs "a ciegas".

### ⚠️ Errores comunes

* Paralelizar jobs dependientes (fallan por carrera).
* Ignorar el límite de runners: "paralelo" que en realidad encola.
* Más paralelismo que recursos: saturación y costos.
* Jobs paralelos que compiten por el mismo recurso (DB compartida de tests).
* No medir el tiempo real de cola vs ejecución.

### 📋 Lo que debes recordar

* Paraleliza jobs independientes: el tiempo total pasa de suma a máximo.
* El paralelismo está limitado por runners y concurrencia.
* \`needs\` permite paralelismo cruzando stages.
* Mide la cola: si los jobs esperan runners, el paralelismo no ayuda.

### 🧪 Autoevaluación rápida

1. ¿Qué condición deben cumplir los jobs para paralelizarse?
2. ¿Qué limita el paralelismo real?
3. ¿Cómo reduce el tiempo de feedback la paralelización?

---

1. Independencia: sin dependencia de datos ni de orden entre ellos.
2. La capacidad de runners/concurrencia de la plataforma: si no hay runners, los jobs "paralelos" se encolan.
3. El tiempo total pasa de la suma de duraciones a la duración del job más largo (más la espera por runners).
`
export default content
