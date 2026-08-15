const content = `
## Módulo 12 — Artifact promotion

### 🎯 Objetivos de aprendizaje

* Explicar la promoción de artefactos entre entornos.
* Promover el MISMO artefacto, no reconstruirlo.
* Aplicar aprobaciones y verificación en cada promoción.

### ❓ Problema real que resuelve

Un artefacto debe viajar: validado en staging → aprobado → desplegado en producción. La promoción es ese viaje controlado: la misma versión se "promueve" a cada entorno con sus validaciones y aprobaciones. Sin promoción formal, se reconstruye por entorno (rompe la inmutabilidad) o se despliega sin control (sin gates).

### 💡 Analogía

La promoción es como el ascenso de un candidato en una empresa: pasa por entrevistas (validaciones) y aprobaciones en cada nivel (staging, producción) SIN cambiar de persona (mismo artefacto). El candidato no se "recluta de nuevo" en cada nivel: es el mismo, evaluado cada vez más a fondo.

### 📖 Explicación técnica

Modelo:

* El artefacto nace en el registry (inmutable).
* **Promoción a staging**: automática tras CI (despliega y valida).
* **Validación en staging**: smoke, e2e, funcionales.
* **Promoción a producción**: con aprobación (entorno protegido) y verificación post-deploy.
* Cada promoción referencia la MISMA versión/digest.

Reglas:

* **Nunca reconstruir**: la promoción usa el artefacto existente.
* **Gates por entorno**: cada promoción exige las validaciones de ese nivel.
* **Trazabilidad**: el registro muestra qué versión se promovió a qué entorno, cuándo y por quién.
* **Rollback**: des-promover = volver a la versión anterior del mismo registry.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Registry: app:v1.4.0 (inmutable)
  │
  ▼
Promoción 1 → STAGING (automática)
  │     └── Validación: smoke + e2e en staging
  │
  ▼
Promoción 2 → PRODUCCIÓN (aprobación)
  │     ├── Approver: release manager
  │     └── Verificación: health checks + métricas
  │
  ▼
Registro: v1.4.0 → staging (auto) → prod (aprobado por X)
\`\`\`

### 💻 Ejemplo básico

Promoción con el mismo digest (Kubernetes):

\`\`\`bash
# staging (automático)
kubectl -n staging set image deployment/app app=registry/app:v1.4.0

# producción (tras aprobación) — MISMO digest
kubectl -n prod set image deployment/app app=registry/app:v1.4.0@sha256:9f86...
\`\`\`

### 🏢 Caso de uso profesional

Una plataforma SaaS promueve cada release: automática a staging, validación E2E, aprobación del release manager y despliegue a producción con la misma imagen (mismo digest). Cuando staging detecta un problema de performance, la promoción se detiene antes de producción — el problema nunca llegó a los usuarios. La promoción es el control de calidad en movimiento.

### ⚠️ Errores comunes

* Reconstruir el artefacto por entorno.
* Promover sin validación en el entorno anterior.
* Promoción manual a producción (scripts a mano sin gates).
* Sin registro de promociones (no se sabe qué llegó a prod).
* Desplegar en producción sin pasar por staging.

### 📋 Lo que debes recordar

* Promoción = la misma versión viaja por entornos con gates.
* Nunca reconstruir: mismo digest en todas partes.
* Cada entorno valida antes de pasar al siguiente.
* El registro de promociones es la auditoría de qué se desplegó.

### 🧪 Autoevaluación rápida

1. ¿Qué es la promoción de artefactos?
2. ¿Qué regla fundamental sigue la promoción?
3. ¿Qué papel juegan las aprobaciones en la promoción?

---

1. El viaje controlado de la misma versión del artefacto a través de los entornos (staging → producción).
2. Nunca reconstruir: se promueve el artefacto existente (mismo digest), manteniendo la inmutabilidad y la validez de las validaciones.
3. Ser el gate de entornos protegidos: sin aprobación, el artefacto no se promueve a ese entorno.
`
export default content
