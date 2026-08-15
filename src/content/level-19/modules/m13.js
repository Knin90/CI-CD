const content = `
## Módulo 13 — Artifact promotion

### 🎯 Objetivos de aprendizaje

* Definir promoción de artifacts entre entornos.
* Gestionar ciclos de vida de artifacts en registries.
* Usar tags de promoción y políticas de retención.

### ❓ Problema real que resuelve

El artifact validado en staging debe llegar a producción con garantías: quién lo validó, cuándo, y que es exactamente el mismo. La promoción de artifacts gestiona ese ciclo — tags de estado (\`staging-approved\`, \`prod\`), inmutabilidad, retención y trazabilidad — en el registry, no en el pipeline.

### 💡 Analogía

La promoción de artifacts es el ascenso del vino en la bodega: el vino (artifact) pasa de la barrica de guarda (staging) a la sala de venta (prod) solo después de la cata de aprobación (validación). Y cada botella tiene su etiqueta de estado (añada, aprobado) — no se vende una botella sin saber su historia.

### 📖 Explicación técnica

* **Artifact promotion**: mover/marcar un artifact a un estado de mayor confianza (dev → staging → prod).
* Implementaciones: tags en el registry (\`myapp:1.2.3-staging-ok\`, luego \`myapp:1.2.3\`/\`stable\`), promoción en registries con UI (Artifactory, Nexus, ECR, GHCR — nivel 8), o copy entre repositorios.
* **Inmutabilidad**: el artifact no se modifica; la promoción cambia su estado/etiqueta, no su contenido. Nunca sobrescribir un tag ya promovido.
* **Retención**: políticas por estado — los artifacts de prod se conservan más; los de dev expiran (nivel 8 — retención).
* **Trazabilidad**: el artifact promovido a prod registra su origen (commit, pipeline, validaciones que pasó) — conecta con SBOM (nivel 10) para compliance.
* En el pipeline: el job de deploy a prod referencia el tag promovido (no re-build) — "build once, deploy many" (nivel 23).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build → myapp:sha-abc123 (tag inicial)
   ↓
Staging OK → tag: myapp:sha-abc123-staging-ok
   ↓
Aprobado → tag: myapp:stable (o copy a repo prod)
   ↓
Deploy a prod: referencia el artifact promovido
   ↓
Retención: prod conservado, dev expira
\`\`\`

### 🧪 Ejercicios

1. Define los estados de promoción de tus artifacts (dev/staging/prod) y sus tags.
2. Configura políticas de retención por estado en tu registry.
3. Verifica que el deploy a prod usa el artifact promovido (no uno re-build).

### ⚠️ Errores comunes

* Sobrescribir tags promovidos (el tag ya no identifica el artifact validado).
* Promoción sin trazabilidad (no se sabe qué validaciones pasó).
* Retención uniforme (los artifacts de prod se borran como los de dev).
* Re-build en cada entorno (rompe "build once" y la promoción pierde sentido).

### 🔗 Conexión DevOps

La promoción de artifacts materializa "build once, deploy many" (nivel 23): conecta artifacts (nivel 8), registries (nivel 8), entornos (nivel 12) y la promoción entre entornos (nivel 12).
`
export default content
