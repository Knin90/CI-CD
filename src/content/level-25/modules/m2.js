const content = `
## Módulo 2 — Área 2: Software Delivery

### 🎯 Objetivos de aprendizaje

* Evaluar la entrega de software: builds, tests, artifacts y deploys.
* Repasar build automation, testing y deployment strategies.
* Demostrar el flujo de entrega completo y verificado.

### ❓ Problema real que resuelve

El Área 2 verifica la entrega: cómo el código se convierte en software desplegable de forma automática y verificada. Builds reproducibles (nivel 6), tests confiables (nivel 7), artifacts gestionados (nivel 8) y despliegues seguros (niveles 12-13) son el corazón del delivery. Sin esta área, el pipeline puede existir pero no entregar.

### 💡 Analogía

El Área 2 es el examen de la línea de producción: se evalúa cómo se fabrica el producto (build), cómo se comprueba su calidad (tests), cómo se almacena (artifacts) y cómo se entrega al cliente (deploy) — con garantías en cada paso. Un profesional certificado sabe que la entrega no es "subir archivos", es un flujo verificado de principio a fin.

### 📖 Explicación técnica

* **Build automation** (nivel 6): builds reproducibles, toolchains versionadas, artefactos inmutables (módulo 8 de 23).
* **Testing automation** (nivel 7): unit, integración, e2e; cobertura; tests en CI, no solo en local; flaky control (nivel 20).
* **Artifacts** (nivel 8): almacenamiento, retención, versionado, build once deploy many (módulo 9 de 23).
* **Environments** (nivel 12): dev, staging, prod con approvals y secrets aislados (nivel 12 y módulo 10 de 23).
* **Deployment strategies** (nivel 13): rolling, blue-green, canary; rollback (módulo 18 de 23); verificación post-deploy (nivel 20).
* Preguntas de evaluación típicas: ¿cómo se garantiza un build reproducible? ¿qué tests deben correr en CI? ¿qué es un artefacto inmutable y por qué? ¿qué estrategia de deploy usarías según el riesgo? ¿cómo verificas un despliegue?

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código → build reproducible
   ↓
Tests (unit/integración/e2e) en CI
   ↓
Artefacto inmutable (build once)
   ↓
Registry/almacén de artifacts
   ↓
Environments: dev → staging → prod (approvals)
   ↓
Deploy con estrategia + verificación + rollback
\`\`\`

### 🧪 Ejercicios

1. Explica cómo garantizarías un build reproducible en tu stack.
2. Diseña el flujo de entrega de un cambio: de commit a producción verificado.
3. Autoevalúate: ¿qué estrategia de deploy usarías para un servicio crítico?

### ⚠️ Errores comunes

* Builds no reproducibles (falta de lockfiles/toolchains — nivel 6).
* Tests que solo corren en local (nivel 7).
* Artefactos mutables (latest — módulo 8 de 23).
* Deploy sin verificación ni rollback (niveles 13 y 20).

### 🔗 Conexión DevOps

El Área 2 conecta con build automation (nivel 6), testing (nivel 7), artifacts (nivel 8), environments (nivel 12) y deployment strategies (nivel 13). Es el examen del delivery: el flujo completo, automático y verificado del código al cliente.
`
export default content
