const content = `
## Módulo 13 — Configuration Management

### 🎯 Objetivos de aprendizaje

* Definir **Configuration Management (CM)** y distinguirlo de IaC.
* Explicar el modelo de "estado deseado" de herramientas como Ansible.
* Ubicar CM en la entrega de software: configuración del sistema, no del recurso.

### ❓ Problema real que resuelve

IaC crea los recursos (servidores, redes); pero un servidor recién creado es una caja vacía: necesita paquetes instalados, servicios configurados, usuarios, firewall, aplicación desplegada. Si cada servidor se configura a mano, vuelve el problema del copo de nieve: configuraciones que divergen, servidores que "funcionan" por casualidad y que nadie puede reproducir. Configuration Management automatiza el estado de los sistemas: define cómo debe quedar configurada una máquina y la mantiene en ese estado.

### 💡 Analogía

IaC es el plano del edificio (estructura, habitaciones, electricidad); CM es el manual de equipamiento y mantenimiento: qué muebles van en cada habitación, cómo se ordenan, qué se repara si algo cambia. Puedes reconstruir el edificio (IaC), pero sin el manual de mantenimiento (CM) cada piso acabaría amueblado distinto y con cosas rotas que nadie sabe arreglar.

### 📖 Explicación técnica

* **Configuration Management**: práctica y herramientas para definir, aplicar y mantener el estado de configuración de los sistemas (paquetes, archivos, servicios, usuarios, permisos) de forma automatizada y versionada.
* Modelo central: **declarar el estado deseado** de la máquina y que la herramienta **converja** hacia él (idempotencia: ejecutar 1 o 100 veces produce el mismo resultado).
* Herramientas: Ansible (sin agente, SSH), Puppet/Chef (con agente), SaltStack. Ansible usa YAML (playbooks) y módulos.
* CM se complementa con IaC: Terraform crea la infraestructura; Ansible la configura y despliega la aplicación.
* En CI/CD, los playbooks se validan (lint, sintaxis, check mode) y ejecutan en el pipeline de despliegue, igual que el código de la aplicación.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Playbook (estado deseado en YAML)
  │
  ▼
ansible-lint + validación de sintaxis
  │
  ▼
Conexión por SSH (sin agente)
  │
  ▼
Módulos verifican cada recurso
  ├── ¿Estado actual == deseado?
  │     ├── Sí → no hace nada (idempotente)
  │     └── No → aplica el cambio
  ▼
Convergencia al estado deseado
  │
  ▼
Reporte: changed / ok / failed
\`\`\`

### 💻 Ejemplo básico

Estado deseado con Ansible: instalar nginx y arrancar el servicio, solo si no está en ese estado:

\`\`\`yaml
- name: Configurar servidor web
  hosts: webservers
  become: true
  tasks:
    - name: Instalar nginx
      apt:
        name: nginx
        state: present
    - name: Garantizar nginx activo
      service:
        name: nginx
        state: started
        enabled: true
\`\`\`

Ejecutar este playbook 5 veces produce el mismo resultado: la quinta ejecución reporta todo como "ok" sin cambios.

### 🏢 Caso de uso profesional

Un equipo que gestiona 40 servidores web descubre que cada uno tiene una versión distinta de nginx y configuraciones divergentes. Adoptan Ansible: un playbook define el estado deseado de todos los servidores (versión, configuración, vhosts, firewall). El pipeline de CI lo valida (ansible-lint, check mode) y lo ejecuta contra los inventarios de staging y producción. Tres meses después, los 40 servidores son idénticos y cualquier cambio se aplica en minutos con el pipeline.

### ⚠️ Errores comunes

* Confundir CM con IaC: no son lo mismo y se complementan.
* Playbooks no idempotentes: comandos que rompen el estado si se re-ejecutan.
* Cambios manuales que divergen del playbook (drift).
* No validar en CI: playbooks con errores de sintaxis que explotan en producción.

### 📋 Lo que debes recordar

* CM define y mantiene el **estado de configuración** de los sistemas.
* Modelo declarativo e idempotente: el resultado no depende de cuántas veces se ejecute.
* IaC crea recursos; CM configura sistemas; se complementan.
* Los playbooks se validan y ejecutan desde el pipeline.

### 🧪 Autoevaluación rápida

1. ¿Qué diferencia a Configuration Management de Infrastructure as Code?
2. ¿Qué significa que un playbook sea idempotente?
3. ¿Qué modelo usa Ansible: agente o sin agente?

---

1. IaC crea y gestiona los recursos de infraestructura (servidores, redes); CM define y mantiene el estado de configuración de esos sistemas (paquetes, servicios, archivos). Se complementan.
2. Que ejecutarlo muchas veces produce el mismo estado final: solo aplica cambios cuando el estado actual difiere del deseado.
3. Sin agente: Ansible se conecta por SSH y ejecuta módulos en las máquinas remotas, sin instalar software permanente.
`
export default content
