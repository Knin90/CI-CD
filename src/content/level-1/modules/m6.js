const content = `
## Módulo 6 — Merge conflicts

### 🎯 Objetivos de aprendizaje

* Explicar cuándo y por qué ocurren los conflictos de merge.
* Resolver conflictos correctamente con herramientas de Git.
* Entender cómo CI y las ramas cortas reducen la frecuencia de conflictos.

### ❓ Problema real que resuelve

Cuando dos ramas modifican las mismas líneas, Git no puede decidir cuál versión conservar: se genera un conflicto. Resolverlo mal (quedarse con el código equivocado, perder cambios de otro) introduce bugs silenciosos. Saber resolver conflictos de forma sistemática es una habilidad básica pero crítica, porque un conflicto mal resuelto puede pasar todos los tests y romper producción semanas después.

### 💡 Analogía

Dos personas editan el mismo párrafo de un documento compartido: el editor no puede saber cuál de las dos versiones es la correcta y pide que se decida. El conflicto de merge es Git pidiendo esa decisión: no es un error, es una señal de que un humano debe revisar ambas versiones y combinar lo correcto.

### 📖 Explicación técnica

* Un conflicto ocurre cuando Git no puede **auto-mergear** cambios: las dos ramas tocaron las mismas líneas de los mismos archivos.
* Git marca los archivos en conflicto y los envuelve con marcadores:
  * \`<<<<<<< HEAD\` — tu versión (la rama actual).
  * \`=======\` — separador.
  * \`>>>>>>> feature/x\` — la versión entrante.
* Flujo de resolución:
  1. Identificar los archivos en conflicto (\`git status\`).
  2. Leer **ambas** versiones con contexto.
  3. Editar dejando la combinación correcta (o la que corresponda).
  4. Eliminar los marcadores.
  5. \`git add\` y continuar el merge/rebase.
  6. **Correr los tests** (y dejar que el CI los corra): un conflicto mal resuelto compila pero rompe lógica.
* Estrategias para reducirlos: ramas cortas, integrar main en la rama frecuentemente, commits pequeños, y dividir el trabajo para no tocar los mismos archivos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
main:      ... ●──●
feature/x: ... ●──●──●
                     │
Merge intentado ─────┘
  │
  ├── Mismas líneas tocadas → CONFLICTO
  │     └── Marcadores en el archivo
  └── Líneas distintas → auto-merge (sin conflicto)
  │
  ▼
Resolución manual → git add → commit del merge
  │
  ▼
CI valida la resolución (tests)
\`\`\`

### 💻 Ejemplo básico

Resolver un conflicto:

\`\`\`bash
git merge feature/x
# CONFLICT in src/app.js
git status                       # ver archivos en conflicto
# Editar src/app.js: elegir la combinación correcta
git add src/app.js
git commit -m "merge: resuelve conflicto en app.js"
npm test                         # validar la resolución
\`\`\`

### 🏢 Caso de uso profesional

Dos desarrolladores trabajan en \`checkout\` y \`promotions\` y ambos modifican el archivo de cálculo de precios. Al integrar, hay conflicto. En lugar de "quedarse con lo suyo", el equipo revisa ambas versiones, combina el descuento con el nuevo flujo de pago y agrega un test que cubre la interacción. El CI corre los 500 tests y confirma. El conflicto, bien resuelto, produjo mejor código que el que cada uno tenía por separado.

### ⚠️ Errores comunes

* Resolver el conflicto "dejando lo mío": se pierden cambios del otro.
* Borrar los marcadores sin revisar: código a medias.
* Commitear la resolución sin correr tests.
* Resolver conflictos de archivos generados (package-lock, dist) a mano en vez de regenerarlos.
* Evitar integrar por miedo a los conflictos: ramas eternas empeoran el problema.

### 📋 Lo que debes recordar

* Conflicto = Git pide una decisión humana, no es un error del sistema.
* Leer ambas versiones antes de decidir.
* Validar la resolución con tests y CI.
* Ramas cortas + integración frecuente = menos conflictos.
* Los archivos generados se regeneran, no se resuelven a mano.

### 🧪 Autoevaluación rápida

1. ¿Cuándo ocurre un conflicto de merge?
2. ¿Qué significan los marcadores \`<<<<<<< HEAD\` y \`>>>>>>> feature/x\`?
3. ¿Por qué hay que correr los tests después de resolver un conflicto?

---

1. Cuando dos ramas modifican las mismas líneas de los mismos archivos y Git no puede decidir automáticamente cuál versión conservar.
2. \`<<<<<<< HEAD\` marca el inicio de tu versión (rama actual) y \`>>>>>>> feature/x\` el final de la versión entrante; entre ambos está el contenido en disputa.
3. Porque un conflicto mal resuelto puede compilar y pasar tests parciales, pero romper la lógica de negocio al combinar mal ambas versiones.
`
export default content
