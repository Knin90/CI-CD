const content = `
## Módulo 8 — Rollback testing

### 🎯 Objetivos de aprendizaje

* Probar el rollback del pipeline y de la aplicación.
* Verificar que la recuperación funciona cuando se necesita.
* Medir el tiempo real de rollback.

### ❓ Problema real que resuelve

El rollback "debería funcionar" — pero ¿lo has probado? El rollback sin probar falla en el peor momento: el runbook dice "revertir", y el comando no funciona, o tarda el doble de lo esperado. El rollback testing ejecuta la recuperación a propósito, en condiciones controladas, y mide el tiempo real — la única forma de confiar en él cuando hay un incidente.

### 💡 Analogía

El rollback testing es el simulacro de evacuación del edificio: nadie duda de que "se puede salir por las escaleras", pero solo el simulacro revela que la puerta de emergencia está atascada o que la evacuación tarda 20 minutos. El simulacro (prueba) se hace cuando no hay fuego, para que el día del fuego la evacuación funcione.

### 📖 Explicación técnica

* **Rollback testing**: probar el mecanismo de reversión de forma regular y controlada.
* Qué probar:
  * **Rollback de la app** (nivel 13): revertir a la versión anterior (blue/green switch, rollout undo, helm rollback) — verificar que el servicio se recupera.
  * **Rollback de la infra** (nivel 15): revertir un apply de Terraform (el commit anterior + apply).
  * **Rollback de la config** (nivel 16): revertir un playbook de Ansible.
  * **Rollback de datos** (si aplica): restauración de BD.
* Cómo probarlo:
  * **Game days** (días de práctica): ejercicios programados donde se simula un incidente y se practica la recuperación completa.
  * **En staging** (nivel 12): desplegar una versión "rota" a propósito y practicar el rollback.
  * **Chaos / failure injection** (módulo 7): disparar el rollback automático (health check fallido → rollback) y verificar.
* Qué medir: tiempo de detección + tiempo de rollback (MTTR — nivel 18), y si el servicio queda sano tras revertir.
* Buenas prácticas: probar periódicamente (no una vez), documentar resultados y problemas, automatizar lo que se pueda (el rollback automático se prueba con inyección de fallos).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Desplegar versión rota (staging)
   ↓
Health check falla → rollback (automático o manual)
   ↓
Revertir a la versión anterior
   ↓
Verificar: ¿servicio sano? ¿datos OK?
   ↓
Medir tiempo total (MTTR)
   ↓
Documentar: ¿qué falló en el rollback?
\`\`\`

### 🧪 Ejercicios

1. Organiza un game day: simula un incidente y practica el rollback completo.
2. Despliega una versión rota en staging y dispara el rollback automático.
3. Mide el MTTR real de tu rollback y compáralo con tu objetivo.

### ⚠️ Errores comunes

* Rollback nunca probado (la primera prueba es el incidente real).
* Probar el rollback solo de la app, no de infra/config/datos.
* Game days sin seguimiento (los problemas encontrados no se arreglan).
* Confiar en el rollback automático sin probar que el trigger funciona.

### 🔗 Conexión DevOps

El rollback testing conecta rollbacks (nivel 13), MTTR (nivel 18), game days y failure injection (módulo 7). Un rollback probado convierte el despliegue continuo de "miedo" en "confianza".
`
export default content
