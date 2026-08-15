const content = `
## Módulo 3 — Templates

### 🎯 Objetivos de aprendizaje

* Definir templates de pipelines (GitLab/Azure).
* Parametrizar stages y jobs con variables.
* Mantener templates versionados y documentados.

### ❓ Problema real que resuelve

GitLab y Azure resuelven la reutilización con templates: bloques YAML (stages, jobs) definidos en un lugar y reutilizados por inclusión o herencia. Los templates evitan que cada proyecto reescriba los jobs estándar — con parámetros para lo que varía entre proyectos y entornos.

### 💡 Analogía

El template es el formulario oficial del trámite: el documento base (stages de CI) está impreso con los campos estándar, y cada solicitante (proyecto) solo rellena los campos variables (versión, comandos, entornos). El formulario se actualiza en la oficina (central) y todos usan la versión nueva — nadie imprime su propio formulario.

### 📖 Explicación técnica

* **GitLab templates**: archivos YAML reutilizables:
  * **includes**: \`include: - local/remote/template: 'Jobs/CI.yml'\` — trae jobs definidos en otro archivo/repo.
  * **extends**: \`extends: .base-job\` — herencia de atributos entre jobs (DRY).
  * **hidden jobs**: jobs con prefijo \`.\` que no se ejecutan pero sirven como base para extends.
* **Azure templates**: \`extends:\` con \`parameters\` tipados (strings, booleans, objetos) y \`\${{ }}\` expresiones — el pipeline llamador pasa los parámetros.
* Parametrización: variables (GitLab) / parameters (Azure) para versiones, entornos, flags.
* Buenas prácticas: templates versionados (repo central de templates), documentar cada template y sus parámetros, testing de los templates (nivel 20 — lint/validate), empezar con pocos templates bien hechos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Template central (CI.yml: lint, test, build, scan)
   ↓
include / extends / parameters
   ↓
Proyecto X lo incluye (con sus variables)
   ↓
Los jobs del template corren en el pipeline del proyecto
   ↓
Mejora del template → proyectos actualizados al incluir
\`\`\`

### 🧪 Ejercicios

1. Extrae tus jobs comunes de GitLab a un template con \`include\` y \`extends\`.
2. Crea un template Azure con parameters tipados y úsalo desde 2 pipelines.
3. Documenta los parámetros y la versión de cada template.

### ⚠️ Errores comunes

* Templates sin versionar (un cambio rompe todos los que incluyen).
* Parámetros sin defaults ni documentación (nadie sabe qué pasar).
* Sobre-anidar includes/extends (el pipeline se vuelve ilegible).
* Templates gigantes que mezclan lógica de varios proyectos.

### 🔗 Conexión DevOps

Los templates son la reutilización en GitLab/Azure: conectan pipeline reuse (módulo 1), variables (nivel 11) y la mantenibilidad (nivel 23).
`
export default content
