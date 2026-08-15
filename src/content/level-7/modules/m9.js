const content = `
## Módulo 9 — Test reports

### 🎯 Objetivos de aprendizaje

* Generar y publicar reportes de tests en el pipeline.
* Interpretar reportes: pasados, fallidos, skipped, duración.
* Usar los reportes para diagnóstico y métricas.

### ❓ Problema real que resuelve

Los tests generan datos (cuántos pasaron, cuáles fallaron, cuánto tardaron), pero si no se publican, se pierden en los logs. Los reportes estructurados (JUnit XML, HTML, coverage) permiten: ver el resultado en la UI del pipeline, identificar el test fallido al instante, rastrear tendencias y alimentar métricas de calidad.

### 💡 Analogía

Los reportes de tests son como el parte médico del paciente tras la revisión: qué pruebas se hicieron, cuáles salieron bien, cuáles mal y con qué detalle. Un hospital que no documentara los partes no podría diagnosticar ni hacer seguimiento. Los reportes son la documentación clínica del código.

### 📖 Explicación técnica

Formatos:

* **JUnit XML**: estándar interoperable (la mayoría de los frameworks lo exportan).
* **HTML**: reporte navegable con detalles y traces.
* **Coverage**: cobertura por archivo (LCOV, Cobertura XML).
* **TAP**: formato texto.

Publicación en el pipeline:

* GitHub: \`actions/upload-artifact\` + \`test-reporter\` (dorny/test-reporter) que comenta el PR.
* GitLab: \`artifacts: reports: junit:\` — el pipeline muestra los tests en la UI (incluye el badge de tests).
* Azure: \`PublishTestResults@2\` con formato JUnit.
* Jenkins: junit plugin.

Qué leer en un reporte:

* **Totales**: passed, failed, skipped, errores.
* **Duración**: tests lentos (candidatos a optimizar).
* **Traces**: stack del test fallido.
* **Flakiness histórica**: el mismo test fallando intermitentemente.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Tests ejecutados
  │
  ▼
Reporte generado (JUnit XML + HTML + coverage)
  │
  ▼
Publicado en el pipeline
  ├── UI: lista de tests con estado
  ├── PR: comentario con resumen
  └── Artefactos: reportes descargables
  │
  ▼
Métricas: tasa de éxito, duración, tendencias
\`\`\`

### 💻 Ejemplo básico

Publicar reportes (GitLab CI):

\`\`\`yaml
test:
  stage: test
  script:
    - pytest --junitxml=report.xml --cov
  artifacts:
    reports:
      junit: report.xml
    paths:
      - coverage/
\`\`\`

### 🏢 Caso de uso profesional

Un equipo ve en la UI de GitLab el reporte de tests de cada pipeline: 1.245 tests, 1.240 verdes, 5 rojos, 1 flaky. El test flaky (que falla de forma intermitente) aparece en la tendencia y lo investigan: resultó ser una condición de carrera en la DB de tests. Lo corrigen y el reporte vuelve a estar 100% verde. Los reportes convirtieron una molestia invisible en un dato accionable.

### ⚠️ Errores comunes

* No publicar reportes (los resultados solo viven en los logs).
* Formatos incorrectos (JUnit mal formado no se parsea).
* Ignorar los tests skipped (pueden esconder cobertura perdida).
* No revisar la duración (tests lentos crecen silenciosamente).
* Reportes sin retención (no se puede comparar tendencias).

### 📋 Lo que debes recordar

* Publica reportes en formato estándar (JUnit XML).
* La UI y el PR muestran el resultado legible.
* Lee totales, fallos, skipped y duración.
* Los reportes alimentan métricas de calidad y tendencias.

### 🧪 Autoevaluación rápida

1. ¿Qué formato de reporte es estándar entre frameworks?
2. ¿Qué información contiene un reporte de tests?
3. ¿Cómo se integran los reportes con el PR?

---

1. JUnit XML: exportable por la mayoría de los frameworks y parseable por las plataformas de CI/CD.
2. Totales (pasados/fallidos/skipped), duración, traces de fallos y cobertura.
3. Publicando el reporte como artefacto y comentando el resumen en el PR (test-reporter en GitHub, reports junit en GitLab).
`
export default content
