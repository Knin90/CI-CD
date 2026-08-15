const content = `
## Módulo 11 — Configuration errors

### 🎯 Objetivos de aprendizaje

* Identificar las categorías de errores de configuración de pipelines.
* Diagnosticar errores de parseo, schema, referencia y lógica.
* Aplicar un método de corrección paso a paso.

### ❓ Problema real que resuelve

Los errores de configuración tienen firmas distintas: un YAML que no parsea, una clave que la plataforma no reconoce, una variable que no existe, un job que se salta por una condición mal escrita. Confundir las categorías lleva a buscar en el lugar equivocado. Reconocer el tipo de error por su mensaje permite corregirlo a la primera.

### 💡 Analogía

Los errores de configuración son como las luces de advertencia del auto: cada luz (aceite, freno, motor) indica un sistema distinto. Revisar el motor cuando la luz es de aceite pierde tiempo. Los mensajes de error del pipeline son esas luces: aprender a leerlos es aprender a diagnosticar.

### 📖 Explicación técnica

Categorías de errores:

1. **Parseo YAML**: indentación, tabs, caracteres especiales. Mensaje típico: \`Error: parse error in ...\` con línea.
2. **Schema**: clave desconocida, valor inválido (\`runs-on: ubuntu-latest\` mal escrito, \`on\` como booleano). Mensaje: \`Invalid workflow file\` / \`Unknown key\`.
3. **Referencia**: variables o expresiones inexistentes, artefactos de jobs no declarados, \`needs\` con nombre equivocado.
4. **Lógica**: condiciones mal escritas (rules/if), triggers que no disparan, precedencia de variables inesperada.
5. **Entorno**: imágenes/tags inexistentes, credenciales ausentes (aunque a veces es un error de runtime, no de configuración).

Método de diagnóstico:

\`\`\`text
1. Leer el mensaje completo (plataforma + línea)
2. ¿Es parseo? → validar el YAML localmente
3. ¿Es schema? → consultar la documentación de claves
4. ¿Es referencia? → verificar nombres y rutas
5. ¿Es lógica? → simular la condición con los datos reales
6. Corregir, validar, ejecutar de nuevo
\`\`\`

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Error en línea 12: "jobs.test.runs-on: unknown value"
  │
  ▼
Categoría: schema (clave válida, valor inválido)
  │
  ▼
Verificar valores válidos de runs-on
  │
  ▼
Corregir: "ubuntu-latest" → "ubuntu-22.04" (o el correcto)
  │
  ▼
Validar con actionlint → ejecutar
\`\`\`

### 💻 Ejemplo básico

Errores comunes y su causa:

\`\`\`yaml
# Error 1 — parseo: 'on' interpretado como booleano
on: [push]          # en algunos contextos "on" es truthy
                    # solución: "on:" con dos puntos y valor

# Error 2 — schema: clave mal escrita
jobs: test:        # 'jobs:' debe contener un mapa
  runs-on: ubuntu-latest

# Error 3 — referencia: needs con nombre distinto
jobs:
  build:
    ...
  deploy:
    needs: [buidl]    # typo → job inexistente
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline deja de dispararse. El mensaje no aparece en los logs (no hay ejecución): es un error de configuración silencioso. El equipo revisa el trigger: \`on:\` estaba escrito como \`on: [push]\` pero un merge anterior lo dejó como \`on:\` seguido de un booleano. La validación con actionlint en CI (que ahora bloquea el merge) habría detectado el problema antes.

### ⚠️ Errores comunes

* Buscar en los logs de ejecución cuando no hubo ejecución (error de trigger).
* Corregir "a ojo" sin leer el mensaje completo.
* Ignorar la validación de schema por "ya validé el YAML".
* Errores de referencia (typos en needs/variables) que solo aparecen en runtime.
* Cambiar la configuración sin validar localmente y "probar con el push".

### 📋 Lo que debes recordar

* Categorías: parseo, schema, referencia, lógica, entorno.
* Lee el mensaje completo: línea y contexto.
* Método: identificar categoría → verificar → corregir → validar → ejecutar.
* Los errores de trigger son silenciosos: sin ejecución, no hay logs.

### 🧪 Autoevaluación rápida

1. Nombra las categorías de errores de configuración.
2. ¿Qué mensaje te da un error de schema?
3. ¿Cómo se diagnostica un pipeline que no se dispara?

---

1. Parseo YAML, schema (claves/valores inválidos), referencia (nombres inexistentes), lógica (condiciones) y entorno.
2. "Invalid workflow file", "Unknown key" o "Invalid value": el YAML parsea pero la clave o el valor no son válidos para la plataforma.
3. No hay ejecución ni logs: el problema está en el trigger o en la validación de la plataforma; revisar el \`on\`/trigger y validar el YAML contra el schema.
`
export default content
