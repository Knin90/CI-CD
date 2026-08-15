const content = `
## Módulo 12 — Protected branches

### 🎯 Objetivos de aprendizaje

* Definir qué es una rama protegida y qué reglas puede incluir.
* Configurar protección de rama para \`main\`.
* Entender la protección como el enforcement técnico de las políticas de CI.

### ❓ Problema real que resuelve

Las buenas prácticas (revisar PRs, CI en verde, ramas actualizadas) dependen de la disciplina de las personas — hasta que alguien tiene prisa y mergea con tests rojos. La protección de rama convierte esas políticas en **reglas técnicas que la plataforma hace cumplir**: sin aprobación o con checks rojos, el merge es simplemente imposible. Es la diferencia entre "deberíamos" y "no se puede".

### 💡 Analogía

Un candado de seguridad en la puerta del tesoro: puedes confiar en que nadie va a robar, pero el candado garantiza que aunque alguien lo intente, no pueda. La rama protegida es el candado de \`main\`: aunque un desarrollador (o un bot, o un error) intente mergear código no validado, la plataforma se lo impide.

### 📖 Explicación técnica

Reglas típicas de una rama protegida (\`main\`):

* **Require pull request reviews**: mínimo N aprobaciones antes de mergear.
* **Require status checks**: los checks de CI (build, tests, security) deben estar en verde.
* **Dismiss stale reviews**: si la rama cambia después de la aprobación, la aprobación se invalida.
* **Require branches up to date**: la rama debe estar actualizada con main antes del merge.
* **Require linear history**: solo merge squash/rebase (historial lineal).
* **No force pushes**: prohibido \`git push --force\` sobre la rama.
* **No deletions**: nadie puede borrar la rama protegida.
* **Allow specific actors**: solo bots de automatización (dependabot) pueden mergear sin revisión.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Intento de merge a main (protegida)
  │
  ▼
La plataforma evalúa las reglas
  ├── ¿Checks en verde?     → NO → merge bloqueado
  ├── ¿Aprobaciones?        → NO → merge bloqueado
  ├── ¿Rama actualizada?    → NO → merge bloqueado
  ├── ¿Force push?          → bloqueado siempre
  │
  ▼
Todas las reglas OK → merge permitido
  │
  ▼
El merge dispara el pipeline de CD
\`\`\`

### 💻 Ejemplo básico

Protección de main en GitHub (configuración):

\`\`\`text
Branch protection rules — main
  ✅ Require a pull request before merging
     ✅ Require approvals: 1
     ✅ Dismiss stale pull request approvals
     ✅ Require review from Code Owners
  ✅ Require status checks to pass before merging
     ✅ ci/validate
     ✅ Require branches to be up to date
  ✅ Require linear history
  ✅ Do not allow force pushes
  ✅ Do not allow deletions
\`\`\`

### 🏢 Caso de uso profesional

Una auditoría interna detecta que un desarrollador mergeó código con tests rojos "por urgencia" y produjo un incidente. El equipo habilita protección de rama: checks obligatorios, 1 aprobación, sin force push. Meses después, la auditoría confirma que el 100% de los merges a main cumplieron las reglas — la política dejó de depender de la disciplina individual.

### ⚠️ Errores comunes

* Proteger solo \`main\` y dejar \`release/*\` sin protección.
* Checks sin protección: tener CI pero no exigirlo.
* "Require branches up to date" sin team small: bloquea PRs por cualquier merge de otro.
* Allow force pushes: la protección se anula por completo.
* Proteger ramas de desarrollo (\`develop\`) de más: frena el flujo sin beneficio.

### 📋 Lo que debes recordar

* La protección de rama hace cumplir las políticas de CI técnicamente.
* Reglas clave: checks en verde, aprobaciones, rama actualizada, sin force push.
* Protege \`main\` y las ramas de release.
* Es el enforcement de la confianza: main siempre estable y auditado.

### 🧪 Autoevaluación rápida

1. ¿Qué reglas conviene configurar en una rama protegida?
2. ¿Qué significa "dismiss stale reviews"?
3. ¿Por qué la protección de rama es mejor que confiar en la disciplina?

---

1. Requerir PR con aprobaciones, exigir status checks en verde, rama actualizada con main, historial lineal y prohibir force pushes y borrados.
2. Que si la rama del PR cambia después de la aprobación (nuevos commits), las aprobaciones previas se invalidan y hay que re-revisar.
3. Porque convierte las políticas en reglas que la plataforma hace cumplir: aunque alguien tenga prisa o se equivoque, el sistema lo impide; es una garantía, no una intención.
`
export default content
