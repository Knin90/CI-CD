const content = `
## Módulo 8 — Environment inventories

### 🎯 Objetivos de aprendizaje

* Estructurar inventarios por entorno.
* Separar hosts, group_vars y host_vars por entorno.
* Ejecutar el mismo playbook contra entornos distintos.

### ❓ Problema real que resuelve

El mismo playbook debe configurar dev, staging y producción — con hosts, variables y credenciales distintos. Los inventarios por entorno organizan esa diferencia: cada entorno tiene su lista de hosts y sus variables, y el playbook se ejecuta contra el inventario elegido. Sin esta separación, los entornos se mezclan y un run "para dev" toca producción.

### 💡 Analogía

Los inventarios por entorno son las agendas de los técnicos por ciudad: el protocolo de reparación (playbook) es el mismo, pero cada ciudad (entorno) tiene su lista de edificios (hosts) y sus notas (variables). El técnico de Madrid no usa la agenda de Barcelona — y nunca repara un edificio que no está en su agenda.

### 📖 Explicación técnica

* Estructura típica:
  \`\`\`text
  inventories/
    dev/    → hosts, group_vars/all, group_vars/app
    staging/ → hosts, group_vars/...
    prod/   → hosts, group_vars/... (protegido)
  \`\`\`
* **hosts**: lista de máquinas del entorno (IPs/DNS) con grupos (\`[app]\`, \`[db]\`).
* **group_vars**: variables por grupo (versiones, configs); **host_vars**: por máquina específica.
* Ejecución: \`ansible-playbook deploy.yml -i inventories/prod\` — el mismo playbook, inventario distinto.
* Secretos: los group_vars de prod contienen secrets cifrados (Vault — módulo 6) y el inventario de prod debe tener acceso restringido (protección de entorno — nivel 12).
* En CI/CD: cada job/entorno usa su inventario; el job de prod requiere approval y nunca comparte credenciales con dev (nivel 12).
* Buenas prácticas: inventarios versionados, sin IPs sensibles en claro si no hace falta, validar que el inventario corresponde al entorno (\`--limit\` para runs específicos).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
ansible-playbook deploy.yml -i inventories/staging
   ↓
Ansible lee hosts + group_vars de staging
   ↓
SSH a los hosts de staging (credenciales de staging)
   ↓
Tareas con variables de staging
   ↓
Prod nunca se toca desde este job
\`\`\`

### 🧪 Ejercicios

1. Estructura inventarios dev/staging/prod con group_vars.
2. Ejecuta el mismo playbook contra dev y staging y verifica que cada uno usa sus variables.
3. Protege el inventario de prod (acceso restringido, secrets cifrados).

### ⚠️ Errores comunes

* Un solo inventario para todo (un run "de dev" toca prod).
* Hosts de prod en inventarios accesibles desde jobs de dev (nivel 12).
* Variables duplicadas entre entornos (drift de configuración).
* Ejecutar con \`-i inventories/prod\` desde un job sin protecciones.

### 🔗 Conexión DevOps

Los inventories por entorno aplican el nivel 12 (Environments) a Ansible: conectan entornos (nivel 12), secrets (módulo 6), credenciales (nivel 11) y el pipeline (módulo 1).
`
export default content
