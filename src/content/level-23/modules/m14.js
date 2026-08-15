const content = `
## Módulo 14 — Code review

### 🎯 Objetivos de aprendizaje

* Integrar la revisión de código en el flujo de CI/CD.
* Revisar código Y pipeline con la misma disciplina.
* Hacer revisiones efectivas y respetuosas.

### ❓ Problema real que resuelve

El código entra a main sin revisión: bugs, deuda técnica y errores de seguridad se acumulan (nivel 10). La revisión de código (nivel 1 y 23) añade un par de ojos humanos sobre el cambio antes del merge — complementando al CI, que detecta lo automático. Cuando se revisa también el pipeline (módulo 1), los cambios al CI tienen el mismo control que los del código.

### 💡 Analogía

La revisión de código es el ensayo general antes del estreno: el director (revisor) escucha la obra completa (cambio), no solo las notas (tests), y señala lo que no funciona en el conjunto. Y como en el teatro, la crítica es al personaje, no al actor: se revisa el cambio, no a la persona (cultura no-blame — nivel 23).

### 📖 Explicación técnica

* **Code review**: el cambio entra por PR/MR, se revisa y se aprueba antes del merge (módulo 13).
* Qué revisar:
  * **Lógica**: ¿el código hace lo que dice? ¿cubre los casos? (bugs que el CI no ve).
  * **Diseño**: legibilidad, nombres, estructura (nivel 20 de este nivel).
  * **Seguridad**: entradas no validadas, secretos, permisos (nivel 10).
  * **Tests**: ¿el cambio trae tests que lo cubren? (nivel 7 y 20).
  * **Pipeline**: si el cambio toca el CI, ¿el pipeline sigue correcto? (módulo 1).
* Revisiones efectivas: PRs pequeños (nivel 4 de este nivel y 19), comentarios específicos y accionables, aprobar con confianza (no solo "LGTM"), y velocidad (la revisión lenta frena el flujo — módulo 5).
* Cultura: revisar el cambio, no la persona; preguntas en vez de acusaciones; y el pipeline como árbitro objetivo (si el check pasa y la revisión aprueba, el merge es seguro — módulo 15).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
PR abierto con el cambio (código y/o pipeline)
   ↓
CI corre los checks automáticos
   ↓
Revisores: lógica, diseño, seguridad, tests
   ↓
Comentarios → el autor ajusta → checks de nuevo
   ↓
Aprobación(es) requeridas
   ↓
Merge → el cambio entra verificado
\`\`\`

### 🧪 Ejercicios

1. Define una checklist de revisión para tu equipo (lógica, diseño, seguridad, tests).
2. Revisa un PR con comentarios específicos y accionables.
3. Añade la revisión del pipeline a tu checklist cuando el PR toca CI.

### ⚠️ Errores comunes

* Aprobaciones sin leer ("LGTM" automático — el gate no protege).
* Revisiones interminables (PRs que caducan — módulo 5).
* Críticas a la persona, no al cambio (cultura tóxica — nivel 23).
* Revisar el código pero no el pipeline (el CI cambia sin control — módulo 1).

### 🔗 Conexión DevOps

La revisión de código conecta con Git (nivel 1), branch protection (módulo 13), quality gates (módulo 15), cultura (nivel 23) y Pipeline as Code (módulo 1). Es el control humano que complementa al control automático: el CI detecta lo mecánico, la revisión lo que necesita criterio.
`
export default content
