const content = `
## Módulo 13 — Pipeline status

### 🎯 Objetivos de aprendizaje

* Explicar los estados de un pipeline y dónde se muestran.
* Usar badges y status checks para comunicar el estado.
* Reaccionar al estado: notificaciones, gates y métricas.

### ❓ Problema real que resuelve

El estado del pipeline debe ser **visible y accionable**: los desarrolladores necesitan saber si el pipeline está corriendo o roto, los PRs deben mostrar los checks, y los equipos deben recibir notificaciones cuando algo falla. Un estado bien comunicado convierte el pipeline en un guardián visible; un estado escondido convierte los fallos en sorpresas.

### 💡 Analogía

El estado del pipeline es como el panel de indicadores de una central eléctrica: luces verdes (todo OK), amarillas (en proceso) y rojas (fallo). Los operadores (equipo) viven mirando el panel; si las luces no fueran visibles, nadie sabría que la planta está fallando hasta que se apaga todo.

### 📖 Explicación técnica

* **Estados**: queued (en cola), in_progress (corriendo), success (verde), failure (rojo), cancelled (cancelado), skipped (saltado), stale (obsoleto).
* Dónde se muestran:
  * **Status checks** en los PRs (blocks de checks de CI).
  * **Badges** en el README (estado de main).
  * **Notificaciones** (email, Slack, Teams) por evento.
  * **Dashboard** de la plataforma (ejecuciones recientes, duración, tasa de éxito).
* El estado alimenta decisiones automáticas:
  * Merge bloqueado si el check está rojo.
  * Pipelines encadenados que esperan \`conclusion: success\`.
  * Métricas de salud del pipeline (tasa de éxito, MTTR).
* Badge: \`![CI](https://img.shields.io/...)\` o el badge nativo de la plataforma apuntando al workflow de main.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Ejecución en curso → in_progress (badge amarillo, check en curso)
  │
  ▼
Todo verde → success
  │       └── Badge verde + check ✓ + notificación "deploy OK"
  │
  └── Algo falla → failure
        └── Badge rojo + check ✗ + notificación + PR bloqueado
\`\`\`

### 💻 Ejemplo básico

Badge de estado en el README (GitHub):

\`\`\`markdown
![CI](https://github.com/org/repo/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/org/repo/actions/workflows/cd.yml/badge.svg?branch=main)
\`\`\`

### 🏢 Caso de uso profesional

Un equipo configura notificaciones de fallo a Slack con el enlace directo al job fallido y su log. Cada fallo genera un hilo donde el equipo discute la causa; el estado del pipeline en el PR impide merges rotos; y el badge del README muestra a toda la organización que main está estable. La visibilidad del estado reduce el tiempo de reacción a minutos.

### ⚠️ Errores comunes

* Badges apuntando a ramas equivocadas: muestran un estado que no es el de main.
* Notificaciones solo de fallo y no de recuperación: "¿se arregló?".
* Checks sin protección de rama: el estado rojo no bloquea nada.
* Ignorar el estado "skipped" (parece verde pero no corrió nada).
* Estados que mienten (continue-on-error en tests): verde sin significado.

### 📋 Lo que debes recordar

* Estados: queued, running, success, failure, cancelled, skipped.
* El estado se comunica con checks, badges y notificaciones.
* El estado rojo debe bloquear (protección de rama) y avisar (notificaciones).
* Un verde falso (tests con continue-on-error) destruye la confianza.

### 🧪 Autoevaluación rápida

1. ¿Qué estados puede tener un pipeline?
2. ¿Qué elementos muestran el estado del pipeline?
3. ¿Por qué un "verde falso" es peligroso?

---

1. Queued, in_progress, success, failure, cancelled, skipped (y stale para versiones obsoletas).
2. Los status checks en los PRs, los badges del README, las notificaciones y los dashboards de la plataforma.
3. Porque da falsa confianza: si el verde no significa realmente "validado", el equipo mergea código sin protección y los fallos aparecen en producción.
`
export default content
