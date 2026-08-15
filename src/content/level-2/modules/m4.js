const content = `
## Módulo 4 — Steps

### 🎯 Objetivos de aprendizaje

* Definir qué es un **step** y su papel como unidad mínima de un job.
* Escribir steps efectivos: un propósito, idempotentes, con salida clara.
* Entender el orden de ejecución de los steps y su fallo.

### ❓ Problema real que resuelve

Dentro de un job, los pasos se ejecutan en orden y cada uno decide si el siguiente corre: si un paso falla (exit code ≠ 0), el job falla. Definir steps bien delimitados (instalar, compilar, testear) permite diagnosticar fallos con precisión — el log te dice exactamente qué paso falló — y reutilizar pasos comunes (checkout, cache, login a registry).

### 💡 Analogía

Un paso es como una estación de la cadena de montaje: cada estación hace UNA tarea concreta (atornillar, pintar, inspeccionar). Si una estación falla, la línea se detiene y sabes exactamente dónde. Una estación que hiciera diez tareas mezcladas sería imposible de diagnosticar.

### 📖 Explicación técnica

* **Step**: comando (o acción reutilizable) dentro de un job; la unidad mínima de ejecución.
* Cada step se ejecuta en orden; si uno sale con código de error, el job se detiene y falla (salvo \`continue-on-error\`).
* Cada step tiene su propio **bloque en los logs**: el fallo se identifica al instante.
* Tipos de steps:
  * **Comandos**: \`run: npm test\` (GitHub Actions), \`script: npm test\` (GitLab).
  * **Acciones/plugins reutilizables**: \`uses: actions/checkout@v4\`, \`uses: docker/login-action@v3\`.
  * **Pasos con condición**: \`if: always()\`, \`if: failure()\` (limpiar o notificar al fallar).
* Buenas prácticas: un propósito por paso, nombres descriptivos (\`name:\`), pasos idempotentes, y \`set -e\` para que fallos intermedios detengan la cadena.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job "test" — steps en orden
  │
  ├── 1. Checkout (clonar el repo)        → exit 0
  ├── 2. Setup Node 20                    → exit 0
  ├── 3. npm ci                           → exit 0
  ├── 4. npm run lint                     → exit 0
  ├── 5. npm test                         → exit 1  ← ¡falla!
  │
  ▼
Job fallido → logs del step 5 → stage roja → pipeline detenido
\`\`\`

### 💻 Ejemplo básico

Steps con nombres y condiciones (GitHub Actions):

\`\`\`yaml
steps:
  - name: Clonar repositorio
    uses: actions/checkout@v4
  - name: Instalar dependencias
    run: npm ci
  - name: Ejecutar tests
    run: npm test
  - name: Notificar fallo
    if: failure()
    run: ./notify.sh "Pipeline falló en tests"
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de tests falla de forma intermitente. Gracias a steps bien delimitados con nombres, el log identifica que el paso "Ejecutar tests" falla por un test de integración flaky que depende de un servicio externo. El equipo separa los tests flaky en otro job con retry, y el pipeline vuelve a ser estable.

### ⚠️ Errores comunes

* Un solo step gigante: imposible saber qué falló exactamente.
* Steps sin nombre: logs crípticos.
* Comandos que no fallan al fallar (falta \`set -e\`): el job reporta success con pasos rotos.
* Ignorar \`if: failure()\` para limpiar/notificar.
* Steps que dependen de estado local (archivos generados por otros steps fuera de control).

### 📋 Lo que debes recordar

* Step = unidad mínima: un comando con un propósito.
* El exit code del step decide el resultado del job.
* Steps con nombre y bien delimitados = diagnóstico instantáneo.
* \`if: failure()\` para acciones de limpieza o notificación.

### 🧪 Autoevaluación rápida

1. ¿Qué decide el resultado de un step y cómo afecta al job?
2. ¿Por qué conviene que cada step haga una sola cosa?
3. ¿Para qué se usa \`if: failure()\`?

---

1. El exit code del comando: si es ≠ 0 el step falla, el job se detiene y la stage/pipeline quedan en rojo.
2. Para diagnosticar fallos al instante: el log indica exactamente qué paso falló, y los pasos se pueden reutilizar y condicionar individualmente.
3. Para ejecutar pasos solo cuando el job falló: notificaciones, limpieza de recursos o registro del error.
`
export default content
