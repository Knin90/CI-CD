const content = `
## Módulo 7 — Fase 6: Entornos, approvals, secrets, rollback y monitoreo

### 🎯 Objetivos de aprendizaje

* Configurar entornos con approvals y secrets aislados.
* Diseñar el rollback de la plataforma.
* Monitorizar la app y el pipeline.

### ❓ Problema real que resuelve

El pipeline despliega, pero un CD profesional necesita controles: entornos aislados (nivel 12 y módulo 10 de 23), approvals para producción (nivel 12), secrets por entorno (nivel 11-12), rollback diseñado (módulo 18 de 23) y monitoreo de la app y del pipeline (nivel 18). La Fase 6 añade los controles que separan una demo de una plataforma real.

### 💡 Analogía

La Fase 6 es el sistema de seguridad y mantenimiento del edificio: cada piso (entorno) con sus llaves (secrets), la puerta de producción con doble candado (approval), la salida de emergencia señalizada y probada (rollback), y los sensores de humo y agua (monitoreo). El edificio no es solo los apartamentos (fases 1-5): es también que los controles funcionen.

### 📖 Explicación técnica

* **Entornos** (nivel 12): dev, staging, prod — aislados en recursos, credenciales y datos (módulo 10 de 23). El pipeline promociona el MISMO artefacto entre entornos (módulo 9 de 23).
* **Approvals** (nivel 12): el despliegue a producción requiere aprobación humana (environment protections, jobs manuales — nivel 19).
* **Secrets** (nivel 11-12): gestor central, secretos por entorno, referencia por nombre, rotación (módulo 12 de 23).
* **Rollback** (módulo 18 de 23): plan por capa (app, infra, datos), versiones anteriores disponibles (módulo 8 de 23), probado en staging.
* **Monitoreo** (nivel 18): métricas de la app (salud, latencia, errores) y del pipeline (tiempo, éxito — módulo 17 de 23), alertas, dashboards, logs centralizados.
* Buenas prácticas: gates por entorno (módulo 15 de 23), verificación post-deploy en cada entorno (nivel 20), y runbooks (nivel 22).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Mismo artefacto promocionado
   ↓
Dev: deploy automático + secrets dev
   ↓
Staging: deploy + verificación + secrets staging
   ↓
Prod: approval humana → deploy + secrets prod
   ↓
Monitoreo de la app (salud, errores, latencia)
   ↓
¿Problema? → rollback diseñado y probado
   ↓
Alertas y dashboards del pipeline y la app
\`\`\`

### 🧪 Ejercicios

1. Configura los 3 entornos con approvals en prod y secrets aislados.
2. Escribe el runbook de rollback y pruébalo en staging.
3. Añade monitoreo de la app (salud, errores) y del pipeline (tiempo, éxito).

### ⚠️ Errores comunes

* Entornos que comparten recursos o secrets (módulo 10 de 23).
* Approval que cualquiera aprueba sin mirar (el gate no protege — módulo 15 de 23).
* Rollback sin probar (falla en el incidente — módulo 18 de 23).
* Monitoreo de la app pero no del pipeline (nivel 18 y módulo 17 de 23).

### 🔗 Conexión DevOps

La Fase 6 conecta con environments (nivel 12), secrets (nivel 11), approvals (nivel 12), rollback (nivel 23), observabilidad (nivel 18) y verificación (nivel 20). Son los controles del CD: la plataforma no solo despliega, despliega con seguridad y visibilidad.
`
export default content
