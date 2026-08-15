const content = `
## Módulo 3 — Kubernetes manifests

### 🎯 Objetivos de aprendizaje

* Definir manifests de Kubernetes y su estructura.
* Escribir y organizar manifests versionados por entorno.
* Validar manifests antes de aplicarlos.

### ❓ Problema real que resuelve

Todo lo que corre en Kubernetes se describe con manifests (YAML): qué imagen, cuántas réplicas, qué puertos, qué configuración. Sin manifests declarativos, el cluster se configura "a mano" con comandos sueltos — nadie sabe qué hay corriendo ni cómo se llegó a ese estado. Los manifests convierten el estado del cluster en código versionado y revisable.

### 💡 Analogía

Los manifests son el plano del edificio: el arquitecto (desarrollador) dibuja cómo será el edificio (Deployment, Service, etc.) y los obreros (Kubernetes) lo construyen exactamente según el plano. Si el plano cambia, el edificio se adapta solo — nadie "arregla el edificio a martillazos".

### 📖 Explicación técnica

* **Manifest**: archivo YAML que describe un recurso de Kubernetes (declarativo).
* Recursos fundamentales: Deployment (pods + réplicas + estrategia), Service (exposición), ConfigMap/Secret (configuración), Ingress (entrada HTTP), Namespace (aislamiento).
* Estructura común: \`apiVersion\`, \`kind\`, \`metadata\` (nombre, labels, namespace), \`spec\` (deseado).
* Organización: directorio de manifests por app y overlays por entorno (kustomize) o values por entorno (Helm).
* **El manifest es el contrato**: Kubernetes reconcilia el estado actual hacia el deseado (módulo 17 — declarative infrastructure).
* Validación: \`kubectl apply --dry-run=client\`, \`kubectl apply --dry-run=server\`, \`kubeconform\`/\`kubeval\` en CI, linting.
* Buenas prácticas: manifests versionados en el repo, labels coherentes, recursos y límites definidos, sin secretos en claro (van en Secret, módulo 7).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Manifest (deseado) → kubectl apply
   ↓
API server valida y persiste el deseo
   ↓
Controllers (Deployment, ReplicaSet) reconcilian
   ↓
Pods creados/actualizados hacia el estado deseado
   ↓
Estado actual = estado deseado
\`\`\`

### 🧪 Ejercicios

1. Escribe un Deployment + Service para una app simple (2 réplicas, puerto 80).
2. Valida el manifest en CI con \`--dry-run=server\` o kubeconform.
3. Organiza tus manifests con overlays por entorno (dev/staging/prod).

### ⚠️ Errores comunes

* Manifests generados a mano "desde la UI" que nadie versiona.
* Secrets en claro dentro de los manifests.
* Sin recursos/limits: un pod consume todo el nodo.
* Manifests gigantes sin estructura: difíciles de revisar y mantener.

### 🔗 Conexión DevOps

Los manifests son el lenguaje entre CI/CD y Kubernetes: el pipeline los aplica (módulo 1), Helm los parametriza (módulo 8) y GitOps los versiona (módulo 14). Declarativo es la base de todo lo demás.
`
export default content
