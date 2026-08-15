const content = `
## Módulo 11 — Matrix jobs

### 🎯 Objetivos de aprendizaje

* Explicar qué es una matrix de jobs y cuándo usarla.
* Configurar matrices por versión, SO y combinaciones.
* Gestionar el volumen de jobs generados.

### ❓ Problema real que resuelve

Validar el código en una sola combinación (un SO, una versión de runtime) deja huecos: funciona en Node 18 pero no en 20, en Linux pero no en Windows. La matrix genera **variaciones del mismo job** para cada combinación de parámetros: una definición, muchas ejecuciones.

### 💡 Analogía

Una fábrica de camisetas que prueba sus tintes en varios tejidos: en vez de escribir un procedimiento por tejido, define "para cada tejido, prueba el tinte" (matrix). Si un tejido falla, lo sabes sin reescribir nada. La matrix es el "para cada" de los jobs.

### 📖 Explicación técnica

* **Matrix**: estrategia que combina valores de parámetros para generar variaciones de un job.
* GitHub Actions: \`strategy.matrix\` con \`os\`, \`node\`, etc.; cada combinación es un job con \`matrix.<key>\` disponible en el contexto.
* GitLab: \`parallel: matrix\` con listas de variables.
* Azure: \`strategy.matrix\` similar.
* Combinaciones: el producto cartesiano de los parámetros (\`os × node\`); se puede excluir con \`exclude\` o incluir extras con \`include\`.
* Casos de uso: tests multi-versión (Node 18/20/22), multi-SO, builds de arquitectura (amd64/arm64), tests de compatibilidad de DBs.
* Costo: cada combinación es un job: 3 SO × 3 versiones = 9 jobs. Hay que balancear cobertura vs recursos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
strategy:
  matrix:
    os: [ubuntu, windows, macos]
    node: [18, 20]

Genera 3 × 2 = 6 jobs:
  (ubuntu,18) (ubuntu,20)
  (windows,18) (windows,20)
  (macos,18) (macos,20)

Cada job usa \${{ matrix.os }} y \${{ matrix.node }}
\`\`\`

### 💻 Ejemplo básico

Matrix multi-versión (GitHub Actions):

\`\`\`yaml
strategy:
  matrix:
    node: [18, 20, 22]
    os: [ubuntu-latest, windows-latest]
    exclude:
      - os: windows-latest
        node: 22          # excluir una combinación

steps:
  - uses: actions/setup-node@v4
    with:
      node-version: \${{ matrix.node }}
  - run: npm test
\`\`\`

### 🏢 Caso de uso profesional

Una librería open source publicada en npm usa matrix para garantizar compatibilidad: tests en Node 18/20/22 y en los tres SO. El CI genera 9 jobs; si una versión rompe, el job de esa versión se pone rojo y el autor lo sabe antes de publicar. La matrix es su declaración pública de soporte, verificada en cada PR.

### ⚠️ Errores comunes

* Matrices gigantes (producto cartesiano sin límites) que saturan la facturación.
* Combinaciones sin excluir (include/exclude olvidados).
* Jobs de matrix que compiten por recursos compartidos.
* Ignorar la combinación rota: "falla solo en windows, no importa".
* Confundir matrix con paralelismo manual (matrix ES paralelismo).

### 📋 Lo que debes recordar

* Matrix = variaciones del mismo job (parámetros × valores).
* Producto cartesiano: controla el volumen con exclude/include.
* Úsala para cobertura multi-versión, multi-SO, multi-arquitectura.
* Cada combinación fallida es información: no la ignores.

### 🧪 Autoevaluación rápida

1. ¿Qué genera una matrix de jobs?
2. ¿Cómo se limita el número de combinaciones?
3. ¿Qué casos de uso típicos tiene la matrix?

---

1. Variaciones del mismo job para cada combinación de parámetros (ej: 2 OS × 3 versiones = 6 jobs).
2. Con \`exclude\` (quitar combinaciones) e \`include\` (agregar combinaciones específicas), controlando el producto cartesiano.
3. Tests multi-versión de runtime, multi-SO, builds de múltiples arquitecturas y compatibilidad de bases de datos.
`
export default content
