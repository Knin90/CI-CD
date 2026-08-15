const content = `
## Módulo 12 — Pipeline reliability

### 🎯 Objetivos de aprendizaje

* Medir y mejorar la confiabilidad del pipeline.
* Reducir fallos flaky e inestabilidad.
* Tratar el pipeline como un producto con SLAs.

### ❓ Problema real que resuelve

Un pipeline inestable (falla el 30% sin razón) destruye la confianza: los equipos ignoran el rojo, los fallos reales se pierden entre los falsos, y el CI/CD deja de ser una red de seguridad. La confiabilidad del pipeline lo trata como un producto: se mide su estabilidad, se persiguen los flaky failures y se exige un pipeline en el que se pueda confiar.

### 💡 Analogía

La confiabilidad del pipeline es la puntualidad del tren: si el tren llega tarde el 30% de las veces sin explicación, los pasajeros dejan de planificar según el horario (los equipos ignoran el pipeline rojo). Un tren (pipeline) confiable es aquel que se comporta de forma predecible — y cuando falla, falla con razón y con aviso.

### 📖 Explicación técnica

* **Confiabilidad**: el pipeline falla solo cuando debe fallar (hay un problema real), y no por casualidad.
* Métricas: tasa de éxito (módulo 8 de nivel 18), % de fallos flaky, tiempo de recuperación del pipeline, "signal to noise" (cuántos rojos son reales vs falsos).
* **Flaky failures** (nivel 7): tests que fallan intermitentemente sin cambio de código — la principal causa de pipelines no confiables.
* Cómo mejorar:
  * Perseguir los flaky: quarantine (mover tests flaky a una lista separada), investigar la causa raíz (nivel 22), arreglar no ignorar.
  * Estabilidad de infra: runners estables, cachés confiables (nivel 19), recursos suficientes (nivel 4).
  * Señal clara: fallos con mensajes útiles, notificaciones dirigidas (nivel 18), distinción "falló por test" vs "falló por infra".
  * Retries inteligentes (nivel 5): para fallos de infra transitorios, no para tests flaky (que deben arreglarse).
* Buenas prácticas: medir la tasa de éxito del pipeline, revisar los fallos en retrospectivas, objetivo explícito (95%+ de pipelines verdes sin flaky).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipelines del mes
   ↓
Métricas: % verde, % flaky, % fallo real
   ↓
Fallos flaky → quarantine + causa raíz
   ↓
Fallos reales → arreglos
   ↓
Señal limpia: rojo = problema real
   ↓
Confianza del equipo restaurada
\`\`\`

### 🧪 Ejercicios

1. Calcula la tasa de éxito y el % de fallos flaky de tu pipeline del último mes.
2. Identifica 3 flaky failures y su causa probable.
3. Define un objetivo de confiabilidad y un plan para alcanzarlo.

### ⚠️ Errores comunes

* Ignorar los flaky (el rojo "de siempre" deja de significar algo).
* Retry automático para tests flaky (esconde el problema, no lo arregla).
* Medir confiabilidad sin actuar (dashboard bonito, pipeline inestable).
* Castigar a quien rompe el pipeline (la confiabilidad es del sistema, no de la persona — nivel 23).

### 🔗 Conexión DevOps

La confiabilidad es la meta del testing de pipelines (nivel 20): conecta flaky tests (nivel 7), deployment metrics (nivel 18), retries (nivel 5) y la cultura de no-blame (nivel 23). Un pipeline confiable es la base de todo lo demás.
`
export default content
