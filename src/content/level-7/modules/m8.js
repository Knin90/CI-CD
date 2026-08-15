const content = `
## Módulo 8 — Regression tests

### 🎯 Objetivos de aprendizaje

* Definir las regresiones y cómo los tests las previenen.
* Mantener una suite de regresión efectiva.
* Usar las regresiones para decidir el merge y la release.

### ❓ Problema real que resuelve

Un cambio "pequeño" rompe algo que ya funcionaba: eso es una regresión. Sin tests de regresión, cada cambio depende de la memoria de "qué podría afectar". La suite de regresión ejecuta automáticamente las funcionalidades pasadas en cada cambio, detectando si algo que funcionaba dejó de funcionar — la red de seguridad que permite cambiar código sin miedo.

### 💡 Analogía

La suite de regresión es como el historial médico del paciente: antes de recetar un cambio (nuevo medicamento), el médico revisa todas las condiciones previas para no romper un tratamiento que funcionaba. Los tests de regresión son ese historial ejecutable: cada cambio se evalúa contra todo lo que ya estaba bien.

### 📖 Explicación técnica

* **Regresión**: funcionalidad que funcionaba y deja de funcionar tras un cambio.
* **Suite de regresión**: conjunto de tests (unit + integration + funcionales) que verifican el comportamiento establecido, ejecutados en cada cambio.
* Origen: cada bug arreglado debería dejar un **test de regresión** que lo cubra (si vuelve a aparecer, el test falla).
* Estrategias:
  * Suite completa en cada PR (rápida: unit + integration).
  * Suite lenta (e2e) en cada merge a main y antes de releases.
  * **Priorización**: los tests de las áreas más tocadas primero.
* El pipeline ejecuta la suite y su resultado decide: merge permitido, release publicable.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Cambio en checkout (refactor)
  │
  ▼
Suite de regresión:
  ├── Unit tests de precios (antiguos) → ¿siguen pasando?
  ├── Integration con cupones
  └── Funcional: compra completa
  │
  ├── Todo verde → el cambio no rompió nada conocido
  └── Algo rojo → REGRESIÓN detectada → arreglar antes del merge
\`\`\`

### 💻 Ejemplo básico

Test de regresión de un bug corregido:

\`\`\`js
// Bug: el cupón se aplicaba dos veces
test('regresión: el cupón se aplica una sola vez', () => {
  expect(calculateTotal([100], 0.5)).toBe(50)  // no 0 ni 25
})
\`\`\`

### 🏢 Caso de uso profesional

Un equipo establece la regla: "cada bug corregido agrega su test de regresión". Al cabo de un año, la suite de 1.200 tests protege décadas de decisiones. Un refactor grande del módulo de pagos se ejecuta contra la suite completa: 3 regresiones aparecen (comportamientos que el refactor rompió silenciosamente) y se corrigen antes de mergear. La suite convirtió un riesgo en un checklist.

### ⚠️ Errores comunes

* No agregar tests de regresión al corregir bugs (el bug volverá).
* Suite de regresión sin ejecutar en cada cambio.
* Tests duplicados o triviales que solo "suman cobertura".
* Regresiones ignoradas ("no es relevante ahora") — deuda creciente.
* Suite lenta que se deja de correr por tiempo.

### 📋 Lo que debes recordar

* Regresión = algo que funcionaba dejó de funcionar.
* Cada bug corregido deja un test de regresión.
* La suite se ejecuta en cada cambio: es la red de seguridad.
* Un test de regresión rojo bloquea el merge y la release.

### 🧪 Autoevaluación rápida

1. ¿Qué es una regresión?
2. ¿Qué regla debe seguirse al corregir un bug?
3. ¿Qué decide el resultado de la suite de regresión?

---

1. Una funcionalidad que funcionaba y deja de funcionar tras un cambio de código.
2. Agregar un test de regresión que cubra el bug: si reaparece, el test falla.
3. El merge (los PRs requieren la suite en verde) y la release (solo se publica si la regresión pasa).
`
export default content
