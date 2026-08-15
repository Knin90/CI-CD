const content = `
## Módulo 10 — Cloud credentials

### 🎯 Objetivos de aprendizaje

* Gestionar credenciales cloud en el pipeline.
* Usar OIDC, roles y credenciales de sesión.
* Aplicar mínimo privilegio en el acceso cloud.

### ❓ Problema real que resuelve

Los pipelines despliegan infraestructura y aplicaciones en la nube: necesitan credenciales cloud. La gestión correcta (OIDC/roles temporales, mínimo privilegio, por entorno) es la diferencia entre "el pipeline puede desplegar su app" y "un compromiso da control de toda la cuenta cloud".

### 💡 Analogía

Las credenciales cloud son las llaves de los edificios de la empresa en distintas ciudades: el repartidor (pipeline de deploy) necesita la llave del almacén de su ciudad (proyecto), no la llave maestra de todas las ciudades (cuenta completa). Y en vez de llevar una copia eterna, recibe una llave temporal que expira.

### 📖 Explicación técnica

Modelos:

* **OIDC (recomendado)**: roles con trust policy → credenciales temporales (AWS STS, GCP Workload Identity, Azure Federated Credentials).
* **Service principals / service accounts**: identidades dedicadas con permisos mínimos (usadas por el pipeline).
* **Access keys**: última opción (estáticas, riesgo de fuga) — con rotación y permisos mínimos.
* **Credenciales por entorno**: roles distintos para staging y producción.

Prácticas:

* Roles de mínimo privilegio (\`ci-deploy-staging\` solo despliega staging).
* Trust policies estrictas (solo el workflow legítimo).
* Nunca keys en el repo/variables.
* Auditoría (CloudTrail) de las acciones con cada identidad.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job deploy (OIDC)
  │
  ▼
Asume rol ci-deploy-prod (trust policy verificada)
  │
  ├── Permisos: deploy al clúster de producción SOLO
  ├── Duración: 15 min
  └── Auditado en CloudTrail (identidad = workflow)
  │
  ▼
Job termina → credenciales expiran
\`\`\`

### 💻 Ejemplo básico

OIDC con rol de mínimo privilegio (AWS):

\`\`\`yaml
permissions:
  id-token: write
  contents: read

- uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123:role/deploy-prod
    aws-region: us-east-1
- run: ./deploy.sh
\`\`\`

### 🏢 Caso de uso profesional

Una plataforma con 30 microservicios crea un rol por servicio y entorno (60 roles): cada pipeline de deploy asume el suyo por OIDC, con permisos limitados a su namespace de Kubernetes y su registry. Un compromiso de un repo solo puede desplegar su servicio en su entorno: el blast radius está contenido.

### ⚠️ Errores comunes

* Access keys estáticas en CI.
* Un rol para todo (permisos amplios).
* Trust policies laxas (cualquier repo asume).
* Credenciales cloud en variables del pipeline.
* Sin auditoría del uso de identidades.

### 📋 Lo que debes recordar

* OIDC/roles temporales > keys estáticas.
* Mínimo privilegio por servicio y entorno.
* Trust policies estrictas.
* Auditoría de cada acción cloud.

### 🧪 Autoevaluación rápida

1. ¿Qué opciones existen para credenciales cloud en CI?
2. ¿Por qué las access keys son la última opción?
3. ¿Cómo se limita el blast radius?

---

1. OIDC con roles temporales (recomendado), service principals/accounts dedicados, o access keys estáticas (última opción).
2. Porque son estáticas y de larga vida: si se filtran, sirven indefinidamente y hay que rotarlas en pánico.
3. Con roles de mínimo privilegio por servicio y entorno: un compromiso solo alcanza el alcance de ese rol.
`
export default content
