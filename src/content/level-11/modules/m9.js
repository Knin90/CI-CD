const content = `
## Módulo 9 — OIDC

### 🎯 Objetivos de aprendizaje

* Explicar cómo funciona OIDC en el pipeline.
* Configurar el intercambio de identidad con el cloud.
* Asegurar las trust policies.

### ❓ Problema real que resuelve

Los pipelines necesitan acceso cloud sin guardar credenciales estáticas (un riesgo enorme). OIDC permite que la plataforma de CI demuestre la identidad del workflow y que el cloud le entregue credenciales TEMPORALES: sin access keys en ningún lado, con permisos del rol y auditoría por ejecución.

### 💡 Analogía

OIDC es como el sistema de identidad del aeropuerto: el pasajero (workflow) presenta su pasaporte digital (token de identidad) que acredita su identidad y su vuelo (repo, workflow, tag); el control (cloud) verifica el pasaporte contra reglas (trust policy) y emite un pase temporal de embarque (credenciales) con permisos de su zona (rol). El pasaporte expira; el pase también.

### 📖 Explicación técnica

Flujo:

1. El workflow declara \`permissions: id-token: write\`.
2. La plataforma emite un **token de identidad** con claims: issuer, repo, workflow, ref/tag.
3. El job lo intercambia en el proveedor cloud (STS/Workload Identity) — con la **trust policy** del rol que verifica los claims.
4. El cloud entrega credenciales temporales del rol.
5. El job opera con esas credenciales (minutos de vida).

Trust policy (la clave de seguridad):

* Restringe QUÉ workflows pueden asumir QUÉ roles: issuer exacto, repo, workflow y ref.
* Ej: solo \`org/app\` con el workflow \`release.yml\` y tag \`v*\` puede asumir el rol de deploy.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Workflow (repo org/app, workflow release.yml, ref v1.4.0)
  │
  ├── permissions: id-token: write
  │
  ▼
Token de identidad (claims verificables)
  │
  ▼
STS AssumeRoleWithWebIdentity
  │
  ├── Trust policy verifica:
  │     ├── issuer = token.actions.githubusercontent.com ✓
  │     ├── repo = org/app ✓
  │     └── ref = refs/tags/v* ✓
  │
  ▼
Credenciales temporales del rol (15 min)
\`\`\`

### 💻 Ejemplo básico

Trust policy de AWS (solo el workflow de release):

\`\`\`json
{
  "Effect": "Allow",
  "Principal": { "Federated": "arn:aws:iam::123:oidc-provider/token.actions.githubusercontent.com" },
  "Action": "sts:AssumeRoleWithWebIdentity",
  "Condition": {
    "StringEquals": {
      "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
    },
    "StringLike": {
      "token.actions.githubusercontent.com:sub": "repo:org/app:ref:refs/tags/v*"
    }
  }
}
\`\`\`

### 🏢 Caso de uso profesional

Una empresa configura OIDC para todos sus pipelines: los deploys usan roles con trust policies que solo permiten al workflow de release de cada repo. Un repositorio comprometido NO puede asumir roles de otros repos (la trust policy lo impide), y la auditoría muestra cada asunción con su identidad. El acceso cloud quedó sin credenciales estáticas.

### ⚠️ Errores comunes

* Trust policy sin restricciones (cualquier repo asume el rol).
* Roles amplios (OIDC con admin).
* Claims mal validados (issuer o sub laxos).
* Workflows con \`id-token: write\` sin necesidad (superficie).
* OIDC solo "en teoría" (algunos pipelines siguen con keys).

### 📋 Lo que debes recordar

* OIDC: identidad del workflow → credenciales temporales cloud.
* La trust policy es la frontera de seguridad: claims exactos.
* Mínimo privilegio + refs restringidas.
* Sin credenciales estáticas en CI.

### 🧪 Autoevaluación rápida

1. ¿Qué problemas resuelve OIDC en CI?
2. ¿Qué verifica la trust policy?
3. ¿Qué claim restringe qué repos pueden asumir un rol?

---

1. Elimina las credenciales estáticas: acceso cloud temporal, auditable y de mínimo privilegio.
2. Que la identidad del workflow sea legítima: issuer, repositorio, workflow y ref/tag contra los claims del token.
3. El claim \`sub\` (subject): \`repo:org/app:ref:refs/tags/v*\` — solo ese repositorio con ese ref puede asumir el rol.
`
export default content
