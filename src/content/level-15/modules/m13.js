const content = `
## Módulo 13 — Infrastructure deployment

### 🎯 Objetivos de aprendizaje

* Orquestar el despliegue de infraestructura en el pipeline.
* Coordinar orden: infraestructura → configuración → aplicación.
* Integrar Terraform con Ansible y Kubernetes (niveles 16 y 14).

### ❓ Problema real que resuelve

La infraestructura no se despliega en el vacío: primero la infraestructura (redes, VMs, clusters), luego la configuración (Ansible — nivel 16) y luego la aplicación (Kubernetes/CI — nivel 14). El infrastructure deployment orquesta ese orden dentro del pipeline, con dependencias claras y verificación en cada capa.

### 💡 Analogía

El infrastructure deployment es la construcción del edificio por fases: primero los cimientos y la estructura (Terraform), luego la instalación eléctrica y de fontanería (Ansible) y al final los muebles y los inquilinos (aplicación). Cada fase espera a la anterior y se verifica antes de continuar.

### 📖 Explicación técnica

* Orden de despliegue típico en el pipeline:
  1. **Terraform apply** → infraestructura base (VPC, VMs, cluster).
  2. **Ansible** → configuración (paquetes, servicios, usuarios) sobre la infra (nivel 16).
  3. **Kubernetes / app deploy** → la aplicación sobre la infra lista (nivel 14).
  4. **Verificación** → health checks de la cadena completa.
* Dependencias en el pipeline: jobs con \`needs\`/\`dependencies\` (nivel 5), artifacts que pasan outputs de Terraform (IPs, endpoints) a los siguientes stages.
* **Outputs de Terraform como puente**: \`terraform output -json\` se guarda como artifact y lo consumen Ansible (inventory dinámico) o el deploy de la app (endpoints).
* Entornos efímeros vs permanentes: los efímeros (create → configure → deploy → test → destroy) permiten probar la cadena completa sin riesgo.
* Buenas prácticas: idempotencia en cada capa, verificación por capa, teardown de entornos de prueba, documentar la secuencia.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Terraform apply → infraestructura
   ↓ (outputs: IPs, endpoints)
Ansible → configuración + servicios
   ↓
Kubernetes / deploy app
   ↓
Verificación end-to-end (health + smoke)
   ↓
Entorno listo (o destroy si es efímero)
\`\`\`

### 🧪 Ejercicios

1. Diseña la secuencia infra → config → app en tu pipeline con dependencias explícitas.
2. Pasa outputs de Terraform a Ansible (inventory) y al deploy de la app (endpoints).
3. Crea un entorno efímero completo: apply → configure → deploy → test → destroy.

### ⚠️ Errores comunes

* Aplicar la app antes de que la infra esté lista (dependencias implícitas).
* Outputs de Terraform pasados a mano (IPs copiadas en configs).
* Sin verificación por capa: un fallo de Ansible se descubre en la app.
* Entornos efímeros que nunca se destruyen (coste y drift).

### 🔗 Conexión DevOps

El infrastructure deployment es la integración final del nivel 15: une Terraform (este nivel), Ansible (nivel 16), Kubernetes (nivel 14) y verificación (nivel 13). Es la columna vertebral del proyecto final (nivel 24).
`
export default content
