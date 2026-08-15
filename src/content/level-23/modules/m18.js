const content = `
## Módulo 18 — Rollback strategy

### 🎯 Objetivos de aprendizaje

* Diseñar una estrategia de rollback por capa.
* Decidir cuándo revertir y a qué versión.
* Probar los rollbacks antes de necesitarlos.

### ❓ Problema real que resuelve

El deploy sale mal y no hay plan: ¿se revierte? ¿a qué versión? ¿la app sí pero los datos no? El rollback improvisado (nivel 13 y 22) es lento y peligroso. La estrategia de rollback (nivel 23) define ANTES del incidente: qué se revierte, a qué versión, en qué orden y cómo se verifica — para que la marcha atrás sea rápida y segura cuando toca.

### 💡 Analogía

La estrategia de rollback es el plan de evacuación del edificio: se dibuja ANTES del incendio (salidas, rutas, puntos de reunión), se practica (fire drill) y se conoce. En un incendio real no hay tiempo de improvisar el plan — solo de ejecutarlo. El rollback es igual: el plan se diseña y se prueba en calma, se ejecuta en crisis (nivel 20 de 22).

### 📖 Explicación técnica

* **Diseño del rollback por capa** (nivel 13 y 22):
  * **App**: volver a la imagen/artefacto anterior (módulo 8) — el artefacto anterior debe existir siempre (retención — módulo 9 de 22).
  * **Infra**: revertir Terraform/Ansible (nivel 15-16) con el plan revisado (nivel 22 de 22).
  * **Datos**: migraciones reversibles (nivel 15); si no, el rollback de app puede requerir compatibilidad con datos nuevos.
  * **Kubernetes**: \`rollout undo\` + esperar readiness (nivel 14 y 22 de 22).
* **Cuándo revertir**: criterios explícitos — errores de métricas (nivel 18), alertas de salud, quejas de usuarios; decidir entre rollback y forward-fix (arreglar hacia adelante) según gravedad y velocidad (nivel 13).
* **A qué versión**: la última versión conocida buena (no "la anterior a esta" a ciegas) — trazabilidad (módulo 8).
* **Prueba**: los rollbacks se prueban en staging (nivel 12 y 20), con un "fire drill" periódico — el rollback que nunca se probó falla cuando se necesita (nivel 18 de 22).
* Buenas prácticas: runbook de rollback (nivel 19 de 22), automatización parcial (un botón/script verificado — nivel 13), y decisiones registradas (postmortem — nivel 20 de 22).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Plan ANTES del incidente
   ↓
Por capa: app / infra / datos / k8s
   ↓
¿Cuándo revertir? (criterios de métricas/salud)
   ↓
¿A qué versión? (última conocida buena — trazabilidad)
   ↓
Probado en staging (fire drill)
   ↓
Incidente → ejecutar el plan, no improvisar
   ↓
Postmortem: ¿funcionó? ¿qué mejorar?
\`\`\`

### 🧪 Ejercicios

1. Escribe la estrategia de rollback de tu servicio (app, datos, infra).
2. Prueba el rollback en staging y documenta el resultado.
3. Define los criterios exactos para decidir entre rollback y forward-fix.

### ⚠️ Errores comunes

* Sin plan (improvisar en el incidente — nivel 20 de 22).
* Rollback solo de app con datos cambiados (la app vieja + datos nuevos — nivel 18 de 22).
* Versión anterior inexistente (retención — módulo 8).
* Rollback nunca probado (falla cuando se necesita).

### 🔗 Conexión DevOps

La estrategia de rollback conecta con deployment strategies (nivel 13), artefactos inmutables (módulo 8), datos (nivel 15), Kubernetes (nivel 14), runbooks (nivel 22) y producción (nivel 22). Es la red de seguridad diseñada con calma para usarse en la tormenta.
`
export default content
