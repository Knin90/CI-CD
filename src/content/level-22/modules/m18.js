const content = `
## Módulo 18 — Rollback failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos durante el rollback.
* Distinguir rollback de app, infra y datos.
* Diseñar rollbacks que realmente funcionen.

### ❓ Problema real que resuelve

El deploy salió mal y hay que volver atrás — pero el rollback también falla: la versión anterior no está disponible, el rollback de la base de datos rompe la app, el rollback en Kubernetes no restaura el estado, o el "undo" dejó el sistema peor. Un rollback que no funciona es peor que no tener plan. Diagnosticar y diseñar rollbacks (nivel 13 y 23) es crítico para el CD.

### 💡 Analogía

El rollback es la marcha atrás del coche: sirve para volver al punto seguro. Pero si el coche (app) retrocede y el remolque (base de datos) no, o la carretera cambió (datos migrados), la marcha atrás rompe el conjunto. Un buen conductor sabe qué marcha atrás es posible — y un buen pipeline sabe qué rollback es seguro: de app, de infra o de datos.

### 📖 Explicación técnica

* Capas de rollback, cada una con sus fallos:
  * **App**: volver a la imagen/artefacto anterior (nivel 13). Fallos: la versión anterior no está (tags borrados, retención — módulo 9), el rollback no se valida (healthchecks), el "anterior" no es compatible con los datos actuales.
  * **Infra**: Terraform/Ansible rollback (nivel 15-16). Fallos: el estado no permite volver, el rollback destruye lo que no debe, drift (nivel 15).
  * **Datos**: migraciones hacia adelante/atras (nivel 15). Fallos: la migración inversa no existe, los datos nuevos no son compatibles con el código viejo, la base no se puede "des-migrar".
  * **Kubernetes**: \`kubectl rollout undo\` (nivel 14). Fallos: revisiones purgadas (revisionHistoryLimit), el rollout undo no espera readiness, los ConfigMaps/Secrets no se revierten.
* Método: antes del rollback: ¿qué se está revirtiendo y a qué versión exacta? → verifica que la versión anterior existe y es desplegable → planifica el orden (app, infra, datos) → ejecuta con verificación (healthchecks, smoke tests — nivel 20) → si el rollback falla, repite el diagnóstico (no lo fuerces).
* Buenas prácticas: versiones anteriores siempre disponibles (nivel 13), rollback automatizado y verificado (nivel 13 y 23), migraciones reversibles, y runbook de rollback probado (nivel 19).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy roto → decisión de rollback
   ↓
¿Qué se revierte? ¿A qué versión exacta?
   ↓
¿Existe la versión anterior? (app, infra, datos)
   ↓
Orden: app → infra → datos (según capa)
   ↓
Ejecuta con verificación (healthchecks)
   ↓
¿Falla? → diagnóstico (no fuerces el undo)
   ↓
Sistema estable, pipeline documentado
\`\`\`

### 🧪 Ejercicios

1. Borra el tag de una versión anterior y practica el rollback fallido.
2. Diseña un rollback de app + datos y documenta el orden y los riesgos.
3. Prueba \`kubectl rollout undo\` y verifica qué se restaura y qué no.

### ⚠️ Errores comunes

* Rollback solo de app cuando los datos cambiaron (la app vieja + datos nuevos = peor).
* Confiar en que la versión anterior existe (retención y tags — módulo 9).
* Rollback sin verificación (vuelves atrás pero el sistema sigue roto).
* "Undo" que destruye lo que no debe (rollback de infra sin revisar el plan).

### 🔗 Conexión DevOps

El rollback conecta con deployment strategies (nivel 13), rollback strategy (nivel 23), Kubernetes (nivel 14), IaC (nivel 15), datos (nivel 15) y deployment verification (nivel 20). Es la red de seguridad del CD: solo sirve si está diseñada, probada y verificada antes del incidente.
`
export default content
