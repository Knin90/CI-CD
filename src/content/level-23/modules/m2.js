const content = `
## Módulo 2 — DRY

### 🎯 Objetivos de aprendizaje

* Aplicar DRY (Don't Repeat Yourself) al pipeline.
* Identificar duplicación en jobs, steps y config.
* Centralizar sin sobre-abstractar.

### ❓ Problema real que resuelve

El mismo paso de build, el mismo deploy, la misma configuración de tests repetidos en 20 pipelines: cuando algo cambia (una versión, un flag, un path), hay que tocarlo en 20 sitios — y casi siempre se olvida alguno, produciendo pipelines inconsistentes. DRY centraliza lo repetido para que el cambio ocurra una sola vez y todos los pipelines sigan la misma verdad.

### 💡 Analogía

DRY es el diccionario común de la redacción del restaurante: en vez de escribir "salsa de tomate, albahaca, aceite" en cada plato de la carta, se define una vez en la receta base y cada plato la referencia. Si mañana se cambia la salsa, se cambia en un sitio y toda la carta se actualiza — sin platos olvidados.

### 📖 Explicación técnica

* **DRY** (Don't Repeat Yourself): cada conocimiento vive en un único lugar; lo demás lo referencia.
* En el pipeline se aplica con:
  * **Reusable workflows** (nivel 19 y módulo 3): workflows llamables con inputs/secrets.
  * **Templates/includes**: GitLab \`include\`, Azure \`extends\`, Jenkins shared libraries (nivel 19).
  * **Funciones/steps compartidos**: Jenkins \`vars/\`, GitHub composite actions, scripts comunes en un repo.
  * **Anchors de YAML** (GitLab/GitHub): bloques reutilizables dentro del archivo.
  * **Config centralizada**: versiones de toolchains, paths y settings en un único lugar (nivel 19).
* Criterio: si algo se repite 2+ veces y puede cambiar, centralízalo. Pero DRY mal aplicado produce sobre-abstracción: pipelines que nadie entiende porque "el deploy real está escondido en tres capas de templates".
* Buenas prácticas: centralizar lo que CAMBIA (versiones, config), no lo que es puramente mecánico; documentar los templates (nivel 19 de este nivel); y revisar que la abstracción siga siendo legible (nivel 20 de este nivel).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Paso repetido (build/test/deploy) en N pipelines
   ↓
Se extrae a un template/workflow compartido
   ↓
Los pipelines referencian el template
   ↓
Un cambio → se edita UNA vez
   ↓
Todos los pipelines siguen la misma verdad
   ↓
Menos drift, menos olvidos
\`\`\`

### 🧪 Ejercicios

1. Encuentra 3 bloques duplicados en tus pipelines y extráelos a un template.
2. Centraliza una versión de toolchain usada en varios jobs.
3. Revisa si alguna abstracción tuya esconde lógica (sobre-DRY).

### ⚠️ Errores comunes

* Sobre-abstraer (el pipeline se vuelve ilegible — nivel 20 de este nivel).
* Duplicar "solo un poco" (el drift empieza y nadie lo nota).
* Templates sin versión ni documentación (¿qué hace este template?).
* Copiar-pegar entre pipelines (el DRY es lo contrario).

### 🔗 Conexión DevOps

DRY conecta con reusable workflows (nivel 19 y módulo 3), Pipeline as Code (módulo 1), mantenibilidad (módulo 20) y la consistencia del CI/CD. Es la disciplina que mantiene N pipelines coherentes con un solo cambio.
`
export default content
