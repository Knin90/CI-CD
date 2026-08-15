const content = `
## Módulo 2 — Stages

### 🎯 Objetivos de aprendizaje

* Definir stages como fases de compuerta del pipeline.
* Diseñar el orden y la granularidad de las stages.
* Combinar stages secuenciales con jobs paralelos.

### ❓ Problema real que resuelve

El pipeline necesita fases con propósito y con compuertas: no se despliega lo que no se probó. Las stages organizan los jobs en fases lógicas que se ejecutan en orden, deteniéndose ante un fallo. Diseñar bien las stages (cuántas, cuáles, en qué orden) define la calidad y la velocidad del flujo de entrega.

### 💡 Analogía

Las stages son los peajes de una autopista: cada peaje (build, test, security, deploy) valida que el vehículo (código) siga siendo apto para continuar. Si el vehículo no pasa el control (fallo), no avanza al siguiente peaje. El diseño de la ruta (número y orden de peajes) equilibra seguridad y velocidad.

### 📖 Explicación técnica

* **Stage**: fase lógica del pipeline; contiene uno o más jobs del mismo propósito.
* Reglas de ejecución:
  * Las stages corren en **orden secuencial**.
  * Los jobs de una misma stage corren en **paralelo** (si los runners lo permiten).
  * Si un job de una stage falla, la stage falla y el pipeline se detiene (salvo configuración).
* Diseño:
  * Stages por **propósito** y por **compuerta**: ¿qué debe validarse antes de avanzar?
  * Modelo típico: build → test → security → package → deploy.
  * Granularidad: pocas stages (menos overhead) vs muchas (más control). Equilibrio.
  * Stages opcionales: deploy solo en ciertas ramas (\`if\`/rules).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
build ──► test ──► security ──► package ──► deploy
  │         │          │            │          │
  compile   unit       sast         image      staging
            integration              │         production (aprobación)
  (jobs en paralelo dentro de la stage)
  │
  ▼
Si security falla → package y deploy NO se ejecutan
\`\`\`

### 💻 Ejemplo básico

Stages con paralelismo (GitLab CI):

\`\`\`yaml
stages: [build, test, security, deploy]

build-app:
  stage: build
  script: npm run build

unit:
  stage: test
  script: npm run test:unit

integration:
  stage: test
  script: npm run test:integration

sast:
  stage: security
  script: npm run sast

deploy:
  stage: deploy
  script: ./deploy.sh
  only: [main]
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de una app médica define stages estrictas: build, test (unit + integration en paralelo), security (SAST + SCA), compliance (licencias) y deploy (staging + producción con aprobación). Cada stage es una compuerta auditada: nada llega a producción sin pasar todas. Cuando el escaneo de compliance detecta una licencia nueva, el pipeline se detiene antes del deploy — el diseño de stages es la política de seguridad en ejecución.

### ⚠️ Errores comunes

* Una sola stage con todo: sin compuertas ni paralelismo.
* Stages sin propósito claro: "stage 1", "stage 2".
* Demasiadas stages: overhead de runners por stage.
* Deploy en la misma stage que los tests.
* Stages que continúan tras fallo sin motivo.

### 📋 Lo que debes recordar

* Stage = fase de compuerta con propósito.
* Stages secuenciales; jobs paralelos dentro de la stage.
* Un fallo en la stage detiene el flujo.
* Diseña por compuertas: qué debe validarse antes de avanzar.

### 🧪 Autoevaluación rápida

1. ¿Cómo se ejecutan las stages y los jobs dentro de ellas?
2. ¿Qué sucede si una stage falla?
3. ¿Cuál es el modelo típico de stages de un pipeline?

---

1. Las stages se ejecutan en orden secuencial; los jobs dentro de una misma stage se ejecutan en paralelo.
2. La stage falla y el pipeline se detiene: las siguientes stages no se ejecutan (compuerta).
3. build → test → security → package → deploy, donde cada fase agrupa los jobs de su propósito.
`
export default content
