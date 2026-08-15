const content = `
## Módulo 14 — Timeout

### 🎯 Objetivos de aprendizaje

* Diagnosticar timeouts en jobs, steps y despliegues.
* Distinguir timeouts de recursos, red y lógica lenta.
* Configurar timeouts inteligentes.

### ❓ Problema real que resuelve

El job se cancela a los 30 minutos "sin razón", el step cuelga esperando una respuesta, el deploy se queda en "timeout" esperando que los pods estén ready. Los timeouts son la frontera entre "tarda" y "nunca va a terminar": sin ellos el pipeline cuelga para siempre, con ellos mal configurados se cancela trabajo útil. Diagnosticar timeouts — qué espera, por qué, cuánto debe tardar — es esencial.

### 💡 Analogía

El timeout es el límite de paciencia del restaurante: si el plato tarda más de 30 minutos, el cliente se va (job cancelado). La pregunta no es "¿por qué se fue el cliente?" sino "¿por qué tardó tanto el plato?". A veces la cocina es lenta (lógica), a veces el horno está a tope (recursos), a veces el camarero espera una respuesta que nunca llega (red o deadlock). El diagnóstico mira la cocina, no la puerta.

### 📖 Explicación técnica

* Causas de timeout:
  * **Recursos**: el job espera CPU/memoria, el runner está saturado, el build compite con otros (nivel 4).
  * **Red**: llamadas a servicios lentos o colgados (módulo 13), DNS lento, descargas grandes.
  * **Lógica**: tests lentos, builds pesados, procesos que no terminan (deadlock, locks, \`wait\` infinito).
  * **Despliegue**: rollout que no avanza porque las probes fallan (módulo 10), el CD espera un estado que no llega.
  * **Caché/descargas**: dependencias que tardan más de lo configurado.
* Método: mira QUÉ step/timeout exacto expiró → ¿qué estaba esperando? (subproceso, red, estado) → mide el tiempo real en local (¿siempre lento o un pico?) → distingue "lento pero termina" (subir el timeout) de "nunca termina" (bug, deadlock, recurso).
* Buenas prácticas: timeouts explícitos por step (no infinitos), timeouts distintos para "esperar estado" (rollout, healthcheck) vs "ejecutar tarea", y alertas cuando un job se acerca al límite (nivel 18).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job corre… y expira el timeout
   ↓
¿Qué step expiró y qué esperaba?
   ↓
¿Recursos? runner/cola saturados
   ↓
¿Red? llamada colgada (módulo 13)
   ↓
¿Lógica? proceso que no termina (deadlock, lock)
   ↓
¿Despliegue? rollout/probe que no avanza
   ↓
Decide: subir límite o arreglar la causa
\`\`\`

### 🧪 Ejercicios

1. Configura un timeout muy bajo en un job y observa la cancelación.
2. Crea un step que espere una red que nunca responde y diagnostícalo.
3. Revisa los timeouts de tu pipeline: ¿cuáles son infinitos o inadecuados?

### ⚠️ Errores comunes

* Subir el timeout "a lo bruto" (esconde la causa, no la arregla).
* Timeouts infinitos (el pipeline puede colgarse para siempre).
* Confundir timeout de recursos (cola) con timeout de lógica (código lento).
* No distinguir "esperar estado" (legítimo, con límite) de "tarea lenta" (revisar la tarea).

### 🔗 Conexión DevOps

Los timeouts conectan con red (módulo 13), recursos (nivel 4), despliegues (nivel 13-14), retries (nivel 5) y observabilidad (nivel 18). Es el diagnóstico del "cuánto debe tardar": la configuración de timeouts es la disciplina que separa pipelines robustos de pipelines que cuelgan.
`
export default content
