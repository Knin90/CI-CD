const content = `
## Módulo 9 — Success / Failure

### 🎯 Objetivos de aprendizaje

* Explicar cómo se determina el éxito o fallo de un pipeline.
* Entender el exit code como señal fundamental de cada paso.
* Usar el estado del pipeline como compuerta (gates) y para notificaciones.

### ❓ Problema real que resuelve

El valor de un pipeline depende de que su veredicto sea **confiable**: verde significa "puedes continuar con confianza" y rojo "detente". Entender qué determina el verde/rojo (exit codes de los steps, condiciones, allowed failures) permite configurar pipelines donde el veredicto significa exactamente lo que el equipo cree que significa.

### 💡 Analogía

El semáforo de un cruce: verde y rojo son señales binarias, pero su significado depende de cómo estén programadas las reglas. Si el semáforo estuviera siempre en verde (pipeline que nunca falla), los conductores (equipo) dejarían de confiar en él. La fiabilidad del veredicto es lo que le da valor.

### 📖 Explicación técnica

* Un **exit code 0** significa éxito; cualquier código ≠ 0 significa fallo. Cada comando devuelve uno.
* En pipelines, la regla por defecto: si cualquier step de un job falla, el job falla; si algún job de una stage falla, la stage falla y el pipeline se detiene (salvo configuración).
* Excepciones configurables:
  * \`continue-on-error\` / \`allow_failure\`: el step/job puede fallar sin romper el pipeline (útil para reportes no críticos).
  * \`if: always()\` / \`when: always\`: steps que corren aunque falle el job (limpieza, notificación).
* El estado final del pipeline: success, failure, cancelled (cancelado por humano/timeout) o skipped (saltado por condiciones).
* El estado alimenta: status checks del PR, notificaciones, triggers encadenados y métricas de estabilidad del pipeline.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Step: npm test → exit code 0 → continúa
Step: npm run build → exit code 1 → ¡FALLO!
  │
  ▼
Job fallido → Stage fallida
  │
  ▼
Pipeline failure (se detienen stages posteriores)
  │
  ▼
Status check rojo en el PR + notificación
  │
  ▼
No se puede mergear (rama protegida)
\`\`\`

### 💻 Ejemplo básico

Steps con manejo explícito de fallo (GitHub Actions):

\`\`\`yaml
steps:
  - name: Tests
    run: npm test
    continue-on-error: true    # no rompe el pipeline
  - name: Build
    run: npm run build         # si falla, el job falla
  - name: Limpiar siempre
    if: always()
    run: ./cleanup.sh
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de una librería usa \`continue-on-error\` para el reporte de cobertura (si la herramienta de cobertura falla por un edge case, no bloquea la release) pero mantiene estrictos los tests y el build. El equipo sabe que verde = "el código funciona"; los reportes complementarios no afectan el veredicto.

### ⚠️ Errores comunes

* \`continue-on-error\` en tests: verde ya no significa nada.
* Scripts que siempre devuelven 0 aunque fallen (falta \`set -e\`).
* Ignorar exit codes en pasos intermedios.
* Usar el estado del pipeline para decisiones sin entender las excepciones configuradas.
* No notificar fallos: el rojo sin aviso se descubre tarde.

### 📋 Lo que debes recordar

* Exit code 0 = éxito; cualquier otro = fallo.
* Un step fallido rompe el job; un job fallido rompe la stage y detiene el pipeline.
* \`continue-on-error\` y \`if: always()\` son excepciones deliberadas.
* El veredicto debe ser fiable: verde = confianza, rojo = detente.

### 🧪 Autoevaluación rápida

1. ¿Qué determina el éxito o fallo de un step?
2. ¿Qué hace \`continue-on-error\`?
3. ¿Qué estados finales puede tener una ejecución?

---

1. El exit code del comando: 0 = éxito, cualquier otro valor = fallo.
2. Permite que un step/job falle sin romper el pipeline: útil para tareas complementarias cuyo resultado no debe bloquear.
3. Success, failure, cancelled (cancelada) y skipped (saltada por condiciones).
`
export default content
