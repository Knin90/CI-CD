const content = `
## Módulo 2 — kubectl en el pipeline

### 🎯 Objetivos de aprendizaje

* Usar kubectl dentro de pipelines CI/CD.
* Configurar credenciales y contexto de forma segura.
* Aplicar y verificar recursos de Kubernetes desde CI.

### ❓ Problema real que resuelve

El pipeline necesita interactuar con el cluster de Kubernetes: aplicar manifests, comprobar estado, ver logs. kubectl es la interfaz, pero usarlo desde CI tiene trampas: credenciales que no deben estar en el repo, contextos equivocados (¡aplicar a producción por error!), y comandos que "salen 0" pero no verifican nada. Este módulo muestra el uso seguro y correcto.

### 💡 Analogía

kubectl en el pipeline es el mando a distancia del técnico: el técnico no está físicamente en el cluster, pero el mando le permite operarlo. El mando (credenciales) debe estar protegido, y el técnico debe saber qué botón pulsa — pulsar "apagar todo" por error no tiene vuelta atrás.

### 📖 Explicación técnica

* **kubectl**: CLI de Kubernetes. En CI: se instala en el runner, se configura un kubeconfig o credenciales, y se ejecutan comandos.
* Configuración de credenciales en CI:
  * **kubeconfig** con token/cliente certificado guardado como secret.
  * **Service Account + token** del cluster.
  * **OIDC / cloud provider**: el pipeline obtiene credenciales temporales (recomendado).
* Comandos típicos en pipelines:
  * \`kubectl apply -f manifests/\` (aplicar).
  * \`kubectl rollout status deployment/app\` (esperar y verificar el rollout).
  * \`kubectl get pods -l app=api\` (estado).
  * \`kubectl logs deployment/app\` (logs para debug).
* **Contexto explícito**: cada job define \`--context\` o \`--namespace\`; nunca depender del contexto "por defecto" del kubeconfig.
* Buenas prácticas: aplicar el mismo manifiesto versionado en el repo, verificar con \`rollout status\` + health checks, usar \`--dry-run\` para validar antes de aplicar.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job CI
   ↓
Credenciales (kubeconfig/secret) inyectadas
   ↓
kubectl --context prod apply -f manifests/
   ↓
kubectl rollout status (espera a estar listo)
   ↓
Verificación: pods sanos + endpoints
   ↓
Deploy completado
\`\`\`

### 🧪 Ejercicios

1. Configura un job que aplique manifests a un cluster de pruebas con credenciales por secret.
2. Usa \`kubectl rollout status\` para esperar y verificar el despliegue.
3. Protege el contexto: verifica que el job de prod nunca aplica sin el contexto correcto.

### ⚠️ Errores comunes

* Credenciales de kubeconfig en el repositorio (nivel 11: nunca).
* Depender del contexto por defecto (despliegues al cluster equivocado).
* \`kubectl apply\` sin esperar el rollout (el deploy "termina" antes de estar listo).
* Comandos destructivos sin \`--dry-run\` o validación previa.

### 🔗 Conexión DevOps

kubectl es la interfaz entre CI/CD y Kubernetes: conecta manifests (módulo 3), secrets (nivel 11), rolling updates (módulo 10) y health checks (módulo 11). Dominarlo en CI es la base del deployment pipeline de Kubernetes.
`
export default content
