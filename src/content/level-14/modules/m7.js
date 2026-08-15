const content = `
## Módulo 7 — Secrets en Kubernetes

### 🎯 Objetivos de aprendizaje

* Definir Secrets de Kubernetes y sus limitaciones.
* Crear y referenciar Secrets de forma segura.
* Integrar gestores externos (Vault) para mayor seguridad.

### ❓ Problema real que resuelve

Las aplicaciones necesitan credenciales (tokens, claves de BD) en runtime. Los Secrets de Kubernetes las guardan y las inyectan en los pods — pero con limitaciones: por defecto solo se codifican en base64, no se cifran. El módulo enseña el uso correcto y cuándo escalar a soluciones más fuertes.

### 💡 Analogía

El Secret de Kubernetes es la caja fuerte de la oficina: guarda lo valioso (credenciales) separado del resto. Pero es una caja fuerte de pared fina: la puerta tiene llave (base64 no es cifrado real). Para lo realmente valioso, se contrata un banco (Vault) con bóveda de verdad.

### 📖 Explicación técnica

* **Secret**: objeto que guarda datos sensibles (base64-codificados por defecto — NO es cifrado).
* Uso: como variables de entorno (\`valueFrom: secretKeyRef\`), como archivos montados, o para pull de imágenes (imagePullSecrets).
* Ciclo de vida: crear con \`kubectl create secret\` o desde archivos; referenciar por nombre; el pod lee el valor al arrancar (los cambios requieren recrear el pod).
* Seguridad real: cifrado en etcd (encryption at rest), RBAC estricto (quién puede leer), auditoría de acceso.
* **Mejores prácticas**: no versionar Secrets en el repo (ni base64); usar gestores externos (Vault — nivel 11) que inyectan secretos dinámicos en runtime; rotar credenciales; usar external-secrets/Sealed Secrets para GitOps (módulo 14).
* El Secret no protege contra quien tiene acceso al cluster: el control es RBAC + cifrado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Secret creado (base64, idealmente cifrado en etcd)
   ↓
Deployment referencia secretKeyRef
   ↓
Kubelet inyecta el valor en el pod (env/volumen)
   ↓
App lee la credencial en runtime
   ↓
RBAC limita quién puede leer el Secret
\`\`\`

### 🧪 Ejercicios

1. Crea un Secret y móntalo como variable de entorno en un Deployment.
2. Configura cifrado en reposo (encryption at rest) en tu cluster.
3. Integra un gestor externo (Vault o external-secrets) para secretos dinámicos.

### ⚠️ Errores comunes

* Creer que base64 = cifrado (es codificación; cualquiera con acceso lo decodifica).
* Secrets versionados en Git (aunque sea base64).
* RBAC abierto: cualquier pod del namespace lee cualquier Secret.
* ConfigMap con secretos (visible en claro).

### 🔗 Conexión DevOps

Los Secrets de Kubernetes conectan el nivel 11 (variables, secrets y credentials), el nivel 12 (secrets por entorno) y GitOps (módulo 14). En CI/CD, el pipeline crea o referencia Secrets por entorno — nunca los contiene.
`
export default content
