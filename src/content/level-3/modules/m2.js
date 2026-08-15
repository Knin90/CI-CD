const content = `
## Módulo 2 — YAML syntax

### 🎯 Objetivos de aprendizaje

* Escribir YAML válido: indentación, pares clave-valor, comentarios.
* Conocer los tipos de datos básicos: escalares, listas, mapas.
* Validar sintaxis YAML con herramientas.

### ❓ Problema real que resuelve

La sintaxis de YAML parece simple, pero los errores sutiles (indentación, comillas, tipos) rompen pipelines enteros con mensajes crípticos. Dominar la sintaxis — qué es válido y qué no — permite escribir configuraciones correctas a la primera y diagnosticar errores de parseo con rapidez.

### 💡 Analogía

La sintaxis YAML es como la gramática de un idioma: puedes hablar con palabras sueltas (clave: valor) y oraciones simples, pero si la puntuación está mal (comas, puntos, orden), el mensaje cambia o se rompe. Un archivo YAML mal indentado es una oración sin puntuación: imposible de leer para la máquina.

### 📖 Explicación técnica

Reglas de sintaxis:

* **Indentación**: 2 espacios por nivel (convención); nunca tabs; la indentación define la estructura (como Python).
* **Clave: valor**: \`clave: valor\` con espacio después de los dos puntos. \`clave:valor\` es inválido.
* **Comentarios**: \`#\` al inicio de línea o tras un valor.
* **Escalares**: strings (con o sin comillas), números (\`42\`, \`3.14\`), booleanos (\`true\`/\`false\`), null (\`null\`, \`~\`).
* **Strings**: sin comillas para simples; comillas simples (\`'...'\`) para literales; dobles (\`"...\") para escapes (\`\\n\`, \`\${var}\`).
* **Multi-línea**: \`|\` (bloque literal, conserva saltos) y \`>\` (bloque plegado, une líneas).
* **Documentos**: \`---\` separa documentos; \`...\` los cierra.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
YAML:
  name: CI          # clave: valor con espacio tras ':'
  on: [push]        # lista inline con corchetes
  jobs:
    test:           # mapa anidado (2 espacios)
      runs-on: ubuntu-latest
      steps:
        - run: npm test   # lista de mapas ('-' + espacio)

Parser:
  → dict { name: CI, on: [push], jobs: { test: { ... } } }
\`\`\`

### 💻 Ejemplo básico

Tipos de datos en YAML:

\`\`\`yaml
# Escalares
nombre: app-web
puerto: 8080
habilitado: true
descripcion: "texto con \\n salto de línea"

# Listas (dos formas)
lenguajes:
  - javascript
  - go
  - python
tags: [ci, cd, devops]

# Multi-línea
script: |
  npm ci
  npm test
\`\`\`

Validación local:

\`\`\`bash
# Ruby (incluido en la mayoría de sistemas) o python
ruby -e "require 'yaml'; YAML.load_file('ci.yml')"
python3 -c "import yaml,sys; yaml.safe_load(open('ci.yml'))"
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con 30 workflows de GitHub Actions sufre errores de sintaxis repetidos. Agregan un job de CI que valida todos los YAML del repo (\`actionlint\` + parser), y un hook pre-commit que valida localmente. Los errores de parseo pasan de semanales a inexistentes: el error se detecta antes del push o en segundos.

### ⚠️ Errores comunes

* Tabs en la indentación.
* Falta el espacio tras los dos puntos.
* Confundir tipos (número vs string, \`yes\` como booleano).
* Comillas olvidadas en strings con caracteres especiales (\`:\`, \`#\`, \`*\`).
* Indentación inconsistente (2 y 4 espacios mezclados).

### 📋 Lo que debes recordar

* Indentación con espacios (2 por nivel), nunca tabs.
* \`clave: valor\` con espacio tras los dos puntos.
* Escalares, listas y mapas son los tres bloques básicos.
* Valida con un parser/linter antes de pushear.

### 🧪 Autoevaluación rápida

1. ¿Por qué la indentación es crítica en YAML?
2. ¿Cómo se escriben listas en YAML?
3. ¿Qué diferencia hay entre \`|\` y \`>\` para strings multilínea?

---

1. Porque define la estructura jerárquica de los datos: un nivel mal indentado cambia la interpretación o rompe el parseo.
2. Con guiones y espacio bajo una clave (\`- item\`) o inline con corchetes (\`[a, b, c]\`).
3. \`|\` conserva los saltos de línea tal cual; \`>\` pliega las líneas en una sola (los saltos se convierten en espacios).
`
export default content
