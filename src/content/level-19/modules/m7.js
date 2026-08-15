const content = `
## Módulo 7 — Parallel execution

### 🎯 Objetivos de aprendizaje

* Ejecutar jobs en paralelo para acortar el pipeline.
* Identificar qué jobs pueden correr en paralelo.
* Equilibrar paralelismo y consumo de runners.

### ❓ Problema real que resuelve

Un pipeline secuencial tarda la suma de todos sus stages: 5 stages × 10 minutos = 50 minutos de feedback (nivel 18). Los jobs independientes (lint, unit tests, security scan) pueden correr en paralelo: 10 minutos totales en vez de 30. La ejecución paralela acelera el feedback sin cambiar la lógica.

### 💡 Analogía

La ejecución paralela es el servicio del restaurante con varios cocineros: en vez de que el mismo cocinero prepare el entrante, el plato principal y el postre en serie (secuencial), cada cocinero trabaja su parte a la vez (paralelo). La mesa recibe la comida completa mucho antes — sin que ninguna parte tarde más.

### 📖 Explicación técnica

* **Paralelismo**: jobs independientes corren simultáneamente en runners distintos (o stages paralelos).
* Qué puede paralelizarse: jobs sin dependencias entre sí — lint, unit tests por módulo, security scan, build de imágenes distintas.
* Qué NO puede: jobs con dependencias (nivel 8 — pipeline dependencies): el deploy depende del build; los tests de integración dependen de los unit tests.
* Implementación: GitHub (jobs por defecto en paralelo), GitLab (stages secuenciales + jobs paralelos dentro del stage), Jenkins (parallel block), Azure (stages/jobs paralelos).
* Coste: cada job paralelo consume un runner — paralelizar 10 jobs en un equipo con 2 runners crea cola (nivel 4). El paralelismo debe equilibrarse con la capacidad.
* Buenas prácticas: agrupar jobs independientes, usar stage de fan-out/fan-in (build → [lint, test, scan] en paralelo → package), medir el impacto real (¿el pipeline bajó de 50 a 15 min?).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
SECUENCIAL:  build → lint → test → scan → package (50 min)
PARALELO:
   build (10 min)
     ↓
   ┌─ lint (5)
   ├─ test (10)   ← en paralelo
   ├─ scan (7)
   └─ package (8)
     ↓
   deploy (10 min)  → total ~30 min
\`\`\`

### 🧪 Ejercicios

1. Identifica en tu pipeline qué jobs son independientes y podrían paralelizarse.
2. Paraleliza 2-3 jobs y mide la reducción de tiempo.
3. Revisa la capacidad de tus runners: ¿la paralelización crea colas?

### ⚠️ Errores comunes

* Paralelizar jobs con dependencias implícitas (resultados inconsistentes).
* Ignorar la capacidad de runners (paralelizar 10 jobs con 2 runners = cola).
* Fragmentar demasiado: N jobs de 30 segundos que pierden más en overhead que lo que ahorran.
* No medir: se paraleliza "por moda" sin verificar el impacto.

### 🔗 Conexión DevOps

La ejecución paralela es clave del fast feedback (nivel 23): conecta jobs/stages (nivel 5), runners (nivel 4), dependencias (módulo 8) y el time-to-feedback (nivel 18).
`
export default content
