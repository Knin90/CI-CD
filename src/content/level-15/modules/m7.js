const content = `
## Módulo 7 — terraform apply

### 🎯 Objetivos de aprendizaje

* Ejecutar \`terraform apply\` de forma segura en pipelines.
* Aplicar exactamente el plan aprobado.
* Verificar la infraestructura tras el apply.

### ❓ Problema real que resuelve

El apply es donde la infraestructura realmente cambia — y donde un error destruye recursos. Ejecutarlo bien significa: aplicar solo el plan aprobado, con credenciales mínimas, y verificar el resultado. El apply no es "el último comando": es una operación con su propia verificación y rollback.

### 💡 Analogía

El apply es el momento de pulsar el botón rojo del lanzamiento: todo está revisado (plan), las firmas están (approval), pero la ejecución debe ser disciplinada — verificar que el cohete despegó (recursos creados), que no explota (health checks) y tener aborto (rollback) listo.

### 📖 Explicación técnica

* **\`terraform apply\`**: aplica los cambios calculados en el plan.
* Dos formas: \`terraform apply\` (recalcula el plan en el momento — NO recomendado sin revisión) y \`terraform apply planfile\` (aplica el plan aprobado — recomendado).
* En CI/CD: el job de apply corre tras la aprobación (módulo 6), con credenciales del entorno (nivel 11 — OIDC), usando el planfile del artifact (módulo 5).
* Verificación post-apply: \`terraform output\` (valores de salida), health checks de los recursos, \`terraform plan\` vacío (no quedan cambios pendientes = convergencia).
* Auto-apply vs manual: dev/staging pueden auto-aplicar; producción debe requerir aprobación.
* **State locking**: el apply debe adquirir el lock del estado (evita applys concurrentes corruptores).
* Rollback de infraestructura: revertir el commit en Git y aplicar el estado anterior (o destroy dirigido — con cuidado).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Planfile aprobado + credenciales del entorno
   ↓
terraform apply planfile (con lock del estado)
   ↓
API del cloud crea/modifica/destruye recursos
   ↓
State actualizado (nuevo estado)
   ↓
Verificación: outputs + plan vacío + health checks
\`\`\`

### 🧪 Ejercicios

1. Aplica un planfile aprobado y verifica el estado resultante.
2. Configura auto-apply en dev y apply con aprobación en prod.
3. Tras el apply, ejecuta un plan: ¿quedan cambios pendientes? (debería estar vacío).

### ⚠️ Errores comunes

* \`terraform apply\` sin planfile ni revisión (cambios no vistos).
* Apply con credenciales de admin (least privilege — nivel 12).
* Ignorar el lock: applys concurrentes corrompen el estado.
* No verificar post-apply (el apply "salió 0" pero los recursos están rotos).

### 🔗 Conexión DevOps

El apply es la ejecución del ciclo IaC: conecta plan artifacts (módulo 5), approval (módulo 6), estado remoto (módulo 8) y verificación (nivel 13). Es la operación que más requiere disciplina en todo el pipeline de infraestructura.
`
export default content
