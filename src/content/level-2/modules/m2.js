const content = `
## Módulo 2 — Pipeline stages

### 🎯 Objetivos de aprendizaje

* Explicar qué es una **stage** y su papel organizativo en el pipeline.
* Definir stages típicas (build, test, security, package, deploy).
* Entender que las stages organizan el flujo y definen las compuertas.

### ❓ Problema real que resuelve

Un pipeline sin stages es una lista plana de tareas donde todo corre junto: no hay orden lógico, no se puede paralelizar, no se puede decidir "si falla esto, no sigas". Las stages organizan el pipeline en **fases con propósito**: cada stage agrupa jobs relacionados, se ejecuta en orden, y el resultado de una stage decide si la siguiente se ejecuta.

### 💡 Analogía

Un aeropuerto tiene fases de viaje: check-in, seguridad, embarque, vuelo. No puedes embarcar sin pasar seguridad, y cada fase tiene su propósito. Las stages del pipeline son esas fases: el código no puede desplegarse sin haber pasado por tests, ni testearse sin haberse compilado.

### 📖 Explicación técnica

* **Stage**: fase lógica del pipeline que agrupa uno o más jobs con el mismo propósito.
* Las stages se ejecutan **en orden secuencial** (build → test → deploy), y los jobs **dentro** de una stage pueden correr en paralelo.
* Si una stage falla, las siguientes no se ejecutan (por defecto) — la stage es una **compuerta**.
* Stages típicas de un pipeline profesional:

\`\`\`text
build → test → security → package → deploy
\`\`\`

* Se pueden definir stages opcionales (ejecutar solo bajo condiciones: deploy solo en main).
* El número y nombre de stages depende del proyecto, pero el modelo mental es el mismo: validar antes de avanzar.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Stage 1: Build ──── Job: compile
  │                  Job: lint
  ▼ (todo verde)
Stage 2: Test ────── Job: unit
  │                  Job: integration
  ▼ (todo verde)
Stage 3: Security ── Job: sast
  │                  Job: sast-deps
  ▼ (todo verde)
Stage 4: Package ─── Job: docker-image
  │
  ▼ (todo verde)
Stage 5: Deploy ──── Job: staging
                     Job: production (con aprobación)
\`\`\`

### 💻 Ejemplo básico

Stages con jobs paralelos dentro de test (GitLab CI):

\`\`\`yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script: npm run build

unit:
  stage: test
  script: npm run test:unit

integration:
  stage: test
  script: npm run test:integration

deploy:
  stage: deploy
  script: ./deploy.sh
  only:
    - main
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de una app financiera define 5 stages: build (compila el monorepo), test (unit + integration en paralelo), security (SAST + SCA), package (imagen Docker firmada) y deploy (staging y producción con aprobación). Cada stage es una compuerta: si el escaneo de seguridad detecta una vulnerabilidad crítica, el pipeline se detiene y la imagen nunca llega al registry.

### ⚠️ Errores comunes

* Una sola stage con todo: sin orden ni paralelismo, el pipeline es una script gigante.
* Stages que no son compuertas (continuar tras fallo sin motivo).
* Mezclar jobs de distintos propósitos en la misma stage.
* Deploy en la misma stage que los tests: se despliega sin validar.
* Demasiadas stages: cada stage añade overhead de arranque de runners.

### 📋 Lo que debes recordar

* Stage = fase lógica que agrupa jobs con el mismo propósito.
* Stages en secuencia; jobs dentro de una stage en paralelo.
* La stage es una compuerta: si falla, el flujo se detiene.
* Modelo típico: build → test → security → package → deploy.

### 🧪 Autoevaluación rápida

1. ¿En qué orden se ejecutan las stages y los jobs dentro de una stage?
2. ¿Qué sucede si una stage falla?
3. ¿Cuáles son las stages típicas de un pipeline profesional?

---

1. Las stages se ejecutan en orden secuencial (build antes de test, test antes de deploy); los jobs dentro de una misma stage se ejecutan en paralelo.
2. Por defecto, las siguientes stages no se ejecutan: la stage actúa como compuerta que detiene el flujo.
3. Build, test, security, package y deploy — cada una agrupando los jobs de su propósito.
`
export default content
