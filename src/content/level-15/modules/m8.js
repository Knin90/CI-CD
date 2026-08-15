const content = `
## Módulo 8 — Remote state

### 🎯 Objetivos de aprendizaje

* Entender el state de Terraform y por qué debe ser remoto.
* Configurar backends (S3/GCS/Azurerm) con locking.
* Proteger el estado: contiene datos sensibles.

### ❓ Problema real que resuelve

Terraform necesita recordar qué infraestructura creó (el state). Si el state vive en una máquina local, los demás no lo ven, los planes se contradicen y dos personas pueden aplicar a la vez. El estado remoto centraliza el source of truth, permite colaboración y locking — y con backends modernos, añade cifrado.

### 💡 Analogía

El state remoto es la escritura del registro de la propiedad: no cada ciudadano lleva su propio registro (cada uno sabría "su versión" de quién es cada casa). Hay un único registro central (backend remoto) al que todos consultan antes de comprar (plan) y donde se anota cada transacción (apply).

### 📖 Explicación técnica

* **State**: archivo que mapea recursos Terraform a recursos reales del cloud. Contiene atributos, IDs y, a veces, **datos sensibles** (passwords generados, claves).
* Backends remotos: S3 (+ DynamoDB lock), GCS, Azurerm, Terraform Cloud/Enterprise.
* **Locking**: DynamoDB lock table (AWS) o equivalente impide dos applys concurrentes (corrupción del estado).
* Versionado y cifrado del bucket; acceso restringido por RBAC/IAM (solo el pipeline y los operadores leen/escriben).
* En CI/CD: todos los jobs (plan y apply) usan el mismo backend — condición para que el plan refleje la realidad.
* Buenas prácticas: cifrar el bucket, habilitar versionado (recuperar estados), no exponer el state en logs/artifacts, migrar de local a remoto lo antes posible.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
terraform init → backend configurado
   ↓
plan: descarga state + lock de lectura
   ↓
apply: lock + escribe nuevo state
   ↓
Otro apply concurrente → bloqueado por el lock
   ↓
Todos ven el mismo state (fuente única)
\`\`\`

### 🧪 Ejercicios

1. Migra tu state a un backend remoto con locking.
2. Configura cifrado y versionado del bucket del state.
3. Prueba el locking: lanza dos applys y observa el segundo esperando.

### ⚠️ Errores comunes

* State local compartido por Slack/email (caos total).
* Bucket de state sin cifrado ni versionado.
* State expuesto en artifacts o repositorios (datos sensibles).
* Sin locking: applys concurrentes corrompen el state silenciosamente.

### 🔗 Conexión DevOps

El state remoto es la base de Terraform en equipo: conecta el pipeline (módulo 1), secrets (nivel 11 — proteger el state) y la colaboración (nivel 1). Sin estado compartido, el IaC en CI/CD es una ilusión.
`
export default content
