const content = `
## Módulo 11 — Artifact retention

### 🎯 Objetivos de aprendizaje

* Definir políticas de retención de artefactos.
* Configurar retención por tipo (release, intermedio, snapshot).
* Balancear trazabilidad, compliance y costo.

### ❓ Problema real que resuelve

Los artefactos acumulan: cada build deja su imagen/paquete, y sin política, el almacenamiento crece sin límite (costo) o se borra todo por miedo (pierde trazabilidad). La retención define QUÉ se conserva, CUÁNTO y POR QUÉ: releases inmutables casi siempre, intermedios días, snapshots horas. Es una decisión de equilibrio entre costo y auditoría.

### 💡 Analogía

La retención de artefactos es como el archivo de una empresa: las escrituras legales (releases) se conservan décadas; las notas internas (builds intermedios) unos meses; los borradores (snapshots) días. Guardarlo todo satura el archivo; tirarlo todo hace imposible demostrar nada.

### 📖 Explicación técnica

Políticas típicas:

* **Releases** (tag v*): retención larga o indefinida, inmutables — trazabilidad y rollback.
* **Builds intermedios** (PRs, ramas): días o semanas — debug de PRs recientes.
* **Snapshots**: corta — solo integración reciente.
* **Imágenes sin tag/huérfanas**: limpieza automática (nadie las usa).

Configuración:

* Pipeline: \`retention-days\` en artefactos de job (GitHub: 1-90; GitLab: \`expire_in\`).
* Registry: políticas de limpieza (ECR lifecycle policies, GitLab cleanup, Nexus tasks).
* Compliance: los artefactos de releases auditados se archivan (S3/Glacier) con acceso raro.

Consideraciones:

* El rollback depende de que la versión anterior siga existiendo: las releases NO se borran sin justificación.
* Costo: almacenamiento + transferencia; balancear.
* Auditoría: lo que se retiene debe ser trazable (digest, firma, metadatos).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Tipos de artefactos y su retención:
  │
  ├── Releases (v*) ──► indefinido (rollback + auditoría)
  ├── PRs / intermedios ──► 30 días (debug)
  ├── Snapshots ──► 7 días (integración reciente)
  └── Sin tag / huérfanos ──► limpieza automática
  │
  ▼
Tareas programadas de limpieza (registry + pipeline)
  │
  ▼
Métricas: almacenamiento por repositorio, crecimiento
\`\`\`

### 💻 Ejemplo básico

Retención en el pipeline (GitHub):

\`\`\`yaml
- uses: actions/upload-artifact@v4
  with:
    name: app
    path: dist/
    retention-days: 30
\`\`\`

Política de limpieza del registry (ECR):

\`\`\`json
{
  "rules": [
    { "rulePriority": 1, "selection": { "tagStatus": "untagged", "countType": "sinceImagePushed", "countNumber": 7 } }
  ]
}
\`\`\`

### 🏢 Caso de uso profesional

Un equipo define su política: releases indefinidas (rollback a cualquier versión), PRs 30 días, snapshots 7, imágenes sin tag 7. La limpieza automática del registry mantiene el almacenamiento estable, y la auditoría anual encuentra todas las releases intactas con sus digests. El costo de almacenamiento se mantiene plano mientras la trazabilidad es total.

### ⚠️ Errores comunes

* Retención infinita para todo (costo descontrolado).
* Borrar releases por falta de espacio (pierde rollback y auditoría).
* Sin limpieza de huérfanos (crecen silenciosamente).
* Políticas sin métricas (no se sabe cuánto se guarda).
* Retención de PRs demasiado corta (bugs que necesitan el build de hace 2 meses).

### 📋 Lo que debes recordar

* Política por tipo: releases largas, intermedios cortos, huérfanos limpia.
* El rollback depende de que las versiones anteriores existan.
* Limpieza automática + métricas de almacenamiento.
* Compliance: lo retenido debe ser trazable.

### 🧪 Autoevaluación rápida

1. ¿Qué retención conviene para las releases?
2. ¿Qué pasa si se borran releases por espacio?
3. ¿Qué artefactos deben limpiarse automáticamente?

---

1. Larga o indefinida e inmutable: sostienen el rollback y la auditoría.
2. Se pierde la capacidad de rollback a esa versión y la evidencia de auditoría; es una deuda de trazabilidad.
3. Los builds intermedios viejos, los snapshots antiguos y las imágenes sin tag (huérfanas).
`
export default content
