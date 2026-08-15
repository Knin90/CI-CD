const content = `
## Módulo 5 — Secret stores

### 🎯 Objetivos de aprendizaje

* Explicar qué es un secret store y su papel central.
* Comparar opciones: nativo de la plataforma, Vault, cloud, K8s.
* Integrar el secret store con el pipeline.

### ❓ Problema real que resuelve

Los secretos necesitan un hogar central, cifrado, con acceso controlado y auditoría: el secret store. Sin él, los secretos viven dispersos (repos, variables, archivos) y nadie controla su ciclo de vida. El secret store es la fuente de verdad: los pipelines los inyectan desde ahí, con permisos y rotación.

### 💡 Analogía

El secret store es la caja fuerte central del banco: todos los valores (secretos) se guardan ahí con control de acceso (quién abre qué cajón), cifrado (la caja está sellada) y registro (cada apertura queda anotada). No se guardan valores en los escritorios (repos) ni en la pizarra (variables): todo sale de la caja fuerte cuando se necesita.

### 📖 Explicación técnica

Opciones:

* **Nativo de la plataforma**: GitHub Secrets, GitLab CI/CD variables (masked), Azure Pipelines secret variables. Simple, cifrado, integrado — suficiente para la mayoría.
* **HashiCorp Vault**: secret store centralizado y potente: políticas, rotación dinámica, leases (credenciales temporales), integración con apps.
* **Cloud**: AWS Secrets Manager, GCP Secret Manager, Azure Key Vault — con IAM, rotación y versionado.
* **Kubernetes**: Secrets (base64, mejor con Sealed Secrets/External Secrets) para config en el clúster.

Integración con el pipeline:

* GitHub: \`secrets.*\` inyectados por la plataforma.
* Vault: el job obtiene el secreto por API (con token/role) y lo inyecta.
* External Secrets Operator: K8s sincroniza secretos de Vault/cloud a Secrets del clúster.
* La elección depende de: complejidad, requisitos (rotación dinámica, compliance), tamaño de la organización.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Secret store (Vault / Secrets Manager / nativo)
  │
  ▼
Pipeline solicita secreto (con su identidad/permissions)
  │
  ▼
Política de acceso verificada → valor entregado (cifrado en tránsito)
  │
  ▼
Secreto inyectado al job (env, nunca en logs)
  │
  ▼
Auditoría: quién, cuándo, qué secreto
\`\`\`

### 💻 Ejemplo básico

Obtener secreto de Vault en el pipeline:

\`\`\`yaml
- name: Obtener secreto de Vault
  run: |
    TOKEN=\$(vault login -method=oidc -format=json | jq -r .auth.client_token)
    DB_PASS=\$(vault kv get -field=password secret/data/db)
    echo "DB_PASS=\$DB_PASS" >> "\$GITHUB_ENV"
\`\`\`

### 🏢 Caso de uso profesional

Una empresa con compliance estricto centraliza TODO en Vault: los pipelines obtienen credenciales con leases (temporales) mediante roles OIDC, cada acceso queda auditado y la rotación dinámica genera contraseñas de base de datos por job. Los secretos nativos de la plataforma quedan solo para los más simples. La caja fuerte central es auditable de punta a punta.

### ⚠️ Errores comunes

* Secretos dispersos (repos + variables + archivos) sin fuente única.
* Vault sin políticas (acceso amplio).
* Secretos nativos con permisos globales.
* Sin rotación ni auditoría.
* Elegir la herramienta más compleja sin necesidad (Vault para 3 secretos).

### 📋 Lo que debes recordar

* Secret store = fuente de verdad cifrada y auditada.
* Nativo para simple; Vault/cloud para potente y compliance.
* Acceso controlado por identidad/política.
* El pipeline inyecta desde el store, nunca desde el repo.

### 🧪 Autoevaluación rápida

1. ¿Qué es un secret store?
2. ¿Qué opciones existen?
3. ¿Cuándo conviene Vault sobre el gestor nativo?

---

1. Un almacén central de secretos: cifrado, con control de acceso, rotación y auditoría.
2. Gestor nativo de la plataforma (GitHub/GitLab/Azure), HashiCorp Vault, gestores cloud (Secrets Manager, Key Vault) y Kubernetes Secrets.
3. Cuando se necesita rotación dinámica, leases temporales, políticas complejas o auditoría centralizada multi-plataforma.
`
export default content
