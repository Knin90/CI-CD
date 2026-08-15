const content = `
## Módulo 14 — Feedback loops

### 🎯 Objetivos de aprendizaje

* Definir feedback loops y sus niveles en CI/CD.
* Acelerar el feedback para detectar problemas temprano.
* Convertir el feedback en mejora continua.

### ❓ Problema real que resuelve

Cada etapa del pipeline genera información: el test falló, la seguridad encontró algo, el deploy degradó. Esa información solo vale si **vuelve al equipo que puede actuar** y rápido. Los feedback loops cierran el ciclo: detectar → informar → actuar → verificar — reduciendo el tiempo entre que se introduce un problema y que se descubre (shift left, nivel 0).

### 💡 Analogía

El feedback loop es el termostato de la casa: la temperatura baja (problema), el termostato lo detecta (detección), enciende la calefacción (acción) y vuelve a medir (verificación). Sin el termostato, la casa se enfría sin que nadie se entere hasta que hace frío de verdad — y luego nadie sabe desde cuándo.

### 📖 Explicación técnica

* Niveles de feedback:
  * **Feedback de código** (minutos): CI en cada push — lint, unit tests, seguridad.
  * **Feedback de integración** (minutos/horas): tests de integración y E2E, preview environments.
  * **Feedback de producción** (continuo): monitoreo, alertas, métricas, feedback de usuarios.
  * **Feedback del proceso** (retrospectivas): deployment metrics, DORA (módulos 8/9).
* Cómo acelerarlo: parallelización (nivel 19), pipelines rápidos (nivel 23), fallar temprano (stages más baratos primero), notificaciones dirigidas (quién rompió qué — blame), dashboards visibles.
* El feedback debe ser **accionable**: el mensaje dice qué pasó y qué se puede hacer — no solo "pipeline rojo".
* Cerrar el ciclo: cada incidente o fallo genera una acción (fix, test nuevo, runbook) — sin eso, el feedback se acumula sin mejorar nada.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Cambio en el código
   ↓
Feedback rápido (CI en minutos)
   ↓
¿Falló? → al autor, con detalle
   ↓
¿Pasó? → integración → producción
   ↓
Feedback continuo (monitoreo/alertas)
   ↓
Retrospectiva → mejora del proceso
\`\`\`

### 🧪 Ejercicios

1. Mide el tiempo de feedback de tu CI (push → resultado visible).
2. Configura notificaciones dirigidas: quién rompió el pipeline, qué test, dónde.
3. Documenta 3 mejoras de proceso surgidas del feedback de los últimos meses.

### ⚠️ Errores comunes

* Pipelines lentos: el feedback llega cuando el contexto se perdió.
* Feedback sin acción: los reportes se acumulan y nadie actúa.
* Notificaciones a todo el mundo (el ruido mata la señal).
* Retrospectivas sin seguimiento: las mejoras acordadas nunca se implementan.

### 🔗 Conexión DevOps

Los feedback loops son el motor de la mejora continua (nivel 23): conectan shift left (nivel 0), el pipeline (todos los niveles), la observabilidad (nivel 18) y las DORA metrics (módulo 9). CI/CD sin feedback es automatización sin aprendizaje.
`
export default content
