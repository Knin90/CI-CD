const content = `
## Módulo 19 — Pipeline debugging

### 🎯 Objetivos de aprendizaje

* Aplicar una metodología completa de debugging al pipeline.
* Usar herramientas de la plataforma para investigar.
* Convertir cada incidente en aprendizaje.

### ❓ Problema real que resuelve

Los módulos anteriores cubren fallos específicos; este integra todo en una metodología. El debugging profesional no es memoria de errores: es un proceso — observación, hipótesis, experimento, verificación — aplicado al pipeline con las herramientas de la plataforma (logs, re-runs, estados, artifacts). Además, cada incidente debe dejar aprendizaje (runbooks, tests, mejoras), no solo un fix.

### 💡 Analogía

El debugging profesional es la medicina de urgencias: primero se estabiliza al paciente (¿el pipeline sigue afectando producción? ¿hay que revertir?), luego se toman signos vitales (logs, métricas, estado), se formula un diagnóstico diferencial (hipótesis ordenadas por probabilidad), se aplica el tratamiento menos invasivo (experimento) y se monitorea la respuesta (verificación). Al final, el caso se documenta para el próximo médico (runbook).

### 📖 Explicación técnica

* **Metodología** (se repite en cada módulo):
  1. **Estabiliza**: ¿afecta producción? ¿hay que revertir o pausar? (nivel 13 y 18).
  2. **Observa**: logs del primer error, estado de jobs/steps, artifacts, métricas (nivel 18).
  3. **Clasifica**: config, código, infra, entorno, red, permisos, secretos, timeout (los módulos 1-18).
  4. **Hipótesis**: una causa probable con evidencia (no "a ver si pasa").
  5. **Experimenta**: reproduce en local, aísla el step, cambia UNA variable a la vez.
  6. **Verifica**: el pipeline verde, y que la causa real desapareció (no solo el síntoma).
* Herramientas de la plataforma: logs con debug (GitHub \`ACTIONS_STEP_DEBUG\`, GitLab \`CI_DEBUG_TRACE\`), re-run desde un step, estados y artifacts de diagnóstico, acceso SSH a runners self-hosted (con cuidado — nivel 21), API de la plataforma para buscar en el historial.
* **Aprendizaje**: tras el fix, escribe el runbook (nivel 19 de este nivel), añade el test/monitoreo que lo habría detectado (nivel 20), y revisa si la configuración se puede mejorar (nivel 23).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Incidente en el pipeline
   ↓
1. Estabiliza (¿revertir? ¿pausar?)
   ↓
2. Observa (logs, estado, artifacts, métricas)
   ↓
3. Clasifica (config/código/infra/entorno/red/…)
   ↓
4. Hipótesis con evidencia
   ↓
5. Experimenta (una variable a la vez)
   ↓
6. Verifica (verde + causa real desaparecida)
   ↓
Documenta el runbook y mejora el pipeline
\`\`\`

### 🧪 Ejercicios

1. Aplica la metodología completa a un fallo real de tu pipeline y documenta los 6 pasos.
2. Activa el modo debug de tu plataforma y compara los logs antes/después.
3. Escribe un runbook de 5 líneas para el fallo más común de tu equipo.

### ⚠️ Errores comunes

* Saltarse la estabilización (depurar mientras producción sigue rota).
* Probar varios cambios a la vez (no sabes cuál arregló el problema).
* Confundir "pipeline verde" con "problema resuelto" (el síntoma puede volver).
* No documentar: el mismo incidente se repite y se investiga desde cero.

### 🔗 Conexión DevOps

El pipeline debugging integra todos los módulos del nivel 22 y conecta con observabilidad (nivel 18), pipeline reliability (nivel 20), runbooks y producción (módulo 20), y la mejora continua (nivel 23). Es el módulo que convierte el troubleshooting en una habilidad, no en una colección de trucos.
`
export default content
