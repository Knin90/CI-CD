const content = `
## Módulo 13 — Branch protection

### 🎯 Objetivos de aprendizaje

* Proteger ramas principales con reglas.
* Exigir checks y revisión antes del merge.
* Combinar protección de ramas con el CI.

### ❓ Problema real que resuelve

Cualquiera puede hacer push directo a main y el pipeline no es un gate: el código roto llega a producción sin revisión ni tests. La protección de ramas (nivel 1) convierte el CI en un requisito: los checks deben pasar, las revisiones son obligatorias y el push directo está bloqueado. Resuelve el "main roto" y el código sin control de calidad.

### 💡 Analogía

La protección de ramas es el control de acceso a la sala de máquinas (main): no entra cualquiera — hace falta pasar los controles (checks verdes), la firma del supervisor (approval) y nadie entra sin permiso directo (push bloqueado). La puerta (merge) solo se abre cuando el proceso completo lo permite, no cuando alguien tiene prisa.

### 📖 Explicación técnica

* **Protección de ramas** (GitHub/GitLab/Azure): reglas sobre la rama principal:
  * **Require checks**: los pipelines (CI) deben pasar antes del merge (nivel 7 y 20).
  * **Require pull request reviews**: al menos N aprobaciones (nivel 14 de este nivel).
  * **Block direct pushes**: nadie hace push a main; todo entra por PR.
  * **Require up-to-date**: la rama debe estar actualizada con main antes de mergear (evita merges de código viejo).
  * **Signed commits / linear history**: opciones avanzadas para integridad (nivel 1).
* El CI como gate: los checks requeridos son los pipelines del repo (lint, tests, build, security — niveles 7, 10, 20) — si fallan, el merge se bloquea (módulo 15).
* Protección ≠ lentitud: PRs pequeños, revisión rápida y pipelines rápidos (módulo 5) mantienen el flujo sin sacrificar el gate.
* Buenas prácticas: checks mínimos pero reales (no checks "que siempre pasan" — módulo 15), revisión obligatoria para prod, y excepciones documentadas (hotfixes con proceso, no sin él).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Push a main → BLOQUEADO (regla de rama)
   ↓
Cambio → PR con rama
   ↓
CI corre los checks (lint, tests, build, security)
   ↓
Checks verdes + revisión aprobada
   ↓
Rama actualizada con main
   ↓
Merge permitido → main protegido
\`\`\`

### 🧪 Ejercicios

1. Activa "require checks" en tu rama principal con tus pipelines como checks.
2. Activa "block direct pushes" y practica el flujo por PR.
3. Define los checks mínimos que deben pasar antes de mergear.

### ⚠️ Errores comunes

* Protección sin checks (la puerta está cerrada pero no hay control — módulo 15).
* Checks que siempre pasan (el gate no significa nada — módulo 15).
* Excepciones "solo esta vez" sin proceso (el hotfix sin revisión se vuelve la norma).
* Ramas que se desactualizan (merges de código viejo que rompen main).

### 🔗 Conexión DevOps

La protección de ramas conecta con Git (nivel 1), code review (módulo 14), quality gates (módulo 15), testing (nivel 7) y Pipeline as Code (módulo 1). Es la frontera entre "código" y "código verificado": el pipeline como requisito, no como sugerencia.
`
export default content
