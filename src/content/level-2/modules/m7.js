const content = `
## Módulo 7 — Triggers

### 🎯 Objetivos de aprendizaje

* Enumerar los triggers de un pipeline: push, PR, tag, schedule, manual, eventos externos.
* Configurar triggers con patrones de rama y rutas.
* Entender que los triggers definen cuándo se ejecuta el pipeline.

### ❓ Problema real que resuelve

Un pipeline debe ejecutarse en el momento correcto: validar cada PR, desplegar en cada merge a main, hacer un release en cada tag, correr un nightly a las 3am. Sin triggers bien configurados, el pipeline corre de más (cada push de cualquier rama dispara deploys) o de menos (no dispara cuando debería). Los triggers son la **condición de disparo** del pipeline.

### 💡 Analogía

Los triggers son como las alarmas del despertador: la alarma de la mañana (push a main), la de recordatorio (schedule), la manual (botón). Si las alarmas están mal configuradas, o no te despiertas (pipeline no corre) o te despiertas a cada rato (pipeline corre de más y desperdicia recursos).

### 📖 Explicación técnica

Triggers típicos:

* **Push**: se ejecuta al pushear a ciertas ramas (\`branches: [main]\`).
* **Pull Request**: se ejecuta al abrir/actualizar un PR (validación).
* **Tag**: se ejecuta al crear un tag (\`tags: ['v*']\`) — típico de releases.
* **Schedule**: horario programado (\`cron: '0 3 * * *'\`) — nightly builds, reportes.
* **Manual**: \`workflow_dispatch\` (GitHub) o el botón de ejecución (GitLab) — a demanda.
* **Eventos externos**: webhooks (CI externo notifica), \`workflow_run\` (cuando otro workflow termina), repositorios externos (multi-proyecto).
* Filtros adicionales: **rutas** (\`paths: ['src/**']\` — solo si cambió esa carpeta) y **tipos de evento** (opened, synchronize, closed).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Eventos → ¿Coincide con los triggers? → Ejecución
  │
  ├── push a main        → CI + CD (deploy)
  ├── push a feature/*   → CI (solo si paths coinciden)
  ├── PR opened          → CI (status check)
  ├── tag v1.2.0         → Release pipeline
  ├── cron 0 3 * * *     → Nightly build
  ├── manual (botón)     → Ejecución a demanda
  └── workflow_run (CI OK) → CD encadenado
\`\`\`

### 💻 Ejemplo básico

Triggers con filtros (GitHub Actions):

\`\`\`yaml
on:
  push:
    branches: [main]
    paths: ['src/**', 'package.json']
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 3 * * *'
  workflow_dispatch:
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con un monorepo grande configura triggers por rutas: los cambios en \`services/api/\` solo disparan el pipeline de ese servicio, no el de la web ni el de la app móvil. El pipeline de release se dispara solo con tags \`v*\`, y el nightly con cron. El consumo de runners baja un 60% y el feedback es más rápido porque cada pipeline es más corto.

### ⚠️ Errores comunes

* Triggers demasiado amplios: cada push dispara todo el pipeline.
* Triggers demasiado estrechos: el deploy no corre cuando debería.
* \`paths\` mal configurado: cambios en archivos compartidos no disparan los tests necesarios.
* Schedule en zona horaria equivocada.
* Depender de triggers manuales para todo: se pierde la automatización.

### 📋 Lo que debes recordar

* Trigger = condición de disparo del pipeline.
* push, PR, tag, schedule, manual y eventos externos.
* Los filtros de rama, ruta y tipo de evento afinan la ejecución.
* Configura los triggers con intención: ni de más, ni de menos.

### 🧪 Autoevaluación rápida

1. Nombra cinco tipos de triggers de un pipeline.
2. ¿Para qué sirve filtrar por \`paths\` en un trigger?
3. ¿Qué trigger usarías para un pipeline de release?

---

1. Push, Pull Request, Tag, Schedule (cron) y Manual (workflow_dispatch / botón de la plataforma).
2. Para ejecutar el pipeline solo cuando cambian determinadas rutas del repositorio, ahorrando recursos en monorepos grandes.
3. El trigger de tag (\`tags: ['v*']\`): al crear el tag de versión se dispara la construcción, publicación del artefacto y despliegue de la release.
`
export default content
