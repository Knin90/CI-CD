const content = `
## Módulo 11 — Ansible + Terraform

### 🎯 Objetivos de aprendizaje

* Combinar Terraform (infraestructura) con Ansible (configuración).
* Pasar outputs de Terraform a Ansible dinámicamente.
* Orquestar la cadena infra → config en el pipeline.

### ❓ Problema real que resuelve

Terraform crea la infraestructura (VMs, redes, clusters); Ansible la configura (paquetes, servicios, usuarios). Hacerlo por separado a mano rompe la cadena: IPs copiadas a mano, configs que no coinciden con la infra. Ansible + Terraform encadena ambos: Terraform crea y pasa la información de la infraestructura (IPs, endpoints) a Ansible, que configura — todo en el mismo pipeline.

### 💡 Analogía

Ansible + Terraform es la construcción del hospital en dos contratistas: Terraform es la constructora que levanta el edificio (paredes, instalaciones básicas), y Ansible es la empresa de equipamiento que lo amuebla y lo deja operativo (quirófanos, camas, sistemas). La obra pasa del uno al otro con un plano (outputs) que dice dónde está cada cosa.

### 📖 Explicación técnica

* División de responsabilidades: Terraform = infraestructura inmutable (crear/eliminar recursos); Ansible = configuración mutable (estado de los hosts).
* **Paso de datos**: \`terraform output -json\` → inventario dinámico de Ansible:
  * Generar un inventario (\`inventory_script\` o un archivo \`hosts\` desde los outputs).
  * Usar \`add_host\`/\`group_by\` con los outputs de Terraform en un playbook previo.
* Orquestación en el pipeline: job 1 = terraform apply (nivel 15), job 2 = ansible (con outputs como artifact — nivel 8/15).
* **Provisioners vs separación**: se recomienda NO usar provisioners de Terraform para configurar (acopla y complica el estado); usar Ansible como capa separada.
* Patrón maduro: Terraform crea infra efímera → Ansible la configura → tests (módulo 5) → destroy (entornos efímeros).
* Buenas prácticas: outputs tipados y documentados, inventario generado (nunca IPs copiadas a mano), idempotencia en ambas capas.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Terraform apply → VMs + red
   ↓
terraform output -json → IPs/endpoints
   ↓
Inventario de Ansible generado desde outputs
   ↓
Ansible configura los hosts (módulos 1-10)
   ↓
Tests + verificación
   ↓
Destroy (si efímero)
\`\`\`

### 🧪 Ejercicios

1. Crea un inventario de Ansible generado desde \`terraform output\`.
2. Encadena en el pipeline: terraform apply → ansible (mismo flujo, sin copiar IPs).
3. Construye un entorno efímero: Terraform → Ansible → tests → destroy.

### ⚠️ Errores comunes

* IPs copiadas a mano de la consola a los inventarios (drift).
* Provisioners en Terraform para configurar (acoplamiento y estado frágil).
* Dos fuentes de verdad: los outputs de Terraform y el inventario manual no coinciden.
* Capas sin encadenar: la infra existe pero nadie la configuró.

### 🔗 Conexión DevOps

Ansible + Terraform es la integración de los niveles 15 y 16 — la base de la cadena infra → config → app del proyecto final (nivel 24). Conecta también con environments (nivel 12) y con la promoción de entornos.
`
export default content
