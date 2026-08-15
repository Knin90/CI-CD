const content = `
## Módulo 10 — Timeouts

### 🎯 Objetivos de aprendizaje

* Explicar por qué todo job necesita un timeout.
* Configurar timeouts a nivel de step, job y pipeline.
* Diagnosticar y resolver timeouts.

### ❓ Problema real que resuelve

Un job sin timeout puede colgarse indefinidamente: una espera de red sin límite, un proceso muerto, un recurso bloqueado. Eso consume el runner, encola los demás jobs y bloquea el pipeline. El timeout es el freno de emergencia: si el job no termina en X tiempo, se cancela y se reporta, liberando los recursos.

### 💡 Analogía

Un microondas con temporizador: si el tiempo se acaba, se apaga solo. Sin temporizador, un plato podría quemarse para siempre (o la cocina incendiarse). El timeout del job es el temporizador: define el máximo razonable y corta cuando se supera.

### 📖 Explicación técnica

Niveles de timeout:

* **Step** (cuando la plataforma lo permite): límite por paso.
* **Job**: \`timeout-minutes\` (GitHub), \`timeout\` (GitLab).
* **Pipeline**: límite global (concurrencia/cancelación).
* Valores sensatos: el doble del tiempo típico del job + margen; nunca infinito.
* Efectos del timeout: el job se cancela, se marca como failure (o cancellation), los recursos se liberan y los jobs dependientes no se ejecutan.
* Causas típicas de timeout: descargas lentas, tests colgados (espera de red), builds que crecen, deadlocks, runners sobrecargados (cola, aunque eso no es timeout de job sino de espera).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job "e2e" — timeout 15 min
  │
  ├── Termina a los 6 min → OK
  ├── Termina a los 14 min → OK (justo)
  └── A los 15 min sigue → CANCELADO
        │
        ├── Runner liberado
        ├── Job marcado como fallido/cancelado
        └── Jobs dependientes no se ejecutan
\`\`\`

### 💻 Ejemplo básico

Timeout de job (GitHub Actions):

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - run: npm test
\`\`\`

Timeout global del workflow:

\`\`\`yaml
name: CI
timeout-minutes: 60
on: [push]
\`\`\`

### 🏢 Caso de uso profesional

Un job de tests E2E se colgaba a diario esperando una respuesta de la API de staging que nunca llegaba, consumiendo un runner 8 horas. El equipo pone timeout de 15 minutos: el job se cancela, la notificación dispara, y el análisis del log muestra la espera de red sin límite. Corrigen el test (timeout HTTP propio) y el job pasa a durar 4 minutos estables.

### ⚠️ Errores comunes

* Jobs sin timeout (riesgo de ocupación infinita).
* Timeouts demasiado cortos: jobs legítimos cancelados en picos de carga.
* Timeout global que se usa como "arreglo" de jobs colgados.
* No distinguir timeout del job de la espera en cola de runners.
* Ignorar el timeout: "es que la red estaba lenta" sin investigar.

### 📋 Lo que debes recordar

* Todo job necesita timeout: el freno de emergencia del pipeline.
* Niveles: step, job y pipeline.
* Valor sensato: doble del tiempo típico + margen.
* Un timeout recurrente es un síntoma: investiga la causa.

### 🧪 Autoevaluación rápida

1. ¿Qué sucede cuando un job supera su timeout?
2. ¿Qué timeout elegirías para un job que normalmente tarda 5 minutos?
3. ¿Qué causas típicas hay detrás de un timeout?

---

1. El job se cancela, se libera el runner, se marca como fallido y los jobs dependientes no se ejecutan.
2. Entre 10 y 15 minutos: el doble del tiempo típico más margen (5 × 2 + margen).
3. Esperas de red sin límite, tests colgados, builds que crecen, deadlocks o recursos bloqueados.
`
export default content
