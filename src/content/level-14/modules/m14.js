const content = `
## Módulo 14 — GitOps introduction

### 🎯 Objetivos de aprendizaje

* Introducir GitOps y su principio fundamental.
* Comparar el modelo push (CI/CD clásico) con el pull (GitOps).
* Entender por qué GitOps cambia el despliegue en Kubernetes.

### ❓ Problema real que resuelve

En el modelo clásico, el pipeline "empuja" los cambios al cluster (push). GitOps invierte el modelo: **Git es la fuente de verdad** y un controller dentro del cluster "tira" (pull) del estado deseado y reconcilia. El resultado: despliegues auditables (todo en Git), auto-reparación (el cluster corrige el drift) y un solo flujo para código e infraestructura.

### 💡 Analogía

GitOps es el contrato del restaurante con el cliente: el cliente (Git) tiene el pedido por escrito (estado deseado) y el cocinero (controller) lo sigue al pie de la letra. Si alguien cambia la receta en el mostrador (drift), el cocinero vuelve al contrato. En el modelo push, en cambio, el cliente entra a la cocina y cocina él mismo (el pipeline aplica directamente).

### 📖 Explicación técnica

* **GitOps**: el estado deseado del sistema (manifests, config, imágenes) vive en Git; un controller lo aplica y mantiene.
* Componentes: repo de Git (desired state), controller en el cluster (Argo CD / Flux — nivel 17), reconciliation (comparar actual vs deseado).
* Flujo: el pipeline CI construye y actualiza la imagen en el repo de manifests → el controller detecta el cambio → aplica → reconcilia.
* Beneficios: todo es auditable (cada cambio es un commit), rollback = revertir commit, self-healing (el cluster corrige drift), permisos (el pipeline ya no necesita acceso directo al cluster).
* Diferencia clave con push: en push, el pipeline tiene credenciales del cluster y aplica; en pull, el cluster (controller) lee de Git y aplica — el pipeline solo actualiza Git.
* Este módulo es la introducción; el nivel 17 lo desarrolla por completo.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
CI construye imagen → actualiza manifests en Git (commit)
   ↓
Controller (en cluster) detecta cambio en Git
   ↓
Aplica el estado deseado (kubectl apply interno)
   ↓
Reconcilia: actual = deseado
   ↓
Drift → controller corrige (self-healing)
\`\`\`

### 🧪 Ejercicios

1. Compara en un diagrama: pipeline push vs GitOps pull en tu proyecto.
2. Identifica qué cambios de tu infraestructura hoy se hacen fuera de Git (drift potencial).
3. Instala Argo CD o Flux en un cluster de pruebas (solo la instalación).

### ⚠️ Errores comunes

* Creer que GitOps es "usar Git" (es el modelo pull + reconciliación, no solo versionar manifests).
* Mantener dos fuentes de verdad (Git y el cluster: el cluster gana y se genera drift).
* Pipeline con acceso directo al cluster en un modelo GitOps (rompe el modelo pull).
* GitOps sin revisión: el "approval" del cambio es el PR, no un gate en el pipeline.

### 🔗 Conexión DevOps

Este módulo prepara el nivel 17 (GitOps completo): conecta manifests (módulo 3), Helm (módulo 8), environments (módulo 13) y el despliegue (módulo 1). GitOps es la evolución natural del pipeline de Kubernetes.
`
export default content
