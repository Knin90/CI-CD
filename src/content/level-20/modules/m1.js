const content = `
## Módulo 1 — Pipeline validation

### 🎯 Objetivos de aprendizaje

* Validar los pipelines antes de ejecutarlos.
* Detectar errores de configuración temprano.
* Establecer la validación como práctica estándar.

### ❓ Problema real que resuelve

Un pipeline con un error de configuración (YAML roto, job mal definido, referencia inválida) falla en el primer commit — o peor, se rompe a mitad de una ejecución importante. La validación del pipeline detecta los errores de definición ANTES de ejecutarlo: en el PR, no en producción.

### 💡 Analogía

La validación del pipeline es la revisión mecánica del avión antes del vuelo: el piloto no descubre a mitad del trayecto que el alerón no responde (error de configuración); la revisión previa lo detecta en tierra. El vuelo (pipeline) solo despega si la máquina pasó la inspección.

### 📖 Explicación técnica

* **Validación de pipeline**: chequeo de la definición (YAML/Jenkinsfile) sin ejecutar los jobs.
* Qué valida: sintaxis (módulo 2), referencias a jobs/artifacts/variables existentes, estructura de stages/jobs, permisos, condiciones.
* Herramientas por plataforma: GitHub (\`actionlint\` para actions, validación nativa al crear el PR), GitLab (\`gitlab-ci-lint\` — API de validación), Azure (compilar el pipeline en el editor/CLI), Jenkins (\`jenkins-lint\` / declarative pipeline validator).
* En el flujo: la validación corre en el PR de cambios al pipeline (como cualquier test) — un PR que rompe el pipeline se rechaza.
* Beneficios: feedback inmediato (nivel 18), menos ejecuciones fallidas, pipelines más confiables (módulo 12).
* Buenas prácticas: validar en cada PR de configuración, automatizar la validación (no "mirar el YAML"), tratar la configuración del pipeline como código (revisión, tests — todo el nivel 20).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
PR cambia .github/workflows / .gitlab-ci.yml
   ↓
Validación automática (lint / API de la plataforma)
   ↓
¿Error? → PR falla con el detalle del error
   ↓
¿OK? → se puede mergear y ejecutar con confianza
\`\`\`

### 🧪 Ejercicios

1. Configura validación automática de tu pipeline en el PR (actionlint, gitlab-ci-lint...).
2. Introduce un error de configuración a propósito y observa la validación fallar.
3. Documenta qué valida la plataforma y qué necesitas validar tú (módulos 2-4).

### ⚠️ Errores comunes

* Validar "a ojo" (el YAML se ve bien hasta que se ejecuta).
* Validación solo en producción (los errores llegan a la ejecución real).
* Confiar en la validación de la plataforma sin cubrir lo propio (módulos 2-4).
* PRs de configuración sin revisión (un YAML "validado" pero mal diseñado).

### 🔗 Conexión DevOps

La validación es el primer nivel del testing de pipelines (nivel 20): conecta YAML (módulo 2), linting (módulo 4) y la confiabilidad del pipeline (módulo 12).
`
export default content
