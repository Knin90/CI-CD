const content = `
## Módulo 7 — Failure injection

### 🎯 Objetivos de aprendizaje

* Inyectar fallos para probar la resiliencia del pipeline.
* Simular fallos de infraestructura, red y dependencias.
* Verificar que el pipeline maneja los fallos correctamente.

### ❓ Problema real que resuelve

El pipeline funciona cuando todo va bien — la pregunta es: ¿qué pasa cuando algo falla? Un servicio externo cae, un runner muere a mitad, un paso falla a destiempo. La inyección de fallos prueba esas situaciones a propósito, en entornos controlados, para verificar que el pipeline falla de forma segura: retry, rollback, alertas, mensajes claros.

### 💡 Analogía

La inyección de fallos es el simulacro de incendio del edificio: no se espera a que haya un incendio real para saber si las alarmas y las salidas funcionan. Se corta la luz (fallo), se activa la alarma (reacción del sistema) y se comprueba que todos salen por las salidas correctas (el pipeline maneja el fallo sin pánico).

### 📖 Explicación técnica

* **Failure injection**: provocar fallos deliberadamente para probar el comportamiento del sistema/pipeline.
* Qué fallos inyectar:
  * **Servicios externos**: API mock que devuelve 500/tiempo de espera.
  * **Red**: latencia, pérdida de paquetes, caída de DNS (\`tc\`, proxies, chaos network tools).
  * **Runner/infra**: matar un runner a mitad, llenar el disco, agotar memoria (chaos engineering — nivel 20).
  * **Pasos del pipeline**: un step que falla intencionalmente para verificar retry y manejo de errores.
* Qué verificar: el pipeline falla rápido y claro (nivel 22 — mensajes útiles), los retries funcionan (nivel 5), el rollback se dispara (nivel 13), las alertas llegan (nivel 18).
* Herramientas: chaos engineering (Chaos Monkey, Litmus, Gremlin — para infra), mocks/stubs con comportamiento configurable, scripts de inyección en entornos de prueba (módulo 6).
* Buenas prácticas: inyectar en entornos aislados (nunca producción sin extremo cuidado), empezar por fallos de bajo impacto, documentar los escenarios probados.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Entorno de pruebas (módulo 6)
   ↓
Inyectar fallo (API 500 / red cortada / runner muerto)
   ↓
Pipeline reacciona:
   ├── retry → OK
   ├── rollback → OK
   ├── alerta → llega
   └── mensaje claro → legible
   ↓
¿Manejado? → resiliencia validada   ¿No? → arreglar el pipeline
\`\`\`

### 🧪 Ejercicios

1. Inyecta un fallo de API externa (mock con 500) y observa cómo falla tu pipeline.
2. Simula la muerte de un runner a mitad de un job.
3. Documenta 3 escenarios de fallo probados y el comportamiento esperado.

### ⚠️ Errores comunes

* Probar solo el happy path (los fallos se descubren en producción).
* Fallos inyectados sin verificación (se inyecta pero no se observa la reacción).
* Inyección en producción sin control (riesgo real).
* Fallos "perfectos" que nunca ocurren en la realidad (probar los fallos realistas).

### 🔗 Conexión DevOps

La inyección de fallos conecta el testing de pipelines (nivel 20), el chaos engineering, los retries (nivel 5) y la resiliencia (nivel 23). Un pipeline que no ha visto fallos no está probado.
`
export default content
