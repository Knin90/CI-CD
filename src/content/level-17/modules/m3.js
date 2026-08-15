const content = `
## Módulo 3 — Git as source of truth

### 🎯 Objetivos de aprendizaje

* Entender Git como única fuente de verdad del sistema.
* Versionar todo el estado deseado en repos.
* Aprovechar PRs, historia y auditoría de Git.

### ❓ Problema real que resuelve

Sin una fuente única de verdad, la información está dispersa: el cluster dice una cosa, un documento otra, la memoria de alguien una tercera. Git como fuente de verdad centraliza el estado deseado: todo lo que el sistema debe ser está en repos, cada cambio es un commit auditable, y cualquier discrepancia es un bug detectable.

### 💡 Analogía

Git como source of truth es el registro notarial del sistema: cada cambio de estado (una nueva versión, una config distinta) se inscribe en el registro con fecha, autor y motivo (commit). No hay "versiones orales" ni papeles sueltos: si no está en el registro, no existe oficialmente.

### 📖 Explicación técnica

* **Source of truth**: el repositorio Git (o repos) que contiene el estado deseado completo: manifests, charts, configs, policies.
* Estructura típica: repo de aplicación (código + CI) y repo(s) de configuración/gitops (estado deseado) — separados para controlar quién cambia qué.
* Lo que Git aporta: **historia** (cada cambio, cuándo, quién), **revisión** (PRs antes de mergear), **rollback** (revertir un commit), **auditoría** (quién aprobó qué), **branching** (experimentar sin riesgo).
* El controller (módulo 5) lee de Git: si Git dice X y el cluster está en Y, el cluster está mal — nunca al revés.
* Disciplina: **nadie cambia el cluster fuera de Git** — ni a mano, ni con otros pipelines, ni con scripts sueltos. Si se necesita, primero Git.
* Buenas prácticas: repos pequeños y enfocados, protección de ramas en el repo gitops (nivel 1), signing de commits (nivel 10), documentar la estructura de repos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Repo GitOps (estado deseado)
   ├── apps/ (manifests, charts)
   ├── infra/ (policies, configs)
   └── environments/ (overlays por entorno)
   ↓
Controller vigila el repo
   ↓
Commit → PR → merge → controller aplica
\`\`\`

### 🧪 Ejercicios

1. Crea un repo GitOps con la estructura apps/infra/environments.
2. Protege la rama principal del repo gitops (PRs requeridos).
3. Documenta la regla: "si no está en Git, no existe" — ¿qué cambios haces hoy fuera de Git?

### ⚠️ Errores comunes

* Dos fuentes de verdad (Git y cluster): la verdad es la que se modificó después.
* Repo gitops sin protección: cualquiera mergea y el cluster cambia sin revisión.
* Cambios directos al cluster "urgentes" que nunca llegan a Git.
* Commits sin mensaje claro: la auditoría pierde valor.

### 🔗 Conexión DevOps

Git como fuente de verdad une Git (nivel 1), el estado deseado (módulo 2) y la reconciliación (módulo 5). Es el principio que hace que todo GitOps sea auditable y reversible.
`
export default content
