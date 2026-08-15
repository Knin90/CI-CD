const content = `
## Módulo 5 — Examen integral y rúbrica profesional

### 🎯 Objetivos de aprendizaje

* Integrar las cuatro áreas en el examen final.
* Autoevaluarte con una rúbrica profesional.
* Certificar tu nivel y planificar lo siguiente.

### ❓ Problema real que resuelve

Las cuatro áreas se evaluaron por separado; el examen integral las cruza: un caso real que exige fundamentos, delivery, seguridad y operación a la vez (nivel 25). La rúbrica profesional da criterios objetivos para saber dónde estás y qué te falta — y cierra el curso con una certificación honesta de tu nivel.

### 💡 Analogía

El examen integral es la prueba de conducción completa: no es teoría separada (señales, mecánica, normas), es conducir en el tráfico real usando todo a la vez. Y la rúbrica es la nota con criterios: no "conduces más o menos", sino qué dominas (fundamentos), qué haces bien (delivery), qué proteges (seguridad) y cómo operas (infra) — con evidencia de cada uno.

### 📖 Explicación técnica

* **Examen integral**: un caso real de extremo a extremo que cruza las áreas:
  * Un cambio va de Git a producción (Área 1-2): CI, build, tests, artifacts, deploy.
  * Con seguridad integrada (Área 3): scan, secrets, permisos, gates.
  * Y operado profesionalmente (Área 4): infra, verificación, monitoreo, troubleshooting, incidente.
* **Rúbrica profesional** por área (niveles 25 y 23):
  * **Fundamentos** (Área 1): modelo mental de CI/CD, Git, pipeline, triggers.
  * **Delivery** (Área 2): build reproducible, tests, artifacts, deploys verificados.
  * **DevSecOps** (Área 3): supply chain, secrets, mínimo privilegio, gates efectivos.
  * **Infra y Ops** (Área 4): IaC, K8s, observabilidad, troubleshooting metódico.
* Niveles de la rúbrica: básico (lo hace con guía), competente (lo hace solo), avanzado (lo hace bien y lo explica), experto (lo diseña y enseña).
* **Certificación honesta**: marca tu nivel real por área con evidencia (proyecto del nivel 24, incidentes resueltos, pipelines operados) — y define el plan: qué área subir de nivel y cómo (siguiente proyecto, práctica, lectura).
* Buenas prácticas: el examen se hace sobre trabajo REAL (nivel 24), la autoevaluación es honesta (sobrevalorarse no ayuda — nivel 23), y el resultado es un plan, no un veredicto.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Caso integral: commit → producción
   ↓
Fundamentos: modelo + flujo completo
   ↓
Delivery: build → tests → artifacts → deploy
   ↓
DevSecOps: scan + secrets + permisos + gates
   ↓
Infra/Ops: verificación + monitoreo + incidente
   ↓
Rúbrica: nivel real por área con evidencia
   ↓
Plan: qué mejorar y cómo
\`\`\`

### 🧪 Ejercicios

1. Diseña el caso integral de tu stack: de commit a producción con todas las áreas.
2. Autoevalúate con la rúbrica: nivel real por área y evidencia de cada uno.
3. Escribe tu plan: qué área subir de nivel y 3 acciones concretas.

### ⚠️ Errores comunes

* Sobrevalorar el nivel (la autoevaluación honesta es el objetivo — nivel 23).
* Evaluar teoría sin evidencia real (el proyecto del nivel 24 es la prueba).
* Terminar sin plan (el curso cierra, el aprendizaje continúa).
* Ignorar el área más débil (se nota en producción — nivel 22).

### 🔗 Conexión DevOps

El examen integral cruza las cuatro áreas: fundamentos (niveles 0-5), delivery (niveles 6-13), DevSecOps (niveles 9-12) e infra/ops (niveles 14-22), sobre la base del proyecto (nivel 24) y las buenas prácticas (nivel 23). Es el cierre del curso: la certificación honesta de tu nivel y el plan para seguir creciendo.
`
export default content
