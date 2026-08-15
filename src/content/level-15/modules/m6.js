const content = `
## Módulo 6 — Approval

### 🎯 Objetivos de aprendizaje

* Diseñar aprobaciones para cambios de infraestructura.
* Revisar planes antes de aplicar (PR + approval).
* Decidir qué entornos requieren aprobación humana.

### ❓ Problema real que resuelve

Cambiar infraestructura tiene más riesgo que cambiar código: un apply malo destruye recursos o afecta a todo un entorno. La aprobación introduce el punto de revisión humana entre el plan y el apply — alguien con contexto revisa qué se va a cambiar (especialmente los destroys) y autoriza.

### 💡 Analogía

La aprobación de infraestructura es la firma del director de obra: el plano (plan) está hecho, pero nadie levanta la grúa (apply) sin la firma del director. La firma no es un trámite: es la responsabilidad de alguien que entiende la obra y sus riesgos.

### 📖 Explicación técnica

* Flujo: PR con cambios de IaC → CI valida y genera plan → revisores revisan el plan (comentado en el PR) → aprobación del PR → el pipeline aplica (o un segundo approval gate antes del apply).
* Herramientas: PR approvals (GitHub/GitLab), Atlantis (comenta el plan y gestiona apply con aprobaciones), entornos protegidos (nivel 12 — required reviewers en el entorno prod), jobs manuales (\`when: manual\`).
* Qué revisar en un plan: destroys (\`-\`), replaces (\`-/+\`), cambios de seguridad (grupos, policies, exposición pública), cambios de coste (tamaños, conteos).
* Niveles de aprobación: dev auto-apply, staging revisión ligera, producción aprobación explícita + ventana.
* Buenas prácticas: aprobar con el plan delante (no "a ciegas"), definir quién aprueba (dueños del módulo/infra), auditar cada aprobación, guardar el planfile aprobado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
PR de IaC → CI (fmt/validate/plan)
   ↓
Plan comentado en el PR
   ↓
Revisores revisan (¿destroys? ¿seguridad? ¿coste?)
   ↓
Aprobación del PR (o gate manual en prod)
   ↓
Apply del planfile aprobado
\`\`\`

### 🧪 Ejercicios

1. Configura que el plan se comente automáticamente en tus PRs.
2. Define una política de aprobación: quién aprueba prod y qué se revisa.
3. Simula un PR con un destroy inesperado y practica la revisión.

### ⚠️ Errores comunes

* Aprobar sin mirar el plan (la aprobación pierde su valor).
* Aprobar en el mismo PR que creó el cambio (falta revisión independiente).
* Sin aprobación para producción ("confiamos en el pipeline").
* Approval "de trámite": todos aprueban todo sin leer.

### 🔗 Conexión DevOps

La aprobación es el punto de gobernanza del IaC: conecta approval gates (nivel 12), plan artifacts (módulo 5) y environments protegidos (nivel 12). Infraestructura sin aprobación es riesgo silencioso.
`
export default content
