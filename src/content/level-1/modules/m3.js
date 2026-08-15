const content = `
## Módulo 3 — Commits

### 🎯 Objetivos de aprendizaje

* Explicar qué contiene un commit y por qué su mensaje es parte de la trazabilidad.
* Aplicar el principio de commits atómicos.
* Relacionar la calidad de los commits con la calidad del pipeline y las releases.

### ❓ Problema real que resuelve

Un historial de commits desordenado ("fix", "cambios", "wip") hace imposible responder preguntas críticas: ¿qué cambio introdujo este bug?, ¿qué versión incluye esta feature?, ¿qué hay que revertir en un incidente? Los commits son la unidad básica de trazabilidad del software: si están mal hechos, toda la cadena (PRs, releases, troubleshooting) se degrada.

### 💡 Analogía

Los commits son las entradas de un diario de bitácora de un barco: cada entrada registra un evento concreto, con fecha y motivo. Un diario con entradas vagas ("cosas del día") no sirve para reconstruir qué pasó ni para evitar repetir errores. La bitácora de Git es lo mismo: su calidad determina cuánto se puede aprender de la historia del código.

### 📖 Explicación técnica

* Un **commit** es una fotografía del estado del repositorio: contiene los cambios (diff), el mensaje, el autor, la fecha y el hash (SHA-1) que lo identifica de forma única.
* **Commit atómico**: un cambio lógico por commit — una feature, un fix, una refactorización. Nada de mezclar "fix del login + estilos + dependencias" en uno solo.
* El mensaje debe explicar **el qué y el porqué**: "fix(checkout): corrige el cálculo del total" es útil; "fix" no.
* **Convención Conventional Commits** (ver módulo 14): \`tipo(scope): descripción\` — estandariza mensajes y habilita generación automática de changelogs y versionado semántico.
* Los commits son la entrada del pipeline: cada push dispara CI; el historial limpio facilita revertir (\`git revert\`) y hacer \`bisect\` para encontrar la causa de un bug.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
git add (seleccionar cambios)
  │
  ▼
git commit -m "feat(api): agrega endpoint de pagos"
  │
  ▼
Commit creado: hash + autor + fecha + diff
  │
  ▼
git push
  │
  ▼
CI se dispara con este commit como contexto
  │
  ▼
El commit queda ligado a: build, tests, PR, release
\`\`\`

### 💻 Ejemplo básico

Commit atómico con mensaje explicativo:

\`\`\`bash
git add src/payment/api.js src/payment/api.test.js
git commit -m "feat(api): agrega endpoint POST /payments

Valida el monto con la regla de negocio y registra
la transacción para auditoría."
\`\`\`

La primera línea es el resumen (imperativo, < 72 chars); el cuerpo explica el porqué.

### 🏢 Caso de uso profesional

Durante un incidente de producción, el equipo debe revertir el último cambio que rompió el checkout. Como el historial usa commits atómicos con Conventional Commits, identifican el commit exacto en segundos (\`git log --grep="checkout"\`), lo revierten con \`git revert\` y el pipeline despliega la corrección. En un historial desordenado, la misma tarea habría tomado horas.

### ⚠️ Errores comunes

* Mensajes vagos: "fix", "cambios", "wip", "final final".
* Commits que mezclan varias cosas: imposibles de revertir selectivamente.
* Commitear secretos o archivos generados (build, node_modules).
* "Commitear y ver": usar el CI como depurador (push → esperar → push).
* Reescribir historia compartida (\`git rebase\` sobre ramas ya pusheadas y usadas por otros).

### 📋 Lo que debes recordar

* Commit = cambio atómico + mensaje que explica el qué y el porqué.
* Conventional Commits estandariza mensajes y habilita releases automáticas.
* El historial limpio permite revertir y hacer bisect con precisión.
* Nunca commitear secretos ni archivos generados.

### 🧪 Autoevaluación rápida

1. ¿Qué significa un "commit atómico"?
2. ¿Por qué el mensaje del commit debe explicar el porqué?
3. ¿Qué herramienta de Git permite encontrar el commit que introdujo un bug?

---

1. Un commit que contiene un único cambio lógico (una feature, un fix, una refactorización), fácil de revisar, revertir y entender.
2. Porque el "qué" ya lo dice el diff; el "porqué" (contexto, decisión, motivo) es lo que necesita quien lea la historia meses después.
3. \`git bisect\`: búsqueda binaria sobre el historial que identifica el commit que introdujo una regresión.
`
export default content
