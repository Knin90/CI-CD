const content = `
## Módulo 4 — Production

### 🎯 Objetivos de aprendizaje

* Definir el entorno de producción y sus reglas especiales.
* Configurar protección, aprobaciones y permisos para producción.
* Desplegar a producción con verificación y rollback preparados.

### ❓ Problema real que resuelve

Producción es donde el software genera valor — y donde un error cuesta dinero, reputación o datos. El entorno de producción necesita las máximas protecciones del pipeline: nadie despliega sin aprobación, sin trazabilidad y sin capacidad de volver atrás. Sin reglas, "producción" es solo un servidor más con más usuarios.

### 💡 Analogía

Producción es el quirófano: solo entra el equipo autorizado, con protocolo estricto, checklist y plan de emergencia. Nadie entra al quirófano "a ver qué pasa". Cada paso está registrado y hay un plan para revertir si algo sale mal.

### 📖 Explicación técnica

* **Producción (PROD)**: entorno que sirve tráfico real de usuarios/clientes.
* Reglas típicas en CI/CD: environment protection (solo ciertas ramas), required reviewers, approval gates manuales, ventanas de despliegue opcionales, permisos mínimos (least privilege).
* El pipeline de producción suele ser el mismo que el de staging — solo cambia la configuración y las protecciones. Esto garantiza que lo ensayado es lo desplegado.
* Despliegue: artifact inmutable + configuración del entorno + estrategia de despliegue (ver nivel 13) + verificación de salud + monitoreo.
* Trazabilidad: cada release se asocia a un commit, un artifact, una persona aprobadora y un timestamp.
* Buenas prácticas: rollback automático ante health check fallido, feature flags para desactivar funciones, DORA metrics para medir el proceso.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Staging validado
   ↓
Approval gate (revisores requeridos)
   ↓
Deploy a PRODUCCIÓN
   ↓
Health checks + smoke
   ↓
Monitoreo (logs, métricas, alertas)
   ↓
¿OK? → release completo    ¿Fail? → rollback
\`\`\`

### 🧪 Ejercicios

1. Configura un entorno de producción protegido: rama permitida, revisores requeridos, approval manual.
2. Define qué health checks deben pasar para considerar el deploy exitoso.
3. Escribe el runbook de rollback de producción y pruébalo en staging.

### ⚠️ Errores comunes

* Producción sin protecciones: cualquiera con acceso al pipeline despliega.
* Approval "de trámite": se aprueba sin revisar artifacts ni health checks.
* Desplegar a producción algo que nunca pasó por staging.
* No tener rollback probado: el primer fallo real se convierte en incidente mayor.

### 🔗 Conexión DevOps

Producción cierra el ciclo de entornos pero abre el de operaciones: monitoreo, feedback y mejora continua (nivel 18). Un buen pipeline de producción es el que hace que desplegar sea aburrido y seguro.
`
export default content
