const content = `
## Módulo 6 — Vault

### 🎯 Objetivos de aprendizaje

* Cifrar secretos de Ansible con ansible-vault.
* Integrar Vault en el pipeline CI/CD.
* Gestionar el ciclo de vida de los secrets cifrados.

### ❓ Problema real que resuelve

Los playbooks necesitan credenciales (passwords, claves), pero versionar secretos en claro es una fuga garantizada. ansible-vault cifra los archivos de variables (y archivos enteros) con una clave maestra — los secretos viven en el repo cifrados y solo se descifran en ejecución, con la clave protegida.

### 💡 Analogía

ansible-vault es la caja fuerte del archivo de la empresa: los documentos (secretos) están guardados y cifrados en el estante (repo), pero solo quien tiene la llave (vault password) puede leerlos. Perder la llave es perder el archivo; por eso la llave tiene copias custodiadas (Vault/secret manager).

### 📖 Explicación técnica

* **ansible-vault**: cifrado de variables/archivos de Ansible con AES; se descifran en runtime con la vault password.
* Comandos: \`ansible-vault create/edit/view/encrypt/decrypt/rekey\` sobre archivos o variables (\`!vault\`).
* En CI/CD: la vault password se guarda en el secret store del pipeline (nivel 11 — Secret/CI variable) y se pasa a la ejecución: \`--vault-password-file\` o \`ANSIBLE_VAULT_PASSWORD_FILE\`.
* Alternativas modernas: **Vault (HashiCorp)** como gestor central — Ansible consulta secretos dinámicos en runtime (\`community.hashi_vault\`), sin cifrado en el repo.
* Buenas prácticas: separar secrets de config (variables cifradas vs normales), rotar la vault password, no loguear secretos descifrados, restringir quién puede editar archivos cifrados (revisar diffs de archivos cifrados es difícil — ideal separar secretos por archivo).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Repo: vars/secrets.yml (cifrado con !vault)
   ↓
Pipeline: vault password desde secret store
   ↓
ansible-playbook --vault-password-file
   ↓
Ansible descifra en runtime (nunca en logs)
   ↓
Tareas usan los secretos
\`\`\`

### 🧪 Ejercicios

1. Cifra un archivo de variables con ansible-vault y úsalo en un playbook.
2. Configura la vault password como secret del pipeline (nunca en el repo).
3. Evalúa migrar a HashiCorp Vault para secretos dinámicos.

### ⚠️ Errores comunes

* Secretos en claro en playbooks o variables (fuga garantizada).
* Vault password en el repo o en el archivo del pipeline (mismo problema).
* Perder la vault password (datos irrecuperables).
* Cifrar todo el repo (difícil de revisar) en lugar de solo los secretos.

### 🔗 Conexión DevOps

Vault conecta Ansible con el nivel 11 (Variables, Secrets y Credentials): secretos cifrados en el repo o dinámicos desde un gestor central. La capa de configuración nunca debe contener secretos en claro.
`
export default content
