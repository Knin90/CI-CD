const content = `
## Módulo 13 — Mean time to recovery

### 🎯 Objetivos de aprendizaje

* Definir MTTR y su importancia.
* Medir el tiempo de detección y recuperación de incidentes.
* Reducir el MTTR con rollbacks, runbooks y observabilidad.

### ❓ Problema real que resuelve

Cuando algo falla en producción, cada minuto cuenta: usuarios afectados, dinero perdido, confianza erosionada. El MTTR mide cuánto tarda el servicio en recuperarse tras un incidente — y lo reduce todo lo aprendido: detección rápida (monitoreo), diagnóstico ágil (logs/traces) y recuperación inmediata (rollbacks y runbooks probados).

### 💡 Analogía

El MTTR es el tiempo de reacción del equipo de bomberos: el incendio (incidente) ya ocurrió; lo que importa es cuánto tarda en apagarse. Un cuerpo de bomberos que tarda 10 minutos en llegar y 2 en apagar es mejor que uno que tarda 40 en llegar y 10 en apagar — aunque el segundo "apague mejor" cuando llega. La velocidad de recuperación es la métrica.

### 📖 Explicación técnica

* **MTTR (Mean Time To Recovery)**: tiempo promedio desde que el servicio falla hasta que se recupera.
* Componentes:
  * **MTTD (detección)**: tiempo hasta que el fallo se detecta (alertas — módulos 1/3).
  * **MTTA (triage)**: tiempo hasta que alguien responde y diagnostica.
  * **MTTR (recuperación)**: tiempo hasta restaurar el servicio.
* Niveles DORA: Elite (< 1 hora), High (< 1 día), Medium (< 1 semana), Low (≥ 1 semana).
* Cómo reducirlo:
  * **Detección**: alertas efectivas sobre métricas reales (módulos 1/3).
  * **Diagnóstico**: logs y traces correlacionados (módulos 2/4), runbooks de incidentes.
  * **Recuperación**: rollbacks probados (nivel 13), feature flags (nivel 13), re-deploy rápido, entornos de recuperación.
  * **Práctica**: game days y chaos engineering (nivel 20) — ensayar la recuperación antes del incidente real.
* Buenas prácticas: medir por incidente y promediar, revisar en post-mortems qué segmento (detección/diagnóstico/recuperación) tardó más.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Fallo en producción
   ↓
MTTD: alerta disparada (minutos)
   ↓
MTTA: on-call responde + diagnostica (logs/traces)
   ↓
MTTR: rollback / fix / flag → servicio restaurado
   ↓
Post-mortem: ¿qué segmento tardó más? → mejorar
\`\`\`

### 🧪 Ejercicios

1. Mide el MTTR de tus últimos 3 incidentes (detección → recuperación).
2. Identifica cuál de los 3 segmentos (detectar/diagnosticar/recuperar) es tu cuello de botella.
3. Ensaya un rollback en producción (game day) y mide el tiempo real.

### ⚠️ Errores comunes

* Medir solo la recuperación, ignorando la detección (la más lenta suele ser el diagnóstico).
* Runbooks inexistentes: en el incidente se improvisa (MTTR se dispara).
* Rollback no probado: "debería funcionar" pero tarda el doble cuando se necesita.
* MTTR sin post-mortem: se recupera el servicio pero nunca se mejora el proceso.

### 🔗 Conexión DevOps

El MTTR es la cuarta DORA metric: conecta observabilidad (módulos 1-4), rollbacks (nivel 13), runbooks y chaos testing (nivel 20) y la cultura de incidentes (nivel 23).
`
export default content
