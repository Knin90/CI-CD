const content = `
## Módulo 1 — Pipeline reuse

### 🎯 Objetivos de aprendizaje

* Definir reutilización de pipelines y por qué importa.
* Identificar patrones repetidos en los pipelines.
* Aplicar DRY al CI/CD (nivel 23).

### ❓ Problema real que resuelve

Cada proyecto copia el mismo pipeline: lint, tests, build, scan. Cuando el pipeline vive copiado en 20 repos, una mejora (un nuevo scanner, un flag de seguridad) hay que aplicarla 20 veces — y cada repo se queda atrás. La reutilización centraliza la lógica común: un cambio en el template actualiza todos los proyectos que lo usan.

### 💡 Analogía

La reutilización de pipelines es la plantilla de documentos de la empresa: en vez de que cada departamento reescriba su contrato desde cero (y cada uno a su manera), hay una plantilla oficial con las cláusulas estándar. Los cambios legales (mejoras de seguridad) se hacen una vez en la plantilla y todos los contratos se actualizan.

### 📖 Explicación técnica

* **Reutilización**: extraer lógica común del pipeline a componentes compartidos y reutilizarlos en múltiples proyectos.
* Qué reutilizar: linting, unit tests, build estándar, scanning de seguridad, publicación de artifacts — las etapas "iguales para todos".
* Mecanismos (según plataforma): reusable workflows (GitHub — módulo 2), includes/templates (GitLab), shared libraries (Jenkins — módulo 4), templates (Azure).
* Beneficios: consistencia (todos usan la misma lógica), mantenimiento centralizado (un cambio, N proyectos), onboarding rápido (los proyectos nuevos heredan el pipeline estándar).
* Riesgos: sobre-abstracción (templates demasiado genéricos que nadie entiende), acoplamiento (un cambio rompe muchos repos a la vez — versionar los templates), rigidez (proyectos que necesitan algo distinto y pelean con el template).
* Buenas prácticas: versionar los templates/reusable workflows, testing de los propios templates (nivel 20), empezar por lo que es verdaderamente común.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Template/workflow compartido (v1.2)
   ├── lint + tests + build + scan
   ↓
Proyecto A lo usa  ──┐
Proyecto B lo usa  ──┼─ un solo lugar, N proyectos
Proyecto C lo usa  ──┘
   ↓
Mejora en el template (v1.3) → todos heredan
\`\`\`

### 🧪 Ejercicios

1. Compara los pipelines de 3 de tus proyectos: ¿qué se repite?
2. Extrae la lógica común a un template/reusable workflow.
3. Versiona el template y migra los proyectos a usarlo.

### ⚠️ Errores comunes

* Copiar y pegar pipelines (el drift entre copias crece).
* Templates sin versionar (un cambio rompe todos los repos a la vez).
* Sobre-abstraer: el template es tan genérico que nadie sabe cómo funciona.
* Reutilizar todo, incluso lo que debería ser específico del proyecto.

### 🔗 Conexión DevOps

La reutilización es DRY aplicado a CI/CD (nivel 23): conecta reusable workflows (módulo 2), pipeline libraries (módulo 4) y la mantenibilidad (nivel 23). Es la base para escalar CI/CD a muchos proyectos.
`
export default content
