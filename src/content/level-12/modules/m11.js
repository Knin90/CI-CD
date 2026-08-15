const content = `
## Módulo 11 — Promotion

### 🎯 Objetivos de aprendizaje

* Definir promoción entre entornos y su diferencia con redeploy.
* Promover el mismo artifact inmutable por la cadena de entornos.
* Diseñar promoción automática con gates de calidad.

### ❓ Problema real que resuelve

Desplegar el mismo código varias veces (recompilar en cada entorno) produce artifacts distintos: lo que se probó en staging no es exactamente lo que va a producción. La promoción promueve el **mismo artifact inmutable** validado en cada etapa — eliminando la variabilidad y haciendo que la cadena de entornos sea una escalera de validaciones crecientes.

### 💡 Analogía

La promoción es el ascenso de un jugador en la cantera del club: sube de la filial al primer equipo solo cuando pasa cada categoría. No lo "reclutan de nuevo" en cada nivel — es el mismo jugador (mismo artifact), con más validaciones encima. Si en cualquier nivel falla, no sube.

### 📖 Explicación técnica

* **Promoción**: mover un artifact validado de un entorno al siguiente (dev → testing → staging → prod).
* Regla fundamental: **promote the artifact, don't rebuild it** — la imagen que llega a producción es exactamente la que pasó todos los tests.
* Implementación: el artifact (imagen/tag) se referencia por su digest/tag inmutable; los stages de despliegue lo usan tal cual.
* Gates de promoción: cada entorno añade validaciones (tests, smoke, approval) que deben pasar para seguir.
* Gestión: artifacts registries con promoción (tags \`stable\`, \`staging-approved\`) y políticas de retención.
* Buenas prácticas: tag por commit (\`app:sha-abc123\`), promover por digest, revertir promoción (rollback) re-apuntando al artifact anterior, registrar el historial de promociones.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build → artifact inmutable (sha-abc123)
   ↓
DEV: deploy sha-abc123 → validado
   ↓
TESTING: deploy sha-abc123 → validado
   ↓
STAGING: deploy sha-abc123 → aprobado
   ↓
PROD: deploy sha-abc123 (el MISMO)
\`\`\`

### 🧪 Ejercicios

1. Cambia tu pipeline para promover el mismo tag de imagen en todos los entornos.
2. Verifica por digest que el artifact de producción es idéntico al de staging.
3. Documenta el historial de promociones de un release.

### ⚠️ Errores comunes

* Rebuild en cada entorno (artifacts distintos, paranoia de "compilado aquí funciona").
* Tags móviles (\`latest\`) que no garantizan inmutabilidad.
* Promover sin gates: nada valida entre entornos.
* No poder decir qué artifact está en producción (falta trazabilidad).

### 🔗 Conexión DevOps

La promoción es la materialización de "build once, deploy many": une artifacts (nivel 8), environments (nivel 12) y deployment strategies (nivel 13). Es lo que hace que la cadena de entornos sea una escalera de confianza, no una serie de despliegues independientes.
`
export default content
