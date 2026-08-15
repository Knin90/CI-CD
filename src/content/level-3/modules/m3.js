const content = `
## Módulo 3 — Lists

### 🎯 Objetivos de aprendizaje

* Escribir listas en YAML en sus dos formas (bloque e inline).
* Usar listas en configuraciones de pipelines (steps, jobs, secrets, etc.).
* Entender listas de mapas, la estructura típica de los steps.

### ❓ Problema real que resuelve

Los pipelines están llenos de listas: pasos de un job, jobs de una stage, variables, patrones de rama, argumentos de comandos. Saber escribirlas y leerlas correctamente es la base para cualquier configuración, porque la mayoría de los errores de estructura de un pipeline vienen de listas mal formadas.

### 💡 Analogía

Una lista es como la lista de compras del supermercado: una secuencia ordenada de elementos. En YAML puedes escribirla en una columna (cada item en su línea con guión) o en una sola línea separada por comas. El supermercado (parser) la lee igual, pero la columna es más fácil de revisar.

### 📖 Explicación técnica

Dos formas de listas:

* **Bloque** (recomendada para legibilidad):

\`\`\`yaml
steps:
  - run: npm ci
  - run: npm test
  - run: npm run build
\`\`\`

* **Inline** (para listas cortas):

\`\`\`yaml
branches: [main, develop]
runs-on: [self-hosted, linux]
\`\`\`

* **Lista de mapas** (la más común en pipelines): cada item es un mapa con sus claves:

\`\`\`yaml
steps:
  - name: Instalar dependencias
    run: npm ci
  - name: Tests
    run: npm test
\`\`\`

* Reglas: los items de una lista al mismo nivel deben tener la misma indentación; el guión va seguido de espacio.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
steps:
  - run: npm ci
  - run: npm test

Parser:
  steps: [
    { "run": "npm ci" },
    { "run": "npm test" }
  ]

→ El runner ejecuta: npm ci → npm test (en orden)
\`\`\`

### 💻 Ejemplo básico

Listas en un pipeline real:

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:            # lista de combinaciones
        node: [18, 20]
        os: [ubuntu-latest, windows-latest]
    steps:
      - uses: actions/checkout@v4
      - run: |
          npm ci
          npm test
    # lista de nombres de artefactos
    needs: [lint, build]
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de despliegue define la lista de entornos en una variable reutilizable:

\`\`\`yaml
variables:
  ENVIRONMENTS:
    - staging
    - production
\`\`\`

El job de deploy itera la lista; agregar un entorno nuevo es modificar un item de la lista, sin tocar la lógica del pipeline.

### ⚠️ Errores comunes

* Guiones sin espacio después (\`-item\` en vez de \`- item\`).
* Items con indentación distinta dentro de la misma lista.
* Mezclar listas y mapas sin estructura clara.
* Comas sobrantes o faltantes en listas inline.
* Listas de una sola clave escritas como mapas (o al revés).

### 📋 Lo que debes recordar

* Listas en bloque (\`- item\`) o inline (\`[a, b]\`).
* La estructura más común del pipeline: lista de mapas (steps).
* Consistencia de indentación en los items.
* Usa bloque para legibilidad, inline para listas cortas.

### 🧪 Autoevaluación rápida

1. ¿Cómo se escribe una lista de un solo item en YAML?
2. ¿Qué estructura es la más común para los steps de un job?
3. ¿Qué diferencia hay entre bloque e inline?

---

1. Con un guión y espacio: \`- item\`.
2. Una lista de mapas: cada step es un mapa con claves como \`name\` y \`run\`.
3. El bloque usa un item por línea con guión; inline usa corchetes y comas en una sola línea. Ambas producen la misma estructura.
`
export default content
