const content = `
## Módulo 8 — Pipeline execution

### 🎯 Objetivos de aprendizaje

* Recorrer el ciclo de ejecución de un pipeline: del trigger al resultado.
* Entender el rol del orquestador en la asignación de runners y el orden de jobs.
* Saber dónde consultar el estado y los logs de una ejecución.

### ❓ Problema real que resuelve

Cuando un pipeline corre, ¿qué pasa exactamente? ¿Quién decide qué job va a qué runner? ¿Por qué un job espera y otro corre? Entender el ciclo de ejecución permite anticipar problemas (runners ocupados, colas, orden de jobs) y saber dónde mirar cuando algo falla: el estado del pipeline, los logs de cada job y los artefactos generados.

### 💡 Analogía

Un pipeline en ejecución es como un vuelo controlado por torre: el orquestador (torre de control) decide qué avión (job) despega de qué pista (runner) y en qué orden, según los planes de vuelo (dependencias). Cada avión tiene su registro (logs) y su estado (en vuelo, aterrizado, cancelado). Si un avión falla, la torre lo sabe al instante.

### 📖 Explicación técnica

Ciclo de ejecución:

1. **Trigger**: ocurre el evento que dispara el pipeline.
2. **Planificación**: el orquestador lee la configuración, construye el grafo de jobs y resuelve las dependencias.
3. **Asignación**: cada job se asigna a un runner disponible que cumpla sus requisitos (labels, imagen, SO).
4. **Ejecución**: el runner clona el repo, ejecuta los steps en orden, y reporta cada paso al orquestador.
5. **Recopilación**: se recogen logs, artefactos y reportes.
6. **Resultado**: el pipeline queda en success, failure o cancelled; las notificaciones y los triggers encadenados reaccionan.

Estado de una ejecución: queued (en cola) → running → success / failure / cancelled / skipped.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Trigger
  │
  ▼
Orquestador planifica (grafo de jobs)
  │
  ▼
Job 1 → runner libre (cola si no hay)
  │        │
  │        ▼
  │     Ejecución de steps (logs en tiempo real)
  │        │
  │        ▼
  │     Reporte del resultado
  ▼
Siguiente job según dependencias
  │
  ▼
Pipeline termina → status + logs + artefactos
  │
  ▼
Notificaciones / pipelines encadenados
\`\`\`

### 💻 Ejemplo básico

Consultar una ejecución desde la CLI (GitHub):

\`\`\`bash
gh run list                      # ejecuciones recientes
gh run watch <run-id>            # seguir en vivo
gh run view <run-id> --log       # logs completos
gh run view <run-id> --json status,conclusion
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline tarda más de lo esperado. Al revisar el estado de la ejecución, el equipo ve que los jobs están "queued" (en cola): los runners self-hosted están saturados porque el equipo de plataforma no escaló. El diagnóstico del ciclo de ejecución (planificación → asignación → cola) revela que el cuello de botella es la capacidad de runners, no el pipeline. Activan el autoescalado y la cola desaparece.

### ⚠️ Errores comunes

* No diferenciar "queued" (cola de runners) de "running" (ejecución real).
* Jobs con logs que no reflejan el orden real de los steps.
* Ejecuciones canceladas por timeout sin revisar qué paso colgó.
* No usar artefactos de una ejecución fallida para diagnosticar.
* Ignorar el estado "skipped": jobs saltados por condiciones que parecen fallos.

### 📋 Lo que debes recordar

* Ciclo: trigger → planificación → asignación → ejecución → recopilación → resultado.
* El orquestador decide orden y runners; la cola indica falta de capacidad.
* Estados: queued, running, success, failure, cancelled, skipped.
* Logs por job y artefactos = fuentes de verdad del diagnóstico.

### 🧪 Autoevaluación rápida

1. ¿Qué hace el orquestador antes de ejecutar los jobs?
2. ¿Qué significa que un job esté "queued"?
3. ¿Qué estados puede tener una ejecución?

---

1. Lee la configuración, construye el grafo de jobs, resuelve dependencias y decide qué runner ejecutará cada job.
2. Que el job ya fue planificado pero no hay runner disponible en ese momento: está esperando en cola por capacidad.
3. Queued, running, success, failure, cancelled y skipped.
`
export default content
