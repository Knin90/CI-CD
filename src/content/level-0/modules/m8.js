const content = `
## Módulo 8 — DevOps lifecycle

### 🎯 Objetivos de aprendizaje

* Recorrer las fases del ciclo de vida DevOps y su orden lógico.
* Ubicar CI y CD dentro del ciclo completo.
* Entender el ciclo como un bucle de mejora continua, no una línea.

### ❓ Problema real que resuelve

Los equipos suelen automatizar "pedazos" sin entender dónde encajan: se construye un pipeline de tests sin monitoreo, o se monitorea sin feedback hacia el equipo de desarrollo. El ciclo de vida DevOps organiza las fases en un **bucle** (no una línea), de modo que cada fase alimenta a la siguiente y el monitoreo devuelve aprendizaje al planning. Sin ese modelo, la automatización queda fragmentada y sus beneficios se pierden.

### 💡 Analogía

El ciclo del agua: el agua se evapora (PLAN), forma nubes (CODE), llueve (BUILD/TEST), llena ríos (DEPLOY), llega al mar (OPERATE/MONITOR) y se evapora de nuevo (FEEDBACK). Es un ciclo continuo, no una tubería de un solo sentido. Interrumpir cualquier eslabón corta el ciclo completo. DevOps funciona igual: cada fase retroalimenta a la anterior.

### 📖 Explicación técnica

Fases del ciclo DevOps:

* **PLAN**: definir qué construir (backlog, prioridades, diseño).
* **CODE**: escribir el código con control de versiones (Git).
* **BUILD**: compilar, empaquetar, resolver dependencias.
* **TEST**: validar automáticamente (unit, integration, e2e, seguridad).
* **PACKAGE**: generar el artefacto final (imagen, binario, paquete).
* **RELEASE**: versionar y preparar la publicación (tags, changelog).
* **DEPLOY**: publicar en los entornos (staging, producción).
* **OPERATE**: mantener el sistema en funcionamiento.
* **MONITOR**: observar logs, métricas, trazas y salud.
* **FEEDBACK**: convertir las observaciones en mejoras del producto y del proceso.

Cada fase puede mapearse a herramientas concretas; el pipeline de CI/CD es la automatización de las fases centrales (BUILD → DEPLOY).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
        PLAN
         │
         ▼
        CODE
         │
         ▼
        BUILD
         │
         ▼
        TEST
         │
         ▼
       PACKAGE
         │
         ▼
       RELEASE
         │
         ▼
        DEPLOY
         │
         ▼
       OPERATE
         │
         ▼
       MONITOR
         │
         ▼
      FEEDBACK ──────────► vuelve a PLAN
\`\`\`

### 💻 Ejemplo básico

Mapeo de fases a herramientas típicas de un pipeline profesional:

\`\`\`text
PLAN        → Jira / GitHub Projects
CODE        → Git, Pull Requests, code review
BUILD       → npm ci && npm run build
TEST        → Jest, pytest, SAST, tests e2e
PACKAGE     → docker build → imagen v1.2.3
RELEASE     → git tag v1.2.3 + changelog
DEPLOY      → pipeline de CD (staging → prod)
OPERATE     → Kubernetes, systemd
MONITOR     → Prometheus, Grafana, ELK
FEEDBACK    → DORA metrics, alertas, retroalimentación al backlog
\`\`\`

### 🏢 Caso de uso profesional

Un equipo nota que los incidentes de producción se repiten cada mes. Aplican el ciclo: MONITOR muestra el patrón (despliegues los viernes a última hora), FEEDBACK convierte eso en una regla de proceso (no desplegar viernes sin revisión senior), y PLAN incluye la mejora. El ciclo deja de ser un diagrama y se convierte en el mecanismo real de mejora del equipo.

### ⚠️ Errores comunes

* Tratar el ciclo como una línea que termina en DEPLOY.
* Automatizar BUILD/TEST y dejar OPERATE/MONITOR manuales.
* Monitorear sin feedback: los datos se acumulan y nadie actúa.
* Saltarse PACKAGE/RELEASE: versionar mal o no versionar rompe la trazabilidad.

### 📋 Lo que debes recordar

* DevOps es un **bucle**: cada fase alimenta a la siguiente y MONITOR → FEEDBACK → PLAN cierra el ciclo.
* CI/CD automatiza las fases centrales (BUILD a DEPLOY).
* La trazabilidad (RELEASE con versiones claras) sostiene la confianza del ciclo.
* Sin feedback, el ciclo se corta y no hay mejora continua.

### 🧪 Autoevaluación rápida

1. ¿Por qué el ciclo DevOps es un bucle y no una línea?
2. ¿Qué fases automatiza típicamente un pipeline de CI/CD?
3. ¿Qué fase convierte el monitoreo en mejora real?

---

1. Porque el monitoreo genera feedback que vuelve al planning y mejora el producto y el proceso; una línea terminaría en el despliegue y perdería la mejora continua.
2. BUILD, TEST, PACKAGE, RELEASE y DEPLOY (las fases centrales de integración y entrega).
3. FEEDBACK: convierte las observaciones de MONITOR en decisiones y cambios en PLAN, cerrando el ciclo de mejora.
`
export default content
