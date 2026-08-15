const content = `
## Módulo 7 — Deployment Playbooks

### 🎯 Objetivos de aprendizaje

* Diseñar playbooks de despliegue de aplicaciones.
* Estructurar playbooks reutilizables con roles y variables.
* Desplegar aplicaciones de forma idempotente con Ansible.

### ❓ Problema real que resuelve

Desplegar una aplicación en servidores (copiar código, instalar dependencias, reiniciar servicios) hecho a mano es lento y propenso a errores. Los deployment playbooks automatizan el proceso completo de forma declarativa e idempotente: el mismo playbook despliega en dev o prod cambiando solo variables.

### 💡 Analogía

El deployment playbook es el manual de montaje del mueble de Ikea: los pasos están escritos (copiar piezas, atornillar, comprobar), el mismo manual sirve para montar el mueble en cualquier habitación (entorno) — solo cambia el espacio (inventario/variables). Nadie monta a ojo.

### 📖 Explicación técnica

* **Playbook de despliegue**: secuencia de tareas que lleva una versión de la app a un host: descargar artifact, instalar dependencias, configurar, reiniciar servicios, verificar.
* Estructura recomendada: roles (app, nginx, database) + group_vars por entorno + inventarios (módulo 8).
* Tareas típicas: \`get_url\`/\`copy\` del artifact, \`apt/yum\` de dependencias, \`template\` de configs, \`systemd\` (enable + restart), \`wait_for\` (health check), handlers para reinicios controlados.
* **Idempotencia**: el playbook corre N veces con el mismo resultado — verificación con handlers (solo reinicia si cambió la config).
* Versionado: la versión de la app se pasa como variable (\`app_version\`) — el pipeline obtiene el artifact del registry (nivel 8) y el playbook lo instala.
* Verificación post-deploy: \`wait_for\` del puerto, tests (módulo 5), health checks del servicio.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline: versión + inventario del entorno
   ↓
Playbook: descargar artifact (versión X)
   ↓
Instalar dependencias + templates de config
   ↓
Reiniciar servicio (handler, solo si cambió)
   ↓
Verificar (puerto/health)
   ↓
Deploy completo e idempotente
\`\`\`

### 🧪 Ejercicios

1. Escribe un playbook de despliegue para una app simple (artifact → config → servicio → verificación).
2. Ejecútalo dos veces y verifica que el segundo run no cambia nada (idempotencia).
3. Parametrízalo con \`app_version\` y despliega versiones distintas en dev y staging.

### ⚠️ Errores comunes

* Playbooks no idempotentes (cada run reinicia servicios o re-descarga).
* Versión de la app hardcodeada (re-deploy del mismo playbook = sin trazabilidad).
* Copiar archivos con \`copy\` en lugar de usar \`template\`/artifacts del pipeline.
* Sin verificación post-deploy: "terminó" pero el servicio no arranca.

### 🔗 Conexión DevOps

Los deployment playbooks conectan Ansible con artifacts (nivel 8), environments (nivel 12) y verificación (nivel 13). Son la herramienta clásica de despliegue en infraestructura basada en VMs.
`
export default content
