const content = `
## Módulo 6 — Matrix builds

### 🎯 Objetivos de aprendizaje

* Definir matrix builds y su utilidad.
* Ejecutar el mismo job con múltiples combinaciones.
* Gestionar matrices de versiones, SOs y configuraciones.

### ❓ Problema real que resuelve

¿La app funciona en Node 18, 20 y 22? ¿En Linux, Windows y macOS? Probar cada combinación a mano es inviable; probarlas en un solo job secuencialmente tarda muchísimo. Los matrix builds ejecutan el mismo job con cada combinación de parámetros en paralelo — cobertura amplia en el menor tiempo.

### 💡 Analogía

El matrix build es la degustación del menú: en vez de probar cada plato con cada vino en una sola comida larguísima, la bodega prepara N mesas en paralelo, cada una con su combinación (plato × vino). Al final se sabe qué combinaciones funcionan — sin haber pasado un mes degustando.

### 📖 Explicación técnica

* **Matrix build**: un job que se ejecuta N veces, una por cada combinación de la matriz de parámetros.
* Definición (GitHub): \`strategy.matrix\` con \`node: [18, 20, 22]\`, \`os: [ubuntu, windows]\` → 6 combinaciones en paralelo.
* Otros: GitLab parallel matrix, Azure strategy matrix, Jenkins axis.
* Uso típico: múltiples versiones de runtime/lenguaje, SOs distintos, configuraciones (prod/dev), arquitecturas.
* El resultado: cada celda de la matriz es un job independiente con su propio reporte — falla solo la celda rota.
* Consideraciones: coste (cada celda consume runner tiempo), flakiness (tests que pasan en un SO y fallan en otro — son bugs reales a investigar), reducción inteligente (no probar todas las combinaciones si no aportan).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
matrix: {node: [18,20,22], os: [ubuntu,windows]}
   ↓
Job A: node18/ubuntu    Job D: node18/windows
Job B: node20/ubuntu    Job E: node20/windows
Job C: node22/ubuntu    Job F: node22/windows
   ↓
6 ejecuciones en paralelo
   ↓
¿Falla una celda? → solo esa falla (con su reporte)
\`\`\`

### 🧪 Ejercicios

1. Configura un matrix de versiones de Node (o tu runtime) para tus tests.
2. Añade una dimensión de SO y observa el paralelismo.
3. Analiza: ¿qué celdas aportan cobertura real y cuáles son coste puro?

### ⚠️ Errores comunes

* Matrices enormes que multiplican el coste sin aportar (10 SO × 10 versiones).
* Tests flaky que fallan solo en una celda (se ignoran en vez de investigarse).
* Ignorar los resultados por celda (el reporte agregado esconde cuál falló).
* Matriz para "quedar bien" sin necesidad real de compatibilidad.

### 🔗 Conexión DevOps

Los matrix builds conectan testing (nivel 7), parallel execution (módulo 7) y la cobertura de compatibilidad. Son la herramienta para validar "funciona en todas partes" sin sacrificar velocidad.
`
export default content
