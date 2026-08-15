const content = `
## Módulo 5 — Fase 4: Terraform y Ansible — infraestructura y configuración

### 🎯 Objetivos de aprendizaje

* Provisionar la infraestructura con Terraform desde el pipeline.
* Configurar los servidores con Ansible.
* Encadenar infra + configuración + app.

### ❓ Problema real que resuelve

La app necesita dónde vivir: infraestructura reproducible (nivel 15) y servidores configurados (nivel 16). La Fase 4 crea la infraestructura con Terraform (redes, cluster o VMs — según tu diseño) y la configura con Ansible (paquetes, servicios, users), todo desde el pipeline con plan/approval/apply (nivel 15) — infraestructura como código, no a mano.

### 💡 Analogía

La Fase 4 es la urbanización y el acondicionamiento antes de mudar a los inquilinos: Terraform es el urbanista que dibuja y construye las calles y los edificios (infraestructura según el plano), y Ansible es el acondicionador que entra en cada piso (servidor) a instalar la cocina, la calefacción y la seguridad (configuración). Solo cuando el edificio está listo se mudan los inquilinos (la app — Fase 5).

### 📖 Explicación técnica

* **Terraform** (nivel 15): infraestructura como código — VPC/redes, cluster o VMs, security groups. En el pipeline: \`fmt\` → \`validate\` → \`plan\` → review/approval → \`apply\` (módulo 11 de 22). State remoto con backend (nivel 15), outputs para conectar con la siguiente fase (nivel 16).
* **Ansible** (nivel 16): configuración de los servidores — paquetes, servicios, users, hardening. \`--syntax-check\`, \`--check --diff\`, \`serial\` para lotes (nivel 16 y 22 de 22).
* **Encadenamiento**: Terraform crea la infra y entrega outputs (IPs, DNS, IDs) → Ansible configura los hosts (inventario dinámico desde los outputs — nivel 16) → la app se despliega sobre la infra lista (módulo 12 de 21).
* Buenas prácticas: entornos aislados (módulo 10 de 23), drift detection (nivel 15), permisos mínimos y OIDC (nivel 21), y gates de review antes del apply en prod (nivel 15).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Terraform: fmt → validate → plan
   ↓
Review + approval (prod)
   ↓
apply → infra creada (state remoto)
   ↓
Outputs: IPs/DNS/IDs
   ↓
Ansible: inventario dinámico + playbooks
   ↓
--check → apply (serial, idempotente)
   ↓
Infra configurada y lista para la app
\`\`\`

### 🧪 Ejercicios

1. Escribe el Terraform de tu infraestructura y súbelo al pipeline con plan/apply.
2. Escribe un playbook de Ansible que configure los servidores (check + apply).
3. Encadena: Terraform outputs → inventario de Ansible.

### ⚠️ Errores comunes

* \`apply\` sin revisar el plan (nivel 15).
* Inventario de Ansible a mano (drift con la infra real — nivel 16).
* Infra y configuración en dos mundos sin conectar (nivel 16).
* Sin estado remoto ni drift detection (nivel 15).

### 🔗 Conexión DevOps

La Fase 4 conecta con Terraform (nivel 15), Ansible (nivel 16), IaC en el pipeline (nivel 15), cloud credentials (nivel 21) y environment isolation (módulo 10 de 23). Prepara el terreno: infra reproducible y configurada para recibir la app.
`
export default content
