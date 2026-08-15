const content = `
## Módulo 5 — Strings

### 🎯 Objetivos de aprendizaje

* Escribir strings en YAML: sin comillas, con comillas simples o dobles.
* Manejar caracteres especiales, escapes e interpolación.
* Evitar las trampas de strings en configuraciones de pipelines.

### ❓ Problema real que resuelve

Los strings son el tipo de dato más común en los pipelines (comandos, nombres, URLs, expresiones), y también el origen de errores sutiles: un \`:\` o un \`#\` sin comillas rompe el parseo, un \`\${var}\` que se interpola cuando no debía, un booleano que parece texto. Dominar los strings es dominar el 80% de los errores de YAML.

### 💡 Analogía

Los strings son como las citas textuales de un ensayo: sin comillas, las palabras se confunden con la estructura del texto (como un \`:\` que el parser interpreta como separador clave-valor). Las comillas son las marcas que dicen "esto es contenido, no estructura".

### 📖 Explicación técnica

* **Sin comillas**: solo para strings simples sin caracteres especiales (\`ubuntu-latest\`, \`npm test\`). Peligroso con \`:\`, \`#\`, \`*\`, \`{\`, \`[\`, \`?\`.
* **Comillas simples** (\`'...'\`): literal; todo lo que va dentro es texto. No permite escapes ni interpolación. Ideal para valores fijos.
* **Comillas dobles** (\`"...\`): permite escapes (\`\\n\`, \`\\t\`) e interpolación de la plataforma (\`\${VAR}\` en GitHub Actions dentro de \`run:\` usa el shell, no YAML; en Azure DevOps \`\$(var)\`).
* **Interpolación en pipelines**:
  * GitHub Actions: \`\$\{\{ ... \}\}\` (expresiones) — ¡ojo con \`on\`! y con \`\${{ }}\` dentro de \`run:\` (requiere escapar \`\${{ }}\` como \`\${{ }}\` en algunos contextos).
  * GitLab CI: \`\$VAR\` y \`\${VAR}\`.
  * Azure DevOps: \`\$(variable)\`.
* **Truthy**: \`yes\`, \`on\`, \`true\`, \`y\` se convierten en booleanos; si necesitas el texto, usa comillas.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Comando sin comillas:  run: npm test -- --ci
  → string simple, sin caracteres especiales → OK

URL con ':' sin comillas:  url: https://api.example.com:8443
  → el ':' tras 'https' se interpreta como separador
  → ¡error de parseo!  → hay que usar comillas:
  url: "https://api.example.com:8443"
\`\`\`

### 💻 Ejemplo básico

Strings correctos e incorrectos:

\`\`\`yaml
# Correcto
nombre: app
comando: "npm run build -- --prod"
url: "https://api.example.com:8443"
version: 'v1.2.0'
mensaje: "Línea 1\\nLínea 2"      # con escape

# Incorrecto (rompe)
url: https://api.example.com:8443
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline falla misteriosamente al parsear la URL del registry. El log de validación apunta a la línea de la URL: el \`:\` del puerto rompía el YAML. El equipo corrige con comillas dobles y agrega un job de lint de YAML; el error deja de aparecer en toda la organización.

### ⚠️ Errores comunes

* Strings con \`:\`, \`#\`, \`*\`, \`{\` sin comillas.
* Valores truthy (\`on\`, \`yes\`) interpretados como booleanos.
* Interpolación \`\${VAR}\` que se expande cuando no se quiere (o al revés).
* Escapes incorrectos en comillas simples (no funcionan).
* Strings multilínea mal formados (usar \`|\` o \`>\`).

### 📋 Lo que debes recordar

* Comillas simples = literal; dobles = escapes e interpolación.
* Caracteres especiales (\`:\`, \`#\`, \`*\`) requieren comillas.
* Cuidado con truthy y con la interpolación según la plataforma.
* Cuando dudes, usa comillas.

### 🧪 Autoevaluación rápida

1. ¿Qué diferencia hay entre comillas simples y dobles en YAML?
2. ¿Por qué \`url: https://api.example.com:8443\` rompe el parseo?
3. ¿Qué son los valores "truthy"?

---

1. Las simples tratan todo como literal (sin escapes ni interpolación); las dobles permiten escapes (\`\\n\`) y cierta interpolación.
2. Porque el \`:\` después de \`https\` se interpreta como separador clave-valor del YAML; hay que encerrar la URL en comillas.
3. Valores que YAML interpreta como booleanos aunque parezcan texto: \`yes\`, \`on\`, \`true\`, \`y\` — si necesitas el texto, usa comillas.
`
export default content
