const content = `
## Módulo 9 — Manual gates

### 🎯 Objetivos de aprendizaje

* Definir manual gates y cuándo usarlos.
* Insertar puntos de decisión humana en el pipeline.
* Combinar gates con automatización efectiva.

### ❓ Problema real que resuelve

No todo se puede (ni se debe) automatizar: algunos pasos requieren decisión humana — revisar un plan de infraestructura, autorizar un deploy a producción, validar un release comercial. Los manual gates pausan el pipeline hasta que una persona confirma, manteniendo el control humano donde el riesgo lo justifica.

### 💡 Analogía

El manual gate es el control del técnico en la torre de control antes del despegue: el avión está listo y todo el sistema automatizado dice "ok", pero nadie despega sin la autorización explícita del controlador. El gate no es una fricción: es la responsabilidad de quien decide, en el momento correcto.

### 📖 Explicación técnica

* **Manual gate**: pausa en el pipeline que requiere confirmación humana (aprobar/rechazar) para continuar.
* Implementaciones: jobs con \`when: manual\` (GitLab), \`environment\` approvals (GitHub — módulo 8 de nivel 12), Input step (Jenkins), approvals (Azure).
* Cuándo usarlos: deploy a producción, apply de infraestructura crítica (nivel 15), releases a clientes, promoción entre entornos (nivel 12).
* Diseño de un buen gate: la persona aprueba **con información** (artifacts, reports, diffs, health checks — no a ciegas), el gate tiene dueño y timeout, la decisión queda auditada.
* Gates vs automatización: el objetivo es reducir los gates a los puntos de riesgo real — demasiados gates convierten el pipeline en un trámite; demasiado pocos eliminan el control donde importa.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Stage previo completado
   ↓
Pipeline se pausa en el gate
   ↓
Notificación al responsable (con evidencia)
   ↓
¿Aprobar? ──── Aprobar → continúa al siguiente stage
              └── Rechazar → pipeline se detiene + feedback
   ↓
Decisión auditada
\`\`\`

### 🧪 Ejercicios

1. Añade un manual gate antes del deploy a producción en tu pipeline.
2. Define qué evidencia recibe quien aprueba (reports, artifacts, checks).
3. Revisa tus gates: ¿todos protegen un riesgo real o hay trámites?

### ⚠️ Errores comunes

* Gates sin evidencia (se aprueba "porque toca").
* Demasiados gates (el pipeline espera a humanos en cada paso).
* Gates sin timeout ni dueño (el release espera días).
* Aprobar sin revisar (el gate existe pero no protege nada).

### 🔗 Conexión DevOps

Los manual gates conectan approvals (módulo 10), environments (nivel 12), infraestructura (nivel 15) y el equilibrio humano-automatización del DevOps. Son el complemento humano de la automatización.
`
export default content
