const content = `
## Módulo 1 — Ansible in CI

### 🎯 Objetivos de aprendizaje

* Integrar playbooks de Ansible en pipelines CI/CD.
* Ejecutar Ansible desde el runner hacia los hosts.
* Diseñar el flujo: lint → check → deploy → verify.

### ❓ Problema real que resuelve

La configuración de servidores (paquetes, servicios, usuarios) también debe automatizarse y validarse como el código. Ansible en CI lleva los playbooks al mismo rigor: linting, validación, dry-run y ejecución controlada por entorno — en lugar de correr playbooks a mano "cuando toque".

### 💡 Analogía

Ansible en CI es la cadena de montaje de la cocina central: las recetas (playbooks) se prueban (lint/check), se ensayan (check mode) y solo entonces se cocinan (run) para los restaurantes (hosts) de cada zona (entorno). La cocina no improvisa: sigue el procedimiento validado.

### 📖 Explicación técnica

* Flujo típico de Ansible en CI/CD:
  1. **ansible-lint** (módulo 2): mejores prácticas y estilo.
  2. **Syntax validation** (módulo 3): \`ansible-playbook --syntax-check\`.
  3. **Check mode** (módulo 4): \`--check\` — qué cambiaría sin aplicar.
  4. **Run**: ejecución real contra el inventario del entorno.
  5. **Verify**: verificación del estado resultante (handlers, tests).
* Conexión runner → hosts: el runner (CI) usa SSH/winrm hacia los hosts del inventario, con credenciales seguras (nivel 11 — SSH keys, Vault).
* Inventario por entorno (módulo 8): \`inventories/dev/hosts\`, \`inventories/prod/hosts\` con group_vars por entorno.
* Idempotencia: los playbooks deben poder correr N veces con el mismo resultado — la verificación es "nada que hacer" en el segundo run.
* Buenas prácticas: roles estructurados, variables por grupo, secrets en Vault (módulo 6), ejecutar primero dev, promoción a prod con aprobación.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Playbooks + inventario del entorno
   ↓
ansible-lint + syntax-check (CI)
   ↓
--check (dry-run)
   ↓
Run: SSH → hosts → aplicar estado
   ↓
Verificación (idempotencia + health)
   ↓
Entorno configurado
\`\`\`

### 🧪 Ejercicios

1. Configura un job de CI que ejecute ansible-lint y syntax-check sobre tus playbooks.
2. Ejecuta un playbook en check mode contra un host de pruebas.
3. Ejecuta el playbook dos veces y verifica la idempotencia (segundo run "ok, nothing").

### ⚠️ Errores comunes

* Correr playbooks directamente a producción sin lint ni check.
* Inventario con hosts de prod accesible desde jobs de dev (nivel 12 — isolation).
* Credenciales SSH en el repo o en variables del pipeline (nivel 11).
* Playbooks no idempotentes (cada run cambia cosas).

### 🔗 Conexión DevOps

Este módulo abre el nivel 16: conecta Configuration Management (nivel 0), inventarios (módulo 8), secrets (nivel 11) y environments (nivel 12). Ansible en CI es la automatización de la capa de configuración.
`
export default content
