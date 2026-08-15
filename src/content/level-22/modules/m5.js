const content = `
## Módulo 5 — Runner failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos de runners y agents.
* Distinguir problemas del runner de problemas del job.
* Estabilizar runners self-hosted y hosted.

### ❓ Problema real que resuelve

El runner no conecta, se cae a mitad del job, queda en estado "offline" o el job no encuentra runner disponible. Los fallos de runners paran todo el CI/CD: nada se construye ni se despliega. Diagnosticar runners — conectividad, registro, recursos y limpieza — es esencial para un pipeline confiable.

### 💡 Analogía

El runner failure es el repartidor que no llega al restaurante: los pedidos (jobs) están listos en la cocina (pipeline), pero no hay quien los lleve. Si el repartidor no está conectado (offline), se quedó sin batería (recursos) o se perdió (registro roto), el restaurante (CI/CD) se detiene — por más perfectos que sean los platos (jobs).

### 📖 Explicación técnica

* **Runners** (nivel 4): ejecutan los jobs. Hosted (los provee la plataforma) o self-hosted (los gestionas tú — nivel 21).
* Fallos típicos de runners:
  * **Offline / sin conexión**: el runner no registró heartbeat, red bloqueada, token expirado, el proceso se cayó.
  * **Registro**: token inválido, label incorrecto, runner duplicado o desregistrado.
  * **Recursos**: disco lleno, memoria insuficiente (OOM), CPU agotada — el job muere sin error claro.
  * **Estado sucio**: caché, contenedores o archivos residuales de jobs anteriores (self-hosted).
  * **Job no encuentra runner**: los labels no coinciden, el runner está ocupado, la cola no asigna.
* Método: mira el estado del runner en la UI → logs del runner (no del job) → healthcheck (disco, memoria, red, proceso) → reproduce: ¿falla un job o todos? ¿Desde cuándo?
* Buenas prácticas: runners efímeros (cada job en un entorno limpio — nivel 4), autoescalado, monitoreo de disco/memoria, tokens rotados, y limpieza automática en self-hosted.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job entra en cola
   ↓
¿Runner disponible con el label correcto?
   ↓
Runner recibe el job y ejecuta
   ↓
¿Fallo? → estado del runner + logs del runner
   ↓
Diagnostica: offline / registro / recursos / suciedad
   ↓
Estabiliza (reinicia, limpia, escala)
   ↓
Job vuelve a ejecutarse
\`\`\`

### 🧪 Ejercicios

1. Desconecta un runner self-hosted y observa qué pasa con los jobs en cola.
2. Llena el disco de un runner y diagnostica el fallo del job.
3. Documenta los healthchecks que vigilarías en tus runners.

### ⚠️ Errores comunes

* Mirar solo el log del job (el fallo está en el runner: disco, red, proceso).
* Self-hosted sin limpieza (estados sucios entre jobs — nivel 4).
* Labels mal configurados (jobs que nunca encuentran runner).
* Ignorar el monitoreo de recursos hasta que el runner muere.

### 🔗 Conexión DevOps

Los runners conectan con runners/agents (nivel 4), self-hosted (nivel 21), monitoreo (nivel 18) y la confiabilidad del pipeline (nivel 20). Un runner estable es infraestructura invisible: solo se nota cuando falla.
`
export default content
