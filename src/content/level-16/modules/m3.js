const content = `
## Módulo 3 — Syntax validation

### 🎯 Objetivos de aprendizaje

* Validar la sintaxis de playbooks y variables.
* Usar \`--syntax-check\` en CI.
* Detectar errores de YAML y referencias antes de ejecutar.

### ❓ Problema real que resuelve

Un playbook con YAML mal formado o una variable mal referenciada falla a mitad de ejecución — dejando servidores a medias. La validación de sintaxis detecta estos errores antes de tocar ningún host: un chequeo barato que convierte "fallo en producción" en "fallo en el PR".

### 💡 Analogía

La validación de sintaxis es la lectura en voz alta del guion antes del ensayo: el director detecta frases rotas, nombres de personajes que no existen (variables sin definir) y escenas mal escritas — sin que los actores (hosts) pierdan el tiempo en el escenario. Un guion roto no llega al ensayo general.

### 📖 Explicación técnica

* **\`ansible-playbook --syntax-check\`**: comprueba sintaxis YAML, estructura del playbook y referencias de variables/módulos — sin ejecutar nada en los hosts.
* Qué detecta: YAML inválido, playbooks sin hosts/tasks, módulos inexistentes, errores de sintaxis en condiciones/loops, referencias rotas.
* Qué NO detecta: problemas de runtime (hosts inaccesibles, permisos), valores incorrectos para los módulos (eso lo hace check mode — módulo 4), ni errores de lógica.
* En CI: primer gate del pipeline de Ansible — rápido, sin inventario real (se puede validar con un inventario mínimo o \`localhost\`).
* Complementos: \`ansible-lint\` (módulo 2), validación de YAML con herramientas genéricas, \`ansible-playbook --list-tasks\` (estructura).
* Buenas prácticas: syntax-check en cada PR, junto con lint; validar también los archivos de variables y templates (\`ansible-vault\` aparte).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Playbooks en el PR
   ↓
ansible-playbook --syntax-check
   ↓
¿Error de sintaxis/referencias? → CI falla
   ↓
¿OK? → ansible-lint → check mode → run
\`\`\`

### 🧪 Ejercicios

1. Añade \`--syntax-check\` como primer gate de tu pipeline de Ansible.
2. Introduce un error de YAML y una variable inexistente: observa qué detecta.
3. Combínalo con \`--list-tasks\` para revisar la estructura del playbook.

### ⚠️ Errores comunes

* Saltarse la validación e ir directo al run (fallos a mitad de ejecución).
* Creer que la sintaxis válida garantiza el éxito (no valida runtime).
* Validar solo el playbook principal, no los includes/roles.
* Ignorar errores de lint que luego rompen el run.

### 🔗 Conexión DevOps

La validación de sintaxis es el primer control de calidad del ciclo Ansible: conecta el pipeline (módulo 1), ansible-lint (módulo 2) y check mode (módulo 4). Detectar temprano es más barato que revertir servidores.
`
export default content
