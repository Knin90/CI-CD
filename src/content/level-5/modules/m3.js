const content = `
## Módulo 5 — Steps (en el contexto de jobs)

### 🎯 Objetivos de aprendizaje

* Reforzar el papel de los steps dentro de un job.
* Escribir steps robustos: idempotentes, con condición y con salida clara.
* Usar steps como unidades de diagnóstico.

### ❓ Problema real que resuelve

Dentro del job, los steps son la secuencia ejecutable: cada comando, su orden y su resultado. Steps mal escritos (frágiles, sin manejo de errores, mezclados) convierten el diagnóstico de un fallo en una búsqueda. Steps bien escritos hacen que un fallo diga exactamente dónde y por qué.

### 💡 Analogía

Los steps son los pasos de un manual de procedimiento: cada paso tiene una acción concreta, una verificación y un criterio de éxito. Un manual con pasos vagos ("haz cosas") no sirve; uno con pasos precisos ("ejecuta X, verifica Y, si falla Z") permite ejecutar y auditar.

### 📖 Explicación técnica

Buenas prácticas de steps:

* **Un propósito por step**: instalar, compilar, testear, publicar.
* **Idempotencia**: re-ejecutar el step da el mismo resultado.
* **Nombres descriptivos**: \`name:\` en cada step (el log los muestra).
* **Condiciones explícitas**: \`if: failure()\`, \`if: always()\`, \`if: cancelled()\`.
* **Manejo de errores**: \`set -e\` para que fallos intermedios detengan; \`continue-on-error\` solo cuando corresponde.
* **Salidas claras**: \`echo\` de hitos y variables (sin exponer secretos).
* **Reutilización**: acciones/plugins para lógica común en lugar de copiar comandos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job "test" — steps
  │
  ├── 1. Clonar repo (checkout)        → exit 0
  ├── 2. Instalar dependencias (npm ci) → exit 0
  ├── 3. Lint                           → exit 0
  ├── 4. Tests unitarios                → exit 1 ← fallo localizado
  │
  ▼
Log del step 4: mensaje exacto del test fallido
\`\`\`

### 💻 Ejemplo básico

Steps robustos (GitHub Actions):

\`\`\`yaml
steps:
  - name: Clonar
    uses: actions/checkout@v4
  - name: Instalar dependencias
    run: npm ci
  - name: Tests
    run: npm test
  - name: Notificar fallo
    if: failure()
    run: ./notify.sh "Pipeline roto en tests"
  - name: Limpiar
    if: always()
    run: rm -rf /tmp/build
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de tests falla de forma intermitente. Gracias a steps con nombre y salidas claras, el log del step "Tests" muestra que el fallo ocurre solo cuando la API de staging está saturada. El equipo separa ese test en un job aparte con retry y un timeout, y el pipeline vuelve a ser verde de forma estable.

### ⚠️ Errores comunes

* Un step gigante que hace 10 cosas.
* Steps sin nombre: logs crípticos.
* Sin \`set -e\`: el step "termina bien" aunque el comando falló.
* \`continue-on-error\` generalizado: verde sin significado.
* Steps que dejan estado para el siguiente (acoplamiento oculto).

### 📋 Lo que debes recordar

* Step = una acción con un propósito y un resultado medible.
* Nombra y condiciona los steps (\`if: failure()\`, \`if: always()\`).
* Idempotencia y \`set -e\` para robustez.
* El log del step fallido es el diagnóstico.

### 🧪 Autoevaluación rápida

1. ¿Qué hace que un step sea "robusto"?
2. ¿Para qué se usa \`if: always()\`?
3. ¿Qué rol juega \`set -e\` en los steps de shell?

---

1. Un propósito claro, idempotencia (mismo resultado al re-ejecutar), nombre descriptivo, condiciones explícitas y manejo correcto de errores.
2. Para que un step se ejecute siempre, incluso si el job falló: limpieza, notificaciones, registros.
3. Hace que el script termine con error en cuanto un comando falla, en lugar de continuar y reportar un éxito falso.
`
export default content
