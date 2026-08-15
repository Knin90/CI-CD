const content = `
## Módulo 2 — YAML validation

### 🎯 Objetivos de aprendizaje

* Validar la sintaxis YAML de los pipelines.
* Detectar errores de indentación y estructura.
* Usar validadores YAML específicos de cada plataforma.

### ❓ Problema real que resuelve

El YAML es sensible a la indentación: un espacio mal puesto rompe el pipeline con errores crípticos ("mapping values are not allowed here"). La validación YAML detecta los errores de sintaxis antes de que la plataforma los rechace — convirtiendo un error confuso en un mensaje claro en el PR.

### 💡 Analogía

La validación YAML es la revisión del guion con lupa: cada coma, espacio y sangría (la "gramática" del YAML) debe estar perfecta para que el guion se pueda leer (parsear). Un solo error de puntuación — como un espacio de más en la sangría — hace que el guion no se entienda (no se ejecute).

### 📖 Explicación técnica

* **YAML**: formato de datos por indentación — los errores de estructura rompen el parseo.
* Errores típicos: indentación inconsistente (tabs vs espacios), duplicados de claves, valores mal tipados (\`on:\` booleano en YAML 1.1 — el clásico problema de "on"/"off"/"yes"/"no"), comillas mal puestas, anclas/alias rotas (nivel 3).
* Herramientas de validación:
  * **Genéricas**: parsers YAML (\`python -c "import yaml; yaml.safe_load(...)"\`, yamllint).
  * **Específicas de plataforma**: actionlint (GitHub), gitlab-ci-lint (GitLab), azure-pipelines-lint, kubeconform (manifests K8s — nivel 14).
* La validación específica va más allá de la sintaxis: valida el **esquema** de la plataforma (claves válidas, tipos correctos, jobs bien formados).
* En CI: validar el propio pipeline con un job de validación (o pre-commit hook — nivel 1) antes de mergear.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
YAML del pipeline
   ↓
Parser YAML (sintaxis)
   ↓
¿Indentación/estructura mal? → error claro en el PR
   ↓
Validador de la plataforma (esquema)
   ↓
¿OK? → pipeline listo para ejecutarse
\`\`\`

### 🧪 Ejercicios

1. Configura yamllint o actionlint en tu repositorio.
2. Introduce 3 errores típicos (tab, duplicado, "on") y observa los mensajes.
3. Valida el YAML con el esquema de tu plataforma (lint API).

### ⚠️ Errores comunes

* Tabs en lugar de espacios (el error clásico de YAML).
* Valores booleanos \`on\`/\`yes\` que se interpretan mal (YAML 1.1).
* Confiar en el editor (los errores aparecen al ejecutar).
* Validar solo sintaxis, no el esquema de la plataforma.

### 🔗 Conexión DevOps

La validación YAML es la base del testing de pipelines: conecta YAML (nivel 3), pipeline validation (módulo 1) y linting (módulo 4). Un YAML válido es el mínimo para que el resto del testing tenga sentido.
`
export default content
