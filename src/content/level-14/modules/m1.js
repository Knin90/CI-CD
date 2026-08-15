const content = `
## Módulo 1 — Kubernetes deployment pipeline

### 🎯 Objetivos de aprendizaje

* Diseñar un pipeline que despliegue aplicaciones en Kubernetes.
* Conectar build, registry e imágenes con los manifests.
* Entender el flujo completo: de Git al cluster.

### ❓ Problema real que resuelve

Kubernetes no despliega solo: alguien (o algo) debe construir la imagen, subirla al registry, actualizar los manifests con la nueva imagen y aplicarlos al cluster. El pipeline de despliegue Kubernetes automatiza todo ese flujo, de forma reproducible y con verificación — sin depender de que un humano haga \`kubectl set image\` a mano.

### 💡 Analogía

El pipeline es el director de orquesta y Kubernetes la orquesta: el director lee la partitura (manifests), se asegura de que los instrumentos (imágenes) están listos en el almacén (registry) y dirige la interpretación (deploy). Sin director, cada músico toca cuando quiere.

### 📖 Explicación técnica

* Flujo típico de un deployment pipeline en Kubernetes:
  1. **Build**: compilar la app y crear la imagen Docker (nivel 9).
  2. **Push**: subir la imagen al container registry con tag inmutable (\`app:sha-abc123\`).
  3. **Update manifests**: actualizar la referencia de imagen en los manifests/Helm values (no a mano — con \`kubectl set image\`, sed, o herramientas como kustomize/Helm).
  4. **Apply**: \`kubectl apply\` (o \`helm upgrade\`) contra el cluster/namespace del entorno.
  5. **Verify**: \`kubectl rollout status\` + health checks + smoke tests.
* Herramientas: kubectl, kustomize (overlays por entorno), Helm (charts parametrizados), Argo CD (GitOps — módulo 14).
* Configuración por entorno: namespaces distintos (dev, staging, prod) con sus secrets y limits.
* Buenas prácticas: imágenes inmutables, rollout status + verificación, manifiestos versionados, permisos RBAC mínimos para el pipeline.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Git
   ↓
Build imagen → registry (tag inmutable)
   ↓
Actualizar manifest/values con la imagen
   ↓
kubectl apply / helm upgrade (namespace del entorno)
   ↓
Rollout status + health checks
   ↓
Deploy verificado
\`\`\`

### 🧪 Ejercicios

1. Diseña el pipeline de despliegue de tu app: build → push → update → apply → verify.
2. Automatiza la actualización de la imagen en los manifests sin edición manual.
3. Separa namespaces por entorno y configura límites de recursos.

### ⚠️ Errores comunes

* Manifiestos editados a mano con la imagen "del momento" (drift).
* Deploy sin rollout status: "salió 0" pero el Pod no arranca.
* Tags \`latest\` que no dicen qué versión está corriendo.
* Pipeline con permisos de cluster-admin (RBAC excesivo).

### 🔗 Conexión DevOps

Este módulo une Docker (nivel 9), artifacts (nivel 8), environments (nivel 12) y Kubernetes. Es la columna vertebral del nivel 14: todos los demás módulos (manifests, Helm, rollouts) se insertan en este flujo.
`
export default content
