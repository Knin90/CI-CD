const content = `
## Módulo 8 — Docker authentication

### 🎯 Objetivos de aprendizaje

* Autenticarse contra registries desde el pipeline.
* Usar OIDC y credenciales de corta vida.
* Evitar credenciales estáticas en el código.

### ❓ Problema real que resuelve

Publicar y extraer imágenes requiere autenticación contra el registry. Las credenciales mal gestionadas (tokens en el repo, claves con permisos amplios y vida eterna) son un riesgo de seguridad clásico. La autenticación profesional usa credenciales de corta vida (OIDC) o tokens con permisos mínimos, inyectados como secretos.

### 💡 Analogía

La autenticación del pipeline es como la credencial del repartidor en el depósito: no lleva la llave maestra de por vida (token estático), sino un pase temporal que expira y solo abre la puerta del depósito (registry) con permisos limitados. Si le roban el pase, expira solo y el daño es mínimo.

### 📖 Explicación técnica

Opciones:

* **OIDC (recomendado)**: el pipeline intercambia un token de identidad de la plataforma por credenciales temporales del cloud (GitHub Actions → AWS/GCP/Azure). Sin secretos estáticos; expira en minutos; auditable.
* **Token de servicio**: token del registry con permisos mínimos, guardado como secreto (nunca en el repo).
* **docker login**: \`echo TOKEN | docker login --username ... --password-stdin\`.

Implementación:

* ECR: \`configure-aws-credentials\` con OIDC → \`aws ecr get-login-password\` → docker login.
* GitHub Packages: \`GITHUB_TOKEN\` (autenticación automática).
* GitLab: \`CI_REGISTRY_PASSWORD\`/token del job.
* Registries privados: usuario/token como secretos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
OIDC:
  Plataforma (GitHub) ──token de identidad──► Cloud (AWS)
        │
        ▼
  Credenciales temporales (role ci-push, expira en 15 min)
        │
        ▼
  aws ecr get-login-password | docker login ...
        │
        ▼
  docker push (con permisos mínimos, sin secretos estáticos)
\`\`\`

### 💻 Ejemplo básico

Login con token de servicio como secreto:

\`\`\`yaml
- name: Login al registry privado
  run: |
    echo "\${{ secrets.REGISTRY_TOKEN }}" | \\
      docker login registry.corp.example --username ci --password-stdin
- run: docker push registry.corp.example/app:v1.4.0
\`\`\`

### 🏢 Caso de uso profesional

Una empresa migra de tokens estáticos a OIDC: cada ejecución de CI obtiene credenciales temporales de AWS (role \`ci-push\` con permisos solo de push al ECR del proyecto). Los tokens de larga vida desaparecen del repositorio de secretos, la rotación deja de ser un problema y la auditoría muestra cada push con su identidad temporal.

### ⚠️ Errores comunes

* Tokens en el Dockerfile, .npmrc o variables versionadas.
* Credenciales con permisos amplios (push a todos los repos).
* Secretos con vida eterna sin rotación.
* \`docker login\` con password en el historial del shell.
* Reutilizar la misma credencial para CI y deploys.

### 📋 Lo que debes recordar

* OIDC: credenciales temporales sin secretos estáticos.
* Tokens de servicio: mínimos y como secretos.
* Nunca credenciales en el código o en las capas.
* Permisos mínimos + rotación + auditoría.

### 🧪 Autoevaluación rápida

1. ¿Qué ventaja tiene OIDC sobre tokens estáticos?
2. ¿Cómo se inyecta un token de registry al pipeline?
3. ¿Qué riesgo hay con un token de permisos amplios?

---

1. Credenciales temporales y automáticas: sin secretos estáticos que rotar, con permisos mínimos y auditoría por ejecución.
2. Como secreto de la plataforma (\`secrets.REGISTRY_TOKEN\`), nunca versionado en el código.
3. Un compromiso da acceso a más recursos de los necesarios: el atacante puede publicar imágenes maliciosas o acceder a otros repositorios.
`
export default content
