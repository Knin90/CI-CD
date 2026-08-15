const content = `
## Módulo 20 — Production incident

### 🎯 Objetivos de aprendizaje

* Gestionar un incidente de producción de principio a fin.
* Priorizar: mitigar, diagnosticar, resolver, aprender.
* Coordinar comunicación y runbooks bajo presión.

### ❓ Problema real que resuelve

Producción está caída y el reloj corre: el pipeline desplegó algo que rompió el servicio, o el servicio falló y hay que revertir. Sin método, el equipo improvisa, duplica esfuerzos y la comunicación se vuelve caos. La gestión de incidentes de producción — con prioridades claras, roles y runbooks — minimiza el impacto y acelera la recuperación, convirtiendo el pánico en proceso.

### 💡 Analogía

El incidente de producción es el incendio en el edificio: primero se evacúa (mitigar: revertir, aislar), luego se apaga (resolver), y después se investiga qué lo causó (diagnóstico post-incidente) y se instalan detectores de humo (prevención). Nadie apaga un incendio preguntando quién encendió la cerilla — primero se controla el daño, luego se aprende.

### 📖 Explicación técnica

* **Fases del incidente**:
  1. **Detección**: alerta (nivel 18), monitoreo, o el usuario lo reporta. El tiempo de detección importa tanto como el de resolución.
  2. **Mitigación**: la prioridad es restaurar el servicio, no encontrar la causa. Revertir el deploy (nivel 18), escalar, aislar. El rollback es la primera herramienta.
  3. **Diagnóstico**: una vez estabilizado, se investiga la causa raíz con la metodología del módulo 19 — sin presión de "el servicio está caído".
  4. **Resolución**: el fix se despliega por el pipeline normal (con tests — no fixes "a mano" en producción).
  5. **Aprendizaje**: postmortem (nivel 23): qué pasó, por qué, qué se mejora (monitoreo, tests, gates, runbooks).
* **Roles**: quién lidera (incident commander), quién comunica (estado a stakeholders), quién investiga. Evita que todos toquen producción a la vez.
* **Comunicación**: estado breve y honesto ("qué afecta, qué se está haciendo, cuándo se espera"), sin culpar (no-blame — nivel 23).
* **Runbooks**: pasos probados para incidentes conocidos (rollback, escalado, rotación de secretos) — se escriben en calma, se usan en crisis (módulo 19).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Alerta: producción degradada
   ↓
1. Detecta (alerta, monitoreo, usuario)
   ↓
2. Mitiga: revertir / aislar / escalar (¡primero el servicio!)
   ↓
3. Diagnostica la causa raíz (sin presión)
   ↓
4. Resuelve por el pipeline normal (con tests)
   ↓
5. Postmortem: causa, mejoras, runbooks
   ↓
Prevención: monitoreo, tests, gates nuevos
\`\`\`

### 🧪 Ejercicios

1. Simula un incidente: definición de roles, mitigación y comunicación (30 minutos).
2. Escribe el runbook de rollback de tu servicio más crítico.
3. Haz un postmortem breve de un incidente pasado: causa y 3 mejoras.

### ⚠️ Errores comunes

* Buscar la causa raíz antes de mitigar (el servicio sigue caído mientras se investiga).
* Fixes "a mano" en producción (sin tests, sin pipeline — el siguiente incidente es seguro).
* Todos tocando producción a la vez (empeora el incidente).
* Postmortem sin acciones (el incidente se repite — nivel 23).

### 🔗 Conexión DevOps

El incidente de producción conecta con observabilidad (nivel 18), rollback (módulo 18 y nivel 23), pipeline debugging (módulo 19), cultura no-blame (nivel 23) y la mejora continua (nivel 23). Es la prueba real de todo el curso: un incidente bien gestionado es un pipeline que aprendió.
`
export default content
