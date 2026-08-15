const content = `
## Módulo 8 — Cloud credentials

### 🎯 Objetivos de aprendizaje

* Gestionar credenciales cloud en CI/CD de forma segura.
* Usar OIDC federado en lugar de claves estáticas.
* Aplicar least privilege a las credenciales cloud.

### ❓ Problema real que resuelve

El pipeline necesita credenciales cloud para desplegar (crear recursos, actualizar servicios) — pero las claves estáticas largas (Access Keys) en variables del pipeline son un riesgo enorme: si se filtran, el atacante tiene la cuenta. Las credenciales cloud modernas usan OIDC federado: el pipeline obtiene credenciales temporales y limitadas sin guardar ningún secreto estático.

### 💡 Analogía

Las credenciales cloud estáticas son la llave de la casa bajo el felpudo: funciona, pero cualquiera que la encuentre entra. El OIDC federado es la tarjeta de acceso con foto y hora: el pipeline "se identifica" ante el cloud (federación) y recibe un pase temporal (credenciales efímeras) válido solo para lo que va a hacer — y que caduca.

### 📖 Explicación técnica

* **Credenciales estáticas** (legacy): Access Key ID + Secret en variables del pipeline — riesgo (nivel 11), rotación manual, permisos amplios.
* **OIDC federado** (recomendado): la plataforma CI (GitHub/GitLab/Azure) se autentica con el cloud (AWS/GCP/Azure) vía OpenID Connect — sin secretos del cloud en el pipeline.
  * Flujo: el job pide un token OIDC → el cloud verifica la identidad (repo, entorno, branch) → emite credenciales temporales con un rol específico.
  * Beneficios: sin secretos estáticos, credenciales por job (cortas), auditables (quién pidió qué), rotación automática (expiran).
* **Least privilege** (nivel 12): el rol federado solo permite las acciones del deploy (no admin de la cuenta).
* Implementaciones: \`aws-actions/configure-aws-credentials@v4\` con \`role-to-assume\` (GitHub), OIDC en GitLab/Azure, workload identity federation (GCP).
* Buenas prácticas: roles por entorno (dev no toca prod — nivel 12), condicionar por repo/branch, auditar el uso de credenciales, migrar de estáticas a OIDC.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job CI → solicita token OIDC (identidad del repo)
   ↓
Cloud verifica (repo, entorno, branch)
   ↓
Emite credenciales temporales (rol del deploy)
   ↓
Job actúa (permisos mínimos)
   ↓
Credenciales expiran (nadie las guarda)
\`\`\`

### 🧪 Ejercicios

1. Configura OIDC entre tu plataforma CI y tu cloud (rol con least privilege).
2. Migra un deploy de credenciales estáticas a OIDC.
3. Audita los roles usados: ¿alguno tiene más permisos de los necesarios?

### ⚠️ Errores comunes

* Claves estáticas eternas en variables (el riesgo de siempre — nivel 11).
* Rol federado con permisos de admin (least privilege roto).
* Confianza OIDC demasiado amplia (cualquier repo puede asumir el rol).
* Rotación manual olvidada (con OIDC no hace falta).

### 🔗 Conexión DevOps

Las credenciales cloud conectan secrets (nivel 11), permissions (nivel 12), security (nivel 10) y las plataformas cloud de este nivel. OIDC es el estándar moderno: sin secretos estáticos, sin rotación manual, con auditoría.
`
export default content
