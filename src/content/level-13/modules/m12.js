const content = `
## Módulo 12 — Deployment verification

### 🎯 Objetivos de aprendizaje

* Definir verificación de despliegue y por qué no basta con "salió 0".
* Implementar health checks, smoke tests y verificación post-deploy.
* Automatizar la decisión de éxito/fallo del despliegue.

### ❓ Problema real que resuelve

Un deploy "exitoso" (comando terminado en 0) no garantiza que la aplicación funcione: puede haber arrancado y morir, responder 500, o tener la configuración rota. La verificación del despliegue comprueba que la nueva versión realmente sirve tráfico correcto — y automatiza la decisión de declarar éxito, alertar o revertir.

### 💡 Analogía

La verificación del despliegue es la inspección final del avión antes de despegar: el piloto no dice "listo" porque el combustible se cargó (el deploy terminó), sino porque revisó flaps, instrumentos y presión. Sin esa inspección, despegar es una apuesta.

### 📖 Explicación técnica

* Capas de verificación:
  * **Health checks** (liveness/readiness): el proceso responde y está listo para tráfico.
  * **Smoke tests**: flujos críticos de la app en el entorno recién desplegado (login, checkout, API principal).
  * **Verificación de configuración**: la app arrancó con la config esperada (secrets, variables).
  * **Métricas post-deploy**: error rate, latencia y saturation tras el release (comparadas con baseline).
  * **Verificación de datos**: migraciones aplicadas, datos accesibles.
* Automatización: el pipeline ejecuta los checks, decide success/failure y, si falla, dispara rollback o alerta.
* Verificación continua: los health checks no solo valen al deploy; se mantienen durante la vida del servicio (nivel 18).
* Buenas prácticas: verificar en cada entorno (dev también), incluir verificación de negocio (¿la función X funciona?), registrar el resultado de verificación con el release.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy ejecutado
   ↓
Readiness: ¿instancia lista? → no → esperar/marcar insana
   ↓
Smoke tests contra el entorno nuevo
   ↓
Métricas post-deploy vs baseline
   ↓
¿Todo OK? → deploy exitoso
   ↓
¿Fallo? → rollback / alerta / incidente
\`\`\`

### 🧪 Ejercicios

1. Añade un stage de smoke tests post-deploy a tu pipeline.
2. Define 3 métricas que verifiques tras cada release (error rate, latencia, etc.).
3. Automatiza: si el smoke falla, que el pipeline haga rollback automático.

### ⚠️ Errores comunes

* Confiar en el exit code del deploy (no verifica la app).
* Smoke tests que solo comprueban "el servidor responde 200" en la home.
* Verificación solo en producción: los problemas se descubren tarde.
* Verificación manual: depende de que alguien mire la app después del deploy.

### 🔗 Conexión DevOps

La verificación cierra el ciclo del despliegue: conecta deployment strategies (nivel 13), health checks (nivel 14), observabilidad (nivel 18) y rollback (módulo 9). Un deploy sin verificación no es un deploy: es una oración.
`
export default content
