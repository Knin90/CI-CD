const content = `
## Módulo 9 — Deployment permissions

### 🎯 Objetivos de aprendizaje

* Definir permisos de despliegue y principio de least privilege.
* Configurar permisos por rol y por entorno.
* Evitar permisos excesivos en cuentas de servicio y runners.

### ❓ Problema real que resuelve

El pipeline necesita permisos para desplegar (crear recursos, actualizar servicios), pero esos permisos son también la puerta de entrada si se comprometen. Los permisos de despliegue deben ser los mínimos necesarios, limitados al entorno correcto y rotables — no una cuenta todopoderosa compartida.

### 💡 Analogía

Los permisos de despliegue son las llaves del almacén: el reponedor tiene llave del almacén, no del banco. Si alguien roba la llave del almacén, el daño es limitado. Si todos comparten la llave maestra, un solo robo abre todo el edificio.

### 📖 Explicación técnica

* **Principio de least privilege**: cada identidad (persona, bot, servicio) recibe solo los permisos que necesita.
* Identidades en despliegues:
  * **Cuenta de servicio / Service Account**: identidad del pipeline (no de una persona).
  * **OIDC (nivel 11)**: el pipeline obtiene credenciales temporales sin secretos estáticos.
  * **Roles por entorno**: el rol de dev no puede tocar producción.
* Dimensiones de los permisos: qué recursos (scope), qué acciones (create/update/delete), por cuánto tiempo (validez), desde dónde (red/origen).
* En Kubernetes: RBAC con roles por namespace; en cloud: IAM roles con policies mínimas.
* Buenas prácticas: separar identidades por entorno, rotar credenciales, auditar uso, eliminar permisos no usados, revisar periódicamente.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline (identidad OIDC)
   ↓
Obtiene credencial temporal para PROD
   ↓
Permisos mínimos (solo deploy app X)
   ↓
Acción ejecutada y auditada
   ↓
Credencial expira
\`\`\`

### 🧪 Ejercicios

1. Lista las identidades con permisos de despliegue en tu organización y qué pueden hacer.
2. Reduce los permisos de tu pipeline al mínimo (prueba quitando y viendo qué rompe).
3. Configura OIDC para que el pipeline obtenga credenciales sin secretos estáticos.

### ⚠️ Errores comunes

* Una cuenta admin compartida para todos los despliegues.
* Permisos acumulados que nadie revisa (crecen con el tiempo).
* Credenciales estáticas eternas en variables del pipeline.
* Roles iguales para dev y producción (un compromiso de dev abre prod).

### 🔗 Conexión DevOps

Los permisos de despliegue son el punto donde CI/CD toca IAM y seguridad (nivel 10) y secrets (nivel 11). Sin least privilege, la automatización multiplica el impacto de cualquier compromiso.
`
export default content
