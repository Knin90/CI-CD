const content = `
## Módulo 3 — Reusable workflows

### 🎯 Objetivos de aprendizaje

* Diseñar workflows reutilizables con inputs y secrets.
* Versionar y versionar el consumo de workflows.
* Equilibrar reutilización y flexibilidad.

### ❓ Problema real que resuelve

Cada repo reinventa su CI: 20 repos con 20 variantes del mismo build/test/deploy, todas ligeramente distintas. Los reusable workflows (nivel 19) centralizan el CI en un lugar: un repo de organización con workflows llamables que cualquier repo consume con inputs. Resuelve la consistencia entre repos sin sacrificar la flexibilidad.

### 💡 Analogía

Los reusable workflows son las plantillas de menú de la cadena de restaurantes: la casa matriz (repo central) define el menú base (workflow de CI), y cada sucursal (repo) lo usa con sus opciones (inputs: qué stack, qué comandos). Si el menú cambia (nueva versión del linter), se actualiza en la casa matriz y todas las sucursales lo reciben — pero cada una elige su plato.

### 📖 Explicación técnica

* **Workflow reutilizable**: workflow llamable (GitHub \`workflow_call\`, nivel 19) con:
  * **Inputs**: parámetros tipados (stack, comandos, paths) con defaults y \`required\`.
  * **Secrets**: declarados explícitamente (\`secrets: inherit\` o lista) — los secrets no se pasan por \`with\` (nivel 11).
  * **Outputs**: resultados que el llamador consume (nivel 19).
  * **Versionado**: se referencia por tag/ref (\`@v1\`, \`@<sha>\`) — nunca \`@main\` sin control (nivel 10 y 19).
* Diseño: el workflow reutilizable define el QUÉ (CI estándar); el llamador define el CÓMO (inputs). Cuantos más inputs, más flexible pero más complejo (nivel 20 de este nivel).
* Buenas prácticas: pocos inputs con defaults sensatos, secrets mínimos, versionado semántico de los workflows, tests del workflow reutilizable (nivel 20), y documentación de inputs y outputs (nivel 19 de este nivel).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Repo A define workflow reutilizable (workflow_call)
   ↓
Repo B lo consume con @v1
   ↓
Inputs + secrets pasados al workflow
   ↓
Jobs del workflow reutilizable se ejecutan
   ↓
Outputs vuelven al llamador
   ↓
Casa matriz actualiza @v2 → repos migran con control
\`\`\`

### 🧪 Ejercicios

1. Extrae tu CI común a un workflow reutilizable con 2-3 inputs.
2. Consúmelo desde otro repo con un tag versionado.
3. Añade un output y úsalo en el workflow llamador.

### ⚠️ Errores comunes

* Workflows reutilizables con cientos de inputs (ilegibles — nivel 20).
* \`@main\` sin versionar (el CI cambia sin tu control — nivel 19).
* Secrets por \`with\` (expuestos — nivel 11).
* Reutilización sin tests ni documentación (nadie sabe qué hace — nivel 19).

### 🔗 Conexión DevOps

Los reusable workflows conectan con DRY (módulo 2), workflows de nivel 19, seguridad (nivel 10), secrets (nivel 11) y la consistencia del CI/CD entre repos. Son la forma concreta de escalar buenas prácticas a una organización.
`
export default content
