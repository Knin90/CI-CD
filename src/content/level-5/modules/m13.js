const content = `
## Módulo 13 — Job artifacts

### 🎯 Objetivos de aprendizaje

* Publicar y consumir artefactos de job.
* Configurar rutas, retención y limpieza.
* Usar artefactos para debug y trazabilidad.

### ❓ Problema real que resuelve

Los jobs producen archivos: binarios, reportes, cobertura, logs. Los artefactos los conservan y los hacen disponibles: a otros jobs (el binario para los tests), a los humanos (descargar el build para probarlo), y a la historia (evidencia de cada ejecución). Sin artefactos, cada job tendría que reconstruir y nada quedaría para diagnosticar.

### 💡 Analogía

Los artefactos son las cajas que la cadena de montaje apila al final del turno: cada caja contiene el resultado del trabajo (pieza, informe, muestra) etiquetada con su fecha. Las siguientes estaciones usan esas cajas; y si algo sale mal, se abren las cajas del turno para investigar.

### 📖 Explicación técnica

* **Publicar**: \`actions/upload-artifact\` (GitHub), \`artifacts:\` (GitLab), \`PublishPipelineArtifact\` (Azure).
* **Consumir**: \`actions/download-artifact\`, \`dependencies:\` + \`artifacts:\`, \`DownloadPipelineArtifact\`.
* Configuración: \`paths\` (qué subir), \`name\` (nombre), \`retention-days\` (días de retención), \`if-no-files-found\`.
* Flujo típico: build publica \`dist/\`; test lo descarga y corre contra el binario real; deploy lo descarga y despliega — build once.
* Los artefactos quedan asociados a la ejecución: se pueden descargar desde la UI y la API (debug, QA, compliance).
* Retención: por defecto 90 días (GitHub) o configurable; los artefactos grandes y viejos consumen almacenamiento.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job build
  └── Publica: app.zip (dist/, retención 30 días)
        │
        ▼
Job test (needs: build)
  └── Descarga: app.zip → tests contra el binario real
        │
        ▼
Job deploy (needs: test)
  └── Descarga: app.zip → despliega la MISMA versión
        │
        ▼
Humano: descarga el artefacto desde la UI para probar/auditar
\`\`\`

### 💻 Ejemplo básico

Publicar y consumir (GitHub Actions):

\`\`\`yaml
build:
  runs-on: ubuntu-latest
  steps:
    - run: npm ci && npm run build
    - uses: actions/upload-artifact@v4
      with:
        name: app
        path: dist/
        retention-days: 30

test:
  runs-on: ubuntu-latest
  needs: [build]
  steps:
    - uses: actions/download-artifact@v4
      with:
        name: app
        path: dist/
    - run: npm run test:e2e -- --app ./dist
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de QA descarga los artefactos de cada release desde la UI para pruebas manuales en dispositivos reales; los reportes de tests quedan publicados como artefactos con retención de 180 días para auditoría de compliance. Cuando un cliente reporta un bug de la v1.4.0, el equipo descarga el build exacto de esa ejecución y lo reproduce — trazabilidad total.

### ⚠️ Errores comunes

* Subir artefactos gigantes (node_modules, build cache) — almacenamiento y lentitud.
* Retención infinita: el almacenamiento se llena.
* No consumir el artefacto en jobs dependientes (reconstruir = inconsistencia).
* Subir secretos dentro de artefactos (configs con credenciales).
* \`if-no-files-found\` sin configurar: error silencioso o fallo inesperado.

### 📋 Lo que debes recordar

* Artefactos = resultados de job conservados y compartibles.
* Build once, deploy many: el mismo binario viaja por el pipeline.
* Configura rutas, retención y comportamiento sin archivos.
* Nunca subas secretos en artefactos.

### 🧪 Autoevaluación rápida

1. ¿Qué papel juegan los artefactos entre jobs?
2. ¿Qué configuración requiere un artefacto bien definido?
3. ¿Por qué "build once" depende de los artefactos?

---

1. Pasar resultados entre jobs (binarios, reportes) y conservarlos para humanos y auditoría.
2. Rutas (\`paths\`), nombre, días de retención y comportamiento si no hay archivos.
3. Porque el artefacto del build se descarga y usa en todos los jobs posteriores: lo que se prueba y despliega es exactamente lo que se construyó.
`
export default content
