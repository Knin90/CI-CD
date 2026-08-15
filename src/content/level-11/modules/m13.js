const content = `
## Módulo 13 — Vault integration

### 🎯 Objetivos de aprendizaje

* Integrar HashiCorp Vault con el pipeline.
* Obtener secretos con identidad OIDC y políticas.
* Usar leases y rotación dinámica.

### ❓ Problema real que resuelve

Cuando el gestor nativo de la plataforma no basta (rotación dinámica, políticas centralizadas, multi-plataforma, compliance), Vault centraliza los secretos: el pipeline obtiene lo que necesita con su identidad, bajo políticas, y recibe credenciales temporales (leases) que expiran solas.

### 💡 Analogía

Vault es la bóveda central del banco: todos los secretos viven ahí con políticas de acceso (qué cajón abre cada identidad) y registro. El cajero (pipeline) presenta su credencial (OIDC token), la bóveda verifica la política y entrega el valor — a veces con caducidad (lease). No hay copias de llaves en las oficinas (repos, variables): todo sale de la bóveda.

### 📖 Explicación técnica

Integración:

* **Autenticación**: el pipeline se autentica con OIDC (GitHub/GitLab) o token de la plataforma.
* **Políticas**: la policy de Vault define qué secretos puede leer cada identidad (path + capabilities).
* **Lectura**: \`vault kv get -field=password secret/data/app\` → el job la inyecta como env.
* **Leases**: credenciales temporales (DB dynamic secrets) que expiran.
* **Agent**: \`vault agent\` puede inyectar secretos a archivos/env y renovar leases automáticamente.

Flujo típico:

1. Job obtiene token de Vault (OIDC/role).
2. Lee los secretos de su path (política verificada).
3. Inyecta como variables de entorno al job.
4. (Opcional) usa credenciales dinámicas con lease.
5. Auditoría: cada acceso queda en el log de Vault.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job (OIDC) → vault login (identidad del workflow)
  │
  ▼
Policy verificada: ¿puede leer secret/data/app? → SÍ
  │
  ▼
vault kv get -field=password secret/data/app
  │
  ├── Valor entregado (cifrado en tránsito)
  └── Auditado (path, identidad, fecha)
  │
  ▼
Job inyecta a env → usa → no imprime
\`\`\`

### 💻 Ejemplo básico

Obtener secretos de Vault en el pipeline:

\`\`\`yaml
- name: Autenticar con Vault
  run: |
    vault login -method=oidc -role=ci
- name: Obtener secretos
  run: |
    echo "DB_PASS=\$(vault kv get -field=password secret/data/app/db)" >> "\$GITHUB_ENV"
    echo "API_KEY=\$(vault kv get -field=key secret/data/app/api)" >> "\$GITHUB_ENV"
- run: ./test.sh
\`\`\`

### 🏢 Caso de uso profesional

Una empresa con 200 servicios centraliza en Vault: cada pipeline se autentica con OIDC y su policy solo permite leer los secretos de su servicio y entorno. Las bases de datos usan dynamic secrets: cada job recibe un usuario/password temporal que expira al terminar. La auditoría central muestra cada acceso; la rotación es automática.

### ⚠️ Errores comunes

* Vault sin políticas (acceso amplio a todo).
* Tokens de Vault con larga vida.
* Secretos leídos e impresos en logs.
* Integración sin OIDC (tokens manuales).
* Vault para 3 secretos (complejidad innecesaria).

### 📋 Lo que debes recordar

* Vault centraliza secretos con políticas y auditoría.
* OIDC para autenticar el pipeline; policies para autorizar.
* Dynamic secrets: credenciales temporales con lease.
* Multi-plataforma y compliance: los casos fuertes de Vault.

### 🧪 Autoevaluación rápida

1. ¿Cómo se autentica el pipeline en Vault?
2. ¿Qué definen las policies?
3. ¿Qué son los dynamic secrets?

---

1. Con OIDC (identidad del workflow) o con roles/tokens de la plataforma.
2. Qué secretos puede leer cada identidad (paths y capabilities).
3. Credenciales generadas al vuelo (usuarios de DB, por ejemplo) con lease que expira automáticamente.
`
export default content
