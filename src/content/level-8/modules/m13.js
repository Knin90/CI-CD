const content = `
## Módulo 13 — Immutable artifacts

### 🎯 Objetivos de aprendizaje

* Explicar el principio de inmutabilidad de artefactos.
* Aplicar "build once, deploy many".
* Usar la inmutabilidad para reproducibilidad y rollback.

### ❓ Problema real que resuelve

Si un artefacto publicado cambia (se reconstruye, se sobreescribe), la validación pierde sentido: lo que probaste ya no es lo que desplegaste. La inmutabilidad garantiza que el artefacto es SIEMPRE el mismo: lo que se verificó en CI, se probó en staging y se despliega en producción es exactamente el mismo objeto. Es el principio que sostiene la confianza de todo el pipeline.

### 💡 Analogía

Una botella de vino de colección: una vez sellada y etiquetada, no se re-embotella. Cada botella (versión) es única y su contenido no cambia; si quieres otro vino, abres otra botella (nueva versión). Re-embotellar la misma etiqueta con otro contenido sería un fraude: la etiqueta (versión) dejaría de significar lo que prometió.

### 📖 Explicación técnica

Principio: **un artefacto publicado no se modifica jamás**. Los cambios generan versiones nuevas.

Implicaciones:

* **Build once, deploy many**: el artefacto se construye una vez y se despliega N veces (entornos, reintentos, rollbacks) — siempre el mismo.
* **Verificación válida**: lo probado en staging es idéntico a lo desplegado en producción.
* **Reproducibilidad**: la versión v1.4.0 es reproducible en cualquier momento (mismo digest, mismo código).
* **Rollback seguro**: revertir es desplegar la versión anterior, que sigue existiendo intacta.
* **Auditoría**: "qué se desplegó" tiene respuesta exacta y estable.

Técnicas para garantizarla:

* Registries con **tags inmutables** (bloquean sobreescritura).
* Despliegues con **digest** (no re-taggeables).
* Firma de artefactos (detecta alteraciones).
* Versionado semver: los cambios son versiones nuevas.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build → app:v1.4.0 (digest 9f86...) → publicado (INMUTABLE)
  │
  ├── Verificado en CI (smoke) ✓
  ├── Probado en staging ✓
  ├── Desplegado en producción ✓
  └── Rollback → v1.3.9 (sigue en el registry, intacta)
  │
  ▼
Nada de esto es posible si v1.4.0 pudiera cambiar
\`\`\`

### 💻 Ejemplo básico

Reglas de inmutabilidad:

\`\`\`text
✓ app:v1.4.0 se publica una vez y no se toca
✓ Los despliegues usan el digest exacto
✗ "v1.4.0" reconstruida para producción
✗ Sobreescribir v1.4.0 con un "fix"
  (el fix es v1.4.1, una versión nueva)
\`\`\`

### 🏢 Caso de uso profesional

Una empresa con despliegues de alta frecuencia sufre un incidente: la v1.4.0 desplegada tiene un bug. El rollback a v1.3.9 funciona en segundos porque esa imagen sigue en el registry, intacta, con su digest. Un equipo que reconstruyera sus artefactos no podría hacer esto: la v1.3.9 "reconstruida" podría no ser la que se probó. La inmutabilidad convirtió el rollback en una operación trivial.

### ⚠️ Errores comunes

* Reconstruir el artefacto por entorno.
* Sobreescribir versiones publicadas.
* Taggeo mutable (latest para despliegues).
* Artefactos sin digest/firma: no se puede verificar que no cambiaron.
* "Parchear" el artefacto desplegado en vez de publicar una versión nueva.

### 📋 Lo que debes recordar

* Publicado = inmutable; los cambios son versiones nuevas.
* Build once, deploy many: el mismo artefacto en todos los entornos.
* La inmutabilidad hace válida la verificación y seguro el rollback.
* Digest + tags inmutables + firma la garantizan.

### 🧪 Autoevaluación rápida

1. ¿Qué significa que un artefacto sea inmutable?
2. ¿Por qué "build once, deploy many" depende de la inmutabilidad?
3. ¿Cómo se garantiza la inmutabilidad técnicamente?

---

1. Que una vez publicado no se modifica: cualquier cambio genera una versión nueva.
2. Porque si el artefacto se reconstruyera por entorno, lo que se probó en staging no sería lo desplegado en producción; el mismo artefacto en todos los entornos solo es válido si no cambia.
3. Con tags inmutables en el registry, despliegues por digest, firma de artefactos y versionado semver.
`
export default content
