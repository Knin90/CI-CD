const content = `
## Módulo 14 — Quality gates

### 🎯 Objetivos de aprendizaje

* Definir qué es un quality gate y qué criterios incluye.
* Configurar gates en el pipeline (tests, cobertura, lint, security).
* Balancear la rigurosidad de los gates con el flujo del equipo.

### ❓ Problema real que resuelve

"¿Cuándo está bien este código?" sin criterios objetivos es una discusión infinita. El quality gate responde: un conjunto de umbrales automáticos (tests verdes, cobertura mínima, lint sin errores, vulnerabilidades máximas) que el pipeline aplica en cada cambio. Si el gate falla, el código no avanza — la calidad se vuelve una propiedad medible, no una opinión.

### 💡 Analogía

El quality gate es el control de calidad del aeropuerto: antes de embarcar (merge/release), el equipaje (código) pasa por controles automáticos (rayos X = tests, peso = cobertura, prohibidos = vulnerabilidades). Los controles tienen umbrales claros y no dependen del humor del agente. Si algo no pasa, no embarca.

### 📖 Explicación técnica

Criterios típicos de un quality gate:

* **Tests**: 100% verdes (unit, integration).
* **Cobertura**: mínima por líneas y ramas (ej: 80% líneas).
* **Lint/estilo**: sin errores (warnings configurables).
* **Seguridad**: sin vulnerabilidades críticas/altas (SAST, SCA); máximos tolerados.
* **Performance**: límites de latencia/benchmarks.
* **Complejidad**: límites de complejidad ciclomática, duplicación.

Implementación:

* SonarQube/SonarCloud: gate server con quality gates configurables.
* Pipeline: checks con umbrales (jest thresholds, npm audit, eslint).
* Los gates se aplican en el PR (status checks) y en la release.
* Un gate debe ser **justo y estable**: gates que fallan por flakiness se ignoran.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
PR abierto → pipeline corre
  │
  ▼
Quality gate evalúa:
  ├── Tests verdes? ................ ✓
  ├── Cobertura >= 80%? ............. ✓ (84%)
  ├── Lint sin errores? ............. ✓
  ├── Vulnerabilidades altas = 0? ... ✗ (1 alta)
  │
  ▼
Gate ROJO → el PR no puede mergearse
  │
  ▼
Se corrige (o se justifica el riesgo) → gate verde → merge
\`\`\`

### 💻 Ejemplo básico

Gates en el pipeline:

\`\`\`bash
npm test -- --coverageThreshold='{"global":{"lines":80}}'
npm run lint
npm audit --audit-level=high   # falla si hay altas
\`\`\`

Con SonarQube: \`sonar.qualitygate=true\` y el status del análisis se reporta al PR.

### 🏢 Caso de uso profesional

Una empresa con SonarQube centralizado define gates por severidad del proyecto: los servicios de pagos exigen 85% de cobertura y cero code smells bloqueantes; las herramientas internas 60% y cero vulnerabilidades críticas. Cada PR reporta el status del gate; los merges a producción requieren gate verde. La calidad se estandarizó sin discusiones por proyecto.

### ⚠️ Errores comunes

* Gates demasiado laxos (no filtran nada) o imposibles (se esquivan).
* Gates con flakiness: el equipo aprende a ignorarlos.
* Optimizar la métrica en vez de la calidad (tests triviales para cobertura).
* Un solo gate global para proyectos con necesidades distintas.
* Gates que bloquean todo el equipo (demasiada rigurosidad sin margen).

### 📋 Lo que debes recordar

* Gate = umbrales automáticos que deciden si el código avanza.
* Criterios: tests, cobertura, lint, seguridad, performance.
* Se aplican en el PR y en la release.
* Un gate debe ser justo, estable y adaptado al proyecto.

### 🧪 Autoevaluación rápida

1. ¿Qué criterios puede incluir un quality gate?
2. ¿Dónde se aplican los gates?
3. ¿Qué pasa si un gate es inestable?

---

1. Tests verdes, cobertura mínima, lint sin errores, vulnerabilidades máximas y límites de performance/complejidad.
2. En cada Pull Request (como status checks que bloquean el merge) y antes de las releases.
3. El equipo aprende a ignorarlo, y el gate deja de proteger: debe ser estable para ser respetado.
`
export default content
