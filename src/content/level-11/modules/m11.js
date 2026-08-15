const content = `
## Módulo 11 — SSH keys

### 🎯 Objetivos de aprendizaje

* Gestionar claves SSH para deploys desde el pipeline.
* Inyectar claves de forma segura.
* Alternativas: agent, OIDC/credenciales, evitar SSH.

### ❓ Problema real que resuelve

Los pipelines que despliegan por SSH (servidores clásicos) necesitan claves. Gestionadas mal — en el repo, con passphrase vacía, en imágenes — son un vector de compromiso enorme: una clave privada filtrada da acceso a los servidores. La gestión correcta: claves dedicadas, como secretos, con permisos mínimos y rotación.

### 💡 Analogía

La clave SSH privada es la llave del servidor: no se cuelga en la puerta (repo), no se copia en la pizarra (variables normales) ni se lleva en el llavero de todos (imágenes compartidas). Se guarda en la caja fuerte (secreto) y se entrega solo al job que despliega, con una cerradura específica (llave dedicada por servidor/función).

### 📖 Explicación técnica

Buenas prácticas:

* **Clave dedicada**: una clave por función (deploy de la app X), no la clave personal.
* **Sin passphrase o con passphrase gestionada** (para CI, sin passphrase pero con permisos de archivo estrictos).
* **Inyección segura**: la clave privada como secreto; se escribe en \`~/.ssh\` con \`chmod 600\` y se usa en el job.
* **Permisos en el servidor**: la clave pública solo autoriza esa acción (comando restringido, usuario dedicado, \`authorized_keys\` con \`command=\`).
* **Rotación**: reemplazo periódico; revocación al instante ante sospecha.
* **Alternativas**: en vez de SSH: agentes/runbooks sin SSH (Kubernetes API, cloud APIs, agentes de deploy) — menos superficie.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Clave privada (secreto, cifrado)
  │
  ▼
Job inyecta: ssh-add o escribe ~/.ssh/deploy_key (chmod 600)
  │
  ▼
ssh deploy@server "git pull && restart"
  │
  ├── Clave pública en authorized_keys del servidor
  │     └── restringida: usuario dedicado, comando único
  ▼
Logs: nunca muestra la clave (secret)
\`\`\`

### 💻 Ejemplo básico

SSH con clave de deploy (GitHub Actions):

\`\`\`yaml
- name: Configurar SSH
  run: |
    mkdir -p ~/.ssh
    echo "\${{ secrets.DEPLOY_SSH_KEY }}" > ~/.ssh/deploy_key
    chmod 600 ~/.ssh/deploy_key
    ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=accept-new \\
      deploy@app.example.com "cd /srv/app && git pull && ./restart.sh"
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con servidores clásicos usa claves dedicadas por app: cada pipeline despliega con su clave (secreto), el usuario \`deploy\` del servidor solo puede ejecutar el comando de release (\`command=\` en authorized_keys) y las claves se rotan cada 90 días. Una clave comprometida solo podía desplegar esa app — el daño fue contenido y la rotación la invalidó.

### ⚠️ Errores comunes

* Claves en el repo (¡compromiso inmediato!).
* Clave personal del administrador en el pipeline.
* Clave sin restricciones en el servidor (acceso total).
* Claves en imágenes de contenedor (se distribuyen).
* Sin rotación ni revocación.

### 📋 Lo que debes recordar

* Claves dedicadas, como secretos, con permisos mínimos.
* Inyección segura (chmod 600, sin logs).
* Restricciones en el servidor (usuario dedicado, comando limitado).
* Rota y revoca; considera alternativas sin SSH.

### 🧪 Autoevaluación rápida

1. ¿Cómo se inyecta una clave SSH al job?
2. ¿Qué restricciones debe tener en el servidor?
3. ¿Qué alternativa reduce el uso de SSH?

---

1. Como secreto de la plataforma, escrita en \`~/.ssh\` con \`chmod 600\` dentro del job.
2. Usuario dedicado, solo la clave pública necesaria y (idealmente) un comando restringido en \`authorized_keys\`.
3. Usar APIs de Kubernetes/cloud y agentes de deploy en lugar de SSH a servidores: menos superficie de ataque.
`
export default content
