const content = `
## Módulo 12 — Ansible + Kubernetes

### 🎯 Objetivos de aprendizaje

* Orquestar Kubernetes con Ansible.
* Usar módulos de Ansible para gestionar clusters.
* Combinar Ansible (configuración) con Kubernetes (runtime).

### ❓ Problema real que resuelve

Kubernetes gestiona la aplicación, pero no instala el cluster ni configura las máquinas que lo forman. Ansible + Kubernetes combina ambas: Ansible provisiona y configura los nodos (SO, Docker/containerd, kubeadm), y los módulos de Ansible gestionan recursos de Kubernetes (deployments, services) desde el pipeline — una herramienta para toda la cadena.

### 💡 Analogía

Ansible + Kubernetes es la mudanza completa del restaurante: Ansible es el equipo que monta la cocina (instala el cluster, configura los fogones — nodos), y Kubernetes es el chef que gestiona el servicio (menús, turnos — pods). El director (pipeline) coordina ambos: primero la cocina, luego el servicio.

### 📖 Explicación técnica

* Roles de Ansible para Kubernetes: instalación del cluster (kubeadm/k3s), configuración de nodos (containerd, kubelet, CNI), alta disponibilidad (HAProxy/keepalived), upgrade de clusters.
* Módulos de Ansible para gestionar Kubernetes:
  * **k8s** (community.kubernetes): aplica recursos declarativos (manifests) al cluster.
  * **helm** (community.kubernetes): gestiona releases de Helm.
  * **kubectl** (community.k8s): envoltorio del CLI.
* En CI/CD: el pipeline usa Ansible para: (1) provisionar el cluster (infra), (2) configurar nodos, (3) aplicar charts/manifests (k8s/helm modules) — todo desde el mismo flujo.
* Diferencia con GitOps (nivel 17): Ansible aplica (push); GitOps reconcilia (pull). Muchos equipos usan Ansible para provisionar el cluster y GitOps para desplegar la app.
* Buenas prácticas: usar kubeconfig seguro (nivel 11), separar roles (cluster vs app), idempotencia, no mezclar la gestión del cluster con el deploy de la app si GitOps lo cubre.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Ansible: provisionar nodos + instalar cluster
   ↓
Ansible: configurar nodos (containerd, CNI, kubelet)
   ↓
Cluster listo
   ↓
Ansible (módulo k8s/helm): aplicar manifests/charts
   ↓
Kubernetes: rolling updates + self-healing (nivel 14)
\`\`\`

### 🧪 Ejercicios

1. Usa un rol de Ansible para instalar un cluster Kubernetes en máquinas de prueba.
2. Aplica un Deployment con el módulo \`k8s\` desde un playbook.
3. Compara el flujo Ansible-push vs GitOps-pull (nivel 17) para desplegar apps.

### ⚠️ Errores comunes

* Usar Ansible para todo (desplegar apps con push) cuando GitOps sería mejor.
* kubeconfig con permisos de admin en playbooks (nivel 11 — least privilege).
* Mezclar la instalación del cluster con la configuración de la app en un solo play gigante.
* No gestionar el upgrade de nodos (Ansible lo automatiza; sin él, clusters viejos).

### 🔗 Conexión DevOps

Ansible + Kubernetes es la integración de dos capas: configuración (nivel 16) y runtime (nivel 14). Conecta con GitOps (nivel 17) y con el proyecto final (nivel 24), donde Terraform provisiona, Ansible configura y Kubernetes ejecuta.
`
export default content
