const content = `
## Módulo 9 — Automation: el corazón de CI/CD

### 🎯 Objetivos de aprendizaje

* Definir qué es la automatización en el contexto de la entrega de software.
* Enumerar qué procesos se automatizan y cuáles nunca deben automatizarse.
* Explicar la diferencia entre automatizar un paso y automatizar un proceso completo.

### ❓ Problema real que resuelve

Los procesos manuales son el principal generador de errores y de tiempos muertos: pasos olvidados, comandos tecleados mal, personas que se van y se llevan el conocimiento. La automatización elimina la variabilidad humana de los pasos repetitivos y convierte el conocimiento tácito ("yo sé cómo se despliega") en conocimiento explícito (un pipeline versionado que cualquiera puede revisar y ejecutar).

### 💡 Analogía

Un piloto automático de avión: el piloto humano sigue siendo responsable, pero las tareas repetitivas y de precisión (mantener altitud, rumbo) las ejecuta la máquina de forma consistente, sin fatiga ni errores de tipeo. La automatización en CI/CD es el piloto automático del software: libera a los humanos para las decisiones y mantiene los procesos repetitivos consistentes.

### 📖 Explicación técnica

* **Automatización**: ejecutar procesos con herramientas y código en lugar de intervención manual, de forma **repetible, consistente y auditable**.
* En CI/CD se automatiza: integración (build, tests), empaquetado, publicación de artefactos, despliegue, verificación, notificaciones, limpieza.
* **No** se automatiza sin control: decisiones de negocio (aprobar un release), cambios de configuración sensibles (rotación de secretos) o pasos que requieren juicio humano deben quedar como **gates explícitos**.
* Un pipeline es la unidad de automatización: una secuencia de pasos con dependencias, condiciones y reportes.
* La automatización también cubre la infraestructura: provisionar servidores (Terraform), configurarlos (Ansible), y el propio pipeline como código versionado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Proceso manual (frágil)
  Persona → pasos escritos → errores → conocimiento tácito

Proceso automatizado (confiable)
  Código versionado → ejecución determinista → logs → conocimiento explícito
  │
  ├── Se ejecuta igual siempre (consistencia)
  ├── Queda registrado (auditoría)
  └── Se repite sin costo (escalabilidad)
\`\`\`

### 💻 Ejemplo básico

Antes (manual) y después (automatizado) del despliegue de una app:

\`\`\`bash
# Manual: cada vez que se despliega, un humano teclea esto
ssh deploy@server
cd /srv/app
git pull
npm ci
pm2 restart app
\`\`\`

\`\`\`yaml
# Automatizado: el pipeline ejecuta los pasos por nosotros
deploy:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: ssh deploy@server "cd /srv/app && git pull && npm ci && pm2 restart app"
\`\`\`

La diferencia no es el comando: es que en el segundo caso nadie puede olvidarlo, y cada ejecución queda en los logs del pipeline.

### 🏢 Caso de uso profesional

Una empresa sufre un incidente: un deploy manual omitió el paso de migraciones de base de datos y la app se cayó. Tras el incidente, el checklist de 15 pasos se convierte en un pipeline versionado con un paso explícito de migraciones y verificación. El mismo error se vuelve estructuralmente imposible: el paso siempre se ejecuta o el pipeline falla.

### ⚠️ Errores comunes

* Automatizar todo sin gates: decisiones de negocio ejecutadas por máquinas.
* Scripts locales sin versionar: la "automatización" vive en una máquina y muere con ella.
* No registrar logs ni salidas: automatización sin auditoría es magia negra.
* Automatizar procesos mal diseñados: automatiza el caos y lo hace caos rápido.

### 📋 Lo que debes recordar

* La automatización hace los procesos repetitivos **consistentes y auditables**.
* El pipeline es la unidad de automatización de CI/CD.
* Los pasos que requieren juicio humano quedan como gates explícitos.
* Todo lo automatizado debe estar versionado y documentado.

### 🧪 Autoevaluación rápida

1. ¿Qué ventajas da automatizar un proceso sobre hacerlo a mano?
2. ¿Qué pasos NO conviene automatizar sin control?
3. ¿Por qué la automatización debe estar versionada?

---

1. Consistencia (siempre igual), auditoría (todo queda registrado), escalabilidad (se repite sin costo) y eliminación del conocimiento tácito (cualquiera puede revisarlo).
2. Los que requieren juicio o responsabilidad humana: aprobación de releases, decisiones de negocio, y cambios sensibles que deben pasar por un gate explícito.
3. Porque así es revisable, reproducible, auditable y no depende de una máquina o persona concreta; el proceso vive en el repositorio, no en una cabeza.
`
export default content
