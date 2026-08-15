const content = `
## Módulo 8 — Approval gates

### 🎯 Objetivos de aprendizaje

* Definir approval gates y cuándo usarlos.
* Configurar aprobaciones manuales en el pipeline.
* Distinguir aprobación efectiva de trámite vacío.

### ❓ Problema real que resuelve

La automatización despliega rápido, pero algunos pasos necesitan juicio humano: ¿está el release listo? ¿alguien revisó los artifacts? ¿los stakeholders saben que se despliega? Los approval gates insertan ese punto de control humano en el flujo automático, sin romper la cadena.

### 💡 Analogía

El approval gate es el visto bueno del capitán antes de zarpar: el barco está listo, el plan está hecho, pero nadie suelta amarras sin la confirmación del capitán. Es un punto de control, no una barrera: retrasa un instante para evitar un viaje entero en falso.

### 📖 Explicación técnica

* **Approval gate**: pausa manual en el pipeline que requiere que una persona (o grupo) apruebe antes de continuar.
* Puntos típicos de aprobación:
  * Antes de deploy a staging (primer contacto con entorno casi-real).
  * Antes de deploy a producción (el más común).
  * Antes de terraform apply sobre infraestructura crítica (nivel 15).
* Implementaciones: GitHub Environments (required reviewers), GitLab (job manual con \`when: manual\`), Jenkins (Input step), Azure (approval checks).
* Buenas prácticas: la aprobación debe basarse en **evidencia** (artifacts, reports, health checks) y no en memoria; definir quién aprueba (no "el que esté disponible"); timeout para no bloquear el pipeline para siempre; auditar cada aprobación.
* Anti-patrón: aprobar por defecto sin mirar — convierte el gate en fricción sin valor.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Tests + staging OK
   ↓
Pipeline se pausa en el gate
   ↓
Notificación a revisores
   ↓
¿Aprobar? ──────────────┬── Aprobar → continúa
                         └── Rechazar → pipeline se detiene + feedback
\`\`\`

### 🧪 Ejercicios

1. Añade un approval gate antes del deploy a producción en tu pipeline.
2. Define quiénes aprueban y con qué evidencia (checklist de revisión).
3. Configura timeout y notificaciones para el gate.

### ⚠️ Errores comunes

* Aprobar sin evidencia (el gate no protege nada).
* Gates en cada paso: la gente aprueba en masa y pierde sentido.
* Sin timeout: un release espera días a que alguien apruebe.
* No auditar aprobaciones: no se sabe quién autorizó qué.

### 🔗 Conexión DevOps

Los approval gates son el punto donde la automatización encuentra la gobernanza: conectan environments (nivel 12), deployment strategies (nivel 13) y el aspecto humano del DevOps (cultura y colaboración).
`
export default content
