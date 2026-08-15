const content = `
## Módulo 11 — Pipeline dependencies

### 🎯 Objetivos de aprendizaje

* Definir dependencias entre jobs y stages.
* Construir grafos de pipeline (DAG).
* Pasar artifacts entre jobs dependientes.

### ❓ Problema real que resuelve

Un pipeline no es una lista secuencial: es un grafo. El deploy depende del build; los tests de integración dependen de los unit; el release depende de todos. Las dependencias explícitas definen ese grafo: qué job espera a qué, qué artifacts pasan entre ellos — eliminando el orden "por suerte" o los tiempos muertos innecesarios.

### 💡 Analogía

Las dependencias del pipeline son las precedencias de la construcción: no se puede pintar antes de enlucir, ni enlucir antes de levantar la pared. El plan de obra (grafo del pipeline) define el orden correcto y qué materiales (artifacts) se necesitan en cada fase — nadie "empieza por donde quiere".

### 📖 Explicación técnica

* **Dependencia**: relación "job B espera a job A" (y consume lo que A produce).
* Implementaciones: \`needs\` (GitHub — por job, permite DAGs), \`dependencies\` (Azure), \`stages\` + \`artifacts: dependencies\` (GitLab), \`build\`/\`upstream\` (Jenkins).
* **DAG (Directed Acyclic Graph)**: la estructura de dependencias — sin ciclos (A→B→A es inválido). La plataforma calcula el orden y el paralelismo máximo posible.
* **Artifacts entre jobs**: el job productor publica artifacts (nivel 8); el dependiente los descarga (\`actions/download-artifact\`, \`artifacts: paths\` en GitLab, \`stash/unstash\` en Jenkins).
* Beneficios: orden garantizado, paralelismo máximo (solo esperan lo necesario — módulo 7), fallos tempranos (si el build falla, los dependientes ni arrancan).
* Buenas prácticas: dependencias mínimas necesarias (cada dependencia es tiempo de espera), artifacts con retención, grafos visibles (la plataforma muestra el DAG — pipeline graphs, nivel 5).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
build ──► unit ──► integ ──► deploy
   │        │         │
   └──► lint ──┘        │
        │               │
        └──► scan ──────┘
(needs define el grafo; artifacts fluyen por las flechas)
\`\`\`

### 🧪 Ejercicios

1. Dibuja el grafo de dependencias de tu pipeline actual.
2. Usa \`needs\` (o equivalente) para definir dependencias explícitas por job.
3. Pasa un artifact entre dos jobs dependientes y verifica el flujo.

### ⚠️ Errores comunes

* Dependencias implícitas por orden "de costumbre" (se rompen al reordenar).
* Dependencias innecesarias (B espera a A aunque no lo necesita — serializa en vano).
* Artifacts mal pasados (el job dependiente no encuentra lo que necesita).
* Ciclos o dependencias circulares (la plataforma lo rechaza; el diseño está mal).

### 🔗 Conexión DevOps

Las dependencias definen la estructura del pipeline: conectan jobs/stages (nivel 5), artifacts (nivel 8), parallel execution (módulo 7) y los pipeline graphs (nivel 5).
`
export default content
