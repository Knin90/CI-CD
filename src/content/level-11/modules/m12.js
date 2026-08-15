const content = `
## Módulo 12 — Registry credentials

### 🎯 Objetivos de aprendizaje

* Gestionar credenciales de registries (paquetes e imágenes).
* Autenticar pulls y pushes de forma segura.
* Usar OIDC/tokens de corta vida.

### ❓ Problema real que resuelve

El pipeline publica y consume paquetes/imágenes: necesita credenciales del registry. La gestión segura (tokens mínimos, OIDC, como secretos) evita que las credenciales de publicación se filtren y que un compromiso publique artefactos maliciosos.

### 💡 Analogía

Las credenciales del registry son las llaves del almacén de publicaciones: el editor (pipeline) necesita su llave para publicar; los lectores (proyectos) solo una llave de lectura. La llave de publicación (permisos write) es sensible: no se copia en la pizarra ni se deja en el escritorio (repo) — se guarda en la caja fuerte y se usa solo en el momento de publicar.

### 📖 Explicación técnica

Tipos de credenciales:

* **Tokens de publicación**: con permisos mínimos (solo el paquete/repo del proyecto); se rotan.
* **Tokens de lectura**: para pulls (más comunes y menos sensibles); a veces el pipeline no los necesita (registries públicos).
* **OIDC**: credenciales temporales (AWS ECR, GCP Artifact Registry, GitHub Packages con GITHUB_TOKEN).
* **NAT/Credentials helpers**: docker login con tokens de corta vida.

En el pipeline:

* Push: login con token de publicación (secreto) solo en el job de release.
* Pull: login con token de lectura o sin login (público).
* Docker: \`docker login\` con \`--password-stdin\`.
* npm/pip/Maven: token en .npmrc/settings.xml inyectado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job publish (release, tag v*)
  │
  ├── Permisos: packages: write
  │
  ▼
OIDC/token → docker login (credenciales temporales o secreto)
  │
  ▼
docker push registry/app:v1.4.0
  │
  ▼
Logs: sin credenciales (masking)
  │
  ▼
Rotación: tokens de publicación rotados periódicamente
\`\`\`

### 💻 Ejemplo básico

Login con token de corta vida (ECR + OIDC):

\`\`\`yaml
- uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123:role/ci-push
    aws-region: us-east-1
- run: |
    aws ecr get-login-password | docker login \\
      --username AWS --password-stdin \$ACCOUNT.dkr.ecr.us-east-1.amazonaws.com
    docker push \$ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/app:v1.4.0
\`\`\`

### 🏢 Caso de uso profesional

Una empresa usa OIDC para publicar imágenes (sin tokens estáticos) y tokens de lectura de corta vida para los pulls de los runners. La rotación dejó de ser manual, y un compromiso del pipeline no puede publicar en registries de otros proyectos (el rol solo cubre el suyo).

### ⚠️ Errores comunes

* Token de publicación en el repo (el error clásico).
* Tokens con permisos amplios (publish a todo el registry).
* Credenciales en el Dockerfile o .npmrc versionados.
* Sin rotación de tokens de publicación.
* Login con \`--password\` en el historial del shell.

### 📋 Lo que debes recordar

* Credenciales de registry: lectura y escritura separadas.
* OIDC o tokens mínimos como secretos.
* Solo el job de publicación tiene permisos write.
* Rotación y auditoría.

### 🧪 Autoevaluación rápida

1. ¿Qué diferencia hay entre credencial de lectura y de publicación?
2. ¿Cómo se autentica contra ECR de forma segura?
3. ¿Qué permisos debe tener el token de publicación?

---

1. La de lectura solo descarga (pulls); la de publicación sube (pushes) — mucho más sensible y de menor uso.
2. Con OIDC: el pipeline asume un rol y obtiene credenciales temporales (\`aws ecr get-login-password\` → \`docker login\`).
3. Solo los repositorios del proyecto, nunca acceso global al registry.
`
export default content
