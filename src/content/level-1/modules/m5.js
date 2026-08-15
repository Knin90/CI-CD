const content = `
## Módulo 5 — Merge

### 🎯 Objetivos de aprendizaje

* Explicar las estrategias de merge (merge commit, squash, rebase) y cuándo usar cada una.
* Entender cómo la estrategia de merge afecta el historial y las releases.
* Relacionar el merge con el disparo del pipeline de CD.

### ❓ Problema real que resuelve

El merge es el momento en que los cambios entran a la rama principal: define cómo se ve el historial para siempre. Un historial lleno de "merge branch feature/x" intercalados es difícil de leer y de asociar con features; un historial lineal con squash por PR es fácil de navegar y de mapear a releases. Elegir la estrategia correcta es una decisión de arquitectura de historial.

### 💡 Analogía

El merge es como archivar documentos: puedes archivar cada borrador y anotación suelta (merge commits), o archivar solo el documento final limpio con una referencia al trabajo (squash). El archivo bien organizado permite encontrar cualquier cosa en segundos; el archivo desordenado obliga a leer todo para encontrar algo.

### 📖 Explicación técnica

Estrategias principales:

* **Merge commit**: crea un commit de fusión que une las historias; preserva todos los commits de la rama. Útil para mantener contexto completo, pero ensucia el historial con "merges".
* **Squash and merge**: condensa todos los commits de la rama en **un solo commit** en main. Historial limpio y lineal; el PR completo se puede revertir de una vez. Ideal para equipos que quieren historial simple.
* **Rebase and merge**: reescribe los commits de la rama sobre la punta de main y los integra sin commit de merge. Historial lineal pero conserva commits individuales; requiere más disciplina.
* **Fast-forward**: cuando la rama base no avanzó, Git solo mueve el puntero; no crea commit de merge.

En CI/CD, el merge a main es el trigger típico de CD: el historial limpio (squash) hace que cada deploy corresponda a un PR y sea fácil de mapear y revertir.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Rama feature/x:  c1 → c2 → c3 (3 commits)
main:            m1 → m2

Merge commit:    m1 → m2 → merge-commit(c1,c2,c3)
Squash:          m1 → m2 → squash(c1+c2+c3)  ← 1 commit
Rebase:          m1 → m2 → c1' → c2' → c3'  ← lineal

Merge → trigger CD → deploy de la nueva versión
\`\`\`

### 💻 Ejemplo básico

Squash and merge desde la CLI:

\`\`\`bash
git checkout main
git pull origin main
git merge --squash feature/x
git commit -m "feat(api): agrega endpoint de pagos (#456)"
git push origin main
\`\`\`

El resultado: un solo commit en main que representa todo el PR, referenciando el número del PR.

### 🏢 Caso de uso profesional

Un equipo que publica releases semanales usa squash and merge con Conventional Commits. Al llegar el release, un script genera el changelog a partir de los mensajes de los PRs mergeados (\`git log --oneline v1.3.0..HEAD\`). Cada entrada del changelog corresponde a un PR, y cada deploy a main es trazable a un conjunto exacto de PRs.

### ⚠️ Errores comunes

* Mezclar estrategias sin criterio: historial incoherente.
* Rebase sobre ramas compartidas: reescritura que rompe el trabajo de otros.
* Mergear sin actualizar la rama base primero: conflictos evitables.
* Squash que pierde información importante del cuerpo del commit (usar bien el mensaje).
* Mergear con tests rojos: el pipeline pierde su función de guardián.

### 📋 Lo que debes recordar

* Merge commit conserva todo; squash limpia; rebase ordena linealmente.
* El squash es ideal para historial simple y mapeo PR → release.
* El merge a main es el disparador típico de CD.
* La estrategia elegida debe ser consistente en todo el equipo.

### 🧪 Autoevaluación rápida

1. ¿Qué hace "squash and merge" con los commits de la rama?
2. ¿Por qué un historial limpio facilita las releases?
3. ¿Qué riesgo tiene hacer rebase sobre ramas compartidas?

---

1. Condensa todos los commits de la rama en un único commit en la rama base, con un mensaje nuevo (idealmente referenciando el PR).
2. Porque permite generar changelogs automáticos desde los mensajes, mapear cada deploy a un conjunto de PRs y revertir un cambio completo de una vez.
3. Reescribe la historia compartida: los demás desarrolladores que ya tenían la rama obtienen conflictos de historial y su trabajo puede perderse.
`
export default content
