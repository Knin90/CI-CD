const content = `
## Módulo 3 — Jenkins

### 🎯 Objetivos de aprendizaje

* Conocer Jenkins y su modelo (master/controller, agents).
* Escribir pipelines declarativos (Jenkinsfile).
* Gestionar Jenkins como plataforma auto-alojada.

### ❓ Problema real que resuelve

Jenkins es el CI/CD auto-alojado por excelencia: el equipo controla el controller y los agents (nivel 4), el pipeline se define como código (Jenkinsfile) y la flexibilidad es total (plugins, shared libraries — nivel 19). Resuelve CI/CD para equipos que necesitan control total de la infraestructura de build.

### 💡 Analogía

Jenkins es la fábrica propia del fabricante: en vez de subcontratar la producción (cloud CI), el fabricante tiene su propia planta (controller) y sus propias líneas de montaje (agents) — con el control total de las máquinas, los horarios y las herramientas. La libertad es máxima; el mantenimiento también es tuyo.

### 📖 Explicación técnica

* **Arquitectura**: controller (master) + agents (nodos que ejecutan jobs — nivel 4); el controller orquesta, los agents ejecutan.
* **Jenkinsfile**: pipeline declarativo (\`pipeline { agent any; stages { stage('Build') { steps { ... } } } }\`) o scripted (Groovy).
* **Shared libraries** (nivel 19): código Groovy reutilizable (\`vars/\`, \`src/\`).
* **Plugins**: ecosistema enorme (Git, Docker, Kubernetes, cloud providers, notificaciones) — con riesgo de supply chain (nivel 10): mantener actualizados.
* Características: triggers (SCM polling, webhooks, cron — nivel 2), artifacts (nivel 8), credentials store (nivel 11), agents efímeros en Kubernetes (nivel 4 — scaling).
* Retos: mantenimiento del controller (actualizaciones, backups, seguridad — nivel 10), disponibilidad (un solo punto de fallo sin HA), plugins legacy.
* Buenas prácticas: pipeline como código (nivel 23), agents efímeros (nivel 4), plugins mínimos y actualizados (nivel 10), credenciales en el credentials store (nivel 11).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Trigger (webhook/cron) → controller
   ↓
Controller asigna el job a un agent
   ↓
Agent ejecuta el Jenkinsfile (stages)
   ↓
Artifacts + resultados al controller
   ↓
Notificaciones + dashboards
\`\`\`

### 🧪 Ejercicios

1. Instala Jenkins (o usa el contenedor oficial) y configura un agente.
2. Escribe un Jenkinsfile declarativo con 3 stages.
3. Crea una shared library con un step y úsala desde el Jenkinsfile.

### ⚠️ Errores comunes

* Controller sin actualizar (CVEs — nivel 10).
* Agents persistentes sin aislar (nivel 4 — runner security).
* Jenkinsfile scripted gigante (difícil de mantener — declarativo + libraries).
* Plugins de más (superficie de ataque y compatibilidad).

### 🔗 Conexión DevOps

Jenkins es la plataforma auto-alojada del nivel 21: conecta runners/agents (nivel 4), shared libraries (nivel 19), security (nivel 10) y la gestión de infraestructura propia (nivel 14).
`
export default content
