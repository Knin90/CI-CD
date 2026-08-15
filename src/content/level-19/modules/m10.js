const content = `
## Módulo 10 — Approvals

### 🎯 Objetivos de aprendizaje

* Diseñar sistemas de aprobación en pipelines avanzados.
* Gestionar aprobaciones por entorno y por riesgo.
* Auditar las aprobaciones como parte de la gobernanza.

### ❓ Problema real que resuelve

En pipelines avanzados, las aprobaciones escalan: múltiples entornos, múltiples equipos, políticas distintas por riesgo. Un sistema de aprobaciones bien diseñado define quién aprueba qué, con qué evidencia, y deja rastro auditable — el punto donde la automatización se encuentra con la gobernanza de la organización.

### 💡 Analogía

Las approvals son las firmas del hospital: no cualquier persona firma una receta, y cada firma tiene un alcance (quién puede recetar qué medicamento) y queda registrada. El sistema de aprobaciones del pipeline funciona igual: firmas (approvals) con alcance (por entorno/recurso) y registro (auditoría).

### 📖 Explicación técnica

* **Approvals**: autorizaciones explícitas requeridas para ciertas acciones del pipeline.
* Dimensiones de diseño:
  * **Quién**: personas/roles/equipos (dueños del entorno, security, producto).
  * **Qué**: qué acción requiere aprobación (deploy a prod, apply de infra, release).
  * **Evidencia**: qué información se presenta al aprobador (reports, diffs, artifacts).
  * **Alcance**: por entorno (nivel 12), por recurso, por riesgo.
  * **Caducidad**: timeout (si no se aprueba en X, se notifica/escala).
* Implementaciones: entornos protegidos con required reviewers (GitHub), jobs manuales (GitLab), approval checks (Azure), approval stages en Jenkins.
* **Auditoría**: cada aprobación/rechazo queda registrado (quién, cuándo, con qué) — base para compliance y post-mortems.
* Buenas prácticas: approvals basadas en evidencia, definir quién NO puede aprobar (evitar auto-aprobaciones), escalar approvals (nivel 1 → nivel 2) según riesgo, revisar periódicamente las políticas.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline llega al punto de aprobación
   ↓
¿Quién debe aprobar? (política por entorno/riesgo)
   ↓
Presenta evidencia (reports, diffs)
   ↓
Aprobación / rechazo (con timeout)
   ↓
Registro auditado
   ↓
¿Aprobado? → continúa   ¿Rechazado? → detiene
\`\`\`

### 🧪 Ejercicios

1. Diseña la matriz de approvals de tu organización: acción × entorno × quién.
2. Configura required reviewers en un entorno protegido.
3. Audita las aprobaciones del último mes: ¿todas tuvieron evidencia? ¿alguna fue trámite?

### ⚠️ Errores comunes

* Aprobador = la misma persona que hizo el cambio (sin revisión independiente).
* Aprobaciones sin evidencia ni criterio (trámite).
* Sin timeout ni escalado (el release espera indefinidamente).
* Políticas de aprobación escritas pero no implementadas en la plataforma.

### 🔗 Conexión DevOps

Las approvals escalan los approval gates (módulo 9) a un sistema de gobernanza: conectan environments (nivel 12), infraestructura (nivel 15), seguridad (nivel 10) y auditoría (nivel 23).
`
export default content
