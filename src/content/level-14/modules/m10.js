const content = `
## Módulo 10 — Rolling updates

### 🎯 Objetivos de aprendizaje

* Entender el rolling update nativo de Kubernetes.
* Configurar maxUnavailable y maxSurge.
* Controlar y pausar rollouts problemáticos.

### ❓ Problema real que resuelve

Actualizar una aplicación sin cortar el servicio: Kubernetes reemplaza los pods gradualmente — nuevos pods sanos entran, viejos se retiran — manteniendo la capacidad mínima. El rolling update es la estrategia por defecto de los Deployments: sin él, cada actualización sería un apagón.

### 💡 Analogía

El rolling update es el mantenimiento de las escaleras mecánicas del centro comercial: se repara peldaño a peldaño sin detener la escalera completa. En todo momento hay peldaños viejos y nuevos, pero la escalera nunca se detiene (el servicio nunca se cae).

### 📖 Explicación técnica

* **Rolling update**: el Deployment crea un ReplicaSet nuevo y escala gradualmente: sube el nuevo mientras baja el viejo.
* Parámetros de la estrategia \`RollingUpdate\`:
  * **maxUnavailable**: máx. de pods que pueden estar no disponibles durante el update (\`0\` = nunca baja la capacidad; \`25%\` por defecto).
  * **maxSurge**: máx. de pods extra que se pueden crear sobre el deseado (\`25%\` por defecto).
* Flujo: nuevo RS escala a 1 → pod nuevo pasa readiness → se elimina un pod viejo → se repite hasta completar.
* **Health checks son clave** (módulo 11): si el pod nuevo no pasa readiness, el rollout se detiene (quedan pods viejos sirviendo).
* Control: \`kubectl rollout status\` (esperar), \`kubectl rollout pause/resume\`, \`kubectl rollout undo\` (volver atrás).
* Buenas prácticas: readiness probes reales (no solo "el proceso existe"), verificar el rollout en CI antes de declarar éxito, monitorear el error rate durante la transición.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Plantilla cambia (nueva imagen)
   ↓
ReplicaSet nuevo (v2) creado
   ↓
v2 escala +1 → readiness OK → v1 escala -1
   ↓
Repetir hasta v2 = replicas deseadas, v1 = 0
   ↓
Readiness falla → rollout pausado (v1 sigue sirviendo)
\`\`\`

### 🧪 Ejercicios

1. Configura \`maxUnavailable: 0\` y \`maxSurge: 1\` y observa el flujo.
2. Rompe el readiness probe de la nueva versión y observa cómo se pausa el rollout.
3. Practica \`kubectl rollout undo\` para revertir.

### ⚠️ Errores comunes

* Sin readiness probes: los pods nuevos "entran" rotos y el rollout "completa" con servicio caído.
* maxUnavailable alto: capacidad por debajo del mínimo durante el update.
* Aplicaciones con estado (BD, caches) que no soportan dos versiones conviviendo.
* No verificar: el rollout termina en CI pero el cluster sigue actualizándose.

### 🔗 Conexión DevOps

El rolling update es donde Kubernetes materializa la estrategia rolling (nivel 13): conecta Deployments (módulo 4), image updates (módulo 9), health checks (módulo 11) y rollbacks (módulo 12).
`
export default content
