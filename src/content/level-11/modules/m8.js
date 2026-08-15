const content = `
## Módulo 8 — Short-lived credentials

### 🎯 Objetivos de aprendizaje

* Explicar las credenciales de corta vida y sus ventajas.
* Obtenerlas con OIDC/STS en el pipeline.
* Reemplazar credenciales estáticas por temporales.

### ❓ Problema real que resuelve

Las credenciales estáticas (access keys que duran años) son el mayor riesgo: si se filtran, sirven para siempre y hay que rotarlas en pánico. Las credenciales de corta vida expiran en minutos/horas: se obtienen automáticamente cuando el job las necesita, y un compromiso solo tiene una ventana mínima de uso.

### 💡 Analogía

Las credenciales de corta vida son como los pases de visitante del edificio: se emiten en el momento, duran unas horas y expiran solas. Si un visitante pierde su pase, ya no sirve al poco tiempo. El pase permanente (credencial estática) que se pierde sigue abriendo puertas años después.

### 📖 Explicación técnica

Mecanismos:

* **OIDC** (GitHub/GitLab → cloud): el pipeline intercambia su identidad por credenciales temporales del proveedor (STS en AWS, workload identity en GCP/Azure). Duración típica: 15 min-1h. Sin secretos estáticos.
* **Vault dynamic secrets**: credenciales de DB generadas por job (usuario temporal, password aleatoria, lease).
* **STS AssumeRole**: tokens de sesión temporales con permisos del rol.

Ventajas:

* **Ventana mínima**: un compromiso expira solo.
* **Sin rotación manual**: se generan al vuelo.
* **Auditables**: cada sesión tiene identidad y duración.
* **Mínimo privilegio**: el rol define los permisos exactos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job (GitHub Actions) — identidad OIDC del workflow
  │
  ▼
Token de identidad → STS (AWS)
  │
  ▼
Credenciales temporales del rol (15 min, permisos del rol)
  │
  ▼
Job usa las credenciales (deploy, push...)
  │
  ▼
Expiran solas → sin limpieza ni revocación manual
\`\`\`

### 💻 Ejemplo básico

OIDC a AWS (GitHub Actions):

\`\`\`yaml
permissions:
  id-token: write

- uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789012:role/ci-deploy
    aws-region: us-east-1
- run: |
    # credenciales temporales en el entorno (expiran solas)
    ./deploy.sh
\`\`\`

### 🏢 Caso de uso profesional

Una empresa elimina todas sus access keys estáticas de CI: cada pipeline obtiene credenciales temporales por OIDC con el rol exacto de su función. Un token de CI filtrado en GitHub ya no sirve (no hay credenciales estáticas que robar), y el acceso a AWS quedó auditado por sesión y por rol.

### ⚠️ Errores comunes

* Credenciales estáticas "porque funciona" (el riesgo mayor).
* Roles amplios (el OIDC con rol admin no mejora nada).
* Sin trust policy correcta (cualquier repo asume el rol).
* No limitar la duración de la sesión.
* Credenciales temporales escritas en disco/artefactos.

### 📋 Lo que debes recordar

* Corta vida: expiran solas, ventana mínima de exposición.
* OIDC: identidad del pipeline → credenciales cloud temporales.
* Vault dynamic secrets para bases de datos.
* Roles mínimos + trust policies estrictas.

### 🧪 Autoevaluación rápida

1. ¿Qué ventaja tienen las credenciales de corta vida?
2. ¿Cómo obtiene credenciales AWS un job de GitHub Actions?
3. ¿Qué riesgo queda si el rol OIDC es amplio?

---

1. Ventana de exposición mínima y sin rotación manual: un compromiso expira solo.
2. Con OIDC: el workflow intercambia su token de identidad por credenciales temporales del rol configurado (STS AssumeRole).
3. Un compromiso del pipeline obtiene acceso amplio: el OIDC debe combinarse con roles de mínimo privilegio y trust policies estrictas.
`
export default content
