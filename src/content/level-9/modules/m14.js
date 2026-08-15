const content = `
## Módulo 14 — Immutable images

### 🎯 Objetivos de aprendizaje

* Aplicar el principio de inmutabilidad a las imágenes.
* Publicar por digest y desplegar sin mutación.
* Usar la inmutabilidad para rollbacks y auditoría.

### ❓ Problema real que resuelve

Una imagen publicada que cambia (se sobreescribe el tag, se re-pushea el mismo tag con otro contenido) rompe todo: lo que se escaneó ya no es lo que se despliega, los rollbacks apuntan a contenido distinto y la auditoría miente. La inmutabilidad de imágenes garantiza que \`app:v1.4.0\` SIEMPRE es la misma imagen: el digest lo demuestra.

### 💡 Analogía

La imagen inmutable es como una moneda de colección sellada: la cápsula (digest) garantiza que la moneda nunca se cambió. Una "colección" donde las monedas se sustituyen en la misma etiqueta sería falsa: el coleccionista (auditor) no sabría qué tiene. La inmutabilidad es la cápsula de la imagen.

### 📖 Explicación técnica

Principio: **una imagen publicada no se modifica**. Reglas:

* Tags de release (\`v*\`) inmutables: el registry rechaza sobreescrituras.
* Despliegues con **digest** (no re-taggeables).
* Firma (cosign) que ata la imagen al contenido.
* Los cambios son versiones nuevas (v1.4.1), nunca re-pushes de v1.4.0.

Beneficios:

* **Verificación válida**: lo escaneado/probado = lo desplegado.
* **Rollback seguro**: volver a v1.3.9 es exactamente la imagen conocida.
* **Auditoría**: "qué se desplegó" tiene respuesta estable.
* **Reproducibilidad**: la imagen es reproducible desde su digest.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
app:v1.4.0 (digest 9f86...) — publicada, INMUTABLE
  │
  ├── Escaneada ✓ (ese contenido exacto)
  ├── Probada en staging ✓
  ├── Desplegada en producción ✓
  └── Rollback → v1.3.9 (intacta, con su digest)
  │
  ▼
Registry: política "tag inmutable" → sobreescritura rechazada
\`\`\`

### 💻 Ejemplo básico

Política de inmutabilidad (ECR):

\`\`\`json
{
  "rules": [
    {
      "rulePriority": 1,
      "selection": { "tagStatus": "tagged", "tagPrefixList": ["v"], "countType": "imageCountMoreThan", "countNumber": 1 },
      "action": { "type": "expire" }
    }
  ]
}
\`\`\`

Más robusto: usar un registry con "tag immutability" nativo (Harbor, ECR con \`tagImmutability\`).

### 🏢 Caso de uso profesional

Una empresa con compliance estricto: las imágenes se publican con digest y el registry bloquea sobreescrituras de tags. Cuando la auditoría pregunta "¿qué imagen se desplegó en producción el 14 de agosto?", la respuesta es el digest exacto con su firma — y pueden verificar que ese contenido no cambió jamás.

### ⚠️ Errores comunes

* Sobreescribir tags publicados ("hotfix al mismo tag").
* Desplegar \`latest\` mutable.
* Sin digest en los despliegues.
* Imágenes sin firmar (no verificables).
* "Re-pushear" la misma versión con código nuevo.

### 📋 Lo que debes recordar

* Publicado = inmutable; los fixes son versiones nuevas.
* Despliega con digest; el registry bloquea sobreescrituras.
* La inmutabilidad hace válidas la verificación, el rollback y la auditoría.
* Firma las imágenes para probar su integridad.

### 🧪 Autoevaluación rápida

1. ¿Qué garantiza la inmutabilidad de una imagen?
2. ¿Cómo se despliega para garantizarla?
3. ¿Qué le pasa al rollback si los tags se sobreescriben?

---

1. Que \`app:v1.4.0\` siempre es la misma imagen: lo escaneado, probado y desplegado es idéntico en el tiempo.
2. Con digest exacto (\`app:v1.4.0@sha256:...\`) y políticas de tag inmutable en el registry.
3. El rollback deja de ser confiable: la versión anterior podría contener contenido distinto al que se probó.
`
export default content
