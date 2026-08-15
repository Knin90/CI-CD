const content = `
## Módulo 20 — Maintainability

### 🎯 Objetivos de aprendizaje

* Diseñar pipelines mantenibles a largo plazo.
* Reducir complejidad y deuda técnica del CI/CD.
* Mantener el pipeline fácil de cambiar sin romper.

### ❓ Problema real que resuelve

El pipeline creció sin control: 30 jobs, templates en 3 capas, condiciones crípticas, nadie se atreve a tocarlo por miedo a romperlo (nivel 22). Un pipeline inmantenible es deuda técnica: cada cambio es lento y arriesgado. La mantenibilidad (nivel 23) aplica al pipeline las mismas reglas que al código: simplicidad, nombres claros, tests y refactoring continuo.

### 💡 Analogía

La mantenibilidad del pipeline es el mantenimiento preventivo del coche: cambiar el aceite, revisar los frenos y arreglar los ruidos pequeños ANTES de que se conviertan en averías. El coche que "funciona pero nadie toca" (pipeline sin mantenimiento) acaba en el taller con la avería grande — y la reparación es cara y arriesgada. Mantener es más barato que reparar.

### 📖 Explicación técnica

* **Mantenibilidad** (nivel 23): el pipeline es fácil de entender, cambiar y extender sin romper nada.
* Prácticas:
  * **Simplicidad**: pipelines pequeños (módulo 4), menos condiciones y magia, config explícita (módulo 1).
  * **Nombres claros**: jobs, stages y steps que dicen qué hacen (módulo 4).
  * **DRY con criterio**: reutilizar sin sobre-abstraer (módulo 2) — cada capa de template debe justificarse.
  * **Tests del pipeline**: validar los cambios (nivel 20), probar los workflows reutilizables (módulo 3).
  * **Refactoring continuo**: simplificar lo que se enredó, eliminar lo que no se usa (nivel 18), dividir lo gigante (módulo 4).
  * **Versión y compatibilidad**: cambiar con cuidado de no romper consumidores (módulo 3), deprecar en vez de romper.
* Señales de deuda: "no toques ese job", "no sé qué hace este template", "el pipeline está así desde siempre", cambios que rompen cosas sin relación (nivel 22).
* Buenas prácticas: revisar el pipeline con la misma disciplina que el código (módulo 14), métricas de complejidad (nivel 17), y una cultura de mejora continua (nivel 23).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline simple y legible
   ↓
Nombres claros, DRY con criterio
   ↓
Cambios pasan por revisión y tests
   ↓
Refactoring continuo (sin esperar la avería)
   ↓
Deuda detectada → se reduce, no se acepta
   ↓
Cambiar el pipeline es fácil y seguro
\`\`\`

### 🧪 Ejercicios

1. Identifica 3 señales de deuda en tu pipeline (jobs "intocables", templates crípticos).
2. Refactoriza una parte confusa y valida que nada se rompe.
3. Define una revisión periódica del pipeline (¿qué se simplifica este trimestre?).

### ⚠️ Errores comunes

* "Si funciona, no lo toques" (la deuda se acumula — nivel 18).
* Sobre-abstracción que nadie entiende (módulo 2).
* Cambios que rompen consumidores sin deprecación (módulo 3).
* Pipelines sin tests ni revisión (cada cambio es una lotería — nivel 20).

### 🔗 Conexión DevOps

La mantenibilidad conecta con todos los módulos del nivel 23: pipelines pequeños (módulo 4), DRY (módulo 2), tests (nivel 20), documentación (módulo 19) y la mejora continua (nivel 23). Es el cierre del curso: el pipeline profesional es el que el equipo puede cambiar con confianza.
`
export default content
