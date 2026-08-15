const content = `
## Módulo 3 — Staging

### 🎯 Objetivos de aprendizaje

* Definir staging como el entorno más parecido a producción.
* Configurar promoción desde testing con validaciones previas.
* Usar staging para ensayar releases, datos y aprobaciones.

### ❓ Problema real que resuelve

Producción no debe ser el primer lugar donde se descubre que algo falla. Staging replica producción (infraestructura, datos, configuración) para que el release se ensaye antes de tocar el entorno real. Sin staging, cada despliegue es una apuesta: la única validación es el incidente.

### 💡 Analogía

Staging es el ensayo general del teatro: misma escenografía, mismas luces, mismo vestuario; solo cambia el público. Si en el ensayo general algo falla, se corrige sin que nadie se entere. El estreno (producción) debe ser una repetición exacta del ensayo.

### 📖 Explicación técnica

* **Staging**: entorno espejo de producción — misma arquitectura, misma versión de dependencias, datos anonimizados de producción o sintéticos realistas.
* Objetivos: ensayar el release completo (deploy, migraciones, config, health checks), validar aprobaciones y runbooks, medir rendimiento.
* Flujo típico: testing OK → deploy a staging → smoke tests → revisión humana → aprobación → producción.
* En CI/CD: el deploy a staging suele requerir un approval gate (quién autoriza) y deja artifacts y logs auditables.
* Diferencia clave con testing: testing valida funcionalidad; staging valida **el proceso de release**.
* Buenas prácticas: staging siempre verde (si staging se rompe, se para todo), datos anonimizados, feature flags para probar en producción después.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Testing OK
   ↓
Deploy a STAGING (mismo pipeline que PROD)
   ↓
Migraciones + seeds realistas
   ↓
Smoke + verificaciones
   ↓
Revisión / aprobación
   ↓
Listo para PRODUCCIÓN
\`\`\`

### 🧪 Ejercicios

1. Documenta las diferencias entre tus entornos testing y staging (infra, datos, control).
2. Configura un approval gate antes del deploy a staging.
3. Ensaya un rollback en staging y mide el tiempo de recuperación.

### ⚠️ Errores comunes

* Staging con menos recursos que producción: los problemas de capacidad no aparecen.
* Datos de producción reales sin anonimizar en staging (fuga de datos).
* "Staging roto" que nadie repara: pierde su valor y el equipo empieza a saltárselo.
* Tratar staging como un dev más, cambiándolo fuera de control.

### 🔗 Conexión DevOps

Staging es el puente entre la automatización (pipelines) y el factor humano (aprobaciones). Es donde se entrenan los runbooks de producción y donde se ensaya el rollback que luego salvará el release.
`
export default content
