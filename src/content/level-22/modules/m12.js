const content = `
## Módulo 12 — Ansible failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos de playbooks de Ansible.
* Resolver errores de inventario, módulos y conectividad.
* Depurar tareas sin romper los hosts.

### ❓ Problema real que resuelve

El playbook falla: un host inalcanzable, un módulo con error, un \`become\` que no funciona, una tarea que "changed" siempre. Ansible en CI/CD (nivel 16) configura servidores, y sus fallos pueden dejar hosts a medias. Diagnosticar playbooks — inventario, conectividad, módulos, idempotencia — es esencial para una configuración confiable.

### 💡 Analogía

Ansible es el supervisor que visita cada sucursal (host) con una lista de tareas (playbook): "revisa el servidor, instala X, configura Y". Si no encuentra la sucursal (host inalcanzable), no tiene la llave (become/SSH), o la tarea está mal escrita, el supervisor lo anota en su informe (output) — y la sucursal queda como estaba (o a medias). El diagnóstico es leer el informe tarea por tarea.

### 📖 Explicación técnica

* Fallos típicos:
  * **Conectividad**: host inalcanzable (red, firewall, SSH), credenciales SSH, \`become\` sin permisos.
  * **Inventario**: host en el grupo equivocado, variables ausentes, \`ansible_host\` mal definido (nivel 8 de 16).
  * **Módulos**: parámetros incorrectos, módulo que no soporta la acción, dependencias del host (paquete, sistema).
  * **Idempotencia**: tareas que siempre reportan \`changed\` (mala idempotencia — nivel 16), o que dependen del orden.
  * **Variables/facts**: variable no definida, fact ausente (gather_facts), templates con errores.
* Método: \`ansible-playbook --syntax-check\` (nivel 16) → \`--check --diff\` para ver qué cambiaría → ejecuta con \`-v\` (más verbosidad) en el host problemático → \`--limit\` para aislar el host → lee el error del módulo, no solo "FAILED".
* Buenas prácticas: sintaxis y lint en CI (nivel 16), check mode, idempotencia real, \`serial\` para lotes (nivel 16), y fact gathering controlado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Playbook lanzado
   ↓
Lee inventario → hosts del grupo
   ↓
Conecta (SSH) → become
   ↓
Ejecuta tareas (módulos)
   ↓
¿FAILED? → lee la tarea y el error del módulo
   ↓
Aísla con --limit + verbosidad
   ↓
Corrige: inventario, tarea o host
\`\`\`

### 🧪 Ejercicios

1. Pon un host inalcanzable en el inventario y diagnostica el error de conexión.
2. Escribe una tarea no idempotente y observa el \`changed\` repetido.
3. Usa \`--check --diff\` para prever qué cambiaría un playbook.

### ⚠️ Errores comunes

* Ejecutar contra todos los hosts para "probar" (usa \`--limit\` — nivel 16).
* Ignorar el check mode (aplicar cambios sin prever).
* Tareas no idempotentes (cada run "cambia" algo).
* Confundir error de conectividad con error del módulo (leer el mensaje completo).

### 🔗 Conexión DevOps

Ansible conecta con configuration management (nivel 16), inventarios (nivel 16), IaC (nivel 15) y despliegues (nivel 16). Es el troubleshooting de la configuración: tarea por tarea, con check mode y aislamiento, sin improvisar en producción.
`
export default content
