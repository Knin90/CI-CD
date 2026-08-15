const content = `
## Módulo 4 — Pipeline libraries

### 🎯 Objetivos de aprendizaje

* Definir pipeline libraries (Jenkins shared libraries).
* Escribir y versionar librerías compartidas.
* Usar steps y funciones globales desde los pipelines.

### ❓ Problema real que resuelve

En Jenkins, cada Jenkinsfile duplicaba la lógica (build, tests, deploy). Las shared libraries centralizan esa lógica en un repo de librería: funciones y steps globales (\`buildApp()\`, \`deployTo('prod')\`) que cualquier pipeline invoca — con versionado, testing y revisión de la librería misma.

### 💡 Analogía

La pipeline library es la biblioteca de recetas de la cadena de restaurantes: cada sucursal (pipeline) usa las mismas recetas estándar (funciones) en lugar de improvisar. La receta del pan (build) se mejora una vez en la biblioteca y todas las sucursales la heredan — sin que cada cocinero tenga su propia versión.

### 📖 Explicación técnica

* **Shared library** (Jenkins): repo Git con código Groovy reutilizable por los pipelines.
* Estructura: \`vars/\` (steps globales: \`buildApp.groovy\` → \`buildApp()\`), \`src/\` (clases), \`resources/\` (archivos).
* Configuración: la librería se registra en Jenkins (global o por carpeta) con una versión (branch/tag).
* Uso en el Jenkinsfile: \`@Library('my-lib@v1')_\` y luego \`buildApp(env: 'staging')\`.
* Beneficios: DRY (nivel 23), consistencia, mantenimiento centralizado, on-boarding (los pipelines nuevos usan los steps estándar).
* Buenas prácticas: versionar por tag (no branch en producción), testear la librería (unit tests de Groovy + integration con Jenkins test harness — nivel 20), documentar los steps, mantener la librería con el mismo rigor que el código de la app.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Repo shared-lib (vars/, src/, tags v1, v2...)
   ↓
Jenkins carga la librería (versión)
   ↓
Jenkinsfile: @Library('shared@v1')_ + buildApp()
   ↓
buildApp() ejecuta los steps definidos
   ↓
Mejora en v2 → los pipelines que usan v2 la heredan
\`\`\`

### 🧪 Ejercicios

1. Crea una shared library con un step \`buildApp\` y úsalo en un Jenkinsfile.
2. Versiona la librería (tag) y referencia la versión.
3. Escribe un test para un step de tu librería.

### ⚠️ Errores comunes

* Librería sin versionar (branch en producción: cambios rompen pipelines).
* Steps gigantes que hacen "de todo" (difíciles de testear y mantener).
* Librería sin tests: el step funciona... hasta que no.
* Cada equipo crea su propia librería (el drift de las copias vuelve).

### 🔗 Conexión DevOps

Las pipeline libraries son la reutilización en Jenkins: conectan pipeline reuse (módulo 1), templates (módulo 3), el testing de pipelines (nivel 20) y la mantenibilidad (nivel 23).
`
export default content
